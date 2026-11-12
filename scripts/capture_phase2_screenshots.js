const path = require('path')
const fs = require('fs')
const { spawn } = require('child_process')
const p = require('C:/Users/HP/AppData/Local/ms-playwright-go/1.57.0/package')

const outDir = path.join(__dirname, '../audit_results/phase2_screenshots')
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
  console.log('Starting Next.js production server on port 3007...')
  const nextCmd = process.platform === 'win32' ? 'cmd.exe' : 'npx'
  const nextArgs = process.platform === 'win32' ? ['/c', 'npx', 'next', 'start', '-p', '3007'] : ['next', 'start', '-p', '3007']

  const server = spawn(nextCmd, nextArgs, {
    cwd: path.join(__dirname, '..'),
    env: { ...process.env, PORT: '3007', NEXT_TELEMETRY_DISABLED: '1' },
    stdio: 'ignore'
  })

  try {
    console.log('Waiting for http://localhost:3007/...')
    await waitUrl('http://localhost:3007/')
    console.log('Server is ready. Launching Playwright...')

    const browser = await p.chromium.launch({ headless: true })

    // 1. Desktop Viewport (1440x960) Homepage Top Fold
    console.log('Capturing Desktop Homepage Hero & Skills (1440x960)...')
    const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 960 } })
    const page = await desktopContext.newPage()
    await page.goto('http://localhost:3007/', { waitUntil: 'networkidle' })
    await page.waitForTimeout(1000)
    await page.screenshot({ path: path.join(outDir, '01_desktop_homepage_hero_and_skills.png') })
    console.log('  ✓ Captured: 01_desktop_homepage_hero_and_skills.png')

    // 2. Desktop Homepage Featured Systems
    await page.evaluate(() => window.scrollBy({ top: 900, behavior: 'instant' }))
    await page.waitForTimeout(600)
    await page.screenshot({ path: path.join(outDir, '02_desktop_homepage_featured_systems.png') })
    console.log('  ✓ Captured: 02_desktop_homepage_featured_systems.png')

    // 3. Desktop Homepage Journey & Contact
    await page.evaluate(() => window.scrollBy({ top: 950, behavior: 'instant' }))
    await page.waitForTimeout(600)
    await page.screenshot({ path: path.join(outDir, '03_desktop_homepage_journey_and_contact.png') })
    console.log('  ✓ Captured: 03_desktop_homepage_journey_and_contact.png')

    // 4. Desktop Case Study: OCR Evaluator (/projects/ocr-evaluator)
    console.log('Capturing OCR Evaluator Case Study with Architecture Viz...')
    await page.goto('http://localhost:3007/projects/ocr-evaluator', { waitUntil: 'networkidle' })
    await page.waitForTimeout(800)
    await page.screenshot({ path: path.join(outDir, '04_desktop_ocr_evaluator_header.png') })
    console.log('  ✓ Captured: 04_desktop_ocr_evaluator_header.png')

    // Scroll to Architecture Diagram & System Layers
    await page.evaluate(() => window.scrollBy({ top: 600, behavior: 'instant' }))
    await page.waitForTimeout(600)
    await page.screenshot({ path: path.join(outDir, '05_desktop_ocr_architecture_and_layers.png') })
    console.log('  ✓ Captured: 05_desktop_ocr_architecture_and_layers.png')

    // 5. Tablet Viewport (768x1024)
    console.log('Capturing Tablet Homepage (768x1024)...')
    const tabletContext = await browser.newContext({ viewport: { width: 768, height: 1024 } })
    const tabletPage = await tabletContext.newPage()
    await tabletPage.goto('http://localhost:3007/', { waitUntil: 'networkidle' })
    await tabletPage.waitForTimeout(800)
    await tabletPage.screenshot({ path: path.join(outDir, '06_tablet_homepage.png') })
    console.log('  ✓ Captured: 06_tablet_homepage.png')

    // 6. Mobile Viewport (375x812)
    console.log('Capturing Mobile Homepage (375x812)...')
    const mobileContext = await browser.newContext({
      viewport: { width: 375, height: 812 },
      isMobile: true,
      hasTouch: true
    })
    const mobilePage = await mobileContext.newPage()
    await mobilePage.goto('http://localhost:3007/', { waitUntil: 'networkidle' })
    await mobilePage.waitForTimeout(800)
    await mobilePage.screenshot({ path: path.join(outDir, '07_mobile_homepage.png') })
    console.log('  ✓ Captured: 07_mobile_homepage.png')

    await browser.close()
    console.log('All responsive Phase 2 screenshots captured successfully!')
  } finally {
    if (server) {
      if (process.platform === 'win32') {
        spawn('taskkill', ['/pid', server.pid.toString(), '/f', '/t'], { stdio: 'ignore' })
      } else {
        server.kill('SIGTERM')
      }
    }
  }
}

capture().catch((err) => {
  console.error('Capture error:', err)
  process.exit(1)
})
