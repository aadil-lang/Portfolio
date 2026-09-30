# Cross-Project Evolution: The Journey to AI Engineering

## Executive Architectural Synthesis

The six systems documented in this forensic dossier represent not a collection of disconnected software projects, but a rigorous, accumulative progression from subject-matter educational prompting to full-stack, autonomous, mathematically governed AI systems engineering.

```
                    MATHEMATICS / SME
           (B.Tech in Mechanical Engineering)
                            │
                            ▼
     [01] VM COPY QUESTION GENERATOR
     • Discovery: LLMs cannot enforce structural invariants.
     • Breakthrough: Pure-code Tier-1 Deterministic Evaluation (0ms, $0)
       paired with Adversarial Semantic Blind-Solve.
                            │
                            ▼
     [02] AI WORKSHEETS
     • Challenge: AI image models hallucinate mathematical geometry.
     • Breakthrough: Compiling AI-generated TikZ code via headless TeX Live
       (pdflatex + pdftoppm) and algorithmic 2D crossword grid backtracking.
                            │
                            ▼
     [03] US MATHEMATICS ITEM BANK
     • Challenge: Linear chains cannot balance global multi-variable curriculum distributions.
     • Breakthrough: Stateful cyclic LangGraph state machines with node retry budgets
       and Integer Linear Programming (ILP) Min/Max Swap stratification.
                            │
                            ▼
     [04] CURRICULUM TRANSFORMATION ENGINE
     • Challenge: Hand-coding scrapers for 50 US state curriculum formats is impossible.
     • Breakthrough: Dynamic Schema Derivation from sample CSV contracts, high-throughput
       concurrent extraction, deterministic row guards, and adversarial post-extraction CSV audit.
                            │
                            ▼
     [05] ENGINEERING DESIGN AUTOMATION
     • Culmination: Reconnecting formal Mechanical Engineering degree to AI.
     • Breakthrough: AI strictly restricted to linguistic intent extraction; closed-form
       Saint-Venant torsion solvers, von Mises distortion-energy equations, OpenCascade
       3D BRep CAD modeling, and 330+ automated test cases.
                            │
                            ▼
     [06] AI APPLICATION RELIABILITY
     • The Meta-System: Surrounding AI with autonomous verification & human governance.
     • Breakthrough: Headless Chromium multi-modal ground truth, Fisher information
       covariance uncertainty abstention, Model Context Protocol (MCP) integration, SHA-256 cryptographic
       provenance chain, and dogfooding Project 01 as a live evaluation target.
                            │
                            ▼
                      AI ENGINEERING
```

---

## 1. Evolution of the Core Pattern: Deterministic Authority over Probabilistic Models

Across all six projects, one governing engineering principle matures and deepens:

| Project | What the Probabilistic Component (AI) Does | Where the Deterministic Boundary Is Established | The Verification / Rejection / Correction Mechanism |
| :--- | :--- | :--- | :--- |
| **01 — VM Copy** | Drafts isomorphic math questions and distractors | `lib/eval-layer.ts` (pure TypeScript) | Checks option count ($=4$), checks exactly 1 CA, rejects duplicate distractors, validates step format |
| **02 — AI Worksheets** | Proposes diagram specifications and vocabulary clues | TeX Live compiler & Python backtracking grid solver | `pdflatex` compilation return code; `_can_place` bounding-box collision & intersection math |
| **03 — Math Item Bank** | Generates candidate items across cognitive tiers | Integer Linear Programming (ILP) solver | Min/Max Swap optimization balances curriculum distributions within $\pm 1.5\%$ variance |
| **04 — Curriculum ETL** | Extracts semantic standards from noisy unstructured PDFs | `schemas.py:apply_row_guards` & `csv_audit.py` | Enforces 3-bucket grade levels, wipes reserved blank columns, audits rows against source citations |
| **05 — Design Automation** | Interprets natural-language engineering requirements | Closed-form mechanical equations & OpenCascade kernel | Analytical torque & shear equations ($S_{sy} = 0.57735 \cdot S_y$); standard metric diameter quantization; 0.0000% CAD volume error |
| **06 — AI Reliability** | Proposes diagnostic root causes for web application failures | Deterministic contracts, Fisher covariance, & Human Gate | Evaluates behavioral contracts; abstains if Fisher uncertainty is high; requires cryptographic human sign-off; seals in SHA-256 chain |

---

## 2. Evolution of Output Complexity

The nature of what the system constructs expands from raw text to complete manufacturing and verification systems:

1. **Text & JSON Arrays (`vm-copy`)**: Generates structured multiple-choice questions with answer keys.
2. **Physical Vector & Print Artifacts (`ai-worksheets`)**: Compiles 300-DPI mathematical diagrams, vector crosswords, and paginated classroom-ready PDFs.
3. **Multi-Dimensional Stratified Item Banks (`math-item-bank`)**: Produces thousands of items balanced across Depth of Knowledge (DOK 1-3) and state standard weightages.
4. **Normalized Database Tables (`curriculum-etl`)**: Transforms multi-megabyte unstructured documents into clean, audited relational CSV tables with dynamic schema derivation.
5. **Physical CAD Solids & Manufacturing Blueprints (`engineering-design-automation`)**: Synthesizes ISO-10303-21 STEP BRep solid models, 2D orthographic SVG technical drawings with ASME title blocks, and auditable calculation certificates.
6. **Multi-Modal Verification Traces & Cryptographic Chains (`ai-application-reliability`)**: Produces DOM snapshots, network HAR logs, PNG visual screenshots, and append-only SHA-256 event chains.

---

## 3. The Full-Circle Dogfooding Loop

The ultimate evidence of accumulated engineering mastery is the **dogfooding loop** connecting Project 06 back to Project 01:
- In `ai-application-reliability/backend/tests/test_dogfooding_question_generator.py`, the AI Reliability platform binds directly to the running Next.js server of *VM Copy Question Generator* on port 3000.
- The platform's headless Playwright Chromium runner autonomously drives the VM Copy UI, inputs complex math problems, captures DOM snapshots and screenshots, and asserts that every generated question conforms to the 4-option, single-CA behavioral contract.
- When an edge case occurs, the system computes diagnostic uncertainty, flags the issue for human governance, and logs the verification in an immutable SHA-256 ledger.

This completes the narrative journey: **the AI engineer has built the autonomous platform that tests, diagnoses, and governs the very application with which their journey began.**
