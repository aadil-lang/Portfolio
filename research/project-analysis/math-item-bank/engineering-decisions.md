# Key Engineering Decisions — US Mathematics Item Bank

## Architectural Rationale (Reconstructed from Portfolio Specifications)

### Decision 01: Stateful Cyclic Graphs Over Linear LLM Chains
- **Context**: Standardized test generation requires items to satisfy multiple orthogonal constraints: grade level, subskill standard, Depth of Knowledge (DOK 1-3), answer exclusivity, and visual diagram accuracy. Linear chains (DAGs) fail completely when any intermediate step is slightly off-target: the entire pipeline must either crash or restart from scratch, wasting tokens and latency.
- **Architectural Solution**: A cyclic state graph with targeted feedback routing. When an item fails visual review or distractor logic, the state machine routes the failure context specifically back to the relevant node (e.g. back to Generator with reviewer feedback) rather than aborting.

### Decision 02: Bounded Retry Budgets to Prevent Infinite Execution Loops
- **Context**: In cyclic agentic graphs, if a prompt constraint is inherently contradictory (e.g., requesting a prime number that is also an even number greater than 2), an unconstrained feedback loop will cycle infinitely, consuming API budgets and hanging workers.
- **Architectural Solution**: Every state machine execution carries a deterministic retry counter (budget $\le 3$). If the budget is exhausted without reaching passing status, the item is quarantined and routed to a human SME review queue.

### Decision 03: Integer Linear Programming (ILP) Stratification
- **Context**: Generating thousands of items at scale leads to natural distribution skew (e.g., models over-generating easy DOK-1 arithmetic items and under-generating complex DOK-3 multi-step word problems). Prompting alone cannot balance a global statistical distribution.
- **Architectural Solution**: Treat item selection as an Integer Linear Programming optimization problem. Use Min/Max Swap logic to iteratively swap candidate items into the active exam forms until global distribution constraints are satisfied within a tight $\pm 1.5\%$ variance window.
