const path = require('path')
const { spawn } = require('child_process')
const p = require('C:/Users/HP/AppData/Local/ms-playwright-go/1.57.0/package')

const routes = [
  '/',
  '/timeline',
  '/experience',
  '/journal',
  '/systems',
  '/architecture',
  '/ai-engineering',
  '/rag-lab',
  '/recruiter',
  '/verification',
  '/compare',
  '/contact',
  '/projects/ask-aadil',
  '/projects/solace-ai',
  '/projects/design-automation',
  '/projects/ocr-evaluator',
  '/projects/ai-reliability',
  '/projects/atlas-ai',
  '/projects/loom-ai',
  '/projects/vm-copy',
  '/projects/ai-worksheets',
  '/projects/curriculum-etl',
  '/projects/math-item-bank'
]

const PORT = 3026

async function waitUrl(url, timeoutMs = 45000) {
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

async function runSmokeTests() {
  const fs = require('fs')
  const hasBuild = fs.existsSync(path.join(__dirname, '../.next/BUILD_ID'))
  const subCmd = hasBuild ? 'start' : 'dev'
  console.log(`=== PRODUCTION / DEV SERVER & ROUTE SMOKE TESTS (next ${subCmd}) ===`)
  console.log(`Starting Next.js server on port ${PORT}...`)

  const nextCmd = process.platform === 'win32' ? 'cmd.exe' : 'npx'
  const nextArgs = process.platform === 'win32'
    ? ['/c', 'npx', 'next', subCmd, '-p', String(PORT)]
    : ['next', subCmd, '-p', String(PORT)]

  const server = spawn(nextCmd, nextArgs, {
    cwd: path.join(__dirname, '..'),
    env: { ...process.env, PORT: String(PORT), NODE_ENV: subCmd === 'dev' ? 'development' : 'production', NEXT_TELEMETRY_DISABLED: '1' },
    stdio: 'pipe'
  })

  server.stdout.on('data', d => {
    const s = d.toString()
    if (s.includes('ready') || s.includes('started') || s.includes('http://')) {
      console.log(`[Next.js Server stdout]: ${s.trim()}`)
    }
  })

  server.stderr.on('data', d => {
    console.error(`[Next.js Server stderr]: ${d.toString().trim()}`)
  })

  try {
    console.log(`Waiting for production server readiness on http://localhost:${PORT}/ ...`)
    await waitUrl(`http://localhost:${PORT}/`)
    console.log('Production server online! Launching Chromium headless via Playwright...\n')

    const browser = await p.chromium.launch({ headless: true })
    const context = await browser.newContext()
    const page = await context.newPage()

    let passedRoutes = 0
    let failedRoutes = 0
    const consoleErrors = []
    const pageRuntimeErrors = []
    const failedNetworkRequests = []

    page.on('console', msg => {
      if (msg.type() === 'error') {
        const text = msg.text()
        // Ignore rapid-navigation cancelled Link prefetches
        if (!text.includes('Failed to fetch RSC payload') && !text.includes('ERR_ABORTED')) {
          consoleErrors.push({ url: page.url(), text })
        }
      }
    })

    page.on('pageerror', err => {
      pageRuntimeErrors.push({ url: page.url(), message: err.message, stack: err.stack })
    })

    page.on('requestfailed', request => {
      const url = request.url()
      // Only record true first-party failures (exclude aborted navigations)
      if (url.includes(`localhost:${PORT}`) && request.failure()?.errorText !== 'net::ERR_ABORTED') {
        failedNetworkRequests.push({
          url,
          failure: request.failure()?.errorText || 'Unknown error'
        })
      }
    })

    for (const r of routes) {
      const targetUrl = `http://localhost:${PORT}${r}`
      try {
        const response = await page.goto(targetUrl, { waitUntil: 'load', timeout: 25000 })
        const status = response ? response.status() : 0

        let redirectUrls = []
        if (response) {
          let curr = response.request().redirectedFrom()
          while (curr) {
            redirectUrls.unshift(curr.url())
            curr = curr.redirectedFrom()
          }
        }

        if (status === 200) {
          console.log(`[PASS 200] ${r}${redirectUrls.length > 0 ? ` (redirected from: ${redirectUrls.join(' -> ')})` : ''}`)
          passedRoutes++
        } else {
          console.error(`[FAIL ${status}] ${r}`)
          failedRoutes++
        }
      } catch (err) {
        console.error(`[ERR] ${r}:`, err.message)
        failedRoutes++
      }
      await page.waitForTimeout(500)
    }

    // Check Static Assets Delivery
    console.log('\n--- Checking Static Assets Delivery ---')
    const resumeRes = await fetch(`http://localhost:${PORT}/resume.pdf`)
    const resumeLen = resumeRes.headers.get('content-length')
    const resumeOk = resumeRes.status === 200 && parseInt(resumeLen || '0') > 100000
    console.log(`Resume PDF (/resume.pdf): status=${resumeRes.status}, size=${resumeLen} bytes -> ${resumeOk ? 'PASS' : 'FAIL'}`)

    const videoHeadRes = await fetch(`http://localhost:${PORT}/videos/solace_demo.mp4`, { method: 'HEAD' })
    const videoLen = videoHeadRes.headers.get('content-length')
    const videoOk = videoHeadRes.status === 200 && parseInt(videoLen || '0') > 3000000
    console.log(`Solace Video (/videos/solace_demo.mp4): status=${videoHeadRes.status}, size=${videoLen} bytes, accept-ranges=${videoHeadRes.headers.get('accept-ranges')} -> ${videoOk ? 'PASS' : 'FAIL'}`)

    const posterRes = await fetch(`http://localhost:${PORT}/videos/solace_demo_poster.png`)
    const posterLen = posterRes.headers.get('content-length')
    const posterOk = posterRes.status === 200 && parseInt(posterLen || '0') > 50000
    console.log(`Solace Poster (/videos/solace_demo_poster.png): status=${posterRes.status}, size=${posterLen} bytes -> ${posterOk ? 'PASS' : 'FAIL'}`)

    console.log('\n================ SMOKE TEST SUMMARY ================')
    console.log(`Total Routes Tested: ${routes.length}`)
    console.log(`Passed Routes: ${passedRoutes} / ${routes.length}`)
    console.log(`Failed Routes: ${failedRoutes}`)
    console.log(`Page Runtime Errors: ${pageRuntimeErrors.length}`)
    console.log(`Browser Console Errors: ${consoleErrors.length}`)
    console.log(`Failed First-Party Requests: ${failedNetworkRequests.length}`)

    if (pageRuntimeErrors.length > 0) {
      console.log('Page Runtime Errors Detail:', JSON.stringify(pageRuntimeErrors, null, 2))
    }
    if (consoleErrors.length > 0) {
      console.log('Console Errors Detail:', JSON.stringify(consoleErrors, null, 2))
    }
    if (failedNetworkRequests.length > 0) {
      console.log('Failed First-Party Requests Detail:', JSON.stringify(failedNetworkRequests, null, 2))
    }

    await browser.close()

    if (failedRoutes > 0 || !resumeOk || !videoOk || !posterOk || pageRuntimeErrors.length > 0) {
      console.error('Smoke tests FAILED verification criteria.')
      process.exit(1)
    } else {
      console.log('All verification criteria PASSED successfully.')
    }
  } catch (err) {
    console.error('Smoke test suite failed with error:', err)
    process.exit(1)
  } finally {
    if (server) {
      console.log('Stopping production server...')
      if (process.platform === 'win32') {
        spawn('taskkill', ['/pid', server.pid, '/f', '/t'], { stdio: 'ignore' })
      } else {
        server.kill('SIGINT')
      }
    }
  }
}

runSmokeTests()
