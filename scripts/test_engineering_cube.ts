/**
 * Test Suite: Phase 7.2 — Interactive 3D Engineering Cube
 *
 * Verifies:
 * 1. Six-face capability mapping completeness & uniqueness
 * 2. Navigation destination correctness against actual app routes & project slugs
 * 3. Deterministic 90-degree snap rotation state transitions
 * 4. Rapid repeated input resilience (no stuck or invalid state)
 * 5. Keyboard horizontal/vertical/reset transition paths
 * 6. Accessibility semantics & reduced-motion / mobile / 3D-fallback implementation
 */

import * as fs from 'fs'
import * as path from 'path'
import { CUBE_CAPABILITIES, CubeFaceIndex } from '../data/cubeCapabilities'
import {
  cubeReducer,
  INITIAL_CUBE_STATE,
  CubeState
} from '../components/EngineeringCube/useCubeState'
import { projects } from '../data/projects'

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
console.log('PHASE 7.2 — INTERACTIVE 3D ENGINEERING CUBE TEST SUITE')
console.log('='.repeat(70))

// ---------------------------------------------------------------------------
// SUITE 1: SIX-FACE MAPPING & DESTINATION VERIFICATION
// ---------------------------------------------------------------------------
const S1 = 'Capability Mapping'

assert(
  CUBE_CAPABILITIES.length === 6,
  S1,
  'Exactly 6 capability faces defined',
  `Expected 6 faces, got ${CUBE_CAPABILITIES.length}`
)

const indices = CUBE_CAPABILITIES.map((c) => c.index)
assert(
  JSON.stringify(indices) === JSON.stringify([0, 1, 2, 3, 4, 5]),
  S1,
  'Contiguous face indices 0..5',
  `Got indices: ${JSON.stringify(indices)}`
)

const uniqueIds = new Set(CUBE_CAPABILITIES.map((c) => c.id))
assert(
  uniqueIds.size === 6,
  S1,
  'All 6 capability IDs are unique',
  `Unique IDs: ${uniqueIds.size}`
)

const projectSlugs = new Set(projects.map((p) => p.slug))
const appDir = path.resolve(process.cwd(), 'app')

