# Phase J.1 — Engineering Journal Targeted Remediation
## Stage 1 Content & Provenance Report

**Role:** Technical Content Architect, Senior AI Systems Engineer, Verification Auditor  
**Repository:** `C:\Users\HP\OneDrive\Documents\Portfolio`  
**Feature:** Engineering Journal (`/journal`)  
**Standard:** `/engineering-security-reliability` (Level 1 Implementation Standard)  
**Date:** November 2026  
**Status:** Complete, Verified & Reconciled  

---

## 1. Executive Summary

This report establishes the complete content and provenance audit for the Engineering Journal following the completion of Phase J.1. The Engineering Journal serves a distinct epistemic role in the portfolio's three-tier model:
- **Timeline (`/timeline`, `/experience`):** *When* things happened (chronological progression).
- **Engineering Journal (`/journal`):** *Why* decisions were made, what broke, and what each system taught the engineer.
- **Systems & Case Studies (`/projects/[slug]`, `/architecture`, `/verification`, `/compare`):** *What* was built, how it works, and the empirical evidence verifying it.

Through Phase J.1, all 11 portfolio case studies have been brought into complete alignment across the Journal, the canonical chapter registry (`data/canonical/journalChapters.ts`), the RAG knowledge index (`lib/rag/knowledgeIndex.ts`), and the Systems Catalog.

---

## 2. 19-Spread & 38-Folio Content Architecture

| Spread Index | Pages | Chapter Number | Chapter Title & System Focus | Journey Stage / Subtitle | Ownership Attribution |
| :---: | :---: | :---: | :--- | :--- | :--- |
| **00** | 001–002 | `OPENING` | Curiosity Comes First & Table of Contents | Prologue & Complete Index | Foundational Conviction |
| **01** | 003–004 | `01 & 02` | Domain & Representation (Graveiens / InhaltMart) | Content Foundations (2021–2022) | Professional Employment |
| **02** | 005–006 | `03 & 04` | Validation & Discipline (Digiplus / Independent 2023) | Distractor Rigor & Algorithms | Professional & Independent |
| **03** | 007–008 | `05 & 06` | Product Environment & Systems (Wayground / VoyageMath) | SME Entry & Invariants (2024) | Professional Employment |
| **04** | 009–010 | `07 & 08` | Visuals & Workflow Thinking (Figma / Content Builder) | Coordinate Geometry & Tooling | Professional & Independent |
| **05** | 011–012 | `09 & 10` | AI in Workflow & Creation (Prompt Limits) | Human-in-the-Loop AI Exploration | Professional & Internal |
| **06** | 013–014 | `11 & 12` | From Generation to Evaluation (**VM Copy**) | Tier-1 Deterministic Evaluator | Wayground · Independent Build |
| **07** | 015–016 | `13` | When AI Became an Application (**AI Worksheets**) | Product POC & Backtracking Solvers | Wayground · Independent Build |
| **08** | 017–018 | `14` | From Applications to Pipelines (**US Item Bank**) | Distribution & Pipeline Engineering | Wayground · Team System |
| **09** | 019–020 | `15` | Transformation Pipelines (**Curriculum ETL**) | 3-Tier Schema Integrity Engine | Wayground · Independent Build |
| **10** | 021–022 | `16` | From Using AI to Building AI (**Loom AI**) | Clean Architecture & Multi-Agent HITL | Independent · Hackathon Build |
| **11** | 023–024 | `17` | Stateful Workflows + Retrieval + Tools (**Atlas AI**) | Financial Copilot SEC Filing RAG | Independent · Hackathon Build |
| **12** | 025–026 | `18` | AI Meets Deterministic Engineering (**EDA CAD**) | OpenCascade STEP 3D Geometry | Independent · Personal Build |
| **13** | 027–028 | `19` | The Reliability Question (**AI Reliability**) | Browser QA & Uncertainty Abstention | Independent · Personal Build |
| **14** | 029–030 | `20` | Controlled Degradation & Robustness (**OCR Evaluator**) | Multi-Tier Document Accuracy & Perturbation | Independent · Personal Build |
| **15** | 031–032 | `21` | This Portfolio & Ask Aadil (**Ask Aadil**) | Source-Aware Hybrid RAG & HITL Actions | Independent · Personal Build |
| **16** | 033–034 | `22` | Safety-First Mobile Companions (**Solace AI**) | Deterministic Safety & Consent Memory | Independent · Hackathon Build |
| **17** | 035–036 | `SYNTHESIS` | Still Building. Still Exploring. | The Open Horizon (Aug 2026 — Present) | Independent · Research |
| **18** | 037–038 | `EPILOGUE` | Systems Catalog & Archive | 11 Systems & Verified Evidence Registry | Complete Portfolio Archive |

