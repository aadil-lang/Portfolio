# ASK AADIL RETRIEVAL AND GROUNDING AUDIT
**Forensic Root-Cause Analysis of Temporal Confusion, Attribution Drift & Grounding Failures in the Portfolio Conversational Agent**

- **Audit Date:** 2026-11-14
- **Auditor Team:** Principal Software Architect, Senior AI/ML Engineer, RAG & Knowledge Architecture Specialist, Forensic AI Auditor
- **Repository Scope:** `C:\Users\HP\OneDrive\Documents\Portfolio`
- **Execution Mode:** READ-ONLY AUDIT (Evidence-Grounded Forensic Assessment)

---

## 1. EXECUTIVE SUMMARY & TARGET FAILURE MODE

This audit investigates the specific failure mode highlighted in Section 13 of the Master Assignment:
**When asked "How did he move from mathematics to AI?", Ask Aadil produces an answer with severe chronological compression and attribution errors:**
1. Backdating the VM Copy project to **Early 2025** (when it was actually built in **October–December 2025**).
2. Placing 2026 AI/ML team systems (AI Worksheets, Item Bank, Curriculum ETL) into **Mid 2025** (when the engineer was actually working as a Mathematics SME doing Figma visuals and K–12 content under 10-day cycles).
3. Placing August 2026 hackathons (Loom AI, Atlas AI) into **Late 2025** and **Early 2026**.
4. Blurring the distinction between the Mathematics SME period (2024–2025) and the formal AI Engineer tenure (2026).
5. Returning coarse source labels (e.g. `[Journal // Ch. 01–03]`, `[Timeline — Chronology]`) rather than verifiable claim-level citations.

---

## 2. ROOT-CAUSE FORENSIC TRACE: THE SMOKING GUNS

Our code forensics identified **three interlocking root causes** that together generate the corrupted output:

### Root Cause 1: Static Hardcoded Narrative Strings in `lib/rag/askAadilAgent.ts`
- **Location:** `lib/rag/askAadilAgent.ts` lines 1708–1720
- **Evidence Code:**
  ```typescript
  // lib/rag/askAadilAgent.ts:
  1711: answer: `Aadil's evolution from mathematics content to AI systems engineering was not an arbitrary pivot—it was a direct consequence of solving increasingly complex friction points where language models broke:
  1712: 
  1713: ${stages}
  1714: 
  1715: **Core Causal Spine:**
  1716: 1. **Mathematical Foundations (2021–2022):** Deconstructed why students make calculation errors and realized mathematical representation is an inseparable part of correctness.
  1717: 2. **Product Environment & Visuals (2024):** Transitioned to Wayground, validating VoyageMath KaTeX rendering and scaling 500+ items with Figma coordinate geometry.
  1718: 3. **From Generation to Evaluation (Early 2025):** Hit the ceiling of prompt engineering. Built VM Copy with in-memory deterministic evaluation (`lib/eval-layer.ts`) because LLMs cannot reliably enforce their own structural constraints.
  1719: 4. **Distributed Pipelines (Mid 2025):** Scaled from single tools to distributed systems (AI Worksheets 2D solvers, Item Bank visual routing, and Celery ETL with 3-tier integrity).
  1720: 5. **Deterministic Engineering & Governed Reliability (2026):** Combined mechanical engineering physics with OpenCascade BRep CAD (0.0000% volume error) and built the browser QA harness with Fisher covariance uncertainty filtering to test and govern AI systems themselves.`
  ```
- **Forensic Diagnosis:** The agent contains a hardcoded fallback block that **explicitly bakes the incorrect dates into lines 1718–1720**. Even if retrieval worked perfectly, this static text block bypasses dynamic evidence synthesis and prints "Early 2025" and "Mid 2025".

---

