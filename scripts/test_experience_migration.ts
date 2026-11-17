/**
 * CANONICAL CAREER EXPERIENCE MIGRATION TEST SUITE (PHASE 2.1)
 *
 * Comprehensive verification of data/adapters/experienceAdapter.ts and data/experience.ts.
 * Validates:
 * A. Canonical coverage (all 7 canonical career records)
 * B. Chronology and legacy errata corrections (DIGIPPLUS Jun-Sep 2022, Independent Quant Sep 2022-Dec 2023, VM Copy Oct-Nov 2025)
 * C. Precision & formatting (month-level precision preserved, no invented days)
 * D. Adapter determinism and canonical immutability
 * E. Public contract compatibility (experience, timelineData, TimelineItem)
 * F. Adversarial edge-case resilience
 */

import { experience, timelineData } from '../data/experience'
import {
  getCanonicalTimeline,
  getCanonicalCareerMilestones,
  getCanonicalCareerRecord,
  formatCanonicalDatePoint,
  formatCanonicalTimeSpan
} from '../data/adapters/experienceAdapter'
import { canonicalRegistry } from '../data/canonical/canonicalRegistry'

let totalTests = 0
let passedTests = 0
let failedTests = 0

function assert(condition: boolean, testName: string, failureDetails?: string): void {
  totalTests++
  if (condition) {
    passedTests++
    console.log(`  ✓ PASS: ${testName}`)
  } else {
    failedTests++
    console.error(`  ✗ FAIL: ${testName}`)
    if (failureDetails) {
      console.error(`    Details: ${failureDetails}`)
    }
  }
}

console.log('=================================================================')
console.log('PHASE 2.1: CAREER EXPERIENCE MIGRATION TEST SUITE')
console.log('=================================================================\n')

// -------------------------------------------------------------------------
// SUITE 1: PUBLIC CONTRACT & CONSUMER COMPATIBILITY
// -------------------------------------------------------------------------
console.log('Test Suite 1: Public Contract & Consumer Compatibility')
assert(Array.isArray(experience), 'experience export is an array')
assert(Array.isArray(timelineData), 'timelineData export is an array')
assert(experience === timelineData, 'timelineData references experience export exactly')
assert(experience.length === 23, `experience contains exactly 23 TimelineItems (found: ${experience.length})`)

const requiredFields = ['id', 'period', 'title', 'organization', 'role', 'layerAnnotation', 'summary', 'details', 'technologies']
const allHaveRequired = experience.every(item =>
  requiredFields.every(field => (item as any)[field] !== undefined)
)
assert(allHaveRequired, 'All 23 TimelineItems contain all required legacy fields')

// -------------------------------------------------------------------------
// SUITE 2: CANONICAL COVERAGE (ALL 7 CANONICAL CAREERS)
// -------------------------------------------------------------------------
console.log('\nTest Suite 2: Canonical Coverage (All 7 Career Records)')
const canonicalMilestones = getCanonicalCareerMilestones()
assert(canonicalMilestones.length === 7, `getCanonicalCareerMilestones() returns exactly 7 career milestones (found: ${canonicalMilestones.length})`)

const expectedCareerIds = [
  'car-graveiens',
  'car-inhaltmart',
  'car-digipplus',
  'car-independent-quantitative',
  'car-wayground-math-sme',
  'car-wayground-aiml',
  'car-independent-research'
]
for (const cId of expectedCareerIds) {
  const found = canonicalMilestones.some(m => m.id === cId)
  assert(found, `Canonical milestone '${cId}' is emitted by adapter`)
}

// Check coverage in timelineData:
const graveiensItem = experience.find(i => i.id === 'may-2021-oct-2021-graveiens')
assert(graveiensItem !== undefined, 'Item 0: Graveiens TimelineItem exists')
assert(graveiensItem?.organization === 'Graveiens Eduservices Pvt. Ltd.', 'Graveiens organization matches canonical record')

const inhaltmartItem = experience.find(i => i.id === 'oct-2021-feb-2022-inhaltmart')
assert(inhaltmartItem !== undefined, 'Item 1: InhaltMart TimelineItem exists')
assert(inhaltmartItem?.organization === 'InhaltMart Educational Services Pvt. Ltd.', 'InhaltMart organization matches canonical record')

const digipplusItem = experience.find(i => i.id === 'jun-2022-jul-2022-digiplus')
assert(digipplusItem !== undefined, 'Item 2: DIGIPPLUS TimelineItem exists')
assert(digipplusItem?.organization === 'DIGIPPLUS', 'DIGIPPLUS organization matches canonical record')

