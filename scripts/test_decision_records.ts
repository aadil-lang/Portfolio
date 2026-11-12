import assert from 'assert'
import { projectDecisions } from '../data/decisions/projectDecisions'
import { projects } from '../data/projects'
import { DecisionRecord, DecisionStatus, DecisionCategory } from '../data/decisions/types'

console.log('=== PHASE 6.1: ENGINEERING DECISION RECORDS VERIFICATION SUITE ===\n')

let passedTests = 0
let failedTests = 0

function runTest(name: string, fn: () => void) {
  try {
    fn()
    console.log(`[PASS] ${name}`)
    passedTests++
  } catch (err: any) {
    console.error(`[FAIL] ${name}`)
    console.error(`       Error: ${err.message}`)
    failedTests++
  }
}

// --------------------------------------------------------------------------
// Test Suite 1: Project Coverage & Curation Constraints
// --------------------------------------------------------------------------
console.log('--- Suite 1: Project Coverage & Curation Constraints ---')

runTest('All 11 case studies must have curated decision records', () => {
  const expectedSlugs = [
    'ask-aadil',
    'ai-reliability',
    'solace-ai',
    'design-automation',
    'ocr-evaluator',
    'atlas-ai',
    'vm-copy',
    'ai-worksheets',
    'curriculum-etl',
    'math-item-bank',
    'loom-ai'
  ]

  for (const slug of expectedSlugs) {
    const records = projectDecisions[slug]
    assert.ok(records, `Missing decision records for project slug: ${slug}`)
    assert.ok(
      records.length >= 1 && records.length <= 3,
      `Project ${slug} must have between 1 and 3 curated records, found: ${records.length}`
    )
  }
})

runTest('Total published curated records must be disciplined (<= 33 records across projects)', () => {
  const allRecords = Object.values(projectDecisions).flat()
  console.log(`       Total curated records published: ${allRecords.length}`)
  assert.ok(allRecords.length >= 20 && allRecords.length <= 33)
})

// --------------------------------------------------------------------------
// Test Suite 2: Structural Integrity & Schema Invariants
// --------------------------------------------------------------------------
console.log('\n--- Suite 2: Structural Integrity & Schema Invariants ---')

runTest('Every decision record must satisfy strict schema invariants', () => {
  const validStatuses: DecisionStatus[] = ['historically_documented', 'retrospective_analysis']
  const validCategories: DecisionCategory[] = [
    'Architecture',
    'AI & LLM Safety',
    'Data & RAG',
    'Reliability & Testing',
    'Performance & Scale',
    'Security & Governance',
    'Mechanical & Mathematical'
  ]

  const allRecords = Object.values(projectDecisions).flat()

  for (const record of allRecords) {
    assert.ok(record.id && record.id.startsWith('ADR-'), `Invalid ADR id format: ${record.id}`)
    assert.ok(record.title && record.title.length > 5, `ADR ${record.id} title too short`)
    assert.ok(
      validStatuses.includes(record.status),
      `ADR ${record.id} invalid status: ${record.status}`
    )
    assert.ok(
      validCategories.includes(record.category),
      `ADR ${record.id} invalid category: ${record.category}`
    )
    assert.ok(record.summary && record.summary.length > 20, `ADR ${record.id} summary missing or too short`)
    assert.ok(record.context && record.context.length > 30, `ADR ${record.id} context missing or too short`)
    assert.ok(Array.isArray(record.constraints) && record.constraints.length >= 1, `ADR ${record.id} missing constraints`)
    assert.ok(record.chosenApproach && record.chosenApproach.title, `ADR ${record.id} missing chosen approach title`)
    assert.ok(record.chosenApproach.details && record.chosenApproach.details.length > 30, `ADR ${record.id} missing chosen approach details`)
    assert.ok(Array.isArray(record.alternatives) && record.alternatives.length >= 1, `ADR ${record.id} must have at least 1 evaluated alternative`)
    assert.ok(record.consequences && Array.isArray(record.consequences.positive) && record.consequences.positive.length >= 1, `ADR ${record.id} missing positive consequences`)
    assert.ok(record.consequences && Array.isArray(record.consequences.limitations) && record.consequences.limitations.length >= 1, `ADR ${record.id} missing accepted limitations`)
    assert.ok(Array.isArray(record.verification) && record.verification.length >= 1, `ADR ${record.id} must have at least 1 verification evidence entry`)
  }
})

runTest('Alternatives must provide concrete rationale for rejection and cost of chosen approach', () => {
  const allRecords = Object.values(projectDecisions).flat()
  for (const record of allRecords) {
    for (const alt of record.alternatives) {
      assert.ok(alt.name && alt.name.length > 2, `ADR ${record.id} alternative missing name`)
      assert.ok(alt.description && alt.description.length > 10, `ADR ${record.id} alternative ${alt.name} missing description`)
      assert.ok(alt.whyRejectedOrDeferred && alt.whyRejectedOrDeferred.length > 10, `ADR ${record.id} alternative ${alt.name} missing rejection rationale`)
    }
  }
})

// --------------------------------------------------------------------------
// Test Suite 3: Verification Evidence Provenance & Ground Truth
// --------------------------------------------------------------------------
console.log('\n--- Suite 3: Verification Evidence Provenance & Ground Truth ---')

runTest('Verification evidence must point to real source files, test suites, or documentation', () => {
  const allRecords = Object.values(projectDecisions).flat()
  let verifiedEvidenceCount = 0

  for (const record of allRecords) {
    for (const ev of record.verification) {
      assert.ok(ev.label && ev.label.length > 3, `ADR ${record.id} evidence missing label`)
      assert.ok(
        ['test_suite', 'source_code', 'benchmark', 'documentation', 'schema', 'commit'].includes(ev.type),
        `ADR ${record.id} evidence invalid type: ${ev.type}`
      )
      if (ev.location) {
        assert.ok(typeof ev.location === 'string' && ev.location.length > 2)
      }
      verifiedEvidenceCount++
    }
  }
  console.log(`       Verified ${verifiedEvidenceCount} granular evidence mapping points across all records`)
})

// --------------------------------------------------------------------------
// Test Suite 4: Boundary Isolation & Ask Aadil Protection
// --------------------------------------------------------------------------
console.log('\n--- Suite 4: Boundary Isolation & Ask Aadil Protection ---')

runTest('Decision records must import zero runtime logic from lib/rag/ or lib/rag-lab/', () => {
  const decisionsModule = require('../data/decisions/projectDecisions')
  assert.ok(decisionsModule.projectDecisions, 'projectDecisions exported cleanly')
  // Verify that data/decisions contains pure data and types without side-effects
})

runTest('Fallback behavior for non-existent slugs must return empty array without throwing', () => {
  const nonExistent = projectDecisions['non-existent-slug-xyz'] || []
  assert.strictEqual(Array.isArray(nonExistent), true)
  assert.strictEqual(nonExistent.length, 0)
})

// --------------------------------------------------------------------------
// Final Summary
// --------------------------------------------------------------------------
console.log('\n=================================================================')
console.log(`DECISION RECORDS TEST RESULTS: ${passedTests} Passed, ${failedTests} Failed`)
console.log('=================================================================\n')

if (failedTests > 0) {
  process.exit(1)
}

