# PORTFOLIO MASTER CHRONOLOGY AUDIT
**Forensic Investigation of Professional Career Chronology, Employment Boundaries & Temporal Consistency**

- **Audit Date:** 2026-11-14
- **Auditor Team:** Principal Software Architect, Senior AI/ML Engineer, Career Chronology Auditor, Data Integrity Specialist
- **Repository Scope:** `C:\Users\HP\OneDrive\Documents\Portfolio`
- **Execution Mode:** READ-ONLY AUDIT (Evidence-Grounded Forensic Assessment)

---

## 1. EXECUTIVE SUMMARY & CANONICAL CHRONOLOGY

A forensic inspection of all career records across the portfolio (`data/experience.ts`, `data/canonical/structuredProfile.ts`, `data/canonical/resumeData.ts`, `data/canonical/journalChapters.ts`, `data/recruiter/recruiterProfile.ts`, `data/canonical/sourceConflicts.ts`, `app/page.tsx`, and `lib/rag/hybridRetriever.ts`) reveals a critical architectural pattern:
**The engineer's actual career consists of four sharply defined, non-overlapping periods.** However, internal layers of the portfolio—most notably `data/canonical/journalChapters.ts` and hardcoded strings in `lib/rag/hybridRetriever.ts` and `lib/rag/askAadilAgent.ts`—have artificially distorted project dates and blurred employment boundaries, shifting 2026 systems into 2025 and shifting late-2025 projects into early 2025.

### Canonical Professional Timeline (Evidence-Grounded Ground Truth)

| Period | Organization / Context | Formal Designation / Title | Type | Primary Projects / Focus | Primary Evidence Source | Verification Status |
|---|---|---|---|---|---|---|
| **May 2021 — Oct 2021** | Graveiens Edu Services Pvt. Ltd. (Brand: Digituala) | Subject Matter Expert (Mathematics) / Advanced Math Content Developer | Remote Employment | K–12 Textbook Questions & Solutions (TBQ), Brainly CMS, GeoGebra, Desmos, Mathcha.io | `resumeData.ts:383`, `structuredProfile.ts`, `sourceConflicts.ts:16` | **VERIFIED** |
| **Oct 2021 — Feb 2022** | InhaltMart Educational Services | Subject Matter Expert (Mathematics) | Remote Employment | Step-by-step math solutions, LaTeX, MathType, TI-83 graphing models, plagiarism auditing | `experience.ts:38`, `resumeData.ts:377` | **VERIFIED** |
| **Jun 2022 — Sep 2022** (earlier: Jul 2022) | DIGIPPLUS | QC K–10 Subject Matter Expert / QA/QC Specialist | Remote Employment | K–10 assessment quality control, distractor validation, copyright integrity | `resumeData.ts:372`, `experience.ts:57` | **VERIFIED** |
| **Sep 2022 — Dec 2023** | Independent Study / Personal Goal Pursuit | Competitive Examination Preparation & Independent Problem Solving | Career Break / Self-Directed | High-level quantitative aptitude, formal deductive logic, analytical problem solving | `research/resume_extracted.txt:26`, `experience.ts:75` | **SUPPORTED** |
| **Jan 2024 — Dec 2025** | Wayground Inc (Quizizz) | **Subject Matter Expert — Mathematics** | Onsite (Bangalore) Employment | US state-standard mathematics content, VoyageMath V1 authoring tool SME testing & bug feedback, KaTeX rendering validation, Figma coordinate geometry visuals (~10-day turnaround support), in-house question creation experiments. **Catalyzed transition with VM Copy Question Generator (Oct–Dec 2025).** | `structuredProfile.ts:18`, `experience.ts:98-282`, `resumeData.ts:251`, `research/resume_extracted.txt:24` | **VERIFIED** |
| **Jan 2026 — Jul 2026** | Wayground Inc (Quizizz) | **AI Engineer — AI/ML Team** | Onsite (Bangalore) Employment | Applied AI systems, full-stack POCs, asynchronous distributed ETL, dynamic schema contracts, multi-model evaluation gates: **Curriculum Transformation Engine**, **AI Worksheets Product POC**, **US Mathematics Item Bank Pipeline (Team)**. | `experience.ts:285-348`, `resumeData.ts:133-249`, `structuredProfile.ts:17` | **VERIFIED** |
| **Aug 2026 — Present** | Independent AI Engineering & Research | **Independent AI Systems Engineer & Researcher** | Independent / Hackathons / Personal Research | Independent systems, hackathons, reliability frameworks: **Loom AI** (Aug 2026), **Atlas AI** (Aug 2026), **OCR Evaluation Platform** (Sep 2026), **Engineering Design Automation (EDA CAD)** (Sep 2026), **AI Application Reliability Platform** (Sep 2026), **Engineering Portfolio & Ask Aadil** (Sep–Nov 2026), **Solace AI** (Nov 2026). | `experience.ts:351-542`, `resumeData.ts:291-365`, GitHub repositories | **VERIFIED** |

