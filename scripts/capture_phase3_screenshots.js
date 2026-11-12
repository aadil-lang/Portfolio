const path = require('path')
const fs = require('fs')
const { spawn } = require('child_process')
const p = require('C:/Users/HP/AppData/Local/ms-playwright-go/1.57.0/package')

const outDir = path.join(__dirname, '../audit_results/phase3_screenshots')
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true })
}

async function waitUrl(url, timeoutMs = 35000) {
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
  console.log('Starting Next.js dev server on port 3008...')
  const nextCmd = process.platform === 'win32' ? 'cmd.exe' : 'npx'
  const nextArgs = process.platform === 'win32' ? ['/c', 'npx', 'next', 'dev', '-p', '3008'] : ['next', 'dev', '-p', '3008']

  const server = spawn(nextCmd, nextArgs, {
    cwd: path.join(__dirname, '..'),
    env: { ...process.env, PORT: '3008', NEXT_TELEMETRY_DISABLED: '1' },
    stdio: 'ignore'
  })

  try {
    console.log('Waiting for http://localhost:3008/projects/ocr-evaluator...')
    await waitUrl('http://localhost:3008/projects/ocr-evaluator')
    console.log('Server is ready. Launching Playwright...')

    const browser = await p.chromium.launch({ headless: true })
    const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 960 } })

    // 1. OCR Evaluator Interactive Demo (Desktop)
    console.log('1. Capturing OCR Evaluator Interactive Visualizer...')
    const pageOcr = await desktopContext.newPage()
    await pageOcr.goto('http://localhost:3008/projects/ocr-evaluator#interactive-evidence', { waitUntil: 'networkidle' })
    await pageOcr.waitForTimeout(1500)
    await pageOcr.screenshot({ path: path.join(outDir, '01_ocr_evaluator_interactive_demo.png') })
    console.log('  ✓ Captured: 01_ocr_evaluator_interactive_demo.png')

    // 2. CAD Model Viewer (Desktop)
    console.log('2. Capturing EDA 3D CAD Viewer...')
    const pageEda = await desktopContext.newPage()
    await pageEda.goto('http://localhost:3008/projects/design-automation#interactive-evidence', { waitUntil: 'networkidle' })
    await pageEda.waitForTimeout(2000)
    await pageEda.screenshot({ path: path.join(outDir, '02_cad_model_viewer_3d.png') })
    console.log('  ✓ Captured: 02_cad_model_viewer_3d.png')

    // 3. Solace AI Video Walkthrough (Desktop)
    console.log('3. Capturing Solace AI Video Walkthrough...')
    const pageSolace = await desktopContext.newPage()
    await pageSolace.goto('http://localhost:3008/projects/solace-ai#interactive-evidence', { waitUntil: 'networkidle' })
    await pageSolace.waitForTimeout(1500)
    await pageSolace.screenshot({ path: path.join(outDir, '03_solace_ai_video_walkthrough.png') })
    console.log('  ✓ Captured: 03_solace_ai_video_walkthrough.png')

    // 4. Ask Aadil Evaluation Explorer (Desktop)
    console.log('4. Capturing Ask Aadil Evaluation Explorer...')
    const pageAsk = await desktopContext.newPage()
    await pageAsk.goto('http://localhost:3008/projects/ask-aadil#interactive-evidence', { waitUntil: 'networkidle' })
    await pageAsk.waitForTimeout(1500)
    await pageAsk.screenshot({ path: path.join(outDir, '04_ask_aadil_evaluation_explorer.png') })
    console.log('  ✓ Captured: 04_ask_aadil_evaluation_explorer.png')

    // 5. Tablet Viewport (768x1024)
    console.log('5. Capturing Tablet Viewport...')
    const tabletContext = await browser.newContext({ viewport: { width: 768, height: 1024 } })
    const pageTablet = await tabletContext.newPage()
    await pageTablet.goto('http://localhost:3008/projects/ocr-evaluator#interactive-evidence', { waitUntil: 'networkidle' })
    await pageTablet.waitForTimeout(1000)
    await pageTablet.screenshot({ path: path.join(outDir, '05_tablet_ocr_cad.png') })
    console.log('  ✓ Captured: 05_tablet_ocr_cad.png')

    // 6. Mobile Viewport (390x844)
    console.log('6. Capturing Mobile Viewport...')
    const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 } })
    const pageMobile = await mobileContext.newPage()
    await pageMobile.goto('http://localhost:3008/projects/solace-ai#interactive-evidence', { waitUntil: 'networkidle' })
    await pageMobile.waitForTimeout(1000)
    await pageMobile.screenshot({ path: path.join(outDir, '06_mobile_solace_ask_aadil.png') })
    console.log('  ✓ Captured: 06_mobile_solace_ask_aadil.png')

    await browser.close()
    console.log('\nAll 6 Phase 3 responsive screenshots successfully captured!')
  } catch (err) {
    console.error('Error during capture:', err)
  } finally {
    if (server) {
      if (process.platform === 'win32') {
        spawn('taskkill', ['/pid', server.pid, '/f', '/t'], { stdio: 'ignore' })
      } else {
        server.kill('SIGINT')
      }
    }
  }
}

capture()

