/**
 * Test Suite: Verification & Evidence Dashboard Integrity & Schema Invariants
 *
 * Verifies:
 * 1. Evidence Registry Schema & Invariants (33 Records)
 * 2. Evidence ID Uniqueness & Stable Naming Convention (EVID-*)
 * 3. Project Summary Consistency & Referential Integrity
 * 4. Critical Engineering Qualifications (EDA, Solace, RAG Lab, Item Bank)
 * 5. Cross-Reference Integrity (Architecture Components & Decision Records)
 * 6. Reproduction Command Safety (No machine paths, safe relative syntax)
 * 7. Negative Invariant Validation (Rejects Malformed Records)
 * 8. Architectural Isolation (Ask Aadil and RAG Lab Boundary Protection)
 */

import { evidenceRegistry } from '../data/verification/evidenceRegistry'
import { projectVerificationSummaries, computeVerificationMetrics } from '../data/verification/projectVerification'
import { VerificationEvidence, VerificationModality, VerificationStatus } from '../data/verification/types'
import * as fs from 'fs'
import * as path from 'path'

interface TestResult {
  suite: string
  name: string
  passed: boolean
  error?: string
}

const results: TestResult[] = []

function assert(condition: boolean, suite: string, name: string, errorMsg: string) {
  if (condition) {
    results.push({ suite, name, passed: true })
  } else {
    results.push({ suite, name, passed: false, error: errorMsg })
    console.error(`❌ [FAIL] ${suite} -> ${name}: ${errorMsg}`)
  }
}

console.log('='.repeat(70))
console.log('VERIFICATION & EVIDENCE DASHBOARD INTEGRITY SUITE')
console.log('='.repeat(70))

// ---------------------------------------------------------------------------
// SUITE 1: EVIDENCE REGISTRY SCHEMA & FIELD COMPLETENESS
// ---------------------------------------------------------------------------
const suite1 = 'Suite 1: Evidence Registry Schema'

assert(evidenceRegistry.length === 33, suite1, 'Evidence Record Count (33 Records)', `Expected 33, got ${evidenceRegistry.length}`)

const validCategories: VerificationModality[] = [
  'automated-suite',
  'mathematical-verification',
  'golden-benchmark',
  'deterministic-boundary',
  'security-containment',
  'performance-cache',
  'architectural-invariant'
]

const validStatuses: VerificationStatus[] = [
  'VERIFIED',
  'REPORTED',
  'PARTIALLY VERIFIED',
  'HISTORICAL',
  'UNVERIFIED',
  'QUALIFIED',
  'SUPERSEDED'
]

evidenceRegistry.forEach((ev) => {
  assert(Boolean(ev.id && /^EVID-[A-Z]+-[0-9]{2}$/.test(ev.id)), suite1, `Valid ID Format: ${ev.id}`, `Invalid ID ${ev.id}`)
  assert(Boolean(ev.title && ev.title.trim().length > 5), suite1, `Non-empty Title: ${ev.id}`, `Empty title in ${ev.id}`)
  assert(Boolean(ev.projectName && ev.projectName.trim().length > 0), suite1, `Non-empty Project Name: ${ev.id}`, `Missing project name in ${ev.id}`)
  assert(validCategories.includes(ev.category), suite1, `Valid Category: ${ev.id}`, `Invalid category ${ev.category}`)
  assert(validStatuses.includes(ev.status), suite1, `Valid Status: ${ev.id}`, `Invalid status ${ev.status}`)
  assert(Boolean(ev.verificationMethod && ev.verificationMethod.trim().length > 0), suite1, `Verification Method: ${ev.id}`, `Missing method in ${ev.id}`)
  assert(Boolean(ev.sourceFile && ev.sourceFile.trim().length > 0), suite1, `Source File Provenance: ${ev.id}`, `Missing sourceFile in ${ev.id}`)
  assert(Boolean(ev.summary && ev.summary.trim().length > 20), suite1, `Detailed Summary: ${ev.id}`, `Summary too short in ${ev.id}`)
  assert(Boolean(ev.conditions && ev.conditions.trim().length > 0), suite1, `Documented Conditions: ${ev.id}`, `Missing conditions in ${ev.id}`)
  assert(Boolean(ev.executionCommand && ev.executionCommand.trim().length > 0), suite1, `Execution Command: ${ev.id}`, `Missing command in ${ev.id}`)
})

