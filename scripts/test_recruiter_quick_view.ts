/**
 * Test Suite: Recruiter Quick View Integrity & Canonical Consistency
 * 
 * Verifies:
 * 1. Canonical Profile Consistency & Identity Verification
 * 2. Privacy Boundary Verification (Strict Phone Number Omission)
 * 3. Core Capabilities Coverage & Technology Mapping
 * 4. Career Progression Chronology & Transition Narrative
 * 5. Curated Flagship Projects (4 Projects, Qualified Outcomes)
 * 6. Ask Aadil Isolation & Architectural Invariants
 */

import { recruiterProfile } from '../data/recruiter/recruiterProfile'
import { structuredProfile } from '../data/canonical/structuredProfile'
import { resumeData } from '../data/canonical/resumeData'
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
console.log('RECRUITER QUICK VIEW INTEGRITY & VERIFICATION SUITE')
console.log('='.repeat(70))

// ---------------------------------------------------------------------------
// SUITE 1: CANONICAL PROFILE CONSISTENCY & IDENTITY
// ---------------------------------------------------------------------------
const suite1 = 'Suite 1: Identity & Canonical Profile'

assert(
  recruiterProfile.name === structuredProfile.name && recruiterProfile.name === 'Mohemmed Aadil Khurshid',
  suite1,
  'Candidate Name Consistency',
  `Expected "Mohemmed Aadil Khurshid", got "${recruiterProfile.name}"`
)

assert(
  recruiterProfile.headline === 'AI Systems Engineer',
  suite1,
  'Target Headline Consistency',
  `Expected "AI Systems Engineer", got "${recruiterProfile.headline}"`
)

assert(
  recruiterProfile.supportingPositioning.includes('AI Engineer') &&
    recruiterProfile.supportingPositioning.includes('Python') &&
    recruiterProfile.supportingPositioning.includes('LLM & Agentic Systems'),
  suite1,
  'Supporting Positioning Keywords',
  `Supporting positioning missing core pillars: "${recruiterProfile.supportingPositioning}"`
)

assert(
  recruiterProfile.location === structuredProfile.location,
  suite1,
  'Location Canonical Match',
  `Location does not match canonical: "${recruiterProfile.location}" vs "${structuredProfile.location}"`
)

assert(
  recruiterProfile.availability.toLowerCase().includes('open') &&
    recruiterProfile.availability.includes('Hyderabad'),
  suite1,
  'Availability Framing (Hyderabad / Remote)',
  `Availability framing invalid: "${recruiterProfile.availability}"`
)

// ---------------------------------------------------------------------------
// SUITE 2: PRIVACY BOUNDARY VERIFICATION (PHONE OMISSION)
// ---------------------------------------------------------------------------
const suite2 = 'Suite 2: Privacy Boundary'

const serializedProfile = JSON.stringify(recruiterProfile)
const phonePattern = /7973949541|\+91[- ]?7973949541/

assert(
  !phonePattern.test(serializedProfile),
  suite2,
  'recruiterProfile Data Privacy Check',
  'recruiterProfile contains sensitive phone number string!'
)

// Also inspect the RecruiterQuickView component file for direct leakage
const componentFilePath = path.join(__dirname, '../../components/recruiter/RecruiterQuickView.tsx')
let componentSource = ''
if (fs.existsSync(componentFilePath)) {
  componentSource = fs.readFileSync(componentFilePath, 'utf-8')
} else {
  // Try alternative path if executing from scratch/test_build/scripts
  const altPath = path.join(process.cwd(), 'components/recruiter/RecruiterQuickView.tsx')
  if (fs.existsSync(altPath)) {
    componentSource = fs.readFileSync(altPath, 'utf-8')
  }
}

assert(
  componentSource.length > 0,
  suite2,
  'RecruiterQuickView Component Readability',
  'Could not locate RecruiterQuickView.tsx to verify privacy boundaries'
)

assert(
  !phonePattern.test(componentSource),
  suite2,
  'RecruiterQuickView Component Privacy Check',
  'RecruiterQuickView.tsx source contains sensitive phone number!'
)

assert(
  recruiterProfile.contact.email === structuredProfile.email &&
    recruiterProfile.contact.email === 'aadil.khurshid95@gmail.com',
  suite2,
  'Canonical Email Correctness',
  `Email mismatch: expected aadil.khurshid95@gmail.com, got ${recruiterProfile.contact.email}`
)

assert(
  recruiterProfile.contact.resumeUrl === '/resume.pdf',
  suite2,
  'Resume Link Target',
  `Expected /resume.pdf, got ${recruiterProfile.contact.resumeUrl}`
)

// ---------------------------------------------------------------------------
// SUITE 3: CORE CAPABILITIES COVERAGE
// ---------------------------------------------------------------------------
const suite3 = 'Suite 3: Engineering Capabilities'

assert(
  recruiterProfile.capabilities.length === 6,
  suite3,
  'Capability Count (6 Groups)',
  `Expected 6 capability groups, got ${recruiterProfile.capabilities.length}`
)

