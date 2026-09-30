# Validation, Testing & Guardrails — US Mathematics Item Bank

## 1. Forensic Status of Automated Test Suites
- **Repository Availability**: No repository named `math-item-bank-pipeline` was reachable via the authenticated GitHub SSH credentials or local filesystem paths.
- **Verification Result**: **UNVERIFIED**. Test suite counts, test coverage percentages, and offline benchmark assertions cannot be forensically verified without repository access.

## 2. Claimed Architectural Guardrails
According to the project specifications in `chapters.ts` and `projects.ts`:
1. **Schema Contracts**: Pydantic / JSON schema validation enforcing 4 distinct options, 1 verified correct answer, and step-by-step mathematical rationale.
2. **Visual Multimodal Auditing**: Automated inspection of diagrammatic and graphical assets using vision LLMs prior to item commitment.
3. **Integer Linear Programming Stratification**: Global distribution constraints mathematically bounded within $\pm 1.5\%$ variance across state curriculum weightages.
4. **Human-in-the-Loop Escalation**: Dead-letter quarantine routing for items failing automatic recovery budgets after 3 cyclic attempts.
