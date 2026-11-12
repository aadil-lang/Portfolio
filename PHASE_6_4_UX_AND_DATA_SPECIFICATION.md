# Phase 6.4 — Verification & Evidence Dashboard
## UX, Information Architecture & Data Model Specification

**Role:** Principal Software Architect, Senior UX Engineer, QA Architect, Accessibility Specialist  
**Repository:** `C:\Users\HP\OneDrive\Documents\Portfolio`  
**Proposed Route:** `/verification`  
**Standard:** `engineering-security-reliability` (Level 1 Implementation Standard)  
**Date:** November 2026  
**Status:** Canonical UX & Data Specification (Stage 1 Specification — Implementation Pending Authorization)  

---

## 1. Executive Summary & Design Vision

The **Portfolio-Wide Verification & Evidence Dashboard** (`/verification`) is designed to provide technical recruiters, engineering managers, and principal architects with an interactive, transparent, and authoritative evidence inspection experience.

Rather than asking evaluators to trust unsubstantiated portfolio claims, the Verification Dashboard exposes the entire engineering verification apparatus:
- **What was tested?** (The exact systems, components, and mathematical models evaluated).
- **How was it tested?** (The testing frameworks, test harnesses, and validation methodologies).
- **Where is the proof?** (Direct links to repository source files, line ranges, and test suites).
- **What were the measured results?** (Quantitative metrics, pass rates, latency bounds, and error bounds).
- **What are the boundaries and known limitations?** (Explicit disclaimers regarding test mocks, synthetic data, and bounded claims).
- **How can it be reproduced?** (Copyable terminal commands for local execution).

---

## 2. Target Personas & User Journeys

```
+----------------------------------------------------------------------------------------------------+
| PERSONA 1: SENIOR TECHNICAL RECRUITER (30–60 SECONDS)                                              |
| Goal: Quick verification that technical claims are backed by real engineering rigor.               |
| Path: Views Command Deck -> Scans System Matrix -> Notes 758 in-repo & 1,650+ upstream tests.      |
+----------------------------------------------------------------------------------------------------+
| PERSONA 2: ENGINEERING MANAGER / HIRING MANAGER (2–5 MINUTES)                                      |
| Goal: Evaluate quality culture, testing discipline, and architecture-level risk management.        |
| Path: Filters by "Automated Suite" & "Deterministic Boundary" -> Reads ADR evidence pointers.      |
+----------------------------------------------------------------------------------------------------+
| PERSONA 3: PRINCIPAL ARCHITECT / STAFF AI SYSTEMS ENGINEER (5–15 MINUTES)                          |
| Goal: Rigorous technical inspection of mathematical proofs, RAG metrics, and failure boundaries.    |
| Path: Inspects EDA calculus, RAG Lab golden benchmark, Solace circuit breakers, copies CLI command.|
+----------------------------------------------------------------------------------------------------+
```

---

## 3. Information Architecture & Page Layout (`/verification`)

The dashboard page is structured into six sequential, high-density engineering sections:

```
+----------------------------------------------------------------------------------------------------+
| SECTION 1: VERIFICATION COMMAND DECK (Hero Metrics)                                                |
| - Total Passing Tests: 2,408+ (758 Active In-Repo Assertions + 1,650+ Upstream Suites)             |
| - Golden Benchmark Retrieval Cases: 12 (P@5: 30%, R@5: 100%, MRR: 0.8333)                        |
| - Regressions: 0 | Invariant Graph Checks: 661 | Mathematical Bounds: < 10⁻⁶ Discrepancy           |
+----------------------------------------------------------------------------------------------------+
| SECTION 2: SYSTEM VERIFICATION MATRIX (High-Level Project Health Grid)                             |
| - Grid of all 11 Case Studies + Ask Aadil + RAG Lab + Quick View + Architecture Explorer           |
| - Shows Project Name, Category, Test Count, Primary Modality, Status Badge                         |
+----------------------------------------------------------------------------------------------------+
| SECTION 3: INTERACTIVE EVIDENCE EXPLORER (Deep-Dive Filterable Evidence Cards)                     |
| - Search input + Filters: [All Modalities] [Automated Suite] [Math] [Benchmark] [Security]       |
| - Filter by Project / Status: [All] [Verified In-Repo] [Verified Upstream] [Qualified]             |
| - Collapsible Evidence Cards with Source Links, Line Ranges, Measured Values, Reproduction CLI     |
+----------------------------------------------------------------------------------------------------+
| SECTION 4: AUDITED QUANTITATIVE CLAIMS & QUALIFICATIONS SHOWCASE                                   |
| - Comparison table: Public Portfolio Claim vs Source Reality vs Exact Qualification Badges         |
| - Anti-inflation callout boxes (EDA 0.0000% volume calculus, Solace 24 regex patterns, etc.)      |
+----------------------------------------------------------------------------------------------------+
| SECTION 5: DOCUMENTED ENGINEERING LIMITATIONS & HONEST DISCLOSURES                                 |
| - Explicit boundary disclosure drawer (Mocked external APIs, subword n-gram vector space, etc.)    |
+----------------------------------------------------------------------------------------------------+
| SECTION 6: REPRODUCTION CENTER (One-Click CLI Commands)                                            |
| - Tabbed terminal commands to run in-repo test suites, Docker harnesses, or benchmark scripts      |
+----------------------------------------------------------------------------------------------------+
```

