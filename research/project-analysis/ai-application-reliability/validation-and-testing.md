# Validation, Testing & Guardrails — AI Application Reliability

## 1. Automated Test Suite Metrics
- **Test Framework**: `pytest`, `pytest-asyncio`.
- **Test Volume**: **215+ automated tests across 58 test files** in `backend/tests/`.
- **Key Test Suites**:
  - `test_dogfooding_question_generator.py`: End-to-end integration testing against VM Copy Question Generator.
  - `test_governance_core.py`, `test_governance_e2e_verification.py`: Human authorization gates and role verification.
  - `test_uncertainty_evaluation.py`: Mathematical Fisher covariance matrix calculations and abstention thresholds.
  - `test_mcp_architecture.py`, `test_mcp_tools.py`, `test_mcp_provenance.py`: Full contract compatibility testing for the 10 MCP tools.
  - `test_playwright_runner.py`: Real browser interaction, screenshot capture, and DOM snapshot serialization.
  - `test_slice_8l_engineering_provenance.py`: SHA-256 cryptographic chain verification from genesis.

## 2. In-App Architectural Invariants
1. **Behavioral Contract Invariant**: Assertions evaluating runtime facts (e.g. `$|options| = 4`, single CA) must be deterministic code.
2. **Abstention Invariant**: If diagnostic uncertainty exceeds $\epsilon_{\text{threshold}}$, automated patch generation is strictly blocked.
3. **Authorization Invariant**: No code change can be written or executed without an approved cryptographic authorization token from a verified human role.
4. **Provenance Invariant**: Every event must contain the SHA-256 hash of the preceding event, creating an unbroken tamper-evident ledger.
