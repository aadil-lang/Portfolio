# PHASE 5 — ACCESSIBILITY & USER EXPERIENCE AUDIT REPORT
**Domain H: Accessibility (WCAG 2.1 AA Compliance) & Interactive UX**

- **Repository:** `C:\Users\HP\OneDrive\Documents\Portfolio`
- **Target Components:** `app/layout.tsx`, `components/Header.tsx`, `components/Footer.tsx`, `components/AskAadil/`, `components/rag-lab/`
- **Standard Applied:** `engineering-security-reliability` (Section 7: Accessibility & Usability - WCAG 2.1 AA)
- **Audit Date:** November 2026
- **Status:** Complete (READ-ONLY Mode)

---

## 1. Executive Accessibility Assessment

### Summary
The portfolio implements a distinctive cartographic visual identity featuring dark mode backgrounds (`#14171A`, `#181C21`), muted slate borders (`#262B32`), and a signature sage green accent (`#5A9A78`). 

While the primary interactive controls and high-contrast titles pass baseline legibility standards, the codebase exhibits critical non-compliances with **WCAG 2.1 Level AA** standards regarding **keyboard bypass mechanisms (Skip Links)**, **dialog semantics and focus traps**, **tab navigation patterns**, and **tertiary text contrast ratios**.

---

## 2. WCAG 2.1 AA Checklist & Verification Matrix

| WCAG 2.1 Criterion | Level | Description | Audit Status | Key Evidence / Notes |
| :--- | :--- | :--- | :--- | :--- |
| **1.1.1 Non-text Content** | Level A | Alt text for non-decorative graphics | **PASS** | Icons use aria-hidden or labels; SVG vectors contain titles |
| **1.3.1 Info and Relationships** | Level A | Proper semantic HTML landmarks & structure | **PARTIAL** | Semantic `<main>`, `<header>`, `<footer>` present; tabs lack ARIA tablist |
| **1.4.3 Contrast (Minimum)** | Level AA | Text contrast >= 4.5:1 (3:1 for large text) | **FAIL (P2)** | Primary `#5A9A78` passes (5.42:1); Footer muted text fails (3.56:1, 2.64:1) |
| **2.1.1 Keyboard** | Level A | All functionality operable via keyboard | **PARTIAL** | Modal lacks focus trap; mobile drawer lacks Esc dismiss |
| **2.4.1 Bypass Blocks** | Level A | Mechanism to bypass repeated blocks | **FAIL (P1)** | No skip-to-content link in `app/layout.tsx` |
| **2.4.3 Focus Order** | Level A | Logical, sequential focus order | **FAIL (P2)** | Keyboard focus bleeds behind open mobile nav drawer |
| **2.4.7 Focus Visible** | Level AA | Any keyboard focus has visible indicator | **PASS** | Tailored `focus-visible:outline-none focus-visible:ring-1` |
| **4.1.2 Name, Role, Value** | Level A | ARIA roles, states, and properties | **FAIL (P1)** | `AskAadilModal` lacks `role="dialog"` and `aria-modal="true"` |
| **4.1.3 Status Messages** | Level AA | Screen readers alerted to dynamic updates | **FAIL (P1)** | Streaming AI chat responses lack `aria-live="polite"` |

---

## 3. Detailed Forensic Accessibility Findings

### FINDING-AD-001: Missing Skip-to-Content Link
- **Finding ID:** AD-001
- **Severity:** P1 (High)
- **WCAG Reference:** WCAG 2.1 AA Success Criterion 2.4.1 (Bypass Blocks - Level A)
- **Affected File:** `app/layout.tsx` (Lines 13–26)
- **Evidence:** `app/layout.tsx` embeds `<Header />` directly before `{children}` without providing a bypass mechanism:
  ```tsx
  <body className="...">
    <Header />
    <main id="main-content">{children}</main>
    <Footer />
  </body>
  ```
  No `<a href="#main-content">Skip to content</a>` anchor is rendered.
- **Impact:** Screen reader and keyboard-only users must tab through all navigation items (Home, About, Systems, Projects, RAG Lab, Journal, Experience, Timeline, and Social Links) on every page transition before reaching primary page content.
- **Recommended Remediation:** Insert an accessible skip link as the very first child of `<body>`:
  ```tsx
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#5A9A78] focus:text-[#14171A] focus:font-semibold focus:rounded focus:ring-2 focus:ring-white"
  >
    Skip to main content
  </a>
  ```

---

