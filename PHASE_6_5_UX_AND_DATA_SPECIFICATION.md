# Phase 6.5 — Interactive Project Comparison
## UX, Information Architecture & Data Model Specification

**Role:** Principal UX Architect, Senior Full-Stack Engineer, Technical Product Architect  
**Repository:** `C:\Users\HP\OneDrive\Documents\Portfolio`  
**Proposed Route:** `/compare`  
**Standard:** `engineering-security-reliability` (Level 1 Implementation Standard)  
**Date:** November 2026  
**Status:** Canonical UX & Data Specification (Stage 1 Specification — Implementation Pending Authorization)  

---

## 1. Executive Summary & Design Vision

The **Interactive Project Comparison Workspace** (`/compare`) allows technical recruiters, engineering leaders, and principal architects to conduct structured, side-by-side technical evaluations of any 2 or 3 systems from the portfolio.

Rather than presenting static, generic SaaS comparison tables or vanity scores, the workspace is an **architectural reasoning canvas**:
- **Side-by-Side Architectural Contrast**: How does a conversational RAG agent compare to a headless synthetic browser diagnostic harness?
- **AI vs Deterministic Boundaries**: Where does each system rely on probabilistic models versus sub-millisecond deterministic software rules?
- **Failure Containment Strategy**: How does each system prevent bad extractions or network timeouts from corrupting state?
- **Honest Attribution**: Clear, prominent delineation of individual engineering contributions within team-owned systems.

---

## 2. Target Personas & User Journeys

```
+----------------------------------------------------------------------------------------------------+
| PERSONA 1: TECHNICAL RECRUITER / HIRING MANAGER (30–90 SECONDS)                                    |
| Goal: Rapidly evaluate candidate breadth across AI architectures, Python backends, and full-stack. |
| Path: Selects Preset "Solace AI vs Ask Aadil" -> Scans AI vs Deterministic Boundary -> Clicks PDF.|
+----------------------------------------------------------------------------------------------------+
| PERSONA 2: ENGINEERING MANAGER / STAFF ENGINEER (3–7 MINUTES)                                      |
| Goal: Assess software engineering discipline, failure modes, and testing methodologies.            |
| Path: Selects Preset "AI Reliability vs OCR Evaluator" -> Compares Failure Handling & Verification.|
+----------------------------------------------------------------------------------------------------+
| PERSONA 3: PRINCIPAL AI SYSTEMS ARCHITECT (10+ MINUTES)                                            |
| Goal: Deep-dive inspection of state graph loops, RAG token budgets, and mathematical proofs.       |
| Path: Custom selects "Ask Aadil" + "Atlas AI" + "EDA" -> Inspects Trade-offs & Cross-Links.        |
+----------------------------------------------------------------------------------------------------+
```

---

## 3. Information Architecture & Page Layout (`/compare`)

The proposed `/compare` route is structured into five sequential sections:

```
+----------------------------------------------------------------------------------------------------+
| SECTION 1: COMPARISON WORKSPACE HEADER                                                             |
| - Title & Objective: Architectural judgment & trade-off analysis across 11 case studies            |
| - Governance Notice: Source-grounded comparisons; strictly zero vanity scores or difficulty ratings|
+----------------------------------------------------------------------------------------------------+
| SECTION 2: CURATED PRESETS BAR & PROJECT SELECTOR                                                  |
| - 7 Curated Comparison Preset Pills (e.g. "Ask Aadil vs Atlas AI", "EDA vs AI Worksheets")         |
| - Interactive Multi-Select Controls (Select 2 or 3 projects from 11 case studies; Clear button)    |
| - Selected project chip indicators with remove buttons                                             |
+----------------------------------------------------------------------------------------------------+
| SECTION 3: SIDE-BY-SIDE ARCHITECTURAL COMPARISON MATRIX                                            |
| - Desktop (>= 1024px): 2 or 3 side-by-side columns matching selected projects                      |
| - Mobile (< 1024px): Responsive stacked comparison cards with dimension jump links                |
| - 10 Structured Comparison Dimensions (Problem, Architecture, AI vs Deterministic, Data, etc.)    |
+----------------------------------------------------------------------------------------------------+
| SECTION 4: ENGINEERING TRADE-OFF DEEP DIVE                                                         |
| - Callout cards highlighting deliberate technical compromises made by selected systems             |
| - Latency vs cost, determinism vs flexibility, client-side vs server-side execution                |
+----------------------------------------------------------------------------------------------------+
| SECTION 5: PROVENANCE, EVIDENCE & ARCHITECTURE CROSS-LINKS                                         |
| - Direct links to Phase 6.4 Evidence Register (/verification#evid-*),                             |
|   Phase 6.3 Architecture Explorer (/architecture?system=*), and Phase 6.1 Decisions ADRs           |
+----------------------------------------------------------------------------------------------------+
```

---

## 4. Visual Design System Integration

The comparison workspace adheres strictly to the portfolio's established dark cartographic aesthetic:

