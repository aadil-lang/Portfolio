const { chromium } = require('playwright')
const fs = require('fs')
const path = require('path')

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Mohemmed Aadil Khurshid - Resume</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      font-size: 9.5pt;
      line-height: 1.35;
      color: #1e293b;
      background: #ffffff;
      padding: 0.35in 0.45in;
    }

    a {
      color: #2563eb;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    header {
      border-bottom: 2px solid #0f172a;
      padding-bottom: 4px;
      margin-bottom: 7px;
    }

    .name {
      font-size: 20pt;
      font-weight: 700;
      color: #0f172a;
      letter-spacing: -0.5px;
    }

    .title {
      font-size: 11pt;
      font-weight: 600;
      color: #475569;
      margin-top: 2px;
      margin-bottom: 6px;
    }

    .contact-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      font-size: 8.5pt;
      color: #334155;
    }

    .contact-item {
      display: flex;
      items-center: center;
      gap: 4px;
    }

    .contact-item strong {
      color: #0f172a;
    }

    .section {
      margin-bottom: 7px;
    }

    .section-title {
      font-size: 10pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #0f172a;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 2px;
      margin-bottom: 6px;
    }

    .summary-text {
      font-size: 9pt;
      color: #334155;
      text-align: justify;
    }

    .skills-grid {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 4px 12px;
      font-size: 8.8pt;
    }

    .skill-cat {
      font-weight: 600;
      color: #0f172a;
      white-space: nowrap;
    }

    .skill-val {
      color: #334155;
    }

    .exp-item {
      margin-bottom: 10px;
    }

    .exp-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-size: 9.5pt;
    }

    .exp-role {
      font-weight: 700;
      color: #0f172a;
    }

    .exp-company {
      font-weight: 600;
      color: #2563eb;
    }

    .exp-period {
      font-size: 8.5pt;
      font-weight: 500;
      color: #64748b;
    }

    .project-block {
      margin-top: 2px;
      margin-bottom: 4px;
    }

    .project-title-bar {
      display: flex;
      justify-content: space-between;
      font-size: 9pt;
      font-weight: 600;
      color: #1e293b;
    }

    .project-stack {
      font-size: 8pt;
      font-weight: 500;
      color: #475569;
      font-family: monospace;
    }

    ul.bullets {
      list-style-type: disc;
      margin-left: 14px;
      margin-top: 2px;
    }

    ul.bullets li {
      font-size: 8.4pt;
      color: #334155;
      margin-bottom: 1.5px;
    }

    .edu-grid {
      display: flex;
      justify-content: flex-start;
      align-items: baseline;
      gap: 16px;
      font-size: 8.5pt;
      margin-bottom: 3px;
    }

    .edu-grid div {
      white-space: nowrap;
    }

    .page-break {
      page-break-before: always;
    }
  </style>
