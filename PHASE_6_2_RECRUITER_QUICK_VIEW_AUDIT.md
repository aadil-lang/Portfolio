# PHASE 6.2 — RECRUITER QUICK VIEW AUDIT
**Stage 1: Read-Only UX, Content & Architecture Investigation**

- **Repository:** `C:\Users\HP\OneDrive\Documents\Portfolio`
- **Branch:** `main` (Commit: `615daf95`)
- **Date:** November 2026
- **Auditor Roles:** Principal Product Engineer, UX Architect, Technical Recruiter & Engineering Quality Auditor
- **Standard Applied:** `engineering-security-reliability` (Level 1 Implementation Standards)
- **Mode:** READ-ONLY INVESTIGATION (Zero codebase modifications executed)

---

## 1. Executive Summary & Problem Statement

### 1.1 The Recruiter & Hiring Manager Persona
Technical recruiters and engineering hiring managers evaluate hundreds of candidate profiles weekly. Industry telemetry and eye-tracking research demonstrate that initial candidate triage occurs within **30 to 60 seconds**. 

While the existing AI Engineering Portfolio provides extraordinary technical depth (11 multi-tier system specifications, interactive Three.js CAD models, an evaluation visualizer, and a full RAG evaluation lab), this comprehensive depth introduces cognitive overload during initial screening:
- A recruiter seeking a high-level summary of Aadil's **role positioning**, **core stack**, **verified employment history**, and **top engineering achievements** must navigate multiple deep pages (`/experience`, `/systems`, `/journal`, `/projects/[slug]`).
- Navigating back and forth between 11 deep case studies makes it difficult to quickly synthesize Aadil's primary focus as an **AI Systems Engineer**.

### 1.2 Mission Objective
Design a focused, high-signal, accessible **Recruiter Quick View** experience that communicates:
1. **Professional Identity:** AI Systems Engineer.
2. **Core Capabilities:** Agentic orchestration, RAG architectures, Python backend pipelines, AI reliability, and deterministic verification harnesses.
3. **Career Progression:** Wayground employment tenure accurately distinguished from earlier SME work, with August 2026 onward explicitly classified as Independent AI Engineering & Research.
4. **Curated Strongest Projects:** Exactly 4 high-impact AI systems demonstrating full-stack engineering, testing, and production safety.
5. **Direct Actions:** One-click canonical resume download (`/resume.pdf`), LinkedIn, GitHub, and contact access.

This experience is **not** a replacement portfolio, duplicate resume, or second homepage. It is a high-density, distilled executive brief designed to funnel recruiters into deep case studies with zero friction.

---

## 2. Existing Architecture & UI Inspection

### 2.1 Navigation & Layout Baseline
- **Navigation (`components/Header.tsx`):**
  - Desktop links: `Timeline (/experience)`, `Journal (/journal)`, `Systems (/systems)`, `RAG Lab (/rag-lab)`, `Contact (/contact)`.
  - Utility actions: GitHub icon, LinkedIn icon, `Ask Aadil` modal trigger button, and `Resume` PDF button.
- **Homepage Structure (`app/page.tsx`):**
  - Section 01: Hero & Professional Positioning (Name, headline, trajectory, CTA buttons).
  - Section 02: Ask Aadil Interactive Assistant Card.
  - Section 03: Core Engineering Philosophy ("Authority Boundaries & Deterministic Invariants").
  - Section 04: Systems Matrix (Cards linking to 11 case studies).
  - Section 05: Quantitative Claims Registry preview.
  - Section 06: Career Chronology Overview.
- **Routing Structure:**
  - Next.js 13.4.10 App Router.
  - All 11 project case studies dynamically pre-rendered under `/projects/[slug]` and `/systems/[slug]`.
  - API routes: `/api/contact` (only dynamic serverless function).
- **Styling Tokens:**
  - Dark cartographic theme: Canvas `#101316`, Card Surface `#14171A`, Nested Container `#181C21`, Slate Borders `#262B32`, Accent Sage Green `#5A9A78` (5.42:1 contrast ratio), Font Families: Serif headings (`Playfair Display` or system serif), Mono metadata (`JetBrains Mono` or system mono), Sans body text.

---

## 3. Canonical Content & Source-of-Truth Inventory

