# Key Engineering Decisions — Engineering Design Automation

## ADR 01: Complete Exclusion of LLMs from Physics and Math
- **Context**: LLMs cannot be trusted with numerical precision, unit conversions, or physical laws. Prompting an LLM to calculate shaft diameter or torsional shear stress invariably produces inaccurate results, rounded constants, or unphysical values that would cause mechanical failure in production machinery.
- **Decision**: Architect an impenetrable boundary: LLMs are strictly restricted to natural-language requirement extraction (with exact character span offsets). All physical calculations are executed by deterministic Python classes (`ShaftTorsionSolver`) implementing textbook closed-form equations.
- **Consequences**: 100% mathematically verifiable calculations; zero probability of arithmetic hallucination.

## ADR 02: Anti-Hallucination Material Knowledge Base & Fail-Fast Blocking
- **Context**: Users frequently submit vague engineering prompts such as *"Design a steel shaft"*. An LLM will invent a yield strength (e.g. hallucinating 250 MPa or 400 MPa), obscuring safety margins.
- **Decision**: The Material Knowledge Base strictly halts on generic terms: submitting `"steel"` without an exact grade (`AISI 1045`, `S355J2`) returns status `BLOCKED` with an explicit request for specification. Explicit user numerical overrides are supported but tracked with audit provenance (`"Explicit override"`).
- **Consequences**: Eliminates dangerous metallurgical assumptions in safety-critical mechanical design.

## ADR 03: Discrete Nominal Sizing Policy vs Continuous Dimensions
- **Context**: A mechanical solver calculates an exact continuous theoretical diameter (e.g., $d_{\text{min}} = 15.523\text{ mm}$). Manufacturing a shaft to $15.523\text{ mm}$ requires expensive custom machining.
- **Decision**: Introduce a discrete nominal sizing policy that quantizes the theoretical result to standard ISO metric stock bar sizes (`[10, 12, 14, 16, 18, 20, 22, 25, 28, 30...]`), verifying that the rounded standard dimension achieves an actual factor of safety $\ge \text{target FoS}$.
- **Consequences**: Output designs are immediately manufacturable using off-the-shelf industrial bar stock.

## ADR 04: CAD <-> Drawing Dimensional Cross-Validation
- **Context**: In traditional CAD drafting, human error or software glitches can lead to drawing annotations that diverge from the underlying 3D model geometry.
- **Decision**: Implement an automated cross-validation engine that interrogates both the 3D OpenCascade BRep solid cylinder and the 2D orthographic SVG drawing dimensions, asserting a 100% agreement matrix before releasing the engineering handoff package.
- **Consequences**: Guarantees zero discrepancy between 3D solid geometry and 2D manufacturing drawings.
