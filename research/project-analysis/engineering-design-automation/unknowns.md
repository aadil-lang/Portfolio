# Unknowns & Investigation Gaps — Engineering Design Automation

## 1. Unresolved Technical Questions & Missing Artifacts

1. **FEA Finite Element Analysis Extensions**:
   - The current repository focuses on closed-form analytical solvers (`ShaftTorsionSolver`, bending, bolted joints) and OpenCascade BRep solid geometry. Finite element mesh generation (e.g. Gmsh/CalculiX integration) is listed as future roadmap.
   - *Impact*: Clarify in portfolio prose that the current verified vertical slice implements closed-form analytical mechanical sizing rather than full continuous-domain FEA simulation.

2. **Multi-Component Assembly Support**:
   - The current BRep CAD engine constructs single transmission shaft components and bolted joints rather than complex multi-body gear train assemblies.
