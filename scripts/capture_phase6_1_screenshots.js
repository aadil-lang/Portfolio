const path = require('path')
const fs = require('fs')
const { spawn } = require('child_process')
const p = require('C:/Users/HP/AppData/Local/ms-playwright-go/1.57.0/package')

const outputDir = path.join(__dirname, '../audit_results/phase6_1_screenshots')
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

async function capture() {
  console.log('=== PHASE 6.1: CAPTURING DECISION RECORDS SCREENSHOTS ===')
  const nextCmd = process.platform === 'win32' ? 'cmd.exe' : 'npx'
  const nextArgs = process.platform === 'win32'
    ? ['/c', 'npx', 'next', 'start', '-p', '3011']
    : ['next', 'start', '-p', '3011']

  const server = spawn(nextCmd, nextArgs, {
    cwd: path.join(__dirname, '..'),
    env: { ...process.env, PORT: '3011' },
    stdio: 'ignore'
  })

  // wait for server
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch('http://localhost:3011/projects/design-automation')
      if (res.ok) break
    } catch (e) {}
    await new Promise(r => setTimeout(r, 500))
  }

  const browser = await p.chromium.launch()

  // 1. Desktop Viewport (1280x800) - EDA
  const desktopContext = await browser.newContext({ viewport: { width: 1280, height: 800 } })
  const desktopPage = await desktopContext.newPage()
  await desktopPage.goto('http://localhost:3011/projects/design-automation', { waitUntil: 'networkidle' })
  await desktopPage.locator('#decisions').scrollIntoViewIfNeeded()
  await desktopPage.screenshot({ path: path.join(outputDir, 'eda_decisions_desktop.png') })
  console.log('[SAVED] eda_decisions_desktop.png')

  // 2. Tablet Viewport (768x1024) - Solace AI
  const tabletContext = await browser.newContext({ viewport: { width: 768, height: 1024 } })
  const tabletPage = await tabletContext.newPage()
  await tabletPage.goto('http://localhost:3011/projects/solace-ai', { waitUntil: 'networkidle' })
  await tabletPage.locator('#decisions').scrollIntoViewIfNeeded()
  await tabletPage.screenshot({ path: path.join(outputDir, 'solace_decisions_tablet.png') })
  console.log('[SAVED] solace_decisions_tablet.png')

  // 3. Mobile Viewport (375x667) - Ask Aadil
  const mobileContext = await browser.newContext({ viewport: { width: 375, height: 667 } })
  const mobilePage = await mobileContext.newPage()
  await mobilePage.goto('http://localhost:3011/projects/ask-aadil', { waitUntil: 'networkidle' })
  await mobilePage.locator('#decisions').scrollIntoViewIfNeeded()
  await mobilePage.screenshot({ path: path.join(outputDir, 'ask_aadil_decisions_mobile.png') })
  console.log('[SAVED] ask_aadil_decisions_mobile.png')

  await browser.close()
  server.kill()
  console.log('Finished capturing Phase 6.1 screenshots successfully.')
}

capture().catch(err => {
  console.error('Screenshot capture failed:', err)
  process.exit(1)
})

