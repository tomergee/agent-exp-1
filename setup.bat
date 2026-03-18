@echo off
title Agent Scrum - Setup
cd /d "%~dp0"

echo ========================================
echo   Agent Scrum - Initial Setup
echo ========================================
echo.

REM Check for Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed.
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js version:
call node -v
echo.

echo Installing dependencies...
call npm install
echo.

echo ========================================
echo   Setup complete!
echo.
echo   To start: double-click start.bat
echo   To stop:  double-click stop.bat
echo   URL:      http://localhost:5050
echo ========================================
pause
