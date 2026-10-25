@echo off
title Build and Sign Quing C++ Core Executable
cd /d "%~dp0"
echo 1. Compiling Quing C++ Core.exe with native Windows C# compiler...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0build_launcher.ps1" -OutputPath "%~dp0Quing C++ Core.exe"
if %errorlevel% neq 0 (
    echo [ERROR] Launcher build failed. Check that Node.js and the .NET Framework compiler are installed.
    pause
    exit /b %errorlevel%
)
echo [SUCCESS] Compiled Quing C++ Core.exe!

echo 2. Applying Authenticode Digital Signature...
powershell -NoProfile -Command "$c = Get-Item 'Cert:\CurrentUser\My\42A3DDC6934212C7FCA56C68F8A832B5AE82A441' -ErrorAction SilentlyContinue; if (!$c) { $c = Get-ChildItem Cert:\CurrentUser\My -CodeSigningCert | Where-Object { $_.Subject -like '*Quing*' } | Select-Object -First 1 }; if (!$c) { $c = New-SelfSignedCertificate -Type CodeSigningCert -Subject 'CN=Quing learn (Ayomide Deji-Adeyale), O=Quing' -CertStoreLocation 'Cert:\CurrentUser\My' -HashAlgorithm SHA256 -NotAfter (Get-Date).AddYears(5) }; Set-AuthenticodeSignature -FilePath 'Quing C++ Core.exe' -Certificate $c | Out-Null; Write-Host '[SUCCESS] Authenticode Signature Applied successfully!'"
echo.
echo All done.
pause
