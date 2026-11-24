@echo off
title BeYou – AI-Powered Women's Fashion Designer
echo =====================================================================
echo  BeYou – AI-Powered Women's Fashion Designer ^& Image Analysis System
echo  Tagline: "Design Your Style, Define Yourself."
echo =====================================================================
echo.

set PYTHON_EXE=C:\Users\manjo_in03rlw\AppData\Local\Programs\Python\Python312\python.exe

echo [1/2] Starting BeYou FastAPI Backend on http://localhost:8000 ...
start "BeYou Backend" cmd /k "cd /d %~dp0backend && \"%PYTHON_EXE%\" -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload"

echo [2/2] Starting BeYou Frontend on http://localhost:5173 ...
start "BeYou Frontend" cmd /k "cd /d %~dp0frontend && npm.cmd run dev"

echo.
echo =====================================================================
echo  BeYou is launching!
echo  Backend Docs: http://localhost:8000/docs
echo  Frontend UI:   http://localhost:5173
echo =====================================================================
timeout /t 5 >nul
start http://localhost:5173
