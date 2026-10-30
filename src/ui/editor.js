// src/ui/editor.js - Code editor, gutter line numbers, keyboard shortcuts, and code copying
(function () {
  "use strict";

  var codeEditor = document.getElementById("codeEditor");
  var editorGutter = document.getElementById("editorGutter");
  var resetCodeBtn = document.getElementById("resetCodeBtn");
  var copyCodeBtn = document.getElementById("copyCodeBtn");

  function updateGutter() {
    if (!editorGutter || !codeEditor) return;
    var lineCount = codeEditor.value.split("\n").length;
    var existing = editorGutter.children.length;
    if (existing < lineCount) {
      for (var i = existing + 1; i <= lineCount; i++) {
        var span = document.createElement("span");
        span.textContent = i;
        editorGutter.appendChild(span);
      }
    } else if (existing > lineCount) {
      while (editorGutter.children.length > lineCount) {
        editorGutter.removeChild(editorGutter.lastChild);
      }
    }
    editorGutter.style.height = getComputedStyle(codeEditor).height;
    editorGutter.scrollTop = codeEditor.scrollTop;
  }

  function addLineNumbersToCodeBlocks(container) {
    if (!container) return;
    container.querySelectorAll("pre code").forEach(function (block) {
      if (block.dataset.numbered) return;
      block.dataset.numbered = "true";
      var rawHtml = block.innerHTML;
      var lines = rawHtml.split("\n");
      if (lines.length > 1 && lines[lines.length - 1].trim() === "") {
        lines.pop();
      }
      block.innerHTML = lines
        .map(function (line, idx) {
          return (
            '<span class="code-line"><span class="line-num" aria-hidden="true">' +
            (idx + 1) +
            '</span><span class="line-text">' +
            (line || "&nbsp;") +
            "</span></span>"
          );
        })
        .join("");
    });
  }

  function init() {
    if (codeEditor) {
      codeEditor.addEventListener("input", updateGutter);
      codeEditor.addEventListener("scroll", function () {
        if (editorGutter) editorGutter.scrollTop = codeEditor.scrollTop;
      });
      codeEditor.addEventListener("keydown", function (e) {
        updateGutter();
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          if (window.QuingApp.terminal && window.QuingApp.terminal.executeSimulator) {
            window.QuingApp.terminal.executeSimulator();
          }
        }
        if (e.key === "Tab") {
          e.preventDefault();
          var start = codeEditor.selectionStart;
          var end = codeEditor.selectionEnd;
          codeEditor.value =
            codeEditor.value.substring(0, start) + "    " + codeEditor.value.substring(end);
          codeEditor.selectionStart = codeEditor.selectionEnd = start + 4;
        }
      });
    }

    if (resetCodeBtn) {
      resetCodeBtn.addEventListener("click", function () {
        var idx = window.QuingApp.storage.currentLessonIndex;
        if (typeof LESSONS_DATA !== "undefined" && LESSONS_DATA[idx]) {
          codeEditor.value = LESSONS_DATA[idx].starterCode;
          updateGutter();
          if (window.QuingApp.terminal) {
            window.QuingApp.terminal.setTerminalOutput("Code reset to lesson original.");
          }
        }
      });
    }

    if (copyCodeBtn) {
      copyCodeBtn.addEventListener("click", function () {
        navigator.clipboard.writeText(codeEditor.value).then(function () {
          var orig = copyCodeBtn.textContent;
          copyCodeBtn.textContent = "Copied!";
          setTimeout(function () {
            copyCodeBtn.textContent = orig;
          }, 1800);
        });
      });
    }

    // Setup command copy buttons across setup guides
    document.querySelectorAll(".copy-cmd-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var cmd = btn.dataset.copy;
        if (cmd) {
          navigator.clipboard.writeText(cmd).then(function () {
            var original = btn.textContent;
            btn.textContent = "Copied!";
            setTimeout(function () {
              btn.textContent = original;
            }, 1800);
          });
        }
      });
    });
  }

  window.QuingApp = window.QuingApp || {};
  window.QuingApp.editor = {
    init: init,
    updateGutter: updateGutter,
    addLineNumbersToCodeBlocks: addLineNumbersToCodeBlocks
  };
})();
