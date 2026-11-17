/**
 * FOCUSED CANONICAL REGISTRY INTEGRITY & VALIDATION TESTS (PHASE 1.2 HARDENED)
 *
 * Tests the Canonical Knowledge Foundation against all non-negotiable invariants:
 * - V-01: Strict Gregorian calendar-date validation (leap-year rules & exact month lengths)
 * - V-02: Mandatory structured metric governance (subject/scope compatibility & wording safeguards)
 * - V-03: Dimension orthogonality between organizational context and IP ownership
 * - V-04: Interval-overlap semantics (INTERVAL_OVERLAP) for October 2021 co-occurrence
 *
 * Execution: npx tsx scripts/test_canonical_registry.ts
 */

import {
  canonicalRegistry,
  getCaseStudyManifest,
  getAdrManifest
} from '../data/canonical/canonicalRegistry'
import { validateCanonicalRegistry } from '../data/canonical/canonicalValidator'
import {
  CanonicalCareerRecord,
  CanonicalProjectRecord,
  CanonicalTechnicalClaimRecord,
  CanonicalEvidenceRecord,
  CanonicalCaseStudyReference,
  CanonicalAdrReference,
  ALL_CASE_STUDY_IDS,
  ALL_ADR_IDS,
  CaseStudyId,
  AdrId
} from '../data/canonical/canonicalSchema'
import {
  getCaseStudiesForChapter,
  getGroundedJournalChapters
} from '../data/adapters/journalAdapter'

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

console.log('\n=================================================================')
console.log('CANONICAL REGISTRY & VALIDATION SUITE (PHASE 1.2 HARDENED)')
console.log('=================================================================\n')

// ----------------------------------------------------------------------------
// TEST SUITE 1: Canonical Registry Production Validation
// ----------------------------------------------------------------------------
console.log('Test Suite 1: Production Registry Invariant Validation')
const validation = validateCanonicalRegistry(canonicalRegistry)

assert(validation.isValid, 'Canonical registry passes full validation with zero errors', JSON.stringify(validation.errors))
assert(validation.errors.length === 0, `Error count is strictly 0 (found ${validation.errors.length})`)
assert(validation.stats.totalCareers === 7, `Contains exactly 7 canonical career records (found ${validation.stats.totalCareers})`)
assert(validation.stats.totalProjects === 12, `Contains exactly 12 project records (11 portfolio systems + Content Builder) (found ${validation.stats.totalProjects})`)
assert(validation.stats.totalClaims === 13, `Contains exactly 13 authoritative technical claims (found ${validation.stats.totalClaims})`)
assert(validation.stats.totalEvidence === 17, `Contains exactly 17 authoritative evidence records (found ${validation.stats.totalEvidence})`)
assert(validation.stats.totalCaseStudies === 8, `Contains exactly 8 canonical case-study references (found ${validation.stats.totalCaseStudies})`)
assert(validation.stats.totalAdrs === 23, `Contains exactly 23 canonical ADR references across case studies (found ${validation.stats.totalAdrs})`)

const validChapterIds = getGroundedJournalChapters().map(ch => ch.id)
const validationWithChapters = validateCanonicalRegistry(canonicalRegistry, { validChapterIds })
assert(validationWithChapters.isValid, 'Canonical registry passes full validation with chapter referential check', JSON.stringify(validationWithChapters.errors))

// ----------------------------------------------------------------------------
// TEST SUITE 2: Career Chronology & Transition Boundaries (V-04)
// ----------------------------------------------------------------------------
console.log('\nTest Suite 2: Career Chronology & Approved Baseline Invariants (V-04)')

const graveiens = canonicalRegistry.careerRecords.find(c => c.careerId === 'car-graveiens')
assert(graveiens !== undefined, 'Graveiens career record exists')
assert(
  graveiens?.employmentPeriod.end !== 'PRESENT' &&
  graveiens?.employmentPeriod.end !== 'ONGOING' &&
  graveiens?.employmentPeriod.end?.dateString === '2021-10',
  'Graveiens approved end date is 2021-10 (October 2021)'
)
assert(
  graveiens?.employmentPeriod.end !== 'PRESENT' &&
  graveiens?.employmentPeriod.end !== 'ONGOING' &&
  graveiens?.employmentPeriod.end?.boundaryType === 'INTERVAL_OVERLAP',
  'Graveiens end date boundaryType is explicitly classified as INTERVAL_OVERLAP (V-04)'
)

const inhaltmart = canonicalRegistry.careerRecords.find(c => c.careerId === 'car-inhaltmart')
assert(inhaltmart !== undefined, 'InhaltMart career record exists')
assert(
  inhaltmart?.employmentPeriod.start.dateString === '2021-10',
  'InhaltMart approved start date is 2021-10 (October 2021)'
)
assert(
  inhaltmart?.employmentPeriod.start.boundaryType === 'INTERVAL_OVERLAP',
  'InhaltMart start date boundaryType is explicitly classified as INTERVAL_OVERLAP (V-04)'
)
assert(
  inhaltmart?.employmentPeriod.end !== 'PRESENT' &&
  inhaltmart?.employmentPeriod.end !== 'ONGOING' &&
  inhaltmart?.employmentPeriod.end.dateString === '2022-02',
  'InhaltMart approved end date is 2022-02 (February 2022, not December 2021)'
)

const digipplus = canonicalRegistry.careerRecords.find(c => c.careerId === 'car-digipplus')
assert(digipplus !== undefined, 'DIGIPPLUS career record exists')
assert(digipplus?.employmentPeriod.start.dateString === '2022-06', 'DIGIPPLUS approved start is 2022-06 (June 2022, not July 2022)')
assert(
  digipplus?.employmentPeriod.end !== 'PRESENT' &&
  digipplus?.employmentPeriod.end !== 'ONGOING' &&
  digipplus?.employmentPeriod.end.dateString === '2022-09',
  'DIGIPPLUS approved end is 2022-09 (September 2022)'
)

const independentQuant = canonicalRegistry.careerRecords.find(c => c.careerId === 'car-independent-quantitative')
assert(independentQuant !== undefined, 'Independent Quantitative record exists')
assert(
  independentQuant?.employmentPeriod.start.boundaryType === 'TRANSITION_WINDOW',
  'Phase 2 start in September 2022 is explicitly classified as TRANSITION_WINDOW'
)

// ----------------------------------------------------------------------------
// TEST SUITE 3: Evidence Provenance & Metadata Classification (F-04)
// ----------------------------------------------------------------------------
console.log('\nTest Suite 3: Evidence Provenance & Metadata Classification (F-04)')

const evidVm01 = canonicalRegistry.evidenceRecords.find(e => e.evidenceId === 'EVID-VM-01')
assert(evidVm01 !== undefined, 'EVID-VM-01 evidence record exists')
assert(evidVm01?.evidenceType === 'SOURCE_INVENTORY', 'EVID-VM-01 evidenceType is SOURCE_INVENTORY')
assert(
  evidVm01?.disclosedLimitations.some(l => l.toLowerCase().includes('source establishes canonical metadata inventory')) ?? false,
  'EVID-VM-01 limitations explicitly state metadata inventory, not live profiling trace'
)

const evidWs01 = canonicalRegistry.evidenceRecords.find(e => e.evidenceId === 'EVID-WS-01')
assert(evidWs01 !== undefined, 'EVID-WS-01 evidence record exists')
assert(evidWs01?.evidenceType === 'SOURCE_INVENTORY', 'EVID-WS-01 evidenceType is SOURCE_INVENTORY')
assert(
  evidWs01?.disclosedLimitations.some(l => l.toLowerCase().includes('source establishes canonical metadata inventory')) ?? false,
  'EVID-WS-01 limitations explicitly state metadata inventory, not live benchmark harness'
)

// ----------------------------------------------------------------------------
// TEST SUITE 4: VM Copy Provenance & Decoupled Milestones
// ----------------------------------------------------------------------------
console.log('\nTest Suite 4: VM Copy Provenance, Timing & Causal Boundaries')

