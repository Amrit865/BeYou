import uuid
from datetime import datetime
from sqlalchemy import Column, String, Text, DateTime, JSON
from app.database.session import Base

class GeneratedDesignModel(Base):
    __tablename__ = "generated_designs"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String(255), nullable=False)
    category = Column(String(50), nullable=False)
    style = Column(String(50), nullable=False)
    colour = Column(String(50), nullable=False)
    fabric = Column(String(50), nullable=True)
    description = Column(Text, nullable=True)
    prompt = Column(Text, nullable=False)
    image_filename = Column(String(255), nullable=False)
    image_url = Column(String(512), nullable=False)
    model_used = Column(String(100), default="OpenAI DALL-E 3")
    created_at = Column(DateTime, default=datetime.utcnow)

class ImageAnalysisRecordModel(Base):
    __tablename__ = "image_analyses"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    original_filename = Column(String(255), nullable=False)
    stored_filename = Column(String(255), nullable=False)
    image_url = Column(String(512), nullable=False)
    category = Column(String(100), nullable=False)
    primary_colour = Column(String(50), nullable=False)
    secondary_colours = Column(Text, nullable=True)  # JSON or comma-separated
    pattern = Column(String(100), nullable=False)
    fabric_appearance = Column(String(100), nullable=False)
    fashion_style = Column(String(50), nullable=False)
    design_details = Column(Text, nullable=True)  # JSON or detailed text
    overall_description = Column(Text, nullable=False)
    confidence_or_uncertainty = Column(String(100), default="High")
    full_analysis_json = Column(Text, nullable=True)  # Complete 8-feature analysis payload
    model_used = Column(String(100), default="OpenAI Vision (GPT-4o)")
    created_at = Column(DateTime, default=datetime.utcnow)
