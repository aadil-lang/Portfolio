import { CorpusDocument, CorpusChunk, CorpusManifest } from './types'

export const CORPUS_DOCUMENTS: CorpusDocument[] = [
  {
    id: 'doc-profile',
    projectId: 'profile',
    title: 'Mohemmed Aadil Khurshid — Professional Engineering Profile',
    documentType: 'profile',
    sourceReference: 'data/canonical/structuredProfile.ts',
    category: 'Engineering Profile & Positioning',
    sourceVersion: 'v2026.11',
    verificationStatus: 'verified',
    content: `Mohemmed Aadil Khurshid is an AI Systems Engineer with a B.Tech Honours in Mechanical Engineering (2017). His professional career progressed from Mathematics Content SME into AI application engineering, asynchronous ETL pipelines, deterministic CAD automation, and governed agentic reliability platforms. Professional engineering employment at Wayground concluded in July 2026. From August 2026 to present, he has been conducting Independent AI Engineering & Research across multiple projects.`
  },
  {
    id: 'doc-timeline',
    projectId: 'profile',
    title: 'Career Progression Timeline & Temporal Milestones',
    documentType: 'profile',
    sourceReference: 'data/experience.ts',
    category: 'Career Progression',
    sourceVersion: 'v2026.11',
    verificationStatus: 'verified',
    content: `Aadil's career spans 5 defined evolution stages: Stage 1 (2017-2021) Foundational Mechanical Engineering & Math SME; Stage 2 (2021-2023) Curriculum Systems & Assessment Engineering; Stage 3 (April 2024 - July 2026) AI Systems Engineering at Wayground; Stage 4 (Jan 2026 - July 2026) Multi-model LLM Orchestration & Evaluation; Stage 5 (August 2026 - Present) Independent AI Engineering & Research focusing on deterministic solvers, CAD automation, and agentic reliability.`
  },
  {
    id: 'doc-eda-spec',
    projectId: 'design-automation',
    title: 'Engineering Design Automation — System Architecture & Solvers',
    documentType: 'specification',
    sourceReference: 'data/projects.ts#engineering-design-automation',
    category: 'CAD & Deterministic Solvers',
    sourceVersion: 'v2.1',
    verificationStatus: 'verified',
    content: `Engineering Design Automation (EDA CAD) pairs natural language specification ingestion with pure deterministic Python engineering physics. Instead of allowing generative LLMs to hallucinate mechanical dimensions, closed-form Saint-Venant pure torsion formulas (tau = 16*T / (pi*d^3)) and von Mises shear yield criteria size stepped transmission shafts, while OpenCascade/CadQuery constructs watertight ISO 10303 STEP BRep solids.`
  },
  {
    id: 'doc-eda-physics',
    projectId: 'design-automation',
    title: 'EDA CAD — Shaft Sizing Formulas & Keyway Geometry',
    documentType: 'architecture',
    sourceReference: 'components/evidence/CadModelViewer.tsx',
    category: 'Mechanical Engineering Physics',
    sourceVersion: 'v2.1',
    verificationStatus: 'verified',
    content: `For design torque T = 250.0 N*m and allowable shear stress tau_allow = 60 MPa, minimum required diameter is d_req = (16*T / (pi*tau_allow))^(1/3) = 27.68 mm. Applying ISO standard diameter series quantizes the main transmission seat to D = 30.00 mm (safety factor N = 1.27). Bearing seats are sized at D = 25.0 mm (L = 40 mm each). The central section includes a DIN 6885 parallel keyway pocket (b = 8 mm, h = 4 mm, l = 50 mm).`
  },
  {
    id: 'doc-eda-metrics',
    projectId: 'design-automation',
    title: 'EDA CAD — Volume Invariant & Pytest Verification Registry',
    documentType: 'metric_registry',
    sourceReference: 'data/canonical/quantitativeClaims.ts#claim-eda-424-tests',
    category: 'Verification Metrics',
    sourceVersion: 'v2.1',
    verificationStatus: 'verified',
    content: `The EDA test harness contains 424 automated pytests passing across 28 test suites in Docker. Gross analytical stepped volume is 95,818.58 mm^3. Subtracting the DIN 6885 keyway slot (1,600.00 mm^3) yields net nominal theoretical volume of 94,218.58 mm^3. OpenCascade GProp_GProps BRep mass property integral matches 94,218.58 mm^3 with relative calculus divergence < 10^-6 (0.0000%). Disclaimer: This verifies software calculus consistency between closed-form physics and CAD boundary representations; it does NOT represent physical CNC manufacturing machining tolerances.`
  },
  {
    id: 'doc-solace-overview',
    projectId: 'solace-ai',
    title: 'Solace AI — Real-Time Voice Companion & Safety Architecture',
    documentType: 'case_study',
    sourceReference: 'data/projects.ts#solace-ai',
    category: 'Mental Health AI & Speech Systems',
    sourceVersion: 'v1.4',
    verificationStatus: 'verified',
    content: `Solace AI is an empathetic voice companion and mental health platform built independently for the Solace Hackathon. The system combines multi-tiered crisis safety screening, low-latency duplex voice interaction via WebSockets, CBT reflection exercises, AES-256 local-first encrypted privacy storage, and offline emergency safety planning with direct access to the 988 lifeline.`
  },
  {
    id: 'doc-solace-metrics',
    projectId: 'solace-ai',
    title: 'Solace AI — Latency, Verification Checks & Media Evidence',
    documentType: 'metric_registry',
    sourceReference: 'data/canonical/quantitativeClaims.ts#claim-solace-latency',
    category: 'Verification Metrics',
    sourceVersion: 'v1.4',
    verificationStatus: 'verified',
    content: `Solace AI features sub-2ms deterministic crisis screening triaging high-risk intent before LLM generation. Complete automated verification comprises 102 checks across 10 test suites (52 backend safety and endpoint tests + 50 mobile React Native assertions). The product walkthrough is demonstrated via solace_demo.mp4 (exact file size 3.84 MB / 4,028,398 bytes) configured with preload='none' to guarantee zero initial page-load data transfer.`
  },
  {
    id: 'doc-ocr-overview',
    projectId: 'ocr-evaluator',
    title: 'OCR Evaluator & Robustness Testing Platform — Architecture',
    documentType: 'specification',
    sourceReference: 'data/projects.ts#ocr-evaluator',
    category: 'AI Evaluation & Robustness Testing',
    sourceVersion: 'v1.0',
    verificationStatus: 'verified',
    content: `OCR Evaluator is an automated document accuracy evaluation and robustness testing platform built independently in September 2026. It evaluates OCR engines across Character Error Rate (CER), Word Error Rate (WER), critical-field matching, and confidence calibration. It features synthetic perturbation pipelines testing model degradation across 5 distinct axes: gaussian blur, salt-and-pepper noise, geometric rotation, contrast attenuation, and JPEG compression artifacts.`
  },
  {
    id: 'doc-ocr-metrics',
    projectId: 'ocr-evaluator',
    title: 'OCR Evaluator — Test Count & Decision Classification',
    documentType: 'metric_registry',
    sourceReference: 'data/canonical/quantitativeClaims.ts#claim-ocr-tests',
    category: 'Verification Metrics',
    sourceVersion: 'v1.0',
    verificationStatus: 'verified',
    content: `The OCR Evaluator platform is backed by 154 automated tests: 134 backend pytest unit and pipeline tests across 12 suites, plus 20 frontend UI component assertions. It categorizes extracted document reliability into three operational gates: PASS (CER < 2.0%, critical fields 100%), REVIEW (CER 2.0-8.0%), and FAIL (CER > 8.0% or missing critical fields). Under severe noise, baseline CER degrades from 0.8% to 14.6%, proving the need for preprocessing filters.`
  },
  {
    id: 'doc-ai-reliability',
    projectId: 'ai-reliability',
    title: 'AI Application Reliability & Browser QA — Governance Platform',
    documentType: 'architecture',
    sourceReference: 'data/projects.ts#ai-reliability',
    category: 'Agent Governance & Testing',
    sourceVersion: 'v1.2',
    verificationStatus: 'verified',
    content: `AI Application Reliability & Browser QA is a local-first browser testing and agentic governance platform. It pairs local Ollama Qwen 2.5 Coder and Playwright headless Chromium with deterministic behavioral contracts. To prevent unregulated agents from executing unverified code patches, it incorporates Fisher Information covariance uncertainty estimation (forcing abstention when uncertain), a mandatory human-in-the-loop governance authorization gate, and an append-only SHA-256 provenance ledger.`
  },
  {
    id: 'doc-ai-reliability-metrics',
    projectId: 'ai-reliability',
    title: 'AI Reliability — Test Harness & Live Target Verification',
    documentType: 'metric_registry',
    sourceReference: 'data/canonical/quantitativeClaims.ts#claim-ai-reliability-tests',
    category: 'Verification Metrics',
    sourceVersion: 'v1.2',
    verificationStatus: 'verified',
    content: `The AI Reliability platform is verified by 205+ automated tests (158 backend test suites + 47 governance and E2E browser automation tests) in backend/tests/. It dogfoods against VM Copy Question Generator running on port 3000 as a live verification target, detecting layout shifts and prompt regressions deterministically.`
  },
  {
    id: 'doc-atlas-ai',
    projectId: 'atlas-ai',
    title: 'Atlas AI — Financial Multi-Agent Orchestration & SEC Analysis',
    documentType: 'case_study',
    sourceReference: 'data/projects.ts#atlas-ai',
    category: 'Multi-Agent Systems & Financial AI',
    sourceVersion: 'v1.8',
    verificationStatus: 'verified',
    content: `Atlas AI is an enterprise financial multi-agent intelligence platform. Built with LangGraph StateGraph, it orchestrates specialized agent nodes for SEC EDGAR 10-K/10-Q filing ingestion, financial statement analysis, tabular data extraction, and executive insider trading alerts. It enforces human-in-the-loop authorization gates before executing proactive outbound notifications.`
  },
  {
    id: 'doc-atlas-metrics',
    projectId: 'atlas-ai',
    title: 'Atlas AI — Test Suite Reconciliation & Scope Distinction',
    documentType: 'metric_registry',
    sourceReference: 'data/canonical/quantitativeClaims.ts#claim-atlas-tests-spec',
    category: 'Verification Metrics',
    sourceVersion: 'v1.8',
    verificationStatus: 'qualified',
    content: `Atlas AI test reconciliation: The original MVP test suite contained 59 pytests validating core LangGraph router nodes. The subsequent expanded enterprise release contains 178 automated pytests validating full SEC EDGAR chunkers, vector search retrievers, and background alert worker lifespan. Both counts are genuine and represent different phases of system maturity.`
  },
  {
    id: 'doc-vm-copy',
    projectId: 'vm-copy',
    title: 'VM Copy Question Generator — Deterministic Guardrails',
    documentType: 'specification',
    sourceReference: 'data/projects.ts#vm-copy',
    category: 'Deterministic Assessment Generation',
    sourceVersion: 'v2.0',
    verificationStatus: 'verified',
    content: `VM Copy Question Generator was built independently at Wayground between April 2024 and September 2024. Standard LLMs hallucinate duplicate options or multiple correct answers in math items. VM Copy implements deterministic client guardrails: enforces exactly 4 unique options, verifies exactly one correct answer flag, validates distractor rationales, and guarantees mathematical consistency without secondary model dependency.`
  }
]

