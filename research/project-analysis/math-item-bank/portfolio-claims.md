# Portfolio Claims vs Implementation Evidence — US Mathematics Item Bank

## Forensic Reconciliation Matrix

| Portfolio Claim / Narrative Point | Implementation Evidence Found | Forensic Classification | Discrepancy & Grounding Notes |
| :--- | :--- | :--- | :--- |
| **"Stateful multi-node LangGraph pipeline generating thousands of items"** | LangGraph orchestration patterns verified in author's `Atlas-AI` and `QMS` repos; math item bank code not found in reached repositories. | **UNVERIFIED IN TARGET DOMAIN** | The repository `math-item-bank-pipeline` is missing from accessible remotes. LangGraph capability is demonstrated in `Atlas-AI`, but math item bank pipeline code is unreachable. |
| **"Integer Linear Programming (ILP) stratifier with Min/Max swap optimization"** | No ILP solver files (`scipy.optimize.milp`, `pulp`, `ortools`) located in reachable repositories. | **UNVERIFIED** | Must be classified as unverified pending repository location. |
| **"Guaranteed standard weightages within ±1.5%"** | No benchmark logs or test scripts verifying this number. | **UNVERIFIED** | Numerical precision claim lacks backing test run data in reachable files. |
| **"Cyclic self-healing recovery loop with node retry budgets (max 3 retries)"** | Node retry budget patterns exist conceptually in `QMS:human_review.py` and state machines. | **SUPPORTED CONCEPTUALLY** | Architectural concept is grounded in author's general agent design patterns, but unverified in math item repo. |
| **"Multimodal Vision LLM validation of math figures"** | Multimodal image analysis implemented in `vm-copy` (`analyzeImageForQuestion`) and `Atlas-AI` (`chart_analysis`). | **SUPPORTED IN SISTER REPOS** | Proves author's hands-on implementation of multimodal LLM auditing, though specific math bank integration is unreached. |
