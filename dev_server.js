// dev_server.js - Companion Server using built-in Node.js modules
// Zero external dependencies. Provides static file serving, local C++ compilation/execution, and VS Code integration.

const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");
const { exec, spawn } = require("child_process");

const PORT = 8000;
const WORKSPACE_DIR = __dirname;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".cpp": "text/x-c++src; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml"
};

// Detect local C++ compiler (g++, clang++, cl, or MSYS2 default installations)
function detectCompiler(callback) {
  exec("g++ --version", (err1, stdout1) => {
    if (!err1 && stdout1) {
      const line = stdout1.trim().split("\n")[0];
      return callback({ name: "g++", version: line });
    }
    exec("clang++ --version", (err2, stdout2) => {
      if (!err2 && stdout2) {
        const line = stdout2.trim().split("\n")[0];
        return callback({ name: "clang++", version: line });
      }
      // Check standard Windows MinGW / MSYS2 paths if not on user PATH
      const candidatePaths = [
        "C:\\msys64\\ucrt64\\bin\\g++.exe",
        "C:\\msys64\\mingw64\\bin\\g++.exe",
        "C:\\MinGW\\bin\\g++.exe"
      ];
      for (const p of candidatePaths) {
        if (fs.existsSync(p)) {
          try {
            const out = require("child_process").execSync(`"${p}" --version`, { encoding: "utf-8", timeout: 3000 });
            const line = out.trim().split("\n")[0];
            return callback({ name: `"${p}"`, version: line });
          } catch (e) {}
        }
      }
      callback(null);
    });
  });
}

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  // API Endpoint: Server & Compiler Status
  if (req.method === "GET" && req.url === "/api/status") {
    detectCompiler((compilerInfo) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({
        online: true,
        compiler: compilerInfo ? compilerInfo.name : null,
        compilerVersion: compilerInfo ? compilerInfo.version : null
      }));
    });
    return;
  }

  // API Endpoint: Compile & Run C++ Locally
  if (req.method === "POST" && req.url === "/api/run-cpp") {
    let body = "";
    req.on("data", chunk => { body += chunk; });
    req.on("end", () => {
      try {
        const payload = JSON.parse(body || "{}");
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
              error: "No C++ compiler (g++ or clang++) detected on system PATH.\nPlease install MinGW-w64 or Clang to compile and run natively on this machine."
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

            // Binary compiled successfully -> Execute with safety timeout
            const execStart = Date.now();
            let stdoutBuf = "";
            let stderrBuf = "";
            let timedOut = false;

            const child = spawn(exePath, [], {
              stdio: ["pipe", "pipe", "pipe"],
              windowsHide: true
            });

            const timer = setTimeout(() => {
              timedOut = true;
              try { child.kill("SIGKILL"); } catch (e) {}
            }, 8000);

            child.stdout.on("data", chunk => { stdoutBuf += chunk.toString("utf-8"); });
            child.stderr.on("data", chunk => { stderrBuf += chunk.toString("utf-8"); });

            if (stdinData) {
              try {
                child.stdin.write(stdinData);
                if (!stdinData.endsWith("\n")) child.stdin.write("\n");
                child.stdin.end();
              } catch (e) {}
            } else {
              try { child.stdin.end(); } catch (e) {}
            }

            child.on("close", (code, signal) => {
              clearTimeout(timer);
              cleanup();

              const duration = Date.now() - execStart;
              let finalOutput = stdoutBuf;

              if (stderrBuf) {
                if (finalOutput && !finalOutput.endsWith("\n")) finalOutput += "\n";
                finalOutput += stderrBuf;
              }

              if (timedOut) {
                finalOutput += "\n[Execution terminated: Process timed out after 8 seconds (check for infinite loops)].";
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
              clearTimeout(timer);
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
    let body = "";
    req.on("data", chunk => { body += chunk; });
    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        let rootDir = (data.rootDir || "").trim();
        const fileName = (data.fileName || "main.cpp").trim();
        const codeContent = data.code || "";

        if (!rootDir) {
          const homeDir = process.env.USERPROFILE || process.env.HOME || "C:\\";
          rootDir = path.join(homeDir, "cpp_projects");
        }

        // Ensure target directory exists
        fs.mkdirSync(rootDir, { recursive: true });
        const targetPath = path.join(rootDir, fileName);

        // Write source file to disk
        fs.writeFileSync(targetPath, codeContent, "utf-8");

        // Launch VS Code
        exec(`code "${targetPath}"`, (err) => {
          const vscodeLaunched = !err;
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({
            success: true,
            targetPath: targetPath,
            vscodeLaunched: vscodeLaunched,
            message: `Created ${targetPath} and opened in VS Code.`
          }));
        });
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // Static File Serving
  let reqPath = req.url.split("?")[0];
  if (reqPath === "/") reqPath = "/index.html";

  const safePath = path.normalize(path.join(WORKSPACE_DIR, reqPath));
  if (!safePath.startsWith(WORKSPACE_DIR)) {
    res.writeHead(403);
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

    res.writeHead(200, { "Content-Type": contentType });
    fs.createReadStream(safePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log("===========================================================");
  console.log(` Quing learn (learn.quing) — C++ Core Companion Server`);
  console.log(` http://localhost:${PORT}`);
  console.log(` Native C++ compilation (g++/clang++) & VS Code sync active.`);
  console.log(` Press Ctrl+C to stop.`);
  console.log("===========================================================");
});
