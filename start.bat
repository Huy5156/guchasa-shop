@echo off
chcp 65001 >nul
cd /d "%~dp0"
if not exist node_modules (
  echo [SETUP] Cai dat dependencies lan dau...
  call npm install
)
echo.
echo ============================================
echo   GUCHASA SHOP - Dang khoi dong server...
echo ============================================
echo.
echo   Landing: http://localhost:8080
echo   Admin:   http://localhost:8080/admin.html
echo   Mat khau admin mac dinh: admin123
echo.
node server.js
pause
