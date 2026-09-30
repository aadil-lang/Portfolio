/**
 * LLM GROUNDED ANSWER SYNTHESIZER — Phase 4
 *
 * Synthesizes natural-language answers using LLM (Gemini) strictly grounded in
 * retrieved evidence packages, backed by server-side deterministic verification.
 *
 * Core Principles:
 * 1. Evidence is the single source of truth (LLM is NOT the knowledge base).
 * 2. Strict server-side grounding validation of evidence refs, quantitative numbers,
 *    code paths, and ownership boundaries.
 * 3. Any grounding validation failure or LLM unavailability triggers an immediate
 *    fallback to the deterministic answer synthesizer.
 */

import {
  EvidencePackage,
  GroundedLlmSynthesisOutput,
  SynthesisResult,
  EvidenceItem,
  QuantitativeClaimItem,
  QueryIntent,
  SourceType,
  PortfolioLayer
} from '@/types/rag'
import { HybridRetrievalResult } from '@/lib/rag/hybridRetriever'
import { QueryUnderstanding } from '@/lib/rag/queryUnderstanding'
import { ConversationContext } from '@/lib/rag/queryUnderstanding'
import { sanitizeNeutralFraming } from './answerSynthesizer'

// ---------------------------------------------------------------------------
// 1. EVIDENCE PACKAGE BUILDER
// ---------------------------------------------------------------------------

export function buildEvidencePackage(
  query: string,
  retrieval: HybridRetrievalResult,
  understanding: QueryUnderstanding,
  context: ConversationContext
): EvidencePackage {
  const allEvidence = retrieval.evidenceItems || []

  // Segregate evidence into typed sub-collections for clear prompt structuring
  const quantitativeClaims: QuantitativeClaimItem[] =
    retrieval.structured?.matchingClaims || []

  const codeEvidence = allEvidence.filter(
    e => e.sourceType === 'code_evidence' || Boolean(e.sourcePath)
  )

  const ownershipEvidence = allEvidence.filter(
    e =>
      Boolean(e.ownership) ||
      Boolean(e.ownershipClassification) ||
      e.content.includes('OWNERSHIP') ||
      e.content.includes('CONTRIBUTION')
  )

  return {
    originalQuestion: query,
    normalizedQuestion: understanding.normalizedRetrievalQuery || query,
    intent: understanding.intent,
    informationNeed: understanding.informationNeed,
    activeProject: understanding.project || context.activeProject,
    conversationContext: {
      activeProject: context.activeProject,
      activeEntities: context.activeEntities,
      recentQuestion: context.recentQuestion,
      recentAnswerSummary: context.recentAnswerSummary
    },
    evidence: allEvidence,
    quantitativeClaims,
    codeEvidence,
    ownershipEvidence,
    conflicts: retrieval.structured?.relevantConflicts,
    sourcePlan: retrieval.sourcePlan
  }
}

// ---------------------------------------------------------------------------
// 2. SYSTEM PROMPT FOR GROUNDED SYNTHESIS
// ---------------------------------------------------------------------------

const GROUNDED_SYNTHESIS_SYSTEM_PROMPT = `You are Ask Aadil, a grounded portfolio assistant for Mohemmed Aadil Khurshid, an AI Systems Engineer.

Your ONLY task is to answer the user's question using ONLY the supplied evidence package.

STRICT GROUNDING RULES:
1. The supplied evidence package is the SOLE factual authority. Do NOT use outside knowledge or infer unrecorded facts.
2. Do NOT invent projects, technologies, metrics, dates, employers, education, ownership, code paths, test counts, or contributions.
3. If the supplied evidence is insufficient to answer a question, explicitly state what is documented and what is not established.
4. For QUANTITATIVE facts (test counts, suite counts, volume error metrics): use the exact numbers supplied in the quantitative evidence (e.g. 424 tests, 28 suites, 178 pytests, 47 E2E tests, 158 backend tests). Never round, alter, or fabricate numbers.
5. For CODE details: reference exact file paths (e.g. lib/eval-layer.ts:44-76) supplied in CodeEvidence. Never invent code file paths or synthetic functions.
6. For OWNERSHIP & CONTRIBUTION: follow canonical classifications exactly:
   - TEAM_OWNERSHIP (e.g., VoyageMath V1, Item Bank V1): state it is a team/company system and describe Aadil's documented personal role (SME testing, workflow validation, bug reporting). Do NOT claim Aadil built the entire system.
   - INDEPENDENT_BUILD / AADIL_CONTRIBUTION: describe his documented architecture and implementation role accurately.
7. Tone: Write natural, concise, conversational prose. Avoid promotional hyperbole ("world-class", "exceptional", "cutting-edge"). Use clear engineering descriptions ("built", "implemented", "verified", "contributed").
8. Do NOT mention internal retrieval mechanisms (e.g., "According to chunk #3", "My database shows"). Answer naturally.
9. Use conversation context ONLY to resolve references such as "it", "that", "he", or "the project". Never treat conversation context as proof of unsupplied factual claims.

Output strictly valid JSON matching this schema:
{
  "answer": "<Natural-language evidence-grounded answer>",
  "evidenceRefs": ["<IDs of evidence items referenced in the answer>"],
  "confidence": <0.0 to 1.0 confidence score>,
  "grounded": <true if fully supported by evidence, false if insufficient evidence>,
  "needsClarification": <true if question is ambiguous and lacks context, false otherwise>,
  "clarificationQuestion": "<Clarification question if ambiguous, or null>",
  "navigationRefs": ["<Optional navigation URLs/slugs like /systems/vm-copy>"]
}`

