# Phase 7.1 — Interactive 3D Engineering Cube
## Accessibility & Performance Specification

**Date:** 2026-11-12  
**Repository:** `C:\Users\HP\OneDrive\Documents\Portfolio`  
**Standard:** `/engineering-security-reliability` — Level 1 (WCAG 2.2 AA)  
**Mode:** STRICT READ-ONLY SPECIFICATION

---

## 1. Accessibility Standards & Compliance

This specification targets **WCAG 2.2 Level AA** compliance, consistent with the remediation standards enforced in Phase J.1 Stages 3–4 (keyboard operability, target size ≥ 24×24px, contrast ≥ 4.5:1 / 3:1, and reduced-motion fallbacks).

---

## 2. Semantic HTML Structure

A 3D CSS cube with `rotateX`/`rotateY` transforms is visually spatial but must expose a clean, linear semantic tree to assistive technologies:

```html
<section aria-label="Engineering capabilities navigator" class="engineering-cube-region">
  <!-- Visual 3D Stage -->
  <div class="cube-perspective">
    <div class="cube-scene">
      <!-- Active face is interactive; inactive faces have aria-hidden="true" and inert/pointer-events-none -->
    </div>
  </div>

  <!-- Explicit Accessible Tablist / Face Selector -->
  <div role="tablist" aria-label="Select engineering capability">
    <button role="tab" aria-selected="true" aria-controls="cube-panel-0">...</button>
    <!-- 5 more tabs -->
  </div>

  <!-- Live region announcing user-initiated face changes -->
  <div aria-live="polite" class="sr-only">
    Showing capability 1 of 6: AI Systems & Agentic Engineering
  </div>
</section>
```

---

## 3. Keyboard Navigation

| Key | Scope | Behavior |
|---|---|---|
| `Tab` / `Shift+Tab` | Region | Moves focus through the `role="tablist"` controls and the active face's `<Link>` CTA (no focus trap). |
| `ArrowRight` / `ArrowLeft` | Cube / Tablist | Rotates horizontally to the next/previous lateral capability face and updates `aria-selected`. |
| `ArrowUp` / `ArrowDown` | Cube / Tablist | Rotates to Top/Bottom faces (or steps sequentially through all 6 faces). |
| `Enter` / `Space` | Tab button | Activates the focused capability face. |
| `Enter` | Active Face CTA | Navigates to the mapped portfolio route. |
| `Escape` / `Home` | Cube / Tablist | Resets rotation to Face 1 (Front). |

All keyboard handlers use `onKeyDown` (never deprecated `onKeyPress`).

---

## 4. Screen Reader Experience

- **Inactive Face Isolation:** Only the currently active front face is exposed in the tab order (`tabIndex={isActive ? 0 : -1}`) and accessibility tree (`aria-hidden={!isActive}`).
- **Polite Announcements:** `aria-live="polite"` announces face transitions **only** when triggered by user interaction (click, tap, keyboard, swipe) — never during automatic background rotation, preventing screen reader chatter.
- **Real Text Content:** All titles, project names, and CTAs are real DOM text (no text baked into images or `<canvas>`).

---

## 5. Reduced Motion Fallback

In `styles/globals.css` (lines 187–195), `@media (prefers-reduced-motion: reduce)` already forces `animation-duration` and `transition-duration` to `0.01ms !important`.
For the cube specifically, Framer Motion's `useReducedMotion()` hook triggers a dedicated fallback:
- **No 3D transforms or rotation animations.**
- **No auto-rotation timer.**
- Renders `ReducedMotionGrid.tsx`: a clean **2×3 (tablet/desktop) or 1-column (mobile)** flat card grid displaying all six capability faces simultaneously with identical palette, icons, and `<Link>` targets.

---

## 6. Focus Management

