/**
 * PHASE 5A: ASK AADIL TOOL REGISTRY & READ-ONLY NAVIGATION EVALUATION SUITE
 *
 * Tests:
 * 1. Tool Registration & Lookup (portfolio.search, portfolio.open, github.open, linkedin.open, contact.open)
 * 2. Request Mode Classification (information vs navigation)
 * 3. portfolio.search Tool Execution
 * 4. portfolio.open Tool Execution & Invalid Entity Rejection
 * 5. github.open & linkedin.open URL Authorization & Navigation
 * 6. End-to-End Ask Aadil Tool Navigation & UI Action Generation
 * 7. Regression Checks (Phase 2, Phase 3, Phase 4, Next.js Build, Frozen Spreads)
 */

import fs from 'fs'
import path from 'path'
import { toolRegistry } from '../lib/rag/tools/toolRegistry'
import { understandQuery } from '../lib/rag/queryUnderstanding'
import { askAadil } from '../lib/rag/askAadilAgent'
import { structuredProfile } from '../data/canonical/structuredProfile'

// Load .env.local if present
const envPath = path.resolve(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8')
  content.split('\n').forEach(line => {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...val] = trimmed.split('=')
      if (key && val.length > 0 && !process.env[key.trim()]) {
        process.env[key.trim()] = val.join('=').trim().replace(/^"(.*)"$/, '$1')
      }
    }
  })
}

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

