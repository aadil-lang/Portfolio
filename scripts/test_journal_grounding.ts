/**
 * TEST HARNESS: JOURNAL CHAPTER CANONICAL GROUNDING (PHASE 2.4)
 *
 * Verifies:
 * 1. Structural Integrity & Backward Compatibility (23 Chapters, Preserved Fields, Ordering)
 * 2. Authoritative Canonical Entity Resolution (Career, Project, Claim, Evidence Pointers)
 * 3. Attribution & Provenance Invariants (Content Builder, VM Copy, Item Bank, AI Worksheets, ETL)
 * 4. Technical Metric Governance & Mandatory Caveats (VM Copy, CAD, OCR, Solace, Reliability, Ask Aadil)
 * 5. Confidentiality & Publication Safeguards (Proprietary Projects, No Leaked URLs)
 * 6. Determinism, Immutability & Query Helper Isolation
 * 7. Negative Invariant & Adversarial Bypass Rejection
 */

import { journalChapters, JournalChapterRecord, GroundedJournalChapter } from '../data/canonical/journalChapters'
import {
  getGroundedJournalChapters,
  getGroundedChapterById,
  getGroundedChapterByNumber,
  getGroundedChaptersByProjectId,
  getGroundedChaptersByCareerId,
  getGroundedChaptersByClaimId,
  getGroundedChaptersByEvidenceId,
  validateJournalGrounding
} from '../data/adapters/journalAdapter'
import { canonicalRegistry } from '../data/canonical/canonicalRegistry'

interface TestResult {
  suite: string
  name: string
  passed: boolean
  error?: string
}

const results: TestResult[] = []

function assert(condition: boolean, suite: string, name: string, errorMsg?: string) {
  if (condition) {
    results.push({ suite, name, passed: true })
  } else {
    const msg = errorMsg || 'Assertion failed'
    results.push({ suite, name, passed: false, error: msg })
    console.error(`❌ [FAIL] ${suite} -> ${name}: ${msg}`)
  }
}

console.log('='.repeat(75))
console.log('PHASE 2.4 — JOURNAL CHAPTER GROUNDING REGRESSION & ADVERSARIAL SUITE')
console.log('='.repeat(75))

// ---------------------------------------------------------------------------
// SUITE 1: STRUCTURAL INTEGRITY & BACKWARD COMPATIBILITY
// ---------------------------------------------------------------------------
const s1 = 'Suite 1: Structural Integrity & Compatibility'

// Exact count
assert(journalChapters.length === 23, s1, 'Chapter count is exactly 23', `Expected 23, got ${journalChapters.length}`)

// Unique and stable IDs
const seenIds = new Set<string>()
let idsUnique = true
for (const ch of journalChapters) {
  if (seenIds.has(ch.id)) {
    idsUnique = false
  }
  seenIds.add(ch.id)
}
assert(idsUnique, s1, 'All chapter IDs are unique and non-empty')

// Preserved chapter numbering sequence
const expectedNumbers = [
  '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
  '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
  '21', '22', 'SYNTHESIS'
]
const actualNumbers = journalChapters.map(c => c.number)
assert(
  JSON.stringify(actualNumbers) === JSON.stringify(expectedNumbers),
  s1,
  'Chapter numbering sequence matches 01-22 + SYNTHESIS',
  `Expected ${expectedNumbers.join(',')}, got ${actualNumbers.join(',')}`
)

// Legacy content fields preserved for all 23 chapters
let allContentPreserved = true
for (const ch of journalChapters) {
  if (!ch.title || !ch.subtitle || !ch.problem || !ch.solution || !ch.breakthrough || !ch.whatBecameDeterministic || !ch.accumulatedCapability) {
    allContentPreserved = false
  }
}
assert(allContentPreserved, s1, 'All 23 chapters preserve narrative content fields (problem, solution, breakthrough, etc.)')

// Spreads and page numbers
const ch01 = journalChapters[0]
assert(ch01.spread === 1 && ch01.page === 3, s1, 'Chapter 01 has spread 1 and page 3')

