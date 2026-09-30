# Key Engineering Decisions — AI Application Reliability

## ADR 01: Multi-Modal Ground Truth via Real Headless Chromium
- **Context**: Mock testing and synthetic DOM emulators fail to detect subtle visual clipping, layout overlapping, hydration errors, or timing deadlocks in modern JavaScript frameworks (React 19 / Next.js 16).
- **Decision**: Reject synthetic mocks. Execute full browser automation via Playwright running real headless Chromium sessions. Capture multi-modal artifacts on disk: raw DOM snapshots, full-page PNG screenshots, network HAR traces, and console logs.
- **Consequences**: Provides unassailable empirical ground truth for diagnosis; eliminates phantom test passes caused by inaccurate mock environments.

## ADR 02: Mathematical Uncertainty Quantification & Abstention
- **Context**: LLM diagnostic agents suffer from hallucination and overconfidence: when presented with a novel or noisy failure trace, they invent plausible-sounding but erroneous root causes, applying destructive patches to codebases.
- **Decision**: Implement an uncertainty quantification layer utilizing the empirical Fisher Information Matrix and parameter covariance estimates. When covariance uncertainty exceeds $\epsilon_{\text{abstain}}$, the system strictly forbids autonomous patch generation and forces an abstention verdict (`Decision: ABSTAIN`).
- **Consequences**: Eliminates destructive speculative repairs on ungrounded failures; forces transparent escalation to human engineers.

## ADR 03: Mandatory Human Governance as an Architectural Invariant
- **Context**: Unregulated AI coding agents that automatically modify code, commit to Git, or deploy to production represent an unacceptable operational risk in enterprise environments.
- **Decision**: Mandate a human governance gate as an immovable architectural invariant. The AI agent possesses authority to diagnose and propose remediation, but has ZERO authority to apply code changes or merge pull requests. Every consequential action requires explicit role-based human approval.
- **Consequences**: Guarantees human oversight and accountability for all production code alterations.

## ADR 04: Cryptographic Append-Only Provenance Chain (SHA-256)
- **Context**: Post-incident root-cause analysis is impossible when AI agents alter databases or code without an auditable chronological record.
- **Decision**: Implement a cryptographic event ledger where every event (tool call, evidence artifact, diagnosis, human approval, retest) is hashed using SHA-256 and chained to the preceding event's hash back to genesis (`verify_provenance_chain`).
- **Consequences**: Tamper-evident, mathematically verifiable audit trails for enterprise compliance and post-mortem analysis.

## ADR 05: Dogfooding Project 01 (VM Copy) as Test Target
- **Context**: Reliability platforms must be validated against real, complex production applications rather than synthetic toy benchmarks.
- **Decision**: Dogfood the author's own *VM Copy Question Generator* (`apps/question_generator`, running Next.js on port 3000) as the primary evaluation target (`test_dogfooding_question_generator.py`).
- **Consequences**: Demonstrates full-lifecycle integration: the platform autonomously explores the UI, clicks generate, captures DOM, enforces the 4-option contract, detects duplicate options, and verifies human governance.
