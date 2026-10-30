// dev_server.js - Companion Server using built-in Node.js modules
// Zero external dependencies. Provides static file serving, local C++ compilation/execution, and VS Code integration.

const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");
const { exec, spawn } = require("child_process");

const PORT = Number.parseInt(process.env.QUING_PORT, 10) || 8000;
const HOST = process.env.QUING_HOST || "127.0.0.1";
const WORKSPACE_DIR = __dirname;
const APP_VERSION = process.env.QUING_VERSION || (
  fs.existsSync(path.join(WORKSPACE_DIR, "VERSION"))
    ? fs.readFileSync(path.join(WORKSPACE_DIR, "VERSION"), "utf8").trim()
    : "dev"
);

const MAX_PAYLOAD_SIZE = 512 * 1024; // 512 KB
const MAX_OUTPUT_BUFFER = 512 * 1024; // 512 KB

// Validate whether Host header points strictly to loopback
function isLoopbackHost(hostHeader) {
  if (!hostHeader) return false;
  const hostWithoutPort = hostHeader.replace(/:\d+$/, "").toLowerCase();
  return hostWithoutPort === "localhost" || hostWithoutPort === "127.0.0.1" || hostWithoutPort === "[::1]";
}

// Validate whether Origin header is an allowed loopback origin
function isAllowedLoopbackOrigin(originHeader) {
  if (!originHeader) return false;
  try {
    const parsed = new URL(originHeader);
    const hostname = parsed.hostname.toLowerCase();
    const isLoopback = hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1" || hostname === "[::1]";
    return (parsed.protocol === "http:" || parsed.protocol === "https:") && isLoopback;
  } catch (_) {
    return false;
  }
}

// Safely stream and parse JSON request body with size cap
function readJsonBody(req, res, callback) {
  let body = "";
  let receivedBytes = 0;
  let exceeded = false;

  req.on("data", chunk => {
    receivedBytes += chunk.length;
    if (receivedBytes > MAX_PAYLOAD_SIZE && !exceeded) {
      exceeded = true;
      res.writeHead(413, {
        "Content-Type": "application/json",
        "Connection": "close"
      });
      res.end(JSON.stringify({ success: false, error: "Payload exceeds 512KB limit." }));
      req.resume();
      return;
    }
    if (!exceeded) {
      body += chunk;
    }
  });

  req.on("end", () => {
    if (exceeded) return;
    try {
      const data = JSON.parse(body || "{}");
      callback(null, data);
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: false, error: "Malformed JSON payload: " + err.message }));
    }
  });
}

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".cpp": "text/x-c++src; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2"
};

// Check if winget is available
function checkWinget(callback) {
  exec("winget --version", (err, stdout) => {
    callback(!err && stdout && stdout.trim().length > 0);
  });
}

// Detect VS Code installation
function detectVsCode(callback) {
  exec("code --version", (err, stdout) => {
    if (!err && stdout) {
      const line = stdout.trim().split("\n")[0];
      return callback({ installed: true, cmd: "code", version: line });
    }

    const candidatePaths = [
      path.join(process.env.LOCALAPPDATA || "", "Programs", "Microsoft VS Code", "bin", "code.cmd"),
      path.join(process.env.ProgramFiles || "C:\\Program Files", "Microsoft VS Code", "bin", "code.cmd"),
      path.join(process.env["ProgramFiles(x86)"] || "C:\\Program Files (x86)", "Microsoft VS Code", "bin", "code.cmd"),
      path.join(process.env.LOCALAPPDATA || "", "Programs", "Microsoft VS Code", "Code.exe")
    ];

    for (const p of candidatePaths) {
      if (fs.existsSync(p)) {
        return callback({ installed: true, cmd: `"${p}"`, path: p, version: "Installed (Local)" });
      }
    }
    callback({ installed: false, cmd: null, version: null });
  });
}

