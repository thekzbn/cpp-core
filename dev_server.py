#!/usr/bin/env python3
"""
dev_server.py - Companion Server for C++ Interactive Learning Platform
Provides local static serving, native C++ compilation/execution, and VS Code integration.
Zero external dependencies (uses Python standard library only).
Hardened for secure local execution on loopback.
"""

import os
import sys
import json
import time
import shutil
import tempfile
import threading
import subprocess
from urllib.parse import urlparse
from http.server import HTTPServer, SimpleHTTPRequestHandler

PORT = int(os.environ.get("QUING_PORT", 8000))
HOST = os.environ.get("QUING_HOST", "127.0.0.1")
WORKSPACE_DIR = os.path.dirname(os.path.abspath(__file__))

MAX_PAYLOAD_SIZE = 512 * 1024  # 512 KB
MAX_OUTPUT_BUFFER = 512 * 1024  # 512 KB

def is_loopback_host(host_header):
    if not host_header:
        return False
    host_without_port = host_header.split(":")[0].lower()
    return host_without_port in ["localhost", "127.0.0.1", "[::1]"]

def is_allowed_loopback_origin(origin_header):
    if not origin_header:
        return False
    try:
        parsed = urlparse(origin_header)
        hostname = (parsed.hostname or "").lower()
        is_loopback = hostname in ["localhost", "127.0.0.1", "::1", "[::1]"]
        return parsed.scheme in ["http", "https"] and is_loopback
    except Exception:
        return False

def detect_compiler():
    candidate_cmds = []
    # 1. Local portable toolchain (zero install)
    local_candidates = [
        os.path.join(WORKSPACE_DIR, "toolchain", "w64devkit", "bin", "g++.exe"),
        os.path.join(WORKSPACE_DIR, "toolchain", "bin", "g++.exe"),
        os.path.join(WORKSPACE_DIR, "w64devkit", "bin", "g++.exe")
    ]
    for p in local_candidates:
        if os.path.exists(p):
            candidate_cmds.append(p)

    candidate_cmds.extend(["g++", "clang++"])
    # Check standard Windows paths if not on PATH
    if os.name == "nt":
        candidate_cmds.extend([
            r"C:\Program Files\LLVM\bin\clang++.exe",
            os.path.join(os.environ.get("LOCALAPPDATA", ""), "Programs", "LLVM", "bin", "clang++.exe"),
            r"C:\msys64\ucrt64\bin\g++.exe",
            r"C:\msys64\mingw64\bin\g++.exe",
            r"C:\MinGW\bin\g++.exe"
        ])

    for cmd in candidate_cmds:
        found_target = None
        if os.path.isabs(cmd) and os.path.exists(cmd):
            found_target = cmd
        elif shutil.which(cmd):
            found_target = cmd

        if found_target:
            try:
                res = subprocess.run([found_target, "--version"], capture_output=True, text=True, timeout=3)
                if res.returncode == 0:
                    version_line = res.stdout.strip().splitlines()[0]
                    return {"name": f'"{found_target}"' if " " in found_target else found_target, "version": version_line}
            except Exception:
                pass
    return None

class CompanionHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=WORKSPACE_DIR, **kwargs)

    def check_security(self):
        # 1. Host Header Validation
        host = self.headers.get("Host", "")
        if not is_loopback_host(host):
            self.send_response(400)
            self.send_header("Content-Type", "application/json")
            self.send_header("Connection", "close")
            self.end_headers()
            self.close_connection = True
            self.wfile.write(json.dumps({"success": False, "error": "Bad Request: Invalid or foreign Host header."}).encode("utf-8"))
            return False

        # 2. Origin Validation
        origin = self.headers.get("Origin")
        if origin and not is_allowed_loopback_origin(origin):
            self.send_response(403)
            self.send_header("Content-Type", "application/json")
            self.send_header("Connection", "close")
            self.end_headers()
            self.close_connection = True
            self.wfile.write(json.dumps({"success": False, "error": "Forbidden: Cross-origin request denied."}).encode("utf-8"))
            return False

        return True

    def send_json(self, status_code, data):
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        origin = self.headers.get("Origin")
        if origin and is_allowed_loopback_origin(origin):
            self.send_header("Access-Control-Allow-Origin", origin)
            self.send_header("Vary", "Origin")
        self.end_headers()
        self.wfile.write(json.dumps(data).encode("utf-8"))

    def do_OPTIONS(self):
        origin = self.headers.get("Origin")
        if origin and not is_allowed_loopback_origin(origin):
            self.send_response(403)
            self.end_headers()
            return

        self.send_response(200)
        if origin and is_allowed_loopback_origin(origin):
            self.send_header("Access-Control-Allow-Origin", origin)
            self.send_header("Vary", "Origin")
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self):
        if not self.check_security():
            return

        if self.path == "/api/status":
            compiler_info = detect_compiler()
            response = {
                "online": True,
                "compiler": compiler_info["name"] if compiler_info else None,
                "compilerVersion": compiler_info["version"] if compiler_info else None
            }
            self.send_json(200, response)
            return

        # Ensure static file serving stays within WORKSPACE_DIR
        req_path = self.path.split("?")[0]
        if req_path == "/":
            req_path = "/index.html"
        safe_path = os.path.abspath(os.path.join(WORKSPACE_DIR, "." + req_path))
        normalized_workspace = os.path.abspath(WORKSPACE_DIR)
        if not (safe_path.startswith(normalized_workspace + os.sep) or safe_path == normalized_workspace):
            self.send_response(403)
            self.send_header("Content-Type", "text/plain")
            self.end_headers()
            self.wfile.write(b"Forbidden")
            return

        super().do_GET()

    def do_POST(self):
        if not self.check_security():
            return

        # Graceful shutdown endpoint
        if self.path == "/api/shutdown":
            self.send_json(200, {"success": True, "message": "Companion server shutting down."})
            def delayed_shutdown():
                time.sleep(0.5)
                os._exit(0)
            threading.Thread(target=delayed_shutdown, daemon=True).start()
            return

        content_length = int(self.headers.get("Content-Length", 0))
        if content_length > MAX_PAYLOAD_SIZE:
            self.send_response(413)
            self.send_header("Content-Type", "application/json")
            self.send_header("Connection", "close")
            self.end_headers()
            self.close_connection = True
            self.wfile.write(json.dumps({"success": False, "error": "Payload exceeds 512KB limit."}).encode("utf-8"))
            return

        post_body = self.rfile.read(content_length)

        if self.path == "/api/run-cpp":
            try:
                data = json.loads(post_body.decode("utf-8"))
                code = data.get("code", "")
                stdin_data = data.get("stdin", "")

                if not code.strip():
                    self.send_json(400, {"success": False, "error": "No C++ code provided."})
                    return

                compiler_info = detect_compiler()
                if not compiler_info:
                    self.send_json(200, {
                        "success": False,
                        "compilerFound": False,
                        "error": "No C++ compiler (g++ or clang++) detected on system PATH.\nPlease install MinGW-w64 or Clang to compile and run natively on this machine."
                    })
                    return

                compiler = compiler_info["name"]
                with tempfile.TemporaryDirectory() as tmpdir:
                    src_path = os.path.join(tmpdir, "main.cpp")
                    exe_name = "main.exe" if sys.platform == "win32" else "main.out"
                    exe_path = os.path.join(tmpdir, exe_name)

                    with open(src_path, "w", encoding="utf-8") as f:
                        f.write(code)

                    # Compile
                    compile_cmd = [compiler, "-std=c++17", "-Wall", "-O2", src_path, "-o", exe_path]
                    try:
                        comp_res = subprocess.run(compile_cmd, capture_output=True, text=True, timeout=15)
                    except subprocess.TimeoutExpired:
                        self.send_json(200, {
                            "success": False,
                            "compilerFound": True,
                            "compiled": False,
                            "output": "Compilation timed out after 15 seconds.",
                            "exitCode": 1
                        })
                        return

                    if comp_res.returncode != 0:
                        err_out = (comp_res.stderr or comp_res.stdout or "Compilation failed").strip()
                        self.send_json(200, {
                            "success": False,
                            "compilerFound": True,
                            "compiled": False,
                            "compiler": compiler_info["name"],
                            "compilerVersion": compiler_info["version"],
                            "output": err_out,
                            "exitCode": comp_res.returncode
                        })
                        return

                    # Run binary with safety limits
                    exec_start = time.time()
                    try:
                        run_res = subprocess.run(
                            [exe_path],
                            input=stdin_data,
                            capture_output=True,
                            text=True,
                            timeout=8
                        )
                        duration_ms = round((time.time() - exec_start) * 1000)
                        combined_output = run_res.stdout or ""
                        if run_res.stderr:
                            if combined_output and not combined_output.endswith("\n"):
                                combined_output += "\n"
                            combined_output += run_res.stderr

                        if len(combined_output) > MAX_OUTPUT_BUFFER:
                            combined_output = combined_output[:MAX_OUTPUT_BUFFER] + "\n[Output truncated: maximum 512KB buffer reached]"

                        self.send_json(200, {
                            "success": run_res.returncode == 0,
                            "compilerFound": True,
                            "compiled": True,
                            "compiler": compiler_info["name"],
                            "compilerVersion": compiler_info["version"],
                            "output": combined_output,
                            "exitCode": run_res.returncode,
                            "durationMs": duration_ms
                        })
                    except subprocess.TimeoutExpired:
                        self.send_json(200, {
                            "success": False,
                            "compilerFound": True,
                            "compiled": True,
                            "compiler": compiler_info["name"],
                            "output": "[Execution terminated: Process timed out after 8 seconds (check for infinite loops)].",
                            "exitCode": 124,
                            "durationMs": 8000
                        })
                return
            except Exception as e:
                import traceback
                traceback.print_exc()
                self.send_json(500, {"success": False, "error": str(e)})
                return

        if self.path == "/api/open-vscode":
            try:
                data = json.loads(post_body.decode("utf-8"))
                root_dir = data.get("rootDir", "").strip()
                raw_file_name = data.get("fileName", "main.cpp").strip()
                code_content = data.get("code", "")

                file_name = os.path.basename(raw_file_name)
                if not file_name or file_name in [".", ".."] or file_name != raw_file_name:
                    self.send_json(400, {"success": False, "error": "Invalid filename: path traversal sequences are not permitted."})
                    return

                if not root_dir:
                    root_dir = os.path.join(os.path.expanduser("~"), "cpp_projects")

                resolved_root = os.path.abspath(root_dir)
                target_path = os.path.abspath(os.path.join(resolved_root, file_name))
                expected_dir = os.path.dirname(target_path)
                if expected_dir != resolved_root:
                    self.send_json(400, {"success": False, "error": "Target file path is outside the designated root directory."})
                    return

                os.makedirs(resolved_root, exist_ok=True)
                with open(target_path, "w", encoding="utf-8") as f:
                    f.write(code_content)

                vscode_launched = False
                try:
                    if sys.platform == "win32":
                        subprocess.Popen(f'code "{target_path}"', shell=True)
                    else:
                        subprocess.Popen(["code", target_path])
                    vscode_launched = True
                except Exception:
                    vscode_launched = False

                self.send_json(200, {
                    "success": True,
                    "targetPath": target_path,
                    "vscodeLaunched": vscode_launched,
                    "message": f"Successfully created {target_path} and triggered VS Code."
                })
                return
            except Exception as e:
                import traceback
                traceback.print_exc()
                self.send_json(500, {"success": False, "error": str(e)})
                return

        self.send_response(404)
        self.end_headers()

def run():
    server_address = (HOST, PORT)
    httpd = HTTPServer(server_address, CompanionHandler)
    print("===========================================================")
    print(" C++ Learning Platform Companion Server running at:")
    print(f" http://{HOST}:{PORT}")
    print(" Real native C++ compilation (g++/clang++) & VS Code active.")
    print(f" Bound securely to loopback ({HOST}).")
    print(" Press Ctrl+C to stop.")
    print("===========================================================")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping companion server.")
        sys.exit(0)

if __name__ == "__main__":
    run()
