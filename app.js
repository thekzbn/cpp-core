// app.js - Main Application Controller for C++ Core Learning Platform

document.addEventListener("DOMContentLoaded", () => {
  // State
  let currentLessonIndex = 0;
  let completedLessons = new Set(JSON.parse(localStorage.getItem("cpp_completed_lessons") || "[]"));
  let workspaceRoot = localStorage.getItem("cpp_workspace_root") || "C:\\cpp_projects";
  let activeTheme = localStorage.getItem("cpp_theme") || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  let activeAccent = localStorage.getItem("cpp_accent_color") || "dodgerblue";
  let includeCodeInSearch = localStorage.getItem("cpp_search_include_code") === "true";
  let readingFont = localStorage.getItem("quing_reading_font") || "sans";

  // DOM Elements
  const htmlEl = document.documentElement;
  const colorPickerStrip = document.getElementById("colorPickerStrip");
  const readingFontToggleBtn = document.getElementById("readingFontToggleBtn");
  const readingFontLabel = document.getElementById("readingFontLabel");
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const sidebar = document.getElementById("sidebar");
  const sidebarToggle = document.getElementById("sidebarToggle");
  const lessonNav = document.getElementById("lessonNav");
  const lessonSearch = document.getElementById("lessonSearch");
  const clearSearchBtn = document.getElementById("clearSearchBtn");
  const toggleCodeSearchBtn = document.getElementById("toggleCodeSearchBtn");
  const settingIncludeCodeSearch = document.getElementById("settingIncludeCodeSearch");
  const progressPercent = document.getElementById("progressPercent");
  const progressBar = document.getElementById("progressBar");

  const headerCurrentLesson = document.getElementById("headerCurrentLesson");
  const lessonCategory = document.getElementById("lessonCategory");
  const lessonTitle = document.getElementById("lessonTitle");
  const lessonSummary = document.getElementById("lessonSummary");
  const cBridgeText = document.getElementById("cBridgeText");
  const lessonBody = document.getElementById("lessonBody");

  const editorFilename = document.getElementById("editorFilename");
  const codeEditor = document.getElementById("codeEditor");
  const editorGutter = document.getElementById("editorGutter");
  const stdinInput = document.getElementById("stdinInput");
  const runCodeBtn = document.getElementById("runCodeBtn");
  const resetCodeBtn = document.getElementById("resetCodeBtn");
  const copyCodeBtn = document.getElementById("copyCodeBtn");
  const terminalStatus = document.getElementById("terminalStatus");
  const terminalOutput = document.getElementById("terminalOutput");
  const terminalInputForm = document.getElementById("terminalInputForm");
  const terminalInput = document.getElementById("terminalInput");
  let pendingTerminalInput = null;
  let interactiveOutput = "";

  const drillInstructions = document.getElementById("drillInstructions");
  const fillBlankContainer = document.getElementById("fillBlankContainer");
  const checkBlanksBtn = document.getElementById("checkBlanksBtn");
  const revealBlanksBtn = document.getElementById("revealBlanksBtn");
  const drillFeedback = document.getElementById("drillFeedback");

  const quizQuestion = document.getElementById("quizQuestion");
  const quizOptions = document.getElementById("quizOptions");
  const quizFeedback = document.getElementById("quizFeedback");

  const prevLessonBtn = document.getElementById("prevLessonBtn");
  const nextLessonBtn = document.getElementById("nextLessonBtn");
  const prevLessonTitle = document.getElementById("prevLessonTitle");
  const nextLessonTitle = document.getElementById("nextLessonTitle");
  const markCompleteBtn = document.getElementById("markCompleteBtn");
  const markCompleteText = document.getElementById("markCompleteText");

  // Workspace Dialog & Actions
  const workspaceSettingsBtn = document.getElementById("workspaceSettingsBtn");
  const workspaceDialog = document.getElementById("workspaceDialog");
  const closeDialogBtn = document.getElementById("closeDialogBtn");
  const workspaceRootInput = document.getElementById("workspaceRootInput");
  const saveWorkspaceBtn = document.getElementById("saveWorkspaceBtn");
  const currentRootDisplay = document.getElementById("currentRootDisplay");
  const pickFolderBtn = document.getElementById("pickFolderBtn");
  const pickFolderBtnText = document.getElementById("pickFolderBtnText");
  const serverStatusDot = document.getElementById("serverStatusDot");
  const serverStatusText = document.getElementById("serverStatusText");
  const compilerBadge = document.getElementById("compilerBadge");
  const openVsCodeBtn = document.getElementById("openVsCodeBtn");
  const downloadCppBtn = document.getElementById("downloadCppBtn");
  const vscodeStatusToast = document.getElementById("vscodeStatusToast");

  let directoryHandle = null;

  // Apply Theme (Dark / Light)
  function applyTheme(theme) {
    activeTheme = theme;
    htmlEl.setAttribute("data-theme", theme);
    localStorage.setItem("cpp_theme", theme);
  }

  // Apply Accent Color
  function applyAccent(accent) {
    activeAccent = accent;
    htmlEl.setAttribute("data-accent", accent);
    localStorage.setItem("cpp_accent_color", accent);

    if (colorPickerStrip) {
      const swatches = colorPickerStrip.querySelectorAll(".color-swatch-btn");
      swatches.forEach(btn => {
        if (btn.dataset.color === accent) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });
    }
  }

  // Quing Reading Typography: Inter (Sans) or Merriweather (Serif)
  function applyReadingFont(font) {
    readingFont = font;
    localStorage.setItem("quing_reading_font", font);
    if (readingFontLabel) {
      readingFontLabel.textContent = font === "serif" ? "Sans" : "Serif";
    }

    if (font === "serif") {
      // Dynamically load Merriweather if not already loaded (Quing guideline: if no user choice exists, merriweather must not load)
      if (!document.getElementById("merriweatherFontLink")) {
        const link = document.createElement("link");
        link.id = "merriweatherFontLink";
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300..900;1,300..900&display=swap";
        document.head.appendChild(link);
      }
      lessonBody.setAttribute("data-reading-font", "serif");
      lessonSummary.setAttribute("data-reading-font", "serif");
    } else {
      lessonBody.removeAttribute("data-reading-font");
      lessonSummary.removeAttribute("data-reading-font");
    }
  }

  applyTheme(activeTheme);
  applyAccent(activeAccent);
  applyReadingFont(readingFont);

  if (readingFontToggleBtn) {
    readingFontToggleBtn.addEventListener("click", () => {
      applyReadingFont(readingFont === "serif" ? "sans" : "serif");
    });
  }

  if (colorPickerStrip) {
    colorPickerStrip.addEventListener("click", (e) => {
      const btn = e.target.closest(".color-swatch-btn");
      if (btn && btn.dataset.color) {
        applyAccent(btn.dataset.color);
      }
    });
  }

  themeToggleBtn.addEventListener("click", () => {
    applyTheme(activeTheme === "dark" ? "light" : "dark");
  });

  // Sidebar Toggle (Mobile drawer & Desktop collapse)
  sidebarToggle.addEventListener("click", () => {
    if (window.innerWidth <= 900) {
      sidebar.classList.toggle("open");
    } else {
      sidebar.classList.toggle("collapsed");
    }
  });

  // Line Numbers / Gutter
  function updateGutter() {
    if (!editorGutter || !codeEditor) return;
    const lineCount = codeEditor.value.split("\n").length;
    const existing = editorGutter.children.length;
    if (existing < lineCount) {
      for (let i = existing + 1; i <= lineCount; i++) {
        const span = document.createElement("span");
        span.textContent = i;
        editorGutter.appendChild(span);
      }
    } else if (existing > lineCount) {
      while (editorGutter.children.length > lineCount) {
        editorGutter.removeChild(editorGutter.lastChild);
      }
    }
    // Sync gutter scroll with editor
    editorGutter.style.height = getComputedStyle(codeEditor).height;
    editorGutter.scrollTop = codeEditor.scrollTop;
  }

  if (codeEditor) {
    codeEditor.addEventListener("input", updateGutter);
    codeEditor.addEventListener("scroll", () => {
      if (editorGutter) editorGutter.scrollTop = codeEditor.scrollTop;
    });
    codeEditor.addEventListener("keydown", updateGutter);
  }

  // Helper: Escape HTML in search output
  function escapeHtml(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Extract searchable text from HTML content (excluding <pre> code blocks unless enabled)
  function extractSearchableText(htmlContent, includeCode = false) {
    if (!htmlContent) return "";
    let clean = htmlContent;
    if (!includeCode) {
      // Remove all <pre>...</pre> code blocks
      clean = clean.replace(/<pre[\s\S]*?<\/pre>/gi, " ");
    }
    // Remove remaining HTML tags
    clean = clean.replace(/<[^>]+>/g, " ");
    // Unescape standard HTML entities
    clean = clean.replace(/&lt;/g, "<")
                 .replace(/&gt;/g, ">")
                 .replace(/&amp;/g, "&")
                 .replace(/&quot;/g, '"')
                 .replace(/&#39;/g, "'");
    return clean;
  }

  // Find a snippet preview around the matching search term
  function findSnippet(fullText, query) {
    if (!fullText || !query) return "";
    const idx = fullText.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return "";
    const start = Math.max(0, idx - 20);
    const end = Math.min(fullText.length, idx + query.length + 35);
    let snippet = fullText.substring(start, end).replace(/\s+/g, " ").trim();
    if (start > 0) snippet = "..." + snippet;
    if (end < fullText.length) snippet = snippet + "...";
    return snippet;
  }

  // Update Code Search Toggle State in UI
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
    renderNav(lessonSearch.value);
  }

  updateCodeSearchToggleUI();

  if (toggleCodeSearchBtn) {
    toggleCodeSearchBtn.addEventListener("click", () => {
      setIncludeCodeInSearch(!includeCodeInSearch);
    });
  }

  if (settingIncludeCodeSearch) {
    settingIncludeCodeSearch.addEventListener("change", (e) => {
      setIncludeCodeInSearch(e.target.checked);
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      lessonSearch.value = "";
      renderNav("");
      lessonSearch.focus();
    });
  }

  // Render Navigation Tree
  function renderNav(filter = "") {
    lessonNav.innerHTML = "";
    const filterLower = filter.toLowerCase().trim();

    if (clearSearchBtn) {
      if (filterLower.length > 0) {
        clearSearchBtn.classList.remove("hidden");
      } else {
        clearSearchBtn.classList.add("hidden");
      }
    }

    // Active Search Filtering Mode
    if (filterLower) {
      let matchCount = 0;
      const matchedLessons = [];

      LESSONS_DATA.forEach((lesson, index) => {
        let matchReason = "";
        let snippet = "";

        // 1. Check Title
        if (lesson.title.toLowerCase().includes(filterLower)) {
          matchReason = "title";
        }
        // 2. Check Summary
        else if (lesson.summary.toLowerCase().includes(filterLower)) {
          matchReason = "summary";
          snippet = findSnippet(lesson.summary, filterLower);
        }
        // 3. Check C-Bridge Transition Insight
        else if (lesson.cBridge && lesson.cBridge.toLowerCase().includes(filterLower)) {
          matchReason = "C-Bridge Transition";
          snippet = findSnippet(lesson.cBridge, filterLower);
        }
        // 4. Check Lesson Content Body (excluding <pre> code blocks unless enabled)
        else {
          const bodyText = extractSearchableText(lesson.content, includeCodeInSearch);
          if (bodyText.toLowerCase().includes(filterLower)) {
            matchReason = "Lesson text";
            snippet = findSnippet(bodyText, filterLower);
          }
        }

        // 5. Check Code Blocks (only if explicitly enabled in settings)
        if (!matchReason && includeCodeInSearch) {
          if (lesson.starterCode && lesson.starterCode.toLowerCase().includes(filterLower)) {
            matchReason = "Code block";
            snippet = findSnippet(lesson.starterCode, filterLower);
          } else if (lesson.fillBlank && lesson.fillBlank.codeTemplate.toLowerCase().includes(filterLower)) {
            matchReason = "Code drill";
            snippet = findSnippet(lesson.fillBlank.codeTemplate, filterLower);
          }
        }

        if (matchReason) {
          matchCount++;
          matchedLessons.push({ lesson, index, matchReason, snippet });
        }
      });

      if (matchedLessons.length === 0) {
        const emptyEl = document.createElement("div");
        emptyEl.className = "nav-search-empty";
        emptyEl.innerHTML = `No lessons found for "<strong>${escapeHtml(filterLower)}</strong>".${!includeCodeInSearch ? '<br><small>Tip: Click &lt;/&gt; in search box to also search inside code snippets.</small>' : ''}`;
        lessonNav.appendChild(emptyEl);
        updateProgress();
        return;
      }

      const matchHeader = document.createElement("div");
      matchHeader.className = "nav-category";
      matchHeader.textContent = `Search Results (${matchCount} lesson${matchCount > 1 ? "s" : ""})`;
      lessonNav.appendChild(matchHeader);

      matchedLessons.forEach(({ lesson, index, matchReason, snippet }) => {
        const item = document.createElement("button");
        item.className = `nav-item search-result-item ${index === currentLessonIndex ? "active" : ""} ${completedLessons.has(lesson.id) ? "completed" : ""}`;
        item.innerHTML = `
          <div class="nav-item-content">
            <span class="nav-item-title">${lesson.title}</span>
            ${snippet ? `<span class="nav-item-snippet">${escapeHtml(snippet)}</span>` : `<span class="nav-item-tag">${matchReason}</span>`}
          </div>
          <span class="nav-check">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
          </span>
        `;

        item.addEventListener("click", () => {
          loadLesson(index);
          if (window.innerWidth <= 900) {
            sidebar.classList.remove("open");
          }
        });

        lessonNav.appendChild(item);
      });

      updateProgress();
      return;
    }

    // Default: Categorized Tree
    let currentCategory = "";

    LESSONS_DATA.forEach((lesson, index) => {
      if (lesson.category !== currentCategory) {
        currentCategory = lesson.category;
        const catEl = document.createElement("div");
        catEl.className = "nav-category";
        catEl.textContent = currentCategory;
        lessonNav.appendChild(catEl);
      }

      const item = document.createElement("button");
      item.className = `nav-item ${index === currentLessonIndex ? "active" : ""} ${completedLessons.has(lesson.id) ? "completed" : ""}`;
      item.innerHTML = `
        <span>${lesson.title}</span>
        <span class="nav-check">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
        </span>
      `;

      item.addEventListener("click", () => {
        loadLesson(index);
        if (window.innerWidth <= 900) {
          sidebar.classList.remove("open");
        }
      });

      lessonNav.appendChild(item);
    });

    updateProgress();
  }

  // Update Progress
  function updateProgress() {
    const total = LESSONS_DATA.length;
    const completed = completedLessons.size;
    const percent = Math.round((completed / total) * 100);
    progressPercent.textContent = `${percent}%`;
    progressBar.style.width = `${percent}%`;

    const isCurrentDone = completedLessons.has(LESSONS_DATA[currentLessonIndex].id);
    markCompleteText.textContent = isCurrentDone ? "Completed ✓" : "Mark Complete";
    markCompleteBtn.style.color = isCurrentDone ? "var(--success)" : "inherit";
    markCompleteBtn.style.borderColor = isCurrentDone ? "var(--success)" : "var(--border)";
  }

  // Search Filter Handler
  lessonSearch.addEventListener("input", (e) => {
    renderNav(e.target.value);
  });

  // Add line numbers to explanatory <pre><code> blocks
  function addLineNumbersToCodeBlocks(container) {
    if (!container) return;
    container.querySelectorAll("pre code").forEach(block => {
      if (block.dataset.numbered) return;
      block.dataset.numbered = "true";
      const rawHtml = block.innerHTML;
      const lines = rawHtml.split("\n");
      if (lines.length > 1 && lines[lines.length - 1].trim() === "") {
        lines.pop();
      }
      block.innerHTML = lines.map((line, idx) =>
        `<span class="code-line"><span class="line-num" aria-hidden="true">${idx + 1}</span><span class="line-text">${line || "&nbsp;"}</span></span>`
      ).join("");
    });
  }

  // Load Lesson by Index
  function loadLesson(index) {
    if (index < 0 || index >= LESSONS_DATA.length) return;
    currentLessonIndex = index;
    const lesson = LESSONS_DATA[index];

    // Scroll main content to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Update Header and Texts
    headerCurrentLesson.textContent = lesson.title;
    lessonCategory.textContent = lesson.category;
    lessonTitle.textContent = lesson.title;
    lessonSummary.textContent = lesson.summary;
    cBridgeText.textContent = lesson.cBridge;
    lessonBody.innerHTML = lesson.content;
    addLineNumbersToCodeBlocks(lessonBody);
    applyReadingFont(readingFont);

    // Update Simulator
    const filename = `${lesson.fileSlug}.cpp`;
    editorFilename.textContent = filename;
    codeEditor.value = lesson.starterCode;
    updateGutter();
    const hasCin = /(?:std::)?cin\s*>>|getline\s*\(\s*(?:std::)?cin/.test(lesson.starterCode);
    const stdinContainer = document.getElementById("stdinContainer");
    if (stdinContainer) {
      if (hasCin) {
        stdinContainer.classList.add("active-stream");
      } else {
        stdinContainer.classList.remove("active-stream");
      }
    }
    stdinInput.value = "";
    setTerminalOutput(`Ready. Press 'Run' or Ctrl+Enter to execute ${filename}`);
    terminalStatus.textContent = "Idle";
    terminalStatus.className = "terminal-status-idle";

    // Update Fill in Blanks
    renderFillBlanks(lesson.fillBlank);

    // Update Quiz
    renderQuiz(lesson.quiz);

    // Update Navigation Paging
    updatePaging();

    // Re-render Sidebar Active State
    renderNav(lessonSearch.value);

    // Hide any previous toast
    vscodeStatusToast.classList.add("hidden");
  }

  // Render Fill in the Blanks Drill
  function renderFillBlanks(drill) {
    drillFeedback.textContent = "";
    drillFeedback.className = "drill-feedback-message";
    drillInstructions.textContent = drill.instructions;

    // Replace ___1___, ___2___ with input elements
    let templateHtml = drill.codeTemplate;
    drill.blanks.forEach(b => {
      const placeholder = `___${b.id}___`;
      const inputHtml = `<input type="text" class="blank-input" data-blank-id="${b.id}" placeholder="?" autocomplete="off" spellcheck="false" title="${b.hint}">`;
      templateHtml = templateHtml.replace(placeholder, inputHtml);
    });

    fillBlankContainer.innerHTML = templateHtml;
  }

  // Check Fill-in-the-Blank Answers
  checkBlanksBtn.addEventListener("click", () => {
    const lesson = LESSONS_DATA[currentLessonIndex];
    const inputs = fillBlankContainer.querySelectorAll(".blank-input");
    let allCorrect = true;

    inputs.forEach(inp => {
      const id = parseInt(inp.dataset.blankId, 10);
      const blankData = lesson.fillBlank.blanks.find(b => b.id === id);
      const userVal = inp.value.trim();

      if (userVal.toLowerCase() === blankData.answer.toLowerCase()) {
        inp.className = "blank-input correct";
      } else {
        inp.className = "blank-input incorrect";
        allCorrect = false;
      }
    });

    if (allCorrect) {
      drillFeedback.textContent = "Great job! All blank fields are filled correctly.";
      drillFeedback.className = "drill-feedback-message correct";
    } else {
      drillFeedback.textContent = "Some answers are incorrect. Hover over blank inputs for hints, or click 'Reveal Answers'.";
      drillFeedback.className = "drill-feedback-message incorrect";
    }
  });

  revealBlanksBtn.addEventListener("click", () => {
    const lesson = LESSONS_DATA[currentLessonIndex];
    const inputs = fillBlankContainer.querySelectorAll(".blank-input");
    inputs.forEach(inp => {
      const id = parseInt(inp.dataset.blankId, 10);
      const blankData = lesson.fillBlank.blanks.find(b => b.id === id);
      inp.value = blankData.answer;
      inp.className = "blank-input correct";
    });
    drillFeedback.textContent = "Answers revealed. Take note of how each keyword and operator functions in C++.";
    drillFeedback.className = "drill-feedback-message";
  });

  // Render Quiz
  function renderQuiz(quiz) {
    quizQuestion.textContent = quiz.question;
    quizOptions.innerHTML = "";
    quizFeedback.classList.add("hidden");
    quizFeedback.textContent = "";

    quiz.options.forEach((optText, optIdx) => {
      const btn = document.createElement("button");
      btn.className = "quiz-option-btn";
      btn.textContent = optText;

      btn.addEventListener("click", () => {
        const allBtns = quizOptions.querySelectorAll(".quiz-option-btn");
        allBtns.forEach(b => b.disabled = true);

        if (optIdx === quiz.answer) {
          btn.classList.add("selected-correct");
          quizFeedback.textContent = `Correct! ${quiz.explanation}`;
          quizFeedback.style.borderColor = "var(--success)";
        } else {
          btn.classList.add("selected-wrong");
          allBtns[quiz.answer].classList.add("selected-correct");
          quizFeedback.textContent = `Not quite. ${quiz.explanation}`;
          quizFeedback.style.borderColor = "var(--error)";
        }
        quizFeedback.classList.remove("hidden");
      });

      quizOptions.appendChild(btn);
    });
  }

  // Update Bottom Paging
  function updatePaging() {
    if (currentLessonIndex > 0) {
      prevLessonBtn.style.visibility = "visible";
      prevLessonTitle.textContent = LESSONS_DATA[currentLessonIndex - 1].title;
    } else {
      prevLessonBtn.style.visibility = "hidden";
    }

    if (currentLessonIndex < LESSONS_DATA.length - 1) {
      nextLessonBtn.style.visibility = "visible";
      nextLessonTitle.textContent = LESSONS_DATA[currentLessonIndex + 1].title;
    } else {
      nextLessonBtn.style.visibility = "hidden";
    }
  }

  function markLessonComplete(index) {
    const lessonId = LESSONS_DATA[index].id;
    if (!completedLessons.has(lessonId)) {
      completedLessons.add(lessonId);
      localStorage.setItem("cpp_completed_lessons", JSON.stringify([...completedLessons]));
      updateProgress();
      renderNav(lessonSearch.value);
    }
  }

  function toggleLessonComplete(index) {
    const currentId = LESSONS_DATA[index].id;
    if (completedLessons.has(currentId)) {
      completedLessons.delete(currentId);
    } else {
      completedLessons.add(currentId);
    }
    localStorage.setItem("cpp_completed_lessons", JSON.stringify([...completedLessons]));
    updateProgress();
    renderNav(lessonSearch.value);
  }

  prevLessonBtn.addEventListener("click", () => {
    if (currentLessonIndex > 0) loadLesson(currentLessonIndex - 1);
  });

  nextLessonBtn.addEventListener("click", () => {
    // Auto mark current lesson complete when advancing
    markLessonComplete(currentLessonIndex);
    if (currentLessonIndex < LESSONS_DATA.length - 1) {
      loadLesson(currentLessonIndex + 1);
    }
  });

  // Mark as Complete Button
  markCompleteBtn.addEventListener("click", () => {
    toggleLessonComplete(currentLessonIndex);
  });

  // ANSI Escape Sequence Parser for Terminal Color & Formatting
  function parseAnsiToHtml(rawText) {
    if (!rawText) return "";

    // Escape HTML tags to prevent XSS
    let text = rawText
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Clean common terminal screen clear sequences
    text = text.replace(/(?:\x1b|\033)\[[0-9;]*[JjHh]/g, "");
    text = text.replace(/(?:\x1b|\033)\[1A/g, "");
    text = text.replace(/(?:\x1b|\033)\[2K/g, "");

    let openSpans = 0;
    const ansiRegex = /(?:\x1b|\033)\[([0-9;]+)m/g;

    const html = text.replace(ansiRegex, (match, codeStr) => {
      const codes = codeStr.split(";").map(Number);
      let styles = [];

      for (let i = 0; i < codes.length; i++) {
        const code = codes[i];
        if (code === 0) {
          // Reset all active styles
          let closing = "";
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
          const stdColors = ["#1e1e1e", "#ff5555", "#50fa7b", "#f1fa8c", "#8be9fd", "#ff79c6", "#00ffff", "#f8f8f2"];
          styles.push(`color: ${stdColors[code - 30]}`);
        } else if (code >= 40 && code <= 47) {
          const stdBg = ["#1e1e1e", "#ff5555", "#50fa7b", "#f1fa8c", "#8be9fd", "#ff79c6", "#00ffff", "#f8f8f2"];
          styles.push(`background-color: ${stdBg[code - 40]}`);
        } else if (code >= 90 && code <= 97) {
          const brightColors = ["#6272a4", "#ff6e6e", "#69ff94", "#ffffa5", "#d6acff", "#ff92df", "#a4ffff", "#ffffff"];
          styles.push(`color: ${brightColors[code - 90]}`);
        } else if (code >= 100 && code <= 107) {
          const brightBg = ["#6272a4", "#ff6e6e", "#69ff94", "#ffffa5", "#d6acff", "#ff92df", "#a4ffff", "#ffffff"];
          styles.push(`background-color: ${brightBg[code - 100]}`);
        } else if (code === 38 && codes[i + 1] === 2 && i + 4 < codes.length) {
          // 24-bit TrueColor Foreground: \033[38;2;R;G;Bm
          const r = codes[i + 2], g = codes[i + 3], b = codes[i + 4];
          styles.push(`color: rgb(${r}, ${g}, ${b})`);
          i += 4;
        } else if (code === 48 && codes[i + 1] === 2 && i + 4 < codes.length) {
          // 24-bit TrueColor Background: \033[48;2;R;G;Bm
          const r = codes[i + 2], g = codes[i + 3], b = codes[i + 4];
          styles.push(`background-color: rgb(${r}, ${g}, ${b})`);
          i += 4;
        }
      }

      if (styles.length > 0) {
        openSpans++;
        return `<span style="${styles.join("; ")}">`;
      }
      return "";
    });

    let closing = "";
    while (openSpans > 0) {
      closing += "</span>";
      openSpans--;
    }
    return html + closing;
  }

  function setTerminalOutput(text) {
    terminalOutput.innerHTML = parseAnsiToHtml(text);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  // Simulator Run Action (Native GCC Execution with Simulation Fallback)
  async function executeSimulator() {
    const source = codeEditor.value;
    const stdin = stdinInput.value;
    const needsInput = /(?:std::)?cin\s*>>|getline\s*\(\s*(?:std::)?cin/.test(source);

    terminalStatus.textContent = "Compiling & Running...";
    terminalStatus.className = "terminal-status-running";
    runCodeBtn.disabled = true;
    terminalInputForm.hidden = true;
    interactiveOutput = "";

    try {
      // --- Attempt 1: Native GCC server (always preferred, supports stdin too) ---
      let nativeRes = null;
      try {
        const resp = await fetch("http://localhost:8000/api/run-cpp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: source, stdin: stdin }),
          signal: AbortSignal.timeout(20000)
        });

        if (resp.ok) {
          nativeRes = await resp.json();
        }
      } catch (networkErr) {
        // Server offline — fall through to simulator
      }

      // Server responded — use native result
      if (nativeRes !== null) {
        if (!nativeRes.compilerFound) {
          // Server is up but no compiler installed — show warning badge, fall through to simulator
          if (compilerBadge) {
            compilerBadge.textContent = "No Compiler on PATH";
            compilerBadge.className = "compiler-badge mode-warn";
          }
        } else {
          // Native execution succeeded or failed with a real compile/runtime error
          const outputText = nativeRes.output || "";
          const duration = nativeRes.durationMs != null ? ` (${nativeRes.durationMs} ms)` : "";
          const compilerLabel = nativeRes.compiler
            ? nativeRes.compiler.replace(/^"(.+)"$/, "$1").split(/[\\/]/).pop().replace(/\.exe$/i, "")
            : "GCC";

          let finalOutput = outputText;
          if (nativeRes.compiled && !nativeRes.success && nativeRes.exitCode === 124) {
            finalOutput += "\n[Process terminated: Execution exceeded safety limit (8s)]";
          }
          if (nativeRes.compiled && nativeRes.success) {
            finalOutput += `\n--------------------------------\nProcess finished with exit code 0${duration}`;
          } else if (nativeRes.compiled && !nativeRes.success) {
            finalOutput += `\n--------------------------------\nProcess finished with exit code ${nativeRes.exitCode ?? 1}${duration}`;
          }
          setTerminalOutput(finalOutput);

          terminalStatus.textContent = nativeRes.success ? "Success" : "Error";
          terminalStatus.className = nativeRes.success ? "terminal-status-success" : "terminal-status-idle";

          if (compilerBadge) {
            compilerBadge.textContent = `Native ${compilerLabel}`;
            compilerBadge.className = "compiler-badge mode-native";
          }
          return; // Done — native path handled it
        }
      }

      // --- Fallback: Browser Simulator (server offline or no compiler found) ---
      let res;
      if (needsInput) {
        // Interactive simulator mode: prompt for input line-by-line
        interactiveOutput = "[Mode: Browser Simulation | Interactive input]\n\n";
        setTerminalOutput(interactiveOutput);

        if (compilerBadge) {
          compilerBadge.textContent = "Simulator";
          compilerBadge.className = "compiler-badge mode-sim";
        }
        const startTime = performance.now();
        res = await window.cppSimulator.runInteractive(source, stdin, {
          onOutput: (text) => {
            interactiveOutput += text;
            setTerminalOutput(interactiveOutput);
          },
          requestInput: () => new Promise(resolve => {
            pendingTerminalInput = resolve;
            terminalInputForm.hidden = false;
            terminalStatus.textContent = "Waiting for input";
            terminalStatus.className = "terminal-status-running";
            terminalInput.focus();
          })
        });
        terminalInputForm.hidden = true;
        if (res.success) {
          interactiveOutput += `\n--------------------------------\nProcess finished with exit code 0 (${(performance.now() - startTime).toFixed(2)} ms)`;
        } else {
          interactiveOutput += `\nRuntime error: ${res.error}\nProcess terminated with exit code 1.`;
        }
        setTerminalOutput(interactiveOutput);
      } else {
        res = await window.cppSimulator.runAsync(source, stdin);
        setTerminalOutput(res.output);
      }

      terminalStatus.textContent = res.success ? "Success" : "Error";
      terminalStatus.className = res.success ? "terminal-status-success" : "terminal-status-idle";

      if (compilerBadge) {
        if (res.engine === "native") {
          compilerBadge.textContent = "Native " + (res.compiler || "GCC");
          compilerBadge.className = "compiler-badge mode-native";
        } else if (res.engine === "fallback-no-compiler") {
          compilerBadge.textContent = "No Compiler on PATH";
          compilerBadge.className = "compiler-badge mode-warn";
        } else {
          compilerBadge.textContent = "Simulator";
          compilerBadge.className = "compiler-badge mode-sim";
        }
      }
    } catch (err) {
      setTerminalOutput(`Execution Error:\n${err.message}`);
      terminalStatus.textContent = "Error";
      terminalStatus.className = "terminal-status-idle";
    } finally {
      runCodeBtn.disabled = false;
    }
  }

  runCodeBtn.addEventListener("click", executeSimulator);

  terminalInputForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!pendingTerminalInput) return;
    const answer = terminalInput.value;
    const resolveInput = pendingTerminalInput;
    pendingTerminalInput = null;
    interactiveOutput += `> ${answer}\n`;
    setTerminalOutput(interactiveOutput);
    terminalInput.value = "";
    terminalInputForm.hidden = true;
    terminalStatus.textContent = "Running...";
    resolveInput(answer);
  });

  resetCodeBtn.addEventListener("click", () => {
    codeEditor.value = LESSONS_DATA[currentLessonIndex].starterCode;
    setTerminalOutput("Code reset to lesson original.");
  });

  copyCodeBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(codeEditor.value).then(() => {
      const orig = copyCodeBtn.textContent;
      copyCodeBtn.textContent = "Copied!";
      setTimeout(() => copyCodeBtn.textContent = orig, 1800);
    });
  });

  // Setup Command Copy Buttons in Setup Guide
  document.querySelectorAll(".copy-cmd-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const cmd = btn.dataset.copy;
      if (cmd) {
        navigator.clipboard.writeText(cmd).then(() => {
          const original = btn.textContent;
          btn.textContent = "Copied!";
          setTimeout(() => { btn.textContent = original; }, 1800);
        });
      }
    });
  });

  // Keyboard Shortcuts: Ctrl+Enter to run
  codeEditor.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      executeSimulator();
    }
    // Allow Tab key indentation inside code editor
    if (e.key === "Tab") {
      e.preventDefault();
      const start = codeEditor.selectionStart;
      const end = codeEditor.selectionEnd;
      codeEditor.value = codeEditor.value.substring(0, start) + "    " + codeEditor.value.substring(end);
      codeEditor.selectionStart = codeEditor.selectionEnd = start + 4;
    }
  });

  // Workspace Dialog Setup
  workspaceRootInput.value = workspaceRoot;
  currentRootDisplay.textContent = workspaceRoot;

  // DOM elements for Pipeline Setup Assistant
  const setupServerDot = document.getElementById("setupServerDot");
  const setupServerStatus = document.getElementById("setupServerStatus");
  const setupCompilerDot = document.getElementById("setupCompilerDot");
  const setupCompilerStatus = document.getElementById("setupCompilerStatus");
  const compilerActions = document.getElementById("compilerActions");
  const setupVscodeDot = document.getElementById("setupVscodeDot");
  const setupVscodeStatus = document.getElementById("setupVscodeStatus");
  const vscodeActions = document.getElementById("vscodeActions");
  const setupTerminalBox = document.getElementById("setupTerminalBox");
  const setupTerminalTitle = document.getElementById("setupTerminalTitle");
  const setupTerminalStatus = document.getElementById("setupTerminalStatus");
  const setupTerminalLog = document.getElementById("setupTerminalLog");
  const btnInstallPortableGcc = document.getElementById("btnInstallPortableGcc");
  const btnInstallLlvm = document.getElementById("btnInstallLlvm");
  const btnInstallVscode = document.getElementById("btnInstallVscode");

  // Check Companion Server & System Pipeline Status
  async function checkCompanionServer() {
    try {
      const resp = await fetch("http://localhost:8000/api/system-status");
      if (resp.ok) {
        const data = await resp.json();

        // 1. Companion Server
        if (setupServerDot) setupServerDot.className = "status-indicator-dot connected";
        if (setupServerStatus) setupServerStatus.textContent = `Active on port ${data.server.port || 8000}`;

        // 2. C++ Compiler
        if (data.compiler) {
          if (setupCompilerDot) setupCompilerDot.className = "status-indicator-dot connected";
          if (setupCompilerStatus) {
            setupCompilerStatus.textContent = `${data.compiler.display || "Native C++"} (${data.compiler.version || ""})`;
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
            setupVscodeStatus.textContent = `Installed (${data.vscode.version || "Ready"})`;
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

  // Stream setup action helper
  async function runSetupAction(actionName, title) {
    if (!setupTerminalBox || !setupTerminalLog) return;
    setupTerminalBox.classList.remove("hidden");
    setupTerminalTitle.textContent = title;
    setupTerminalStatus.textContent = "Running...";
    setupTerminalStatus.className = "terminal-status-running";
    setupTerminalLog.textContent = `Starting ${title}...\n`;

    try {
      const resp = await fetch("http://localhost:8000/api/setup/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: actionName })
      });

      if (!resp.ok) {
        setupTerminalLog.textContent += `\nError: Server returned HTTP ${resp.status}`;
        setupTerminalStatus.textContent = "Error";
        setupTerminalStatus.className = "terminal-status-idle";
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder("utf-8");
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setupTerminalLog.textContent += decoder.decode(value, { stream: true });
        setupTerminalLog.scrollTop = setupTerminalLog.scrollHeight;
      }

      setupTerminalStatus.textContent = "Completed";
      setupTerminalStatus.className = "terminal-status-success";
      showToast(`${title} finished.`);
      // Refresh system status to update UI indicators
      setTimeout(checkCompanionServer, 1000);
    } catch (err) {
      setupTerminalLog.textContent += `\nNetwork/Execution Error: ${err.message}`;
      setupTerminalStatus.textContent = "Error";
      setupTerminalStatus.className = "terminal-status-idle";
    }
  }

  if (btnInstallPortableGcc) {
    btnInstallPortableGcc.addEventListener("click", () => {
      runSetupAction("install-portable", "Portable GCC Toolchain Setup (~35MB)");
    });
  }

  if (btnInstallLlvm) {
    btnInstallLlvm.addEventListener("click", () => {
      runSetupAction("install-llvm", "LLVM Clang++ Setup (winget)");
    });
  }

  if (btnInstallVscode) {
    btnInstallVscode.addEventListener("click", () => {
      runSetupAction("install-vscode", "Visual Studio Code Setup (winget)");
    });
  }

  // Click compiler badge to open setup assistant if no compiler
  if (compilerBadge) {
    compilerBadge.addEventListener("click", () => {
      workspaceSettingsBtn.click();
    });
  }

  // Browse and Link Folder Directly via File System API
  if (pickFolderBtn) {
    pickFolderBtn.addEventListener("click", async () => {
      if (!("showDirectoryPicker" in window)) {
        alert("Your browser does not support the File System Access API. Run 'node dev_server.js' in your terminal for direct disk writing.");
        return;
      }
      try {
        directoryHandle = await window.showDirectoryPicker({ mode: "readwrite" });
        workspaceRoot = directoryHandle.name;
        localStorage.setItem("cpp_workspace_root", workspaceRoot);
        currentRootDisplay.textContent = `${directoryHandle.name} (Directly Linked)`;
        pickFolderBtnText.textContent = `Linked: ${directoryHandle.name} ✓`;
        showToast(`Linked directly to folder "${directoryHandle.name}". Files will now write directly inside!`);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          showToast(`Could not link folder: ${err.message}`);
        }
      }
    });
  }

  workspaceSettingsBtn.addEventListener("click", () => {
    workspaceRootInput.value = workspaceRoot;
    checkCompanionServer();
    workspaceDialog.showModal();
  });

  closeDialogBtn.addEventListener("click", () => {
    workspaceDialog.close();
  });

  saveWorkspaceBtn.addEventListener("click", () => {
    const val = workspaceRootInput.value.trim();
    if (val) {
      workspaceRoot = val;
      localStorage.setItem("cpp_workspace_root", workspaceRoot);
      currentRootDisplay.textContent = workspaceRoot;
      showToast(`Saved root folder: ${workspaceRoot}`);
      workspaceDialog.close();
    }
  });

  function showToast(msg) {
    vscodeStatusToast.textContent = msg;
    vscodeStatusToast.classList.remove("hidden");
    setTimeout(() => {
      vscodeStatusToast.classList.add("hidden");
    }, 7000);
  }

  // Open in VS Code
  openVsCodeBtn.addEventListener("click", async () => {
    const lesson = LESSONS_DATA[currentLessonIndex];
    const fileName = `${lesson.fileSlug}.cpp`;
    const code = codeEditor.value;

    showToast(`Opening ${fileName} in VS Code...`);

    // 1. Try companion server API first (creates file directly on disk & invokes code)
    try {
      const resp = await fetch("http://localhost:8000/api/open-vscode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rootDir: workspaceRoot,
          fileName: fileName,
          code: code
        })
      });

      if (resp.ok) {
        const data = await resp.json();
        showToast(`Saved ${data.targetPath} and opened in VS Code.`);
        return;
      }
    } catch (err) {
      // Companion server not running, continue to browser options
    }

    // 2. Direct File System API (writes directly to user's picked folder on disk)
    let wroteDirectly = false;
    if (directoryHandle) {
      try {
        const fileHandle = await directoryHandle.getFileHandle(fileName, { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(code);
        await writable.close();
        wroteDirectly = true;
      } catch (e) {
        console.warn("Could not write via directory handle:", e);
      }
    }

    // 3. Trigger VS Code URI protocol handler
    const cleanRoot = workspaceRoot.replace(/\\/g, "/");
    const formattedPath = cleanRoot.startsWith("/") ? cleanRoot : `/${cleanRoot}`;
    const uri = `vscode://file${formattedPath}/${fileName}`;

    window.location.href = uri;

    if (wroteDirectly) {
      showToast(`Saved ${fileName} directly into your linked folder and triggered VS Code!`);
    } else {
      showToast(`Triggered VS Code protocol: ${uri}. (Tip: Click 'Workspace' -> 'Browse & Link Folder' to save files directly to disk without Downloads).`);
    }
  });

  // Export .cpp file directly (explicit download action only)
  function downloadFile(filename, text) {
    const blob = new Blob([text], { type: "text/x-c++src;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  downloadCppBtn.addEventListener("click", () => {
    const lesson = LESSONS_DATA[currentLessonIndex];
    downloadFile(`${lesson.fileSlug}.cpp`, codeEditor.value);
    showToast(`Exported ${lesson.fileSlug}.cpp to your Downloads folder.`);
  });

  // Mobile Preferences & Settings Menu
  const mobileSettingsBtn = document.getElementById("mobileSettingsBtn");
  const mobileSettingsDialog = document.getElementById("mobileSettingsDialog");
  const closeMobileSettingsBtn = document.getElementById("closeMobileSettingsBtn");
  const mobileThemeToggleBtn = document.getElementById("mobileThemeToggleBtn");
  const mobileThemeLabel = document.getElementById("mobileThemeLabel");
  const mobileColorPickerStrip = document.getElementById("mobileColorPickerStrip");
  const mobileReadingFontToggleBtn = document.getElementById("mobileReadingFontToggleBtn");
  const mobileReadingFontLabel = document.getElementById("mobileReadingFontLabel");
  const mobileWorkspaceBtn = document.getElementById("mobileWorkspaceBtn");

  if (mobileSettingsBtn && mobileSettingsDialog) {
    mobileSettingsBtn.addEventListener("click", () => {
      if (mobileThemeLabel) {
        mobileThemeLabel.textContent = activeTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";
      }
      if (mobileReadingFontLabel) {
        mobileReadingFontLabel.textContent = readingFont === "serif" ? "Article Font: Serif (Merriweather)" : "Article Font: Sans (Inter)";
      }
      if (mobileColorPickerStrip) {
        const swatches = mobileColorPickerStrip.querySelectorAll(".color-swatch-btn");
        swatches.forEach(btn => {
          if (btn.getAttribute("data-color") === activeAccent) {
            btn.classList.add("active");
          } else {
            btn.classList.remove("active");
          }
        });
      }
      mobileSettingsDialog.showModal();
    });

    if (closeMobileSettingsBtn) {
      closeMobileSettingsBtn.addEventListener("click", () => {
        mobileSettingsDialog.close();
      });
    }

    if (mobileThemeToggleBtn) {
      mobileThemeToggleBtn.addEventListener("click", () => {
        const nextTheme = activeTheme === "dark" ? "light" : "dark";
        applyTheme(nextTheme);
        if (mobileThemeLabel) {
          mobileThemeLabel.textContent = nextTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";
        }
      });
    }

    if (mobileReadingFontToggleBtn) {
      mobileReadingFontToggleBtn.addEventListener("click", () => {
        const nextFont = readingFont === "serif" ? "sans" : "serif";
        applyReadingFont(nextFont);
        if (mobileReadingFontLabel) {
          mobileReadingFontLabel.textContent = nextFont === "serif" ? "Article Font: Serif (Merriweather)" : "Article Font: Sans (Inter)";
        }
      });
    }

    if (mobileColorPickerStrip) {
      mobileColorPickerStrip.addEventListener("click", (e) => {
        const btn = e.target.closest(".color-swatch-btn");
        if (!btn) return;
        const color = btn.getAttribute("data-color");
        applyAccentColor(color);
        const allSwatches = document.querySelectorAll(".color-swatch-btn");
        allSwatches.forEach(b => {
          if (b.getAttribute("data-color") === color) b.classList.add("active");
          else b.classList.remove("active");
        });
      });
    }

    if (mobileWorkspaceBtn) {
      mobileWorkspaceBtn.addEventListener("click", () => {
        mobileSettingsDialog.close();
        workspaceSettingsBtn.click();
      });
    }
  }

  // Desktop App First-Run Setup (ONLY for desktop app users with ?app=1, shown ONCE)
  const firstRunAppDialog = document.getElementById("firstRunAppDialog");
  const firstRunCompleteBtn = document.getElementById("firstRunCompleteBtn");
  const firstRunCompilerDot = document.getElementById("firstRunCompilerDot");
  const firstRunCompilerStatus = document.getElementById("firstRunCompilerStatus");
  const firstRunCompilerActions = document.getElementById("firstRunCompilerActions");
  const firstRunVscodeDot = document.getElementById("firstRunVscodeDot");
  const firstRunVscodeStatus = document.getElementById("firstRunVscodeStatus");
  const firstRunVscodeActions = document.getElementById("firstRunVscodeActions");
  const firstRunTerminalBox = document.getElementById("firstRunTerminalBox");
  const firstRunTerminalTitle = document.getElementById("firstRunTerminalTitle");
  const firstRunTerminalStatus = document.getElementById("firstRunTerminalStatus");
  const firstRunTerminalLog = document.getElementById("firstRunTerminalLog");
  const firstRunBtnInstallGcc = document.getElementById("firstRunBtnInstallGcc");
  const firstRunBtnInstallLlvm = document.getElementById("firstRunBtnInstallLlvm");
  const firstRunBtnInstallVscode = document.getElementById("firstRunBtnInstallVscode");

  async function checkFirstRunApp() {
    const urlParams = new URLSearchParams(window.location.search);
    const isApp = urlParams.get("app") === "1" || window.location.hash === "#app";
    const setupCompleted = localStorage.getItem("quing_app_setup_completed") === "true";

    if (!isApp || setupCompleted || !firstRunAppDialog) return;

    try {
      const resp = await fetch("http://localhost:8000/api/system-status");
      if (resp.ok) {
        const data = await resp.json();

        if (data.compiler) {
          if (firstRunCompilerDot) firstRunCompilerDot.className = "status-indicator-dot connected";
          if (firstRunCompilerStatus) firstRunCompilerStatus.textContent = `${data.compiler.display || "Native C++"} (${data.compiler.version || ""})`;
          if (firstRunCompilerActions) firstRunCompilerActions.style.display = "none";
        } else {
          if (firstRunCompilerDot) firstRunCompilerDot.className = "status-indicator-dot standalone";
          if (firstRunCompilerStatus) firstRunCompilerStatus.textContent = "No compiler found on system";
          if (firstRunCompilerActions) firstRunCompilerActions.style.display = "flex";
        }

        if (data.vscode && data.vscode.installed) {
          if (firstRunVscodeDot) firstRunVscodeDot.className = "status-indicator-dot connected";
          if (firstRunVscodeStatus) firstRunVscodeStatus.textContent = `Installed (${data.vscode.version || "Ready"})`;
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
    firstRunTerminalLog.textContent = `Starting ${title}...\n`;

    try {
      const resp = await fetch("http://localhost:8000/api/setup/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: actionName })
      });

      const reader = resp.body.getReader();
      const decoder = new TextDecoder("utf-8");
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        firstRunTerminalLog.textContent += decoder.decode(value, { stream: true });
        firstRunTerminalLog.scrollTop = firstRunTerminalLog.scrollHeight;
      }

      firstRunTerminalStatus.textContent = "Completed";
      firstRunTerminalStatus.className = "terminal-status-success";
      checkCompanionServer();
      const resp2 = await fetch("http://localhost:8000/api/system-status");
      if (resp2.ok) {
        const d2 = await resp2.json();
        if (d2.compiler && firstRunCompilerActions) {
          firstRunCompilerActions.style.display = "none";
          firstRunCompilerDot.className = "status-indicator-dot connected";
          firstRunCompilerStatus.textContent = `${d2.compiler.display || "Native C++"} (Ready)`;
        }
        if (d2.vscode && d2.vscode.installed && firstRunVscodeActions) {
          firstRunVscodeActions.style.display = "none";
          firstRunVscodeDot.className = "status-indicator-dot connected";
          firstRunVscodeStatus.textContent = "Installed (Ready)";
        }
      }
    } catch (err) {
      firstRunTerminalLog.textContent += `\nError: ${err.message}`;
      firstRunTerminalStatus.textContent = "Error";
      firstRunTerminalStatus.className = "terminal-status-idle";
    }
  }

  if (firstRunBtnInstallGcc) {
    firstRunBtnInstallGcc.addEventListener("click", () => {
      runFirstRunAction("install-portable", "Portable GCC Setup (~35MB)");
    });
  }

  if (firstRunBtnInstallLlvm) {
    firstRunBtnInstallLlvm.addEventListener("click", () => {
      runFirstRunAction("install-llvm", "LLVM Clang++ Setup (winget)");
    });
  }

  if (firstRunBtnInstallVscode) {
    firstRunBtnInstallVscode.addEventListener("click", () => {
      runFirstRunAction("install-vscode", "Visual Studio Code Setup (winget)");
    });
  }

  if (firstRunCompleteBtn) {
    firstRunCompleteBtn.addEventListener("click", () => {
      localStorage.setItem("quing_app_setup_completed", "true");
      firstRunAppDialog.close();
      showToast("Desktop setup complete. Welcome to C++ Core!");
    });
  }

  // Initialize First Lesson & Check Server
  loadLesson(0);
  checkCompanionServer();
  checkFirstRunApp();
});
