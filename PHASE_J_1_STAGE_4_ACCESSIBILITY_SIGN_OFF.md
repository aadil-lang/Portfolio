# Phase J.1 — Stage 4: Accessibility Sign-Off (WCAG 2.2 AA Scope)

**Feature:** Engineering Journal (`/journal`)  
**Standard:** WCAG 2.2 Level AA (Targeted Sign-Off for F1–F5 & Journal Interactions)  
**Mode:** STRICT READ-ONLY  

---

## 1. WCAG 2.2 Criterion Results

| Criterion | Scope Evaluated | Stage 4 Result | Evidence |
| :--- | :--- | :--- | :--- |
| **1.4.3 Contrast (Minimum)** | Dark-desk Journey Ribbon (`inactive`, `hover`, `active`), `[ End of Volume I ]`, and paper folio tokens | **PASS** | Inactive Ribbon `rgb(142,149,160)` on `rgb(17,19,22)` (`opacity: 1`) = **`6.16:1`**; Hover `rgb(197,202,209)` = **`11.29:1`**; Active `rgb(247,245,238)` on `rgb(61,90,110)` = **`6.67:1`**; End of Volume I `rgb(142,149,160)` on `rgb(18,21,24)` = **`6.07:1`**. Paper tokens previously verified `5.74:1`–`7.64:1`. |
| **1.4.10 Reflow** | Viewports `320`, `360`, `390`, `768`, `844`, `1024`, `1280`, `1440px` | **PASS** | `docScrollWidth === bodyScrollWidth === innerWidth` (`overflowX: false`) at all 8 viewports; left-edge spiral clears text by `9px`–`11px`. |
| **2.1.1 / 2.4.7 Keyboard & Focus** | Folio `[role="region"]`, mobile `[role="tab"]`, desk buttons, Header menu | **PASS** | Folios retain `tabIndex="0"` and green focus ring (`#5A9A78`); mobile tabs switch Verso/Recto; Header drawer toggles cleanly. |
| **2.5.8 Target Size (Minimum)** | All standalone Journal buttons (`TOC`, `01`–`22`, `Synthesis`, `Catalog`, `Close`, `Verso`/`Recto` tabs, `PREV`/`NEXT`) | **PASS (with inline exception)** | All `15` top desk buttons measure `>= 28 × 28px` (`below24: []`); mobile `Verso`/`Recto` tabs measure `72.6–93.5 × 32–39.5px`; `PREV`/`NEXT` arrows measure `38×38px` (`320–390px`) to `50×67.5px` (`1024–1440px`). |
| **2.3.3 / Reduced Motion** | `prefers-reduced-motion: reduce` page turn | **PASS** | Instant spread transition verified (`reducedMotionInstantTurn: true`). |

---

## 2. Target-Size Measurements & Exception Evidence

- **Standalone Controls (No Exception Needed):**
  - Top desk controls (`TOC`, `01`–`22`, `Synthesis`, `Catalog`, `Close`): `minJumpW: 28px`, `minJumpH: 28px`.
  - Mobile `Verso` / `Recto` tabs: `72.6 × 39.5px` / `77.2 × 39.5px` (`320px`); `87.6 × 32px` / `93.5 × 32px` (`360–768px`).
  - Spread arrows (`#book-prev-spread-arrow`, `#book-next-spread-arrow`): `38 × 38px` (`320–390px`), `50 × 50px` (`768–844px`), `50 × 67.5px` (`1024–1440px`).
- **Inline Exception (`2.5.8` Inline):**
  - Folio footer/prose links (`View OCR Evaluator →`: `114.8 × 16.5px`, `[Architecture]`: `62 × 15px`, `[Decisions]`: `49.5 × 15px`, `[Evidence]`: `46.7 × 15px`, `[Compare]`: `47.7 × 15px`) are inline links constrained by the line-height of text within folio footers.

---

## 3. Remaining Limitations

- This sign-off covers the remediated Journal controls and verified WCAG 2.2 criteria on `/journal`, not a full site-wide WCAG 2.2 AA certification.

