import os
from pathlib import Path
from pydantic_settings import BaseSettings

# Resolve directories
BASE_DIR = Path(__file__).resolve().parent.parent.parent
ROOT_DIR = BASE_DIR.parent

class Settings(BaseSettings):
    PROJECT_NAME: str = "BeYou – AI-Powered Women's Fashion Designer & Image Analysis System"
    TAGLINE: str = "Design Your Style, Define Yourself."
    VERSION: str = "1.0.0"
    
    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    DEBUG: bool = True
    
    # OpenAI API Keys & Models
    OPENAI_API_KEY: str = ""
    OPENAI_IMAGE_MODEL: str = "dall-e-3"  # Standard high-fidelity OpenAI image generation
    OPENAI_VISION_MODEL: str = "gpt-4o"   # Vision-capable OpenAI model
    
    # Storage Paths
    STORAGE_DIR: str = str(ROOT_DIR / "storage")
    GENERATED_DIR: str = str(ROOT_DIR / "storage" / "generated")
    UPLOAD_DIR: str = str(ROOT_DIR / "storage" / "uploads")
    FRONTEND_DIR: str = str(ROOT_DIR / "frontend" / "dist")
    
    # Database
    DATABASE_URL: str = f"sqlite:///{ROOT_DIR / 'beyou.db'}"
    
    # CORS
    CORS_ORIGINS: list = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  "https://be-you-1rlb.vercel.app/"
]
    class Config:
        env_file = [
            str(BASE_DIR / ".env"),
            str(ROOT_DIR / ".env")
        ]
        env_file_encoding = "utf-8"
        extra = "allow"

settings = Settings()

# Ensure directories exist
os.makedirs(settings.STORAGE_DIR, exist_ok=True)
os.makedirs(settings.GENERATED_DIR, exist_ok=True)
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
