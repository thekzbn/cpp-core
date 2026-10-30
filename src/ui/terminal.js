// src/ui/terminal.js - ANSI escape parser, execution runner, and interactive stream terminal
(function () {
  "use strict";

  var terminalStatus = document.getElementById("terminalStatus");
  var terminalOutput = document.getElementById("terminalOutput");
  var terminalInputForm = document.getElementById("terminalInputForm");
  var terminalInput = document.getElementById("terminalInput");
  var runCodeBtn = document.getElementById("runCodeBtn");
  var compilerBadge = document.getElementById("compilerBadge");
  var stdinInput = document.getElementById("stdinInput");
  var codeEditor = document.getElementById("codeEditor");

  var pendingTerminalInput = null;
  var interactiveOutput = "";

  function parseAnsiToHtml(rawText) {
    if (!rawText) return "";

    var text = rawText
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    text = text.replace(/(?:\x1b|\033)\[[0-9;]*[JjHh]/g, "");
    text = text.replace(/(?:\x1b|\033)\[1A/g, "");
    text = text.replace(/(?:\x1b|\033)\[2K/g, "");

    var openSpans = 0;
    var ansiRegex = /(?:\x1b|\033)\[([0-9;]+)m/g;

    var html = text.replace(ansiRegex, function (match, codeStr) {
      var codes = codeStr.split(";").map(Number);
      var styles = [];

      for (var i = 0; i < codes.length; i++) {
        var code = codes[i];
        if (code === 0) {
          var closing = "";
          while (openSpans > 0) {
            closing += "</span>";
            openSpans--;
          }
          return closing;
        } else if (code === 1) {
          styles.push("font-weight: 700");
        } else if (code === 3) {
          styles.push("font-style: italic");
        } else if (code === 4) {
          styles.push("text-decoration: underline");
        } else if (code === 7) {
          styles.push("filter: invert(1)");
        } else if (code >= 30 && code <= 37) {
          var stdColors = ["#1e1e1e", "#ff5555", "#50fa7b", "#f1fa8c", "#8be9fd", "#ff79c6", "#00ffff", "#f8f8f2"];
          styles.push("color: " + stdColors[code - 30]);
        } else if (code >= 40 && code <= 47) {
          var stdBg = ["#1e1e1e", "#ff5555", "#50fa7b", "#f1fa8c", "#8be9fd", "#ff79c6", "#00ffff", "#f8f8f2"];
          styles.push("background-color: " + stdBg[code - 40]);
        } else if (code >= 90 && code <= 97) {
          var brightColors = ["#6272a4", "#ff6e6e", "#69ff94", "#ffffa5", "#d6acff", "#ff92df", "#a4ffff", "#ffffff"];
          styles.push("color: " + brightColors[code - 90]);
        } else if (code >= 100 && code <= 107) {
          var brightBg = ["#6272a4", "#ff6e6e", "#69ff94", "#ffffa5", "#d6acff", "#ff92df", "#a4ffff", "#ffffff"];
          styles.push("background-color: " + brightBg[code - 100]);
        } else if (code === 38 && codes[i + 1] === 2 && i + 4 < codes.length) {
          var r = codes[i + 2], g = codes[i + 3], b = codes[i + 4];
          styles.push("color: rgb(" + r + ", " + g + ", " + b + ")");
          i += 4;
        } else if (code === 48 && codes[i + 1] === 2 && i + 4 < codes.length) {
          var br = codes[i + 2], bg = codes[i + 3], bb = codes[i + 4];
          styles.push("background-color: rgb(" + br + ", " + bg + ", " + bb + ")");
          i += 4;
        }
      }

      if (styles.length > 0) {
        openSpans++;
        return '<span style="' + styles.join("; ") + '">';
      }
      return "";
    });

    var closing = "";
    while (openSpans > 0) {
      closing += "</span>";
      openSpans--;
    }
    return html + closing;
  }

  function setTerminalOutput(text) {
    if (!terminalOutput) return;
    terminalOutput.innerHTML = parseAnsiToHtml(text);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  async function executeSimulator() {
    var source = codeEditor ? codeEditor.value : "";
    var stdin = stdinInput ? stdinInput.value : "";
    var needsInput = /(?:std::)?cin\s*>>|getline\s*\(\s*(?:std::)?cin/.test(source);

    if (terminalStatus) {
      terminalStatus.textContent = "Compiling & Running...";
      terminalStatus.className = "terminal-status-running";
    }
    if (runCodeBtn) runCodeBtn.disabled = true;
    if (terminalInputForm) terminalInputForm.hidden = true;
    interactiveOutput = "";

    try {
      var nativeRes = { serverOnline: false, compilerFound: false };
      var shouldUseInteractiveSimulator = needsInput && !stdin.trim();

      // Native execution is non-interactive. Use it when input was supplied in the stream.
      if (!shouldUseInteractiveSimulator) {
        nativeRes = await window.QuingApp.nativeRunner.run(source, stdin);
        if (nativeRes.serverOnline && nativeRes.compilerFound) {
          setTerminalOutput(nativeRes.output);
          if (terminalStatus) {
            terminalStatus.textContent = nativeRes.success ? "Success" : "Error";
            terminalStatus.className = nativeRes.success ? "terminal-status-success" : "terminal-status-idle";
          }
          if (compilerBadge) {
            compilerBadge.textContent = "Native " + nativeRes.compilerLabel;
            compilerBadge.className = "compiler-badge mode-native";
          }
          return;
        }
        if (nativeRes.serverOnline && !nativeRes.compilerFound && compilerBadge) {
          compilerBadge.textContent = "No Compiler on PATH";
          compilerBadge.className = "compiler-badge mode-warn";
        }
      }

      // 2. Browser Simulator fallback
      if (shouldUseInteractiveSimulator || (needsInput && (!nativeRes.serverOnline || !nativeRes.compilerFound))) {
        interactiveOutput = "[Mode: Browser Simulation | Interactive input]\n\n";
        setTerminalOutput(interactiveOutput);
        if (compilerBadge) {
          compilerBadge.textContent = "Simulator";
          compilerBadge.className = "compiler-badge mode-sim";
        }
        var startTime = performance.now();
        var res = await window.cppSimulator.runInteractive(source, stdin, {
          onOutput: function (text) {
            interactiveOutput += text;
            setTerminalOutput(interactiveOutput);
          },
          requestInput: function () {
            return new Promise(function (resolve) {
              pendingTerminalInput = resolve;
              if (terminalInputForm) terminalInputForm.hidden = false;
              if (terminalStatus) {
                terminalStatus.textContent = "Waiting for input";
                terminalStatus.className = "terminal-status-running";
              }
              if (terminalInput) terminalInput.focus();
            });
          }
        });

        if (terminalInputForm) terminalInputForm.hidden = true;
        if (res.success) {
          interactiveOutput +=
            "\n--------------------------------\nProcess finished with exit code 0 (" +
            (performance.now() - startTime).toFixed(2) +
            " ms)";
        } else {
          interactiveOutput +=
            "\nRuntime error: " + res.error + "\nProcess terminated with exit code 1.";
        }
        setTerminalOutput(interactiveOutput);
        if (terminalStatus) {
          terminalStatus.textContent = res.success ? "Success" : "Error";
          terminalStatus.className = res.success ? "terminal-status-success" : "terminal-status-idle";
        }
      } else {
        var runRes = shouldUseInteractiveSimulator
          ? await window.cppSimulator.runInteractive(source, stdin, {
              onOutput: function (text) {
                interactiveOutput += text;
                setTerminalOutput(interactiveOutput);
              },
              requestInput: function () {
                return new Promise(function (resolve) {
                  pendingTerminalInput = resolve;
                  if (terminalInputForm) terminalInputForm.hidden = false;
                  if (terminalStatus) {
                    terminalStatus.textContent = "Waiting for input";
                    terminalStatus.className = "terminal-status-running";
                  }
                  if (terminalInput) terminalInput.focus();
                });
              }
            })
          : await window.cppSimulator.runAsync(source, stdin);
        if (shouldUseInteractiveSimulator) {
          if (terminalInputForm) terminalInputForm.hidden = true;
          interactiveOutput += runRes.success
            ? "\n--------------------------------\nProcess finished with exit code 0"
            : "\nRuntime error: " + runRes.error + "\nProcess terminated with exit code 1.";
          setTerminalOutput(interactiveOutput);
          if (terminalStatus) {
            terminalStatus.textContent = runRes.success ? "Success" : "Error";
            terminalStatus.className = runRes.success ? "terminal-status-success" : "terminal-status-idle";
          }
          if (compilerBadge) {
            compilerBadge.textContent = "Simulator";
            compilerBadge.className = "compiler-badge mode-sim";
          }
          return;
        }
        setTerminalOutput(runRes.output);
        if (terminalStatus) {
          terminalStatus.textContent = runRes.success ? "Success" : "Error";
          terminalStatus.className = runRes.success ? "terminal-status-success" : "terminal-status-idle";
        }
        if (compilerBadge) {
          if (runRes.engine === "native") {
            compilerBadge.textContent = "Native " + (runRes.compiler || "GCC");
            compilerBadge.className = "compiler-badge mode-native";
          } else if (runRes.engine === "fallback-no-compiler") {
            compilerBadge.textContent = "No Compiler on PATH";
            compilerBadge.className = "compiler-badge mode-warn";
          } else {
            compilerBadge.textContent = "Simulator";
            compilerBadge.className = "compiler-badge mode-sim";
          }
        }
      }
    } catch (err) {
      setTerminalOutput("Execution Error:\n" + err.message);
      if (terminalStatus) {
        terminalStatus.textContent = "Error";
        terminalStatus.className = "terminal-status-idle";
      }
    } finally {
      if (runCodeBtn) runCodeBtn.disabled = false;
    }
  }

  function init() {
    if (runCodeBtn) {
      runCodeBtn.addEventListener("click", executeSimulator);
    }

    if (terminalInputForm) {
      terminalInputForm.addEventListener("submit", function (event) {
        event.preventDefault();
        if (!pendingTerminalInput) return;
        var answer = terminalInput.value;
        var resolveInput = pendingTerminalInput;
        pendingTerminalInput = null;
        interactiveOutput += "> " + answer + "\n";
        setTerminalOutput(interactiveOutput);
        terminalInput.value = "";
        terminalInputForm.hidden = true;
        if (terminalStatus) terminalStatus.textContent = "Running...";
        resolveInput(answer);
      });
    }

    if (compilerBadge) {
      compilerBadge.addEventListener("click", function () {
        var workspaceSettingsBtn = document.getElementById("workspaceSettingsBtn");
        if (workspaceSettingsBtn) workspaceSettingsBtn.click();
      });
    }
  }

  window.QuingApp = window.QuingApp || {};
  window.QuingApp.terminal = {
    init: init,
    parseAnsiToHtml: parseAnsiToHtml,
    setTerminalOutput: setTerminalOutput,
    executeSimulator: executeSimulator
  };
})();
