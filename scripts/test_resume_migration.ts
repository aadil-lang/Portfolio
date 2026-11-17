/**
 * PORTFOLIO — PHASE 2.3: CANONICAL RESUME DATA MIGRATION TEST SUITE
 *
 * Comprehensive adversarial verification of the resume data migration:
 * 1. Public contract and consumer compatibility for `data/canonical/resumeData.ts` and `data/resumeData.ts`.
 * 2. Canonical alignment across career chronology, designations, and tenures.
 * 3. Canonical project alignment and attribution (Wayground enterprise, team, personal, hackathons).
 * 4. Publication restriction enforcement (proprietary systems have no public repo URLs).
 * 5. Metric governance and qualified technical claims (158 test cases, <1ms Tier-1 eval, 424 pytests).
 * 6. Adapter determinism, instance freshness, and canonical immutability.
 */

import { resumeData, StructuredResume, ResumeExperienceEntry, ResumeProjectEntry } from '../data/canonical/resumeData'
import { resumeData as resumeDataDirect } from '../data/resumeData'
import { getCanonicalStructuredResume } from '../data/adapters/resumeAdapter'
import { canonicalRegistry } from '../data/canonical/canonicalRegistry'

// Test runner state
let totalTests = 0
let passedTests = 0
let failedTests = 0

function assert(condition: boolean, testName: string, details?: string) {
  totalTests++
  if (condition) {
    passedTests++
    console.log(`  ✓ PASS: ${testName}`)
  } else {
    failedTests++
    console.error(`  ✗ FAIL: ${testName}${details ? ` -> ${details}` : ''}`)
  }
}

console.log('=================================================================')
console.log('PHASE 2.3: CANONICAL RESUME DATA MIGRATION TEST SUITE')
console.log('=================================================================\n')

// -----------------------------------------------------------------
// Test Suite 1: Public Contract & Consumer Compatibility
// -----------------------------------------------------------------
console.log('Test Suite 1: Public Contract & Consumer Compatibility')

assert(typeof resumeData === 'object' && resumeData !== null, 'resumeData export is an object')
assert(resumeData.sourceType === 'resume', "resumeData.sourceType is 'resume'")
assert(typeof resumeData.lastVerified === 'string', 'resumeData.lastVerified is a valid string')

// Both canonical/resumeData and data/resumeData exports match
assert(
  resumeDataDirect !== undefined && resumeDataDirect.sourceType === 'resume',
  'data/resumeData re-export is present and matches StructuredResume'
)
assert(
  resumeDataDirect.header.name === resumeData.header.name,
  'data/resumeData matches data/canonical/resumeData header'
)

// Structural section existence and types
assert(typeof resumeData.header === 'object', 'resumeData.header is an object')
assert(typeof resumeData.summary === 'string', 'resumeData.summary is a string')
assert(typeof resumeData.technicalSkills === 'object', 'resumeData.technicalSkills is an object')
assert(typeof resumeData.coreStack === 'object', 'resumeData.coreStack is an object')
assert(Array.isArray(resumeData.experience), 'resumeData.experience is an array')
assert(Array.isArray(resumeData.personalProjects), 'resumeData.personalProjects is an array')
assert(Array.isArray(resumeData.hackathonProjects), 'resumeData.hackathonProjects is an array')
assert(Array.isArray(resumeData.earlierExperience), 'resumeData.earlierExperience is an array')
assert(Array.isArray(resumeData.education), 'resumeData.education is an array')
assert(Array.isArray(resumeData.languages), 'resumeData.languages is an array')

// Header contact fields
assert(resumeData.header.name === 'Mohemmed Aadil Khurshid', "Header name is 'Mohemmed Aadil Khurshid'")
assert(
  resumeData.header.email === 'aadil.khurshid95@gmail.com',
  "Header primary email is 'aadil.khurshid95@gmail.com'"
)
assert(
  resumeData.header.linkedin === 'linkedin.com/in/mohemmed-aadil-khurshid-ba8246a6',
  'Header LinkedIn is populated'
)
assert(resumeData.header.github === 'github.com/aadil-lang', 'Header GitHub is populated')
assert(
  resumeData.header.portfolio === 'portfolio-ecru-five-5vd5okcvgi.vercel.app',
  'Header portfolio is populated'
)

console.log('')

// -----------------------------------------------------------------
// Test Suite 2: Career Chronology & Canonical Alignment
// -----------------------------------------------------------------
console.log('Test Suite 2: Career Chronology & Canonical Alignment')

// Primary corporate experience entries: exactly 2 Wayground roles
assert(
  resumeData.experience.length === 2,
  `Primary experience contains exactly 2 Wayground tenures (found: ${resumeData.experience.length})`
)

