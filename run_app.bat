@echo off
title BeYou – AI-Powered Women's Fashion Designer
echo =====================================================================
echo  BeYou – AI-Powered Women's Fashion Designer ^& Image Analysis System
echo  Tagline: "Design Your Style, Define Yourself."
echo =====================================================================
echo.

set PYTHON_EXE=C:\Users\manjo_in03rlw\AppData\Local\Programs\Python\Python312\python.exe

echo Starting Unified BeYou Web Server on http://localhost:8000 ...
start "BeYou Web Server" cmd /k "cd /d %~dp0 && \"%PYTHON_EXE%\" -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --app-dir backend --reload"

echo.
echo =====================================================================
echo  BeYou is launching!
echo  Web Studio:   http://localhost:8000
echo  Backend Docs: http://localhost:8000/docs
echo =====================================================================
timeout /t 3 >nul
start http://localhost:8000
