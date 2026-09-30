# Runtime Flow & Execution Lifecycle — AI Worksheets

## 1. Formal Worksheet & TikZ Rendering Sequence

```mermaid
sequenceDiagram
    autonumber
    actor Teacher as Teacher / Educator
    participant UI as React Client (Vite 6)
    participant API as FastAPI Backend
    participant LLM as Portkey / GPT-4o
    participant TikZ_AI as Gemini 2.0/3 Flash
    participant Subprocess as pdflatex + pdftoppm
    participant S3 as MinIO / Cloudflare R2
    participant Weasy as WeasyPrint Engine

    Teacher->>UI: Select TEKS Standard + Question Types + Count
    UI->>API: POST /api/v1/worksheets/formal/generate
    API->>LLM: Generate questions with optional diagram descriptions
    LLM-->>API: JSON: [ { question, options, diagram_description } ]

    rect rgb(240, 255, 240)
        note over API,Subprocess: TikZ Compilation Pipeline
        loop For each question with diagram_description
            API->>API: Compute MD5 hash of description
            alt Hash in static cache
                API->>API: Return cached PNG URL
            else Cache miss
                API->>TikZ_AI: Prompt: Output ONLY compilable LaTeX standalone
                TikZ_AI-->>API: LaTeX code (\documentclass ... \end{document})
                API->>API: Sanitize LaTeX fences (_clean_latex_output)
                API->>Subprocess: Write to tempdir/image.tex; exec pdflatex
                Subprocess-->>API: image.pdf
                API->>Subprocess: exec pdftoppm -png -r 300 image.pdf
                Subprocess-->>API: image.png (300 DPI)
                API->>API: Save to static/tikz-images/<hash>.png
            end
        end
    end

    API-->>UI: Return complete worksheet JSON with rendered diagram URLs
    Teacher->>UI: Review & Click "Export PDF"
    UI->>API: POST /api/v1/worksheets/formal/export-pdf
    API->>Weasy: Render Jinja2 template with embedded high-res PNGs
    Weasy-->>API: Binary PDF
    API-->>UI: Stream Downloadable PDF
```

## 2. Gamified Crossword Three-Prompt Pipeline

```mermaid
sequenceDiagram
    autonumber
    actor Teacher as Teacher
    participant API as FastAPI Backend
    participant LLM_Gen as Generation LLM (GPT-5.2)
    participant LLM_Ver as Verifier LLM (GPT-5.2)
    participant Sanitizer as Schema Sanitizer
    participant Builder as Algorithmic Grid Placer (Python)

    Teacher->>API: Request Crossword (Standard + Subskills + Grid Size 11x11)
    API->>API: Calculate over-generation target (1.4x required entries)
    
    API->>LLM_Gen: Prompt 1: Generate candidates testing explicit subskills
    LLM_Gen-->>API: Candidate entries (Word + Clue + Subskill Tag)

    API->>LLM_Ver: Prompt 2: 4-Point Verification Checklist
    note over LLM_Ver: 1. Is clue mathematically/factually sound?<br/>2. Does answer leak in clue?<br/>3. Is subskill tag strictly accurate?<br/>4. Are there duplicate terms?
    LLM_Ver-->>API: Filtered & Verified entries

    API->>Sanitizer: Step 3: Strip special characters, enforce length <= grid size
    Sanitizer-->>API: Sanitized entries list

    API->>Builder: Step 4: Deterministic Backtracking Placement
    loop For each word in descending length
        Builder->>Builder: Find candidate (row, col, dir) intersections
        Builder->>Builder: Validate bounds & adjacent cell buffers (_can_place)
        Builder->>Builder: Calculate intersection density score
    end
    Builder-->>API: Formatted 2D Crossword Grid + Placed Clues
    API-->>Teacher: Interactive Crossword JSON + PDF Ready
```
