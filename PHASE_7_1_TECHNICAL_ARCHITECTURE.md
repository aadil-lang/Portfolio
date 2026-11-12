# Phase 7.1 — Interactive 3D Engineering Cube
## Technical Architecture Specification

**Date:** 2026-11-12  
**Repository:** `C:\Users\HP\OneDrive\Documents\Portfolio`  
**Standard:** `/engineering-security-reliability` — Level 1  
**Mode:** STRICT READ-ONLY SPECIFICATION

---

## 1. Rendering Approach Analysis

| Criterion | CSS 3D Transforms + Framer Motion (Recommended) | Three.js WebGL (Evaluated & Rejected) | `@react-three/fiber` (Evaluated & Rejected) |
|---|---|---|---|
| **Installed in `package.json`?** | Yes (`framer-motion: 10.12.16`) | Yes (`three: ^0.187.0` used in `CadModelViewer.tsx`) | **No** |
| **Additional First Load JS on `/`** | **≤ 5 KB** (component logic only; Framer Motion already in repo) | **~150–200 KB** (Three.js core + renderer) | **~200–260 KB** (Three.js + R3F + Drei) |
| **SSR / Next.js App Router** | Compatible with `next/dynamic` (`ssr: false` or progressive SSR shell) | Client-only `<canvas>` | Client-only `<canvas>` |
| **DOM & Screen Reader Access** | **Native HTML DOM** inside each face | Requires manual HTML-to-texture or hidden DOM mirror | Requires `<Html>` overlay or hidden DOM mirror |
| **GPU / Context Overhead** | Compositor-only CSS `transform` | Allocates a WebGL context on `/` (browser limits ~8–16 contexts) | Allocates a WebGL context on `/` |
| **Proven in Repo?** | Yes (`styles/globals.css` lines 91–132) | Yes (`CadModelViewer.tsx`, 497 lines) | No |

**Architectural Decision:** Use **CSS 3D Transforms + Framer Motion**. The cube's purpose is typographic, iconographic, and navigational — not arbitrary 3D mesh shading. CSS 3D delivers crisp subpixel text at any DPI without texture blurring.

---

## 2. CSS 3D Transforms Deep Dive

Following the established pattern in `styles/globals.css` (lines 91–132, `.book-spread-container`, `perspective`, `transform-style: preserve-3d`, `backface-visibility: hidden`), the cube uses three CSS layers:

1. **Perspective Stage (`.cube-perspective`):**
   - `perspective: 1200px;`
   - `perspective-origin: 50% 50%;`
2. **3D Scene Wrapper (`.cube-scene`, rendered as `motion.div`):**
   - `transform-style: preserve-3d;`
   - `will-change: transform;`
   - Explicit square dimensions matching breakpoint (`240px`, `280px`, `300px`, `340px`) and CSS custom property `--cube-half` (`120px`, `140px`, `150px`, `170px`).
3. **Six Orthogonal Faces (`.cube-face`):**
   - `position: absolute; inset: 0;`
   - `backface-visibility: hidden; -webkit-backface-visibility: hidden;`
   - Positioned via `rotateY(deg) translateZ(var(--cube-half))` or `rotateX(deg) translateZ(var(--cube-half))`.

---

## 3. Three.js WebGL Analysis (Evaluated and Rejected)

Although `three` (`0.187.0`) is installed and used cleanly in `components/evidence/CadModelViewer.tsx` (lines 18–217), adopting it for the homepage hero cube introduces unnecessary engineering trade-offs:
- Rendering crisp interactive links, Lucide icons, and hoverable chips onto WebGL faces requires either `CanvasTexture` / `html2canvas` (blurry on HiDPI, non-interactive links) or `CSS3DRenderer` (which still uses CSS 3D transforms under the hood while pulling in Three.js math/camera overhead).
- `app/page.tsx` currently loads **0 WebGL contexts** and keeps homepage JS minimal. Keeping Three.js isolated to `/projects/design-automation` (`CadModelViewer.tsx`) preserves fast initial load on `/`.

---

## 4. Component Architecture

All new UI code lives in a self-contained directory `components/EngineeringCube/` backed by structured data in `data/cubeCapabilities.ts`:

```text
app/page.tsx (Server Component — Section 01 Hero)
└── dynamic(() => import('../components/EngineeringCube'))
    └── components/EngineeringCube/EngineeringCube.tsx ('use client')
        ├── useCubeState.ts          # Active face index, target angles, auto-rotate, reduced-motion
        ├── CubeContainer.tsx        # Responsive sizing, perspective stage, pan/swipe gesture wrapper
        ├── CubeFace.tsx             # Individual face surface, emerald active border, links/chips
        ├── CubeNavigation.tsx       # Accessible tablist dots, Prev/Next buttons, keyboard handler
        └── ReducedMotionGrid.tsx    # Flat 2x3 grid fallback for <640px and prefers-reduced-motion
```

