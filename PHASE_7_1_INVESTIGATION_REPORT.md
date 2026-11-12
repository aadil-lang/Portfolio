# Phase 7.1 — Interactive 3D Engineering Cube
## Investigation Report & Feasibility Assessment

**Date:** 2026-11-12  
**Repository:** `C:\Users\HP\OneDrive\Documents\Portfolio`  
**Standard:** `/engineering-security-reliability` — Level 1  
**Mode:** STRICT READ-ONLY INVESTIGATION  
**Verdict:** **READY FOR IMPLEMENTATION** (with documented visual/UX conditions)

---

## 1. Executive Summary

This report evaluates the architectural feasibility, technical implementation options, visual integration, and risk profile of adding an **Interactive 3D Engineering Cube** to the portfolio homepage hero (`app/page.tsx`).

### Key Findings (Observed Facts)
1. **No Existing 3D Hero:** `components/Hero.tsx` (lines 1–4) is deprecated and returns `null`. The active homepage hero is rendered inline inside **Section 01** of `app/page.tsx` (lines 42–150) as a centered, text-only Server Component layout (`max-w-4xl mx-auto`).
2. **Existing 3D & Animation Capabilities:**
   - **CSS 3D Transforms** are already proven in production in `styles/globals.css` (lines 91–132) for the Engineering Journal's page-turn system (`perspective: 2600px`, `transform-style: preserve-3d`, `backface-visibility: hidden`, `rotateY`).
   - **Framer Motion (`10.12.16`)** is already installed and used across 5 components (`components/ArchitectureViz.tsx`, `components/Journal/JournalBook.tsx`, `JournalCover.tsx`, `JournalSpreadView.tsx`, `TableOfContents.tsx`).
   - **Three.js (`0.187.0`)** is installed in `package.json` and `node_modules`, used exclusively on the EDA case study page via `components/evidence/CadModelViewer.tsx` (497 lines). `@react-three/fiber` is **not** installed.
3. **Framework Baseline:** `package.json` and `package-lock.json` confirm the workspace runs **Next.js `13.4.10`**, **React `18.2.0`**, **TypeScript `^5.4.2`**, and **Tailwind CSS `^3.4.0`**.
4. **Portfolio Content Mapping:** All six proposed capability faces map cleanly to verified, existing routes (`/projects/[slug]`, `/rag-lab`, `/verification`, `/journal`, `/systems`) and the 11 documented projects in `data/projects.ts`.

### Executive Recommendation
Implement the Interactive 3D Engineering Cube using **CSS 3D Transforms + Framer Motion** inside a client component (`components/EngineeringCube/`) dynamically imported into a restructured split hero layout in `app/page.tsx`. **Do not** use Three.js/WebGL for the homepage cube: CSS 3D adds zero new npm dependencies, preserves native DOM accessibility and SEO crawlability, avoids WebGL context overhead on the landing route, and keeps additional First Load JS under ~5 KB.

---

## 2. Homepage Architecture Analysis

### 2.1 Current Layout & Structure (`app/page.tsx` & `app/layout.tsx`)
- `app/layout.tsx` (lines 13–27) wraps all pages in a dark canvas (`bg-[#121518] text-[#F0EEE9]`) with `<Header />`, `<main className="flex-1 container mx-auto px-6 py-12">`, `<Footer />`, and `<AskAadilLauncher />`.
- `app/page.tsx` is a **Server Component** (no `'use client'` directive) organized into six vertical sections separated by `space-y-20 pb-16` (line 38):
  - **Section 01 (lines 42–150):** Hero & Professional Positioning (`max-w-4xl mx-auto text-center space-y-6`). Contains:
    1. Availability badge (`OPEN TO AI ROLES // REMOTE & HYDERABAD`, lines 44–49) with emerald pulse dot (`#5A9A78`).
    2. `<h1>` identity (`{profile.name}`, `text-4xl sm:text-6xl font-serif`) and role subtitle (`AI Engineer | Python | LLM & Agentic Systems | Full-Stack`, `text-[#5A9A78] font-mono`, lines 52–59).
    3. Value proposition `<blockquote>` (lines 62–64).
    4. Engineering Trajectory progression bar (`Mechanical Engineering → ... → Governed Agentic Systems`, lines 67–82).
    5. Eight primary action buttons/links (`/recruiter`, `/architecture`, `/verification`, `/compare`, `/systems`, Resume PDF, `HomepageAskAadilCta`, `/contact`, lines 85–149).
  - **Section 02 (lines 155–291):** Technical Expertise (6-card grid).
  - **Section 03 (lines 296–465):** Flagship Engineering Projects (4-pack grid + 11-system directory link).
  - **Section 04 (lines 470–539):** The Engineering Journey (two-chapter summary + `/experience` and `/journal` links).
  - **Section 05 (lines 544–571):** Ask Aadil Live Agent Showcase.
  - **Section 06 (lines 576–638):** Contact & Collaborate.

