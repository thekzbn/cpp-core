// src/ui/navigation.js - Curriculum tree, search indexing, lesson loading, and progress tracking
(function () {
  "use strict";

  var includeCodeInSearch = localStorage.getItem("cpp_search_include_code") === "true";

  var sidebar = document.getElementById("sidebar");
  var sidebarToggle = document.getElementById("sidebarToggle");
  var lessonNav = document.getElementById("lessonNav");
  var lessonSearch = document.getElementById("lessonSearch");
  var clearSearchBtn = document.getElementById("clearSearchBtn");
  var toggleCodeSearchBtn = document.getElementById("toggleCodeSearchBtn");
  var settingIncludeCodeSearch = document.getElementById("settingIncludeCodeSearch");
  var progressPercent = document.getElementById("progressPercent");
  var progressBar = document.getElementById("progressBar");

  var headerCurrentLesson = document.getElementById("headerCurrentLesson");
  var lessonCategory = document.getElementById("lessonCategory");
  var lessonTitle = document.getElementById("lessonTitle");
  var lessonSummary = document.getElementById("lessonSummary");
  var cBridgeText = document.getElementById("cBridgeText");
  var lessonBody = document.getElementById("lessonBody");

  var editorFilename = document.getElementById("editorFilename");
  var codeEditor = document.getElementById("codeEditor");
  var stdinInput = document.getElementById("stdinInput");
  var stdinContainer = document.getElementById("stdinContainer");
  var terminalStatus = document.getElementById("terminalStatus");

  var prevLessonBtn = document.getElementById("prevLessonBtn");
  var nextLessonBtn = document.getElementById("nextLessonBtn");
  var prevLessonTitle = document.getElementById("prevLessonTitle");
  var nextLessonTitle = document.getElementById("nextLessonTitle");
  var markCompleteBtn = document.getElementById("markCompleteBtn");
  var markCompleteText = document.getElementById("markCompleteText");
  var vscodeStatusToast = document.getElementById("vscodeStatusToast");

  function escapeHtml(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function extractSearchableText(htmlContent, includeCode) {
    if (!htmlContent) return "";
    var clean = htmlContent;
    if (!includeCode) {
      clean = clean.replace(/<pre[\s\S]*?<\/pre>/gi, " ");
    }
    clean = clean.replace(/<[^>]+>/g, " ");
    clean = clean
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
    return clean;
  }

  function findSnippet(fullText, query) {
    if (!fullText || !query) return "";
    var idx = fullText.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return "";
    var start = Math.max(0, idx - 20);
    var end = Math.min(fullText.length, idx + query.length + 35);
    var snippet = fullText.substring(start, end).replace(/\s+/g, " ").trim();
    if (start > 0) snippet = "..." + snippet;
    if (end < fullText.length) snippet = snippet + "...";
    return snippet;
  }

  function updateCodeSearchToggleUI() {
    if (toggleCodeSearchBtn) {
      if (includeCodeInSearch) {
        toggleCodeSearchBtn.classList.add("active");
        toggleCodeSearchBtn.setAttribute("aria-pressed", "true");
        toggleCodeSearchBtn.title = "Include code blocks in search: ON (Click to exclude)";
      } else {
        toggleCodeSearchBtn.classList.remove("active");
        toggleCodeSearchBtn.setAttribute("aria-pressed", "false");
        toggleCodeSearchBtn.title = "Include code blocks in search: OFF (Click to include)";
      }
    }
    if (settingIncludeCodeSearch) {
      settingIncludeCodeSearch.checked = includeCodeInSearch;
    }
  }

  function setIncludeCodeInSearch(val) {
    includeCodeInSearch = val;
    localStorage.setItem("cpp_search_include_code", String(includeCodeInSearch));
    updateCodeSearchToggleUI();
    renderNav(lessonSearch ? lessonSearch.value : "");
  }

  function updateProgress() {
    if (typeof LESSONS_DATA === "undefined") return;
    var total = LESSONS_DATA.length;
    var completed = window.QuingApp.storage.completedLessons.size;
    var percent = Math.round((completed / total) * 100);
    if (progressPercent) progressPercent.textContent = percent + "%";
    if (progressBar) progressBar.style.width = percent + "%";

    var currentIdx = window.QuingApp.storage.currentLessonIndex;
    var currentLesson = LESSONS_DATA[currentIdx];
    if (!currentLesson) return;

    var isCurrentDone = window.QuingApp.storage.hasCompleted(currentLesson.id);
    if (markCompleteText) markCompleteText.textContent = isCurrentDone ? "Completed ✓" : "Mark Complete";
    if (markCompleteBtn) {
      markCompleteBtn.style.color = isCurrentDone ? "var(--success)" : "inherit";
      markCompleteBtn.style.borderColor = isCurrentDone ? "var(--success)" : "var(--border)";
    }
  }

  function updatePaging() {
    if (typeof LESSONS_DATA === "undefined") return;
    var currentLessonIndex = window.QuingApp.storage.currentLessonIndex;

    if (prevLessonBtn) {
      if (currentLessonIndex > 0) {
        prevLessonBtn.style.visibility = "visible";
        if (prevLessonTitle) prevLessonTitle.textContent = LESSONS_DATA[currentLessonIndex - 1].title;
      } else {
        prevLessonBtn.style.visibility = "hidden";
      }
    }

    if (nextLessonBtn) {
      if (currentLessonIndex < LESSONS_DATA.length - 1) {
        nextLessonBtn.style.visibility = "visible";
        if (nextLessonTitle) nextLessonTitle.textContent = LESSONS_DATA[currentLessonIndex + 1].title;
      } else {
        nextLessonBtn.style.visibility = "hidden";
      }
    }
  }

  function renderNav(filter) {
    if (!lessonNav || typeof LESSONS_DATA === "undefined") return;
    lessonNav.innerHTML = "";
    var filterLower = (filter || "").toLowerCase().trim();
    var currentLessonIndex = window.QuingApp.storage.currentLessonIndex;
    var completedLessons = window.QuingApp.storage.completedLessons;

    if (clearSearchBtn) {
      if (filterLower.length > 0) {
        clearSearchBtn.classList.remove("hidden");
      } else {
        clearSearchBtn.classList.add("hidden");
      }
    }

    // Active Search Filtering Mode
    if (filterLower) {
      var matchCount = 0;
      var matchedLessons = [];

      LESSONS_DATA.forEach(function (lesson, index) {
        var matchReason = "";
        var snippet = "";

        if (lesson.title.toLowerCase().includes(filterLower)) {
          matchReason = "title";
        } else if (lesson.summary.toLowerCase().includes(filterLower)) {
          matchReason = "summary";
          snippet = findSnippet(lesson.summary, filterLower);
        } else if (lesson.cBridge && lesson.cBridge.toLowerCase().includes(filterLower)) {
          matchReason = "C-Bridge Transition";
          snippet = findSnippet(lesson.cBridge, filterLower);
        } else {
          var bodyText = extractSearchableText(lesson.content, includeCodeInSearch);
          if (bodyText.toLowerCase().includes(filterLower)) {
            matchReason = "Lesson text";
            snippet = findSnippet(bodyText, filterLower);
          }
        }

        if (!matchReason && includeCodeInSearch) {
          if (lesson.starterCode && lesson.starterCode.toLowerCase().includes(filterLower)) {
            matchReason = "Code block";
            snippet = findSnippet(lesson.starterCode, filterLower);
          } else if (
            lesson.fillBlank &&
            lesson.fillBlank.codeTemplate &&
            lesson.fillBlank.codeTemplate.toLowerCase().includes(filterLower)
          ) {
            matchReason = "Code drill";
            snippet = findSnippet(lesson.fillBlank.codeTemplate, filterLower);
          }
        }

        if (matchReason) {
          matchCount++;
          matchedLessons.push({ lesson: lesson, index: index, matchReason: matchReason, snippet: snippet });
        }
      });

      if (matchedLessons.length === 0) {
        var emptyEl = document.createElement("div");
        emptyEl.className = "nav-search-empty";
        emptyEl.innerHTML =
          'No lessons found for "<strong>' +
          escapeHtml(filterLower) +
          "</strong>\"." +
          (!includeCodeInSearch
            ? "<br><small>Tip: Click &lt;/&gt; in search box to also search inside code snippets.</small>"
            : "");
        lessonNav.appendChild(emptyEl);
        updateProgress();
        return;
      }

      var matchHeader = document.createElement("div");
      matchHeader.className = "nav-category";
      matchHeader.textContent = "Search Results (" + matchCount + " lesson" + (matchCount > 1 ? "s" : "") + ")";
      lessonNav.appendChild(matchHeader);

      matchedLessons.forEach(function (itemData) {
        var lesson = itemData.lesson;
        var index = itemData.index;
        var matchReason = itemData.matchReason;
        var snippet = itemData.snippet;

        var item = document.createElement("button");
        item.className =
          "nav-item search-result-item " +
          (index === currentLessonIndex ? "active" : "") +
          " " +
          (completedLessons.has(lesson.id) ? "completed" : "");
        item.innerHTML =
          '<div class="nav-item-content">' +
          '<span class="nav-item-title">' +
          lesson.title +
          "</span>" +
          (snippet
            ? '<span class="nav-item-snippet">' + escapeHtml(snippet) + "</span>"
            : '<span class="nav-item-tag">' + matchReason + "</span>") +
          "</div>" +
          '<span class="nav-check">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' +
          "</span>";

        item.addEventListener("click", function () {
          loadLesson(index);
          if (window.innerWidth <= 900 && sidebar) {
            sidebar.classList.remove("open");
          }
        });

        lessonNav.appendChild(item);
      });

      updateProgress();
      return;
    }

    // Default: Categorized Tree
    var currentCategory = "";

    LESSONS_DATA.forEach(function (lesson, index) {
      if (lesson.category !== currentCategory) {
        currentCategory = lesson.category;
        var catEl = document.createElement("div");
        catEl.className = "nav-category";
        catEl.textContent = currentCategory;
        lessonNav.appendChild(catEl);
      }

      var item = document.createElement("button");
      item.className =
        "nav-item " +
        (index === currentLessonIndex ? "active" : "") +
        " " +
        (completedLessons.has(lesson.id) ? "completed" : "");
      item.innerHTML =
        "<span>" +
        lesson.title +
        "</span>" +
        '<span class="nav-check">' +
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' +
        "</span>";

      item.addEventListener("click", function () {
        loadLesson(index);
        if (window.innerWidth <= 900 && sidebar) {
          sidebar.classList.remove("open");
        }
      });

      lessonNav.appendChild(item);
    });

    updateProgress();
  }

  function loadLesson(index) {
    if (typeof LESSONS_DATA === "undefined" || index < 0 || index >= LESSONS_DATA.length) return;
    window.QuingApp.storage.currentLessonIndex = index;
    var lesson = LESSONS_DATA[index];

    window.scrollTo({ top: 0, behavior: "smooth" });

    if (headerCurrentLesson) headerCurrentLesson.textContent = lesson.title;
    if (lessonCategory) lessonCategory.textContent = lesson.category;
    if (lessonTitle) lessonTitle.textContent = lesson.title;
    if (lessonSummary) lessonSummary.textContent = lesson.summary;
    if (cBridgeText) cBridgeText.textContent = lesson.cBridge;
    if (lessonBody) {
      lessonBody.innerHTML = lesson.content;
      if (window.QuingApp.editor && window.QuingApp.editor.addLineNumbersToCodeBlocks) {
        window.QuingApp.editor.addLineNumbersToCodeBlocks(lessonBody);
      }
    }
    if (window.QuingApp.theme && window.QuingApp.theme.applyReadingFont) {
      window.QuingApp.theme.applyReadingFont(window.QuingApp.theme.readingFont);
    }

    var filename = lesson.fileSlug + ".cpp";
    if (editorFilename) editorFilename.textContent = filename;
    if (codeEditor) codeEditor.value = lesson.starterCode;
    if (window.QuingApp.editor && window.QuingApp.editor.updateGutter) {
      window.QuingApp.editor.updateGutter();
    }

    var hasCin = /(?:std::)?cin\s*>>|getline\s*\(\s*(?:std::)?cin/.test(lesson.starterCode);
    if (stdinContainer) {
      if (hasCin) {
        stdinContainer.classList.add("active-stream");
      } else {
        stdinContainer.classList.remove("active-stream");
      }
    }
    if (stdinInput) stdinInput.value = "";
    if (window.QuingApp.terminal) {
      window.QuingApp.terminal.setTerminalOutput("Ready. Press 'Run' or Ctrl+Enter to execute " + filename);
    }
    if (terminalStatus) {
      terminalStatus.textContent = "Idle";
      terminalStatus.className = "terminal-status-idle";
    }

    if (window.QuingApp.drills) {
      window.QuingApp.drills.renderFillBlanks(lesson.fillBlank);
      window.QuingApp.drills.renderQuiz(lesson.quiz);
    }

    updatePaging();
    renderNav(lessonSearch ? lessonSearch.value : "");

    if (vscodeStatusToast) vscodeStatusToast.classList.add("hidden");
  }

  function markLessonComplete(index) {
    if (typeof LESSONS_DATA === "undefined") return;
    var lessonId = LESSONS_DATA[index].id;
    window.QuingApp.storage.addCompleted(lessonId);
    updateProgress();
    renderNav(lessonSearch ? lessonSearch.value : "");
  }

  function toggleLessonComplete(index) {
    if (typeof LESSONS_DATA === "undefined") return;
    var currentId = LESSONS_DATA[index].id;
    if (window.QuingApp.storage.hasCompleted(currentId)) {
      window.QuingApp.storage.removeCompleted(currentId);
    } else {
      window.QuingApp.storage.addCompleted(currentId);
    }
    updateProgress();
    renderNav(lessonSearch ? lessonSearch.value : "");
  }

  function init() {
    updateCodeSearchToggleUI();

    if (sidebarToggle && sidebar) {
      sidebarToggle.addEventListener("click", function () {
        if (window.innerWidth <= 900) {
          sidebar.classList.toggle("open");
        } else {
          sidebar.classList.toggle("collapsed");
        }
      });
    }

    if (toggleCodeSearchBtn) {
      toggleCodeSearchBtn.addEventListener("click", function () {
        setIncludeCodeInSearch(!includeCodeInSearch);
      });
    }

    if (settingIncludeCodeSearch) {
      settingIncludeCodeSearch.addEventListener("change", function (e) {
        setIncludeCodeInSearch(e.target.checked);
      });
    }

    if (clearSearchBtn && lessonSearch) {
      clearSearchBtn.addEventListener("click", function () {
        lessonSearch.value = "";
        renderNav("");
        lessonSearch.focus();
      });
    }

    if (lessonSearch) {
      lessonSearch.addEventListener("input", function (e) {
        renderNav(e.target.value);
      });
    }

    if (prevLessonBtn) {
      prevLessonBtn.addEventListener("click", function () {
        var idx = window.QuingApp.storage.currentLessonIndex;
        if (idx > 0) loadLesson(idx - 1);
      });
    }

    if (nextLessonBtn) {
      nextLessonBtn.addEventListener("click", function () {
        var idx = window.QuingApp.storage.currentLessonIndex;
        markLessonComplete(idx);
        if (typeof LESSONS_DATA !== "undefined" && idx < LESSONS_DATA.length - 1) {
          loadLesson(idx + 1);
        }
      });
    }

    if (markCompleteBtn) {
      markCompleteBtn.addEventListener("click", function () {
        toggleLessonComplete(window.QuingApp.storage.currentLessonIndex);
      });
    }
  }

  window.QuingApp = window.QuingApp || {};
  window.QuingApp.navigation = {
    init: init,
    renderNav: renderNav,
    updateProgress: updateProgress,
    loadLesson: loadLesson,
    markLessonComplete: markLessonComplete,
    toggleLessonComplete: toggleLessonComplete
  };
})();
