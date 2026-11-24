import os
import uuid
import json
from typing import List
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.db_models import ImageAnalysisRecordModel
from app.schemas.analysis_schemas import ImageAnalysisResponse, SavedAnalysisSummary
from app.services.image_analyzer import FashionImageAnalyzerService
from app.core.config import settings

router = APIRouter(prefix="/analyze", tags=["Fashion Image Analysis"])

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB

@router.post("/upload", response_model=ImageAnalysisResponse)
async def upload_and_analyze_image(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Accepts clothing image upload and executes the comprehensive 8-feature analysis:
    1. Clothing detection & classification
    2. Fabric and texture detection
    3. Colour and pattern analysis
    4. Neckline, sleeves, and design details
    5. Fashion style recognition
    6. AI outfit recommendations
    7. Similar design finder
    8. Fashion design improvement suggestions
    """
    # 1. Validate extension
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported file format '{ext}'. Supported formats: JPG, JPEG, PNG, WEBP."
        )

    # 2. Read bytes & validate size
    contents = await file.read()
    if len(contents) == 0:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File size exceeds maximum 10MB limit.")

    # 3. Save uploaded file securely
    unique_file_id = str(uuid.uuid4())[:12]
    stored_filename = f"upload_{unique_file_id}{ext}"
    target_filepath = os.path.join(settings.UPLOAD_DIR, stored_filename)

    with open(target_filepath, "wb") as f:
        f.write(contents)

    public_image_url = f"/storage/uploads/{stored_filename}"

    # 4. Invoke 8-feature Vision Analyzer
    analysis_result = FashionImageAnalyzerService.analyze_clothing_image(
        file_bytes=contents,
        original_filename=file.filename,
        stored_filename=stored_filename,
        public_url=public_image_url
    )

    # 5. Persist to database
    if analysis_result.get("success") and analysis_result.get("id"):
        db_record = ImageAnalysisRecordModel(
            id=analysis_result["id"],
            original_filename=file.filename,
            stored_filename=stored_filename,
            image_url=public_image_url,
            category=analysis_result["category"],
            primary_colour=analysis_result["colour_pattern"]["primary_colour"],
            secondary_colours=json.dumps(analysis_result["colour_pattern"].get("secondary_colours", [])),
            pattern=analysis_result["colour_pattern"]["pattern"],
            fabric_appearance=analysis_result["fabric_texture"]["appearance"],
            fashion_style=analysis_result["style_recognition"]["style"],
            design_details=json.dumps(analysis_result.get("design_details", {})),
            overall_description=analysis_result["overall_description"],
            confidence_or_uncertainty=analysis_result.get("detection_confidence", "High"),
            full_analysis_json=json.dumps(analysis_result, default=str),
            model_used=analysis_result["model_used"],
            created_at=analysis_result.get("created_at")
        )
        try:
            db.add(db_record)
            db.commit()
            db.refresh(db_record)
        except Exception as e:
            db.rollback()
            print(f"[DB Error persisting analysis]: {e}")

    return analysis_result

@router.get("/history", response_model=List[SavedAnalysisSummary])
def list_analysis_history(db: Session = Depends(get_db)):
    """
    Returns history of past clothing image analyses.
    """
    records = db.query(ImageAnalysisRecordModel).order_by(ImageAnalysisRecordModel.created_at.desc()).all()
    return [
        SavedAnalysisSummary(
            id=r.id,
            original_filename=r.original_filename,
            image_url=r.image_url,
            category=r.category,
            fashion_style=r.fashion_style,
            primary_colour=r.primary_colour,
            overall_description=r.overall_description,
            created_at=r.created_at
        )
        for r in records
    ]

@router.get("/{analysis_id}", response_model=ImageAnalysisResponse)
def get_analysis_detail(analysis_id: str, db: Session = Depends(get_db)):
    """
    Retrieves the complete 8-feature analysis record by ID.
    """
    record = db.query(ImageAnalysisRecordModel).filter(ImageAnalysisRecordModel.id == analysis_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Analysis record not found.")

    if record.full_analysis_json:
        try:
            data = json.loads(record.full_analysis_json)
            return data
        except Exception:
            pass

    # Fallback reconstruction
    return ImageAnalysisResponse(
        id=record.id,
        success=True,
        image_url=record.image_url,
        original_filename=record.original_filename,
        category=record.category,
        detection_confidence=record.confidence_or_uncertainty or "95%",
        fabric_texture={
            "appearance": record.fabric_appearance,
            "texture_type": "Structured weave",
            "tactile_description": "Natural hand-feel",
            "surface_energy": "Medium"
        },
        colour_pattern={
            "primary_colour": record.primary_colour,
            "primary_hex": "#FAFAFA",
            "secondary_colours": json.loads(record.secondary_colours) if record.secondary_colours else [],
            "secondary_hexes": [],
            "palette_swatches": [{"name": record.primary_colour, "hex_code": "#FAFAFA", "is_primary": True}],
            "color_harmony": "Monochromatic",
            "pattern": record.pattern,
            "pattern_description": "Clean surface finish"
        },
        design_details=json.loads(record.design_details) if record.design_details else {},
        style_recognition={
            "style": record.fashion_style,
            "confidence": "High",
            "occasion_suitability": ["Casual outings", "Everyday styling"],
            "style_rationale": "Identified from visual geometry."
        },
        outfit_recommendations=[],
        similar_designs=[],
        improvement_suggestions=[],
        overall_description=record.overall_description,
        model_used=record.model_used,
        created_at=record.created_at
    )

@router.delete("/{analysis_id}")
def delete_analysis(analysis_id: str, db: Session = Depends(get_db)):
    record = db.query(ImageAnalysisRecordModel).filter(ImageAnalysisRecordModel.id == analysis_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Analysis record not found.")

    filepath = os.path.join(settings.UPLOAD_DIR, record.stored_filename)
    if os.path.exists(filepath):
        try:
            os.remove(filepath)
        except Exception:
            pass

    db.delete(record)
    db.commit()
    return {"success": True, "message": "Analysis record deleted successfully."}
