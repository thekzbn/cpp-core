# C++ Core

A browser-based, locally executed C++ tutorial platform. Part of the [Quing](https://quing.thekzbn.name.ng) open-source project.

**Author:** [Ayomide Deji-Adeyale (@thekzbn)](https://thekzbn.name.ng) · **Curriculum source:** [Mike Dane / freeCodeCamp](https://www.youtube.com/watch?v=vLnPwxZdW4Y) · **Capstones inspired by:** Luis Foster

---

## Why this exists

I built C++ Core to teach myself C++. I had a university exam coming up, and C++ was part of it. But the more honest reason is that my friend Luis Foster had been writing C++ projects I wanted to actually understand. His terminal Wordle, elevation heat map, and Karnaugh map visualiser made me curious about how they worked. I wanted to understand the code behind them, and I could not get there without learning the language properly.

When I looked at the available options, none of them quite fit what I wanted.

Cloud-based compilers such as Wandbox can compile genuine C++ code using real compilers, but they require an internet connection and send your code to an external server. I wanted something I could use offline, and keeping my code on my own machine mattered to me as a developer and university student with a strong interest in security.

WebAssembly-based compilers offer another approach. They can run in the browser without a separate compilation server, but the solutions I considered involved downloading 30 to 50 MB of WebAssembly assets on first load and had performance costs that I did not want to impose on modest hardware. They were interesting technically, but not the right fit for this project.

W3Schools had roughly the layout I wanted. Its side navigation and single scrolling content area made sense for a tutorial platform. However, I wanted an offline environment, not a local copy of an entire website. I was not going to download W3Schools with HTTrack just to get the learning environment I wanted.

So I built the site myself: a static, single-page web application with an optional companion server that compiles code using the C++ toolchain already installed on your machine. Native execution keeps submitted code on your machine rather than sending it to a public compilation service. If the companion server is unavailable, a browser-based simulator provides a fallback for supported examples.

For the curriculum, I took the full transcript of Mike Dane's C++ course, originally published by freeCodeCamp, and used Gemini 3.8 Flash and Claude Sonnet 4.6 (Thinking) to structure it into 30 interactive lessons with exercises, quizzes, and starter code. The four capstone projects at the end are inspired by Luis's original programs. They give learners something more substantial to work towards than isolated exercises.

Some of the smaller decisions were personal, too. The VS Code integration and `.cpp` export exist because I knew I would use them. The theme switcher, custom scrollbars, and accent colour system reflect how much I care about intentional interface design. The overall layout is a direct reference to W3Schools, particularly the side navigation paired with a single scrolling content area.

I am genuinely not sure how effective this will be for other people. I built it because I wanted it, and I decided to open-source it regardless. Depending on how I feel about this project over time, I might build something similar for C.

## What it is

C++ Core is a 30-lesson interactive tutorial that runs in the browser. You write code in an editor, click Run, and the platform either compiles and executes it through your local `g++` or `clang++` compiler using the companion server, or falls back to a client-side simulator.

There is no frontend framework, bundler, or `npm install` requirement. The application is built with HTML, CSS, and JavaScript. Two alternative, zero-dependency companion servers are provided: one in Node.js and one in Python.

**Native execution (recommended).** The companion server receives submitted code, writes it to a temporary directory, compiles it using your installed C++ toolchain, and returns the output to the browser. The compiler is invoked with `-std=c++17 -Wall -O2`. An eight-second watchdog terminates processes that exceed the execution limit. If a compatible compiler cannot be found, the server reports this clearly.

**Browser simulation.** When the companion server is unavailable, the platform switches automatically to a client-side simulator. It supports straightforward examples but does not reproduce every compiler behaviour. Use native execution when you need to test code against a real C++ compiler.

Additional features include:

- Fill-in-the-blank code drills based on real C++ templates, with immediate validation.
- Multiple-choice quizzes with explanations at the end of each lesson.
- A local workspace folder configured through the **Workspace** button in the navigation bar, with an **Open in VS Code** option for lesson files.
- Direct `.cpp` export for any lesson.
- Light and dark themes with persistent preferences.
- Multiple accent colours, including `dodgerblue`, `tomato`, `emerald`, and `violet`, built on the Quing `slate` foundation.
- **From C to C++** callouts in every lesson for learners with prior C experience.

## Curriculum

### Phase 1: Foundations

1. Setup & How C++ Works
2. Anatomy of a C++ Program
3. Variables & Core Data Types
4. Working with Strings
5. Numbers & Math Operations
6. Getting User Input

### Phase 2: Control Flow & Mini Projects

7. Building Mini Projects (Calculator & Mad Libs)
8. Arrays (Fixed-Size Containers)
9. Functions & Return Values
10. If Statements & Logical Operators
11. Switch Statements
12. Loops (While, Do-While & For)
13. Building an Interactive Guessing Game
14. 2D Arrays & Nested Loops

### Phase 3: Memory Architecture

15. Pointers & Memory Addresses

### Phase 4: Object-Oriented C++

16. Classes & Objects
17. Constructors
18. Object Functions (Member Methods)
19. Getters, Setters & Encapsulation
20. Inheritance & Method Overriding

### Phase 5: Intermediate Systems & CLI Graphics

21. Structs, Modulo & Time Distance
22. ANSI Terminal Art & 24-Bit TrueColor
23. STL Vectors & Modern Random Engines

### Phase 6: Capstone Projects (Luis's Project Suite)

24. Capstone 1: Terminal Wordle with TrueColor Themes
25. 2D Vectors, Dynamic Grids & Data Normalisation
26. Capstone 2: 2D Elevation Heat Map Renderer
27. Sets, Maps & Binary Minterm Generation
28. Capstone 3: Boolean Algebra Evaluator & Truth Tables
29. Gray Code & Karnaugh Map Fundamentals
30. Capstone 4: Interactive Karnaugh Map (K-Map) Visualiser

## Execution architecture

I considered three main approaches to running C++ code in the browser.

| Approach | Advantages | Trade-offs |
|---|---|---|
| Public cloud compiler (e.g. Wandbox or Piston API) | Access to a genuine compiler without installing a local toolchain. | Requires an internet connection, sends code to an external service, and depends on that service's availability and limits. |
| Native local execution (chosen) | Uses the learner's installed C++ compiler, keeps code on the machine, and reflects the local toolchain. | Requires `g++` or `clang++` on `PATH` and the companion server to be running. |
| WebAssembly compiler | Runs compilation in the browser without a separate compilation server. | The solutions considered required substantial asset downloads, with additional memory use and potential performance costs on modest hardware. |

I chose native execution because it fit two of my priorities: keeping code local and using a real compiler. For a learning environment, I wanted the code to behave as it would when compiled with the learner's own toolchain, rather than relying on a limited simulation or an external service.

The browser simulator is a fallback, not the primary execution mode. It makes the platform usable without the companion server, but it is not a substitute for native compilation.

## Setup

Native execution requires a compatible C++ compiler and either Node.js or Python to run the companion server. A modern browser is needed for the tutorial itself.

### Windows

Install MSYS2 for GCC:

```powershell
winget install -e --id MSYS2.MSYS2
```

Open the MSYS2 UCRT64 terminal and install GCC:

```bash
pacman -S --noconfirm mingw-w64-ucrt-x86_64-gcc
```

Add `C:\msys64\ucrt64\bin` to your `PATH`.

Alternatively, install LLVM Clang:

```powershell
winget install -e --id LLVM.LLVM
```

Install Node.js for the Node.js companion server:

```powershell
winget install -e --id OpenJS.NodeJS.LTS
```

VS Code is optional:

```powershell
winget install -e --id Microsoft.VisualStudioCode
```

### macOS

Install the Xcode Command Line Tools:

```bash
xcode-select --install
```

You can optionally install GCC through Homebrew:

```bash
brew install gcc
```

### Linux (Ubuntu / Debian)

Install the standard build tools:

```bash
sudo apt update && sudo apt install -y build-essential gdb
```

## Running the project

### With native compilation

Start either companion server from the project directory:

```bash
node dev_server.js
```

Or:

```bash
python dev_server.py
```

Then open [http://localhost:8000](http://localhost:8000) in your browser. Click **Workspace** in the navigation bar to check compiler detection.

On Windows, `start_server.bat` performs the equivalent of starting the Node.js server.

### Without the companion server

Open `index.html` directly in Chrome, Firefox, or Edge. The platform automatically switches to browser simulation mode when the companion server is unavailable.

For code that needs a real compiler, use native execution instead.

## Fonts

Font files are in `fonts/`. Both font families are licensed under the SIL Open Font Licence 1.1.

| File | Family |
|---|---|
| `InterVariable.ttf` | Inter Variable |
| `InterVariable-Italic.ttf` | Inter Variable Italic |
| `Inter.ttc` | Inter (static) |
| `JetBrainsMono-VariableFont_wght.ttf` | JetBrains Mono Variable |
| `JetBrainsMono-Italic-VariableFont_wght.ttf` | JetBrains Mono Italic Variable |

## Credits

- **Curriculum:** Mike Dane / [freeCodeCamp](https://www.youtube.com/watch?v=vLnPwxZdW4Y).
- **Capstone projects:** Inspired by original C++ programs by Luis Foster.
- **Platform:** Ayomide Deji-Adeyale · [thekzbn.name.ng](https://thekzbn.name.ng) · [@thekzbn_me](https://x.com/thekzbn_me).
- **AI assistance:** Gemini 3.8 Flash and Claude Sonnet 4.6 (Thinking), used to help structure lesson content and develop exercises and quizzes.
- **Layout reference:** W3Schools.

See [CREDITS.md](CREDITS.md) for full attribution details.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## Licence

MIT. See [LICENSE](LICENSE) for the full licence text. Fonts in `fonts/` are distributed under the SIL Open Font Licence 1.1.

---

Part of the [Quing](https://quing.thekzbn.name.ng) open-source project. See also [Reeda](https://github.com/thekzbn/reeda).