const ch20 = journalChapters.find(c => c.connectedSystemSlug === 'ocr-evaluator')
assert(ch20 !== undefined && ch20.number === '20' && ch20.spread === 14 && ch20.page === 29, s1, 'Chapter 20 (OCR) has spread 14 and page 29')

const chSynthesis = journalChapters[22]
assert(chSynthesis.number === 'SYNTHESIS' && chSynthesis.spread === 17 && chSynthesis.page === 35, s1, 'Synthesis has spread 17 and page 35')

// Backward compatibility: exports type check
const recordTypeCheck: JournalChapterRecord = journalChapters[0]
assert(recordTypeCheck.id === 'ch-01-problem-domain', s1, 'JournalChapterRecord type assignment valid')

// ---------------------------------------------------------------------------
// SUITE 2: CANONICAL REFERENCE RESOLUTION
// ---------------------------------------------------------------------------
const s2 = 'Suite 2: Canonical Reference Resolution'

const careerIdSet = new Set(canonicalRegistry.careerRecords.map(c => c.careerId))
const projectIdSet = new Set(canonicalRegistry.projectRecords.map(p => p.projectId))
const claimIdSet = new Set(canonicalRegistry.claimRecords.map(c => c.claimId))
const evidenceIdSet = new Set(canonicalRegistry.evidenceRecords.map(e => e.evidenceId))

let allCareersResolve = true
let allProjectsResolve = true
let allClaimsResolve = true
let allEvidenceResolve = true

for (const ch of journalChapters) {
  for (const carId of ch.canonicalCareerIds) {
    if (!careerIdSet.has(carId)) allCareersResolve = false
  }
  for (const pId of ch.canonicalProjectIds) {
    if (!projectIdSet.has(pId)) allProjectsResolve = false
  }
  for (const cId of ch.canonicalClaimIds) {
    if (!claimIdSet.has(cId)) allClaimsResolve = false
  }
  for (const eId of ch.canonicalEvidenceIds) {
    if (!evidenceIdSet.has(eId)) allEvidenceResolve = false
  }
}

assert(allCareersResolve, s2, 'Every canonical career ID resolves to canonicalRegistry.careerRecords')
assert(allProjectsResolve, s2, 'Every canonical project ID resolves to canonicalRegistry.projectRecords')
assert(allClaimsResolve, s2, 'Every canonical claim ID resolves to canonicalRegistry.claimRecords')
assert(allEvidenceResolve, s2, 'Every canonical evidence ID resolves to canonicalRegistry.evidenceRecords')

// Zero dangling references verified by automated validator
const validation = validateJournalGrounding(journalChapters)
assert(validation.valid, s2, 'validateJournalGrounding passes with 0 errors', validation.errors.join('; '))
assert(validation.errors.length === 0, s2, 'Zero errors reported by grounding validator')
assert(validation.groundedClaimsCount > 0, s2, `Canonical claims grounded across chapters (found ${validation.groundedClaimsCount})`)
assert(validation.groundedEvidenceCount > 0, s2, `Canonical evidence records grounded across chapters (found ${validation.groundedEvidenceCount})`)

// ---------------------------------------------------------------------------
// SUITE 3: ATTRIBUTION & PROVENANCE INVARIANTS
// ---------------------------------------------------------------------------
const s3 = 'Suite 3: Attribution & Provenance Invariants'

