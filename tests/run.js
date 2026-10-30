// tests/run.js - Master test suite entrypoint for Quing learn (C++ Core)
// Zero external dependencies. Runs on standard Node.js runtime.

console.log("Running C++ Core automated verification suite...\n");
require("./test_server_security.js");
require("./test_curriculum.js");
require("./test_manifest.js");
