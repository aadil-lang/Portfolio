/**
 * Test Suite: Interactive Architecture Explorer Integrity & Topology Invariants
 * 
 * Verifies:
 * 1. Registered Systems Count, Categorization & Route Integrity (11 Systems)
 * 2. Exploration Level Distribution (6 Level-1 Full, 5 Level-2 Focused)
 * 3. Node Topology Invariants (Unique IDs, Classifications, Source References)
 * 4. Directed Edge Consistency (Valid From/To Node References)
 * 5. Sequential Execution Flow Invariants (Step numbering, Active Nodes)
 * 6. Failure & Containment Boundary Verification
 * 7. Architectural Isolation (Ask Aadil & RAG Lab Boundaries)
 */

import { systemsArchitecture } from '../data/architecture/systemsArchitecture'
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
console.log('INTERACTIVE ARCHITECTURE EXPLORER VERIFICATION SUITE')
console.log('='.repeat(70))

// ---------------------------------------------------------------------------
// SUITE 1: REGISTERED SYSTEMS & ROUTE INTEGRITY
// ---------------------------------------------------------------------------
const suite1 = 'Suite 1: System Registry & Routes'

assert(
  systemsArchitecture.length === 11,
  suite1,
  'System Count (11 Case Studies)',
  `Expected 11 systems, got ${systemsArchitecture.length}`
)

const uniqueSlugs = new Set(systemsArchitecture.map((s) => s.slug))
assert(
  uniqueSlugs.size === 11,
  suite1,
  'Slug Uniqueness',
  `Found duplicate slugs: ${systemsArchitecture.length} systems vs ${uniqueSlugs.size} unique`
)

const validCategories = [
  'agentic-orchestration',
  'retrieval-grounding',
  'reliability-verification',
  'data-transformation',
  'deterministic-computation'
]

systemsArchitecture.forEach((sys) => {
  assert(
    validCategories.includes(sys.category),
    suite1,
    `Valid Category: ${sys.name}`,
    `Invalid category "${sys.category}" in system ${sys.name}`
  )
  assert(
    sys.externalRoute === `/projects/${sys.slug}`,
    suite1,
    `Valid External Route: ${sys.name}`,
    `Expected /projects/${sys.slug}, got ${sys.externalRoute}`
  )
  assert(
    sys.technologies.length >= 3,
    suite1,
    `Tech Stack Depth: ${sys.name}`,
    `System ${sys.name} has fewer than 3 technologies`
  )
})

// ---------------------------------------------------------------------------
// SUITE 2: EXPLORATION LEVEL DISTRIBUTION
// ---------------------------------------------------------------------------
const suite2 = 'Suite 2: Exploration Levels'

const level1Systems = systemsArchitecture.filter((s) => s.explorationLevel === 'level-1-full')
const level2Systems = systemsArchitecture.filter((s) => s.explorationLevel === 'level-2-focused')

assert(
  level1Systems.length === 6,
  suite2,
  'Level 1 Full Interactive Systems Count',
  `Expected 6 Level 1 systems, got ${level1Systems.length}`
)

assert(
  level2Systems.length === 5,
  suite2,
  'Level 2 Focused Pipeline Systems Count',
  `Expected 5 Level 2 systems, got ${level2Systems.length}`
)

const expectedLevel1Slugs = [
  'ask-aadil',
  'ai-reliability',
  'solace-ai',
  'design-automation',
  'ocr-evaluator',
  'curriculum-etl'
]

expectedLevel1Slugs.forEach((slug) => {
  const found = level1Systems.find((s) => s.slug === slug)
  assert(
    !!found,
    suite2,
    `Level 1 Membership: ${slug}`,
    `Expected ${slug} to be classified as Level 1 Full Interactive`
  )
})

// ---------------------------------------------------------------------------
// SUITE 3: NODE TOPOLOGY INVARIANTS
// ---------------------------------------------------------------------------
const suite3 = 'Suite 3: Component Node Invariants'

const validClassifications = ['deterministic', 'probabilistic', 'external', 'human_gate']

systemsArchitecture.forEach((sys) => {
  assert(
    sys.nodes.length >= 4,
    suite3,
    `Node Density: ${sys.name}`,
    `System ${sys.name} has only ${sys.nodes.length} nodes (min 4 required)`
  )

  const nodeIds = new Set<string>()

  sys.nodes.forEach((node) => {
    assert(
      !nodeIds.has(node.id),
      suite3,
      `Node ID Uniqueness: ${sys.name} -> ${node.id}`,
      `Duplicate node ID "${node.id}" in system ${sys.name}`
    )
    nodeIds.add(node.id)

    assert(
      validClassifications.includes(node.classification),
      suite3,
      `Node Classification: ${node.id}`,
      `Invalid classification "${node.classification}" on node ${node.id}`
    )

    assert(
      node.inputs.length >= 1 && node.outputs.length >= 1,
      suite3,
      `I/O Specifications: ${node.id}`,
      `Node ${node.id} missing inputs or outputs`
    )

    assert(
      node.sourceLocation.length > 5,
      suite3,
      `Source Location: ${node.id}`,
      `Node ${node.id} has empty or trivial source location`
    )

    assert(
      node.verificationEvidence.label.length > 3 && node.verificationEvidence.measurement.length > 5,
      suite3,
      `Verification Evidence: ${node.id}`,
      `Node ${node.id} missing verified evidence details`
    )
  })
})

// ---------------------------------------------------------------------------
// SUITE 4: DIRECTED EDGE CONSISTENCY
// ---------------------------------------------------------------------------
const suite4 = 'Suite 4: Edge Consistency'

