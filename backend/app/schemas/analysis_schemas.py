from datetime import datetime
from typing import Optional, List, Dict, Any, Union
from pydantic import BaseModel, Field

# 1. Structural Design Details
class DetailedDesignSpecs(BaseModel):
    neckline: Optional[str] = "N/A"
    collar_type: Optional[str] = "N/A"
    sleeve_length: Optional[str] = "N/A"
    buttons_closures: Optional[str] = "N/A"
    pockets: Optional[str] = "N/A"
    fit_and_silhouette: Optional[str] = "N/A"
    embellishments: Optional[str] = "N/A"

# 2. Colour & Pattern Analysis
class ColorSwatch(BaseModel):
    name: str
    hex_code: str
    is_primary: bool = False

class ColorPatternAnalysis(BaseModel):
    primary_colour: str
    primary_hex: str = "#FAFAFA"
    secondary_colours: List[str] = Field(default_factory=list)
    secondary_hexes: List[str] = Field(default_factory=list)
    palette_swatches: List[ColorSwatch] = Field(default_factory=list)
    color_harmony: str = "Monochromatic"
    pattern: str = "Plain"
    pattern_description: str = "Clean surface without visible prints or embroidery"

# 3. Fabric & Texture Detection
class FabricTextureAnalysis(BaseModel):
    appearance: str
    texture_type: str = "Smooth weave"
    tactile_description: str = "Soft and lightweight drape"
    surface_energy: Optional[str] = "Medium"

# 4. Fashion Style & Occasion Recognition
class FashionStyleRecognition(BaseModel):
    style: str  # Casual, Formal, Partywear, Minimalist, Uncertain
    confidence: str = "High"
    occasion_suitability: List[str] = Field(default_factory=list)
    style_rationale: str = ""

# 5. AI Outfit Recommendations
class OutfitItemRecommendation(BaseModel):
    item_type: str  # Bottom wear, Footwear, Layering, Accessory
    recommendation: str
    styling_tip: str

# 6. Fashion Design Improvement Suggestions
class DesignImprovementSuggestion(BaseModel):
    aspect: str  # Tailoring, Silhouette, Accessorizing, Fabric Choice
    suggestion: str
    impact: str

# 7. Similar Design Item
class SimilarDesignItem(BaseModel):
    id: Optional[str] = None
    title: str
    category: str
    style: str
    colour: str
    image_url: str
    similarity_reason: str

# Comprehensive 8-Feature Response Schema
class ImageAnalysisResponse(BaseModel):
    id: Optional[str] = None
    success: bool
    image_url: str
    original_filename: str
    
    # 1. Clothing detection & classification
    category: str = Field(..., description="Shirt, Top, Dress, Jeans, Pullover, or 'Unsupported Category'")
    detection_confidence: str = "95%"
    
    # 2. Fabric & texture detection
    fabric_texture: FabricTextureAnalysis
    
    # 3. Colour & pattern analysis
    colour_pattern: ColorPatternAnalysis
    
    # 4. Neckline, sleeves, and design details
    design_details: DetailedDesignSpecs
    
    # 5. Fashion style recognition
    style_recognition: FashionStyleRecognition
    
    # 6. AI outfit recommendations
    outfit_recommendations: List[OutfitItemRecommendation] = Field(default_factory=list)
    
    # 7. Similar design finder
    similar_designs: List[SimilarDesignItem] = Field(default_factory=list)
    
    # 8. Fashion design improvement suggestions
    improvement_suggestions: List[DesignImprovementSuggestion] = Field(default_factory=list)
    
    # Overall summary
    overall_description: str
    model_used: str = "OpenAI Vision (GPT-4o) + Computer Vision Suite"
    error_message: Optional[str] = None
    created_at: Optional[datetime] = None

class SavedAnalysisSummary(BaseModel):
    id: str
    original_filename: str
    image_url: str
    category: str
    fashion_style: str
    primary_colour: str
    overall_description: str
    created_at: datetime
