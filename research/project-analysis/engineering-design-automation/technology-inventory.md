# Technology Inventory & Dependencies — Engineering Design Automation

## 1. Runtime Dependencies (Python 3.12)

| Dependency | Purpose | Architectural Rationale |
| :--- | :--- | :--- |
| `fastapi` | Web API & Interactive Review UI | Serves design calculation endpoints and interactive engineering SVG viewer |
| `uvicorn` | ASGI Server | Async request handling |
| `pydantic` (v2) | Schema Enforcement | Strict typing for `DesignSpecification`, `CalculationCertificate`, and `BRepValidationResult` |
| `cadquery` / `ocp` | OpenCascade BRep Kernel | Exact boundary representation modeling and ISO-10303-21 STEP generation |
| `svgwrite` / custom SVG | Vector Drawing Generator | Direct mathematical synthesis of orthographic technical drawings |
| `pytest` | Test Runner | Executes comprehensive test suite |

## 2. Standards & Metallurgical Specifications Enforced
- **EN 10025-2**: European structural steel grades (`S235JR`, `S275JR`, `S355J2`).
- **ASTM A29 / A108 / A240 / B221**: US carbon, alloy, stainless steels and aluminum alloys (`AISI 1018`, `AISI 1045`, `AISI 4140`, `AISI 304`, `6061-T6`).
- **ISO-10303-21**: Industrial STEP product data representation and exchange.
- **ASME Y14.5M / ISO 128**: Engineering drawing projection principles and dimensioning standards.