systemsArchitecture.forEach((sys) => {
  const validNodeIds = new Set(sys.nodes.map((n) => n.id))

  assert(
    sys.edges.length >= 2,
    suite4,
    `Edge Count: ${sys.name}`,
    `System ${sys.name} has only ${sys.edges.length} edges`
  )

  sys.edges.forEach((edge, idx) => {
    assert(
      validNodeIds.has(edge.from),
      suite4,
      `Edge ${idx} Source in ${sys.name}`,
      `Edge "from" node "${edge.from}" does not exist in system ${sys.name}`
    )
    assert(
      validNodeIds.has(edge.to),
      suite4,
      `Edge ${idx} Target in ${sys.name}`,
      `Edge "to" node "${edge.to}" does not exist in system ${sys.name}`
    )
  })
})

// ---------------------------------------------------------------------------
// SUITE 5: SEQUENTIAL EXECUTION FLOW INVARIANTS
// ---------------------------------------------------------------------------
const suite5 = 'Suite 5: Execution Flow Steps'

systemsArchitecture.forEach((sys) => {
  const validNodeIds = new Set(sys.nodes.map((n) => n.id))

  assert(
    sys.executionFlow.length >= 4,
    suite5,
    `Flow Depth: ${sys.name}`,
    `System ${sys.name} has only ${sys.executionFlow.length} flow steps (min 4 required)`
  )

  sys.executionFlow.forEach((step, idx) => {
    assert(
      step.stepNumber === idx + 1,
      suite5,
      `Step Numbering: ${sys.name} Step ${idx + 1}`,
      `Step at index ${idx} has stepNumber ${step.stepNumber}`
    )
    assert(
      validNodeIds.has(step.activeNodeId),
      suite5,
      `Active Node in Flow: ${sys.name} Step ${step.stepNumber}`,
      `Active node "${step.activeNodeId}" not found in system nodes`
    )
    assert(
      step.dataPayloadSummary.length > 5,
      suite5,
      `Payload Summary: ${sys.name} Step ${step.stepNumber}`,
      `Step ${step.stepNumber} has empty data payload summary`
    )
  })
})

// ---------------------------------------------------------------------------
// SUITE 6: FAILURE & CONTAINMENT BOUNDARIES
// ---------------------------------------------------------------------------
const suite6 = 'Suite 6: Failure Boundaries'

systemsArchitecture.forEach((sys) => {
  assert(
    sys.failureBoundaries.length >= 2,
    suite6,
    `Boundary Count: ${sys.name}`,
    `System ${sys.name} has only ${sys.failureBoundaries.length} failure boundaries (min 2 required)`
  )

  sys.failureBoundaries.forEach((fb) => {
    assert(
      fb.name.length > 5 && fb.triggerCondition.length > 10 && fb.containmentAction.length > 10,
      suite6,
      `Failure Gate Details: ${fb.id}`,
      `Failure boundary ${fb.id} has insufficient details`
    )
    assert(
      fb.sourceFile.length > 5 && fb.verifiedTest.length > 5,
      suite6,
      `Failure Provenance: ${fb.id}`,
      `Failure boundary ${fb.id} missing source file or verified test`
    )
  })
})

// ---------------------------------------------------------------------------
// SUITE 7: ARCHITECTURAL ISOLATION & ASK AADIL PROTECTION
// ---------------------------------------------------------------------------
const suite7 = 'Suite 7: Architectural Boundary Isolation'

const archDataFile = path.join(process.cwd(), 'data/architecture/systemsArchitecture.ts')
const archContent = fs.readFileSync(archDataFile, 'utf-8')

assert(
  !archContent.includes('from \'@/lib/rag/\'') &&
    !archContent.includes('from "../lib/rag/"') &&
    !archContent.includes('from \'@/lib/rag-lab/\''),
  suite7,
  'systemsArchitecture.ts Zero Coupling to lib/rag',
  'systemsArchitecture.ts violates boundary by importing runtime logic from lib/rag/ or lib/rag-lab/'
)

const explorerComponentFile = path.join(process.cwd(), 'components/architecture/ArchitectureExplorer.tsx')
const explorerContent = fs.readFileSync(explorerComponentFile, 'utf-8')

assert(
  !explorerContent.includes('from \'@/lib/rag/\'') &&
    !explorerContent.includes('from \'@/lib/rag-lab/\''),
  suite7,
  'ArchitectureExplorer.tsx Zero Coupling to lib/rag',
  'ArchitectureExplorer.tsx violates boundary by importing runtime logic from lib/rag/ or lib/rag-lab/'
)

// ---------------------------------------------------------------------------
// SUMMARY & OUTPUT
// ---------------------------------------------------------------------------
console.log('\n' + '='.repeat(70))
console.log('TEST SUITE EXECUTION SUMMARY')
console.log('='.repeat(70))

const suites = Array.from(new Set(results.map((r) => r.suite)))
let totalPassed = 0
let totalFailed = 0

suites.forEach((s) => {
  const suiteResults = results.filter((r) => r.suite === s)
  const passed = suiteResults.filter((r) => r.passed).length
  const failed = suiteResults.filter((r) => !r.passed).length
  totalPassed += passed
  totalFailed += failed
  const statusIcon = failed === 0 ? '✅' : '❌'
  console.log(`${statusIcon} ${s}: ${passed}/${suiteResults.length} passed`)
})

console.log('-'.repeat(70))
console.log(`TOTAL: ${totalPassed} passed, ${totalFailed} failed out of ${results.length} checks`)
console.log('='.repeat(70))

if (totalFailed > 0) {
  process.exit(1)
} else {
  console.log('ALL ARCHITECTURE EXPLORER VERIFICATIONS PASSED SUCCESSFULLY.')
  process.exit(0)
}

