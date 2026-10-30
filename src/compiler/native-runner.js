// src/compiler/native-runner.js - Direct execution via local companion server and GCC/Clang
(function () {
  "use strict";

  async function runNative(source, stdin) {
    var result = {
      serverOnline: false,
      compilerFound: false,
      compiled: false,
      success: false,
      exitCode: null,
      durationMs: null,
      compilerLabel: "GCC",
      output: "",
      raw: null
    };

    try {
      var signal =
        typeof AbortSignal !== "undefined" && typeof AbortSignal.timeout === "function"
          ? AbortSignal.timeout(20000)
          : undefined;

      var resp = await fetch("http://localhost:8000/api/run-cpp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: source, stdin: stdin || "" }),
        signal: signal
      });

      if (!resp.ok) {
        return result;
      }

      var data = await resp.json();
      result.serverOnline = true;
      result.raw = data;

      if (!data.compilerFound) {
        return result;
      }

      result.compilerFound = true;
      result.compiled = !!data.compiled;
      result.success = !!data.success;
      result.exitCode = data.exitCode ?? 0;
      result.durationMs = data.durationMs;

      var label = data.compiler
        ? data.compiler.replace(/^"(.+)"$/, "$1").split(/[\/\\]/).pop().replace(/\.exe$/i, "")
        : "GCC";
      result.compilerLabel = label;

      var duration = data.durationMs != null ? " (" + data.durationMs + " ms)" : "";
      var text = data.output || "";

      if (!data.compiled) {
        result.output =
          "Compilation error (" +
          label +
          "):\n" +
          text +
          "\n\n--------------------------------\nProcess terminated with exit code " +
          (data.exitCode ?? 1) +
          ".";
      } else {
        if (!text.endsWith("\n") && text.length > 0) text += "\n";
        if (data.exitCode === 124) {
          text += "[Process terminated: Execution exceeded safety limit (8s)]\n";
        }
        text +=
          "\n--------------------------------\nProcess finished with exit code " +
          (data.exitCode ?? 0) +
          duration;
        result.output = text;
      }

      return result;
    } catch (_) {
      // Server offline
      return result;
    }
  }

  window.QuingApp = window.QuingApp || {};
  window.QuingApp.nativeRunner = {
    run: runNative
  };
})();