const vmCopy = canonicalRegistry.projectRecords.find(p => p.slug === 'vm-copy')
assert(vmCopy !== undefined, 'VM Copy project record exists')
assert(vmCopy?.implementationAuthorship === 'SOLE_IMPLEMENTER', 'VM Copy implementationAuthorship is SOLE_IMPLEMENTER')
assert(vmCopy?.architecturalResponsibility === 'PRIMARY_ARCHITECT', 'VM Copy architecturalResponsibility is PRIMARY_ARCHITECT')
assert(vmCopy?.requirementsOrigin === 'SELF_DIRECTED_INITIATIVE', 'VM Copy requirementsOrigin is SELF_DIRECTED_INITIATIVE')
assert(vmCopy?.organizationalContext === 'COMPANY_EMPLOYMENT', 'VM Copy organizationalContext is COMPANY_EMPLOYMENT (Employer internal)')
assert(vmCopy?.ipOwnership === 'EMPLOYER_PROPRIETARY', 'VM Copy ipOwnership is EMPLOYER_PROPRIETARY')
assert(vmCopy?.publicationEligibility === 'EMPLOYER_PROPRIETARY_CASE_STUDY', 'VM Copy publicationEligibility is EMPLOYER_PROPRIETARY_CASE_STUDY')
assert(vmCopy?.repository.publicUrl === null, 'VM Copy publicUrl is strictly null (proprietary code)')

// Timing separation
const vmDevStart = vmCopy?.temporalRegistry.developmentWindow.start.dateString
const vmDevEnd = vmCopy?.temporalRegistry.developmentWindow.end !== 'PRESENT' && vmCopy?.temporalRegistry.developmentWindow.end !== 'ONGOING' ? vmCopy?.temporalRegistry.developmentWindow.end.dateString : null
const vmUsageStart = vmCopy?.temporalRegistry.internalTeamUsageWindow?.start.dateString

assert(vmDevStart === '2025-10', 'VM Copy development started October 2025')
assert(vmDevEnd === '2025-11', 'VM Copy development completed November 2025 (mid-November)')
assert(vmUsageStart === '2025-11', 'VM Copy team adoption began November 2025 onward')
assert(vmCopy?.temporalRegistry.formalDeploymentDate === undefined, 'VM Copy formal deployment date is undefined (not independently established)')

// Career transfer causal flag
const waygroundSme = canonicalRegistry.careerRecords.find(c => c.careerId === 'car-wayground-math-sme')
assert(
  waygroundSme?.transitionContext?.isCausalClaimFormallyVerified === false,
  'VM Copy transfer causality is flagged as isCausalClaimFormallyVerified: false (ASSERTED_CAREER_NARRATIVE)'
)

// VoyageMath Content Builder Authorship Safeguard
const contentBuilder = canonicalRegistry.projectRecords.find(p => p.slug === 'voyagemath-content-builder')
assert(contentBuilder !== undefined, 'Content Builder record exists in registry')
assert(contentBuilder?.implementationAuthorship === 'COLLABORATIVE_CONTRIBUTOR', 'Content Builder implementationAuthorship is COLLABORATIVE_CONTRIBUTOR')
assert(contentBuilder?.architecturalResponsibility === 'DIRECTED_ARCHITECTURE', 'Content Builder architecturalResponsibility is DIRECTED_ARCHITECTURE')
assert(contentBuilder?.contributionBreakdown?.authorRole.includes('SME') ?? false, 'Content Builder role explicitly states SME tester / advisor')
assert(
  contentBuilder?.contributionBreakdown?.stakeholderOrTeamNotes?.toLowerCase().includes('voyagemath engineering team') ?? false,
  'Notes explicitly attribute software engineering to VoyageMath Engineering team'
)

// ----------------------------------------------------------------------------
// TEST SUITE 5: Technical Metrics Qualification & Governance (V-02)
// ----------------------------------------------------------------------------
console.log('\nTest Suite 5: Technical Metrics Qualification & Governance (V-02)')

// Check all claims have metricSubject and measurementScope defined
const claimsWithSubject = canonicalRegistry.claimRecords.filter(c => c.metricSubject !== undefined)
assert(
  claimsWithSubject.length === canonicalRegistry.claimRecords.length,
  `All 13 canonical claims have metricSubject defined (${claimsWithSubject.length}/13)`
)
const claimsWithScope = canonicalRegistry.claimRecords.filter(c => c.measurementScope !== undefined)
assert(
  claimsWithScope.length === canonicalRegistry.claimRecords.length,
  `All 13 canonical claims have measurementScope defined (${claimsWithScope.length}/13)`
)

const edaVolumeClaim = canonicalRegistry.claimRecords.find(c => c.claimId === 'CLAIM-EDA-002')
assert(edaVolumeClaim !== undefined, 'EDA CAD volume claim exists')
assert(edaVolumeClaim?.verificationStatus === 'PARTIALLY_VERIFIED', 'EDA CAD volume claim is PARTIALLY_VERIFIED')
assert(
  edaVolumeClaim?.wording.mandatoryCaveats.some(c => c.toLowerCase().includes('cnc')) ?? false,
  'EDA CAD volume claim includes mandatory caveat distinguishing software calculus from physical CNC tolerance'
)

const vmLatencyClaim = canonicalRegistry.claimRecords.find(c => c.claimId === 'CLAIM-VM-001')
assert(vmLatencyClaim !== undefined, 'VM Copy latency claim exists')
assert(vmLatencyClaim?.verificationStatus === 'PARTIALLY_VERIFIED', 'VM Copy latency claim is PARTIALLY_VERIFIED')
assert(
  vmLatencyClaim?.wording.mandatoryCaveats.some(c => c.toLowerCase().includes('tier-1')) ?? false,
  'VM Copy latency claim mandatory caveat distinguishes Tier-1 eval from 4-8s LLM calls'
)

const solaceMobileClaim = canonicalRegistry.claimRecords.find(c => c.claimId === 'CLAIM-SOLACE-002')
assert(solaceMobileClaim !== undefined, 'Solace AI mobile claim exists')
assert(
  solaceMobileClaim?.wording.mandatoryCaveats.some(c => c.toLowerCase().includes('android device')) ?? false,
  'Solace AI mobile claim explicitly caveats that checks do not represent physical Android device execution'
)

const askAadilChecksClaim = canonicalRegistry.claimRecords.find(c => c.claimId === 'CLAIM-ASK-001')
const askAadilAssertionsClaim = canonicalRegistry.claimRecords.find(c => c.claimId === 'CLAIM-ASK-002')
assert(askAadilChecksClaim?.verificationStatus === 'REPRODUCIBLY_VERIFIED', 'Ask Aadil 172 checks claim is REPRODUCIBLY_VERIFIED')
assert(askAadilAssertionsClaim?.verificationStatus === 'REPRODUCIBLY_VERIFIED', 'Ask Aadil 327 assertions claim is REPRODUCIBLY_VERIFIED')
assert(askAadilChecksClaim?.wording.headline.includes('172') ?? false, '172 check count is preserved')
assert(askAadilAssertionsClaim?.wording.headline.includes('327') ?? false, '327 assertion count is preserved')

const reliabilityClaim = canonicalRegistry.claimRecords.find(c => c.claimId === 'CLAIM-RELIABILITY-001')
assert(
  !(reliabilityClaim?.wording.headline.toLowerCase().includes('test suites') ?? false),
  'AI Reliability 158 claim headline does NOT use "test suites" (uses test cases)'
)

// ----------------------------------------------------------------------------
// TEST SUITE 6: Negative Invariant Validator Rejections (V-01, V-02, V-03, V-04)
// ----------------------------------------------------------------------------
console.log('\nTest Suite 6: Negative Invariant Validator Rejections & Resilience')

// Negative Test 1: Proprietary project with public URL must be rejected
const invalidProjectWithUrl: CanonicalProjectRecord = {
  ...vmCopy!,
  projectId: 'invalid-test-proj-url',
  publicationEligibility: 'EMPLOYER_PROPRIETARY_CASE_STUDY',
  repository: {
    publicUrl: 'https://github.com/aadil-lang/private-repo',
    isPrivateOrProprietary: true,
    caseStudyRoute: '/projects/invalid'
  }
}
const testRegistryBadUrl = {
  ...canonicalRegistry,
  projectRecords: [...canonicalRegistry.projectRecords, invalidProjectWithUrl]
}
const badUrlValidation = validateCanonicalRegistry(testRegistryBadUrl)
assert(!badUrlValidation.isValid, 'Validator catches non-PUBLIC_OPEN_SOURCE project with publicUrl')
assert(
  badUrlValidation.errors.some(e => e.rule === 'PROPRIETARY_URL_RESTRICTION'),
  'Validator reports PROPRIETARY_URL_RESTRICTION error'
)

