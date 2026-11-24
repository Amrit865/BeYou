# BeYou – AI-Powered Women's Fashion Designer & Image Analysis System

> **Tagline:** "Design Your Style, Define Yourself."  
> **Academic Domain:** Deep Learning • Multimodal Vision AI • Generative Image Synthesis • Full-Stack Web Development  
> **Target Audience:** B.Tech CSE (AI & Machine Learning) Major Capstone Project

---

## 1. Project Overview & Identity

**BeYou** is an academically presentable, reliable, and professional AI-driven women's fashion design and image analysis studio. The project is focused **strictly on two core AI functionalities**:

1. **AI Fashion Image Generation:** Synthesizing bespoke, realistic women's clothing designs according to user specifications (category, style, colour, fabric, and custom prompt brief) via the OpenAI Image Generation API (DALL-E 3).
2. **AI Fashion Image Analysis:** Uploading garment photos to extract structured computer vision parameters (category, dominant/secondary colours, pattern, fabric texture appearance, fashion style, and structural design details) via the multimodal OpenAI Vision API (GPT-4o).

### Strict Project Scope
- **Exclusively Women's Fashion:** All male and unisex apparel is excluded.
- **No E-Commerce Bloat:** No shopping carts, payment gateways, virtual try-ons, social networking, or inventory management.
- **Fixed Clothing Categories (5 Only):**
  1. `Shirts`
  2. `Tops`
  3. `Dresses`
  4. `Jeans`
  5. `Pullovers`
  *(Jackets, skirts, trousers, shorts, footwear, and accessories are strictly excluded).*
- **Fixed Fashion Styles (4 Only):**
  1. `Casual` (Relaxed everyday aesthetic)
  2. `Formal` (Tailored, professional structure)
  3. `Partywear` (Chic occasion silhouette)
  4. `Minimalist` (Clean, understated lines)

---

## 2. System Architecture

```
BeYou Platform Architecture
│
├── Frontend (React 18 + Vite + TailwindCSS)
│   ├── Home (Overview & Scope)
│   ├── AI Fashion Designer (Generation Form, Prompt Engine & Results)
│   ├── Fashion Image Analysis (Drag-and-Drop Vision Inspection)
│   ├── My Designs (Permanent Local Archive & One-Click Download)
│   └── About BeYou (Academic Architecture & Deep Learning Disclosures)
│
├── Backend (FastAPI + Python 3.12 + SQLAlchemy)
│   ├── /api/designs/generate  ──> Prompt Engine + OpenAI DALL-E 3
│   ├── /api/designs/download  ──> Direct Local File Streaming
│   ├── /api/analyze/upload    ──> OpenAI Vision (GPT-4o) JSON Mode
│   └── /api/config            ──> Central Configuration & Dynamic Key Sync
│
├── Local Storage & Database
│   ├── storage/generated/     ──> Permanent local image files
│   ├── storage/uploads/       ──> Uploaded image files
│   └── beyou.db               ──> SQLite persistent database
│
└── Deep Learning & Academic Assets
    ├── datasets/dataset_catalog.py ──> Category mapping & dataset audit
    └── deep_learning/checkpoints/  ──> 6-Layer Residual CNN Baseline (87.68% Test Acc)
```

---

## 3. Technology Stack & API Details

| Layer | Technology | Role |
|---|---|---|
| **Frontend** | React 18, Vite 5, TailwindCSS 3, Lucide Icons | Responsive minimalist fashion studio UI |
| **Backend** | FastAPI 0.115+, Uvicorn, Pydantic v2 | High-throughput REST API with strict validation |
| **Database** | SQLite + SQLAlchemy ORM | Local persistence for designs, specs, and analyses |
| **Generative AI** | OpenAI Image Generation API (`dall-e-3`) | Photorealistic single-garment synthesis |
| **Vision AI** | OpenAI Vision (`gpt-4o`) | Multimodal structured JSON feature extraction |
| **DL Baseline** | TensorFlow 2.21 / Keras 3 | 6-layer CNN classification checkpoint |

