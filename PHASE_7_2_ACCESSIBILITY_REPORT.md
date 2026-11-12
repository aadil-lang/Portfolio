# Phase 7.2 — Interactive 3D Engineering Cube
## Accessibility Report (WCAG 2.2 AA)

**Date:** 2026-11-12  
**Repository:** `C:\Users\HP\OneDrive\Documents\Portfolio`  
**Standard:** `/engineering-security-reliability` — Level 1 (WCAG 2.2 AA)

---

## 1. Semantic Structure & ARIA Compliance

- **Semantic Navigation Links:** All primary and supporting capability destinations use Next.js `<Link>` (`<a>`) elements (`CubeFace.tsx`, `ReducedMotionGrid.tsx`).
- **No Misused Tab Roles:** Per Phase 7.2 requirements, `role="tablist"` and `role="tab"` were **not** used. Instead, `CubeNavigation.tsx` uses a semantic `<nav aria-label="Engineering capability cube rotation controls">` with native `<button type="button">` controls and `aria-pressed={isSelected}` on each of the six face-selector buttons.
- **Accessible Labels & Live Status:**
  - Prev/Next/Reset buttons carry explicit `aria-label` attributes (`Rotate to previous capability face`, `Rotate to next capability face`, `Reset cube to front face`).
  - Face buttons carry `aria-label="Show face N (FaceName): Title"`.
  - Active face index and short label are announced via `aria-live="polite"`.
- **Inactive Face Isolation:** Non-front faces in `CubeFace.tsx` set `aria-hidden={true}`, `pointer-events-none`, and `tabIndex={-1}` on links so keyboard and screen reader users never interact with rear/oblique faces.

---

## 2. Keyboard Operability & Focus Indicators

Verified in live Chromium (`scratch/verify_phase7_2.js`):
- `ArrowRight` / `ArrowLeft` rotate horizontally across lateral faces.
- `ArrowUp` / `ArrowDown` rotate to Top (`5/6 Tools & Solvers`) and Bottom (`6/6 Human-Centered AI`) faces.
- `Home` / `Escape` reset cleanly to Face 1 (`1/6 Agentic Systems`).
- All interactive buttons and links use `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5A9A78]`.

---

## 3. Target Sizes & Color Contrast (Measured in Production Browser)

| Check | Measured Value | WCAG 2.2 AA Threshold | Status |
|---|---|---|---|
| **Minimum rotation button target size** | `28px × 28px` (face dots), `32px × 32px` (Prev/Next/Reset) | `>= 24px × 24px` (WCAG 2.2 SC 2.5.8) | **PASS** |
| **Active face title (`#F0EEE9` on `#14171A`)** | `15.52:1` | `>= 4.5:1` | **PASS** |
| **Active face summary (`#9EA4AA` on `#14171A`)** | `7.15:1` | `>= 4.5:1` | **PASS** |

---

## 4. Non-3D & Reduced-Motion Fallbacks (Verified)

- **Mobile (`< 640px`):** Tested at `375×812` and `320×780`; `.cube-scene` is not rendered (`hasCubeScene: false`), and `ReducedMotionGrid` renders all 6 capability cards with full links and summaries (`flatCardsCount: 6`).
- **`prefers-reduced-motion: reduce`:** Tested at `1280×900` with `reducedMotion: 'reduce'`; `.cube-scene` is suppressed and `ReducedMotionGrid` renders all 6 capability cards simultaneously (`passed: true`).
- **Unsupported 3D CSS (`CSS.supports('transform-style', 'preserve-3d') === false`):** Tested via init script override; `ReducedMotionGrid` renders cleanly (`passed: true`).

---

## 5. Accessibility Limitations & Qualifications

- Automated DOM, contrast, target-size, and keyboard checks do not replace manual assistive-technology testing with NVDA, VoiceOver, or TalkBack screen readers. Full screen-reader announcement cadence remains unverified by a human screen-reader audit.

