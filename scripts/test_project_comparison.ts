/**
 * Phase 6.5 — Portfolio-Wide Interactive Project Comparison Test Suite
 *
 * Certified under Level 1 engineering-security-reliability standard.
 * Asserts structural completeness, 10-dimension compliance, cross-reference integrity
 * (evidence, architecture nodes, ADRs), curated presets, anti-inflation governance,
 * and strict boundary isolation.
 */

import { PROJECT_COMPARISONS } from '../data/comparison/projectComparisons'
import { COMPARISON_PRESETS } from '../data/comparison/comparisonPresets'
import { COMPARISON_DIMENSIONS, ComparisonDimensionId } from '../data/comparison/types'
import { evidenceRegistry } from '../data/verification/evidenceRegistry'
import { systemsArchitecture } from '../data/architecture/systemsArchitecture'
import { projectDecisions } from '../data/decisions/projectDecisions'
import * as fs from 'fs'
import * as path from 'path'

const EXPECTED_PROJECT_SLUGS = [
  'ask-aadil',
  'ai-reliability',
  'solace-ai',
  'design-automation',
  'ocr-evaluator',
  'curriculum-etl',
  'atlas-ai',
  'loom-ai',
  'vm-copy',
  'ai-worksheets',
  'math-item-bank',
]

const EXPECTED_DIMENSION_IDS: ComparisonDimensionId[] = [
  'problem-objective',
  'architectural-pattern',
  'ai-vs-deterministic',
  'data-retrieval',
  'orchestration-state',
  'failure-containment',
  'evaluation-verification',
  'hitl-governance',
  'core-trade-offs',
  'individual-contribution',
]

const WAYGROUND_PROJECT_SLUGS = [
  'curriculum-etl',
  'vm-copy',
  'ai-worksheets',
  'math-item-bank',
]

interface TestResult {
  suite: string
  name: string
  passed: boolean
  error?: string
}

const results: TestResult[] = []

function assert(suite: string, name: string, condition: boolean, errorMsg?: string) {
  if (condition) {
    results.push({ suite, name, passed: true })
  } else {
    results.push({ suite, name, passed: false, error: errorMsg || 'Assertion failed' })
    console.error(`  FAIL [${suite}]: ${name} - ${errorMsg || 'Assertion failed'}`)
  }
}

console.log('==================================================================')
console.log('PHASE 6.5 INTERACTIVE PROJECT COMPARISON TEST SUITE')
console.log('Standard: engineering-security-reliability (Level 1)')
console.log('==================================================================\n')

// ===========================================================================
// SUITE 1: PROJECT COMPARISON PROFILES COMPLETENESS
// ===========================================================================
console.log('Running Suite 1: Project Profiles Completeness...')

const registeredSlugs = Object.keys(PROJECT_COMPARISONS)
assert(
  'Suite 1',
  'Exactly 11 portfolio case studies registered',
  registeredSlugs.length === 11,
  `Expected 11 projects, found ${registeredSlugs.length}`
)

for (const slug of EXPECTED_PROJECT_SLUGS) {
  const profile = PROJECT_COMPARISONS[slug]
  assert('Suite 1', `Project profile exists for '${slug}'`, Boolean(profile), `Missing profile for ${slug}`)

  if (profile) {
    assert('Suite 1', `Profile slug matches key for '${slug}'`, profile.slug === slug)
    assert('Suite 1', `Non-empty name for '${slug}'`, Boolean(profile.name && profile.name.trim().length > 0))
    assert('Suite 1', `Non-empty tagline for '${slug}'`, Boolean(profile.tagline && profile.tagline.trim().length > 0))
    assert('Suite 1', `Non-empty category for '${slug}'`, Boolean(profile.category && profile.category.trim().length > 0))
    assert('Suite 1', `Non-empty systemRole for '${slug}'`, Boolean(profile.systemRole && profile.systemRole.trim().length > 0))
    assert('Suite 1', `Valid caseStudyRoute for '${slug}'`, profile.caseStudyRoute === `/projects/${slug}`)
    assert('Suite 1', `Valid architectureRoute for '${slug}'`, profile.architectureRoute === `/architecture?system=${slug}`)
    assert('Suite 1', `Valid verificationRoute for '${slug}'`, profile.verificationRoute.startsWith('/verification#evid-'))
    assert('Suite 1', `Valid decisionRecordsRoute for '${slug}'`, profile.decisionRecordsRoute === `/projects/${slug}#decisions`)
  }
}

