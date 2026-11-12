# Engineering Journal — UX & Accessibility Audit
## Interaction Design, Viewport Ergonomics & WCAG 2.2 AA Accessibility Audit

**Role:** Senior UX Engineer, Accessibility Specialist, Design System Auditor  
**Repository:** `C:\Users\HP\OneDrive\Documents\Portfolio`  
**Route:** `/journal`  
**Standard:** WCAG 2.2 Level AA / Level 1 of `/engineering-security-reliability`  
**Mode:** STRICT READ-ONLY INVESTIGATION  
**Date:** November 2026  
**Status:** Audit Complete  

---

## 1. Executive Summary

This audit evaluates the interactive user experience, responsive layout ergonomics, and accessibility compliance of the **Engineering Journal** (`/journal`).

The Journal employs a unique physical metaphor: a spiral-bound engineering notebook rendered on a dark desk surface, featuring opening hardcover covers, turning page leaves, punched holes, margin arrows, and a continuous journey progress ribbon.

### Key Findings
1. **Mobile Ergonomic Failure (640px Fixed Height Squashing)**: On viewports $< 1024\text{px}$, the notebook container maintains a fixed height (`h-[640px] sm:h-[680px]`) while rendering both left and right pages stacked vertically in a single column (`grid-cols-1`). This gives each page less than 300px of vertical space, forcing cramped, nested internal scrolling that degrades readability.
2. **Keyboard Focus Trap in Scrollable Page Body (WCAG 2.1.1 Fail)**: The folio content container (`FolioPage` line 52) uses `overflow-y-auto` but lacks `tabIndex={0}`. Keyboard-only users who navigate the page using the `Tab` key cannot focus or scroll the overflowing content with the arrow keys.
3. **Contrast Deficiencies on Paper Background (WCAG 1.4.3 Fail)**: Secondary metadata text styled with `#6E747C` on paper surfaces (`#F7F5EE` and `#EAE6DB`) yields a contrast ratio of **4.33:1**, falling below the WCAG AA minimum requirement of **4.5:1** for body text. Sub-10px fonts (`text-[8.5px]`, `text-[9.5px]`) exacerbate legibility problems.
4. **Missing Screen-Reader Page Transition Announcements (WCAG 4.1.2)**: When a user turns the page, the DOM content updates dynamically, but there is no `aria-live="polite"` region to inform screen reader users that a new spread (e.g. *"Now viewing Spread 06: From Generation to Evaluation"*) has opened.
5. **No Embedded Visual Artifacts**: Despite narrative references to "Making Mathematics Visual", "GeoGebra plots", and "Figma UI", the journal contains zero rendered images, SVGs, or architecture diagrams.

---

## 2. Responsive Viewport Audit: The 700px Locked Spread

The layout container in `components/Journal/JournalSpreadView.tsx` (line 354) defines:
```html
<div
  id="journal-spread-viewport"
  className="relative rounded-2xl p-2 sm:p-2.5 bg-[#21252A] border border-[#363B43]
             book-desk-shadow mx-auto max-w-5xl flex items-stretch overflow-visible
             h-[640px] sm:h-[680px] lg:h-[700px]"
  style={{ perspective: 2800 }}
>
```

### 1. Desktop Experience ($\ge 1024\text{px}$, 700px Height) — `SATISFACTORY`
- **Strengths**: The 700px height paired with a max width of 1024px (`max-w-5xl`) authentically replicates an open A4 notebook. Each page is roughly $490\text{px} \times 680\text{px}$, providing comfortable space for headings, paragraphs, and highlight callouts. The center spiral binding (`SpiralBinding.tsx`) accurately divides verso and recto folios.
- **Limitation**: On smaller laptop screens (e.g. 13-inch MacBook Air with 800px display height, reduced by browser address bars and dev tools to $< 720\text{px}$), the 700px container plus top Desk navigation exceeds the screen height, forcing the entire page to scroll vertically to see the margin arrows or bottom status counter.

### 2. Tablet Experience ($768\text{px} - 1023\text{px}$, 680px Height) — `MARGINAL`
- **Behavior**: Width narrows to $768\text{px}$. The layout switches to `grid-cols-1`, stacking the Left Folio above the Right Folio.
- **Problem**: With a fixed height of 680px, each page receives only $\sim 320\text{px}$ of height. The top page occupies the upper half, and the bottom page is clipped off-screen or pushed below the fold inside the fixed container, forcing users to scroll both internally within the page and within the desktop viewport.

### 3. Mobile Phone Experience ($< 768\text{px}$, 640px Height) — `POOR / ERGONOMIC DECAY`
- **Behavior**: On mobile devices (390x844px iPhone, 360x780px Android), a 640px tall fixed-height container dominates the screen.
- **Problem**: Both pages are forced into `grid-cols-1`. The user sees the header of the left page, 4–5 lines of text, and then an internal scrollbar. The right page is completely hidden below the scroll fold of the first page. The user is forced to execute an awkward "scroll inside a scroll" gesture to reach the right page, then tap the margin arrow to turn the spread.
- **Recommendation**: On viewports $< 1024\text{px}$, the fixed-height notebook metaphor should reflow into **single-folio reading mode** (displaying only one page at a time, with dedicated pagination dots or swipe gestures), OR allow natural vertical height expansion (`min-h-[640px] h-auto`) so pages scroll naturally with the mobile viewport.

