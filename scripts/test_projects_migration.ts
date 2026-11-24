/**
 * PORTFOLIO — PHASE 2.2: CANONICAL PROJECTS REGISTRY MIGRATION TEST SUITE
 *
 * Verifies that the canonical projects registry migration:
 * 1. Preserves public contracts and consumer compatibility for `data/projects.ts`
 *    and `data/canonical/projectsMetadata.ts`.
 * 2. Enforces central publication restrictions (github === null and codeEvidence.sourceUrl === undefined
 *    for all employer-proprietary projects).
 * 3. Corrects historical chronology and ownership errata (vm-copy Oct-Nov 2025, professional ownership).
 * 4. Strictly excludes legacy unsupported records (binance-bot).
 * 5. Correctly projects ownership classifications, categories, and mandatory status notices.
 * 6. Guarantees deterministic, immutable projection behavior.
 */

import { projects, Project } from '../data/projects'
import { projectsMetadata, ProjectMetadata } from '../data/canonical/projectsMetadata'
import {
  getCanonicalProjects,
  getCanonicalProjectBySlug,
  getCanonicalProjectsMetadata,
  getGovernedProjectPublicUrl,
  getCanonicalProjectRecord
} from '../data/adapters/projectsAdapter'
import { canonicalRegistry } from '../data/canonical/canonicalRegistry'
import { CanonicalProjectRecord } from '../data/canonical/canonicalSchema'

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
console.log('PHASE 2.2: CANONICAL PROJECTS REGISTRY MIGRATION TEST SUITE')
console.log('=================================================================\n')

// -----------------------------------------------------------------
// Test Suite 1: Canonical Coverage & Referential Integrity
// -----------------------------------------------------------------
console.log('Test Suite 1: Canonical Coverage & Referential Integrity')

assert(Array.isArray(projects), 'projects export is an array')
assert(projects.length === 12, `projects contains exactly 12 systems (found: ${projects.length})`)

const expectedSlugs = [
  'vm-copy',
  'ai-worksheets',
  'curriculum-etl',
  'math-item-bank',
  'design-automation',
  'ai-reliability',
  'loom-ai',
  'atlas-ai',
  'ask-aadil',
  'solace-ai',
  'ocr-evaluator',
  'universal-hr-assistant'
]

const actualSlugs = projects.map((p) => p.slug)
for (const slug of expectedSlugs) {
  assert(actualSlugs.includes(slug), `Project with slug '${slug}' exists in projects`)
}

// Check required fields on all 11 projects
for (const proj of projects) {
  assert(
    !!proj.id &&
      !!proj.slug &&
      !!proj.title &&
      !!proj.tagline &&
      !!proj.summary &&
      !!proj.ownershipLabel &&
      !!proj.ownershipCategory &&
      Array.isArray(proj.technologies) &&
      proj.technologies.length > 0 &&
      !!proj.problem &&
      !!proj.solution &&
      Array.isArray(proj.keyFeatures) &&
      proj.keyFeatures.length > 0 &&
      !!proj.architecturePattern &&
      Array.isArray(proj.systemLayers) &&
      proj.systemLayers.length > 0,
    `Project '${proj.slug}' has all required structural fields populated`
  )
}

// math-item-bank resolves to canonical proj-item-bank
const mathItemBankCanonical = getCanonicalProjectRecord('proj-item-bank')
assert(
  mathItemBankCanonical !== undefined && mathItemBankCanonical.projectId === 'proj-item-bank',
  "math-item-bank maps to canonical 'proj-item-bank' record"
)

// projectsMetadata coverage
assert(Array.isArray(projectsMetadata), 'projectsMetadata export is an array')
assert(
  projectsMetadata.length === 12,
  `projectsMetadata contains exactly 12 systems (found: ${projectsMetadata.length})`
)

const metadataSlugs = projectsMetadata.map((p) => p.slug)
for (const slug of expectedSlugs) {
  assert(metadataSlugs.includes(slug), `Project with slug '${slug}' exists in projectsMetadata`)
}

// Unsupported legacy record exclusion
assert(!actualSlugs.includes('binance-bot'), "Legacy unsupported 'binance-bot' excluded from projects")
assert(
  !metadataSlugs.includes('binance-bot'),
  "Legacy unsupported 'binance-bot' excluded from projectsMetadata"
)

console.log('')