// Negative Test 2: Content Builder with SOLE_IMPLEMENTER must be rejected
const invalidContentBuilder: CanonicalProjectRecord = {
  ...contentBuilder!,
  projectId: 'invalid-content-builder',
  implementationAuthorship: 'SOLE_IMPLEMENTER'
}
const testRegistryBadCb = {
  ...canonicalRegistry,
  projectRecords: [...canonicalRegistry.projectRecords, invalidContentBuilder]
}
const badCbValidation = validateCanonicalRegistry(testRegistryBadCb)
assert(!badCbValidation.isValid, 'Validator rejects Content Builder with SOLE_IMPLEMENTER')
assert(
  badCbValidation.errors.some(e => e.rule === 'CONTENT_BUILDER_RESTRICTION'),
  'Validator reports CONTENT_BUILDER_RESTRICTION error'
)

// Negative Test 3: PARTIALLY_VERIFIED claim without mandatory caveats must be rejected
const invalidClaimWithoutCaveats: CanonicalTechnicalClaimRecord = {
  ...edaVolumeClaim!,
  claimId: 'CLAIM-BAD-001',
  verificationStatus: 'PARTIALLY_VERIFIED',
  wording: {
    headline: 'Unqualified claim',
    qualifiedTechnicalStatement: 'Some statement without caveat',
    mandatoryCaveats: [], // Empty caveats!
    prohibitedInterpretations: []
  }
}
const testRegistryBadClaim = {
  ...canonicalRegistry,
  claimRecords: [...canonicalRegistry.claimRecords, invalidClaimWithoutCaveats]
}
const badClaimValidation = validateCanonicalRegistry(testRegistryBadClaim)
assert(!badClaimValidation.isValid, 'Validator rejects PARTIALLY_VERIFIED claim without mandatory caveats')
assert(
  badClaimValidation.errors.some(e => e.rule === 'MANDATORY_CAVEATS_REQUIRED'),
  'Validator reports MANDATORY_CAVEATS_REQUIRED error'
)

// Negative Test 4: Inverted temporal interval (start > end) must be rejected
const invertedCareer: CanonicalCareerRecord = {
  ...digipplus!,
  careerId: 'car-inverted-test',
  employmentPeriod: {
    start: {
      dateString: '2024-05',
      precision: 'month',
      confirmationStatus: 'INDEPENDENTLY_VERIFIED',
      boundaryType: 'EXACT_BOUNDARY'
    },
    end: {
      dateString: '2023-01', // End is BEFORE start!
      precision: 'month',
      confirmationStatus: 'INDEPENDENTLY_VERIFIED',
      boundaryType: 'EXACT_BOUNDARY'
    }
  }
}
const testRegistryInverted = {
  ...canonicalRegistry,
  careerRecords: [...canonicalRegistry.careerRecords, invertedCareer]
}
const invertedValidation = validateCanonicalRegistry(testRegistryInverted)
assert(!invertedValidation.isValid, 'Validator rejects career record with inverted temporal interval')
assert(
  invertedValidation.errors.some(e => e.rule === 'TEMPORAL_ORDER_INVERTED'),
  'Validator reports TEMPORAL_ORDER_INVERTED error'
)

// Negative Test 5: Strict Gregorian calendar validation (V-01)
const impossibleDates = [
  '2023-02-29', // Non-leap year Feb 29
  '2022-02-31', // Feb 31
  '2022-04-31', // April 31
  '2024-13-01', // Month 13
  '2024-00-01', // Month 00
  '2024-01-00', // Day 00
  '2024-01-32', // Day 32
  '2024-2-01',  // Non-padded month
  '2024-02-1'   // Non-padded day
]

let allImpossibleDatesRejected = true
for (const impDate of impossibleDates) {
  const badDateCareer: CanonicalCareerRecord = {
    ...digipplus!,
    careerId: `car-test-${impDate.replace(/[^a-zA-Z0-9]/g, '_')}`,
    employmentPeriod: {
      start: {
        dateString: impDate,
        precision: impDate.length === 10 ? 'day' : 'month',
        confirmationStatus: 'INDEPENDENTLY_VERIFIED',
        boundaryType: 'EXACT_BOUNDARY'
      },
      end: 'PRESENT'
    }
  }
  const testReg = { ...canonicalRegistry, careerRecords: [...canonicalRegistry.careerRecords, badDateCareer] }
  const res = validateCanonicalRegistry(testReg)
  if (res.isValid || !res.errors.some(e => e.rule === 'INVALID_DATE_FORMAT')) {
    allImpossibleDatesRejected = false
    console.error(`Failed to reject impossible date: ${impDate}`)
  }
}
assert(allImpossibleDatesRejected, 'Validator rejects all impossible Gregorian dates & malformed formats (V-01)')

// Negative Test 6: Orthogonality & Wayground Identity Protection (V-03 & A-01)
// A01-01: Protected Wayground ID + original slug + PERSONAL_PROPRIETARY -> Rejected
const a01_01_proj: CanonicalProjectRecord = {
  ...vmCopy!,
  projectId: 'proj-vm-copy',
  slug: 'vm-copy',
  ipOwnership: 'PERSONAL_PROPRIETARY'
}
const resA01_01 = validateCanonicalRegistry({
  ...canonicalRegistry,
  projectRecords: canonicalRegistry.projectRecords.map(p => p.projectId === 'proj-vm-copy' ? a01_01_proj : p)
})
assert(!resA01_01.isValid, 'A01-01: Rejects Wayground ID with original slug claiming PERSONAL_PROPRIETARY')
assert(
  resA01_01.errors.some(e => e.entityId === 'proj-vm-copy' && e.rule === 'WAYGROUND_PROPRIETARY_RESTRICTION'),
  'A01-01: Reports WAYGROUND_PROPRIETARY_RESTRICTION'
)

// A01-02: Protected Wayground ID + mutated slug ('vm-copy-v2') + PERSONAL_PROPRIETARY -> Rejected (Finding A-01 fix)
const a01_02_proj: CanonicalProjectRecord = {
  ...vmCopy!,
  projectId: 'proj-vm-copy',
  slug: 'vm-copy-v2', // Mutated slug!
  ipOwnership: 'PERSONAL_PROPRIETARY'
}
const resA01_02 = validateCanonicalRegistry({
  ...canonicalRegistry,
  projectRecords: canonicalRegistry.projectRecords.map(p => p.projectId === 'proj-vm-copy' ? a01_02_proj : p)
})
assert(!resA01_02.isValid, 'A01-02: Rejects Wayground ID with mutated slug claiming PERSONAL_PROPRIETARY (A-01 fix)')
assert(
  resA01_02.errors.some(e => e.entityId === 'proj-vm-copy' && e.rule === 'WAYGROUND_PROPRIETARY_RESTRICTION'),
  'A01-02: Reports WAYGROUND_PROPRIETARY_RESTRICTION despite slug mutation'
)

// A01-03: Mutated/unrecognized ID + original protected slug ('vm-copy') + PERSONAL_PROPRIETARY -> Rejected
const a01_03_proj: CanonicalProjectRecord = {
  ...vmCopy!,
  projectId: 'proj-unrecognized-999',
  slug: 'vm-copy', // Protected slug!
  ipOwnership: 'PERSONAL_PROPRIETARY'
}
const resA01_03 = validateCanonicalRegistry({
  ...canonicalRegistry,
  projectRecords: [...canonicalRegistry.projectRecords, a01_03_proj]
})
assert(!resA01_03.isValid, 'A01-03: Rejects unrecognized project ID with protected slug claiming PERSONAL_PROPRIETARY')
assert(
  resA01_03.errors.some(e => e.entityId === 'proj-unrecognized-999' && e.rule === 'WAYGROUND_PROPRIETARY_RESTRICTION'),
  'A01-03: Reports WAYGROUND_PROPRIETARY_RESTRICTION on protected slug retention'
)

// A01-04: Unrelated project ID + unrelated slug + PERSONAL_PROPRIETARY -> Permitted (Orthogonality preserved)
const a01_04_proj: CanonicalProjectRecord = {
  ...vmCopy!,
  projectId: 'proj-generic-carveout',
  slug: 'generic-carveout-tool',
  title: 'Generic Carveout Tool',
  tagline: 'Tool developed under company employment with personal IP carveout',
  associatedCareerId: 'car-digipplus',
  organizationalContext: 'COMPANY_EMPLOYMENT',
  ipOwnership: 'PERSONAL_PROPRIETARY', // Permitted by orthogonality!
  publicationEligibility: 'PERSONAL_PROPRIETARY',
  repository: { publicUrl: null, isPrivateOrProprietary: true, caseStudyRoute: '/projects/generic' }
}
const resA01_04 = validateCanonicalRegistry({
  ...canonicalRegistry,
  projectRecords: [...canonicalRegistry.projectRecords, a01_04_proj]
})
const a01_04_errors = resA01_04.errors.filter(e => e.entityId === 'proj-generic-carveout')
assert(a01_04_errors.length === 0, 'A01-04: Accepts generic COMPANY_EMPLOYMENT project with PERSONAL_PROPRIETARY IP (Orthogonality)')