| Design Token | Hex / Style | UI Application |
|:---|:---|:---|
| **Canvas Background** | `#101316` | Main page background |
| **Panel Surface** | `#14171A` | Comparison matrix cells, selector cards |
| **Elevated Surface** | `#181C21` | Active preset pill, hover states |
| **Subtle Border** | `#262B32` | Grid dividers, column borders |
| **Accent Sage Green** | `#5A9A78` | Active project indicators, verified badges, primary highlights |
| **Warning / Amber** | `#D99B26` | Qualified badges, boundary notices |
| **Benchmark Blue** | `#388BFD` | Technical metadata, architecture component tags |
| **Typography** | Serif / Monospace / Sans | Serif headings (`font-serif`), monospace badges (`font-mono`) |

---

## 5. TypeScript Data Architecture Specification

When authorized for Stage 2, the data supporting `/compare` will reside in `data/comparison/`:

```typescript
// types/comparison.ts

export type ComparisonDimensionId =
  | 'problem-objective'
  | 'architectural-pattern'
  | 'ai-vs-deterministic'
  | 'data-retrieval'
  | 'orchestration-state'
  | 'failure-containment'
  | 'evaluation-verification'
  | 'hitl-governance'
  | 'core-trade-offs'
  | 'individual-contribution'

export interface DimensionDetail {
  dimensionId: ComparisonDimensionId
  title: string
  summary: string
  keyMechanisms: string[]
  evidenceIds?: string[]
  componentIds?: string[]
  decisionIds?: string[]
  qualificationNote?: string
}

export interface ProjectComparisonProfile {
  slug: string
  name: string
  tagline: string
  category: string
  dimensions: Record<ComparisonDimensionId, DimensionDetail>
  caseStudyRoute: string
  architectureRoute: string
  verificationRoute: string
}

export interface ComparisonPreset {
  id: string
  title: string
  tagline: string
  projectSlugs: [string, string] | [string, string, string]
  rationale: string
  keyContrastDimension: ComparisonDimensionId
}
```

---

## 6. Curated Comparison Presets Specification

The system will register the seven curated comparison presets established in the framework:

1. `PRESET-01`: **Conversational vs Regulatory Financial RAG** (`ask-aadil` vs `atlas-ai`)
2. `PRESET-02`: **Conversational Assistant vs Synthetic Browser Diagnostic** (`ask-aadil` vs `ai-reliability`)
3. `PRESET-03`: **Multi-Agent UI Stress vs Controlled Perturbation OCR** (`ai-reliability` vs `ocr-evaluator`)
4. `PRESET-04`: **Deterministic CAD Calculus vs Generative Educational LaTeX** (`design-automation` vs `ai-worksheets`)
5. `PRESET-05`: **Batch Map-Reduce ETL vs Pre-Flight Deterministic Guardrail** (`curriculum-etl` vs `vm-copy`)
6. `PRESET-06`: **Clean Architecture Procurement vs SEC Multi-Agent Discovery** (`loom-ai` vs `atlas-ai`)
7. `PRESET-07`: **Voice-First Mobile Companion vs Web-Based Grounded Assistant** (`solace-ai` vs `ask-aadil`)

---

## 7. Accessibility (WCAG 2.2 AA) & Responsive Reflow Specification

### 7.1 Accessibility Requirements
1. **Semantic Comparison Matrix**:
   - Desktop view uses semantic `<div role="table">` or HTML `<table>` with explicit row and column headers.
   - Screen reader announcements: project selector changes trigger polite live region updates (`aria-live="polite"` announcing `"Comparing [Project A] and [Project B]"`).
2. **Keyboard Navigation**:
   - Preset pills are keyboard-operable `<button>` elements with `aria-pressed="true|false"`.
   - Multi-select dropdown and project chips support `Tab`, `Enter`, `Space`, and `Backspace` to remove.
3. **Contrast Ratios**:
   - All body text maintains $>5.8:1$ contrast against `#14171A`.
   - Badges and borders maintain $>3:1$ contrast against adjacent surfaces.

### 7.2 Responsive Layout
- **Desktop ($\ge 1024\text{px}$)**: Full side-by-side comparison matrix with synchronized dimension rows and sticky column headers.
- **Tablet ($768\text{px} - 1023\text{px}$)**: 2-column comparison matrix with horizontal scroll indicators if 3 projects are selected.
- **Mobile ($< 768\text{px}$)**: Stacked dimension cards where each dimension displays the selected projects sequentially, preventing illegible narrow columns.

---

## 8. Cross-Feature Integration Points

When implemented in Stage 2, `/compare` will integrate seamlessly into the portfolio:
1. **Global Header (`components/Header.tsx`)**:
   - Subtle navigation item: `Compare` alongside `Projects`, `Architecture`, `Verification`.
2. **Case Study Direct Links (`app/projects/[slug]/page.tsx`)**:
   - In Section 09 or Hero: `"Compare this architecture with related systems →"`, pre-selecting the current project.
3. **Architecture Explorer Integration (`app/architecture/page.tsx`)**:
   - Component inspector badge linking to compare system topologies.
4. **Verification Dashboard Cross-Links (`app/verification/page.tsx`)**:
   - Comparison matrix links directly into granular evidence cards in `/verification`.

