/**
 * PHASE 3: QUERY UNDERSTANDING EVALUATION SUITE
 *
 * Tests:
 * 1. Semantic equivalence — different phrasings → same intent/project
 * 2. Entity extraction — projects, technologies, employers resolve correctly
 * 3. Follow-ups — multi-turn contextual resolution
 * 4. Quantitative queries — correct project/metric identification
 * 5. Code queries — route toward CodeEvidence
 * 6. Ownership queries — retrieve authoritative ownership evidence
 * 7. Multi-source questions — request multiple evidence layers
 * 8. Ambiguity — clarification when context is insufficient
 * 9. LLM failure — deterministic fallback verification
 * 10. Phase 2 regression — existing retrieval still works
 */

import {
  understandQuery,
  toRoutingDecision,
  extractEntitiesDeterministic,
  resolveFollowUp,
  extractConversationContext,
  QueryUnderstanding
} from '../lib/rag/queryUnderstanding'
import { classifyAndRoute } from '../lib/rag/intentRouter'
import { retrieveHybrid } from '../lib/rag/hybridRetriever'
import { queryQuantitativeRegistry, queryCodeEvidence } from '../lib/rag/knowledgeIndex'
import { AgentConversationState, QueryIntent } from '../types/rag'

interface TestResult {
  name: string
  category: string
  passed: boolean
  details: string
  failureType?: string
}

const results: TestResult[] = []

function assert(category: string, name: string, condition: boolean, details: string, failureType?: string) {
  results.push({ name, category, passed: condition, details, failureType })
  const symbol = condition ? '✓' : '✗'
  console.log(`${symbol} [${category}] ${name}: ${details}`)
}

function makeState(overrides: Partial<AgentConversationState> = {}): AgentConversationState {
  return {
    currentIntent: 'unknown',
    retrievedSources: [],
    retrievedLayers: [],
    visitorContext: {},
    selectedChannel: 'email',
    confirmationState: 'idle',
    executionResult: { status: 'idle', emailClientOpened: false, emailSentStatus: 'unknown' },
    turnCount: 1,
    ...overrides
  }
}

