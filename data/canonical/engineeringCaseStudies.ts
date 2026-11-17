/**
 * CANONICAL ENGINEERING CASE STUDIES COLLECTION
 * Phase 2.5A — Technical Incident Reconstruction, Engineering Decision Records & Canonical Provenance
 *
 * Dedicated collection recording verified technical challenges, unexpected runtime behaviors,
 * debugging investigations, root causes, architectural decisions, implementation corrections,
 * and verification evidence across the author's engineering work.
 *
 * Guarantees:
 * 1. Zero Fictionalization: All documented incidents, root causes, and fixes are backed by
 *    actual repository code, test suites, or contemporaneous design records.
 * 2. Strict Completeness Classification: Explicitly flags FULLY_DOCUMENTED, PARTIALLY_DOCUMENTED,
 *    and INSUFFICIENT_EVIDENCE (documentation gaps).
 * 3. Canonical Grounding: All references to projectIds, careerIds, journalChapterIds, claimIds,
 *    and evidenceIds resolve cleanly to accepted Phase 1 records.
 * 4. Confidentiality Enforcement: Proprietary projects (VM Copy, Curriculum ETL, Item Bank)
 *    never expose private repository URLs, internal prompts, or company infrastructure.
 * 5. Architectural Separation: Preserves the career journal's chronological narrative while
 *    establishing this distinct, complementary technical evidence layer.
 */

import { EngineeringCaseStudy } from '@/types/caseStudy'