---

## 4. Visual Design System & Theming

To maintain strict visual coherence with the rest of the portfolio (`/`, `/projects/[slug]`, `/recruiter`, `/architecture`), the Verification Dashboard adheres to the existing design system:

| Design Element | Token / Value | Usage |
|:---|:---|:---|
| **Background Deep** | `#101316` | Main viewport canvas |
| **Card Surface** | `#14171A` | Evidence cards, metric deck, section containers |
| **Card Elevated / Hover** | `#181C21` | Interactive card states, active pills, expanded drawers |
| **Border Subtle** | `#262B32` | Card borders, table dividers, grid lines |
| **Border Active / Focus** | `#5A9A78` | Focused inputs, active filter pills, primary accent borders |
| **Accent Sage Green** | `#5A9A78` | Pass badges, key metrics, verified status indicators |
| **Warning / Amber** | `#D99B26` | Qualified badges, boundary notices, limitation alerts |
| **Benchmark Blue** | `#4A90E2` | AI evaluation metrics, retrieval stats, dataset badges |
| **Text Primary** | `#E5E7EB` | Headings, primary metrics, card titles |
| **Text Secondary** | `#9CA3AF` | Descriptions, labels, line numbers, table headers |
| **Text Muted** | `#6B7280` | Constraints, fine print, metadata timestamps |
| **Code Surface** | `#0D1013` | Reproduction code blocks, file path badges |

---

## 5. TypeScript Data Model Specification

When authorized for Stage 2, the data powering `/verification` will reside in a dedicated module: `data/verification/`. Below is the strict TypeScript interface contract:

```typescript
// types/verification.ts

export type VerificationModality =
  | 'automated-suite'           // Pytest, Jest, Playwright suites
  | 'mathematical-verification' // Analytical vs discrete mass property integrals
  | 'golden-benchmark'          // Statistical retrieval metrics (P@K, MRR, nDCG)
  | 'deterministic-boundary'    // Regex pattern matching, covariance thresholding
  | 'security-containment'      // Formula injection sanitizer, memory zero-retention
  | 'performance-cache'         // Latency micro-batching, MD5 asset caching
  | 'architectural-invariant'   // Clean Architecture DAGs, route/slug integrity

export type VerificationStatus =
  | 'verified-in-repo'          // Actively executed via in-repo test runner (758 checks)
  | 'verified-upstream'         // Executed in dedicated project repo / Docker container
  | 'qualified-bounded'         // Bounded to specific documented engineering constraints
  | 'historical-record'         // Measured during production run or deployment

export interface VerificationEvidence {
  id: string                    // Stable unique ID, e.g. "EVID-EDA-01"
  title: string                 // Human-readable title
  projectSlug: string           // Target project slug or 'portfolio-core'
  projectName: string           // Full display name
  modality: VerificationModality// Categorization for filtering
  status: VerificationStatus    // Authoritative status
  verificationMethod: string    // e.g. "Pytest Docker Harness", "Pure TypeScript AST"
  sourceFile: string            // Relative source path, e.g. "tests/test_cad_engine.py"
  lineRange?: string            // e.g. "88-124"
  metricValue: string           // e.g. "424 tests", "0.0000% error", "100%"
  metricLabel: string           // e.g. "Automated Pytests Passing", "Volume Error Discrepancy"
  reproductionCommand: string   // CLI command to reproduce
  constraints?: string          // Explicit engineering caveats/boundaries
  summary: string               // Detailed technical description
}

export interface ProjectVerificationSummary {
  slug: string
  name: string
  category: string
  totalTests: number
  inRepoTests: number
  upstreamTests: number
  status: VerificationStatus
  primaryModality: VerificationModality
  evidenceCount: number
  evidenceIds: string[]
}

export interface VerificationMetricsDeck {
  totalPassingTests: number     // 2408+
  inRepoAssertions: number      // 758
  upstreamTests: number         // 1650+
  goldenBenchmarkCases: number  // 12
  zeroRegressions: boolean      // true
  meanPAt5: number              // 0.30
  meanRAt5: number              // 1.00
  meanMRR: number               // 0.8333
  meanNDCGAt5: number           // 0.7937
}
```

