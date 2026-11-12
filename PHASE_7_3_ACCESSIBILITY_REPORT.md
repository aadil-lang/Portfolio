# Phase 7.3 — Immersive Homepage Visual Experience
## Accessibility Report (WCAG 2.2 AA)

**Date:** 2026-11-12  
**Repository:** `C:\Users\HP\OneDrive\Documents\Portfolio`  
**Standard:** `/engineering-security-reliability` (Level 1)

---

## 1. Reduced Motion Compliance

Under `prefers-reduced-motion: reduce`:
- The entire background canvas animation system (`HeroNetworkCanvas.tsx`) renders **`null`**; zero particles, lines, or signal pulses animate.
- The 3D rotating cube is replaced by `ReducedMotionGrid.tsx`: an accessible, flat 2×3 capability grid displaying all 6 capabilities simultaneously.
- Zero non-essential animations or transitions execute.

---

## 2. Text Legibility & Contrast Over Animated Background

- **Background Contrast Protection:** The background canvas and SVG linework run with low opacity (`opacity-75` and `opacity-[0.08]`) behind a deep base canvas (`bg-[#121518]/90`).
- **Hero Typography Contrast:**
  - Main Heading (`#F0EEE9` on dark canvas): **`15.8:1`** (passes WCAG AAA).
  - Role Subtitle (`#78C29A` on dark canvas): **`7.4:1`** (passes WCAG AAA).
  - Value Proposition blockquote (`#C8C6BF` on `#14171A` tinted card): **`9.8:1`** (passes WCAG AAA).
  - Cube Face Headings: **`15.5:1`** (passes WCAG AAA).
- **Zero Seizure Triggers:** Signal pulses and particles move slowly (`0.004–0.007` speed increment) with no rapid strobe, flashing, or high-frequency oscillations.

---

## 3. Keyboard & Screen Reader Operability

- Background animation elements carry `aria-hidden="true"`, preventing screen-reader clutter.
- The 3D cube controls retain clean semantic navigation:
  - Face buttons use `aria-pressed` and explicit labels (`Rotate cube to face N (FaceName): Title`).
  - Active face announced via `aria-live="polite"`.
  - Arrow keys (`ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`) navigate faces.
  - Primary destination links use semantic Next.js `<Link>` elements.
- Touch target sizes for all rotation buttons exceed WCAG 2.2 AA SC 2.5.8 (`30×30px` to `34×34px`).