// A01-05: Protected Wayground ID + mutated slug + valid EMPLOYER_PROPRIETARY -> Permitted
const a01_05_proj: CanonicalProjectRecord = {
  ...vmCopy!,
  projectId: 'proj-vm-copy',
  slug: 'vm-copy-v2',
  ipOwnership: 'EMPLOYER_PROPRIETARY'
}
const resA01_05 = validateCanonicalRegistry({
  ...canonicalRegistry,
  projectRecords: canonicalRegistry.projectRecords.map(p => p.projectId === 'proj-vm-copy' ? a01_05_proj : p)
})
const a01_05_errors = resA01_05.errors.filter(e => e.entityId === 'proj-vm-copy')
assert(a01_05_errors.length === 0, 'A01-05: Accepts Wayground ID with mutated slug under valid EMPLOYER_PROPRIETARY IP')

// A01-06: Protected Wayground ID + original slug + EMPLOYER_PROPRIETARY -> Permitted
const a01_06_proj: CanonicalProjectRecord = {
  ...vmCopy!,
  projectId: 'proj-vm-copy',
  slug: 'vm-copy',
  ipOwnership: 'EMPLOYER_PROPRIETARY'
}
const resA01_06 = validateCanonicalRegistry({
  ...canonicalRegistry,
  projectRecords: canonicalRegistry.projectRecords.map(p => p.projectId === 'proj-vm-copy' ? a01_06_proj : p)
})
const a01_06_errors = resA01_06.errors.filter(e => e.entityId === 'proj-vm-copy')
assert(a01_06_errors.length === 0, 'A01-06: Accepts Wayground ID with original slug under EMPLOYER_PROPRIETARY IP')

// A01-07: Exhaustive check across all 5 Wayground enterprise projects
const waygroundEnterprisePairs = [
  { id: 'proj-vm-copy', slug: 'vm-copy' },
  { id: 'proj-content-builder', slug: 'voyagemath-content-builder' },
  { id: 'proj-ai-worksheets', slug: 'ai-worksheets' },
  { id: 'proj-curriculum-etl', slug: 'curriculum-etl' },
  { id: 'proj-item-bank', slug: 'us-mathematics-item-bank' }
]

let allWaygroundMutationsRejected = true
for (const wg of waygroundEnterprisePairs) {
  // Test slug mutation
  const mutSlugProj: CanonicalProjectRecord = {
    ...vmCopy!,
    projectId: wg.id,
    slug: `${wg.slug}-mutated-slug`,
    ipOwnership: 'PERSONAL_PROPRIETARY'
  }
  const resMutSlug = validateCanonicalRegistry({
    ...canonicalRegistry,
    projectRecords: canonicalRegistry.projectRecords.map(p => p.projectId === wg.id ? mutSlugProj : p)
  })
  if (resMutSlug.isValid || !resMutSlug.errors.some(e => e.entityId === wg.id && e.rule === 'WAYGROUND_PROPRIETARY_RESTRICTION')) {
    allWaygroundMutationsRejected = false
    console.error(`Failed to reject slug-mutated Wayground project: ${wg.id}`)
  }

  // Test ID mutation
  const mutIdProj: CanonicalProjectRecord = {
    ...vmCopy!,
    projectId: `${wg.id}-mutated-id`,
    slug: wg.slug,
    ipOwnership: 'PERSONAL_PROPRIETARY'
  }
  const resMutId = validateCanonicalRegistry({
    ...canonicalRegistry,
    projectRecords: [...canonicalRegistry.projectRecords, mutIdProj]
  })
  if (resMutId.isValid || !resMutId.errors.some(e => e.entityId === `${wg.id}-mutated-id` && e.rule === 'WAYGROUND_PROPRIETARY_RESTRICTION')) {
    allWaygroundMutationsRejected = false
    console.error(`Failed to reject ID-mutated Wayground project: ${wg.slug}`)
  }
}
assert(allWaygroundMutationsRejected, 'A01-07: Rejects all 5 Wayground enterprise projects under both slug mutation and ID mutation')

// Negative Test 7: Adversarial metric relabeling bypass (F-02)
const adversarialCadClaim: CanonicalTechnicalClaimRecord = {
  claimId: 'CLAIM-ADVERSARIAL-CAD-999',
  projectId: 'proj-eda-geometry',
  metricSubject: 'CAD_GEOMETRY_VOLUME_ACCURACY',
  measurementScope: 'ANALYTICAL_PRIMITIVE_CALCULUS',
  claimDomain: 'ACCURACY',
  verificationStatus: 'SOURCE_VERIFIED',
  permittedSurfaces: ['SYSTEMS_CASE_STUDY'],
  wording: {
    headline: '0.0000% volume error achieved',
    qualifiedTechnicalStatement: 'Analytical boundary integral evaluation demonstrates 0.0000% error relative to Brep solids.',
    mandatoryCaveats: ['Pure mathematical computation without hardware considerations.'], // Lacks explicit CNC disclaimer!
    prohibitedInterpretations: []
  },
  linkedEvidenceIds: ['EVID-EDA-01']
}
const testRegistryAdvCad = {
  ...canonicalRegistry,
  claimRecords: [...canonicalRegistry.claimRecords, adversarialCadClaim]
}
const advCadValidation = validateCanonicalRegistry(testRegistryAdvCad)
assert(!advCadValidation.isValid, 'Validator rejects CAD volume claim without CNC caveat even if SOURCE_VERIFIED (F-02)')
assert(
  advCadValidation.errors.some(e => e.rule === 'EDA_CAD_CAVEAT_REQUIRED'),
  'Validator reports EDA_CAD_CAVEAT_REQUIRED error on adversarial bypass attempt'
)

// Negative Test 8: Adversarial claim ID change bypass (F-02)
const adversarialLatencyClaim: CanonicalTechnicalClaimRecord = {
  claimId: 'CLAIM-ADVERSARIAL-LATENCY-888',
  projectId: 'proj-vm-copy',
  metricSubject: 'DETERMINISTIC_EVALUATION_LATENCY',
  measurementScope: 'IN_MEMORY_DETERMINISTIC_GATE',
  claimDomain: 'LATENCY',
  verificationStatus: 'REPRODUCIBLY_VERIFIED',
  permittedSurfaces: ['SYSTEMS_CASE_STUDY'],
  wording: {
    headline: '< 1ms deterministic evaluation at $0 cost',
    qualifiedTechnicalStatement: 'Regex and uniqueness rules execute in sub-millisecond time.',
    mandatoryCaveats: ['Requires optimized local memory.'], // Missing Tier-1 and LLM distinction!
    prohibitedInterpretations: []
  },
  linkedEvidenceIds: ['EVID-VM-01']
}
const testRegistryAdvLatency = {
  ...canonicalRegistry,
  claimRecords: [...canonicalRegistry.claimRecords, adversarialLatencyClaim]
}
const advLatencyValidation = validateCanonicalRegistry(testRegistryAdvLatency)
assert(!advLatencyValidation.isValid, 'Validator rejects <1ms latency claim without Tier-1/LLM caveats under arbitrary claim ID (F-02)')
assert(
  advLatencyValidation.errors.some(e => e.rule === 'VM_COPY_CAVEAT_REQUIRED'),
  'Validator reports VM_COPY_CAVEAT_REQUIRED error on adversarial bypass attempt'
)

// Negative Test 9: October 2021 Semantics Rejections (V-04)
// A: October 2021 as TRANSITION_WINDOW -> Rejected
const octTransitionCareer: CanonicalCareerRecord = {
  ...inhaltmart!,
  careerId: 'car-inhaltmart-oct-trans',
  employmentPeriod: {
    start: {
      dateString: '2021-10',
      precision: 'month',
      confirmationStatus: 'INDEPENDENTLY_VERIFIED',
      boundaryType: 'TRANSITION_WINDOW' // Rejected!
    },
    end: inhaltmart!.employmentPeriod.end
  }
}
const testRegOctTrans = {
  ...canonicalRegistry,
  careerRecords: canonicalRegistry.careerRecords.map(c => c.careerId === 'car-inhaltmart' ? octTransitionCareer : c)
}
const resOctTrans = validateCanonicalRegistry(testRegOctTrans)
assert(!resOctTrans.isValid, 'Validator rejects October 2021 classified as TRANSITION_WINDOW (V-04)')
assert(
  resOctTrans.errors.some(e => e.rule === 'OCTOBER_2021_SEMANTICS_RESTRICTION'),
  'Validator reports OCTOBER_2021_SEMANTICS_RESTRICTION for TRANSITION_WINDOW'
)

