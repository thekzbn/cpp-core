@echo off
title Stop C++ Core Companion Server
echo Stopping companion server on port 8000...
powershell -NoProfile -Command "try { Invoke-RestMethod -Uri 'http://localhost:8000/api/shutdown' -Method Post -TimeoutSec 2 | Out-Null; Write-Host '[SUCCESS] Companion server stopped cleanly.' } catch { Write-Host '[INFO] Server was not running.' }"
pause