// Content Builder V1 (Ch. 06): SME contribution, software by Wayground Engineering
const ch06 = journalChapters.find(c => c.id === 'ch-06-content-to-systems')
assert(ch06 !== undefined, s3, 'Chapter 06 exists')
if (ch06) {
  assert(ch06.canonicalProjectIds.includes('proj-content-builder'), s3, 'Chapter 06 links to proj-content-builder')
  assert(
    ch06.grounding.ownershipClassification?.implementationAuthorship === 'COLLABORATIVE_CONTRIBUTOR',
    s3,
    'Chapter 06 implementationAuthorship is COLLABORATIVE_CONTRIBUTOR'
  )
  assert(
    ch06.grounding.ownershipClassification?.architecturalResponsibility === 'DIRECTED_ARCHITECTURE',
    s3,
    'Chapter 06 architecturalResponsibility is DIRECTED_ARCHITECTURE'
  )
  assert(
    ch06.grounding.ownershipClassification?.ipOwnership === 'EMPLOYER_PROPRIETARY',
    s3,
    'Chapter 06 ipOwnership is EMPLOYER_PROPRIETARY'
  )
  assert(
    ch06.grounding.historicalDisclosures?.some(d => d.includes('Wayground Engineering')) ?? false,
    s3,
    'Chapter 06 historical disclosures explicitly attribute software engineering to Wayground Engineering'
  )
}

// VM Copy (Ch. 11 & 12): Oct-Nov 2025 within Wayground SME tenure, employer proprietary
const ch11 = journalChapters.find(c => c.id === 'ch-11-generation-not-enough')
const ch12 = journalChapters.find(c => c.id === 'ch-12-generation-to-evaluation')
assert(ch11 !== undefined && ch12 !== undefined, s3, 'VM Copy chapters 11 and 12 exist')
if (ch11 && ch12) {
  assert(ch11.canonicalCareerIds.includes('car-wayground-math-sme'), s3, 'VM Copy Chapter 11 associated with car-wayground-math-sme')
  assert(ch12.canonicalCareerIds.includes('car-wayground-math-sme'), s3, 'VM Copy Chapter 12 associated with car-wayground-math-sme')
  assert(ch11.canonicalProjectIds.includes('proj-vm-copy'), s3, 'VM Copy Chapter 11 associated with proj-vm-copy')
  assert(ch12.canonicalProjectIds.includes('proj-vm-copy'), s3, 'VM Copy Chapter 12 associated with proj-vm-copy')
  assert(
    ch11.grounding.ownershipClassification?.ipOwnership === 'EMPLOYER_PROPRIETARY',
    s3,
    'VM Copy Chapter 11 ipOwnership is EMPLOYER_PROPRIETARY'
  )
  assert(
    ch12.grounding.ownershipClassification?.ipOwnership === 'EMPLOYER_PROPRIETARY',
    s3,
    'VM Copy Chapter 12 ipOwnership is EMPLOYER_PROPRIETARY'
  )
  assert(
    ch12.grounding.historicalDisclosures?.some(d => d.includes('asserted career narrative')) ?? false,
    s3,
    'VM Copy Chapter 12 notes career transfer causality is an asserted narrative, not formally evidenced'
  )
}

// AI Worksheets (Ch. 13): Employer proprietary POC
const ch13 = journalChapters.find(c => c.id === 'ch-13-ai-worksheets')
assert(ch13 !== undefined, s3, 'Chapter 13 exists')
if (ch13) {
  assert(ch13.canonicalProjectIds.includes('proj-ai-worksheets'), s3, 'Chapter 13 links to proj-ai-worksheets')
  assert(
    ch13.grounding.ownershipClassification?.implementationAuthorship === 'SOLE_IMPLEMENTER',
    s3,
    'Chapter 13 implementationAuthorship is SOLE_IMPLEMENTER'
  )
  assert(
    ch13.grounding.ownershipClassification?.ipOwnership === 'EMPLOYER_PROPRIETARY',
    s3,
    'Chapter 13 ipOwnership is EMPLOYER_PROPRIETARY'
  )
}

// US Math Item Bank (Ch. 14): Collaborative team build, visual routing + compile gates contribution
const ch14 = journalChapters.find(c => c.id === 'ch-14-applications-to-pipelines')
assert(ch14 !== undefined, s3, 'Chapter 14 exists')
if (ch14) {
  assert(ch14.canonicalProjectIds.includes('proj-item-bank'), s3, 'Chapter 14 links to proj-item-bank')
  assert(
    ch14.grounding.ownershipClassification?.implementationAuthorship === 'COLLABORATIVE_CONTRIBUTOR',
    s3,
    'Chapter 14 implementationAuthorship is COLLABORATIVE_CONTRIBUTOR'
  )
  assert(
    ch14.grounding.ownershipClassification?.ipOwnership === 'EMPLOYER_PROPRIETARY',
    s3,
    'Chapter 14 ipOwnership is EMPLOYER_PROPRIETARY'
  )
}

