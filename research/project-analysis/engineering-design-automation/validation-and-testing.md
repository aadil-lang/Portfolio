# Validation, Testing & Guardrails — Engineering Design Automation

## 1. Automated Test Suite Metrics
- **Test Framework**: `pytest`.
- **Test Volume**: **424 passing automated tests across 28 test suites** located in `src/tests`.
- **Test Scope**:

| Test Suite File | Focus Area & Verified Behaviors |
| :--- | :--- |
| `test_torsion_solver.py` | Analytical torque equations, Saint-Venant assumptions, von Mises conversion |
| `test_bending_solver.py` | Pure bending, section modulus ($Z = \pi d^3 / 32$), maximum bending stress |
| `test_combined_stress_solver.py` | Combined torsion and bending via von Mises equivalent stress $\sigma_v = \sqrt{\sigma^2 + 3\tau^2}$ |
| `test_bolted_joint_solver.py` | Thread tensile stress area, bolt preload, shear across threads, joint clamp force |
| `test_knowledge.py` | Resolution of EN 10025-2, ASTM A29 grades; fail-fast blocking of generic "steel" |
| `test_cad.py` | STEP file export, BRep topology (1 cylindrical face, 2 caps), $0.0000\%$ volume error |
| `test_annotations.py` | Drawing dimension extraction, leader line placement, CAD cross-validation |
| `test_design_specification.py` | Nominal metric series quantization, standard diameter upper/lower bounds |
| `test_semantics.py` | Exact character span provenance extraction from natural language prompts |
| `test_api.py` | REST API endpoint contracts, HTTP status codes, error payload schemas |
| `test_benchmark.py` | Execution latency benchmarks across solver and CAD generation pipelines |

## 2. Mathematical & Physics Assertion Invariants
1. **von Mises Shear Conversion**:
   $$\left| S_{sy} - 0.577350269 \cdot S_y \right| < 10^{-6}$$
2. **Analytical Solid Volume Check**:
   $$\frac{\left| V_{\text{BRep}} - \pi \cdot r^2 \cdot L \right|}{\pi \cdot r^2 \cdot L} < 10^{-6}$$
3. **Cross-Validation Agreement Rate**:
   $$\text{Discrepancies} = 0 \quad (100\% \text{ agreement between 3D model and 2D drawing dimensions})$$
