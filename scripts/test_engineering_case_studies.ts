/**
 * ENGINEERING CASE STUDY COLLECTION TEST SUITE
 * Phase 2.5A — Technical Incident Reconstruction, Engineering Decision Records & Canonical Provenance
 *
 * Verifies that the new engineering case study collection adheres to strict evidence governance:
 * - Suite 1: Schema Integrity, Completeness Classification & ID Uniqueness
 * - Suite 2: Canonical Reference Resolution (Projects, Careers, Claims, Evidence, Chapters)
 * - Suite 3: Technical Authenticity, Incident Grounding & Zero Fabrication
 * - Suite 4: Metric Qualification, Scope Disclosures & Governance Invariants
 * - Suite 5: Attribution, Ownership & Collaborative Integrity
 * - Suite 6: Confidentiality & Publication Boundary Enforcement
 * - Suite 7: Adapter API & Resolution Projection Functions
 */

import { engineeringCaseStudies } from '../data/canonical/engineeringCaseStudies'
import {
  getAllCaseStudies,
  getCaseStudyById,
  getCaseStudiesByProject,
  getCaseStudiesByCareer,
  getCaseStudiesByJournalChapter,
  getCaseStudiesByCompleteness,
  getPublicCaseStudies,
  getResolvedCaseStudy,
  validateAllCaseStudies,
  validateCaseStudyCanonicalReferences
} from '../data/adapters/engineeringCaseStudyAdapter'
import { canonicalRegistry } from '../data/canonical/canonicalRegistry'
import { journalChapters as canonicalJournalChapters } from '../data/canonical/journalChapters'
import { EngineeringCaseStudy } from '../types/caseStudy'

interface TestResult {
  suite: string
  name: string
  passed: boolean
  details: string
}

const results: TestResult[] = []

function assert(suite: string, name: string, condition: boolean, details: string) {
  results.push({
    suite,
    name,
    passed: condition,
    details: condition ? `PASSED: ${details}` : `FAILED: ${details}`
  })
  const mark = condition ? '✓' : '✗'
  console.log(`${mark} [${suite}] ${name}: ${condition ? details : 'FAILED - ' + details}`)
}