// Curriculum ETL (Ch. 15): 3-tier integrity, employer proprietary
const ch15 = journalChapters.find(c => c.id === 'ch-15-curriculum-etl')
assert(ch15 !== undefined, s3, 'Chapter 15 exists')
if (ch15) {
  assert(ch15.canonicalProjectIds.includes('proj-curriculum-etl'), s3, 'Chapter 15 links to proj-curriculum-etl')
  assert(
    ch15.grounding.ownershipClassification?.ipOwnership === 'EMPLOYER_PROPRIETARY',
    s3,
    'Chapter 15 ipOwnership is EMPLOYER_PROPRIETARY'
  )
}

// Career Chronology intervals
const ch01Career = canonicalRegistry.careerRecords.find(c => c.careerId === 'car-graveiens')
assert(
  typeof ch01Career?.employmentPeriod.end === 'object' && ch01Career.employmentPeriod.end.boundaryType === 'INTERVAL_OVERLAP',
  s3,
  'Graveiens career boundary is explicitly INTERVAL_OVERLAP'
)

const ch03Career = canonicalRegistry.careerRecords.find(c => c.careerId === 'car-digipplus')
assert(
  typeof ch03Career?.employmentPeriod.end === 'object' && ch03Career.employmentPeriod.end.dateString === '2022-09',
  s3,
  'DIGIPPLUS career ends in September 2022'
)

// ---------------------------------------------------------------------------
// SUITE 4: TECHNICAL METRIC GOVERNANCE & MANDATORY CAVEATS
// ---------------------------------------------------------------------------
const s4 = 'Suite 4: Technical Metric Governance'

// VM Copy Tier-1 <1ms caveat
assert(ch12 !== undefined, s4, 'Chapter 12 exists for metric checks')
if (ch12) {
  assert(ch12.canonicalClaimIds.includes('CLAIM-VM-001'), s4, 'Chapter 12 includes CLAIM-VM-001')
  const vmCaveat = ch12.grounding.governedMetricCaveats?.find(c => c.includes('<1ms'))
  assert(
    vmCaveat !== undefined && vmCaveat.includes('Tier-1') && vmCaveat.includes('LLM'),
    s4,
    'VM Copy caveat distinguishes Tier-1 <1ms from 4-8s LLM generation'
  )
}

// EDA CAD volume error software calculus caveat & 424 pytests
const ch18 = journalChapters.find(c => c.id === 'ch-18-design-automation')
assert(ch18 !== undefined, s4, 'Chapter 18 (CAD) exists')
if (ch18) {
  assert(ch18.canonicalClaimIds.includes('CLAIM-EDA-001'), s4, 'Chapter 18 includes CLAIM-EDA-001')
  assert(ch18.canonicalClaimIds.includes('CLAIM-EDA-002'), s4, 'Chapter 18 includes CLAIM-EDA-002')
  const cadCaveat = ch18.grounding.governedMetricCaveats?.find(c => c.includes('CNC'))
  assert(
    cadCaveat !== undefined && cadCaveat.includes('software calculus') && cadCaveat.includes('CNC'),
    s4,
    'CAD volume caveat distinguishes analytical software calculus from physical CNC tolerance'
  )
  const testCaveat = ch18.grounding.governedMetricCaveats?.find(c => c.includes('424'))
  assert(testCaveat !== undefined && testCaveat.includes('28 test suites'), s4, 'CAD caveat mentions 424 pytests across 28 suites')
}