### FINDING-AD-002: Missing WAI-ARIA Dialog Semantics and Live Regions in Conversational Modal
- **Finding ID:** AD-002
- **Severity:** P1 (High)
- **WCAG Reference:** WCAG 2.1 AA Success Criterion 4.1.2 (Name, Role, Value) & 4.1.3 (Status Messages)
- **Affected File:** `components/AskAadil/AskAadilModal.tsx` (Lines 1–350)
- **Evidence:** `AskAadilModal` renders a floating overlay container without standard dialog accessibility attributes:
  1. The overlay `<div>` omits `role="dialog"` (or `role="region"`), `aria-modal="true"`, and `aria-labelledby="modal-title"`.
  2. The streaming conversation thread omits `aria-live="polite"` and `aria-atomic="false"`.
  3. When the modal opens, keyboard focus is not trapped within the modal container; pressing Tab allows the user to navigate into elements on the page behind the backdrop.
- **Impact:** Assistive technology fails to inform users that an interactive modal has opened, does not announce streaming responses, and allows focus to escape outside the modal.
- **Recommended Remediation:**
  - Add `role="dialog" aria-modal="true" aria-labelledby="ask-aadil-title"` to the modal card.
  - Wrap the message list in `<div aria-live="polite" aria-atomic="false">`.
  - Implement a focus trap using an active `keydown` listener trapping Tab between first and last focusable elements.

---

### FINDING-AD-003: Missing WAI-ARIA Tab Semantics in RAG Lab Dashboard
- **Finding ID:** AD-003
- **Severity:** P2 (Medium)
- **WCAG Reference:** WCAG 2.1 AA Success Criterion 4.1.2 (Name, Role, Value)
- **Affected File:** `components/rag-lab/RagLabDashboard.tsx` (Lines 180–240)
- **Evidence:** The tab bar for switching between retrieval modes (Hybrid, BM25, TF-IDF Vector, Benchmark) renders plain `<button>` elements with conditional styling:
  ```tsx
  <button onClick={() => setActiveTab('hybrid')}>Hybrid Search</button>
  ```
  The container lacks `role="tablist"`, the buttons lack `role="tab"` and `aria-selected={activeTab === 'hybrid'}`, and the content panels lack `role="tabpanel" aria-labelledby="tab-id"`.
- **Impact:** Screen readers perceive the tabs as unrelated buttons and cannot communicate the selected state or panel associations. Keyboard arrow navigation between tabs is unsupported.
- **Recommended Remediation:** Follow the W3C WAI-ARIA Tabs Design Pattern:
  ```tsx
  <div role="tablist" aria-label="RAG Retrieval Modes">
    <button role="tab" id="tab-hybrid" aria-controls="panel-hybrid" aria-selected={activeTab === 'hybrid'}>Hybrid Search</button>
  </div>
  <div role="tabpanel" id="panel-hybrid" aria-labelledby="tab-hybrid">...</div>
  ```

---

### FINDING-AD-004: Mobile Navigation Drawer Lacks ARIA Expanded and Focus Containment
- **Finding ID:** AD-004
- **Severity:** P2 (Medium)
- **WCAG Reference:** WCAG 2.1 AA Success Criterion 2.4.3 (Focus Order) & 4.1.2
- **Affected File:** `components/Header.tsx` (Lines 134–183)
- **Evidence:** The mobile hamburger button lacks `aria-expanded={mobileMenuOpen}` and `aria-controls="mobile-navigation"`. Furthermore, opening the mobile drawer does not trap focus, nor does pressing Escape close the menu.
- **Impact:** Visually impaired users using keyboard navigation can tab past the bottom of the drawer into background content while the drawer remains open.
- **Recommended Remediation:** Add `aria-expanded={mobileMenuOpen}` to the toggle button, attach an Escape key listener, and lock scroll/focus while the drawer is active.

---

### FINDING-AD-005: Color Contrast Failures on Muted and Footer Text
- **Finding ID:** AD-005
- **Severity:** P2 (Medium)
- **WCAG Reference:** WCAG 2.1 AA Success Criterion 1.4.3 (Contrast Minimum - Level AA)
- **Affected File:** `components/Footer.tsx` (Lines 12, 56)
- **Evidence:**
  Color contrast calculations against background `#121518` / `#14171A`:
  - Primary Accent `#5A9A78` on `#14171A`: **5.42:1** (PASSES AA threshold of 4.5:1).
  - Off-white Heading `#E6EDF3` on `#14171A`: **14.2:1** (PASSES AAA).
  - Secondary Text `#8B949E` on `#14171A`: **5.14:1** (PASSES AA).
  - Muted Footer Subtitle `#686E77` on `#121518`: **3.56:1** (**FAILS AA threshold of 4.5:1**).
  - Copyright / Timestamp `#555A62` on `#121518`: **2.64:1** (**FAILS AA threshold of 4.5:1**).
- **Impact:** Low-vision users will have difficulty reading secondary metadata, timestamps, and footer links.
- **Recommended Remediation:** Elevate muted gray text to at least `#7D8590` (4.52:1) or `#8B949E` (5.14:1).

