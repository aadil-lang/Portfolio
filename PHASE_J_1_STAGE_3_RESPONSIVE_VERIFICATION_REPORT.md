# Phase J.1 — Stage 3: Responsive Verification Report

**Feature:** Engineering Journal (`/journal`)  
**Verification Script:** `scratch/verify_j1_stage3.js` against `next start -p 3030`  

---

## 1. Observed Viewport & Overflow Measurements (Before vs. After)

| Viewport | `innerWidth` | Before `scrollWidth` | After `scrollWidth` | After `overflowX` | Offending Elements After |
| :--- |---:|---:|---:|:---:| :--- |
| `mobile_320` | 320 | 320 | **320** | `false` | None (ribbon scrolls internally inside `overflow-x-auto`) |
| `mobile_360` | 360 | 360 | **360** | `false` | None |
| `mobile_390` | 390 | 390 | **390** | `false` | None |
| `mobile_390_land` | 844 | 844 | **844** | `false` | None |
| `tablet_768` | 768 | 792 (+24px) | **768** | `false` | None |
| `desktop_1024` | 1024 | 1132 (+108px) | **1024** | `false` | None |
| `desktop_1280` | 1280 | 1304 (+24px) | **1280** | `false` | None |
| `desktop_1440` | 1440 | 1440 | **1440** | `false` | None |

---

## 2. Spiral Binding Clearance Measurements (F1 & F5)

### F1 — Mobile/Tablet Left-Edge Spiral vs. Folio Content
| Viewport | `spiralRight` | `versoRegionLeft` (Overlap) | `rectoRegionLeft` (Overlap) | Status |
| :--- |---:|---:|---:| :--- |
| `mobile_320` | 73px | 82px (`-9px`, clear) | 82px (`-9px`, clear) | **PASS** |
| `mobile_360` | 73px | 82px (`-9px`, clear) | 82px (`-9px`, clear) | **PASS** |
| `mobile_390` | 73px | 82px (`-9px`, clear) | 82px (`-9px`, clear) | **PASS** |
| `tablet_768` | 73px | 84px (`-11px`, clear) | 84px (`-11px`, clear) | **PASS** |

### F5 — Desktop Center Spiral vs. Top Desk Navigation Bar
| Viewport | `deskBarBottom` | `spiralSvgTop` | `firstRingTop` | Overlapping Controls | Status |
| :--- |---:|---:|---:|---:| :--- |
| `desktop_1024` | 188.8px | 213.8px | 240.9px | `0` | **PASS** |
| `desktop_1280` | 188.8px | 213.8px | 240.9px | `0` | **PASS** |
| `desktop_1440` | 188.8px | 213.8px | 240.9px | `0` | **PASS** |

---

## 3. F1–F5 Responsive Summary & Screenshots

| Finding | Before | Change | After | Verification | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **F1** | `rectoOverlapPx: 15px` (`320–390px`), `5px` (`768px`) | `pl-12 sm:pl-12 md:pl-12` on `FolioPage` & mobile strip | `-9px` to `-11px` (zero overlap) | `after_mobile_390_recto.png`, `after_tablet_768_recto.png` | **RESOLVED** |
| **F2** | Overflow at `768px` (`792px`), `1024px` (`1132px`), `1280px` (`1304px`) | Margin arrows inside `#journal-spread-viewport`; `Header.tsx` nav at `xl:` | `scrollWidth === innerWidth` at all 8 viewports | Playwright viewport matrix | **RESOLVED** |
| **F5** | Duplicate spiral in `JournalBook.tsx` overlapped `TOC`/`01` | Removed duplicate outer `<SpiralBinding />` | `25px` gap (`188.8px` vs `213.8px`) | `after_desktop_1280_spread14.png`, `after_desktop_1280_spread06.png` | **RESOLVED** |

- **Captured Screenshots:** `audit_results/phase_j_1_stage_3_screenshots/after_mobile_320_recto.png`, `after_mobile_360_recto.png`, `after_mobile_390_verso.png`, `after_mobile_390_recto.png`, `after_tablet_768_verso.png`, `after_tablet_768_recto.png`, `after_desktop_1024_spread14.png`, `after_desktop_1280_spread14.png`, `after_desktop_1280_spread06.png`, `after_desktop_1440_spread14.png`.
- **Remaining Limitation:** At `1024px`–`1279px`, top-level header navigation uses the responsive drawer menu (`xl:hidden`) rather than the full inline desktop bar to prevent horizontal overflow.