// AI Reliability 158 backend test cases (not suites)
const ch19 = journalChapters.find(c => c.id === 'ch-19-ai-reliability')
assert(ch19 !== undefined, s4, 'Chapter 19 (AI Reliability) exists')
if (ch19) {
  assert(ch19.canonicalClaimIds.includes('CLAIM-RELIABILITY-001'), s4, 'Chapter 19 includes CLAIM-RELIABILITY-001')
  assert(ch19.canonicalClaimIds.includes('CLAIM-RELIABILITY-002'), s4, 'Chapter 19 includes CLAIM-RELIABILITY-002')
  const relCaveat = ch19.grounding.governedMetricCaveats?.find(c => c.includes('158'))
  assert(
    relCaveat !== undefined && relCaveat.includes('158 collected backend test cases'),
    s4,
    'AI Reliability caveat strictly specifies "158 collected backend test cases", not test suites'
  )
}

// OCR Evaluator: 134 pytests, 20 assertions
assert(ch20 !== undefined, s4, 'Chapter 20 (OCR) exists')
if (ch20) {
  assert(ch20.canonicalClaimIds.includes('CLAIM-OCR-001'), s4, 'Chapter 20 includes CLAIM-OCR-001')
  assert(ch20.canonicalClaimIds.includes('CLAIM-OCR-002'), s4, 'Chapter 20 includes CLAIM-OCR-002')
  const ocrCaveat = ch20.grounding.governedMetricCaveats?.find(c => c.includes('134'))
  assert(
    ocrCaveat !== undefined && ocrCaveat.includes('134 backend test functions') && ocrCaveat.includes('20 Playwright'),
    s4,
    'OCR Evaluator caveat specifies 134 test functions and 20 Playwright assertions'
  )
}

// Ask Aadil: 172 core checks and 327 harness assertions distinct
const ch21 = journalChapters.find(c => c.id === 'ch-21-ask-aadil')
assert(ch21 !== undefined, s4, 'Chapter 21 (Ask Aadil) exists')
if (ch21) {
  assert(ch21.canonicalClaimIds.includes('CLAIM-ASK-001'), s4, 'Chapter 21 includes CLAIM-ASK-001')
  assert(ch21.canonicalClaimIds.includes('CLAIM-ASK-002'), s4, 'Chapter 21 includes CLAIM-ASK-002')
  const askCaveat = ch21.grounding.governedMetricCaveats?.find(c => c.includes('172'))
  assert(
    askCaveat !== undefined && askCaveat.includes('172 core hardening checks') && askCaveat.includes('327 harness assertions'),
    s4,
    'Ask Aadil caveat distinguishes 172 core checks from 327 harness assertions'
  )
}

// Solace AI: 50 mobile checks caveat (Jest/tsc static mock, not physical Android device)
const ch22 = journalChapters.find(c => c.id === 'ch-22-solace-ai')
assert(ch22 !== undefined, s4, 'Chapter 22 (Solace AI) exists')
if (ch22) {
  assert(ch22.canonicalClaimIds.includes('CLAIM-SOLACE-001'), s4, 'Chapter 22 includes CLAIM-SOLACE-001')
  assert(ch22.canonicalClaimIds.includes('CLAIM-SOLACE-002'), s4, 'Chapter 22 includes CLAIM-SOLACE-002')
  const solaceCaveat = ch22.grounding.governedMetricCaveats?.find(c => c.includes('physical Android'))
  assert(
    solaceCaveat !== undefined && solaceCaveat.includes('physical Android or iOS devices'),
    s4,
    'Solace AI caveat explicitly states 50 checks execute under static Jest/tsc mock, not physical Android/iOS hardware'
  )
}

// AI Worksheets: ~2h manual vs ~3m POC comparison caveat
if (ch13) {
  const wsCaveat = ch13.grounding.governedMetricCaveats?.find(c => c.includes('2 hours'))
  assert(
    wsCaveat !== undefined && wsCaveat.includes('informal operational comparison') && wsCaveat.includes('not a controlled algorithmic benchmark'),
    s4,
    'AI Worksheets caveat states ~2h vs ~3m is an informal operational comparison, not a controlled benchmark'
  )
}