// ===========================================================================
// SUITE 2: TEN MANDATORY COMPARISON DIMENSIONS & TRADEOFFS
// ===========================================================================
console.log('\nRunning Suite 2: Ten Mandatory Comparison Dimensions & Trade-offs...')

assert(
  'Suite 2',
  'Exactly 10 canonical dimensions declared in COMPARISON_DIMENSIONS metadata',
  COMPARISON_DIMENSIONS.length === 10,
  `Found ${COMPARISON_DIMENSIONS.length} dimension descriptors`
)

for (const dimId of EXPECTED_DIMENSION_IDS) {
  const meta = COMPARISON_DIMENSIONS.find((d) => d.id === dimId)
  assert('Suite 2', `Dimension metadata registered for '${dimId}'`, Boolean(meta))
}

for (const slug of EXPECTED_PROJECT_SLUGS) {
  const profile = PROJECT_COMPARISONS[slug]
  if (!profile) continue

  for (const dimId of EXPECTED_DIMENSION_IDS) {
    const detail = profile.dimensions[dimId]
    assert('Suite 2', `Project '${slug}' defines dimension '${dimId}'`, Boolean(detail))

    if (detail) {
      assert('Suite 2', `Dimension '${dimId}' for '${slug}' has non-empty title`, Boolean(detail.title && detail.title.length > 0))
      assert('Suite 2', `Dimension '${dimId}' for '${slug}' has non-empty summary`, Boolean(detail.summary && detail.summary.length > 20))
      assert(
        'Suite 2',
        `Dimension '${dimId}' for '${slug}' has >= 2 key mechanisms`,
        Boolean(detail.keyMechanisms && detail.keyMechanisms.length >= 2),
        `Found ${detail.keyMechanisms?.length || 0} mechanisms`
      )
    }
  }

  // Trade-offs validation
  assert(
    'Suite 2',
    `Project '${slug}' has >= 2 deliberate architectural trade-offs`,
    Boolean(profile.tradeOffs && profile.tradeOffs.length >= 2),
    `Found ${profile.tradeOffs?.length || 0} trade-offs`
  )

  if (profile.tradeOffs) {
    profile.tradeOffs.forEach((to, idx) => {
      assert('Suite 2', `Project '${slug}' trade-off [${idx}] has non-empty title`, Boolean(to.title && to.title.length > 0))
      assert('Suite 2', `Project '${slug}' trade-off [${idx}] has non-empty chosenApproach`, Boolean(to.chosenApproach && to.chosenApproach.length > 10))
      assert('Suite 2', `Project '${slug}' trade-off [${idx}] has non-empty alternativeRejected`, Boolean(to.alternativeRejected && to.alternativeRejected.length > 10))
      assert('Suite 2', `Project '${slug}' trade-off [${idx}] has non-empty technicalRationale`, Boolean(to.technicalRationale && to.technicalRationale.length > 15))
      assert('Suite 2', `Project '${slug}' trade-off [${idx}] has non-empty acceptedCompromise`, Boolean(to.acceptedCompromise && to.acceptedCompromise.length > 15))
    })
  }
}

// ===========================================================================
// SUITE 3: CROSS-REFERENCE INTEGRITY (EVIDENCE, ARCHITECTURE, ADRS)
// ===========================================================================
console.log('\nRunning Suite 3: Cross-Reference Integrity (Evidence, Architecture, ADRs)...')

const validEvidenceIds = new Set(evidenceRegistry.map((e) => e.id))
const validComponentIds = new Set(
  systemsArchitecture.flatMap((s) => s.nodes.map((n) => n.id))
)
const validDecisionIds = new Set(
  Object.values(projectDecisions).flatMap((records) => records.map((r) => r.id))
)

let totalEvidenceRefs = 0
let totalComponentRefs = 0
let totalDecisionRefs = 0