A strict inspection was conducted across canonical data files to ensure **Zero Invention of History**:

| Data Entity | Source File | Canonical Content / Verified Value |
| :--- | :--- | :--- |
| **Legal Name** | `data/canonical/structuredProfile.ts` | **Mohemmed Aadil Khurshid** |
| **Primary Headline** | `data/canonical/structuredProfile.ts` | **AI Systems Engineer** |
| **Supporting Headline** | `data/canonical/resumeData.ts:90` | **AI Engineer \| Python \| LLM & Agentic Systems \| Full-Stack** |
| **Technical Value Proposition** | `data/canonical/structuredProfile.ts:20` | *"AI Systems Engineer building reliable software systems around AI: LangGraph agentic workflows, deterministic verification harnesses, high-throughput ETL pipelines, and CAD/physics synthesis."* |
| **Contact Email** | `data/canonical/structuredProfile.ts:24` | `aadil.khurshid95@gmail.com` |
| **Contact Phone** | `data/canonical/structuredProfile.ts:26` | `+91-7973949541` (Verified from canonical resume) |
| **LinkedIn URL** | `data/canonical/structuredProfile.ts:30` | `https://www.linkedin.com/in/mohemmed-aadil-khurshid/` |
| **Primary GitHub** | `data/canonical/structuredProfile.ts:32` | `https://github.com/aadil-lang` |
| **Resume Asset** | `public/resume.pdf` | Verified canonical PDF (345,581 bytes, last generated 2026-11-10) |
| **Formal Education** | `data/canonical/structuredProfile.ts:41-48` | **B.Tech (Hons.) in Mechanical Engineering**, Lovely Professional University, Punjab (2013–2017), CGPA: 7.66 / 10 |
| **Location & Availability** | `data/canonical/structuredProfile.ts:37-38` | Location: Varanasi, Uttar Pradesh, India \| Availability: Open to AI Roles (Remote & Hybrid/Hyderabad) |

---

## 4. Verified Professional Experience & Career Chronology

A common risk in technical portfolios is conflating content roles with engineering roles, or misrepresenting independent research as salaried employment. The canonical records (`resumeData.ts`, `data/experience.ts`, `data/canonical/portfolioKnowledge.ts`) establish the following verified facts:

### 4.1 Chronological Summary Table

| Timeframe | Organization / Setting | Verified Formal Role | Core Responsibilities & Engineering Scope |
| :--- | :--- | :--- | :--- |
| **August 2026 – Present** | **Independent AI Engineering & Research** | Independent Researcher & Engineer | Full-stack agentic systems, open-source RAG evaluation (`/rag-lab`), OpenCascade CAD synthesis (EDA), multi-modal diagnostic harnesses, and grounded conversational agents (Ask Aadil). **Explicit Rule:** Not employment, consulting, or contract work. |
| **January 2026 – July 2026** | **WAYGROUND Inc (Bengaluru, India)** | **AI Engineer — AI/ML Team** | Asynchronous Map-Reduce ETL pipeline (Curriculum Transformation Engine), AI Worksheets POC (TikZ compilers & backtracking solvers), and US Mathematics Item Bank LangGraph pipelines. |
| **January 2024 – December 2025** | **WAYGROUND Inc (Bengaluru, India)** | **Subject Matter Expert — Mathematics** | Authored K–12 mathematics curricula, KaTeX technical typesetting, SME testing on VoyageMath Content Builder V1, and developed the in-house **VM Copy Question Generator** (October–December 2025) which served as the internal catalyst for transition to the AI/ML engineering team. |
| **June 2022 – September 2022** | **DIGIPPLUS** | QA/QC Specialist | Quality assurance and verification of educational deliverables against standard compliance matrices. |
| **October 2021 – February 2022** | **InhaltMart Educational Services** | SME, Mathematics | Mathematics content authoring, LaTeX formatting, and TI-83 graphing calculator model construction. |
| **May 2021 – October 2021** | **Graveiens Eduservices Pvt. Ltd.** | Advanced Math Content Developer | Problem authoring and solution review on Brainly CMS. |

