# Phase 6.2 — Content and Evidence Register
**Role:** Principal AI Systems Engineer, Technical Auditor, and Evidence Custodian  
**Date:** November 2026  
**Repository:** `C:\Users\HP\OneDrive\Documents\Portfolio`  
**Route:** `/recruiter`  
**Component:** `components/recruiter/RecruiterQuickView.tsx`  
**Data Layer:** `data/recruiter/recruiterProfile.ts`

---

## 1. Purpose & Standards

This register documents the evidentiary provenance, qualification boundaries, and canonical ground-truth sources for every factual assertion, metric, benchmark claim, and biographical record presented in the **Recruiter Quick View** experience (`/recruiter`).

In accordance with Level 1 of `engineering-security-reliability`:
1. Every claim is mapped to an authoritative source file in the repository.
2. No promotional hyperbole or unqualified claims are published.
3. Benchmarks are strictly scoped to evaluated test suites.
4. Professional chronology is reconciled against canonical resume data.

---

## 2. Biographical & Career Chronology Evidence

| Entity / Claim | Published Value on `/recruiter` | Canonical Source File & Reference | Evidentiary Ground Truth & Verification |
|:---|:---|:---|:---|
| **Full Legal Name** | Mohemmed Aadil Khurshid | `data/canonical/structuredProfile.ts:3` | Matches government identification and canonical records. |
| **Primary Title** | AI Systems Engineer | `data/canonical/structuredProfile.ts:4`, `data/recruiter/recruiterProfile.ts:67` | Canonical engineering identity established across repository. |
| **Supporting Title** | AI Engineer \| Python \| LLM & Agentic Systems \| Full-Stack | `data/canonical/structuredProfile.ts:5`, `data/recruiter/recruiterProfile.ts:68` | Matches core technical pillars verified in codebase. |
| **Education** | B.Tech (Hons.) Mechanical Engineering (2013–2017) | `data/canonical/resumeData.ts:135-141` | Lovely Professional University, CGPA 7.66 / 10. |
| **Total Experience** | ~4 Years Professional Experience (May 2021 – July 2026) | `data/canonical/resumeData.ts`, `data/recruiter/recruiterProfile.ts:74` | Cumulative verified employment across EdTech and AI domains through July 2026. |
| **AI Engineering Experience** | ~1 Year Dedicated AI Engineering Experience | `data/recruiter/recruiterProfile.ts:75` | January 2026 – July 2026 (Wayground AI/ML team) + August 2026 – Present (Independent Technical Research). |
| **Wayground Tenure** | 2 Years 7 Months continuous (Jan 2024 – Jul 2026) | `data/canonical/resumeData.ts:34-70` | Continuous tenure: Mathematics SME (Jan 2024 – Dec 2025) and AI Engineer (Jan 2026 – Jul 2026). |
| **Independent Period** | August 2026 – Present | `data/canonical/resumeData.ts:12-32` | Classified strictly as *Independent Technical Research & Open-Source Engineering* (not freelance or employment). |
| **Location & Availability** | Varanasi, UP / Open to Remote & Hybrid / Hyderabad | `data/canonical/structuredProfile.ts:8`, `data/recruiter/recruiterProfile.ts:71-72` | Verified canonical availability. |

---

## 3. Core Capabilities & Tooling Provenance