const aiEngineerEntry = resumeData.experience.find((e) => e.start === '2026-01')
assert(aiEngineerEntry !== undefined, 'Wayground AI Engineer entry exists (start: 2026-01)')
assert(aiEngineerEntry?.company === 'WAYGROUND Inc', "AI Engineer company is 'WAYGROUND Inc'")
assert(
  aiEngineerEntry?.role === 'AI Engineer — AI/ML Team',
  "AI Engineer designation matches canonical 'AI Engineer — AI/ML Team'"
)
assert(
  aiEngineerEntry?.period === 'January 2026 – July 2026',
  "AI Engineer period matches canonical 'January 2026 – July 2026'"
)
assert(aiEngineerEntry?.end === '2026-07', "AI Engineer end date is '2026-07'")

const smeEntry = resumeData.experience.find((e) => e.start === '2024-01')
assert(smeEntry !== undefined, 'Wayground SME entry exists (start: 2024-01)')
assert(smeEntry?.company === 'WAYGROUND Inc', "SME company is 'WAYGROUND Inc'")
assert(
  smeEntry?.role === 'Subject Matter Expert — Mathematics',
  "SME designation matches canonical 'Subject Matter Expert — Mathematics'"
)
assert(
  smeEntry?.period === 'January 2024 – December 2025',
  "SME period matches canonical 'January 2024 – December 2025'"
)
assert(smeEntry?.end === '2025-12', "SME end date is '2025-12'")

// VM Copy is NOT a separate employment entry
const vmCopyAsEmployment = resumeData.experience.find(
  (e) => e.company.toLowerCase().includes('vm copy') || e.role.toLowerCase().includes('vm copy')
)
assert(
  vmCopyAsEmployment === undefined,
  'VM Copy is NOT represented as a separate corporate employment entry'
)

// Earlier experience entries: exactly 3 entries
assert(
  resumeData.earlierExperience.length === 3,
  `Earlier experience contains exactly 3 entries (found: ${resumeData.earlierExperience.length})`
)

const digipplus = resumeData.earlierExperience[0]
assert(digipplus.company === 'DIGIPPLUS', "Earlier entry 0 company is 'DIGIPPLUS'")
assert(
  digipplus.period === 'June 2022 – September 2022',
  "DIGIPPLUS period matches canonical 'June 2022 – September 2022'"
)
assert(digipplus.role === 'QA/QC Specialist', "DIGIPPLUS role is 'QA/QC Specialist'")

const inhaltmart = resumeData.earlierExperience[1]
assert(
  inhaltmart.company === 'InhaltMart Educational Services Pvt. Ltd.',
  "Earlier entry 1 company is 'InhaltMart Educational Services Pvt. Ltd.'"
)
assert(
  inhaltmart.period === 'October 2021 – February 2022',
  "InhaltMart period matches canonical 'October 2021 – February 2022'"
)
assert(inhaltmart.role === 'SME, Mathematics', "InhaltMart role is 'SME, Mathematics'")

const graveiens = resumeData.earlierExperience[2]
assert(
  graveiens.company === 'Graveiens Eduservices Pvt. Ltd.',
  "Earlier entry 2 company is 'Graveiens Eduservices Pvt. Ltd.'"
)
assert(
  graveiens.period === 'May 2021 – October 2021',
  "Graveiens period matches canonical 'May 2021 – October 2021'"
)
assert(
  graveiens.role === 'Advanced Math Content Developer',
  "Graveiens role is 'Advanced Math Content Developer'"
)

// Chronology interval semantics verification
assert(
  inhaltmart.period.includes('October 2021') && graveiens.period.includes('October 2021'),
  'October 2021 interval overlap preserved across Graveiens and InhaltMart without manufactured days'
)
assert(
  digipplus.period.includes('September 2022'),
  'September 2022 transition window preserved without manufactured days'
)

console.log('')

// -----------------------------------------------------------------
// Test Suite 3: Project Attribution & Canonical Mapping
// -----------------------------------------------------------------
console.log('Test Suite 3: Project Attribution & Canonical Mapping')

// Wayground AI/ML projects (3 projects)
const aimlProjects = aiEngineerEntry?.projects || []
assert(
  aimlProjects.length === 3,
  `Wayground AI/ML entry contains exactly 3 projects (found: ${aimlProjects.length})`
)

const etlProj = aimlProjects.find((p) => p.title === 'Curriculum Transformation Engine')
assert(etlProj !== undefined, 'Curriculum Transformation Engine exists under AI/ML tenure')
assert(etlProj?.subTitle === 'Enterprise ETL Pipeline', 'Curriculum ETL subTitle is Enterprise ETL Pipeline')

const worksheetsProj = aimlProjects.find((p) => p.title === 'AI Worksheets')
assert(worksheetsProj !== undefined, 'AI Worksheets exists under AI/ML tenure')
assert(worksheetsProj?.subTitle === 'Product POC', 'AI Worksheets subTitle is Product POC')

