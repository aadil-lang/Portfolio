# Phase 6.3 — Interactive Architecture Explorer UX & Design Specification
**Role:** Principal Product Designer, Senior UX Architect, Accessibility Specialist, and Frontend Systems Lead  
**Date:** November 2026  
**Repository:** `C:\Users\HP\OneDrive\Documents\Portfolio`  
**Feature:** Phase 6.3 — Interactive Architecture Explorer (Stage 1)  
**Status:** SPECIFICATION ONLY (NOT AUTHORIZED FOR CODE CREATION)

---

## 1. Design Vision & Philosophy

The **Interactive Architecture Explorer** is designed to transform complex, multi-layered AI and software systems into an intuitive, evidence-grounded interactive exploration tool. 

Rather than presenting static diagrams or decorative block graphics, the explorer gives technical recruiters, engineering directors, and senior architects the ability to:
1. **Trace genuine execution lifecycles** step-by-step from user input to verified output.
2. **Inspect real component boundaries**, responsibilities, interfaces, and underlying source files.
3. **Examine deterministic guardrails, mathematical gates, and failure containment mechanisms** directly in the UI.
4. **Switch seamlessly between candidate systems** within a unified cartographic canvas.

---

## 2. Design System Alignment & Aesthetic Language

The explorer strictly adheres to the portfolio's established **dark cartographic** design language:

| Design Token | Value | Applied Element |
|:---|:---|:---|
| **Base Canvas** | `#101316` (Obsidian Deep) | Viewport background |
| **Card Surface** | `#14171A` (Dark Slate) | Explorer canvas panel, node containers |
| **Nested Surface** | `#181C21` (Charcoal) | Active node inspector, telemetry cards |
| **Borders & Dividers** | `#262B32` (Subtle Grid) | Canvas grid lines, node stroke outlines |
| **Primary Accent** | `#5A9A78` (Sage Green) | Active execution flow, verified gates, focus rings |
| **Warning / Alert Accent** | `#D29922` (Warm Amber) | Abstention gates, failure containment, crisis triage |
| **Error / Block Accent** | `#F85149` (Muted Coral) | Rejected unauthorized actions, fail-fast blocks |
| **Typography - Primary** | Serif (`font-serif`) | System titles, major section headings |
| **Typography - Technical** | Monospace (`font-mono`) | Component names, file paths, metrics, latency badges |
| **Typography - Prose** | Sans-serif (`font-sans`) | Component responsibilities, design explanations |

---

## 3. Core Interaction Model & Layout Hierarchy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. SYSTEM SELECTOR TABS                                                      │
│ [Ask Aadil]  [AI Reliability Platform]  [Solace AI]  [Optional: EDA]        │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. CONTROL & VIEW TOGGLES                                                    │
│ Mode: (•) Architecture Overview   ( ) Step-by-Step Flow   ( ) Failure Boundaries │
│ Playback: [◀ Prev] [▶ Next] [Auto-Play / Pause]  |  Step 3/6: "Hybrid RAG"  │
├───────────────────────────────────────────────────┬─────────────────────────┤
│ 3. INTERACTIVE ARCHITECTURE CANVAS                │ 4. COMPONENT INSPECTOR  │
│                                                   │    PANEL (SIDEBAR)      │
│  ┌──────────┐      ┌──────────┐      ┌──────────┐ │                         │
│  │ User     │ ───> │ Intent   │ ───> │ Hybrid   │ │ Title: Intent Router    │
│  │ Session  │      │ Router   │      │ RAG      │ │ Category: Deterministic │
│  └──────────┘      └────┬─────┘      └────┬─────┘ │ File: lib/rag/intent...  │
│                         │                 │       │ Latency: <2ms           │
│                         ▼                 ▼       │                         │
│                    ┌──────────┐      ┌──────────┐ │ Inputs:                 │
│                    │ Direct   │      │ LLM      │ │ • Raw Query String      │
│                    │ Action   │      │ Synthesis│ │                         │
│                    └──────────┘      └────┬─────┘ │ Outputs:                │
│                                           │       │ • RoutingDecision       │
│                                           ▼       │ • target_slug           │
│                                      ┌──────────┐ │                         │
│                                      │ Human    │ │ Verification Evidence:  │
│                                      │ Auth Gate│ │ 13/13 tests passing in  │
│                                      └──────────┘ │ test_retrieval_found... │
└───────────────────────────────────────────────────┴─────────────────────────┘
```

### 3.1 Region Breakdown & Behavior
1. **System Selector Tabs**:
   - Tab-based navigation switching between the 3 primary systems (Ask Aadil, AI Reliability, Solace AI) plus the optional fourth (EDA).
   - Instant state switch with zero page reload and zero layout thrashing.
2. **View & Execution Mode Controls**:
   - **Mode A: Architecture Overview**: Complete topology showing all layers, connections, and external services simultaneously.
   - **Mode B: Step-by-Step Flow**: Highlights active nodes and edges sequentially along a real user journey. Prev/Next step buttons and active step indicators.
   - **Mode C: Failure & Containment View**: Specifically highlights where input is validated, where models can fail, where abstention is enforced, and where human sign-off is required.
3. **Interactive Architecture Canvas**:
   - Responsive vector SVG-based canvas or CSS Flex/Grid topology layout (strictly avoiding heavy WebGL/Three.js bundles).
   - Clearly segmented horizontal or vertical architectural layers (e.g. *Client Interface*, *Gateway & Routing*, *Core Processing / Agent Graph*, *Deterministic Gates*, *Persistence & Evidence*).
   - Nodes represent real software modules; edges represent data flow, API calls, or event streams.
   - Nodes display status badges: `[Deterministic]`, `[Model Inference]`, `[Human Gate]`, `[Database]`.
4. **Deep-Dive Component Inspector Panel**:
   - Clicking any node opens or updates the Inspector Panel.
   - Displays:
     - Component Name & Formal Role.
     - Execution Nature: Deterministic vs Stochastic vs External.
     - Concrete Source Code Location (`file:///...`).
     - Typed Inputs & Outputs (Pydantic / TypeScript schemas).
     - Deterministic Invariant or Boundary Rule.
     - Verification Evidence (exact test suite, test count, and measured outcome).
     - Key Architectural Trade-Off (linked to Phase 6.1 Decision Records).

