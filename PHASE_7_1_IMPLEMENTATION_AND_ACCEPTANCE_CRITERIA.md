# Phase 7.1 — Interactive 3D Engineering Cube
## Implementation Scope & Acceptance Criteria

**Date:** 2026-11-12  
**Repository:** `C:\Users\HP\OneDrive\Documents\Portfolio`  
**Standard:** `/engineering-security-reliability` — Level 1  
**Mode:** STRICT READ-ONLY SPECIFICATION

---

## 1. Implementation Scope

### In Scope
- Build `EngineeringCube` using **CSS 3D Transforms + Framer Motion (`10.12.16`)**.
- Restructure **Section 01** in `app/page.tsx` (lines 42–150) into a responsive split hero (`lg:`+) integrating the cube alongside existing positioning copy and CTAs.
- Populate all 6 capability faces in `data/cubeCapabilities.ts` mapped strictly to verified portfolio routes and projects.
- Implement pointer, touch swipe, keyboard (`ArrowLeft`/`Right`/`Up`/`Down`, `Enter`, `Escape`/`Home`), and tablist navigation.
- Implement gentle auto-rotation (4.5s interval) that pauses on hover/focus and stops permanently on first user interaction.
- Implement flat-grid fallback for `< 640px` viewports and `prefers-reduced-motion: reduce`.

### Out of Scope
- Three.js / WebGL or `@react-three/fiber` rendering on the homepage.
- Installing new npm dependencies or modifying `package.json`.
- Modifying existing pages (`/journal`, `/experience`, `/architecture`, `/verification`, `/compare`, `/rag-lab`, `/recruiter`, `/projects/*`, `/systems/*`).
- Modifying `components/evidence/CadModelViewer.tsx` or `components/Header.tsx`.
- Inventing new routes, project slugs, or unverified metrics.

---

## 2. File Manifest (Planned Implementation)

### New Files (8)
| # | Path | Responsibility | Est. Size |
|---|---|---|---|
| 1 | `data/cubeCapabilities.ts` | Six capability definitions, routes, chips, and orthogonal face angles | ~90 lines |
| 2 | `components/EngineeringCube/useCubeState.ts` | `useReducer` state, auto-rotation timer, interaction lock, reduced-motion check | ~75 lines |
| 3 | `components/EngineeringCube/CubeFace.tsx` | Single face UI (tag, icon, title, summary, project chips, primary `<Link>`) | ~85 lines |
| 4 | `components/EngineeringCube/CubeContainer.tsx` | 3D perspective stage, responsive cube sizing, `onPanEnd` swipe handler | ~65 lines |
| 5 | `components/EngineeringCube/CubeNavigation.tsx` | Accessible `role="tablist"` dots, Prev/Next step buttons, `aria-live` region | ~75 lines |
| 6 | `components/EngineeringCube/ReducedMotionGrid.tsx` | Flat 2×3 / 1-column capability cards for `< 640px` and `prefers-reduced-motion` | ~70 lines |
| 7 | `components/EngineeringCube/EngineeringCube.tsx` | Main `'use client'` composition component | ~110 lines |
| 8 | `components/EngineeringCube/index.ts` | Public barrel export | ~3 lines |

### Modified Files (2)
| # | Path | Change |
|---|---|---|
| 1 | `app/page.tsx` | Dynamic import of `EngineeringCube` + split hero layout in Section 01 (lines 42–150) |
| 2 | `styles/globals.css` | Add `.cube-perspective`, `.cube-scene`, and `.cube-face` CSS 3D rules (~20 lines) |

---

## 3. Six-Face Capability Mapping Table (Verified)

| Face | Transform | Capability Area | Primary Route | Primary Project / Hub | Supporting Routes |
|---|---|---|---|---|---|
| **1 (Front)** | `rotateY(0deg)` | AI Systems & Agentic Engineering | `/projects/ask-aadil` | Ask Aadil (327 assertions) | `/projects/solace-ai`, `/projects/atlas-ai` |
| **2 (Right)** | `rotateY(90deg)` | Retrieval, Knowledge & RAG | `/rag-lab` | Interactive RAG Lab | `/projects/atlas-ai`, `/projects/ask-aadil` |
| **3 (Back)** | `rotateY(180deg)` | Backend & Full-Stack Engineering | `/projects/loom-ai` | Loom AI | `/projects/solace-ai`, `/systems` |
| **4 (Left)** | `rotateY(-90deg)` | Evaluation, Reliability & Testing | `/verification` | Verification Dashboard | `/projects/ai-reliability`, `/projects/ocr-evaluator` |
| **5 (Top)** | `rotateX(90deg)` | Automation & Engineering Tools | `/projects/design-automation` | EDA (424 pytests) | `/projects/ai-worksheets`, `/projects/curriculum-etl` |
| **6 (Bottom)** | `rotateX(-90deg)` | Human-Centered AI & Interaction | `/projects/solace-ai` | Solace AI | `/journal` |

All routes verified against `app/` directory; all project slugs verified against `data/projects.ts`.

