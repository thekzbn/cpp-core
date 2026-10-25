# CLAUDE.md

Guidelines for developing and maintaining the Quing learn (`learn.quing`) C++ Interactive Learning Platform:

- Brand Identity: **Quing** (title case), design language **slate** (all lowercase).
- Visual style: Non-card, flow-based document presentation with clear typographic structure conforming to Quing's slate system.
- Colors:
  - Base tokens: `--start` (#FFFFFF / #151B25), `--end` (#151B25 / #FFFFFF), `--cornflower` (#AEB8C4 / #3A4655), `--charcoal` (#214358 / #7DA1B8), `--ocean` (#9CA6B8 / #4B596E), `--alert` (#FF6347), `--go` (#3CB371).
  - Multi-theme accents: `slate` (monochrome), `dodgerblue` (#1e90ff), `tomato` (#ff6347), `mediumseagreen` (#3cb371), `emerald` (#10b981), `violet` (#8b5cf6), `amber` (#f59e0b), and `cyan` (#06b6d4).
- Typography:
  - UI & body: `Inter Variable` linked via `rsms.me`, with offline `local()` fallbacks.
  - Code: `JetBrains Mono Variable` for all monospace contexts with offline `local()` fallbacks.
  - Conditional Serif: `Merriweather` dynamically loaded only if explicitly toggled for reading text.
  - Heading titles maintain natural casing suitable for learning applications.
  - Body weight 400. Headings weight 600/700. No weights 501–599.
- Spacing & Geometry:
  - Strict rem scale: 0.25rem, 0.5rem, 0.75rem, 1rem, 1.5rem, 3rem.
  - Border radius: 0.25rem, 0.5rem, or 1rem.
  - Drop shadows are never used (`box-shadow: none`).
  - Max readable content width: 42.5rem.
- Motion: Base duration 0.5s with cubic-bezier(0.57, -0.01, 0.21, 0.89); disabled under prefers-reduced-motion.
- Custom theme-based scrollbars matching active contrast tokens.
- Native File System Access API and companion server for direct local project folder synchronization without downloads folder redirection.
- Execution Engine: Native local compilation via zero-dependency companion server (`dev_server.js` / `dev_server.py`) with 8-second watchdog cutoff and automatic fallback to browser simulation when offline.
- Desktop App: Standalone Windows executable launcher (`Quing C++ Core.exe`) with Authenticode digital signature, auto-detecting Chromium app mode or dedicated browser window.
- Code Presentation: Synchronized line numbers on the code editor gutter and line-numbered syntax blocks on all lesson explanations.
- Standard Input: Multi-line `cin` / `getline` stream support across both native execution and simulator.
- Responsive Navigation: Mobile header collapses settings into a dedicated Quing Slate modal.

## Commit Message Convention
Format all commits as:
```text
<tag>(<scope>): <commit title>

Message:
- <what the changes were for: motivation / purpose>
- <what the changes were for: benefits / context>

Changes:
- <what changes there were: specific file or logic modifications>
- <what changes there were: additions or removals>
```
Tags: `feat`, `fix`, `docs`, `style`, `refactor`, `chore`.
