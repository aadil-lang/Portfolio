# Project 03: US Mathematics Item Bank Pipeline — Forensic Analysis Dossier

## Repository Status & Access Discovery
- **Claimed Repository URL**: `https://github.com/aadilkhurshid/math-item-bank-pipeline` (from `data/projects.ts`)
- **Remote Probing Evidence**:
  - `git ls-remote git@github.com:aadil-lang/math-item-bank-pipeline.git` $\rightarrow$ `ERROR: Repository not found`
  - `git ls-remote git@github.com:aadilkhurshid/math-item-bank-pipeline.git` $\rightarrow$ `ERROR: Repository not found`
  - GitHub REST API (`https://api.github.com/users/aadil-lang/repos`) lists 13 repositories, none of which are titled `math-item-bank-pipeline`.
- **Local Filesystem Probing**:
  - Searched `C:\AI-Portfolio-Sources`, `C:\Users\HP\Documents`, and `C:\Users\HP\.gemini\antigravity-ide\scratch`.
  - Found related LangGraph state machines in `QMS` (Pharma Quality Management) and `Atlas-AI` (Financial Assistant).
  - Found math item authoring logic in `vm-copy-question-generator` and `Worksheets-MS-Formal-Gamified`.
  - **No local clone of `math-item-bank-pipeline` containing ILP Min/Max swap solvers was located.**
- **Forensic Status**: **TEAM_PROJECT / SOURCE_UNAVAILABLE**.
  - **Context**: The US Mathematics Item Bank was a company/team project developed at Wayground (Quizizz). The implementation repository is not part of the author's personal source archive because it was maintained within the company's team environment. This is an ownership and source-availability distinction rather than a lack of verified professional experience.

## Executive Summary
In the portfolio's chronological narrative, Project 03 represents the transition from generic text-based question generation to domain-aware mathematical artifact generation and multi-tier evaluation. This work was developed in parallel with the AI Worksheets project at Wayground.

My documented engineering contribution within this company team system focused on:
1. **Mathematical Image Generation & Research**: Researching mathematical image-generation patterns, TikZ-based graphics, SVG-based graphics, and model capabilities across mathematical visual domains.
2. **Domain-Based Representation Routing**: Directing visuals according to mathematical intent (Geometry → SVG; Coordinate Graphs & Number Lines → TikZ) rather than generic image prompting.
3. **Two-Tier Evaluation**: Distinguishing code-level compilation validity (pdflatex exit checks) from visual-level validity (vision checks verifying that rendered images satisfy mathematical prompt specs).
4. **Image-Based Answer Options**: Expanding the assessment correctness pipeline to evaluate generated mathematical artifacts used as answer choices.
5. **Pipeline Stabilization & Expansion**: Stabilizing the Upper Elementary generation pipeline and authoring prompt blueprints for new open-ended question types across Middle School and Upper Elementary for multiple US states.

Because the underlying source repository was developed within a company team environment and is not in the personal source archive, the portfolio strictly describes these documented engineering contributions without asserting private codebase ownership.

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
