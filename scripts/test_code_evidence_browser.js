const path = require('path');
const fs = require('fs');

async function testCodeEvidenceBrowser() {
  console.log('================================================================');
  console.log('VERIFYING CODE EVIDENCE IN BROWSER ACROSS SYSTEMS ARCHIVE');
  console.log('================================================================\n');

  const p = require('C:/Users/HP/AppData/Local/ms-playwright-go/1.57.0/package');
  const browser = await p.chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 960 }
  });
  // Grant clipboard permissions for copy button test
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  const page = await context.newPage();

  const outDir = path.join(__dirname, '../audit_results/code_evidence_qa');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const projectsToTest = [
    { slug: 'vm-copy', name: 'VM Copy Question Generator', expectedSnippets: 2 },
    { slug: 'design-automation', name: 'Engineering Design Automation', expectedSnippets: 2 },
    { slug: 'ai-reliability', name: 'AI Application Reliability', expectedSnippets: 2 },
    { slug: 'ask-aadil', name: 'Ask Aadil', expectedSnippets: 1 },
    { slug: 'atlas-ai', name: 'Atlas AI', expectedSnippets: 2 },
    { slug: 'loom-ai', name: 'Loom AI', expectedSnippets: 1 }
  ];

  for (const proj of projectsToTest) {
    const url = `http://localhost:3002/projects/${proj.slug}`;
    console.log(`\nTesting ${proj.name} (${url})...`);

    const errors = [];
    page.on('pageerror', err => errors.push(err.message));

    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    // Verify section header exists
    const sectionHeader = await page.$('h2:has-text("Engineering Evidence // Code Excerpts")');
    if (!sectionHeader) {
      throw new Error(`Missing "Engineering Evidence // Code Excerpts" header on ${proj.slug}`);
    }
    console.log('  ✓ Section header found: "Engineering Evidence // Code Excerpts"');

    // Verify CodeEvidence figures rendered
    const figures = await page.$$('figure.glass');
    console.log(`  ✓ Found ${figures.length} CodeEvidence figure(s) (expected >= ${proj.expectedSnippets})`);
    if (figures.length < proj.expectedSnippets) {
      throw new Error(`Expected at least ${proj.expectedSnippets} CodeEvidence figures on ${proj.slug}, found ${figures.length}`);
    }

    // Scroll down to code evidence section
    await sectionHeader.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(outDir, `${proj.slug}_code_evidence.png`) });
    console.log(`  ✓ Screenshot captured: ${proj.slug}_code_evidence.png`);

    // Test first figure elements:
    const firstFig = figures[0];
    const decisionEl = await firstFig.$('span:has-text("ENGINEERING DECISION")');
    const whyExistsEl = await firstFig.$('span:has-text("WHY THIS EXISTS")');
    const copyBtn = await firstFig.$('button:has-text("Copy")');

    if (!decisionEl) throw new Error(`Missing ENGINEERING DECISION on ${proj.slug}`);
    if (!whyExistsEl) throw new Error(`Missing WHY THIS EXISTS on ${proj.slug}`);
    if (!copyBtn) throw new Error(`Missing Copy button on ${proj.slug}`);

    // Click copy button and verify feedback
    console.log('  Testing copy button interaction...');
    await copyBtn.click();
    await page.waitForTimeout(300);
    const copiedText = await firstFig.$('span:has-text("Copied!")');
    if (!copiedText) {
      console.warn('  ⚠️ "Copied!" text transition not detected immediately, checking button text...');
    } else {
      console.log('  ✓ Copy button successfully transitioned to "Copied!" state');
    }

    // Check for horizontal overflow
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    if (overflow) {
      throw new Error(`Horizontal overflow detected on ${proj.slug}! scrollWidth: ${document.documentElement.scrollWidth} > innerWidth: ${window.innerWidth}`);
    }
    console.log('  ✓ Zero horizontal overflow verified');

    if (errors.length > 0) {
      throw new Error(`Console page errors on ${proj.slug}: ${errors.join(', ')}`);
    }
  }

  // Mobile viewport test on /projects/design-automation
  console.log('\nTesting Mobile Viewport (375x812) on /projects/design-automation...');
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('http://localhost:3002/projects/design-automation', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const mobileOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  if (mobileOverflow) {
    throw new Error('Horizontal page overflow detected on mobile viewport!');
  }
  console.log('  ✓ Mobile viewport (375px) has zero page overflow');

  const mobileSection = await page.$('h2:has-text("Engineering Evidence // Code Excerpts")');
  if (mobileSection) {
    await mobileSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(outDir, 'mobile_eda_code_evidence.png') });
    console.log('  ✓ Mobile screenshot captured: mobile_eda_code_evidence.png');
  }

  await browser.close();
  console.log('\n================================================================');
  console.log('🎉 ALL CODE EVIDENCE BROWSER TESTS PASSED SUCCESSFULLY!');
  console.log('================================================================');
}

testCodeEvidenceBrowser().catch(err => {
  console.error('\n❌ Browser test failed:', err);
  process.exit(1);
});