export const engineeringCaseStudies: EngineeringCaseStudy[] = [
  // ============================================================================
  // CASE 1: ASK AADIL — WEB SPEECH API TRANSCRIPT RECONCILIATION
  // ============================================================================
  {
    id: 'case-study-ask-aadil-speech-transcript',
    title: 'Web Speech API Streaming Transcript Duplication & Chromium Cumulative Stream Reconciliation',
    projectId: 'proj-ask-aadil',
    careerIds: ['car-independent-research'],
    journalChapterIds: ['ch-21-ask-aadil', 'ch-23-synthesis'],
    claimIds: ['CLAIM-ASK-001', 'CLAIM-ASK-002'],
    evidenceIds: ['EVID-ASK-01'],
    category: 'STREAMING_VOICE_PIPELINE',
    technicalContext:
      'Ask Aadil conversational voice interface implementing in-browser Web Speech API (SpeechRecognition) for hands-free queries, coupled with local Voice Activity Detection (VAD) and Text-to-Speech (TTS) synthesis.',
    problem:
      'In Chromium-based browsers, speaking into the voice interface caused repeated words and corrupted queries (e.g. "Who" followed by "Who is Aadil" naively concatenated into "Who Who is Aadil?"). Furthermore, post-finalization event callbacks and rapid speech pauses caused duplicate turn submissions to the RAG pipeline.',
    symptoms: [
      'Duplicate words and stuttered phrases in recognized speech transcripts in Chrome/Edge.',
      'Provisional interim text prepending itself to newly finalized sentences.',
      'Multiple duplicate query submissions dispatched to askAadil agent from a single spoken sentence.',
      'Browser console diagnostics displaying cumulative result lists with overlapping spans.'
    ],
    reproductionConditions:
      'Activate voice input in Chromium browser; speak a multi-word phrase with a natural technical pause (e.g., "Who... is Aadil?"). Observe event.results dispatched across consecutive onresult callbacks.',
    investigation:
      'Logged complete event.results arrays, event.resultIndex, and isFinal flags during live sessions. Confirmed that Chromium does NOT emit differential delta speech segments; instead, SpeechRecognitionResultList streams cumulative provisional results where isFinal === false chunks frequently repeat the finalized transcript prefix alongside trailing active speech.',
    hypotheses: [
      {
        hypothesis: 'event.resultIndex indicates the exact offset of new text and prior results can be ignored.',
        confirmed: false,
        notes: 'Testing showed Chromium re-emits cumulative phrases across result indices when re-evaluating acoustic models.'
      },
      {
        hypothesis: 'Interim results contain cumulative finalized prefixes that must be reconciled against the finalized transcript.',
        confirmed: true,
        notes: 'Confirmed: slicing off the finalized prefix from active interim text completely eliminates repeated words.'
      },
      {
        hypothesis: 'Rapid speech pauses trigger premature VAD submission while recognition is still finalizing.',
        confirmed: true,
        notes: 'Confirmed: 400ms silence threshold was too aggressive for technical phrasing; required 1200ms conservative threshold plus single-turn submission gating.'
      }
    ],
    rootCause:
      'Chromium’s Web Speech API implementation streams cumulative provisional recognition segments across SpeechRecognitionResultList where unfinalized results (isFinal === false) repeat the finalized prefix instead of emitting pure deltas. Naive array concatenation duplicated already-finalized words.',
    resolution:
      'Architected assembleSpeechTranscript(eventOrResults, optResultIndex) in lib/rag/voice/speechToTextProvider.ts. It iterates through event.results segregating finalParts and interimParts, tests if rawInterim starts with finalTranscript, and dynamically slices off the finalized prefix to isolate genuine trailing provisional speech. Added a single-turn submission gate (hasSubmitted latch) and increased VAD silence threshold to 1200ms.',
    implementationDetails: {
      filesModifiedOrAuthored: [
        'lib/rag/voice/speechToTextProvider.ts',
        'lib/rag/voice/textToSpeechProvider.ts',
        'components/AskAadil/AskAadilVoiceControls.tsx'
      ],
      keyFunctionsOrClasses: [
        'assembleSpeechTranscript',
        'WebSpeechSTTProvider',
        'DEFAULT_VAD_CONFIG'
      ],
      architecturalDecisions: [
        'ADR-VOICE-01: Pure functional transcript assembler separating finalized history from active provisional speech.',
        'ADR-VOICE-02: Conservative 1200ms silence duration threshold preventing premature turn cutoff during technical pauses.',
        'ADR-VOICE-03: Single-shot VAD submission latch preventing duplicate turn dispatches on trailing audio buffers.'
      ],
      beforeBehavior:
        'Interim streaming text concatenated naively with finalized segments, resulting in duplicate tokens ("Who Who is Aadil?") and multiple agent executions.',
      afterBehavior:
        'Interim provisional text is cleanly reconciled against finalized text; duplicate prefixes are sliced off; final transcript is submitted exactly once per turn.'
    },
    verification: {
      testCommand: 'npx tsx scripts/test_conversational_voice.ts',
      assertionCount: 47,
      verifiedScope:
        '47 automated voice evaluation checks covering W3C SpeechRecognitionResultList assembly, prefix reconciliation, legitimate repetition preservation ("very very good"), session isolation, and single-shot VAD submission.',
      evidenceStatus: 'DIRECT_CODE_EVIDENCE',
      regressionEvidence:
        'Verified in scripts/test_conversational_voice.ts (Tests 40–47, exit code 0).'
    },
    outcome:
      'Zero transcript duplication in Chromium/Safari browsers; seamless real-time voice queries with clean markdown stripping in TTS playback.',
    limitations: [
      'Web Speech API requires active network connectivity on Chromium desktop browsers as speech models run server-side on Google infrastructure.',
      'Browser permission dialogs cannot be automated and require explicit initial user interaction.'
    ],
    lessons: [
      'Never assume browser streaming APIs emit differential deltas; always inspect cumulative vs delta invariants empirically.',
      'In multi-turn conversational agents, silence detection must be conservative (>= 1000ms) to accommodate natural cognitive pauses in technical queries.'
    ],
    visibility: 'PUBLIC',
    publicationStatus: 'PUBLIC_APPROVED',
    documentationCompleteness: 'FULLY_DOCUMENTED',
    createdAt: '2026-10-22',
    sourceReferences: [
      'lib/rag/voice/speechToTextProvider.ts:30-100',
      'scripts/test_conversational_voice.ts:450-540'
    ]
  },

  // ============================================================================
  // CASE 2: EDA CAD — DETERMINISTIC CALCULUS VS BREP SOLID MASS PROPERTIES
  // ============================================================================
  {
    id: 'case-study-eda-cad-volume-materials',
    title: 'Deterministic Calculus Verification vs OpenCascade BRep CAD Solid Mass Properties & Anti-Hallucination Materials Policy',
    projectId: 'proj-design-automation',
    careerIds: ['car-independent-research'],
    journalChapterIds: ['ch-18-design-automation'],
    claimIds: ['CLAIM-EDA-001', 'CLAIM-EDA-002'],
    evidenceIds: ['EVID-EDA-01', 'EVID-EDA-02'],
    category: 'PHYSICS_CAD_SOLVER',
    technicalContext:
      'Engineering Design Automation (EDA CAD) platform compiling natural-language mechanical specifications into 3D STEP solid models and 2D orthographic manufacturing drawings via CadQuery and OpenCascade BRep geometry kernels.',
    problem:
      'Two major reliability risks in automated mechanical engineering: 1) LLMs hallucinated yield strengths when users provided generic material terms ("steel"), producing unphysical shaft designs that would fail catastrophically in machinery; 2) Potential divergence between closed-form theoretical calculus and discrete 3D OpenCascade boundary representation (BRep) mass property volume integrals.',
    symptoms: [
      'Prompting an LLM with "design a steel shaft" invented arbitrary yield strengths (varying from 250 MPa to 450 MPa).',
      'Calculated continuous theoretical diameters (e.g. 15.523 mm) required expensive custom machining instead of standard industrial bar stock.',
      'Potential numerical discretization errors in CAD solid geometry boundary representations.'
    ],
    reproductionConditions:
      'Submit ambiguous prompt "Design a 15kW steel drive shaft at 1800 RPM" without specifying steel alloy grade. Compare solver outputs with and without MaterialKnowledgeBase fail-fast gate.',
    investigation:
      'Audited failure modes in mechanical solver pipelines. Confirmed that probabilistic token generation cannot be trusted with material constants, torsional shear stress formulas, or safety factors. Examined OpenCascade BRep mass calculation integrals against analytical volume integration for primitive stepped geometries.',
    hypotheses: [
      {
        hypothesis: 'LLMs can be guided via detailed system prompts to always select the conservative yield strength.',
        confirmed: false,
        notes: 'Testing showed temperature variation and model updates still produced unpredictable material properties.'
      },
      {
        hypothesis: 'Completely excluding LLMs from physics and math guarantees zero arithmetic hallucination.',
        confirmed: true,
        notes: 'Restricting the LLM strictly to text extraction with character offsets, delegating all physics to deterministic Python solvers, eliminated 100% of arithmetic errors.'
      },
      {
        hypothesis: 'OpenCascade CAD solid geometry volume agrees with closed-form cylinder integrals within 10⁻⁶ relative error.',
        confirmed: true,
        notes: 'Confirmed: numerical mass property integration achieved 0.0000% volume calculation error on analytical primitives.'
      }
    ],
    rootCause:
      '1) Ambiguous natural-language specifications allowed probabilistic models to invent metallurgical properties; 2) Continuous theoretical diameters ignored manufacturing supply-chain constraints.',
    resolution:
      '1) Architected ADR 01: Complete exclusion of LLMs from physics and math; all calculations executed by ShaftTorsionSolver using closed-form engineering equations; 2) ADR 02: Anti-hallucination MaterialKnowledgeBase enforcing fail-fast blocking (STATUS = BLOCKED) when generic terms like "steel" or "aluminum" lack exact alloy grades (AISI 1045, S355J2); 3) ADR 03: Discrete nominal sizing policy quantizing theoretical diameters to standard ISO metric bar stock sizes; 4) ADR 04: Dimensional cross-validation matrix asserting 100% agreement between 3D solid geometry and 2D SVG drawings.',
    implementationDetails: {
      filesModifiedOrAuthored: [
        'src/solvers/torsion.py',
        'src/knowledge/materials.py',
        'src/cad/brep_generator.py',
        'src/validation/cross_validator.py'
      ],
      keyFunctionsOrClasses: [
        'ShaftTorsionSolver',
        'MaterialKnowledgeBase',
        'NominalDiameterPolicy',
        'BRepValidationResult'
      ],
      architecturalDecisions: [
        'ADR-EDA-01: Complete exclusion of LLMs from physics and math.',
        'ADR-EDA-02: Anti-hallucination Material Knowledge Base fail-fast blocking.',
        'ADR-EDA-03: Discrete ISO nominal bar stock sizing policy.',
        'ADR-EDA-04: Automated 3D CAD to 2D drawing cross-validation agreement matrix.'
      ],
      beforeBehavior:
        'Generic prompts generated hallucinated yield strengths; continuous theoretical dimensions required non-standard machining; unverified geometry handoffs.',
      afterBehavior:
        'Generic prompts strictly halt with BLOCKED status requesting exact alloy grade; output dimensions quantize to ISO standard bar stock; 3D/2D geometry verified with 0.0000% analytical volume calculation error.'
    },
    verification: {
      testCommand: 'docker run --rm eda-cad-runner pytest -v',
      assertionCount: 424,
      verifiedScope:
        '424 automated pytests passing across 28 test suites in containerized Docker OpenCascade runner covering torsional physics, shaft diameter sizing, material lookup fail-fast gates, and STEP BRep solid generation.',
      evidenceStatus: 'TEST_VERIFIED',
      regressionEvidence:
        'Documented in canonicalRegistry.ts (CLAIM-EDA-001, CLAIM-EDA-002, EVID-EDA-01, EVID-EDA-02).'
    },
    outcome:
      'Mathematically verified CAD generation platform achieving 0.0000% volume calculation error (< 10⁻⁶ relative discrepancy) on tested analytical primitives.',
    limitations: [
      'The 0.0000% volume calculation error represents mathematical software consistency between closed-form equations and CAD kernel mass integrals; it does NOT assert physical CNC machining or manufacturing tolerances.',
      'Applies specifically to tested analytical geometry primitives (stepped cylinders, nominal shafts), not arbitrary organic surfaces.'
    ],
    lessons: [
      'In safety-critical physical engineering, fail-fast abstention on ambiguity is mandatory; never allow a model to invent material properties.',
      'Software calculus verification is distinct from physical manufacturing tolerance; disclosures must preserve this boundary rigorously.'
    ],
    visibility: 'PUBLIC',
    publicationStatus: 'PUBLIC_APPROVED',
    documentationCompleteness: 'FULLY_DOCUMENTED',
    createdAt: '2026-09-15',
    sourceReferences: [
      'research/project-analysis/engineering-design-automation/failure-modes.md',
      'research/project-analysis/engineering-design-automation/engineering-decisions.md',
      'data/canonical/canonicalRegistry.ts:870-915'
    ]
  },

  // ============================================================================
  // CASE 3: VM COPY — TIER-1 EVALUATOR & SERVERLESS BATCHING
  // ============================================================================
  {
    id: 'case-study-vm-copy-eval-layer',
    title: 'Tier-1 Deterministic Evaluator Gate & Serverless Gateway Timeout Mitigation via Micro-Batching',
    projectId: 'proj-vm-copy',
    careerIds: ['car-wayground-math-sme'],
    journalChapterIds: ['ch-11-generation-not-enough', 'ch-12-generation-to-evaluation'],
    claimIds: ['CLAIM-VM-001'],
    evidenceIds: ['EVID-VM-01'],
    category: 'DETERMINISTIC_EVALUATION',
    technicalContext:
      'Next.js App Router application built during Wayground Mathematics SME tenure (conceived Oct–mid-Nov 2025, adopted Nov 2025) to generate structurally sound mathematical assessment question variants from base curriculum items.',
    problem:
      'Two critical operational failures in production curriculum generation: 1) LLMs generated subtle structural defects (outputting 3 or 5 options instead of 4, failing to designate an answer as Correct Answer "CA", marking multiple CAs, or generating duplicate distractor values); 2) Generating batches of 5–10 items in a single completion took >30–40 seconds, triggering Next.js and Vercel serverless gateway timeouts (15s/30s limits).',
    symptoms: [
      'Curriculum authors received questions with missing or broken answer keys.',
      'Arithmetic variations collapsed two distinct options into identical numbers (e.g. options A and C both saying "12").',
      'Monolithic batch generation requests timed out with HTTP 504 Gateway Timeout on serverless endpoints.',
      'JSON parsing crashes caused by models wrapping responses in markdown fences (```json ... ```).'
    ],
    reproductionConditions:
      'Request 8 question variants in a single prompt from an LLM endpoint. Observe response duration exceeding 30s and examine generated JSON for option cardinality and uniqueness.',
    investigation:
      'Profiled endpoint latency and inspected failure logs. Identified that LLM inference latency scales linearly with output tokens, and attention degrades over long multi-item outputs leading to distractor collisions. Evaluated secondary LLM verification ("self-correction"), but found it added 2–4s per item, cost extra API tokens, and suffered from hallucinated approvals.',
    hypotheses: [
      {
        hypothesis: 'Using a secondary LLM as a grader can reliably catch structural defects.',
        confirmed: false,
        notes: 'Rejected: slow, expensive, and the grader LLM hallucinated false passes on broken answer keys.'
      },
      {
        hypothesis: 'Pure TypeScript structural assertion functions can validate invariants in sub-millisecond time with zero marginal API cost.',
        confirmed: true,
        notes: 'Implemented lib/eval-layer.ts; executed regex and AST structural assertions in <1ms locally.'
      },
      {
        hypothesis: 'Partitioning batch requests into concurrent micro-batches bounds total latency to the duration of a single small generation.',
        confirmed: true,
        notes: 'calculateBatches partitioned 10 questions into parallel sub-batches of 2–3 questions dispatched via Promise.all; overall latency dropped from >35s to ~5–6s.'
      }
    ],
    rootCause:
      '1) Stochastic token generation lacks mathematical guarantees on set cardinality, distractor uniqueness, and answer-key exclusivity; 2) Monolithic prompting overloads single-request serverless execution windows.',
    resolution:
      '1) ADR 01: Built lib/eval-layer.ts — a pure TypeScript Tier-1 in-memory deterministic evaluator executing hard structural assertions (option count === 4, |CA| === 1, Set duplicate checks, distractor rationale validation, mixed-number fraction heuristics) before any human or model review; 2) ADR 02: Parallel micro-batching via calculateBatches(numQuestions) partitioning generation into sub-batches of 2–3 items dispatched concurrently with Promise.all; 3) Regex markdown un-fencing stripping ```json wrappers and locating outermost braces {}.',
    implementationDetails: {
      filesModifiedOrAuthored: [
        'lib/eval-layer.ts',
        'app/api/generate/route.ts',
        'app/api/verify/route.ts'
      ],
      keyFunctionsOrClasses: [
        'evaluateDeterministic',
        'calculateBatches',
        'cleanJsonOutput'
      ],
      architecturalDecisions: [
        'ADR-VM-01: Pure TypeScript Tier-1 deterministic evaluator gate running in <1ms with $0 API spend.',
        'ADR-VM-02: Parallel micro-batching bounding total latency to ~4–6s regardless of batch size.',
        'ADR-VM-03: Multi-provider fallback abstraction (Gemini, OpenAI, NaraRouter).'
      ],
      beforeBehavior:
        'Monolithic batch generation triggered 504 serverless timeouts; structural defects (3 options, duplicate distractors, broken answer keys) reached reviewers unchecked.',
      afterBehavior:
        'Batch generation finishes in ~5–6s; Tier-1 evaluator instantly flags structural defects with actionable error badges before items reach human reviewers.'
    },
    verification: {
      testCommand: 'npm run test:eval-layer',
      assertionCount: 45,
      verifiedScope:
        'Evaluator unit tests validating 4-option cardinality, single-CA invariant, distractor uniqueness, and micro-batch calculation logic.',
      evidenceStatus: 'DIRECT_CODE_EVIDENCE',
      regressionEvidence:
        'Documented in canonicalRegistry.ts (CLAIM-VM-001, EVID-VM-01) and research/project-analysis/vm-copy/.'
    },
    outcome:
      'Eliminated serverless timeouts; Tier-1 evaluation executes in <1ms locally, preventing flawed items from entering the curriculum authoring pipeline.',
    limitations: [
      'Project is EMPLOYER_PROPRIETARY (developed during Wayground Mathematics SME employment). Internal prompts, private repository URLs, and proprietary data remain strictly confidential.',
      'The <1ms latency metric applies strictly to the Tier-1 in-memory regex and AST gate; upstream generative LLM inference takes ~4–8 seconds and incurs standard provider API costs.'
    ],
    lessons: [
      'Deterministic code placed outside the model is infinitely faster, cheaper, and more reliable than asking a model to grade its own output.',
      'In serverless architectures, parallel micro-batching is superior to monolithic prompting for multi-item generation.'
    ],
    visibility: 'EMPLOYER_PROPRIETARY_CASE_STUDY',
    publicationStatus: 'PROPRIETARY_RESTRICTED',
    documentationCompleteness: 'FULLY_DOCUMENTED',
    createdAt: '2025-11-15',
    sourceReferences: [
      'research/project-analysis/vm-copy/failure-modes.md',
      'research/project-analysis/vm-copy/engineering-decisions.md',
      'data/canonical/canonicalRegistry.ts:1080-1102'
    ]
  },

  // ============================================================================
  // CASE 4: AI APPLICATION RELIABILITY — UNCERTAINTY ABSTENTION & GOVERNANCE
  // ============================================================================
  {
    id: 'case-study-ai-reliability-governance',
    title: 'Fisher Information Covariance-Based Abstention & Cryptographic Human Authorization in Autonomous Browser QA',
    projectId: 'proj-ai-reliability',
    careerIds: ['car-independent-research'],
    journalChapterIds: ['ch-19-ai-reliability'],
    claimIds: ['CLAIM-RELIABILITY-001', 'CLAIM-RELIABILITY-002'],
    evidenceIds: ['EVID-REL-01', 'EVID-REL-02'],
    category: 'AGENT_GOVERNANCE_SAFETY',
    technicalContext:
      'Autonomous browser QA harness using Playwright running real headless Chromium sessions to test web applications, diagnose visual/structural regressions, and manage code repair proposals under strict governance constraints.',
    problem:
      'Autonomous AI coding agents frequently exhibit overconfidence when diagnosing software failures: when presented with novel or noisy stack traces, they hallucinate plausible-sounding but erroneous root causes and propose destructive code modifications. Furthermore, unconstrained autonomous agents risk executing arbitrary code modifications or commits without verified human authorization.',
    symptoms: [
      'Agent proposed speculative code patches for failures caused by transient network timeouts or hydration delays.',
      'Phantom test passes in mock-based testing environments that failed when executed in real browser DOMs.',
      'Risk of unreviewed code modifications altering production repositories.'
    ],
    reproductionConditions:
      'Feed noisy, truncated stack traces or unobserved DOM states into the diagnostic agent. Observe whether agent generates speculative patches or halts.',
    investigation:
      'Analyzed agent failure traces and diagnostic reliability. Discovered that probabilistic token generators lack calibrated self-uncertainty: an agent will generate a patch with identical declarative tone whether its diagnostic certainty is 99% or 10%. Determined that empirical uncertainty quantification is required before any patch recommendation.',
    hypotheses: [
      {
        hypothesis: 'Prompting the agent to "be cautious" prevents speculative patch generation.',
        confirmed: false,
        notes: 'Prompt-based caution reduced volume slightly but did not prevent overconfident hallucinations on novel stack traces.'
      },
      {
        hypothesis: 'Empirical parameter covariance from the Fisher Information Matrix provides a mathematical threshold for safe abstention.',
        confirmed: true,
        notes: 'When covariance uncertainty exceeds threshold epsilon_abstain, forcing an explicit ABSTAIN verdict completely stopped hallucinated repairs.'
      },
      {
        hypothesis: 'Cryptographic token gating guarantees that no code change can execute without explicit human authorization.',
        confirmed: true,
        notes: 'ChangeAuthorizationService enforcing SHA-256 chained approval tokens blocked 100% of unauthorized modification attempts.'
      }
    ],
    rootCause:
      'Unconstrained token probabilities lack calibration against empirical information metrics, and agents lacked architectural separation between diagnostic reasoning authority and code alteration authorization.',
    resolution:
      '1) ADR 01: Rejected synthetic mocks in favor of real headless Chromium browser execution via Playwright capturing multi-modal ground truth (DOM snapshots, full-page PNGs, HAR traces); 2) ADR 02: Mathematical uncertainty quantification utilizing Fisher Information Matrix covariance estimates; when uncertainty exceeds threshold epsilon_abstain, the system forces an ABSTAIN verdict; 3) ADR 03: Mandatory human governance invariant — agents have authority to diagnose and recommend, but ZERO authority to modify code or merge PRs; 4) ADR 04: Cryptographic append-only provenance chain linking every tool call, diagnosis, and approval with SHA-256 hashes.',
    implementationDetails: {
      filesModifiedOrAuthored: [
        'src/evaluation/uncertainty.py',
        'src/governance/authorization.py',
        'src/provenance/ledger.py',
        'src/runners/playwright_runner.py'
      ],
      keyFunctionsOrClasses: [
        'evaluate_uncertainty_covariance',
        'ChangeAuthorizationService',
        'verify_provenance_chain',
        'PlaywrightSessionRunner'
      ],
      architecturalDecisions: [
        'ADR-REL-01: Multi-modal ground truth via real headless Chromium.',
        'ADR-REL-02: Fisher information covariance uncertainty quantification and safe abstention.',
        'ADR-REL-03: Mandatory human authorization as an architectural invariant.',
        'ADR-REL-04: Cryptographic append-only event provenance ledger (SHA-256).'
      ],
      beforeBehavior:
        'Agents generated speculative patches for ambiguous failures; tool execution was decoupled from cryptographic approval verification.',
      afterBehavior:
        'High-uncertainty failures trigger explicit ABSTAIN verdicts; patch tool execution is cryptographically blocked without verified human approval tokens.'
    },
    verification: {
      testCommand: 'pytest tests/ -v',
      assertionCount: 158,
      verifiedScope:
        '158 collected backend test cases across backend/tests/ (governed strictly as individual test cases, not test suites) and 47 governance Playwright assertions across 12 pages.',
      evidenceStatus: 'TEST_VERIFIED',
      regressionEvidence:
        'Documented in canonicalRegistry.ts (CLAIM-RELIABILITY-001, CLAIM-RELIABILITY-002, EVID-REL-01, EVID-REL-02).'
    },
    outcome:
      'Zero unauthorized patch executions; reliable browser QA evaluation where safe abstention prevents destructive hallucinations on ambiguous failures.',
    limitations: [
      'The 158 metric represents collected pytest test cases and parameterized assertions across backend/tests/, NOT 158 distinct test suite files.',
      'Headless Chromium browser execution requires appropriate container memory allocation (minimum 2GB RAM).'
    ],
    lessons: [
      'Abstaining from action is infinitely superior to executing an incorrect action in software maintenance.',
      'Reasoning is not authorization: an agent may reason about an issue, but must never possess autonomous authority to commit or deploy changes.'
    ],
    visibility: 'PUBLIC',
    publicationStatus: 'PUBLIC_APPROVED',
    documentationCompleteness: 'FULLY_DOCUMENTED',
    createdAt: '2026-10-10',
    sourceReferences: [
      'research/project-analysis/ai-application-reliability/failure-modes.md',
      'research/project-analysis/ai-application-reliability/engineering-decisions.md',
      'data/canonical/canonicalRegistry.ts:1040-1070'
    ]
  },

  // ============================================================================
  // CASE 5: SOLACE AI — REAL-TIME VOICE PIPELINE & EPHEMERAL PURGING
  // ============================================================================
  {
    id: 'case-study-solace-ai-streaming',
    title: 'Cross-Platform Real-Time Voice Streaming & Ephemeral Audio Purging in Emotional Support AI',
    projectId: 'proj-solace-ai',
    careerIds: ['car-independent-research'],
    journalChapterIds: ['ch-22-solace-ai'],
    claimIds: ['CLAIM-SOLACE-001', 'CLAIM-SOLACE-002'],
    evidenceIds: ['EVID-SOLACE-01', 'EVID-SOLACE-02'],
    category: 'CROSS_PLATFORM_MOBILE',
    technicalContext:
      'Cross-platform emotional wellness companion built for the Solace Hackathon (Nov 2026) pairing a React Native (Expo 58) mobile frontend with a FastAPI and LangGraph backend orchestrating Gemini 2.0 Live voice streaming.',
    problem:
      'Handling bidirectional streaming audio and emotional support dialogue required low-latency audio transmission while preventing audio data retention or privacy leaks on sensitive personal wellness conversations.',
    symptoms: [
      'Streaming audio buffer overruns over mobile WebSocket connections under fluctuating network conditions.',
      'Potential privacy vulnerabilities if raw microphone audio buffers persisted on disk or server memory after turn completion.'
    ],
    reproductionConditions:
      'Stream live microphone audio over mobile WebSocket while triggering rapid network handover or session interruption.',
    investigation:
      'Evaluated LangGraph conversational state machine integration with WebSocket audio sinks. Confirmed that audio buffer cleanup must be guaranteed on disconnect, cancellation, and session close.',
    hypotheses: [
      {
        hypothesis: 'Local caching of audio chunks improves replay latency.',
        confirmed: false,
        notes: 'Rejected due to privacy risk: emotional wellness conversations must never persist raw audio buffers on client or server.'
      },
      {
        hypothesis: 'Ephemeral in-memory audio buffers purged immediately upon playback completion guarantee privacy without compromising latency.',
        confirmed: true,
        notes: 'Implemented zero-retention audio buffer pipeline with explicit purge hooks.'
      }
    ],
    rootCause:
      'Default streaming implementations maintain temporary file caches that persist unless explicitly unlinked, violating zero-retention privacy standards for emotional health conversations.',
    resolution:
      'Architected ephemeral audio streaming pipeline: raw audio bytes are processed purely in-memory, converted to streaming PCM frames, and purged immediately upon speech termination. Implemented deterministic crisis intervention routing that bypasses generative LLMs when acute self-harm risk keywords are detected.',
    implementationDetails: {
      filesModifiedOrAuthored: [
        'backend/app/audio/stream.py',
        'backend/app/graph/wellness_graph.py',
        'mobile/src/services/voiceSocket.ts'
      ],
      keyFunctionsOrClasses: [
        'EphemeralAudioBuffer',
        'CrisisInterventionRouter',
        'WellnessGraphOrchestrator'
      ],
      architecturalDecisions: [
        'ADR-SOLACE-01: Zero-retention ephemeral audio buffer purging.',
        'ADR-SOLACE-02: Deterministic crisis safety screening bypassing LLM reasoning.',
        'ADR-SOLACE-03: LangGraph state machine orchestrating multi-turn conversational state.'
      ],
      beforeBehavior:
        'Audio streams relied on temporary disk caching; safety intervention relied on model self-detection.',
      afterBehavior:
        'Audio streams execute in-memory with immediate post-turn memory zeroing; crisis keywords deterministically trigger standardized safety helplines.'
    },
    verification: {
      testCommand: 'python -m pytest -o asyncio_mode=auto && npm test && tsc --noEmit',
      assertionCount: 102,
      verifiedScope:
        '52 backend pytests across 8 suites in backend/tests/ and 50 mobile verification checks across 7 React Native Jest suites with 0 TypeScript compiler errors.',
      evidenceStatus: 'TEST_VERIFIED',
      regressionEvidence:
        'Documented in canonicalRegistry.ts (CLAIM-SOLACE-001, CLAIM-SOLACE-002, EVID-SOLACE-01, EVID-SOLACE-02).'
    },
    outcome:
      'Delivered privacy-preserving emotional wellness voice prototype with 0 TypeScript errors and 102 automated verification tests across backend and mobile repositories.',
    limitations: [
      'The 50 mobile checks were verified strictly in React Native Jest test runners and TypeScript static compiler (tsc --noEmit); they do NOT represent automated execution on physical Android device hardware or emulators.',
      'Codebase is maintained in external repository (aadil-lang/solace-ai).'
    ],
    lessons: [
      'In wellness and healthcare-adjacent AI systems, privacy cannot be an afterthought; zero-retention ephemeral pipelines must be architected at the byte level.',
      'Crisis intervention must never depend on probabilistic model reasoning; hard deterministic keyword safety gates must intercept first.'
    ],
    visibility: 'PUBLIC',
    publicationStatus: 'PUBLIC_APPROVED',
    documentationCompleteness: 'PARTIALLY_DOCUMENTED',
    createdAt: '2026-11-10',
    sourceReferences: [
      'data/canonical/canonicalRegistry.ts:636-665',
      'data/canonical/canonicalRegistry.ts:1000-1038'
    ]
  },

  // ============================================================================
  // CASE 6: CURRICULUM ETL — INTEGRITY GATES & SCHEMA OVER-EXTRACTION GUARDS
  // ============================================================================
  {
    id: 'case-study-curriculum-etl-guards',
    title: 'Multi-Tier Extraction Integrity Gates & Column Over-Extraction Guarding in Curriculum ETL',
    projectId: 'proj-curriculum-etl',
    careerIds: ['car-wayground-aiml'],
    journalChapterIds: ['ch-15-curriculum-etl'],
    claimIds: ['CLAIM-ETL-001'],
    evidenceIds: ['EVID-ETL-01'],
    category: 'ETL_DATA_PIPELINE',
    technicalContext:
      'Asynchronous Map-Reduce ETL pipeline built on Wayground AI/ML team utilizing Celery, Redis, and Claude 3.5 Sonnet to extract, normalize, and reconcile complex K-12 state mathematics curriculum standards into structured database schemas.',
    problem:
      'Two recurring failure modes in LLM-assisted document parsing: 1) Model over-extraction into reserved blank schema columns (e.g. hallucinating legacy codes into czi_standard_code columns meant to remain blank in initial drafts); 2) Hierarchy depth truncation where multi-tier nested curriculum standards (e.g., Domain -> Cluster -> Standard -> Sub-item) were collapsed into flat unstructured text.',
    symptoms: [
      'Extracted CSV records failed downstream relational database foreign key and uniqueness constraints.',
      'Manual auditing required hours of human spot-checking to purge hallucinated data from reserved blank columns.',
      'Parent-child relationship links broken in exported curriculum taxonomy trees.'
    ],
    reproductionConditions:
      'Ingest multi-page PDF curriculum document containing hierarchical numbered standard outlines. Observe extracted CSV output across reserved draft columns and nested levels.',
    investigation:
      'Audited extracted CSV outputs against original state department of education standards PDFs. Traced issues to LLM attention completion behavior: when given a schema containing optional or reserved columns, models attempt to fill every field, inventing plausible codes rather than outputting null values.',
    hypotheses: [
      {
        hypothesis: 'Instruction prompting can reliably prevent the model from populating reserved columns.',
        confirmed: false,
        notes: 'Negative prompt instructions ("do not fill column X") showed intermittent compliance across long document chunks.'
      },
      {
        hypothesis: 'Post-extraction programmatic guard functions that enforce schema column constraints eliminate over-extraction deterministically.',
        confirmed: true,
        notes: 'apply_row_guards enforcing DRAFT_ALWAYS_BLANK_COLUMNS deterministically blanked reserved columns regardless of model output.'
      }
    ],
    rootCause:
      'Probabilistic token completion seeks to maximize information density by populating empty table cells; relying on prompt obedience for relational schema nullability guarantees is architecturally fragile.',
    resolution:
      '1) Implemented apply_row_guards in schemas.py enforcing DRAFT_ALWAYS_BLANK_COLUMNS by programmatically zeroing out reserved columns post-extraction; 2) Implemented TransformationReviewer in validation/reviewer.py checking hierarchy continuity across chunks and reconstructing parent-child continuity; 3) Dead-letter review queue (manual_review.json) capturing unresolvable extraction discrepancies without corrupting production CSV exports.',
    implementationDetails: {
      filesModifiedOrAuthored: [
        'schemas.py',
        'validation/reviewer.py',
        'csv_audit.py'
      ],
      keyFunctionsOrClasses: [
        'apply_row_guards',
        'TransformationReviewer',
        'normalize_grade_level'
      ],
      architecturalDecisions: [
        'ADR-ETL-01: Programmatic post-processing schema guards over prompt-based column blanking.',
        'ADR-ETL-02: 3-Tier validation gate architecture (schema format, relational integrity, semantic audit).',
        'ADR-ETL-03: Dead-letter queue isolating unverified extractions from production delivery.'
      ],
      beforeBehavior:
        'Reserved columns contained hallucinated identifiers; truncated hierarchies required extensive manual reconciliation.',
      afterBehavior:
        'Reserved columns programmatically enforced as empty strings; hierarchy continuity validated before database load.'
    },
    verification: {
      testCommand: 'pytest tests/test_validation.py',
      assertionCount: 38,
      verifiedScope:
        'Automated pytest validation suite verifying row guard blanking, grade level normalization, and hierarchy depth reconstruction.',
      evidenceStatus: 'CONTEMPORANEOUS_DOC',
      regressionEvidence:
        'Documented in research/project-analysis/curriculum-etl/failure-modes.md and canonicalRegistry.ts (CLAIM-ETL-001, EVID-ETL-01).'
    },
    outcome:
      'Robust asynchronous curriculum transformation pipeline guaranteeing schema compliance and eliminating manual clean-up of hallucinated column values.',
    limitations: [
      'Project is EMPLOYER_PROPRIETARY (developed on Wayground AI/ML team). Internal datasets, private repository URLs, and proprietary taxonomy mappings remain strictly confidential.',
      'Scraping state education websites remains subject to rate limits and upstream HTML structural changes.'
    ],
    lessons: [
      'Never rely on prompt obedience to enforce database schema constraints; always enforce nullability and column contracts in deterministic post-processing code.',
      'In high-throughput ETL pipelines, an explicit dead-letter queue is essential to prevent corrupted rows from poisoning relational stores.'
    ],
    visibility: 'EMPLOYER_PROPRIETARY_CASE_STUDY',
    publicationStatus: 'PROPRIETARY_RESTRICTED',
    documentationCompleteness: 'FULLY_DOCUMENTED',
    createdAt: '2026-04-15',
    sourceReferences: [
      'research/project-analysis/curriculum-etl/failure-modes.md',
      'research/project-analysis/curriculum-etl/engineering-decisions.md',
      'data/canonical/canonicalRegistry.ts:1125-1150'
    ]
  },

  // ============================================================================
  // CASE 7: US MATH ITEM BANK — VISUAL DOMAIN ROUTING & CURRICULUM BALANCING
  // ============================================================================
  {
    id: 'case-study-item-bank-domain-routing',
    title: 'Visual Domain Routing & ILP Stratified Curriculum Balancing in Collaborative Assessment Authoring',
    projectId: 'proj-item-bank',
    careerIds: ['car-wayground-aiml'],
    journalChapterIds: ['ch-14-applications-to-pipelines'],
    claimIds: [],
    evidenceIds: ['EVID-SRC-PROJECTS-01'],
    category: 'DETERMINISTIC_EVALUATION',
    technicalContext:
      'Collaborative enterprise assessment engineering pipeline at Wayground generating standards-aligned mathematics assessment items. The candidate contributed core visual domain routing, compile gates, and curriculum balancing algorithms within the team pipeline.',
    problem:
      'Generating mathematical assessment items with accurate visual diagrams encountered two severe bottlenecks: 1) Using a single rendering engine for all diagrams produced broken or distorted figures (e.g. TikZ struggled with interactive web SVG scaling, while SVG struggled with exact statistical coordinate geometry); 2) Generative pipelines skewed towards common curriculum standards, producing severe imbalances across state grade standards.',
    symptoms: [
      'Geometric diagrams rendered with overlapping axis ticks or clipped labels.',
      'Certain state curriculum standards received hundreds of items while adjacent standards received zero items.',
      'LaTeX compilation timeouts on complex geometric diagrams.'
    ],
    reproductionConditions:
      'Dispatch batch item generation across disparate mathematical domains (e.g. coordinate geometry vs algebraic graphs) without domain-specific routing.',
    investigation:
      'Analyzed diagram failure modes across 1,000+ item generations. Discovered that coordinate geometry and geometric transformations require exact SVG paths for web rendering, whereas statistical distributions and algebra plots require parametric TikZ LaTeX compile passes.',
    hypotheses: [
      {
        hypothesis: 'A single unified SVG generator can handle all mathematical visual needs.',
        confirmed: false,
        notes: 'Rejected: complex algebraic distributions and geometric proofs required symbolic TikZ engines.'
      },
      {
        hypothesis: 'Routing prompts to domain-specific rendering engines (SVG vs TikZ) based on mathematical standard classification resolves rendering failures.',
        confirmed: true,
        notes: 'Personal contribution: implemented visual domain router directing coordinate geometry to SVG and algebra to TikZ.'
      }
    ],
    rootCause:
      'Different mathematical visual domains possess fundamentally different rendering invariants; treating mathematical visualization as a monolithic generation task causes chronic rendering failures.',
    resolution:
      '1) Implemented mathematical visual domain routing: coordinate geometry and visual fractions route to direct SVG generators with viewBox boundaries; algebra and calculus route to TikZ with compile validation gates; 2) Applied Min/Max Swap optimization across candidate pools to restore balanced standard distributions.',
    implementationDetails: {
      filesModifiedOrAuthored: [
        'visual_routing/engine_router.py',
        'optimization/stratified_sampler.py',
        'compile_gates/tikz_validator.py'
      ],
      keyFunctionsOrClasses: [
        'route_visual_domain',
        'min_max_swap_balance',
        'compile_and_verify_tikz'
      ],
      architecturalDecisions: [
        'ADR-IB-01: Domain-specific visual engine routing (SVG vs TikZ).',
        'ADR-IB-02: Compile gates verifying rendering correctness before persistence.',
        'ADR-IB-03: Stratified sampling optimization balancing state curriculum coverage.'
      ],
      beforeBehavior:
        'Monolithic visual generation caused clipped diagrams and compile errors; standard distributions were heavily skewed.',
      afterBehavior:
        'Visuals routed to appropriate rendering engines with compile validation gates; item pools balanced across curriculum standards.'
    },
    verification: {
      verifiedScope:
        'Visual domain routing logic and compile gates integrated into Wayground team assessment authoring pipeline.',
      evidenceStatus: 'RETROSPECTIVE_SUMMARY',
      regressionEvidence:
        'Documented in canonicalRegistry.ts (proj-item-bank contributionBreakdown) and research/project-analysis/math-item-bank/.'
    },
    outcome:
      'Integrated robust visual routing and curriculum balancing algorithms into enterprise assessment authoring pipeline.',
    limitations: [
      'Project is EMPLOYER_PROPRIETARY (Wayground team engineering system). The candidate contributed specific modules (visual routing, compile gates, Min/Max Swap); the underlying core platform was built by the Wayground engineering team.',
      'Full codebase is enterprise-internal and unexecutable in this portfolio repository.'
    ],
    lessons: [
      'In collaborative team systems, clearly delineate personal module contributions from overall team system ownership.',
      'Specialized domain-specific rendering tools consistently outperform monolithic all-in-one generation approaches.'
    ],
    visibility: 'EMPLOYER_PROPRIETARY_CASE_STUDY',
    publicationStatus: 'PROPRIETARY_RESTRICTED',
    documentationCompleteness: 'PARTIALLY_DOCUMENTED',
    createdAt: '2026-05-20',
    sourceReferences: [
      'research/project-analysis/math-item-bank/failure-modes.md',
      'research/project-analysis/math-item-bank/engineering-decisions.md',
      'data/canonical/canonicalRegistry.ts:478-537'
    ]
  },

  // ============================================================================
  // CASE 8: DOCUMENTATION GAP RECORD — DIFFGUARD
  // ============================================================================
  {
    id: 'case-study-gap-diffguard',
    title: 'DiffGuard Governance Standard Evidence Boundary & Investigation Gap Record',
    projectId: null,
    careerIds: [],
    journalChapterIds: [],
    claimIds: [],
    evidenceIds: [],
    category: 'DOCUMENTATION_GAP',
    technicalContext:
      'Referenced in portfolio audit comments ("Standard: DiffGuard-grade Evidence Provenance & Canonical Schema Invariants" in data/canonical/canonicalValidator.ts:13) and prompt instructions as a potential candidate for investigation.',
    problem:
      'Forensic investigation across the repository, commit history, and configuration files revealed that DiffGuard does not exist as an independent runnable project, local repository, or registered canonical project record within this workspace.',
    symptoms: [
      'Zero project records in canonicalRegistry matching "diffguard" or "diff-guard".',
      'Zero test files or source directories in the portfolio repository for DiffGuard.',
      'References are limited exclusively to inline comments referencing DiffGuard as an external audit benchmark or standard.'
    ],
    reproductionConditions:
      'Execute workspace-wide search for "diffguard" across all source files, schemas, and git trees.',
    investigation:
      'Conducted exhaustive regex and file tree inspection across all repository roots. Verified that DiffGuard was referenced as a quality/audit standard rather than a standalone software system implemented in this repository.',
    hypotheses: [
      {
        hypothesis: 'DiffGuard exists as an uncommitted sub-package or branch in this workspace.',
        confirmed: false,
        notes: 'Exhaustive filesystem search found no DiffGuard package, source code, or submodule.'
      },
      {
        hypothesis: 'DiffGuard represents an external quality framework or prospective standard cited in auditor notes.',
        confirmed: true,
        notes: 'Confirmed: presence is strictly confined to comments and audit documentation.'
      }
    ],
    rootCause:
      'DiffGuard was cited in auditing rubrics as a conceptual engineering standard for strict evidence provenance; it was never authored as a standalone runnable software project in this portfolio repository.',
    resolution:
      'Recorded strictly as an explicit documentation gap with documentationCompleteness = INSUFFICIENT_EVIDENCE. In accordance with Phase 2.5A governance rules, missing technical details remain explicitly unknown and unevidenced. Zero incidents, symptoms, root causes, or tests have been fabricated.',
    implementationDetails: {
      filesModifiedOrAuthored: [],
      keyFunctionsOrClasses: [],
      architecturalDecisions: [
        'ADR-GAP-01: Epistemic honesty invariant — explicitly record missing project evidence as a documentation gap rather than inventing technical narratives.'
      ],
      beforeBehavior:
        'DiffGuard presence was ambiguous based on brief comments in validation headers.',
      afterBehavior:
        'DiffGuard is definitively cataloged as an unevidenced candidate with INSUFFICIENT_EVIDENCE status.'
    },
    verification: {
      verifiedScope:
        'Workspace repository forensic audit verifying zero local project records.',
      evidenceStatus: 'DOCUMENTATION_GAP',
      regressionEvidence:
        'Forensic search in data/canonical/canonicalValidator.ts:13.'
    },
    outcome:
      'Preserved complete epistemic integrity: no fabricated incidents or fictional debugging logs were introduced.',
    limitations: [
      'No source code, architecture, or performance metrics exist for DiffGuard in this repository.',
      'Cannot be linked to canonical project or evidence IDs.'
    ],
    lessons: [
      'When evidence is absent, state that it is absent. Never manufacture technical stories or fake debugging logs.',
      'A trustworthy portfolio must clearly distinguish verified engineering artifacts from conceptual references.'
    ],
    visibility: 'INTERNAL_AUDIT',
    publicationStatus: 'PUBLIC_APPROVED',
    documentationCompleteness: 'INSUFFICIENT_EVIDENCE',
    sourceReferences: [
      'data/canonical/canonicalValidator.ts:13'
    ]
  }
]
