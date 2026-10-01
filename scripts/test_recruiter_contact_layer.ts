import { askAadil } from '../lib/rag/askAadilAgent'
import { resolveDeterministicAction, ACTION_REGISTRY } from '../lib/rag/actionRegistry'
import { resolveProjectEntity } from '../lib/rag/projectResolver'
import { structuredProfile } from '../data/canonical/structuredProfile'

interface TestResult {
  category: string
  name: string
  passed: boolean
  details: string
}

const results: TestResult[] = []

function assert(category: string, name: string, condition: boolean, details: string) {
  results.push({ category, name, passed: condition, details })
  const icon = condition ? '✓' : '✗'
  console.log(`${icon} [${category}] ${name}: ${details}`)
}

async function runRecruiterContactTests() {
  console.log('========================================================================')
  console.log('=== RECRUITER INTERACTION & CONTACT LAYER EVALUATION SUITE ===')
  console.log('========================================================================\n')

  // ---------------------------------------------------------------------------
  // 1. ACTION REGISTRY DETERMINISM & INTEGRITY
  // ---------------------------------------------------------------------------
  console.log('--- 1. Action Registry Determinism & Integrity ---')

  const linkedinAction = resolveDeterministicAction('OPEN_LINKEDIN')
  assert(
    'ActionRegistry',
    'LinkedIn action resolves to canonical URL',
    linkedinAction?.target === structuredProfile.linkedinUrl && linkedinAction.type === 'external',
    `target=${linkedinAction?.target}`
  )

  const resumeAction = resolveDeterministicAction('OPEN_RESUME')
  assert(
    'ActionRegistry',
    'Resume action resolves to canonical /resume.pdf',
    resumeAction?.target === '/resume.pdf' && resumeAction.type === 'external',
    `target=${resumeAction?.target}`
  )

  const timelineAction = resolveDeterministicAction('OPEN_TIMELINE')
  assert(
    'ActionRegistry',
    'Timeline action resolves to /timeline',
    timelineAction?.target === '/timeline' && timelineAction.type === 'navigate',
    `target=${timelineAction?.target}`
  )

  const unknownAction = resolveDeterministicAction('OPEN_FACEBOOK')
  assert(
    'ActionRegistry',
    'Unregistered action OPEN_FACEBOOK returns null (safe rejection)',
    unknownAction === null,
    'Returned null safely'
  )

  // ---------------------------------------------------------------------------
  // 2. PROJECT ENTITY RESOLUTION
  // ---------------------------------------------------------------------------
  console.log('\n--- 2. Project Entity Resolution ---')

  const resWorksheet = resolveProjectEntity('Show me the AI Worksheets project')
  assert(
    'ProjectResolver',
    'Natural phrasing "AI Worksheets" resolves to ai-worksheets slug',
    resWorksheet.resolvedSlug === 'ai-worksheets' && !resWorksheet.isAmbiguous,
    `slug=${resWorksheet.resolvedSlug}`
  )

  const resEda = resolveProjectEntity('Show me the Engineering Design Automation project')
  assert(
    'ProjectResolver',
    'Phrasing "Engineering Design Automation" resolves to design-automation slug',
    resEda.resolvedSlug === 'design-automation' && !resEda.isAmbiguous,
    `slug=${resEda.resolvedSlug}`
  )

  const resAmbiguous = resolveProjectEntity('Open his AI project')
  assert(
    'ProjectResolver',
    'Vague "Open his AI project" flags ambiguity',
    resAmbiguous.isAmbiguous === true && resAmbiguous.resolvedSlug === undefined,
    `isAmbiguous=${resAmbiguous.isAmbiguous}`
  )

  // ---------------------------------------------------------------------------
  // 3. INFORMATION VS ACTION INTENTS (Ask Aadil Agent)
  // ---------------------------------------------------------------------------
  console.log('\n--- 3. Information vs Action Intents ---')

  // A. Information (Grounded response, no navigation action executed)
  const infoTurn = await askAadil('Who is Aadil?')
  assert(
    'InformationIntent',
    '"Who is Aadil?" returns grounded response with zero auto-navigation',
    infoTurn.answer.includes('AI Systems Engineer') && (!infoTurn.suggestedAction || infoTurn.suggestedAction.type !== 'navigate'),
    `answerPreview="${infoTurn.answer.slice(0, 60)}..."`
  )

  const infoProject = await askAadil('What AI projects has he built?')
  assert(
    'InformationIntent',
    '"What AI projects has he built?" enumerates projects without forced navigation',
    infoProject.answer.includes('VM Copy') || infoProject.answer.includes('Wayground'),
    `answerPreview="${infoProject.answer.slice(0, 60)}..."`
  )

  // B. Project Navigation
  const navWorksheet = await askAadil('Show me the AI Worksheets project.')
  assert(
    'NavigationIntent',
    '"Show me the AI Worksheets project." returns OPEN_PROJECT action for ai-worksheets',
    navWorksheet.suggestedAction?.payload?.url === '/systems/ai-worksheets',
    `url=${navWorksheet.suggestedAction?.payload?.url}`
  )

  const navQuestionGen = await askAadil('Open the AI Question Generator.')
  assert(
    'NavigationIntent',
    '"Open the AI Question Generator." maps alias to /systems/vm-copy',
    navQuestionGen.suggestedAction?.payload?.url === '/systems/vm-copy',
    `url=${navQuestionGen.suggestedAction?.payload?.url}`
  )

  // C. Journey Navigation
  const navTimeline = await askAadil('Show me his career timeline.')
  assert(
    'JourneyNavigation',
    '"Show me his career timeline." navigates to /timeline',
    navTimeline.suggestedAction?.payload?.url === '/timeline',
    `url=${navTimeline.suggestedAction?.payload?.url}`
  )

  const navJournal = await askAadil('Open the Engineering Journal.')
  assert(
    'JourneyNavigation',
    '"Open the Engineering Journal." navigates to /journal',
    navJournal.suggestedAction?.payload?.url === '/journal',
    `url=${navJournal.suggestedAction?.payload?.url}`
  )

  // D. Professional External Links
  const navLinkedin = await askAadil("Open Aadil's LinkedIn.")
  assert(
    'ExternalLink',
    '"Open Aadil\'s LinkedIn." opens canonical LinkedIn URL',
    navLinkedin.suggestedAction?.payload?.url === structuredProfile.linkedinUrl,
    `url=${navLinkedin.suggestedAction?.payload?.url}`
  )

  const navResume = await askAadil('Open his resume.')
  assert(
    'ExternalLink',
    '"Open his resume." opens canonical /resume.pdf',
    navResume.suggestedAction?.payload?.url === '/resume.pdf',
    `url=${navResume.suggestedAction?.payload?.url}`
  )

  // E. Contact Navigation
  const navContact = await askAadil('I want to contact Aadil.')
  assert(
    'ContactNavigation',
    '"I want to contact Aadil." navigates to contact form',
    navContact.suggestedAction?.payload?.url === '/contact#contact-form',
    `url=${navContact.suggestedAction?.payload?.url}`
  )

  // F. Ambiguity Handling
  const ambiguousTurn = await askAadil('Open his AI project.')
  assert(
    'AmbiguityHandling',
    '"Open his AI project." asks user for clarification rather than guessing',
    ambiguousTurn.answer.includes('Which specific project') || ambiguousTurn.answer.includes('built several AI systems'),
    `answerPreview="${ambiguousTurn.answer.slice(0, 60)}..."`
  )

  // G. Unknown Destination Safeguard
  const unknownNavTurn = await askAadil('Open his Facebook.')
  assert(
    'UnknownDestination',
    '"Open his Facebook." returns safe explanation without inventing Facebook link',
    unknownNavTurn.answer.includes("don't have a link or page") && unknownNavTurn.suggestedAction === undefined,
    `answerPreview="${unknownNavTurn.answer.slice(0, 60)}..."`
  )

  // ---------------------------------------------------------------------------
  // SUMMARY REPORT
  // ---------------------------------------------------------------------------
  console.log('\n========================================================================')
  console.log('=== RECRUITER & CONTACT LAYER EVALUATION REPORT ===')
  console.log('========================================================================')
  
  const passedCount = results.filter(r => r.passed).length
  const totalCount = results.length
  
  console.log(`\nTOTAL: ${passedCount} / ${totalCount} tests passed`)
  if (passedCount === totalCount) {
    console.log('\nALL RECRUITER & CONTACT LAYER TESTS PASSED CLEANLY.')
  } else {
    console.error(`\n${totalCount - passedCount} TESTS FAILED.`)
    process.exit(1)
  }
}

runRecruiterContactTests().catch(err => {
  console.error('Test script crashed:', err)
  process.exit(1)
})