---

## 2. SEVERITY-CLASSIFIED CHRONOLOGICAL FINDINGS

### P0-1: Artificial Backdating of AI Engineering Systems in `data/canonical/journalChapters.ts`
- **Location:** `data/canonical/journalChapters.ts` (lines 180–430)
- **Current Erroneous Claim:**
  - Chapter 11 (VM Copy): Stated as `Feb 2025`
  - Chapter 13 (AI Worksheets): Stated as `Apr 2025 — May 2025`
  - Chapter 14 (Item Bank): Stated as `Jun 2025 — Aug 2025`
  - Chapter 15 (Curriculum ETL): Stated as `Sep 2025 — Nov 2025`
  - Chapter 16 (Loom AI): Stated as `Dec 2025`
  - Chapter 17 (Atlas AI): Stated as `Jan 2026`
  - Chapter 18 (EDA CAD): Stated as `Feb 2026 — Apr 2026`
  - Chapter 19 (AI Reliability): Stated as `May 2026 — Jul 2026`
- **Contradicting Primary Evidence:**
  1. `data/experience.ts` lines 94–96, 285–287, 351–356 explicitly documents: Wayground employment as SME was Jan 2024 – Dec 2025; AI/ML Team formal role was Jan 2026 – Jul 2026.
  2. Loom AI and Atlas AI were built for Humanity Founders Hackathons in **August 2026** (`data/experience.ts:359,382`).
  3. AI Worksheets, Item Bank, and Curriculum ETL were built during the formal AI/ML Team tenure in **2026** (`data/experience.ts:289,310,331`).
  4. VM Copy was developed in **October–December 2025** as an independent initiative during the SME tenure, which catalyzed the January 2026 internal transfer.
