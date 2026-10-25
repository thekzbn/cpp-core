# AGENTS.md

This project adheres to the official **Quing** brand style guide (`slate` design language), intentional interface design principles, and local-first execution standards:

## Brand & Interface Principles (Quing `slate`)
- Company identity: **Quing** (title case). Design language: **slate** (all-lowercase). Product: **learn.quing** / **Quing learn**.
- Minimal, serious, and deliberate: nothing moves or is colored unless required. Ornament is absent.
- Avoid default UI tropes: no brutalism, no editorial styling, no dashboard metric grids, no glassmorphism, no card-wrapped layouts.
- Color system:
  - `--start`: `#FFFFFF` (light) / `#151B25` (dark)
  - `--end`: `#151B25` (light) / `#FFFFFF` (dark)
  - `--cornflower`: `#AEB8C4` (light) / `#3A4655` (dark)
  - `--charcoal`: `#214358` (light) / `#7DA1B8` (dark)
  - `--ocean`: `#9CA6B8` (light) / `#4B596E` (dark)
  - `--alert`: `#FF6347`
  - `--go`: `#3CB371`
  - Multi-accent themes maintained on slate foundation: `slate` (monochrome), `dodgerblue`, `tomato`, `mediumseagreen`, `emerald`, `violet`, `amber`, `cyan`.
- Typography & Font Loading:
  - Primary UI: `Inter Variable` linked via `rsms.me`, with offline `local()` fallbacks.
  - Code: `JetBrains Mono Variable` / `JetBrains Mono` for all monospace contexts with offline `local()` fallbacks.
  - Conditional Serif: `Merriweather` dynamically loaded only when the user explicitly enables serif reading mode for article body text.
  - OpenType features enabled globally: `liga`, `calt`, `zero`, and stylistic sets `cv01` through `cv14`.
  - Body text uses weight 400. Headings use weights 600 or 700. No weight between 501 and 599.
  - Heading titles maintain natural casing suitable for learning applications (not forced lowercase).
- Spacing & Geometry:
  - Strict rem scale: `0.25rem`, `0.5rem`, `0.75rem`, `1rem`, `1.5rem`, `3rem`.
  - Border radius restricted to `0.25rem`, `0.5rem`, or `1rem`.
  - Drop shadows are strictly forbidden (`box-shadow: none`).
  - Max readable content width: `42.5rem`.
  - Non-essential motion uses `cubic-bezier(0.57, -0.01, 0.21, 0.89)` with duration `0.5s`, removed under `prefers-reduced-motion`.
- Links are colored `--end` and never underlined.
- Custom theme-based scrollbars matching active contrast tokens.
- Native File System Access API and companion server for direct local project folder synchronization without downloads folder redirection.
- No label, badge, or eyebrow above headings (per `/think` skill precedence).
- Beginner-first explanations with clear transitional notes for learners coming from a C background.

## Execution Architecture & Tradeoffs
- **Primary Execution Engine (Option 2 - Local Native Companion Server):**
  - Prioritizes user privacy, zero telemetry, and true parity with production compilers (`g++` / `clang++`).
  - Supported via zero-dependency companion servers (`dev_server.js` and `dev_server.py`).
  - Safe execution: compiles with `-std=c++17 -Wall -O2`, isolates temporary artifacts in OS temp directories with automatic cleanup, and enforces an 8-second execution watchdog timer to prevent infinite loops.
- **Offline / Standalone Fallback:**
  - If the companion server is offline or no native compiler is on PATH, the client gracefully falls back to the in-browser simulator.
  - The UI explicitly communicates execution mode via the `#compilerBadge` in the terminal header.
- **Toolchain Onboarding:**
  - First-time setup friction is minimized through copy-pasteable package manager commands (`winget`, `brew`, `apt`) surfaced directly inside the Workspace modal and README.
