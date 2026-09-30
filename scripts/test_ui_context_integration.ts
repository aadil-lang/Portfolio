import { getAskAadilPageContext, resolveCanonicalProjectSlug } from '../lib/rag/askAadilPageContext'
import { askAadil } from '../lib/rag/askAadilAgent'

interface TestResult {
  category: string
  name: string
  passed: boolean
  details: string
}

const results: TestResult[] = []

function assert(category: string, name: string, condition: boolean, details: string) {
  results.push({ category, name, passed: condition, details })
  const symbol = condition ? '✓' : '✗'
  console.log(`${symbol} [${category}] ${name}: ${details}`)
}

async function runUIContextIntegrationSuite() {
  console.log('=== GLOBAL ASK AADIL UI CONTEXT INTEGRATION SUITE ===\n')

  // =========================================================================
  // 1. CANONICAL SLUG RESOLUTION & CONTEXT EXTRACTION
  // =========================================================================
  console.log('--- 1. Route Pathname to Canonical Context Extraction ---')

  // Homepage
  const ctxHome = getAskAadilPageContext('/')
  assert(
    'PageContext',
    '1. Homepage produces homepage context with no project slug',
    ctxHome.pageType === 'homepage' && !ctxHome.projectSlug && ctxHome.suggestedPrompts.length === 4,
    `pageType=${ctxHome.pageType}, promptsCount=${ctxHome.suggestedPrompts.length}`
  )

  // Loom AI Project Page
  const ctxLoom = getAskAadilPageContext('/projects/loom-ai')
  assert(
    'PageContext',
    '2. Loom project route produces loom-ai project context',
    ctxLoom.pageType === 'project' && ctxLoom.projectSlug === 'loom-ai' && ctxLoom.contextGreeting === "You're viewing Loom AI.",
    `projectSlug=${ctxLoom.projectSlug}, greeting="${ctxLoom.contextGreeting}"`
  )

  // Loom Alias Route (/systems/loom)
  const ctxLoomAlias = getAskAadilPageContext('/systems/loom')
  assert(
    'PageContext',
    '3. System route alias (/systems/loom) resolves to canonical loom-ai',
    ctxLoomAlias.pageType === 'project' && ctxLoomAlias.projectSlug === 'loom-ai',
    `resolvedSlug=${ctxLoomAlias.projectSlug}`
  )

  // Engineering Design Automation (EDA) Page
  const ctxEDA = getAskAadilPageContext('/projects/engineering-design-automation')
  assert(
    'PageContext',
    '4. EDA project route produces design-automation context',
    ctxEDA.pageType === 'project' && ctxEDA.projectSlug === 'design-automation' && Boolean(ctxEDA.suggestedPrompts.some(p => p.includes('pipeline'))),
    `projectSlug=${ctxEDA.projectSlug}`
  )

  // VM Copy Page
  const ctxVMCopy = getAskAadilPageContext('/projects/vm-copy')
  assert(
    'PageContext',
    '5. VM Copy route produces vm-copy context',
    ctxVMCopy.pageType === 'project' && ctxVMCopy.projectSlug === 'vm-copy' && Boolean(ctxVMCopy.suggestedPrompts.some(p => p.includes('evaluator'))),
    `projectSlug=${ctxVMCopy.projectSlug}`
  )

  // Journal Spread Page
  const ctxJournal = getAskAadilPageContext('/journal/spread-14')
  assert(
    'PageContext',
    '6. Journal route produces journal chapter context',
    ctxJournal.pageType === 'journal' && ctxJournal.chapterSlug === 'spread-14' && ctxJournal.contextGreeting === "You're viewing the Engineering Journal.",
    `chapterSlug=${ctxJournal.chapterSlug}`
  )

  // Timeline / Experience Page
  const ctxTimeline = getAskAadilPageContext('/experience')
  assert(
    'PageContext',
    '7. Experience route produces timeline context',
    ctxTimeline.pageType === 'timeline' && Boolean(ctxTimeline.contextGreeting?.includes('Timeline')),
    `title=${ctxTimeline.title}`
  )

  // Contact Page
  const ctxContact = getAskAadilPageContext('/contact')
  assert(
    'PageContext',
    '8. Contact route produces contact context',
    ctxContact.pageType === 'contact' && Boolean(ctxContact.suggestedPrompts.some(p => p.includes('contact'))),
    `pageType=${ctxContact.pageType}`
  )

  // Systems Index Page
  const ctxSystemsIndex = getAskAadilPageContext('/systems')
  assert(
    'PageContext',
    '9. Systems archive index route produces system index context',
    ctxSystemsIndex.pageType === 'system' && Boolean(ctxSystemsIndex.contextGreeting?.includes('Systems Archive')),
    `pageType=${ctxSystemsIndex.pageType}`
  )

  // =========================================================================
  // 2. CONTEXT ISOLATION & NAVIGATION DYNAMICS
  // =========================================================================
  console.log('\n--- 2. Context Isolation & Dynamic Navigation ---')

  const nav1 = getAskAadilPageContext('/projects/loom-ai')
  const nav2 = getAskAadilPageContext('/projects/design-automation')

  assert(
    'Isolation',
    '10. Navigating Loom → EDA updates context dynamically',
    nav1.projectSlug === 'loom-ai' && nav2.projectSlug === 'design-automation',
    `nav1=${nav1.projectSlug} → nav2=${nav2.projectSlug}`
  )

  assert(
    'Isolation',
    '11. Previous Loom context does not contaminate EDA context',
    !nav2.contextGreeting?.includes('Loom') && nav2.suggestedPrompts.every(p => !p.includes('Loom')),
    `edaGreeting="${nav2.contextGreeting}"`
  )

  // =========================================================================
  // 3. AGENT PIPELINE NON-BYPASS & GOVERNANCE INTEGRITY
  // =========================================================================
  console.log('\n--- 3. Agent Governance & Non-Bypass Integrity ---')

  const agentTurn = await askAadil('Tell me about Loom AI')
  assert(
    'Governance',
    '12. Agent query continues through Query Understanding & RAG pipeline',
    Boolean(agentTurn.answer && agentTurn.newState.retrievedSources.length > 0),
    `sourcesCount=${agentTurn.newState.retrievedSources.length}`
  )

  const sideEffectAttempt = await askAadil('email.send')
  assert(
    'Governance',
    '13. UI integration cannot bypass Phase 6 side-effect authorization gate',
    sideEffectAttempt.newState.confirmationState === 'idle' || sideEffectAttempt.newState.confirmationState === 'awaiting_confirmation',
    `confirmationState=${sideEffectAttempt.newState.confirmationState}`
  )

  // =========================================================================
  // SUMMARY
  // =========================================================================
  console.log('\n=== EVALUATION SUMMARY ===')
  const total = results.length
  const passed = results.filter(r => r.passed).length
  const failed = results.filter(r => !r.passed).length

  console.log(`Total Tests: ${total} | Passed: ${passed} | Failed: ${failed}`)

  if (failed > 0) {
    console.log('\nFAILED TESTS:')
    results.filter(r => !r.passed).forEach(r => {
      console.log(`- [${r.category}] ${r.name}: ${r.details}`)
    })
    process.exit(1)
  } else {
    console.log('\nALL GLOBAL ASK AADIL UI CONTEXT INTEGRATION TESTS PASSED CLEANLY.\n')
    process.exit(0)
  }
}

runUIContextIntegrationSuite().catch(err => {
  console.error('Unhandled error during UI context evaluation:', err)
  process.exit(1)
})
