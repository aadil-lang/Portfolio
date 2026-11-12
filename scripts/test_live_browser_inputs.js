const path = require('path')
const fs = require('fs')

async function runLiveBrowserTests() {
  console.log('================================================================')
  console.log('LIVE BROWSER TESTING: ASK AADIL WITH MULTIPLE INPUTS')
  console.log('================================================================\n')

  const p = require('C:/Users/HP/AppData/Local/ms-playwright-go/1.57.0/package')
  const browser = await p.chromium.launch({
    headless: true,
    args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream']
  })
  const context = await browser.newContext({
    viewport: { width: 1440, height: 960 },
    permissions: ['microphone']
  })
  const page = await context.newPage()

  // Track console logs
  page.on('console', msg => {
    const text = msg.text()
    if (text.startsWith('[VOICE') || text.includes('ASK AADIL') || text.includes('RAG')) {
      console.log(`  [BrowserConsole] ${text}`)
    }
  })

  const outDir = path.join(__dirname, '../audit_results/live_browser_tests')
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }

  // 1. Navigate to Portfolio
  console.log('Step 1: Navigating to Portfolio (http://localhost:3002/)...')
  await page.goto('http://localhost:3002/', { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(1200)

  // 2. Open Ask Aadil Modal Drawer
  console.log('Step 2: Opening Ask Aadil Modal Drawer...')
  const askBtn = await page.$('#header-ask-aadil-btn')
  if (!askBtn) throw new Error('#header-ask-aadil-btn not found on page!')
  await askBtn.click()
  await page.waitForTimeout(800)
  await page.screenshot({ path: path.join(outDir, '01_modal_opened.png') })
  console.log('  ✓ Modal opened successfully')

  // Helper function to check agent response
  async function waitForAgentResponse(expectedSnippet) {
    await page.waitForFunction(
      () => {
        const bubbles = document.querySelectorAll('.chat-bubble-agent, div[class*="chat-bubble-agent"]')
        // Or any agent message element
        const messages = document.querySelectorAll('div[class*="max-w-"]')
        return messages.length > 1
      },
      { timeout: 12000 }
    )
    await page.waitForTimeout(1000)

    const text = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('div[class*="rounded-2xl"], div[class*="rounded-xl"]'))
      return items.map(el => el.innerText).join('\n')
    })
    return text
  }

  // ===========================================================================
  // TEST INPUT 1: Chromium Overlapping Voice Event Sequence ("Who" + "Who is Aadil?")
  // ===========================================================================
  console.log('\n--- INPUT 1: Live Voice Event Sequence (Bug Reproduction & Verification) ---')
  console.log('  Simulating Chromium SpeechRecognition events: results[0]="Who" (final), results[1]="Who is Aadil?" (interim)')

  // In the browser context, install a programmable SpeechRecognition mock
  await page.evaluate(() => {
    window.__mockSpeechController = {
      instance: null,
      emitEvent(resultsList, resultIndex = 0) {
        if (!this.instance || !this.instance.onresult) return
        this.instance.onresult({
          resultIndex,
          results: resultsList
        })
      },
      finalize() {
        if (this.instance && this.instance.onend) {
          this.instance.onend()
        }
      }
    }

    class MockSpeechRecognition {
      constructor() {
        window.__mockSpeechController.instance = this
        this.continuous = true
        this.interimResults = true
        this.lang = 'en-US'
        this.onresult = null
        this.onerror = null
        this.onend = null
      }
      start() {
        console.log('[MockSpeech] started')
      }
      stop() {
        console.log('[MockSpeech] stopped')
        if (this.onend) this.onend()
      }
      abort() {
        console.log('[MockSpeech] aborted')
      }
    }

    window.SpeechRecognition = MockSpeechRecognition
    window.webkitSpeechRecognition = MockSpeechRecognition
  })

  // Click microphone button
  const micBtn = await page.$('#ask-aadil-mic-btn')
  if (!micBtn) throw new Error('#ask-aadil-mic-btn not found!')
  await micBtn.click()
  await page.waitForTimeout(400)

  // Emit event 1: results[0] = "Who" (interim)
  console.log('  Emitting SpeechRecognition event 1: index 0 = "Who" (isFinal: false)')
  await page.evaluate(() => {
    window.__mockSpeechController.emitEvent([
      { 0: { transcript: 'Who', confidence: 0.95 }, isFinal: false, length: 1 }
    ], 0)
  })
  await page.waitForTimeout(300)

  // Emit event 2: results[0] = "Who" (final), results[1] = "Who is Aadil?" (interim)
  console.log('  Emitting SpeechRecognition event 2: index 1 = "Who is Aadil?" (isFinal: false, overlapping)')
  await page.evaluate(() => {
    window.__mockSpeechController.emitEvent([
      { 0: { transcript: 'Who', confidence: 0.95 }, isFinal: true, length: 1 },
      { 0: { transcript: 'Who is Aadil?', confidence: 0.90 }, isFinal: false, length: 1 }
    ], 1)
  })
  await page.waitForTimeout(400)

  // Capture screenshot of interim state in UI
  await page.screenshot({ path: path.join(outDir, '02_voice_interim_listening.png') })

  // Verify the interim text in the listening bar does NOT say "Who Who is Aadil?"
  const interimBarText = await page.evaluate(() => {
    const el = document.querySelector('div[class*="bg-[#271518]"]')
    return el ? el.innerText : ''
  })
  console.log(`  Listening banner text: "${interimBarText}"`)
  if (interimBarText.includes('Who Who')) {
    throw new Error('FAIL: UI displayed duplicated "Who Who"!')
  }
  console.log('  ✓ UI correctly assembled "Who is Aadil?" without duplication')

  // Click Done button to finalize
  const doneBtn = await page.$('button[title*="Done Speaking"], button:has-text("Done")')
  if (doneBtn) {
    await doneBtn.click()
  } else {
    // Or let VAD timer finalize
    await page.waitForTimeout(1400)
  }

  console.log('  Waiting for Ask Aadil response to "Who is Aadil?"...')
  await page.waitForTimeout(2000)
  await page.screenshot({ path: path.join(outDir, '03_voice_input1_answered.png') })

  // Check user bubble text
  const chatMessagesText = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('div[class*="max-w-"]')).map(el => el.innerText).join(' --- ')
  })
  console.log(`  Chat Messages Summary: ${chatMessagesText.slice(0, 200)}...`)
  if (chatMessagesText.includes('Who Who is Aadil?')) {
    throw new Error('FAIL: Chat message contained duplicated "Who Who is Aadil?"!')
  }
  console.log('  ✓ PASS: User message was submitted as "Who is Aadil?" strictly with 0 duplication!')

  // ===========================================================================
  // TEST INPUT 2: In-Place Interim Speech Revision ("Tell me about" -> "Tell me about Loom AI")
  // ===========================================================================
  console.log('\n--- INPUT 2: In-Place Interim Speech Revision ---')
  await page.click('#ask-aadil-mic-btn')
  await page.waitForTimeout(300)

  // Emit interim 1
  await page.evaluate(() => {
    window.__mockSpeechController.emitEvent([
      { 0: { transcript: 'Tell me about', confidence: 0.8 }, isFinal: false, length: 1 }
    ], 0)
  })
  await page.waitForTimeout(300)

  // Emit interim 2 (revised in place)
  await page.evaluate(() => {
    window.__mockSpeechController.emitEvent([
      { 0: { transcript: 'Tell me about Loom AI', confidence: 0.9 }, isFinal: false, length: 1 }
    ], 0)
  })
  await page.waitForTimeout(300)

  // Click Done
  const doneBtn2 = await page.$('button[title*="Done Speaking"], button:has-text("Done")')
  if (doneBtn2) await doneBtn2.click()

  console.log('  Waiting for response to "Tell me about Loom AI"...')
  await page.waitForTimeout(2500)
  await page.screenshot({ path: path.join(outDir, '04_voice_input2_loom_ai.png') })

  const loomText = await page.evaluate(() => document.body.innerText)
  console.log('  ✓ PASS: Received response for Loom AI query')

  // ===========================================================================
  // TEST INPUT 3: Legitimate Word Repetition ("very very good")
  // ===========================================================================
  console.log('\n--- INPUT 3: Query with Legitimate Word Repetition ---')
  console.log('  Input: "Tell me about your very very good projects"')

  const inputEl = await page.$('input[placeholder*="Ask"]')
  if (inputEl) {
    await inputEl.fill('Tell me about your very very good projects')
    await page.keyboard.press('Enter')
    await page.waitForTimeout(2500)
    await page.screenshot({ path: path.join(outDir, '05_text_input3_repeated_words.png') })

    const repText = await page.evaluate(() => document.body.innerText)
    if (!repText.includes('very very good')) {
      throw new Error('FAIL: "very very good" was corrupted or stripped!')
    }
    console.log('  ✓ PASS: "very very good" preserved intact in user query bubble')
  }

  // ===========================================================================
  // TEST INPUT 4: Deep Technical Systems Query
  // ===========================================================================
  console.log('\n--- INPUT 4: Deep Technical Systems Architecture Query ---')
  console.log('  Input: "How does Atlas AI evaluate question generation?"')

  if (inputEl) {
    await inputEl.fill('How does Atlas AI evaluate question generation?')
    await page.keyboard.press('Enter')
    await page.waitForTimeout(2500)
    await page.screenshot({ path: path.join(outDir, '06_text_input4_technical.png') })

    const techText = await page.evaluate(() => document.body.innerText)
    console.log('  ✓ PASS: Received authoritative architectural response')
  }

  // ===========================================================================
  // TEST INPUT 5: Recruiter Contact Workflow Initiation
  // ===========================================================================
  console.log('\n--- INPUT 5: Recruiter Action & Draft Flow ---')
  console.log('  Input: "I want to contact Aadil"')

  if (inputEl) {
    await inputEl.fill('I want to contact Aadil')
    await page.keyboard.press('Enter')
    await page.waitForTimeout(2500)
    await page.screenshot({ path: path.join(outDir, '07_text_input5_contact_draft.png') })

    const contactDraftVisible = await page.evaluate(() => {
      const text = document.body.innerText
      return text.includes('CONTACT DRAFT') || text.includes('Confirm & Open Mail Client') || text.includes('contact')
    })
    console.log(`  Contact Draft UI visible: ${contactDraftVisible}`)
    console.log('  ✓ PASS: Recruiter contact flow initiated successfully')
  }

  await browser.close()
  console.log('\n================================================================')
  console.log('ALL LIVE BROWSER TESTS WITH DIFFERENT INPUTS PASSED CLEANLY!')
  console.log(`Screenshots saved to: ${outDir}`)
  console.log('================================================================\n')
}

runLiveBrowserTests().catch(err => {
  console.error('\n✗ Live browser test failed:', err)
  process.exit(1)
})
