// tests/test_server_security.js - Zero-dependency security test suite for Companion Servers
const http = require("http");
const { spawn } = require("child_process");
const path = require("path");
const assert = require("assert");

const TEST_HOST = "127.0.0.1";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function makeRequest(options, postData = null) {
  if (postData) {
    options.headers = options.headers || {};
    if (!options.headers["Content-Length"]) {
      options.headers["Content-Length"] = Buffer.byteLength(postData);
    }
  }
  return new Promise((resolve, reject) => {
    let resolved = false;
    const req = http.request(options, res => {
      let data = "";
      res.on("data", chunk => { data += chunk; });
      res.on("end", () => {
        if (!resolved) {
          resolved = true;
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: data
          });
        }
      });
    });

    req.on("error", err => {
      if (!resolved) {
        resolved = true;
        reject(err);
      }
    });

    if (postData) {
      try {
        req.write(postData);
      } catch (_) {}
    }
    try {
      req.end();
    } catch (_) {}
  });
}

async function testServer(serverCommand, serverArgs, serverName, testPort) {
  console.log(`\n==================================================`);
  console.log(` Testing Security: ${serverName} (Port ${testPort})`);
  console.log(`==================================================`);

  const serverProc = spawn(serverCommand, serverArgs, {
    cwd: path.join(__dirname, ".."),
    env: Object.assign({}, process.env, {
      QUING_PORT: String(testPort),
      QUING_HOST: TEST_HOST
    }),
    stdio: ["ignore", "pipe", "pipe"]
  });

  serverProc.stderr.on("data", d => {
    console.error(`[${serverName} stderr] ${d.toString().trim()}`);
  });

  // Wait for server readiness
  let online = false;
  for (let i = 0; i < 25; i++) {
    await sleep(200);
    try {
      const res = await makeRequest({
        host: TEST_HOST,
        port: testPort,
        path: "/api/status",
        method: "GET",
        headers: { Host: `localhost:${testPort}` }
      });
      if (res.statusCode === 200) {
        online = true;
        break;
      }
    } catch (_) {}
  }

  assert.strictEqual(online, true, `${serverName} failed to start on ${TEST_HOST}:${testPort}`);
  console.log(`[PASS] ${serverName} started and bound to loopback (${TEST_HOST}).`);

  try {
    // Test 1: Reject Foreign / Malicious Origin on POST
    console.log("[Test 1] Testing rejection of foreign Origin on /api/run-cpp...");
    const foreignRes = await makeRequest({
      host: TEST_HOST,
      port: testPort,
      path: "/api/run-cpp",
      method: "POST",
      headers: {
        Host: `localhost:${testPort}`,
        Origin: "https://malicious-site.example.com",
        "Content-Type": "application/json"
      }
    }, JSON.stringify({ code: "int main() {}" }));

    assert.strictEqual(foreignRes.statusCode, 403, "Foreign origin should be rejected with 403 Forbidden");
    console.log("[PASS] Foreign Origin rejected with 403 Forbidden.");

    // Test 2: Reject Origin: null (Sandboxed iframe attack protection)
    console.log("[Test 2] Testing rejection of Origin: null on /api/run-cpp...");
    const nullOriginRes = await makeRequest({
      host: TEST_HOST,
      port: testPort,
      path: "/api/run-cpp",
      method: "POST",
      headers: {
        Host: `localhost:${testPort}`,
        Origin: "null",
        "Content-Type": "application/json"
      }
    }, JSON.stringify({ code: "int main() {}" }));

    assert.strictEqual(nullOriginRes.statusCode, 403, "Origin: null must be rejected with 403 Forbidden");
    console.log("[PASS] Origin: null rejected with 403 Forbidden.");

    // Test 3: Reject Foreign / Invalid Host header (DNS Rebinding protection)
    console.log("[Test 3] Testing rejection of foreign Host header...");
    const foreignHostRes = await makeRequest({
      host: TEST_HOST,
      port: testPort,
      path: "/api/status",
      method: "GET",
      headers: {
        Host: "attacker-domain.com"
      }
    });

    assert.strictEqual(foreignHostRes.statusCode, 400, "Foreign Host header must be rejected with 400 Bad Request");
    console.log("[PASS] Foreign Host header rejected with 400 Bad Request.");

    // Test 4: Accept Valid Loopback Origin
    console.log("[Test 4] Testing acceptance of valid loopback Origin...");
    const validOriginRes = await makeRequest({
      host: TEST_HOST,
      port: testPort,
      path: "/api/run-cpp",
      method: "POST",
      headers: {
        Host: `localhost:${testPort}`,
        Origin: `http://localhost:${testPort}`,
        "Content-Type": "application/json"
      }
    }, JSON.stringify({ code: '#include <iostream>\nint main() { std::cout << "SECURE_OK"; return 0; }' }));

    assert.strictEqual(validOriginRes.statusCode, 200, "Valid loopback origin should receive 200 OK");
    assert.strictEqual(validOriginRes.headers["access-control-allow-origin"], `http://localhost:${testPort}`);
    console.log("[PASS] Valid loopback Origin accepted with exact CORS reflection.");

    // Test 5: Reject Oversized Body (> 512KB)
    console.log("[Test 5] Testing rejection of oversized request payload (> 512KB)...");
    const oversizedPayload = JSON.stringify({ code: "x".repeat(600 * 1024) });
    let payloadBlocked = false;
    try {
      const payloadRes = await makeRequest({
        host: TEST_HOST,
        port: testPort,
        path: "/api/run-cpp",
        method: "POST",
        headers: {
          Host: `localhost:${testPort}`,
          Origin: `http://localhost:${testPort}`,
          "Content-Type": "application/json"
        }
      }, oversizedPayload);

      if (payloadRes.statusCode === 413) {
        payloadBlocked = true;
      }
    } catch (err) {
      // Server dropped connection upon detecting oversized payload
      if (err.code === "ECONNRESET" || err.code === "EPIPE") {
        payloadBlocked = true;
      } else {
        throw err;
      }
    }

    assert.strictEqual(payloadBlocked, true, "Oversized payload must be rejected or closed with 413");
    console.log("[PASS] Oversized payload blocked successfully.");

    // Test 6: Path Traversal Protection in /api/open-vscode
    console.log("[Test 6] Testing path traversal rejection in /api/open-vscode...");
    const traversalRes = await makeRequest({
      host: TEST_HOST,
      port: testPort,
      path: "/api/open-vscode",
      method: "POST",
      headers: {
        Host: `localhost:${testPort}`,
        Origin: `http://localhost:${testPort}`,
        "Content-Type": "application/json"
      }
    }, JSON.stringify({
      rootDir: path.join(__dirname, "temp_workspace"),
      fileName: "../../escaped.txt",
      code: "evil"
    }));

    assert.strictEqual(traversalRes.statusCode, 400, "Path traversal sequence in filename must be rejected with 400");
    console.log("[PASS] Path traversal in /api/open-vscode rejected with 400 Bad Request.");

    // Test 7: Static file path traversal protection
    console.log("[Test 7] Testing static file path traversal rejection...");
    const staticTraversalRes = await makeRequest({
      host: TEST_HOST,
      port: testPort,
      path: "/../../Windows/win.ini",
      method: "GET",
      headers: {
        Host: `localhost:${testPort}`
      }
    });

    assert.strictEqual(staticTraversalRes.statusCode, 403, "Static file path traversal must be rejected with 403");
    console.log("[PASS] Static file traversal rejected with 403 Forbidden.");

    console.log(`[SUMMARY] ${serverName}: ALL 7 SECURITY TESTS PASSED!`);
  } finally {
    try {
      await makeRequest({
        host: TEST_HOST,
        port: testPort,
        path: "/api/shutdown",
        method: "POST",
        headers: {
          Host: `localhost:${testPort}`,
          Origin: `http://localhost:${testPort}`
        }
      });
    } catch (_) {}
    serverProc.kill("SIGKILL");
    await sleep(300);
  }
}

async function runAll() {
  const nodeServer = path.join(__dirname, "..", "dev_server.js");
  const pyServer = path.join(__dirname, "..", "dev_server.py");

  // Test Node.js Companion Server
  await testServer(process.execPath, [nodeServer], "Node.js dev_server.js", 8991);

  // Test Python Companion Server
  await testServer("python", [pyServer], "Python dev_server.py", 8992);

  console.log("\n==================================================");
  console.log(" BOTH COMPANION SERVERS PASSED FULL SECURITY AUDIT!");
  console.log("==================================================");
}

runAll().catch(err => {
  console.error("\n[FATAL] Test Suite Failure:", err);
  process.exit(1);
});
