# Changelog

User-facing changes for each release are recorded here. Versions use
`MAJOR.MINOR.PATCH.REVISION`, with an optional `-alpha` or `-beta` suffix.


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

## 0.1.1.5-beta - 2026-10-26

### Added

- Extend browser simulator support for common C++ stream, file, string, and loop patterns.
- Add an interactive BankAccount flow for deposits, withdrawals, balance checks, and exit.

## 0.1.1.7-beta - 2026-10-26

### Fixed

- Rebuilt build launcher so action runs properly