---

## 5. State Management

State is local to `EngineeringCube` via a custom `useCubeState` hook (`useReducer` + `useEffect`), requiring no global Zustand or Context provider:

```typescript
export type FaceIndex = 0 | 1 | 2 | 3 | 4 | 5

export interface CubeState {
  activeFace: FaceIndex
  rotateX: number
  rotateY: number
  isAutoRotating: boolean
  isPaused: boolean
  hasInteracted: boolean
}
```

- **Rotation Angle Mapping:** Selecting a face sets `(rotateX, rotateY)` to its canonical orthogonal coordinates.
- **Auto-Rotation Lifecycle:** A `setInterval(..., 4500)` advances `activeFace` through the lateral/all faces only when `isAutoRotating && !isPaused && !hasInteracted && !prefersReducedMotion`. Any `SELECT_FACE`, `STEP_NEXT`, `STEP_PREV`, or `SWIPE` action sets `hasInteracted: true` and clears the timer permanently.

---

## 6. Animation Strategy

- **Framer Motion (`10.12.16`):**
  - Uses `motion.div` on the `.cube-scene` element with `animate={{ rotateX: state.rotateX, rotateY: state.rotateY }}`.
  - Transition: `transition={{ type: 'spring', stiffness: 100, damping: 20, mass: 1 }}`.
  - Swipe detection via `onPanEnd` (checking `info.offset.x` / `info.offset.y` against a `50px` threshold).
  - Reduced motion via Framer Motion's `useReducedMotion()` hook (paired with CSS `@media (prefers-reduced-motion: reduce)` in `styles/globals.css`).

---

## 7. Integration Architecture (`app/page.tsx`)

`app/page.tsx` remains a **Server Component** so metadata export (lines 30–34) and static HTML rendering of Sections 01–06 are preserved:

```tsx
// app/page.tsx
import dynamic from 'next/dynamic'

const EngineeringCube = dynamic(
  () => import('../components/EngineeringCube'),
  {
    ssr: false,
    loading: () => <div className="w-[280px] h-[280px] lg:w-[300px] lg:h-[300px] xl:w-[340px] xl:h-[340px] rounded-xl border border-[#2A2F36] bg-[#14171A] animate-pulse mx-auto" />
  }
)
```

In Section 01 (`app/page.tsx` lines 42–150), the outer `<section>` widens from `max-w-4xl` to `max-w-6xl mx-auto px-4 pt-4 sm:pt-10` with a responsive grid:
- `< lg`: Single column centered (`text-center`), cube/cards stacked cleanly.
- `lg:`+: Two-column split (`grid-cols-1 lg:grid-cols-12 items-center gap-10`), with hero copy & CTAs in `lg:col-span-7 text-left` and `EngineeringCube` in `lg:col-span-5 flex justify-center`.

---

## 8. File Manifest

### New Files (8)
1. `data/cubeCapabilities.ts` — Strongly typed array of 6 capability objects (id, index, label, title, summary, iconName, primaryRoute, supportingLinks, orientation).
2. `components/EngineeringCube/useCubeState.ts` — State reducer, auto-rotation timer, keyboard/swipe actions.
3. `components/EngineeringCube/CubeFace.tsx` — Single face UI component.
4. `components/EngineeringCube/CubeContainer.tsx` — 3D perspective & responsive size wrapper.
5. `components/EngineeringCube/CubeNavigation.tsx` — Tablist dots + Prev/Next controls.
6. `components/EngineeringCube/ReducedMotionGrid.tsx` — Flat 2×3 / 1-col grid for `<640px` and `prefers-reduced-motion`.
7. `components/EngineeringCube/EngineeringCube.tsx` — Top-level `'use client'` orchestrator.
8. `components/EngineeringCube/index.ts` — Barrel export.

### Modified Files (2)
1. `app/page.tsx` — Section 01 split layout + `next/dynamic` import of `EngineeringCube`.
2. `styles/globals.css` — `.cube-perspective`, `.cube-scene`, `.cube-face` utility classes (~20 lines).

---

## 9. Dependencies Assessment

- **Zero new packages.**
- Reuses `framer-motion` (`10.12.16`), `lucide-react` (`0.276.0`), `next/link`, `next/dynamic`, `react` (`18.2.0`), and `tailwindcss` (`^3.4.0`).
- `package.json` and `package-lock.json` remain untouched.