---

## 3. Deep Dive: Chapter 20 (OCR Evaluator) Provenance

### Verso Page 29: Controlled Degradation Matrix
- **Engineering Motivation:** High-volume OCR workflows in legal deed auditing, land record cadastral surveys, and enterprise billing suffer from silent catastrophic failures when evaluated solely on aggregate Character Error Rate (CER) or Word Error Rate (WER).
- **Core Narrative:** Standard OCR benchmarks evaluate models on clean, upright scans. In reality, documents suffer from physical scanner noise, skew, poor lighting, and optical blur.
- **Architectural Implementation:**
  - 5-axis synthetic degradation engine using OpenCV:
    1. *Gaussian Blur:* Simulates focal defocus ($\sigma \in [0.5, 3.5]$).
    2. *Affine Skew:* Simulates document feeding misalignment ($-15^\circ$ to $+15^\circ$).
    3. *Salt-and-Pepper Noise:* Simulates speckle and photocopy dust ($\text{density} \in [0.01, 0.08]$).
    4. *Contrast Attenuation:* Simulates thermal paper fading and faded ink ribbon.
    5. *JPEG Compression Artifacts:* Simulates multi-pass lossy compression ($Q \in [20, 85]$).
  - Levenshtein dynamic programming alignment matrix deriving normalized character and token distance vectors.
- **Provenance Citation:** Verified against repository source `research/project-analysis/ocr-evaluator/`, `data/canonical/projectsMetadata.ts`, and test suite `pytest tests/test_robustness.py`.

### Recto Page 30: Critical-Field Priority Decision Gate
- **Engineering Breakthrough (ADR-OCR-01):** Decoupling statistical aggregate accuracy from entity-level operational safety. An extraction can achieve 99.2% overall character accuracy but must fail deployment if a single legal entity (Survey Number, Title Deed ID, Tax Registration, or Currency Amount) contains an error.
- **Decision Invariant:**
  - `PASS`: Aggregate CER $\le 1.5\%$, WER $\le 3.0\%$, Critical-Field CER $= 0.0\%$.
  - `REVIEW`: Critical-Field CER $= 0.0\%$, but optical degradation or marginal confidence flags review.
  - `FAIL`: Any mutation or ambiguity in a designated Critical Field triggers immediate deployment abort and ERP quarantine webhook dispatch.
- **Evidence Provenance:**
  - 134 backend pytests across 22 test files (`tests/test_adversarial_evaluation.py`, `tests/test_critical_fields.py`, `tests/test_evaluator.py`, `tests/test_extractor.py`, `tests/test_faithfulness.py`, `tests/test_metrics.py`, `tests/test_risk.py`, `tests/test_robustness.py`, `tests/test_api.py`).
  - 20 browser UI evaluation assertions passing with 0 frontend JavaScript errors.

---

## 4. Reconciled Technical Claims (J7)

Prior to Phase J.1, speculative claims describing Loom AI and VM Copy as using "Next.js 16 (App Router), React 19" existed across `data/journalSpreads.tsx:1097`, `data/canonical/journalChapters.ts:248, 349, 353`, and `data/chapters.ts:32, 80`.

### Reconciliation Actions Taken
1. **Loom AI (Spread 10, Page 22):**
   - *Previous:* `Next.js 16 (App Router), React 19, Tailwind CSS`
   - *Reconciled:* `Next.js (App Router), React, Tailwind CSS`
2. **VM Copy (Spread 06, Page 14):**
   - *Previous:* `Next.js 16 / React 19`
   - *Reconciled:* `Next.js App Router / React / TypeScript`
3. **Canonical Chapter Registry (`data/canonical/journalChapters.ts`):**
   - Lines 247–248 and 349, 353 updated to reference `Next.js App Router`, `React`, `TypeScript`.
