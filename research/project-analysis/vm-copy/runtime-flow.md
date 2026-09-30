# Runtime Flow & Execution Lifecycle — VM Copy Question Generator

## 1. End-to-End Sequence Diagram

```mermaid
sequenceDiagram
    autonumber
    actor SME as SME / Curriculum Author
    participant UI as Next.js Client (React 19)
    participant API as /api/generate Route
    participant Vision as Vision Pre-Analyzer
    participant LLM as Multi-Model AI Router
    participant Eval as Tier-1 Eval Layer (Pure TS)
    participant VerifyAPI as /api/verify (Tier-2/3)

    SME->>UI: Input Base Question, SME Notes, Image, Count (e.g. 5)
    UI->>API: POST /api/generate
    
    rect rgb(240, 245, 255)
        note over API,Vision: Phase 1: Pre-Analysis
        opt Image files attached
            API->>Vision: analyzeImageForQuestion(imageFiles)
            Vision->>LLM: Multi-modal prompt (Extract tables, coords, numbers)
            LLM-->>Vision: Structured HTML table / geometric description
            Vision-->>API: preAnalyzedImageContent
        end
    end

    rect rgb(245, 255, 240)
        note over API,LLM: Phase 2: Parallel Batch Generation
        API->>API: calculateBatches(5) -> [3, 2]
        par Batch 1 (3 questions)
            API->>LLM: generateWithAI(Prompt + preAnalyzedImageContent)
            LLM-->>API: JSON Questions [Q1, Q2, Q3]
        and Batch 2 (2 questions)
            API->>LLM: generateWithAI(Prompt + preAnalyzedImageContent)
            LLM-->>API: JSON Questions [Q4, Q5]
        end
    end

    rect rgb(255, 245, 240)
        note over API,Eval: Phase 3: Synchronous Deterministic Evaluation
        loop For each question in [Q1..Q5]
            API->>Eval: evaluateDeterministic(Q, expectedOptions=4, smeNotes)
            Eval->>Eval: Check option count == 4
            Eval->>Eval: Check exactly 1 option has logic == "CA"
            Eval->>Eval: Check for duplicate option text
            Eval->>Eval: Check all distractors have non-empty logic
            Eval->>Eval: Regex check for SME constraints (e.g. mixed numbers)
            Eval-->>API: EvalResult (passed, score, issues[])
        end
    end

    API-->>UI: 200 OK: Questions + Eval Status
    UI-->>SME: Render Cards with Score Badges (Pass: Green, Amber, Red)

    rect rgb(255, 250, 235)
        note over SME,VerifyAPI: Phase 4: On-Demand Interactive Auto-Fix
        SME->>UI: Click "Verify & Auto-fix" on Question
        UI->>VerifyAPI: POST /api/verify (question, options, solution)
        VerifyAPI->>LLM: Adversarial Blind-Solve Prompt (temp=0.0)
        LLM-->>VerifyAPI: { passed, calculated_answer, marked_ca_is_correct, correctedOptions }
        VerifyAPI-->>UI: Updated verified question
        UI-->>SME: Updated question card
    end
```

## 2. Execution Stages & Data Transformations

### Stage 1: Batch Calculation
- **Input**: Integer count (e.g., 5).
- **Transformation**: `calculateBatches(numQuestions)` partitions request into array `[3, 2]`.
- **Purpose**: Prevents single-prompt timeout and token context bloat. Ensures fast parallel generation across worker slots.

### Stage 2: Prompt Interpolation & Generation
- **Input**: Base question string, grade, curriculum, SME notes, parsed options count.
- **Output**: Raw string from model containing JSON payload:
  ```json
  [
    {
      "question": "...",
      "options": [
        { "text": "...", "logic": "CA" },
        { "text": "...", "logic": "Common misconception: added denominators instead of finding LCD" }
      ],
      "solution": "Step 1: ...\nStep 2: ..."
    }
  ]
  ```

### Stage 3: Deterministic Scoring Mechanics
- **Initial Score**: 100 points.
- **Deductions**:
  - Missing question text or length < 5 characters: `-30`
  - Option count $\ne$ expected: `-25`
  - Zero options marked `CA`: `-35`
  - Multiple options marked `CA`: `-30`
  - Empty option text: `-15` per instance
  - Duplicate option text: `-20`
  - Missing distractor logic: `-5` per instance
  - Solution missing "Step 1" format: `-10`
  - Missing solution entirely: `-15`
  - SME mixed-number regex mismatch: `-20`
- **Output Score**: `Math.max(0, score)`. Passed flag requires `issues.length === 0`.
