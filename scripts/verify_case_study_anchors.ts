/**
 * KNOWLEDGE BASE ANCHOR & JOURNAL CROSS-REFERENCE VERIFIER (PHASE 2.5D)
 *
 * Deterministic build-time/CI verification engine that validates:
 * 1. All 8 canonical case-study anchors (cs-01..cs-08) exist and are uniquely placed.
 * 2. All 23 canonical ADR anchors (adr-voice-01..adr-ib-03) exist and are uniquely placed.
 * 3. No expected anchor is missing and no anchor is duplicated.
 * 4. Each anchor is associated with the correct case study or ADR subsection.
 * 5. Every ADR anchor belongs strictly to the case study specified by the canonical manifest.
 * 6. Every canonical case study in the manifest resolves to an existing Knowledge Base anchor.
 * 7. Journal chapter mappings resolve to valid case-study references through journalAdapter.
 * 8. DIRECT and PARTIAL mappings remain distinguishable (including CS-07 dual mapping).
 * 9. CS-08 remains strictly an external repository boundary (no internal chapters or ADRs).
 *
 * Execution:
 *   .\node_modules\.bin\sucrase-node scripts/verify_case_study_anchors.ts
 */

import * as fs from 'fs'
import * as path from 'path'
import { canonicalRegistry } from '../data/canonical/canonicalRegistry'
import {
  CanonicalRegistry,
  CanonicalCaseStudyReference,
  CaseStudyId,
  AdrId
} from '../data/canonical/canonicalSchema'
import {
  getCaseStudiesForChapter,
  getGroundedJournalChapters
} from '../data/adapters/journalAdapter'

// ============================================================================
// 1. TYPES & INTERFACES
// ============================================================================

export type AnchorRuleViolation =
  | 'MISSING_CASE_STUDY_ANCHOR'
  | 'MISSING_ADR_ANCHOR'
  | 'DUPLICATE_ANCHOR'
  | 'MISPLACED_CASE_STUDY_ANCHOR'
  | 'MISPLACED_ADR_ANCHOR'
  | 'MANIFEST_ANCHOR_MISMATCH'
  | 'INVALID_JOURNAL_CHAPTER_REFERENCE'
  | 'MALFORMED_JOURNAL_MAPPING'
  | 'CS08_JOURNAL_ASSOCIATION_PROHIBITED'
  | 'CS08_ADR_ASSOCIATION_PROHIBITED'
  | 'MALFORMED_KNOWLEDGE_BASE'

export interface AnchorVerificationError {
  rule: AnchorRuleViolation
  anchorId?: string
  caseStudyId?: string
  adrId?: string
  message: string
}

export interface CaseStudySectionInfo {
  caseStudyId: string
  headingLine: number
  headingText: string
  contentAnchor?: string
  rawSectionContent: string
  adrAnchorsFound: string[]
}

export interface AnchorVerificationResult {
  isValid: boolean
  errors: AnchorVerificationError[]
  stats: {
    totalCaseStudyAnchorsExpected: number
    totalCaseStudyAnchorsFound: number
    totalAdrAnchorsExpected: number
    totalAdrAnchorsFound: number
    totalDirectJournalLinks: number
    totalPartialJournalLinks: number
    totalDuplicates: number
  }
  caseStudySections: Record<string, CaseStudySectionInfo>
}

export interface VerifyAnchorsOptions {
  markdownContent?: string
  markdownPath?: string
  registry?: CanonicalRegistry
  validChapterIds?: string[] | Set<string>
}

// ============================================================================
// 2. CORE VERIFICATION ENGINE
// ============================================================================

const DEFAULT_KB_PATH = path.resolve(
  __dirname,
  '../research/engineering/ENGINEERING_EXPERIENCE_KNOWLEDGE_BASE_DRAFT.md'
)

/**
 * Pure, deterministic verification engine evaluating Knowledge Base Markdown content
 * against the authoritative canonical case-study manifest and journal adapter.
 */
