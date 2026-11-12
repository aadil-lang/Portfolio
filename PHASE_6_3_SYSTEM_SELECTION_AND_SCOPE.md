# Phase 6.3 — System Selection, Scope Boundaries & Prioritization
**Role:** Principal Systems Architect, Engineering Quality Auditor, and Product Lead  
**Date:** November 2026  
**Repository:** `C:\Users\HP\OneDrive\Documents\Portfolio`  
**Feature:** Phase 6.3 — Interactive Architecture Explorer (Stage 1)  
**Status:** SPECIFICATION ONLY (NOT AUTHORIZED FOR CODE CREATION)

---

## 1. Selection Criteria & Scoring Framework

To select the strongest systems for the Interactive Architecture Explorer, all five candidates were scored against seven rigorous engineering criteria:

1. **Architectural Depth**: Number of genuine architectural layers, state transitions, and component boundaries.
2. **Engineering Differentiation**: Uniqueness of engineering capability (e.g. deterministic gates, uncertainty quantification, mathematical solvers).
3. **Interactive Explainability**: Clarity of end-to-end data flow and educational value to technical recruiters and senior architects.
4. **Evidence Quality**: Density of verified source code, test suites, and empirical benchmarks in the repository.
5. **Visual Potential**: Effectiveness of visualizing data flow, parallel processing, and conditional branching.
6. **Recruiter / Hiring Manager Value**: Impact in demonstrating senior/staff-level software engineering competence.
7. **Duplication Risk**: Avoidance of redundant UI or repeating existing case studies.

---

## 2. Candidate Evaluation & Comparative Scoring

| Candidate System | Depth (1-5) | Differentiation (1-5) | Explainability (1-5) | Evidence (1-5) | Visual Potential (1-5) | Recruiter Value (1-5) | Low Duplication (1-5) | Total Score (out of 35) | Selection Recommendation |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---|
| **Candidate A: Ask Aadil** | 5 | 5 | 5 | 5 | 5 | 5 | 5 | **35 / 35** | **PRIMARY SELECTION #1** |
| **Candidate B: AI Reliability Platform** | 5 | 5 | 5 | 5 | 5 | 5 | 5 | **35 / 35** | **PRIMARY SELECTION #2** |
| **Candidate C: Solace AI** | 5 | 5 | 5 | 5 | 5 | 5 | 5 | **35 / 35** | **PRIMARY SELECTION #3** |
| **Candidate D: Engineering Design Automation (EDA)** | 4 | 5 | 4 | 5 | 4 | 4 | 4 | **30 / 35** | **OPTIONAL 4TH EXPLORER** |
| **Candidate E: RAG Lab** | 3 | 3 | 3 | 5 | 3 | 3 | 1 | **21 / 35** | **REJECTED (Keep Standalone)** |

---

## 3. Recommended Primary Systems

### 3.1 Primary 1: Ask Aadil (`/projects/ask-aadil`)
- **Core Archetype**: Conversational RAG, Stateful Multi-Turn Agent & Governed Tool Pipeline.
- **Why It Must Be Selected**:
  - Live, executable code resides directly inside this repository (`lib/rag/`, `components/AskAadil/`).
  - Demonstrates how to build production conversational AI without hallucinations: deterministic intent routing (<2ms), multi-turn pronoun resolution, hybrid BM25 + Vector retrieval, source authority rules, and explicit human authorization gates for outbound communication.
  - Highest immediate relevance to hiring managers testing the live portfolio assistant.
- **Key Flow to Explore**: User Query -> Deterministic Intent Router -> Pronoun/Entity Resolution -> Hybrid RAG (BM25 + Vector Cosine + RRF) -> Grounded Synthesis & Citation Badging -> Human Action Gate.

### 3.2 Primary 2: AI Application Reliability Platform (`/projects/ai-reliability`)
- **Core Archetype**: Autonomous Browser QA, Multi-Modal Telemetry & Mathematical Governance.
- **Why It Must Be Selected**:
  - Unmatched engineering depth in bridging stochastic AI reasoning with deterministic runtime execution.
  - Real Playwright headless Chromium driving 1,000 synthetic journeys, 4-artifact empirical evidence collection (DOM, PNG, HAR, logs), Ollama Qwen 2.5 diagnostic reasoning, Grounding Validator, Fisher Information Matrix uncertainty quantification forcing `Decision: ABSTAIN`, and an append-only SHA-256 provenance ledger.
  - Demonstrates enterprise-grade agent safety and SRE discipline.
- **Key Flow to Explore**: Target App Failure -> Playwright Multi-Modal Capture -> Local Ollama Diagnostic Inference -> Grounding Validation -> Fisher Uncertainty Gate (Abstain if variance $> \epsilon_{\text{abstain}}$) -> ChangeAuthorization Gate -> SHA-256 Block Chain.