---

## 6. Component Architecture & Hierarchy

When implemented in Stage 2, the `/verification` route will be constructed using modular, highly decoupled components in `components/verification/`:

```
components/verification/
├── VerificationDashboard.tsx           # Main page orchestrator (state: search, filters)
├── VerificationCommandDeck.tsx         # Section 1: Top-level hero metrics & KPI cards
├── SystemVerificationMatrix.tsx        # Section 2: High-level grid of systems and health
├── EvidenceExplorer.tsx                # Section 3: Filterable list of granular evidence cards
├── EvidenceCard.tsx                    # Granular card with badge, code snippet, source link
├── QuantitativeClaimsComparison.tsx    # Section 4: Public claim vs audited reality table
├── DocumentedLimitationsDrawer.tsx     # Section 5: Honest engineering boundaries disclosure
└── ReproductionCenter.tsx              # Section 6: Tabbed CLI commands for local execution
```

---

## 7. Accessibility (WCAG 2.2 AA) & Responsive Specification

### 7.1 Accessibility Requirements
1. **Semantic HTML**: All sections wrapped in semantic `<section aria-labelledby="...">` tags.
2. **Keyboard Navigation**:
   - Filter pills must be keyboard-focusable buttons with `aria-pressed="true|false"`.
   - Collapsible evidence cards must toggle on `Enter` or `Space`, with proper `aria-expanded` attributes.
   - Drawer sections must support `Escape` key dismissal.
3. **Color Contrast**:
   - Primary text (`#E5E7EB`) on dark background (`#101316`): Contrast ratio $> 11.5:1$ (exceeds WCAG AAA).
   - Secondary text (`#9CA3AF`): Contrast ratio $> 5.8:1$ (exceeds WCAG AA).
   - Accent sage (`#5A9A78`): Contrast ratio $> 4.8:1$ for headers and UI badges.
4. **Screen Reader Descriptions**:
   - Filter count pills announce `"(Showing X of Y evidence records)"`.
   - Reproduction commands include clear `aria-label="Copy reproduction command to clipboard"`.

### 7.2 Responsive Breakpoints
- **Desktop ($\ge 1200\text{px}$)**: 4-column metric deck, 3-column project matrix, 2-column evidence explorer with persistent filter sidebar.
- **Tablet ($768\text{px} - 1199\text{px}$)**: 2-column metric deck, 2-column project matrix, top-horizontal scrollable filter bar, single-column evidence cards.
- **Mobile ($< 768\text{px}$)**: 1-column stacked metric cards, swipeable project matrix cards, vertical stacked filter dropdown, touch-friendly tap targets ($\ge 44\times 44\text{px}$).

---

## 8. Integration Points & Entry Routes

Subtle, professional entry points to `/verification` will be integrated in Stage 2:
1. **Global Header (`components/Header.tsx`)**:
   - Subtle navigation item: `Verification` alongside `Projects`, `Architecture`, `Recruiter`, `Journal`.
2. **Homepage Hero / Verification Pill (`components/Hero.tsx` or `app/page.tsx`)**:
   - Subtle status badge in the hero: `"758 Active In-Repo Assertions • 100% Passing [View Evidence →]"`.
3. **Case Study Verification Callouts (`app/projects/[slug]/page.tsx`)**:
   - Section 09 or hero badge linking directly to filtered evidence on `/verification?project=[slug]`.

---

## 9. Stage 2 Implementation Boundary Checks

Before Stage 2 authorization:
- `lib/rag/` files must remain untouched.
- Ask Aadil conversational RAG model parameters, system prompts, and memory must remain 100% untouched.
- RAG Evaluation Lab (`app/rag-lab/`, `lib/rag-lab/`) must remain 100% untouched.
- The new route `/verification` will be a purely static pre-rendered Next.js page.

