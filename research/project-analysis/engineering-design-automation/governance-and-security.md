# Governance, Security & Prompt Discipline — Engineering Design Automation

## 1. Traceability & Engineering Sign-Off
- **Calculation Certificates**: Every mechanical design output includes an immutable `CalculationCertificate` recording:
  - Solver version and unique solver ID (`py_mech_torsion_v1`)
  - Input parameters with original text span offsets
  - Metallurgical material standard and citation (e.g. ASTM A29 / EN 10025-2)
  - Step-by-step mathematical derivations with intermediate numerical values
  - Status flag: `VERIFIED`, `REJECTED`, or `BLOCKED`.

## 2. Anti-Hallucination Guardrails
- **Zero Hallucination Tolerance**: LLMs are barred from estimating or guessing yield strength, elastic modulus, or torque.
- **Fail-Fast Blocking**: When required parameters are missing or ambiguous (e.g. *"make it strong"*), execution is rejected immediately with a descriptive status payload rather than guessing plausible values.

## 3. Industrial Data Isolation
- Runs locally or inside isolated enterprise containers; no engineering CAD models or proprietary design requirements are sent to external third-party cloud services.