---

## 4. Multi-Device Responsive Specification

### 4.1 Desktop Viewport (1280px+)
- Two-column split layout: Left side (65% width) holds the Architecture Canvas; Right side (35% width) holds the sticky Component Inspector.
- Full interactive node clicking, keyboard arrow navigation, and animated flow pulses.
- Complete metadata visibility (latency, source path, schemas).

### 4.2 Tablet Viewport (768px – 1024px)
- Stacked layout: Architecture Canvas on top (min-height 420px); Component Inspector below in an accordion disclosure card.
- Node selection smoothly auto-scrolls inspector into visible view.
- Touch-optimized target size: minimum 48×48px clickable node regions.

### 4.3 Mobile Viewport (375px – 667px)
- Linearized vertical pipeline view rather than a wide 2D diagram.
- Step-by-step accordion card flow where each stage is a collapsible card with connected vertical rail indicators.
- Prev/Next button bar fixed at bottom of screen for thumb-friendly step navigation.
- Zero horizontal scrolling: all text, paths, and badges wrap cleanly within 320px width constraints.

---

## 5. Accessibility Requirements (WCAG 2.2 AA)

1. **Semantic HTML & Headings**:
   - Single `<h1>` for page/section title ("Interactive Architecture Explorer").
   - `<h2>` for active system name and primary inspector regions.
   - `<h3>` for individual component inspection cards.
2. **Keyboard Operability (WCAG 2.1.1)**:
   - Full keyboard accessibility: Tab enters the canvas; Arrow keys (`Left`/`Right`/`Up`/`Down`) traverse between connected nodes; `Enter` or `Space` selects and inspects a node.
   - Tab keys switch between System Selector tabs with standard `role="tab"` and `role="tabpanel"` semantics.
3. **Visible Focus Rings (WCAG 2.4.7)**:
   - All interactive nodes, tabs, and step buttons retain high-contrast focus rings (`outline: 2px solid #5A9A78; outline-offset: 2px`).
4. **Accessible Text Alternative (WCAG 1.1.1 & 1.3.1)**:
   - For screen readers, a hidden or toggleable structured text transcript is provided (`<div className="sr-only">`), detailing the entire architecture and request path in pure semantic prose and bulleted lists.
5. **Reduced Motion (WCAG 2.3.3)**:
   - All flow animations and edge pulses respect `@media (prefers-reduced-motion: reduce)` by immediately rendering static lines without movement.

---

## 6. Performance & Bundle Constraints

1. **Zero Heavy 3D Dependencies**:
   - Three.js, Babylon.js, or heavyweight canvas graph libraries (Cytoscape, React Flow) must **NOT** be added. The entire visualization can be rendered using lightweight React SVG components and CSS grid layouts with zero bundle bloat.
2. **Static Pre-Rendering of Architectural Models**:
   - All architecture nodes, edges, descriptions, and source paths must reside in a static TypeScript data file (e.g. `data/architecture/systemsArchitecture.ts`).
   - Pre-rendered at build time: zero client-side API requests or client-side fetch waterfalls.
3. **Target Bundle Size**:
   - JavaScript overhead of the entire Explorer must remain under **15 kB gzipped**.
4. **Performance Target**:
   - 60 FPS interactions on desktop and mobile, with Lighthouse Performance score maintained at $\ge 95$.