async function runEngineeringCaseStudyTests() {
  console.log('====================================================================')
  console.log('  PHASE 2.5A: ENGINEERING CASE STUDY REGRESSION & AUDIT SUITE       ')
  console.log('====================================================================\n')

  // ============================================================================
  // SUITE 1: SCHEMA INTEGRITY, COMPLETENESS CLASSIFICATION & ID UNIQUENESS
  // ============================================================================
  console.log('--- SUITE 1: Schema Integrity, Completeness Classification & ID Uniqueness ---')

  assert(
    'Suite 1',
    'Collection contains populated case studies',
    engineeringCaseStudies.length >= 8,
    `Found ${engineeringCaseStudies.length} case study entries (expected >= 8)`
  )

  const ids = engineeringCaseStudies.map(cs => cs.id)
  const uniqueIds = new Set(ids)
  assert(
    'Suite 1',
    'All case study IDs are unique',
    ids.length === uniqueIds.size,
    `Total IDs: ${ids.length}, Unique IDs: ${uniqueIds.size}`
  )

  const allHaveRequiredFields = engineeringCaseStudies.every(
    cs =>
      Boolean(cs.id) &&
      Boolean(cs.title) &&
      Boolean(cs.category) &&
      Boolean(cs.technicalContext) &&
      Boolean(cs.problem) &&
      Array.isArray(cs.symptoms) &&
      cs.symptoms.length > 0 &&
      Boolean(cs.reproductionConditions) &&
      Boolean(cs.investigation) &&
      Array.isArray(cs.hypotheses) &&
      Boolean(cs.rootCause) &&
      Boolean(cs.resolution) &&
      Boolean(cs.implementationDetails) &&
      Boolean(cs.verification) &&
      Boolean(cs.outcome) &&
      Array.isArray(cs.limitations) &&
      Array.isArray(cs.lessons) &&
      Boolean(cs.visibility) &&
      Boolean(cs.publicationStatus) &&
      Boolean(cs.documentationCompleteness) &&
      Array.isArray(cs.sourceReferences)
  )
  assert(
    'Suite 1',
    'Every case study possesses all required schema fields',
    allHaveRequiredFields,
    'All case studies satisfy full schema structure'
  )

  const completenessCounts = {
    FULLY_DOCUMENTED: engineeringCaseStudies.filter(cs => cs.documentationCompleteness === 'FULLY_DOCUMENTED').length,
    PARTIALLY_DOCUMENTED: engineeringCaseStudies.filter(cs => cs.documentationCompleteness === 'PARTIALLY_DOCUMENTED').length,
    INSUFFICIENT_EVIDENCE: engineeringCaseStudies.filter(cs => cs.documentationCompleteness === 'INSUFFICIENT_EVIDENCE').length
  }
  assert(
    'Suite 1',
    'Documentation completeness levels reflect authentic source availability',
    completenessCounts.FULLY_DOCUMENTED >= 4 &&
      completenessCounts.PARTIALLY_DOCUMENTED >= 2 &&
      completenessCounts.INSUFFICIENT_EVIDENCE >= 1,
    `Counts: FULL=${completenessCounts.FULLY_DOCUMENTED}, PARTIAL=${completenessCounts.PARTIALLY_DOCUMENTED}, INSUFFICIENT=${completenessCounts.INSUFFICIENT_EVIDENCE}`
  )

  // ============================================================================
  // SUITE 2: CANONICAL REFERENCE RESOLUTION
  // ============================================================================
  console.log('\n--- SUITE 2: Canonical Reference Resolution ---')

  const validationResult = validateAllCaseStudies()
  assert(
    'Suite 2',
    'validateAllCaseStudies reports valid with 0 canonical errors',
    validationResult.valid && validationResult.errors.length === 0,
    `Validation result: valid=${validationResult.valid}, errorCount=${validationResult.errors.length}`
  )

  // Verify each individual project ID resolves in canonicalRegistry
  const nonNullProjectIds = engineeringCaseStudies.map(cs => cs.projectId).filter((id): id is string => id !== null)
  const allProjectsResolve = nonNullProjectIds.every(pid =>
    canonicalRegistry.projectRecords.some(p => p.projectId === pid)
  )
  assert(
    'Suite 2',
    'All non-null projectIds resolve in canonicalRegistry.projectRecords',
    allProjectsResolve,
    `Verified ${nonNullProjectIds.length} non-null project references`
  )

  // Verify all career IDs resolve in canonicalRegistry.careerRecords
  const allCareerIds = engineeringCaseStudies.flatMap(cs => cs.careerIds)
  const allCareersResolve = allCareerIds.every(cid =>
    canonicalRegistry.careerRecords.some(c => c.careerId === cid)
  )
  assert(
    'Suite 2',
    'All careerIds resolve in canonicalRegistry.careerRecords',
    allCareersResolve,
    `Verified ${allCareerIds.length} career references`
  )

  // Verify all journal chapter IDs resolve in canonicalJournalChapters
  const allJournalIds = engineeringCaseStudies.flatMap(cs => cs.journalChapterIds)
  const allJournalsResolve = allJournalIds.every(jid =>
    canonicalJournalChapters.some(j => j.id === jid)
  )
  assert(
    'Suite 2',
    'All journalChapterIds resolve in canonicalJournalChapters',
    allJournalsResolve,
    `Verified ${allJournalIds.length} journal chapter cross-references`
  )

  // Verify all claim IDs resolve in canonicalRegistry.claimRecords
  const allClaimIds = engineeringCaseStudies.flatMap(cs => cs.claimIds)
  const allClaimsResolve = allClaimIds.every(clid =>
    canonicalRegistry.claimRecords.some(cl => cl.claimId === clid)
  )
  assert(
    'Suite 2',
    'All claimIds resolve in canonicalRegistry.claimRecords',
    allClaimsResolve,
    `Verified ${allClaimIds.length} technical claim references`
  )

  // Verify all evidence IDs resolve in canonicalRegistry.evidenceRecords
  const allEvidenceIds = engineeringCaseStudies.flatMap(cs => cs.evidenceIds)
  const allEvidenceResolves = allEvidenceIds.every(eid =>
    canonicalRegistry.evidenceRecords.some(e => e.evidenceId === eid)
  )
  assert(
    'Suite 2',
    'All evidenceIds resolve in canonicalRegistry.evidenceRecords',
    allEvidenceResolves,
    `Verified ${allEvidenceIds.length} evidence record references`
  )

  // ============================================================================
  // SUITE 3: TECHNICAL AUTHENTICITY, INCIDENT GROUNDING & ZERO FABRICATION
  // ============================================================================
  console.log('\n--- SUITE 3: Technical Authenticity, Incident Grounding & Zero Fabrication ---')

  // Case 1: Web Speech Transcript Assembly
  const speechCs = getCaseStudyById('case-study-ask-aadil-speech-transcript')
  assert(
    'Suite 3',
    'Ask Aadil speech case study documents real assembleSpeechTranscript implementation',
    Boolean(speechCs?.implementationDetails.keyFunctionsOrClasses.includes('assembleSpeechTranscript')) &&
      Boolean(speechCs?.implementationDetails.filesModifiedOrAuthored.includes('lib/rag/voice/speechToTextProvider.ts')),
    `Files: ${speechCs?.implementationDetails.filesModifiedOrAuthored.join(', ')}`
  )

  assert(
    'Suite 3',
    'Ask Aadil speech case study cites exact W3C resultIndex / cumulative stream investigation',
    Boolean(speechCs?.investigation.includes('Chromium does NOT emit differential delta speech segments')) &&
      Boolean(speechCs?.investigation.includes('SpeechRecognitionResultList')),
    `Investigation snippet: "${speechCs?.investigation.slice(0, 80)}..."`
  )

  // Case 2: EDA CAD Materials Policy
  const edaCs = getCaseStudyById('case-study-eda-cad-volume-materials')
  assert(
    'Suite 3',
    'EDA CAD case study documents real ShaftTorsionSolver and MaterialKnowledgeBase',
    Boolean(edaCs?.implementationDetails.keyFunctionsOrClasses.includes('ShaftTorsionSolver')) &&
      Boolean(edaCs?.implementationDetails.keyFunctionsOrClasses.includes('MaterialKnowledgeBase')),
    `Classes: ${edaCs?.implementationDetails.keyFunctionsOrClasses.join(', ')}`
  )

  assert(
    'Suite 3',
    'EDA CAD case study documents fail-fast blocking on generic material terms',
    Boolean(edaCs?.resolution.includes('STATUS = BLOCKED')) &&
      Boolean(edaCs?.resolution.includes('AISI 1045')),
    `Resolution snippet: "${edaCs?.resolution.slice(0, 80)}..."`
  )

  // Case 3: VM Copy Tier-1 Evaluator
  const vmCs = getCaseStudyById('case-study-vm-copy-eval-layer')
  assert(
    'Suite 3',
    'VM Copy case study documents real lib/eval-layer.ts and calculateBatches',
    Boolean(vmCs?.implementationDetails.filesModifiedOrAuthored.includes('lib/eval-layer.ts')) &&
      Boolean(vmCs?.implementationDetails.keyFunctionsOrClasses.includes('calculateBatches')),
    `Files: ${vmCs?.implementationDetails.filesModifiedOrAuthored.join(', ')}`
  )

  assert(
    'Suite 3',
    'VM Copy case study documents serverless timeout root cause and micro-batching fix',
    Boolean(vmCs?.rootCause.includes('serverless execution windows')) &&
      Boolean(vmCs?.resolution.includes('calculateBatches(numQuestions)')),
    `Root cause: "${vmCs?.rootCause.slice(0, 80)}..."`
  )

  // Case 4: AI Reliability Fisher Covariance
  const relCs = getCaseStudyById('case-study-ai-reliability-governance')
  assert(
    'Suite 4',
    'AI Reliability case study documents real Fisher Information covariance abstention',
    Boolean(relCs?.implementationDetails.keyFunctionsOrClasses.includes('evaluate_uncertainty_covariance')) &&
      Boolean(relCs?.resolution.includes('forces an ABSTAIN verdict')),
    `Resolution snippet: "${relCs?.resolution.slice(0, 80)}..."`
  )

  // Case 8: DiffGuard Documentation Gap Record
  const diffGuardGap = getCaseStudyById('case-study-gap-diffguard')
  assert(
    'Suite 3',
    'DiffGuard is explicitly recorded as an unevidenced documentation gap',
    diffGuardGap?.documentationCompleteness === 'INSUFFICIENT_EVIDENCE' &&
      diffGuardGap?.projectId === null &&
      diffGuardGap?.category === 'DOCUMENTATION_GAP',
    `Completeness: ${diffGuardGap?.documentationCompleteness}, ProjectId: ${diffGuardGap?.projectId}`
  )

  assert(
    'Suite 3',
    'DiffGuard gap record strictly abstains from inventing fake incidents or code',
    diffGuardGap?.implementationDetails.filesModifiedOrAuthored.length === 0 &&
      diffGuardGap?.claimIds.length === 0 &&
      diffGuardGap?.evidenceIds.length === 0,
    `Zero fabricated files, claims, or evidence IDs`
  )

  // ============================================================================
  // SUITE 4: METRIC QUALIFICATION, SCOPE DISCLOSURES & GOVERNANCE INVARIANTS
  // ============================================================================
  console.log('\n--- SUITE 4: Metric Qualification, Scope Disclosures & Governance Invariants ---')

  assert(
    'Suite 4',
    'EDA CAD case study explicitly caveats volume error vs physical CNC machining',
    Boolean(edaCs?.limitations.some(l => l.includes('software consistency between closed-form equations and CAD kernel mass integrals'))) &&
      Boolean(edaCs?.limitations.some(l => l.includes('does NOT assert physical CNC machining'))),
    `Limitations: ${edaCs?.limitations.join('; ')}`
  )

  assert(
    'Suite 4',
    'VM Copy case study qualifies <1ms metric strictly to Tier-1 in-memory regex/AST gate',
    Boolean(vmCs?.limitations.some(l => l.includes('applies strictly to the Tier-1 in-memory regex and AST gate'))) &&
      Boolean(vmCs?.limitations.some(l => l.includes('upstream generative LLM inference takes ~4–8 seconds'))),
    `Limitations: ${vmCs?.limitations.join('; ')}`
  )

  assert(
    'Suite 4',
    'AI Reliability case study specifies 158 as collected test cases, not test suites',
    Boolean(relCs?.limitations.some(l => l.includes('collected pytest test cases and parameterized assertions'))) &&
      Boolean(relCs?.limitations.some(l => l.includes('NOT 158 distinct test suite files'))),
    `Limitations: ${relCs?.limitations.join('; ')}`
  )

  const solaceCs = getCaseStudyById('case-study-solace-ai-streaming')
  assert(
    'Suite 4',
    'Solace AI case study caveats mobile checks vs physical Android device hardware',
    Boolean(solaceCs?.limitations.some(l => l.includes('verified strictly in React Native Jest test runners and TypeScript'))) &&
      Boolean(solaceCs?.limitations.some(l => l.includes('do NOT represent automated execution on physical Android device hardware'))),
    `Limitations: ${solaceCs?.limitations.join('; ')}`
  )

  // ============================================================================
  // SUITE 5: ATTRIBUTION, OWNERSHIP & COLLABORATIVE INTEGRITY
  // ============================================================================
  console.log('\n--- SUITE 5: Attribution, Ownership & Collaborative Integrity ---')

  // VM Copy Ownership Integrity
  assert(
    'Suite 5',
    'VM Copy case study preserves EMPLOYER_PROPRIETARY IP ownership',
    vmCs?.visibility === 'EMPLOYER_PROPRIETARY_CASE_STUDY' &&
      vmCs?.publicationStatus === 'PROPRIETARY_RESTRICTED',
    `Visibility: ${vmCs?.visibility}, PublicationStatus: ${vmCs?.publicationStatus}`
  )

  assert(
    'Suite 5',
    'VM Copy case study links strictly to car-wayground-math-sme career ID',
    vmCs?.careerIds.length === 1 && vmCs.careerIds[0] === 'car-wayground-math-sme',
    `CareerIds: ${vmCs?.careerIds.join(', ')}`
  )

  // Curriculum ETL Ownership Integrity
  const etlCs = getCaseStudyById('case-study-curriculum-etl-guards')
  assert(
    'Suite 5',
    'Curriculum ETL preserves EMPLOYER_PROPRIETARY and car-wayground-aiml association',
    etlCs?.visibility === 'EMPLOYER_PROPRIETARY_CASE_STUDY' &&
      etlCs?.careerIds.includes('car-wayground-aiml') === true,
    `Visibility: ${etlCs?.visibility}, Career: ${etlCs?.careerIds.join(', ')}`
  )

  // Item Bank Collaborative Contribution Integrity
  const itemBankCs = getCaseStudyById('case-study-item-bank-domain-routing')
  assert(
    'Suite 5',
    'Item Bank case study preserves collaborative team attribution and specific personal scope',
    Boolean(itemBankCs?.limitations.some(l => l.includes('candidate contributed specific modules'))) &&
      Boolean(itemBankCs?.limitations.some(l => l.includes('underlying core platform was built by the Wayground engineering team'))),
    `Limitations: ${itemBankCs?.limitations.join('; ')}`
  )

  // ============================================================================
  // SUITE 6: CONFIDENTIALITY & PUBLICATION BOUNDARY ENFORCEMENT
  // ============================================================================
  console.log('\n--- SUITE 6: Confidentiality & Publication Boundary Enforcement ---')

  const proprietaryCases = engineeringCaseStudies.filter(
    cs => cs.visibility === 'EMPLOYER_PROPRIETARY_CASE_STUDY'
  )
  assert(
    'Suite 6',
    'Proprietary case studies enforce PROPRIETARY_RESTRICTED publication status',
    proprietaryCases.every(cs => cs.publicationStatus === 'PROPRIETARY_RESTRICTED'),
    `All ${proprietaryCases.length} proprietary case studies marked PROPRIETARY_RESTRICTED`
  )

  const hasLeakedPrivateUrl = engineeringCaseStudies.some(cs => {
    const text = JSON.stringify(cs).toLowerCase()
    return text.includes('github.com/wayground') || text.includes('github.com/quizizz')
  })
  assert(
    'Suite 6',
    'Zero private corporate GitHub repository URLs across all case studies',
    !hasLeakedPrivateUrl,
    'Verified 0 private corporate repository leaks'
  )

  // ============================================================================
  // SUITE 7: ADAPTER API & RESOLUTION PROJECTION FUNCTIONS
  // ============================================================================
  console.log('\n--- SUITE 7: Adapter API & Resolution Projection Functions ---')

  const allStudies = getAllCaseStudies()
  assert(
    'Suite 7',
    'getAllCaseStudies returns complete collection',
    allStudies.length === engineeringCaseStudies.length,
    `Count: ${allStudies.length}`
  )

  const edaStudies = getCaseStudiesByProject('proj-design-automation')
  assert(
    'Suite 7',
    'getCaseStudiesByProject returns EDA CAD case study',
    edaStudies.length === 1 && edaStudies[0].id === 'case-study-eda-cad-volume-materials',
    `Found: ${edaStudies.map(s => s.id).join(', ')}`
  )

  const waygroundStudies = getCaseStudiesByCareer('car-wayground-math-sme')
  assert(
    'Suite 7',
    'getCaseStudiesByCareer returns VM Copy case study',
    waygroundStudies.length === 1 && waygroundStudies[0].id === 'case-study-vm-copy-eval-layer',
    `Found: ${waygroundStudies.map(s => s.id).join(', ')}`
  )

  const voiceChapterStudies = getCaseStudiesByJournalChapter('ch-21-ask-aadil')
  assert(
    'Suite 7',
    'getCaseStudiesByJournalChapter returns Ask Aadil speech case study',
    voiceChapterStudies.length === 1 && voiceChapterStudies[0].id === 'case-study-ask-aadil-speech-transcript',
    `Found: ${voiceChapterStudies.map(s => s.id).join(', ')}`
  )

  const publicStudies = getPublicCaseStudies()
  assert(
    'Suite 7',
    'getPublicCaseStudies excludes proprietary restricted case studies',
    publicStudies.every(cs => cs.visibility === 'PUBLIC' && cs.publicationStatus === 'PUBLIC_APPROVED') &&
      !publicStudies.some(cs => cs.id === 'case-study-vm-copy-eval-layer'),
    `Returned ${publicStudies.length} public case studies; zero proprietary leaks`
  )

  const resolvedEda = getResolvedCaseStudy('case-study-eda-cad-volume-materials')
  assert(
    'Suite 7',
    'getResolvedCaseStudy resolves canonical project, career, claim, and evidence records',
    Boolean(resolvedEda?.project && resolvedEda.project.slug === 'design-automation') &&
      resolvedEda?.careers.length === 1 &&
      resolvedEda?.claims.length === 2 &&
      resolvedEda?.evidence.length === 2 &&
      resolvedEda?.journalChapters.length === 1,
    `Resolved: project=${resolvedEda?.project?.title}, claims=${resolvedEda?.claims.length}, evidence=${resolvedEda?.evidence.length}`
  )

  // ============================================================================
  // SUMMARY
  // ============================================================================
  console.log('\n====================================================================')
  console.log('                          TEST SUMMARY                              ')
  console.log('====================================================================')
  const total = results.length
  const passed = results.filter(r => r.passed).length
  const failed = total - passed

  console.log(`Total Assertions: ${total}`)
  console.log(`Passed:           ${passed}`)
  console.log(`Failed:           ${failed}`)
  console.log(`Success Rate:     ${((passed / total) * 100).toFixed(1)}%\n`)

  if (failed > 0) {
    console.error(`FAILED: ${failed} assertions failed!`)
    process.exit(1)
  } else {
    console.log('ALL PHASE 2.5A ENGINEERING CASE STUDY TESTS PASSED CLEANLY!')
  }
}

runEngineeringCaseStudyTests().catch(err => {
  console.error('Test execution error:', err)
  process.exit(1)
})