const quantItem = experience.find(i => i.id === 'aug-2022-dec-2023-learning')
assert(quantItem !== undefined, 'Item 3: Independent Quant TimelineItem exists')
const quantCanonicalRec = canonicalRegistry.careerRecords.find(c => c.careerId === 'car-independent-quantitative')
assert(quantItem?.organization === quantCanonicalRec?.organization, 'Independent Quant organization matches canonical record')

const waygroundSmeSub = experience.filter(i => i.isWaygroundSubMilestone)
assert(waygroundSmeSub.length === 8, `Wayground SME contains exactly 8 sub-milestones (found: ${waygroundSmeSub.length})`)

const waygroundAimlItems = experience.filter(i => ['2026-ai-worksheets', '2026-curriculum-etl', '2026-math-item-bank'].includes(i.id))
assert(waygroundAimlItems.length === 3, `Wayground AI/ML contains 3 project items (found: ${waygroundAimlItems.length})`)

const futureItem = experience.find(i => i.id === 'future-still-building')
assert(futureItem !== undefined, 'Continuing frontier TimelineItem exists')
assert(futureItem?.organization === 'Independent AI Engineering & Research', 'Continuing frontier organization matches canonical record')

// -------------------------------------------------------------------------
// SUITE 3: CHRONOLOGY & ERRATA CORRECTION VERIFICATION
// -------------------------------------------------------------------------
console.log('\nTest Suite 3: Chronology & Errata Correction Verification')

// Correction 1: DIGIPPLUS must end in September 2022 (not July 2022)
assert(digipplusItem?.period === 'Jun 2022 — Sep 2022', `DIGIPPLUS period corrected to 'Jun 2022 — Sep 2022' (actual: '${digipplusItem?.period}')`)

// Correction 2: Independent Quant must start in September 2022 (not August 2022)
assert(quantItem?.period === 'Sep 2022 — Dec 2023', `Independent Quant period corrected to 'Sep 2022 — Dec 2023' (actual: '${quantItem?.period}')`)

// Correction 3: VM Copy development must be late 2025 (Oct–Nov 2025 during SME tenure, not 2026)
const vmCopyTimeline = experience.find(i => i.id === 'wayground-m08-vm-copy-generator')
assert(vmCopyTimeline?.period === 'Oct 2025 — Nov 2025', `VM Copy sub-milestone period corrected to 'Oct 2025 — Nov 2025' (actual: '${vmCopyTimeline?.period}')`)

// Boundary Semantics Verification:
const graveiensCanonical = getCanonicalCareerRecord('car-graveiens')
const graveiensEnd = graveiensCanonical?.employmentPeriod.end
assert(typeof graveiensEnd === 'object' && graveiensEnd.boundaryType === 'INTERVAL_OVERLAP', 'Graveiens end boundaryType is INTERVAL_OVERLAP')

const inhaltmartCanonical = getCanonicalCareerRecord('car-inhaltmart')
assert(inhaltmartCanonical?.employmentPeriod.start.boundaryType === 'INTERVAL_OVERLAP', 'InhaltMart start boundaryType is INTERVAL_OVERLAP')

const digipplusCanonical = getCanonicalCareerRecord('car-digipplus')
const digipplusEnd = digipplusCanonical?.employmentPeriod.end
assert(typeof digipplusEnd === 'object' && digipplusEnd.boundaryType === 'TRANSITION_WINDOW', 'DIGIPPLUS end boundaryType is TRANSITION_WINDOW')

const quantCanonical = getCanonicalCareerRecord('car-independent-quantitative')
assert(quantCanonical?.employmentPeriod.start.boundaryType === 'TRANSITION_WINDOW', 'Independent Quant start boundaryType is TRANSITION_WINDOW')

// -------------------------------------------------------------------------
// SUITE 4: PRECISION, FORMATTING & ORDERING
// -------------------------------------------------------------------------
console.log('\nTest Suite 4: Precision, Formatting & Ordering')

// Verify no invented day-level precision
const noExactDays = experience.every(item => {
  const p = item.period.toLowerCase()
  // Ensure no ISO day format YYYY-MM-DD in period strings
  return !/\d{4}-\d{2}-\d{2}/.test(p)
})
assert(noExactDays, 'No invented day-level dates in timeline periods')