export function verifyCaseStudyAnchors(
  options: VerifyAnchorsOptions = {}
): AnchorVerificationResult {
  const errors: AnchorVerificationError[] = []

  // 1. Read Markdown Content
  let content = options.markdownContent
  const filePath = options.markdownPath ?? DEFAULT_KB_PATH

  if (content === undefined) {
    try {
      content = fs.readFileSync(filePath, 'utf-8')
    } catch (err) {
      return {
        isValid: false,
        errors: [
          {
            rule: 'MALFORMED_KNOWLEDGE_BASE',
            message: `Failed to read Knowledge Base file at ${filePath}: ${(err as Error).message}`
          }
        ],
        stats: {
          totalCaseStudyAnchorsExpected: 0,
          totalCaseStudyAnchorsFound: 0,
          totalAdrAnchorsExpected: 0,
          totalAdrAnchorsFound: 0,
          totalDirectJournalLinks: 0,
          totalPartialJournalLinks: 0,
          totalDuplicates: 0
        },
        caseStudySections: {}
      }
    }
  }

  if (!content || content.trim().length === 0) {
    return {
      isValid: false,
      errors: [
        {
          rule: 'MALFORMED_KNOWLEDGE_BASE',
          message: 'Knowledge Base content is empty.'
        }
      ],
      stats: {
        totalCaseStudyAnchorsExpected: 0,
        totalCaseStudyAnchorsFound: 0,
        totalAdrAnchorsExpected: 0,
        totalAdrAnchorsFound: 0,
        totalDirectJournalLinks: 0,
        totalPartialJournalLinks: 0,
        totalDuplicates: 0
      },
      caseStudySections: {}
    }
  }

  // 2. Resolve Canonical Registry & Case Studies
  const registry = options.registry ?? canonicalRegistry
  const references = registry.caseStudyReferences ?? []

  if (!Array.isArray(references) || references.length === 0) {
    errors.push({
      rule: 'MANIFEST_ANCHOR_MISMATCH',
      message: 'Canonical registry caseStudyReferences is missing or empty.'
    })
  }

  // 3. Scan All Document Anchors & Detect Duplicates
  const anchorRegex = /<a\s+(?:id|name)=["']([^"']+)["'][^>]*>(?:<\/a>)?/gi
  const anchorCounts = new Map<string, number>()
  const anchorLocations = new Map<string, number[]>()
  let match: RegExpExecArray | null

  while ((match = anchorRegex.exec(content)) !== null) {
    const anchorId = match[1].trim()
    const count = (anchorCounts.get(anchorId) ?? 0) + 1
    anchorCounts.set(anchorId, count)

    // Calculate 1-based line number
    const lineNum = content.slice(0, match.index).split('\n').length
    const locs = anchorLocations.get(anchorId) ?? []
    locs.push(lineNum)
    anchorLocations.set(anchorId, locs)
  }

  let totalDuplicates = 0
  for (const [anchorId, count] of anchorCounts.entries()) {
    if (count > 1) {
      totalDuplicates++
      const locs = anchorLocations.get(anchorId)?.join(', ') ?? 'unknown'
      errors.push({
        rule: 'DUPLICATE_ANCHOR',
        anchorId,
        message: `Duplicate anchor identifier '${anchorId}' found ${count} times (lines: ${locs}).`
      })
    }
  }

  // 4. Structural Markdown Section Segmentation
  const lines = content.split('\n')
  const caseStudySections: Record<string, CaseStudySectionInfo> = {}
  const csHeadingRegex = /^###\s+Case\s+Study\s+(CS-0[1-8])\s*:\s*(.+)$/i

  // Find all Case Study heading line indices
  const sectionStarts: Array<{ csId: string; lineIndex: number; headingText: string }> = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    const hm = csHeadingRegex.exec(line)
    if (hm) {
      sectionStarts.push({
        csId: hm[1].toUpperCase(),
        lineIndex: i,
        headingText: line
      })
    }
  }

  // Find the end boundary of Section 6 (e.g. "## 7. Cross-Project Engineering Patterns" or end of lines)
  let section6EndLineIndex = lines.length
  for (let i = 0; i < lines.length; i++) {
    if (/^##\s+7\.\s+/i.test(lines[i].trim())) {
      section6EndLineIndex = i
      break
    }
  }

  // Extract sections and anchors associated with each case study
  for (let s = 0; s < sectionStarts.length; s++) {
    const current = sectionStarts[s]
    const nextStartLine =
      s + 1 < sectionStarts.length ? sectionStarts[s + 1].lineIndex : section6EndLineIndex

    // Check lines immediately above heading (up to 3 lines) for the case-study anchor
    let foundCaseStudyAnchor: string | undefined = undefined
    const searchBackStart = Math.max(0, current.lineIndex - 3)
    for (let b = searchBackStart; b <= current.lineIndex; b++) {
      const lineText = lines[b]
      const am = /<a\s+(?:id|name)=["']([^"']+)["']/i.exec(lineText)
      if (am) {
        foundCaseStudyAnchor = am[1].trim()
        break
      }
    }

    const sectionLines = lines.slice(current.lineIndex, nextStartLine)
    const rawSectionContent = sectionLines.join('\n')

    // Find all ADR anchors in this case study's section
    const adrAnchorRegex = /<a\s+(?:id|name)=["'](adr-[^"']+)["']/gi
    const adrAnchorsFound: string[] = []
    let amatch: RegExpExecArray | null
    while ((amatch = adrAnchorRegex.exec(rawSectionContent)) !== null) {
      adrAnchorsFound.push(amatch[1].trim())
    }

    caseStudySections[current.csId] = {
      caseStudyId: current.csId,
      headingLine: current.lineIndex + 1,
      headingText: current.headingText,
      contentAnchor: foundCaseStudyAnchor,
      rawSectionContent,
      adrAnchorsFound
    }
  }

  // 5. Validate Case Study Anchors against Canonical Manifest
  let totalCaseStudyAnchorsExpected = 0
  let totalCaseStudyAnchorsFound = 0

  for (const cs of references) {
    totalCaseStudyAnchorsExpected++
    const expectedAnchor = cs.contentAnchor

    // Invariant: Expected anchor must exist in document
    if (!anchorCounts.has(expectedAnchor)) {
      errors.push({
        rule: 'MISSING_CASE_STUDY_ANCHOR',
        caseStudyId: cs.caseStudyId,
        anchorId: expectedAnchor,
        message: `Expected case-study anchor '${expectedAnchor}' for ${cs.caseStudyId} was not found in document.`
      })
    } else {
      totalCaseStudyAnchorsFound++
    }

    // Invariant: Heading must exist and anchor must precede it
    const section = caseStudySections[cs.caseStudyId]
    if (!section) {
      errors.push({
        rule: 'MISSING_CASE_STUDY_ANCHOR',
        caseStudyId: cs.caseStudyId,
        anchorId: expectedAnchor,
        message: `Case study section for ${cs.caseStudyId} was not found in document.`
      })
    } else if (section.contentAnchor !== expectedAnchor) {
      errors.push({
        rule: 'MISPLACED_CASE_STUDY_ANCHOR',
        caseStudyId: cs.caseStudyId,
        anchorId: section.contentAnchor,
        message: `Case study ${cs.caseStudyId} section is anchored to '${section.contentAnchor}' instead of expected '${expectedAnchor}'.`
      })
    }
  }

  // 6. Validate ADR Anchors & Section Scoping
  let totalAdrAnchorsExpected = 0
  let totalAdrAnchorsFound = 0

  for (const cs of references) {
    const section = caseStudySections[cs.caseStudyId]

    for (const adr of cs.adrReferences) {
      totalAdrAnchorsExpected++
      const expectedAdrAnchor = adr.contentAnchor

      // Invariant: ADR anchor must exist in document
      if (!anchorCounts.has(expectedAdrAnchor)) {
        errors.push({
          rule: 'MISSING_ADR_ANCHOR',
          caseStudyId: cs.caseStudyId,
          adrId: adr.adrId,
          anchorId: expectedAdrAnchor,
          message: `Expected ADR anchor '${expectedAdrAnchor}' (${adr.adrId}) in ${cs.caseStudyId} was not found in document.`
        })
      } else {
        totalAdrAnchorsFound++
      }

      // Invariant: ADR anchor must be located within its parent case study section
      if (section) {
        if (!section.adrAnchorsFound.includes(expectedAdrAnchor)) {
          // Check if it appears misplaced in another case study's section
          let misplacedIn: string | undefined
          for (const [otherCsId, otherSection] of Object.entries(caseStudySections)) {
            if (otherCsId !== cs.caseStudyId && otherSection.adrAnchorsFound.includes(expectedAdrAnchor)) {
              misplacedIn = otherCsId
              break
            }
          }

          if (misplacedIn) {
            errors.push({
              rule: 'MISPLACED_ADR_ANCHOR',
              caseStudyId: cs.caseStudyId,
              adrId: adr.adrId,
              anchorId: expectedAdrAnchor,
              message: `ADR anchor '${expectedAdrAnchor}' (${adr.adrId}) belonging to ${cs.caseStudyId} was found misplaced under ${misplacedIn}.`
            })
          } else {
            errors.push({
              rule: 'MISSING_ADR_ANCHOR',
              caseStudyId: cs.caseStudyId,
              adrId: adr.adrId,
              anchorId: expectedAdrAnchor,
              message: `ADR anchor '${expectedAdrAnchor}' (${adr.adrId}) was not found in ${cs.caseStudyId} section.`
            })
          }
        }
      }
    }
  }

  // 7. Validate CS-08 External Repository Boundary Invariants
  const cs08 = references.find(cs => cs.caseStudyId === 'CS-08')
  if (cs08) {
    if (cs08.adrReferences.length > 0) {
      errors.push({
        rule: 'CS08_ADR_ASSOCIATION_PROHIBITED',
        caseStudyId: 'CS-08',
        message: 'CS-08 represents an external repository boundary and must have 0 ADR references in manifest.'
      })
    }

    const cs08Section = caseStudySections['CS-08']
    if (cs08Section && cs08Section.adrAnchorsFound.length > 0) {
      errors.push({
        rule: 'CS08_ADR_ASSOCIATION_PROHIBITED',
        caseStudyId: 'CS-08',
        message: `CS-08 section cannot contain ADR anchors (found: ${cs08Section.adrAnchorsFound.join(', ')}).`
      })
    }

    if (cs08.mappedJournalChapters.length > 0) {
      errors.push({
        rule: 'CS08_JOURNAL_ASSOCIATION_PROHIBITED',
        caseStudyId: 'CS-08',
        message: 'CS-08 represents an external repository boundary and cannot have mapped journal chapters.'
      })
    }
  }

  // 8. Validate Journal Chapter Cross-Referencing & Reverse Lookup
  const validChapters =
    options.validChapterIds instanceof Set
      ? options.validChapterIds
      : new Set(options.validChapterIds ?? getGroundedJournalChapters().map(ch => ch.id))

  let totalDirectJournalLinks = 0
  let totalPartialJournalLinks = 0

  for (const cs of references) {
    for (const mapping of cs.mappedJournalChapters) {
      if (!validChapters.has(mapping.chapterId)) {
        errors.push({
          rule: 'INVALID_JOURNAL_CHAPTER_REFERENCE',
          caseStudyId: cs.caseStudyId,
          message: `Mapping in ${cs.caseStudyId} references non-existent journal chapter '${mapping.chapterId}'.`
        })
      }

      // Query journal reverse lookup helper
      const derivedLinks = getCaseStudiesForChapter(mapping.chapterId)
      const matchingLink = derivedLinks.find(
        l =>
          l.caseStudyId === cs.caseStudyId &&
          l.classification === mapping.classification &&
          (mapping.classification === 'PARTIAL' ? l.targetAspect === mapping.targetAspect : true)
      )

      if (!matchingLink) {
        errors.push({
          rule: 'MALFORMED_JOURNAL_MAPPING',
          caseStudyId: cs.caseStudyId,
          message: `Reverse lookup getCaseStudiesForChapter('${mapping.chapterId}') failed to derive link for ${cs.caseStudyId} (${mapping.classification}).`
        })
      } else {
        if (matchingLink.classification === 'DIRECT') {
          totalDirectJournalLinks++
          if (matchingLink.targetAspect !== undefined) {
            errors.push({
              rule: 'MALFORMED_JOURNAL_MAPPING',
              caseStudyId: cs.caseStudyId,
              message: `DIRECT mapping in ${cs.caseStudyId} for ${mapping.chapterId} must not contain targetAspect.`
            })
          }
        } else if (matchingLink.classification === 'PARTIAL') {
          totalPartialJournalLinks++
          if (!matchingLink.targetAspect || matchingLink.targetAspect.trim().length === 0) {
            errors.push({
              rule: 'MALFORMED_JOURNAL_MAPPING',
              caseStudyId: cs.caseStudyId,
              message: `PARTIAL mapping in ${cs.caseStudyId} for ${mapping.chapterId} must contain non-empty targetAspect.`
            })
          }
        }

        // Verify link points to the authoritative case-study anchor
        if (matchingLink.contentAnchor !== cs.contentAnchor) {
          errors.push({
            rule: 'MANIFEST_ANCHOR_MISMATCH',
            caseStudyId: cs.caseStudyId,
            anchorId: matchingLink.contentAnchor,
            message: `Derived link contentAnchor '${matchingLink.contentAnchor}' does not match case study anchor '${cs.contentAnchor}'.`
          })
        }
      }
    }
  }

  // Verify CS-07 dual mapping in chapter 07
  const ch07Links = getCaseStudiesForChapter('ch-07-making-math-visual')
  const ch07Direct = ch07Links.find(l => l.caseStudyId === 'CS-07' && l.classification === 'DIRECT')
  const ch07Partial = ch07Links.find(l => l.caseStudyId === 'CS-07' && l.classification === 'PARTIAL')

  if (!ch07Direct || !ch07Partial) {
    errors.push({
      rule: 'MALFORMED_JOURNAL_MAPPING',
      caseStudyId: 'CS-07',
      message: 'Chapter 07 must derive both a DIRECT and a PARTIAL link to CS-07.'
    })
  }

  return {
    isValid: errors.length === 0,
    errors,
    stats: {
      totalCaseStudyAnchorsExpected,
      totalCaseStudyAnchorsFound,
      totalAdrAnchorsExpected,
      totalAdrAnchorsFound,
      totalDirectJournalLinks,
      totalPartialJournalLinks,
      totalDuplicates
    },
    caseStudySections
  }
}

