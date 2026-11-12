# Phase 7.1 — Interactive 3D Engineering Cube
## Interaction & UX Specification

**Date:** 2026-11-12  
**Repository:** `C:\Users\HP\OneDrive\Documents\Portfolio`  
**Standard:** `/engineering-security-reliability` — Level 1  
**Mode:** STRICT READ-ONLY SPECIFICATION

---

## 1. Interaction Philosophy

The Engineering Cube is a **spatial navigation instrument**, not a decorative 3D screensaver or free-orbit CAD viewer (unlike `CadModelViewer.tsx`, which models a physical transmission shaft). Every interaction must feel deliberate, deterministic, and restrained:
- **Discrete Face Snapping:** The cube always settles cleanly onto one of six orthogonal capability faces (90° increments).
- **Zero Disorientation:** Users never get stuck at awkward oblique angles or upside-down text.
- **Dual Access:** Direct 3D spatial manipulation (click/swipe/arrows) is always paired with explicit 2D face-selector tabs/dots below the cube.

---

## 2. Cube Rotation Model

- **3D Space:** CSS `perspective: 1200px` on the outer viewport wrapper; `transform-style: preserve-3d` on the inner cube scene container.
- **Face Geometry:** For a cube of side length `S` (responsive per breakpoint), each of the 6 faces is positioned at `translateZ(S / 2)` after its base orientation:
  - Face 1 (Front): `rotateY(0deg) translateZ(S/2)`
  - Face 2 (Right): `rotateY(90deg) translateZ(S/2)`
  - Face 3 (Back): `rotateY(180deg) translateZ(S/2)`
  - Face 4 (Left): `rotateY(-90deg) translateZ(S/2)`
  - Face 5 (Top): `rotateX(90deg) translateZ(S/2)`
  - Face 6 (Bottom): `rotateX(-90deg) translateZ(S/2)`
- **Target Scene Rotation:** To bring a face to the front, the cube scene animates to the inverse rotation (`rotateX`, `rotateY`):
  - Face 1: `{ rotateX: 0, rotateY: 0 }`
  - Face 2: `{ rotateX: 0, rotateY: -90 }`
  - Face 3: `{ rotateX: 0, rotateY: -180 }`
  - Face 4: `{ rotateX: 0, rotateY: 90 }`
  - Face 5: `{ rotateX: -90, rotateY: 0 }`
  - Face 6: `{ rotateX: 90, rotateY: 0 }`
- **Transition Physics:** Framer Motion spring transition (`type: "spring"`, `stiffness: 100`, `damping: 20`, `mass: 1`) for crisp, damped mechanical settling without bouncy overshoot.

---

## 3. Face Selection Mechanism

1. **Direct Tab/Dot Selection (Primary):** Six labeled indicator controls below the cube allow jumping directly to any capability face in a single click/tap.
2. **Directional Step Controls:** Subtle Previous / Next arrow buttons flank the indicator dots for sequential stepping.
3. **On-Face Primary CTA:** The currently active front face displays a clear link/button (e.g., `Explore Ask Aadil →`) that navigates to the capability's primary route, plus compact secondary project chips.
4. **Inactive Face Pointer Guard:** Non-front faces use `pointer-events: none` (and `aria-hidden="true"` when not active) so oblique back-facing links cannot be accidentally clicked.

---

## 4. Input Methods

### 4.1 Pointer (Desktop)
- **Hover on Cube Container:** Pauses auto-rotation; illuminates the active face's emerald edge border (`#5A9A78`).
- **Click on Face Selector Dots / Step Arrows:** Rotates directly to the selected face.
- **Click on Active Face CTA:** Navigates to the mapped portfolio route via Next.js `<Link>`.
- **No Free-Drag Orbit:** Free 360° mouse dragging is intentionally omitted so text remains upright and legible and visitors do not confuse the navigator with a 3D mesh inspector.

### 4.2 Touch (Mobile & Tablet)
- **Horizontal Swipe (`|dx| > 50px`, `|dx| > |dy|`):** Rotates horizontally to the next/previous lateral face (Faces 1 → 2 → 3 → 4).
- **Vertical Swipe (`|dy| > 50px`, `|dy| > |dx|`):** Rotates vertically to Top (Face 5) or Bottom (Face 6), or returns to Front (Face 1).
- **Tap Indicator Dots:** Jumps directly to the tapped face (minimum 24×24px touch target).

### 4.3 Keyboard
- **Tab:** Moves focus into the capability tablist (`role="tablist"`), then into the active face's navigation link(s).
- **ArrowRight / ArrowLeft:** Cycles horizontally through faces and updates the active tab.
- **ArrowUp / ArrowDown:** Cycles to Top/Bottom faces (or next/previous face in the 6-face sequence).
- **Home / Escape:** Resets the cube to Face 1 (Front — AI Systems & Agentic Engineering).
- **Enter / Space:** On a focused tab, activates that face; on the active face's CTA link, navigates to the route.

---

## 5. Auto-Rotation Behavior