async function runTests() {
  console.log('=== PHASE 3: QUERY UNDERSTANDING EVALUATION SUITE ===\n')

  // =========================================================================
  // 1. DETERMINISTIC ENTITY EXTRACTION
  // =========================================================================
  console.log('--- 1. Deterministic Entity Extraction ---')

  const e1 = extractEntitiesDeterministic('Tell me about Loom')
  assert('Entity', 'Loom → loom-ai', e1.project === 'loom-ai', `project=${e1.project}`)

  const e2 = extractEntitiesDeterministic('How does the engineering design system work?')
  assert('Entity', 'engineering design system → design-automation', e2.project === 'design-automation', `project=${e2.project}`)

  const e3 = extractEntitiesDeterministic('What about the VM Copy evaluator?')
  assert('Entity', 'VM Copy → vm-copy', e3.project === 'vm-copy', `project=${e3.project}`)

  const e4 = extractEntitiesDeterministic('Which projects use LangGraph?')
  assert('Entity', 'LangGraph detected', e4.technologies.includes('langgraph'), `techs=${e4.technologies.join(',')}`)

  const e5 = extractEntitiesDeterministic('What did Aadil contribute to the item bank?')
  assert('Entity', 'item bank → math-item-bank', e5.project === 'math-item-bank', `project=${e5.project}`)

  const e6 = extractEntitiesDeterministic('Tell me about Atlas')
  assert('Entity', 'Atlas → atlas-ai', e6.project === 'atlas-ai', `project=${e6.project}`)

  const e7 = extractEntitiesDeterministic('How does the QA system work?')
  assert('Entity', 'QA system → ai-reliability', e7.project === 'ai-reliability', `project=${e7.project}`)

  const e8 = extractEntitiesDeterministic('What does Wayground do?')
  assert('Entity', 'Wayground detected', e8.entities.includes('Wayground'), `entities=${e8.entities.join(',')}`)

  // =========================================================================
  // 2. FOLLOW-UP RESOLUTION
  // =========================================================================
  console.log('\n--- 2. Follow-up Resolution ---')

  const ctx1 = { activeProject: 'loom-ai', turnCount: 2 }
  const f1 = resolveFollowUp('Why LangGraph?', ctx1)
  assert('FollowUp', '"Why LangGraph?" with active loom → loom-ai',
    f1.resolved && f1.project === 'loom-ai',
    `resolved=${f1.resolved}, project=${f1.project}`)

  const ctx2 = { activeProject: 'design-automation', turnCount: 3 }
  const f2 = resolveFollowUp('How many tests does it have?', ctx2)
  assert('FollowUp', '"it" with active EDA → design-automation',
    f2.resolved && f2.project === 'design-automation',
    `resolved=${f2.resolved}, project=${f2.project}`)

  const ctx3 = { activeProject: 'ai-worksheets', turnCount: 2 }
  const f3 = resolveFollowUp('Why was TikZ used?', ctx3)
  assert('FollowUp', '"Why was TikZ used?" with active ai-worksheets',
    f3.resolved && f3.project === 'ai-worksheets',
    `resolved=${f3.resolved}, project=${f3.project}`)

  const f4 = resolveFollowUp('What about VoyageMath?', { turnCount: 3, activeProject: 'vm-copy' })
  assert('FollowUp', '"What about VoyageMath?" resolves entity',
    f4.resolved === true,
    `resolved=${f4.resolved}, project=${f4.project}`)

  // No context — should not resolve pronouns
  const f5 = resolveFollowUp('How does it work?', { turnCount: 1 })
  assert('FollowUp', 'No active project → not resolved',
    f5.resolved === false,
    `resolved=${f5.resolved}`)

  // =========================================================================
  // 3. DETERMINISTIC FALLBACK (query understanding without LLM)
  // =========================================================================
  console.log('\n--- 3. Deterministic Fallback (no LLM) ---')

  // Save and clear env vars to force deterministic mode
  const savedGemini = process.env.GEMINI_API_KEY
  const savedOpenAI = process.env.OPENAI_API_KEY
  const savedOllama = process.env.OLLAMA_HOST
  delete process.env.GEMINI_API_KEY
  delete process.env.OPENAI_API_KEY
  delete process.env.OLLAMA_HOST
  delete process.env.OLLAMA_BASE_URL

  const { understanding: u1, trace: t1 } = await understandQuery('Who is Aadil?')
  assert('Fallback', '"Who is Aadil?" → identity',
    u1.intent === 'identity' && u1.source === 'deterministic_fallback',
    `intent=${u1.intent}, source=${u1.source}`)

  const { understanding: u2 } = await understandQuery("What is Aadil's experience?")
  assert('Fallback', '"experience" → professional',
    u2.intent === 'professional' && u2.source === 'deterministic_fallback',
    `intent=${u2.intent}`)

  const { understanding: u3 } = await understandQuery('Tell me about EDA project')
  assert('Fallback', '"EDA project" → project_overview + design-automation',
    u3.project === 'design-automation',
    `intent=${u3.intent}, project=${u3.project}`)

  const { understanding: u4 } = await understandQuery('How did Aadil move from math to AI?')
  assert('Fallback', 'Career transition → narrative',
    u4.intent === 'narrative',
    `intent=${u4.intent}`)

  const { understanding: u5 } = await understandQuery('How many tests does EDA have?')
  assert('Fallback', 'EDA test count → technical + design-automation',
    u5.intent === 'technical' && u5.project === 'design-automation',
    `intent=${u5.intent}, project=${u5.project}`)

  // =========================================================================
  // 4. FOLLOW-UP WITH QUERY UNDERSTANDING
  // =========================================================================
  console.log('\n--- 4. Follow-up with Query Understanding ---')

  const loomState = makeState({ activeProject: 'loom-ai', activeEntity: 'loom-ai', currentIntent: 'project_overview', turnCount: 2 })
  const { understanding: u6 } = await understandQuery('Why LangGraph?', loomState)
  assert('FollowUpQU', '"Why LangGraph?" with loom context',
    u6.project === 'loom-ai',
    `project=${u6.project}, intent=${u6.intent}`)

  const edaState = makeState({ activeProject: 'design-automation', turnCount: 3 })
  const { understanding: u7 } = await understandQuery('How many tests does it have?', edaState)
  assert('FollowUpQU', '"it" with EDA context → design-automation',
    u7.project === 'design-automation',
    `project=${u7.project}, intent=${u7.intent}`)

  // =========================================================================
  // 5. toRoutingDecision CONVERSION
  // =========================================================================
  console.log('\n--- 5. QueryUnderstanding → RoutingDecision ---')

  const rd1 = toRoutingDecision(u1)
  assert('Routing', 'Identity QU → RoutingDecision',
    rd1.intent === 'identity' && rd1.rule !== undefined,
    `intent=${rd1.intent}, hasRule=${!!rd1.rule}`)

  const rd3 = toRoutingDecision(u3)
  assert('Routing', 'EDA QU → RoutingDecision with project',
    rd3.detectedProjectSlug === 'design-automation',
    `project=${rd3.detectedProjectSlug}`)

  // =========================================================================
  // 6. END-TO-END: QU → Retrieval Pipeline
  // =========================================================================
  console.log('\n--- 6. End-to-End QU → Retrieval ---')

  const { understanding: quEDA } = await understandQuery('How many tests does EDA have?')
  const edaDecision = toRoutingDecision(quEDA)
  const edaRetrieval = retrieveHybrid(quEDA.normalizedRetrievalQuery, edaDecision)
  const hasEdaQuant = edaRetrieval.evidenceItems.some(e =>
    e.sourceType === 'quantitative_claim' || (e.quantitativeData && String(e.quantitativeData.metricValue) === '424')
  )
  assert('E2E', 'EDA quantitative via QU pipeline',
    hasEdaQuant,
    `evidence items=${edaRetrieval.evidenceItems.length}, quantitative=${hasEdaQuant}`)

  const { understanding: quCode } = await understandQuery('What file contains the VM Copy evaluator?')
  const codeDecision = toRoutingDecision(quCode)
  const codeRetrieval = retrieveHybrid(quCode.normalizedRetrievalQuery, codeDecision)
  const hasCodeEv = codeRetrieval.evidenceItems.some(e =>
    e.sourceType === 'code_evidence' || (e.sourcePath || '').includes('eval-layer.ts')
  )
  assert('E2E', 'VM Copy code evidence via QU pipeline',
    hasCodeEv,
    `evidence items=${codeRetrieval.evidenceItems.length}, codeEvidence=${hasCodeEv}`)

  const { understanding: quCareer } = await understandQuery('How did Aadil go from mathematics content to AI systems?')
  const careerDecision = toRoutingDecision(quCareer)
  const careerRetrieval = retrieveHybrid(quCareer.normalizedRetrievalQuery, careerDecision)
  const hasCareerStages = careerRetrieval.evidenceItems.some(e => e.id?.includes('progression-stage'))
  assert('E2E', 'Career evolution multi-stage via QU pipeline',
    hasCareerStages,
    `stages=${hasCareerStages}, items=${careerRetrieval.evidenceItems.length}`)

  const { understanding: quVM } = await understandQuery('Did Aadil build VoyageMath?')
  const vmDecision = toRoutingDecision(quVM)
  const vmRetrieval = retrieveHybrid(quVM.normalizedRetrievalQuery, vmDecision)
  const hasVMOwnership = vmRetrieval.evidenceItems.some(e =>
    e.ownershipClassification === 'TEAM_OWNERSHIP'
  )
  assert('E2E', 'VoyageMath ownership boundary via QU pipeline',
    hasVMOwnership,
    `teamOwnership=${hasVMOwnership}`)

  // =========================================================================
  // 7. PHASE 2 REGRESSION — existing retrieval tests
  // =========================================================================
  console.log('\n--- 7. Phase 2 Regression ---')

  const directCode = queryCodeEvidence('VM Copy evaluator lib/eval-layer.ts')
  const vmCode = directCode.find(c =>
    (c.metadata.sourcePath || '').includes('eval-layer.ts')
  )
  assert('P2Regression', 'Direct CodeEvidence still works',
    !!vmCode && vmCode.metadata.sourcePath === 'lib/eval-layer.ts',
    `path=${vmCode?.metadata.sourcePath}`)

  const edaClaims = queryQuantitativeRegistry('How many tests does EDA have?', 'design-automation')
  const edaClaim = edaClaims.find(c => String(c.metricValue) === '424')
  assert('P2Regression', 'Direct quantitative registry still works',
    !!edaClaim,
    `claim="${edaClaim?.claim}"`)

  const atlasClaims = queryQuantitativeRegistry('How many tests does Atlas have?', 'atlas-ai')
  const atlasClaim = atlasClaims.find(c => String(c.metricValue) === '178')
  assert('P2Regression', 'Atlas quantitative still works',
    !!atlasClaim,
    `claim="${atlasClaim?.claim}"`)

  // =========================================================================
  // 8. OBSERVABILITY TRACE
  // =========================================================================
  console.log('\n--- 8. Observability Trace ---')

  assert('Observability', 'Trace contains originalQuestion',
    t1.originalQuestion === 'Who is Aadil?',
    `original="${t1.originalQuestion}"`)

  assert('Observability', 'Trace contains failureType',
    t1.failureType === 'QUERY_UNDERSTANDING_SUCCESS',
    `failureType=${t1.failureType}`)

  assert('Observability', 'Trace contains source',
    t1.queryUnderstanding.source === 'deterministic_fallback',
    `source=${t1.queryUnderstanding.source}`)

  // =========================================================================
  // 9. SEMANTIC EQUIVALENCE (different phrasings → same intent)
  // =========================================================================
  console.log('\n--- 9. Semantic Equivalence ---')

  const identityPhrases = [
    'Who is Aadil?',
    'Tell me about Aadil',
    'Who is Mohemmed Aadil?'
  ]
  for (const phrase of identityPhrases) {
    const { understanding: u } = await understandQuery(phrase)
    assert('SemanticEq', `"${phrase}" → identity-like`,
      u.intent === 'identity' || u.intent === 'about' || u.intent === 'overview',
      `intent=${u.intent}`)
  }

  const careerPhrases = [
    'How did Aadil get into AI?',
    'How did he move from math to AI?',
    'What is the progression of his career?'
  ]
  for (const phrase of careerPhrases) {
    const { understanding: u } = await understandQuery(phrase)
    assert('SemanticEq', `"${phrase}" → narrative/professional`,
      u.intent === 'narrative' || u.intent === 'about' || u.intent === 'professional',
      `intent=${u.intent}`)
  }

  // Restore env vars
  if (savedGemini) process.env.GEMINI_API_KEY = savedGemini
  if (savedOpenAI) process.env.OPENAI_API_KEY = savedOpenAI
  if (savedOllama) process.env.OLLAMA_HOST = savedOllama

  // =========================================================================
  // SUMMARY
  // =========================================================================
  console.log('\n=== TEST SUMMARY ===')
  const total = results.length
  const passed = results.filter(r => r.passed).length
  const failed = total - passed

  // Group by category
  const categories = new Map<string, { total: number; passed: number }>()
  for (const r of results) {
    const cat = categories.get(r.category) || { total: 0, passed: 0 }
    cat.total++
    if (r.passed) cat.passed++
    categories.set(r.category, cat)
  }

  console.log('\nBy category:')
  for (const [cat, stats] of categories) {
    console.log(`  ${stats.passed === stats.total ? '✓' : '✗'} ${cat}: ${stats.passed}/${stats.total}`)
  }

  console.log(`\nTotal: ${total} | Passed: ${passed} | Failed: ${failed}`)

  if (failed > 0) {
    console.log('\nFailed tests:')
    results.filter(r => !r.passed).forEach(r =>
      console.log(`  ✗ [${r.category}] ${r.name}: ${r.details}`)
    )
    process.exit(1)
  } else {
    console.log('\nALL PHASE 3 QUERY UNDERSTANDING TESTS PASSED.')
  }
}

runTests().catch(err => {
  console.error('Test execution error:', err)
  process.exit(1)
})
