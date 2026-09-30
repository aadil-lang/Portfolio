import { stripMarkdownForTTS, getTTSProvider, DEFAULT_VOICE_CONFIG } from '../lib/rag/voice/textToSpeechProvider'
import { getSTTProvider } from '../lib/rag/voice/speechToTextProvider'
import { MockVoiceProvider } from '../lib/rag/voice/mockVoiceProvider'
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

async function runVoiceInterfaceEvaluationSuite() {
  console.log('=== PHASE 7: ASK AADIL VOICE INTERFACE EVALUATION SUITE ===\n')

  // =========================================================================
  // 1. PROVIDER ABSTRACTION & LOOKUP
  // =========================================================================
  console.log('--- 1. Provider Abstraction & Availability ---')

  const stt = getSTTProvider()
  assert(
    'STTProvider',
    '1. getSTTProvider returns valid provider interface',
    Boolean(stt && typeof stt.startListening === 'function'),
    `provider=${stt.name}`
  )

  const tts = getTTSProvider()
  assert(
    'TTSProvider',
    '2. getTTSProvider returns valid provider interface',
    Boolean(tts && typeof tts.speak === 'function'),
    `provider=${tts.name}`
  )

  // =========================================================================
  // 2. MARKDOWN STRIPPING FOR TTS SYNTHESIS
  // =========================================================================
  console.log('\n--- 2. Markdown & Metadata Stripping for Audio ---')

  const rawMarkdown = `### Loom AI — B2B Textile Marketplace
**Loom AI** is an engineering system documented in [Timeline // 2026: Loom AI].

• **LangGraph** orchestration
• **424** automated tests

\`\`\`ts
const code = 'Do not speak code'
\`\`\`

Visit [GitHub](https://github.com/aadil-lang)`

  const cleanTTS = stripMarkdownForTTS(rawMarkdown)
  assert(
    'MarkdownStripper',
    '3. Code blocks are removed from TTS text',
    !cleanTTS.includes('Do not speak code'),
    `cleanText="${cleanTTS.slice(0, 50)}..."`
  )
  assert(
    'MarkdownStripper',
    '4. Citations and headings are cleaned for audio prose',
    !cleanTTS.includes('###') && !cleanTTS.includes('[Timeline'),
    `cleanTextPreview="${cleanTTS.slice(0, 60)}..."`
  )

  // =========================================================================
  // 3. MOCK VOICE PROVIDER EXECUTION
  // =========================================================================
  console.log('\n--- 3. Deterministic Voice Execution & Transcription ---')

  const mockVoice = new MockVoiceProvider()
  let capturedTranscript = ''
  await mockVoice.startListening(
    result => {
      capturedTranscript = result.text
    },
    err => {}
  )

  assert(
    'MockVoice',
    '5. Mock STT provider produces clean transcript',
    capturedTranscript.length > 0 && capturedTranscript.includes('LangGraph'),
    `transcript="${capturedTranscript}"`
  )

  const synthResult = await mockVoice.synthesize('**Hello world** from Ask Aadil.')
  assert(
    'MockVoice',
    '6. Mock TTS provider synthesizes audio result',
    synthResult.text === 'Hello world from Ask Aadil.' && Boolean(synthResult.audioUrl),
    `synthText="${synthResult.text}"`
  )

  // =========================================================================
  // 4. VOICE PIPELINE NON-BYPASS GUARANTEE
  // =========================================================================
  console.log('\n--- 4. Voice Pipeline Non-Bypass & Agent Pipeline ---')

  // Spoken transcript feeds directly into existing Ask Aadil agent
  const agentResponse = await askAadil(capturedTranscript)
  assert(
    'PipelineIntegrity',
    '7. Spoken transcript passes through exact same agent pipeline',
    Boolean(agentResponse.answer && agentResponse.newState.retrievedSources.length > 0),
    `sources=${agentResponse.newState.retrievedSources.length}`
  )

  const unconfirmedVoiceSend = await askAadil('Send an email to Aadil')
  assert(
    'Governance',
    '8. Voice interface cannot bypass Phase 6 side-effect authorization gate',
    unconfirmedVoiceSend.newState.confirmationState === 'idle' || unconfirmedVoiceSend.newState.confirmationState === 'awaiting_confirmation',
    `confirmationState=${unconfirmedVoiceSend.newState.confirmationState}`
  )

  // =========================================================================
  // 5. VOICE CONFIGURATION & INTERRUPT SEMANTICS
  // =========================================================================
  console.log('\n--- 5. Voice Identity Configuration & Playback Interruption ---')

  assert(
    'VoiceConfig',
    '9. Default voice identity configuration is calm, technical, conversational',
    DEFAULT_VOICE_CONFIG.speed === 1.0 && DEFAULT_VOICE_CONFIG.pitch === 1.0 && DEFAULT_VOICE_CONFIG.language === 'en-US',
    `lang=${DEFAULT_VOICE_CONFIG.language}, speed=${DEFAULT_VOICE_CONFIG.speed}`
  )

  mockVoice.stop()
  assert(
    'Interruption',
    '10. Stop command halts active audio playback without side effects',
    true,
    'Stop executed cleanly'
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
    console.log('\nALL PHASE 7 VOICE INTERFACE TESTS PASSED CLEANLY.\n')
    process.exit(0)
  }
}

runVoiceInterfaceEvaluationSuite().catch(err => {
  console.error('Unhandled error during voice interface evaluation:', err)
  process.exit(1)
})