for (const slug of EXPECTED_PROJECT_SLUGS) {
  const profile = PROJECT_COMPARISONS[slug]
  if (!profile) continue

  for (const dimId of EXPECTED_DIMENSION_IDS) {
    const detail = profile.dimensions[dimId]
    if (!detail) continue

    if (detail.evidenceIds) {
      for (const eid of detail.evidenceIds) {
        totalEvidenceRefs++
        assert('Suite 3', `Evidence ID '${eid}' referenced in '${slug}:${dimId}' exists in evidenceRegistry`, validEvidenceIds.has(eid), `Invalid evidence ID ${eid}`)
      }
    }

    if (detail.componentIds) {
      for (const cid of detail.componentIds) {
        totalComponentRefs++
        assert('Suite 3', `Component ID '${cid}' referenced in '${slug}:${dimId}' exists in systemsArchitecture`, validComponentIds.has(cid), `Invalid component ID ${cid}`)
      }
    }

    if (detail.decisionIds) {
      for (const did of detail.decisionIds) {
        totalDecisionRefs++
        assert('Suite 3', `Decision ID '${did}' referenced in '${slug}:${dimId}' exists in projectDecisions`, validDecisionIds.has(did), `Invalid decision ID ${did}`)
      }
    }
  }

  // Also check trade-off cross-references
  for (const to of profile.tradeOffs) {
    if (to.evidenceId) {
      assert('Suite 3', `Trade-off evidence ID '${to.evidenceId}' in '${slug}' exists`, validEvidenceIds.has(to.evidenceId))
    }
    if (to.decisionId) {
      assert('Suite 3', `Trade-off decision ID '${to.decisionId}' in '${slug}' exists`, validDecisionIds.has(to.decisionId))
    }
  }
}

assert('Suite 3', 'Total verified evidence references > 20', totalEvidenceRefs > 20, `Found ${totalEvidenceRefs}`)
assert('Suite 3', 'Total verified architecture component references > 20', totalComponentRefs > 20, `Found ${totalComponentRefs}`)
assert('Suite 3', 'Total verified decision references > 15', totalDecisionRefs > 15, `Found ${totalDecisionRefs}`)

// ===========================================================================
// SUITE 4: CURATED PRESETS INTEGRITY
// ===========================================================================
console.log('\nRunning Suite 4: Curated Presets Integrity...')

assert('Suite 4', 'Exactly 7 curated presets registered', COMPARISON_PRESETS.length === 7, `Found ${COMPARISON_PRESETS.length} presets`)

const presetIds = new Set<string>()
for (const preset of COMPARISON_PRESETS) {
  assert('Suite 4', `Preset ID '${preset.id}' starts with 'PRESET-'`, preset.id.startsWith('PRESET-'))
  assert('Suite 4', `Preset ID '${preset.id}' is unique`, !presetIds.has(preset.id))
  presetIds.add(preset.id)

  assert('Suite 4', `Preset '${preset.id}' has non-empty title`, Boolean(preset.title && preset.title.length > 5))
  assert('Suite 4', `Preset '${preset.id}' has non-empty tagline`, Boolean(preset.tagline && preset.tagline.length > 5))
  assert('Suite 4', `Preset '${preset.id}' has non-empty rationale`, Boolean(preset.rationale && preset.rationale.length > 20))
  assert('Suite 4', `Preset '${preset.id}' has valid keyContrastDimension`, EXPECTED_DIMENSION_IDS.includes(preset.keyContrastDimension))
  assert('Suite 4', `Preset '${preset.id}' has >= 2 focus takeaways`, Boolean(preset.focusTakeaways && preset.focusTakeaways.length >= 2))

  assert('Suite 4', `Preset '${preset.id}' has 2 or 3 projects`, preset.projectSlugs.length === 2 || preset.projectSlugs.length === 3)
  for (const slug of preset.projectSlugs) {
    assert('Suite 4', `Preset '${preset.id}' references valid project '${slug}'`, Boolean(PROJECT_COMPARISONS[slug]))
  }
}

// ===========================================================================
// SUITE 5: ANTI-INFLATION GOVERNANCE & QUALIFIED CLAIMS
// ===========================================================================
console.log('\nRunning Suite 5: Anti-Inflation Governance & Attribution Clarity...')

// Verify attribution clarity for Wayground collaborative projects
for (const slug of WAYGROUND_PROJECT_SLUGS) {
  const profile = PROJECT_COMPARISONS[slug]
  if (!profile) continue

  const contrib = profile.dimensions['individual-contribution']
  assert(
    'Suite 5',
    `Wayground project '${slug}' individual contribution acknowledges team / company context`,
    Boolean(
      contrib &&
        (contrib.title.toLowerCase().includes('wayground') ||
          contrib.summary.toLowerCase().includes('wayground') ||
          contrib.summary.toLowerCase().includes('team'))
    ),
    `Attribution did not mention Wayground or team for ${slug}`
  )
}