// Detect local C++ compiler (portable toolchain, g++, clang++, or system MinGW/MSYS2/LLVM)
function detectCompiler(callback) {
  // 1. Check local portable toolchain in project folder first (zero install)
  const localCandidates = [
    path.join(WORKSPACE_DIR, "toolchain", "w64devkit", "bin", "g++.exe"),
    path.join(WORKSPACE_DIR, "toolchain", "bin", "g++.exe"),
    path.join(WORKSPACE_DIR, "w64devkit", "bin", "g++.exe")
  ];

  for (const p of localCandidates) {
    if (fs.existsSync(p)) {
      try {
        const out = require("child_process").execSync(`"${p}" --version`, { encoding: "utf-8", timeout: 3000 });
        const line = out.trim().split("\n")[0];
        return callback({ name: `"${p}"`, display: "Portable GCC", version: line, path: p, isPortable: true });
      } catch (e) {}
    }
  }

  // 2. Check system PATH for g++
  exec("g++ --version", (err1, stdout1) => {
    if (!err1 && stdout1) {
      const line = stdout1.trim().split("\n")[0];
      return callback({ name: "g++", display: "System g++", version: line, isPortable: false });
    }

    // 3. Check system PATH for clang++
    exec("clang++ --version", (err2, stdout2) => {
      if (!err2 && stdout2) {
        const line = stdout2.trim().split("\n")[0];
        return callback({ name: "clang++", display: "System clang++", version: line, isPortable: false });
      }

      // 4. Check standard Windows LLVM / MinGW / MSYS2 installation locations
      const candidatePaths = [
        "C:\\Program Files\\LLVM\\bin\\clang++.exe",
        path.join(process.env.LOCALAPPDATA || "", "Programs", "LLVM", "bin", "clang++.exe"),
        "C:\\msys64\\ucrt64\\bin\\g++.exe",
        "C:\\msys64\\mingw64\\bin\\g++.exe",
        "C:\\MinGW\\bin\\g++.exe"
      ];

      for (const p of candidatePaths) {
        if (fs.existsSync(p)) {
          try {
            const out = require("child_process").execSync(`"${p}" --version`, { encoding: "utf-8", timeout: 3000 });
            const line = out.trim().split("\n")[0];
            const display = p.toLowerCase().includes("clang") ? "LLVM Clang++" : "MinGW-w64 GCC";
            return callback({ name: `"${p}"`, display: display, version: line, path: p, isPortable: false });
          } catch (e) {}
        }
      }

      callback(null);
    });
  });
}

