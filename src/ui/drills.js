// src/ui/drills.js - Interactive fill-in-the-blank exercises and concept verification quizzes
(function () {
  "use strict";

  var drillInstructions = document.getElementById("drillInstructions");
  var fillBlankContainer = document.getElementById("fillBlankContainer");
  var checkBlanksBtn = document.getElementById("checkBlanksBtn");
  var revealBlanksBtn = document.getElementById("revealBlanksBtn");
  var drillFeedback = document.getElementById("drillFeedback");

  var quizQuestion = document.getElementById("quizQuestion");
  var quizOptions = document.getElementById("quizOptions");
  var quizFeedback = document.getElementById("quizFeedback");

  function renderFillBlanks(drill) {
    if (!drillInstructions || !fillBlankContainer || !drill) return;
    if (drillFeedback) {
      drillFeedback.textContent = "";
      drillFeedback.className = "drill-feedback-message";
    }
    drillInstructions.textContent = drill.instructions || "";

    var templateHtml = drill.codeTemplate || "";
    if (drill.blanks) {
      drill.blanks.forEach(function (b) {
        var placeholder = "___" + b.id + "___";
        var inputHtml =
          '<input type="text" class="blank-input" data-blank-id="' +
          b.id +
          '" placeholder="?" autocomplete="off" spellcheck="false" title="' +
          (b.hint || "") +
          '">';
        templateHtml = templateHtml.replace(placeholder, inputHtml);
      });
    }

    fillBlankContainer.innerHTML = templateHtml;
  }

  function renderQuiz(quiz) {
    if (!quizQuestion || !quizOptions || !quiz) return;
    quizQuestion.textContent = quiz.question || "";
    quizOptions.innerHTML = "";
    if (quizFeedback) {
      quizFeedback.classList.add("hidden");
      quizFeedback.textContent = "";
    }

    if (quiz.options) {
      quiz.options.forEach(function (optText, optIdx) {
        var btn = document.createElement("button");
        btn.className = "quiz-option-btn";
        btn.textContent = optText;

        btn.addEventListener("click", function () {
          var allBtns = quizOptions.querySelectorAll(".quiz-option-btn");
          allBtns.forEach(function (b) {
            b.disabled = true;
          });

          if (optIdx === quiz.answer) {
            btn.classList.add("selected-correct");
            if (quizFeedback) {
              quizFeedback.textContent = "Correct! " + quiz.explanation;
              quizFeedback.style.borderColor = "var(--success)";
            }
          } else {
            btn.classList.add("selected-wrong");
            if (allBtns[quiz.answer]) {
              allBtns[quiz.answer].classList.add("selected-correct");
            }
            if (quizFeedback) {
              quizFeedback.textContent = "Not quite. " + quiz.explanation;
              quizFeedback.style.borderColor = "var(--error)";
            }
          }
          if (quizFeedback) quizFeedback.classList.remove("hidden");
        });

        quizOptions.appendChild(btn);
      });
    }
  }

  function init() {
    if (checkBlanksBtn) {
      checkBlanksBtn.addEventListener("click", function () {
        var currentLessonIndex = window.QuingApp.storage.currentLessonIndex;
        if (typeof LESSONS_DATA === "undefined" || !LESSONS_DATA[currentLessonIndex]) return;
        var lesson = LESSONS_DATA[currentLessonIndex];
        if (!fillBlankContainer) return;
        var inputs = fillBlankContainer.querySelectorAll(".blank-input");
        var allCorrect = true;

        inputs.forEach(function (inp) {
          var id = parseInt(inp.dataset.blankId, 10);
          var blankData = lesson.fillBlank.blanks.find(function (b) {
            return b.id === id;
          });
          var userVal = inp.value.trim();

          if (blankData && userVal.toLowerCase() === blankData.answer.toLowerCase()) {
            inp.className = "blank-input correct";
          } else {
            inp.className = "blank-input incorrect";
            allCorrect = false;
          }
        });

        if (drillFeedback) {
          if (allCorrect) {
            drillFeedback.textContent = "Great job! All blank fields are filled correctly.";
            drillFeedback.className = "drill-feedback-message correct";
          } else {
            drillFeedback.textContent =
              "Some answers are incorrect. Hover over blank inputs for hints, or click 'Reveal Answers'.";
            drillFeedback.className = "drill-feedback-message incorrect";
          }
        }
      });
    }

    if (revealBlanksBtn) {
      revealBlanksBtn.addEventListener("click", function () {
        var currentLessonIndex = window.QuingApp.storage.currentLessonIndex;
        if (typeof LESSONS_DATA === "undefined" || !LESSONS_DATA[currentLessonIndex]) return;
        var lesson = LESSONS_DATA[currentLessonIndex];
        if (!fillBlankContainer) return;
        var inputs = fillBlankContainer.querySelectorAll(".blank-input");
        inputs.forEach(function (inp) {
          var id = parseInt(inp.dataset.blankId, 10);
          var blankData = lesson.fillBlank.blanks.find(function (b) {
            return b.id === id;
          });
          if (blankData) {
            inp.value = blankData.answer;
            inp.className = "blank-input correct";
          }
        });
        if (drillFeedback) {
          drillFeedback.textContent =
            "Answers revealed. Take note of how each keyword and operator functions in C++.";
          drillFeedback.className = "drill-feedback-message";
        }
      });
    }
  }

  window.QuingApp = window.QuingApp || {};
  window.QuingApp.drills = {
    init: init,
    renderFillBlanks: renderFillBlanks,
    renderQuiz: renderQuiz
  };
})();
