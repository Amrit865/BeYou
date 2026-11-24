import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.core.config import settings, ROOT_DIR, BASE_DIR
from app.core.constants import (
    APPROVED_CATEGORIES,
    APPROVED_STYLES,
    APPROVED_COLORS,
    FABRIC_OPTIONS_BY_CATEGORY,
    ALL_APPROVED_FABRICS,
    VISION_CATEGORIES,
    VISION_STYLES
)

router = APIRouter(prefix="/config", tags=["System Configuration"])

class ApiKeyUpdateRequest(BaseModel):
    api_key: str = Field(..., min_length=10, description="Valid OpenAI API key")

@router.get("")
def get_system_config():
    """
    Returns the fixed 5 categories, 4 styles, fabrics, colors, and live system status.
    Guarantees central single-source-of-truth configuration across frontend and backend.
    """
    active_key = (settings.OPENAI_API_KEY or os.environ.get("OPENAI_API_KEY", "")).strip()
    return {
        "project_name": settings.PROJECT_NAME,
        "tagline": settings.TAGLINE,
        "version": settings.VERSION,
        "categories": APPROVED_CATEGORIES,
        "styles": APPROVED_STYLES,
        "colors": APPROVED_COLORS,
        "fabrics_by_category": FABRIC_OPTIONS_BY_CATEGORY,
        "all_fabrics": ALL_APPROVED_FABRICS,
        "vision_categories": VISION_CATEGORIES,
        "vision_styles": VISION_STYLES,
        "has_openai_key": bool(active_key),
        "key_preview": f"{active_key[:7]}...{active_key[-4:]}" if len(active_key) > 12 else ("Configured" if active_key else "Not Configured"),
        "image_model": settings.OPENAI_IMAGE_MODEL,
        "vision_model": settings.OPENAI_VISION_MODEL,
        "scope": "Women's Fashion Only (5 Fixed Categories, 4 Fixed Styles)"
    }

@router.post("/key")
def update_openai_key(payload: ApiKeyUpdateRequest):
    """
    Updates the OpenAI API key in memory and persists to backend/.env.
    """
    new_key = payload.api_key.strip()
    if not new_key.startswith("sk-"):
        raise HTTPException(status_code=400, detail="Invalid OpenAI API key format. Key should start with 'sk-'.")

    settings.OPENAI_API_KEY = new_key
    os.environ["OPENAI_API_KEY"] = new_key

    # Persist to .env
    env_path = BASE_DIR / ".env"
    try:
        lines = []
        if env_path.exists():
            with open(env_path, "r", encoding="utf-8") as f:
                lines = f.readlines()
        
        key_found = False
        new_lines = []
        for line in lines:
            if line.startswith("OPENAI_API_KEY="):
                new_lines.append(f"OPENAI_API_KEY={new_key}\n")
                key_found = True
            else:
                new_lines.append(line)

        if not key_found:
            new_lines.append(f"OPENAI_API_KEY={new_key}\n")

        with open(env_path, "w", encoding="utf-8") as f:
            f.writelines(new_lines)
            
    except Exception as e:
        print(f"[Warning] Failed to write .env file: {e}")

    return {
        "success": True,
        "message": "OpenAI API key configured successfully.",
        "key_preview": f"{new_key[:7]}...{new_key[-4:]}"
    }
