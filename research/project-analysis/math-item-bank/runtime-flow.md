# Runtime Flow & Execution Lifecycle — US Mathematics Item Bank

## 1. Hypothesized Execution Flow

Based on the architectural specifications documented in the portfolio chapters, the claimed system executes according to the following state graph:

```mermaid
stateDiagram-v2
    [*] --> IngestBlueprint: Standard Blueprint & DOK Specs
    IngestBlueprint --> PlannerNode: Partition into Subskill Tasks
    PlannerNode --> AmplificationNode: Context & Variable Diversification
    AmplificationNode --> GeneratorNode: Draft Mathematical Item
    
    state GeneratorNode {
        [*] --> DraftQuestion
        DraftQuestion --> DraftOptions
        DraftOptions --> DraftSolution
    }

    GeneratorNode --> VisionAuditorNode: If Diagram Present
    GeneratorNode --> ReviewerNode: If Text-Only

    VisionAuditorNode --> ReviewerNode: Diagram Passes Visual Check
    VisionAuditorNode --> GeneratorNode: Diagram Distorted (Retry Budget -1)

    ReviewerNode --> ILPStratifier: Item Mathematically & Structurally Sound
    ReviewerNode --> GeneratorNode: Fails Schema / Distractor Logic (Retry Budget > 0)
    ReviewerNode --> HumanSMEReview: Retry Budget Exhausted (Escalate)

    ILPStratifier --> VerifiedDB: Optimal Standard & DOK Allocation
    HumanSMEReview --> VerifiedDB: Manual SME Approval
    VerifiedDB --> [*]
```

## 2. Theoretical Invariants & Node Contracts
1. **Planner $\rightarrow$ Generator Contract**: Must pass exact subskill ID, target cognitive level (DOK 1, 2, or 3), and numerical constraint envelope.
2. **Cyclic Retry Invariant**: Node retries are bounded by an integer budget (claimed: 3). If a node fails verification 3 times consecutively, the state transitions to an `escalate_to_human` dead-letter queue.
3. **ILP Objective Function**: Minimizes the deviation between observed item counts and target curriculum distribution across standards and difficulty tiers:
   $$\min \sum_{s \in \text{Standards}} |N_s - T_s| + \sum_{d \in \text{DOK}} |N_d - T_d|$$
   Subject to integer item selection constraints.