function routeExistsInRepo(route: string): boolean {
  if (route.startsWith('/projects/')) {
    const slug = route.replace('/projects/', '')
    return projectSlugs.has(slug)
  }
  const clean = route.replace(/^\//, '')
  return fs.existsSync(path.join(appDir, clean, 'page.tsx'))
}

for (const cap of CUBE_CAPABILITIES) {
  assert(
    routeExistsInRepo(cap.primaryRoute),
    S1,
    `Primary route exists: ${cap.primaryRoute}`,
    `Route ${cap.primaryRoute} not found in app/ or data/projects.ts`
  )
  for (const sup of cap.supportingLinks) {
    assert(
      routeExistsInRepo(sup.href),
      S1,
      `Supporting route exists: ${sup.href}`,
      `Route ${sup.href} not found in app/ or data/projects.ts`
    )
  }
}

// ---------------------------------------------------------------------------
// SUITE 2: 90-DEGREE SNAP & ROTATION TRANSITIONS
// ---------------------------------------------------------------------------
const S2 = 'Rotation & 90-Degree Snap'

assert(
  INITIAL_CUBE_STATE.activeFace === 0 &&
    INITIAL_CUBE_STATE.rotateX === 0 &&
    INITIAL_CUBE_STATE.rotateY === 0 &&
    INITIAL_CUBE_STATE.hasInteracted === false,
  S2,
  'Initial state starts at Front face (0, 0deg, manual default)',
  `Unexpected initial state: ${JSON.stringify(INITIAL_CUBE_STATE)}`
)

for (const cap of CUBE_CAPABILITIES) {
  const next = cubeReducer(INITIAL_CUBE_STATE, {
    type: 'SELECT_FACE',
    face: cap.index
  })
  assert(
    next.activeFace === cap.index,
    S2,
    `SELECT_FACE(${cap.index}) sets activeFace=${cap.index}`,
    `Got activeFace=${next.activeFace}`
  )
  assert(
    next.rotateX % 90 === 0 && next.rotateY % 90 === 0,
    S2,
    `Face ${cap.index} snaps to 90-degree increments`,
    `Got (${next.rotateX}, ${next.rotateY})`
  )
  assert(
    next.hasInteracted === true,
    S2,
    `SELECT_FACE(${cap.index}) marks hasInteracted=true`,
    `hasInteracted was ${next.hasInteracted}`
  )
}

// Full sequential cycle via STEP_NEXT visits all 6 faces and wraps back to 0
let seqState: CubeState = INITIAL_CUBE_STATE
const visitedNext: number[] = []
for (let i = 0; i < 6; i++) {
  seqState = cubeReducer(seqState, { type: 'STEP_NEXT' })
  visitedNext.push(seqState.activeFace)
}
assert(
  JSON.stringify(visitedNext) === JSON.stringify([1, 2, 3, 4, 5, 0]),
  S2,
  'STEP_NEXT cycles through all 6 faces 1->2->3->4->5->0',
  `Visited: ${JSON.stringify(visitedNext)}`
)

// Full backward cycle via STEP_PREV
let prevState: CubeState = INITIAL_CUBE_STATE
const visitedPrev: number[] = []
for (let i = 0; i < 6; i++) {
  prevState = cubeReducer(prevState, { type: 'STEP_PREV' })
  visitedPrev.push(prevState.activeFace)
}
assert(
  JSON.stringify(visitedPrev) === JSON.stringify([5, 4, 3, 2, 1, 0]),
  S2,
  'STEP_PREV cycles backward through all 6 faces 5->4->3->2->1->0',
  `Visited: ${JSON.stringify(visitedPrev)}`
)

// Horizontal & vertical keyboard/swipe stepping
const hRight = cubeReducer(INITIAL_CUBE_STATE, { type: 'STEP_HORIZONTAL', direction: 1 })
const hLeft = cubeReducer(INITIAL_CUBE_STATE, { type: 'STEP_HORIZONTAL', direction: -1 })
const vUp = cubeReducer(INITIAL_CUBE_STATE, { type: 'STEP_VERTICAL', direction: 1 })
const vDown = cubeReducer(INITIAL_CUBE_STATE, { type: 'STEP_VERTICAL', direction: -1 })

assert(hRight.activeFace === 1, S2, 'Horizontal +1 from Front -> Right (1)', `Got ${hRight.activeFace}`)
assert(hLeft.activeFace === 3, S2, 'Horizontal -1 from Front -> Left (3)', `Got ${hLeft.activeFace}`)
assert(vUp.activeFace === 4, S2, 'Vertical +1 from Front -> Top (4)', `Got ${vUp.activeFace}`)
assert(vDown.activeFace === 5, S2, 'Vertical -1 from Front -> Bottom (5)', `Got ${vDown.activeFace}`)

// Recovering horizontally from Top/Bottom
const hFromTop = cubeReducer(vUp, { type: 'STEP_HORIZONTAL', direction: 1 })
assert(hFromTop.activeFace === 1, S2, 'Horizontal +1 from Top recovers to Right (1)', `Got ${hFromTop.activeFace}`)

// Reset action
const resetState = cubeReducer(vDown, { type: 'RESET' })
assert(
  resetState.activeFace === 0 && resetState.rotateX === 0 && resetState.rotateY === 0,
  S2,
  'RESET returns cleanly to Front (0)',
  `Got ${JSON.stringify(resetState)}`
)

// ---------------------------------------------------------------------------
// SUITE 3: RAPID REPEATED INPUT RESILIENCE
// ---------------------------------------------------------------------------
const S3 = 'Rapid Repeated Input'
let rapidState: CubeState = INITIAL_CUBE_STATE
const actions = [
  { type: 'STEP_NEXT' as const },
  { type: 'STEP_NEXT' as const },
  { type: 'STEP_PREV' as const },
  { type: 'STEP_HORIZONTAL' as const, direction: 1 as const },
  { type: 'STEP_VERTICAL' as const, direction: 1 as const },
  { type: 'STEP_VERTICAL' as const, direction: -1 as const },
  { type: 'SELECT_FACE' as const, face: 3 as CubeFaceIndex },
  { type: 'RESET' as const }
]

let validEveryStep = true
for (let i = 0; i < 120; i++) {
  rapidState = cubeReducer(rapidState, actions[i % actions.length])
  const validFace = rapidState.activeFace >= 0 && rapidState.activeFace <= 5
  const validAngles =
    Number.isFinite(rapidState.rotateX) &&
    Number.isFinite(rapidState.rotateY) &&
    rapidState.rotateX % 90 === 0 &&
    rapidState.rotateY % 90 === 0
  if (!validFace || !validAngles) {
    validEveryStep = false
    break
  }
}

assert(
  validEveryStep && rapidState.interactionCount === 120,
  S3,
  '120 rapid mixed transitions maintain valid 90-deg state without lockup',
  `valid=${validEveryStep}, count=${rapidState.interactionCount}`
)

// ---------------------------------------------------------------------------
// SUITE 4: ACCESSIBILITY SEMANTICS & FALLBACKS (STATIC SOURCE CHECK)
// ---------------------------------------------------------------------------
const S4 = 'Accessibility & Fallbacks'
const cubeNavSrc = fs.readFileSync(
  path.resolve(process.cwd(), 'components/EngineeringCube/CubeNavigation.tsx'),
  'utf8'
)
const cubeMainSrc = fs.readFileSync(
  path.resolve(process.cwd(), 'components/EngineeringCube/EngineeringCube.tsx'),
  'utf8'
)
const cubeStateSrc = fs.readFileSync(
  path.resolve(process.cwd(), 'components/EngineeringCube/useCubeState.ts'),
  'utf8'
)

assert(
  !cubeNavSrc.includes('role="tab"') && !cubeNavSrc.includes('role="tablist"'),
  S4,
  'Does not misuse ARIA tab/tablist roles for navigation controls',
  'Found role="tab" or role="tablist" in CubeNavigation.tsx'
)
assert(
  cubeNavSrc.includes('aria-pressed=') && cubeNavSrc.includes('aria-live="polite"'),
  S4,
  'Uses aria-pressed on face buttons and aria-live="polite" status',
  'Missing aria-pressed or aria-live in CubeNavigation.tsx'
)
assert(
  cubeStateSrc.includes("removeEventListener('change'"),
  S4,
  'Cleans up matchMedia event listeners on unmount',
  'Missing removeEventListener cleanup in useCubeState.ts'
)
assert(
  cubeStateSrc.includes('prefers-reduced-motion: reduce') &&
    cubeStateSrc.includes('max-width: 639px') &&
    cubeStateSrc.includes('preserve-3d'),
  S4,
  'Checks reduced-motion, mobile <640px, and CSS 3D support',
  'Missing environment fallback checks in useCubeState.ts'
)
assert(
  !cubeStateSrc.includes('setInterval'),
  S4,
  'No default auto-rotation interval timer',
  'Found setInterval in useCubeState.ts'
)
assert(
  cubeMainSrc.includes('ReducedMotionGrid'),
  S4,
  'Renders ReducedMotionGrid fallback when flat grid is required',
  'Missing ReducedMotionGrid in EngineeringCube.tsx'
)

// Summary
const passed = results.filter((r) => r.passed).length
const failed = results.filter((r) => !r.passed).length
console.log('-'.repeat(70))
console.log(`TOTAL: ${results.length} | PASSED: ${passed} | FAILED: ${failed}`)
console.log('='.repeat(70))

if (failed > 0) {
  process.exit(1)
}