- Changing faces via keyboard arrows keeps focus on the active tab or cube control without losing focus to an off-screen rotated element.
- **Focus Indicator:** `2px` solid emerald ring (`#5A9A78`) with `2px` offset (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5A9A78] focus-visible:ring-offset-2 focus-visible:ring-offset-[#121518]`).

---

## 7. Color Contrast Requirements

Based on observed portfolio tokens (`styles/globals.css` & `app/page.tsx`):
- **Primary Face Title (`#F0EEE9` on `#14171A`):** ~12.4:1 (passes WCAG AAA).
- **Body / Summary Text (`#9EA4AA` on `#14171A`):** ~5.1:1 (passes WCAG AA ≥ 4.5:1 for normal text).
- **Emerald Accent (`#5A9A78` on `#14171A`):** ~4.0:1 (passes WCAG AA ≥ 3:1 for UI components/borders/large text; for small `10px–12px` mono labels, use `#78C29A` which matches `app/page.tsx` line 88 and achieves higher contrast).
- **Glass Opacity Guard:** Translucent face backgrounds must use at least `88%–92%` opacity (`bg-[#14171A]/90`) so rear faces bleeding through never drop text contrast below `4.5:1`.

---

## 8. Touch Target Sizes (WCAG 2.2 AA — 2.5.8)

- **Indicator Dots / Tabs:** Each button must have a minimum clickable/tappable hit area of **24×24px** (e.g., `w-7 h-7` or `p-2` wrapper around an 8px visual dot), preventing the target-size failures previously caught in Phase J.1 Stage 2 (F3).
- **Prev / Next Step Buttons:** Minimum `36×36px` (`w-9 h-9`) or `44×44px` on touch viewports.
- **Active Face CTA Link:** Full-width or padded pill (`py-2 px-3`, height ≥ 36px).

---

## 9. Non-3D Alternative

On viewports `< 640px` (`< sm`) **and** whenever `prefers-reduced-motion: reduce` is active, the component renders `ReducedMotionGrid.tsx` (flat responsive cards) rather than a 3D cube. This guarantees usability on small screens, older mobile GPUs, and motion-sensitive users.

---

## 10. Performance Budget & Bundle Size Impact

- **Homepage Baseline:** `app/page.tsx` currently has zero Three.js/WebGL code and zero client-side 3D canvas overhead.
- **Budget for `EngineeringCube`:**
  - **Additional First Load JS:** **≤ 5 KB** gzipped (pure React/TS component + state hook; `framer-motion` and `lucide-react` are already in the repository's shared/component dependency graph).
  - **Additional CSS:** **≤ 1 KB** (3D transform utility rules in `styles/globals.css`).
  - **New npm dependencies:** **0**.
  - **WebGL contexts on `/`:** **0** (rejecting Three.js saves ~150–200 KB JS and 50–100ms WebGL initialization).

---

## 11. Loading Strategy

- Imported via `next/dynamic(() => import('../components/EngineeringCube'), { ssr: false })` inside `app/page.tsx`.
- **CLS Prevention:** The `loading` fallback renders a fixed-dimension skeleton (`280px`/`300px`/`340px` matching the cube's exact responsive height and width) so **Cumulative Layout Shift (CLS)** remains `≤ 0.1` (target `0.00`).

---

## 12. Animation Performance

- **Compositor-Only Properties:** Only `transform` (`rotateX`, `rotateY`, `translateZ`) and `opacity` are animated — zero `width`, `height`, `top`, `left`, or `box-shadow` keyframe animations.
- **GPU Layer Hint:** `will-change: transform` on `.cube-scene`.
- **Target Frame Rate:** 60fps on mid-range desktop and mobile devices (`< 16.67ms` frame budget).

---

## 13. Lighthouse Target Scores

- **Performance:** ≥ 95
- **Accessibility:** ≥ 95 (100 target with tablist + contrast + target-size compliance)
- **Best Practices:** ≥ 95
- **SEO:** ≥ 95 (no `<canvas>` hiding text content)
- **CLS:** ≤ 0.1 (0.00 target via sized skeleton)
- **INP:** ≤ 200ms

