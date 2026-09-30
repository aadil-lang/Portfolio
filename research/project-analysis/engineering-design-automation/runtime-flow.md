# Runtime Flow & Execution Lifecycle — Engineering Design Automation

## 1. Execution Sequence Diagram

```mermaid
sequenceDiagram
    autonumber
    actor Engineer as Mechanical Engineer
    participant API as FastAPI Application (/api/v1/design)
    participant Semantics as Semantic Requirement Extractor
    participant MatKB as Material Knowledge Base
    participant Solver as ShaftTorsionSolver (Closed-Form)
    participant Sizing as Nominal Sizing Policy
    participant BRep as BRep Solid Modeler (OpenCascade)
    participant Drawing as 2D Drawing Derivation (SVG)
    participant CrossVal as Dimensional Cross-Validator

    Engineer->>API: POST "Design a solid transmission shaft transmitting 7.5 kW at 1200 RPM using AISI 1045 steel, FoS 2.2"
    API->>Semantics: Extract parameters with text span provenance
    Semantics-->>API: { power: 7.5 kW, speed: 1200 RPM, material: "AISI 1045", fos: 2.2 }

    rect rgb(240, 245, 255)
        note over API,MatKB: Phase 2: Deterministic Material Resolution
        API->>MatKB: resolve_material("AISI 1045")
        MatKB-->>API: { Sy: 310 MPa, standard: "ASTM A29", status: "VERIFIED" }
    end

    rect rgb(245, 255, 240)
        note over API,Solver: Phase 3: Closed-Form Mechanical Physics
        API->>Solver: solve_torsion(power=7.5kW, speed=1200RPM, Sy=310MPa, FoS=2.2)
        Solver->>Solver: T = (7500 * 60) / (2 * pi * 1200) = 59.68 N*m
        Solver->>Solver: Ssy = 0.57735 * 310 = 178.98 MPa
        Solver->>Solver: tau_allow = 178.98 / 2.2 = 81.35 MPa
        Solver->>Solver: d_min = (16 * 59.68 / (pi * 81.35e6))^(1/3) = 15.52 mm
        Solver-->>API: CalculationCertificate (d_min=15.52mm, T=59.68N*m)
    end

    rect rgb(255, 250, 235)
        note over API,Sizing: Phase 4: Metric Quantization Policy
        API->>Sizing: select_nominal_diameter(d_min=15.52 mm, series=metric_standard)
        Sizing->>Sizing: Find smallest d in [10, 12, 14, 16, 18, 20...] >= 15.52 mm
        Sizing-->>API: Selected d_nominal = 16.0 mm (achieved FoS = 2.41 >= 2.2)
    end

    rect rgb(255, 245, 240)
        note over API,CrossVal: Phase 5: CAD Synthesis & Dimensional Cross-Validation
        API->>BRep: create_solid_cylinder(diameter=16mm, length=100mm)
        BRep->>BRep: Verify analytical volume: error == 0.0000%
        BRep-->>API: BRepSolidCylinder + STEP file bytes
        API->>Drawing: project_orthographic_views(BRepSolidCylinder)
        Drawing-->>API: 2D SVG Technical Drawing with title block
        API->>CrossVal: cross_validate(BRepSolidCylinder, DrawingViews)
        CrossVal->>CrossVal: Assert drawing dimensions == CAD bounding box (16mm, 100mm)
        CrossVal-->>API: CrossValidationMatrix (100% agreement, 0 discrepancies)
    end

    API-->>Engineer: Engineering Handoff Package (STEP, SVG, JSON Certificate)
```

## 2. Derivation Equations & Invariants
1. **Torque Invariant**:
   $$T = \frac{P}{\omega} = \frac{60 \cdot P}{2 \pi N}$$
2. **von Mises Shear Yield Invariant**:
   $$S_{sy} = \frac{S_y}{\sqrt{3}} \approx 0.577350269 \cdot S_y$$
3. **Allowable Shear Stress**:
   $$\tau_{\text{allow}} = \frac{S_{sy}}{\text{FoS}}$$
4. **Minimum Theoretical Diameter**:
   $$d_{\text{min}} = \sqrt[3]{\frac{16 T}{\pi \tau_{\text{allow}}}}$$
5. **Nominal Quantization Invariant**:
   $$d_{\text{nominal}} = \min \{ d \in \text{StandardSeries} \mid d \ge d_{\text{min}} \}$$