const expectedCapTitles = [
  'Agentic Systems & Orchestration',
  'LLM Applications & RAG',
  'AI Reliability & Evaluation',
  'Python Backend Engineering',
  'Full-Stack Development',
  'Deterministic Systems & Verification'
]

expectedCapTitles.forEach((expectedTitle) => {
  const found = recruiterProfile.capabilities.find((c) => c.title === expectedTitle)
  assert(
    !!found && found.technologies.length >= 3 && found.description.length > 20,
    suite3,
    `Capability: ${expectedTitle}`,
    `Capability missing or insufficient depth: ${expectedTitle}`
  )
})

// ---------------------------------------------------------------------------
// SUITE 4: CAREER PROGRESSION & EXPERIENCE CHRONOLOGY
// ---------------------------------------------------------------------------
const suite4 = 'Suite 4: Career Progression'

assert(
  recruiterProfile.experience.length === 4,
  suite4,
  'Experience Count (4 Canonical Tiers)',
  `Expected 4 experience tiers, got ${recruiterProfile.experience.length}`
)

const exp0 = recruiterProfile.experience[0]
assert(
  exp0.classification === 'independent_research' && exp0.period.includes('August 2026'),
  suite4,
  'Tier 1: Independent Research Period',
  `Tier 1 invalid: ${JSON.stringify(exp0)}`
)

const exp1 = recruiterProfile.experience[1]
assert(
  exp1.classification === 'ai_engineering' &&
    exp1.organization.includes('Wayground') &&
    exp1.role.includes('AI Engineer'),
  suite4,
  'Tier 2: Wayground AI Engineer Role',
  `Tier 2 invalid: ${JSON.stringify(exp1)}`
)

const exp2 = recruiterProfile.experience[2]
assert(
  exp2.classification === 'domain_expertise' &&
    exp2.organization.includes('Wayground') &&
    (exp2.role.includes('Mathematics') || exp2.role.includes('Subject Matter Expert')),
  suite4,
  'Tier 3: Wayground Mathematics SME Role',
  `Tier 3 invalid: ${JSON.stringify(exp2)}`
)

const exp3 = recruiterProfile.experience[3]
assert(
  exp3.classification === 'earlier_career',
  suite4,
  'Tier 4: Earlier Career Grouping',
  `Tier 4 invalid: ${JSON.stringify(exp3)}`
)

assert(
  recruiterProfile.transitionNarrative.length > 50,
  suite4,
  'Transition Narrative Presence',
  'Transition narrative is empty or too short'
)

// ---------------------------------------------------------------------------
// SUITE 5: CURATED FLAGSHIP PROJECTS
// ---------------------------------------------------------------------------
const suite5 = 'Suite 5: Curated Flagship Projects'

assert(
  recruiterProfile.featuredProjects.length === 4,
  suite5,
  'Flagship Project Count (Strictly 4)',
  `Expected 4 flagship projects, got ${recruiterProfile.featuredProjects.length}`
)

const expectedProjectSlugs = ['ai-reliability', 'ask-aadil', 'solace-ai', 'curriculum-etl']

expectedProjectSlugs.forEach((slug) => {
  const proj = recruiterProfile.featuredProjects.find((p) => p.slug === slug)
  assert(
    !!proj,
    suite5,
    `Flagship Project: ${slug}`,
    `Flagship project with slug ${slug} not found in featuredProjects`
  )
  if (proj) {
    assert(
      proj.route === `/projects/${slug}`,
      suite5,
      `Project Route: ${slug}`,
      `Expected /projects/${slug}, got ${proj.route}`
    )
    assert(
      proj.technicalHighlights.length >= 2,
      suite5,
      `Technical Highlights: ${slug}`,
      `Expected >= 2 technical highlights, got ${proj.technicalHighlights.length}`
    )
    assert(
      proj.verifiedOutcome.length > 10 && proj.outcomeQualification.length > 15,
      suite5,
      `Outcome Qualification: ${slug}`,
      `Verified outcome or qualification incomplete for ${slug}`
    )
  }
})

// ---------------------------------------------------------------------------
// SUITE 6: ARCHITECTURAL BOUNDARY & ASK AADIL ISOLATION
// ---------------------------------------------------------------------------
const suite6 = 'Suite 6: Architectural Isolation'

// Check that recruiter profile and component do NOT import lib/rag
const recruiterProfileFile = path.join(process.cwd(), 'data/recruiter/recruiterProfile.ts')
const recruiterProfileContent = fs.readFileSync(recruiterProfileFile, 'utf-8')

assert(
  !recruiterProfileContent.includes('lib/rag') && !recruiterProfileContent.includes('@/lib/rag'),
  suite6,
  'recruiterProfile Isolation from lib/rag',
  'recruiterProfile.ts violates Ask Aadil isolation boundary by importing from lib/rag'
)

assert(
  !componentSource.includes('lib/rag') && !componentSource.includes('@/lib/rag'),
  suite6,
  'RecruiterQuickView Isolation from lib/rag',
  'RecruiterQuickView.tsx violates Ask Aadil isolation boundary by importing from lib/rag'
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
  console.log('ALL VERIFICATIONS PASSED SUCCESSFULLY.')
  process.exit(0)
}
