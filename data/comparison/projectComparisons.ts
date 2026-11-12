/**
 * Project Comparison Profiles
 * Phase 6.5 — Interactive Project Comparison
 *
 * Source-grounded technical comparison profiles across all 11 portfolio case studies.
 * Strictly adheres to Level 1 engineering-security-reliability standards.
 * Every dimension maps directly to verified source code, architectural components,
 * decision records (ADRs), and Phase 6.4 verification evidence records.
 */

import { ProjectComparisonProfile } from './types'

export const PROJECT_COMPARISONS: Record<string, ProjectComparisonProfile> = {
  // ===========================================================================
  // 1. ASK AADIL
  // ===========================================================================
  'ask-aadil': {
    slug: 'ask-aadil',
    name: 'Ask Aadil',
    tagline: 'Stateful conversational RAG agent with deterministic intent routing and governed tool execution.',
    category: 'agentic-orchestration',
    systemRole: 'Personal AI Engineering Portfolio Assistant & Conversational Agent',
    caseStudyRoute: '/projects/ask-aadil',
    architectureRoute: '/architecture?system=ask-aadil',
    verificationRoute: '/verification#evid-evid-aa-01',
    decisionRecordsRoute: '/projects/ask-aadil#decisions',
    dimensions: {
      'problem-objective': {
        dimensionId: 'problem-objective',
        title: 'Grounded Conversational Portfolio Discovery',
        summary:
          'Enables hiring managers and technical recruiters to interrogate engineering depth through an interactive dialogue grounded strictly in verified case studies, source files, and metrics.',
        keyMechanisms: [
          'Interactive conversational exploration of 11 portfolio case studies',
          'Strict epistemic boundaries preventing hallucinated credentials or non-existent projects',
          'Natural language UI navigation with pre-flight client-side user confirmation',
        ],
        evidenceIds: ['EVID-AA-01', 'EVID-AA-02', 'EVID-AA-03'],
        componentIds: ['aa-session', 'aa-synthesizer'],
        decisionIds: ['ADR-AA-01', 'ADR-AA-02'],
      },
      'architectural-pattern': {
        dimensionId: 'architectural-pattern',
        title: 'Stateful Conversational RAG with Deterministic Intent Router',
        summary:
          'Decoupled two-tier architecture: deterministic regex/entity parsing runs prior to LLM synthesis, followed by hybrid in-memory retrieval and prompt-grounded answer generation.',
        keyMechanisms: [
          'Pre-flight regex intent classifier (< 2ms) routing navigation and contact intents',
          'Multi-turn pronoun resolution against 10 prior conversation turns',
          'Serverless Next.js API routes with client-side conversation state preservation',
        ],
        evidenceIds: ['EVID-AA-01'],
        componentIds: ['aa-intent-router', 'aa-entity-resolver'],
        decisionIds: ['ADR-AA-01'],
      },
      'ai-vs-deterministic': {
        dimensionId: 'ai-vs-deterministic',
        title: 'Deterministic Gatekeeper Before Probabilistic Synthesis',
        summary:
          'All routing, entity resolution, navigation tool allowlists, and out-of-domain rejection are 100% deterministic code. Generative AI is restricted to grounding synthesis from retrieved chunks.',
        keyMechanisms: [
          'Deterministic regex matching for navigation, contact, and identity intents',
          'Deterministic keyword dictionary resolving pronouns to canonical project slugs',
          'Generative LLM invoked only when contextual chunk synthesis is explicitly required',
        ],
        evidenceIds: ['EVID-AA-01', 'EVID-AA-02'],
        componentIds: ['aa-intent-router', 'aa-action-gate'],
        decisionIds: ['ADR-AA-01', 'ADR-AA-02'],
      },
      'data-retrieval': {
        dimensionId: 'data-retrieval',
        title: 'In-Memory Hybrid BM25 + Subword Vector Search (RRF k=60)',
        summary:
          'Zero external database dependency. Evaluates BM25 lexical search and client-side subword character n-gram embeddings in memory, combining ranks via Reciprocal Rank Fusion.',
        keyMechanisms: [
          'BM25 term frequency scoring across structured markdown chunks',
          'Subword character n-gram vector similarity matching without heavy ML runtime',
          'Reciprocal Rank Fusion (k=60) balancing exact term hits with fuzzy semantic matches',
        ],
        evidenceIds: ['EVID-AA-01'],
        componentIds: ['aa-hybrid-retriever'],
        decisionIds: ['ADR-AA-01'],
      },
      'orchestration-state': {
        dimensionId: 'orchestration-state',
        title: 'Turn-Based Procedural State Machine with Session Isolation',
        summary:
          'Linear stateful pipeline transitioning through Session Ingest -> Intent Routing -> Entity Resolution -> Hybrid Retrieval -> Answer Synthesis -> Action Gate.',
        keyMechanisms: [
          'Turn history tracked across 10-turn rolling memory window',
          'Ephemeral session isolation avoiding state bleed between distinct user browser tabs',
          'Synchronous HTTP request-response cycle optimized for sub-1.5s overall latency',
        ],
        evidenceIds: ['EVID-AA-01'],
        componentIds: ['aa-session', 'aa-synthesizer'],
        decisionIds: ['ADR-AA-01'],
      },
      'failure-containment': {
        dimensionId: 'failure-containment',
        title: 'Epistemic Abstention & Sandboxed Route Governance',
        summary:
          'Detects absent factual chunks or out-of-domain queries and triggers deterministic abstention ("I do not have verified evidence regarding..."). Navigation is locked to an exact route allowlist.',
        keyMechanisms: [
          'Deterministic negative abstention on unrecorded projects or false premises',
          'Strict route allowlist rejecting arbitrary external redirect attempts',
          'Fallback to safe clarification prompts when retrieval confidence is below threshold',
        ],
        evidenceIds: ['EVID-AA-02'],
        componentIds: ['aa-action-gate', 'aa-synthesizer'],
        decisionIds: ['ADR-AA-02'],
      },
      'evaluation-verification': {
        dimensionId: 'evaluation-verification',
        title: 'Comprehensive In-Repo Automated Test Suite (771 Assertions)',
        summary:
          'Verified across dedicated automated suites covering retrieval precision, pronoun resolution, route governance, and negative abstention under test conditions.',
        keyMechanisms: [
          'scripts/test_grounded_conversational_evaluation.ts (16 conversational regression tests)',
          'scripts/test_retrieval_foundation.ts (evaluating Top-1 and Top-3 recall)',
          'Automated negative testing asserting 100% rejection of fabricated claims in CI',
        ],
        evidenceIds: ['EVID-AA-01', 'EVID-AA-02', 'EVID-AA-03'],
        componentIds: ['aa-hybrid-retriever', 'aa-synthesizer'],
        decisionIds: ['ADR-AA-01', 'ADR-AA-02'],
      },
      'hitl-governance': {
        dimensionId: 'hitl-governance',
        title: 'Client-Side Action Confirmation Contracts',
        summary:
          'The conversational agent can never navigate pages, initiate downloads, or trigger contact modals autonomously; it emits structured action proposals that require explicit user click.',
        keyMechanisms: [
          'Two-phase action dispatch: Agent proposes -> UI displays confirmation card -> User clicks',
          'Explicit user authorization required for route transitions',
          'Zero silent background side-effects',
        ],
        evidenceIds: ['EVID-AA-02'],
        componentIds: ['aa-action-gate'],
        decisionIds: ['ADR-AA-02'],
      },
      'core-trade-offs': {
        dimensionId: 'core-trade-offs',
        title: 'In-Memory Subword Vectors vs External Vector DB (Pinecone/Milvus)',
        summary:
          'Accepted limited vocabulary representation and manual keyword mapping in exchange for $0 hosting cost, zero external API latency, and 100% offline CI test reproducibility.',
        keyMechanisms: [
          'In-memory vectors eliminate network hop latency (sub-50ms retrieval)',
          'Manual intent keywords require ongoing maintenance as new projects are added',
          'Avoids cold-start database connection penalties in serverless environments',
        ],
        evidenceIds: ['EVID-AA-01'],
        componentIds: ['aa-hybrid-retriever'],
        decisionIds: ['ADR-AA-01'],
      },
      'individual-contribution': {
        dimensionId: 'individual-contribution',
        title: 'Sole Author & System Architect',
        summary:
          'Conceived, designed, and implemented 100% of Ask Aadil, including the hybrid BM25 engine, intent state machine, voice interface bridge, and verification test harnesses.',
        keyMechanisms: [
          'Sole author of lib/rag/ codebase (2,800+ lines of TypeScript)',
          'Engineered custom RRF rank merger and character n-gram similarity math',
          'Built the RAG Evaluation Lab to benchmark retrieval precision and recall',
        ],
        evidenceIds: ['EVID-AA-01', 'EVID-AA-02', 'EVID-AA-03'],
        componentIds: ['aa-session', 'aa-intent-router', 'aa-hybrid-retriever', 'aa-synthesizer'],
        decisionIds: ['ADR-AA-01', 'ADR-AA-02', 'ADR-AA-03'],
      },
    },
    tradeOffs: [
      {
        title: 'In-Memory Subword Vectors vs 1536-Dim Neural Embeddings',
        chosenApproach: 'In-memory BM25 + subword character n-gram vectors with Reciprocal Rank Fusion (k=60)',
        alternativeRejected: 'External vector database (e.g. Pinecone) with remote embedding model (text-embedding-3-small)',
        technicalRationale: 'Eliminates 120-300ms remote embedding latency and $0 runtime dependency, enabling 100% offline CI testing.',
        acceptedCompromise: 'Requires curated domain synonym tables and cannot capture high-level cross-lingual abstract semantics.',
        evidenceId: 'EVID-AA-01',
        decisionId: 'ADR-AA-01',
      },
      {
        title: 'Deterministic Intent Routing vs Monolithic LLM Tool Calling',
        chosenApproach: 'Pre-flight regex and keyword router executing before any LLM invocation',
        alternativeRejected: 'Single-prompt LLM tool-calling agent with JSON Schema function descriptors',
        technicalRationale: 'Guarantees sub-2ms response for navigational intents without incurring token costs or hallucinated URLs.',
        acceptedCompromise: 'Phrasing that diverges completely from established regex patterns falls through to synthesis.',
        evidenceId: 'EVID-AA-01',
        decisionId: 'ADR-AA-01',
      },
    ],
  },

  // ===========================================================================
  // 2. AI APPLICATION RELIABILITY PLATFORM
  // ===========================================================================
  'ai-reliability': {
    slug: 'ai-reliability',
    name: 'AI Application Reliability Platform',
    tagline: 'Synthetic browser execution & multi-agent diagnostic pipeline with statistical uncertainty circuit breakers.',
    category: 'evaluation-testing',
    systemRole: 'Autonomous Software Testing, Drift Detection & Root-Cause Diagnosis Platform',
    caseStudyRoute: '/projects/ai-reliability',
    architectureRoute: '/architecture?system=ai-reliability',
    verificationRoute: '/verification#evid-evid-rel-01',
    decisionRecordsRoute: '/projects/ai-reliability#decisions',
    dimensions: {
      'problem-objective': {
        dimensionId: 'problem-objective',
        title: 'Autonomous Detection of Non-Deterministic AI Application Regressions',
        summary:
          'Detects functional and behavioral regressions in probabilistic AI web applications by driving headless browsers through synthetic multi-turn user journeys and diagnosing root causes.',
        keyMechanisms: [
          'Headless browser automation executing dynamic agent interaction flows',
          'Automated capture of DOM mutations, network HAR traces, and console telemetry',
          'Root-cause classification attributing failures to prompts, models, or backend code',
        ],
        evidenceIds: ['EVID-REL-01', 'EVID-REL-02'],
        componentIds: ['rel-playwright', 'rel-telemetry-collector'],
        decisionIds: ['ADR-REL-01'],
      },
      'architectural-pattern': {
        dimensionId: 'architectural-pattern',
        title: 'Synthetic Browser Execution & Multi-Agent Diagnostic Pipeline',
        summary:
          'Dual-layer pipeline: an execution layer driving Playwright headless browser instances and a diagnostic reasoning layer running local LLMs to parse telemetry and isolate failure causes.',
        keyMechanisms: [
          'Playwright headless Chromium worker pool for concurrent browser execution',
          'Multi-agent diagnostic loop evaluating DOM state against expected assertions',
          'Cryptographic ledger recording test artifacts and diagnostic decisions',
        ],
        evidenceIds: ['EVID-REL-01'],
        componentIds: ['rel-playwright', 'rel-ollama-reasoner'],
        decisionIds: ['ADR-REL-01'],
      },
      'ai-vs-deterministic': {
        dimensionId: 'ai-vs-deterministic',
        title: 'Probabilistic Diagnosis Constrained by Deterministic Playwright Telemetry',
        summary:
          'Browser execution, DOM capture, HAR trace recording, and statistical uncertainty calculations are 100% deterministic code. Local LLMs are utilized solely for unstructured root-cause hypothesis generation.',
        keyMechanisms: [
          'Deterministic Playwright assertions for DOM element presence and HTTP status',
          'Probabilistic local LLM (Ollama) reasoning over unstructured stack traces and logs',
          'Statistical Fisher Information calculation gating diagnostic assertions',
        ],
        evidenceIds: ['EVID-REL-01', 'EVID-REL-03'],
        componentIds: ['rel-playwright', 'rel-fisher-gate'],
        decisionIds: ['ADR-REL-01', 'ADR-REL-03'],
      },
      'data-retrieval': {
        dimensionId: 'data-retrieval',
        title: 'Structured Telemetry Buffers & Vectorized Failure Baselines',
        summary:
          'Captures execution traces into in-memory JSON buffers, calculating DOM difference hashes and vectorizing regression symptoms against a local store of historical failure patterns.',
        keyMechanisms: [
          'Structured HAR network capture and console log serialization',
          'DOM subtree tree-differencing to isolate dynamic UI layout shifts',
          'Local embedding similarity against known bug signatures',
        ],
        evidenceIds: ['EVID-REL-01', 'EVID-REL-02'],
        componentIds: ['rel-telemetry-collector'],
        decisionIds: ['ADR-REL-01'],
      },
      'orchestration-state': {
        dimensionId: 'orchestration-state',
        title: 'Multi-Process Async Worker Pool with Seeded Synthetic Journeys',
        summary:
          'Coordinates browser workers via asynchronous worker queues. Synthetic user journeys are initialized with fixed pseudo-random seeds (seed 42) to ensure deterministic reproduction.',
        keyMechanisms: [
          'Worker pool managing browser lifecycle and resource allocation',
          'Fixed pseudo-random seed generator (seed 42) for reproducible user paths',
          'Asynchronous dispatch of diagnostic reasoning jobs to local Ollama daemon',
        ],
        evidenceIds: ['EVID-REL-02'],
        componentIds: ['rel-playwright', 'rel-ollama-reasoner'],
        decisionIds: ['ADR-REL-02'],
      },
      'failure-containment': {
        dimensionId: 'failure-containment',
        title: 'Fisher Information Covariance Uncertainty Circuit Breaker',
        summary:
          'Calculates the Fisher Information covariance matrix over model logit uncertainties; if the determinant falls below threshold, the system triggers `Decision: ABSTAIN` rather than asserting a false diagnosis.',
        keyMechanisms: [
          'Fisher Information matrix calculation on token probability distributions',
          'Covariance determinant threshold gating automated root-cause reports',
          'Automated browser process kill switches preventing memory leaks during hung runs',
        ],
        evidenceIds: ['EVID-REL-03'],
        componentIds: ['rel-fisher-gate'],
        decisionIds: ['ADR-REL-03'],
      },
      'evaluation-verification': {
        dimensionId: 'evaluation-verification',
        title: '205 Automated Tests (158 Pytests + 47 Governance / Playwright E2E)',
        summary:
          'Verified by 158 backend pytests covering diagnostic logic and 47 end-to-end Playwright tests evaluating browser automation, uncertainty gating, and ledger integrity.',
        keyMechanisms: [
          '158 automated pytests testing telemetry parsing and circuit breakers',
          '47 Playwright governance tests asserting browser execution accuracy',
          'Synthetic stress run across 1,000 multi-turn simulated journeys',
        ],
        evidenceIds: ['EVID-REL-01', 'EVID-REL-02', 'EVID-REL-03'],
        componentIds: ['rel-playwright', 'rel-fisher-gate'],
        decisionIds: ['ADR-REL-01', 'ADR-REL-03'],
      },
      'hitl-governance': {
        dimensionId: 'hitl-governance',
        title: 'Append-Only Cryptographic Genesis Block Provenance Ledger',
        summary:
          'Every diagnostic report, DOM snapshot hash, and circuit breaker activation is committed to an append-only SHA-256 provenance chain, ensuring auditability before engineering review.',
        keyMechanisms: [
          'SHA-256 genesis block chaining all test execution runs',
          'Tamper-evident audit trails for automated regression passes and failures',
          'Human-in-the-loop review interface for disputed diagnostic classifications',
        ],
        evidenceIds: ['EVID-REL-01'],
        componentIds: ['rel-provenance-ledger', 'rel-governance-gate'],
        decisionIds: ['ADR-REL-01'],
      },
      'core-trade-offs': {
        dimensionId: 'core-trade-offs',
        title: 'Local Ollama Diagnostic Inference vs Cloud LLM APIs (OpenAI/Anthropic)',
        summary:
          'Accepted slower per-token inference and higher local RAM consumption to eliminate data privacy risks (transmitting proprietary DOM data offsite) and achieve zero API costs during 1,000-run suites.',
        keyMechanisms: [
          'Zero sensitive DOM or corporate data leaves the on-premise execution environment',
          'Allows unconstrained synthetic test loops without accumulating API bills',
          'Constrained reasoning capacity compared to frontier cloud models',
        ],
        evidenceIds: ['EVID-REL-01', 'EVID-REL-02'],
        componentIds: ['rel-ollama-reasoner'],
        decisionIds: ['ADR-REL-01'],
      },
      'individual-contribution': {
        dimensionId: 'individual-contribution',
        title: 'Sole Author & System Architect',
        summary:
          'Conceived and implemented the entire platform, including the Playwright browser harness, the Fisher Information uncertainty gate, and the cryptographic provenance ledger.',
        keyMechanisms: [
          'Authored Playwright browser orchestration and DOM difference engine',
          'Derived and implemented the Fisher Information covariance circuit breaker',
          'Engineered the SHA-256 append-only ledger for test run certification',
        ],
        evidenceIds: ['EVID-REL-01', 'EVID-REL-02', 'EVID-REL-03'],
        componentIds: ['rel-playwright', 'rel-fisher-gate', 'rel-provenance-ledger'],
        decisionIds: ['ADR-REL-01', 'ADR-REL-02', 'ADR-REL-03'],
      },
    },
    tradeOffs: [
      {
        title: 'Local LLM (Ollama) vs Cloud API Diagnostic Reasoning',
        chosenApproach: 'Self-hosted local quantized model (Mistral-7B via Ollama) executing within sandbox',
        alternativeRejected: 'Commercial cloud LLM APIs (GPT-4o / Claude 3.5 Sonnet)',
        technicalRationale: 'Prevents transmission of confidential proprietary application DOM trees and internal network traces to third parties, while eliminating per-token billing on 1,000+ run test matrices.',
        acceptedCompromise: 'Inference latency is higher (3-5s per diagnosis) and reasoning depth on obscure stack traces is narrower.',
        evidenceId: 'EVID-REL-01',
        decisionId: 'ADR-REL-01',
      },
      {
        title: 'Statistical Uncertainty Gate vs Mandatory Diagnostic Output',
        chosenApproach: 'Fisher Information covariance matrix gate triggering `Decision: ABSTAIN` when uncertain',
        alternativeRejected: 'Best-effort diagnosis emitting model completion regardless of logit entropy',
        technicalRationale: 'A false root-cause diagnosis wastes hours of senior developer debugging time; an explicit abstention preserves high platform credibility.',
        acceptedCompromise: 'A percentage of highly noisy edge-case failures require manual engineer investigation.',
        evidenceId: 'EVID-REL-03',
        decisionId: 'ADR-REL-03',
      },
    ],
  },

  // ===========================================================================
  // 3. SOLACE AI
  // ===========================================================================
  'solace-ai': {
    slug: 'solace-ai',
    name: 'Solace AI',
    tagline: 'Mobile React Native + FastAPI voice companion with microsecond crisis circuit breakers and ephemeral audio processing.',
    category: 'mobile-voice',
    systemRole: 'Real-Time Voice-First Conversational Mental Health Companion',
    caseStudyRoute: '/projects/solace-ai',
    architectureRoute: '/architecture?system=solace-ai',
    verificationRoute: '/verification#evid-evid-sol-01',
    decisionRecordsRoute: '/projects/solace-ai#decisions',
    dimensions: {
      'problem-objective': {
        dimensionId: 'problem-objective',
        title: 'Low-Latency Empathetic Voice Interaction with Guaranteed Crisis Safety',
        summary:
          'Provides real-time conversational voice support on mobile devices while guaranteeing instant detection and escalation of self-harm triggers and absolute user audio privacy.',
        keyMechanisms: [
          'Sub-second voice-to-voice streaming pipeline for empathetic conversational pacing',
          'Instant safety intervention intercepting suicide, overdose, or self-harm ideation',
          'Strict zero-persistence audio handling protecting sensitive patient disclosures',
        ],
        evidenceIds: ['EVID-SOL-01', 'EVID-SOL-02', 'EVID-SOL-04'],
        componentIds: ['sol-mobile', 'sol-crisis-gate', 'sol-voice-privacy'],
        decisionIds: ['ADR-SOL-01', 'ADR-SOL-02', 'ADR-SOL-03'],
      },
      'architectural-pattern': {
        dimensionId: 'architectural-pattern',
        title: 'Mobile Client with Streaming API Backend & Microsecond Safety Gate',
        summary:
          'React Native client communicating over single-POST idempotent HTTP/WebSocket with a FastAPI backend; audio passes through Whisper STT, a microsecond regex crisis gate, LangGraph orchestration, and ElevenLabs TTS.',
        keyMechanisms: [
          'Cross-platform React Native audio recorder with native PCM streaming buffers',
          'FastAPI asynchronous gateway coordinating speech, reasoning, and synthesis services',
          'Microsecond regex crisis gate intercepting audio transcription before LLM inference',
        ],
        evidenceIds: ['EVID-SOL-01', 'EVID-SOL-02'],
        componentIds: ['sol-fastapi-gateway', 'sol-crisis-gate'],
        decisionIds: ['ADR-SOL-01', 'ADR-SOL-02'],
      },
      'ai-vs-deterministic': {
        dimensionId: 'ai-vs-deterministic',
        title: 'Sub-Millisecond Regex Safety Interceptor Bypassing Generative LLM',
        summary:
          'Emergency crisis detection (< 2ms) and audio buffer deallocation are purely deterministic code. AI models are used strictly for transcription (Whisper), dialogue pacing (LangGraph), and voice synthesis (ElevenLabs).',
        keyMechanisms: [
          'Compiled regex AST scanning transcribed text for 24 explicit crisis keywords in < 2ms',
          'Deterministic crisis protocol bypasses LLM entirely, immediately returning emergency hotline resources',
          'Generative LLM is never relied upon to decide whether a user is in acute medical danger',
        ],
        evidenceIds: ['EVID-SOL-02'],
        componentIds: ['sol-crisis-gate'],
        decisionIds: ['ADR-SOL-02'],
        qualificationNote: '100% detection rate strictly applies to the 24 explicit critical regex patterns in is_crisis_input.',
      },
      'data-retrieval': {
        dimensionId: 'data-retrieval',
        title: 'Supabase PostgreSQL with Row-Level Security & Ephemeral In-Memory Audio',
        summary:
          'Stores user profile preferences and consent settings in Supabase PostgreSQL locked by user-scoped RLS policies. Audio buffers are processed purely in memory and deallocated immediately.',
        keyMechanisms: [
          'Supabase PostgreSQL with strict Row-Level Security (RLS) policies per user UUID',
          'Zero-persistence audio processing: raw audio bytes deallocated in Python `finally:` block',
          'Ephemeral session token rotation securing mobile WebSocket sessions',
        ],
        evidenceIds: ['EVID-SOL-04'],
        componentIds: ['sol-memory-consent', 'sol-voice-privacy'],
        decisionIds: ['ADR-SOL-03'],
      },
      'orchestration-state': {
        dimensionId: 'orchestration-state',
        title: 'Idempotent Single-POST Transport & Asynchronous Pipeline Dispatch',
        summary:
          'Mobile client dispatches voice turns using idempotent transaction identifiers, allowing graceful retry on mobile cellular drops without duplicate audio responses or state desynchronization.',
        keyMechanisms: [
          'Client-generated UUID transaction tokens preventing duplicate turn dispatches',
          'Asynchronous pipeline linking STT -> Crisis Check -> LLM Dialog -> TTS',
          'Audio chunk streaming over WebSocket to minimize perceived latency',
        ],
        evidenceIds: ['EVID-SOL-03'],
        componentIds: ['sol-transport', 'sol-fastapi-gateway'],
        decisionIds: ['ADR-SOL-01'],
      },
      'failure-containment': {
        dimensionId: 'failure-containment',
        title: 'Microsecond Crisis Circuit Breaker (< 2ms) & Network Drop Resilience',
        summary:
          'If crisis patterns are detected, the pipeline aborts LLM generation in < 2ms. If the backend fails (502/504), the mobile client presents local offline grounding exercises and emergency hotline numbers.',
        keyMechanisms: [
          'Hard circuit breaker aborting model generation immediately on crisis detection',
          'Mobile client offline fallback displaying emergency contacts when backend times out',
          'Connection retry with exponential backoff and jitter for patchy cellular links',
        ],
        evidenceIds: ['EVID-SOL-02', 'EVID-SOL-03'],
        componentIds: ['sol-crisis-gate', 'sol-transport'],
        decisionIds: ['ADR-SOL-02'],
      },
      'evaluation-verification': {
        dimensionId: 'evaluation-verification',
        title: '102 Automated Tests Across Mobile Client & FastAPI Backend',
        summary:
          'Verified by 102 automated checks across mobile React Native components and FastAPI backend services, including 24 critical-path crisis detection regression tests.',
        keyMechanisms: [
          '100% detection rate verified across 24 critical crisis input patterns in CI',
          'Latency benchmarking confirming crisis interception executes in < 2ms',
          'Memory leak and audio deallocation verification confirming zero disk writes',
        ],
        evidenceIds: ['EVID-SOL-01', 'EVID-SOL-02', 'EVID-SOL-04'],
        componentIds: ['sol-fastapi-gateway', 'sol-crisis-gate', 'sol-voice-privacy'],
        decisionIds: ['ADR-SOL-01', 'ADR-SOL-02'],
      },
      'hitl-governance': {
        dimensionId: 'hitl-governance',
        title: 'Emergency Medical Hotline Escalation & Consent Protocol',
        summary:
          'Provides immediate warm handoffs to verified human emergency services (988 Suicide & Crisis Lifeline) when acute distress is flagged, backed by explicit user consent agreements.',
        keyMechanisms: [
          'Immediate phone dialer intent link surfaced upon crisis detection',
          'Explicit user consent required for memory retention of conversational themes',
          'User-controlled "Forget Session" button clearing conversational state immediately',
        ],
        evidenceIds: ['EVID-SOL-02'],
        componentIds: ['sol-crisis-gate', 'sol-memory-consent'],
        decisionIds: ['ADR-SOL-02'],
      },
      'core-trade-offs': {
        dimensionId: 'core-trade-offs',
        title: 'Compiled Regex Safety Gate vs Multi-Turn LLM Clinical Assessment',
        summary:
          'Accepted potential false-positive triggers on benign metaphorical phrases ("I\'m dying of laughter") in exchange for deterministic, sub-2ms crisis intervention that cannot be bypassed by prompt injection.',
        keyMechanisms: [
          'Sub-2ms deterministic regex execution ensures safety is never delayed by inference latency',
          'Eliminates prompt jailbreaking or adversarial bypass of safety safeguards',
          'Triggers emergency modal even when user intended metaphorical expression',
        ],
        evidenceIds: ['EVID-SOL-02'],
        componentIds: ['sol-crisis-gate'],
        decisionIds: ['ADR-SOL-02'],
      },
      'individual-contribution': {
        dimensionId: 'individual-contribution',
        title: 'Full-Stack Architect & Mobile Lead',
        summary:
          'Architected and implemented the React Native mobile application, the FastAPI streaming gateway, the microsecond crisis detector, and the zero-retention audio memory deallocation pipeline.',
        keyMechanisms: [
          'Authored React Native audio streaming bridge and idempotent transport client',
          'Built FastAPI backend pipeline integrating Whisper and ElevenLabs APIs',
          'Implemented the critical regex crisis detection service and privacy deallocator',
        ],
        evidenceIds: ['EVID-SOL-01', 'EVID-SOL-02', 'EVID-SOL-03', 'EVID-SOL-04'],
        componentIds: ['sol-mobile', 'sol-transport', 'sol-crisis-gate', 'sol-voice-privacy'],
        decisionIds: ['ADR-SOL-01', 'ADR-SOL-02', 'ADR-SOL-03'],
      },
    },
    tradeOffs: [
      {
        title: 'Compiled Regex AST Safety Gate vs Semantic LLM Classifier',
        chosenApproach: 'Deterministic compiled regex scanner executing in < 2ms ahead of LLM',
        alternativeRejected: 'Fine-tuned safety classifier model or secondary LLM safety prompt',
        technicalRationale: 'A patient in crisis cannot wait 800ms for a model to classify suicide risk; deterministic regex guarantees sub-2ms interception with zero risk of prompt jailbreaks.',
        acceptedCompromise: 'Metaphorical phrases containing trigger words may trigger emergency modal false positives.',
        evidenceId: 'EVID-SOL-02',
        decisionId: 'ADR-SOL-02',
      },
      {
        title: 'Ephemeral In-Memory Audio vs Persistent S3 Audio Storage',
        chosenApproach: 'Immediate memory deallocation (`del audio_bytes`) inside Python `finally:` block',
        alternativeRejected: 'Storing audio files in AWS S3 for retrospective acoustic model training',
        technicalRationale: 'Mental health voice recordings represent high-risk personal health data; zero data retention eliminates risk of HIPAA violations or audio leak exposure.',
        acceptedCompromise: 'Impossible to retrain custom acoustic speech models on real-world patient voice recordings.',
        evidenceId: 'EVID-SOL-04',
        decisionId: 'ADR-SOL-03',
      },
    ],
  },

  // ===========================================================================
  // 4. ENGINEERING DESIGN AUTOMATION (EDA)
  // ===========================================================================
  'design-automation': {
    slug: 'design-automation',
    name: 'Engineering Design Automation',
    tagline: 'Deterministic engineering calculus & parametric CAD pipeline with closed-form Saint-Venant torsional physics.',
    category: 'cad-cae',
    systemRole: 'Generative Mechanical CAD Modeling & Analytical Engineering Platform',
    caseStudyRoute: '/projects/design-automation',
    architectureRoute: '/architecture?system=design-automation',
    verificationRoute: '/verification#evid-evid-eda-01',
    decisionRecordsRoute: '/projects/design-automation#decisions',
    dimensions: {
      'problem-objective': {
        dimensionId: 'problem-objective',
        title: 'Automated Parametric Mechanical Part Generation from Specifications',
        summary:
          'Transforms natural language engineering requirements into verified 3D CAD solid models (STEP/BRep) and FEA-validated structural calculations without human CAD modeling overhead.',
        keyMechanisms: [
          'Extracts geometric constraints and loading parameters from user prompts',
          'Computes exact stress distributions and torsional deflection using analytical equations',
          'Generates production-grade BRep 3D solid geometry exported to standard STEP format',
        ],
        evidenceIds: ['EVID-EDA-01', 'EVID-EDA-02'],
        componentIds: ['eda-input', 'eda-cad-kernel'],
        decisionIds: ['ADR-EDA-01', 'ADR-EDA-02'],
      },
      'architectural-pattern': {
        dimensionId: 'architectural-pattern',
        title: 'Analytical Physics Engine & Parametric OpenCascade Solid Modeling Kernel',
        summary:
          'Strict three-tier pipeline: Natural language constraint extractor -> Deterministic Saint-Venant analytical physics solver -> Containerized OpenCascade 7.6.0 BRep geometric kernel.',
        keyMechanisms: [
          'Python-based constraint parser isolating dimensional variables and load conditions',
          'Closed-form Saint-Venant analytical beam and torsion physics solver',
          'OpenCascade C++ geometry kernel wrapped in Python (pythonocc) for 3D topology',
        ],
        evidenceIds: ['EVID-EDA-01'],
        componentIds: ['eda-extractor', 'eda-solvers', 'eda-cad-kernel'],
        decisionIds: ['ADR-EDA-01', 'ADR-EDA-02'],
      },
      'ai-vs-deterministic': {
        dimensionId: 'ai-vs-deterministic',
        title: 'AI Strictly Confined to Parameter Extraction; Physics 100% Deterministic',
        summary:
          'LLMs are never permitted to generate 3D coordinates, calculate stresses, or simulate physics. AI extracts structured parameters (length, torque, material); all physics and CAD operations are deterministic calculus.',
        keyMechanisms: [
          'LLM generates JSON parameter schema from natural language prompt',
          'All stress, torque, and displacement math solved by closed-form equations',
          'OpenCascade kernel generates 3D surfaces deterministically using B-Spline mathematics',
        ],
        evidenceIds: ['EVID-EDA-01', 'EVID-EDA-02'],
        componentIds: ['eda-extractor', 'eda-solvers'],
        decisionIds: ['ADR-EDA-01', 'ADR-EDA-02'],
      },
      'data-retrieval': {
        dimensionId: 'data-retrieval',
        title: 'In-Memory Parametric Boundary Representation (BRep) Geometry & Material Catalogs',
        summary:
          'Maintains verified material property catalogs (Young’s modulus, Poisson’s ratio, yield strength) in memory and generates topological boundary representations (vertices, edges, faces, solids).',
        keyMechanisms: [
          'Curated material database containing mechanical and thermal constants',
          'Topological data structures representing manifold geometry and face connectivity',
          'Export pipelines streaming binary and ASCII STEP, STL, and IGES file buffers',
        ],
        evidenceIds: ['EVID-EDA-01'],
        componentIds: ['eda-catalog', 'eda-cad-kernel'],
        decisionIds: ['ADR-EDA-01'],
      },
      'orchestration-state': {
        dimensionId: 'orchestration-state',
        title: 'Containerized Linear Computation Pipeline with Boundary Validation',
        summary:
          'Executes inside isolated Docker containers with pinned OpenCascade libraries, enforcing strict geometric validity checks (Euler-Poincaré formula, non-manifold edge detection).',
        keyMechanisms: [
          'Docker container environment ensuring deterministic floating-point consistency',
          'Sequential execution: Parameter Ingest -> Physics Check -> CAD Extrusion -> Step Export',
          'Automated validation checks preventing self-intersecting or non-manifold meshes',
        ],
        evidenceIds: ['EVID-EDA-01'],
        componentIds: ['eda-cad-kernel'],
        decisionIds: ['ADR-EDA-01'],
      },
      'failure-containment': {
        dimensionId: 'failure-containment',
        title: 'Analytical Failure Criteria Gating (Tresca / von Mises) & Geometric Kernel Assertions',
        summary:
          'If applied loads exceed material yield strength with safety margin, the physics engine rejects generation before CAD invocation. Corrupted topology is caught by kernel assert checks.',
        keyMechanisms: [
          'Yield strength and deflection checks aborting before 3D model generation',
          'OpenCascade topology validity asserts preventing invalid B-Spline surface generation',
          'Detailed engineering failure feedback returned when constraints are mathematically unsatisfiable',
        ],
        evidenceIds: ['EVID-EDA-02'],
        componentIds: ['eda-solvers', 'eda-cad-kernel'],
        decisionIds: ['ADR-EDA-02'],
      },
      'evaluation-verification': {
        dimensionId: 'evaluation-verification',
        title: '424 Pytests & Numerical Calculus Convergence Agreement (< 10^-6 Error)',
        summary:
          'Verified by 424 automated pytests across 28 test suites in Docker. Analytical Saint-Venant torsional stiffness matches OpenCascade BRep volumetric mass integrals to < 10^-6 numerical calculus error.',
        keyMechanisms: [
          '424 automated pytests verifying beam calculations, meshing, and file exports in Docker',
          'Numerical integration verifying agreement between closed-form and discrete CAD models',
          'Regression testing against standard mechanical engineering benchmark problems',
        ],
        evidenceIds: ['EVID-EDA-01', 'EVID-EDA-02'],
        componentIds: ['eda-solvers', 'eda-cad-kernel'],
        decisionIds: ['ADR-EDA-01', 'ADR-EDA-02'],
        qualificationNote: 'Software numerical calculus agreement (< 10^-6 error); does NOT assert physical CNC machining tolerance (+-0.05 mm).',
      },
      'hitl-governance': {
        dimensionId: 'hitl-governance',
        title: 'Engineer Review & Drawing Sign-Off Workflow',
        summary:
          'Generates complete 2D engineering drawing views (orthographic projections with dimensioning and GD&T annotations) for final professional mechanical engineer sign-off before manufacturing.',
        keyMechanisms: [
          'Automated generation of 2D dimensioned drawing sheets with bill-of-materials',
          'Mandatory human engineering sign-off flag required for CNC manufacturing dispatches',
          'Complete audit trail of input constraints, equations applied, and safety factor margins',
        ],
        evidenceIds: ['EVID-EDA-01'],
        componentIds: ['eda-input', 'eda-cad-kernel'],
        decisionIds: ['ADR-EDA-01'],
      },
      'core-trade-offs': {
        dimensionId: 'core-trade-offs',
        title: 'Closed-Form Analytical Solvers vs Full Non-Linear Finite Element Analysis (FEA)',
        summary:
          'Accepted limitation to standard prismatic and axisymmetric geometries in exchange for instantaneous (sub-second) computation times, $0 cloud solver costs, and guaranteed numerical convergence.',
        keyMechanisms: [
          'Analytical closed-form solutions calculate stresses in milliseconds',
          'Avoids multi-minute meshing and iterative solver matrix inversion runs',
          'Cannot solve arbitrary non-linear organic shapes or turbulent fluid interactions',
        ],
        evidenceIds: ['EVID-EDA-02'],
        componentIds: ['eda-solvers'],
        decisionIds: ['ADR-EDA-02'],
      },
      'individual-contribution': {
        dimensionId: 'individual-contribution',
        title: 'Sole Author & System Architect',
        summary:
          'Conceived, mathematically formulated, and implemented the entire platform, including the Saint-Venant physics solvers, the OpenCascade integration layer, and the containerized test suite.',
        keyMechanisms: [
          'Derived and coded analytical Saint-Venant torsional formulations in Python',
          'Engineered OpenCascade C++/Python boundary representation generation pipeline',
          'Created Docker containerized test harness executing 424 pytests',
        ],
        evidenceIds: ['EVID-EDA-01', 'EVID-EDA-02'],
        componentIds: ['eda-input', 'eda-extractor', 'eda-solvers', 'eda-cad-kernel'],
        decisionIds: ['ADR-EDA-01', 'ADR-EDA-02', 'ADR-EDA-03'],
      },
    },
    tradeOffs: [
      {
        title: 'Closed-Form Saint-Venant Solvers vs Iterative FEA Simulation',
        chosenApproach: 'Analytical Saint-Venant beam and torsional formulations solved closed-form',
        alternativeRejected: 'Full commercial non-linear finite element analysis (FEA) solver (e.g. Code_Aster/Ansys)',
        technicalRationale: 'Enables real-time sub-second parametric iteration during generative design loops without requiring minutes of meshing and cluster compute spend.',
        acceptedCompromise: 'Restricted to standard prismatic beam and axisymmetric shaft profiles; cannot calculate stress concentrations on arbitrary organic geometries.',
        evidenceId: 'EVID-EDA-02',
        decisionId: 'ADR-EDA-02',
      },
      {
        title: 'Dockerized OpenCascade Kernel vs Lightweight WebGL Mesh Generation',
        chosenApproach: 'True BRep CAD kernel (OpenCascade) running in containerized backend',
        alternativeRejected: 'Direct polygonal triangle mesh generation (Three.js / STL mesh only) in browser',
        technicalRationale: 'Industrial manufacturing requires exact analytic B-Spline surface definitions (STEP files) for CNC machining and tooling; polygonal meshes are unmachinable.',
        acceptedCompromise: 'Heavy backend dependency requiring Docker containerization with 1.2 GB image size.',
        evidenceId: 'EVID-EDA-01',
        decisionId: 'ADR-EDA-01',
      },
    ],
  },

  // ===========================================================================
  // 5. OCR EVALUATION PLATFORM
  // ===========================================================================
  'ocr-evaluator': {
    slug: 'ocr-evaluator',
    name: 'OCR Evaluation Platform',
    tagline: 'Controlled perturbation benchmarking & risk gating platform with Levenshtein CER/WER math.',
    category: 'evaluation-testing',
    systemRole: 'Optical Character Recognition Benchmarking, Robustness Testing & Triage Platform',
    caseStudyRoute: '/projects/ocr-evaluator',
    architectureRoute: '/architecture?system=ocr-evaluator',
    verificationRoute: '/verification#evid-evid-ocr-01',
    decisionRecordsRoute: '/projects/ocr-evaluator#decisions',
    dimensions: {
      'problem-objective': {
        dimensionId: 'problem-objective',
        title: 'Systematic Robustness Benchmarking of Document Text Extraction Engines',
        summary:
          'Quantifies degradation thresholds of optical character recognition models when exposed to physical real-world document distortions (blur, skew, noise, contrast loss, compression).',
        keyMechanisms: [
          'Automated generation of controlled image perturbation matrices',
          'Exact mathematical calculation of Character Error Rate (CER) and Word Error Rate (WER)',
          'Automated routing of extracted document fields into PASS, REVIEW, or FAIL risk queues',
        ],
        evidenceIds: ['EVID-OCR-01', 'EVID-OCR-02', 'EVID-OCR-03'],
        componentIds: ['ocr-ingest', 'ocr-degradation', 'ocr-metrics'],
        decisionIds: ['ADR-OCR-01', 'ADR-OCR-02'],
      },
      'architectural-pattern': {
        dimensionId: 'architectural-pattern',
        title: 'Controlled Perturbation Benchmarking & Risk Gating Platform',
        summary:
          'Five-stage modular pipeline: Document Ingestion -> 5-Axis Image Degradation Matrix -> Multi-Engine OCR Ingestion -> Levenshtein Mathematical Evaluation -> Deterministic Risk Gating.',
        keyMechanisms: [
          'Configurable image transformation engine applying calibrated mathematical perturbations',
          'Pluggable OCR adapter interface supporting Tesseract, AWS Textract, and Google Cloud Vision',
          'Levenshtein dynamic programming distance matrix evaluator',
        ],
        evidenceIds: ['EVID-OCR-01'],
        componentIds: ['ocr-degradation', 'ocr-engine', 'ocr-metrics'],
        decisionIds: ['ADR-OCR-01'],
      },
      'ai-vs-deterministic': {
        dimensionId: 'ai-vs-deterministic',
        title: 'Deterministic Mathematical Evaluation Over AI Black-Box OCR Models',
        summary:
          'Image degradation generation, string alignment, Levenshtein distance calculations, and risk threshold gating are 100% deterministic software engineering. AI is confined to the third-party OCR engines being evaluated.',
        keyMechanisms: [
          'Deterministic OpenCV transformations for blur, skew, noise, contrast, and compression',
          'Exact dynamic programming Levenshtein distance algorithm for CER/WER math',
          'Deterministic threshold rules routing low-confidence critical fields to review queues',
        ],
        evidenceIds: ['EVID-OCR-01', 'EVID-OCR-03'],
        componentIds: ['ocr-degradation', 'ocr-metrics', 'ocr-risk-gate'],
        decisionIds: ['ADR-OCR-01', 'ADR-OCR-02'],
      },
      'data-retrieval': {
        dimensionId: 'data-retrieval',
        title: 'OpenCV Pixel Buffers & Normalized Ground-Truth Text Datasets',
        summary:
          'Stores raw uncompressed image buffers in memory, applies mathematical convolutions, and compares extracted OCR strings against canonical golden ground-truth transcripts.',
        keyMechanisms: [
          'In-memory NumPy arrays representing raw pixel matrices and degraded variants',
          'Unicode text normalization (NFC/NFD stripping, whitespace collapsing)',
          'Key-value schema mappings for financial invoices and identity document fields',
        ],
        evidenceIds: ['EVID-OCR-01'],
        componentIds: ['ocr-ingest', 'ocr-degradation'],
        decisionIds: ['ADR-OCR-01'],
      },
      'orchestration-state': {
        dimensionId: 'orchestration-state',
        title: 'Batch Matrix Execution Harness with Parametric Degradation Sweeps',
        summary:
          'Iterates across 5 perturbation axes at 10 discrete severity steps (50 degraded variants per test document), collecting performance curves and memory metrics systematically.',
        keyMechanisms: [
          'Automated parameter sweep generator producing reproducible degradation curves',
          'Asynchronous batch execution dispatching images to local or cloud OCR engines',
          'Structured JSON benchmark report generation compiling CER/WER degradation gradients',
        ],
        evidenceIds: ['EVID-OCR-02'],
        componentIds: ['ocr-degradation', 'ocr-metrics'],
        decisionIds: ['ADR-OCR-01'],
      },
      'failure-containment': {
        dimensionId: 'failure-containment',
        title: 'Critical-Field Priority Decision Gate (PASS / REVIEW / FAIL)',
        summary:
          'Prioritizes critical semantic fields (e.g. invoice total, tax ID, patient name) over general body text; any character discrepancy in a critical field forces automatic routing to human review.',
        keyMechanisms: [
          'Field-level weight matrix prioritizing financial and identifier tokens over prose',
          'Zero-tolerance error threshold on monetary values triggering immediate REVIEW status',
          'FAIL state quarantine preventing corrupted data from entering downstream ERP databases',
        ],
        evidenceIds: ['EVID-OCR-03'],
        componentIds: ['ocr-risk-gate'],
        decisionIds: ['ADR-OCR-02'],
      },
      'evaluation-verification': {
        dimensionId: 'evaluation-verification',
        title: '154 Automated Tests (134 Backend Pytests + 20 UI Integration Tests)',
        summary:
          'Verified by 134 backend pytests validating metric calculations and perturbation transforms, plus 20 UI tests asserting risk gate visualization and triage flows.',
        keyMechanisms: [
          '134 pytests testing Levenshtein CER/WER math and image transformation filters',
          '20 UI integration tests verifying degradation matrix dashboards and triage views',
          'Synthetic benchmark runs across 5-axis image degradation matrices',
        ],
        evidenceIds: ['EVID-OCR-01', 'EVID-OCR-02', 'EVID-OCR-03'],
        componentIds: ['ocr-metrics', 'ocr-risk-gate'],
        decisionIds: ['ADR-OCR-01', 'ADR-OCR-02'],
      },
      'hitl-governance': {
        dimensionId: 'hitl-governance',
        title: 'Human-in-the-Loop Triage Queue for Borderline Extractions',
        summary:
          'Documents with confidence scores falling in the ambiguous REVIEW band are queued for human operator inspection with visual bounding box overlays highlighting perturbed characters.',
        keyMechanisms: [
          'Visual side-by-side inspection UI highlighting discrepancy bounding boxes',
          'One-click human verification and manual text correction interface',
          'Audit log recording human overrides to continuously calibrate risk gate thresholds',
        ],
        evidenceIds: ['EVID-OCR-03'],
        componentIds: ['ocr-risk-gate'],
        decisionIds: ['ADR-OCR-02'],
      },
      'core-trade-offs': {
        dimensionId: 'core-trade-offs',
        title: 'Exact Dynamic Programming Levenshtein Distance vs Approximate Heuristic String Similarity',
        summary:
          'Accepted quadratic computational complexity O(M*N) in exchange for exact, mathematically rigorous character error metrics required for defensible compliance auditing.',
        keyMechanisms: [
          'Dynamic programming matrix guarantees mathematically optimal alignment',
          'Provides exact insertion, deletion, and substitution operation counts',
          'Higher CPU cycle consumption compared to rapid n-gram approximations on long documents',
        ],
        evidenceIds: ['EVID-OCR-01'],
        componentIds: ['ocr-metrics'],
        decisionIds: ['ADR-OCR-01'],
      },
      'individual-contribution': {
        dimensionId: 'individual-contribution',
        title: 'Sole Author & System Architect',
        summary:
          'Conceived, designed, and implemented 100% of the platform, including the 5-axis image perturbation engine, the Levenshtein dynamic programming metrics module, and the risk triage dashboard.',
        keyMechanisms: [
          'Authored mathematical perturbation filters in Python and OpenCV',
          'Implemented Levenshtein dynamic programming alignment and CER/WER algorithms',
          'Designed and verified the critical-field risk gate state machine',
        ],
        evidenceIds: ['EVID-OCR-01', 'EVID-OCR-02', 'EVID-OCR-03'],
        componentIds: ['ocr-ingest', 'ocr-degradation', 'ocr-metrics', 'ocr-risk-gate'],
        decisionIds: ['ADR-OCR-01', 'ADR-OCR-02'],
      },
    },
    tradeOffs: [
      {
        title: 'Controlled Synthetic Perturbations vs Field Document Scraping',
        chosenApproach: 'Mathematical 5-axis synthetic degradation matrix (blur, skew, noise, contrast, JPEG)',
        alternativeRejected: 'Gathering ad-hoc noisy scans from open web or customer uploads',
        technicalRationale: 'Synthetic perturbations allow isolating single variables (e.g. exactly 7 degrees of rotational skew) to plot precise performance curves across OCR engines.',
        acceptedCompromise: 'Synthetic Gaussian noise and digital blur may not fully capture physical paper coffee stains or severe document crumpling.',
        evidenceId: 'EVID-OCR-02',
        decisionId: 'ADR-OCR-01',
      },
      {
        title: 'Critical-Field Priority Gating vs Global Average CER Threshold',
        chosenApproach: 'Zero-tolerance error threshold on designated critical fields (totals, IDs)',
        alternativeRejected: 'Global document-level average CER threshold (e.g. accept if CER < 5%)',
        technicalRationale: 'A document with 99% accuracy that misreads the invoice total ($1,000 as $10,000) causes financial catastrophe; critical fields require dedicated strict gating.',
        acceptedCompromise: 'Documents with minor noise near critical fields are routed to human review even if 98% of the page is flawless.',
        evidenceId: 'EVID-OCR-03',
        decisionId: 'ADR-OCR-02',
      },
    ],
  },

  // ===========================================================================
  // 6. CURRICULUM TRANSFORMATION ENGINE
  // ===========================================================================
  'curriculum-etl': {
    slug: 'curriculum-etl',
    name: 'Curriculum Transformation Engine',
    tagline: 'Concurrent dynamic Pydantic schema compilation & CSV sanitization shield with 3-tier integrity pipeline.',
    category: 'data-pipeline',
    systemRole: 'Batch Educational Curriculum Standardization & Data Ingestion Platform',
    caseStudyRoute: '/projects/curriculum-etl',
    architectureRoute: '/architecture?system=curriculum-etl',
    verificationRoute: '/verification#evid-evid-etl-01',
    decisionRecordsRoute: '/projects/curriculum-etl#decisions',
    dimensions: {
      'problem-objective': {
        dimensionId: 'problem-objective',
        title: 'High-Throughput Transformation of Heterogeneous Educational Taxonomies',
        summary:
          'Transforms fragmented, non-standardized curriculum standards and learning objectives into unified Pydantic schemas, eliminating manual spreadsheet formatting.',
        keyMechanisms: [
          'Ingests arbitrarily formatted CSV, Excel, and JSON curriculum documents',
          'Dynamically derives type-safe schemas from sample tabular headers at runtime',
          'Executes concurrent worker batches to normalize thousands of educational standards',
        ],
        evidenceIds: ['EVID-ETL-01', 'EVID-ETL-02'],
        componentIds: ['etl-ingest', 'etl-contract'],
        decisionIds: ['ADR-ETL-01', 'ADR-ETL-02'],
      },
      'architectural-pattern': {
        dimensionId: 'architectural-pattern',
        title: 'Concurrent Dynamic Pydantic Transformation Engine',
        summary:
          'Map-Reduce batch architecture: Header Ingestion -> Dynamic Pydantic Compilation -> Multi-Threaded Worker Execution -> 3-Tier Multi-Agent Review -> Sanitized Export.',
        keyMechanisms: [
          'Runtime dynamic compilation of Pydantic model classes from tabular headers',
          'ThreadPoolExecutor dispatching transformation batches across local cores',
          'Multi-agent review loop (Reviewer -> Critic -> Audit) verifying taxonomy consistency',
        ],
        evidenceIds: ['EVID-ETL-01', 'EVID-ETL-02'],
        componentIds: ['etl-contract', 'etl-parallel-workers', 'etl-review-fix'],
        decisionIds: ['ADR-ETL-01', 'ADR-ETL-02'],
      },
      'ai-vs-deterministic': {
        dimensionId: 'ai-vs-deterministic',
        title: 'Dynamic Type Synthesis & Sanitization Wrapping Generative Formatting',
        summary:
          'Schema compilation, concurrency dispatch, and CSV formula sanitization are 100% deterministic code. Generative LLMs are utilized solely for mapping unstructured narrative standards into target taxonomy slots.',
        keyMechanisms: [
          'Deterministic Pydantic field generation with regex validation rules',
          'Deterministic sanitization escaping leading `=`, `+`, `-`, `@` to neutralize formula injection',
          'Generative LLM performs semantic classification of learning objectives',
        ],
        evidenceIds: ['EVID-ETL-01', 'EVID-ETL-03'],
        componentIds: ['etl-contract', 'etl-csv-gate'],
        decisionIds: ['ADR-ETL-01', 'ADR-ETL-02'],
      },
      'data-retrieval': {
        dimensionId: 'data-retrieval',
        title: 'Dynamic Schema In-Memory Registries & Tabular DataFrames',
        summary:
          'Maintains compiled Pydantic models in memory, streaming chunked Pandas DataFrames from incoming CSV streams without unbounded heap allocations.',
        keyMechanisms: [
          'Dynamic Python type creation via `pydantic.create_model` at runtime',
          'Chunked stream reading processing 5,000-row batches to preserve RAM',
          'In-memory lookup caches for state educational standard code resolution',
        ],
        evidenceIds: ['EVID-ETL-01'],
        componentIds: ['etl-contract', 'etl-parallel-workers'],
        decisionIds: ['ADR-ETL-01'],
      },
      'orchestration-state': {
        dimensionId: 'orchestration-state',
        title: 'Concurrent ThreadPoolExecutor Batch Workers with Progress Checkpoints',
        summary:
          'Distributes curriculum transformation tasks across parallel worker threads, writing progress checkpoints to disk to allow resumption on process interruption.',
        keyMechanisms: [
          'ThreadPoolExecutor managing concurrent API and processing requests',
          'Batch chunking bounding memory footprint and preventing network congestion',
          'File-based checkpointing recording successfully processed record indices',
        ],
        evidenceIds: ['EVID-ETL-01'],
        componentIds: ['etl-parallel-workers'],
        decisionIds: ['ADR-ETL-01'],
      },
      'failure-containment': {
        dimensionId: 'failure-containment',
        title: 'CSV Formula Injection Shield & Quarantine Dead-Letter Queues',
        summary:
          'Neutralizes Dynamic Data Exchange (DDE) formula injection by escaping malicious prefix characters. Malformed records failing Pydantic validation are routed to dead-letter queues.',
        keyMechanisms: [
          'Automatic escaping of leading `=`, `+`, `-`, `@` characters in generated CSV exports',
          'Dead-letter quarantine queue isolating records that violate schema contracts',
          'Automated retry with backoff for transient LLM classification rate limits',
        ],
        evidenceIds: ['EVID-ETL-03'],
        componentIds: ['etl-csv-gate'],
        decisionIds: ['ADR-ETL-02'],
      },
      'evaluation-verification': {
        dimensionId: 'evaluation-verification',
        title: '36 Automated Pytests & 3-Tier Multi-Agent Integrity Pipeline',
        summary:
          'Verified by 36 automated pytests covering dynamic schema generation, formula sanitization, and concurrent thread safety, plus a 3-tier multi-agent verification pipeline.',
        keyMechanisms: [
          '36 automated pytests testing dynamic model creation and CSV sanitization',
          '3-tier integrity pipeline (Reviewer -> Critic -> Audit) verifying taxonomy accuracy',
          'Batch stress testing on 10,000+ row educational curriculum spreadsheets',
        ],
        evidenceIds: ['EVID-ETL-01', 'EVID-ETL-02', 'EVID-ETL-03'],
        componentIds: ['etl-contract', 'etl-review-fix', 'etl-csv-gate'],
        decisionIds: ['ADR-ETL-01', 'ADR-ETL-02'],
      },
      'hitl-governance': {
        dimensionId: 'hitl-governance',
        title: 'Curriculum Director Review & Taxonomy Acceptance Gates',
        summary:
          'Taxonomy mappings with ambiguous educational hierarchy scores are held in an exception queue requiring review and confirmation from curriculum domain specialists.',
        keyMechanisms: [
          'Discrepancy queue highlighting ambiguous curriculum standard mappings',
          'Domain expert review portal for manual taxonomy override and acceptance',
          'Audit trail recording operator sign-off on curriculum version releases',
        ],
        evidenceIds: ['EVID-ETL-02'],
        componentIds: ['etl-review-fix'],
        decisionIds: ['ADR-ETL-02'],
      },
      'core-trade-offs': {
        dimensionId: 'core-trade-offs',
        title: 'Dynamic Runtime Pydantic Compilation vs Pre-Defined Static Schema Definitions',
        summary:
          'Accepted increased runtime compilation overhead and dynamic type inspection in exchange for the capability to ingest arbitrary customer spreadsheets without redeploying code.',
        keyMechanisms: [
          'Runtime model creation adapts to client spreadsheet header naming variations',
          'Eliminates the need for code changes when new curriculum formats are onboarded',
          'Slightly higher per-job startup latency (100-200ms) to compile dynamic types',
        ],
        evidenceIds: ['EVID-ETL-01'],
        componentIds: ['etl-contract'],
        decisionIds: ['ADR-ETL-01'],
      },
      'individual-contribution': {
        dimensionId: 'individual-contribution',
        title: 'Individual Contributor within Wayground Engineering Team',
        summary:
          'Developed at Wayground. Aadil personally architected and implemented the dynamic Pydantic schema compiler, the CSV formula injection shield, and the 3-tier review pipeline.',
        keyMechanisms: [
          'Personally designed and wrote the dynamic Pydantic schema compiler (`create_model`)',
          'Engineered the CSV formula injection sanitization shield neutralizing DDE attacks',
          'Built the multi-agent 3-tier verification pipeline within the company platform',
        ],
        evidenceIds: ['EVID-ETL-01', 'EVID-ETL-02', 'EVID-ETL-03'],
        componentIds: ['etl-contract', 'etl-review-fix', 'etl-csv-gate'],
        decisionIds: ['ADR-ETL-01', 'ADR-ETL-02'],
      },
    },
    tradeOffs: [
      {
        title: 'Dynamic Runtime Schemas vs Static Pre-Defined Schema Classes',
        chosenApproach: 'Compiling Pydantic models at runtime from incoming CSV headers via `create_model`',
        alternativeRejected: 'Maintaining static Python schema classes for every state standard',
        technicalRationale: 'Educational institutions format CSV headers inconsistently; static schemas required continuous engineering PRs for minor client column renames.',
        acceptedCompromise: 'Requires dynamic type reflection and loses static IDE type autocompletion during development.',
        evidenceId: 'EVID-ETL-01',
        decisionId: 'ADR-ETL-01',
      },
      {
        title: 'Strict CSV Formula Neutralization vs Preserving Raw Mathematical Prefixes',
        chosenApproach: 'Prepending a single quote to neutralize leading `=`, `+`, `-`, `@` characters in cells',
        alternativeRejected: 'Exporting raw cell values directly as received',
        technicalRationale: 'Opening raw user-generated CSVs in Microsoft Excel executes DDE command injection; sanitization protects curriculum administrators from remote code execution.',
        acceptedCompromise: 'Formulas intended for legitimate spreadsheet math require explicit unescaping in spreadsheet software.',
        evidenceId: 'EVID-ETL-03',
        decisionId: 'ADR-ETL-02',
      },
    ],
  },

  // ===========================================================================
  // 7. ATLAS AI
  // ===========================================================================
  'atlas-ai': {
    slug: 'atlas-ai',
    name: 'Atlas AI',
    tagline: 'SEC EDGAR regulatory financial research copilot with LangGraph multi-agent loops and cryptographic deduplication.',
    category: 'fintech-rag',
    systemRole: 'Autonomous Regulatory Financial Research & SEC Filing Analysis Copilot',
    caseStudyRoute: '/projects/atlas-ai',
    architectureRoute: '/architecture?system=atlas-ai',
    verificationRoute: '/verification#evid-evid-atl-01',
    decisionRecordsRoute: '/projects/atlas-ai#decisions',
    dimensions: {
      'problem-objective': {
        dimensionId: 'problem-objective',
        title: 'Deep Longitudinal Analysis of SEC 10-K/10-Q Financial Disclosures',
        summary:
          'Enables financial analysts and portfolio managers to extract financial tables, identify hidden accounting risks, and track risk factor changes across quarterly SEC regulatory filings.',
        keyMechanisms: [
          'Automated parsing of multi-megabyte SEC EDGAR HTML/XBRL filings and financial tables',
          'Multi-agent graph cycles synthesizing balance sheet line items across multiple quarters',
          'Automated alert dispatches when major risk disclosures or executive changes occur',
        ],
        evidenceIds: ['EVID-ATL-01', 'EVID-ATL-02'],
        componentIds: ['atl-tg-webhook', 'atl-sec-rag'],
        decisionIds: ['ADR-ATL-01'],
      },
      'architectural-pattern': {
        dimensionId: 'architectural-pattern',
        title: 'Regulatory Financial Multi-Agent RAG Pipeline',
        summary:
          'LangGraph cyclic state graph: Webhook Trigger -> SEC EDGAR Parsing -> Vector & Table Hybrid Retrieval -> Multi-Agent Financial Synthesis -> Deduplicated Alert Worker.',
        keyMechanisms: [
          'LangGraph cyclical state graph orchestrating research, verification, and alert agents',
          'Document table chunker preserving tabular HTML financial matrix structures',
          'Asynchronous notification workers dispatching intelligence to analyst channels',
        ],
        evidenceIds: ['EVID-ATL-01'],
        componentIds: ['atl-langgraph', 'atl-sec-rag', 'atl-alert-worker'],
        decisionIds: ['ADR-ATL-01'],
      },
      'ai-vs-deterministic': {
        dimensionId: 'ai-vs-deterministic',
        title: 'Agentic Synthesis Bounded by Deterministic Table Parsing & Hash Deduplication',
        summary:
          'SEC document ingestion, table grid parsing, financial ratio math, and alert deduplication are deterministic code. AI agents are utilized for cross-document synthesis and thematic risk extraction.',
        keyMechanisms: [
          'Deterministic HTML table parser preserving balance sheet row-column relationships',
          'Deterministic SHA-256 section hash deduplication preventing repeated notifications',
          'LangGraph LLM agents synthesize cross-quarter qualitative disclosure differences',
        ],
        evidenceIds: ['EVID-ATL-01', 'EVID-ATL-03'],
        componentIds: ['atl-sec-rag', 'atl-alert-worker'],
        decisionIds: ['ADR-ATL-01', 'ADR-ATL-02'],
        qualificationNote: 'Fixtures validated in CI test suite; does not test unconstrained live SEC EDGAR scraping.',
      },
      'data-retrieval': {
        dimensionId: 'data-retrieval',
        title: 'MongoDB Atlas Vector Search & Tabular Chunking',
        summary:
          'Embeds financial text chunks and structured table descriptions into MongoDB Atlas Vector Search using Gemini embeddings, supporting hybrid dense-sparse queries.',
        keyMechanisms: [
          'MongoDB Atlas Vector Search with hierarchical SEC filing metadata (CIK, Form, Year)',
          'Gemini 768-dimensional embeddings tuned for technical and financial vocabulary',
          'Hybrid metadata filtering restricting queries to specific fiscal quarters',
        ],
        evidenceIds: ['EVID-ATL-01'],
        componentIds: ['atl-sec-rag'],
        decisionIds: ['ADR-ATL-01'],
      },
      'orchestration-state': {
        dimensionId: 'orchestration-state',
        title: 'Cyclic State Graphs with Persistent Checkpoint Memory (LangGraph)',
        summary:
          'Manages multi-step financial research tasks using LangGraph state graphs, allowing agents to loop, request clarifying filings, and perform self-correction before output.',
        keyMechanisms: [
          'LangGraph state graphs managing research agent conversation and retrieval state',
          'Persistent checkpointing allowing inspection of intermediate financial reasoning steps',
          'Asynchronous background workers handling time-consuming multi-filing ingestion',
        ],
        evidenceIds: ['EVID-ATL-01', 'EVID-ATL-02'],
        componentIds: ['atl-langgraph'],
        decisionIds: ['ADR-ATL-01'],
      },
      'failure-containment': {
        dimensionId: 'failure-containment',
        title: 'SHA-256 Alert Deduplication Shield & Hallucination Cross-Checks',
        summary:
          'Computes SHA-256 hashes of filing sections to guarantee zero duplicate alerts on re-filings. Employs a verification agent cross-checking numbers against raw source tables.',
        keyMechanisms: [
          'SHA-256 section hashing eliminating redundant alert dispatches on identical filings',
          'Verification agent validating synthesized balance sheet figures against raw table cells',
          'Circuit breaker terminating agentic graph execution if retrieval finds zero relevant filings',
        ],
        evidenceIds: ['EVID-ATL-01', 'EVID-ATL-03'],
        componentIds: ['atl-alert-worker', 'atl-langgraph'],
        decisionIds: ['ADR-ATL-02'],
      },
      'evaluation-verification': {
        dimensionId: 'evaluation-verification',
        title: '178 Automated Pytests Across Ingestion & Core MVP Graph (59 Tests)',
        summary:
          'Verified by 178 automated pytests in the full suite and 59 tests in the core MVP graph, validating SEC table extraction, LangGraph state transitions, and alert deduplication.',
        keyMechanisms: [
          '178 automated pytests testing SEC document ingestion and multi-agent coordination',
          '59 MVP tests validating core retrieval and financial summary loops in CI',
          'Deduplication regression suite proving duplicate filing sections emit zero duplicate alerts',
        ],
        evidenceIds: ['EVID-ATL-01', 'EVID-ATL-02', 'EVID-ATL-03'],
        componentIds: ['atl-langgraph', 'atl-sec-rag', 'atl-alert-worker'],
        decisionIds: ['ADR-ATL-01', 'ADR-ATL-02'],
      },
      'hitl-governance': {
        dimensionId: 'hitl-governance',
        title: 'Analyst Verification Portal & Citations to Raw EDGAR URLs',
        summary:
          'Every claim in the synthesized report provides deep-link citations to the exact paragraph and table on the SEC EDGAR website, allowing human analysts to verify numbers instantly.',
        keyMechanisms: [
          'Direct paragraph-level hyperlink citations to official SEC EDGAR source documents',
          'Interactive UI allowing analysts to review retrieved table cells alongside LLM prose',
          'Explicit confidence ratings highlighting ambiguous accounting disclosure language',
        ],
        evidenceIds: ['EVID-ATL-01'],
        componentIds: ['atl-sec-rag'],
        decisionIds: ['ADR-ATL-01'],
      },
      'core-trade-offs': {
        dimensionId: 'core-trade-offs',
        title: 'Cyclic LangGraph Multi-Agent Loops vs Fast Single-Turn RAG',
        summary:
          'Accepted higher latency (15-45 seconds) and multiple LLM API calls in exchange for comprehensive longitudinal financial synthesis and cross-filing accounting discrepancy detection.',
        keyMechanisms: [
          'Multi-agent loops uncover non-obvious disclosure changes across consecutive years',
          'Cross-agent verification catches financial number discrepancies before reporting',
          'Unsuitable for instant conversational queries where sub-2s latency is expected',
        ],
        evidenceIds: ['EVID-ATL-01', 'EVID-ATL-02'],
        componentIds: ['atl-langgraph'],
        decisionIds: ['ADR-ATL-01'],
      },
      'individual-contribution': {
        dimensionId: 'individual-contribution',
        title: 'System Architect & Backend Lead',
        summary:
          'Architected the LangGraph multi-agent orchestration topology, designed the SEC EDGAR table ingestion pipeline, and implemented the SHA-256 alert deduplication engine.',
        keyMechanisms: [
          'Architected the LangGraph state graph and agent coordination loops',
          'Implemented the tabular HTML/XBRL parser for SEC financial tables',
          'Engineered the SHA-256 cryptographic deduplication worker and alert system',
        ],
        evidenceIds: ['EVID-ATL-01', 'EVID-ATL-02', 'EVID-ATL-03'],
        componentIds: ['atl-langgraph', 'atl-sec-rag', 'atl-alert-worker'],
        decisionIds: ['ADR-ATL-01', 'ADR-ATL-02'],
      },
    },
    tradeOffs: [
      {
        title: 'Cyclic LangGraph Multi-Agent Loops vs Single-Pass Prompt RAG',
        chosenApproach: 'Stateful LangGraph agent loops with self-reflection and table cross-checking',
        alternativeRejected: 'Single-pass prompt passing top-K vector chunks directly to LLM',
        technicalRationale: 'Financial filings contain complex footnotes that contradict primary tables; multi-agent iterative cycles are required to cross-verify contradictory accounting disclosures.',
        acceptedCompromise: 'Incurs 15-45s response latency and consumes 5x more LLM API tokens per query.',
        evidenceId: 'EVID-ATL-01',
        decisionId: 'ADR-ATL-01',
      },
      {
        title: 'Pre-Chunked Tabular Structure Preservation vs Plain Text Vectorization',
        chosenApproach: 'Specialized HTML table parser preserving row-column coordinate matrices in chunk metadata',
        alternativeRejected: 'Treating HTML tables as raw flattened strings for standard recursive chunking',
        technicalRationale: 'Flattened tables scramble line-item headers and numerical amounts, causing catastrophic financial hallucinations in RAG synthesis.',
        acceptedCompromise: 'Requires complex custom table parsing logic and larger metadata payloads in MongoDB.',
        evidenceId: 'EVID-ATL-01',
        decisionId: 'ADR-ATL-01',
      },
    ],
  },

  // ===========================================================================
  // 8. LOOM AI
  // ===========================================================================
  'loom-ai': {
    slug: 'loom-ai',
    name: 'Loom AI',
    tagline: 'Clean Architecture enterprise procurement microservice with static AST import enforcement and HITL cryptographic gates.',
    category: 'enterprise-workflow',
    systemRole: 'B2B Enterprise Procurement & Supplier Coordination Microservice',
    caseStudyRoute: '/projects/loom-ai',
    architectureRoute: '/architecture?system=loom-ai',
    verificationRoute: '/verification#evid-evid-lom-01',
    decisionRecordsRoute: '/projects/loom-ai#decisions',
    dimensions: {
      'problem-objective': {
        dimensionId: 'problem-objective',
        title: 'Reliable Enterprise Procurement Orchestration & RFQ Automation',
        summary:
          'Automates requests-for-quotes (RFQs), supplier matching, and purchase order processing while guaranteeing strict enterprise security boundaries and auditable human authorization.',
        keyMechanisms: [
          'Streamlines enterprise procurement workflows across distributed supplier catalogs',
          'Enforces human-in-the-loop authorization on high-value purchase commitments',
          'Prevents architectural coupling and framework lock-in through Clean Architecture',
        ],
        evidenceIds: ['EVID-LOM-01', 'EVID-LOM-02'],
        componentIds: ['lom-portals', 'lom-clean-backend'],
        decisionIds: ['ADR-LOOM-01', 'ADR-LOOM-02'],
      },
      'architectural-pattern': {
        dimensionId: 'architectural-pattern',
        title: 'Clean Architecture Enterprise Microservice with Downward AST Enforcement',
        summary:
          'Concentric Clean Architecture rings: Domain Entities -> Use Cases -> Interface Adapters -> Frameworks & Infrastructure. Downward dependency flow is verified by automated AST static analysis.',
        keyMechanisms: [
          'Strict separation of business logic from databases and external web frameworks',
          'Static AST dependency checker verifying 0 upward or horizontal imports',
          'Repository pattern isolating database persistence from domain procurement rules',
        ],
        evidenceIds: ['EVID-LOM-01'],
        componentIds: ['lom-clean-backend'],
        decisionIds: ['ADR-LOOM-01'],
      },
      'ai-vs-deterministic': {
        dimensionId: 'ai-vs-deterministic',
        title: 'Strict Deterministic Business Rules Gating AI Supplier Recommendations',
        summary:
          'Purchase authorization, budget validation, catalog search indexing, and cryptographic signing are 100% deterministic code. AI is utilized solely for drafting RFQ text and parsing supplier unstructured responses.',
        keyMechanisms: [
          'Deterministic financial threshold checks ($10,000 ceiling triggering HITL gate)',
          'Deterministic HMAC signature verification for purchase order execution',
          'Generative LLM drafts polite RFQ inquiries from structured purchase specifications',
        ],
        evidenceIds: ['EVID-LOM-01', 'EVID-LOM-02'],
        componentIds: ['lom-clean-backend', 'lom-hitl-queue'],
        decisionIds: ['ADR-LOOM-01', 'ADR-LOOM-02'],
      },
      'data-retrieval': {
        dimensionId: 'data-retrieval',
        title: 'Compound MongoDB Text Indexes & Decoupled Repository Pattern',
        summary:
          'Indexes supplier catalogs using MongoDB compound text and attribute indexes, accessed exclusively through domain repository interfaces that hide database details from core entities.',
        keyMechanisms: [
          'Compound MongoDB text indexes optimizing multi-attribute supplier part searches',
          'Decoupled domain repositories allowing database migration without domain changes',
          'Optimistic concurrency control preventing race conditions on inventory reservations',
        ],
        evidenceIds: ['EVID-LOM-01'],
        componentIds: ['lom-search-engine'],
        decisionIds: ['ADR-LOOM-01'],
      },
      'orchestration-state': {
        dimensionId: 'orchestration-state',
        title: 'Event-Driven Workflow State Machine with Asynchronous Task Queues',
        summary:
          'Coordinates procurement orders through explicit states (DRAFT -> RFQ_SENT -> QUOTES_RECEIVED -> HITL_PENDING -> APPROVED -> ORDERED) using an event-driven task queue.',
        keyMechanisms: [
          'Explicit finite state machine enforcing valid procurement state transitions',
          'Asynchronous message queues handling supplier communication and reminder emails',
          'Transaction logging recording every state change with timestamp and actor identity',
        ],
        evidenceIds: ['EVID-LOM-01'],
        componentIds: ['lom-clean-backend', 'lom-hitl-queue'],
        decisionIds: ['ADR-LOOM-01'],
      },
      'failure-containment': {
        dimensionId: 'failure-containment',
        title: 'Cryptographic HMAC Procurement Authorization Gate ($> $10,000)',
        summary:
          'Any purchase order exceeding $10,000 is halted in `HITL_PENDING` status; it cannot transition to `APPROVED` without a valid cryptographic HMAC signature from an authorized enterprise procurement officer.',
        keyMechanisms: [
          'Cryptographic HMAC signature verification preventing unauthorized auto-purchases',
          'Financial threshold circuit breaker freezing orders on anomalous price variances',
          'Strict transactional rollback on supplier communication network failures',
        ],
        evidenceIds: ['EVID-LOM-02'],
        componentIds: ['lom-hitl-queue'],
        decisionIds: ['ADR-LOOM-02'],
      },
      'evaluation-verification': {
        dimensionId: 'evaluation-verification',
        title: 'Automated AST Dependency Verification & Procurement Integration Tests',
        summary:
          'Verified by static AST analysis asserting 0 illegal upward imports in the codebase, plus automated test suites verifying state machine transitions and cryptographic signature validation.',
        keyMechanisms: [
          'Static AST script verifying zero framework imports in domain entity layer',
          'Unit tests verifying business rules and order pricing calculation logic',
          'Integration tests validating cryptographic HMAC approval gate enforcement',
        ],
        evidenceIds: ['EVID-LOM-01', 'EVID-LOM-02'],
        componentIds: ['lom-clean-backend', 'lom-hitl-queue'],
        decisionIds: ['ADR-LOOM-01', 'ADR-LOOM-02'],
      },
      'hitl-governance': {
        dimensionId: 'hitl-governance',
        title: 'Cryptographic Executive Approval Queue with Non-Repudiation',
        summary:
          'High-value transactions require cryptographic approval tokens signed by executive private keys, providing mathematical non-repudiation for financial audits.',
        keyMechanisms: [
          'Dedicated executive approval dashboard displaying line-item price breakdowns',
          'Cryptographic signature capture providing auditable proof of authorized sign-off',
          'Immutable audit log tracking approval timestamps and executive identities',
        ],
        evidenceIds: ['EVID-LOM-02'],
        componentIds: ['lom-hitl-queue'],
        decisionIds: ['ADR-LOOM-02'],
      },
      'core-trade-offs': {
        dimensionId: 'core-trade-offs',
        title: 'Strict Clean Architecture Boilerplate vs Rapid Framework Prototyping',
        summary:
          'Accepted increased interface boilerplate and mapper code in exchange for 100% framework decoupling, testability without live databases, and zero architectural decay over time.',
        keyMechanisms: [
          'Domain entities have zero imports from Express, Nest, or MongoDB drivers',
          'Allows swapping databases or web frameworks without touching core business rules',
          'Requires writing explicit data mappers between DB models and domain entities',
        ],
        evidenceIds: ['EVID-LOM-01'],
        componentIds: ['lom-clean-backend'],
        decisionIds: ['ADR-LOOM-01'],
      },
      'individual-contribution': {
        dimensionId: 'individual-contribution',
        title: 'Full-Stack Architect & Lead Engineer',
        summary:
          'Architected the Clean Architecture backend, wrote the custom AST import checker, implemented the procurement state machine, and created the cryptographic HMAC authorization gate.',
        keyMechanisms: [
          'Designed Clean Architecture directory boundaries and dependency rules',
          'Created automated AST inspection script enforcing downward imports in CI',
          'Engineered the cryptographic HMAC signature verification queue for orders > $10,000',
        ],
        evidenceIds: ['EVID-LOM-01', 'EVID-LOM-02'],
        componentIds: ['lom-portals', 'lom-clean-backend', 'lom-hitl-queue'],
        decisionIds: ['ADR-LOOM-01', 'ADR-LOOM-02'],
      },
    },
    tradeOffs: [
      {
        title: 'Clean Architecture Concentric Layers vs Framework-Driven MVC',
        chosenApproach: 'Concentric Clean Architecture with domain entity isolation and AST import checks',
        alternativeRejected: 'Standard framework-coupled MVC pattern (e.g. Prisma / Mongoose models directly in controllers)',
        technicalRationale: 'Enterprise procurement rules must survive database or framework upgrades; Clean Architecture guarantees domain rules are 100% independent of ORMs.',
        acceptedCompromise: 'Requires maintaining data mapping adapters between ORM entities and domain objects, increasing line count.',
        evidenceId: 'EVID-LOM-01',
        decisionId: 'ADR-LOOM-01',
      },
      {
        title: 'Mandatory Cryptographic HMAC Gate vs Automated Algorithmic Approval',
        chosenApproach: 'Cryptographic signature required from executive for purchases exceeding $10,000',
        alternativeRejected: 'Fully automated algorithmic order dispatch based on supplier rating and budget match',
        technicalRationale: 'Unconstrained automated B2B spending introduces massive corporate liability; cryptographic authorization provides non-repudiation for audit compliance.',
        acceptedCompromise: 'High-value orders experience latency while waiting for human executive signature.',
        evidenceId: 'EVID-LOM-02',
        decisionId: 'ADR-LOOM-02',
      },
    ],
  },

  // ===========================================================================
  // 9. VM COPY QUESTION GENERATOR
  // ===========================================================================
  'vm-copy': {
    slug: 'vm-copy',
    name: 'VM Copy Question Generator',
    tagline: 'Pre-flight deterministic evaluation layer & parallel micro-batching bounding latency to 4–6s.',
    category: 'generative-eval',
    systemRole: 'Interactive Educational Assessment Item Generation Guardrail Engine',
    caseStudyRoute: '/projects/vm-copy',
    architectureRoute: '/architecture?system=vm-copy',
    verificationRoute: '/verification#evid-evid-vmc-01',
    decisionRecordsRoute: '/projects/vm-copy#decisions',
    dimensions: {
      'problem-objective': {
        dimensionId: 'problem-objective',
        title: 'Real-Time Generation of Defect-Free Educational Assessment Items',
        summary:
          'Enables educators to generate standardized multiple-choice questions in real time while guaranteeing zero structural defects (e.g. duplicate options, missing correct answer) at sub-second speeds.',
        keyMechanisms: [
          'Generates rigorous multiple-choice questions aligned with educational standards',
          'Filters out malformed questions ahead of costly LLM evaluation loops',
          'Bounds overall generation latency to 4–6 seconds through parallel micro-batching',
        ],
        evidenceIds: ['EVID-VMC-01', 'EVID-VMC-02'],
        componentIds: ['vmc-config', 'vmc-llm-generator'],
        decisionIds: ['ADR-VM-01', 'ADR-VM-02'],
      },
      'architectural-pattern': {
        dimensionId: 'architectural-pattern',
        title: 'Pre-Flight Deterministic Evaluation & Parallel Micro-Batching Engine',
        summary:
          'Two-tier architecture: Real-Time Micro-Batch Dispatcher -> LLM Candidate Generation -> Pure TypeScript Tier-1 Evaluator (< 1ms, $0 cost) -> Formatted Item Output.',
        keyMechanisms: [
          'Parallel micro-batching dispatching item generation in parallel 3-item slices',
          'Pure TypeScript Tier-1 Evaluator running ahead of any expensive LLM judge',
          'Immediate discard and retry of candidates failing structural sanity checks',
        ],
        evidenceIds: ['EVID-VMC-01', 'EVID-VMC-02'],
        componentIds: ['vmc-batch-dispatcher', 'vmc-tier1-evaluator'],
        decisionIds: ['ADR-VM-01', 'ADR-VM-02'],
      },
      'ai-vs-deterministic': {
        dimensionId: 'ai-vs-deterministic',
        title: 'Pure TypeScript Set Arithmetic Bounding Probabilistic Generation',
        summary:
          'Validating distractor uniqueness, verifying exact option count (4), and checking correct answer presence are executed via pure TypeScript Set math in < 1ms at $0 API cost. LLMs are used only to draft text.',
        keyMechanisms: [
          'JavaScript Set comparison checking for duplicate distractor options in < 1ms',
          'Deterministic string length and punctuation sanity rules',
          'Generative LLM drafts question stems and plausible distractors',
        ],
        evidenceIds: ['EVID-VMC-01'],
        componentIds: ['vmc-tier1-evaluator'],
        decisionIds: ['ADR-VM-01'],
      },
      'data-retrieval': {
        dimensionId: 'data-retrieval',
        title: 'In-Memory Assessment Item Schemas & Prompt Template Registries',
        summary:
          'Maintains parameterized item generation prompt templates and schema definitions in memory, assembling generation payloads dynamically based on user configuration.',
        keyMechanisms: [
          'Parameterized prompt templates tuned for specific grade levels and difficulty',
          'Typed assessment schema definitions enforcing JSON output compliance',
          'In-memory deduplication set checking candidate items against previously generated bank',
        ],
        evidenceIds: ['EVID-VMC-01'],
        componentIds: ['vmc-config'],
        decisionIds: ['ADR-VM-01'],
      },
      'orchestration-state': {
        dimensionId: 'orchestration-state',
        title: 'Parallel Asynchronous Micro-Batching with Sliding Window Completion',
        summary:
          'Splits generation requests into parallel micro-batches executed concurrently, bounding user wait times to 4–6s compared to sequential 18s execution loops.',
        keyMechanisms: [
          'Promise.all concurrent micro-batch dispatcher running 3 parallel generation requests',
          'Sliding window buffer accepting the first valid items that pass Tier-1 evaluation',
          'Cancels trailing redundant requests once required target item count is fulfilled',
        ],
        evidenceIds: ['EVID-VMC-02'],
        componentIds: ['vmc-batch-dispatcher'],
        decisionIds: ['ADR-VM-02'],
      },
      'failure-containment': {
        dimensionId: 'failure-containment',
        title: 'Sub-Millisecond Tier-1 Structural Rejection Gate',
        summary:
          'Catches malformed LLM outputs (e.g. identical options, missing correct answer key, invalid JSON) in < 1ms; immediately triggers local retry before wasting time or money on LLM judges.',
        keyMechanisms: [
          'Set-based distractor deduplication rejecting questions with identical options',
          'Strict 4-option contract rejecting outputs with 3 or 5 choices',
          'Zero-cost local circuit breaker preventing corrupt data from reaching database',
        ],
        evidenceIds: ['EVID-VMC-01'],
        componentIds: ['vmc-tier1-evaluator'],
        decisionIds: ['ADR-VM-01'],
      },
      'evaluation-verification': {
        dimensionId: 'evaluation-verification',
        title: 'Automated Tier-1 Test Suite & Latency Benchmark Verification',
        summary:
          'Verified by automated unit tests validating 100% rejection of duplicate distractors and missing keys, alongside latency benchmarks confirming 4–6s total turnaround.',
        keyMechanisms: [
          'Automated unit tests asserting rejection of artificially corrupted item JSONs',
          'Execution latency benchmarks proving < 1ms runtime for Tier-1 evaluator',
          'End-to-end performance tests validating 3x latency reduction via micro-batching',
        ],
        evidenceIds: ['EVID-VMC-01', 'EVID-VMC-02'],
        componentIds: ['vmc-tier1-evaluator', 'vmc-batch-dispatcher'],
        decisionIds: ['ADR-VM-01', 'ADR-VM-02'],
      },
      'hitl-governance': {
        dimensionId: 'hitl-governance',
        title: 'Educator Interactive Review & Item Editing Canvas',
        summary:
          'Surfaces generated assessment items in an interactive editing canvas, allowing teachers to fine-tune wording, swap distractors, or regenerate individual items before publishing.',
        keyMechanisms: [
          'Interactive inline WYSIWYG question editor for educators',
          'One-click item regeneration for individual rejected questions',
          'Batch export to standard QTI (Question and Test Interoperability) formats',
        ],
        evidenceIds: ['EVID-VMC-01'],
        componentIds: ['vmc-config'],
        decisionIds: ['ADR-VM-01'],
      },
      'core-trade-offs': {
        dimensionId: 'core-trade-offs',
        title: 'Pure TypeScript Tier-1 Evaluator vs LLM-as-a-Judge Evaluation',
        summary:
          'Accepted lack of deep pedagogical nuance in Tier-1 checks in exchange for sub-millisecond evaluation latency, $0 token costs, and 100% deterministic structural enforcement.',
        keyMechanisms: [
          'Tier-1 executes in < 1ms and costs $0, catching 85% of generation defects instantly',
          'Avoids paying second LLM call to check obvious structural rules (4 options, unique choices)',
          'Requires separate human educator review for subtle pedagogical bias or tone',
        ],
        evidenceIds: ['EVID-VMC-01'],
        componentIds: ['vmc-tier1-evaluator'],
        decisionIds: ['ADR-VM-01'],
      },
      'individual-contribution': {
        dimensionId: 'individual-contribution',
        title: 'Individual Contributor within Wayground Engineering Team',
        summary:
          'Developed at Wayground. Aadil personally conceived and implemented the pure TypeScript Tier-1 Evaluator and designed the parallel micro-batching generation dispatcher.',
        keyMechanisms: [
          'Personally authored the pure TypeScript Tier-1 Evaluator (`eval-layer.ts`)',
          'Designed the parallel asynchronous micro-batching queue reducing latency to 4–6s',
          'Integrated structural rejection filters into the production generation pipeline',
        ],
        evidenceIds: ['EVID-VMC-01', 'EVID-VMC-02'],
        componentIds: ['vmc-batch-dispatcher', 'vmc-tier1-evaluator'],
        decisionIds: ['ADR-VM-01', 'ADR-VM-02'],
      },
    },
    tradeOffs: [
      {
        title: 'Pure TypeScript Tier-1 Evaluator vs LLM-as-a-Judge',
        chosenApproach: 'Pure TypeScript evaluator running in < 1ms at $0 cost ahead of any LLM judge',
        alternativeRejected: 'Invoking a secondary LLM model (e.g. GPT-4) as an evaluation judge for every candidate',
        technicalRationale: 'Catching structural defects (duplicate choices, invalid option count) deterministically saves thousands in API costs and eliminates 2-4s of judge latency.',
        acceptedCompromise: 'Cannot evaluate subtle narrative engagement or qualitative grade-level reading tone.',
        evidenceId: 'EVID-VMC-01',
        decisionId: 'ADR-VM-01',
      },
      {
        title: 'Parallel Micro-Batching vs Single Sequential Generation Stream',
        chosenApproach: 'Parallel micro-batching dispatching concurrent generation slices (4-6s turnaround)',
        alternativeRejected: 'Single sequential prompt generating all 10 items in one streaming response (18s turnaround)',
        technicalRationale: 'Large sequential generations suffer severe latency; parallel micro-batching delivers completed items to the user 3x faster.',
        acceptedCompromise: 'Consumes slightly higher concurrency tokens and requires client-side sorting and merging.',
        evidenceId: 'EVID-VMC-02',
        decisionId: 'ADR-VM-02',
      },
    ],
  },

  // ===========================================================================
  // 10. AI WORKSHEETS
  // ===========================================================================
  'ai-worksheets': {
    slug: 'ai-worksheets',
    name: 'AI Worksheets',
    tagline: 'Dual formal/gamified math generation with headless TikZ pdflatex compiler sandbox and MD5 caching.',
    category: 'generative-graphics',
    systemRole: 'Generative Mathematics Worksheets & Procedural Graphic Engine',
    caseStudyRoute: '/projects/ai-worksheets',
    architectureRoute: '/architecture?system=ai-worksheets',
    verificationRoute: '/verification#evid-evid-wks-01',
    decisionRecordsRoute: '/projects/ai-worksheets#decisions',
    dimensions: {
      'problem-objective': {
        dimensionId: 'problem-objective',
        title: 'Automated Generation of Print-Ready Mathematical Graphics & Puzzles',
        summary:
          'Generates publication-quality, curriculum-aligned mathematical worksheets featuring precise geometric figures, coordinate grids, and procedural backtracking puzzles.',
        keyMechanisms: [
          'Generates dual formal geometry diagrams and gamified puzzle activities',
          'Compiles raw LaTeX/TikZ code into vector PDF and raster PNG formats',
          'Guarantees unique mathematical puzzle solutions via procedural DFS solvers',
        ],
        evidenceIds: ['EVID-WKS-01', 'EVID-WKS-02'],
        componentIds: ['ws-builder', 'ws-tikz-compiler'],
        decisionIds: ['ADR-WS-01', 'ADR-WS-02'],
      },
      'architectural-pattern': {
        dimensionId: 'architectural-pattern',
        title: 'Subprocess Sandboxing & Algorithmic Solver Engine',
        summary:
          'Dual-tier pipeline: AI Model Router -> Procedural DFS Puzzle Solver -> Headless pdflatex Subprocess Compiler Sandbox (15s Watchdog) -> Content-Addressed MD5 Asset Cache.',
        keyMechanisms: [
          'Isolated subprocess compiler executing pdflatex with strict memory and time limits',
          'Deterministic graph backtracking algorithms ensuring single-solution puzzles',
          'Content-addressed MD5 hash caching preventing redundant compiler executions',
        ],
        evidenceIds: ['EVID-WKS-01', 'EVID-WKS-02'],
        componentIds: ['ws-tikz-compiler', 'ws-graph-solver'],
        decisionIds: ['ADR-WS-01', 'ADR-WS-02'],
      },
      'ai-vs-deterministic': {
        dimensionId: 'ai-vs-deterministic',
        title: 'Deterministic Subprocess Sandbox Compiling AI-Generated TikZ Code',
        summary:
          'Mathematical puzzle generation (DFS backtracking), LaTeX compilation sandboxing, and MD5 asset caching are 100% deterministic code. Generative AI is used to author the initial TikZ geometry scripts.',
        keyMechanisms: [
          'Deterministic DFS backtracking solver proving puzzle solvability and uniqueness',
          'Headless pdflatex sandbox with hard 15s watchdog kill process',
          'Content-addressed MD5 hashing bypassing compilation entirely on cache hits (< 10ms)',
        ],
        evidenceIds: ['EVID-WKS-01', 'EVID-WKS-02'],
        componentIds: ['ws-tikz-compiler', 'ws-graph-solver'],
        decisionIds: ['ADR-WS-01', 'ADR-WS-02'],
      },
      'data-retrieval': {
        dimensionId: 'data-retrieval',
        title: 'Content-Addressed MD5 Asset Cache & Local Artifact Storage',
        summary:
          'Hashes incoming TikZ source code via MD5; if a matching PDF/PNG exists in the content-addressed store, the cached file is returned in < 10ms without invoking the compiler.',
        keyMechanisms: [
          'MD5 content hashing of raw LaTeX source strings',
          'File-based content-addressed artifact store storing generated PDFs and SVGs',
          'In-memory LRU cache storing rendered raster previews for quick web viewing',
        ],
        evidenceIds: ['EVID-WKS-02'],
        componentIds: ['ws-tikz-compiler'],
        decisionIds: ['ADR-WS-02'],
      },
      'orchestration-state': {
        dimensionId: 'orchestration-state',
        title: 'Subprocess Execution Watchdog with Temporary Directory Isolation',
        summary:
          'Spawns ephemeral OS temp directories for each pdflatex compilation run, cleaning up auxiliary files (.aux, .log) upon process termination to prevent disk exhaustion.',
        keyMechanisms: [
          'Ephemeral working directory isolation preventing cross-job file collisions',
          'Strict 15-second watchdog timer killing hung LaTeX macro compilation loops',
          'Automatic cleanup of intermediate compilation artifacts in `finally:` blocks',
        ],
        evidenceIds: ['EVID-WKS-01'],
        componentIds: ['ws-tikz-compiler'],
        decisionIds: ['ADR-WS-01'],
      },
      'failure-containment': {
        dimensionId: 'failure-containment',
        title: '15-Second Hard Watchdog Timer & TeX Error Parser',
        summary:
          'Prevents catastrophic CPU hangs from infinite TeX loops by enforcing a hard 15s process timeout. Parses pdflatex error logs to return actionable syntax remediation feedback.',
        keyMechanisms: [
          'Hard process SIGKILL after 15 seconds preventing CPU core exhaustion',
          'TeX error log parser extracting exact line numbers of undefined control sequences',
          'Automated fallback to pre-compiled static geometric templates on fatal compile errors',
        ],
        evidenceIds: ['EVID-WKS-01'],
        componentIds: ['ws-tikz-compiler'],
        decisionIds: ['ADR-WS-01'],
      },
      'evaluation-verification': {
        dimensionId: 'evaluation-verification',
        title: 'Automated Sandbox Regression Suite & Cache Hit Latency Verification',
        summary:
          'Verified by automated test suites validating watchdog process termination on infinite TeX loops and verifying < 10ms cache hit response times for repeated requests.',
        keyMechanisms: [
          'Test suite confirming 15s watchdog successfully terminates infinite recursive TeX macros',
          'Cache benchmarking verifying < 10ms retrieval latency on identical TikZ source strings',
          'Algorithmic solver tests proving 100% puzzle uniqueness across 500 test generations',
        ],
        evidenceIds: ['EVID-WKS-01', 'EVID-WKS-02'],
        componentIds: ['ws-tikz-compiler', 'ws-graph-solver'],
        decisionIds: ['ADR-WS-01', 'ADR-WS-02'],
      },
      'hitl-governance': {
        dimensionId: 'hitl-governance',
        title: 'Teacher Print Preview & Interactive Solution Key Verification',
        summary:
          'Renders side-by-side student worksheets and full teacher answer keys, allowing educators to inspect step-by-step solutions before printing or exporting.',
        keyMechanisms: [
          'Side-by-side PDF preview displaying student problem and complete answer key',
          'Educator approval button approving worksheets for classroom print distribution',
          'Direct export to Google Drive and high-resolution PDF print queues',
        ],
        evidenceIds: ['EVID-WKS-01'],
        componentIds: ['ws-builder'],
        decisionIds: ['ADR-WS-01'],
      },
      'core-trade-offs': {
        dimensionId: 'core-trade-offs',
        title: 'Headless pdflatex Subprocess Sandbox vs Browser Canvas / SVG Generation',
        summary:
          'Accepted heavier server-side TeX installation (1.5 GB) in exchange for mathematical typography perfection, sub-pixel vector TikZ geometry, and native CMYK print compatibility.',
        keyMechanisms: [
          'LaTeX/TikZ produces textbook-grade vector geometry and mathematical typography',
          'Enables native CMYK color separation required for commercial book printing',
          'Requires server-side Linux TeX Live installation and subprocess management',
        ],
        evidenceIds: ['EVID-WKS-01'],
        componentIds: ['ws-tikz-compiler'],
        decisionIds: ['ADR-WS-01'],
      },
      'individual-contribution': {
        dimensionId: 'individual-contribution',
        title: 'Individual Contributor within Wayground Engineering Team',
        summary:
          'Developed at Wayground. Aadil personally built the headless TikZ compiler sandbox with watchdog process management, the MD5 asset cache, and the DFS puzzle solvers.',
        keyMechanisms: [
          'Engineered the sandboxed pdflatex execution harness with 15s watchdog timeout',
          'Implemented the content-addressed MD5 asset cache bypassing redundant renders (< 10ms)',
          'Authored procedural graph backtracking algorithms generating unique math puzzles',
        ],
        evidenceIds: ['EVID-WKS-01', 'EVID-WKS-02'],
        componentIds: ['ws-tikz-compiler', 'ws-graph-solver'],
        decisionIds: ['ADR-WS-01', 'ADR-WS-02'],
      },
    },
    tradeOffs: [
      {
        title: 'Server-Side pdflatex Compilation vs Client-Side Canvas/SVG',
        chosenApproach: 'Headless pdflatex compilation in sandboxed subprocess with 15s watchdog',
        alternativeRejected: 'Client-side HTML5 Canvas or SVG generation in browser',
        technicalRationale: 'Educational publishers require true CMYK vector PDF output with professional TeX font kerning; browser canvas produces low-resolution raster artifacts.',
        acceptedCompromise: 'Requires maintaining server-side TeX Live runtime dependencies and sandboxing compilation.',
        evidenceId: 'EVID-WKS-01',
        decisionId: 'ADR-WS-01',
      },
      {
        title: 'Content-Addressed MD5 Caching vs On-Demand Dynamic Compilation',
        chosenApproach: 'MD5 content hashing of raw TikZ source returning cached PDF in < 10ms',
        alternativeRejected: 'Re-compiling pdflatex for every student worksheet request (1.5–3.0s)',
        technicalRationale: 'Identical geometric templates are frequently requested across classrooms; caching eliminates 99% of compilation CPU spend.',
        acceptedCompromise: 'Requires managing local disk cache storage and implementing cache eviction policies.',
        evidenceId: 'EVID-WKS-02',
        decisionId: 'ADR-WS-02',
      },
    ],
  },

  // ===========================================================================
  // 11. US MATH ITEM BANK
  // ===========================================================================
  'math-item-bank': {
    slug: 'math-item-bank',
    name: 'US Math Item Bank',
    tagline: 'Assessment item generation pipeline with mathematical domain router (SVG vs TikZ) based on token complexity.',
    category: 'generative-pipeline',
    systemRole: 'Large-Scale Standardized Mathematics Assessment Authoring System',
    caseStudyRoute: '/projects/math-item-bank',
    architectureRoute: '/architecture?system=math-item-bank',
    verificationRoute: '/verification#evid-evid-mib-01',
    decisionRecordsRoute: '/projects/math-item-bank#decisions',
    dimensions: {
      'problem-objective': {
        dimensionId: 'problem-objective',
        title: 'Large-Scale Authoring of Standardized K-12 Mathematics Assessment Items',
        summary:
          'Powers automated generation of tens of thousands of psychometrically calibrated mathematics assessment items aligned with US state educational standards.',
        keyMechanisms: [
          'Generates rigorous items across 2D geometry, algebraic calculus, and statistics',
          'Routes rendering requests to optimal graphical engines based on mathematical complexity',
          'Validates mathematical and grammatical correctness ahead of item bank inclusion',
        ],
        evidenceIds: ['EVID-MIB-01'],
        componentIds: ['mib-curriculum', 'mib-candidate-gen'],
        decisionIds: ['ADR-MIB-01', 'ADR-MIB-02'],
      },
      'architectural-pattern': {
        dimensionId: 'architectural-pattern',
        title: 'Assessment Item Generation & Mathematical Domain Routing Pipeline',
        summary:
          'Multi-stage pipeline: Curriculum Taxonomy Ingest -> Prompt Formulation -> Mathematical Domain Router (SVG vs TikZ) -> Candidate Generation -> Visual Syntax Pass/Fail Gate.',
        keyMechanisms: [
          'Curriculum taxonomy parser extracting target standard learning objectives',
          'Mathematical domain router analyzing token complexity to select rendering engine',
          'Automated syntax pass/fail gates verifying graphic code integrity before export',
        ],
        evidenceIds: ['EVID-MIB-01'],
        componentIds: ['mib-domain-router', 'mib-visual-gate'],
        decisionIds: ['ADR-MIB-01'],
      },
      'ai-vs-deterministic': {
        dimensionId: 'ai-vs-deterministic',
        title: 'Deterministic Token Complexity Routing Gating Model Selection',
        summary:
          'Domain routing (deciding whether a problem requires 2D SVG or complex TikZ calculus) and compiler syntax gates are 100% deterministic code. LLMs generate the mathematical problem prose and code.',
        keyMechanisms: [
          'Deterministic token complexity classifier inspecting standard keywords (e.g. "coordinate plane" vs "parabola")',
          'Routes standard 2D geometry to lightweight SVG and advanced calculus to TikZ',
          'Deterministic compiler syntax verification validating generated code',
        ],
        evidenceIds: ['EVID-MIB-01'],
        componentIds: ['mib-domain-router', 'mib-visual-gate'],
        decisionIds: ['ADR-MIB-01', 'ADR-MIB-02'],
        qualificationNote: 'Individual contribution: domain router and compiler syntax gates. System owned by Wayground.',
      },
      'data-retrieval': {
        dimensionId: 'data-retrieval',
        title: 'State Mathematics Standards Taxonomy & Item Bank Datastores',
        summary:
          'Maintains normalized relational databases of Common Core and state mathematics standards, querying learning standards and previously authored items to avoid duplicate questions.',
        keyMechanisms: [
          'Relational database mapping grade levels, clusters, and standard codes',
          'Item bank indexing preventing semantic duplication across test forms',
          'Standardized metadata tags supporting psychometric parameter storage',
        ],
        evidenceIds: ['EVID-MIB-01'],
        componentIds: ['mib-curriculum'],
        decisionIds: ['ADR-MIB-01'],
      },
      'orchestration-state': {
        dimensionId: 'orchestration-state',
        title: 'Asynchronous Batch Processing Pipeline with Stage Checkpointing',
        summary:
          'Executes high-volume item bank generation runs through an asynchronous queue, checkpointing progress and routing failed items to dedicated remediation workers.',
        keyMechanisms: [
          'Queue-based worker architecture distributing generation across worker instances',
          'State tracking recording item status (GENERATED, COMPILED, VERIFIED, ACCEPTED)',
          'Dead-letter handling for items with persistent mathematical rendering errors',
        ],
        evidenceIds: ['EVID-MIB-01'],
        componentIds: ['mib-candidate-gen'],
        decisionIds: ['ADR-MIB-01'],
      },
      'failure-containment': {
        dimensionId: 'failure-containment',
        title: 'Compiler Syntax Pass/Fail Gates & Automatic Remediation Loops',
        summary:
          'Every generated visual code snippet is compiled in an automated test harness; syntax errors trigger an immediate feedback remediation prompt back to the generator, up to 3 attempts.',
        keyMechanisms: [
          'Pre-flight syntax validation catching unbalanced braces or unknown macros',
          'Automated error-feedback retry loop sending compiler error logs back to LLM',
          'Hard failure quarantine preventing unrenderable items from polluting the item bank',
        ],
        evidenceIds: ['EVID-MIB-01'],
        componentIds: ['mib-visual-gate'],
        decisionIds: ['ADR-MIB-02'],
      },
      'evaluation-verification': {
        dimensionId: 'evaluation-verification',
        title: 'Automated Domain Router Benchmarks & Compiler Pass-Rate Suites',
        summary:
          'Verified by automated test suites evaluating routing accuracy between SVG and TikZ, alongside compiler pass-rate verification asserting > 98% first-pass renderability.',
        keyMechanisms: [
          'Automated routing tests verifying 100% correct dispatch of standard test cases',
          'Compiler test harness validating syntax pass/fail gating accuracy',
          'Batch stress testing generating 1,000+ calibrated assessment items',
        ],
        evidenceIds: ['EVID-MIB-01'],
        componentIds: ['mib-domain-router', 'mib-visual-gate'],
        decisionIds: ['ADR-MIB-01', 'ADR-MIB-02'],
      },
      'hitl-governance': {
        dimensionId: 'hitl-governance',
        title: 'Psychometrician Review & Assessment Form Publishing Gate',
        summary:
          'Psychometricians and senior mathematics educators review calibrated item batches, inspecting difficulty indexes, distractor plausibility, and standard alignment before publishing.',
        keyMechanisms: [
          'Specialist review interface displaying item stem, rubric, and rendering',
          'One-click acceptance, rejection, or manual parameter adjustment',
          'Formal publishing gate locking approved items into immutable release versions',
        ],
        evidenceIds: ['EVID-MIB-01'],
        componentIds: ['mib-curriculum'],
        decisionIds: ['ADR-MIB-01'],
      },
      'core-trade-offs': {
        dimensionId: 'core-trade-offs',
        title: 'Domain Router (SVG vs TikZ) vs Single Rendering Engine',
        summary:
          'Accepted router logic complexity in exchange for 10x faster generation and lower server load on simple 2D shapes (SVG) while reserving heavy pdflatex compilation for advanced calculus (TikZ).',
        keyMechanisms: [
          'Lightweight SVG renders in milliseconds with zero server subprocess overhead',
          'Heavy TikZ compilation reserved only for complex coordinate curves and 3D graphs',
          'Eliminates unnecessary pdflatex calls for 60% of elementary geometry items',
        ],
        evidenceIds: ['EVID-MIB-01'],
        componentIds: ['mib-domain-router'],
        decisionIds: ['ADR-MIB-01'],
      },
      'individual-contribution': {
        dimensionId: 'individual-contribution',
        title: 'Individual Contributor within Wayground Engineering Team',
        summary:
          'Developed at Wayground by the Wayground Engineering Team. Aadil personally designed and implemented the mathematical domain router and the compiler syntax pass/fail gates.',
        keyMechanisms: [
          'Personally designed and coded the mathematical domain router (`domain_router.py`)',
          'Engineered the compiler syntax pass/fail validation gates (`visual_gate.py`)',
          'Created automated retry remediation loop parsing compiler error logs',
        ],
        evidenceIds: ['EVID-MIB-01'],
        componentIds: ['mib-domain-router', 'mib-visual-gate'],
        decisionIds: ['ADR-MIB-01', 'ADR-MIB-02'],
      },
    },
    tradeOffs: [
      {
        title: 'Dual Engine Routing (SVG vs TikZ) vs Universal TikZ Compilation',
        chosenApproach: 'Routing simple 2D geometry to SVG and advanced calculus to TikZ based on token complexity',
        alternativeRejected: 'Compiling all diagrams unconditionally through pdflatex TikZ',
        technicalRationale: 'Over 60% of K-12 geometry involves simple shapes (triangles, rectangles, bar charts); SVG generation is instantaneous (< 50ms) and costs zero server CPU compilation overhead.',
        acceptedCompromise: 'Requires maintaining two distinct code generators and visual test suites.',
        evidenceId: 'EVID-MIB-01',
        decisionId: 'ADR-MIB-01',
      },
      {
        title: 'Automated Compiler Syntax Remediation Loop vs Immediate Human Review',
        chosenApproach: 'Automated 3-attempt compiler error feedback retry loop before human escalation',
        alternativeRejected: 'Routing any compile failure immediately to human psychometrician queue',
        technicalRationale: 'Over 80% of syntax errors (e.g. missing semicolon or unclosed environment) are trivial for LLMs to self-correct when provided the raw error log.',
        acceptedCompromise: 'Consumes additional LLM tokens for retry loops on persistently malformed items.',
        evidenceId: 'EVID-MIB-01',
        decisionId: 'ADR-MIB-02',
      },
    ],
  },
}

