# Phase 6.5 — Interactive Project Comparison
## Architecture Comparison Framework & Evaluation Rubric

**Role:** Principal Software Architect, Senior AI Systems Engineer, Technical Product Architect  
**Repository:** `C:\Users\HP\OneDrive\Documents\Portfolio`  
**Standard:** `engineering-security-reliability` (Level 1 Implementation Standard)  
**Date:** November 2026  
**Status:** Canonical Framework Specification (Stage 1)  

---

## 1. Core Principles & Anti-Inflation Governance

The primary objective of the Interactive Project Comparison feature (`/compare`) is to help technical recruiters, engineering managers, and principal architects understand **engineering judgment across different system contexts**.

In modern technical marketing, project comparisons frequently degenerate into superficial feature checklists or manufactured numerical scores. Under Level 1 of `engineering-security-reliability`, this framework enforces strict governance:

### Mandatory Rules:
1. **Compare Architectural Approaches, Not Vanity Scores**: The dashboard will **never** display subjective or unprovable metrics such as:
   - ❌ *"AI Complexity: 9.2 / 10"*
   - ❌ *"Architecture Maturity: 95%"*
   - ❌ *"Engineering Difficulty: Level 5"*
   - ❌ *"Best Overall Project: Rank #1"*
2. **Every Technical Claim Must Have Source Provenance**: Every architectural difference, failure gate, and trade-off must link directly to verified source code, Phase 6.4 Evidence IDs (`EVID-*`), Phase 6.3 Component IDs (`comp-*`), or Phase 6.1 Decision IDs (`dec-*`).
3. **Explicitly Delineate AI from Deterministic Logic**: Clearly identify where probabilistic LLMs are utilized and where deterministic software engineering is deliberately enforced.
4. **Transparent Ownership & Attribution**: For collaborative and enterprise systems (such as Wayground projects), clearly distinguish the platform's overarching architecture from the user's specific individual engineering contributions.

---

## 2. Ten Structured Comparison Dimensions

The framework defines ten orthogonal engineering dimensions that reveal genuine technical trade-offs across systems:

```
+----------------------------------------------------------------------------------------------------+
|                                TEN ARCHITECTURAL COMPARISON DIMENSIONS                             |
+----------------------------------------------------------------------------------------------------+
| 1. PROBLEM & OBJECTIVE       | Core engineering challenge, target user, and operational scope     |
| 2. ARCHITECTURAL PATTERN     | High-level topological paradigm (e.g. Clean Arch, RAG, DAG, Mobile)|
| 3. AI VS DETERMINISTIC       | Probabilistic generation vs deterministic validation boundaries     |
| 4. DATA & RETRIEVAL          | Schemas, storage engines, retrieval modalities (BM25, Vector, RRF)  |
| 5. ORCHESTRATION & STATE     | Execution flow (LangGraph loops, procedural state machines, queues) |
| 6. FAILURE & CONTAINMENT     | Circuit breakers, timeouts, abstention triggers, fallback paths    |
| 7. EVALUATION & VERIFICATION | Test modalities, golden benchmarks, mathematical proofs, risk gates |
| 8. HITL & GOVERNANCE         | Human approval gates, cryptographic authorization, audit ledgers    |
| 9. CORE TRADE-OFFS           | Explicit architectural sacrifices made (e.g. latency vs cost)      |
| 10. INDIVIDUAL CONTRIBUTION  | Personal engineering ownership vs collaborative platform scope      |
+----------------------------------------------------------------------------------------------------+
```

### Granular Dimension Definitions:

#### Dimension 1: Problem & Primary Objective
- **Focus**: What exact technical bottleneck does this system address? What are its primary inputs and outputs?
- **Evaluation Criteria**: Clarity of system boundary; avoidance of vague problem statements; explicit operational goals.