// -----------------------------------------------------------------
// Test Suite 2: Publication Restriction & Information Boundary Enforcement
// -----------------------------------------------------------------
console.log('Test Suite 2: Publication Restriction & Information Boundary Enforcement')

const proprietarySlugs = ['vm-copy', 'ai-worksheets', 'curriculum-etl', 'math-item-bank']

for (const slug of proprietarySlugs) {
  const proj = projects.find((p) => p.slug === slug)
  assert(proj !== undefined && proj.github === null, `Proprietary project '${slug}' has github === null`)

  const meta = projectsMetadata.find((p) => p.slug === slug)
  assert(
    meta !== undefined && (meta.externalRefs?.github === null || meta.externalRefs?.github === undefined),
    `Proprietary metadata '${slug}' has externalRefs.github === null or undefined`
  )

  // Verify code evidence has NO sourceUrl leaks
  if (proj?.codeEvidence && proj.codeEvidence.length > 0) {
    const leakedUrls = proj.codeEvidence.filter((c) => !!c.sourceUrl)
    assert(
      leakedUrls.length === 0,
      `Proprietary project '${slug}' has zero codeEvidence sourceUrl leaks (found: ${leakedUrls.length})`
    )
  }
}

// Open-source projects retain public URLs
const openSourceSlugs = [
  'design-automation',
  'ocr-evaluator',
  'loom-ai',
  'atlas-ai',
  'ai-reliability',
  'solace-ai',
  'universal-hr-assistant'
]

for (const slug of openSourceSlugs) {
  const proj = projects.find((p) => p.slug === slug)
  assert(
    proj !== undefined && typeof proj.github === 'string' && proj.github.startsWith('https://github.com/'),
    `Open-source project '${slug}' has valid public GitHub URL (${proj?.github})`
  )
}

// Adversarial test: passing a mock proprietary record with a spoofed publicUrl to getGovernedProjectPublicUrl()
const spoofedProprietaryRecord: CanonicalProjectRecord = {
  projectId: 'proj-malicious-spoof',
  slug: 'malicious-spoof',
  title: 'Spoofed Internal Project',
  tagline: 'Adversarial leak test',
  implementationAuthorship: 'SOLE_IMPLEMENTER',
  architecturalResponsibility: 'PRIMARY_ARCHITECT',
  requirementsOrigin: 'INTERNAL_COMMISSION',
  organizationalContext: 'COMPANY_EMPLOYMENT',
  ipOwnership: 'EMPLOYER_PROPRIETARY',
  publicationEligibility: 'RESTRICTED_OR_INTERNAL_ONLY',
  associatedCareerId: 'car-wayground-aiml',
  careerPhaseId: 'PHASE_4_WAYGROUND_AI_ENGINEER',
  temporalRegistry: {
    developmentWindow: {
      start: { dateString: '2026-01', precision: 'month', confirmationStatus: 'USER_CONFIRMED', boundaryType: 'EXACT_BOUNDARY' },
      end: { dateString: '2026-04', precision: 'month', confirmationStatus: 'USER_CONFIRMED', boundaryType: 'EXACT_BOUNDARY' }
    }
  },
  technologies: {
    languages: ['Python'],
    frameworksAndRuntimes: ['FastAPI'],
    deterministicEngines: ['Test Gate'],
    infrastructure: ['Docker']
  },
  repository: {
    publicUrl: 'https://github.com/leaked/proprietary-repo',
    isPrivateOrProprietary: true,
    caseStudyRoute: '/projects/spoof'
  },
  claimIds: [],
  evidenceIds: []
}

const adversarialUrlResult = getGovernedProjectPublicUrl(spoofedProprietaryRecord)
assert(
  adversarialUrlResult === null,
  'Adversarial bypass blocked: spoofed publicUrl on EMPLOYER_PROPRIETARY record forced to null'
)

console.log('')

// -----------------------------------------------------------------
// Test Suite 3: Chronological & Attributive Governance
// -----------------------------------------------------------------
console.log('Test Suite 3: Chronological & Attributive Governance')

// VM Copy chronological erratum correction
const vmCopyMeta = projectsMetadata.find((p) => p.slug === 'vm-copy')
assert(
  vmCopyMeta?.dates?.start === '2025-10',
  `vm-copy start date corrected to '2025-10' (legacy: '2024-04', actual: '${vmCopyMeta?.dates?.start}')`
)
assert(
  vmCopyMeta?.dates?.end === '2025-11',
  `vm-copy end date corrected to '2025-11' (legacy: '2024-09', actual: '${vmCopyMeta?.dates?.end}')`
)
assert(
  vmCopyMeta?.ownership === 'professional',
  `vm-copy ownership corrected to 'professional' (legacy: 'independent', actual: '${vmCopyMeta?.ownership}')`
)