// ---------------------------------------------------------------------------
// SUITE 2: UNIQUE EVIDENCE IDS & STABLE NAMING
// ---------------------------------------------------------------------------
const suite2 = 'Suite 2: Evidence ID Uniqueness'
const idsSet = new Set<string>()
evidenceRegistry.forEach((ev) => {
  assert(!idsSet.has(ev.id), suite2, `Unique Evidence ID: ${ev.id}`, `Duplicate ID found: ${ev.id}`)
  idsSet.add(ev.id)
})
assert(idsSet.size === 33, suite2, 'Unique ID Count Matches Registry Size', `Expected 33 unique IDs, got ${idsSet.size}`)

// ---------------------------------------------------------------------------
// SUITE 3: PROJECT SUMMARY CONSISTENCY & REFERENTIAL INTEGRITY
// ---------------------------------------------------------------------------
const suite3 = 'Suite 3: Project Summary Integrity'
assert(projectVerificationSummaries.length === 15, suite3, 'Registered Project Count (15 Systems)', `Expected 15, got ${projectVerificationSummaries.length}`)

const projectSlugs = new Set(projectVerificationSummaries.map((p) => p.slug))

projectVerificationSummaries.forEach((p) => {
  assert(Boolean(p.name && p.name.trim().length > 0), suite3, `Project Name: ${p.slug}`, `Empty name in ${p.slug}`)
  assert(Boolean(p.caseStudyRoute && p.caseStudyRoute.startsWith('/')), suite3, `Valid Route: ${p.slug}`, `Invalid route ${p.caseStudyRoute}`)
  assert(p.evidenceIds.length > 0, suite3, `Non-empty Evidence IDs: ${p.slug}`, `No evidence IDs in ${p.slug}`)
  assert(Boolean(p.keyOutcome && p.keyOutcome.trim().length > 0), suite3, `Key Outcome: ${p.slug}`, `Empty key outcome in ${p.slug}`)
  assert(Boolean(p.limitations && p.limitations.trim().length > 0), suite3, `Limitations Disclosed: ${p.slug}`, `Missing limitations in ${p.slug}`)

  // Verify all evidenceIds resolve to real evidence in evidenceRegistry
  p.evidenceIds.forEach((eid) => {
    assert(idsSet.has(eid), suite3, `Evidence ID Resolution: ${p.slug} -> ${eid}`, `Unresolved evidence ID ${eid} in project ${p.slug}`)
  })
})

evidenceRegistry.forEach((ev) => {
  assert(projectSlugs.has(ev.projectSlug), suite3, `Evidence Project Exists: ${ev.id} -> ${ev.projectSlug}`, `Unknown project slug ${ev.projectSlug}`)
})

// ---------------------------------------------------------------------------
// SUITE 4: AUTHORITATIVE CLAIM QUALIFICATIONS & ANTI-INFLATION
// ---------------------------------------------------------------------------
const suite4 = 'Suite 4: Authoritative Claim Qualifications'

// 1. EDA volume error must be QUALIFIED
const eda02 = evidenceRegistry.find((e) => e.id === 'EVID-EDA-02')
assert(Boolean(eda02), suite4, 'EDA-02 Exists', 'EVID-EDA-02 missing')
assert(eda02?.status === 'QUALIFIED', suite4, 'EDA-02 Status is QUALIFIED', `Expected QUALIFIED, got ${eda02?.status}`)
assert(
  Boolean(eda02?.limitations.includes('physical CNC machining manufacturing tolerance')),
  suite4,
  'EDA-02 Explicit CNC Tolerance Limitation',
  'Missing CNC manufacturing disclaimer'
)

// 2. Solace crisis detection must be QUALIFIED
const sol02 = evidenceRegistry.find((e) => e.id === 'EVID-SOL-02')
assert(Boolean(sol02), suite4, 'SOL-02 Exists', 'EVID-SOL-02 missing')
assert(sol02?.status === 'QUALIFIED', suite4, 'SOL-02 Status is QUALIFIED', `Expected QUALIFIED, got ${sol02?.status}`)
assert(
  Boolean(sol02?.limitations.includes('24 explicit compiled regex patterns')),
  suite4,
  'SOL-02 Bounded to 24 Regex Patterns',
  'Missing 24 regex pattern disclaimer'
)