// Helper token counter based on whitespace and punctuation splitting
function calculateTokens(text: string): number {
  return text.trim().split(/\s+|[.,;!?()[\]{}"'`:]+/).filter(Boolean).length
}

export const CORPUS_CHUNKS: CorpusChunk[] = [
  // --- doc-profile Chunks ---
  {
    id: 'chunk-profile-01',
    documentId: 'doc-profile',
    projectId: 'profile',
    sectionTitle: 'Background & Educational Foundation',
    chunkIndex: 0,
    text: `Mohemmed Aadil Khurshid is an AI Systems Engineer with a B.Tech Honours in Mechanical Engineering (2017). His professional career progressed from Mathematics Content SME into AI application engineering, asynchronous ETL pipelines, deterministic CAD automation, and governed agentic reliability platforms.`,
    tokenCount: calculateTokens(`Mohemmed Aadil Khurshid is an AI Systems Engineer with a B.Tech Honours in Mechanical Engineering (2017). His professional career progressed from Mathematics Content SME into AI application engineering, asynchronous ETL pipelines, deterministic CAD automation, and governed agentic reliability platforms.`),
    charCount: 295,
    sourceProvenance: 'data/canonical/structuredProfile.ts#education',
    tags: ['profile', 'education', 'mechanical-engineering', 'background'],
    verificationStatus: 'verified'
  },
  {
    id: 'chunk-profile-02',
    documentId: 'doc-profile',
    projectId: 'profile',
    sectionTitle: 'Current Employment Status & Temporal Boundaries',
    chunkIndex: 1,
    text: `Professional engineering employment at Wayground concluded in July 2026. From August 2026 to present (November 2026), he has been actively conducting Independent AI Engineering & Research across multiple projects. This period is not full-time corporate employment, consulting, or contract work; it represents independent engineering activity and open-source systems research.`,
    tokenCount: calculateTokens(`Professional engineering employment at Wayground concluded in July 2026. From August 2026 to present (November 2026), he has been actively conducting Independent AI Engineering & Research across multiple projects. This period is not full-time corporate employment, consulting, or contract work; it represents independent engineering activity and open-source systems research.`),
    charCount: 367,
    sourceProvenance: 'data/canonical/structuredProfile.ts#employment-status',
    tags: ['profile', 'wayground', 'independent-research', 'temporal-boundary'],
    verificationStatus: 'verified'
  },

  // --- doc-timeline Chunks ---
  {
    id: 'chunk-timeline-01',
    documentId: 'doc-timeline',
    projectId: 'profile',
    sectionTitle: 'Stage 1 to Stage 3: Mathematics SME to AI Systems at Wayground',
    chunkIndex: 0,
    text: `Aadil's engineering career spans 5 stages: Stage 1 (2017-2021) Mechanical Engineering foundation & Math Content Developer; Stage 2 (2021-2023) Curriculum Systems & Assessment Engineering; Stage 3 (April 2024 - July 2026) AI Systems Engineering at Wayground where he created VM Copy and spearheaded AI-assisted authoring pipelines.`,
    tokenCount: calculateTokens(`Aadil's engineering career spans 5 stages: Stage 1 (2017-2021) Mechanical Engineering foundation & Math Content Developer; Stage 2 (2021-2023) Curriculum Systems & Assessment Engineering; Stage 3 (April 2024 - July 2026) AI Systems Engineering at Wayground where he created VM Copy and spearheaded AI-assisted authoring pipelines.`),
    charCount: 334,
    sourceProvenance: 'data/experience.ts#stages-1-3',
    tags: ['timeline', 'progression', 'sme', 'wayground'],
    verificationStatus: 'verified'
  },
  {
    id: 'chunk-timeline-02',
    documentId: 'doc-timeline',
    projectId: 'profile',
    sectionTitle: 'Stage 4 to Stage 5: Reliability, CAD & Independent Research',
    chunkIndex: 1,
    text: `Stage 4 (Jan 2026 - July 2026) encompassed Multi-model LLM Orchestration, TikZ/LaTeX rendering pipelines, and evaluation harnesses. Stage 5 (August 2026 - Present) represents Independent AI Engineering & Research focusing on deterministic physics, OpenCascade CAD automation, document OCR evaluation platforms, and governed agentic reliability.`,
    tokenCount: calculateTokens(`Stage 4 (Jan 2026 - July 2026) encompassed Multi-model LLM Orchestration, TikZ/LaTeX rendering pipelines, and evaluation harnesses. Stage 5 (August 2026 - Present) represents Independent AI Engineering & Research focusing on deterministic physics, OpenCascade CAD automation, document OCR evaluation platforms, and governed agentic reliability.`),
    charCount: 351,
    sourceProvenance: 'data/experience.ts#stages-4-5',
    tags: ['timeline', 'stage-5', 'independent-research', 'reliability'],
    verificationStatus: 'verified'
  },

  // --- doc-eda-spec Chunks ---
  {
    id: 'chunk-eda-01',
    documentId: 'doc-eda-spec',
    projectId: 'design-automation',
    sectionTitle: 'EDA CAD Architecture & Closed-Form Physics Invariant',
    chunkIndex: 0,
    text: `Engineering Design Automation (EDA CAD) pairs natural language specification ingestion with pure deterministic Python engineering solvers. Instead of allowing generative LLMs to hallucinate mechanical dimensions, closed-form Saint-Venant pure torsion formulas (tau = 16*T / (pi*d^3)) and von Mises shear yield criteria size stepped transmission shafts, while OpenCascade/CadQuery constructs watertight ISO 10303 STEP BRep solids.`,
    tokenCount: calculateTokens(`Engineering Design Automation (EDA CAD) pairs natural language specification ingestion with pure deterministic Python engineering solvers. Instead of allowing generative LLMs to hallucinate mechanical dimensions, closed-form Saint-Venant pure torsion formulas (tau = 16*T / (pi*d^3)) and von Mises shear yield criteria size stepped transmission shafts, while OpenCascade/CadQuery constructs watertight ISO 10303 STEP BRep solids.`),
    charCount: 428,
    sourceProvenance: 'data/projects.ts#eda-architecture',
    tags: ['eda', 'cad', 'saint-venant', 'opencascade', 'brep', 'physics'],
    verificationStatus: 'verified'
  },
  {
    id: 'chunk-eda-02',
    documentId: 'doc-eda-physics',
    projectId: 'design-automation',
    sectionTitle: 'Shaft Diameter Sizing & DIN 6885 Keyway Geometry',
    chunkIndex: 0,
    text: `For design torque T = 250.0 N*m and allowable shear stress tau_allow = 60 MPa, minimum required diameter is d_req = (16*T / (pi*tau_allow))^(1/3) = 27.68 mm. Applying ISO standard diameter series quantizes the main transmission seat to D = 30.00 mm (safety factor N = 1.27). Bearing seats are sized at D = 25.0 mm (L = 40 mm each). The central section includes a DIN 6885 parallel keyway pocket (b = 8 mm, h = 4 mm, l = 50 mm).`,
    tokenCount: calculateTokens(`For design torque T = 250.0 N*m and allowable shear stress tau_allow = 60 MPa, minimum required diameter is d_req = (16*T / (pi*tau_allow))^(1/3) = 27.68 mm. Applying ISO standard diameter series quantizes the main transmission seat to D = 30.00 mm (safety factor N = 1.27). Bearing seats are sized at D = 25.0 mm (L = 40 mm each). The central section includes a DIN 6885 parallel keyway pocket (b = 8 mm, h = 4 mm, l = 50 mm).`),
    charCount: 436,
    sourceProvenance: 'components/evidence/CadModelViewer.tsx#physics-tab',
    tags: ['eda', 'shaft-sizing', 'keyway', 'din-6885', 'iso-series'],
    verificationStatus: 'verified'
  },
  {
    id: 'chunk-eda-03',
    documentId: 'doc-eda-metrics',
    projectId: 'design-automation',
    sectionTitle: 'Volume Invariant (94,218.58 mm^3) & Software Calculus Disclaimer',
    chunkIndex: 0,
    text: `The EDA test harness contains 424 automated pytests passing across 28 test suites in Docker. Gross analytical stepped volume is 95,818.58 mm^3. Subtracting the DIN 6885 keyway slot (1,600.00 mm^3) yields net nominal theoretical volume of 94,218.58 mm^3. OpenCascade GProp_GProps BRep mass property integral matches 94,218.58 mm^3 with relative calculus divergence < 10^-6 (0.0000%). Disclaimer: This verifies software calculus consistency between closed-form physics and CAD boundary representations; it does NOT represent physical CNC manufacturing machining tolerances.`,
    tokenCount: calculateTokens(`The EDA test harness contains 424 automated pytests passing across 28 test suites in Docker. Gross analytical stepped volume is 95,818.58 mm^3. Subtracting the DIN 6885 keyway slot (1,600.00 mm^3) yields net nominal theoretical volume of 94,218.58 mm^3. OpenCascade GProp_GProps BRep mass property integral matches 94,218.58 mm^3 with relative calculus divergence < 10^-6 (0.0000%). Disclaimer: This verifies software calculus consistency between closed-form physics and CAD boundary representations; it does NOT represent physical CNC manufacturing machining tolerances.`),
    charCount: 574,
    sourceProvenance: 'data/canonical/quantitativeClaims.ts#claim-eda-424-tests',
    tags: ['eda', 'volume-error', '424-tests', '28-suites', 'opencascade', 'disclaimer'],
    verificationStatus: 'verified'
  },

  // --- doc-solace Chunks ---
  {
    id: 'chunk-solace-01',
    documentId: 'doc-solace-overview',
    projectId: 'solace-ai',
    sectionTitle: 'Solace AI Product Architecture & Crisis Safety',
    chunkIndex: 0,
    text: `Solace AI is an empathetic voice companion and mental health platform built independently for the Solace Hackathon. The system combines multi-tiered crisis safety screening, low-latency duplex voice interaction via WebSockets, CBT reflection exercises, AES-256 local-first encrypted privacy storage, and offline emergency safety planning with direct access to the 988 lifeline.`,
    tokenCount: calculateTokens(`Solace AI is an empathetic voice companion and mental health platform built independently for the Solace Hackathon. The system combines multi-tiered crisis safety screening, low-latency duplex voice interaction via WebSockets, CBT reflection exercises, AES-256 local-first encrypted privacy storage, and offline emergency safety planning with direct access to the 988 lifeline.`),
    charCount: 387,
    sourceProvenance: 'data/projects.ts#solace-ai',
    tags: ['solace-ai', 'voice', 'cbt', 'hackathon', 'crisis-safety', 'aes-256'],
    verificationStatus: 'verified'
  },
  {
    id: 'chunk-solace-02',
    documentId: 'doc-solace-metrics',
    projectId: 'solace-ai',
    sectionTitle: 'Sub-2ms Crisis Latency, 102 Checks & Video Asset Delivery',
    chunkIndex: 0,
    text: `Solace AI features sub-2ms deterministic crisis screening triaging high-risk intent before LLM generation. Complete automated verification comprises 102 checks across 10 test suites (52 backend safety and endpoint tests + 50 mobile React Native assertions). The product walkthrough is demonstrated via solace_demo.mp4 (exact file size 3.84 MB / 4,028,398 bytes) configured with preload='none' to guarantee zero initial page-load data transfer.`,
    tokenCount: calculateTokens(`Solace AI features sub-2ms deterministic crisis screening triaging high-risk intent before LLM generation. Complete automated verification comprises 102 checks across 10 test suites (52 backend safety and endpoint tests + 50 mobile React Native assertions). The product walkthrough is demonstrated via solace_demo.mp4 (exact file size 3.84 MB / 4,028,398 bytes) configured with preload='none' to guarantee zero initial page-load data transfer.`),
    charCount: 449,
    sourceProvenance: 'data/canonical/quantitativeClaims.ts#claim-solace-latency',
    tags: ['solace-ai', 'sub-2ms', '102-checks', 'solace-demo.mp4', 'preload-none'],
    verificationStatus: 'verified'
  },

  // --- doc-ocr Chunks ---
  {
    id: 'chunk-ocr-01',
    documentId: 'doc-ocr-overview',
    projectId: 'ocr-evaluator',
    sectionTitle: 'OCR Evaluator Architecture & 5-Axis Perturbation Pipeline',
    chunkIndex: 0,
    text: `OCR Evaluator is an automated document accuracy evaluation and robustness testing platform built independently in September 2026. It evaluates OCR engines across Character Error Rate (CER), Word Error Rate (WER), critical-field matching, and confidence calibration. It features synthetic perturbation pipelines testing model degradation across 5 distinct axes: gaussian blur, salt-and-pepper noise, geometric rotation, contrast attenuation, and JPEG compression artifacts.`,
    tokenCount: calculateTokens(`OCR Evaluator is an automated document accuracy evaluation and robustness testing platform built independently in September 2026. It evaluates OCR engines across Character Error Rate (CER), Word Error Rate (WER), critical-field matching, and confidence calibration. It features synthetic perturbation pipelines testing model degradation across 5 distinct axes: gaussian blur, salt-and-pepper noise, geometric rotation, contrast attenuation, and JPEG compression artifacts.`),
    charCount: 476,
    sourceProvenance: 'data/projects.ts#ocr-evaluator',
    tags: ['ocr-evaluator', 'cer', 'wer', 'perturbation', 'robustness', 'evaluation'],
    verificationStatus: 'verified'
  },
  {
    id: 'chunk-ocr-02',
    documentId: 'doc-ocr-metrics',
    projectId: 'ocr-evaluator',
    sectionTitle: '154 Tests (134 Backend + 20 UI) & Operational Decision Gates',
    chunkIndex: 0,
    text: `The OCR Evaluator platform is backed by 154 automated tests: 134 backend pytest unit and pipeline tests across 12 suites, plus 20 frontend UI component assertions. It categorizes extracted document reliability into three operational gates: PASS (CER < 2.0%, critical fields 100%), REVIEW (CER 2.0-8.0%), and FAIL (CER > 8.0% or missing critical fields). Under severe noise, baseline CER degrades from 0.8% to 14.6%, proving the need for preprocessing filters.`,
    tokenCount: calculateTokens(`The OCR Evaluator platform is backed by 154 automated tests: 134 backend pytest unit and pipeline tests across 12 suites, plus 20 frontend UI component assertions. It categorizes extracted document reliability into three operational gates: PASS (CER < 2.0%, critical fields 100%), REVIEW (CER 2.0-8.0%), and FAIL (CER > 8.0% or missing critical fields). Under severe noise, baseline CER degrades from 0.8% to 14.6%, proving the need for preprocessing filters.`),
    charCount: 462,
    sourceProvenance: 'data/canonical/quantitativeClaims.ts#claim-ocr-tests',
    tags: ['ocr-evaluator', '154-tests', '134-backend', '20-ui', 'decision-gates', 'cer-thresholds'],
    verificationStatus: 'verified'
  },

  // --- doc-ai-reliability Chunks ---
  {
    id: 'chunk-ai-reliability-01',
    documentId: 'doc-ai-reliability',
    projectId: 'ai-reliability',
    sectionTitle: 'Browser QA Platform, Fisher Uncertainty & Governance Gates',
    chunkIndex: 0,
    text: `AI Application Reliability & Browser QA is a local-first browser testing and agentic governance platform. It pairs local Ollama Qwen 2.5 Coder and Playwright headless Chromium with deterministic behavioral contracts. To prevent unregulated agents from executing unverified code patches, it incorporates Fisher Information covariance uncertainty estimation (forcing abstention when uncertain), a mandatory human-in-the-loop governance authorization gate, and an append-only SHA-256 provenance ledger.`,
    tokenCount: calculateTokens(`AI Application Reliability & Browser QA is a local-first browser testing and agentic governance platform. It pairs local Ollama Qwen 2.5 Coder and Playwright headless Chromium with deterministic behavioral contracts. To prevent unregulated agents from executing unverified code patches, it incorporates Fisher Information covariance uncertainty estimation (forcing abstention when uncertain), a mandatory human-in-the-loop governance authorization gate, and an append-only SHA-256 provenance ledger.`),
    charCount: 504,
    sourceProvenance: 'data/projects.ts#ai-reliability',
    tags: ['ai-reliability', 'playwright', 'fisher-uncertainty', 'governance', 'sha-256', 'contracts'],
    verificationStatus: 'verified'
  },
  {
    id: 'chunk-ai-reliability-02',
    documentId: 'doc-ai-reliability-metrics',
    projectId: 'ai-reliability',
    sectionTitle: '205+ Unit Tests & Live Dogfooding against VM Copy Target',
    chunkIndex: 0,
    text: `The AI Reliability platform is verified by 205+ automated tests (158 backend test suites + 47 governance and E2E browser automation tests) in backend/tests/. It dogfoods against VM Copy Question Generator running on port 3000 as a live verification target, detecting layout shifts and prompt regressions deterministically.`,
    tokenCount: calculateTokens(`The AI Reliability platform is verified by 205+ automated tests (158 backend test suites + 47 governance and E2E browser automation tests) in backend/tests/. It dogfoods against VM Copy Question Generator running on port 3000 as a live verification target, detecting layout shifts and prompt regressions deterministically.`),
    charCount: 326,
    sourceProvenance: 'data/canonical/quantitativeClaims.ts#claim-ai-reliability-tests',
    tags: ['ai-reliability', '205-tests', '158-backend', '47-e2e', 'vm-copy-dogfood'],
    verificationStatus: 'verified'
  },

  // --- doc-atlas-ai Chunks ---
  {
    id: 'chunk-atlas-01',
    documentId: 'doc-atlas-ai',
    projectId: 'atlas-ai',
    sectionTitle: 'Atlas AI Enterprise Financial LangGraph Multi-Agent Stack',
    chunkIndex: 0,
    text: `Atlas AI is an enterprise financial multi-agent intelligence platform. Built with LangGraph StateGraph, it orchestrates specialized agent nodes for SEC EDGAR 10-K/10-Q filing ingestion, financial statement analysis, tabular data extraction, and executive insider trading alerts. It enforces human-in-the-loop authorization gates before executing proactive outbound notifications.`,
    tokenCount: calculateTokens(`Atlas AI is an enterprise financial multi-agent intelligence platform. Built with LangGraph StateGraph, it orchestrates specialized agent nodes for SEC EDGAR 10-K/10-Q filing ingestion, financial statement analysis, tabular data extraction, and executive insider trading alerts. It enforces human-in-the-loop authorization gates before executing proactive outbound notifications.`),
    charCount: 395,
    sourceProvenance: 'data/projects.ts#atlas-ai',
    tags: ['atlas-ai', 'langgraph', 'stategraph', 'sec-edgar', 'financial-agents', 'hitl'],
    verificationStatus: 'verified'
  },
  {
    id: 'chunk-atlas-02',
    documentId: 'doc-atlas-metrics',
    projectId: 'atlas-ai',
    sectionTitle: 'Atlas AI Test Suite Reconciliation (59 MVP vs 178 Expanded)',
    chunkIndex: 0,
    text: `Atlas AI test reconciliation: The original MVP test suite contained 59 pytests validating core LangGraph router nodes. The subsequent expanded enterprise release contains 178 automated pytests validating full SEC EDGAR chunkers, vector search retrievers, and background alert worker lifespan. Both counts are genuine and represent different phases of system maturity.`,
    tokenCount: calculateTokens(`Atlas AI test reconciliation: The original MVP test suite contained 59 pytests validating core LangGraph router nodes. The subsequent expanded enterprise release contains 178 automated pytests validating full SEC EDGAR chunkers, vector search retrievers, and background alert worker lifespan. Both counts are genuine and represent different phases of system maturity.`),
    charCount: 367,
    sourceProvenance: 'data/canonical/quantitativeClaims.ts#claim-atlas-tests-spec',
    tags: ['atlas-ai', '178-tests', '59-tests', 'reconciliation', 'sec-edgar'],
    verificationStatus: 'qualified'
  },

  // --- doc-vm-copy Chunks ---
  {
    id: 'chunk-vm-copy-01',
    documentId: 'doc-vm-copy',
    projectId: 'vm-copy',
    sectionTitle: 'Deterministic Guardrails: 4 Unique Options & Single Key Exclusivity',
    chunkIndex: 0,
    text: `VM Copy Question Generator was built independently at Wayground between April 2024 and September 2024. Standard LLMs hallucinate duplicate options or multiple correct answers in math items. VM Copy implements deterministic client guardrails: enforces exactly 4 unique options, verifies exactly one correct answer flag, validates distractor rationales, and guarantees mathematical consistency without secondary model dependency.`,
    tokenCount: calculateTokens(`VM Copy Question Generator was built independently at Wayground between April 2024 and September 2024. Standard LLMs hallucinate duplicate options or multiple correct answers in math items. VM Copy implements deterministic client guardrails: enforces exactly 4 unique options, verifies exactly one correct answer flag, validates distractor rationales, and guarantees mathematical consistency without secondary model dependency.`),
    charCount: 423,
    sourceProvenance: 'data/projects.ts#vm-copy',
    tags: ['vm-copy', 'wayground', 'deterministic-guardrails', 'math-generator', 'single-correct'],
    verificationStatus: 'verified'
  }
]

export const CORPUS_MANIFEST: CorpusManifest = {
  version: 'CORPUS_V1.0',
  releaseDate: '2026-11-11',
  documentCount: CORPUS_DOCUMENTS.length,
  chunkCount: CORPUS_CHUNKS.length,
  totalTokenCount: CORPUS_CHUNKS.reduce((acc, c) => acc + c.tokenCount, 0),
  integrityHash: 'sha256-455b08a8196902c1f87399f0f28105d5d2c1d41be2750beda78241dcf1a18eb2',
  sourceProvenanceList: [
    'data/canonical/structuredProfile.ts',
    'data/experience.ts',
    'data/projects.ts',
    'data/canonical/quantitativeClaims.ts',
    'components/evidence/CadModelViewer.tsx'
  ]
}

