# Technology Inventory & Dependencies — US Mathematics Item Bank

## 1. Documented Technology Stack (From Portfolio Claims)

| Technology | Claimed Purpose | Evidence in Reached Codebases | Status |
| :--- | :--- | :--- | :--- |
| **LangGraph** | Cyclic state machine orchestration | Used extensively in author's other projects (`QMS`, `Atlas-AI`) | **SUPPORTED IN OTHER REPOS; UNVERIFIED IN MATH BANK** |
| **LangChain Core** | Prompt templates, message typing, schema binding | Used in `Atlas-AI` and `QMS` | **SUPPORTED IN OTHER REPOS** |
| **Python 3.11+ / FastAPI** | Pipeline execution and API exposure | Standard stack across author's Python backend repositories | **VERIFIED PATTERN** |
| **Integer Linear Programming (ILP)** | Curriculum distribution stratification and Min/Max swap optimization | Claimed solver for multi-objective curriculum balancing | **UNVERIFIED: No implementation file found** |
| **Vision LLMs** | Diagram auditing and geometric consistency verification | Multimodal prompts verified in `vm-copy` and `Atlas-AI` | **SUPPORTED CONCEPTUALLY** |
| **MongoDB** | Stateful checkpointing and persistent item storage | Used in `Atlas-AI` with PyMongo | **SUPPORTED IN ATLAS-AI** |

## 2. Missing Repository Inventory
- **Target Repository Name**: `math-item-bank-pipeline` (or internal repository under employer/client org).
- **Missing Code Artifacts**:
  - `graph.py` defining the item generation StateGraph.
  - `nodes/planner.py`, `nodes/generator.py`, `nodes/vision_auditor.py`.
  - `stratifier/ilp_solver.py` implementing the Min/Max Swap algorithm.