// B: October 2021 as OVERLAPPING_ACTIVITY -> Rejected (Must use INTERVAL_OVERLAP!)
const octOverlappingCareer: CanonicalCareerRecord = {
  ...inhaltmart!,
  careerId: 'car-inhaltmart-oct-overlap',
  employmentPeriod: {
    start: {
      dateString: '2021-10',
      precision: 'month',
      confirmationStatus: 'INDEPENDENTLY_VERIFIED',
      boundaryType: 'OVERLAPPING_ACTIVITY' // Rejected without evidence of actual concurrency!
    },
    end: inhaltmart!.employmentPeriod.end
  }
}
const testRegOctOverlap = {
  ...canonicalRegistry,
  careerRecords: canonicalRegistry.careerRecords.map(c => c.careerId === 'car-inhaltmart' ? octOverlappingCareer : c)
}
const resOctOverlap = validateCanonicalRegistry(testRegOctOverlap)
assert(!resOctOverlap.isValid, 'Validator rejects October 2021 classified as OVERLAPPING_ACTIVITY without evidence (V-04)')
assert(
  resOctOverlap.errors.some(e => e.rule === 'OCTOBER_2021_SEMANTICS_RESTRICTION'),
  'Validator reports OCTOBER_2021_SEMANTICS_RESTRICTION for OVERLAPPING_ACTIVITY'
)

// Negative Test 10: Metadata citation classified as BENCHMARK_MEASUREMENT (F-04)
const badMetadataEvidence: CanonicalEvidenceRecord = {
  evidenceId: 'EVID-TEST-METADATA-BAD',
  projectId: 'proj-vm-copy',
  evidenceType: 'BENCHMARK_MEASUREMENT',
  repositoryPathOrArtifact: 'data/canonical/projectsMetadata.ts',
  measuredValue: '< 1ms',
  measuredUnit: 'ms',
  executionStatus: 'PASS',
  disclosedScope: 'Metadata check',
  disclosedLimitations: [],
  auditDate: '2026-11-15',
  auditorSignoff: 'Auditor'
}
const testRegistryBadEvid = {
  ...canonicalRegistry,
  evidenceRecords: [...canonicalRegistry.evidenceRecords, badMetadataEvidence]
}
const badEvidValidation = validateCanonicalRegistry(testRegistryBadEvid)
assert(!badEvidValidation.isValid, 'Validator rejects metadata file classified as BENCHMARK_MEASUREMENT (F-04)')
assert(
  badEvidValidation.errors.some(e => e.rule === 'METADATA_PROVENANCE_CLASSIFICATION'),
  'Validator reports METADATA_PROVENANCE_CLASSIFICATION error'
)

// Negative Test 11: Malformed record resilience without uncaught TypeError (F-03)
const malformedClaim: any = {
  claimId: 'CLAIM-MALFORMED-CRASH-TEST',
  projectId: 'proj-vm-copy',
  linkedEvidenceIds: null
}
const testRegistryMalformed = {
  ...canonicalRegistry,
  claimRecords: [...canonicalRegistry.claimRecords, malformedClaim]
}
let malformedCrashed = false
let malformedValidation: any = null
try {
  malformedValidation = validateCanonicalRegistry(testRegistryMalformed)
} catch (err) {
  malformedCrashed = true
}
assert(!malformedCrashed, 'Validator does not throw uncaught TypeError on malformed record (F-03)')
assert(!malformedValidation?.isValid, 'Validator returns structured errors for malformed record')

// Negative Test 12: Missing metricSubject on quantitative claim (V-02)
const missingSubjectClaim: CanonicalTechnicalClaimRecord = {
  ...edaVolumeClaim!,
  claimId: 'CLAIM-TEST-MISSING-SUBJECT',
  metricSubject: undefined,
  measurementScope: 'ANALYTICAL_PRIMITIVE_CALCULUS'
}
const testRegMissingSubject = { ...canonicalRegistry, claimRecords: [...canonicalRegistry.claimRecords, missingSubjectClaim] }
const resMissingSubject = validateCanonicalRegistry(testRegMissingSubject)
assert(!resMissingSubject.isValid, 'Validator rejects quantitative claim missing metricSubject (V-02)')
assert(
  resMissingSubject.errors.some(e => e.rule === 'METRIC_SUBJECT_REQUIRED'),
  'Validator reports METRIC_SUBJECT_REQUIRED error'
)

// Negative Test 13: Missing measurementScope on quantitative claim (V-02)
const missingScopeClaim: CanonicalTechnicalClaimRecord = {
  ...edaVolumeClaim!,
  claimId: 'CLAIM-TEST-MISSING-SCOPE',
  metricSubject: 'CAD_GEOMETRY_VOLUME_ACCURACY',
  measurementScope: undefined
}
const testRegMissingScope = { ...canonicalRegistry, claimRecords: [...canonicalRegistry.claimRecords, missingScopeClaim] }
const resMissingScope = validateCanonicalRegistry(testRegMissingScope)
assert(!resMissingScope.isValid, 'Validator rejects quantitative claim missing measurementScope (V-02)')
assert(
  resMissingScope.errors.some(e => e.rule === 'MEASUREMENT_SCOPE_REQUIRED'),
  'Validator reports MEASUREMENT_SCOPE_REQUIRED error'
)

// Negative Test 14: Incompatible subject/scope combination (V-02)
const incompatibleScopeClaim: CanonicalTechnicalClaimRecord = {
  ...edaVolumeClaim!,
  claimId: 'CLAIM-TEST-INCOMPATIBLE-SCOPE',
  metricSubject: 'CAD_GEOMETRY_VOLUME_ACCURACY',
  measurementScope: 'MOBILE_PHYSICAL_DEVICE_RUNTIME' // Incompatible!
}
const testRegIncompatibleScope = { ...canonicalRegistry, claimRecords: [...canonicalRegistry.claimRecords, incompatibleScopeClaim] }
const resIncompatibleScope = validateCanonicalRegistry(testRegIncompatibleScope)
assert(!resIncompatibleScope.isValid, 'Validator rejects incompatible subject/scope combination (V-02)')
assert(
  resIncompatibleScope.errors.some(e => e.rule === 'SUBJECT_SCOPE_INCOMPATIBILITY'),
  'Validator reports SUBJECT_SCOPE_INCOMPATIBILITY error'
)

// Negative Test 15: Alternative CAD wording safeguards (V-02)
const misleadingPhrases = [
  'Manufacturing accuracy of 0.0000%',
  'Sub-micron CNC accuracy',
  'Machine-level dimensional precision',
  'Zero machining deviation'
]
let allMisleadingPhrasesRejected = true
for (const phrase of misleadingPhrases) {
  const badWordingClaim: CanonicalTechnicalClaimRecord = {
    ...edaVolumeClaim!,
    claimId: `CLAIM-TEST-PHRASE-${phrase.slice(0, 8).replace(/[^a-zA-Z]/g, '')}`,
    wording: {
      ...edaVolumeClaim!.wording,
      qualifiedTechnicalStatement: phrase
    }
  }
  const testRegPhrase = { ...canonicalRegistry, claimRecords: [...canonicalRegistry.claimRecords, badWordingClaim] }
  const resPhrase = validateCanonicalRegistry(testRegPhrase)
  if (resPhrase.isValid || !resPhrase.errors.some(e => e.rule === 'PROHIBITED_METRIC_CLAIM')) {
    allMisleadingPhrasesRejected = false
    console.error(`Failed to reject misleading CAD wording: ${phrase}`)
  }
}
assert(allMisleadingPhrasesRejected, 'Validator rejects all alternative misleading CAD manufacturing formulations (V-02)')

// Negative Test 16: Genuine Qualitative claim without metric fields is accepted (V-02)
const qualitativeClaim: CanonicalTechnicalClaimRecord = {
  claimId: 'CLAIM-QUALITATIVE-SECURITY-01',
  projectId: 'proj-ask-aadil',
  claimDomain: 'SECURITY',
  isQuantitative: false,
  verificationStatus: 'SOURCE_VERIFIED',
  linkedEvidenceIds: ['EVID-ASK-01'],
  wording: {
    headline: 'Agent action sandbox boundaries',
    qualifiedTechnicalStatement: 'Tool executions are constrained by strict filesystem sandboxing.',
    mandatoryCaveats: [],
    prohibitedInterpretations: []
  },
  permittedSurfaces: ['SYSTEMS_CASE_STUDY']
}
const testRegQualitative = { ...canonicalRegistry, claimRecords: [...canonicalRegistry.claimRecords, qualitativeClaim] }
const resQualitative = validateCanonicalRegistry(testRegQualitative)
const qualErrors = resQualitative.errors.filter(e => e.entityId === 'CLAIM-QUALITATIVE-SECURITY-01')
assert(qualErrors.length === 0, 'Validator accepts genuine qualitative claim without metricSubject/measurementScope (V-02)')

