@echo off
echo ========================================
echo   Agent Scrum - Stopping server...
echo ========================================
echo.

REM Kill any Node.js process using port 5050
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5050" ^| findstr "LISTENING"') do (
    echo Killing process PID: %%a
    taskkill /PID %%a /F >nul 2>&1
)

echo Server stopped.
pause