#### Dimension 2: Architectural Pattern
- **Focus**: What structural paradigm organizes the codebase?
- **Supported Classifications**:
  - `Stateful Conversational RAG Agent` (Ask Aadil)
  - `Synthetic Browser Execution & Diagnostic Pipeline` (AI Reliability)
  - `Mobile Client with Streaming API Backend` (Solace AI)
  - `Deterministic Engineering Calculus & Parametric CAD Pipeline` (EDA)
  - `Controlled Perturbation Benchmarking & Risk Gating Platform` (OCR Evaluator)
  - `Regulatory Financial Multi-Agent RAG Pipeline` (Atlas AI)
  - `Clean Architecture Enterprise Microservice` (Loom AI)
  - `Concurrent Dynamic Pydantic Transformation Engine` (Curriculum ETL)
  - `Pre-Flight Deterministic Evaluation & Batching Engine` (VM Copy)
  - `Subprocess Sandboxing & Algorithmic Solver Engine` (AI Worksheets)
  - `Assessment Item Generation & Domain Routing Pipeline` (US Math Item Bank)

#### Dimension 3: AI versus Deterministic Boundary
- **Focus**: Where is probabilistic AI utilized, and where is deterministic code enforced? Where does AI propose while code verifies? Where are LLMs deliberately excluded?
- **Key Inspection Points**: Pre-flight format validation, post-generation guardrails, mathematical calculations performed in code rather than prompts.

#### Dimension 4: Data Representation & Retrieval
- **Focus**: How is information modeled, persisted, and retrieved?
- **Supported Paradigms**:
  - In-memory canonical knowledge index with hybrid BM25 + subword vector RRF ($k=60$)
  - MongoDB Atlas Vector Search with SEC EDGAR financial filings
  - Supabase PostgreSQL with Row-Level Security (RLS)
  - Dynamic Pydantic schema compilation from arbitrary tabular CSV headers
  - In-memory parametric solid boundary representation (BRep) geometry
  - Synthetic image degradation matrices and OpenCV pixel buffers

#### Dimension 5: Orchestration & State Model
- **Focus**: How are execution steps coordinated?
- **Supported Paradigms**:
  - Multi-agent stateful graph loops with persistent checkpointing (LangGraph)
  - Procedural deterministic state machines with transition validation
  - Concurrent multi-threaded batch workers (`ThreadPoolExecutor`)
  - Asynchronous parallel micro-batching queues
  - Subprocess watchdog execution harnesses with timeout ceiling

#### Dimension 6: Reliability, Fault Handling & Failure Containment
- **Focus**: What mechanisms prevent system failure from propagating to users or downstream databases?
- **Supported Paradigms**:
  - Microsecond compiled regex AST safety circuit breakers (< 2ms)
  - Fisher Information covariance matrix uncertainty determinant gates (`Decision: ABSTAIN`)
  - Idempotent single-POST transport transaction identifiers
  - Subprocess compilation timeouts (15s hard ceiling)
  - CSV formula injection escaping (neutralizing `=`, `+`, `-`, `@`)
  - Critical-field confidence risk gating (PASS / REVIEW / FAIL)

#### Dimension 7: Evaluation & Verification Modality
- **Focus**: How is the system's correctness proven?
- **Evidence Anchor**: Mapped directly to Phase 6.4 master evidence records (`EVID-*`).
- **Supported Modalities**:
  - In-repo unit and integration suites (758 assertions)
  - Upstream dedicated test suites (1,650+ tests)
  - Golden retrieval benchmarks (Precision@K, Recall@K, MRR, nDCG)
  - Mathematical calculus proofs (Saint-Venant vs OpenCascade BRep discrepancy $< 10^{-6}$)
  - 5-axis controlled image perturbation degradation curves

#### Dimension 8: Human-in-the-Loop & Governance
- **Focus**: Where is human authorization mandatory, and how is governance enforced?
- **Supported Paradigms**:
  - Client-side action confirmation contracts
  - Cryptographic HMAC authorization signatures for high-value procurement ($>\$10,000$)
  - Human review escalation queues for low-confidence financial extractions
  - Append-only SHA-256 genesis block provenance audit chains

#### Dimension 9: Core Engineering Trade-offs
- **Focus**: What deliberate technical trade-offs were accepted?
- **Supported Examples**:
  - Pure TypeScript in-memory evaluation vs LLM judge ($<1\text{ms}$ at $\$0$ cost vs deep semantic grading)
  - Client-side subword character n-gram vectors vs 1536-dim neural embeddings (zero latency/cost vs dense semantic capture)
  - Analytical physics + OpenCascade vs commercial FEA simulation (instantaneous parametric generation vs non-linear stress analysis)
  - Compiled regex circuit breaker vs multi-turn LLM classifier (< 2ms deterministic emergency response vs conversational nuance)

