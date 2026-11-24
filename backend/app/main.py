import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.core.config import settings
from app.database.session import engine, Base
import app.models.db_models  # Ensure models are imported for metadata registration
from app.api import fashion_designer, image_analysis, config_api

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Ensure database tables exist
    print(f"[BeYou Backend] Initializing database at {settings.DATABASE_URL}...")
    Base.metadata.create_all(bind=engine)
    print(f"[BeYou Backend] Ready. Image Model: {settings.OPENAI_IMAGE_MODEL}, Vision Model: {settings.OPENAI_VISION_MODEL}")
    yield
    print("[BeYou Backend] Shutting down.")

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Academic B.Tech Major Project: BeYou – AI-Powered Women's Fashion Designer & Image Analysis System",
    version=settings.VERSION,
    lifespan=lifespan
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Static Storage Directories for generated designs and uploads
os.makedirs(settings.GENERATED_DIR, exist_ok=True)
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
app.mount("/storage/generated", StaticFiles(directory=settings.GENERATED_DIR), name="generated_storage")
app.mount("/storage/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads_storage")

# Include Modular API Routers
app.include_router(fashion_designer.router, prefix="/api")
app.include_router(image_analysis.router, prefix="/api")
app.include_router(config_api.router, prefix="/api")

@app.get("/")
def root():
    return {
        "status": "online",
        "project": settings.PROJECT_NAME,
        "tagline": settings.TAGLINE,
        "version": settings.VERSION,
        "scope": "Women's Fashion Only (5 Categories, 4 Styles)",
        "docs_url": "/docs"
    }

@app.get("/api/health")
def healthcheck():
    return {
        "status": "healthy",
        "database": "connected",
        "has_openai_key": bool(settings.OPENAI_API_KEY or os.environ.get("OPENAI_API_KEY"))
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=settings.HOST, port=settings.PORT, reload=settings.DEBUG)
