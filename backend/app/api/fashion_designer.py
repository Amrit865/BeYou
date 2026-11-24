import os
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.db_models import GeneratedDesignModel
from app.schemas.designer_schemas import DesignGenerateRequest, DesignResponse, SavedDesignSummary
from app.services.image_generator import FashionImageGeneratorService
from app.core.config import settings

router = APIRouter(prefix="/designs", tags=["AI Fashion Designer"])

@router.post("/generate", response_model=DesignResponse)
def generate_design(
    request: DesignGenerateRequest,
    db: Session = Depends(get_db)
):
    """
    Generates a women's fashion design using OpenAI Image API.
    Enforces mandatory categories, styles, colours, fabric preferences, and custom descriptions.
    """
    result = FashionImageGeneratorService.generate_fashion_design(request.dict())

    # If generation succeeded, persist to database
    if result.get("success") and result.get("id"):
        db_design = GeneratedDesignModel(
            id=result["id"],
            title=result["title"],
            category=result["category"],
            style=result["style"],
            colour=result["colour"],
            fabric=result["fabric"],
            description=result["description"],
            prompt=result["prompt"],
            image_filename=result["image_filename"],
            image_url=result["image_url"],
            model_used=result["model_used"],
            created_at=result["created_at"]
        )
        try:
            db.add(db_design)
            db.commit()
            db.refresh(db_design)
        except Exception as e:
            db.rollback()
            print(f"[DB Error persisting design]: {e}")

    return result

@router.get("", response_model=List[SavedDesignSummary])
def list_saved_designs(db: Session = Depends(get_db)):
    """
    Returns all saved fashion designs ordered by creation time descending.
    """
    designs = db.query(GeneratedDesignModel).order_by(GeneratedDesignModel.created_at.desc()).all()
    return [
        SavedDesignSummary(
            id=d.id,
            title=d.title,
            category=d.category,
            style=d.style,
            colour=d.colour,
            fabric=d.fabric,
            description=d.description,
            image_url=d.image_url,
            created_at=d.created_at
        )
        for d in designs
    ]

@router.get("/{design_id}", response_model=DesignResponse)
def get_design_by_id(design_id: str, db: Session = Depends(get_db)):
    """
    Retrieves full details of a single design.
    """
    design = db.query(GeneratedDesignModel).filter(GeneratedDesignModel.id == design_id).first()
    if not design:
        raise HTTPException(status_code=404, detail="Fashion design not found.")

    return DesignResponse(
        id=design.id,
        success=True,
        title=design.title,
        category=design.category,
        style=design.style,
        colour=design.colour,
        fabric=design.fabric,
        description=design.description or "",
        prompt=design.prompt,
        image_url=design.image_url,
        download_url=f"/api/designs/download/{design.id}",
        model_used=design.model_used,
        generation_status="saved",
        created_at=design.created_at
    )

@router.get("/download/{design_id}")
def download_design_image(design_id: str, db: Session = Depends(get_db)):
    """
    Downloads the actual local generated image file directly to the user's computer.
    """
    design = db.query(GeneratedDesignModel).filter(GeneratedDesignModel.id == design_id).first()
    if not design:
        raise HTTPException(status_code=404, detail="Design record not found.")

    filepath = os.path.join(settings.GENERATED_DIR, design.image_filename)
    if not os.path.exists(filepath):
        raise HTTPException(status_code=404, detail="Image file not found on disk.")

    download_name = f"BeYou_{design.category}_{design.style}_{design.colour}_{design_id[:6]}.jpg"
    return FileResponse(
        path=filepath,
        filename=download_name,
        media_type="image/jpeg",
        headers={"Content-Disposition": f'attachment; filename="{download_name}"'}
    )

@router.delete("/{design_id}")
def delete_design(design_id: str, db: Session = Depends(get_db)):
    """
    Deletes a design record and its file from local storage.
    """
    design = db.query(GeneratedDesignModel).filter(GeneratedDesignModel.id == design_id).first()
    if not design:
        raise HTTPException(status_code=404, detail="Fashion design not found.")

    filepath = os.path.join(settings.GENERATED_DIR, design.image_filename)
    if os.path.exists(filepath):
        try:
            os.remove(filepath)
        except Exception:
            pass

    db.delete(design)
    db.commit()
    return {"success": True, "message": "Design deleted successfully."}
