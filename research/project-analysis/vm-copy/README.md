# Project 01: VM Copy Question Generator — Forensic Analysis Dossier

## Repository Metadata
- **Source Repository**: `vm-copy-question-generator` (`git@github.com:aadil-lang/vm-copy-question-generator.git`)
- **Local Read-Only Clone Path**: `C:\AI-Portfolio-Sources\vm-copy`
- **Primary Authors**: Aadil Khurshid (`aadil-lang <aadil.khurshid95@gmail.com>`, `Aadil <aadil@quizizz.com>`)
- **Technology Stack**: Next.js 16.0.7 (App Router), React 19.2.0, TypeScript 5, Tailwind CSS v4, OpenAI SDK, Google Generative AI SDK, NaraRouter API integration.
- **Dossier Status**: Complete forensic evidence extraction.

## Executive Summary
VM Copy Question Generator is a web application designed to generate isomorphic and variant multiple-choice mathematics questions ("copy questions") from base curriculum items. The system ingests a base question, curriculum metadata, difficulty, optional diagram images, and SME (Subject Matter Expert) pedagogical notes, and outputs variants that preserve the exact pedagogical skill and cognitive load while altering numerical values, narrative context, and distractor mechanics.

Crucially, the repository demonstrates the foundational step in the author's engineering evolution: discovering that probabilistic LLMs cannot be trusted with mathematical ground truth or structural test constraints. To solve this, the author engineered a two-tier evaluation and guardrail architecture:
1. **Tier-1 Deterministic Evaluation (`lib/eval-layer.ts`)**: A zero-latency, zero-cost programmatic validator that inspects option count, enforces single-CA (Correct Answer) logic, detects duplicate options, ensures non-empty distractor explanations, checks step-by-step solution structure, and validates SME formatting rules via regular expressions.
2. **Tier-2/3 Adversarial Semantic Blind-Solve (`lib/eval-layer.ts`, `/api/verify`)**: An adversarial auditor that independently solves the mathematical problem from scratch with zero temperature and cross-checks the calculated ground truth against the marked correct option.

## Dossier Index
1. [Architecture & System Design](./architecture.md)
2. [Runtime Flow & Execution Lifecycle](./runtime-flow.md)
3. [Technology Inventory & Dependencies](./technology-inventory.md)
4. [Key Engineering Decisions](./engineering-decisions.md)
5. [Failure Modes & Degradation Analysis](./failure-modes.md)
6. [Validation, Testing & Guardrails](./validation-and-testing.md)
7. [Performance & Operational Profile](./performance-and-operations.md)
8. [Governance, Security & Prompt Discipline](./governance-and-security.md)
9. [Git Evolution & Forensic History](./git-evolution.md)
10. [Engineering Evolution Narrative Position](./engineering-evolution.md)
11. [Portfolio Claims vs Implementation Evidence](./portfolio-claims.md)
12. [Unknowns & Investigation Gaps](./unknowns.md)
13. [Disclosure Boundaries & IP Protection](./disclosure-boundaries.md)
