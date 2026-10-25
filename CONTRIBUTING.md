# Contributing

C++ Core is a personal project I built to teach myself C++. I open-sourced it in case it would be useful to others. Contributions are welcome, but please read this first.

---

## What the project is

C++ Core is a 30-lesson interactive C++ tutorial that runs as a static single-page web app. There is no framework, bundler, or package manager. The companion servers (`dev_server.js` and `dev_server.py`) use only built-in Node.js modules or Python's standard library.

The foundational curriculum follows the conceptual topic outline of Mike Dane's introductory C++ course published by freeCodeCamp, with original lesson explanations, interactive exercises, drills, and quizzes developed with assistance from Gemini 3.8 Flash and Claude Sonnet 4.6 (Thinking). The capstone projects are adapted from work by Luis Foster.

---

## What I would welcome

- **Lesson corrections.** If something in the curriculum is technically wrong, unclear, or misleading, this is the most useful thing you can flag or fix.
- **Compiler compatibility issues.** If a companion server fails to detect or invoke a compiler on a particular OS or toolchain, a fix or a clear bug report is welcome.
- **Accessibility improvements.** Keyboard navigation, focus states, and colour contrast. If something is difficult to use, please flag it.
- **Browser compatibility bugs.** The platform should work in current versions of Chrome, Firefox, and Edge. If it does not, that is a bug worth reporting.
- **Typos and copy errors.**

---

## What I am unlikely to accept

- **A UI framework.** The platform must remain usable by opening `index.html` directly in a browser. That is not changing.
- **CSS changes that break the design system.** Read `AGENTS.md` before editing `style.css`.
- **Lesson content that departs significantly from the source curriculum without a clear reason.**
- **Undiscussed features.** Open an issue first so we can discuss the idea before you implement it.

---

## How to contribute

1. Fork the repository.
2. Create a branch with a name that describes the change, such as `fix/clang-detection-windows` or `lesson/correct-module-9-example`.
3. Test your changes. Run `node dev_server.js` or `python dev_server.py`, open [http://localhost:8000](http://localhost:8000), and check that nothing is broken.
4. Open a pull request explaining what you changed and why. For bug fixes, include the OS and browser you tested on.

---

## Local setup

You can open `index.html` directly in a browser without installing anything. Native C++ compilation requires a compatible compiler. To run the companion server, you will also need Node.js or Python.

**Windows**

```powershell
winget install -e --id MSYS2.MSYS2
# In the MSYS2 UCRT64 terminal:
pacman -S --noconfirm mingw-w64-ucrt-x86_64-gcc
winget install -e --id OpenJS.NodeJS.LTS
```

**macOS**

```bash
xcode-select --install
```

**Linux (Ubuntu/Debian)**

```bash
sudo apt update && sudo apt install -y build-essential
```

Then, from the project folder, start either companion server:

```bash
node dev_server.js
# or
python dev_server.py
```

---

## Design rules

The UI follows Quing's `slate` design language. Before making visual changes, read `AGENTS.md`. The key constraints are:

- No cards, shadows, or glassmorphism.
- Use the colour tokens defined in `AGENTS.md` rather than introducing ad hoc colours.
- Use Inter Variable for UI text and JetBrains Mono for code.
- Animation and colour should serve a clear purpose, not be added decoratively.
- Follow the fixed spacing scale: `0.25`, `0.5`, `0.75`, `1`, `1.5`, and `3` rem.

---

## Issues

Open a GitHub Issue for bugs, questions, or suggestions. I am a student, so response times may vary.

---

## Licence

C++ Core is licensed under the MIT Licence. See [LICENSE](LICENSE). The fonts in `fonts/` are licensed under the SIL Open Font Licence 1.1.