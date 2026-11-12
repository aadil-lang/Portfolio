const path = require('path')
const fs = require('fs')
const { spawn } = require('child_process')
const p = require('C:/Users/HP/AppData/Local/ms-playwright-go/1.57.0/package')

const outputDir = path.join(__dirname, '../audit_results/phase6_4_screenshots')
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

const PORT = 3018

async function capture() {
  console.log('=== PHASE 6.4: CAPTURING VERIFICATION DASHBOARD SCREENSHOTS ===')
  const hasBuild = fs.existsSync(path.join(__dirname, '../.next/BUILD_ID'))
  const subCmd = hasBuild ? 'start' : 'dev'
  console.log(`Using server mode: next ${subCmd}`)
  const nextCmd = process.platform === 'win32' ? 'cmd.exe' : 'npx'
  const nextArgs = process.platform === 'win32'
    ? ['/c', 'npx', 'next', subCmd, '-p', String(PORT)]
    : ['next', subCmd, '-p', String(PORT)]

  const server = spawn(nextCmd, nextArgs, {
    cwd: path.join(__dirname, '..'),
    env: { ...process.env, PORT: String(PORT) },
    stdio: 'ignore'
  })

  // wait for server
  console.log(`Waiting for Next.js production server on port ${PORT}...`)
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`http://localhost:${PORT}/verification`)
      if (res.ok) {
        console.log(`Server is ready on port ${PORT}`)
        break
      }
    } catch (e) {}
    await new Promise(r => setTimeout(r, 500))
  }

  const browser = await p.chromium.launch()

  // 1. Desktop Viewport (1280x800) - Overview & Command Deck
  const desktopContext = await browser.newContext({ viewport: { width: 1280, height: 800 } })
  const desktopPage = await desktopContext.newPage()
  await desktopPage.goto(`http://localhost:${PORT}/verification`, { waitUntil: 'networkidle' })
  await desktopPage.screenshot({ path: path.join(outputDir, 'verification_overview_desktop.png') })
  console.log('[SAVED] verification_overview_desktop.png')

  // 2. System Matrix Desktop (scroll to matrix)
  const matrixEl = desktopPage.locator('#matrix-heading')
  if (await matrixEl.count() > 0) {
    await matrixEl.scrollIntoViewIfNeeded()
    await desktopPage.waitForTimeout(400)
    await desktopPage.screenshot({ path: path.join(outputDir, 'system_matrix_desktop.png') })
    console.log('[SAVED] system_matrix_desktop.png')
  }

  // 3. Evidence Explorer with Filter (click "Automated Test Suites" filter pill)
  const filterBtn = desktopPage.locator('button:has-text("Automated Test Suites")')
  if (await filterBtn.count() > 0) {
    await filterBtn.click()
    await desktopPage.waitForTimeout(400)
    const explorerEl = desktopPage.locator('#explorer-heading')
    await explorerEl.scrollIntoViewIfNeeded()
    await desktopPage.screenshot({ path: path.join(outputDir, 'evidence_explorer_filtered_desktop.png') })
    console.log('[SAVED] evidence_explorer_filtered_desktop.png')
  }

  // 4. Quantitative Claims Desktop
  const claimsEl = desktopPage.locator('#claims-heading')
  if (await claimsEl.count() > 0) {
    await claimsEl.scrollIntoViewIfNeeded()
    await desktopPage.waitForTimeout(400)
    await desktopPage.screenshot({ path: path.join(outputDir, 'quantitative_claims_desktop.png') })
    console.log('[SAVED] quantitative_claims_desktop.png')
  }

  // 5. Known Limitations Drawer Desktop
  const limitationsEl = desktopPage.locator('#limitations-heading')
  if (await limitationsEl.count() > 0) {
    await limitationsEl.scrollIntoViewIfNeeded()
    await desktopPage.waitForTimeout(400)
    await desktopPage.screenshot({ path: path.join(outputDir, 'known_limitations_desktop.png') })
    console.log('[SAVED] known_limitations_desktop.png')
  }

  // 6. Reproduction Center Desktop
  const repoEl = desktopPage.locator('#reproduction-heading')
  if (await repoEl.count() > 0) {
    await repoEl.scrollIntoViewIfNeeded()
    await desktopPage.waitForTimeout(400)
    await desktopPage.screenshot({ path: path.join(outputDir, 'reproduction_center_desktop.png') })
    console.log('[SAVED] reproduction_center_desktop.png')
  }

  // 7. Tablet Viewport (768x1024)
  const tabletContext = await browser.newContext({ viewport: { width: 768, height: 1024 } })
  const tabletPage = await tabletContext.newPage()
  await tabletPage.goto(`http://localhost:${PORT}/verification`, { waitUntil: 'networkidle' })
  await tabletPage.screenshot({ path: path.join(outputDir, 'verification_dashboard_tablet.png') })
  console.log('[SAVED] verification_dashboard_tablet.png')

  // 8. Mobile Viewport (375x667)
  const mobileContext = await browser.newContext({ viewport: { width: 375, height: 667 } })
  const mobilePage = await mobileContext.newPage()
  await mobilePage.goto(`http://localhost:${PORT}/verification`, { waitUntil: 'networkidle' })
  await mobilePage.screenshot({ path: path.join(outputDir, 'verification_dashboard_mobile.png') })
  console.log('[SAVED] verification_dashboard_mobile.png')

  await browser.close()
  server.kill()
  console.log('=== SCREENSHOT CAPTURE COMPLETE ===')
  process.exit(0)
}

capture().catch((err) => {
  console.error('Screenshot capture failed:', err)
  process.exit(1)
})