const server = http.createServer((req, res) => {
  // 1. Host Header Validation (Prevent DNS rebinding)
  if (!isLoopbackHost(req.headers.host)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: false, error: "Bad Request: Invalid or foreign Host header." }));
    return;
  }

  const origin = req.headers.origin;
  const isLoopbackOrigin = isAllowedLoopbackOrigin(origin);

  // 2. Reject foreign or null origins on mutating / API calls
  if (origin && !isLoopbackOrigin) {
    res.writeHead(403, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: false, error: "Forbidden: Cross-origin request denied." }));
    return;
  }

  // 3. Set strict CORS headers only for allowed loopback origins
  if (origin && isLoopbackOrigin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  }

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  // API Endpoint: Simple Status Check (Legacy & fast)
  if (req.method === "GET" && req.url === "/api/status") {
    detectCompiler((compilerInfo) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({
        online: true,
        appVersion: APP_VERSION,
        compiler: compilerInfo ? compilerInfo.name : null,
        compilerDisplay: compilerInfo ? compilerInfo.display : null,
        compilerVersion: compilerInfo ? compilerInfo.version : null,
        isPortable: compilerInfo ? compilerInfo.isPortable : false
      }));
    });
    return;
  }

  // API Endpoint: Graceful Shutdown
  if (req.method === "POST" && req.url === "/api/shutdown") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: true, message: "Companion server shutting down." }));
    setTimeout(() => {
      process.exit(0);
    }, 500);
    return;
  }

  // API Endpoint: Full System Pipeline Status
  if (req.method === "GET" && req.url === "/api/system-status") {
    detectCompiler((compilerInfo) => {
      detectVsCode((vscodeInfo) => {
        checkWinget((wingetAvailable) => {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({
            server: { online: true, port: PORT },
            compiler: compilerInfo,
            vscode: vscodeInfo,
            winget: wingetAvailable
          }));
        });
      });
    });
    return;
  }

  // API Endpoint: Run Setup Actions (Streaming output with duplicate install protection)
  if (req.method === "POST" && req.url === "/api/setup/action") {
    readJsonBody(req, res, (err, payload) => {
      if (err) return;
      try {
        const action = payload.action;

        res.writeHead(200, {
          "Content-Type": "text/plain; charset=utf-8",
          "Transfer-Encoding": "chunked",
          "X-Content-Type-Options": "nosniff"
        });

        const sendLine = (line) => {
          try { res.write(line + "\n"); } catch (e) {}
        };

        if (action === "install-vscode") {
          detectVsCode((vscodeInfo) => {
            if (vscodeInfo.installed) {
              sendLine(`[Quing learn] Visual Studio Code is already installed on this system (${vscodeInfo.version || vscodeInfo.cmd}).`);
              sendLine("[SUCCESS] No installation needed.");
              res.end();
              return;
            }

            sendLine("[Quing learn] Initiating VS Code installation via winget...");
            sendLine("Command: winget install -e --id Microsoft.VisualStudioCode --accept-package-agreements --accept-source-agreements");
            
            const proc = spawn("winget", [
              "install", "-e", "--id", "Microsoft.VisualStudioCode",
              "--accept-package-agreements", "--accept-source-agreements"
            ], { shell: true });

            proc.stdout.on("data", d => sendLine(d.toString()));
            proc.stderr.on("data", d => sendLine(d.toString()));
            proc.on("close", code => {
              sendLine(`\n[Quing learn] Process finished with exit code ${code}.`);
              if (code === 0) {
                sendLine("[SUCCESS] Visual Studio Code installed successfully!");
              }
              res.end();
            });
          });
          return;
        }

        if (action === "install-llvm") {
          detectCompiler((compilerInfo) => {
            if (compilerInfo) {
              sendLine(`[Quing learn] C++ compiler is already available: ${compilerInfo.display} (${compilerInfo.version}).`);
              sendLine("[SUCCESS] No installation needed.");
              res.end();
              return;
            }

            sendLine("[Quing learn] Initiating LLVM Clang installation via winget...");
            sendLine("Command: winget install -e --id LLVM.LLVM --accept-package-agreements --accept-source-agreements");

            const proc = spawn("winget", [
              "install", "-e", "--id", "LLVM.LLVM",
              "--accept-package-agreements", "--accept-source-agreements"
            ], { shell: true });

            proc.stdout.on("data", d => sendLine(d.toString()));
            proc.stderr.on("data", d => sendLine(d.toString()));
            proc.on("close", code => {
              sendLine(`\n[Quing learn] Process finished with exit code ${code}.`);
              if (code === 0) {
                sendLine("[SUCCESS] LLVM Clang++ installed successfully!");
              }
              res.end();
            });
          });
          return;
        }

        if (action === "install-portable") {
          const toolchainDir = path.join(WORKSPACE_DIR, "toolchain");
          const existingGcc = path.join(toolchainDir, "w64devkit", "bin", "g++.exe");
          if (fs.existsSync(existingGcc)) {
            sendLine(`[Quing learn] Portable GCC is already present at ${existingGcc}.`);
            sendLine("[SUCCESS] No download needed.");
            res.end();
            return;
          }

          sendLine("[Quing learn] Setting up Portable GCC Toolchain (w64devkit)...");
          if (!fs.existsSync(toolchainDir)) {
            fs.mkdirSync(toolchainDir, { recursive: true });
          }
          const zipPath = path.join(toolchainDir, "w64devkit.zip");
          const downloadUrl = "https://github.com/skeeto/w64devkit/releases/download/v1.23.0/w64devkit-1.23.0.zip";

          sendLine(`1. Downloading portable GCC archive (~76MB uncompressed / ~35MB download)...`);
          sendLine(`Target: ${zipPath}`);

          // Use curl.exe built into Windows
          const curlProc = spawn("curl.exe", ["-L", "-#", "-o", zipPath, downloadUrl], { shell: true });
          curlProc.stdout.on("data", d => sendLine(d.toString()));
          curlProc.stderr.on("data", d => sendLine(d.toString()));

          curlProc.on("close", curlCode => {
            if (curlCode !== 0) {
              sendLine(`\n[ERROR] Download failed with code ${curlCode}.`);
              res.end();
              return;
            }

            sendLine(`\n2. Extracting toolchain archive using native tar...`);
            const tarProc = spawn("tar.exe", ["-xf", zipPath, "-C", toolchainDir], { shell: true });
            tarProc.stdout.on("data", d => sendLine(d.toString()));
            tarProc.stderr.on("data", d => sendLine(d.toString()));

            tarProc.on("close", tarCode => {
              // Delete zip to save disk space on potato PC
              try { if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath); } catch (e) {}

              if (tarCode === 0) {
                sendLine("\n3. Verifying portable compiler binary...");
                const gccBinary = path.join(toolchainDir, "w64devkit", "bin", "g++.exe");
                if (fs.existsSync(gccBinary)) {
                  sendLine(`[SUCCESS] Portable GCC is ready: ${gccBinary}`);
                } else {
                  sendLine(`[SUCCESS] Extraction completed to: ${toolchainDir}`);
                }
              } else {
                sendLine(`\n[WARNING] Extraction completed with code ${tarCode}`);
              }
              res.end();
            });
          });
          return;
        }

        sendLine(`[ERROR] Unknown action: ${action}`);
        res.end();
      } catch (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end(`Server Error: ${err.message}`);
      }
    });
    return;
  }

  // API Endpoint: Compile & Run C++ Locally
  if (req.method === "POST" && req.url === "/api/run-cpp") {
    readJsonBody(req, res, (err, payload) => {
      if (err) return;
      try {
        const code = payload.code || "";
        const stdinData = payload.stdin || "";

        if (!code.trim()) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: false, error: "No C++ source code provided." }));
          return;
        }

        detectCompiler((compilerInfo) => {
          if (!compilerInfo) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
              success: false,
              compilerFound: false,
              error: "No C++ compiler detected.\nPlease use the Setup Assistant in the Workspace menu to download the portable compiler (~35MB) or install LLVM."
            }));
            return;
          }

          const compiler = compilerInfo.name;
          const tempId = "cppcore_" + Date.now() + "_" + Math.floor(Math.random() * 10000);
          const tempBase = path.join(os.tmpdir(), tempId);
          const srcPath = tempBase + ".cpp";
          const exePath = tempBase + (process.platform === "win32" ? ".exe" : "");

          const cleanup = () => {
            try { if (fs.existsSync(srcPath)) fs.unlinkSync(srcPath); } catch (e) {}
            try { if (fs.existsSync(exePath)) fs.unlinkSync(exePath); } catch (e) {}
          };

          fs.writeFileSync(srcPath, code, "utf-8");

          const compileStart = Date.now();
          const compileCmd = `${compiler} -std=c++17 -Wall -O2 "${srcPath}" -o "${exePath}"`;

          exec(compileCmd, { timeout: 15000 }, (compileErr, compileStdout, compileStderr) => {
            if (compileErr) {
              cleanup();
              const fullError = (compileStderr || compileStdout || compileErr.message).trim();
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify({
                success: false,
                compilerFound: true,
                compiled: false,
                compiler: compilerInfo.name,
                compilerVersion: compilerInfo.version,
                output: fullError,
                exitCode: compileErr.code || 1
              }));
              return;
            }

            // Binary compiled successfully -> Execute with safety timeout and buffer limit
            const execStart = Date.now();
            const child = spawn(exePath, [], { windowsHide: true });
            let stdoutData = "";
            let stderrData = "";
            let timedOut = false;
            let outputTruncated = false;

            const terminateChild = () => {
              if (process.platform === "win32") {
                try { exec(`taskkill /pid ${child.pid} /T /F`, () => {}); } catch (_) {}
              }
              try { child.kill("SIGKILL"); } catch (_) {}
            };

            const watchdog = setTimeout(() => {
              timedOut = true;
              terminateChild();
            }, 8000);

            const formattedStdin = stdinData ? (stdinData.endsWith("\n") ? stdinData : stdinData + "\n") : "";
            if (formattedStdin) {
              try {
                child.stdin.write(formattedStdin);
              } catch (e) {}
            }
            try { child.stdin.end(); } catch (e) {}

            child.stdout.on("data", chunk => {
              if (stdoutData.length < MAX_OUTPUT_BUFFER) {
                const remaining = MAX_OUTPUT_BUFFER - stdoutData.length;
                stdoutData += chunk.toString("utf-8", 0, remaining);
                if (stdoutData.length >= MAX_OUTPUT_BUFFER && !outputTruncated) {
                  outputTruncated = true;
                  stdoutData += "\n[Output truncated: maximum 512KB buffer reached]";
                  terminateChild();
                }
              }
            });

            child.stderr.on("data", chunk => {
              if (stderrData.length < MAX_OUTPUT_BUFFER) {
                const remaining = MAX_OUTPUT_BUFFER - stderrData.length;
                stderrData += chunk.toString("utf-8", 0, remaining);
                if (stderrData.length >= MAX_OUTPUT_BUFFER && !outputTruncated) {
                  outputTruncated = true;
                  stderrData += "\n[Output truncated: maximum 512KB buffer reached]";
                  terminateChild();
                }
              }
            });

            child.on("close", (code) => {
              clearTimeout(watchdog);
              cleanup();
              const duration = Date.now() - execStart;
              let finalOutput = stdoutData;
              if (stderrData) {
                if (finalOutput && !finalOutput.endsWith("\n")) finalOutput += "\n";
                finalOutput += stderrData;
              }
              if (timedOut) {
                finalOutput += "\n[Process terminated: Execution exceeded safety limit (8s)]";
              }

              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify({
                success: !timedOut && (code === 0),
                compilerFound: true,
                compiled: true,
                compiler: compilerInfo.name,
                compilerVersion: compilerInfo.version,
                output: finalOutput,
                exitCode: timedOut ? 124 : (code ?? 0),
                durationMs: duration
              }));
            });

            child.on("error", (err) => {
              clearTimeout(watchdog);
              cleanup();
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify({
                success: false,
                compilerFound: true,
                compiled: true,
                compiler: compilerInfo.name,
                output: `Process execution error: ${err.message}`,
                exitCode: 1
              }));
            });
          });
        });
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // API Endpoint: Open in VS Code
  if (req.method === "POST" && req.url === "/api/open-vscode") {
    readJsonBody(req, res, (err, data) => {
      if (err) return;
      try {
        let rootDir = (data.rootDir || "").trim();
        const rawFileName = (data.fileName || "main.cpp").trim();
        const codeContent = data.code || "";

        // Enforce strict basename without path traversal sequences
        const fileName = path.basename(rawFileName);
        if (!fileName || fileName === "." || fileName === ".." || fileName !== rawFileName) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: false, error: "Invalid filename: path traversal sequences are not permitted." }));
          return;
        }

        if (!rootDir) {
          const homeDir = process.env.USERPROFILE || process.env.HOME || "C:\\";
          rootDir = path.join(homeDir, "cpp_projects");
        }

        const resolvedRoot = path.resolve(rootDir);
        const targetPath = path.resolve(resolvedRoot, fileName);

        // Strict containment check: targetPath must reside directly within resolvedRoot
        const expectedDir = path.dirname(targetPath);
        if (expectedDir !== resolvedRoot) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: false, error: "Target file path is outside the designated root directory." }));
          return;
        }

        // Ensure target directory exists
        fs.mkdirSync(resolvedRoot, { recursive: true });

        // Write source file to disk
        fs.writeFileSync(targetPath, codeContent, "utf-8");

        // Launch VS Code using detected command or system fallback
        detectVsCode((vscodeInfo) => {
          const cmd = vscodeInfo.cmd || "code";
          exec(`${cmd} "${targetPath}"`, (err) => {
            const vscodeLaunched = !err;
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
              success: true,
              targetPath: targetPath,
              vscodeLaunched: vscodeLaunched,
              message: vscodeLaunched
                ? `Saved to ${targetPath} and opened in VS Code.`
                : `Saved to ${targetPath}, but VS Code could not be launched automatically.`
            }));
          });
        });
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // Static File Serving with strict path containment
  let reqPath = req.url.split("?")[0];
  if (reqPath === "/") reqPath = "/index.html";

  const normalizedWorkspace = path.resolve(WORKSPACE_DIR);
  const safePath = path.resolve(WORKSPACE_DIR, "." + reqPath);
  if (!safePath.startsWith(normalizedWorkspace + path.sep) && safePath !== normalizedWorkspace) {
    res.writeHead(403, { "Content-Type": "text/plain" });
    res.end("Forbidden");
    return;
  }

  fs.stat(safePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404);
      res.end("Not Found");
      return;
    }

    const ext = path.extname(safePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    res.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "Pragma": "no-cache",
      "Expires": "0"
    });
    fs.createReadStream(safePath).pipe(res);
  });
});

server.listen(PORT, HOST, () => {
  console.log("===========================================================");
  console.log(` Quing learn (learn.quing) — C++ Core Companion Server`);
  console.log(` http://${HOST}:${PORT}`);
  console.log(` Native C++ compilation & VS Code sync active.`);
  console.log(` Bound securely to loopback (${HOST}).`);
  console.log(` Press Ctrl+C to stop.`);
  console.log("===========================================================");
});
