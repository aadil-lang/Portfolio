const p = require('C:/Users/HP/AppData/Local/ms-playwright-go/1.57.0/package');
const path = require('path');
const fs = require('fs');

async function verifyMasterPromptRestructure() {
  const browser = await p.chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('--- STEP 1: VERIFYING HOME & JOURNAL SPREADS ---');
  await page.goto('http://localhost:3002/', { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(1000);

  // Scroll to journal
  const journalElem = await page.$('#journal');
  if (journalElem) {
    await journalElem.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
  }

  // Open Journal
  console.log('Opening journal...');
  await page.click('#open-journal-button');
  await page.waitForTimeout(1800);

  const results = [];
  const heightDeltas = [];

  // Iterate through all 16 spreads
  for (let i = 0; i < 16; i++) {
    const spreadData = await page.evaluate(() => {
      const spreadElem = document.querySelector('#journal-spread-viewport');
      const text = document.querySelector('#journal')?.innerText || '';
      const height = spreadElem ? spreadElem.offsetHeight : null;
      return { text, height };
    });

    heightDeltas.push(spreadData.height);
    const textSnippet = spreadData.text.replace(/\s+/g, ' ').substring(0, 150);
    console.log(`Spread ${i.toString().padStart(2, '0')}: Height = ${spreadData.height}px | Snippet: ${textSnippet}`);

    results.push({
      spreadIndex: i,
      height: spreadData.height,
      hasExpectedHeight: spreadData.height === 700
    });

    if (i < 15) {
      // Click next spread arrow
      await page.click('#book-next-spread-arrow');
      await page.waitForTimeout(850);
    }
  }

  // Take screenshot of Epilogue
  const outDir = path.join(__dirname, '../audit_results');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  await page.screenshot({ path: path.join(outDir, 'master_prompt_spread15_epilogue.png') });

  console.log('\n--- STEP 2: VERIFYING TIMELINE (/experience) ---');
  await page.goto('http://localhost:3002/experience', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(800);

  const timelineData = await page.evaluate(() => {
    const text = document.body.innerText;
    const lower = text.toLowerCase();
    return {
      hasSpineHeader: lower.includes('chronological spine'),
      hasEarlyContent: lower.includes('digituala') && lower.includes('inhaltmart') && lower.includes('digiplus'),
      hasQuietPeriod: lower.includes('learning outside the workplace'),
      hasWaygroundMilestones: lower.includes('katex') && lower.includes('figma') && lower.includes('content builder'),
      hasVMCopyTransition: lower.includes('vm copy question generator'),
      hasTeamBoundary: lower.includes('team system'),
      hasStillBuilding: lower.includes('still building') && lower.includes('still learning'),
      hasQuestionMark: text.includes('?')
    };
  });
  console.log('Timeline Verification:', timelineData);
  await page.screenshot({ path: path.join(outDir, 'master_prompt_timeline.png') });

  console.log('\n--- STEP 3: VERIFYING SYSTEMS CATALOG (/projects) ---');
  await page.goto('http://localhost:3002/projects', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(800);

  const systemsData = await page.evaluate(() => {
    const text = document.body.innerText;
    return {
      hasHeader: text.includes('SYSTEMS CATALOG // REPOSITORY ARCHIVE'),
      hasProfessionalCategory: text.includes('PROFESSIONAL ENGINEERING'),
      hasWaygroundIndependent: text.includes('Independent Builds at Wayground'),
      hasWaygroundTeam: text.includes('Team System'),
      hasIndependentCategory: text.includes('INDEPENDENT ENGINEERING'),
      hasPersonalBuilds: text.includes('Personal Builds')
    };
  });
  console.log('Systems Catalog Verification:', systemsData);
  await page.screenshot({ path: path.join(outDir, 'master_prompt_systems_catalog.png') });

  console.log('\n--- STEP 4: VERIFYING PROJECT SYSTEM SPEC (/projects/vm-copy) ---');
  await page.goto('http://localhost:3002/projects/vm-copy', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(800);

  const projectSpecData = await page.evaluate(() => {
    const text = document.body.innerText;
    return {
      hasTitle: text.includes('VM Copy Question Generator'),
      hasContext: text.includes('Context'),
      hasProblem: text.includes('Engineering Problem'),
      hasArchitecture: text.includes('Architecture & Execution Flow'),
      hasDeterministicBoundary: text.includes('What Became Deterministic'),
      hasEvidence: text.includes('Evidence & Ground Truth'),
      hasTradeoffs: text.includes('Trade-offs')
    };
  });
  console.log('Project Spec Verification:', projectSpecData);
  await page.screenshot({ path: path.join(outDir, 'master_prompt_vm_copy_spec.png') });

  // Summary
  const all700 = results.every(r => r.height === 700);
  console.log('\n=== MASTER AUDIT VERIFICATION SUMMARY ===');
  console.log(`All 16 spreads locked to 700px: ${all700 ? 'PASSED (100% stable, 0px variance)' : 'FAILED'}`);
  console.log(`Timeline spine structure: ${Object.values(timelineData).every(v => v) ? 'PASSED' : 'CHECK FAILED'}`);
  console.log(`Systems catalog categories: ${Object.values(systemsData).every(v => v) ? 'PASSED' : 'CHECK FAILED'}`);
  console.log(`Project deep spec structure: ${Object.values(projectSpecData).every(v => v) ? 'PASSED' : 'CHECK FAILED'}`);

  await browser.close();
}

verifyMasterPromptRestructure().catch(err => {
  console.error('Audit failed with error:', err);
  process.exit(1);
});
