#!/usr/bin/env bash
# start_server.sh - Companion server launcher for macOS and Linux
cd "$(dirname "$0")"

echo "==========================================================="
echo " Quing learn (learn.quing) — C++ Core Companion Server"
echo "==========================================================="

if command -v node >/dev/null 2>&1; then
    SERVER_CMD="node dev_server.js"
elif command -v python3 >/dev/null 2>&1; then
    SERVER_CMD="python3 dev_server.py"
elif command -v python >/dev/null 2>&1; then
    SERVER_CMD="python dev_server.py"
else
    echo "[Quing learn] Neither Node.js nor Python found."
    echo "[Quing learn] Opening standalone browser simulator directly..."
    if command -v open >/dev/null 2>&1; then
        open index.html
    elif command -v xdg-open >/dev/null 2>&1; then
        xdg-open index.html
    fi
    exit 0
fi

$SERVER_CMD &
SERVER_PID=$!

sleep 1

# Open default browser
if command -v open >/dev/null 2>&1; then
    open "http://localhost:8000"
elif command -v xdg-open >/dev/null 2>&1; then
    xdg-open "http://localhost:8000"
fi

wait $SERVER_PID