// ============================================================================
// 3. ADVERSARIAL & REGRESSION TEST RUNNER
// ============================================================================

let passedTests = 0
let failedTests = 0

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`  ✓ PASS: ${testName}`)
    passedTests++
  } else {
    console.error(`  ✗ FAIL: ${testName}`)
    if (detail) console.error(`    Detail: ${detail}`)
    failedTests++
  }
}

export function runAnchorVerifierSelfTest(): boolean {
  console.log('\n=================================================================')
  console.log('KNOWLEDGE BASE ANCHOR & JOURNAL CROSS-REFERENCE VERIFICATION SUITE')
  console.log('=================================================================\n')

  // --------------------------------------------------------------------------
  // PART 1: Production Knowledge Base & Manifest Invariant Verification
  // --------------------------------------------------------------------------
  console.log('Test Suite 1: Production Knowledge Base Anchor & Manifest Invariants')
  const prodResult = verifyCaseStudyAnchors()

  assert(
    prodResult.isValid,
    'Knowledge Base passes full anchor verification with zero errors',
    JSON.stringify(prodResult.errors, null, 2)
  )
  assert(prodResult.errors.length === 0, `Error count is strictly 0 (found ${prodResult.errors.length})`)
  assert(
    prodResult.stats.totalCaseStudyAnchorsExpected === 8,
    `Expected exactly 8 case-study anchors (found ${prodResult.stats.totalCaseStudyAnchorsExpected})`
  )
  assert(
    prodResult.stats.totalCaseStudyAnchorsFound === 8,
    `Found exactly 8 case-study anchors (found ${prodResult.stats.totalCaseStudyAnchorsFound})`
  )
  assert(
    prodResult.stats.totalAdrAnchorsExpected === 23,
    `Expected exactly 23 ADR anchors (found ${prodResult.stats.totalAdrAnchorsExpected})`
  )
  assert(
    prodResult.stats.totalAdrAnchorsFound === 23,
    `Found exactly 23 ADR anchors (found ${prodResult.stats.totalAdrAnchorsFound})`
  )
  assert(
    prodResult.stats.totalDuplicates === 0,
    `Zero duplicate anchors found in document (found ${prodResult.stats.totalDuplicates})`
  )
  assert(
    prodResult.stats.totalDirectJournalLinks === 8,
    `Verified 8 DIRECT journal-to-case-study links (found ${prodResult.stats.totalDirectJournalLinks})`
  )
  assert(
    prodResult.stats.totalPartialJournalLinks === 3,
    `Verified 3 PARTIAL journal-to-case-study links (found ${prodResult.stats.totalPartialJournalLinks})`
  )

  // Verify Case Study Sections & Anchors
  const expectedCsAnchors: Record<string, string> = {
    'CS-01': 'cs-01',
    'CS-02': 'cs-02',
    'CS-03': 'cs-03',
    'CS-04': 'cs-04',
    'CS-05': 'cs-05',
    'CS-06': 'cs-06',
    'CS-07': 'cs-07',
    'CS-08': 'cs-08'
  }

  for (const [csId, expectedAnchor] of Object.entries(expectedCsAnchors)) {
    const sec = prodResult.caseStudySections[csId]
    assert(sec !== undefined, `Case study section ${csId} exists in document structure`)
    assert(
      sec?.contentAnchor === expectedAnchor,
      `Case study section ${csId} anchor is '${expectedAnchor}' (found '${sec?.contentAnchor}')`
    )
  }

  // Verify ADR Counts per Section
  const expectedAdrCounts: Record<string, number> = {
    'CS-01': 3,
    'CS-02': 4,
    'CS-03': 3,
    'CS-04': 4,
    'CS-05': 3,
    'CS-06': 3,
    'CS-07': 3,
    'CS-08': 0
  }

  for (const [csId, expectedCount] of Object.entries(expectedAdrCounts)) {
    const sec = prodResult.caseStudySections[csId]
    const foundCount = sec?.adrAnchorsFound.length ?? 0
    assert(
      foundCount === expectedCount,
      `${csId} contains exactly ${expectedCount} ADR anchors (found ${foundCount})`
    )
  }

  // --------------------------------------------------------------------------
  // PART 2: Journal Cross-Reference & CS-07 / CS-08 Invariants
  // --------------------------------------------------------------------------
  console.log('\nTest Suite 2: Journal Cross-Reference & Boundary Verification')

  const ch07Links = getCaseStudiesForChapter('ch-07-making-math-visual')
  assert(ch07Links.length === 2, `ch-07 returns exactly 2 derived case-study links (found ${ch07Links.length})`)

  const ch07Direct = ch07Links.find(l => l.classification === 'DIRECT')
  const ch07Partial = ch07Links.find(l => l.classification === 'PARTIAL')
  assert(ch07Direct !== undefined, 'ch-07 DIRECT link exists')
  assert(ch07Direct?.caseStudyId === 'CS-07', 'ch-07 DIRECT link connects to CS-07')
  assert(ch07Direct?.contentAnchor === 'cs-07', 'ch-07 DIRECT link points to anchor cs-07')
  assert(
    Boolean(ch07Direct && ch07Direct.relevantAdrIds.includes('ADR-IB-01') && ch07Direct.relevantAdrIds.includes('ADR-IB-02')),
    'ch-07 DIRECT link includes ADR-IB-01 and ADR-IB-02'
  )

  assert(ch07Partial !== undefined, 'ch-07 PARTIAL link exists')
  assert(ch07Partial?.caseStudyId === 'CS-07', 'ch-07 PARTIAL link connects to CS-07')
  assert(ch07Partial?.contentAnchor === 'cs-07', 'ch-07 PARTIAL link points to anchor cs-07')
  assert(
    Boolean(ch07Partial && ch07Partial.relevantAdrIds.includes('ADR-IB-03')),
    'ch-07 PARTIAL link includes ADR-IB-03'
  )
  assert(
    Boolean(ch07Partial?.targetAspect && ch07Partial.targetAspect.includes('Min/Max Swap')),
    'ch-07 PARTIAL link preserves documented Min/Max Swap targetAspect'
  )

  // CS-08 External Boundary Invariants
  const allChapters = getGroundedJournalChapters()
  let cs08LinkedAnywhere = false
  for (const ch of allChapters) {
    const links = getCaseStudiesForChapter(ch.id)
    if (links.some(l => l.caseStudyId === 'CS-08')) {
      cs08LinkedAnywhere = true
      break
    }
  }
  assert(!cs08LinkedAnywhere, 'CS-08 is not linked by any journal chapter reverse lookup')

  const cs08Section = prodResult.caseStudySections['CS-08']
  assert(cs08Section !== undefined, 'CS-08 has documented section in Knowledge Base')
  assert(cs08Section?.contentAnchor === 'cs-08', 'CS-08 has anchor cs-08')
  assert(cs08Section?.adrAnchorsFound.length === 0, 'CS-08 section has strictly 0 ADR anchors')

  // --------------------------------------------------------------------------
  // PART 3: Adversarial & Negative Invariant Tests
  // --------------------------------------------------------------------------
  console.log('\nTest Suite 3: Adversarial Negative Invariant Tests')

  const baseValidMarkdown = fs.readFileSync(DEFAULT_KB_PATH, 'utf-8')

  // Negative 1: Missing case-study anchor
  {
    const mutated = baseValidMarkdown.replace('<a id="cs-01"></a>', '')
    const res = verifyCaseStudyAnchors({ markdownContent: mutated })
    assert(
      !res.isValid && res.errors.some(e => e.rule === 'MISSING_CASE_STUDY_ANCHOR' && e.caseStudyId === 'CS-01'),
      'Verifier catches missing case-study anchor (CS-01)'
    )
  }

  // Negative 2: Missing ADR anchor
  {
    const mutated = baseValidMarkdown.replace('<a id="adr-voice-01"></a>', '')
    const res = verifyCaseStudyAnchors({ markdownContent: mutated })
    assert(
      !res.isValid && res.errors.some(e => e.rule === 'MISSING_ADR_ANCHOR' && e.adrId === 'ADR-VOICE-01'),
      'Verifier catches missing ADR anchor (ADR-VOICE-01)'
    )
  }

  // Negative 3: Duplicate anchor
  {
    const mutated = baseValidMarkdown.replace(
      '<a id="cs-02"></a>',
      '<a id="cs-02"></a>\n<a id="cs-02"></a>'
    )
    const res = verifyCaseStudyAnchors({ markdownContent: mutated })
    assert(
      !res.isValid && res.errors.some(e => e.rule === 'DUPLICATE_ANCHOR' && e.anchorId === 'cs-02'),
      'Verifier catches duplicate anchor (cs-02)'
    )
  }

  // Negative 4: Anchor under wrong case-study section (misplaced case study anchor)
  {
    const mutated = baseValidMarkdown
      .replace('<a id="cs-01"></a>', '<a id="cs-09-bogus"></a>')
    const res = verifyCaseStudyAnchors({ markdownContent: mutated })
    assert(
      !res.isValid && res.errors.some(e => e.rule === 'MISPLACED_CASE_STUDY_ANCHOR' || e.rule === 'MISSING_CASE_STUDY_ANCHOR'),
      'Verifier catches misplaced/wrong case-study anchor'
    )
  }

  // Negative 5: ADR associated with wrong case study
  {
    // Move adr-voice-01 from CS-01 into CS-02 body
    const withoutVoice01 = baseValidMarkdown.replace('<a id="adr-voice-01"></a>', '')
    const movedToCs02 = withoutVoice01.replace(
      '#### 6. Engineering Decisions (ADRs)\n- <a id="adr-eda-01"></a>',
      '#### 6. Engineering Decisions (ADRs)\n- <a id="adr-voice-01"></a>\n- <a id="adr-eda-01"></a>'
    )
    const res = verifyCaseStudyAnchors({ markdownContent: movedToCs02 })
    assert(
      !res.isValid && res.errors.some(e => e.rule === 'MISPLACED_ADR_ANCHOR' && e.adrId === 'ADR-VOICE-01'),
      'Verifier catches ADR anchor misplaced under wrong case study'
    )
  }

  // Negative 6: Missing canonical manifest reference
  {
    const mutatedRegistry: CanonicalRegistry = {
      ...canonicalRegistry,
      caseStudyReferences: canonicalRegistry.caseStudyReferences?.map(cs => {
        if (cs.caseStudyId === 'CS-01') {
          return { ...cs, contentAnchor: 'cs-mismatch' }
        }
        return cs
      })
    }
    const res = verifyCaseStudyAnchors({ markdownContent: baseValidMarkdown, registry: mutatedRegistry })
    assert(
      !res.isValid && res.errors.some(e => e.rule === 'MISSING_CASE_STUDY_ANCHOR' || e.rule === 'MISPLACED_CASE_STUDY_ANCHOR'),
      'Verifier catches manifest-to-markdown anchor mismatch'
    )
  }

  // Negative 7: Invalid journal chapter reference
  {
    const mutatedRegistry: CanonicalRegistry = {
      ...canonicalRegistry,
      caseStudyReferences: canonicalRegistry.caseStudyReferences?.map(cs => {
        if (cs.caseStudyId === 'CS-01') {
          return {
            ...cs,
            mappedJournalChapters: [
              {
                chapterId: 'ch-99-nonexistent-chapter',
                classification: 'DIRECT' as const,
                relevantAdrIds: ['ADR-VOICE-01']
              }
            ]
          }
        }
        return cs
      })
    }
    const res = verifyCaseStudyAnchors({ markdownContent: baseValidMarkdown, registry: mutatedRegistry })
    assert(
      !res.isValid && res.errors.some(e => e.rule === 'INVALID_JOURNAL_CHAPTER_REFERENCE'),
      'Verifier catches invalid journal chapter reference'
    )
  }

  // Negative 8: CS-08 incorrectly associated with internal chapter
  {
    const mutatedRegistry: CanonicalRegistry = {
      ...canonicalRegistry,
      caseStudyReferences: canonicalRegistry.caseStudyReferences?.map(cs => {
        if (cs.caseStudyId === 'CS-08') {
          return {
            ...cs,
            mappedJournalChapters: [
              {
                chapterId: 'ch-21-ask-aadil',
                classification: 'DIRECT' as const,
                relevantAdrIds: []
              }
            ]
          }
        }
        return cs
      })
    }
    const res = verifyCaseStudyAnchors({ markdownContent: baseValidMarkdown, registry: mutatedRegistry })
    assert(
      !res.isValid && res.errors.some(e => e.rule === 'CS08_JOURNAL_ASSOCIATION_PROHIBITED'),
      'Verifier catches CS-08 incorrectly associated with internal chapter'
    )
  }

  // Negative 8b: Incorrect DIRECT/PARTIAL relationship handling (empty targetAspect on PARTIAL)
  {
    const mutatedRegistry: CanonicalRegistry = {
      ...canonicalRegistry,
      caseStudyReferences: canonicalRegistry.caseStudyReferences?.map(cs => {
        if (cs.caseStudyId === 'CS-07') {
          return {
            ...cs,
            mappedJournalChapters: [
              {
                chapterId: 'ch-07-making-math-visual',
                classification: 'PARTIAL' as const,
                targetAspect: '   ',
                relevantAdrIds: ['ADR-IB-03' as AdrId]
              }
            ]
          }
        }
        return cs
      })
    }
    const res = verifyCaseStudyAnchors({ markdownContent: baseValidMarkdown, registry: mutatedRegistry })
    assert(
      !res.isValid && res.errors.some(e => e.rule === 'MALFORMED_JOURNAL_MAPPING'),
      'Verifier catches incorrect DIRECT/PARTIAL relationship handling'
    )
  }

  // Negative 9: CS-08 incorrectly associated with ADR in manifest
  {
    const mutatedRegistry: CanonicalRegistry = {
      ...canonicalRegistry,
      caseStudyReferences: canonicalRegistry.caseStudyReferences?.map(cs => {
        if (cs.caseStudyId === 'CS-08') {
          return {
            ...cs,
            adrReferences: [
              {
                adrId: 'ADR-VOICE-01' as AdrId,
                title: 'Sneaked ADR',
                status: 'ACCEPTED' as const,
                contentAnchor: 'adr-voice-01'
              }
            ]
          }
        }
        return cs
      })
    }
    const res = verifyCaseStudyAnchors({ markdownContent: baseValidMarkdown, registry: mutatedRegistry })
    assert(
      !res.isValid && res.errors.some(e => e.rule === 'CS08_ADR_ASSOCIATION_PROHIBITED'),
      'Verifier catches CS-08 incorrectly associated with ADR in manifest'
    )
  }

  // Negative 10: CS-08 section containing ADR anchor in markdown
  {
    const mutated = baseValidMarkdown.replace(
      '### Case Study CS-08: DiffGuard — Separate Repository and Evidence Boundary',
      '### Case Study CS-08: DiffGuard — Separate Repository and Evidence Boundary\n\n<a id="adr-bogus-01"></a>'
    )
    const res = verifyCaseStudyAnchors({ markdownContent: mutated })
    assert(
      !res.isValid && res.errors.some(e => e.rule === 'CS08_ADR_ASSOCIATION_PROHIBITED'),
      'Verifier catches CS-08 section containing ADR anchor in markdown'
    )
  }

  // --------------------------------------------------------------------------
  // SUMMARY
  // --------------------------------------------------------------------------
  console.log('\n-----------------------------------------------------------------')
  console.log(`TOTAL TESTS: ${passedTests + failedTests}`)
  console.log(`PASSED:      ${passedTests}`)
  console.log(`FAILED:      ${failedTests}`)
  console.log('-----------------------------------------------------------------')

  if (failedTests > 0) {
    console.error('VERIFICATION FAILED WITH UNRESOLVED INVARIANT VIOLATIONS.\n')
    return false
  } else {
    console.log('ALL KNOWLEDGE BASE ANCHORS & JOURNAL CROSS-REFERENCES VERIFIED SUCCESSFULLY.\n')
    return true
  }
}

// Direct Execution Entrypoint
if (require.main === module) {
  const success = runAnchorVerifierSelfTest()
  if (!success) {
    process.exit(1)
  }
}
