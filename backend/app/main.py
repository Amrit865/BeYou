import os
from pathlib import Path
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

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

@app.get("/api/health")
def healthcheck():
    return {
        "status": "healthy",
        "database": "connected",
        "has_openai_key": bool(settings.OPENAI_API_KEY or os.environ.get("OPENAI_API_KEY"))
    }

# Mount static assets and SPA fallback for production deployment
frontend_dist_path = Path(settings.FRONTEND_DIR)
if frontend_dist_path.exists() and (frontend_dist_path / "index.html").exists():
    assets_dir = frontend_dist_path / "assets"
    if assets_dir.exists():
        app.mount("/assets", StaticFiles(directory=str(assets_dir)), name="static_assets")

@app.get("/")
def root():
    if frontend_dist_path.exists() and (frontend_dist_path / "index.html").exists():
        return FileResponse(frontend_dist_path / "index.html")
    return {
        "status": "online",
        "project": settings.PROJECT_NAME,
        "tagline": settings.TAGLINE,
        "version": settings.VERSION,
        "scope": "Women's Fashion Only (5 Categories, 4 Styles)",
        "docs_url": "/docs",
        "frontend_url": "https://be-you-1rlb.vercel.app/"
    }

@app.get("/{full_path:path}")
def serve_spa(full_path: str):
    # Guard against hijacking api, storage, or OpenAPI docs
    if (
        full_path.startswith("api/")
        or full_path.startswith("storage/")
        or full_path in ("docs", "redoc", "openapi.json")
    ):
        raise HTTPException(status_code=404, detail="Not Found")

    if frontend_dist_path.exists():
        target_file = frontend_dist_path / full_path
        if full_path and target_file.is_file():
            return FileResponse(target_file)
        index_file = frontend_dist_path / "index.html"
        if index_file.is_file():
            return FileResponse(index_file)

    raise HTTPException(status_code=404, detail="Not Found")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=settings.HOST, port=settings.PORT, reload=settings.DEBUG)