</head>
<body>

  <!-- HEADER -->
  <header>
    <div class="name">Mohemmed Aadil Khurshid</div>
    <div class="title">AI Engineer | Python | LLM & Agentic Systems | Full-Stack</div>
    <div class="contact-bar">
      <div class="contact-item"><strong>Email:</strong> <a href="mailto:aadil.khurshid95@gmail.com">aadil.khurshid95@gmail.com</a></div>
      <div class="contact-item"><strong>Phone:</strong> +91-7973949541</div>
      <div class="contact-item"><strong>Location:</strong> Varanasi, UP, India</div>
    </div>
    <div class="contact-bar" style="margin-top: 4px;">
      <div class="contact-item"><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/mohemmed-aadil-khurshid/" target="_blank">linkedin.com/in/mohemmed-aadil-khurshid</a></div>
      <div class="contact-item"><strong>GitHub:</strong> <a href="https://github.com/aadil-lang" target="_blank">github.com/aadil-lang</a></div>
      <div class="contact-item"><strong>Portfolio:</strong> <a href="https://portfolio-ecru-five-5vd5okcvgi.vercel.app/" target="_blank">portfolio-ecru-five-5vd5okcvgi.vercel.app</a></div>
    </div>
  </header>

  <!-- SUMMARY -->
  <div class="section">
    <div class="section-title">Professional Summary</div>
    <p class="summary-text">
      AI Engineer with around 1 year of hands-on AI engineering experience and 4 years of overall professional experience spanning AI application development, backend engineering, full-stack development, and mathematics domain expertise. Experienced in building LLM-powered applications, RAG pipelines, and agentic workflows using Python, FastAPI, LangGraph, Playwright, and modern LLM tooling. Focused on combining LLM capabilities with deterministic logic, structured workflows, validation, automated testing, and human-in-the-loop controls to build reliable AI systems from architecture through implementation and deployment.
    </p>
  </div>

  <!-- TECHNICAL SKILLS -->
  <div class="section">
    <div class="section-title">Technical Skills</div>
    <div class="skills-grid">
      <div class="skill-cat">AI & LLM Systems:</div>
      <div class="skill-val">LLMs, LangChain, LangGraph, RAG, Agentic Workflows, Tool Calling, LLM Orchestration, Prompt Engineering, Structured Outputs, Vision AI</div>
      
      <div class="skill-cat">Backend & Python:</div>
      <div class="skill-val">FastAPI, Python 3.12, Node.js, Express.js, REST APIs, Pydantic v2, Pandas, NumPy, JWT Auth</div>
      
      <div class="skill-cat">Frontend & Web:</div>
      <div class="skill-val">React 19, Next.js 16 (App Router), TypeScript 5, Vite, Tailwind CSS, KaTeX, HTML5/CSS3</div>
      
      <div class="skill-cat">Testing & Automation:</div>
      <div class="skill-val">Playwright (E2E & Visual QA), pytest, Vitest, Automated Testing, API Verification, Git/GitHub</div>
      
      <div class="skill-cat">Data & Infra:</div>
      <div class="skill-val">MongoDB, MongoDB Atlas Vector Search, SEC EDGAR API, Docker, Docker Compose, TeX Live (pdflatex)</div>

      <div class="skill-cat">AI Dev Tooling:</div>
      <div class="skill-val">Cursor, Claude Code, OpenAI Codex, Antigravity, Ollama, Model Context Protocol (MCP)</div>
    </div>
  </div>

  <!-- PROFESSIONAL EXPERIENCE -->
  <div class="section">
    <div class="section-title">Professional Experience</div>

    <!-- WAYGROUND 1 -->
    <div class="exp-item">
      <div class="exp-header">
        <div><span class="exp-role">AI Engineer — AI/ML Team</span> | <span class="exp-company">WAYGROUND Inc</span></div>
        <div class="exp-period">Jan 2026 – Jul 2026 | Bengaluru, India</div>
      </div>

      <div class="project-block">
        <div class="project-title-bar">
          <span>Curriculum Transformation Engine — Enterprise ETL Pipeline</span>
          <span class="project-stack">Python 3.12, Claude 3.5 Sonnet, Pydantic v2, Pandas, ThreadPoolExecutor</span>
        </div>
        <ul class="bullets">
          <li>Engineered an asynchronous Map-Reduce ETL pipeline using Claude 3.5 Sonnet to transform multi-megabyte unstructured K–12 state-standard PDFs into normalized structured datasets.</li>
          <li>Designed dynamic schema derivation from customer sample CSV contracts, extracting column hierarchies, field types, and taxonomy rules.</li>
          <li>Implemented layered validation using reviewer/critic LLM validation, deterministic Pydantic row guards, grade normalization, and automated post-extraction CSV auditing.</li>
        </ul>
      </div>

      <div class="project-block">
        <div class="project-title-bar">
          <span>AI Worksheets — Product POC</span>
          <span class="project-stack">FastAPI, Python, Docker, TeX Live, React 19, WeasyPrint, Portkey</span>
        </div>
        <ul class="bullets">
          <li>Independently researched and built an educational content synthesis platform for TEKS- and Common Core-aligned worksheets, reducing workflow times from 2 hours to under 3 minutes.</li>
          <li>Solved geometric visual-quality issues by compiling LLM-generated TikZ through headless TeX Live (pdflatex/pdftoppm) to produce high-resolution, accurate diagrams.</li>
          <li>Developed deterministic Crossword and Maze generation workflows using algorithmic backtracking approaches rather than generative approximations.</li>
        </ul>
      </div>

      <div class="project-block">
        <div class="project-title-bar">
          <span>Selected Project: US Mathematics Item Bank Generation</span>
          <span class="project-stack">Python, LangGraph, Pydantic, React, TypeScript, LLMs, Vision Models, SVG, TikZ, ILP</span>
        </div>
        <ul class="bullets">
          <li>Owned the image-generation workstream across the entire item-bank generation system, designing modular prompts, researching effective prompting patterns, and building evaluation frameworks for generated mathematical visuals.</li>
          <li>Developed vision-based evaluation workflows to assess generated images for visual correctness and alignment with the intended mathematics questions.</li>
          <li>Worked on the Upper Elementary item-bank generation pipeline, developing and refining prompts, evaluation logic, and state-specific curriculum constraints.</li>
          <li>Extended the pipeline by implementing support for new question types and image-based answer options.</li>
          <li>Contributed to an Integer Linear Programming (ILP)-based stratified sampling mechanism to select questions from the generated bank according to curriculum-weightage targets and minimum/maximum constraints, using a Min/Max Swap strategy.</li>
          <li>Worked on two item-bank vetting interfaces built with React and TypeScript, fixing UI bugs reported by US mathematics consultants and resolving data issues affecting the review and validation of generated items.</li>
        </ul>
      </div>

    </div>

    <!-- WAYGROUND 2 -->
    <div class="exp-item" style="margin-top: 6px; page-break-before: always;">
      <div class="exp-header">
        <div><span class="exp-role">Subject Matter Expert — Mathematics</span> | <span class="exp-company">WAYGROUND Inc</span></div>
        <div class="exp-period">Jan 2024 – Dec 2025 | Bengaluru, India</div>
      </div>
      <ul class="bullets">
        <li>Developed and reviewed K–12 mathematics content aligned with U.S. state standards, ensuring mathematical accuracy, curriculum alignment, and solution quality.</li>
        <li>Created and validated mathematical questions, answer choices, and step-by-step solutions across different skills and difficulty levels.</li>
        <li>Worked with KaTeX for mathematical content formatting and created educational diagrams using Figma.</li>
      </ul>

      <div class="project-block" style="margin-top: 4px;">
        <div class="project-title-bar">
          <span>VM Copy Question Generator</span>
          <span class="project-stack">Next.js 16, TypeScript 5, Tailwind CSS, OpenAI, Portkey AI Gateway, KaTeX, Recharts, Vitest</span>
        </div>
        <ul class="bullets">
          <li>Independently built an AI-powered application using OpenAI models to generate mathematical question variations and word-problem replicas.</li>
          <li>Designed a modular prompting architecture combining global system instructions with question-type-specific prompts to preserve source-question intent and enforce generation constraints.</li>
          <li>Developed an evaluation framework combining LLM-based blind-solve verification with deterministic checks for answer-option uniqueness, single-correct-answer constraints, and distractor quality.</li>
          <li>Engineered a deterministic evaluation layer executing in under 1 ms to validate critical answer constraints independently of LLM inference.</li>
          <li>Implemented mathematical chart generation using Recharts and parallel batch processing through Portkey AI Gateway, reducing generation latency by 40%.</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- PROJECTS -->
  <div class="section">
    <div class="section-title">Personal & Hackathon AI Projects</div>
    
    <div class="project-block">
      <div class="project-title-bar">
        <span>Ask Aadil — Stateful Portfolio Agent & Voice Interface <span style="font-size: 8pt; font-weight: 500; color: #2563eb;">[Personal · Sep 2026]</span></span>
        <span class="project-stack">Next.js 16, React 19, TypeScript 5, Web Speech API, Hybrid RAG, Playwright</span>
      </div>
      <ul class="bullets">
        <li>Built a stateful, grounded portfolio conversational agent with hybrid retrieval and voice interface.</li>
        <li>Engineered deterministic state machine routing and epistemic boundaries to prevent hallucinations and temporal conflation.</li>
        <li>Implemented human-in-the-loop action governance with bitwise draft integrity before executing external actions.</li>
        <li>Validated conversational workflows, voice activity detection, and browser interactions with 172 automated test assertions.</li>
      </ul>
    </div>

    <div class="project-block" style="margin-top: 4px;">
      <div class="project-title-bar">
        <span><span style="white-space: nowrap;">Loom AI — B2B Textile Marketplace</span><br><span style="font-size: 8pt; font-weight: 500; color: #64748b; white-space: nowrap;">[Humanity Founders · Aug 2026]</span></span>
        <span class="project-stack">Next.js 16, React 19, TypeScript 5, Express, MongoDB Atlas, LangGraph,<br>Playwright</span>
      </div>
      <ul class="bullets">
        <li>Built a full-stack B2B textile marketplace separating domain entities, use cases, and adapters with a LangGraph procurement agent for semantic requirement matching.</li>
        <li>Implemented Human-in-the-Loop approval for automated restocking and checkout execution before state persistence.</li>
      </ul>
    </div>

    <div class="project-block" style="margin-top: 4px;">
      <div class="project-title-bar">
        <span>Atlas AI — Financial Copilot & SEC EDGAR RAG <span style="font-size: 8pt; font-weight: 500; color: #64748b; white-space: nowrap;">[Humanity Founders · Aug 2026]</span></span>
        <span class="project-stack">Python 3.12, FastAPI, LangGraph, MongoDB Atlas Vector Search, SEC EDGAR API, Telegram Bot</span>
      </div>
      <ul class="bullets">
        <li>Built an asynchronous Telegram-first financial copilot using LangGraph for SEC 10-K/10-Q filing chunking, vector search retrieval, and market volatility background alerts.</li>
      </ul>
    </div>
  </div>

  <!-- EARLIER EXPERIENCE -->
  <div class="section">
    <div class="section-title">Earlier Experience</div>
    <ul class="bullets">
      <li><strong>Digipplus (QA/QC Specialist | Jun 2022 – Sep 2022):</strong> Quality assurance and accuracy validation across educational deliverables.</li>
      <li><strong>InhaltMart Educational Services (SME Mathematics | Oct 2021 – Feb 2022):</strong> Developed and reviewed K-12 mathematics content & step-by-step solutions.</li>
      <li><strong>Graveiens Eduservices (Advanced Math Content Developer | May 2021 – Oct 2021):</strong> Authored advanced math solutions via Brainly CMS with LaTeX formatting.</li>
    </ul>
  </div>

  <!-- EDUCATION -->
  <div class="section">
    <div class="section-title">Education</div>
    <div class="edu-grid">
      <div><strong>B.Tech (Hons.) in Mechanical Engineering</strong> — Lovely Professional University, Punjab</div>
      <div>2013 – 2017 | CGPA: 7.66 / 10</div>
    </div>
    <div class="edu-grid">
      <div><strong>Class XII (CBSE)</strong> — Manas Convent School, Mughalsarai</div>
      <div>2013 | 73.2%</div>
    </div>
    <div class="edu-grid">
      <div><strong>Class X (CBSE)</strong> — Sunbeam School, Mughalsarai</div>
      <div>2011 | CGPA: 9.40</div>
    </div>
  </div>

</body>
</html>`

async function generatePdf() {
  console.log('Generating PDF resume with updated portfolio link via Playwright...')
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  await page.setContent(htmlContent, { waitUntil: 'networkidle' })

  const pdfPath = path.join(__dirname, '../public/resume.pdf')
  
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0.35in',
      bottom: '0.35in',
      left: '0.45in',
      right: '0.45in'
    }
  })

  await browser.close()
  console.log(`✓ Successfully generated updated resume PDF at: ${pdfPath}`)
}

generatePdf().catch(err => {
  console.error('Error generating PDF:', err)
  process.exit(1)
})