// ---------------------------------------------------------------------------
// 3. SERVER-SIDE GROUNDING VALIDATION
// ---------------------------------------------------------------------------

export interface ValidationResult {
  valid: boolean
  reason?: string
}

export function validateGroundedLlmOutput(
  raw: any,
  pkg: EvidencePackage
): ValidationResult {
  if (!raw || typeof raw !== 'object') {
    return { valid: false, reason: 'INVALID_JSON_OBJECT' }
  }

  if (typeof raw.answer !== 'string' || raw.answer.trim().length === 0) {
    return { valid: false, reason: 'EMPTY_ANSWER' }
  }

  if (typeof raw.confidence !== 'number' || raw.confidence < 0 || raw.confidence > 1) {
    return { valid: false, reason: 'INVALID_CONFIDENCE_RANGE' }
  }

  if (!Array.isArray(raw.evidenceRefs)) {
    return { valid: false, reason: 'INVALID_EVIDENCE_REFS_TYPE' }
  }

  // A. Evidence Reference Existence Check
  const validEvidenceIds = new Set<string>()
  pkg.evidence.forEach((item, idx) => {
    if (item.id) validEvidenceIds.add(item.id)
    validEvidenceIds.add(`evidence-${idx + 1}`)
    validEvidenceIds.add(`evidence-${idx}`)
    if (item.source) validEvidenceIds.add(item.source.toLowerCase())
    if (item.layer) validEvidenceIds.add(item.layer.toLowerCase())
    if (item.entity) validEvidenceIds.add(item.entity.toLowerCase())
  })
  pkg.quantitativeClaims.forEach(claim => {
    validEvidenceIds.add(claim.id)
    validEvidenceIds.add(`evidence-metric-${claim.id}`)
  })
  // Common canonical reference tokens
  ;['chunk-profile-core', 'evidence-identity-profile', 'evidence-identity-journal', 'evidence-identity-timeline', 'evidence-identity-resume', 'journal', 'timeline', 'system', 'resume', 'profile'].forEach(id => validEvidenceIds.add(id))

  for (const refId of raw.evidenceRefs) {
    if (typeof refId === 'string' && refId.length > 0) {
      // Allow prefix/substring matching or exact ID match
      const exists =
        validEvidenceIds.has(refId) ||
        Array.from(validEvidenceIds).some(id => id.includes(refId) || refId.includes(id))
      if (!exists) {
        return {
          valid: false,
          reason: `INVALID_EVIDENCE_REFERENCE: Model referenced unknown evidence ID "${refId}"`
        }
      }
    }
  }

  // B. Quantitative Grounding Validation
  // Extract numbers from the generated answer and check against evidence package numbers
  const answerNumbers = (raw.answer.match(/\b\d+(?:\.\d+)?\b/g) || []).map(Number)
  if (answerNumbers.length > 0) {
    // Gather all valid numbers in the evidence package + standard historical years
    const validNumbers = new Set<number>()
    // Add common dates/percentages allowed in portfolio
    const allowedYears = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 0, 1, 2, 3, 7, 10, 12, 14, 15, 28, 30, 32, 47, 158, 178, 424]
    allowedYears.forEach(n => validNumbers.add(n))

    for (const claim of pkg.quantitativeClaims) {
      const val = parseFloat(String(claim.metricValue))
      if (!isNaN(val)) validNumbers.add(val)
    }

    for (const item of pkg.evidence) {
      if (item.quantitativeData) {
        const val = parseFloat(String(item.quantitativeData.metricValue))
        if (!isNaN(val)) validNumbers.add(val)
      }
      // Extract numbers from item content
      const itemNums = (item.content.match(/\b\d+(?:\.\d+)?\b/g) || []).map(Number)
      itemNums.forEach(n => validNumbers.add(n))
    }

    for (const num of answerNumbers) {
      // Ignore single digits 0-9 in general text
      if (num < 10) continue
      // Allow valid calendar years 1900-2099
      if (num >= 1900 && num <= 2099) continue
      if (!validNumbers.has(num)) {
        return {
          valid: false,
          reason: `UNGROUNDED_QUANTITATIVE_CLAIM: Number ${num} in answer is not supported by evidence package`
        }
      }
    }
  }

  // C. Code Path Grounding Validation
  // Extract file path patterns from answer (e.g., lib/eval-layer.ts)
  const pathMatches = raw.answer.match(/\b[a-zA-Z0-9_\-\/]+\.(?:ts|tsx|js|jsx|py|css)\b/g) || []
  if (pathMatches.length > 0) {
    const validPaths = new Set<string>()
    for (const item of pkg.codeEvidence) {
      if (item.sourcePath) validPaths.add(item.sourcePath)
    }
    for (const item of pkg.evidence) {
      if (item.sourcePath) validPaths.add(item.sourcePath)
      const matches = item.content.match(/\b[a-zA-Z0-9_\-\/]+\.(?:ts|tsx|js|jsx|py|css)\b/g) || []
      matches.forEach(m => validPaths.add(m))
    }

    for (const p of pathMatches) {
      if (!validPaths.has(p) && !Array.from(validPaths).some(vp => vp.includes(p))) {
        return {
          valid: false,
          reason: `UNGROUNDED_CODE_PATH: Code path "${p}" in answer is not supported by CodeEvidence`
        }
      }
    }
  }

  // D. Ownership Grounding Validation
  // Ensure TEAM_OWNERSHIP projects (e.g., VoyageMath) are not claimed as single-handed builds
  const lowerAnswer = raw.answer.toLowerCase()
  for (const item of pkg.ownershipEvidence) {
    if (
      item.ownershipClassification === 'TEAM_OWNERSHIP' ||
      item.content.includes('TEAM_OWNERSHIP')
    ) {
      if (
        lowerAnswer.includes('aadil built voyagemath single-handedly') ||
        lowerAnswer.includes('aadil independently built voyagemath') ||
        lowerAnswer.includes('aadil created voyagemath alone')
      ) {
        return {
          valid: false,
          reason: `UNGROUNDED_OWNERSHIP_CLAIM: Overclaims team system ownership`
        }
      }
    }
  }

  return { valid: true }
}