// 3. RAG Lab vector space must be QUALIFIED
const rag01 = evidenceRegistry.find((e) => e.id === 'EVID-RAG-01')
assert(Boolean(rag01), suite4, 'RAG-01 Exists', 'EVID-RAG-01 missing')
assert(rag01?.status === 'QUALIFIED', suite4, 'RAG-01 Status is QUALIFIED', `Expected QUALIFIED, got ${rag01?.status}`)
assert(
  Boolean(rag01?.limitations.includes('subword character n-gram TF-IDF')),
  suite4,
  'RAG-01 Subword Vector Space Disclaimer',
  'Missing subword n-gram disclaimer'
)

// 4. US Math Item Bank must be QUALIFIED with Team Ownership
const mib01 = evidenceRegistry.find((e) => e.id === 'EVID-MIB-01')
assert(Boolean(mib01), suite4, 'MIB-01 Exists', 'EVID-MIB-01 missing')
assert(mib01?.status === 'QUALIFIED', suite4, 'MIB-01 Status is QUALIFIED', `Expected QUALIFIED, got ${mib01?.status}`)
assert(
  Boolean(mib01?.limitations.includes('Wayground Engineering Team')),
  suite4,
  'MIB-01 Team Ownership Attribution',
  'Missing Wayground team ownership disclaimer'
)

// ---------------------------------------------------------------------------
// SUITE 5: CROSS-REFERENCE INTEGRITY
// ---------------------------------------------------------------------------
const suite5 = 'Suite 5: Cross-Reference Integrity'
evidenceRegistry.forEach((ev) => {
  if (ev.relatedArchitectureComponent) {
    assert(
      ev.relatedArchitectureComponent.startsWith('comp-'),
      suite5,
      `Valid Architecture Component Prefix: ${ev.id}`,
      `Invalid component reference ${ev.relatedArchitectureComponent}`
    )
  }
  if (ev.relatedDecisionRecord) {
    assert(
      ev.relatedDecisionRecord.startsWith('dec-'),
      suite5,
      `Valid Decision Record Prefix: ${ev.id}`,
      `Invalid decision record reference ${ev.relatedDecisionRecord}`
    )
  }
})

// ---------------------------------------------------------------------------
// SUITE 6: REPRODUCTION COMMAND SAFETY
// ---------------------------------------------------------------------------
const suite6 = 'Suite 6: Reproduction Command Safety'
evidenceRegistry.forEach((ev) => {
  const cmd = ev.executionCommand
  assert(!cmd.includes('rm -rf'), suite6, `No Dangerous Deletion: ${ev.id}`, `Command contains rm -rf: ${cmd}`)
  assert(!cmd.includes('sudo'), suite6, `No Privilege Escalation: ${ev.id}`, `Command contains sudo: ${cmd}`)
  assert(!cmd.includes('eval('), suite6, `No Dynamic Eval: ${ev.id}`, `Command contains eval: ${cmd}`)
  assert(!cmd.includes('C:\\Users\\'), suite6, `No Machine-Specific Windows Paths: ${ev.id}`, `Command contains absolute user path: ${cmd}`)
  assert(!cmd.includes('/home/'), suite6, `No Machine-Specific Linux Paths: ${ev.id}`, `Command contains absolute home path: ${cmd}`)
})

// ---------------------------------------------------------------------------
// SUITE 7: NEGATIVE INVARIANT VALIDATION (REJECTS MALFORMED DATA)
// ---------------------------------------------------------------------------
const suite7 = 'Suite 7: Negative Invariant Validation'

function validateEvidenceRecord(record: any): boolean {
  if (!record.id || !/^EVID-[A-Z]+-[0-9]{2}$/.test(record.id)) return false
  if (!record.title || record.title.trim().length < 5) return false
  if (!validCategories.includes(record.category)) return false
  if (!validStatuses.includes(record.status)) return false
  if (!record.sourceFile || record.sourceFile.trim().length === 0) return false
  return true
}

// Case A: Missing ID
assert(validateEvidenceRecord({ title: 'Test', category: 'automated-suite', status: 'VERIFIED', sourceFile: 'test.py' }) === false, suite7, 'Rejects Missing ID', 'Failed to reject missing ID')

// Case B: Invalid ID Format
assert(validateEvidenceRecord({ id: 'INVALID-ID', title: 'Test Record', category: 'automated-suite', status: 'VERIFIED', sourceFile: 'test.py' }) === false, suite7, 'Rejects Invalid ID Format', 'Failed to reject invalid ID format')

// Case C: Invalid Status
assert(validateEvidenceRecord({ id: 'EVID-TEST-01', title: 'Test Record', category: 'automated-suite', status: 'NON_EXISTENT_STATUS', sourceFile: 'test.py' }) === false, suite7, 'Rejects Invalid Status', 'Failed to reject invalid status')

