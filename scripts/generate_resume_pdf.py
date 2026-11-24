import asyncio
import os
from playwright.async_api import async_playwright

html_content = """<!DOCTYPE html>
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
      font-size: 8.6pt;
      line-height: 1.35;
      color: #1e293b;
      background: #ffffff;
      -webkit-font-smoothing: antialiased;
    }

    .page {
      padding: 0.35in 0.45in 0.35in 0.45in;
      min-height: 10.9in;
      page-break-after: always;
      position: relative;
    }

    .page:last-child {
      page-break-after: avoid;
    }

    a {
      color: #1e293b;
      text-decoration: none;
    }

    /* HEADER */
    header {
      border-bottom: 2px solid #0f172a;
      padding-bottom: 6px;
      margin-bottom: 9px;
    }

    .name {
      font-size: 21pt;
      font-weight: 700;
      color: #0f172a;
      letter-spacing: -0.5px;
      line-height: 1.1;
    }

    .title {
      font-size: 10.5pt;
      font-weight: 700;
      color: #1d4ed8;
      margin-top: 3px;
      margin-bottom: 6px;
    }

    .contact-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      font-size: 8.3pt;
      color: #334155;
      line-height: 1.35;
    }

    .contact-bar strong {
      color: #0f172a;
    }

    /* SECTION */
    .section {
      margin-bottom: 9px;
    }

    .section-title {
      font-size: 9.6pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #0f172a;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 2px;
      margin-bottom: 6px;
    }

    .summary-text {
      font-size: 8.5pt;
      color: #334155;
      text-align: justify;
      line-height: 1.38;
    }

    /* TECHNICAL SKILLS TABLE */
    .skills-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 8.2pt;
      margin-top: 2px;
    }

    .skills-table th {
      background-color: #f1f5f9;
      color: #0f172a;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-size: 7.8pt;
      text-align: left;
      padding: 4px 8px;
      border: 1px solid #cbd5e1;
    }

    .skills-table td {
      padding: 4.5px 8px;
      border: 1px solid #e2e8f0;
      vertical-align: top;
      color: #334155;
      line-height: 1.3;
    }

    .skills-table tr:nth-child(even) td {
      background-color: #f8fafc;
    }

    .skills-table td.domain-col {
      font-weight: 700;
      color: #0f172a;
      width: 25%;
      white-space: nowrap;
    }

    .skills-table td.tech-col {
      width: 75%;
    }

    /* ROLES & COMPANIES */
    .role-bar {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-left: 3.5px solid #2563eb;
      padding-left: 8px;
      margin-bottom: 6px;
      margin-top: 4px;
    }

    .role-title {
      font-size: 9.4pt;
      font-weight: 700;
      color: #0f172a;
    }

    .role-meta {
      font-size: 8.2pt;
      font-weight: 500;
      color: #475569;
      white-space: nowrap;
    }

    /* PROJECT BLOCKS */
    .project-block {
      margin-top: 5px;
      margin-bottom: 6px;
    }

    .project-title-bar {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-size: 8.9pt;
      font-weight: 700;
      color: #0f172a;
    }

    .project-tag {
      font-size: 8.2pt;
      font-weight: 600;
      color: #2563eb;
      margin-left: 4px;
    }

    .project-stack {
      font-size: 8pt;
      font-weight: 500;
      color: #475569;
      font-style: italic;
      margin-top: 1px;
      margin-bottom: 2px;
    }

    .project-stack-right {
      font-size: 7.9pt;
      font-weight: 500;
      color: #475569;
      font-style: italic;
      white-space: nowrap;
    }

    /* BULLETS */
    ul.bullets {
      list-style-type: disc;
      margin-left: 16px;
      margin-top: 2px;
    }

    ul.bullets li {
      font-size: 8.35pt;
      color: #334155;
      margin-bottom: 2.2px;
      line-height: 1.34;
      text-align: justify;
    }

    /* EDUCATION TABLE */
    .edu-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 8.3pt;
      margin-top: 4px;
    }

    .edu-table th {
      background-color: #f1f5f9;
      color: #0f172a;
      font-weight: 700;
      font-size: 7.8pt;
      text-align: left;
      padding: 4px 8px;
      border: 1px solid #cbd5e1;
    }

    .edu-table th.score-hdr {
      text-align: right;
    }

    .edu-table td {
      padding: 5px 8px;
      border: 1px solid #e2e8f0;
      color: #334155;
    }

    .edu-table tr:nth-child(even) td {
      background-color: #f8fafc;
    }

    .edu-table td.degree-col {
      font-weight: 600;
      color: #0f172a;
      width: 72%;
    }

    .edu-table td.score-col {
      width: 28%;
      text-align: right;
      font-weight: 500;
      color: #334155;
      white-space: nowrap;
    }
  </style>
</head>
<body>

  <!-- ==================== PAGE 1 ==================== -->
  <div class="page">
    <header>
      <div class="name">Mohemmed Aadil Khurshid</div>
      <div class="title">AI Engineer | Python | LLM &amp; Agentic Systems | Full-Stack</div>
      <div class="contact-bar">
        <div><strong>Email:</strong> <a href="mailto:aadil.khurshid95@gmail.com">aadil.khurshid95@gmail.com</a></div>
        <div>|</div>
        <div><strong>Phone:</strong> +91-7973949541</div>
        <div>|</div>
        <div><strong>Location:</strong> Varanasi, UP, India</div>
      </div>
      <div class="contact-bar" style="margin-top: 2px;">
        <div><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/mohemmed-aadil-khurshid/" target="_blank">linkedin.com/in/mohemmed-aadil-khurshid</a></div>
        <div>|</div>
        <div><strong>GitHub:</strong> <a href="https://github.com/aadil-lang" target="_blank">github.com/aadil-lang</a></div>
      </div>
      <div class="contact-bar" style="margin-top: 2px;">
        <div><strong>Portfolio:</strong> <a href="https://portfolio-ecru-five-5vd5okcvgi.vercel.app" target="_blank">portfolio-ecru-five-5vd5okcvgi.vercel.app</a></div>
      </div>
    </header>

    <div class="section">
      <div class="section-title">Professional Summary</div>
      <p class="summary-text">
        AI Engineer with around 1 year of hands-on AI engineering experience and 4 years of overall professional experience spanning AI application development, backend engineering, full-stack development, and mathematics domain expertise. Experienced in building LLM-powered applications, RAG pipelines, and agentic workflows using Python, FastAPI, LangGraph, Playwright, and modern LLM tooling. Focused on combining LLM capabilities with deterministic logic, structured workflows, validation, automated testing, and human-in-the-loop controls to build reliable AI systems from architecture through implementation and deployment.
      </p>
    </div>

    <div class="section">
      <div class="section-title">Technical Skills</div>
      <table class="skills-table">
        <thead>
          <tr>
            <th>Domain</th>
            <th>Technologies &amp; Competencies</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="domain-col">AI &amp; LLM Systems</td>
            <td class="tech-col">LLMs, LangChain, LangGraph, RAG, Agentic Workflows, Tool Calling, LLM Orchestration, Prompt Engineering, Structured Outputs, Vision AI</td>
          </tr>
          <tr>
            <td class="domain-col">Backend &amp; Python</td>
            <td class="tech-col">FastAPI, Python 3.12, Node.js, Express.js, REST APIs, Pydantic v2, Pandas, NumPy, JWT Authentication</td>
          </tr>
          <tr>
            <td class="domain-col">Frontend &amp; Web</td>
            <td class="tech-col">React 19, Next.js 16 (App Router), TypeScript 5, Vite, Tailwind CSS, KaTeX, HTML5/CSS3</td>
          </tr>
          <tr>
            <td class="domain-col">Testing &amp; Automation</td>
            <td class="tech-col">Playwright (E2E &amp; Visual QA), pytest, Vitest, Automated Testing, API Verification, Git/GitHub</td>
          </tr>
          <tr>
            <td class="domain-col">Data &amp; Infra</td>
            <td class="tech-col">MongoDB, MongoDB Atlas Vector Search, SEC EDGAR API, Docker, Docker Compose, TeX Live (pdflatex)</td>
          </tr>
          <tr>
            <td class="domain-col">AI Dev Tooling</td>
            <td class="tech-col">Cursor, Claude Code, OpenAI Codex, Antigravity, Ollama, Model Context Protocol (MCP)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section">
      <div class="section-title">Professional Experience</div>
      <div class="role-bar">
        <div class="role-title">AI Engineer – AI/ML Team | WAYGROUND Inc</div>
        <div class="role-meta">Jan 2026 – Jul 2026 | Bengaluru, India</div>
      </div>

      <div class="project-block">
        <div class="project-title-bar">Curriculum Transformation Engine – Enterprise ETL Pipeline</div>
        <div class="project-stack">Python 3.12, Claude 3.5 Sonnet, Pydantic v2, Pandas, ThreadPoolExecutor</div>
        <ul class="bullets">
          <li>Engineered an asynchronous Map-Reduce ETL pipeline using Claude 3.5 Sonnet to transform multi-megabyte unstructured K-12 state-standard PDFs into normalized structured datasets.</li>
          <li>Designed dynamic schema derivation from customer sample CSV contracts, extracting column hierarchies, field types, and taxonomy rules.</li>
          <li>Implemented layered validation using reviewer/critic LLM validation, deterministic Pydantic row guards, grade normalization, and automated post-extraction CSV auditing.</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- ==================== PAGE 2 ==================== -->
  <div class="page">
    <div class="section" style="margin-top: 4px;">
      <div class="project-block">
        <div class="project-title-bar">
          <span>AI Worksheets – Product POC</span>
          <span class="project-stack-right">FastAPI, Python, Docker, TeX Live, React 19, WeasyPrint, Portkey</span>
        </div>
        <ul class="bullets">
          <li>Independently researched and built an educational content synthesis platform for TEKS- and Common Core-aligned worksheets, reducing workflow times from 2 hours to under 3 minutes.</li>
          <li>Solved geometric visual-quality issues by compiling LLM-generated TikZ through headless TeX Live (pdflatex/pdftoppm) to produce high-resolution, accurate diagrams.</li>
          <li>Developed deterministic Crossword and Maze generation workflows using algorithmic backtracking approaches rather than generative approximations.</li>
        </ul>
      </div>

      <div class="project-block" style="margin-top: 8px;">
        <div class="project-title-bar">US Mathematics Item Bank Generation</div>
        <div class="project-stack">Python, LangGraph, Pydantic, React, TypeScript, LLMs, Vision Models, SVG, TikZ, ILP</div>
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

    <div class="section" style="margin-top: 10px;">
      <div class="role-bar">
        <div class="role-title">Subject Matter Expert – Mathematics | WAYGROUND Inc</div>
        <div class="role-meta">Jan 2024 – Dec 2025 | Bengaluru, India</div>
      </div>
      <ul class="bullets" style="margin-bottom: 8px;">
        <li>Developed and reviewed K-12 mathematics content aligned with U.S. state standards, ensuring mathematical accuracy, curriculum alignment, and solution quality.</li>
        <li>Created and validated mathematical questions, answer choices, and step-by-step solutions across different skills and difficulty levels.</li>
        <li>Worked with KaTeX for mathematical content formatting and created educational diagrams using Figma.</li>
      </ul>

      <div class="project-block">
        <div class="project-title-bar">VM Copy Question Generator</div>
        <div class="project-stack">Next.js 16, TypeScript 5, Tailwind CSS, OpenAI, Portkey AI Gateway, KaTeX, Recharts, Vitest</div>
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

  <!-- ==================== PAGE 3 ==================== -->
  <div class="page">
    <div class="section">
      <div class="section-title">Personal &amp; Hackathon AI Projects</div>

      <div class="project-block">
        <div class="project-title-bar">
          <span>Ask Aadil – Stateful Portfolio Agent &amp; Voice Interface <span class="project-tag">[Personal | Sep 2026]</span></span>
        </div>
        <div class="project-stack">Next.js 16, React 19, TypeScript 5, Web Speech API, Hybrid RAG, Playwright</div>
        <ul class="bullets">
          <li>Built a stateful, grounded portfolio conversational agent with hybrid retrieval and voice interface.</li>
          <li>Engineered deterministic state machine routing and epistemic boundaries to prevent hallucinations and temporal conflation.</li>
          <li>Implemented human-in-the-loop action governance with bitwise draft integrity before executing external actions.</li>
          <li>Validated conversational workflows, voice activity detection, and browser interactions with 172 automated test assertions.</li>
        </ul>
      </div>

      <div class="project-block" style="margin-top: 7px;">
        <div class="project-title-bar">
          <span>Loom AI – B2B Textile Marketplace <span class="project-tag">[Humanity Founders | Aug 2026]</span></span>
        </div>
        <div class="project-stack">Next.js 16, React 19, TypeScript 5, Express, MongoDB Atlas, LangGraph, Playwright</div>
        <ul class="bullets">
          <li>Built a full-stack B2B textile marketplace separating domain entities, use cases, and adapters with a LangGraph procurement agent for semantic requirement matching.</li>
          <li>Implemented Human-in-the-Loop approval for automated restocking and checkout execution before state persistence.</li>
        </ul>
      </div>

      <div class="project-block" style="margin-top: 7px;">
        <div class="project-title-bar">
          <span>Atlas AI – Financial Copilot &amp; SEC EDGAR RAG <span class="project-tag">[Humanity Founders | Aug 2026]</span></span>
        </div>
        <div class="project-stack">Python 3.12, FastAPI, LangGraph, MongoDB Atlas Vector Search, SEC EDGAR API, Telegram Bot</div>
        <ul class="bullets">
          <li>Built an asynchronous Telegram-first financial copilot using LangGraph for SEC 10-K/10-Q filing chunking, vector search retrieval, and market volatility background alerts.</li>
        </ul>
      </div>

      <div class="project-block" style="margin-top: 7px;">
        <div class="project-title-bar">
          <span>Solace AI – AI-Powered Emotional Wellness Companion <span class="project-tag">[Hackathon | Nov 2025]</span></span>
        </div>
        <div class="project-stack">Python, FastAPI, React Native, Expo, TypeScript, Supabase, PostgreSQL, Google Gemini</div>
        <ul class="bullets">
          <li>Developed an AI-powered emotional wellness companion focused on emotionally contextual conversations, mood check-ins, and supportive interactions.</li>
          <li>Implemented streaming AI conversations using Google Gemini and FastAPI with Server-Sent Events (SSE).</li>
          <li>Built a consent-based emotional memory system supporting memory recall, revocation, and deletion for personalized conversational continuity.</li>
          <li>Implemented Rant Mode, voice interactions, guided breathing exercises, and crisis detection with relevant support resources.</li>
          <li>Integrated Supabase authentication, PostgreSQL persistence, and Row-Level Security (RLS) to protect user data.</li>
        </ul>
      </div>
    </div>

    <div class="section" style="margin-top: 9px;">
      <div class="section-title">Earlier Experience</div>
      <ul class="bullets">
        <li><strong>Digipplus</strong> (QA/QC Specialist | Jun 2022 – Sep 2022): Quality assurance and accuracy validation across educational deliverables.</li>
        <li><strong>InhaltMart Educational Services</strong> (SME Mathematics | Oct 2021 – Feb 2022): Developed and reviewed K-12 mathematics content &amp; step-by-step solutions.</li>
        <li><strong>Graveiens Eduservices</strong> (Advanced Math Content Developer | May 2021 – Oct 2021): Authored advanced math solutions via Brainly CMS with LaTeX formatting.</li>
      </ul>
    </div>

    <div class="section" style="margin-top: 9px;">
      <div class="section-title">Education</div>
      <table class="edu-table">
        <thead>
          <tr>
            <th>Qualification &amp; Institution</th>
            <th class="score-hdr">Timeline &amp; Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="degree-col"><strong>B.Tech (Hons.) in Mechanical Engineering</strong> – Lovely Professional University, Punjab</td>
            <td class="score-col"><strong>2013–2017</strong> | CGPA: 7.66/10</td>
          </tr>
          <tr>
            <td class="degree-col"><strong>Class XII (CBSE)</strong> – Manas Convent School, Mughalsarai</td>
            <td class="score-col"><strong>2013</strong> | 73.2%</td>
          </tr>
          <tr>
            <td class="degree-col"><strong>Class X (CBSE)</strong> – Sunbeam School, Mughalsarai</td>
            <td class="score-col"><strong>2011</strong> | CGPA: 9.40</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</body>
</html>
"""

async def main():
    print("Generating resume PDF with Playwright...")
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.set_content(html_content, wait_until="networkidle")

        pdf_path = os.path.abspath("public/resume.pdf")
        await page.pdf(
            path=pdf_path,
            format="A4",
            print_background=True,
            display_header_footer=True,
            header_template="<div></div>",
            footer_template="""
            <div style="font-size: 7.5pt; font-family: 'Inter', system-ui, -apple-system, sans-serif; color: #64748b; width: 100%; display: flex; justify-content: space-between; padding-left: 0.45in; padding-right: 0.45in; box-sizing: border-box;">
              <span>Mohemmed Aadil Khurshid — Resume</span>
              <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
            </div>
            """,
            margin={"top": "0.15in", "bottom": "0.45in", "left": "0in", "right": "0in"}
        )
        await browser.close()
        print(f"SUCCESS: Resume PDF generated at: {pdf_path}")

if __name__ == "__main__":
    asyncio.run(main())
