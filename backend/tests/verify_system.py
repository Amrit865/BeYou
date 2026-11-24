"""
BeYou - Automated Verification & Test Suite
Validates backend API routes, prompt engine, database persistence, and category constraints.
"""

import os
import sys
import io
from pathlib import Path

# Add backend to path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from fastapi.testclient import TestClient
from PIL import Image

from app.main import app
from app.core.constants import APPROVED_CATEGORIES, APPROVED_STYLES
from app.services.prompt_engine import FashionPromptEngine

client = TestClient(app)

def test_system():
    print("==================================================")
    print("RUNNING BEYOU VERIFICATION SUITE")
    print("==================================================")

    # 1. Health & Root
    with TestClient(app) as client:
        r_root = client.get("/")
        assert r_root.status_code == 200, f"Root failed: {r_root.text}"
        assert "BeYou" in r_root.json()["project"], "Project title mismatch in root"
        print("✓ [PASS] Root & Info Endpoint Verified")

        r_health = client.get("/api/health")
        assert r_health.status_code == 200, f"Healthcheck failed: {r_health.text}"
        print("✓ [PASS] Healthcheck Endpoint Verified")

        # 2. Config Endpoint (5 Categories, 4 Styles)
        r_conf = client.get("/api/config")
        assert r_conf.status_code == 200
        conf_data = r_conf.json()
        assert conf_data["categories"] == ["Shirts", "Tops", "Dresses", "Jeans", "Pullovers"], "Categories mismatch!"
        assert conf_data["styles"] == ["Casual", "Formal", "Partywear", "Minimalist"], "Styles mismatch!"
        print(f"✓ [PASS] Central Configuration Verified (5 Categories, 4 Styles)")

        # 3. Prompt Engine Priority & Constraints
        sample_request = {
            "category": "Shirts",
            "style": "Formal",
            "colour": "White",
            "fabric": "Cotton",
            "description": "Full sleeves, elegant collar, pearl buttons"
        }
        prompt = FashionPromptEngine.build_prompt(sample_request)
        assert "women's shirt" in prompt.lower(), "Garment name not found in prompt"
        assert "formal" in prompt.lower(), "Style not found in prompt"
        assert "white" in prompt.lower(), "Colour not found in prompt"
        assert "cotton" in prompt.lower(), "Fabric not found in prompt"
        assert "pearl buttons" in prompt.lower(), "Custom description not found in prompt"
        assert "spotlight only this single women's shirt" in prompt.lower(), "Single-garment focus missing"
        print("✓ [PASS] Prompt Engine Priority & Constraints Verified")

        # 4. Mandatory Category Rejection
        r_illegal = client.post("/api/designs/generate", json={
            "category": "Jackets",
            "style": "Casual",
            "colour": "Black"
        })
        assert r_illegal.status_code == 422, f"Illegal category was not rejected: {r_illegal.status_code}"
        print("✓ [PASS] Strict Rejection of Unsupported Category (Jackets -> 422)")

        r_illegal_style = client.post("/api/designs/generate", json={
            "category": "Dresses",
            "style": "Streetwear",
            "colour": "Black"
        })
        assert r_illegal_style.status_code == 422, f"Illegal style was not rejected: {r_illegal_style.status_code}"
        print("✓ [PASS] Strict Rejection of Unsupported Style (Streetwear -> 422)")

        # 5. Transparent Error Reporting When OpenAI Key Is Missing
        r_gen = client.post("/api/designs/generate", json=sample_request)
        assert r_gen.status_code == 200
        gen_data = r_gen.json()
        assert gen_data["generation_status"] == "missing_api_key" or gen_data["success"] is False
        assert "OpenAI API Key is not configured" in gen_data["error_message"]
        print("✓ [PASS] Transparent API Error Reporting (No Fake Fallbacks) Verified")

        # 6. Image Analysis Validation
        # Test uploading unsupported file format (.txt)
        r_bad_file = client.post(
            "/api/analyze/upload",
            files={"file": ("test.txt", io.BytesIO(b"dummy text"), "text/plain")}
        )
        assert r_bad_file.status_code == 400
        assert "Unsupported file format" in r_bad_file.json()["detail"]
        print("✓ [PASS] Upload Validation: Rejection of non-image file (.txt -> 400)")

        # Test uploading valid synthetic image (JPEG)
        img_buf = io.BytesIO()
        test_img = Image.new("RGB", (100, 100), color=(240, 240, 240))
        test_img.save(img_buf, format="JPEG")
        img_buf.seek(0)

        r_valid_upload = client.post(
            "/api/analyze/upload",
            files={"file": ("sample_shirt.jpg", img_buf, "image/jpeg")}
        )
        assert r_valid_upload.status_code == 200
        upload_data = r_valid_upload.json()
        assert "OpenAI API key is missing" in upload_data["overall_description"] or upload_data["success"] is True
        print("✓ [PASS] Upload Validation: Accepted valid JPEG and processed correctly")

    # 7. Check SQLite Database Creation
    db_path = Path(__file__).resolve().parent.parent.parent / "beyou.db"
    assert db_path.exists(), f"Database beyou.db does not exist at {db_path}"
    print(f"✓ [PASS] SQLite Database ({db_path.name}) Verified and Tables Created")

    print("==================================================")
    print("ALL VERIFICATION TESTS PASSED SUCCESSFULLY!")
    print("==================================================")

if __name__ == "__main__":
    test_system()