// Formatting helper tests:
assert(formatCanonicalDatePoint({ dateString: '2021-05', precision: 'month', confirmationStatus: 'INDEPENDENTLY_VERIFIED', boundaryType: 'EXACT_BOUNDARY' }) === 'May 2021', 'formatCanonicalDatePoint converts 2021-05 to May 2021')
assert(formatCanonicalDatePoint({ dateString: '2022-09', precision: 'month', confirmationStatus: 'INDEPENDENTLY_VERIFIED', boundaryType: 'EXACT_BOUNDARY' }) === 'Sep 2022', 'formatCanonicalDatePoint converts 2022-09 to Sep 2022')
assert(formatCanonicalDatePoint('PRESENT') === 'Present', 'formatCanonicalDatePoint handles PRESENT')
assert(formatCanonicalDatePoint('ONGOING') === 'Ongoing', 'formatCanonicalDatePoint handles ONGOING')
assert(formatCanonicalDatePoint(undefined) === '', 'formatCanonicalDatePoint handles undefined')

// Ordering check:
assert(experience[0].id === 'may-2021-oct-2021-graveiens', 'Item 0 is Graveiens (May 2021)')
assert(experience[1].id === 'oct-2021-feb-2022-inhaltmart', 'Item 1 is InhaltMart (Oct 2021)')
assert(experience[2].id === 'jun-2022-jul-2022-digiplus', 'Item 2 is DIGIPPLUS (Jun 2022)')
assert(experience[3].id === 'aug-2022-dec-2023-learning', 'Item 3 is Independent Quant (Sep 2022)')
assert(experience[22].id === 'future-still-building', 'Item 22 is Continuing Frontier (Present)')

// -------------------------------------------------------------------------
// SUITE 5: ADAPTER DETERMINISM & CANONICAL IMMUTABILITY
// -------------------------------------------------------------------------
console.log('\nTest Suite 5: Adapter Determinism & Canonical Immutability')

const run1 = getCanonicalTimeline()
const run2 = getCanonicalTimeline()
assert(run1.length === run2.length, 'getCanonicalTimeline() outputs identical length on successive calls')
assert(JSON.stringify(run1) === JSON.stringify(run2), 'getCanonicalTimeline() is 100% deterministic')

// Verify fresh object references (no shared mutable state)
assert(run1 !== run2, 'Successive calls return fresh array instances')
assert(run1[0] !== run2[0], 'Successive calls return fresh item instances')

// Verify canonical source was not mutated
const graveiensOriginalOrg = canonicalRegistry.careerRecords.find(c => c.careerId === 'car-graveiens')?.organization
assert(graveiensOriginalOrg === 'Graveiens Eduservices Pvt. Ltd.', 'canonicalRegistry careerRecords remain pristine and unmutated')

// -------------------------------------------------------------------------
// SUITE 6: ADVERSARIAL VALIDATION & RESILIENCE
// -------------------------------------------------------------------------
console.log('\nTest Suite 6: Adversarial Validation & Resilience')

// Check getCanonicalCareerRecord with non-existent ID
const missingCareer = getCanonicalCareerRecord('car-non-existent-career')
assert(missingCareer === undefined, 'getCanonicalCareerRecord safely returns undefined for unknown ID')

// Test formatCanonicalTimeSpan
const spanStr = formatCanonicalTimeSpan(
  { dateString: '2026-01', precision: 'month', confirmationStatus: 'INDEPENDENTLY_VERIFIED', boundaryType: 'EXACT_BOUNDARY' },
  { dateString: '2026-07', precision: 'month', confirmationStatus: 'INDEPENDENTLY_VERIFIED', boundaryType: 'EXACT_BOUNDARY' }
)
assert(spanStr === 'Jan 2026 — Jul 2026', `formatCanonicalTimeSpan correctly formats 'Jan 2026 — Jul 2026' (got: '${spanStr}')`)

const ongoingSpanStr = formatCanonicalTimeSpan(
  { dateString: '2026-08', precision: 'month', confirmationStatus: 'USER_CONFIRMED', boundaryType: 'EXACT_BOUNDARY' },
  'PRESENT'
)
assert(ongoingSpanStr === 'Aug 2026 — Present', `formatCanonicalTimeSpan correctly formats 'Aug 2026 — Present' (got: '${ongoingSpanStr}')`)

// Summary
console.log('\n-----------------------------------------------------------------')
console.log(`TOTAL TESTS: ${totalTests}`)
console.log(`PASSED:      ${passedTests}`)
console.log(`FAILED:      ${failedTests}`)
console.log('-----------------------------------------------------------------')

if (failedTests > 0) {
  console.error(`\nFAILED: ${failedTests} assertion(s) failed in experience migration suite!`)
  process.exit(1)
} else {
  console.log('\nALL CAREER EXPERIENCE MIGRATION INVARIANTS PASSED SUCCESSFULLY.')
  process.exit(0)
}