// ----------------------------------------------------------------------------
// TEST SUITE 7: Canonical Case-Study Manifest Integrity (Phase 2.5C)
// ----------------------------------------------------------------------------
console.log('\nTest Suite 7: Canonical Case-Study Manifest Integrity (Phase 2.5C)')

const caseStudies = canonicalRegistry.caseStudyReferences ?? []
assert(Array.isArray(caseStudies) && caseStudies.length === 8, 'Canonical registry contains exactly 8 case-study references')

const expectedCaseStudyIds: CaseStudyId[] = ['CS-01', 'CS-02', 'CS-03', 'CS-04', 'CS-05', 'CS-06', 'CS-07', 'CS-08']
const foundCaseStudyIds = caseStudies.map(cs => cs.caseStudyId)
assert(
  expectedCaseStudyIds.every(id => foundCaseStudyIds.includes(id)),
  'All 8 case studies (CS-01 through CS-08) are present in the manifest'
)

// Internal Case Studies (CS-01 through CS-07)
const internalCaseStudies = caseStudies.filter(cs => cs.caseStudyId !== 'CS-08')
assert(internalCaseStudies.length === 7, 'Contains exactly 7 internal case studies (CS-01 through CS-07)')

for (const cs of internalCaseStudies) {
  assert(cs.projectId !== null && typeof cs.projectId === 'string', `${cs.caseStudyId} has non-null projectId: ${cs.projectId}`)
  assert(cs.associatedCareerId !== null && typeof cs.associatedCareerId === 'string', `${cs.caseStudyId} has non-null associatedCareerId: ${cs.associatedCareerId}`)

  const project = canonicalRegistry.projectRecords.find(p => p.projectId === cs.projectId)
  assert(project !== undefined, `${cs.caseStudyId} references existing project record ${cs.projectId}`)
  assert(project?.associatedCareerId === cs.associatedCareerId, `${cs.caseStudyId} associatedCareerId matches project.associatedCareerId`)
  assert(project?.publicationEligibility === cs.publicationEligibility, `${cs.caseStudyId} publicationEligibility matches project record`)
  assert(cs.manifestGovernanceStatus === 'ACCEPTED', `${cs.caseStudyId} manifestGovernanceStatus is ACCEPTED`)
  assert(cs.mappedJournalChapters.length > 0, `${cs.caseStudyId} maps to at least one journal chapter`)
  assert(cs.contentAnchor === cs.caseStudyId.toLowerCase(), `${cs.caseStudyId} contentAnchor is ${cs.caseStudyId.toLowerCase()}`)
}

// ADR counts per case study
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

for (const cs of caseStudies) {
  const count = cs.adrReferences.length
  assert(count === expectedAdrCounts[cs.caseStudyId], `${cs.caseStudyId} has exactly ${expectedAdrCounts[cs.caseStudyId]} ADRs (found ${count})`)
}

// CS-08 External Boundary Invariants
const cs08 = caseStudies.find(cs => cs.caseStudyId === 'CS-08')
assert(cs08 !== undefined, 'CS-08 manifest entry exists')
assert(cs08?.projectId === null, 'CS-08 has projectId strictly null (external repository)')
assert(cs08?.associatedCareerId === null, 'CS-08 has associatedCareerId strictly null')
assert(cs08?.mappedJournalChapters.length === 0, 'CS-08 has mappedJournalChapters strictly empty')
assert(cs08?.canonicalClaimIds.length === 0, 'CS-08 has canonicalClaimIds strictly empty')
assert(cs08?.canonicalEvidenceIds.length === 0, 'CS-08 has canonicalEvidenceIds strictly empty')
assert(cs08?.publicationEligibility === 'RESTRICTED_OR_INTERNAL_ONLY', 'CS-08 publicationEligibility is RESTRICTED_OR_INTERNAL_ONLY')
assert(cs08?.manifestGovernanceStatus === 'SEPARATE_REPOSITORY_DEFERRED', 'CS-08 manifestGovernanceStatus is SEPARATE_REPOSITORY_DEFERRED')
assert(cs08?.externalEvidenceReferences !== undefined && cs08.externalEvidenceReferences.length === 2, 'CS-08 defines exactly 2 external evidence references')
assert(
  Boolean(cs08?.externalEvidenceReferences && cs08.externalEvidenceReferences.every(e => e.verificationLocality === 'EXTERNAL_REPOSITORY')),
  'All CS-08 external evidence references have verificationLocality: EXTERNAL_REPOSITORY'
)
assert(cs08?.contentAnchor === 'cs-08', 'CS-08 contentAnchor is cs-08')

// ----------------------------------------------------------------------------
// TEST SUITE 8: Identifier Completeness & Synchronization Safeguards
// ----------------------------------------------------------------------------
console.log('\nTest Suite 8: Identifier Completeness & Synchronization Safeguards')

// Check ALL_CASE_STUDY_IDS bidirectional sync
assert(ALL_CASE_STUDY_IDS.length === 8, `ALL_CASE_STUDY_IDS has 8 members (found ${ALL_CASE_STUDY_IDS.length})`)
assert(
  ALL_CASE_STUDY_IDS.every(id => foundCaseStudyIds.includes(id)),
  'Every ALL_CASE_STUDY_IDS member exists in canonical registry manifest'
)
assert(
  foundCaseStudyIds.every(id => (ALL_CASE_STUDY_IDS as readonly string[]).includes(id)),
  'Every registry caseStudyId exists in ALL_CASE_STUDY_IDS'
)

// Check ALL_ADR_IDS bidirectional sync
const allRegistryAdrs = caseStudies.flatMap(cs => cs.adrReferences)
const allRegistryAdrIds = allRegistryAdrs.map(a => a.adrId)
assert(allRegistryAdrIds.length === 23, `Registry contains exactly 23 total ADRs (found ${allRegistryAdrIds.length})`)
assert(ALL_ADR_IDS.length === 23, `ALL_ADR_IDS has 23 members (found ${ALL_ADR_IDS.length})`)
assert(
  ALL_ADR_IDS.every(id => allRegistryAdrIds.includes(id)),
  'Every ALL_ADR_IDS member exists in the registry case study ADR collections'
)
assert(
  allRegistryAdrIds.every(id => (ALL_ADR_IDS as readonly string[]).includes(id)),
  'Every registry ADR ID exists in ALL_ADR_IDS'
)

// In-Memory Helper Lookups
assert(getCaseStudyManifest('CS-01')?.slug === 'ask-aadil', 'getCaseStudyManifest(CS-01) returns correct manifest')
assert(getCaseStudyManifest('CS-07')?.slug === 'us-mathematics-item-bank', 'getCaseStudyManifest(CS-07) returns correct manifest')
assert(getCaseStudyManifest('CS-08')?.slug === 'diffguard', 'getCaseStudyManifest(CS-08) returns correct manifest')
assert(getCaseStudyManifest('CS-99' as any) === undefined, 'getCaseStudyManifest returns undefined for unknown ID')

assert(getAdrManifest('ADR-VOICE-01')?.title === 'Deterministic Result-List Assembler', 'getAdrManifest(ADR-VOICE-01) returns correct ADR')
assert(getAdrManifest('ADR-EDA-04')?.title === 'CAD <-> Drawing Cross-Validation', 'getAdrManifest(ADR-EDA-04) returns correct ADR')
assert(getAdrManifest('ADR-IB-03')?.title === 'Min/Max Swap Stratified Sampling', 'getAdrManifest(ADR-IB-03) returns correct ADR')
assert(getAdrManifest('ADR-UNKNOWN-01' as any) === undefined, 'getAdrManifest returns undefined for unknown ADR ID')

// ----------------------------------------------------------------------------
// TEST SUITE 9: Negative Adversarial Invariant Tests for Case Studies & ADRs
// ----------------------------------------------------------------------------
console.log('\nTest Suite 9: Negative Adversarial Invariant Tests for Case Studies & ADRs')

