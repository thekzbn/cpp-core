// src/compiler/toolchain.js - Toolchain detection, system diagnostics, and 1-click setup actions
(function () {
  "use strict";

  var setupServerDot = document.getElementById("setupServerDot");
  var setupServerStatus = document.getElementById("setupServerStatus");
  var setupCompilerDot = document.getElementById("setupCompilerDot");
  var setupCompilerStatus = document.getElementById("setupCompilerStatus");
  var compilerActions = document.getElementById("compilerActions");
  var setupVscodeDot = document.getElementById("setupVscodeDot");
  var setupVscodeStatus = document.getElementById("setupVscodeStatus");
  var vscodeActions = document.getElementById("vscodeActions");
  var setupTerminalBox = document.getElementById("setupTerminalBox");
  var setupTerminalTitle = document.getElementById("setupTerminalTitle");
  var setupTerminalStatus = document.getElementById("setupTerminalStatus");
  var setupTerminalLog = document.getElementById("setupTerminalLog");
  var btnInstallPortableGcc = document.getElementById("btnInstallPortableGcc");
  var btnInstallLlvm = document.getElementById("btnInstallLlvm");
  var btnInstallVscode = document.getElementById("btnInstallVscode");

  var firstRunAppDialog = document.getElementById("firstRunAppDialog");
  var firstRunCompleteBtn = document.getElementById("firstRunCompleteBtn");
  var firstRunCompilerDot = document.getElementById("firstRunCompilerDot");
  var firstRunCompilerStatus = document.getElementById("firstRunCompilerStatus");
  var firstRunCompilerActions = document.getElementById("firstRunCompilerActions");
  var firstRunVscodeDot = document.getElementById("firstRunVscodeDot");
  var firstRunVscodeStatus = document.getElementById("firstRunVscodeStatus");
  var firstRunVscodeActions = document.getElementById("firstRunVscodeActions");
  var firstRunTerminalBox = document.getElementById("firstRunTerminalBox");
  var firstRunTerminalTitle = document.getElementById("firstRunTerminalTitle");
  var firstRunTerminalStatus = document.getElementById("firstRunTerminalStatus");
  var firstRunTerminalLog = document.getElementById("firstRunTerminalLog");
  var firstRunBtnInstallGcc = document.getElementById("firstRunBtnInstallGcc");
  var firstRunBtnInstallLlvm = document.getElementById("firstRunBtnInstallLlvm");
  var firstRunBtnInstallVscode = document.getElementById("firstRunBtnInstallVscode");

  async function checkCompanionServer() {
    var compilerBadge = document.getElementById("compilerBadge");
    try {
      var resp = await fetch(window.QuingApp.apiBase + "/api/system-status");
      if (resp.ok) {
        var data = await resp.json();

        // 1. Companion Server
        if (setupServerDot) setupServerDot.className = "status-indicator-dot connected";
        if (setupServerStatus) setupServerStatus.textContent = "Active on port " + (data.server.port || 8000);

        // 2. C++ Compiler
        if (data.compiler) {
          if (setupCompilerDot) setupCompilerDot.className = "status-indicator-dot connected";
          if (setupCompilerStatus) {
            setupCompilerStatus.textContent = (data.compiler.display || "Native C++") + " (" + (data.compiler.version || "") + ")";
          }
          if (compilerActions) compilerActions.style.display = "none";
          if (compilerBadge) {
            compilerBadge.textContent = data.compiler.display || "Native C++";
            compilerBadge.className = "compiler-badge mode-native";
          }
        } else {
          if (setupCompilerDot) setupCompilerDot.className = "status-indicator-dot standalone";
          if (setupCompilerStatus) {
            setupCompilerStatus.textContent = "No compiler found on system. Choose an option below:";
          }
          if (compilerActions) compilerActions.style.display = "flex";
          if (compilerBadge) {
            compilerBadge.textContent = "No Compiler";
            compilerBadge.className = "compiler-badge mode-warn";
          }
        }

        // 3. VS Code
        if (data.vscode && data.vscode.installed) {
          if (setupVscodeDot) setupVscodeDot.className = "status-indicator-dot connected";
          if (setupVscodeStatus) {
            setupVscodeStatus.textContent = "Installed (" + (data.vscode.version || "Ready") + ")";
          }
          if (vscodeActions) vscodeActions.style.display = "none";
        } else {
          if (setupVscodeDot) setupVscodeDot.className = "status-indicator-dot standalone";
          if (setupVscodeStatus) {
            setupVscodeStatus.textContent = "Not detected on system. Install with 1-click below:";
          }
          if (vscodeActions) vscodeActions.style.display = "flex";
        }

        return true;
      }
    } catch (e) {
      if (setupServerDot) setupServerDot.className = "status-indicator-dot standalone";
      if (setupServerStatus) setupServerStatus.textContent = "Companion Server Offline (Run Quing C++ Core.exe or 'node dev_server.js')";
      if (setupCompilerDot) setupCompilerDot.className = "status-indicator-dot standalone";
      if (setupCompilerStatus) setupCompilerStatus.textContent = "Companion server required for native compiler detection";
      if (compilerBadge) {
        compilerBadge.textContent = "Simulator";
        compilerBadge.className = "compiler-badge mode-sim";
      }
      return false;
    }
  }

  async function runSetupAction(actionName, title) {
    if (!setupTerminalBox || !setupTerminalLog) return;
    setupTerminalBox.classList.remove("hidden");
    setupTerminalTitle.textContent = title;
    setupTerminalStatus.textContent = "Running...";
    setupTerminalStatus.className = "terminal-status-running";
    setupTerminalLog.textContent = "Starting " + title + "...\n";

    try {
      var resp = await fetch(window.QuingApp.apiBase + "/api/setup/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: actionName })
      });

      if (!resp.ok) {
        setupTerminalLog.textContent += "\nError: Server returned HTTP " + resp.status;
        setupTerminalStatus.textContent = "Error";
        setupTerminalStatus.className = "terminal-status-idle";
        return;
      }

      var reader = resp.body.getReader();
      var decoder = new TextDecoder("utf-8");
      while (true) {
        var chunk = await reader.read();
        if (chunk.done) break;
        setupTerminalLog.textContent += decoder.decode(chunk.value, { stream: true });
        setupTerminalLog.scrollTop = setupTerminalLog.scrollHeight;
      }

      setupTerminalStatus.textContent = "Completed";
      setupTerminalStatus.className = "terminal-status-success";
      if (window.QuingApp.dialogs && window.QuingApp.dialogs.showToast) {
        window.QuingApp.dialogs.showToast(title + " finished.");
      }
      setTimeout(checkCompanionServer, 1000);
    } catch (err) {
      setupTerminalLog.textContent += "\nNetwork/Execution Error: " + err.message;
      setupTerminalStatus.textContent = "Error";
      setupTerminalStatus.className = "terminal-status-idle";
    }
  }

  async function checkFirstRunApp() {
    var urlParams = new URLSearchParams(window.location.search);
    var isApp = urlParams.get("app") === "1" || window.location.hash === "#app";
    var setupCompleted = localStorage.getItem("quing_app_setup_completed") === "true";

    if (!isApp || setupCompleted || !firstRunAppDialog) return;

    try {
      var resp = await fetch(window.QuingApp.apiBase + "/api/system-status");
      if (resp.ok) {
        var data = await resp.json();

        if (data.compiler) {
          if (firstRunCompilerDot) firstRunCompilerDot.className = "status-indicator-dot connected";
          if (firstRunCompilerStatus) {
            firstRunCompilerStatus.textContent = (data.compiler.display || "Native C++") + " (" + (data.compiler.version || "") + ")";
          }
          if (firstRunCompilerActions) firstRunCompilerActions.style.display = "none";
        } else {
          if (firstRunCompilerDot) firstRunCompilerDot.className = "status-indicator-dot standalone";
          if (firstRunCompilerStatus) firstRunCompilerStatus.textContent = "No compiler found on system";
          if (firstRunCompilerActions) firstRunCompilerActions.style.display = "flex";
        }

        if (data.vscode && data.vscode.installed) {
          if (firstRunVscodeDot) firstRunVscodeDot.className = "status-indicator-dot connected";
          if (firstRunVscodeStatus) firstRunVscodeStatus.textContent = "Installed (" + (data.vscode.version || "Ready") + ")";
          if (firstRunVscodeActions) firstRunVscodeActions.style.display = "none";
        } else {
          if (firstRunVscodeDot) firstRunVscodeDot.className = "status-indicator-dot standalone";
          if (firstRunVscodeStatus) firstRunVscodeStatus.textContent = "Not detected on system";
          if (firstRunVscodeActions) firstRunVscodeActions.style.display = "flex";
        }

        firstRunAppDialog.showModal();
      }
    } catch (e) {}
  }

  async function runFirstRunAction(actionName, title) {
    if (!firstRunTerminalBox || !firstRunTerminalLog) return;
    firstRunTerminalBox.classList.remove("hidden");
    firstRunTerminalTitle.textContent = title;
    firstRunTerminalStatus.textContent = "Running...";
    firstRunTerminalStatus.className = "terminal-status-running";
    firstRunTerminalLog.textContent = "Starting " + title + "...\n";

    try {
      var resp = await fetch(window.QuingApp.apiBase + "/api/setup/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: actionName })
      });

      var reader = resp.body.getReader();
      var decoder = new TextDecoder("utf-8");
      while (true) {
        var chunk = await reader.read();
        if (chunk.done) break;
        firstRunTerminalLog.textContent += decoder.decode(chunk.value, { stream: true });
        firstRunTerminalLog.scrollTop = firstRunTerminalLog.scrollHeight;
      }

      firstRunTerminalStatus.textContent = "Completed";
      firstRunTerminalStatus.className = "terminal-status-success";
      checkCompanionServer();
      var resp2 = await fetch(window.QuingApp.apiBase + "/api/system-status");
      if (resp2.ok) {
        var d2 = await resp2.json();
        if (d2.compiler && firstRunCompilerActions) {
          firstRunCompilerActions.style.display = "none";
          firstRunCompilerDot.className = "status-indicator-dot connected";
          firstRunCompilerStatus.textContent = (d2.compiler.display || "Native C++") + " (Ready)";
        }
        if (d2.vscode && d2.vscode.installed && firstRunVscodeActions) {
          firstRunVscodeActions.style.display = "none";
          firstRunVscodeDot.className = "status-indicator-dot connected";
          firstRunVscodeStatus.textContent = "Installed (Ready)";
        }
      }
    } catch (err) {
      firstRunTerminalLog.textContent += "\nError: " + err.message;
      firstRunTerminalStatus.textContent = "Error";
      firstRunTerminalStatus.className = "terminal-status-idle";
    }
  }

  function init() {
    if (btnInstallPortableGcc) {
      btnInstallPortableGcc.addEventListener("click", function () {
        runSetupAction("install-portable", "Portable GCC Toolchain Setup (~35MB)");
      });
    }

    if (btnInstallLlvm) {
      btnInstallLlvm.addEventListener("click", function () {
        runSetupAction("install-llvm", "LLVM Clang++ Setup (winget)");
      });
    }

    if (btnInstallVscode) {
      btnInstallVscode.addEventListener("click", function () {
        runSetupAction("install-vscode", "Visual Studio Code Setup (winget)");
      });
    }

    if (firstRunBtnInstallGcc) {
      firstRunBtnInstallGcc.addEventListener("click", function () {
        runFirstRunAction("install-portable", "Portable GCC Setup (~35MB)");
      });
    }

    if (firstRunBtnInstallLlvm) {
      firstRunBtnInstallLlvm.addEventListener("click", function () {
        runFirstRunAction("install-llvm", "LLVM Clang++ Setup (winget)");
      });
    }

    if (firstRunBtnInstallVscode) {
      firstRunBtnInstallVscode.addEventListener("click", function () {
        runFirstRunAction("install-vscode", "Visual Studio Code Setup (winget)");
      });
    }

    if (firstRunCompleteBtn) {
      firstRunCompleteBtn.addEventListener("click", function () {
        localStorage.setItem("quing_app_setup_completed", "true");
        firstRunAppDialog.close();
        if (window.QuingApp.dialogs && window.QuingApp.dialogs.showToast) {
          window.QuingApp.dialogs.showToast("Desktop setup complete. Welcome to C++ Core!");
        }
      });
    }
  }

  window.QuingApp = window.QuingApp || {};
  window.QuingApp.toolchain = {
    init: init,
    checkCompanionServer: checkCompanionServer,
    runSetupAction: runSetupAction,
    checkFirstRunApp: checkFirstRunApp
  };
})();
