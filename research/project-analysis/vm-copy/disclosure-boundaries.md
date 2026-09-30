# Disclosure Boundaries & IP Protection — VM Copy Question Generator

## 1. Proprietary & Confidential Boundaries
To protect commercial intellectual property, customer data, and security credentials, the following disclosure boundaries MUST be maintained in all public-facing portfolio chapters:

| Item / Domain | Classification | Public Disclosure Rule |
| :--- | :--- | :--- |
| **API Keys & Secrets** (`NARAROUTER_API_KEY`, etc.) | **STRICT SECRET** | NEVER expose in text, code snippets, or configuration samples. Always mask as `process.env.API_KEY`. |
| **Private Router URL** (`router.bynara.id`) | **INTERNAL INFRASTRUCTURE** | Describe conceptually as a "multi-model routing gateway" or "low-latency LLM proxy"; do not link private endpoints. |
| **Client / Employer Identity** | **CONFIDENTIAL IP** | The author worked with commercial assessment platforms (e.g. references to `@quizizz.com`). In public portfolio chapters, refer to the context generically as "a high-volume digital assessment platform" or "curriculum publishing systems". |
| **Proprietary SME Question Rubrics** | **PROPRIETARY IP** | Discuss structural evaluation logic (option cardinality, single CA, distractor error rationale) generically. Do not reproduce proprietary internal item bank databases or non-public test forms. |
| **Prompt Architecture** | **PUBLIC ENGINEERING** | The three-tier architectural approach (Tier 1 Universal Requirements, Tier 2 Domain Rules, Tier 3 Blind Verification) is public technical engineering design and may be described in full architectural depth. |
| **Eval Layer Logic** | **PUBLIC CODE ARTIFACT** | The deterministic validation logic in `lib/eval-layer.ts` is original engineering architecture authored by Aadil Khurshid and can be freely cited with code snippets. |
