// src/ui/dialogs.js - Settings modal, folder picker, VS Code integration, file downloads, and mobile drawer
(function () {
  "use strict";

  var workspaceSettingsBtn = document.getElementById("workspaceSettingsBtn");
  var workspaceDialog = document.getElementById("workspaceDialog");
  var closeDialogBtn = document.getElementById("closeDialogBtn");
  var workspaceRootInput = document.getElementById("workspaceRootInput");
  var saveWorkspaceBtn = document.getElementById("saveWorkspaceBtn");
  var currentRootDisplay = document.getElementById("currentRootDisplay");
  var pickFolderBtn = document.getElementById("pickFolderBtn");
  var pickFolderBtnText = document.getElementById("pickFolderBtnText");
  var openVsCodeBtn = document.getElementById("openVsCodeBtn");
  var downloadCppBtn = document.getElementById("downloadCppBtn");
  var vscodeStatusToast = document.getElementById("vscodeStatusToast");
  var codeEditor = document.getElementById("codeEditor");

  var mobileSettingsBtn = document.getElementById("mobileSettingsBtn");
  var mobileSettingsDialog = document.getElementById("mobileSettingsDialog");
  var closeMobileSettingsBtn = document.getElementById("closeMobileSettingsBtn");
  var mobileThemeToggleBtn = document.getElementById("mobileThemeToggleBtn");
  var mobileThemeLabel = document.getElementById("mobileThemeLabel");
  var mobileColorPickerStrip = document.getElementById("mobileColorPickerStrip");
  var mobileReadingFontToggleBtn = document.getElementById("mobileReadingFontToggleBtn");
  var mobileReadingFontLabel = document.getElementById("mobileReadingFontLabel");
  var mobileWorkspaceBtn = document.getElementById("mobileWorkspaceBtn");

  var toastTimeout = null;

  function showToast(msg) {
    if (!vscodeStatusToast) return;
    vscodeStatusToast.textContent = msg;
    vscodeStatusToast.classList.remove("hidden");
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(function () {
      vscodeStatusToast.classList.add("hidden");
    }, 7000);
  }

  function downloadFile(filename, text) {
    var blob = new Blob([text], { type: "text/x-c++src;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function init() {
    var storage = window.QuingApp.storage;
    var theme = window.QuingApp.theme;

    if (workspaceRootInput) workspaceRootInput.value = storage.workspaceRoot;
    if (currentRootDisplay) currentRootDisplay.textContent = storage.workspaceRoot;

    if (pickFolderBtn) {
      pickFolderBtn.addEventListener("click", async function () {
        if (!("showDirectoryPicker" in window)) {
          alert(
            "Your browser does not support the File System Access API. Run 'node dev_server.js' in your terminal for direct disk writing."
          );
          return;
        }
        try {
          var handle = await window.showDirectoryPicker({ mode: "readwrite" });
          storage.directoryHandle = handle;
          storage.setWorkspaceRoot(handle.name);
          if (currentRootDisplay) currentRootDisplay.textContent = handle.name + " (Directly Linked)";
          if (pickFolderBtnText) pickFolderBtnText.textContent = "Linked: " + handle.name + " ✓";
          showToast('Linked directly to folder "' + handle.name + '". Files will now write directly inside!');
        } catch (err) {
          if (err.name !== "AbortError") {
            console.error(err);
            showToast("Could not link folder: " + err.message);
          }
        }
      });
    }

    if (workspaceSettingsBtn && workspaceDialog) {
      workspaceSettingsBtn.addEventListener("click", function () {
        if (workspaceRootInput) workspaceRootInput.value = storage.workspaceRoot;
        if (window.QuingApp.toolchain && window.QuingApp.toolchain.checkCompanionServer) {
          window.QuingApp.toolchain.checkCompanionServer();
        }
        workspaceDialog.showModal();
      });
    }

    if (closeDialogBtn && workspaceDialog) {
      closeDialogBtn.addEventListener("click", function () {
        workspaceDialog.close();
      });
    }

    if (saveWorkspaceBtn) {
      saveWorkspaceBtn.addEventListener("click", function () {
        var val = workspaceRootInput ? workspaceRootInput.value.trim() : "";
        if (val) {
          storage.setWorkspaceRoot(val);
          if (currentRootDisplay) currentRootDisplay.textContent = val;
          showToast("Saved root folder: " + val);
          if (workspaceDialog) workspaceDialog.close();
        }
      });
    }

    if (openVsCodeBtn) {
      openVsCodeBtn.addEventListener("click", async function () {
        var currentLessonIndex = storage.currentLessonIndex;
        if (typeof LESSONS_DATA === "undefined" || !LESSONS_DATA[currentLessonIndex]) return;
        var lesson = LESSONS_DATA[currentLessonIndex];
        var fileName = lesson.fileSlug + ".cpp";
        var code = codeEditor ? codeEditor.value : lesson.starterCode;

        showToast("Opening " + fileName + " in VS Code...");

        // 1. Try companion server API first
        try {
          var resp = await fetch(window.QuingApp.apiBase + "/api/open-vscode", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              rootDir: storage.workspaceRoot,
              fileName: fileName,
              code: code
            })
          });

          if (resp.ok) {
            var data = await resp.json();
            showToast("Saved " + data.targetPath + " and opened in VS Code.");
            return;
          }
        } catch (err) {
          // Companion server not running, fallback to browser methods
        }

        // 2. Direct File System API
        var wroteDirectly = false;
        if (storage.directoryHandle) {
          try {
            var fileHandle = await storage.directoryHandle.getFileHandle(fileName, { create: true });
            var writable = await fileHandle.createWritable();
            await writable.write(code);
            await writable.close();
            wroteDirectly = true;
          } catch (e) {
            console.warn("Could not write via directory handle:", e);
          }
        }

        // 3. Trigger VS Code URI protocol handler
        var cleanRoot = storage.workspaceRoot.replace(/\\/g, "/");
        var formattedPath = cleanRoot.startsWith("/") ? cleanRoot : "/" + cleanRoot;
        var uri = "vscode://file" + formattedPath + "/" + fileName;

        window.location.href = uri;

        if (wroteDirectly) {
          showToast("Saved " + fileName + " directly into your linked folder and triggered VS Code!");
        } else {
          showToast(
            "Triggered VS Code protocol: " +
              uri +
              ". (Tip: Click 'Workspace' -> 'Browse & Link Folder' to save files directly to disk without Downloads)."
          );
        }
      });
    }

    if (downloadCppBtn) {
      downloadCppBtn.addEventListener("click", function () {
        var currentLessonIndex = storage.currentLessonIndex;
        if (typeof LESSONS_DATA === "undefined" || !LESSONS_DATA[currentLessonIndex]) return;
        var lesson = LESSONS_DATA[currentLessonIndex];
        var code = codeEditor ? codeEditor.value : lesson.starterCode;
        downloadFile(lesson.fileSlug + ".cpp", code);
        showToast("Exported " + lesson.fileSlug + ".cpp to your Downloads folder.");
      });
    }

    // Mobile Drawer Setup
    if (mobileSettingsBtn && mobileSettingsDialog) {
      mobileSettingsBtn.addEventListener("click", function () {
        if (mobileThemeLabel) {
          mobileThemeLabel.textContent =
            theme.activeTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";
        }
        if (mobileReadingFontLabel) {
          mobileReadingFontLabel.textContent =
            theme.readingFont === "serif"
              ? "Article Font: Serif (Merriweather)"
              : "Article Font: Sans (Inter)";
        }
        if (mobileColorPickerStrip) {
          var swatches = mobileColorPickerStrip.querySelectorAll(".color-swatch-btn");
          swatches.forEach(function (btn) {
            if (btn.getAttribute("data-color") === theme.activeAccent) {
              btn.classList.add("active");
            } else {
              btn.classList.remove("active");
            }
          });
        }
        mobileSettingsDialog.showModal();
      });

      if (closeMobileSettingsBtn) {
        closeMobileSettingsBtn.addEventListener("click", function () {
          mobileSettingsDialog.close();
        });
      }

      if (mobileThemeToggleBtn) {
        mobileThemeToggleBtn.addEventListener("click", function () {
          var nextTheme = theme.activeTheme === "dark" ? "light" : "dark";
          theme.applyTheme(nextTheme);
          if (mobileThemeLabel) {
            mobileThemeLabel.textContent =
              nextTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";
          }
        });
      }

      if (mobileReadingFontToggleBtn) {
        mobileReadingFontToggleBtn.addEventListener("click", function () {
          var nextFont = theme.readingFont === "serif" ? "sans" : "serif";
          theme.applyReadingFont(nextFont);
          if (mobileReadingFontLabel) {
            mobileReadingFontLabel.textContent =
              nextFont === "serif"
                ? "Article Font: Serif (Merriweather)"
                : "Article Font: Sans (Inter)";
          }
        });
      }

      if (mobileColorPickerStrip) {
        mobileColorPickerStrip.addEventListener("click", function (e) {
          var btn = e.target.closest(".color-swatch-btn");
          if (!btn) return;
          var color = btn.getAttribute("data-color");
          theme.applyAccent(color);
        });
      }

      if (mobileWorkspaceBtn) {
        mobileWorkspaceBtn.addEventListener("click", function () {
          mobileSettingsDialog.close();
          if (workspaceSettingsBtn) workspaceSettingsBtn.click();
        });
      }
    }
  }

  window.QuingApp = window.QuingApp || {};
  window.QuingApp.dialogs = {
    init: init,
    showToast: showToast,
    downloadFile: downloadFile
  };
})();