- **Initial State:** On desktop/tablet viewports (when `prefers-reduced-motion` is `false`), the cube gently cycles through faces once every **4.5 seconds** (4500ms) using a deterministic `setInterval` — avoiding continuous `requestAnimationFrame` spin loops.
- **Pause on Hover / Focus:** Hovering over the cube or focusing any control inside the cube region immediately pauses the timer.
- **Permanent Stop on First Explicit Interaction:** Once the user clicks a tab/dot, swipes, or presses an arrow key to select a face, `hasInteracted` becomes `true` and auto-rotation stops permanently for the session so the cube never rotates away while the user is reading.
- **Reduced Motion:** Auto-rotation is completely disabled.

---

## 6. Face Content & Navigation Targets

Each face displays four restrained elements matching the portfolio's technical aesthetic:
1. **Index & Domain Tag** (e.g., `01 // AGENTIC SYSTEMS`, `font-mono text-[10px] text-[#5A9A78]`)
2. **Icon + Capability Title** (Lucide icon + `font-serif font-bold text-[#F0EEE9]`)
3. **Concise Grounded Summary + 2–3 Project Chips** (e.g., `Ask Aadil · Solace AI · Atlas AI`)
4. **Primary Navigation CTA** (`<Link>` to verified portfolio route)

| Face | Capability | Primary Route | Secondary Links / Chips |
|---|---|---|---|
| **1 (Front)** | AI Systems & Agentic Engineering | `/projects/ask-aadil` | `Solace AI` (`/projects/solace-ai`), `Atlas AI` (`/projects/atlas-ai`) |
| **2 (Right)** | Retrieval, Knowledge & RAG | `/rag-lab` | `Atlas AI` (`/projects/atlas-ai`), `Ask Aadil` (`/projects/ask-aadil`) |
| **3 (Back)** | Backend & Full-Stack Engineering | `/projects/loom-ai` | `Solace AI` (`/projects/solace-ai`), `Systems` (`/systems`) |
| **4 (Left)** | Evaluation, Reliability & Testing | `/verification` | `AI Reliability` (`/projects/ai-reliability`), `OCR Evaluator` (`/projects/ocr-evaluator`) |
| **5 (Top)** | Automation & Engineering Tools | `/projects/design-automation` | `AI Worksheets` (`/projects/ai-worksheets`), `Curriculum ETL` (`/projects/curriculum-etl`) |
| **6 (Bottom)** | Human-Centered AI & Interaction | `/projects/solace-ai` | `Journal` (`/journal`) |

---

## 7. Visual Feedback & State Indicators

- **Active Face Surface:** Matte dark glass (`bg-[#14171A]/90`) with crisp `1px` emerald-tinted border (`border-[#5A9A78]/50`) and subtle inner top highlight.
- **Inactive Face Surfaces:** Deeper translucent slate (`bg-[#121518]/80`) with `border-[#2A2F36]` (`border-tech`), creating subtle depth around the edges during rotation.
- **Indicator Dots / Pills:** Active face indicator uses `#5A9A78` fill; inactive dots use `#2A2F36` border with `#686E77` / `#9EA4AA` hover states.
- **Focus Ring:** `focus-visible:ring-2 focus-visible:ring-[#5A9A78] focus-visible:ring-offset-2 focus-visible:ring-offset-[#121518]`.

---

## 8. Responsive Behavior (5 Breakpoint Ranges)

Aligns with existing Tailwind breakpoints in `app/page.tsx` and `components/Header.tsx` (`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`):

| Viewport Range | Layout Strategy | Cube Dimensions | Content Density |
|---|---|---|---|
| **Mobile (`< 640px`)** | **No 3D cube.** Render a flat, single-column swipeable card or compact 2×3 capability grid below hero CTAs. | N/A (Flat cards) | Icon, Title, 1-line summary, Primary Link |
| **Small Tablet (`640px – 767px`, `sm:`)** | Centered vertical stack; cube positioned below hero headline/CTAs. | `240px × 240px` (`translateZ(120px)`) | Icon, Title, Primary Link (compact) |
| **Tablet (`768px – 1023px`, `md:`)** | Centered vertical stack with breathing room. | `280px × 280px` (`translateZ(140px)`) | Full face content (Title, summary, chips, CTA) |
| **Desktop (`1024px – 1279px`, `lg:`)** | **Split Hero:** Left column (~60%) hero text/CTAs; Right column (~40%) 3D cube. | `300px × 300px` (`translateZ(150px)`) | Full face content + keyboard/dot controls |
| **Wide Desktop (`1280px+`, `xl:`)** | **Full Split Hero** (matches `Header.tsx` desktop nav breakpoint). | `340px × 340px` (`translateZ(170px)`) | Full face content + subtle ambient grid framing |

---

## 9. Reduced Motion Fallback

Respecting `@media (prefers-reduced-motion: reduce)` (`styles/globals.css` lines 187–195) and Framer Motion's `useReducedMotion()`:
- The 3D perspective/rotation stage is replaced by a **static, accessible 2×3 (or 3×2) flat capability grid** displaying all six faces simultaneously.
- Zero rotation animations, zero auto-rotation timers, and instant state selection.
- Every capability route and project chip remains immediately clickable.

---

## 10. Mobile-Specific Interactions

- On `< 640px`, avoiding a 3D CSS cube prevents text legibility issues, `overflow-x` horizontal scrollbars, and cramped touch targets.
- On `640px – 1023px`, touch swipe detection (`onPanEnd` with `50px` threshold) uses `touch-action: pan-y` on the cube container so vertical page scrolling is never hijacked by horizontal cube swipes.

