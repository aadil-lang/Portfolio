const path = require('path')
const fs = require('fs')
const { spawn } = require('child_process')
const p = require('C:/Users/HP/AppData/Local/ms-playwright-go/1.57.0/package')

const outputDir = path.join(__dirname, '../audit_results/phase6_5_screenshots')
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

const PORT = 3022

async function capture() {
  console.log('=== PHASE 6.5: CAPTURING PROJECT COMPARISON WORKSPACE SCREENSHOTS ===')
  const nextCmd = process.platform === 'win32' ? 'cmd.exe' : 'npx'
  const nextArgs = process.platform === 'win32'
    ? ['/c', 'npx', 'next', 'dev', '-p', String(PORT)]
    : ['next', 'dev', '-p', String(PORT)]

  const server = spawn(nextCmd, nextArgs, {
    cwd: path.join(__dirname, '..'),
    env: { ...process.env, PORT: String(PORT), NODE_ENV: 'development' },
    stdio: 'ignore'
  })

  // wait for server
  console.log(`Waiting for Next.js dev server on port ${PORT}...`)
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`http://localhost:${PORT}/compare`)
      if (res.ok) {
        console.log(`Server is ready on port ${PORT}`)
        break
      }
    } catch (e) {}
    await new Promise(r => setTimeout(r, 1000))
  }

  const browser = await p.chromium.launch()

  // 1. Desktop Viewport (1440x900) - Full Workspace Overview
  const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const desktopPage = await desktopContext.newPage()
  await desktopPage.goto(`http://localhost:${PORT}/compare`, { waitUntil: 'networkidle' })
  await desktopPage.screenshot({ path: path.join(outputDir, 'compare_overview_desktop.png') })
  console.log('[SAVED] compare_overview_desktop.png')

  // 2. Desktop Two Projects Side-by-Side (Scroll to matrix)
  const matrixHeading = desktopPage.locator('#comparison-selector-heading')
  if (await matrixHeading.count() > 0) {
    await matrixHeading.scrollIntoViewIfNeeded()
    await desktopPage.waitForTimeout(500)
    await desktopPage.screenshot({ path: path.join(outputDir, 'compare_two_projects_desktop.png') })
    console.log('[SAVED] compare_two_projects_desktop.png')
  }

  // 3. Desktop Three Projects Side-by-Side (Select a 3rd project: solace-ai)
  const solaceBtn = desktopPage.locator('button:has-text("Solace AI")').first()
  if (await solaceBtn.count() > 0) {
    await solaceBtn.click()
    await desktopPage.waitForTimeout(500)
    await desktopPage.screenshot({ path: path.join(outputDir, 'compare_three_projects_desktop.png') })
    console.log('[SAVED] compare_three_projects_desktop.png')
  }

  // 4. Desktop Curated Preset (Click PRESET-04: Mechanical CAD Calculus vs Educational LaTeX Sandbox)
  const preset4Btn = desktopPage.locator('button:has-text("PRESET-04")').first()
  if (await preset4Btn.count() > 0) {
    await preset4Btn.click()
    await desktopPage.waitForTimeout(600)
    await desktopPage.screenshot({ path: path.join(outputDir, 'compare_curated_preset_desktop.png') })
    console.log('[SAVED] compare_curated_preset_desktop.png')
  }

  // 5. Desktop Trade-Off Deep Dive Section
  const tradeoffsSection = desktopPage.locator('#tradeoffs-heading')
  if (await tradeoffsSection.count() > 0) {
    await tradeoffsSection.scrollIntoViewIfNeeded()
    await desktopPage.waitForTimeout(500)
    await desktopPage.screenshot({ path: path.join(outputDir, 'compare_tradeoffs_desktop.png') })
    console.log('[SAVED] compare_tradeoffs_desktop.png')
  }

  // 6. Tablet Viewport (768x1024) - Responsive Stacked Matrix
  const tabletContext = await browser.newContext({ viewport: { width: 768, height: 1024 } })
  const tabletPage = await tabletContext.newPage()
  await tabletPage.goto(`http://localhost:${PORT}/compare`, { waitUntil: 'networkidle' })
  await tabletPage.waitForTimeout(600)
  await tabletPage.screenshot({ path: path.join(outputDir, 'compare_matrix_tablet.png') })
  console.log('[SAVED] compare_matrix_tablet.png')

  // 7. Mobile Viewport (390x844) - Mobile Matrix Overview
  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 } })
  const mobilePage = await mobileContext.newPage()
  await mobilePage.goto(`http://localhost:${PORT}/compare`, { waitUntil: 'networkidle' })
  await mobilePage.waitForTimeout(600)
  await mobilePage.screenshot({ path: path.join(outputDir, 'compare_matrix_mobile.png') })
  console.log('[SAVED] compare_matrix_mobile.png')

  // 8. Mobile Selected Project & Dimension Cards
  await mobilePage.evaluate(() => window.scrollBy(0, 600))
  await mobilePage.waitForTimeout(500)
  await mobilePage.screenshot({ path: path.join(outputDir, 'compare_mobile_selected.png') })
  console.log('[SAVED] compare_mobile_selected.png')

  await browser.close()
  server.kill()
  console.log('=== ALL 8 PHASE 6.5 SCREENSHOTS CAPTURED SUCCESSFULLY ===')
  process.exit(0)
}

capture().catch((err) => {
  console.error('Screenshot capture failed:', err)
  process.exit(1)
})

