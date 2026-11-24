# BeYou – Live Website Deployment Guide

This project (**BeYou – AI-Powered Women's Fashion Designer & Image Analysis System**) is configured as a **single unified full-stack application**. The FastAPI backend automatically serves both the REST API (`/api/*`), image storage (`/storage/*`), and the compiled React frontend Single Page Application (`/`) from `frontend/dist`.

---

## 🚀 Option 1: Render.com (Recommended – Free & Automatic)

Render is the simplest and most reliable free cloud host for this project.

### Steps:
1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit for BeYou deployment"
   # Create a new repository on github.com, then run:
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```
2. **Go to Render:**
   - Sign up or log in at [render.com](https://render.com).
   - Click **"New +"** and choose **"Web Service"** (or **"Blueprint"**).
   - Connect your GitHub repository.
3. **Configure the Web Service Settings:**
   - **Name:** `beyou-fashion-studio`
   - **Language / Runtime:** `Python`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT --app-dir backend`
   - **Plan:** Free
4. **Environment Variables:**
   Add the following environment variable under the **Environment** tab:
   - `OPENAI_API_KEY`: `sk-...` (Your OpenAI API key)
   - `PYTHON_VERSION`: `3.12.7`
5. Click **"Deploy Web Service"**.
6. In ~2-3 minutes, your website will be live at `https://<your-service-name>.onrender.com`!

---

## 🚂 Option 2: Railway.app (One-Click Deploy)

Railway provides fast deployment and persistent storage options.

### Steps:
1. Push your repository to GitHub.
2. Sign in to [railway.app](https://railway.app).
3. Click **"New Project"** ➔ **"Deploy from GitHub repo"** and pick your repo.
4. Railway will automatically detect the `Procfile` / `railway.json`.
5. Under **Variables**, add:
   - `OPENAI_API_KEY` = your OpenAI API key
6. Under **Settings** ➔ **Networking**, click **"Generate Domain"**.
7. Your app is live with public HTTPS!

---

## 🤗 Option 3: Hugging Face Spaces (Free Docker Space)

Hugging Face Spaces is an ideal showcase platform for AI & Deep Learning capstone projects.

### Steps:
1. Sign in to [huggingface.co](https://huggingface.co).
2. Go to [huggingface.co/new-space](https://huggingface.co/new-space).
3. Enter Space name (e.g. `beyou-fashion-ai`).
4. Select Space SDK: **Docker** (Blank).
5. Choose **Public** and **Free CPU**.
6. Clone the Space repo or push this codebase to it:
   ```bash
   git remote add space https://huggingface.co/spaces/<username>/<space-name>
   git push space main
   ```
7. In Space **Settings** ➔ **Variables and secrets**, add:
   - Secret Name: `OPENAI_API_KEY`, Secret Value: your key.
8. Hugging Face will automatically build the `Dockerfile` and make your website live!

---

## 🐳 Option 4: Run via Docker (Local or Any VPS / Cloud Server)

Build and run anywhere with Docker:

```bash
# Build the Docker image
docker build -t beyou-fashion .

# Run the container (pass your OpenAI key)
docker run -d -p 8000:8000 -e OPENAI_API_KEY=your_key_here beyou-fashion
```
Then visit `http://localhost:8000` or `http://<your-vps-ip>:8000`.

---

## 🔑 In-App Dynamic Key Management

Even after deployment, users or evaluators can change or enter their OpenAI API key dynamically through the UI by clicking the **"Set API Key"** button in the top navigation bar.