#### Dimension 10: Individual Contribution & System Ownership
- **Focus**: What was the engineer's exact role in collaborative systems?
- **Supported Classifications**:
  - `Sole Author & Architect` (Ask Aadil, EDA, AI Reliability, OCR Evaluator)
  - `Full-Stack Architect & Mobile Lead` (Solace AI, Loom AI, Atlas AI)
  - `Individual Component Contributor within Team System` (Wayground projects: Curriculum ETL, VM Copy, AI Worksheets, US Math Item Bank)

---

## 3. Curated Comparison Scenarios (Justified Pairwise Contrasts)

To guide visitors through high-value technical contrasts, the framework defines **seven curated comparison scenarios**:

```
+----------------------------------------------------------------------------------------------------+
|                                    CURATED COMPARISON SCENARIOS                                    |
+----------------------------------------------------------------------------------------------------+
| SCENARIO 1: Ask Aadil  vs  Atlas AI                                                               |
|   Theme: Conversational Portfolio Assistant vs Regulatory Financial Research Copilot               |
|   Contrast: In-memory hybrid RAG + intent routing vs MongoDB Vector RAG + LangGraph multi-agent     |
+----------------------------------------------------------------------------------------------------+
| SCENARIO 2: Ask Aadil  vs  AI Reliability Platform                                                 |
|   Theme: Grounded Conversational Synthesis vs Synthetic Browser Execution & Diagnosis              |
|   Contrast: Epistemic abstention on trivia vs Fisher Information covariance matrix circuit breaker |
+----------------------------------------------------------------------------------------------------+
| SCENARIO 3: AI Reliability Platform  vs  OCR Evaluation Platform                                   |
|   Theme: Multi-Agent UI Stress Diagnosis vs Systematic Controlled Perturbation Benchmarking        |
|   Contrast: Generative agent journey edge-cases vs 5-axis physical optical degradation curves      |
+----------------------------------------------------------------------------------------------------+
| SCENARIO 4: Engineering Design Automation  vs  AI Worksheets                                       |
|   Theme: Deterministic Mechanical CAD Calculus vs Generative Educational Graphic Compilation        |
|   Contrast: Saint-Venant physics + OpenCascade BRep vs Headless TikZ LaTeX subprocess sandbox      |
+----------------------------------------------------------------------------------------------------+
| SCENARIO 5: Curriculum Transformation Engine  vs  VM Copy Question Generator                       |
|   Theme: Batch Map-Reduce Data Transformation vs Sub-Millisecond Pre-Flight Output Gating          |
|   Contrast: Dynamic Pydantic schema synthesis vs Pure TypeScript Set-based distractor rejection     |
+----------------------------------------------------------------------------------------------------+
| SCENARIO 6: Loom AI  vs  Atlas AI                                                                  |
|   Theme: Clean Architecture B2B Workflow vs SEC EDGAR Regulatory Document Analysis                |
|   Contrast: Static AST downward import checks + HITL approval vs LangGraph multi-agent loops       |
+----------------------------------------------------------------------------------------------------+
| SCENARIO 7: Solace AI  vs  Ask Aadil                                                               |
|   Theme: Voice-First Mobile Companion vs Web-Based Grounded RAG Portfolio Agent                    |
|   Contrast: React Native + Whisper + microsecond regex crisis gate vs Next.js hybrid BM25 + Web STT|
+----------------------------------------------------------------------------------------------------+
```

---

## 4. Curated Scenario Rationale & Technical Deep-Dive

### Scenario 1: Ask Aadil vs Atlas AI
- **Why compare?** Both systems implement Retrieval-Augmented Generation (RAG) to ground LLM completions in authoritative documents, but their architectural scale, storage layers, and query models are fundamentally different.
- **Architectural Contrasts**:
  - *Ask Aadil*: Zero external database dependency; executes in-memory hybrid retrieval using BM25 and subword character n-grams; prioritizes sub-50ms latency and 100% negative abstention on unrecorded facts.
  - *Atlas AI*: Enterprise document scale; parses multi-megabyte SEC 10-K/10-Q regulatory tables; stores embeddings in MongoDB Atlas Vector Search; uses stateful LangGraph agent loops to synthesize longitudinal financial disclosures.