// Verify qualification notes on sensitive claims
const edaProfile = PROJECT_COMPARISONS['design-automation']
assert(
  'Suite 5',
  'EDA evaluation dimension qualifies < 10^-6 calculus agreement vs physical CNC tolerance',
  Boolean(edaProfile?.dimensions['evaluation-verification']?.qualificationNote?.includes('CNC')),
  'EDA qualification note missing'
)

const solaceProfile = PROJECT_COMPARISONS['solace-ai']
assert(
  'Suite 5',
  'Solace AI qualifies 100% crisis detection as restricted to 24 critical regex triggers',
  Boolean(solaceProfile?.dimensions['ai-vs-deterministic']?.qualificationNote?.includes('24')),
  'Solace crisis qualification note missing'
)

const atlasProfile = PROJECT_COMPARISONS['atlas-ai']
assert(
  'Suite 5',
  'Atlas AI qualifies SEC EDGAR scraping as fixture-validated in CI',
  Boolean(atlasProfile?.dimensions['ai-vs-deterministic']?.qualificationNote?.includes('CI')),
  'Atlas qualification note missing'
)

const mathItemBankProfile = PROJECT_COMPARISONS['math-item-bank']
assert(
  'Suite 5',
  'Math Item Bank qualifies individual contribution vs Wayground platform ownership',
  Boolean(mathItemBankProfile?.dimensions['ai-vs-deterministic']?.qualificationNote?.includes('Wayground')),
  'Math Item Bank qualification note missing'
)

// Verify no vanity scores in text
const comparisonText = JSON.stringify(PROJECT_COMPARISONS).toLowerCase()
assert('Suite 5', 'Zero vanity "complexity score" in comparison data', !comparisonText.includes('complexity score'))
assert('Suite 5', 'Zero subjective ratings (/10) in comparison data', !/\b\d+(\.\d+)?\s*\/\s*10\b/.test(comparisonText))
assert('Suite 5', 'Zero leaderboard rankings in comparison data', !comparisonText.includes('rank #1') && !comparisonText.includes('best overall'))

// ===========================================================================
// SUITE 6: ARCHITECTURAL BOUNDARY ISOLATION
// ===========================================================================
console.log('\nRunning Suite 6: Architectural Boundary Isolation...')

const rootDir = path.resolve(__dirname, '..')
const comparisonDataDir = path.join(rootDir, 'data', 'comparison')
const comparisonCompDir = path.join(rootDir, 'components', 'comparison')

function checkForbiddenImports(dirPath: string) {
  if (!fs.existsSync(dirPath)) return
  const files = fs.readdirSync(dirPath)
  for (const file of files) {
    const fullPath = path.join(dirPath, file)
    const stat = fs.statSync(fullPath)
    if (stat.isDirectory()) {
      checkForbiddenImports(fullPath)
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      const content = fs.readFileSync(fullPath, 'utf8')
      assert(
        'Suite 6',
        `File '${file}' does not import from lib/rag/`,
        !content.includes("from '@/lib/rag/") && !content.includes("from '../lib/rag/") && !content.includes("from '../../lib/rag/"),
        `Forbidden lib/rag import found in ${file}`
      )
      assert(
        'Suite 6',
        `File '${file}' does not import from lib/rag-lab/`,
        !content.includes("from '@/lib/rag-lab/") && !content.includes("from '../lib/rag-lab/") && !content.includes("from '../../lib/rag-lab/"),
        `Forbidden lib/rag-lab import found in ${file}`
      )
    }
  }
}

checkForbiddenImports(comparisonDataDir)
checkForbiddenImports(comparisonCompDir)

// ===========================================================================
// SUMMARY & EXIT CODE
// ===========================================================================
console.log('\n==================================================================')
const total = results.length
const passed = results.filter((r) => r.passed).length
const failed = total - passed

console.log(`TOTAL ASSERTIONS: ${total}`)
console.log(`PASSED: ${passed}`)
console.log(`FAILED: ${failed}`)
console.log('==================================================================\n')

if (failed > 0) {
  console.error(`FAILED: ${failed} assertions failed in Project Comparison Suite.`)
  process.exit(1)
} else {
  console.log('SUCCESS: 100% of Project Comparison assertions PASSED.')
  process.exit(0)
}