### 3.3 Primary 3: Solace AI (`/projects/solace-ai`)
- **Core Archetype**: Full-Stack Mobile AI (Expo 58 / FastAPI / Supabase RLS) & Safety-Critical Triage.
- **Why It Must Be Selected**:
  - Represents the pinnacle of full-stack AI systems engineering across mobile and backend domains.
  - Demonstrates a synchronous deterministic crisis safety interceptor screening English, Roman Urdu, and Urdu script in $<2\text{ms}$ ahead of all LLM calls; feature-flagged LangGraph StateGraph token streaming via SSE with native Gemini fallback; Supabase PostgreSQL Row Level Security; single-POST transport resilience (ambiguous 502/503/504 containment); and ephemeral in-memory audio zero-retention.
- **Key Flow to Explore**: Mobile Input -> Resilient Transport (Single-POST) -> FastAPI Gateway -> Synchronous Deterministic Crisis Screen (<2ms short-circuit) -> Feature-Flagged LangGraph StateGraph SSE Stream -> Consent-Gated Memory Approval Banner.

---

## 4. Recommended Optional Fourth System: Engineering Design Automation (EDA)

- **Core Archetype**: Hybrid AI Requirement Extraction & Deterministic Mechanical Physics.
- **Why Recommended as Optional Fourth**:
  - Provides unique domain diversity: connects software and AI directly with the candidate's formal mechanical engineering background (B.Tech Hons.).
  - Demonstrates complete exclusion of LLMs from mathematical calculations; closed-form Saint-Venant torsion equations; von Mises shear yield; anti-hallucination material catalog with fail-fast blocking; and OpenCascade 3D BRep solid synthesis verified to $< 10^{-6}$ volume discrepancy across 424 automated pytests.
- **Implementation Role**: Can be included as a specialized fourth explorer if scope permits, or preserved as a featured static deep-dive.

---

## 5. Rejected Candidate & Rationale: Candidate E (RAG Lab)

- **System**: RAG Lab (`/rag-lab`).
- **Score**: 21 / 35.
- **Detailed Rejection Rationale**:
  - **Severe Duplication Risk (Score: 1/5)**: RAG Lab already has an interactive sandbox on route `/rag-lab`! It already features interactive sliders, method selection (BM25 vs Vector vs Hybrid RRF), chunk visualization, and live benchmark execution.
  - Creating an "architecture explorer" for RAG Lab within a generic explorer component would either duplicate the existing `/rag-lab` dashboard or deliver a watered-down duplicate experience.
  - **Decision**: **Keep RAG Lab as a standalone interactive evaluation laboratory at `/rag-lab`.** Do not include it in the multi-project Architecture Explorer.

---

## 6. Implementation Scope Boundaries & Guardrails

When Stage 2 implementation is authorized, the following strict boundaries will apply:

1. **Ask Aadil Protection Boundary**:
   - The Interactive Architecture Explorer must consume static architectural schema definitions.
   - It must **NEVER** import or couple to `lib/rag/` runtime state, conversational memory, or session dispatchers.
2. **RAG Lab Boundary**:
   - No modifications to `lib/rag-lab/`, corpus data, or benchmark suites.
3. **No Heavy External Dependencies**:
   - Zero additions of 3D engines (Three.js), heavy canvas engines, or complex animation packages.
   - Built exclusively with native SVG, React 18, Tailwind CSS, and lightweight Lucide icons.
4. **Data Isolation**:
   - All system architectures, nodes, edges, and inspector metadata must reside in a dedicated static data file: `data/architecture/systemsArchitecture.ts`.
5. **Integration Points**:
   - Standalone dedicated section or tab integrated cleanly into the Systems Archive (`/systems` or Section 02/03 of `app/systems/page.tsx`), with direct deep-dive links from project case studies.

---

## 7. Stage 2 Implementation Priorities

If authorized, Stage 2 implementation should proceed in three distinct phases:

1. **Priority 1: Static Architecture Data Layer**:
   - Construct `data/architecture/types.ts` and `data/architecture/systemsArchitecture.ts` with complete typed definitions for Ask Aadil, AI Reliability Platform, and Solace AI.
2. **Priority 2: Interactive Explorer Component Tree**:
   - Implement `components/architecture/ArchitectureExplorer.tsx` with System Selector tabs, Overview / Flow / Failure mode toggles, SVG topology canvas, and Component Inspector sidebar.
3. **Priority 3: Verification & Multi-Device Testing**:
   - Implement unit test suite `scripts/test_architecture_explorer.ts`.
   - Capture Playwright visual verification screenshots across desktop, tablet, and mobile.
   - Execute full regression matrix confirming zero breakage across Ask Aadil and RAG Lab.