// ---------------------------------------------------------------------------
// SUITE 5: CONFIDENTIALITY & PUBLICATION SAFEGUARDS
// ---------------------------------------------------------------------------
const s5 = 'Suite 5: Confidentiality & Publication Safeguards'

const proprietaryChapters = [ch06, ch11, ch12, ch13, ch14, ch15]

for (const pCh of proprietaryChapters) {
  if (pCh) {
    assert(
      pCh.grounding.ownershipClassification?.publicUrl === null,
      s5,
      `Proprietary chapter ${pCh.id} publicUrl is strictly null`
    )
    assert(
      pCh.grounding.ownershipClassification?.isPrivateOrProprietary === true,
      s5,
      `Proprietary chapter ${pCh.id} isPrivateOrProprietary is true`
    )
    assert(
      pCh.grounding.ownershipClassification?.ipOwnership === 'EMPLOYER_PROPRIETARY',
      s5,
      `Proprietary chapter ${pCh.id} ipOwnership is EMPLOYER_PROPRIETARY`
    )
  }
}

// Public open source projects allow public URL
if (ch18 && ch19 && ch20) {
  assert(
    ch18.grounding.ownershipClassification?.isPrivateOrProprietary === false,
    s5,
    'EDA CAD chapter isPrivateOrProprietary is false'
  )
  assert(
    ch19.grounding.ownershipClassification?.isPrivateOrProprietary === false,
    s5,
    'AI Reliability chapter isPrivateOrProprietary is false'
  )
  assert(
    ch20.grounding.ownershipClassification?.isPrivateOrProprietary === false,
    s5,
    'OCR Evaluator chapter isPrivateOrProprietary is false'
  )
}

// ---------------------------------------------------------------------------
// SUITE 6: DETERMINISM, IMMUTABILITY & QUERY ISOLATION
// ---------------------------------------------------------------------------
const s6 = 'Suite 6: Determinism & Query Helpers'

// Deterministic outputs
const run1 = getGroundedJournalChapters()
const run2 = getGroundedJournalChapters()
assert(run1.length === run2.length, s6, 'Runs produce identical chapter counts')
assert(run1[0] !== run2[0], s6, 'Projections return fresh distinct instances (immutability)')
assert(JSON.stringify(run1) === JSON.stringify(run2), s6, 'Projections produce deep-equal deterministic output')

// Query by ID
const qId = getGroundedChapterById('ch-18-design-automation')
assert(qId !== undefined && qId.subtitle.includes('EDA CAD'), s6, 'getGroundedChapterById resolves correctly')

// Query by number
const qNum = getGroundedChapterByNumber('20')
assert(qNum !== undefined && qNum.connectedSystemSlug === 'ocr-evaluator', s6, 'getGroundedChapterByNumber resolves Chapter 20')

// Query by Project ID
const qProj = getGroundedChaptersByProjectId('proj-vm-copy')
assert(qProj.length === 2, s6, 'getGroundedChaptersByProjectId finds exactly 2 VM Copy chapters (11 and 12)')

// Query by Career ID
const qCareer = getGroundedChaptersByCareerId('car-wayground-aiml')
assert(qCareer.length > 0, s6, `getGroundedChaptersByCareerId finds chapters for car-wayground-aiml (found ${qCareer.length})`)

// Query by Claim ID
const qClaim = getGroundedChaptersByClaimId('CLAIM-EDA-001')
assert(qClaim.length === 1 && qClaim[0].id === 'ch-18-design-automation', s6, 'getGroundedChaptersByClaimId finds EDA CAD chapter')

// Query by Evidence ID
const qEvid = getGroundedChaptersByEvidenceId('EVID-VM-01')
assert(qEvid.length === 2, s6, 'getGroundedChaptersByEvidenceId finds 2 VM Copy chapters')

// ---------------------------------------------------------------------------
// SUITE 7: NEGATIVE INVARIANT & ADVERSARIAL VALIDATION
// ---------------------------------------------------------------------------
const s7 = 'Suite 7: Negative Invariant & Adversarial Validation'

