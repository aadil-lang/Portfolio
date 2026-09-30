# Governance, Security & Prompt Discipline — AI Application Reliability

## 1. Human Governance & Change Authorization Architecture
- **Inviolable Human Gate**: Evaluates four risk levels:
  - `LOW`: Cosmetic or documentation updates.
  - `MEDIUM`: Internal non-critical logic fixes.
  - `HIGH`: API schema or database contract modifications.
  - `CRITICAL`: Security, authentication, or infrastructure alterations.
- All consequential changes (`MEDIUM` and above) strictly halt until an authorized human engineer issues a signed cryptographic approval token.

## 2. MCP Server Security & Tool Permissions
- The 10 MCP tools are bound by strict permission scopes (`READ_ONLY`, `DIAGNOSTIC`, `GOVERNANCE_ADMIN`).
- Destructive tools (`execute_verified_remediation`) verify the presence of an active, unexpired human authorization token in the SQLite governance repository before applying any code diff.

## 3. Cryptographic Provenance (SHA-256)
- Every event records `previous_event_hash`, `timestamp`, `actor_role`, `payload_digest`, and `current_hash`.
- Validated via `verify_provenance_chain` to detect tampering or unauthorized history rewriting.
