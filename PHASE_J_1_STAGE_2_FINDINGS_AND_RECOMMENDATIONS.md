# Phase J.1 — Stage 2: Findings & Recommendations

**Feature:** Engineering Journal (`/journal`)  
**Audit Standard:** `/engineering-security-reliability` Level 2 Forensic Audit  
**Mode:** STRICT READ-ONLY  
**Final Verdict:** **CONDITIONAL — REMEDIATION REQUIRED**

---

## 1. Open Findings Requiring Remediation Before Final Sign-Off

### Finding F1 (High) — Mobile Left-Edge Spiral Overlaps & Clips Recto Text
- **Category:** Responsive Layout / Visual Integrity (J3)
- **Evidence:** Inspected `audit_results/phase_j_1_screenshots/mobile_390_recto.png`. The left-edge `SpiralBinding` (`w-12` = 48px) overlaps and clips the left ~24px of Recto folio text (`ROBUSTNESS`, `CRITICAL-FIELD PRIORITY`, `Risk Classification...`, `[Architecture]`) because `FolioPage` (`side="right"`) only applies `pl-6` (24px) below `640px`.
- **Recommendation:** Increase mobile left padding on `FolioPage` (`pl-14` or `pl-[56px]` below `sm:`) or adjust `SpiralBinding` mobile width/positioning so folio text clears the spiral rings with margin.

### Finding F2 (High) — Horizontal Overflow at `768px` and `1024px` Viewports
- **Category:** Responsive Layout / WCAG `1.4.10` Reflow (J3)
- **Evidence:** `task-4133.log` Playwright measurements on `next start -p 3029`:
  - `tablet_768`: `innerWidth: 768`, `scrollWidth: 792` (**+24px overflow**).
  - `desktop_1024`: `innerWidth: 1024`, `scrollWidth: 1132` (**+108px overflow**, driven by `-left-12` / `-right-12` margin arrows).
- **Recommendation:** Bring margin navigation arrows inside the container bounds (or hide/reposition them below `xl:`) and constrain outer desk container width with `overflow-x-hidden` only after fixing child widths so nothing is clipped.

### Finding F3 (High) — WCAG 2.2 `2.5.8` Target Size (Minimum) Failures
- **Category:** Accessibility — WCAG 2.2 AA (J6 / R1)
- **Evidence:** Live DOM bounding-box measurements in `task-4133.log`:
  - Mobile Verso/Recto tabs: `87.6–93.5 × 19.75px` (`< 24px` height).
  - Top desk jump buttons (`TOC`, `01`–`22`, `Synthesis`, `Catalog`, `Close`): `height: 22px` (`< 24px` height).
  - Cross-links (`[Architecture]`, `[Decisions]`, `[Evidence]`, `[Compare]`): `height: 15px`.
- **Recommendation:** Increase minimum interactive target height to `>= 24px` (`min-h-[24px]` / `py-1`) on mobile Verso/Recto tabs and top desk jump buttons, and ensure adequate spacing around compact cross-links.

### Finding F4 (Medium) — WCAG `1.4.3` Contrast Failures on Dark-Desk Chrome
- **Category:** Accessibility — WCAG 2.2 AA (J6)
- **Evidence:** Inactive Journey Ribbon (`#686E77` on `#111316`) measures **3.58:1**, and `[ End of Volume I ]` (`#555A62` on `#181B1F`) measures **~2.7:1** (both below `4.5:1`). Paper tokens pass (`5.74:1`–`7.64:1`).
- **Recommendation:** Lighten the inactive Journey Ribbon and End-of-Volume foreground colors to `#8E95A0` or lighter so contrast meets `>= 4.5:1` against `#111316` / `#181B1F`.

### Finding F5 (Medium) — Desktop Center Spiral Overlaps Top Desk Navigation Bar
- **Category:** Visual Integrity (J3)
- **Evidence:** Inspected `audit_results/phase_j_1_screenshots/desktop_spread_14.png`. The top ring of the center `SpiralBinding` overlaps the `TOC` and `01` buttons in the top desk navigation bar.
- **Recommendation:** Add vertical clearance (`mt-3` / `pt-3`) between the top desk navigation bar and the book container, or clip/offset the top spiral ring relative to the navigation bar's `z-index` and margin.

---

## 2. Informational / Governance Observations (Non-Blocking)

1. **Test Count Reconciliation (R2 / R3):** Stage 1's executive summary `2,842` was an arithmetic typo for its own table sum (`2,857`), and two `@/`-aliased suites were omitted (`test_retrieval_foundation.js`: `13/13` PASS; `test_grounded_conversational_evaluation.js`: `16/16` PASS). Recommend running all suites via a unified alias-aware test runner in future phases.
2. **Legacy Data Divergence (`data/chapters.ts`):** `data/chapters.ts` retains legacy compatibility entries and lacks Chapter 20 (OCR Evaluator), whereas `data/journalSpreads.tsx`, `data/canonical/journalChapters.ts`, and `JOURNAL.md` all include Chapter 20. Document or deprecate `data/chapters.ts` if no longer needed.
3. **OCR Evaluator Analysis Directory:** `research/project-analysis/ocr-evaluator/` does not exist (8 other project directories exist under `research/project-analysis/`). OCR Evaluator claims (`134` pytests across `22` files, `20/20` UI assertions) are backed by `data/canonical/quantitativeClaims.ts`.