### 4.2 Experience Duration Metrics
- **Overall Professional Experience:** ~4 years of professional experience (May 2021 to July 2026 + ongoing research).
- **Hands-on AI Engineering Experience:** Around 1 year of direct, dedicated AI systems engineering (late 2025 through 2026).
- **Wayground Tenure:** 2 years 7 months continuous tenure (January 2024 – July 2026).

---

## 5. Recommended Four Featured Projects

To demonstrate technical depth across the full spectrum of an **AI Systems Engineer** (reliability, agentic orchestration, high-throughput ETL, and user-facing multimodal systems), four flagship projects are recommended:

### 1. AI Application Reliability Platform
- **Role Alignment:** AI Reliability, Evaluation, Observability & Governance.
- **One-Line Contribution:** Built a dual-agent diagnostic harness pairing Playwright Chromium browser automation with Fisher Information uncertainty quantification and SHA-256 cryptographic provenance ledgers.
- **Core Technologies:** Python, Playwright, Ollama, Fisher Information Covariance, FastMCP, Next.js.
- **Verified Outcome:** **205 automated tests** (158 backend + 47 governance); enforced `ABSTAIN` verdict when uncertainty exceeded $\epsilon_{\text{abstain}}$, completely eliminating hallucinated patch application.
- **Detailed Case Study:** `/projects/ai-reliability`

### 2. Ask Aadil — Stateful Portfolio Agent & Controlled Actions
- **Role Alignment:** LLM Systems, Hybrid RAG, Human-in-the-Loop Governance & Web Speech.
- **One-Line Contribution:** Engineered a production conversational agent with deterministic intent routing, decoupled multi-source authority retrieval, and two-phase human confirmation gates.
- **Core Technologies:** Next.js 16 App Router, React 19, TypeScript, Web Speech API, Hybrid Retrieval.
- **Verified Outcome:** **172 automated test cases**; 100% factual consistency across repeated queries; 100% epistemic refusal on unrecorded facts.
- **Detailed Case Study:** `/projects/ask-aadil`

### 3. Solace AI — Mindful Wellness Companion
- **Role Alignment:** Real-Time Multimodal AI, Healthcare Safety, Mobile Systems & Resilient Transport.
- **One-Line Contribution:** Built an Expo mobile mental health companion and FastAPI/LangGraph backend with sub-2ms deterministic crisis screening, ephemeral zero-retention audio handling, and single-POST SSE transport.
- **Core Technologies:** React Native (Expo 58), Python 3.12, FastAPI, LangGraph, Supabase RLS, Gemini API.
- **Verified Outcome:** **102 automated tests** (52 backend pytests + 50 mobile node suites); <2ms crisis interception; 0 byte disk persistence for raw biometric audio.
- **Detailed Case Study:** `/projects/solace-ai`

### 4. Curriculum Transformation Engine
- **Role Alignment:** High-Throughput Concurrent ETL, Dynamic Schema Contracts & Data Extraction.
- **One-Line Contribution:** Built an asynchronous Map-Reduce ETL pipeline transforming unstructured multi-megabyte state standard PDFs into normalized tabular datasets with dynamic Pydantic schema validation.
- **Core Technologies:** Python 3.12, Claude 3.5 Sonnet, Pydantic v2, Pandas, ThreadPoolExecutor.
- **Verified Outcome:** **124 automated pipeline tests**; dynamic schema derivation from 10-line sample CSV contracts; single-pass evaluate-and-fix review halving latency and token spend.
- **Detailed Case Study:** `/projects/curriculum-etl`

*(Honorable Mention / Secondary Links: Engineering Design Automation `/projects/design-automation` for CAD physics and RAG Evaluation Lab `/rag-lab` for interactive retrieval inspection).*

---

## 6. Architectural Options Comparison

Four structural architectural options were evaluated for implementing the Recruiter Quick View:

| Dimension | Option 1: Dedicated Route (`/recruiter`) | Option 2: Slide-Over Drawer / Modal | Option 3: Integrated Homepage Section | Option 4: Hybrid (Route + Header/Hero Pill) |
| :--- | :--- | :--- | :--- | :--- |
| **Discoverability** | High (Direct URL `/recruiter`, shareable in emails/LinkedIn). | Medium (Requires clicking a button on page). | Medium (Requires scrolling past Hero). | **Maximum** (Shareable link + direct pills in Header and Hero). |
| **Recruiter UX (30–60s scan)** | **Optimal:** Clean, distraction-free vertical reading flow. | Moderate: Cramped on small screens; double scrollbars. | Poor: Intermixed with 5 other homepage sections. | **Optimal:** One-click instant view from anywhere. |
| **Mobile Usability** | **Excellent:** Native browser scrolling and viewport handling. | Poor: Collides with mobile address bar and touch gestures. | Good: Standard mobile page scroll. | **Excellent:** Dedicated native page layout. |
| **Accessibility (WCAG 2.2 AA)**| **Highest:** Semantic document, native back button, 0 focus traps. | Complex: Requires `role="dialog"`, focus trap, Escape handler. | High: Standard semantic section. | **Highest:** Pure semantic page. |
| **Maintainability** | Clean, isolated page importing canonical registries. | Modal logic shared across layout; state coordination risk. | Bloats `app/page.tsx` (>700 lines). | Clean isolated page + lightweight link triggers. |
| **Performance (Bundle / FCP)** | **Sub-second:** Pre-rendered static HTML (`○ /recruiter` ~2.5 kB).| Increases client bundle unless lazy-loaded with dynamic import.| Adds to homepage initial payload. | **Sub-second:** Static pre-render, zero bundle bloat. |
| **Ask Aadil Boundary Risk** | **Zero:** Completely independent route; zero shared state. | Moderate: Risks overlay z-index stacking with Ask Aadil modal. | Zero: No runtime interaction with Ask Aadil. | **Zero:** Completely independent route. |

### Architectural Recommendation: **Option 4 (Dedicated Route `/recruiter` with Prominent Header & Hero Entry Points)**
Creating a dedicated, statically pre-rendered route at `/recruiter` delivers the best user experience for hiring managers. It can be shared directly on resumes, LinkedIn messages, and cover letters, while existing portfolio visitors can access it via a dedicated high-visibility pill in the Header navigation and the Hero action bar.

---

## 7. Proposed Information Hierarchy & Page Blueprint

```
┌────────────────────────────────────────────────────────────────────────┐
│  RECRUITER QUICK VIEW // 30-SECOND EXECUTIVE BRIEF                     │
├────────────────────────────────────────────────────────────────────────┤
│  [A. HEADER & IDENTITY]                                                │
│  • Mohemmed Aadil Khurshid — AI Systems Engineer                       │
│  • Tagline: Reliable AI Applications, Agentic Systems, Python & RAG    │
│  • Quick Facts: 4 Yrs Overall Exp (1 Yr Dedicated AI Engineering)      │
│  • Location: Varanasi, India | Open to Work (Remote / Hybrid)          │
│  • Action Row: [Download Resume (PDF)] [LinkedIn] [GitHub] [Contact]   │
├────────────────────────────────────────────────────────────────────────┤
│  [B. CORE ENGINEERING CAPABILITIES]                                   │
│  6 High-Density Competency Badges:                                     │
│  1. Agentic Systems (LangGraph, Supervisor Graphs, Tool Governance)    │
│  2. RAG & Retrieval (BM25, Vector Search, Reciprocal Rank Fusion)     │
│  3. AI Reliability & QA (Playwright, Fisher Uncertainty, Provenance)   │
│  4. Python Backend (FastAPI, Pydantic, Concurrency, SSE Streaming)    │
│  5. Full-Stack Delivery (Next.js 16, React 19, React Native Expo, RLS) │
│  6. Deterministic Systems (Compilers, Backtracking, Closed-Form Math)  │
├────────────────────────────────────────────────────────────────────────┤
│  [C. PROFESSIONAL EXPERIENCE SUMMARY]                                  │
│  Chronological 3-Tier Card Stack:                                      │
│  • Aug 2026 – Present: Independent AI Engineering & Research           │
│  • Jan 2026 – Jul 2026: AI Engineer — Wayground Inc (AI/ML Team)       │
│  • Jan 2024 – Dec 2025: Mathematics SME — Wayground Inc (VM Copy Lead) │
│  [Link: View Full Interactive Timeline →]                              │
├────────────────────────────────────────────────────────────────────────┤
│  [D. FOUR CURATED FLAGSHIP PROJECTS]                                   │
│  2x2 Grid of Executive Cards:                                          │
│  1. AI Application Reliability Platform (205 tests, Fisher covariance) │
│  2. Ask Aadil Conversational Agent (172 tests, deterministic routing)  │
│  3. Solace AI Wellness Companion (102 tests, <2ms crisis screening)    │
│  4. Curriculum Transformation Engine (124 tests, dynamic CSV contracts)│
├────────────────────────────────────────────────────────────────────────┤
│  [E. DIRECT CONTACT & ACTIONS]                                         │
│  • Email: aadil.khurshid95@gmail.com | Phone: +91-7973949541           │
│  • Buttons: [Schedule Contact] [Explore Full Systems Archive]          │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 8. Accessibility, Security & Privacy Requirements

### 8.1 Accessibility (WCAG 2.2 Level AA)
- **Semantic Structure:** Exactly one `<h1>`, followed by logical `<h2>` section landmarks (`<header>`, `<main>`, `<section>`, `<footer>`).
- **Contrast Compliance:** All text colors must achieve $\ge 4.5:1$ contrast against `#101316` / `#14171A`.
- **Keyboard Operability:** All buttons, outbound links, and navigation controls must be reachable via `Tab` and display a clear visible focus indicator (`focus-visible:ring-1 focus-visible:ring-[#5A9A78]`).
- **Assistive Technology Labels:** External links must include descriptive `aria-label` tags (e.g. `aria-label="Download Aadil Khurshid Resume PDF (opens in new tab)"`).

