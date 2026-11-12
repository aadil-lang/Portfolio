# Phase J.1 — Stage 4: Responsive & Visual Verification Report

**Feature:** Engineering Journal (`/journal`)  
**Script:** `scratch/verify_j1_stage4.js` on `next start -p 3031`  
**Mode:** STRICT READ-ONLY  

---

## 1. Eight-Viewport Reflow & Arrow Geometry

| Viewport | `innerWidth` | `docScrollWidth` | `bodyScrollWidth` | `overflowX` | `headerRight` | `prevArrowBox` (`x`, `w×h`) | `nextArrowBox` (`x`, `w×h`) |
| :--- |---:|---:|---:|:---:|---:| :--- | :--- |
| `w320` | 320 | 320 | 320 | `false` | 320 | `31..69` (`38×38`) | `251..289` (`38×38`) |
| `w360` | 360 | 360 | 360 | `false` | 360 | `31..69` (`38×38`) | `291..329` (`38×38`) |
| `w390` | 390 | 390 | 390 | `false` | 390 | `31..69` (`38×38`) | `321..359` (`38×38`) |
| `w768` | 768 | 768 | 768 | `false` | 768 | `33..83` (`50×50`) | `685..735` (`50×50`) |
| `w844_land` | 844 | 844 | 844 | `false` | 844 | `71..121` (`50×50`) | `723..773` (`50×50`) |
| `w1024` | 1024 | 1024 | 1024 | `false` | 1024 | `33..83` (`50×67.5`) | `941..991` (`50×67.5`) |
| `w1280` | 1280 | 1280 | 1280 | `false` | 1280 | `73..123` (`50×67.5`) | `1157..1207` (`50×67.5`) |
| `w1440` | 1440 | 1440 | 1440 | `false` | 1440 | `153..203` (`50×67.5`) | `1237..1287` (`50×67.5`) |

---

## 2. Mobile Left-Edge Spiral & Text Clearance (F1)

| Viewport | `spiralRight` | Verso `firstTextLeft` (Clearance) | Recto `firstTextLeft` (Clearance) | Strip `CH. 20` Clearance |
| :--- |---:|---:|---:|---:|
| `w320` | 73px | 82px (`+9px`) | 82px (`+9px`) | `+9px` |
| `w360` | 73px | 82px (`+9px`) | 82px (`+9px`) | `+9px` |
| `w390` | 73px | 82px (`+9px`) | 82px (`+9px`) | `+9px` |
| `w768` | 73px | 84px (`+11px`) | 84px (`+11px`) | `+11px` |

---

## 3. Desktop Center Spiral Geometry (F5) & Shared Header Regression

- **Desktop Center Spiral (`w1024`, `w1280`, `w1440`):** `outsideViewportSpirals: 0`, `totalRingGroups: 34` (17 back-wire + 17 front-wire inside `#journal-spread-viewport`), `deskBarBottom: 188.8px`, `spiralSvgTop: 213.8px` (**`25px` vertical clearance**), `firstRingTop: 240.9px`.
- **Shared Header Regression (`w1024` & `w1280` across 8 routes):** All 8 routes (`/`, `/journal`, `/projects`, `/recruiter`, `/architecture`, `/verification`, `/compare`, `/rag-lab`) returned HTTP 200 with `overflowX: false`; at `w1024`, desktop `<nav>` is hidden and hamburger drawer toggles cleanly (`drawerToggled: true`); at `w1280`, desktop `<nav>` is visible and `xl:hidden` hides the mobile button container.

---

## 4. Screenshot Inventory & Visual Notes

- `audit_results/phase_j_1_stage_4_screenshots/mobile_390_verso.png` — Verso clears left-edge spiral (`+9px`); minor cosmetic touch between right-edge `PunchedHoleStrip` and `Python` metadata text.
- `audit_results/phase_j_1_stage_4_screenshots/mobile_390_recto.png` — Recto clears left-edge spiral (`+9px`) with zero text clipping.
- `audit_results/phase_j_1_stage_4_screenshots/tablet_768_recto.png` — Tablet single-folio view clears spiral (`+11px`) with zero overflow.
- `audit_results/phase_j_1_stage_4_screenshots/desktop_1024_spread14.png` — Dual-page spread fits `1024px` (`overflowX: false`); internal `PREV`/`NEXT` arrows slightly overlap outer prose margins (non-blocking; footer/keyboard navigation unaffected).
- `audit_results/phase_j_1_stage_4_screenshots/desktop_1280_spread14.png` & `desktop_1440_spread06.png` — Outer margin arrows and bounded center spiral render cleanly across spreads.