### Scenario 2: Ask Aadil vs AI Application Reliability Platform
- **Why compare?** Highlights the difference between an AI system providing *grounded answers to human users* versus an AI system acting as an *evaluator of other software systems*.
- **Architectural Contrasts**:
  - *Ask Aadil*: Interacts with human recruiters; enforces action governance through client-side contract gates; abstains when information is absent from canonical memory.
  - *AI Reliability*: Drives headless Chromium browsers via Playwright; captures DOM snapshots, HAR network traces, and console logs; uses local Ollama instances to diagnose regression root causes; enforces statistical circuit breakers using Fisher Information covariance matrix determinants.

### Scenario 3: AI Application Reliability vs OCR Evaluation Platform
- **Why compare?** Contrasts two distinct approaches to evaluation: *AI-assisted behavioral diagnosis* versus *classical mathematical and statistical benchmarking*.
- **Architectural Contrasts**:
  - *AI Reliability*: Evaluates probabilistic, multi-turn agent journeys; identifies subtle UI drift; classifies regressions into policy, prompt, or code errors using local LLMs.
  - *OCR Evaluator*: Evaluates optical text extraction; applies controlled, deterministic mathematical perturbations (Gaussian blur, affine rotational skew, noise); computes exact Levenshtein CER/WER metrics; enforces priority decision gates (PASS/REVIEW/FAIL).

### Scenario 4: Engineering Design Automation (EDA) vs AI Worksheets
- **Why compare?** Demonstrates how mathematical rigor is maintained across two radically different engineering domains (mechanical solid modeling vs educational diagram generation).
- **Architectural Contrasts**:
  - *EDA*: AI is restricted to natural-language extraction; all geometry and physics are calculated deterministically via Saint-Venant analytical beam formulations and OpenCascade BRep topological mass integrals ($< 10^{-6}$ error).
  - *AI Worksheets*: AI generates complex TikZ geometric code and puzzle narratives; deterministic code compiles the LaTeX in a sandboxed subprocess with strict 15s watchdog limits and caches outputs using MD5 content hashes.

### Scenario 5: Curriculum Transformation Engine vs VM Copy Question Generator
- **Why compare?** Both projects were developed at Wayground to improve educational content pipelines, but one operates as a *batch data pipeline* while the other operates as an *interactive pre-flight guardrail*.
- **Architectural Contrasts**:
  - *Curriculum ETL*: Asynchronous Map-Reduce batch processing; dynamic Pydantic models compiled at runtime from arbitrary CSV headers; sanitizes CSV formula injection; executes a 3-tier review pipeline.
  - *VM Copy*: Real-time interactive generation; pure TypeScript Tier-1 evaluator running in $<1\text{ ms}$ at $\$0$ API cost ahead of any LLM judge; uses Set arithmetic to reject duplicate distractors and enforce exactly 4 options.

### Scenario 6: Loom AI vs Atlas AI
- **Why compare?** Contrasts an *enterprise operational workflow* with a *research and analysis copilot*.
- **Architectural Contrasts**:
  - *Loom AI*: Enforces strict Clean Architecture rules with zero upward imports from domain entities; coordinates B2B procurement with human-in-the-loop cryptographic authorization gates for high-value orders ($>\$10,000$).
  - *Atlas AI*: Coordinates multi-agent financial discovery loops using LangGraph state graphs; synchronizes periodic SEC filings; utilizes SHA-256 section hashes to eliminate duplicate notifications.

### Scenario 7: Solace AI vs Ask Aadil
- **Why compare?** Contrasts two conversational agents with divergent latency, privacy, and safety requirements.
- **Architectural Contrasts**:
  - *Solace AI*: Mobile React Native voice app; Tier-1 microsecond regex circuit breaker (`is_crisis_input`, $<2\text{ms}$) protecting patient safety; single-POST idempotent transport resilience; ephemeral in-memory audio zero-retention.
  - *Ask Aadil*: Browser-based portfolio assistant; multi-turn entity resolution; hybrid BM25 + subword vector search; strict resume and project grounding with deterministic route navigation gates.

---

## 5. Framework Governance & Compliance Sign-Off

This framework establishes a mathematically sound, source-grounded comparison standard. All Stage 2 implementation artifacts must adhere strictly to these 10 dimensions and 7 curated scenarios.