---

## 4. Component Implementation Order

1. `data/cubeCapabilities.ts`
2. `styles/globals.css` (CSS 3D utility classes)
3. `components/EngineeringCube/useCubeState.ts`
4. `components/EngineeringCube/CubeFace.tsx`
5. `components/EngineeringCube/CubeContainer.tsx`
6. `components/EngineeringCube/CubeNavigation.tsx`
7. `components/EngineeringCube/ReducedMotionGrid.tsx`
8. `components/EngineeringCube/EngineeringCube.tsx` & `index.ts`
9. `app/page.tsx` (Hero integration)

---

## 5. Acceptance Criteria

### Visual Criteria (V1–V5)
- **V1:** Cube faces render with matte dark translucent surfaces (`bg-[#14171A]/90`) and crisp `1px` borders matching the portfolio's cartographic palette.
- **V2:** Active face displays restrained `#5A9A78` emerald border illumination; inactive faces remain muted (`#2A2F36`).
- **V3:** Cube sizes scale cleanly across breakpoints (`240px` sm, `280px` md, `300px` lg, `340px` xl) with zero horizontal overflow.
- **V4:** Split hero layout aligns text left and cube right at `lg:` (`1024px+`), stacking cleanly below `1024px`.
- **V5:** Skeleton loader matches final cube dimensions (`CLS ≤ 0.1`).

### Functional Criteria (F1–F8)
- **F1:** Clicking any indicator dot/tab or step arrow rotates the cube smoothly to the corresponding face.
- **F2:** Keyboard `ArrowLeft`/`ArrowRight`/`ArrowUp`/`ArrowDown` rotate between faces; `Escape`/`Home` resets to Face 1.
- **F3:** Touch swipe (`> 50px`) rotates to adjacent faces without blocking vertical page scroll (`touch-action: pan-y`).
- **F4:** Auto-rotation cycles faces every `4.5s` on load, pauses on hover/focus, and stops permanently after the first explicit user interaction.
- **F5:** Every primary and secondary link navigates to a valid, HTTP-200 portfolio route.
- **F6:** Inactive faces have `pointer-events: none` so rear links cannot be clicked through front faces.
- **F7:** Viewports `< 640px` render the flat capability card/grid view.
- **F8:** `EngineeringCube` loads via `next/dynamic` (`ssr: false`).

### Accessibility Criteria (A1–A6)
- **A1:** Semantic `role="tablist"`, `role="tab"` (`aria-selected`), and polite `aria-live` announcements on user-initiated face changes.
- **A2:** Full keyboard operability with visible `2px` `#5A9A78` focus ring (`focus-visible`).
- **A3:** Inactive faces excluded from tab order (`tabIndex={-1}`) and screen reader tree (`aria-hidden="true"`).
- **A4:** `prefers-reduced-motion: reduce` disables all rotation/auto-rotation and renders the flat 2×3 `ReducedMotionGrid`.
- **A5:** Text contrast meets WCAG 2.2 AA (`≥ 4.5:1` for body/labels, `≥ 3:1` for UI borders/indicators).
- **A6:** All interactive indicator dots and buttons meet WCAG 2.2 target size (`≥ 24×24px` hit area).

### Performance & Regression Criteria (P1–P4, R1–R4)
- **P1:** Zero new packages added to `package.json`.
- **P2:** Additional First Load JS on `/` is `≤ 5 KB` gzipped; zero WebGL contexts created on `/`.
- **P3:** Animations use compositor-only `transform` and `opacity` properties at 60fps.
- **P4:** Lighthouse Performance and Accessibility scores remain `≥ 95`.
- **R1:** All existing Section 01 hero elements (availability badge, `<h1>`, subtitle, trajectory, 8 action buttons) remain intact and functional.
- **R2:** Sections 02–06 of `app/page.tsx` and all other portfolio routes remain unaffected.
- **R3:** `npx tsc --noEmit` passes with 0 errors.
- **R4:** `npm run build` succeeds cleanly.

---

## 6. Unresolved Questions for Implementation

1. **Hero Button Density in Split Layout:** Section 01 currently has 8 action buttons (`app/page.tsx` lines 85–149). During implementation, confirm whether all 8 wrap cleanly inside a `lg:col-span-7` left column or if secondary buttons should sit in a tighter two-row cluster.
2. **Auto-Rotation Cycle Scope:** Confirm whether initial auto-rotation should cycle only the 4 horizontal faces (`1 → 2 → 3 → 4`) for visual calm, or all 6 faces including Top/Bottom (`5`, `6`).
3. **Mobile (`< 640px`) Presentation:** Confirm preference between a compact 2×3 grid vs. a horizontal swipeable card deck on `< 640px` viewports.

---

## 7. Final Verdict

**`READY FOR IMPLEMENTATION`**

All architectural prerequisites, routes, project mappings, design tokens, and accessibility strategies are verified against the live repository. Implementation can proceed cleanly with zero new dependencies and minimal bundle impact once the three minor UX preferences above are confirmed.

