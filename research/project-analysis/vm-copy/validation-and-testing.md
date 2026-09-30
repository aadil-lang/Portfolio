# Validation, Testing & Guardrails — VM Copy Question Generator

## 1. Automated Test Suite Status
- **Test Runner**: None configured in `package.json` (no Jest/Vitest/Playwright suites present).
- **Static Verification**:
  - `npm run build`: Next.js 16 compiler and TypeScript 5 typecheck verify schema integrity across all components, API routes, and interfaces.
  - `npm run lint`: ESLint 9 validates code standards and Next.js best practices.

## 2. In-App Runtime Guardrails (Tier 1 & Tier 2)

### Tier 1: Deterministic Engine (`lib/eval-layer.ts`)
Rather than relying on offline test suites, `vm-copy` implements runtime assertion testing embedded directly in the production request pipeline. Every generated question runs through `evaluateDeterministic()` before being returned to the caller:

1. **Option Cardinality Assertion**:
   ```typescript
   if (question.options.length !== expectedOptionsCount) {
     issues.push(`Expected exactly ${expectedOptionsCount} options, but found ${question.options.length}.`)
     score -= 25
   }
   ```
2. **Correct Answer Exclusivity Invariant**:
   ```typescript
   const caOptions = question.options.filter(
     (opt) => (opt.logic || '').trim().toUpperCase() === 'CA'
   )
   if (caOptions.length === 0) {
     issues.push('No option is marked with logic: "CA" (Correct Answer).')
     score -= 35
   } else if (caOptions.length > 1) {
     issues.push(`Multiple options (${caOptions.length}) are marked as Correct Answer ("CA").`)
     score -= 30
   }
   ```
3. **Duplicate Option Detection**:
   ```typescript
   const seenTexts = new Set<string>()
   // Iterates through options; detects exact matches after trim() and toLowerCase()
   if (seenTexts.has(rawText)) {
     issues.push(`Duplicate option found: "${question.options[i].text}".`)
     score -= 20
   }
   ```
4. **Distractor Misconception Logic Guard**:
   Ensures every incorrect option has a pedagogical explanation (e.g. "Misconception: forgot to invert divisor").
5. **Solution Step Verification**:
   Ensures solutions follow structured sequential reasoning (e.g. must contain `"Step 1"` or `"Step"`).
6. **SME Formatting Constraints**:
   Employs regex heuristics (e.g. mixed number validation `/^\d+\s+\d+\/\d+$/`) to reject improper fractions when SME instructions mandate mixed fractions.

### Tier 2/3: Adversarial Semantic Blind-Solve (`/api/verify`)
- Zero-temperature adversarial LLM prompt that receives only the question stem and options, solves the problem from first principles without knowing the marked answer, computes its own result, and checks whether the marked `CA` matches its independently calculated answer.
- Cross-validates distractors to ensure none of them are accidentally valid alternative interpretations.