// VM Copy statusNotice checks
const vmCopyProj = projects.find((p) => p.slug === 'vm-copy')
assert(!!vmCopyProj?.statusNotice, 'vm-copy has statusNotice banner')
assert(
  vmCopyProj?.statusNotice?.includes('October–mid-November 2025') === true,
  'vm-copy statusNotice specifies October–mid-November 2025 development window'
)
assert(
  vmCopyProj?.statusNotice?.includes('November 2025') === true,
  'vm-copy statusNotice specifies Mathematics SME team adoption in November 2025'
)
assert(
  vmCopyProj?.statusNotice?.includes('Formal deployment date is not independently established') === true,
  'vm-copy statusNotice notes formal corporate deployment date is unestablished'
)
assert(
  vmCopyProj?.statusNotice?.includes('Wayground Inc') === true,
  'vm-copy statusNotice attributes intellectual property to Wayground Inc'
)
assert(
  vmCopyProj?.statusNotice?.includes('<1ms') === true,
  'vm-copy statusNotice distinguishes <1ms Tier-1 evaluation from multi-second LLM verification'
)

// AI Worksheets governance
const worksheetsMeta = projectsMetadata.find((p) => p.slug === 'ai-worksheets')
assert(
  worksheetsMeta?.dates?.start === '2026-01' && worksheetsMeta?.dates?.end === '2026-04',
  `ai-worksheets dates match canonical 2026-01 to 2026-04 (${worksheetsMeta?.dates?.start} to ${worksheetsMeta?.dates?.end})`
)
assert(
  worksheetsMeta?.ownership === 'professional',
  `ai-worksheets ownership is 'professional' (actual: '${worksheetsMeta?.ownership}')`
)

const worksheetsProj = projects.find((p) => p.slug === 'ai-worksheets')
assert(
  worksheetsProj?.statusNotice?.includes('Wayground Inc') === true,
  'ai-worksheets statusNotice attributes IP to Wayground Inc'
)

// Curriculum ETL governance
const etlMeta = projectsMetadata.find((p) => p.slug === 'curriculum-etl')
assert(
  etlMeta?.dates?.start === '2026-02' && etlMeta?.dates?.end === '2026-06',
  `curriculum-etl dates match canonical 2026-02 to 2026-06 (legacy end: 2026-05, actual: ${etlMeta?.dates?.end})`
)
assert(
  etlMeta?.ownership === 'professional',
  `curriculum-etl ownership is 'professional' (actual: '${etlMeta?.ownership}')`
)

// Math Item Bank governance
const itemBankMeta = projectsMetadata.find((p) => p.slug === 'math-item-bank')
assert(
  itemBankMeta?.dates?.start === '2026-03' && itemBankMeta?.dates?.end === '2026-07',
  `math-item-bank dates match canonical 2026-03 to 2026-07 (${itemBankMeta?.dates?.start} to ${itemBankMeta?.dates?.end})`
)
assert(
  itemBankMeta?.ownership === 'team',
  `math-item-bank ownership is 'team' (actual: '${itemBankMeta?.ownership}')`
)

const itemBankProj = projects.find((p) => p.slug === 'math-item-bank')
assert(
  itemBankProj?.statusNotice?.includes('company team') === true,
  'math-item-bank statusNotice explicitly details company team platform'
)

// Design Automation governance
const edaProj = projects.find((p) => p.slug === 'design-automation')
assert(
  edaProj?.statusNotice?.includes('Software analytical validation only') === true,
  'design-automation statusNotice clarifies software calculus vs CNC physical manufacturing'
)

console.log('')

// -----------------------------------------------------------------
// Test Suite 4: Ownership Category & UI Routing Integrity
// -----------------------------------------------------------------
console.log('Test Suite 4: Ownership Category & UI Routing Integrity')

const waygroundIndep = projects.filter((p) => p.ownershipCategory === 'wayground-independent')
assert(
  waygroundIndep.length === 3,
  `wayground-independent contains exactly 3 projects (found: ${waygroundIndep.length})`
)
for (const p of waygroundIndep) {
  assert(
    p.ownershipLabel === 'WAYGROUND · INDEPENDENT BUILD',
    `Project '${p.slug}' has label 'WAYGROUND · INDEPENDENT BUILD'`
  )
}

