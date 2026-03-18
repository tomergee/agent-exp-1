@echo off
REM ============================================
REM Sync AgentScrum repo to local Windows machine
REM ============================================

SET DEST=C:\Users\glott\Claude\AgentScrum
SET REPO=https://github.com/tomergee/agent-exp-1.git
SET BRANCH=claude/agent-scrum-platform-Dkehv

echo === AgentScrum Sync Script ===
echo.

REM Create parent directory if needed
if not exist "C:\Users\glott\Claude" (
    echo Creating directory C:\Users\glott\Claude...
    mkdir "C:\Users\glott\Claude"
)

REM Clone or pull
if exist "%DEST%\.git" (
    echo Repository already exists. Pulling latest changes...
    cd /d "%DEST%"
    git fetch origin %BRANCH%
    git checkout %BRANCH%
    git pull origin %BRANCH%
) else (
    if exist "%DEST%" (
        echo Directory exists but is not a git repo. Removing and cloning fresh...
        rmdir /s /q "%DEST%"
    )
    echo Cloning repository...
    git clone -b %BRANCH% %REPO% "%DEST%"
    cd /d "%DEST%"
)

echo.
echo === Sync complete! ===
echo Location: %DEST%
echo Branch:   %BRANCH%
echo.
pause