const itemBankProj = aimlProjects.find((p) => p.title === 'US Mathematics Item Bank Generation')
assert(itemBankProj !== undefined, 'US Mathematics Item Bank Generation exists under AI/ML tenure')
assert(
  itemBankProj?.details.some((d) => d.includes('image-generation workstream')) === true,
  'US Mathematics Item Bank details preserve specific bounded contributions (image-generation workstream)'
)
assert(
  itemBankProj?.details.some((d) => d.includes('Upper Elementary item-bank generation pipeline')) === true,
  'US Mathematics Item Bank details preserve Upper Elementary stabilization contribution'
)

// Wayground SME projects (VM Copy)
const smeProjects = smeEntry?.projects || []
assert(smeProjects.length === 1, `Wayground SME contains exactly 1 project (found: ${smeProjects.length})`)

const vmCopyProj = smeProjects.find((p) => p.title === 'VM Copy Question Generator')
assert(vmCopyProj !== undefined, 'VM Copy Question Generator exists under SME tenure')
assert(vmCopyProj?.period === 'October 2025 – December 2025', 'VM Copy period is October–December 2025')

// Personal Projects: exactly 4 personal engineering builds
assert(
  resumeData.personalProjects.length === 4,
  `personalProjects contains exactly 4 entries (found: ${resumeData.personalProjects.length})`
)

const personalTitles = resumeData.personalProjects.map((p) => p.title)
assert(personalTitles.some((t) => t.includes('Ask Aadil')), "Personal project 'Ask Aadil' exists")
assert(personalTitles.some((t) => t.includes('OCR Evaluation')), "Personal project 'OCR Evaluation' exists")
assert(personalTitles.some((t) => t.includes('Engineering Design Automation')), "Personal project 'EDA CAD' exists")
assert(personalTitles.some((t) => t.includes('AI Application Reliability')), "Personal project 'AI Reliability' exists")

// Hackathon Projects: exactly 3 hackathon builds
assert(
  resumeData.hackathonProjects.length === 3,
  `hackathonProjects contains exactly 3 entries (found: ${resumeData.hackathonProjects.length})`
)

const hackathonTitles = resumeData.hackathonProjects.map((p) => p.title)
assert(hackathonTitles.some((t) => t.includes('Solace AI')), "Hackathon project 'Solace AI' exists")
assert(hackathonTitles.some((t) => t.includes('Loom AI')), "Hackathon project 'Loom AI' exists")
assert(hackathonTitles.some((t) => t.includes('Atlas AI')), "Hackathon project 'Atlas AI' exists")

// Content Builder software authorship is NOT misattributed
const contentBuilderClaim = JSON.stringify(resumeData).toLowerCase()
assert(
  !contentBuilderClaim.includes('authored content builder software') &&
    !contentBuilderClaim.includes('built voyagemath content builder'),
  'VoyageMath Content Builder software is NOT misattributed to user'
)

console.log('')

// -----------------------------------------------------------------
// Test Suite 4: Publication Restriction & Information Boundary Enforcement
// -----------------------------------------------------------------
console.log('Test Suite 4: Publication Restriction & Information Boundary Enforcement')

// Verify that no internal employer repository URLs appear in resumeData
const serializedResume = JSON.stringify(resumeData)

assert(
  !serializedResume.includes('github.com/aadil-lang/vm-copy-question-generator'),
  'Proprietary vm-copy GitHub URL is NOT leaked in resume data'
)
assert(
  !serializedResume.includes('github.com/aadil-lang/Worksheets-MS-Formal-Gamified'),
  'Proprietary ai-worksheets GitHub URL is NOT leaked in resume data'
)
assert(
  !serializedResume.includes('github.com/aadil-lang/Curriculum-Transformation'),
  'Proprietary curriculum-etl GitHub URL is NOT leaked in resume data'
)

// Verify that only the user profile github is present in header
assert(
  resumeData.header.github === 'github.com/aadil-lang',
  "Header contains primary profile GitHub handle 'github.com/aadil-lang'"
)

console.log('')

// -----------------------------------------------------------------
// Test Suite 5: Metric Governance & Qualified Claims
// -----------------------------------------------------------------
console.log('Test Suite 5: Metric Governance & Qualified Claims')

// VM Copy latency claim: Tier-1 <1ms evaluation
const vmCopyDetails = vmCopyProj?.details || []
assert(
  vmCopyDetails.some((d) => d.includes('under 1 ms') || d.includes('<1 ms') || d.includes('under 1ms')),
  'VM Copy specifies deterministic evaluation layer executes in under 1 ms'
)
assert(
  vmCopyDetails.some((d) => d.includes('independently of LLM inference')),
  'VM Copy explicitly distinguishes <1ms deterministic evaluation from LLM inference'
)

