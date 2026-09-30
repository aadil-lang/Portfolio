# Failure Modes & Degradation Analysis — Engineering Design Automation

## 1. Observed & Hardened Failure Taxonomy

| Failure Mode | Root Cause | Detection Mechanism | System Action & Recovery | Evidence in Tests |
| :--- | :--- | :--- | :--- | :--- |
| **Ambiguous / Generic Material Designation** | Prompt says "steel" or "aluminum" without exact grade | `MaterialKnowledgeBase` lookup fails | Status transitions to `BLOCKED`; rejects calculation until user supplies grade or override | `test_knowledge.py:test_generic_material_blocked` |
| **Negative / Unphysical Input Values** | User specifies negative power, speed, or length | Input validation guards in `solvers/validation.py` | Raises descriptive `ValueError`; halts before solver execution | `test_solvers.py:test_negative_inputs_rejected` |
| **Zero Rotational Speed (Infinite Torque)** | Input RPM = 0 | `validate_positive(speed)` check | Raises `ZeroDivisionError` prevention check; returns invalid parameter status | `test_torsion_solver.py` |
| **Out-of-Bounds Diameter Request** | Required diameter exceeds maximum available stock bar (200 mm) | `NominalDiameterPolicy` upper bound check | Flags out-of-bounds error; recommends redesign or hollow shaft geometry | `test_design_specification.py` |
| **Topological BRep Inconsistency** | Degenerate face or edge during CAD cylinder construction | `BRepValidationResult` boundary check | Asserts exactly 1 cylindrical face, 2 planar cap faces, 2 circular edges | `test_cad.py:test_brep_topology` |
| **CAD-Drawing Dimensional Discrepancy** | Drawing annotation differs from 3D CAD model dimension | `cross_validate()` matrix check | Flags discrepancy; marks handoff package as `UNVERIFIED` | `test_annotations.py` |
| **Analytical Volume Divergence** | BRep CAD volume differs from theoretical $V = \pi r^2 L$ | Relative tolerance check: $\frac{\|V_{\text{cad}} - V_{\text{theo}}\|}{V_{\text{theo}}} \le 10^{-6}$ | Passes with $0.0000\%$ error assertion | `test_cad.py:test_volume_analytical_match` |

## 2. Recovery Philosophy: Fail Fast and Explicitly
In mechanical engineering, a silent fallback or hallucinated estimate can lead to catastrophic physical equipment failure. Therefore, the system adheres to a strict fail-fast policy: when data is ambiguous, incomplete, or physically invalid, execution strictly halts with an auditable error code.
