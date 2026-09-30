const p = require('C:/Users/HP/AppData/Local/ms-playwright-go/1.57.0/package');

async function auditAccessibility() {
  const browser = await p.chromium.launch({ headless: true });
  const page = await browser.newPage();
  const routes = [
    '/',
    '/experience',
    '/projects',
    '/about',
    '/contact',
    '/ai-engineering',
    '/projects/vm-copy',
    '/projects/ai-worksheets',
    '/projects/curriculum-etl',
    '/projects/atlas-ai',
    '/projects/ai-reliability',
    '/projects/ask-aadil'
  ];
  
  console.log('================================================================');
  console.log('PORTFOLIO V1 ACCESSIBILITY AUDIT');
  console.log('================================================================\n');

  let totalIssues = 0;
  for (const r of routes) {
    await page.goto('http://localhost:3002' + r, { waitUntil: 'networkidle' });
    const report = await page.evaluate((path) => {
      const issues = [];
      
      // 1. Check h1 count
      const h1s = document.querySelectorAll('h1');
      if (h1s.length === 0) issues.push('Missing <h1>');
      if (h1s.length > 1) issues.push(`Multiple <h1> (${h1s.length})`);
      
      // 2. Images missing alt
      const imgs = Array.from(document.querySelectorAll('img'));
      const missingAlt = imgs.filter(img => !img.hasAttribute('alt') || img.getAttribute('alt').trim() === '');
      if (missingAlt.length > 0) issues.push(`${missingAlt.length} image(s) missing alt attribute`);

      // 3. Buttons missing accessible label
      const buttons = Array.from(document.querySelectorAll('button'));
      const unlabelledButtons = buttons.filter(b => {
        const text = (b.innerText || '').trim();
        const ariaLabel = b.getAttribute('aria-label');
        const ariaLabelledby = b.getAttribute('aria-labelledby');
        const title = b.getAttribute('title');
        return !text && !ariaLabel && !ariaLabelledby && !title;
      });
      if (unlabelledButtons.length > 0) issues.push(`${unlabelledButtons.length} button(s) unlabelled`);

      // 4. Form inputs missing accessible name
      const inputs = Array.from(document.querySelectorAll('input, textarea, select'));
      const unlabelledInputs = inputs.filter(inp => {
        if (inp.type === 'hidden') return false;
        const id = inp.id;
        const hasLabel = id && Boolean(document.querySelector(`label[for="${id}"]`));
        const ariaLabel = inp.getAttribute('aria-label');
        const placeholder = inp.getAttribute('placeholder');
        return !hasLabel && !ariaLabel && !placeholder;
      });
      if (unlabelledInputs.length > 0) issues.push(`${unlabelledInputs.length} input(s) unlabelled`);

      // 5. Links missing accessible name
      const links = Array.from(document.querySelectorAll('a'));
      const unlabelledLinks = links.filter(a => {
        const text = (a.innerText || '').trim();
        const ariaLabel = a.getAttribute('aria-label');
        const title = a.getAttribute('title');
        return !text && !ariaLabel && !title;
      });
      if (unlabelledLinks.length > 0) issues.push(`${unlabelledLinks.length} link(s) unlabelled`);

      return { path, issues };
    }, r);

    const statusStr = report.issues.length === 0 ? '✓ PASS (No issues)' : `✗ ISSUES: ${report.issues.join(' | ')}`;
    console.log(`Route: ${r.padEnd(26)} ${statusStr}`);
    totalIssues += report.issues.length;
  }

  console.log('\n================================================================');
  console.log(`Total Accessibility Issues Found: ${totalIssues}`);
  console.log('================================================================');

  await browser.close();
  if (totalIssues > 0) process.exit(1);
}

auditAccessibility().catch(err => {
  console.error(err);
  process.exit(1);
});