### 2.2 Architectural Observation
Section 01 is currently entirely text- and button-based. Introducing a 3D interactive cube provides a spatial visual anchor that summarizes the six engineering domains at a glance without scrolling, while preserving the existing hero's typographic hierarchy and quick-action links.

---

## 3. Existing 3D Infrastructure Assessment

| Technology | Status in Repo | Observed Usage | Suitability for Hero Cube |
|---|---|---|---|
| **CSS 3D Transforms** | Active (`styles/globals.css` lines 91–132) | Journal 3D book page-turn (`perspective: 2600px`, `preserve-3d`, `backface-visibility: hidden`, `rotateY`) | **High** — Ideal for 6 flat interactive HTML faces with text, icons, and links |
| **Framer Motion (`10.12.16`)** | Installed & active in 5 files | `ArchitectureViz.tsx`, `JournalBook.tsx`, `JournalCover.tsx`, `JournalSpreadView.tsx`, `TableOfContents.tsx` | **High** — Already bundled; provides spring physics, pan/swipe, and `useReducedMotion()` |
| **Three.js (`0.187.0`)** | Installed (`package.json` line 18) | Used only in `components/evidence/CadModelViewer.tsx` (497 lines) for EDA 3D shaft WebGL | **Low** — Overkill for 2D typographic faces; adds ~150–200 KB JS + WebGL context to `/` |
| **`@react-three/fiber`** | **Not installed** | None | **Not recommended** — Would add new dependencies and WebGL overhead |

---

## 4. Six-Face Capability Mapping (Validated)

All six proposed capabilities were cross-referenced against `app/` route directories and `data/projects.ts` (11 projects). Every route and project slug below is verified to exist in the repository:

| Face | Orientation | Capability Area | Primary Route | Primary Evidence | Supporting Routes & Projects |
|---|---|---|---|---|---|
| **1 (Front)** | `rotateY(0deg)` | **AI Systems & Agentic Engineering** | `/projects/ask-aadil` | Ask Aadil (327 assertions, state machine, HITL) | `/projects/solace-ai` (LangGraph SSE), `/projects/atlas-ai` (StateGraph) |
| **2 (Right)** | `rotateY(90deg)` | **Retrieval, Knowledge & RAG** | `/rag-lab` | Interactive RAG Lab | `/projects/atlas-ai` (SEC EDGAR RAG), `/projects/ask-aadil` (Hybrid RAG) |
| **3 (Back)** | `rotateY(180deg)` | **Backend & Full-Stack Engineering** | `/projects/loom-ai` | Loom AI (Clean Architecture, Express/Next.js) | `/projects/solace-ai` (FastAPI/Expo 58), `/systems` |
| **4 (Left)** | `rotateY(-90deg)` | **Evaluation, Reliability & Testing** | `/verification` | Portfolio Verification Dashboard | `/projects/ai-reliability` (205+ tests, Fisher), `/projects/ocr-evaluator` (134 tests) |
| **5 (Top)** | `rotateX(90deg)` | **Automation & Engineering Tools** | `/projects/design-automation` | EDA (424 pytests, OpenCascade CAD) | `/projects/ai-worksheets` (TeX Live), `/projects/curriculum-etl` |
| **6 (Bottom)** | `rotateX(-90deg)` | **Human-Centered AI & Interaction** | `/projects/solace-ai` | Solace AI (pre-LLM crisis gate, consent memory) | `/journal` (Engineering narrative & defect logs) |

---