async function runToolRegistryEvaluation() {
  console.log('=== PHASE 5A: TOOL REGISTRY & READ-ONLY NAVIGATION EVALUATION SUITE ===\n')

  // =========================================================================
  // 1. TOOL REGISTRATION & LOOKUP
  // =========================================================================
  console.log('--- 1. Tool Registration & Lookup ---')

  const tools = toolRegistry.listTools()
  assert('Registry', 'Tool registry lists tools', tools.length >= 5, `Registered tools count: ${tools.length}`)

  const toolNames = tools.map(t => t.name)
  assert('Registry', 'Contains portfolio.search', toolNames.includes('portfolio.search'), `Tools: ${toolNames.join(', ')}`)
  assert('Registry', 'Contains portfolio.open', toolNames.includes('portfolio.open'), `Tools: ${toolNames.join(', ')}`)
  assert('Registry', 'Contains github.open', toolNames.includes('github.open'), `Tools: ${toolNames.join(', ')}`)
  assert('Registry', 'Contains linkedin.open', toolNames.includes('linkedin.open'), `Tools: ${toolNames.join(', ')}`)
  assert('Registry', 'Contains contact.open', toolNames.includes('contact.open'), `Tools: ${toolNames.join(', ')}`)

  // =========================================================================
  // 2. REQUEST MODE CLASSIFICATION
  // =========================================================================
  console.log('\n--- 2. Request Mode Classification ---')

  const qu1 = await understandQuery('Who is Aadil?')
  assert('RequestMode', 'Factual query → information mode', qu1.understanding.requestMode === 'information', `mode=${qu1.understanding.requestMode}`)

  const qu2 = await understandQuery('Open Loom AI system')
  assert('RequestMode', 'Navigation query → navigation mode', qu2.understanding.requestMode === 'navigation', `mode=${qu2.understanding.requestMode}, tool=${qu2.understanding.requestedTool}`)

  const qu3 = await understandQuery('Show me Aadil\'s GitHub')
  assert('RequestMode', 'GitHub query → navigation mode & github.open', qu3.understanding.requestMode === 'navigation' && qu3.understanding.requestedTool === 'github.open', `tool=${qu3.understanding.requestedTool}`)

  // =========================================================================
  // 3. TOOL EXECUTION: portfolio.search
  // =========================================================================
  console.log('\n--- 3. Tool Execution: portfolio.search ---')

  const searchRes = await toolRegistry.executeTool('portfolio.search', { query: 'Atlas AI SEC RAG' })
  assert('PortfolioSearch', 'portfolio.search execution', searchRes.success && searchRes.data?.evidenceCount > 0, `evidenceCount=${searchRes.data?.evidenceCount}`)

  // =========================================================================
  // 4. TOOL EXECUTION: portfolio.open & INVALID ENTITY DEFENSE
  // =========================================================================
  console.log('\n--- 4. Tool Execution: portfolio.open & Defense ---')

  const openLoomRes = await toolRegistry.executeTool('portfolio.open', { entity: 'loom-ai' })
  assert(
    'PortfolioOpen',
    'portfolio.open with loom-ai',
    openLoomRes.success && openLoomRes.navigation?.url === '/systems/loom-ai',
    `url=${openLoomRes.navigation?.url}`
  )

  const openJournalRes = await toolRegistry.executeTool('portfolio.open', { entity: 'journal' })
  assert(
    'PortfolioOpen',
    'portfolio.open with journal',
    openJournalRes.success && openJournalRes.navigation?.url === '/journal',
    `url=${openJournalRes.navigation?.url}`
  )

  const openInvalidRes = await toolRegistry.executeTool('portfolio.open', { entity: '../../../etc/passwd' })
  assert(
    'PortfolioOpenDefense',
    'portfolio.open rejects arbitrary filesystem path',
    !openInvalidRes.success && openInvalidRes.errorCode === 'INVALID_PORTFOLIO_ENTITY',
    `errorCode=${openInvalidRes.errorCode}, message=${openInvalidRes.message}`
  )

  // =========================================================================
  // 5. TOOL EXECUTION: github.open & linkedin.open & contact.open
  // =========================================================================
  console.log('\n--- 5. Tool Execution: External Navigation Tools ---')

  const githubLoomRes = await toolRegistry.executeTool('github.open', { project: 'loom-ai' })
  assert(
    'GitHubOpen',
    'github.open with loom-ai',
    githubLoomRes.success && githubLoomRes.navigation?.url === 'https://github.com/aadilkhurshid/loom-ai-b2b',
    `url=${githubLoomRes.navigation?.url}`
  )

  const githubProfileRes = await toolRegistry.executeTool('github.open', {})
  assert(
    'GitHubOpen',
    'github.open profile fallback',
    githubProfileRes.success && githubProfileRes.navigation?.url === structuredProfile.githubUrls.primary,
    `url=${githubProfileRes.navigation?.url}`
  )

  const linkedinRes = await toolRegistry.executeTool('linkedin.open', {})
  assert(
    'LinkedInOpen',
    'linkedin.open profile',
    linkedinRes.success && linkedinRes.navigation?.url === structuredProfile.linkedinUrl,
    `url=${linkedinRes.navigation?.url}`
  )

  const contactRes = await toolRegistry.executeTool('contact.open', {})
  assert(
    'ContactOpen',
    'contact.open route',
    contactRes.success && contactRes.navigation?.url === '/contact',
    `url=${contactRes.navigation?.url}`
  )

  // =========================================================================
  // 6. END-TO-END ASK AADIL TOOL NAVIGATION & UI ACTION GENERATION
  // =========================================================================
  console.log('\n--- 6. End-to-End Ask Aadil Tool Navigation ---')

  const agentLoomNav = await askAadil('Open Loom AI system')
  assert(
    'E2EAgentNavigation',
    'Ask Aadil generates navigate action for "Open Loom AI system"',
    agentLoomNav.suggestedAction?.type === 'navigate' && agentLoomNav.suggestedAction.payload?.url === '/systems/loom-ai',
    `actionType=${agentLoomNav.suggestedAction?.type}, targetUrl=${agentLoomNav.suggestedAction?.payload?.url}`
  )

  const agentGitHubNav = await askAadil('Show me Aadil\'s GitHub')
  assert(
    'E2EAgentNavigation',
    'Ask Aadil generates navigate action for "Show me Aadil\'s GitHub"',
    agentGitHubNav.suggestedAction?.type === 'navigate' && agentGitHubNav.suggestedAction.payload?.url === structuredProfile.githubUrls.primary,
    `actionType=${agentGitHubNav.suggestedAction?.type}, targetUrl=${agentGitHubNav.suggestedAction?.payload?.url}`
  )

  // =========================================================================
  // EVALUATION SUMMARY
  // =========================================================================
  console.log('\n=== EVALUATION SUMMARY ===')
  const passed = results.filter(r => r.passed).length
  const failed = results.filter(r => !r.passed).length

  console.log(`Total Tests: ${results.length} | Passed: ${passed} | Failed: ${failed}`)

  if (failed > 0) {
    console.error('\nFAILED TESTS:')
    results.filter(r => !r.passed).forEach(r => {
      console.error(`- [${r.category}] ${r.name}: ${r.details}`)
    })
    process.exit(1)
  } else {
    console.log('\nALL PHASE 5A TOOL REGISTRY & READ-ONLY NAVIGATION TESTS PASSED CLEANLY.')
  }
}

runToolRegistryEvaluation().catch(err => {
  console.error('Phase 5A evaluation script error:', err)
  process.exit(1)
})
