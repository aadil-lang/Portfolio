const path = require('path')
const fs = require('fs')
const { spawn } = require('child_process')
const p = require('C:/Users/HP/AppData/Local/ms-playwright-go/1.57.0/package')

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

async function captureScreenshots() {
  console.log('--- CAPTURING RAG LAB SCREENSHOTS (DESKTOP, TABLET, MOBILE) ---')
  const outDir = path.join(__dirname, '..', 'audit_results', 'phase4_screenshots')
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }

  const nextCmd = process.platform === 'win32' ? 'cmd.exe' : 'npx'
  const nextArgs = process.platform === 'win32'
    ? ['/c', 'npx', 'next', 'start', '-p', '3011']
    : ['next', 'start', '-p', '3011']

  const server = spawn(nextCmd, nextArgs, {
    cwd: path.join(__dirname, '..'),
    env: { ...process.env, PORT: '3011', NODE_ENV: 'production', NEXT_TELEMETRY_DISABLED: '1' },
    stdio: 'ignore'
  })

  try {
    console.log('Waiting for production server readiness on http://localhost:3011/ ...')
    await waitUrl('http://localhost:3011/rag-lab')
    console.log('Server online. Launching Playwright...')

    const browser = await p.chromium.launch({ headless: true })

    // 1. Desktop (1440x900)
    const ctxDesktop = await browser.newContext({ viewport: { width: 1440, height: 900 } })
    const pageDesktop = await ctxDesktop.newPage()
    await pageDesktop.goto('http://localhost:3011/rag-lab', { waitUntil: 'networkidle' })
    await pageDesktop.waitForTimeout(500)
    await pageDesktop.screenshot({ path: path.join(outDir, '01_desktop_rag_lab.png'), fullPage: false })
    console.log('✓ Desktop screenshot captured')

    // 2. Tablet (768x1024)
    const ctxTablet = await browser.newContext({ viewport: { width: 768, height: 1024 } })
    const pageTablet = await ctxTablet.newPage()
    await pageTablet.goto('http://localhost:3011/rag-lab', { waitUntil: 'networkidle' })
    await pageTablet.waitForTimeout(500)
    await pageTablet.screenshot({ path: path.join(outDir, '02_tablet_rag_lab.png'), fullPage: false })
    console.log('✓ Tablet screenshot captured')

    // 3. Mobile (375x812)
    const ctxMobile = await browser.newContext({ viewport: { width: 375, height: 812 } })
    const pageMobile = await ctxMobile.newPage()
    await pageMobile.goto('http://localhost:3011/rag-lab', { waitUntil: 'networkidle' })
    await pageMobile.waitForTimeout(500)
    await pageMobile.screenshot({ path: path.join(outDir, '03_mobile_rag_lab.png'), fullPage: false })
    console.log('✓ Mobile screenshot captured')

    await browser.close()
    console.log('All screenshots saved to:', outDir)
  } catch (err) {
    console.error('Screenshot capture failed:', err)
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

captureScreenshots()

