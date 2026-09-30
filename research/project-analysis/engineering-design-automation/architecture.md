# Architecture & System Design — Engineering Design Automation

## 1. System Topology & Authority Boundaries

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Probabilistic Input Stage                       │
│  - Natural language design prompt (e.g. "7.5 kW at 1200 RPM...")       │
│  - Extraction Engine (LLM / regex semantics with span provenance)      │
│  - Outputs: Structured Design Parameters with confidence scores        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
    ════════════════════════════════╪════════════════════════════════════
    DETERMINISTIC BOUNDARY: AI NEVER PERFORMS CALCULATIONS OR GEOMETRY
    ════════════════════════════════╪════════════════════════════════════
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   Material Knowledge Base (v1)                         │
│  - Deterministic lookup: S235JR, S355J2, AISI 1018, AISI 1045, etc.    │
│  - Standards metadata: EN 10025-2, ASTM A29/A108, ISO 683              │
│  - Anti-hallucination guard: Generic "steel" strictly blocks as BLOCKED│
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Resolved Yield Strength (Sy)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                 Closed-Form Mechanical Torsion Solver                  │
│  - Torque: T = (P * 60) / (2 * pi * N)                                 │
│  - Distortion Energy Shear Yield: Ssy = 0.57735 * Sy                   │
│  - Allowable Shear: tau_allow = Ssy / FoS                              │
│  - Minimum Theoretical Diameter: d_min = (16 * T / (pi * tau))^(1/3)   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Minimum Theoretical Diameter
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                  Nominal Metric Diameter Sizing Policy                 │
│  - Quantization series: [6, 8, 10, 12, 14, 16, 18, 20, ..., 200 mm]    │
│  - Selects smallest nominal d >= d_min with safety margin check        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Selected Nominal Diameter
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                  Parametric 3D Solid CAD Synthesis                     │
│  - OpenCascade / CadQuery BRep geometric kernel                        │
│  - ISO-10303-21 STEP export with analytical volume verification        │
│    (relative error 0.0000% against theoretical V = pi * r^2 * L)       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                  2D Technical Drawing & Handoff Package                │
│  - Orthographic projection: Front View (X-Y) & End View (Y-Z)          │
│  - Dimension callouts, leader lines, centerlines, title block          │
│  - Automated CAD <-> Drawing Dimensional Cross-Validation Matrix       │
│  - Final JSON Calculation Certificate (auditable derivation tree)     │
└────────────────────────────────────────────────────────────────────────┘
```

## 2. Core Service Modules

| Module | Path | Primary Responsibility | Deterministic Invariant |
| :--- | :--- | :--- | :--- |
| **Mechanical Solver** | `src/solvers/torsion.py` | Closed-form Saint-Venant torsion equations | Implements `MechanicalSolver` interface; emits `CalculationCertificate` |
| **Material Knowledge Base** | `src/knowledge/` | Resolution of metallurgical properties | Generic designations without explicit strength fail fast as `BLOCKED` |
| **Nominal Sizing Policy** | `src/design/nominal_sizing.py` | Maps continuous diameters to standardized ISO/DIN metric stock | Out-of-bounds protection; selects minimal standard stock satisfying design factor |
| **BRep CAD Kernel** | `src/cad/brep.py` | Exact solid topology and boundary evaluations | Volume relative tolerance verified within $10^{-6}$ of theoretical formula |
| **Drawing Engine** | `src/cad/drawing.py`, `exporters.py` | Generates SVG engineering drawings with title blocks | Dimension labels must exactly match 3D solid bounding box |
| **Handoff Generator** | `src/cad/handoff.py` | Packages STEP, SVG, certificates, and compliance matrices | Complete, self-contained manufacturing handoff bundle |
