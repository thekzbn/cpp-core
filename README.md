# C++ Core

A browser-based, locally executed C++ tutorial platform. Part of the [Quing](https://quing.thekzbn.name.ng) open-source project.

**Author:** [Ayomide Deji-Adeyale (@thekzbn)](https://thekzbn.name.ng) · **Curriculum reference:** [Mike Dane / freeCodeCamp](https://www.youtube.com/watch?v=vLnPwxZdW4Y) (Foundational topics) · **Capstones inspired by:** Luis Foster

---

## Why this exists

I built C++ Core to teach myself C++. I had a university exam coming up, and C++ was part of it. But the more honest reason is that my friend Luis Foster had been writing C++ projects I wanted to actually understand. His terminal Wordle, elevation heat map, and Karnaugh map visualiser made me curious about how they worked. I wanted to understand the code behind them, and I could not get there without learning the language properly.

When I looked at the available options, none of them quite fit what I wanted.

Cloud-based compilers such as Wandbox can compile genuine C++ code using real compilers, but they require an internet connection and send your code to an external server. I wanted something I could use offline, and keeping my code on my own machine mattered to me as a developer and university student with a strong interest in security.

WebAssembly-based compilers offer another approach. They can run in the browser without a separate compilation server, but the solutions I considered involved downloading 30 to 50 MB of WebAssembly assets on first load and had performance costs that I did not want to impose on modest hardware. They were interesting technically, but not the right fit for this project.

W3Schools had roughly the layout I wanted. Its side navigation and single scrolling content area made sense for a tutorial platform. However, I wanted an offline environment, not a local copy of an entire website. I was not going to download W3Schools with HTTrack just to get the learning environment I wanted.

So I built the site myself: a static, single-page web application with an optional companion server that compiles code using the C++ toolchain already installed on your machine. Native execution keeps submitted code on your machine rather than sending it to a public compilation service. If the companion server is unavailable, a browser-based simulator provides a fallback for supported examples.

For the curriculum, I referenced the conceptual topic progression from Mike Dane's introductory C++ course (published by freeCodeCamp) as a syllabus outline for the foundational concepts, and worked with Gemini 3.8 Flash and Claude Sonnet 4.6 (Thinking) to write original explanations, transitional notes for C programmers, interactive fill-in-the-blank code drills, quizzes, and starter programs. The intermediate topics and four capstone projects at the end are inspired by Luis's original programs, giving learners substantial real-world applications to work towards.

Some of the smaller decisions were personal, too. The VS Code integration and `.cpp` export exist because I knew I would use them. The theme switcher, custom scrollbars, and accent colour system reflect how much I care about intentional interface design. The overall layout is a direct reference to W3Schools, particularly the side navigation paired with a single scrolling content area.

I am genuinely not sure how effective this will be for other people. I built it because I wanted it, and I decided to open-source it regardless. Depending on how I feel about this project over time, I might build something similar for C.

## What it is

C++ Core is a 58-lesson interactive tutorial that runs in the browser. You write code in an editor, click Run, and the platform either compiles and executes it through your local `g++` or `clang++` compiler using the companion server, or falls back to a client-side simulator.

There is no frontend framework, bundler, or `npm install` requirement. The application is built with HTML, CSS, and JavaScript. Two alternative, zero-dependency companion servers are provided: one in Node.js and one in Python.

**Native execution (recommended).** The companion server receives submitted code, writes it to a temporary directory, compiles it using your installed C++ toolchain, and returns the output to the browser. The compiler is invoked with `-std=c++17 -Wall -O2`. An eight-second watchdog terminates processes that exceed the execution limit. If a compatible compiler cannot be found, the server reports this clearly.

**Browser simulation.** When the companion server is unavailable, the platform switches automatically to a client-side simulator. It supports straightforward examples but does not reproduce every compiler behaviour. Use native execution when you need to test code against a real C++ compiler.

Additional features include:

- Code editor and lesson explanation code blocks with line numbers.
- Interactive standard input support (`std::cin` & `std::getline`) in the browser simulator, including stream buffer clearing with `cin.ignore()`.
- Fill-in-the-blank code drills based on real C++ templates, with immediate validation.
- Multiple-choice quizzes with explanations at the end of each lesson.
- A local workspace folder configured through the **Workspace** button in the navigation bar, with an **Open in VS Code** option for lesson files.
- Self-contained Windows launcher that bundles the app, companion server, and Node.js runtime; it can run from any folder without adjacent project files. The release launcher is currently unsigned.
- In-app 1-click toolchain setup for portable GCC (`w64devkit` ~35MB), LLVM Clang, and VS Code.
- Direct `.cpp` export for any lesson.
- Light and dark themes with persistent preferences and mobile-responsive settings drawer.
- Multiple accent colours, including `dodgerblue`, `tomato`, `emerald`, and `violet`, built on the Quing `slate` foundation.
- **From C to C++** callouts in every lesson for learners with prior C experience.

## Curriculum

### Phase 1: Foundations

1. Setup & How C++ Works
2. Anatomy of a C++ Program
3. Variables & Core Data Types
4. Working with Strings
5. Numbers & Math Operations
6. Getting User Input (cin & getline)

### Phase 2: Control Flow & Mini Projects

7. Building Mini Projects: Calculator & Mad Libs
8. Arrays (Fixed Size Containers)
9. Functions & Return Values
10. If Statements & Logical Operators
11. Switch Statements
12. Loops: While, Do-While & For
13. Building an Interactive Guessing Game
14. 2D Arrays & Nested Loops

### Phase 3: Memory Architecture

15. Pointers & Memory Addresses

### Phase 4: Object-Oriented C++

16. Classes & Objects
17. Constructors & Initialisation Lists
18. Object Functions (Member Methods)
19. Getters, Setters & Encapsulation
20. Inheritance & Method Overriding

### Phase 5: Intermediate Systems & CLI Graphics

21. Structs, Modulo & Time Calculations
22. ANSI Terminal Art & 24-Bit TrueColor
23. STL Vectors & Modern Random Engines

### Phase 6: Capstone Projects (Luis's Project Suite)

24. Capstone 1: Terminal Wordle with TrueColor Themes
25. 2D Vectors, Dynamic Grids & Data Normalisation
26. Capstone 2: 2D Elevation Heat Map Renderer
27. Sets, Maps & Binary Minterm Generation
28. Capstone 3: Boolean Algebra Evaluator & Truth Tables
29. Gray Code & Karnaugh Map Fundamentals
30. Capstone 4: Interactive Karnaugh Map Visualiser

### Phase 7: Extended Foundations & Practice

31. Constants, Type Casting & Explicit Conversions
32. Interactive BMI Calculator Project
33. String Comparison & Advanced Member Methods
34. Pass-by-Value vs Pass-by-Reference
35. Exception Handling Mechanics (try, catch, throw)
36. Interactive Grade Calculator with Input Validation
37. Virtual Functions, Pure Interfaces & Polymorphism
38. Interactive Bank Account System (OOP + Input)
39. Pointers vs References Side-by-Side Comparison
40. Interactive Word & Character Counter Utility
41. Function Overloading & Name Mangling
42. File I/O: Reading & Writing Files

### Phase 8: Systems Architecture & Memory

43. Scope, Storage Duration & Object Lifecycles
44. Dynamic Memory Allocation (new / delete) & Stack vs Heap

### Phase 9: Modern Standard Template Library (STL)

45. Standard Template Library Sequence Containers (std::array & std::vector)
46. Standard Template Library Associative Containers (std::map & std::unordered_map)
47. Lambda Expressions, Closures & Captures
48. Standard Algorithms & Iterator Mechanics

### Phase 10: Modern Memory, Safety & Generic Programming

49. Smart Pointers (std::unique_ptr & std::shared_ptr) & RAII
50. Function & Class Templates (Generic Programming)
51. Move Semantics & Copy-vs-Move Operations
52. Modern C++ Features: auto, range-for, std::optional & std::string_view
53. Exception Safety Guarantees & RAII Resource Management
54. Operator Overloading (Binary & Unary Operators)
55. C++20 Concepts, Requirements & Type Traits

### Phase 11: Advanced Engineering

56. Concurrency & Multithreading (std::thread, std::async, std::mutex)
57. Unit Testing Frameworks (Catch2 & GTest)
58. Secure C++ Engineering, Buffer Overflow Avoidance & Code Hardening

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

C++ Core supports three ways to run across Windows, macOS, and Linux:

### 1. Direct Web / Offline Mode (Any OS — Zero Install)
You can open **`index.html`** directly in any web browser (Chrome, Firefox, Safari, Edge) on **Windows, macOS, or Linux**:
- Requires **zero installations**, zero servers, and works 100% offline.
- Runs all exercises and lessons using the built-in browser C++ simulator.

---

### 2. Windows (Desktop App & 1-Click Pipeline Setup)

1. Double-click **`Quing C++ Core.exe`** from any folder.
   - The executable contains the app files, companion server, and Node.js runtime. It prepares these files in your local app data folder, then opens the tutorial in a browser app window. You do not need `dev_server.js` or Node.js beside the executable.
   - A C++ compiler is still needed for native compilation. Without one, the browser simulator remains available.
   - If you prefer to start the server manually, run `start_server.bat` from the project folder; that option uses your installed Node.js.
2. In the navigation bar, click **Workspace**:
   - The assistant auto-detects what is already installed on your PC.
   - If a tool is already installed (like VS Code or existing GCC/Clang), it shows **Installed ✓** and will never attempt a redundant install.
   - If you need a compiler, click **Install Portable GCC (~35MB)** for an instant zero-install C++17 compiler (zero admin rights, zero PATH editing, microscopic footprint on modest PCs).
   - Alternatively, click **Install LLVM** or **Install VS Code** to trigger automatic installation via `winget`.

If running manually from terminal:

```powershell
node dev_server.js
# Or with Python:
python dev_server.py
```

---

### 3. macOS & Linux

Run the launcher script:

```bash
chmod +x start_server.sh
./start_server.sh
```
This automatically boots the server and opens `http://localhost:8000` in your default browser.

#### Compiler Setup for macOS
Install the Xcode Command Line Tools (Apple Clang):

```bash
xcode-select --install
```

#### Compiler Setup for Linux
Install GCC using your distribution's package manager:

```bash
# Debian / Ubuntu / Mint:
sudo apt update && sudo apt install -y g++

# Arch / Manjaro:
sudo pacman -S gcc

# Fedora / RHEL:
sudo dnf install gcc-c++
```

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

## Releases

Download versioned portable packages and read the release notes on the
[GitHub Releases page](https://github.com/thekzbn/cpp-core/releases). The
Windows package contains a self-contained launcher and documentation. You can
copy the `.exe` out of the ZIP and run it by itself; it includes the app files,
companion server, and Node.js runtime. An installed browser is still required,
and native C++ execution requires a C++ compiler. The portable package contains
the app and server files for running directly with Node.js or Python. The
Windows launcher is currently unsigned, so Windows may show an unknown-publisher
warning. See [RELEASING.md](RELEASING.md) for how versions and packages are produced.

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

- **Foundational Curriculum Reference:** Topic outline based on Mike Dane / [freeCodeCamp](https://www.youtube.com/watch?v=vLnPwxZdW4Y).
- **Capstone projects:** Inspired by original C++ programs by Luis Foster.
- **Platform:** Ayomide Deji-Adeyale · [thekzbn.name.ng](https://thekzbn.name.ng) · [@thekzbn_me](https://x.com/thekzbn_me).
- **AI assistance:** Gemini 3.8 Flash and Claude Sonnet 4.6 (Thinking), used to help write and structure original lesson content, exercises, and quizzes.
- **Layout reference:** W3Schools.

See [CREDITS.md](CREDITS.md) for full attribution details.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## Licence

MIT. See [LICENSE](LICENSE) for the full licence text. Fonts in `fonts/` are distributed under the SIL Open Font Licence 1.1.

---

Part of the [Quing](https://quing.thekzbn.name.ng) open-source project. See also [Reeda](https://github.com/thekzbn/reeda).