// Negative Test: Duplicate CaseStudyId
{
  const duplicateCsRegistry = {
    ...canonicalRegistry,
    caseStudyReferences: [...caseStudies, { ...caseStudies[0] }]
  }
  const res = validateCanonicalRegistry(duplicateCsRegistry)
  assert(!res.isValid && res.errors.some(e => e.rule === 'CASE_STUDY_DUPLICATE_ID'), 'Validator rejects duplicate CaseStudyId')
}

// Negative Test: Duplicate ADR ID across registry
{
  const duplicateAdrRegistry = {
    ...canonicalRegistry,
    caseStudyReferences: caseStudies.map(cs => {
      if (cs.caseStudyId === 'CS-02') {
        return {
          ...cs,
          adrReferences: [
            ...cs.adrReferences,
            {
              adrId: 'ADR-VOICE-01' as any,
              title: 'Hijacked ADR ID',
              status: 'ACCEPTED' as const,
              contentAnchor: 'adr-voice-01'
            }
          ]
        }
      }
      return cs
    })
  }
  const res = validateCanonicalRegistry(duplicateAdrRegistry)
  assert(!res.isValid && res.errors.some(e => e.rule === 'ADR_DUPLICATE_ID'), 'Validator rejects duplicate ADR ID across registry')
}

// Negative Test: Cross-manifest ADR reference
{
  const crossManifestRegistry = {
    ...canonicalRegistry,
    caseStudyReferences: caseStudies.map(cs => {
      if (cs.caseStudyId === 'CS-01') {
        return {
          ...cs,
          mappedJournalChapters: [
            {
              chapterId: 'ch-21-ask-aadil',
              classification: 'DIRECT' as const,
              relevantAdrIds: ['ADR-VOICE-01' as AdrId, 'ADR-EDA-01' as AdrId]
            }
          ]
        }
      }
      return cs
    })
  }
  const res = validateCanonicalRegistry(crossManifestRegistry)
  assert(!res.isValid && res.errors.some(e => e.rule === 'JOURNAL_MAPPING_ADR_NOT_IN_MANIFEST'), 'Validator rejects cross-manifest ADR reference in mapping')
}

// Negative Test: Duplicate ADR reference in the same mapping
{
  const duplicateAdrInMappingRegistry = {
    ...canonicalRegistry,
    caseStudyReferences: caseStudies.map(cs => {
      if (cs.caseStudyId === 'CS-01') {
        return {
          ...cs,
          mappedJournalChapters: [
            {
              chapterId: 'ch-21-ask-aadil',
              classification: 'DIRECT' as const,
              relevantAdrIds: ['ADR-VOICE-01' as AdrId, 'ADR-VOICE-01' as AdrId]
            }
          ]
        }
      }
      return cs
    })
  }
  const res = validateCanonicalRegistry(duplicateAdrInMappingRegistry)
  assert(!res.isValid && res.errors.some(e => e.rule === 'JOURNAL_MAPPING_DUPLICATE_ADR'), 'Validator rejects duplicate ADR ID within single mapping')
}

// Negative Test: CS-08 with non-null projectId
{
  const badCs08Project = {
    ...canonicalRegistry,
    caseStudyReferences: caseStudies.map(cs => {
      if (cs.caseStudyId === 'CS-08') {
        return { ...cs, projectId: 'proj-voice-agent' as any }
      }
      return cs
    })
  }
  const res = validateCanonicalRegistry(badCs08Project)
  assert(!res.isValid && res.errors.some(e => e.rule === 'CS08_PROJECT_MUST_BE_NULL'), 'Validator rejects CS-08 with non-null projectId')
}

// Negative Test: CS-08 with non-null associatedCareerId
{
  const badCs08Career = {
    ...canonicalRegistry,
    caseStudyReferences: caseStudies.map(cs => {
      if (cs.caseStudyId === 'CS-08') {
        return { ...cs, associatedCareerId: 'car-wayground-founding' as any }
      }
      return cs
    })
  }
  const res = validateCanonicalRegistry(badCs08Career)
  assert(!res.isValid && res.errors.some(e => e.rule === 'CS08_CAREER_MUST_BE_NULL'), 'Validator rejects CS-08 with non-null associatedCareerId')
}

// Negative Test: CS-08 with mappedJournalChapters
{
  const badCs08Mapping = {
    ...canonicalRegistry,
    caseStudyReferences: caseStudies.map(cs => {
      if (cs.caseStudyId === 'CS-08') {
        return {
          ...cs,
          mappedJournalChapters: [
            {
              chapterId: 'ch-19-ai-reliability',
              classification: 'DIRECT' as const,
              relevantAdrIds: []
            }
          ]
        }
      }
      return cs
    })
  }
  const res = validateCanonicalRegistry(badCs08Mapping)
  assert(!res.isValid && res.errors.some(e => e.rule === 'CS08_JOURNAL_MAPPINGS_PROHIBITED'), 'Validator rejects CS-08 with mappedJournalChapters')
}

// Negative Test: CS-08 with internal canonical claims
{
  const badCs08Claims = {
    ...canonicalRegistry,
    caseStudyReferences: caseStudies.map(cs => {
      if (cs.caseStudyId === 'CS-08') {
        return { ...cs, canonicalClaimIds: ['CLAIM-VOICE-001'] }
      }
      return cs
    })
  }
  const res = validateCanonicalRegistry(badCs08Claims)
  assert(!res.isValid && res.errors.some(e => e.rule === 'CS08_INTERNAL_CLAIMS_PROHIBITED'), 'Validator rejects CS-08 with internal canonical claims')
}

// Negative Test: CS-08 with internal canonical evidence
{
  const badCs08Evidence = {
    ...canonicalRegistry,
    caseStudyReferences: caseStudies.map(cs => {
      if (cs.caseStudyId === 'CS-08') {
        return { ...cs, canonicalEvidenceIds: ['EVID-VOICE-01'] }
      }
      return cs
    })
  }
  const res = validateCanonicalRegistry(badCs08Evidence)
  assert(!res.isValid && res.errors.some(e => e.rule === 'CS08_INTERNAL_EVIDENCE_PROHIBITED'), 'Validator rejects CS-08 with internal canonical evidence')
}

// Negative Test: Empty targetAspect on PARTIAL mapping
{
  const emptyAspectRegistry = {
    ...canonicalRegistry,
    caseStudyReferences: caseStudies.map(cs => {
      if (cs.caseStudyId === 'CS-06') {
        return {
          ...cs,
          mappedJournalChapters: [
            {
              chapterId: 'ch-14-applications-to-pipelines',
              classification: 'PARTIAL' as const,
              targetAspect: '   ',
              relevantAdrIds: ['ADR-ETL-03' as AdrId]
            }
          ]
        }
      }
      return cs
    })
  }
  const res = validateCanonicalRegistry(emptyAspectRegistry)
  assert(!res.isValid && res.errors.some(e => e.rule === 'PARTIAL_MAPPING_TARGET_ASPECT_REQUIRED'), 'Validator rejects whitespace-only targetAspect on PARTIAL mapping')
}

// Negative Test: Duplicate DIRECT mapping for same chapter in case study
{
  const duplicateDirectRegistry = {
    ...canonicalRegistry,
    caseStudyReferences: caseStudies.map(cs => {
      if (cs.caseStudyId === 'CS-01') {
        return {
          ...cs,
          mappedJournalChapters: [
            {
              chapterId: 'ch-21-ask-aadil',
              classification: 'DIRECT' as const,
              relevantAdrIds: ['ADR-VOICE-01' as AdrId]
            },
            {
              chapterId: 'ch-21-ask-aadil',
              classification: 'DIRECT' as const,
              relevantAdrIds: ['ADR-VOICE-02' as AdrId]
            }
          ]
        }
      }
      return cs
    })
  }
  const res = validateCanonicalRegistry(duplicateDirectRegistry)
  assert(!res.isValid && res.errors.some(e => e.rule === 'JOURNAL_MAPPING_DUPLICATE_DIRECT'), 'Validator rejects duplicate DIRECT mapping for same chapter')
}

// Negative Test: Duplicate normalized targetAspect on PARTIAL mapping for same chapter
{
  const duplicatePartialAspectRegistry = {
    ...canonicalRegistry,
    caseStudyReferences: caseStudies.map(cs => {
      if (cs.caseStudyId === 'CS-06') {
        return {
          ...cs,
          mappedJournalChapters: [
            {
              chapterId: 'ch-14-applications-to-pipelines',
              classification: 'PARTIAL' as const,
              targetAspect: 'AI/ML transition pipeline',
              relevantAdrIds: ['ADR-ETL-03' as AdrId]
            },
            {
              chapterId: 'ch-14-applications-to-pipelines',
              classification: 'PARTIAL' as const,
              targetAspect: '  ai/ml transition pipeline  ',
              relevantAdrIds: ['ADR-ETL-03' as AdrId]
            }
          ]
        }
      }
      return cs
    })
  }
  const res = validateCanonicalRegistry(duplicatePartialAspectRegistry)
  assert(!res.isValid && res.errors.some(e => e.rule === 'JOURNAL_MAPPING_DUPLICATE_PARTIAL_ASPECT'), 'Validator rejects duplicate normalized PARTIAL targetAspect for same chapter')
}

