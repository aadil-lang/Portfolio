# Technology Inventory & Dependencies — AI Application Reliability

## 1. Core Runtime Stack (Python 3.12)

| Dependency | Purpose | Architectural Justification |
| :--- | :--- | :--- |
| `fastapi` | Control Plane & REST API | Serves campaign endpoints, telemetry, and live execution streams |
| `uvicorn` | ASGI Web Server | Production async web server |
| `pydantic` (v2) | Schema Integrity | Validates governance requests, test payloads, and evidence models |
| `playwright` | Real Browser Automation | Headless Chromium execution capturing real DOM, network HAR, and screenshots |
| `sqlite3` | Local Storage & Provenance | Self-contained, zero-dependency persistence for memory and SHA-256 chains |
| `ollama` / local API | Local LLM Runner | Local inference of Qwen 2.5 / deepseek models without external cloud dependencies |
| `numpy` / `scipy` | Mathematical Computations | Fisher information covariance calculations and uncertainty thresholding |
| `mcp` SDK | Model Context Protocol | Exposes 10 deterministic tools to Antigravity and external agent orchestrators |

## 2. The 10-Tool MCP Server Interface
The platform implements an official Model Context Protocol (MCP) server providing 10 bounded, audited tools:
1. `run_test_campaign`: Launches automated Playwright test execution against a target.
2. `get_execution_status`: Checks progress and telemetry of an active campaign run.
3. `inspect_evidence_package`: Retrieves multi-modal DOM, screenshot, and console artifacts on disk.
4. `evaluate_behavioral_contract`: Runs deterministic assertions against observed facts.
5. `diagnose_failure_root_cause`: Prompts local LLM with evidence and hybrid RAG memory.
6. `estimate_diagnostic_uncertainty`: Calculates Fisher covariance metric to trigger abstention.
7. `submit_governance_approval_request`: Posts remediation package to human governance gate.
8. `check_authorization_status`: Verifies whether human lead has cryptographically approved fix.
9. `execute_verified_remediation`: Applies authorized patch to target codebase.
10. `verify_provenance_chain`: Validates cryptographic SHA-256 hash sequence from genesis.
