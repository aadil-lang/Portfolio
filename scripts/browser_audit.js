const p = require('C:/Users/HP/AppData/Local/ms-playwright-go/1.57.0/package');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '../audit_results');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function runAudit() {
  const browser = await p.chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  const auditLog = {
    timestamp: new Date().toISOString(),
    p0: [],
    p1: [],
    p2: [],
    p3: [],
    interactions: {},
    responsive: {},
    accessibility: {},
    consoleErrors: []
  };

  page.on('console', msg => {
    if (msg.type() === 'error') {
      auditLog.consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    auditLog.consoleErrors.push(err.message);
  });

  console.log('--- 1. AUDITING HOMEPAGE & JOURNAL ---');
  await page.goto('http://localhost:3002/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(500);

  // Check horizontal overflow on homepage desktop
  const initialOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  if (initialOverflow) {
    auditLog.p1.push({ type: 'UX ISSUE', section: 'Homepage Desktop', issue: 'Horizontal overflow detected on initial load.' });
  }

  // Scroll to journal
  const journalElem = await page.$('#journal');
  if (journalElem) {
    await journalElem.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
  }

  await page.screenshot({ path: path.join(OUTPUT_DIR, '01_journal_closed_cover.png') });
  console.log('Captured 01_journal_closed_cover.png');

  // Check Cover presence and styling
  const coverInfo = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('#journal button, button'));
    const btn = buttons.find(b => /Open/i.test(b.textContent) || /Open/i.test(b.getAttribute('aria-label') || ''));
    const title = document.querySelector('#journal h2, #journal h3');
    return {
      hasOpenBtn: !!btn,
      buttonText: btn ? btn.textContent.trim() : null,
      titleText: title ? title.textContent.trim() : null
    };
  });
  console.log('Cover Info:', coverInfo);

  // Click Open Journal
  console.log('Testing Open Journal click...');
  const openBtn = await page.$('button:has-text("Open the Journal"), button:has-text("Open Journal"), #journal button');
  if (openBtn) {
    await openBtn.click();
    await page.waitForTimeout(1000); // Wait for open transition
    await page.screenshot({ path: path.join(OUTPUT_DIR, '02_journal_opened_toc.png') });
    console.log('Captured 02_journal_opened_toc.png');
  } else {
    auditLog.p0.push({ type: 'BUG', section: 'Journal Cover', issue: 'Open Journal button not found or not clickable.' });
  }

  // Verify Table of Contents elements
  const tocInfo = await page.evaluate(() => {
    const chapters = Array.from(document.querySelectorAll('button, a')).filter(el => /Chapter 0[1-6]/i.test(el.textContent));
    const badges = Array.from(document.querySelectorAll('#journal span')).map(s => s.textContent.trim());
    return {
      chapterCount: chapters.length,
      sampleBadges: badges.slice(0, 10)
    };
  });
  console.log('TOC Info:', tocInfo);

  // Navigate to Chapter 01
  console.log('Navigating to Chapter 01...');
  const ch1Btn = await page.$('button:has-text("Chapter 01"), [data-chapter="1"], button:has-text("VM Copy")');
  if (ch1Btn) {
    await ch1Btn.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUTPUT_DIR, '03_chapter_01.png') });
    console.log('Captured 03_chapter_01.png');
  }

  // Test Keyboard ArrowRight to Chapter 02
  console.log('Testing Keyboard ArrowRight -> Chapter 02...');
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '04_chapter_02_worksheets.png') });
  console.log('Captured 04_chapter_02_worksheets.png');

  // Verify Chapter 02 ArchitectureViz
  const ch2Viz = await page.evaluate(() => {
    const text = document.body.innerText;
    return {
      hasLatex: /pdflatex|LaTeX/i.test(text),
      hasFormal: /Formal/i.test(text),
      hasGamified: /Crossword|Maze/i.test(text)
    };
  });
  console.log('Chapter 02 Content Check:', ch2Viz);

  // Test ArrowRight to Chapter 03 (Math Item Bank)
  console.log('Testing Keyboard ArrowRight -> Chapter 03...');
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '05_chapter_03_item_bank.png') });
  console.log('Captured 05_chapter_03_item_bank.png');

  // Check Team Project Disclosure Banner
  const ch3Banner = await page.evaluate(() => {
    const text = document.body.innerText;
    return {
      hasTeamBadge: /WAYGROUND · TEAM PROJECT/i.test(text),
      hasTeamDisclosure: /company team|not part of my personal source archive/i.test(text),
      hasSvgTikz: /SVG/i.test(text) && /TikZ/i.test(text)
    };
  });
  console.log('Chapter 03 Disclosure & Content Check:', ch3Banner);
  if (!ch3Banner.hasTeamBadge || !ch3Banner.hasTeamDisclosure) {
    auditLog.p1.push({ type: 'BUG', section: 'Chapter 03', issue: 'Missing or unrendered Team Project disclosure banner.' });
  }

  // Navigate through remaining chapters
  for (let ch = 4; ch <= 6; ch++) {
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUTPUT_DIR, `06_chapter_0${ch}.png`) });
    console.log(`Captured 06_chapter_0${ch}.png`);
  }

  // Navigate to Epilogue
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '07_epilogue.png') });
  console.log('Captured 07_epilogue.png');

  // Test Escape -> Return to TOC
  console.log('Testing Escape key to return to TOC...');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(600);
  const backInTOC = await page.evaluate(() => {
    return /Table of Contents/i.test(document.querySelector('#journal')?.innerText || '');
  });
  console.log('Returned to TOC via Escape:', backInTOC);
  if (!backInTOC) {
    auditLog.p2.push({ type: 'UX ISSUE', section: 'Journal Navigation', issue: 'Escape key did not return to Table of Contents smoothly.' });
  }

  console.log('--- 2. AUDITING /projects DIRECTORY ---');
  await page.goto('http://localhost:3002/projects', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '08_projects_directory.png'), fullPage: true });
  console.log('Captured 08_projects_directory.png');

  const projectsInfo = await page.evaluate(() => {
    const text = document.body.innerText;
    return {
      hasProfSection: /PROFESSIONAL ENGINEERING/i.test(text),
      hasIndependentSection: /INDEPENDENT ENGINEERING/i.test(text),
      hasWaygroundIndep: (text.match(/WAYGROUND · INDEPENDENT BUILD/g) || []).length,
      hasWaygroundTeam: (text.match(/WAYGROUND · TEAM PROJECT/g) || []).length,
      hasIndepPersonal: (text.match(/INDEPENDENT · PERSONAL BUILD/g) || []).length,
      overflow: document.documentElement.scrollWidth > window.innerWidth
    };
  });
  console.log('Projects Directory Info:', projectsInfo);

  if (projectsInfo.hasWaygroundIndep !== 3) {
    auditLog.p1.push({ type: 'BUG', section: 'Projects Directory', issue: `Expected 3 WAYGROUND · INDEPENDENT BUILD badges, found ${projectsInfo.hasWaygroundIndep}` });
  }
  if (projectsInfo.hasWaygroundTeam !== 1) {
    auditLog.p1.push({ type: 'BUG', section: 'Projects Directory', issue: `Expected 1 WAYGROUND · TEAM PROJECT badge, found ${projectsInfo.hasWaygroundTeam}` });
  }
  if (projectsInfo.hasIndepPersonal !== 4) {
    auditLog.p1.push({ type: 'BUG', section: 'Projects Directory', issue: `Expected 4 INDEPENDENT · PERSONAL BUILD badges, found ${projectsInfo.hasIndepPersonal}` });
  }

  console.log('--- 3. AUDITING CASE STUDY PAGES ---');
  const caseStudies = [
    'vm-copy',
    'ai-worksheets',
    'curriculum-etl',
    'math-item-bank',
    'design-automation',
    'ai-reliability',
    'loom-ai',
    'atlas-ai'
  ];

  for (const slug of caseStudies) {
    await page.goto(`http://localhost:3002/projects/${slug}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(300);
    const csInfo = await page.evaluate(() => {
      const text = document.body.innerText;
      const h1 = document.querySelector('h1')?.innerText;
      const hasViz = !!document.querySelector('.architecture-viz, svg, [data-viz]');
      const sections = ['Context', 'Engineering Problem', 'Architecture', 'Critical Engineering Decision', 'What Broke', 'What Became Deterministic', 'Evidence', 'Engineering Delta'];
      const missing = sections.filter(s => !text.includes(s));
      return {
        h1,
        hasViz,
        missingSections: missing,
        overflow: document.documentElement.scrollWidth > window.innerWidth
      };
    });
    console.log(`Case Study [${slug}]:`, csInfo);
    if (csInfo.overflow) {
      auditLog.p1.push({ type: 'UX ISSUE', section: `Case Study /${slug}`, issue: 'Horizontal overflow detected.' });
    }
    if (csInfo.missingSections.length > 0) {
      auditLog.p2.push({ type: 'UX ISSUE', section: `Case Study /${slug}`, issue: `Missing expected sections: ${csInfo.missingSections.join(', ')}` });
    }
  }

  console.log('--- 4. RESPONSIVE BREAKPOINT AUDIT ---');
  const viewports = [
    { name: 'desktop-1440', width: 1440, height: 900 },
    { name: 'desktop-1280', width: 1280, height: 800 },
    { name: 'desktop-1024', width: 1024, height: 768 },
    { name: 'tablet-834', width: 834, height: 1112 },
    { name: 'tablet-768', width: 768, height: 1024 },
    { name: 'mobile-430', width: 430, height: 932 },
    { name: 'mobile-390', width: 390, height: 844 },
    { name: 'mobile-375', width: 375, height: 667 }
  ];

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:3002/', { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(300);

    const overflowInfo = await page.evaluate(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
      };
    });

    auditLog.responsive[vp.name] = overflowInfo;
    console.log(`Viewport [${vp.name}]:`, overflowInfo);

    if (overflowInfo.hasOverflow) {
      auditLog.p1.push({
        type: 'UX ISSUE',
        section: `Homepage Responsive (${vp.name})`,
        issue: `Horizontal overflow: scrollWidth (${overflowInfo.scrollWidth}px) > clientWidth (${overflowInfo.clientWidth}px)`
      });
    }

    if (vp.width <= 430) {
      await page.screenshot({ path: path.join(OUTPUT_DIR, `responsive_${vp.name}.png`) });
    }
  }

  // Accessibility audit
  console.log('--- 5. ACCESSIBILITY AUDIT ---');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3002/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  const a11y = await page.evaluate(() => {
    const h1s = Array.from(document.querySelectorAll('h1')).map(h => h.innerText);
    const buttonsWithoutLabel = Array.from(document.querySelectorAll('button')).filter(b => !b.innerText && !b.getAttribute('aria-label'));
    const imagesWithoutAlt = Array.from(document.querySelectorAll('img')).filter(img => !img.getAttribute('alt'));
    return {
      h1Count: h1s.length,
      h1Texts: h1s,
      unlabeledButtons: buttonsWithoutLabel.length,
      unlabeledImages: imagesWithoutAlt.length
    };
  });
  console.log('A11y Basic Scan:', a11y);
  auditLog.accessibility = a11y;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'audit_report_raw.json'), JSON.stringify(auditLog, null, 2));
  console.log('Audit completed. Report saved to audit_results/audit_report_raw.json');

  await browser.close();
}

runAudit().catch(err => {
  console.error('Audit failed with error:', err);
  process.exit(1);
});
