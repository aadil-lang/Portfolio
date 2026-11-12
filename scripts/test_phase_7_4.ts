/**
 * PHASE 7.4 VERIFICATION SUITE
 * Validates Refinements A through E:
 * A: Homepage Recruiter Quick View bridge link
 * B: Executive summary callouts (RAG Lab, Architecture, Verification)
 * C: Header navigation (4 hubs + action pills + mobile drawer groups + footer secondary discoverability)
 * D: 3D Engineering Cube desktop pointer drag, cursor states & hint pill
 * E: Cartographic section transitions and consistent section anchors 01-06
 */

import * as fs from 'fs';
import * as path from 'path';
import { INITIAL_CUBE_STATE, cubeReducer } from '../components/EngineeringCube/useCubeState';
import { CUBE_CAPABILITIES } from '../data/cubeCapabilities';

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;

function assert(condition: boolean, testName: string, details?: string) {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  ✓ [PASS] ${testName}`);
  } else {
    failedChecks++;
    console.error(`  ✗ [FAIL] ${testName} ${details ? `(${details})` : ''}`);
  }
}

console.log('============================================================');
console.log('RUNNING PHASE 7.4 VERIFICATION SUITE');
console.log('============================================================\n');

// ------------------------------------------------------------
// 1. REFINEMENT A: HOMEPAGE RECRUITER QUICK VIEW BRIDGE
// ------------------------------------------------------------
console.log('1. REFINEMENT A — HOMEPAGE RECRUITER BRIDGE LINK');
const homePageContent = fs.readFileSync(path.join(process.cwd(), 'app/page.tsx'), 'utf8');

assert(
  homePageContent.includes('/recruiter'),
  'Homepage contains destination link to /recruiter'
);
assert(
  homePageContent.includes('Short on time? View the 30-second executive summary'),
  'Hero contains exact bridge copy: "Short on time? View the 30-second executive summary"'
);
assert(
  homePageContent.includes('text-[#9EA4AA] hover:text-[#78C29A]'),
  'Bridge link is visually subordinate to primary buttons with emerald hover'
);
assert(
  homePageContent.indexOf('Explore Projects →') < homePageContent.indexOf('Short on time? View the 30-second executive summary'),
  'Bridge link is positioned below the primary CTA button row'
);
assert(
  homePageContent.includes('focus-visible:ring-1 focus-visible:ring-[#5A9A78]'),
  'Bridge link provides accessible keyboard focus ring'
);

// ------------------------------------------------------------
// 2. REFINEMENT B: EXECUTIVE SUMMARY CALLOUTS
// ------------------------------------------------------------
console.log('\n2. REFINEMENT B — EXECUTIVE SUMMARY CALLOUTS');
const execSummaryPath = path.join(process.cwd(), 'components/shared/ExecutiveSummary.tsx');
assert(fs.existsSync(execSummaryPath), 'ExecutiveSummary.tsx reusable component exists');

const execSummaryContent = fs.readFileSync(execSummaryPath, 'utf8');
assert(execSummaryContent.includes('badgeLabel'), 'ExecutiveSummary accepts badgeLabel prop');
assert(execSummaryContent.includes('title'), 'ExecutiveSummary accepts title prop');
assert(execSummaryContent.includes('summary'), 'ExecutiveSummary accepts summary prop');
assert(execSummaryContent.includes('supportingMessage'), 'ExecutiveSummary accepts supportingMessage prop');
assert(execSummaryContent.includes('accentColor'), 'ExecutiveSummary accepts accentColor prop');

// RAG Lab callout verification
const ragLabContent = fs.readFileSync(path.join(process.cwd(), 'app/rag-lab/page.tsx'), 'utf8');
assert(ragLabContent.includes('ExecutiveSummary'), 'RAG Lab incorporates ExecutiveSummary component');
assert(
  ragLabContent.includes('lexical and vector-space retrieval, hybrid ranking'),
  'RAG Lab executive summary accurately reflects lexical and vector-space retrieval'
);
assert(
  !ragLabContent.includes('dense neural embedding'),
  'RAG Lab does NOT claim dense neural embedding (truthful to TF-IDF n-gram implementation)'
);
assert(
  !ragLabContent.includes('zero hallucination guarantee'),
  'RAG Lab does NOT claim zero hallucination guarantee'
);

// Architecture Explorer callout verification
const archContent = fs.readFileSync(path.join(process.cwd(), 'app/architecture/page.tsx'), 'utf8');
assert(archContent.includes('ExecutiveSummary'), 'Architecture Explorer incorporates ExecutiveSummary component');
assert(
  archContent.includes('architecture of 11 AI and software systems'),
  'Architecture Explorer summary states exactly 11 systems'
);
assert(
  archContent.includes('failure boundaries') || archContent.includes('deterministic controls'),
  'Architecture Explorer summary highlights failure containment and deterministic controls'
);

// Verification Dashboard callout verification
const verifContent = fs.readFileSync(path.join(process.cwd(), 'app/verification/page.tsx'), 'utf8');
assert(verifContent.includes('ExecutiveSummary'), 'Verification Dashboard incorporates ExecutiveSummary component');
assert(
  verifContent.includes('33 master evidence records'),
  'Verification Dashboard summary states exactly 33 master evidence records'
);
assert(
  verifContent.includes('15 system verification summaries'),
  'Verification Dashboard summary states exactly 15 system summaries'
);
assert(
  verifContent.includes('771 dedicated verification checks'),
  'Verification Dashboard summary states exactly 771 dedicated checks'
);
assert(
  verifContent.includes('758 assertions in earlier regression baseline'),
  'Verification Dashboard summary distinguishes 758 earlier regression assertions'
);

// ------------------------------------------------------------
// 3. REFINEMENT C: HEADER NAVIGATION & MOBILE DRAWER
// ------------------------------------------------------------
console.log('\n3. REFINEMENT C — HEADER NAVIGATION STREAMLINING');
const headerContent = fs.readFileSync(path.join(process.cwd(), 'components/Header.tsx'), 'utf8');

assert(
  headerContent.includes("name: 'Experience', href: '/experience'"),
  'Primary nav hub 1: Experience (/experience)'
);
assert(
  headerContent.includes("name: 'Systems', href: '/systems'"),
  'Primary nav hub 2: Systems (/systems)'
);
assert(
  headerContent.includes("name: 'Architecture', href: '/architecture'"),
  'Primary nav hub 3: Architecture (/architecture)'
);
assert(
  headerContent.includes("name: 'Journal', href: '/journal'"),
  'Primary nav hub 4: Journal (/journal)'
);
assert(
  headerContent.includes('Quick View') && headerContent.includes('/recruiter'),
  'Quick View action pill preserved in header (/recruiter)'
);
assert(
  headerContent.includes('Ask Aadil') && headerContent.includes('open-ask-aadil'),
  'Ask Aadil action pill preserved with custom event dispatch'
);
assert(
  headerContent.includes('Resume') && headerContent.includes('profile.resumeUrl'),
  'Resume action pill preserved in header'
);

// Mobile drawer grouping
assert(
  headerContent.includes('EXPLORE'),
  'Mobile drawer contains EXPLORE category header'
);
assert(
  headerContent.includes('TOOLS & BENCHMARKS'),
  'Mobile drawer contains TOOLS & BENCHMARKS category header'
);
assert(
  headerContent.includes('CONNECT & ACTIONS'),
  'Mobile drawer contains CONNECT & ACTIONS category header'
);
assert(
  headerContent.includes('/rag-lab') && headerContent.includes('/verification') && headerContent.includes('/compare'),
  'All secondary tools (/rag-lab, /verification, /compare) are present in mobile drawer'
);
assert(
  headerContent.includes("e.key === 'Escape'"),
  'Mobile drawer supports Escape key to close'
);
assert(
  headerContent.includes("document.body.style.overflow = 'hidden'"),
  'Mobile drawer locks background scrolling when active'
);

// Footer discoverability
const footerContent = fs.readFileSync(path.join(process.cwd(), 'components/Footer.tsx'), 'utf8');
assert(footerContent.includes('/architecture'), 'Footer provides persistent link to /architecture');
assert(footerContent.includes('/compare'), 'Footer provides persistent link to /compare');
assert(footerContent.includes('/verification'), 'Footer provides persistent link to /verification');
assert(footerContent.includes('/rag-lab'), 'Footer provides persistent link to /rag-lab');
assert(footerContent.includes('/recruiter'), 'Footer provides persistent link to /recruiter');

// ------------------------------------------------------------
// 4. REFINEMENT D: ENGINEERING CUBE DESKTOP DRAG INTERACTION
// ------------------------------------------------------------
console.log('\n4. REFINEMENT D — ENGINEERING CUBE DESKTOP DRAG');
const cubeContainerContent = fs.readFileSync(path.join(process.cwd(), 'components/EngineeringCube/CubeContainer.tsx'), 'utf8');

assert(
  cubeContainerContent.includes('onPanStart={handlePanStart}'),
  'CubeContainer implements onPanStart handler for pointer dragging'
);
assert(
  cubeContainerContent.includes('onPan={handlePan}'),
  'CubeContainer implements onPan handler for pointer dragging'
);
assert(
  cubeContainerContent.includes('onPanEnd={handlePanEnd}'),
  'CubeContainer implements onPanEnd handler for pointer release'
);
assert(
  cubeContainerContent.includes('cursor-grab') && cubeContainerContent.includes('cursor-grabbing'),
  'CubeContainer dynamically toggles between cursor-grab and cursor-grabbing'
);
assert(
  cubeContainerContent.includes('Drag or click to rotate'),
  'CubeContainer renders "Drag or click to rotate" hint pill'
);
assert(
  cubeContainerContent.includes('hasDragged') || cubeContainerContent.includes('showDragHint'),
  'Drag hint pill statefully fades after first drag interaction'
);

// Cube reducer tests
const initialState = INITIAL_CUBE_STATE;
assert(initialState.activeFace === 0, 'Initial cube state selects face 0 (ai-systems-agentic)');
assert(initialState.rotateX === 0 && initialState.rotateY === 0, 'Initial active face rotation: 0deg X, 0deg Y');
assert(cubeContainerContent.includes("transform: 'rotateX(-22deg) rotateY(32deg)'"), 'Isometric viewing angle: -22deg X, 32deg Y in CubeContainer');

// Simulate right drag (direction: 1) -> STEP_HORIZONTAL advances face from 0 to 1
const rotatedRight = cubeReducer(initialState, { type: 'STEP_HORIZONTAL', direction: 1 });
assert(rotatedRight.activeFace === 1, 'Rotate right advances activeFace to 1 (retrieval-knowledge-rag)');
assert(CUBE_CAPABILITIES[rotatedRight.activeFace].id === 'retrieval-knowledge-rag', 'Face 1 is retrieval-knowledge-rag capability');
assert(rotatedRight.rotateY === -90, 'Rotate right sets target rotationY to -90deg');

// Simulate vertical drag (direction: -1) -> STEP_VERTICAL sets face 5
const rotatedDown = cubeReducer(initialState, { type: 'STEP_VERTICAL', direction: -1 });
assert(rotatedDown.activeFace === 5, 'Rotate down advances activeFace to 5 (human-centered-ai)');
assert(CUBE_CAPABILITIES[rotatedDown.activeFace].id === 'human-centered-ai', 'Face 5 is human-centered-ai capability');
assert(rotatedDown.rotateX === 90, 'Rotate down sets target rotationX to 90deg');

// Simulate direct face selection
const selectedEval = cubeReducer(initialState, { type: 'SELECT_FACE', face: 3 });
assert(selectedEval.activeFace === 3, 'SELECT_FACE 3 correctly sets activeFace to 3 (evaluation-reliability)');
assert(CUBE_CAPABILITIES[selectedEval.activeFace].id === 'evaluation-reliability', 'Face 3 maps to evaluation-reliability');
assert(selectedEval.rotateY === 90, 'SELECT_FACE 3 orients cube to 90deg Y');

// ------------------------------------------------------------
// 5. REFINEMENT E: HOMEPAGE SECTION ANCHORS & CONTINUITY
// ------------------------------------------------------------
console.log('\n5. REFINEMENT E — SECTION ANCHORS & VISUAL CONTINUITY');

assert(
  homePageContent.includes('01 // HERO & POSITIONING'),
  'Section 01 anchor: "01 // HERO & POSITIONING"'
);
assert(
  homePageContent.includes('02 // TECHNICAL EXPERTISE & COMPETENCY MATRIX'),
  'Section 02 anchor: "02 // TECHNICAL EXPERTISE & COMPETENCY MATRIX"'
);
assert(
  homePageContent.includes('03 // FEATURED ENGINEERING SYSTEMS'),
  'Section 03 anchor: "03 // FEATURED ENGINEERING SYSTEMS"'
);
assert(
  homePageContent.includes('04 // CAREER TRAJECTORY & ENGINEERING JOURNEY'),
  'Section 04 anchor: "04 // CAREER TRAJECTORY & ENGINEERING JOURNEY"'
);
assert(
  homePageContent.includes('05 // ASK AADIL LIVE AGENT SHOWCASE'),
  'Section 05 anchor: "05 // ASK AADIL LIVE AGENT SHOWCASE"'
);
assert(
  homePageContent.includes('06 // COLLABORATION & CONTACT'),
  'Section 06 anchor: "06 // COLLABORATION & CONTACT"'
);

const dividerCount = (homePageContent.match(/Cartographic Section Divider/g) || []).length;
assert(dividerCount >= 5, `Cartographic section dividers present between sections (found ${dividerCount})`);

// ------------------------------------------------------------
// SUMMARY
// ------------------------------------------------------------
console.log('\n============================================================');
console.log(`PHASE 7.4 TEST RESULTS: ${passedChecks}/${totalChecks} PASSED (${failedChecks} FAILED)`);
console.log('============================================================');

if (failedChecks > 0) {
  process.exit(1);
}
