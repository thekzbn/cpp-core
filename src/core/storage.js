// src/core/storage.js - Persistent state: workspace root, completed lessons, preferences
(function () {
  "use strict";

  var completedLessons = new Set(
    JSON.parse(localStorage.getItem("cpp_completed_lessons") || "[]")
  );
  var workspaceRoot =
    localStorage.getItem("cpp_workspace_root") || "C:\\cpp_projects";
  var directoryHandle = null;
  var currentLessonIndex = 0;

  function saveCompletedLessons() {
    localStorage.setItem(
      "cpp_completed_lessons",
      JSON.stringify([...completedLessons])
    );
  }

  function addCompleted(id) {
    completedLessons.add(id);
    saveCompletedLessons();
  }

  function removeCompleted(id) {
    completedLessons.delete(id);
    saveCompletedLessons();
  }

  function hasCompleted(id) {
    return completedLessons.has(id);
  }

  function setWorkspaceRoot(val) {
    workspaceRoot = val;
    localStorage.setItem("cpp_workspace_root", val);
  }

  window.QuingApp = window.QuingApp || {};
  window.QuingApp.storage = {
    get completedLessons() { return completedLessons; },
    get workspaceRoot() { return workspaceRoot; },
    get directoryHandle() { return directoryHandle; },
    set directoryHandle(val) { directoryHandle = val; },
    get currentLessonIndex() { return currentLessonIndex; },
    set currentLessonIndex(val) { currentLessonIndex = val; },
    addCompleted: addCompleted,
    removeCompleted: removeCompleted,
    hasCompleted: hasCompleted,
    setWorkspaceRoot: setWorkspaceRoot
  };
})();
