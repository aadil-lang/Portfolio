import { askAadil } from '../lib/rag/askAadilAgent'
import { AgentConversationState } from '../types/rag'
import { queryQuantitativeRegistry } from '../lib/rag/knowledgeIndex'
import { githubOpenTool } from '../lib/rag/tools/navigationTools'

interface TestResult {
  name: string
  passed: boolean
  details?: string
}

const results: TestResult[] = []

function assert(condition: boolean, name: string, details?: string) {
  if (condition) {
    console.log(`  PASS: ${name}`)
    results.push({ name, passed: true })
  } else {
    console.error(`  FAIL: ${name}${details ? ` -> ${details}` : ''}`)
    results.push({ name, passed: false, details })
  }
}

async function runTests() {
  console.log('===============================================================')
  console.log('Ask Aadil — Phase 1: Critical Evidence Remediation Test Suite')
  console.log('===============================================================\n')

  // SECTION 1: VM Copy Claims & Identity Verification
  console.log('--- Section 1: VM Copy Claims & Identity ---')

  const vmStory = await askAadil('Tell me the complete story of VM Copy.')
  const vmStoryText = (vmStory.answer || '').toLowerCase()

  assert(
    !vmStoryText.includes('vm-copy-generator') && !vmStoryText.includes('aadilkhurshid/vm-copy-generator'),
    'VM Copy story does not cite fictitious repository (vm-copy-generator)'
  )
  assert(
    !vmStoryText.includes('28 vitest') && !vmStoryText.includes('28 tests'),
    'VM Copy story does not claim 28 Vitest tests'
  )
  assert(
    !vmStoryText.includes('2024'),
    'VM Copy story does not claim 2024 dates'
  )
  assert(
    vmStoryText.includes('2025') && (vmStoryText.includes('october') || vmStoryText.includes('mathematics')),
    'VM Copy story correctly anchors conception to Mathematics SME role in late 2025'
  )
  assert(
    vmStoryText.includes('november 2025') || vmStoryText.includes('internal'),
    'VM Copy story correctly notes internal team use in November 2025'
  )
  assert(
    vmStoryText.includes('catalyst') || vmStoryText.includes('transition') || vmStoryText.includes('january 2026'),
    'VM Copy story connects project as catalyst for AI/ML engineering role in Jan 2026'
  )
  assert(
    !vmStoryText.includes('under 0ms') && !vmStoryText.includes('<0ms'),
    'VM Copy story avoids impossible "under 0ms" latency claims'
  )

  const vmLatency = await askAadil('How fast was the deterministic evaluator in VM Copy?')
  const vmLatencyText = (vmLatency.answer || '').toLowerCase()
  assert(
    (vmLatencyText.includes('<1ms') || vmLatencyText.includes('sub-millisecond')) &&
    vmLatencyText.includes('candidate'),
    'VM Copy latency query accurately identifies <1ms sub-millisecond candidate check'
  )

  // Multi-turn context on VM Copy
  let state: AgentConversationState | undefined = undefined
  const turn1 = await askAadil('When was VM Copy conceived?', state)
  state = turn1.newState
  assert(
    (turn1.answer || '').toLowerCase().includes('october') || (turn1.answer || '').toLowerCase().includes('2025'),
    'Multi-turn: Turn 1 VM Copy conception correctly identified'
  )

  const turn2 = await askAadil('Was it deployed formally in corporate production?', state)
  state = turn2.newState
  const turn2Text = (turn2.answer || '').toLowerCase()
  assert(
    turn2Text.includes('internal') && !turn2Text.includes('corporate enterprise production'),
    'Multi-turn: Turn 2 confirms internal team adoption rather than formal enterprise production'
  )

  // SECTION 2: Loom AI vs Engineering Design Automation Disentanglement
  console.log('\n--- Section 2: Loom AI vs EDA CAD Disentanglement ---')

  const loomSummary = await askAadil('What is Loom AI?')
  const loomText = (loomSummary.answer || '').toLowerCase()
  assert(
    loomText.includes('textile') || loomText.includes('procurement') || loomText.includes('marketplace'),
    'Loom AI identified as B2B textile procurement platform'
  )
  assert(
    !loomText.includes('opencascade') && !loomText.includes('pythonocc') && !loomText.includes('shaft'),
    'Loom AI does NOT mention OpenCascade, PythonOCC, or mechanical shafts'
  )
  assert(
    !loomText.includes('424 tests') && !loomText.includes('0.0000%'),
    'Loom AI does NOT claim 424 tests or 0.0000% volume discrepancy'
  )

  const edaSummary = await askAadil('What is Engineering Design Automation?')
  const edaText = (edaSummary.answer || '').toLowerCase()
  assert(
    edaText.includes('opencascade') || edaText.includes('cad') || edaText.includes('shaft') || edaText.includes('mechanical'),
    'EDA identified as mechanical CAD / shaft design system'
  )
  assert(
    !edaText.includes('textile') && !edaText.includes('marketplace') && !edaText.includes('procurement'),
    'EDA does NOT mention textile procurement marketplace'
  )

  // Quantitative registry disambiguation
  const loomClaims = queryQuantitativeRegistry('How many tests does Loom AI have?')
  assert(
    loomClaims.some(c => c.id === 'claim-loom-42-tests') && !loomClaims.some(c => c.id === 'claim-eda-424-tests'),
    'Quantitative registry routes Loom AI test queries to 42 tests claim'
  )

  const edaClaims = queryQuantitativeRegistry('How many tests does EDA have?')
  assert(
    edaClaims.some(c => c.id === 'claim-eda-424-tests') && !edaClaims.some(c => c.id === 'claim-loom-42-tests'),
    'Quantitative registry routes EDA test queries to 424 tests claim'
  )

  // Caveat verification on EDA volume error
  const edaTech = await askAadil('Tell me about the engineering accuracy of Engineering Design Automation CAD.')
  const edaTechText = (edaTech.answer || '').toLowerCase()
  assert(
    edaTechText.includes('analytical') || edaTechText.includes('software') || edaTechText.includes('kernel') || edaTechText.includes('primitives'),
    'EDA CAD technical description includes mathematical software agreement qualification'
  )

  // Comparison Disentanglement: 3 Distinct Pairs
  console.log('\n--- Section 3: Distinct Project Comparisons ---')

  const compSolaceEda = await askAadil('Compare Solace AI and EDA.')
  const compSEText = (compSolaceEda.answer || '').toLowerCase()
  assert(
    (compSEText.includes('solace') && compSEText.includes('design automation')) &&
    !compSEText.includes('loom ai (engineering design automation)'),
    'Comparison 1: Solace AI vs EDA does not conflate Loom AI and EDA'
  )

  const compSolaceLoom = await askAadil('Compare Solace AI and Loom AI.')
  const compSLText = (compSolaceLoom.answer || '').toLowerCase()
  assert(
    (compSLText.includes('solace') && compSLText.includes('loom')) &&
    (compSLText.includes('textile') || compSLText.includes('procurement')) &&
    !compSLText.includes('opencascade') && !compSLText.includes('shaft'),
    'Comparison 2: Solace AI vs Loom AI accurately treats Loom AI as textile procurement'
  )

  const compEdaLoom = await askAadil('Compare EDA and Loom AI.')
  const compELText = (compEdaLoom.answer || '').toLowerCase()
  assert(
    (compELText.includes('opencascade') || compELText.includes('shaft') || compELText.includes('cad')) &&
    (compELText.includes('textile') || compELText.includes('marketplace') || compELText.includes('procurement')),
    'Comparison 3: EDA vs Loom AI cleanly contrasts mechanical CAD with textile procurement'
  )

  // SECTION 4: Proprietary GitHub Navigation & Conceptual Safeguards
  console.log('\n--- Section 4: Proprietary GitHub Navigation & Safeguards ---')

  // Direct tool execution on VM Copy
  const vmNavDirect = await githubOpenTool.execute({ project: 'vm-copy' })
  assert(
    vmNavDirect.success && Boolean(vmNavDirect.navigation?.url.includes('/projects/vm-copy')) &&
    !vmNavDirect.navigation?.url.includes('github.com'),
    'githubOpenTool navigates VM Copy to /projects/vm-copy Systems Archive, not github.com'
  )
  assert(
    (vmNavDirect.message || '').toLowerCase().includes('employer context') ||
    (vmNavDirect.message || '').toLowerCase().includes('proprietary') ||
    (vmNavDirect.message || '').toLowerCase().includes('systems archive'),
    'githubOpenTool provides explanatory message regarding proprietary/internal context'
  )

  // Direct tool execution on Personal Profile
  const profileNavDirect = await githubOpenTool.execute({ project: 'profile' })
  assert(
    profileNavDirect.success && profileNavDirect.navigation?.url === 'https://github.com/aadil-lang',
    'githubOpenTool preserves authentic personal profile navigation to github.com/aadil-lang'
  )

  // Agent execution: VM Copy repo request
  const vmRepoQuery = await askAadil("Show me VM Copy's GitHub repository.")
  const vmRepoText = (vmRepoQuery.answer || '').toLowerCase()
  assert(
    !vmRepoText.includes('https://github.com/aadilkhurshid/vm-copy-generator') &&
    (vmRepoText.includes('systems archive') || vmRepoText.includes('internal') || vmRepoText.includes('employer') || vmRepoText.includes('proprietary')),
    'Agent response for VM Copy GitHub repo informs user of internal/proprietary context without fabricating repo'
  )

  // Agent execution: Verified public repo request (EDA)
  const edaRepoQuery = await askAadil("Show me EDA's GitHub repository.")
  assert(
    edaRepoQuery.suggestedAction?.type === 'navigate' &&
    edaRepoQuery.suggestedAction.payload.url.toLowerCase().includes('engineering-design-automation'),
    'Agent response for EDA repository navigates to verified GitHub repository'
  )

  // Agent execution: Conceptual repository query
  const conceptualQuery = await askAadil("What happens if a project's GitHub repository is unavailable?")
  assert(
    conceptualQuery.suggestedAction === undefined,
    'Conceptual repository query does NOT trigger a navigation action'
  )
  assert(
    (conceptualQuery.answer || '').toLowerCase().includes('offline') ||
    (conceptualQuery.answer || '').toLowerCase().includes('proprietary') ||
    (conceptualQuery.answer || '').toLowerCase().includes('systems archive') ||
    (conceptualQuery.answer || '').toLowerCase().includes('verified'),
    'Conceptual repository query returns educational explanation of archive handling'
  )

  // Summary
  console.log('\n===============================================================')
  const total = results.length
  const passed = results.filter(r => r.passed).length
  const failed = total - passed
  console.log(`Phase 1 Critical Remediation Test Suite Summary:`)
  console.log(`Total: ${total} | Passed: ${passed} | Failed: ${failed}`)
  console.log('===============================================================')

  if (failed > 0) {
    process.exit(1)
  }
}

runTests().catch(err => {
  console.error('Unhandled test failure:', err)
  process.exit(1)
})