// ---------------------------------------------------------------------------
// 4. LLM GROUNDED ANSWER SYNTHESIZER CLASS
// ---------------------------------------------------------------------------

export class LlmAnswerSynthesizer {
  /**
   * Synthesize a grounded answer using Gemini LLM with server-side validation.
   * Returns null if Gemini is unavailable, times out, or fails grounding validation,
   * enabling seamless fallback to the deterministic synthesizer.
   */
  async synthesizeGrounded(pkg: EvidencePackage): Promise<{
    result: SynthesisResult
    output: GroundedLlmSynthesisOutput
    latencyMs: number
  } | null> {
    const geminiKey = process.env.GEMINI_API_KEY
    if (!geminiKey) return null // No API key → fallback to deterministic

    const startTime = Date.now()

    // Format Evidence Package into structured prompt text
    const evidencePromptText = this.formatEvidencePackagePrompt(pkg)

    const configuredModel = process.env.GEMINI_MODEL
    const geminiModels = configuredModel
      ? [configuredModel, 'gemini-3.6-flash', 'gemini-3.8-flash', 'gemini-3.5-flash']
      : ['gemini-3.6-flash', 'gemini-3.8-flash', 'gemini-3.5-flash']

    let rawText: string | null = null
    let modelUsed = ''

    for (const model of geminiModels) {
      if (rawText) break
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 15000)

      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal,
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [
                    {
                      text: `${GROUNDED_SYNTHESIS_SYSTEM_PROMPT}\n\nEVIDENCE PACKAGE:\n${evidencePromptText}\n\nUSER QUESTION: "${pkg.originalQuestion}"\n\nGenerate strictly grounded JSON.`
                    }
                  ]
                }
              ],
              generationConfig: {
                temperature: 0.05,
                maxOutputTokens: 2048,
                responseMimeType: 'application/json'
              }
            })
          }
        )
        clearTimeout(timeout)

        if (response.ok) {
          const data = await response.json()
          rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || null
          if (rawText) modelUsed = model
        }
      } catch (e: any) {
        clearTimeout(timeout)
        console.warn(`[LlmAnswerSynthesizer] Gemini (${model}) call failed/timed out:`, e.message)
      }
    }

    if (!rawText) return null

    // Parse JSON output
    let parsed: GroundedLlmSynthesisOutput
    try {
      let cleaned = rawText.trim()
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/)
      if (jsonMatch) cleaned = jsonMatch[0]
      parsed = JSON.parse(cleaned)
    } catch (e) {
      console.warn('[LlmAnswerSynthesizer] LLM returned malformed JSON:', rawText)
      return null
    }

    // Grounding Validation
    const validation = validateGroundedLlmOutput(parsed, pkg)
    if (!validation.valid) {
      console.warn(
        `[LlmAnswerSynthesizer] Grounding validation failed (${validation.reason}). Falling back to deterministic synthesizer.`
      )
      return null
    }

    const latencyMs = Date.now() - startTime

    // Extract citations from validated evidence references
    const citations = this.buildCitationsFromRefs(parsed.evidenceRefs, pkg)

    return {
      result: {
        answer: sanitizeNeutralFraming(parsed.answer),
        citations,
        modelUsed
      },
      output: parsed,
      latencyMs
    }
  }

  private formatEvidencePackagePrompt(pkg: EvidencePackage): string {
    let text = `QUESTION INTENT: ${pkg.intent}\n`
    text += `INFORMATION NEED: ${pkg.informationNeed}\n`
    if (pkg.activeProject) {
      text += `ACTIVE PROJECT CONTEXT: ${pkg.activeProject}\n`
    }
    if (pkg.conversationContext.recentQuestion) {
      text += `PREVIOUS QUESTION: "${pkg.conversationContext.recentQuestion}"\n`
    }

    // Quantitative Claims Tier
    if (pkg.quantitativeClaims.length > 0) {
      text += `\n--- CANONICAL QUANTITATIVE CLAIMS ---\n`
      pkg.quantitativeClaims.forEach(q => {
        text += `• ID: ${q.id} | Claim: ${q.claim} | Value: ${q.metricValue} ${q.unit || ''} | Project: ${q.projectSlug || 'general'}\n`
      })
    }

    // Code Evidence Tier
    if (pkg.codeEvidence.length > 0) {
      text += `\n--- VERIFIED CODE EVIDENCE ---\n`
      pkg.codeEvidence.forEach(c => {
        text += `• ID: ${c.id || 'code'} | Path: ${c.sourcePath || 'unspecified'} | Lines: ${c.lineRange || 'all'} | Content:\n${c.content}\n`
      })
    }

    // Ownership Evidence Tier
    if (pkg.ownershipEvidence.length > 0) {
      text += `\n--- OWNERSHIP & BOUNDARY EVIDENCE ---\n`
      pkg.ownershipEvidence.forEach(o => {
        text += `• ID: ${o.id || 'ownership'} | Entity: ${o.entity || 'general'} | Classification: ${o.ownershipClassification || 'general'} | Content: ${o.content}\n`
      })
    }

    // General Semantic Chunks & Evidence
    text += `\n--- RETRIEVED PORTFOLIO EVIDENCE (${pkg.evidence.length} ITEMS) ---\n`
    pkg.evidence.forEach((e, idx) => {
      text += `[Item ${idx + 1}] ID: ${e.id || `evidence-${idx}`} | Source: ${e.source} | Layer: ${e.layer || 'general'}\n${e.content}\n\n`
    })

    return text
  }

  private buildCitationsFromRefs(refs: string[], pkg: EvidencePackage): string[] {
    const citations = new Set<string>()

    for (const ref of refs) {
      const matched = pkg.evidence.find(
        e => e.id === ref || (e.id && ref.includes(e.id)) || (e.id && e.id.includes(ref))
      )
      if (matched) {
        citations.add(`[${matched.source}]`)
      }
    }

    // Always include canonical layer citations if matching items were returned
    if (pkg.quantitativeClaims.length > 0) {
      citations.add('[Quantitative Registry — Verified Metric]')
    }
    if (pkg.codeEvidence.length > 0) {
      citations.add('[CodeEvidence — Repository Inspection]')
    }
    if (citations.size === 0) {
      citations.add('[Portfolio Knowledge Index]')
    }

    return Array.from(citations)
  }
}

export const llmAnswerSynthesizer = new LlmAnswerSynthesizer()
