const path = require('path')
const fs = require('fs')
const { spawn } = require('child_process')
const p = require('C:/Users/HP/AppData/Local/ms-playwright-go/1.57.0/package')

const outDir = path.join(__dirname, '../audit_results/timeline_screenshots')
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true })
}

async function waitUrl(url, timeoutMs = 25000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url)
      if (res.ok) return true
    } catch (e) {
      // wait
    }
    await new Promise(r => setTimeout(r, 500))
  }
  throw new Error(`Timeout waiting for ${url}`)
}

async function capture() {
  console.log('Starting Next.js production server on port 3006...')
  const nextCmd = process.platform === 'win32' ? 'cmd.exe' : 'npx'
  const nextArgs = process.platform === 'win32' ? ['/c', 'npx', 'next', 'start', '-p', '3006'] : ['next', 'start', '-p', '3006']

  const server = spawn(nextCmd, nextArgs, {
    cwd: path.join(__dirname, '..'),
    env: { ...process.env, PORT: '3006', NEXT_TELEMETRY_DISABLED: '1' },
    stdio: 'ignore'
  })

  try {
    console.log('Waiting for http://localhost:3006/experience...')
    await waitUrl('http://localhost:3006/experience')
    console.log('Server is ready. Launching Playwright...')

    const browser = await p.chromium.launch({ headless: true })

    // 1. Desktop Viewport (1440x960)
    console.log('Capturing Desktop Viewport (1440x960)...')
    const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 960 } })
    const desktopPage = await desktopContext.newPage()
    await desktopPage.goto('http://localhost:3006/experience', { waitUntil: 'networkidle' })
    await desktopPage.waitForTimeout(1000)

    // Narrative & Stages
    await desktopPage.screenshot({ path: path.join(outDir, '01_desktop_narrative_stages.png') })
    console.log('  ✓ Captured: 01_desktop_narrative_stages.png')

    // Scroll to Journey Map Canvas & Zone 04
    await desktopPage.evaluate(() => window.scrollBy({ top: 350, behavior: 'instant' }))
    await desktopPage.waitForTimeout(600)
    await desktopPage.screenshot({ path: path.join(outDir, '02_desktop_journey_map.png') })
    console.log('  ✓ Captured: 02_desktop_journey_map.png')

    // Click on Station 19 (OCR Evaluator) or Station 23 (Solace AI) to open Inspector
    const stationNode = await desktopPage.$('circle, g.checkpoint-node')
    if (stationNode) {
      await stationNode.click().catch(() => {})
      await desktopPage.waitForTimeout(400)
    }

    // Scroll to Milestone Cards (Independent AI Engineering & Research)
    await desktopPage.evaluate(() => window.scrollBy({ top: 750, behavior: 'instant' }))
    await desktopPage.waitForTimeout(600)
    await desktopPage.screenshot({ path: path.join(outDir, '03_desktop_milestones_index.png') })
    console.log('  ✓ Captured: 03_desktop_milestones_index.png')
    await desktopContext.close()

    // 2. Tablet Viewport (768x1024)
    console.log('Capturing Tablet Viewport (768x1024)...')
    const tabletContext = await browser.newContext({ viewport: { width: 768, height: 1024 } })
    const tabletPage = await tabletContext.newPage()
    await tabletPage.goto('http://localhost:3006/experience', { waitUntil: 'networkidle' })
    await tabletPage.waitForTimeout(800)
    await tabletPage.screenshot({ path: path.join(outDir, '04_tablet_responsive_timeline.png') })
    console.log('  ✓ Captured: 04_tablet_responsive_timeline.png')
    await tabletContext.close()

    // 3. Mobile Viewport (375x812)
    console.log('Capturing Mobile Viewport (375x812)...')
    const mobileContext = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true })
    const mobilePage = await mobileContext.newPage()
    await mobilePage.goto('http://localhost:3006/experience', { waitUntil: 'networkidle' })
    await mobilePage.waitForTimeout(800)
    await mobilePage.screenshot({ path: path.join(outDir, '05_mobile_responsive_timeline.png') })
    console.log('  ✓ Captured: 05_mobile_responsive_timeline.png')
    await mobileContext.close()

    await browser.close()
    console.log('All screenshots captured successfully!')
  } finally {
    if (process.platform === 'win32') {
      spawn('taskkill', ['/pid', server.pid.toString(), '/f', '/t'])
    } else {
      server.kill()
    }
  }
}

capture().catch(err => {
  console.error('Screenshot capture failed:', err)
  process.exit(1)
})