| Capability Area | Published Description & Technologies | Underlying Repository Implementation | Verification Scope |
|:---|:---|:---|:---|
| **Agentic Systems & Orchestration** | Cyclic multi-agent graphs, supervisor-worker topologies, dynamic intent routing, tool governance. *LangGraph, LangChain, State Machines.* | `projects/ai-reliability`, `projects/solace-ai`, `projects/atlas-ai` | Verified via multi-agent state graph implementations and automated tests. |
| **LLM Applications & RAG** | Hybrid BM25 + Vector retrieval, RRF (k=60), token budget allocation, citation grounding. *BM25, Vector Search, Pydantic, Zod.* | `lib/rag/`, `projects/ask-aadil`, `components/rag-lab/` | Verified via 13 retrieval foundation tests and 12 golden evaluation cases. |
| **AI Reliability & Evaluation** | Multi-modal browser testing, Fisher Information uncertainty quantification, deterministic abstention. *Playwright, pytest, Fisher Info.* | `projects/ai-reliability`, `projects/ocr-evaluator`, `scripts/` | Verified via 1,000 synthetic journey tests and uncertainty gates. |
| **Python Backend Engineering** | Asynchronous APIs, multi-threaded document pipelines, SSE streaming. *Python 3.12, FastAPI, Pydantic v2, ThreadPoolExecutor.* | `projects/curriculum-etl`, `projects/math-item-bank`, `projects/atlas-ai` | Verified in FastAPI API routers and concurrent batch processors. |
| **Full-Stack Development** | Responsive web portals and cross-platform mobile companions. *Next.js, React, React Native (Expo), TypeScript, Supabase.* | `components/`, `app/`, `projects/solace-ai`, `projects/vm-copy` | Verified across 37 static Next.js routes and Supabase schema definitions. |
| **Deterministic Systems & Verification** | Closed-form physical and mathematical calculation solvers, headless TikZ compilers. *SymPy, KaTeX, Python AST.* | `projects/design-automation`, `projects/curriculum-etl`, `lib/eval-layer.ts` | 424 automated tests passing with 0.0000% error in closed-form physics. |

---

## 4. Flagship Projects: Outcome Claims & Qualification Register

| Project | Published Claim | Evidence Provenance | Mandatory Qualification & Boundary |
|:---|:---|:---|:---|
| **AI Application Reliability Platform** (`/projects/ai-reliability`) | "1,000 synthetic journeys across 4-agent hierarchy; verified runtime guardrails for non-deterministic web applications." | Project documentation, test execution harnesses | **Qualified Scope:** Evaluated across the platform's automated multi-modal test suite of 1,000 journeys. Does not claim universal bug prevention on arbitrary unmonitored software. |
| **Ask Aadil** (`/projects/ask-aadil`) | "Formally verified across 100+ evaluation questions with deterministic abstention on ungrounded trivia and corporate entities." | `scripts/test_grounded_conversational_evaluation.ts`, `data/canonical/portfolioKnowledge.ts` | **Qualified Scope:** Verified against the 100+ question evaluation harness and canonical corpus. Does not claim zero error on queries outside the evaluated domain. |
| **Solace AI** (`/projects/solace-ai`) | "100% detection rate on 24 critical safety triggers (qualified strictly to evaluated benchmark suite)." | `projects/solace-ai` architecture documentation, safety test suite | **Qualified Scope:** 100% detection rate is strictly bounded to the 24 evaluated adversarial safety prompts. Bounded clinical triage, not clinical certification. |
| **Curriculum Transformation Engine** (`/projects/curriculum-etl`) | "Validated against 1,000+ complex educational assets with automated constraint verification." | `projects/curriculum-etl` implementation records | **Qualified Scope:** Validated across the 1,000+ educational item migration batch. Relies on schema-constrained AST transforms. |

---

## 5. Contact Channels & Privacy Verification

| Channel | Published Value | Privacy Policy & Verification |
|:---|:---|:---|
| **Email** | `aadil.khurshid95@gmail.com` | Public contact channel. Verified against `structuredProfile.email`. |
| **LinkedIn** | `https://linkedin.com/in/aadil-khurshid` | Public profile. Verified against `structuredProfile.linkedinUrl`. |
| **GitHub** | `https://github.com/aadilkhurshid` | Public profile. Verified against `structuredProfile.githubUrls.primary`. |
| **Contact Route** | `/contact` | On-site contact form with rate-limiting and validation. |
| **Resume PDF** | `/resume.pdf` | Direct HTTP 200 static asset delivery (345,581 bytes). |
| **Personal Telephone** | **STRICTLY EXCLUDED** | `+91-7973949541` is stored in internal canonical records only and is **NOT** exposed on `/recruiter` or rendered in client UI. Verified via automated regex scan. |

---

## 6. Audit Sign-Off

All statements, chronology tiers, technical capabilities, and project outcomes published in the Phase 6.2 Recruiter Quick View have been fully cross-referenced against repository source code and verified test suites. Zero unverified promotional statements exist.

