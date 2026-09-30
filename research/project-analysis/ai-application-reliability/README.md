# Project 06: AI Application Reliability — Forensic Analysis Dossier

## Repository Metadata
- **Source Repository**: `ai-engineering-lab` (`git@github.com:aadil-lang/ai-engineering-lab.git`)
- **Local Read-Only Clone Path**: `C:\AI-Portfolio-Sources\ai-application-reliability`
- **Primary Author**: Aadil Khurshid (`AI Engineering Lab <engineering-lab@antigravity.ai>`, `aadil-lang`)
- **Release Version**: v1.0.0 (September 2026)
- **Technology Stack**:
  - Python 3.12, FastAPI, Playwright (Headless Chromium), SQLite, Pydantic v2.
  - Multi-Modal Evidence: Full DOM snapshots, PNG screenshots, network HAR traces, console error streams.
  - LLMs & Reasoning: Ollama (local Qwen 2.5), LangChain Core, 10-tool Model Context Protocol (MCP) server.
  - Statistics & Governance: Fisher information covariance matrix for uncertainty quantification & abstention, SHA-256 cryptographic provenance chain, mandatory human-in-the-loop authorization gate.
  - Automated Tests: 215+ automated test cases across 58 test files in `backend/tests`.
- **Dossier Status**: Complete forensic evidence extraction.

## Executive Summary
AI Application Reliability (AI Engineering Lab) represents the apex of the author's technical evolution. It addresses the central failure mode of modern AI software engineering: probabilistic coding agents and stochastic LLM applications hallucinating conclusions, drifting from behavioral contracts, and modifying production systems without deterministic verification or cryptographic audit trails.

The platform executes an autonomous, closed-loop verification cycle:
1. **Autonomous Playwright Execution**: Drives live headless browser sessions across target web applications, collecting multi-modal evidence on disk.
2. **Deterministic Contract Evaluation**: Programmatic assertions enforce structural invariants (4 options, single CA, response codes, schema conformance).
3. **Uncertainty Quantification & Abstention**: Uses Fisher information covariance calculations to measure diagnostic uncertainty. If uncertainty exceeds safe bounds, the agent abstains from remediation and flags human review.
4. **Mandatory Human Governance Gate**: No code changes, PR merges, or production promotions can occur autonomously; all remediation proposals require explicit, role-authorized human approval.
5. **Cryptographic SHA-256 Provenance Chain**: Every action, tool invocation, and decision is linked in an append-only cryptographic ledger back to genesis.

Crucially, the repository dogfoods Project 01 (*VM Copy Question Generator*) as a production test target (`test_dogfooding_question_generator.py`), proving the circular coherence of the entire portfolio journey.

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
