from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field, field_validator
from app.core.constants import APPROVED_CATEGORIES, APPROVED_STYLES

class DesignGenerateRequest(BaseModel):
    category: str = Field(..., description="Mandatory clothing category (Shirts, Tops, Dresses, Jeans, Pullovers)")
    style: str = Field(..., description="Mandatory fashion style (Casual, Formal, Partywear, Minimalist)")
    colour: str = Field(..., description="Selected colour or custom colour")
    fabric: Optional[str] = Field("No preference", description="Optional fabric preference")
    description: Optional[str] = Field("", description="Custom design description providing extra details")
    generate_new: bool = Field(True, description="Whether to bypass cache and synthesize a new variation")

    @field_validator("category")
    @classmethod
    def validate_category(cls, v: str) -> str:
        # Standardize matching
        cleaned = v.strip().capitalize()
        # Handle singular/plural variations if entered
        category_map = {
            "Shirt": "Shirts", "Shirts": "Shirts",
            "Top": "Tops", "Tops": "Tops",
            "Dress": "Dresses", "Dresses": "Dresses",
            "Jean": "Jeans", "Jeans": "Jeans",
            "Pullover": "Pullovers", "Pullovers": "Pullovers"
        }
        mapped = category_map.get(cleaned)
        if not mapped or mapped not in APPROVED_CATEGORIES:
            raise ValueError(
                f"Invalid category '{v}'. Supported categories are strictly: {', '.join(APPROVED_CATEGORIES)}"
            )
        return mapped

    @field_validator("style")
    @classmethod
    def validate_style(cls, v: str) -> str:
        cleaned = v.strip().capitalize()
        if cleaned not in APPROVED_STYLES:
            raise ValueError(
                f"Invalid style '{v}'. Supported styles are strictly: {', '.join(APPROVED_STYLES)}"
            )
        return cleaned

class DesignResponse(BaseModel):
    id: Optional[str] = None
    success: bool
    title: str
    category: str
    style: str
    colour: str
    fabric: Optional[str] = None
    description: Optional[str] = ""
    prompt: str
    image_url: str
    download_url: Optional[str] = None
    model_used: str
    generation_status: str
    error_message: Optional[str] = None
    created_at: Optional[datetime] = None

class SavedDesignSummary(BaseModel):
    id: str
    title: str
    category: str
    style: str
    colour: str
    fabric: Optional[str] = None
    description: Optional[str] = None
    image_url: str
    created_at: datetime