// Adversarial test: Dangling careerId must fail validation
const badCareerChapter: GroundedJournalChapter = {
  ...run1[0],
  canonicalCareerIds: ['car-non-existent-career'],
  grounding: {
    ...run1[0].grounding,
    careerId: 'car-non-existent-career'
  }
}
const badCareerVal = validateJournalGrounding([badCareerChapter, ...run1.slice(1)])
assert(!badCareerVal.valid, s7, 'Validator rejects dangling careerId')
assert(badCareerVal.errors.some(e => e.includes('invalid careerId')), s7, 'Validator reports invalid careerId error')

// Adversarial test: Dangling projectId must fail validation
const badProjChapter: GroundedJournalChapter = {
  ...run1[0],
  canonicalProjectIds: ['proj-non-existent-project'],
  grounding: {
    ...run1[0].grounding,
    projectId: 'proj-non-existent-project'
  }
}
const badProjVal = validateJournalGrounding([badProjChapter, ...run1.slice(1)])
assert(!badProjVal.valid, s7, 'Validator rejects dangling projectId')
assert(badProjVal.errors.some(e => e.includes('invalid projectId')), s7, 'Validator reports invalid projectId error')

// Adversarial test: Leaked publicUrl on employer proprietary project must fail validation
const leakedProprietaryChapter: GroundedJournalChapter = {
  ...run1[10], // ch-11 (VM Copy)
  grounding: {
    ...run1[10].grounding,
    ownershipClassification: {
      ...run1[10].grounding.ownershipClassification!,
      publicUrl: 'https://github.com/wayground/vm-copy' // Adversarial leaked internal URL
    }
  }
}
const leakedVal = validateJournalGrounding([
  ...run1.slice(0, 10),
  leakedProprietaryChapter,
  ...run1.slice(11)
])
assert(!leakedVal.valid, s7, 'Validator rejects employer proprietary project with publicUrl')
assert(leakedVal.errors.some(e => e.includes('CONFIDENTIALITY LEAK')), s7, 'Validator reports CONFIDENTIALITY LEAK')

// Adversarial test: CLAIM-VM-001 without mandatory caveat must fail validation
const ungroundedVmChapter: GroundedJournalChapter = {
  ...run1[11], // ch-12 (VM Copy with claim)
  grounding: {
    ...run1[11].grounding,
    governedMetricCaveats: ['Some random unrelated caveat']
  }
}
const ungroundedVal = validateJournalGrounding([
  ...run1.slice(0, 11),
  ungroundedVmChapter,
  ...run1.slice(12)
])
assert(!ungroundedVal.valid, s7, 'Validator rejects CLAIM-VM-001 missing <1ms / LLM caveat')

// ---------------------------------------------------------------------------
// SUMMARY & VERDICT
// ---------------------------------------------------------------------------
console.log('\n' + '='.repeat(75))
console.log('TEST SUITE EXECUTION SUMMARY')
console.log('='.repeat(75))

const suites = Array.from(new Set(results.map(r => r.suite)))
let totalPassed = 0
let totalFailed = 0

for (const suite of suites) {
  const suiteResults = results.filter(r => r.suite === suite)
  const passed = suiteResults.filter(r => r.passed).length
  const failed = suiteResults.filter(r => !r.passed).length
  totalPassed += passed
  totalFailed += failed

  const icon = failed === 0 ? '✅' : '❌'
  console.log(`${icon} ${suite}: ${passed}/${suiteResults.length} passed`)
}

console.log('-'.repeat(75))
console.log(`TOTAL ASSERTIONS: ${results.length}`)
console.log(`PASSED:           ${totalPassed}`)
console.log(`FAILED:           ${totalFailed}`)
console.log('='.repeat(75))

if (totalFailed > 0) {
  console.error(`\n❌ VERIFICATION FAILED WITH ${totalFailed} FAILURES.`)
  process.exit(1)
} else {
  console.log('\n✅ ALL PHASE 2.4 JOURNAL GROUNDING INVARIANTS PASSED SUCCESSFULLY.')
}