const waygroundTeam = projects.filter((p) => p.ownershipCategory === 'wayground-team')
assert(
  waygroundTeam.length === 1,
  `wayground-team contains exactly 1 project (found: ${waygroundTeam.length})`
)
assert(
  waygroundTeam[0].slug === 'math-item-bank',
  `wayground-team project is 'math-item-bank'`
)
assert(
  waygroundTeam[0].ownershipLabel === 'WAYGROUND · TEAM PROJECT',
  `math-item-bank has label 'WAYGROUND · TEAM PROJECT'`
)

const personalIndep = projects.filter((p) => p.ownershipCategory === 'personal-independent')
assert(
  personalIndep.length === 5,
  `personal-independent contains exactly 5 projects (found: ${personalIndep.length})`
)
for (const p of personalIndep) {
  assert(
    p.ownershipLabel === 'INDEPENDENT · PERSONAL BUILD',
    `Project '${p.slug}' has label 'INDEPENDENT · PERSONAL BUILD'`
  )
}

const hackathons = projects.filter((p) => p.ownershipCategory === 'hackathon')
assert(
  hackathons.length === 3,
  `hackathon contains exactly 3 projects (found: ${hackathons.length})`
)
for (const p of hackathons) {
  assert(
    p.ownershipLabel === 'INDEPENDENT · HACKATHON PROJECT',
    `Project '${p.slug}' has label 'INDEPENDENT · HACKATHON PROJECT'`
  )
}

assert(
  waygroundIndep.length + waygroundTeam.length + personalIndep.length + hackathons.length === 12,
  'Category partition sums to exactly 12 projects'
)

console.log('')

// -----------------------------------------------------------------
// Test Suite 5: Consumer Compatibility & Public Contracts
// -----------------------------------------------------------------
console.log('Test Suite 5: Consumer Compatibility & Public Contracts')

assert(typeof getCanonicalProjects === 'function', 'getCanonicalProjects is a function')
assert(typeof getCanonicalProjectBySlug === 'function', 'getCanonicalProjectBySlug is a function')
assert(typeof getCanonicalProjectsMetadata === 'function', 'getCanonicalProjectsMetadata is a function')

for (const slug of expectedSlugs) {
  const p = getCanonicalProjectBySlug(slug)
  assert(p !== undefined && p.slug === slug, `getCanonicalProjectBySlug('${slug}') returns correct project`)
}

assert(
  getCanonicalProjectBySlug('non-existent-slug') === undefined,
  "getCanonicalProjectBySlug('non-existent-slug') safely returns undefined"
)

console.log('')

// -----------------------------------------------------------------
// Test Suite 6: Adapter Determinism & Immutability
// -----------------------------------------------------------------
console.log('Test Suite 6: Adapter Determinism & Immutability')

const call1 = getCanonicalProjects()
const call2 = getCanonicalProjects()

assert(call1.length === call2.length, 'Successive calls return identical lengths')
assert(call1 !== call2, 'Successive calls return fresh array instances')

for (let i = 0; i < call1.length; i++) {
  assert(call1[i] !== call2[i], `Item ${i} (${call1[i].slug}) is a fresh object instance`)
  assert(call1[i].slug === call2[i].slug, `Item ${i} slug is deterministic`)
  assert(call1[i].title === call2[i].title, `Item ${i} title is deterministic`)
  assert(call1[i].github === call2[i].github, `Item ${i} github URL is deterministic`)
}

// Canonical registry immutability
const canonicalProjectsCount = canonicalRegistry.projectRecords.length
assert(
  canonicalProjectsCount === 13,
  `canonicalRegistry.projectRecords remains unmutated (count: ${canonicalProjectsCount})`
)

console.log('\n-----------------------------------------------------------------')
console.log(`TOTAL TESTS: ${totalTests}`)
console.log(`PASSED:      ${passedTests}`)
console.log(`FAILED:      ${failedTests}`)
console.log('-----------------------------------------------------------------\n')

if (failedTests > 0) {
  console.error(`PROJECTS REGISTRY MIGRATION FAILED: ${failedTests} assertion(s) failed.`)
  process.exit(1)
} else {
  console.log('ALL PROJECTS REGISTRY MIGRATION INVARIANTS PASSED SUCCESSFULLY.')
}
