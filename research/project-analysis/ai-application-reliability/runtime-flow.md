# Runtime Flow & Execution Lifecycle — AI Application Reliability

## 1. End-to-End Verification & Remediation Lifecycle

```mermaid
sequenceDiagram
    autonumber
    actor Dev as Developer / Engineer
    participant Lab as Reliability Control Plane
    participant Playwright as Playwright Browser Engine
    participant Eval as Deterministic Evaluator
    participant Reasoner as Local LLM Diagnosis (Ollama)
    participant Uncert as Uncertainty Engine (Fisher Info)
    participant Gov as Human Governance Gate
    participant Prov as SHA-256 Provenance Chain

    Dev->>Lab: Launch Verification Campaign (Target: Port 3000)
    Lab->>Playwright: Launch Headless Chromium Session
    Playwright->>Playwright: Navigate, Click, Fill Form, Await Response
    Playwright->>Playwright: Capture DOM snapshot, PNG screenshot, HAR log
    Playwright-->>Lab: Multi-Modal Evidence Artifacts

    Lab->>Eval: evaluate_contract(DOM, API_response)
    alt Contract Invariants Satisfied
        Eval-->>Lab: Status: PASSED
        Lab->>Prov: Append SHA-256 Provenance Event
        Lab-->>Dev: Campaign Passed
    else Contract Violated (e.g. 5 options or missing CA)
        Eval-->>Lab: Status: FAILED (Issue: "Multiple options marked CA")
        Lab->>Reasoner: Diagnose Root Cause(Evidence, DOM, Console)
        Reasoner-->>Lab: Diagnostic Hypothesis + Remediation Proposal
        
        Lab->>Uncert: compute_uncertainty(Diagnosis)
        alt Covariance Uncertainty > Threshold
            Uncert-->>Lab: Decision: ABSTAIN (Uncertainty High)
            Lab->>Gov: Flag Item for Human Investigation
            Lab-->>Dev: Execution Halted: High Uncertainty
        else Covariance Uncertainty <= Threshold
            Uncert-->>Lab: Decision: PROCEED TO GOVERNANCE
            Lab->>Gov: Submit Approval Request + Evidence Package
            Gov-->>Dev: Render Authorization Request in UI
            Dev->>Gov: Human Approval Granted (Role: Lead Engineer)
            Gov->>Lab: Authorized Patch Application
            Lab->>Playwright: Re-run Independent Verification
            Playwright-->>Lab: Verification PASSED
            Lab->>Prov: Seal Campaign in SHA-256 Provenance Chain
            Lab-->>Dev: Remediation Sealed & Verified
        end
    end
```

## 2. Mathematical Fisher Information Uncertainty Formulation
The uncertainty engine models parameter confidence using the empirical Fisher Information Matrix $\mathcal{I}(\theta)$:
$$\mathcal{I}(\theta) = \mathbb{E}\left[ \nabla_\theta \log p(x \mid \theta) \nabla_\theta \log p(x \mid \theta)^T \right]$$
The covariance of the parameter estimates satisfies the Cramér-Rao lower bound:
$$\operatorname{Cov}(\hat{\theta}) \ge \mathcal{I}(\theta)^{-1}$$
When the trace or maximum eigenvalue of the estimated covariance matrix exceeds the configured threshold $\epsilon_{\text{abstain}}$, the diagnostic engine treats the model output as ungrounded and strictly abstains from recommending automated patches.