// Case D: Invalid Category
assert(validateEvidenceRecord({ id: 'EVID-TEST-01', title: 'Test Record', category: 'unknown-category', status: 'VERIFIED', sourceFile: 'test.py' }) === false, suite7, 'Rejects Invalid Category', 'Failed to reject invalid category')

// Case E: Missing Source File
assert(validateEvidenceRecord({ id: 'EVID-TEST-01', title: 'Test Record', category: 'automated-suite', status: 'VERIFIED', sourceFile: '' }) === false, suite7, 'Rejects Missing Source File', 'Failed to reject missing source file')

// ---------------------------------------------------------------------------
// SUITE 8: ARCHITECTURAL BOUNDARY ISOLATION
// ---------------------------------------------------------------------------
const suite8 = 'Suite 8: Architectural Boundary Isolation'

const verificationFiles = [
  path.resolve(process.cwd(), 'data/verification/types.ts'),
  path.resolve(process.cwd(), 'data/verification/evidenceRegistry.ts'),
  path.resolve(process.cwd(), 'data/verification/projectVerification.ts'),
  path.resolve(process.cwd(), 'components/verification/VerificationDashboard.tsx'),
  path.resolve(process.cwd(), 'components/verification/VerificationCommandDeck.tsx'),
  path.resolve(process.cwd(), 'components/verification/SystemVerificationMatrix.tsx'),
  path.resolve(process.cwd(), 'components/verification/EvidenceExplorer.tsx'),
  path.resolve(process.cwd(), 'components/verification/EvidenceCard.tsx'),
  path.resolve(process.cwd(), 'components/verification/QuantitativeClaimsComparison.tsx'),
  path.resolve(process.cwd(), 'components/verification/DocumentedLimitationsDrawer.tsx'),
  path.resolve(process.cwd(), 'components/verification/ReproductionCenter.tsx')
]

verificationFiles.forEach((filePath) => {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8')
    assert(
      !content.includes('lib/rag/askAadilAgent') && !content.includes('lib/rag-lab/retriever'),
      suite8,
      `Boundary Isolation: ${path.basename(filePath)}`,
      `File ${path.basename(filePath)} illegally imports Ask Aadil runtime or RAG Lab engine`
    )
  }
})

// ---------------------------------------------------------------------------
// SUITE 9: AGGREGATE METRICS COMPUTATION ACCURACY
// ---------------------------------------------------------------------------
const suite9 = 'Suite 9: Aggregate Metrics Computation'
const computed = computeVerificationMetrics()
assert(computed.totalRegisteredEvidence === 33, suite9, 'Metrics: Total Evidence Count (33)', `Expected 33, got ${computed.totalRegisteredEvidence}`)
assert(computed.inRepoAssertions === 758, suite9, 'Metrics: In-Repo Assertions (758)', `Expected 758, got ${computed.inRepoAssertions}`)
assert(computed.upstreamTests === 1650, suite9, 'Metrics: Upstream Tests (1650)', `Expected 1650, got ${computed.upstreamTests}`)
assert(computed.goldenBenchmarkCases === 12, suite9, 'Metrics: Golden Benchmark Cases (12)', `Expected 12, got ${computed.goldenBenchmarkCases}`)
assert(computed.zeroRegressions === true, suite9, 'Metrics: Zero Regressions Flag', 'Expected zero regressions true')

// ---------------------------------------------------------------------------
// SUMMARY
// ---------------------------------------------------------------------------
const passedCount = results.filter((r) => r.passed).length
const failedCount = results.filter((r) => !r.passed).length

console.log('\n' + '='.repeat(70))
console.log('TEST SUITE EXECUTION SUMMARY')
console.log('='.repeat(70))
const suites = Array.from(new Set(results.map((r) => r.suite)))
suites.forEach((s) => {
  const suiteResults = results.filter((r) => r.suite === s)
  const p = suiteResults.filter((r) => r.passed).length
  const total = suiteResults.length
  console.log(`✅ ${s}: ${p}/${total} passed`)
})
console.log('-'.repeat(70))
console.log(`TOTAL: ${passedCount} passed, ${failedCount} failed out of ${results.length} checks`)
console.log('='.repeat(70))

if (failedCount > 0) {
  process.exit(1)
} else {
  console.log('ALL VERIFICATION & EVIDENCE DASHBOARD CHECKS PASSED SUCCESSFULLY.\n')
}
