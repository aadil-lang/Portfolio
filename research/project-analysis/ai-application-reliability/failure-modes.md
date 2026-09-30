# Failure Modes & Degradation Analysis — AI Application Reliability

## 1. Observed & Hardened Failure Taxonomy

| Failure Mode | Root Cause | Detection Mechanism | System Action & Recovery | Evidence in Tests |
| :--- | :--- | :--- | :--- | :--- |
| **Flaky Browser Timing / Race Condition** | Target React app hydration delay | Playwright dynamic `wait_for_selector` timeouts | Retries action with exponential backoff before failing test | `test_playwright_runner.py` |
| **Diagnostic Hallucination on Noisy Logs** | Confusing stack trace without clear error line | Fisher information covariance matrix exceeds threshold | System triggers `ABSTAIN`; refuses to propose unverified patch | `test_uncertainty_evaluation.py` |
| **Unauthorized Patch Injection Attempt** | Rogue agent tries to invoke patch tool without approval | `ChangeAuthorizationService` checks cryptographic approval token | Rejects invocation with HTTP 403 Forbidden; logs security alert to provenance | `test_governance_core.py` |
| **Broken Provenance Chain** | Tampered or missing intermediate event record | `verify_provenance_chain` verifies SHA-256 links | Halts execution; invalidates campaign run integrity | `test_slice_8l_engineering_provenance.py` |
| **Target Web Server Down (Port 3000)** | Next.js server crashes during campaign | Playwright HTTP connection refused | Flags target as unreachable; preserves error log in SQLite repo | `test_dogfooding_question_generator.py` |
| **Cold Start RAG Memory Drift** | Empty historical database on initial deployment | `test_cold_start_evaluation.py` fallback heuristics | Relies solely on current DOM ground truth; builds memory incrementally | `test_cold_start_evaluation.py` |

## 2. Recovery Philosophy: Bounded Autonomy and Safe Abstention
The platform embodies the principle that **abstaining from action is infinitely superior to executing an incorrect action**. When uncertainty is high or governance tokens are absent, the system gracefully halts, records its reasons, and defers to human authority.