- **Impact:** Any component ingesting `data/canonical/journalChapters.ts` (such as Ask Aadil's RAG index) retrieves completely false dates, stating that Aadil built Loom AI in 2025 and was an AI Engineer in mid-2025 while still an SME.
- **Remediation Requirement:** Align all chapter dates in `data/canonical/journalChapters.ts` to their canonical dates.

### P0-2: Hardcoded Erroneous Chronology in `lib/rag/hybridRetriever.ts` & `lib/rag/askAadilAgent.ts`
- **Location:**
  - `lib/rag/hybridRetriever.ts` lines 228, 245, 261
  - `lib/rag/askAadilAgent.ts` lines 1718–1720
- **Current Erroneous Code:**
  ```typescript
  // hybridRetriever.ts line 228:
  content: `CAREER EVOLUTION — STAGE 3: FROM GENERATION TO EVALUATION (Early 2025)
  // line 245:
  content: `CAREER EVOLUTION — STAGE 4: DISTRIBUTED PIPELINES & OPTIMIZATION (Mid 2025)
  // line 261:
  content: `CAREER EVOLUTION — STAGE 5: DETERMINISTIC ENGINEERING & RELIABILITY (Late 2025 — 2026)
  
  // askAadilAgent.ts line 1718-1720:
  3. **From Generation to Evaluation (Early 2025):** ... Built VM Copy...
  4. **Distributed Pipelines (Mid 2025):** Scaled from single tools to distributed systems (AI Worksheets 2D solvers, Item Bank visual routing, and Celery ETL with 3-tier integrity).
  5. **Deterministic Engineering & Governed Reliability (2026):** ...
  ```
- **Contradicting Primary Evidence:** The author's actual career trajectory places VM Copy in **Late 2025 (Oct–Dec 2025)** and distributed pipelines (AI Worksheets, Item Bank, Curriculum ETL) in **2026 (Jan–Jul 2026)**.
- **Impact:** Directly causes the Ask Aadil conversational failure identified in Section 13 of the audit instructions.
- **Remediation Requirement:** Replace hardcoded static blocks with canonical stage records reflecting actual chronological boundaries.

### P1-1: Discrepancy in Digipplus End Date
- **Location:** `data/experience.ts:58` vs `data/canonical/resumeData.ts:372` vs `research/resume_extracted.txt:28`
- **Discrepancy:**
  - `data/experience.ts`: `Jun 2022 — Jul 2022` (2 months)
  - `data/canonical/resumeData.ts` & Resume PDF: `Jun 2022 – Sep 2022` (4 months)
- **Primary Source:** Verified Resume PDF states `Jun 2022 – Sep 2022`.
- **Classification:** **SUPPORTED** by resume; `data/experience.ts` has an unverified truncation (`Jul 2022`).
- **Remediation Requirement:** Standardize `experience.ts` to `Jun 2022 — Sep 2022`.

### P1-2: Inconsistent Period Formats Across Timeline vs Canonical Profile
- **Location:** `data/experience.ts:261` states VM Copy as `period: '2026'`, while `data/canonical/sourceConflicts.ts:80` and `lib/rag/askAadilAgent.ts:1493` correctly note VM Copy was developed in `Oct–Dec 2025`.
- **Analysis:** In `data/experience.ts`, the milestone `wayground-m08-vm-copy-generator` has `period: '2026'`, confusing the project completion/deployment date with its development period (Oct–Dec 2025).
- **Remediation Requirement:** Standardize VM Copy development period to `Oct 2025 – Dec 2025 (Deployed 2026)`.

---

## 3. EMPLOYMENT BOUNDARY AUDIT

### Boundary A: Mathematics SME (Jan 2024 — Dec 2025)
- **Role:** Subject Matter Expert — Mathematics
- **Organization:** Wayground Inc (Bengaluru, India)
- **Scope of Responsibility:** Pedagogical validation of US standards, KaTeX rendering QA, bug reporting for VoyageMath Content Builder V1, Figma visual coordinate geometry assets under ~10-day turnaround cycles.
- **Inadmissible Claims:** The portfolio must never claim that Aadil was an "AI Engineer" or "Software Engineer" during 2024 or early 2025, nor claim that he designed or built VoyageMath Content Builder V1.
- **Boundary Verification:** In `data/experience.ts:130-136` and `lib/rag/askAadilAgent.ts:1516-1521`, the boundary is strictly verified: "The VoyageMath Engineering team built VoyageMath; I contributed as SME tester and workflow advisor."

### Boundary B: AI/ML Team (Jan 2026 — Jul 2026)
- **Role:** AI Engineer — AI/ML Team
- **Organization:** Wayground Inc (Bengaluru, India)
- **Scope of Responsibility:** Applied AI application development, deterministic evaluation layers, asynchronous ETL pipelines, Map-Reduce curriculum extraction, dynamic Pydantic contracts, LaTeX/TikZ headless compilers, and team item-bank image routing gates.
- **Hard Exit Date:** **July 2026**. Professional employment at Wayground concluded in July 2026.
- **Inadmissible Claims:** The portfolio must never extend Wayground employment into August 2026 or beyond.

### Boundary C: Independent AI Engineering & Research (Aug 2026 — Present)
- **Role:** Independent AI Systems Engineer & Researcher
- **Context:** Post-employment technical growth, public hackathons, independent engineering tools, and personal systems research.
- **Projects Owned:**
  - *Loom AI* (Humanity Founders Hackathon, Aug 2026)
  - *Atlas AI* (Humanity Founders Hackathon, Aug 2026)
  - *OCR Evaluation Platform* (Independent Project, Sep 2026)
  - *Engineering Design Automation (EDA CAD)* (Independent Project, Sep 2026)
  - *AI Application Reliability Platform* (Independent Project, Sep 2026)
  - *Engineering Portfolio & Ask Aadil* (Personal Project, Sep–Nov 2026)
  - *Solace AI* (Solace Hackathon, Nov 2026)
- **Boundary Verification:** None of these projects may be described as Wayground work or client engagements.

---

## 4. CONCLUSION & CANONICAL SIGN-OFF
The master career chronology is mathematically consistent when anchored to:
1. Mathematics Content & Validation: **May 2021 — Sep 2022**
2. Independent Quantitative Discipline: **Sep 2022 — Dec 2023**
3. Wayground Mathematics SME: **Jan 2024 — Dec 2025**
4. Wayground AI Engineer (AI/ML Team): **Jan 2026 — Jul 2026**
5. Independent AI Systems Engineering: **Aug 2026 — Present**

The chronological contradictions currently exhibited by Ask Aadil stem directly from the erroneous dates in `data/canonical/journalChapters.ts` and the hardcoded stage strings in `lib/rag/hybridRetriever.ts`.