### Root Cause 2: Hardcoded Stage Definitions in `lib/rag/hybridRetriever.ts`
- **Location:** `lib/rag/hybridRetriever.ts` lines 220–272
- **Evidence Code:**
  ```typescript
  // Stage 3 (Line 228):
  content: `CAREER EVOLUTION — STAGE 3: FROM GENERATION TO EVALUATION (Early 2025)
  • The Problem: Using LLMs for question generation resulted in broken invariants...
  • VM Copy Generator: Built in-house Next.js App Router tool...`

  // Stage 4 (Line 245):
  content: `CAREER EVOLUTION — STAGE 4: DISTRIBUTED PIPELINES & OPTIMIZATION (Mid 2025)
  • AI Worksheets POC: Full-stack FastAPI + React app...
  • US Math Item Bank: Wayground team pipeline...
  • Curriculum Transformation Engine: Asynchronous Map-Reduce ETL pipeline...`

  // Stage 5 (Line 261):
  content: `CAREER EVOLUTION — STAGE 5: DETERMINISTIC ENGINEERING & RELIABILITY (Late 2025 — 2026...)`
  ```
- **Forensic Diagnosis:** When `isCareerProgressionIntent` triggers, `hybridRetriever.ts` manually injects synthetic evidence objects (`evidence-progression-stage-3-evaluation`, `evidence-progression-stage-4-pipelines`, `evidence-progression-stage-5-reliability`) that have the corrupted dates **literally embedded in their content strings**.

---

### Root Cause 3: Corrupted Chapter Dates in `data/canonical/journalChapters.ts`
- **Location:** `data/canonical/journalChapters.ts` lines 180–430
- **Evidence Data:**
  - Chapter 11 (VM Copy): `period: 'Feb 2025'`
  - Chapter 13 (AI Worksheets): `period: 'Apr 2025 — May 2025'`
  - Chapter 14 (Item Bank): `period: 'Jun 2025 — Aug 2025'`
  - Chapter 15 (Curriculum ETL): `period: 'Sep 2025 — Nov 2025'`
  - Chapter 16 (Loom AI): `period: 'Dec 2025'`
  - Chapter 17 (Atlas AI): `period: 'Jan 2026'`
  - Chapter 18 (EDA CAD): `period: 'Feb 2026 — Apr 2026'`
  - Chapter 19 (AI Reliability): `period: 'May 2026 — Jul 2026'`
- **Forensic Diagnosis:** An earlier phase attempted to construct a "monthly progression" by compressing all engineering work into 2025. When `lib/rag/knowledgeIndex.ts:32` ingests `journalChapters`, it pulls these corrupted period fields into the active search index.

---

## 3. PROVENANCE & ATTRIBUTION LEAKAGE
- **Broad Source Labels:** The current synthesizer in `lib/rag/synthesizer/answerSynthesizer.ts:300` returns static generic badges:
  `['[Journal — About]', '[Timeline — Chronology]', '[Resume — Professional Record]']`
- **Remediation Requirement:** Citations must resolve to exact records:
  - `Resume · Professional Experience (Wayground SME 2024–2025)`
  - `Timeline · Milestone 08 (VM Copy Oct–Dec 2025)`
  - `Resume · AI Engineer, AI/ML Team (Jan–Jul 2026)`
  - `Systems Archive · Curriculum Transformation Engine (2026)`
  - `Public Repository · github.com/aadil-lang/vm-copy-question-generator`

---

## 4. ARCHITECTURAL REMEDIATION REQUIREMENTS (DO NOT IMPLEMENT IN AUDIT)
1. **Purge Synthetic Hardcoded Strings:** Delete lines 220–272 in `lib/rag/hybridRetriever.ts` and lines 1715–1720 in `lib/rag/askAadilAgent.ts`.
2. **Normalize `data/canonical/journalChapters.ts`:** Update all period fields to their genuine dates:
   - VM Copy: `Oct 2025 — Dec 2025`
   - AI Worksheets: `Feb 2026 — Apr 2026`
   - Item Bank: `Apr 2026 — Jul 2026`
   - Curriculum ETL: `Feb 2026 — Jun 2026`
   - Loom AI: `Aug 2026`
   - Atlas AI: `Aug 2026`
   - EDA CAD: `Sep 2026`
   - AI Reliability: `Sep 2026`
3. **Dynamic Synthesis from Canonical Sources:** Ensure Ask Aadil constructs answers dynamically by querying `structuredProfile.ts` and `timelineData`, enforcing strict temporal sorting.

