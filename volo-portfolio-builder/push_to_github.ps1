# VOLO Portfolio Builder - GitHub Push Script
# This script initializes git and pushes to the repository

Write-Host "Starting Git initialization..." -ForegroundColor Cyan

if (!(Test-Path .git)) {
    git init
    Write-Host "Git initialized." -ForegroundColor Green
} else {
    Write-Host "Git already initialized." -ForegroundColor Yellow
}

Write-Host "Adding files..." -ForegroundColor Cyan
git add .

Write-Host "Committing changes..." -ForegroundColor Cyan
git commit -m "Initial commit: VOLO Portfolio Builder"

Write-Host "Adding remote origin..." -ForegroundColor Cyan
# Check if remote already exists
$remoteExists = git remote | Select-String "origin"
if (!$remoteExists) {
    git remote add origin https://github.com/PawanSimha/VOLO_Portfolio_Builder.git
} else {
    git remote set-url origin https://github.com/PawanSimha/VOLO_Portfolio_Builder.git
}

Write-Host "Setting main branch..." -ForegroundColor Cyan
git branch -M main

Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
git push -u origin main

Write-Host "Done! Check your repo at https://github.com/PawanSimha/VOLO_Portfolio_Builder" -ForegroundColor Green
pause