4. **Chapter Content (`data/chapters.ts`):**
   - Lines 32, 34, and 80 updated to reference `Next.js App Router` and `React`.

All references to version numbers now strictly match verified repository evidence.

---

## 5. Cross-Feature Contextual Linking Matrix (J8)

Every system spread in the Journal now provides one-click navigation across the portfolio's specialized engineering views:

| System | Architecture Node | Decision Record (ADR) | Evidence Registry | Comparative Matrix |
| :--- | :--- | :--- | :--- | :--- |
| **VM Copy** | `/architecture?system=vm-copy` | `/projects/vm-copy#decisions` | `/verification#evid-evid-vm-01` | `/compare?projects=vm-copy,ai-worksheets` |
| **AI Worksheets** | `/architecture?system=ai-worksheets` | `/projects/ai-worksheets#decisions` | `/verification#evid-evid-ws-01` | `/compare?projects=ai-worksheets,curriculum-etl` |
| **Item Bank** | `/architecture?system=math-item-bank` | `/projects/math-item-bank#decisions` | `/verification#evid-evid-ib-01` | `/compare?projects=math-item-bank,curriculum-etl` |
| **Curriculum ETL** | `/architecture?system=curriculum-etl` | `/projects/curriculum-etl#decisions` | `/verification#evid-evid-etl-01` | `/compare?projects=curriculum-etl,vm-copy` |
| **Loom AI** | `/architecture?system=loom-ai` | `/projects/loom-ai#decisions` | `/verification#evid-evid-loom-01` | `/compare?projects=loom-ai,atlas-ai` |
| **Atlas AI** | `/architecture?system=atlas-ai` | `/projects/atlas-ai#decisions` | `/verification#evid-evid-atlas-01` | `/compare?projects=atlas-ai,solace-ai` |
| **EDA CAD** | `/architecture?system=design-automation` | `/projects/design-automation#decisions` | `/verification#evid-evid-eda-01` | `/compare?projects=design-automation,ai-reliability` |
| **AI Reliability** | `/architecture?system=ai-reliability` | `/projects/ai-reliability#decisions` | `/verification#evid-evid-rel-01` | `/compare?projects=ai-reliability,ocr-evaluator` |
| **OCR Evaluator** | `/architecture?system=ocr-evaluator` | `/projects/ocr-evaluator#decisions` | `/verification#evid-evid-ocr-01` | `/compare?projects=ocr-evaluator,ai-reliability` |
| **Ask Aadil** | `/architecture?system=ask-aadil` | `/projects/ask-aadil#decisions` | `/verification#evid-evid-aadil-01` | `/compare?projects=ask-aadil,solace-ai` |
| **Solace AI** | `/architecture?system=solace-ai` | `/projects/solace-ai#decisions` | `/verification#evid-evid-sol-01` | `/compare?projects=solace-ai,atlas-ai` |

---

## 6. Synthesis & Epilogue Reconciliation

### Spread 17: Synthesis (`SYNTHESIS`)
- **Correction:** Reconciled from `chapterNumber: '10'` to `chapterNumber: 'SYNTHESIS'`.
- **Pages:** 35 & 36.
- **Narrative Content:** Honors Aadil's post-Wayground trajectory (August 2026 — Present), detailing the 7 independent projects (Loom AI, Atlas AI, OCR Evaluator, EDA CAD, AI Reliability, Ask Aadil & Portfolio, Solace AI) and establishing the open ending: *Curiosity → Learning → Contribution → Building → Discovery → Repeat*.

### Spread 18: Epilogue (`EPILOGUE`)
- **Pages:** 37 & 38.
- **Left Page (Systems Catalog):** Categorized by:
  - *Professional Engineering · Wayground:* VM Copy, AI Worksheets, Curriculum ETL, US Math Item Bank.
  - *Independent Engineering · Personal Builds:* OCR Evaluation Platform (134 Pytests), EDA CAD (424 Tests), AI Application Reliability (158+ Tests), Portfolio & Ask Aadil (172 Tests).
  - *Independent Engineering · Hackathon Builds:* Solace AI (102 Checks), Loom AI (Playwright E2E), Atlas AI (178 Tests).
- **Right Page (Evidence Registry):** Summarizes verified quantitative proof points across all systems, including OCR Robustness Platform.

