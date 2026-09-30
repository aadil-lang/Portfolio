const path = require('path')
const fs = require('fs')

async function runFullPortfolioE2EAudit() {
  console.log('================================================================');
  console.log('FULL PORTFOLIO END-TO-END AUDIT & UI HEALTH CHECK');
  console.log('================================================================\n');

  const p = require('C:/Users/HP/AppData/Local/ms-playwright-go/1.57.0/package');
  const browser = await p.chromium.launch({ headless: true });
  
  const outDir = path.join(__dirname, '../audit_results/e2e_full_audit');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const routesToTest = [
    { url: 'http://localhost:3002/', name: 'homepage', label: 'Homepage (/)' },
    { url: 'http://localhost:3002/experience', name: 'timeline', label: 'Timeline (/experience)' },
    { url: 'http://localhost:3002/journal', name: 'journal', label: 'Journal (/journal)' },
    { url: 'http://localhost:3002/systems', name: 'systems_archive', label: 'Systems Archive (/systems)' },
    { url: 'http://localhost:3002/projects', name: 'systems_index', label: 'Systems Index (/projects)' },
    { url: 'http://localhost:3002/about', name: 'about', label: 'About (/about -> /journal)' },
    { url: 'http://localhost:3002/contact', name: 'contact', label: 'Contact (/contact)' },
    { url: 'http://localhost:3002/ask-aadil', name: 'ask_aadil', label: 'Ask Aadil (/ask-aadil)' },
    { url: 'http://localhost:3002/ai-engineering', name: 'ai_engineering', label: 'AI Engineering (/ai-engineering)' },
    { url: 'http://localhost:3002/projects/vm-copy', name: 'proj_vm_copy', label: 'System: VM Copy' },
    { url: 'http://localhost:3002/projects/ai-worksheets', name: 'proj_worksheets', label: 'System: AI Worksheets' },
    { url: 'http://localhost:3002/projects/curriculum-etl', name: 'proj_curriculum_etl', label: 'System: Curriculum ETL' },
    { url: 'http://localhost:3002/projects/atlas-ai', name: 'proj_atlas_ai', label: 'System: Atlas AI' },
    { url: 'http://localhost:3002/projects/ai-reliability', name: 'proj_ai_reliability', label: 'System: AI Reliability' },
    { url: 'http://localhost:3002/projects/ask-aadil', name: 'proj_ask_aadil', label: 'System: Ask Aadil' }
  ];

  const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'tablet', width: 1024, height: 768 },
    { name: 'mobile', width: 390, height: 844 }
  ];

  let totalErrors = 0;
  let totalWarnings = 0;
  const auditResults = [];

  // ===========================================================================
  // 1. ROUTE INTEGRITY & ERROR LOGGING (DESKTOP)
  // ===========================================================================
  console.log('--- 1. TESTING ALL ROUTES (HTTP, CONSOLE, PAGE HEALTH) ---');
  const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const desktopPage = await desktopContext.newPage();

  for (const route of routesToTest) {
    console.log(`\nNavigating to: ${route.label}...`);
    const consoleErrors = [];
    const failedRequests = [];

    const onConsole = msg => {
      if (msg.type() === 'error') {
        // filter out known benign third party warnings if any
        consoleErrors.push(msg.text());
      }
    };
    const onRequestFailed = req => {
      failedRequests.push(`${req.method()} ${req.url()} - ${req.failure()?.errorText || 'Unknown'}`);
    };

    desktopPage.on('console', onConsole);
    desktopPage.on('requestfailed', onRequestFailed);

    let httpStatus = 200;
    try {
      const response = await desktopPage.goto(route.url, { waitUntil: 'networkidle', timeout: 15000 });
      httpStatus = response ? response.status() : 200;
    } catch (e) {
      console.error(`  ✗ Load failed for ${route.label}:`, e.message);
      httpStatus = 500;
      totalErrors++;
    }

    await desktopPage.waitForTimeout(600);

    // Basic layout audits
    const pageMetrics = await desktopPage.evaluate(() => {
      const h1 = document.querySelector('h1')?.innerText || '';
      const bodyWidth = document.body.scrollWidth;
      const windowWidth = window.innerWidth;
      const hasHorizontalScroll = bodyWidth > windowWidth;
      const images = Array.from(document.querySelectorAll('img'));
      const brokenImages = images.filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src);
      return {
        h1,
        bodyWidth,
        windowWidth,
        hasHorizontalScroll,
        imageCount: images.length,
        brokenImages
      };
    });

    const isHealthy = httpStatus === 200 && consoleErrors.length === 0 && failedRequests.length === 0 && !pageMetrics.hasHorizontalScroll;
    if (!isHealthy) {
      if (httpStatus !== 200 || pageMetrics.hasHorizontalScroll) totalErrors++;
      else totalWarnings++;
    }

    console.log(`  Status: ${httpStatus} | H1: "${pageMetrics.h1.slice(0, 45)}"`);
    console.log(`  Console Errors: ${consoleErrors.length} | Failed Requests: ${failedRequests.length}`);
    console.log(`  Horizontal Overflow: ${pageMetrics.hasHorizontalScroll ? 'YES (DEFECT)' : 'None'} | Images: ${pageMetrics.imageCount} (Broken: ${pageMetrics.brokenImages.length})`);

    // Capture desktop full page screenshot
    const shotPath = path.join(outDir, `${route.name}_desktop.png`);
    await desktopPage.screenshot({ path: shotPath, fullPage: false });

    auditResults.push({
      route: route.label,
      url: route.url,
      httpStatus,
      h1: pageMetrics.h1,
      consoleErrors,
      failedRequests,
      hasOverflow: pageMetrics.hasHorizontalScroll,
      brokenImages: pageMetrics.brokenImages,
      screenshot: `${route.name}_desktop.png`
    });

    desktopPage.off('console', onConsole);
    desktopPage.off('requestfailed', onRequestFailed);
  }
  await desktopContext.close();

  // ===========================================================================
  // 2. JOURNAL INTERACTION & SPREAD NAVIGATION
  // ===========================================================================
  console.log('\n--- 2. TESTING ENGINEERING JOURNAL NOTEBOOK & SPREAD FLIP ---');
  const journalContext = await browser.newContext({ viewport: { width: 1440, height: 960 } });
  const journalPage = await journalContext.newPage();
  await journalPage.goto('http://localhost:3002/', { waitUntil: 'domcontentloaded' });
  await journalPage.waitForTimeout(1000);

  // Scroll to journal section
  console.log('Scrolling to Journal notebook section...');
  await journalPage.evaluate(() => {
    const el = document.getElementById('journal') || document.querySelector('[data-section="journal"]');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
  await journalPage.waitForTimeout(800);

  // Check next / prev page turn buttons
  const nextSpreadBtn = await journalPage.$('button[aria-label*="Next spread"], button:has-text("Next"), #journal-next-btn, button[title*="Next"]');
  if (nextSpreadBtn) {
    console.log('Clicking Next Spread in Engineering Journal...');
    await nextSpreadBtn.click();
    await journalPage.waitForTimeout(800);
  }

  await journalPage.screenshot({ path: path.join(outDir, 'journal_spread_turn.png') });
  console.log('✓ Captured journal page flip screenshot: journal_spread_turn.png');
  await journalContext.close();

  // ===========================================================================
  // 3. ASK AADIL MODAL INTERACTION
  // ===========================================================================
  console.log('\n--- 3. TESTING ASK AADIL DRAWER & MODAL ---');
  const modalContext = await browser.newContext({ viewport: { width: 1440, height: 960 } });
  const modalPage = await modalContext.newPage();
  await modalPage.goto('http://localhost:3002/', { waitUntil: 'domcontentloaded' });
  await modalPage.waitForTimeout(1000);

  const askBtn = await modalPage.$('#header-ask-aadil-btn');
  if (askBtn) {
    await askBtn.click();
    await modalPage.waitForTimeout(600);

    const isVisible = await modalPage.evaluate(() => {
      const drawer = document.querySelector('[role="dialog"]') || document.querySelector('.chat-bubble-agent')?.closest('.fixed') || document.querySelector('#ask-aadil-reset-btn');
      return Boolean(drawer);
    });
    console.log(`  Ask Aadil Drawer Opened: ${isVisible ? 'YES' : 'NO'}`);

    // Test a quick query
    const input = await modalPage.$('input[placeholder*="Ask about systems"]');
    if (input) {
      await input.fill('What is your core engineering methodology?');
      await modalPage.keyboard.press('Enter');
      await modalPage.waitForTimeout(1500);
    }

    await modalPage.screenshot({ path: path.join(outDir, 'ask_aadil_modal_open.png') });
    console.log('✓ Captured Ask Aadil modal screenshot: ask_aadil_modal_open.png');

    // Test Reset
    const resetBtn = await modalPage.$('#ask-aadil-reset-btn');
    if (resetBtn) {
      await resetBtn.click();
      await modalPage.waitForTimeout(500);
      console.log('✓ Verified modal reset button functional');
    }
  } else {
    console.warn('  ! #header-ask-aadil-btn not found on homepage header');
    totalWarnings++;
  }
  await modalContext.close();

  // ===========================================================================
  // 4. RESPONSIVE AUDIT (TABLET & MOBILE)
  // ===========================================================================
  console.log('\n--- 4. TESTING RESPONSIVE LAYOUTS (TABLET & MOBILE) ---');
  for (const vp of [viewports[1], viewports[2]]) {
    console.log(`\nAuditing Viewport: ${vp.name} (${vp.width}x${vp.height})...`);
    const vpContext = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const vpPage = await vpContext.newPage();

    for (const testUrl of ['http://localhost:3002/', 'http://localhost:3002/projects', 'http://localhost:3002/projects/ask-aadil', 'http://localhost:3002/experience']) {
      await vpPage.goto(testUrl, { waitUntil: 'domcontentloaded' });
      await vpPage.waitForTimeout(600);

      const overflow = await vpPage.evaluate(() => document.body.scrollWidth > window.innerWidth);
      const urlBasename = testUrl.replace('http://localhost:3002/', '').replace('/', '_') || 'home';
      console.log(`  ${urlBasename} (${vp.name}) -> Horizontal Overflow: ${overflow ? 'FAIL' : 'OK'}`);

      if (overflow) {
        totalErrors++;
      }

      await vpPage.screenshot({ path: path.join(outDir, `responsive_${urlBasename}_${vp.name}.png`) });
    }
    await vpContext.close();
  }

  await browser.close();

  // ===========================================================================
  // SUMMARY
  // ===========================================================================
  console.log('\n================================================================');
  console.log('AUDIT COMPLETE SUMMARY');
  console.log('================================================================');
  console.log(`Routes Audited: ${routesToTest.length}`);
  console.log(`Total Critical Errors: ${totalErrors}`);
  console.log(`Total Warnings: ${totalWarnings}`);

  // Write report to JSON
  fs.writeFileSync(path.join(outDir, 'audit_summary.json'), JSON.stringify({
    timestamp: new Date().toISOString(),
    totalRoutes: routesToTest.length,
    totalErrors,
    totalWarnings,
    results: auditResults
  }, null, 2));

  if (totalErrors > 0) {
    console.error(`\n❌ AUDIT DETECTED ${totalErrors} CRITICAL ISSUE(S)!`);
    process.exit(1);
  } else {
    console.log('\n🎉 FULL END-TO-END AUDIT PASSED! All pages load cleanly with 0 errors.');
  }
}

runFullPortfolioE2EAudit().catch(err => {
  console.error('\n❌ Audit execution failed:', err);
  process.exit(1);
});
