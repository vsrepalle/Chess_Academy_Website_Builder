@echo off
set REPO_URL=https://github.com/vsrepalle/Chess_Academy_Website_Builder.git

echo --- CHECKING GITIGNORE ---
if not exist .gitignore (
    echo Creating .gitignore to exclude node_modules...
    echo node_modules/ > .gitignore
    echo .angular/ >> .gitignore
    echo dist/ >> .gitignore
    echo .vscode/ >> .gitignore
    echo *.log >> .gitignore
)

echo --- INITIALIZING GIT ---
git init
git remote add origin %REPO_URL% 2>nul
git remote set-url origin %REPO_URL%

echo --- CLEANING AND STAGING ---
:: This ensures node_modules are removed from tracking if they were accidentally added
git rm -r --cached . >nul 2>&1
git add .

echo --- COMMITTING ---
set /p commit_msg="Enter Commit Message: "
if "%commit_msg%"=="" set commit_msg="Update Chess Academy Builder %date% %time%"
git commit -m "%commit_msg%"

echo --- PUSHING TO GITHUB ---
git branch -M main
git push -u origin main --force

echo.
echo SUCCESS! Your code is on GitHub (without node_modules).
pause