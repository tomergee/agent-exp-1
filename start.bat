@echo off
title Agent Scrum - Starting...
cd /d "%~dp0"

echo ========================================
echo   Agent Scrum - AI Project Management
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
    echo.
)

echo Starting server on http://localhost:5050
echo Press Ctrl+C to stop the server.
echo.

set PORT=5050
call npm run dev
