#!/usr/bin/env python3
"""
dev_server.py - Companion Server for C++ Interactive Learning Platform
Provides local static serving, native C++ compilation/execution, and VS Code integration.
Zero external dependencies (uses Python standard library only).
"""

import os
import sys
import json
import time
import shutil
import tempfile
import subprocess
from http.server import HTTPServer, SimpleHTTPRequestHandler

PORT = 8000
WORKSPACE_DIR = os.path.dirname(os.path.abspath(__file__))

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

    def do_GET(self):
        if self.path == "/api/status":
            compiler_info = detect_compiler()
            response = {
                "online": True,
                "compiler": compiler_info["name"] if compiler_info else None,
                "compilerVersion": compiler_info["version"] if compiler_info else None
            }
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps(response).encode("utf-8"))
            return

        super().do_GET()

    def do_POST(self):
        if self.path == "/api/run-cpp":
            content_length = int(self.headers.get("Content-Length", 0))
            post_body = self.rfile.read(content_length)

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

                    # Run binary
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
                        combined_output = run_res.stdout
                        if run_res.stderr:
                            if combined_output and not combined_output.endswith("\n"):
                                combined_output += "\n"
                            combined_output += run_res.stderr

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
                self.send_json(500, {"success": False, "error": str(e)})
                return

        if self.path == "/api/open-vscode":
            content_length = int(self.headers.get("Content-Length", 0))
            post_body = self.rfile.read(content_length)

            try:
                data = json.loads(post_body.decode("utf-8"))
                root_dir = data.get("rootDir", "").strip()
                file_name = data.get("fileName", "main.cpp").strip()
                code_content = data.get("code", "")

                if not root_dir:
                    root_dir = os.path.join(os.path.expanduser("~"), "cpp_projects")

                os.makedirs(root_dir, exist_ok=True)
                target_path = os.path.join(root_dir, file_name)

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
                self.send_json(500, {"success": False, "error": str(e)})
                return

        self.send_response(404)
        self.end_headers()

    def send_json(self, status_code, data):
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json.dumps(data).encode("utf-8"))

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

def run():
    server_address = ("", PORT)
    httpd = HTTPServer(server_address, CompanionHandler)
    print(f"===========================================================")
    print(f" C++ Learning Platform Companion Server running at:")
    print(f" http://localhost:{PORT}")
    print(f" Real native C++ compilation (g++/clang++) & VS Code active.")
    print(f" Press Ctrl+C to stop.")
    print(f"===========================================================")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping companion server.")
        sys.exit(0)

if __name__ == "__main__":
    run()