### 8.2 Security & Privacy Protection
- **No Private Data Leaks:** Personal phone numbers and emails displayed must match canonical public resume data; zero unverified personal contact details or private WhatsApp links.
- **Rel Links:** All external outbound links must enforce `rel="noopener noreferrer"`.
- **Zero Third-Party Trackers:** No invasive client-side recruiter tracking scripts or analytics cookies introduced.

---

## 9. Critical Architectural Boundary — Ask Aadil Protection

In strict adherence to system invariants:
- The Recruiter Quick View (`/recruiter`) will operate as an independent client-rendered page.
- **Zero shared state or imports** between `/recruiter` and `lib/rag/` conversational runtime.
- Ask Aadil's system prompts, model endpoints, intent routers, tools, and voice pipelines will remain 100% untouched.
- Full regression verification (`test_retrieval_foundation.ts` and `test_grounded_conversational_evaluation.ts`) will be executed upon completion.

---

## 10. Proposed Implementation Blueprint (Stage 2)

Upon review and authorization of this investigation, implementation will proceed across the following files:

1. **New Route:** `app/recruiter/page.tsx`
   - Dedicated page assembling identity, capabilities, experience, projects, and resume download.
2. **Dedicated Component:** `components/recruiter/RecruiterQuickView.tsx`
   - Highly polished, modular, accessible component rendering the 5 executive sections.
3. **Data Assembly:** `data/recruiter/recruiterProfile.ts`
   - Typed data module cleanly importing and re-exporting canonical profile, experience, and project entities without duplication.
4. **Header & Hero Integration:**
   - Add a subtle, high-signal "Quick View" pill link in `components/Header.tsx` and a primary CTA in `app/page.tsx`.

---

## 11. Acceptance Criteria & Verification Plan

Stage 2 implementation will be validated against the following gates:
1. **Compilation Health:** `npx tsc --noEmit` exits with 0 errors.
2. **Production Build:** `npm run build` generates 37 static pages cleanly (including `/recruiter`).
3. **Automated Suite:** Dedicated test suite `scripts/test_recruiter_quick_view.ts` verifying all canonical data links, phone/email strings, and project mappings.
4. **Ask Aadil Regression:** 29/29 Ask Aadil regression tests pass with 0 regressions.
5. **Route Smoke Tests:** 20/20 routes pass with HTTP 200, 0 console errors, 0 runtime exceptions.
6. **Multi-Device Proof:** Playwright screenshots captured for desktop (1280x800), tablet (768x1024), and mobile (375x667).

---

## 12. Execution Gate & Recommendation

This read-only investigation is complete. No source code has been altered.

**Recommendation:** Proceed to Stage 2 implementation using **Option 4 (Dedicated Route `/recruiter` with Header & Hero Entry Points)**, featuring the 4 curated AI Systems Engineering projects and canonical resume download.