---

## 4. Prompt Engineering Engine

The BeYou prompt synthesis engine enforces a strict priority hierarchy:
1. **Women's fashion restriction** (No male or unisex models).
2. **Selected category constraint** (Focus strictly on the individual requested garment; avoids generating complete outfits).
3. **User's custom design requirements** (High priority; never overridden by generic terms).
4. **Selected fashion style** (Calibrates tailoring and silhouette).
5. **Requested colour palette** (Dominant shade and accents).
6. **Fabric preference** (Authentic texture drape: Cotton, Denim, Silk, Wool, Linen).
7. **Photographic lookbook composition** (Diffused studio lighting, neutral minimalist backdrop, natural seams).

---

## 5. Dataset Audit & Deep Learning Disclosure

### Datasets Inspected
- **Polyvore Dataset:** 261,000+ fashion catalog images (`images.zip`).
- **FashionVerse-MME:** Multimodal metadata annotations for attribute extraction.

### Academic Honesty Statement (Viva & Project Report)
In academic computer vision research, high-resolution generative fashion synthesis requires multi-billion parameter foundational models. BeYou transparently utilizes the OpenAI API rather than falsely claiming to have trained a large diffusion model from scratch on academic hardware.

For empirical evaluation, the project repository includes a local **6-Layer Deep CNN classifier** (`deep_learning/checkpoints/best_fashion_model.keras`):
- **Test Accuracy:** `87.68%`
- **Weighted Precision:** `88.46%`
- **Weighted Recall:** `87.68%`
- **Weighted F1-Score:** `87.85%`

### Categorical Mapping
External dataset labels are mapped to the 5 approved categories only when semantically exact:
- `Shirt` ➔ `Shirts` (Approved)
- `T-shirt/top` ➔ `Tops` (Approved)
- `Dress` ➔ `Dresses` (Approved)
- `Pullover` ➔ `Pullovers` (Approved)
- `Trouser` ➔ Flagged as **"Unsupported Category"** (Trousers are not Jeans).
- `Coat`, `Sandal`, `Sneaker`, `Bag`, `Ankle boot` ➔ Flagged as **"Unsupported Category"**.

---

## 6. How to Run BeYou

### One-Click Startup (Windows)
Double-click `run_app.bat` to launch both the FastAPI backend and React frontend simultaneously.

### Manual Startup

#### 1. Start Backend:
```bash
cd backend
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
API Documentation will be live at: `http://localhost:8000/docs`

#### 2. Start Frontend:
```bash
cd frontend
npm.cmd run dev
```
Frontend Web Studio will be live at: `http://localhost:5173`

#### 3. Configure OpenAI Key:
Click the **"Set API Key"** button in the top navigation bar or edit `backend/.env`:
```env
OPENAI_API_KEY=sk-your-openai-api-key
```

---

## 7. Project Viva & Defense Q&A

**Q1: Why did you restrict the categories to only 5?**  
*Answer:* Women's apparel encompasses hundreds of sub-types. To ensure high accuracy, rigorous validation, and prevent generative hallucinations, we fixed the domain to five primary structural staples (Shirts, Tops, Dresses, Jeans, Pullovers).

**Q2: How does the application avoid generating whole outfits when a single garment is requested?**  
*Answer:* The `FashionPromptEngine` injects explicit isolation directives (`"spotlight ONLY this single women's shirt; do NOT generate a complete outfit, unrelated garments, bags, or footwear"`) along with negative constraints.

**Q3: How does the Vision Analyzer handle an uploaded image of a skirt or jacket?**  
*Answer:* Per Rule 6.2, the system does not force unsupported garments into the 5 categories. It returns `"Unsupported Category"`, maintaining scientific accuracy and zero false positives.

**Q4: Where are the generated designs stored?**  
*Answer:* Images are streamed from the generative provider, verified with PIL, and permanently written to `storage/generated/`. Metadata is recorded in `beyou.db` (SQLite) and served via `/api/designs/download/{id}`.