// Negative Test: Invalid chapter ID with injected context
{
  const invalidChapterRegistry = {
    ...canonicalRegistry,
    caseStudyReferences: caseStudies.map(cs => {
      if (cs.caseStudyId === 'CS-01') {
        return {
          ...cs,
          mappedJournalChapters: [
            {
              chapterId: 'ch-99-nonexistent-chapter',
              classification: 'DIRECT' as const,
              relevantAdrIds: ['ADR-VOICE-01' as AdrId]
            }
          ]
        }
      }
      return cs
    })
  }
  const validChapters = ['ch-18-design-automation', 'ch-21-ask-aadil']
  const res = validateCanonicalRegistry(invalidChapterRegistry, { validChapterIds: validChapters })
  assert(!res.isValid && res.errors.some(e => e.rule === 'JOURNAL_MAPPING_CHAPTER_NOT_FOUND'), 'Validator rejects invalid chapter ID when validChapterIds context is supplied')
}

// ----------------------------------------------------------------------------
// TEST SUITE 10: Journal Reverse Lookup Verification
// ----------------------------------------------------------------------------
console.log('\nTest Suite 10: Journal Reverse Lookup Verification')

// Direct Lookups
const linksCh19 = getCaseStudiesForChapter('ch-19-ai-reliability')
assert(linksCh19.length === 1, 'ch-19 maps to exactly 1 case study')
assert(linksCh19[0].caseStudyId === 'CS-04' && linksCh19[0].classification === 'DIRECT', 'ch-19 maps DIRECTLY to CS-04')
assert(linksCh19[0].relevantAdrIds.length === 4, 'ch-19 link contains all 4 REL ADRs')

const linksCh21 = getCaseStudiesForChapter('ch-21-ask-aadil')
assert(linksCh21.length === 1 && linksCh21[0].caseStudyId === 'CS-01', 'ch-21 maps to CS-01')
assert(linksCh21[0].classification === 'DIRECT', 'ch-21 maps DIRECTLY to CS-01')
assert(linksCh21[0].relevantAdrIds.length === 3, 'ch-21 link contains all 3 VOICE ADRs')

const linksCh18 = getCaseStudiesForChapter('ch-18-design-automation')
assert(linksCh18.length === 1 && linksCh18[0].caseStudyId === 'CS-02', 'ch-18 maps to CS-02 (ADR-EDA-01..04)')
assert(linksCh18[0].classification === 'DIRECT', 'ch-18 maps DIRECTLY to CS-02')

const linksCh11 = getCaseStudiesForChapter('ch-11-generation-not-enough')
assert(linksCh11.length === 1 && linksCh11[0].caseStudyId === 'CS-03', 'ch-11 maps to CS-03 (ADR-VM-02, 03)')
assert(linksCh11[0].classification === 'DIRECT', 'ch-11 maps DIRECTLY to CS-03')

const linksCh12 = getCaseStudiesForChapter('ch-12-generation-to-evaluation')
assert(linksCh12.length === 1 && linksCh12[0].caseStudyId === 'CS-03', 'ch-12 maps to CS-03 (ADR-VM-01)')
assert(linksCh12[0].classification === 'DIRECT', 'ch-12 maps DIRECTLY to CS-03')

const linksCh10 = getCaseStudiesForChapter('ch-10-in-house-creation')
assert(linksCh10.length === 1 && linksCh10[0].caseStudyId === 'CS-03', 'ch-10 maps to CS-03')
assert(linksCh10[0].classification === 'PARTIAL', 'ch-10 maps as PARTIAL to CS-03')
assert(typeof linksCh10[0].targetAspect === 'string' && linksCh10[0].targetAspect.length > 0, 'ch-10 partial link includes targetAspect')

const linksCh22 = getCaseStudiesForChapter('ch-22-solace-ai')
assert(linksCh22.length === 1 && linksCh22[0].caseStudyId === 'CS-05' && linksCh22[0].classification === 'DIRECT', 'ch-22 maps DIRECTLY to CS-05')
assert(linksCh22[0].relevantAdrIds.length === 3, 'ch-22 link contains all 3 SOLACE ADRs')

const linksCh15 = getCaseStudiesForChapter('ch-15-curriculum-etl')
assert(linksCh15.length === 1 && linksCh15[0].caseStudyId === 'CS-06' && linksCh15[0].classification === 'DIRECT', 'ch-15 maps DIRECTLY to CS-06')
assert(linksCh15[0].relevantAdrIds.length === 3, 'ch-15 link contains all 3 ETL ADRs')

const linksCh14 = getCaseStudiesForChapter('ch-14-applications-to-pipelines')
assert(linksCh14.length === 1 && linksCh14[0].caseStudyId === 'CS-06' && linksCh14[0].classification === 'PARTIAL', 'ch-14 maps as PARTIAL to CS-06')
assert(typeof linksCh14[0].targetAspect === 'string' && linksCh14[0].targetAspect.length > 0, 'ch-14 partial link includes targetAspect')

// CS-07 Multi-Mapping Verification for Chapter 07
const linksCh07 = getCaseStudiesForChapter('ch-07-making-math-visual')
assert(linksCh07.length === 2, `ch-07 returns exactly 2 derived case-study links (found ${linksCh07.length})`)
assert(linksCh07.every(l => l.caseStudyId === 'CS-07'), 'Both ch-07 links connect to CS-07')

const directCh07 = linksCh07.find(l => l.classification === 'DIRECT')
const partialCh07 = linksCh07.find(l => l.classification === 'PARTIAL')
assert(directCh07 !== undefined, 'ch-07 has exactly one DIRECT link (SVG/TikZ visual routing)')
assert(
  Boolean(directCh07 && directCh07.relevantAdrIds.includes('ADR-IB-01') && directCh07.relevantAdrIds.includes('ADR-IB-02')),
  'ch-07 DIRECT link contains ADR-IB-01 and ADR-IB-02'
)
assert(partialCh07 !== undefined, 'ch-07 has exactly one PARTIAL link (Min/Max Swap stratified sampling)')
assert(
  Boolean(partialCh07 && partialCh07.relevantAdrIds.includes('ADR-IB-03')),
  'ch-07 PARTIAL link contains ADR-IB-03'
)
assert(
  Boolean(partialCh07 && partialCh07.targetAspect && partialCh07.targetAspect.includes('Min/Max Swap')),
  'ch-07 PARTIAL link targetAspect documents Min/Max Swap stratified sampling'
)

// Unmapped Chapters Return Empty Arrays
const linksCh01 = getCaseStudiesForChapter('ch-01-problem-domain')
assert(linksCh01.length === 0, 'Unmapped chapter ch-01 returns empty array (zero links)')

const linksCh02 = getCaseStudiesForChapter('ch-02-represent-mathematics')
assert(linksCh02.length === 0, 'Unmapped chapter ch-02 returns empty array (zero links)')

// Immutability & Safe Defaults
for (const l of [...linksCh19, ...linksCh21, ...linksCh07]) {
  assert(typeof l.title === 'string' && l.title.length > 0, `Link for ${l.caseStudyId} has valid title`)
  assert(typeof l.slug === 'string' && l.slug.length > 0, `Link for ${l.caseStudyId} has valid slug`)
  assert(typeof l.contentAnchor === 'string' && l.contentAnchor.length > 0, `Link for ${l.caseStudyId} has valid contentAnchor`)
  assert(typeof l.publicationEligibility === 'string', `Link for ${l.caseStudyId} has publicationEligibility`)
}

// ----------------------------------------------------------------------------
// SUMMARY
// ----------------------------------------------------------------------------
console.log('\n-----------------------------------------------------------------')
console.log(`TOTAL TESTS: ${passedTests + failedTests}`)
console.log(`PASSED:      ${passedTests}`)
console.log(`FAILED:      ${failedTests}`)
console.log('-----------------------------------------------------------------')

if (failedTests > 0) {
  process.exit(1)
} else {
  console.log('ALL CANONICAL INTEGRITY & VALIDATION INVARIANTS PASSED SUCCESSFULLY.\n')
}
