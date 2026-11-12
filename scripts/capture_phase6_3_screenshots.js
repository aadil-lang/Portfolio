const path = require('path')
const fs = require('fs')
const { spawn } = require('child_process')
const p = require('C:/Users/HP/AppData/Local/ms-playwright-go/1.57.0/package')

const outputDir = path.join(__dirname, '../audit_results/phase6_3_screenshots')
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

const PORT = 3016

async function capture() {
  console.log('=== PHASE 6.3: CAPTURING ARCHITECTURE EXPLORER SCREENSHOTS ===')
  const nextCmd = process.platform === 'win32' ? 'cmd.exe' : 'npx'
  const nextArgs = process.platform === 'win32'
    ? ['/c', 'npx', 'next', 'start', '-p', String(PORT)]
    : ['next', 'start', '-p', String(PORT)]

  const server = spawn(nextCmd, nextArgs, {
    cwd: path.join(__dirname, '..'),
    env: { ...process.env, PORT: String(PORT) },
    stdio: 'ignore'
  })

  // wait for server
  console.log(`Waiting for Next.js production server on port ${PORT}...`)
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`http://localhost:${PORT}/architecture`)
      if (res.ok) {
        console.log(`Server is ready on port ${PORT}`)
        break
      }
    } catch (e) {}
    await new Promise(r => setTimeout(r, 500))
  }

  const browser = await p.chromium.launch()

  // 1. Desktop Viewport (1280x800) - Ask Aadil Overview & Inspector
  const desktopContext = await browser.newContext({ viewport: { width: 1280, height: 800 } })
  const desktopPage = await desktopContext.newPage()
  await desktopPage.goto(`http://localhost:${PORT}/architecture`, { waitUntil: 'networkidle' })
  await desktopPage.screenshot({ path: path.join(outputDir, 'architecture_explorer_desktop.png') })
  console.log('[SAVED] architecture_explorer_desktop.png')

  // 2. Desktop Flow Mode (Click "Execution Flow")
  const flowBtn = desktopPage.locator('button:has-text("Execution Flow")')
  if (await flowBtn.count() > 0) {
    await flowBtn.click()
    await desktopPage.waitForTimeout(500)
    await desktopPage.screenshot({ path: path.join(outputDir, 'architecture_flow_desktop.png') })
    console.log('[SAVED] architecture_flow_desktop.png')
  }

  // 3. Desktop Failure Boundaries Mode (Click "Failure Gates")
  const failureBtn = desktopPage.locator('button:has-text("Failure Gates")')
  if (await failureBtn.count() > 0) {
    await failureBtn.click()
    await desktopPage.waitForTimeout(500)
    await desktopPage.screenshot({ path: path.join(outputDir, 'architecture_failure_desktop.png') })
    console.log('[SAVED] architecture_failure_desktop.png')
  }

  // 4. Desktop AI Reliability Platform
  const relSystemBtn = desktopPage.locator('button:has-text("AI Application Reliability")')
  if (await relSystemBtn.count() > 0) {
    await relSystemBtn.click()
    const overviewBtn = desktopPage.locator('button:has-text("Overview")')
    if (await overviewBtn.count() > 0) await overviewBtn.click()
    await desktopPage.waitForTimeout(500)
    await desktopPage.screenshot({ path: path.join(outputDir, 'architecture_reliability_desktop.png') })
    console.log('[SAVED] architecture_reliability_desktop.png')
  }

  // 5. Tablet Viewport (768x1024)
  const tabletContext = await browser.newContext({ viewport: { width: 768, height: 1024 } })
  const tabletPage = await tabletContext.newPage()
  await tabletPage.goto(`http://localhost:${PORT}/architecture`, { waitUntil: 'networkidle' })
  await tabletPage.screenshot({ path: path.join(outputDir, 'architecture_explorer_tablet.png') })
  console.log('[SAVED] architecture_explorer_tablet.png')

  // 6. Mobile Viewport (375x667)
  const mobileContext = await browser.newContext({ viewport: { width: 375, height: 667 } })
  const mobilePage = await mobileContext.newPage()
  await mobilePage.goto(`http://localhost:${PORT}/architecture`, { waitUntil: 'networkidle' })
  await mobilePage.screenshot({ path: path.join(outputDir, 'architecture_explorer_mobile.png') })
  console.log('[SAVED] architecture_explorer_mobile.png')

  await browser.close()
  server.kill()
  console.log('All screenshots captured and server terminated successfully.')
}

capture().catch(err => {
  console.error('Capture failed:', err)
  process.exit(1)
})