// EDA CAD volume and test count
const edaProj = resumeData.personalProjects.find((p) => p.title.includes('Engineering Design Automation'))
assert(edaProj?.testCountClaim === 424, `EDA testCountClaim is 424 (actual: ${edaProj?.testCountClaim})`)
assert(
  edaProj?.claims.some((c) => c.includes('424 automated pytests across 28 test suites')) === true,
  'EDA specifies 424 automated pytests across 28 test suites'
)
assert(
  edaProj?.claims.some((c) => c.includes('0.0000% volume calculation error')) === true,
  'EDA specifies 0.0000% volume calculation error'
)

// OCR Evaluator test count
const ocrProj = resumeData.personalProjects.find((p) => p.title.includes('OCR Evaluation'))
assert(ocrProj?.testCountClaim === 134, `OCR testCountClaim is 134 (actual: ${ocrProj?.testCountClaim})`)
assert(
  ocrProj?.claims.some((c) => c.includes('134 automated backend pytests across 22 test files')) === true,
  'OCR specifies 134 automated backend pytests across 22 test files'
)

// Solace AI test count
const solaceProj = resumeData.hackathonProjects.find((p) => p.title.includes('Solace AI'))
assert(solaceProj?.testCountClaim === 102, `Solace AI testCountClaim is 102 (actual: ${solaceProj?.testCountClaim})`)
assert(
  solaceProj?.claims.some((c) => c.includes('52 backend pytests and 50 mobile checks')) === true,
  'Solace AI specifies 52 backend pytests and 50 mobile checks'
)

// AI Reliability: MUST say "158 backend test cases" (NOT "test suites")
const reliabilityProj = resumeData.personalProjects.find((p) => p.title.includes('AI Application Reliability'))
assert(
  reliabilityProj?.testCountClaim === 205,
  `AI Reliability testCountClaim is 205 (actual: ${reliabilityProj?.testCountClaim})`
)
const reliabilityClaimsJoined = reliabilityProj?.claims.join(' ') || ''
assert(
  reliabilityClaimsJoined.includes('158 backend test cases'),
  "AI Reliability correctly specifies '158 backend test cases' (governed metric formulation)"
)
assert(
  !reliabilityClaimsJoined.includes('158 backend test suites'),
  "AI Reliability strictly excludes misleading '158 backend test suites' formulation"
)

// Ask Aadil test count: 327 automated assertions
const askAadilProj = resumeData.personalProjects.find((p) => p.title.includes('Ask Aadil'))
assert(
  askAadilProj?.testCountClaim === 327,
  `Ask Aadil testCountClaim is 327 (actual: ${askAadilProj?.testCountClaim})`
)

console.log('')

// -----------------------------------------------------------------
// Test Suite 6: Adapter Determinism, Freshness & Canonical Immutability
// -----------------------------------------------------------------
console.log('Test Suite 6: Adapter Determinism, Freshness & Canonical Immutability')

const run1 = getCanonicalStructuredResume()
const run2 = getCanonicalStructuredResume()

assert(run1 !== run2, 'Successive calls to getCanonicalStructuredResume() return fresh object instances')
assert(run1.experience !== run2.experience, 'Experience array is fresh between calls')
assert(run1.personalProjects !== run2.personalProjects, 'Personal projects array is fresh between calls')
assert(run1.hackathonProjects !== run2.hackathonProjects, 'Hackathon projects array is fresh between calls')

// Determinism
assert(JSON.stringify(run1) === JSON.stringify(run2), 'Projections are 100% deterministic across successive runs')

// Canonical registry immutability
assert(
  canonicalRegistry.careerRecords.length === 7,
  `canonicalRegistry.careerRecords remains unmutated (count: ${canonicalRegistry.careerRecords.length})`
)
assert(
  canonicalRegistry.projectRecords.length === 12,
  `canonicalRegistry.projectRecords remains unmutated (count: ${canonicalRegistry.projectRecords.length})`
)
assert(
  canonicalRegistry.claimRecords.length === 13,
  `canonicalRegistry.claimRecords remains unmutated (count: ${canonicalRegistry.claimRecords.length})`
)
assert(
  canonicalRegistry.evidenceRecords.length === 17,
  `canonicalRegistry.evidenceRecords remains unmutated (count: ${canonicalRegistry.evidenceRecords.length})`
)

console.log('\n-----------------------------------------------------------------')
console.log(`TOTAL TESTS: ${totalTests}`)
console.log(`PASSED:      ${passedTests}`)
console.log(`FAILED:      ${failedTests}`)
console.log('-----------------------------------------------------------------\n')

if (failedTests > 0) {
  console.error(`RESUME DATA MIGRATION FAILED: ${failedTests} assertion(s) failed.`)
  process.exit(1)
} else {
  console.log('ALL RESUME DATA MIGRATION INVARIANTS PASSED SUCCESSFULLY.')
}
