// app.js - Application Entry Point & Subsystem Orchestrator for Quing C++ Core

document.addEventListener("DOMContentLoaded", function () {
  // 1. Initialize core state and appearance
  window.QuingApp.theme.init();

  // 2. Initialize UI components
  window.QuingApp.editor.init();
  window.QuingApp.terminal.init();
  window.QuingApp.drills.init();
  window.QuingApp.dialogs.init();

  // 3. Initialize toolchain integrations
  window.QuingApp.toolchain.init();

  // 4. Initialize navigation, tree rendering, and search
  window.QuingApp.navigation.init();

  // 5. Load first lesson and perform background health checks
  window.QuingApp.navigation.loadLesson(0);
  window.QuingApp.toolchain.checkCompanionServer();
  window.QuingApp.toolchain.checkFirstRunApp();
});