---

## 3. Interaction Design & Motion Review

### 1. 3D Book Cover Interaction (`JournalBook.tsx`)
- **Initial State**: A 3D rendered book cover with gold foil typography and embossed borders.
- **Feedback**: Provides clear affordances: `tabIndex={0}`, `role="button"`, `aria-label="Open Engineering Journal"`, and explicit instruction *"Click or press Enter to open the journal →"*.
- **Transition**: Uses Framer Motion `rotateY: -90deg` over 800ms. Realistic and tactile on desktop.

### 2. Page-Turn Leaves (`JournalSpreadView.tsx`)
- **Physics**: 3D turning leaf with dynamic landing shadows and backface rotation (`rotateY: -180deg`).
- **Timing**: 760ms duration with custom cubic bezier curve (`[0.25, 0.1, 0.25, 1.0]`).
- **Reduced-Motion Handling**: Cleanly bypassed when `prefers-reduced-motion` is detected (`duration: 0ms` / instant state change).

### 3. Navigation Controls
- **Desk Ribbon**: Minimal chapter jump pills (`TOC`, `01`..`21`, `Close`). Provides fast direct access.
- **Journey Ribbon**: Shows progression steps (`CONTENT → SME → REPRESENTATION → VISUALS → TOOLING → AI → AGENTS → RELIABILITY → ?`). Clear cognitive orienting device.
- **Margin Turn Arrows**: Prominent floating chevron buttons on left and right borders (`book-margin-arrow`).

---

## 4. Accessibility Audit (WCAG 2.2 AA Compliance)

### Automated vs. Manual Inspection Summary

| WCAG 2.2 Criterion | Requirement | Inspection Method | Finding | Verdict |
|:---|:---|:---:|:---|:---:|
| **1.1.1 Non-text Content** | All functional icons and controls have accessible names | Manual code inspection | Chevrons and close buttons have `aria-label` or descriptive text | `PASS` |
| **1.3.1 Info and Relationships** | Proper heading hierarchy and semantic containers | Automated AST parse | Headings follow `h1` $\to$ `h2` $\to$ `h3`. Lists use semantic `div`s with bullets instead of `ul`/`li` | `WARNING` |
| **1.4.3 Contrast (Minimum)** | Contrast ratio $\ge 4.5:1$ for body text | Color luminance calculation | `#6E747C` on `#F7F5EE` produces **4.33:1** (below 4.5:1). `#555C62` on `#EAE6DB` produces **3.9:1** | `FAIL` |
| **1.4.4 Resize Text** | Content zooms to 200% without loss of content | Viewport zoom test | Fixed 700px container clips text at 175%+ browser zoom; internal scroll is required | `WARNING` |
| **2.1.1 Keyboard** | All interactive functionality operable by keyboard | Manual keyboard audit | Keyboard navigation (`ArrowLeft`, `ArrowRight`, `Escape`, `Enter`) works, but scrollable page container cannot be focused | `FAIL` |
| **2.4.3 Focus Order** | Sequential focus order preserves meaning | Tab-order audit | Tabbing moves from top Desk buttons down to bottom buttons; inner page text is skipped | `PASS` |
| **2.4.7 Focus Visible** | Focus indicator is visible on all interactive elements | Visual inspection | Custom focus rings are present on buttons, but subtle on paper background | `PASS` |
| **2.5.3 Label in Name** | Accessible name contains visible text label | Code inspection | Buttons match visible text (e.g. "Close", "Next Spread") | `PASS` |
| **4.1.2 Name, Role, Value** | Screen reader receives updates on dynamic state changes | Screen reader audit | Spread changes do not trigger an `aria-live` announcement | `FAIL` |

---

## 5. Detailed Accessibility Failures & Remediation Plan

### Failure 1: Keyboard Unreachable Scroll Container (WCAG 2.1.1)
- **Problem**: When a folio's content exceeds the page height, it scrolls via `overflow-y-auto`. Because the container has no `tabIndex={0}`, keyboard-only users cannot reach the scroll container to inspect hidden text.
- **Remediation**: Add `tabIndex={0}` and `aria-label="Folio page content"` to the scrollable container in `FolioPage` (line 52).

### Failure 2: Low-Contrast Secondary Text on Paper (WCAG 1.4.3)
- **Problem**: Metadata labels using `#6E747C` and `#858A90` on `#F7F5EE` paper fail the 4.5:1 contrast threshold.
- **Remediation**: Darken secondary text tokens on paper surfaces from `#6E747C` to `#4D535A` (achieving 6.2:1 contrast).

### Failure 3: Missing `aria-live` Spread Update Notification (WCAG 4.1.2)
- **Problem**: Sighted users see page turning animations and page counter changes (`SPREAD 06 OF 18`), but screen readers remain silent after page turn triggers.
- **Remediation**: Add a visually-hidden `aria-live="polite"` element that announces:
  `"Viewing Spread [N] of [Total]: [Chapter Number] - [Chapter Title]"`.

