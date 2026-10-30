# Changelog

User-facing changes for each release are recorded here. Versions use
`MAJOR.MINOR.PATCH.REVISION`, with an optional `-alpha` or `-beta` suffix.


## 0.1.4.0 - 2026-10-30

### Refactored

- Decomposed the monolithic `app.js` controller into a clean modular subsystem architecture under `src/`:
  - `src/core/storage.js`: Workspace root, completed lessons state, and persistent preferences.
  - `src/core/theme.js`: Dark/light themes, multi-accent palette, and dynamic Merriweather font loading.
  - `src/compiler/native-runner.js`: Companion server communication and native GCC/Clang execution engine.
  - `src/compiler/toolchain.js`: Toolchain diagnostics, compiler detection, and automated 1-click installers.
  - `src/ui/terminal.js`: ANSI terminal escape parser, status indicators, and interactive stdin stream handling.
  - `src/ui/editor.js`: Gutter line numbering synchronization, tab indentation, and clipboard helpers.
  - `src/ui/navigation.js`: Sidebar tree rendering, full-text & code search indexing, and curriculum progress.
  - `src/ui/drills.js`: Interactive fill-in-the-blank exercises and conceptual quizzes.
  - `src/ui/dialogs.js`: Unified workspace settings modal, direct folder binding, VS Code integration, and mobile drawer.
- Reduced `app.js` to a concise entry point orchestrator (<25 lines).
- Updated desktop packaging (`launcher.cs` and `build_launcher.ps1`) to package and extract the modular subsystems into the native executable.


## 0.1.3.5 - 2026-10-30

### Fixed

- Fix simulator transpiler syntax errors caused by modern C++ uniform brace initialization (`Type var{val};`, `Type var{};`), `std::` namespacing, `std::cerr`, and brace-initialized `stringstream`/`out_of_range`. All 58 lessons now execute cleanly in browser simulation mode without `Unexpected token '{'` runtime errors.
- Cleanly route interactive `cin` and `getline` lessons through the native GCC companion server first, gracefully falling back to browser simulation only when the server is offline.
- Fix execution syntax error in `app.js` and eliminate duplicate block closures.

### Changed

- Consolidate navigation header controls: remove color swatch picker strip, serif/sans toggle, and workspace text button from the top bar into a single, unified Settings gear button.
- Integrate Appearance & Typography (theme swatches, Sans/Serif reading mode) directly inside the Preferences & Workspace Settings dialog for a clean, deliberate interface following Quing `slate` design principles.


## 0.1.3.0 - 2026-10-30

### Fixed

- Route all C++ execution — including lessons with `cin` and `getline` — through
  the native GCC companion server first, instead of defaulting immediately to the
  browser simulator. The simulator is now a true last resort, only engaged when
  the companion server is offline or no compiler is installed.
- Compile errors and runtime failures from GCC are correctly surfaced in the
  terminal with the native compiler label and accurate exit codes.
- Badge now shows `No Compiler on PATH` (warning style) when the server is
  reachable but no compiler is detected, before falling through to the simulator.
- Add a 20-second `AbortSignal.timeout` on the native fetch so a hung server
  cannot block the run button indefinitely.


## 0.1.2.1 - 2026-10-30

### Changed

- Restructure curriculum progression so the Capstone Applications Suite is positioned at the very end after all foundational, memory, OOP, extended, STL, generic, and advanced engineering lessons.
- Integrate complete production-grade blueprints, theoretical foundations, implementation walkthroughs, and full source code from `capstone.md` into the culminating milestone capstones (Terminal Wordle, 2D Elevation Heat Map Renderer, Boolean Algebra Evaluator, and Interactive Karnaugh Map Visualiser).
- Reorder and renumber lessons to reflect this pedagogical sequence:
  - Lessons 1–23: Foundations, Control Flow, Memory, OOP, and Intermediate Systems.
  - Lessons 24–35: Foundations Extended (Type Casting, Strings, References, Exceptions, Overloading, File I/O).
  - Lessons 36–37: Object-Oriented Extended (Polymorphism & OOP Banking).
  - Lesson 38: Memory Architecture Extended (Pointers vs References).
  - Lessons 39–40: Systems Architecture (Storage Durations & Dynamic Heap Allocation).
  - Lessons 41–44: Modern STL Systems (Containers, Lambdas & Algorithms).
  - Lessons 45–47: Modern Memory & Safety (Smart Pointers, Move Semantics & Exception Safety).
  - Lessons 48–50: Generic Programming (Templates, Operator Overloading & C++20 Concepts).
  - Lesson 51: Modern C++ Idioms (auto, range-for, optional, string_view) and Advanced Engineering (Concurrency, Testing & Security).
  - Lessons 52–58: Culminating Capstone Applications (Wordle, 2D Grids, Elevation Heat Map, Sets/Maps/Minterms, Boolean Evaluator, Gray Code, and K-Map Visualiser).



## 0.1.2.0 - 2026-10-30

### Added

- Expand curriculum to 58 comprehensive lessons (adding Lessons 43–58), introducing modern C++ architecture, memory management, and engineering practices:
  - Systems Architecture: Storage durations, object lifecycles, and dynamic heap allocation (`new`/`delete`).
  - Modern STL Systems: Sequence containers (`std::array`, `std::vector`), associative containers (`std::map`, `std::unordered_map`), lambda expressions & closures, algorithms, and iterators.
  - Modern Memory & Safety: Smart pointers (`std::unique_ptr`, `std::shared_ptr`), RAII, move semantics, and exception safety guarantees.
  - Generic Programming: Function and class templates, operator overloading, and C++20 concepts & constraints.
  - Modern C++ Idioms: `auto`, range-based `for` loops, `std::optional`, and `std::string_view`.
  - Advanced Engineering: Standard concurrency & multithreading (`std::thread`, `std::async`, `std::mutex`), unit testing frameworks (Catch2 & GTest), and secure C++ engineering practices.
- Add complete interactive drills, quizzes with explanations, starter code, and transitional C-bridge notes for all 58 lessons.

### Changed

- Update `lessons.md` curriculum specification and `lessons.js` application data to the 58-lesson modernized curriculum.
- Graduate release line from `0.1.1.7-beta` to stable production release `0.1.2.0`.
- Update documentation and README to reflect the full 58-lesson syllabus and expanded subject coverage.



## 0.1.1.7-beta - 2026-10-26

### Fixed

- Rebuilt build launcher so action runs properly.


## 0.1.1.5-beta - 2026-10-26

### Added

- Extend browser simulator support for common C++ stream, file, string, and loop patterns.
- Add an interactive BankAccount flow for deposits, withdrawals, balance checks, and exit.


## 0.1.1 - 2026-10-25

### Added

- Add lessons 31–42, extending the curriculum with type casting, references,
  exceptions, polymorphism, function overloading, file I/O, and interactive programs.
- Add interactive terminal input in the browser simulator so learners can respond
  to `cin` and `getline` prompts while a program runs.
- Establish a tagged GitHub release process with downloadable portable packages
  and SHA-256 checksums.
- Embed the value from `VERSION` in the Windows launcher's file properties for
  both local builds and GitHub release builds.
- Bundle the app, companion server, fonts, and Node.js runtime inside the
  Windows launcher so it can run without adjacent project files.

### Changed

- Expand the README curriculum and update the Windows launcher description to
  match the unsigned release package.
- Improve capstone guidance with staged implementation steps and input validation.

### Fixed

- Correct lesson content string boundaries so JavaScript loads the curriculum
  and renders the lesson navigation.