## 5. Technical Approach Recommendation

**Recommended Approach:** **CSS 3D Transforms + Framer Motion (`motion.div`)**

1. **Zero Dependency & Minimal Bundle Cost:** Uses `framer-motion` (`10.12.16`) and CSS transforms already present in the codebase. No new packages required.
2. **Native DOM Accessibility & SEO:** Cube faces remain real HTML elements (`<button>`, `<a>`, headings, Lucide icons) rather than `<canvas>` pixels, allowing screen readers, keyboard navigation, and search crawlers to read all capability content directly.
3. **Compositor-Only Performance:** `rotateX` and `rotateY` animations run on the GPU compositor thread without layout thrashing.
4. **No WebGL Context Risk on Homepage:** Reserving WebGL for `CadModelViewer.tsx` avoids consuming a WebGL context on the landing page and eliminates canvas-to-HTML texture synchronization complexity.

---

## 6. Visual Identity Alignment

From `tailwind.config.js`, `styles/globals.css`, and `app/page.tsx`:
- **Canvas & Surfaces:** `#121518` background with subtle 24px drafting dot grid; `#14171A` / `#16191D` / `#181B1F` matte card surfaces.
- **Borders & Glass:** `#2A2F36` (`border-tech`) and `#3E4752` (`border-accent`), with restrained translucent surface styling (`rgba(22, 25, 29, 0.85)` in `.glass`, `globals.css` lines 154–157).
- **Emerald Accent:** `#5A9A78` (used in `app/page.tsx` lines 45, 56, 80, 91, 126 and `CadModelViewer.tsx` line 65) for active face edge illumination, focus rings, and active indicator dots.
- **Typography:** `font-serif` for capability headings, `font-mono` for technical tags/metrics/CTAs, `font-sans` for concise descriptions.

---

## 7. Integration Point Analysis

Three placement options within `app/page.tsx` Section 01 were evaluated:
- **Option A (Recommended): Split Hero Layout (`lg:` 1024px+):** Left column (~60%) retains the availability badge, `<h1>`, subtitle, blockquote, trajectory, and action CTAs (left-aligned on desktop); right column (~40%) houses the `EngineeringCube` and its navigation controls. On `< lg` viewports, the layout stacks vertically.
- **Option B (Vertical Stack Below/Above):** Keeps `text-center max-w-4xl` unchanged and appends the cube below buttons or above badge. *Drawback:* Pushes the cube below the fold on laptops (`1366×768` / `1440×900`) or pushes the `<h1>` down.
- **Option C (Inline Between Trajectory and Buttons):** Interrupts the vertical reading flow of the hero text block.

Option A (`max-w-6xl mx-auto` container for Section 01 on `lg:`+) keeps both the engineer's positioning statement and the interactive 3D cube visible above the fold on desktop.

---

## 8. Risk Assessment

| Risk | Severity | Mitigation |
|---|---|---|
| **Mobile viewport crowding / 3D clipping** | Medium | Render a flat interactive capability card/grid below `640px` (`< sm`) instead of a cramped 3D cube. |
| **Motion sickness / distraction** | Medium | Limit auto-rotation to a slow cadence (4.5s per face), pause on hover/focus, stop permanently on first user interaction, and replace with a flat 2×3 grid under `prefers-reduced-motion: reduce`. |
| **WebGL / GPU performance** | Low | Mitigated completely by choosing CSS 3D transforms over Three.js WebGL. |
| **CSS 3D `backface-visibility` / pointer hit-testing quirks across browsers** | Medium | Set `pointer-events: none` on non-active faces and provide explicit 2D navigation dots/tabs below the cube as primary accessible controls. |
| **Broken or invented route links** | Low | All 13+ target routes verified against `app/` and `data/projects.ts`. |

---

## 9. Feasibility Verdict

**Verdict: `READY FOR IMPLEMENTATION`**

The portfolio's existing stack (`Next.js 13.4.10`, `React 18.2.0`, `Framer Motion 10.12.16`, `Tailwind CSS 3.4`, `Lucide React`) already contains every primitive required for a restrained, accessible, compositor-accelerated CSS 3D Engineering Cube. Proceeding requires zero new dependencies and preserves all existing portfolio features.

