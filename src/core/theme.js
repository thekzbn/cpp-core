// src/core/theme.js - Dark/light mode, accent color, and reading typography management
(function () {
  "use strict";

  var activeTheme =
    localStorage.getItem("cpp_theme") ||
    (window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark");
  var activeAccent =
    localStorage.getItem("cpp_accent_color") || "dodgerblue";
  var readingFont =
    localStorage.getItem("quing_reading_font") || "sans";

  var htmlEl = document.documentElement;

  function applyTheme(theme) {
    activeTheme = theme;
    htmlEl.setAttribute("data-theme", theme);
    localStorage.setItem("cpp_theme", theme);
  }

  function applyAccent(accent) {
    activeAccent = accent;
    htmlEl.setAttribute("data-accent", accent);
    localStorage.setItem("cpp_accent_color", accent);

    // Sync all swatch strips (dialog + mobile)
    document.querySelectorAll(".color-swatch-btn").forEach(function (btn) {
      if (btn.dataset.color === accent) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  function applyReadingFont(font) {
    readingFont = font;
    localStorage.setItem("quing_reading_font", font);

    var readingFontLabel = document.getElementById("readingFontLabel");
    if (readingFontLabel) {
      readingFontLabel.textContent = font === "serif" ? "Sans" : "Serif";
    }

    var lessonBody = document.getElementById("lessonBody");
    var lessonSummary = document.getElementById("lessonSummary");

    if (font === "serif") {
      // Dynamically load Merriweather only on demand (Quing guideline)
      if (!document.getElementById("merriweatherFontLink")) {
        var link = document.createElement("link");
        link.id = "merriweatherFontLink";
        link.rel = "stylesheet";
        link.href =
          "https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300..900;1,300..900&display=swap";
        document.head.appendChild(link);
      }
      if (lessonBody) lessonBody.setAttribute("data-reading-font", "serif");
      if (lessonSummary)
        lessonSummary.setAttribute("data-reading-font", "serif");
    } else {
      if (lessonBody) lessonBody.removeAttribute("data-reading-font");
      if (lessonSummary) lessonSummary.removeAttribute("data-reading-font");
    }
  }

  function init() {
    applyTheme(activeTheme);
    applyAccent(activeAccent);
    applyReadingFont(readingFont);

    var themeToggleBtn = document.getElementById("themeToggleBtn");
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener("click", function () {
        applyTheme(activeTheme === "dark" ? "light" : "dark");
      });
    }

    var readingFontToggleBtn = document.getElementById("readingFontToggleBtn");
    if (readingFontToggleBtn) {
      readingFontToggleBtn.addEventListener("click", function () {
        applyReadingFont(readingFont === "serif" ? "sans" : "serif");
      });
    }

    // Dialog color picker strip
    var colorPickerStrip = document.getElementById("colorPickerStrip");
    if (colorPickerStrip) {
      colorPickerStrip.addEventListener("click", function (e) {
        var btn = e.target.closest(".color-swatch-btn");
        if (btn && btn.dataset.color) {
          applyAccent(btn.dataset.color);
        }
      });
    }
  }

  window.QuingApp = window.QuingApp || {};
  window.QuingApp.theme = {
    init: init,
    applyTheme: applyTheme,
    applyAccent: applyAccent,
    applyReadingFont: applyReadingFont,
    get activeTheme() { return activeTheme; },
    get activeAccent() { return activeAccent; },
    get readingFont() { return readingFont; }
  };
})();
