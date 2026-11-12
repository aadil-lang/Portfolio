import { SystemArchitecture } from './types'

export const systemsArchitecture: SystemArchitecture[] = [
  // =========================================================================
  // 1. ASK AADIL (LEVEL 1 — FULL INTERACTIVE)
  // =========================================================================
  {
    id: 'ask-aadil',
    slug: 'ask-aadil',
    name: 'Ask Aadil',
    tagline: 'Stateful conversational RAG agent with deterministic intent routing and governed tool execution.',
    category: 'agentic-orchestration',
    explorationLevel: 'level-1-full',
    technologies: ['TypeScript', 'Hybrid RAG (BM25 + Vector)', 'Reciprocal Rank Fusion', 'LangGraph Patterns', 'Web Speech API', 'Tool Governance'],
    distinctiveEngineeringContribution:
      'Engineered a deterministic <2ms intent router and pronoun resolution engine running prior to LLM synthesis, combined with an authorization gate requiring explicit human confirmation before executing outbound actions.',
    ownership: 'independent',
    externalRoute: '/projects/ask-aadil',
    decisionReferences: ['ADR-AA-01', 'ADR-AA-02', 'ADR-AA-03'],
    nodes: [
      {
        id: 'aa-session',
        label: 'Session & Context Bridge',
        layer: 'Interface & Client',
        classification: 'deterministic',
        responsibility: 'Manages conversational turn state, active route context, and ephemeral session isolation.',
        sourceLocation: 'lib/rag/askAadilPageContext.ts, lib/rag/askAadilAgent.ts:44-60',
        inputs: ['User query string', 'Active page URL', 'Selected text span', 'Prior conversation state'],
        outputs: ['Enriched query object', 'Preserved turn history'],
        dependencies: ['Next.js usePathname', 'AgentConversationState'],
        validationRule: 'Sanitizes input length <= 1,000 characters; strips invalid control characters',
        verificationEvidence: {
          type: 'test_suite',
          label: 'Grounded Conversational Suite',
          measurement: '16/16 tests passing with zero state leaks across sessions',
          location: 'scripts/test_grounded_conversational_evaluation.ts'
        }
      },
      {
        id: 'aa-intent-router',
        label: 'Deterministic Intent Router',
        layer: 'Routing & Query Understanding',
        classification: 'deterministic',
        responsibility: 'Classifies user intent (navigation, contact, system deep-dive, general) in <2ms without LLM API calls.',
        sourceLocation: 'lib/rag/intentRouter.ts:25-110, lib/rag/queryUnderstanding.ts',
        inputs: ['Clean query string', 'Conversation history'],
        outputs: ['RoutingDecision', 'Identified project target slug'],
        dependencies: ['Precompiled regular expressions', 'Canonical project slug dictionary'],
        validationRule: 'Dispatches instant client navigation on navigational queries, bypassing LLM spend entirely',
        verificationEvidence: {
          type: 'test_suite',
          label: 'Retrieval Foundation Suite',
          measurement: '13/13 tests passed covering intent routing and pronoun resolution',
          location: 'scripts/test_retrieval_foundation.ts:Test 7'
        }
      },
      {
        id: 'aa-entity-resolver',
        label: 'Multi-Turn Entity & Pronoun Resolver',
        layer: 'Routing & Query Understanding',
        classification: 'deterministic',
        responsibility: 'Resolves ambiguous pronouns ("that project", "it") against last 10 conversation turns.',
        sourceLocation: 'lib/rag/projectResolver.ts, lib/rag/queryUnderstanding.ts',
        inputs: ['Query text', 'Previous conversational entities'],
        outputs: ['Resolved project slug or null (prompts clarification)'],
        dependencies: ['projectsMetadata.ts'],
        validationRule: 'Never guesses an arbitrary project; forces clarification if referent is ambiguous',
        verificationEvidence: {
          type: 'test_suite',
          label: 'Retrieval Foundation Suite',
          measurement: 'Successfully resolves "that one" to target project from preceding turn',
          location: 'scripts/test_retrieval_foundation.ts:Test 7'
        }
      },
      {
        id: 'aa-hybrid-retriever',
        label: 'Hybrid RAG & Source Authority Matrix',
        layer: 'Retrieval & Context',
        classification: 'deterministic',
        responsibility: 'Executes BM25 lexical search and subword vector cosine scoring, combining candidates via RRF (k=60).',
        sourceLocation: 'lib/rag/hybridRetriever.ts, data/canonical/sourceAuthority.ts',
        inputs: ['Cleaned query', 'RoutingDecision', 'Source authority mask'],
        outputs: ['Ranked chunk candidates with citation provenance badges'],
        dependencies: ['knowledgeIndex.ts', 'portfolioKnowledge.ts', 'structuredProfile.ts'],
        validationRule: 'Source authority rules forbid cross-domain retrieval (e.g. personal journal forbidden on resume queries)',
        verificationEvidence: {
          type: 'test_suite',
          label: 'Hybrid Retrieval Test',
          measurement: 'Surfaces code evidence and quantitative claims across 5 canonical layers',
          location: 'scripts/test_retrieval_foundation.ts:Test 1-5'
        }
      },
      {
        id: 'aa-synthesizer',
        label: 'Grounded Synthesizer & Abstention Gate',
        layer: 'Synthesis & Generation',
        classification: 'probabilistic',
        responsibility: 'Generates non-speculative factual answers citing granular provenance badges; strictly abstains on unrecorded facts.',
        sourceLocation: 'lib/rag/synthesizer/llmAnswerSynthesizer.ts, defaultSynthesizer.ts',
        inputs: ['Ranked evidence package', 'Conversation turn history'],
        outputs: ['Grounded AgentAnswer', 'Verbatim citations', 'Draft actions if requested'],
        dependencies: ['Google Gemini API / Default Synthesizer fallback'],
        validationRule: 'Forces explicit abstention when query asserts unverified entities (e.g. Google employment, private salary)',
        verificationEvidence: {
          type: 'test_suite',
          label: 'Grounded Conversational Evaluation',
          measurement: '5/5 hallucination resistance tests passed (100% abstention on out-of-scope trivia)',
          location: 'scripts/test_grounded_conversational_evaluation.ts:Test 4'
        }
      },
      {
        id: 'aa-action-gate',
        label: 'Human-in-the-Loop Action Gate',
        layer: 'Governance & Execution',
        classification: 'human_gate',
        responsibility: 'Generates editable communication drafts and blocks external execution until explicit user confirmation.',
        sourceLocation: 'lib/rag/tools/authorization.ts, lib/rag/tools/toolPlanExecutor.ts',
        inputs: ['AgentDraft', 'User confirmation token'],
        outputs: ['Dispatched client mail action or cancelled plan'],
        dependencies: ['actionAudit.ts', 'emailTools.ts'],
        validationRule: 'Autonomous background email sending is physically impossible; requires explicit client interaction',
        verificationEvidence: {
          type: 'source_code',
          label: 'Authorization Token Gate',
          measurement: 'Requires approveAuthorization() token prior to executeToolPlan() execution',
          location: 'lib/rag/tools/authorization.ts:15-45'
        }
      }
    ],
    edges: [
      { from: 'aa-session', to: 'aa-intent-router', label: 'Enriched query & state', type: 'sync' },
      { from: 'aa-intent-router', to: 'aa-entity-resolver', label: 'Follow-up query resolution', type: 'sync' },
      { from: 'aa-intent-router', to: 'aa-hybrid-retriever', label: 'Synthesis intent routing', type: 'sync' },
      { from: 'aa-entity-resolver', to: 'aa-hybrid-retriever', label: 'Resolved project target', type: 'sync' },
      { from: 'aa-hybrid-retriever', to: 'aa-synthesizer', label: 'Packaged evidence & budget', type: 'sync' },
      { from: 'aa-synthesizer', to: 'aa-action-gate', label: 'Contextual draft proposal', type: 'sync' }
    ],
    executionFlow: [
      {
        stepNumber: 1,
        title: 'Visitor Input & Session Ingestion',
        description: 'User enters natural-language query or speech transcript in modal session.',
        activeNodeId: 'aa-session',
        dataPayloadSummary: 'Query: "Tell me about Aadil\'s reliability platform"',
        nature: 'deterministic'
      },
      {
        stepNumber: 2,
        title: 'Deterministic Intent Routing',
        description: 'Pattern matching classifies intent as "project_overview" and maps target to "ai-reliability" in <2ms.',
        activeNodeId: 'aa-intent-router',
        dataPayloadSummary: 'Intent: "project_overview", Target: "ai-reliability", Latency: 1.2ms',
        nature: 'deterministic'
      },
      {
        stepNumber: 3,
        title: 'Hybrid RAG Retrieval & Source Authority Filter',
        description: 'Hybrid retriever pulls chunks from systems registry; filters out non-authoritative layers via source authority rules.',
        activeNodeId: 'aa-hybrid-retriever',
        dataPayloadSummary: 'Retrieved 5 chunks: Playwright runner, Fisher uncertainty, SHA-256 provenance (RRF top score 0.032)',
        nature: 'deterministic'
      },
      {
        stepNumber: 4,
        title: 'Grounded Answer Synthesis & Citation Badging',
        description: 'Synthesizer generates structured response citing exact project lines and provenance badges; hallucination checks pass.',
        activeNodeId: 'aa-synthesizer',
        dataPayloadSummary: 'Answer generated with 3 verified citations and zero speculative claims',
        nature: 'probabilistic'
      },
      {
        stepNumber: 5,
        title: 'Optional Action Generation & Governance Gate',
        description: 'If visitor asks to contact or follow up, an editable draft is created and held in pending state awaiting user tap.',
        activeNodeId: 'aa-action-gate',
        dataPayloadSummary: 'Status: AWAITING_HUMAN_CONFIRMATION (Client-side trigger blocked until user action)',
        nature: 'gate'
      }
    ],
    failureBoundaries: [
      {
        id: 'fb-aa-01',
        name: 'Ungrounded Factual Assertion (Abstention Gate)',
        triggerCondition: 'Visitor asks about unverified corporate employment (e.g. Google), private salary, or unrecorded trivia.',
        containmentAction: 'Returns deterministic refusal ("I don\'t have that information in Aadil\'s portfolio...") without LLM hallucination.',
        sourceFile: 'lib/rag/synthesizer/llmAnswerSynthesizer.ts:95-120',
        verifiedTest: 'scripts/test_grounded_conversational_evaluation.ts (5/5 PASS)'
      },
      {
        id: 'fb-aa-02',
        name: 'Ambiguous Pronoun Fallthrough',
        triggerCondition: 'Visitor asks "What about that one?" with no preceding project referent.',
        containmentAction: 'Halts resolution and prompts visitor to specify which project they want to explore.',
        sourceFile: 'lib/rag/projectResolver.ts:40-65',
        verifiedTest: 'scripts/test_retrieval_foundation.ts:Test 7'
      },
      {
        id: 'fb-aa-03',
        name: 'Unauthorized Action Dispatch Block',
        triggerCondition: 'Script or agent attempts to open email client without user clicking "Open Email App".',
        containmentAction: 'ToolPlanValidator rejects plan with status BLOCKED; zero automated network dispatches.',
        sourceFile: 'lib/rag/tools/toolPlanValidator.ts:35-58',
        verifiedTest: 'lib/rag/tools/authorization.ts unit checks'
      }
    ]
  },

  // =========================================================================
  // 2. AI APPLICATION RELIABILITY PLATFORM (LEVEL 1 — FULL INTERACTIVE)
  // =========================================================================
  {
    id: 'ai-reliability',
    slug: 'ai-reliability',
    name: 'AI Application Reliability Platform',
    tagline: 'Autonomous browser testing with empirical Fisher Information uncertainty estimation and SHA-256 provenance.',
    category: 'reliability-verification',
    explorationLevel: 'level-1-full',
    technologies: ['Playwright Chromium', 'Python 3.12 / FastAPI', 'Ollama (Qwen 2.5 Coder)', 'Fisher Information Matrix', 'MCP Protocol', 'SHA-256 Ledger'],
    distinctiveEngineeringContribution:
      'Engineered a mathematical uncertainty quantification gate using the empirical Fisher Information Matrix that forces an explicit ABSTAIN verdict on ambiguous failures, paired with a tamper-evident SHA-256 provenance ledger.',
    ownership: 'independent',
    externalRoute: '/projects/ai-reliability',
    decisionReferences: ['ADR-REL-01', 'ADR-REL-02', 'ADR-REL-03'],
    nodes: [
      {
        id: 'rel-playwright',
        label: 'Playwright Headless Chromium Engine',
        layer: 'Browser Execution Kernel',
        classification: 'deterministic',
        responsibility: 'Executes 1,000 synthetic user journeys on live web applications, capturing empirical ground-truth telemetry.',
        sourceLocation: 'apps/reliability_platform/runners/browser_runner.py',
        inputs: ['Target URL (e.g. Next.js on port 3000)', 'Journey definition JSON'],
        outputs: ['DOM snapshot', 'Full-page PNG', 'Network HAR trace', 'Console exception stream'],
        dependencies: ['Playwright async API', 'Chromium binary'],
        validationRule: 'Discards tests if browser crash occurs; retries with fresh worker process',
        verificationEvidence: {
          type: 'test_suite',
          label: 'Dogfooding Suite against VM Copy',
          measurement: 'Detected DOM option count mismatch under genuine browser render',
          location: 'test_dogfooding_question_generator.py'
        }
      },
      {
        id: 'rel-telemetry-collector',
        label: 'Multi-Modal Evidence Collector',
        layer: 'Telemetry & Evidence',
        classification: 'deterministic',
        responsibility: 'Bundles 4 ground-truth failure artifacts into an immutable EvidencePackage with SHA-256 content hashes.',
        sourceLocation: 'backend/app/evidence/collector.py',
        inputs: ['Raw browser artifacts from Playwright'],
        outputs: ['EvidencePackage (DOM, PNG, HAR, logs, SHA-256 hash)'],
        dependencies: ['Python hashlib', 'Pydantic v2'],
        validationRule: 'Computes SHA-256 checksums across all captured files on disk',
        verificationEvidence: {
          type: 'source_code',
          label: 'Evidence Package Hashing',
          measurement: 'Immutable package generation bound to target commit SHA',
          location: 'backend/app/evidence/collector.py:45-80'
        }
      },
      {
        id: 'rel-ollama-reasoner',
        label: 'Local Ollama Qwen 2.5 Diagnostic Reasoner',
        layer: 'AI Reasoning',
        classification: 'probabilistic',
        responsibility: 'Analyzes combined DOM diffs, visual screenshots, and console traces to hypothesize failure root causes.',
        sourceLocation: 'backend/app/diagnosis/analyzer.py',
        inputs: ['EvidencePackage combined text and screenshot'],
        outputs: ['AIDiagnosisPayload (hypothesized root cause, stack frames, candidate diff)'],
        dependencies: ['Local Ollama server (Qwen 2.5 Coder 7B/14B)'],
        validationRule: 'Prohibited from applying code patches directly; output is purely diagnostic',
        verificationEvidence: {
          type: 'test_suite',
          label: 'Diagnostic Reasoner Suite',
          measurement: '158 backend test suites passing across diagnosis modules',
          location: 'backend/tests/'
        }
      },
      {
        id: 'rel-grounding-validator',
        label: 'Observation Grounding Validator',
        layer: 'Verification & Safety',
        classification: 'deterministic',
        responsibility: 'Verifies that every line number, symbol, and stack frame cited in the model\'s diagnosis exists verbatim in raw logs.',
        sourceLocation: 'backend/app/diagnosis/grounding_validator.py:31-52',
        inputs: ['AIDiagnosisPayload', 'EvidencePackage raw logs'],
        outputs: ['GroundingValidationResult (is_grounded, unsupported_claims, grounding_ratio)'],
        dependencies: ['Python regex', 'Levenshtein substring matcher'],
        validationRule: 'Rejects diagnosis if grounding_ratio < 0.90 or cited stack traces do not exist in Playwright logs',
        verificationEvidence: {
          type: 'source_code',
          label: 'Grounding Assertion Invariant',
          measurement: 'Rejects hallucinated stack frames and non-existent file paths',
          location: 'backend/app/diagnosis/grounding_validator.py:38-50'
        }
      },
      {
        id: 'rel-fisher-gate',
        label: 'Fisher Information Uncertainty Gate',
        layer: 'Verification & Safety',
        classification: 'deterministic',
        responsibility: 'Calculates empirical Fisher Information Matrix over failure hypotheses; forces Decision: ABSTAIN when variance exceeds threshold.',
        sourceLocation: 'apps/reliability_platform/analysis/uncertainty.py',
        inputs: ['Candidate hypothesis log-likelihood vectors'],
        outputs: ['Decision: PROCEED or Decision: ABSTAIN with uncertainty score'],
        dependencies: ['NumPy matrix inversion', 'Covariance estimator'],
        validationRule: 'If parameter variance > epsilon_abstain, completely halts autonomous patch generation and alerts humans',
        verificationEvidence: {
          type: 'test_suite',
          label: 'Uncertainty Quantification Suite',
          measurement: '100% abstention on artificially poisoned noise traces across 158 backend tests',
          location: 'tests/test_uncertainty_quantification.py'
        }
      },
      {
        id: 'rel-governance-gate',
        label: 'Deterministic ChangeAuthorization Gate',
        layer: 'Governance & Provenance',
        classification: 'human_gate',
        responsibility: 'Blocks autonomous file mutation without verified ChangeAuthorization ticket bound to commit SHA and evidence hash.',
        sourceLocation: 'backend/app/governance/authorization_service.py:160-240',
        inputs: ['ChangeAuthorization token', 'target_commit_sha', 'evidence_package_id'],
        outputs: ['CanApplyResult (AUTHORIZED or BLOCKED with structured explanations)'],
        dependencies: ['Authorization repository', 'Cryptographic signature validator'],
        validationRule: 'Requires explicit human sign-off; returns BLOCKED with reasons if token is missing, expired, or mismatching',
        verificationEvidence: {
          type: 'test_suite',
          label: 'Governance Test Suite',
          measurement: '47 deterministic governance tests passing',
          location: 'backend/tests/test_governance.py'
        }
      },
      {
        id: 'rel-provenance-ledger',
        label: 'Append-Only SHA-256 Provenance Ledger',
        layer: 'Governance & Provenance',
        classification: 'deterministic',
        responsibility: 'Chains all execution events, evidence artifacts, approval tokens, and patch diffs back to a genesis block.',
        sourceLocation: 'apps/reliability_platform/governance/provenance.py',
        inputs: ['Event payload JSON', 'Previous block SHA-256 hash'],
        outputs: ['New immutable block with cryptographic hash link'],
        dependencies: ['Python hashlib SHA-256', 'Canonical JSON serializer'],
        validationRule: 'Any silent modification or reordering of history breaks chain verification algorithm',
        verificationEvidence: {
          type: 'test_suite',
          label: 'Provenance Verification Suite',
          measurement: 'Traverses complete block chain asserting cryptographic integrity',
          location: 'tests/test_provenance_ledger.py'
        }
      }
    ],
    edges: [
      { from: 'rel-playwright', to: 'rel-telemetry-collector', label: 'DOM, PNG, HAR, logs', type: 'sync' },
      { from: 'rel-telemetry-collector', to: 'rel-ollama-reasoner', label: 'EvidencePackage', type: 'sync' },
      { from: 'rel-ollama-reasoner', to: 'rel-grounding-validator', label: 'Hypothesized diagnosis', type: 'sync' },
      { from: 'rel-grounding-validator', to: 'rel-fisher-gate', label: 'Grounded claims', type: 'sync' },
      { from: 'rel-fisher-gate', to: 'rel-governance-gate', label: 'Low-variance candidate patch', type: 'sync' },
      { from: 'rel-governance-gate', to: 'rel-provenance-ledger', label: 'Authorized patch & sign-off token', type: 'sync' }
    ],
    executionFlow: [
      {
        stepNumber: 1,
        title: 'Browser Journey Execution & Failure Interception',
        description: 'Playwright drives Chromium through user journey; detects DOM assertion failure (e.g. duplicate question option).',
        activeNodeId: 'rel-playwright',
        dataPayloadSummary: 'Failure detected: Option duplicate in DOM node #opt-2 on port 3000',
        nature: 'deterministic'
      },
      {
        stepNumber: 2,
        title: 'Multi-Modal Evidence Capture & Hashing',
        description: 'Collector bundles DOM tree, screenshot PNG, network trace, and console errors into an EvidencePackage stamped with SHA-256.',
        activeNodeId: 'rel-telemetry-collector',
        dataPayloadSummary: 'Captured 4 artifacts (142KB DOM, 310KB PNG, 18KB HAR, 4 console exceptions)',
        nature: 'deterministic'
      },
      {
        stepNumber: 3,
        title: 'Diagnostic Root-Cause Reasoning',
        description: 'Local Ollama Qwen 2.5 analyzes multi-modal evidence and synthesizes candidate root cause with code diff proposal.',
        activeNodeId: 'rel-ollama-reasoner',
        dataPayloadSummary: 'Hypothesis: Distractor array generation in lib/eval-layer.ts omitted unique set filter',
        nature: 'probabilistic'
      },
      {
        stepNumber: 4,
        title: 'Grounding Verification & Cross-Checking',
        description: 'Grounding validator cross-checks cited stack frames against actual Playwright execution transcripts; verifies citations exist.',
        activeNodeId: 'rel-grounding-validator',
        dataPayloadSummary: 'Grounding ratio: 1.0 (All 4 cited stack lines verified verbatim in console transcript)',
        nature: 'deterministic'
      },
      {
        stepNumber: 5,
        title: 'Fisher Uncertainty Calculation & Abstention Gate',
        description: 'Calculates empirical Fisher Information Matrix across hypotheses. Variance is below epsilon_abstain, allowing patch to proceed.',
        activeNodeId: 'rel-fisher-gate',
        dataPayloadSummary: 'Estimated variance: 0.042 <= threshold 0.150 -> Decision: PROCEED',
        nature: 'deterministic'
      },
      {
        stepNumber: 6,
        title: 'Governance Gate & Ledger Cryptographic Chaining',
        description: 'ChangeAuthorization evaluates token; on approval, event is serialized and hashed into the append-only SHA-256 provenance ledger.',
        activeNodeId: 'rel-governance-gate',
        dataPayloadSummary: 'Gate decision: AUTHORIZED | Block #14 chained to Genesis (Hash: a7f8...3b21)',
        nature: 'gate'
      }
    ],
    failureBoundaries: [
      {
        id: 'fb-rel-01',
        name: 'Noisy Trace / High Variance (Fisher Abstention)',
        triggerCondition: 'Diagnostic trace is corrupted, ambiguous, or contains contradictory stack frames.',
        containmentAction: 'Fisher gate outputs Decision: ABSTAIN, strictly aborting automated remediation and alerting engineers.',
        sourceFile: 'apps/reliability_platform/analysis/uncertainty.py:85-115',
        verifiedTest: 'tests/test_uncertainty_quantification.py (100% abstention on noise injection)'
      },
      {
        id: 'fb-rel-02',
        name: 'Hallucinated Stack Frame / Symbol Rejection',
        triggerCondition: 'LLM cites a source file or line number that does not appear in recorded Playwright logs.',
        containmentAction: 'GroundingValidator flags ungrounded claim, marks diagnosis as INVALID, and prevents review.',
        sourceFile: 'backend/app/diagnosis/grounding_validator.py:40-52',
        verifiedTest: 'backend/tests/test_diagnosis.py'
      },
      {
        id: 'fb-rel-03',
        name: 'Unauthorized Production Code Mutation',
        triggerCondition: 'Remediation pipeline attempts to apply a patch without a valid ChangeAuthorization token.',
        containmentAction: 'AuthorizationService halts with status BLOCKED and records violation in security audit log.',
        sourceFile: 'backend/app/governance/authorization_service.py:175-195',
        verifiedTest: 'backend/tests/test_governance.py (47 tests passed)'
      }
    ]
  },

  // =========================================================================
  // 3. SOLACE AI (LEVEL 1 — FULL INTERACTIVE)
  // =========================================================================
  {
    id: 'solace-ai',
    slug: 'solace-ai',
    name: 'Solace AI',
    tagline: 'Safety-first mobile AI wellness companion with LangGraph SSE streaming, consent memory, and voice privacy.',
    category: 'agentic-orchestration',
    explorationLevel: 'level-1-full',
    technologies: ['React Native / Expo 58', 'TypeScript', 'Python 3.12 / FastAPI', 'LangGraph StateGraph', 'Supabase Auth & RLS', 'SSE Streaming'],
    distinctiveEngineeringContribution:
      'Engineered a synchronous deterministic pre-LLM crisis safety filter responding in <2ms with zero model inference, paired with a single-POST transport guard classifying 502/503/504 as ambiguous delivery without duplicate turns.',
    ownership: 'hackathon',
    externalRoute: '/projects/solace-ai',
    decisionReferences: ['ADR-SOL-01', 'ADR-SOL-02', 'ADR-SOL-03'],
    nodes: [
      {
        id: 'sol-mobile',
        label: 'Expo 58 Mobile Client',
        layer: 'Client Interface',
        classification: 'deterministic',
        responsibility: 'Handles responsive user interactions, Zustand local state, Reanimated emotional landscape, and offline storage.',
        sourceLocation: 'mobile/app/, mobile/stores/useCheckInStore.ts',
        inputs: ['User touch events', 'Text message', 'Voice audio buffer'],
        outputs: ['Structured API requests', 'Sanitized SecureStore keys'],
        dependencies: ['Expo SDK 58', 'React Native 0.88', 'Zustand'],
        validationRule: 'Sanitizes keys to alphanumeric characters; chunks reflection notes into 1500-byte segments for Android Keystore',
        verificationEvidence: {
          type: 'test_suite',
          label: 'Mobile Adapter Suite',
          measurement: '50/50 mobile checks passing across 7 test suites with 0 TypeScript errors',
          location: 'mobile/tests/storage_adapter.test.js'
        }
      },
      {
        id: 'sol-transport',
        label: 'Resilient Transport Layer',
        layer: 'Transport & Networking',
        classification: 'deterministic',
        responsibility: 'Executes single-POST chat streaming; classifies socket drops and 502/503/504 as ambiguous delivery without blind retries.',
        sourceLocation: 'mobile/services/api.ts (streamChat)',
        inputs: ['Outbound chat payload', 'SSE event stream'],
        outputs: ['Dispatched tokens or flagged ambiguous failure state'],
        dependencies: ['Fetch API', 'AbortController'],
        validationRule: 'Idempotent reads use 55s bounded exponential backoff; chat POSTs use strict single-POST execution',
        verificationEvidence: {
          type: 'test_suite',
          label: 'Cold Start & Transport Suite',
          measurement: 'api_cold_start.test.js verifies zero duplicate POST dispatch on 504 Gateway Timeout',
          location: 'mobile/tests/api_cold_start.test.js'
        }
      },
      {
        id: 'sol-fastapi-gateway',
        label: 'FastAPI Gateway & Supabase Auth',
        layer: 'API Gateway & Security',
        classification: 'deterministic',
        responsibility: 'Validates JWT cryptographic claims, derives authenticated user identity, and connects to Supabase PostgreSQL.',
        sourceLocation: 'backend/app/main.py, backend/app/api/chat.py',
        inputs: ['Inbound HTTP / SSE request', 'Authorization Bearer JWT'],
        outputs: ['Verified user_id', 'Session context'],
        dependencies: ['FastAPI', 'Supabase JWT decoder', 'Pydantic v2'],
        validationRule: 'Rejects unauthenticated requests with 401; isolates data strictly via Supabase RLS policies (auth.uid() = user_id)',
        verificationEvidence: {
          type: 'test_suite',
          label: 'Backend Security Suite',
          measurement: 'Live RLS two-user cross-isolation tests pass across 6 SQL migrations',
          location: 'backend/tests/test_auth_rls.py'
        }
      },
      {
        id: 'sol-crisis-gate',
        label: 'Synchronous Deterministic Crisis Screen',
        layer: 'Safety & Guardrails',
        classification: 'deterministic',
        responsibility: 'Screens messages against multilingual high-risk patterns in <2ms; short-circuits instantly with emergency helplines.',
        sourceLocation: 'backend/app/services/safety.py:is_crisis_input',
        inputs: ['User raw message text'],
        outputs: ['CrisisDecision (is_crisis, helpline_payload)'],
        dependencies: ['Precompiled multilingual regex (English, Roman Urdu, Urdu script)'],
        validationRule: 'Zero LLM call on crisis match; filters out false-positive figurative idioms ("dying of laughter")',
        verificationEvidence: {
          type: 'test_suite',
          label: 'Crisis Screening Benchmark',
          measurement: '100% detection rate on 24 critical triggers in <2ms with zero model latency',
          location: 'backend/tests/test_safety.py'
        }
      },
      {
        id: 'sol-langgraph',
        label: 'Feature-Flagged LangGraph StateGraph',
        layer: 'AI Orchestration',
        classification: 'probabilistic',
        responsibility: 'Coordinates emotional tone reflection, conversational context, and real-time SSE token emission via astream_events.',
        sourceLocation: 'backend/app/services/agent_graph.py',
        inputs: ['Validated user prompt', 'Chat history', 'Consent-approved emotional profile'],
        outputs: ['Real-time token stream via Server-Sent Events'],
        dependencies: ['LangGraph StateGraph', 'Google Gemini API', 'ENABLE_LANGGRAPH_ROUTING flag'],
        validationRule: 'Pre-token exception immediately triggers instant native Gemini streaming fallback',
        verificationEvidence: {
          type: 'benchmark',
          label: 'Native vs Graph Benchmark',
          measurement: 'Native streaming fallback achieves 330.6ms TTFT if LangGraph overhead spikes',
          location: 'backend/benchmarks/compare_native_vs_graph.py'
        }
      },
      {
        id: 'sol-memory-consent',
        label: 'Consent-Gated Memory Approval Gate',
        layer: 'Privacy & Memory',
        classification: 'human_gate',
        responsibility: 'Detects emotional reflection candidates; emits memory_suggestion SSE banner requiring explicit user tap before save.',
        sourceLocation: 'backend/app/services/memory.py, mobile/components/MemoryBanner.tsx',
        inputs: ['Candidate emotional trait', 'User consent action'],
        outputs: ['Persisted user reflection or discarded suggestion'],
        dependencies: ['Supabase user_reflections table'],
        validationRule: 'Strict domain isolation (ADR-004): Voice journals and private poetry are never ingested into chat context',
        verificationEvidence: {
          type: 'test_suite',
          label: 'Memory Domain Isolation Suite',
          measurement: 'Verifies voice journal text is absent from conversational memory queries',
          location: 'backend/tests/test_memory_isolation.py'
        }
      },
      {
        id: 'sol-voice-privacy',
        label: 'Ephemeral Audio Zero-Retention Engine',
        layer: 'Privacy & Voice',
        classification: 'deterministic',
        responsibility: 'Transcribes voice reflections in RAM and immediately executes del audio_bytes in a guaranteed finally: block.',
        sourceLocation: 'backend/app/api/voice.py, mobile/services/voice.ts',
        inputs: ['Uploaded audio stream (max 15MB)'],
        outputs: ['Text transcript for user review; zero audio file persisted'],
        dependencies: ['Faster-Whisper / OpenAI Whisper in-memory buffer'],
        validationRule: 'Audio bytes never written to disk, S3, or database; garbage collected post-transcription',
        verificationEvidence: {
          type: 'source_code',
          label: 'Guaranteed Memory Purge Invariant',
          measurement: 'del audio_bytes executed inside guaranteed finally block',
          location: 'backend/app/api/voice.py:75-92'
        }
      }
    ],
    edges: [
      { from: 'sol-mobile', to: 'sol-transport', label: 'Single-POST request', type: 'sync' },
      { from: 'sol-transport', to: 'sol-fastapi-gateway', label: 'Authenticated HTTPS request', type: 'sync' },
      { from: 'sol-fastapi-gateway', to: 'sol-crisis-gate', label: 'Raw message string', type: 'sync' },
      { from: 'sol-crisis-gate', to: 'sol-langgraph', label: 'Safe message (Pass)', type: 'sync' },
      { from: 'sol-langgraph', to: 'sol-memory-consent', label: 'memory_suggestion event', type: 'event_stream' },
      { from: 'sol-mobile', to: 'sol-voice-privacy', label: 'Voice audio stream', type: 'async' }
    ],
    executionFlow: [
      {
        stepNumber: 1,
        title: 'User Input & Mobile Transport Guard',
        description: 'User enters reflective message in mobile app; transport layer enforces single-POST policy without blind retries.',
        activeNodeId: 'sol-mobile',
        dataPayloadSummary: 'Message: "I feel completely overwhelmed and anxious about everything"',
        nature: 'deterministic'
      },
      {
        stepNumber: 2,
        title: 'FastAPI Gateway & JWT Identity Verification',
        description: 'Gateway verifies Supabase JWT cryptographic signature, extracts user_id, and checks rate limits.',
        activeNodeId: 'sol-fastapi-gateway',
        dataPayloadSummary: 'User ID: "usr_94a2b1" verified via signed JWT claims; RLS context initialized',
        nature: 'deterministic'
      },
      {
        stepNumber: 3,
        title: 'SYNCHRONOUS CRISIS SCREENING (<2ms)',
        description: 'Synchronous filter evaluates message against multilingual self-harm patterns and false-positive idioms in <2ms.',
        activeNodeId: 'sol-crisis-gate',
        dataPayloadSummary: 'Safety evaluation: SAFE (No acute self-harm triggers matched; latency 1.4ms)',
        nature: 'deterministic'
      },
      {
        stepNumber: 4,
        title: 'LangGraph Token Streaming via SSE',
        description: 'StateGraph loads prior approved context, formulates empathetic reflection, and streams tokens over SSE connection.',
        activeNodeId: 'sol-langgraph',
        dataPayloadSummary: 'Streaming 84 tokens via astream_events; first token latency 340ms',
        nature: 'probabilistic'
      },
      {
        stepNumber: 5,
        title: 'Consent-Gated Memory Suggestion Banner',
        description: 'Pipeline detects reflection candidate and pushes memory_suggestion banner to client. Persisted only if user taps "Save".',
        activeNodeId: 'sol-memory-consent',
        dataPayloadSummary: 'Banner emitted: "Remember that you tend to feel overwhelmed when juggling deadlines?" (Pending user approval)',
        nature: 'gate'
      }
    ],
    failureBoundaries: [
      {
        id: 'fb-sol-01',
        name: 'Acute Self-Harm / Crisis Disclosure Interception',
        triggerCondition: 'Message matches high-risk crisis patterns (suicide, self-harm keywords or transliterated phrases).',
        containmentAction: 'Short-circuits instantly in <2ms returning Tele-MANAS 14416 / 112 / 988 helplines; zero LLM inference.',
        sourceFile: 'backend/app/services/safety.py:45-90',
        verifiedTest: 'backend/tests/test_safety.py (100% detection rate on 24 critical triggers)'
      },
      {
        id: 'fb-sol-02',
        name: 'Gateway Timeout (502/503/504) Ambiguity Containment',
        triggerCondition: 'Edge proxy drops socket or returns 504 during chat message persistence.',
        containmentAction: 'Classified as ambiguous delivery without blind retry; prevents duplicate message insertion in chat history.',
        sourceFile: 'mobile/services/api.ts:110-145',
        verifiedTest: 'mobile/tests/api_cold_start.test.js'
      },
      {
        id: 'fb-sol-03',
        name: 'Biometric Audio File Persistence Prevention',
        triggerCondition: 'Whisper audio transcription finishes or raises an unexpected exception.',
        containmentAction: 'Guaranteed finally block executes del audio_bytes, ensuring raw voice audio is never stored on disk or S3.',
        sourceFile: 'backend/app/api/voice.py:75-92',
        verifiedTest: 'Code review verification (RAM-only pipeline)'
      }
    ]
  },

  // =========================================================================
  // 4. ENGINEERING DESIGN AUTOMATION (LEVEL 1 — FULL INTERACTIVE)
  // =========================================================================
  {
    id: 'design-automation',
    slug: 'design-automation',
    name: 'Engineering Design Automation',
    tagline: 'Hybrid mechanical design system pairing AI parameter parsing with pure closed-form physics solvers.',
    category: 'deterministic-computation',
    explorationLevel: 'level-1-full',
    technologies: ['Python 3.12', 'Pydantic v2', 'OpenCascade / PythonOCC', 'Deterministic Solvers', 'ISO 10303 STEP', 'Pytest (424 Tests)'],
    distinctiveEngineeringContribution:
      'Enforced an impenetrable architectural boundary completely excluding LLMs from engineering calculations; all physics, torsional shear, and nominal sizing are executed by deterministic closed-form Python solvers with 0.0000% volume error.',
    ownership: 'independent',
    externalRoute: '/projects/design-automation',
    decisionReferences: ['ADR-EDA-01', 'ADR-EDA-02', 'ADR-EDA-03'],
    nodes: [
      {
        id: 'eda-input',
        label: 'Natural Language Brief Interface',
        layer: 'Input Ingestion',
        classification: 'deterministic',
        responsibility: 'Ingests operational engineering requirements (power, RPM, material, safety factor, geometry).',
        sourceLocation: 'src/interface/streamlit_app.py',
        inputs: ['User text prompt (e.g. "7.5 kW motor at 1200 RPM, FoS 2.2, AISI 1045 steel")'],
        outputs: ['Sanitized specification string'],
        dependencies: ['Streamlit / Web UI'],
        validationRule: 'Asserts input is non-empty and contains recognizable engineering terms',
        verificationEvidence: {
          type: 'test_suite',
          label: 'Interface Input Suite',
          measurement: 'Validates input bounds and character encoding',
          location: 'tests/test_interface.py'
        }
      },
      {
        id: 'eda-extractor',
        label: 'LLM Specification Extractor',
        layer: 'AI Parameter Parsing',
        classification: 'probabilistic',
        responsibility: 'Extracts unstructured requirements into typed Pydantic schema with exact character span provenance.',
        sourceLocation: 'src/extractor/spec_extractor.py',
        inputs: ['Raw specification string'],
        outputs: ['MachineSpecPayload with character offsets'],
        dependencies: ['Frontier LLM (Claude/GPT-4)', 'Pydantic v2 schemas'],
        validationRule: 'Prohibited from performing arithmetic or unit conversion; strictly extracts textual tokens',
        verificationEvidence: {
          type: 'test_suite',
          label: 'Extractor Test Suite',
          measurement: 'Character span provenance validated across 28 test suites',
          location: 'tests/test_spec_extractor.py'
        }
      },
      {
        id: 'eda-catalog',
        label: 'Anti-Hallucination Material Catalog',
        layer: 'Materials Knowledge Base',
        classification: 'deterministic',
        responsibility: 'Halts with status BLOCKED on ambiguous metal specifications ("steel"), enforcing verified ASTM/EN metallurgical grades.',
        sourceLocation: 'src/materials/catalog.py',
        inputs: ['Extracted material string'],
        outputs: ['MaterialProperties (yield strength Syt, shear modulus G, density)'],
        dependencies: ['ASTM / ISO material property database'],
        validationRule: 'Generic terms like "steel" immediately halt with status BLOCKED; explicit user overrides stamped with audit provenance',
        verificationEvidence: {
          type: 'test_suite',
          label: 'Material Catalog Tests',
          measurement: '424 automated pytests passing; blocks generic steel without grade specification',
          location: 'tests/test_materials.py'
        }
      },
      {
        id: 'eda-solvers',
        label: 'Closed-Form Physics & Torsion Solver',
        layer: 'Deterministic Solvers',
        classification: 'deterministic',
        responsibility: 'Computes transmitted torque, allowable shear stress, and minimum shaft diameter using Saint-Venant mechanics with zero LLM math.',
        sourceLocation: 'src/design_engine/shaft.py:151-178 (calculate_required_diameter)',
        inputs: ['Transmitted torque T', 'Material yield strength Syt', 'Safety factor FoS'],
        outputs: ['Theoretical minimum diameter d_min', 'Computed factor of safety', 'Step-by-step calculus trace'],
        dependencies: ['Python math / NumPy', 'ASME standards'],
        validationRule: 'Enforces strictly positive torque and allowable shear stress; zero tolerance for floating point hallucination',
        verificationEvidence: {
          type: 'test_suite',
          label: 'Mechanical Torsion Test Suite',
          measurement: 'Calculates exact diameter (e.g. 15.38mm theoretical -> 16mm nominal) with 0.0000% error',
          location: 'tests/test_shaft_torsion.py'
        }
      },
      {
        id: 'eda-cad-kernel',
        label: 'OpenCascade 3D BRep Solid Kernel',
        layer: 'CAD Generation & Export',
        classification: 'deterministic',
        responsibility: 'Generates exact Boundary Representation (BRep) solid 3D geometry and exports ISO 10303 STEP files.',
        sourceLocation: 'src/cad/brep.py:38-65 (BRepSolidCylinder)',
        inputs: ['Nominal diameter mm', 'Shaft length mm', 'Keyway dimensions'],
        outputs: ['Watertight ISO 10303 STEP solid model', 'ASME Y14.5 2D SVG blueprint'],
        dependencies: ['OpenCascade / CadQuery / PythonOCC'],
        validationRule: 'Verifies relative volume error < 10⁻⁶ between BRep solid and theoretical calculus',
        verificationEvidence: {
          type: 'test_suite',
          label: 'Automated CAD Verification Suite',
          measurement: '0.0000% relative volume discrepancy (<10⁻⁶) verified across 424 automated pytests in Docker',
          location: 'tests/test_cad_brep.py'
        }
      }
    ],
    edges: [
      { from: 'eda-input', to: 'eda-extractor', label: 'Raw text brief', type: 'sync' },
      { from: 'eda-extractor', to: 'eda-catalog', label: 'Material string & parameters', type: 'sync' },
      { from: 'eda-catalog', to: 'eda-solvers', label: 'Verified Syt & G properties', type: 'sync' },
      { from: 'eda-solvers', to: 'eda-cad-kernel', label: 'Quantized nominal diameter', type: 'sync' }
    ],
    executionFlow: [
      {
        stepNumber: 1,
        title: 'Engineering Brief Ingestion',
        description: 'User enters functional requirements: "7.5 kW motor at 1200 RPM, length 350mm, FoS 2.2, AISI 1045 steel".',
        activeNodeId: 'eda-input',
        dataPayloadSummary: 'Specification text ingested and checked for operational engineering tokens',
        nature: 'deterministic'
      },
      {
        stepNumber: 2,
        title: 'LLM Schema Parsing with Span Provenance',
        description: 'LLM extracts power=7500W, RPM=1200, FoS=2.2, material="AISI 1045" with exact character offset references.',
        activeNodeId: 'eda-extractor',
        dataPayloadSummary: 'Parsed Pydantic schema with 100% character span provenance; zero math executed by LLM',
        nature: 'probabilistic'
      },
      {
        stepNumber: 3,
        title: 'Anti-Hallucination Material Lookup',
        description: 'Catalog validates exact grade AISI 1045; loads ASTM yield strength Syt=310 MPa and shear modulus G=80 GPa.',
        activeNodeId: 'eda-catalog',
        dataPayloadSummary: 'Material verified: AISI 1045 (Syt=310 MPa, tau_allow=81.38 MPa with FoS=2.2)',
        nature: 'deterministic'
      },
      {
        stepNumber: 4,
        title: 'Closed-Form Physics & Torsion Calculus',
        description: 'Saint-Venant solver calculates torque T=59.68 N*m and theoretical minimum diameter d_min=15.38mm. Snaps to nominal 16mm.',
        activeNodeId: 'eda-solvers',
        dataPayloadSummary: 'Calculated: T=59.68 N*m -> d_min=15.38 mm -> Sized to ISO nominal 16.0 mm (Computed FoS=2.41)',
        nature: 'deterministic'
      },
      {
        stepNumber: 5,
        title: 'OpenCascade 3D BRep Solid Synthesis & Verification',
        description: 'Generates topological BRep solid cylinder; verifies relative volume error is <10⁻⁶; exports ISO 10303 STEP file.',
        activeNodeId: 'eda-cad-kernel',
        dataPayloadSummary: 'Generated watertight ISO 10303 STEP model (Volume discrepancy: 0.0000% < 10⁻⁶)',
        nature: 'deterministic'
      }
    ],
    failureBoundaries: [
      {
        id: 'fb-eda-01',
        name: 'Ambiguous Material Specification Block',
        triggerCondition: 'User inputs generic terms like "steel" or "aluminum" without specifying metallurgical grade.',
        containmentAction: 'Pipeline halts immediately with status BLOCKED and presents standard ASTM/EN grade selector.',
        sourceFile: 'src/materials/catalog.py:65-95',
        verifiedTest: 'tests/test_materials.py (ADR-EDA-02)'
      },
      {
        id: 'fb-eda-02',
        name: 'Negative or Non-Physical Parameter Rejection',
        triggerCondition: 'Input power, speed, or safety factor is <= 0 or FoS < 1.0.',
        containmentAction: 'Raises ValueError with structured message before entering solver calculus.',
        sourceFile: 'src/design_engine/shaft.py:160-168',
        verifiedTest: 'tests/test_shaft_torsion.py'
      },
      {
        id: 'fb-eda-03',
        name: 'BRep Solid Volume Discrepancy Gate',
        triggerCondition: 'Synthesized OpenCascade BRep solid volume deviates from calculus by > 10⁻⁶.',
        containmentAction: 'Aborts STEP export and logs geometric topology error.',
        sourceFile: 'src/cad/brep.py:55-65',
        verifiedTest: 'tests/test_cad_brep.py (424 tests passed)'
      }
    ]
  },

  // =========================================================================
  // 5. OCR EVALUATION & ROBUSTNESS PLATFORM (LEVEL 1 — FULL INTERACTIVE)
  // =========================================================================
  {
    id: 'ocr-evaluator',
    slug: 'ocr-evaluator',
    name: 'OCR Evaluation & Robustness Platform',
    tagline: 'Multi-tier document extraction auditing and image degradation stress testing across 5 perturbation axes.',
    category: 'reliability-verification',
    explorationLevel: 'level-1-full',
    technologies: ['Python 3.12', 'FastAPI', 'Tesseract OCR', 'React 18', 'Levenshtein Distance', 'OpenCV / PIL', 'Pytest (134 Tests)'],
    distinctiveEngineeringContribution:
      'Engineered a multi-tier evaluation gate decoupling global Character Error Rate (CER) from legal survey number correctness, subjecting extraction models to controlled 5-axis image degradation (Gaussian blur, skew, noise, contrast, JPEG).',
    ownership: 'independent',
    externalRoute: '/projects/ocr-evaluator',
    decisionReferences: ['ADR-OCR-01', 'ADR-OCR-02'],
    nodes: [
      {
        id: 'ocr-ingest',
        label: 'Document Ingestion & Ground-Truth Alignment',
        layer: 'Ingestion Layer',
        classification: 'deterministic',
        responsibility: 'Loads document images (legal deeds, land records, invoices) aligned with ground-truth schema annotations.',
        sourceLocation: 'src/ingestion/loader.py',
        inputs: ['Image file (PNG/TIFF)', 'Ground-truth JSON annotation'],
        outputs: ['Normalized image array', 'Structured field dictionary'],
        dependencies: ['Pillow', 'Pydantic v2'],
        validationRule: 'Asserts image resolution >= 150 DPI and ground-truth contains mandatory critical fields',
        verificationEvidence: {
          type: 'test_suite',
          label: 'Ingestion Test Suite',
          measurement: 'Validates TIFF/PNG normalization and ground-truth alignment',
          location: 'tests/test_ingestion.py'
        }
      },
      {
        id: 'ocr-degradation',
        label: '5-Axis Controlled Degradation Engine',
        layer: 'Stress Testing & Robustness',
        classification: 'deterministic',
        responsibility: 'Applies controlled perturbations: Gaussian blur (sigma 0-5), additive noise, rotation skew (-15 to +15 deg), contrast loss, and JPEG artifacts.',
        sourceLocation: 'src/robustness/degradation.py',
        inputs: ['Clean image array', 'Perturbation severity parameters'],
        outputs: ['Perturbed image array with calibration metadata'],
        dependencies: ['OpenCV (cv2)', 'NumPy'],
        validationRule: 'Preserves image dimensions and bit depth during transformations',
        verificationEvidence: {
          type: 'test_suite',
          label: 'Degradation Suite',
          measurement: 'Generates reproducible degradation curves across all 5 axes',
          location: 'tests/test_degradation.py'
        }
      },
      {
        id: 'ocr-engine',
        label: 'Tesseract OCR Extraction Pipeline',
        layer: 'Extraction Engine',
        classification: 'probabilistic',
        responsibility: 'Extracts text, character-level bounding boxes, and confidence distributions from perturbed documents.',
        sourceLocation: 'src/extraction/tesseract_runner.py',
        inputs: ['Perturbed document image'],
        outputs: ['Extracted text', 'Word-level bounding boxes', 'Confidence score vector'],
        dependencies: ['PyTesseract / Tesseract binary'],
        validationRule: 'Flags low-confidence extractions (<60%) for mandatory review',
        verificationEvidence: {
          type: 'test_suite',
          label: 'Extraction Pipeline Tests',
          measurement: 'Extracts text and confidence scores across 134 automated pytests',
          location: 'tests/test_extraction.py'
        }
      },
      {
        id: 'ocr-metrics',
        label: 'Multi-Tier Levenshtein CER/WER Evaluator',
        layer: 'Evaluation & Metrics',
        classification: 'deterministic',
        responsibility: 'Calculates Character Error Rate (CER via Levenshtein edit distance), Word Error Rate (WER), and field-level exact match.',
        sourceLocation: 'src/evaluation/metrics.py',
        inputs: ['Extracted text', 'Ground-truth text'],
        outputs: ['CER score (0-1.0)', 'WER score', 'Levenshtein edit matrix'],
        dependencies: ['NumPy', 'Levenshtein algorithm'],
        validationRule: 'Normalized edit distance bounds CER between 0.0 (perfect) and 1.0 (complete mismatch)',
        verificationEvidence: {
          type: 'test_suite',
          label: 'Metrics Unit Tests',
          measurement: 'CER/WER calculation verified against textbook strings',
          location: 'tests/test_metrics.py'
        }
      },
      {
        id: 'ocr-risk-gate',
        label: 'Critical-Field Priority Risk Gate',
        layer: 'Operational Governance',
        classification: 'deterministic',
        responsibility: 'Overrides global accuracy: a single character error in a critical legal survey number or date forces status FAIL.',
        sourceLocation: 'src/evaluation/risk_gate.py',
        inputs: ['Field-level extractions', 'Critical field schema definitions'],
        outputs: ['Operational status: PASS, REVIEW, or FAIL with highlighted error spans'],
        dependencies: ['Field severity configuration'],
        validationRule: 'Overall 99% CER cannot mask critical field mismatch; critical error forces instant FAIL',
        verificationEvidence: {
          type: 'test_suite',
          label: 'Backend Risk Gate Suite',
          measurement: '134 automated backend pytests passed across 22 test files with 100% pass rate',
          location: 'tests/test_risk_gate.py'
        }
      }
    ],
    edges: [
      { from: 'ocr-ingest', to: 'ocr-degradation', label: 'Clean document image', type: 'sync' },
      { from: 'ocr-degradation', to: 'ocr-engine', label: 'Perturbed image array', type: 'sync' },
      { from: 'ocr-engine', to: 'ocr-metrics', label: 'Extracted text & confidence', type: 'sync' },
      { from: 'ocr-metrics', to: 'ocr-risk-gate', label: 'CER/WER & field diffs', type: 'sync' }
    ],
    executionFlow: [
      {
        stepNumber: 1,
        title: 'Title Deed Document Ingestion',
        description: 'Loads legal land deed with annotated ground truth (Survey No: "128/3", Owner: "Khurshid", Area: "2.4 Acres").',
        activeNodeId: 'ocr-ingest',
        dataPayloadSummary: 'Document: deed_sample_01.png (300 DPI, 2480x3508 pixels, 5 critical fields annotated)',
        nature: 'deterministic'
      },
      {
        stepNumber: 2,
        title: 'Controlled 5-Axis Image Degradation',
        description: 'Degradation engine applies Gaussian blur (sigma=2.5) and rotation skew (3.5 deg) simulating mobile scan artifact.',
        activeNodeId: 'ocr-degradation',
        dataPayloadSummary: 'Perturbations applied: Gaussian Blur (sigma=2.5), Rotation Skew (+3.5 deg), Contrast (-20%)',
        nature: 'deterministic'
      },
      {
        stepNumber: 3,
        title: 'OCR Text & Confidence Extraction',
        description: 'Tesseract extracts text tokens; survey number misread as "128/8" with 72% confidence due to blur.',
        activeNodeId: 'ocr-engine',
        dataPayloadSummary: 'Extracted text: "Survey No 128/8" | Overall document confidence: 91.4%',
        nature: 'probabilistic'
      },
      {
        stepNumber: 4,
        title: 'Multi-Tier CER & Field-Level Audit',
        description: 'Levenshtein calculator computes global CER = 0.018 (98.2% global accuracy); field audit flags Survey No mismatch.',
        activeNodeId: 'ocr-metrics',
        dataPayloadSummary: 'Global CER: 0.018 (Passable) | Field diff: Expected "128/3" vs Extracted "128/8"',
        nature: 'deterministic'
      },
      {
        stepNumber: 5,
        title: 'Critical-Field Priority Risk Gate Verdict',
        description: 'Risk gate overrides global 98.2% accuracy: because Survey No is marked CRITICAL, verdict is forced to FAIL.',
        activeNodeId: 'ocr-risk-gate',
        dataPayloadSummary: 'Verdict: FAIL | Reason: Critical field "survey_number" mismatch (128/3 -> 128/8) forces reject',
        nature: 'deterministic'
      }
    ],
    failureBoundaries: [
      {
        id: 'fb-ocr-01',
        name: 'Critical Legal Field Mismatch Override',
        triggerCondition: 'Survey number, registration ID, or acreage misread, regardless of 99%+ global character accuracy.',
        containmentAction: 'Forces operational status FAIL, aborting automated document routing and demanding manual legal audit.',
        sourceFile: 'src/evaluation/risk_gate.py:50-78',
        verifiedTest: 'tests/test_risk_gate.py (134 pytests passing)'
      },
      {
        id: 'fb-ocr-02',
        name: 'Severe Image Degradation Rejection',
        triggerCondition: 'Image contrast or blur renders document confidence < 40%.',
        containmentAction: 'Flags document as UNREADABLE_RESCAN_REQUIRED without evaluating downstream fields.',
        sourceFile: 'src/extraction/tesseract_runner.py:60-75',
        verifiedTest: 'tests/test_extraction.py'
      }
    ]
  },

  // =========================================================================
  // 6. CURRICULUM TRANSFORMATION ENGINE (LEVEL 1 — FULL INTERACTIVE)
  // =========================================================================
  {
    id: 'curriculum-etl',
    slug: 'curriculum-etl',
    name: 'Curriculum Transformation Engine',
    tagline: 'Concurrent Map-Reduce ETL pipeline compiling dynamic schema contracts and 3-tier integrity gates.',
    category: 'data-transformation',
    explorationLevel: 'level-1-full',
    technologies: ['Python 3.12', 'ThreadPoolExecutor', 'Claude Tool Calling', 'Dynamic Pydantic Contracts', 'CSV Formula Protection', '3-Tier Gate'],
    distinctiveEngineeringContribution:
      'Engineered dynamic runtime schema derivation from sample CSVs paired with a 3-tier integrity verification gate (Reviewer -> Critic -> CSV Audit) preventing column dropping and formula injection.',
    ownership: 'wayground-independent',
    externalRoute: '/projects/curriculum-etl',
    decisionReferences: ['ADR-ETL-01', 'ADR-ETL-02'],
    nodes: [
      {
        id: 'etl-ingest',
        label: 'Heterogeneous Document Chunking Ingestion',
        layer: 'Ingestion Layer',
        classification: 'deterministic',
        responsibility: 'Ingests state curriculum PDFs (100+ pages), DOCX files, and web standards, splitting into semantic chunks.',
        sourceLocation: 'src/ingest/chunker.py',
        inputs: ['Unstructured PDF/DOCX state curriculum documents'],
        outputs: ['Semantic document chunks with heading context'],
        dependencies: ['pypdf', 'python-docx', 'Crawl4AI'],
        validationRule: 'Preserves grade-level headers and table hierarchies across chunk boundaries',
        verificationEvidence: {
          type: 'test_suite',
          label: 'Chunking Invariant Tests',
          measurement: 'Preserves complete grade hierarchy across 100+ page documents',
          location: 'tests/test_chunker.py'
        }
      },
      {
        id: 'etl-contract',
        label: 'Dynamic Schema Contract Engine',
        layer: 'Schema & Contracts',
        classification: 'deterministic',
        responsibility: 'Inspects customer sample CSVs at runtime and dynamically compiles typed Pydantic validation contracts.',
        sourceLocation: 'src/schema/contract_compiler.py',
        inputs: ['Target sample CSV template'],
        outputs: ['Compiled runtime Pydantic schema with column type assertions'],
        dependencies: ['Pydantic v2 create_model', 'Python typing'],
        validationRule: 'Rejects export if extracted fields do not conform to derived target schema',
        verificationEvidence: {
          type: 'test_suite',
          label: 'Schema Derivation Tests',
          measurement: 'Compiles dynamic contracts across 10+ varied district schemas',
          location: 'tests/test_contract_compiler.py'
        }
      },
      {
        id: 'etl-parallel-workers',
        label: 'Concurrent Parallel Extraction Workers',
        layer: 'Extraction & Mapping',
        classification: 'probabilistic',
        responsibility: 'ThreadPoolExecutor dispatches concurrent Claude tool-calling workers to extract standard codes, descriptions, and subskills.',
        sourceLocation: 'src/workers/extractor.py',
        inputs: ['Document chunks', 'Target schema contract'],
        outputs: ['Extracted row records in structured JSON'],
        dependencies: ['Claude 3.5 Sonnet Tool Calling', 'ThreadPoolExecutor (max_workers=8)'],
        validationRule: 'Enforces structured JSON schema; retries up to 2 times on malformed JSON outputs',
        verificationEvidence: {
          type: 'test_suite',
          label: 'Parallel Extraction Suite',
          measurement: 'Validates concurrent worker batching with zero lost chunks',
          location: 'tests/test_extractor.py'
        }
      },
      {
        id: 'etl-review-fix',
        label: 'Merged Evaluate-and-Fix Review Pass',
        layer: 'Verification & Correction',
        classification: 'probabilistic',
        responsibility: 'Merged LLM verification pass checks pedagogical accuracy and fixes missing subskills in a single turn, cutting API calls by 50%.',
        sourceLocation: 'src/review/reviewer.py',
        inputs: ['Extracted candidate records', 'Original chunk context'],
        outputs: ['Reviewed and corrected records'],
        dependencies: ['Claude 3.5 Sonnet'],
        validationRule: 'Single merged review pass prevents expensive two-pass ping-pong latency',
        verificationEvidence: {
          type: 'test_suite',
          label: 'Reviewer Suite',
          measurement: '50% reduction in review API calls with 99.2% schema conformance',
          location: 'tests/test_reviewer.py'
        }
      },
      {
        id: 'etl-csv-gate',
        label: '3-Tier CSV Audit Gate & Security Guard',
        layer: 'Integrity & Security',
        classification: 'deterministic',
        responsibility: 'Enforces row-level constraints (non-blank values, unique standard codes) and strips Excel formula injection (=, +, -, @).',
        sourceLocation: 'csv_audit.py:241-285 (_programmatic_row_issues)',
        inputs: ['Transformed tabular records'],
        outputs: ['Validated, injection-safe CSV file and audit report'],
        dependencies: ['Python csv', 'Security sanitizer'],
        validationRule: 'Rows with duplicate standard codes or forbidden formula injection characters are blocked and reported',
        verificationEvidence: {
          type: 'test_suite',
          label: '3-Tier CSV Integrity Suite',
          measurement: '36 automated tests passing verifying row guards and formula escaping',
          location: 'tests/test_csv_audit.py'
        }
      }
    ],
    edges: [
      { from: 'etl-ingest', to: 'etl-parallel-workers', label: 'Semantic text chunks', type: 'sync' },
      { from: 'etl-contract', to: 'etl-parallel-workers', label: 'Compiled Pydantic schema', type: 'sync' },
      { from: 'etl-parallel-workers', to: 'etl-review-fix', label: 'Extracted JSON rows', type: 'sync' },
      { from: 'etl-review-fix', to: 'etl-csv-gate', label: 'Candidate CSV rows', type: 'sync' }
    ],
    executionFlow: [
      {
        stepNumber: 1,
        title: 'District Curriculum PDF Ingestion',
        description: 'Ingests 140-page Texas TEKS mathematics standard PDF; segments into 35 grade-band semantic chunks.',
        activeNodeId: 'etl-ingest',
        dataPayloadSummary: 'Document: Texas_TEKS_Math_K12.pdf (140 pages, 35 chunks preserved with grade headers)',
        nature: 'deterministic'
      },
      {
        stepNumber: 2,
        title: 'Dynamic Pydantic Schema Compilation',
        description: 'Inspects district sample output CSV; compiles schema contract enforcing 7 columns (Standard, Domain, Subskill, Bloom).',
        activeNodeId: 'etl-contract',
        dataPayloadSummary: 'Dynamic contract compiled: 7 columns, required display_standard_code, non-blank subskill',
        nature: 'deterministic'
      },
      {
        stepNumber: 3,
        title: 'Parallel Concurrent LLM Tool Extraction',
        description: 'ThreadPoolExecutor dispatches 8 parallel Claude workers executing structured tool calling against compiled contract.',
        activeNodeId: 'etl-parallel-workers',
        dataPayloadSummary: 'Dispatched 35 parallel jobs; extracted 412 standardized curriculum rows in 14.2s',
        nature: 'probabilistic'
      },
      {
        stepNumber: 4,
        title: 'Merged Evaluate-and-Fix Review',
        description: 'Single-turn reviewer checks pedagogical categorization against source text, filling 8 dropped subskill descriptors.',
        activeNodeId: 'etl-review-fix',
        dataPayloadSummary: 'Reviewed 412 rows; auto-corrected 8 missing subskills; 50% fewer API calls than 2-pass review',
        nature: 'probabilistic'
      },
      {
        stepNumber: 5,
        title: '3-Tier CSV Audit Gate & Formula Injection Sweep',
        description: 'Audit gate asserts code uniqueness, checks blank constraints, and prepends single quote to any field starting with "=" or "@".',
        activeNodeId: 'etl-csv-gate',
        dataPayloadSummary: 'Audit result: 0 formula injections, 0 duplicate codes, 412 rows certified for database load',
        nature: 'deterministic'
      }
    ],
    failureBoundaries: [
      {
        id: 'fb-etl-01',
        name: 'Duplicate Curriculum Standard Code Collision',
        triggerCondition: 'Model outputs the same standard code (e.g. "MATH.5.3.A") in multiple distinct rows.',
        containmentAction: 'Audit gate flags duplicate_display_standard_code issue with row numbers and halts export.',
        sourceFile: 'csv_audit.py:270-282',
        verifiedTest: 'tests/test_csv_audit.py:test_duplicate_codes'
      },
      {
        id: 'fb-etl-02',
        name: 'CSV Formula Injection Vulnerability (=, +, -, @)',
        triggerCondition: 'Unsanitized curriculum description begins with Excel formula trigger characters.',
        containmentAction: 'Prepends tab / single-quote escape character, defusing CSV command execution in spreadsheet software.',
        sourceFile: 'csv_audit.py:210-235',
        verifiedTest: 'tests/test_csv_audit.py:test_formula_injection'
      }
    ]
  },

  // =========================================================================
  // 7. ATLAS AI (LEVEL 2 — FOCUSED ARCHITECTURE)
  // =========================================================================
  {
    id: 'atlas-ai',
    slug: 'atlas-ai',
    name: 'Atlas AI — Financial Copilot & SEC Filing RAG',
    tagline: 'Telegram-native conversational financial copilot with LangGraph orchestration and SEC EDGAR RAG.',
    category: 'agentic-orchestration',
    explorationLevel: 'level-2-focused',
    technologies: ['LangGraph', 'Python 3.12 / FastAPI', 'Google Gemini Embeddings', 'MongoDB Atlas Vector Search', 'SEC EDGAR API', 'Pytest (178 Tests)'],
    distinctiveEngineeringContribution:
      'Engineered stateful LangGraph financial research state machine combined with primary SEC EDGAR 10-K/10-Q filing retrieval and proactive background alert workers with notification deduplication.',
    ownership: 'hackathon',
    externalRoute: '/projects/atlas-ai',
    decisionReferences: ['ADR-ATL-01', 'ADR-ATL-02'],
    nodes: [
      {
        id: 'atl-tg-webhook',
        label: 'Telegram Webhook & Multi-Modal Handler',
        layer: 'Interface & Ingestion',
        classification: 'deterministic',
        responsibility: 'Receives Telegram messages, transcribes voice notes via Whisper, and passes charts to Gemini Vision.',
        sourceLocation: 'backend/app/telegram/bot.py',
        inputs: ['Telegram Update payload (text, voice, photo)'],
        outputs: ['Parsed financial research request'],
        dependencies: ['python-telegram-bot', 'Whisper API'],
        validationRule: 'Sanitizes ticker symbols and validates Telegram chat ID authorization',
        verificationEvidence: {
          type: 'test_suite',
          label: 'Telegram Bot Suite',
          measurement: 'Validates multi-modal input parsing across 178 pytests',
          location: 'backend/tests/test_telegram.py'
        }
      },
      {
        id: 'atl-langgraph',
        label: 'LangGraph Financial Research State Machine',
        layer: 'Orchestration & State',
        classification: 'probabilistic',
        responsibility: 'Routes intent between real-time market data, SEC EDGAR filing research, and durable user watchlist memory.',
        sourceLocation: 'backend/app/graph/state_machine.py',
        inputs: ['Financial query', 'Chat state'],
        outputs: ['Routed research tasks (Market, Filing, Alert)'],
        dependencies: ['LangGraph StateGraph', 'FastAPI'],
        validationRule: 'Limits cyclic tool iterations to ceiling of 5 to prevent runaway execution',
        verificationEvidence: {
          type: 'test_suite',
          label: 'Graph Routing Suite',
          measurement: '59 core tests validating state transitions and routing',
          location: 'backend/tests/test_graph.py'
        }
      },
      {
        id: 'atl-sec-rag',
        label: 'SEC EDGAR RAG & Vector Search',
        layer: 'Retrieval & Market Data',
        classification: 'deterministic',
        responsibility: 'Ingests primary SEC filings (10-K, 10-Q, 8-K), indexes chunks in MongoDB Atlas Vector Search via Gemini embeddings.',
        sourceLocation: 'backend/app/sec/edgar_retriever.py',
        inputs: ['Company ticker', 'Filing type', 'Search query'],
        outputs: ['Ranked filing excerpts with CIK and accession number provenance'],
        dependencies: ['SEC EDGAR API', 'MongoDB Atlas Vector Search', 'Gemini Embeddings'],
        validationRule: 'Respects SEC rate limit of 10 requests/second with User-Agent header compliance',
        verificationEvidence: {
          type: 'test_suite',
          label: 'SEC Ingestion Suite',
          measurement: '178 automated pytests validating SEC filing parsing and vector search',
          location: 'backend/tests/test_sec_rag.py'
        }
      },
      {
        id: 'atl-alert-worker',
        label: 'Proactive Alert Worker & Deduplicator',
        layer: 'Background Operations',
        classification: 'deterministic',
        responsibility: 'Runs in FastAPI lifespan to poll watchlist volatility and dispatch alerts with timestamp-based deduplication.',
        sourceLocation: 'backend/app/workers/alert_worker.py',
        inputs: ['User watchlists', 'Live Finnhub market quotes'],
        outputs: ['Targeted Telegram notifications on >=3% volatility or new filing'],
        dependencies: ['FastAPI lifespan', 'MongoDB alert_history collection'],
        validationRule: 'Deduplication window suppresses duplicate alerts for the same price spike within 2 hours',
        verificationEvidence: {
          type: 'test_suite',
          label: 'Alert Deduplication Suite',
          measurement: 'Prevents notification flooding during continuous market polling',
          location: 'backend/tests/test_alert_worker.py'
        }
      }
    ],
    edges: [
      { from: 'atl-tg-webhook', to: 'atl-langgraph', label: 'Parsed user command', type: 'sync' },
      { from: 'atl-langgraph', to: 'atl-sec-rag', label: 'Filing search request', type: 'sync' },
      { from: 'atl-sec-rag', to: 'atl-langgraph', label: '10-K excerpt chunks', type: 'sync' },
      { from: 'atl-alert-worker', to: 'atl-tg-webhook', label: 'Deduplicated alert push', type: 'async' }
    ],
    executionFlow: [
      {
        stepNumber: 1,
        title: 'Telegram Query Ingestion',
        description: 'User asks bot: "What are Apple\'s reported risks regarding China in the latest 10-K?"',
        activeNodeId: 'atl-tg-webhook',
        dataPayloadSummary: 'Command parsed: Ticker: "AAPL", Document: "10-K", Item: "1A Risk Factors"',
        nature: 'deterministic'
      },
      {
        stepNumber: 2,
        title: 'LangGraph Intent Routing',
        description: 'State machine loads user watchlist context and routes execution to the specialized SEC research node.',
        activeNodeId: 'atl-langgraph',
        dataPayloadSummary: 'Node transition: start -> route_query -> sec_research_node',
        nature: 'probabilistic'
      },
      {
        stepNumber: 3,
        title: 'Primary SEC EDGAR Vector Retrieval',
        description: 'Retriever queries MongoDB Atlas Vector Search; returns top 3 ranked chunks from AAPL 2024 10-K Item 1A.',
        activeNodeId: 'atl-sec-rag',
        dataPayloadSummary: 'Retrieved 3 chunks (Accession: 0000320193-24-000106) with cosine similarity > 0.82',
        nature: 'deterministic'
      },
      {
        stepNumber: 4,
        title: 'Proactive Watchlist Monitoring',
        description: 'Background worker concurrently monitors AAPL price and SEC RSS feed, armed with alert deduplication.',
        activeNodeId: 'atl-alert-worker',
        dataPayloadSummary: 'Monitoring active: 0 duplicate alerts dispatched in deduplication window',
        nature: 'deterministic'
      }
    ],
    failureBoundaries: [
      {
        id: 'fb-atl-01',
        name: 'SEC Rate Limit Exceeded Containment',
        triggerCondition: 'SEC EDGAR returns HTTP 429 Too Many Requests.',
        containmentAction: 'Exponential backoff with jitter pauses requests; falls back to cached MongoDB filings.',
        sourceFile: 'backend/app/sec/edgar_retriever.py:75-90',
        verifiedTest: 'backend/tests/test_sec_rag.py'
      },
      {
        id: 'fb-atl-02',
        name: 'Alert Notification Flooding Suppression',
        triggerCondition: 'Price fluctuates rapidly around trigger threshold within 10 minutes.',
        containmentAction: 'Deduplicator suppresses repeated notifications using in-memory and database cooldown timestamps.',
        sourceFile: 'backend/app/workers/alert_worker.py:60-85',
        verifiedTest: 'backend/tests/test_alert_worker.py'
      }
    ]
  },

  // =========================================================================
  // 8. LOOM AI (LEVEL 2 — FOCUSED ARCHITECTURE)
  // =========================================================================
  {
    id: 'loom-ai',
    slug: 'loom-ai',
    name: 'Loom AI — B2B Textile Marketplace Platform',
    tagline: 'Clean Architecture B2B marketplace platform with Next.js 16, compound text indexes, and LangGraph HITL approval.',
    category: 'agentic-orchestration',
    explorationLevel: 'level-2-focused',
    technologies: ['Next.js 16', 'React 19', 'Express 5 Clean Architecture', 'MongoDB Compound Indexes', 'LangGraph', 'Playwright E2E'],
    distinctiveEngineeringContribution:
      'Engineered downward Clean Architecture dependency isolation paired with compound MongoDB specification indexes and a Human-in-the-Loop (HITL) approval queue for automated AI procurement proposals.',
    ownership: 'hackathon',
    externalRoute: '/projects/loom-ai',
    decisionReferences: ['ADR-LOM-01', 'ADR-LOM-02'],
    nodes: [
      {
        id: 'lom-portals',
        label: 'Dual Buyer & Supplier Portals',
        layer: 'Presentation Layer',
        classification: 'deterministic',
        responsibility: 'Next.js 16 / React 19 portals for multi-attribute fabric search, cart checkout, and supplier inventory management.',
        sourceLocation: 'frontend/src/pages/buyer/, frontend/src/pages/supplier/',
        inputs: ['User search filters (GSM, composition, certifications)'],
        outputs: ['Rendered catalog grid', 'RFQ submissions'],
        dependencies: ['Next.js 16', 'React 19', 'Redux Toolkit', 'TanStack Query'],
        validationRule: 'Client-side form validation asserts GSM > 0 and composition percentages sum to 100%',
        verificationEvidence: {
          type: 'test_suite',
          label: 'Playwright E2E Suite',
          measurement: 'Browser tests verify buyer registration, fabric filtering, and cart checkout',
          location: 'tests/e2e/buyer_flow.spec.ts'
        }
      },
      {
        id: 'lom-clean-backend',
        label: 'Express 5 Clean Architecture Backend',
        layer: 'Application & Core',
        classification: 'deterministic',
        responsibility: 'Enforces strict downward dependency flow (Routes -> Controllers -> Services -> Repositories -> Models) with role-based JWT auth.',
        sourceLocation: 'backend/src/controllers/, backend/src/services/, backend/src/repositories/',
        inputs: ['Authenticated API requests', 'Validated DTOs'],
        outputs: ['Standardized JSON responses'],
        dependencies: ['Express 5', 'TypeScript', 'class-validator'],
        validationRule: 'Repositories never access HTTP contexts; services remain framework-agnostic',
        verificationEvidence: {
          type: 'source_code',
          label: 'Clean Architecture Boundaries',
          measurement: 'Verified downward dependency hierarchy in TypeScript build',
          location: 'backend/src/'
        }
      },
      {
        id: 'lom-search-engine',
        label: 'Compound Textile Specification Index',
        layer: 'Search & Data',
        classification: 'deterministic',
        responsibility: 'Executes high-performance multi-attribute text search across fabricType, composition, GSM, and certifications.',
        sourceLocation: 'backend/src/models/Fabric.ts, backend/src/repositories/FabricRepository.ts',
        inputs: ['Multi-attribute search query'],
        outputs: ['Filtered fabric inventory matching strict industrial tolerances'],
        dependencies: ['MongoDB compound text indexes', 'Mongoose'],
        validationRule: 'Compound index covers { fabricType: "text", certifications: "text", composition: "text" }',
        verificationEvidence: {
          type: 'test_suite',
          label: 'Search Query Suite',
          measurement: 'Matches exact fabric blends without imprecise keyword leakage',
          location: 'tests/unit/fabric_search.test.ts'
        }
      },
      {
        id: 'lom-hitl-queue',
        label: 'LangGraph HITL Procurement Approval Queue',
        layer: 'AI & Governance',
        classification: 'human_gate',
        responsibility: 'LangGraph procurement agent formulates RFQ match recommendations, but holds purchase proposals in a mandatory human queue.',
        sourceLocation: 'backend/src/agents/procurementAgent.ts',
        inputs: ['Buyer procurement brief', 'Matched supplier catalog items'],
        outputs: ['Held RFQ proposal awaiting supplier/buyer authorization'],
        dependencies: ['LangGraph StateGraph', 'Groq / Llama 3'],
        validationRule: 'Autonomous financial transactions or binding contracts are physically blocked without human signature',
        verificationEvidence: {
          type: 'test_suite',
          label: 'HITL Approval Queue Tests',
          measurement: 'Asserts AI proposed orders remain in PENDING_APPROVAL status until authorized',
          location: 'tests/unit/procurement_agent.test.ts'
        }
      }
    ],
    edges: [
      { from: 'lom-portals', to: 'lom-clean-backend', label: 'Validated DTO request', type: 'sync' },
      { from: 'lom-clean-backend', to: 'lom-search-engine', label: 'Compound index query', type: 'sync' },
      { from: 'lom-clean-backend', to: 'lom-hitl-queue', label: 'Procurement matching request', type: 'sync' }
    ],
    executionFlow: [
      {
        stepNumber: 1,
        title: 'Buyer Search & Specification Filtering',
        description: 'Buyer searches: "Organic Cotton 180 GSM GOTS Certified, minimum order 500m".',
        activeNodeId: 'lom-portals',
        dataPayloadSummary: 'Filter: Composition="Cotton 100%", GSM=180, Cert="GOTS", MOQ<=500',
        nature: 'deterministic'
      },
      {
        stepNumber: 2,
        title: 'Clean Architecture Controller & Service Dispatch',
        description: 'Express 5 route validates DTO and invokes FabricService with strict domain isolation.',
        activeNodeId: 'lom-clean-backend',
        dataPayloadSummary: 'DTO validated; downward call to FabricRepository.findBySpecs()',
        nature: 'deterministic'
      },
      {
        stepNumber: 3,
        title: 'Compound MongoDB Text Index Lookup',
        description: 'MongoDB executes compound query matching exact fabric blend and certification specs in <12ms.',
        activeNodeId: 'lom-search-engine',
        dataPayloadSummary: 'Matched 4 verified textile suppliers with active GOTS certification certificates',
        nature: 'deterministic'
      },
      {
        stepNumber: 4,
        title: 'LangGraph RFQ Match & Human-in-the-Loop Queue',
        description: 'AI agent drafts optimal split-order proposal across 2 suppliers, holding draft in queue awaiting buyer signature.',
        activeNodeId: 'lom-hitl-queue',
        dataPayloadSummary: 'Status: PENDING_HUMAN_APPROVAL (No automated PO issued without buyer sign-off)',
        nature: 'gate'
      }
    ],
    failureBoundaries: [
      {
        id: 'fb-lom-01',
        name: 'Unauthorized Automated Purchase Execution Block',
        triggerCondition: 'AI agent attempts to finalize order without buyer authorization.',
        containmentAction: 'Throws UnauthorizedActionError; order remains in immutable PENDING_APPROVAL state.',
        sourceFile: 'backend/src/agents/procurementAgent.ts:90-110',
        verifiedTest: 'tests/unit/procurement_agent.test.ts'
      },
      {
        id: 'fb-lom-02',
        name: 'Imprecise Keyword Query Containment',
        triggerCondition: 'Search string matches partial word without matching technical fabric composition.',
        containmentAction: 'Compound index enforces exact attribute constraints before returning candidate supplier lots.',
        sourceFile: 'backend/src/repositories/FabricRepository.ts:45-70',
        verifiedTest: 'tests/unit/fabric_search.test.ts'
      }
    ]
  },

  // =========================================================================
  // 9. VM COPY QUESTION GENERATOR (LEVEL 2 — FOCUSED ARCHITECTURE)
  // =========================================================================
  {
    id: 'vm-copy',
    slug: 'vm-copy',
    name: 'VM Copy Question Generator',
    tagline: 'Hierarchical multi-tier prompting with Tier-1 deterministic evaluation and micro-batch latency bounding.',
    category: 'deterministic-computation',
    explorationLevel: 'level-2-focused',
    technologies: ['Next.js 16', 'React 19', 'TypeScript 5', 'Deterministic Guardrails', 'Micro-Batch Dispatch', 'Evaluation'],
    distinctiveEngineeringContribution:
      'Engineered a pure TypeScript Tier-1 Deterministic Evaluator (<1ms, $0 cost) enforcing 4 options, 1 CA, and duplicate distractor rejection before human review, paired with micro-batch splitting bounding latency to 4–6s.',
    ownership: 'wayground-independent',
    externalRoute: '/projects/vm-copy',
    decisionReferences: ['ADR-VMC-01', 'ADR-VMC-02'],
    nodes: [
      {
        id: 'vmc-config',
        label: 'Base Problem Configuration Interface',
        layer: 'Interface Layer',
        classification: 'deterministic',
        responsibility: 'Ingests source math problem, SME pedagogical notes, and target grade standards.',
        sourceLocation: 'app/components/QuestionConfig.tsx',
        inputs: ['Source question string', 'SME notes', 'Required variation count'],
        outputs: ['Batch configuration object'],
        dependencies: ['Next.js 16', 'React 19'],
        validationRule: 'Asserts source problem contains a solvable mathematical premise',
        verificationEvidence: {
          type: 'source_code',
          label: 'Client Problem Validation',
          measurement: 'Validates source question inputs before API dispatch',
          location: 'app/components/QuestionConfig.tsx:30-55'
        }
      },
      {
        id: 'vmc-batch-dispatcher',
        label: 'Micro-Batch Partitioning Dispatcher',
        layer: 'Orchestration Layer',
        classification: 'deterministic',
        responsibility: 'Partitions batch requests of 5-10 questions into parallel micro-batches of <=3 items via Promise.all, bounding latency to 4-6s.',
        sourceLocation: 'app/api/generate/route.ts:18-35 (calculateBatches)',
        inputs: ['Requested count (e.g. 5 questions)'],
        outputs: ['Array of micro-batch sizes (e.g. [3, 2])'],
        dependencies: ['Promise.all concurrent dispatch'],
        validationRule: 'No single completion call exceeds 3 questions, preventing serverless gateway timeouts',
        verificationEvidence: {
          type: 'source_code',
          label: 'Batch Calculation Logic',
          measurement: 'calculateBatches partitions requests into chunks of <= 3',
          location: 'app/api/generate/route.ts:18-35'
        }
      },
      {
        id: 'vmc-llm-generator',
        label: 'Hierarchical Prompt Generation Workers',
        layer: 'Generation Layer',
        classification: 'probabilistic',
        responsibility: 'Generates mathematical question variations with distractor rationale tags (Logic: "CA" or "DISTRACTOR").',
        sourceLocation: 'lib/generator.ts',
        inputs: ['Base question', 'Micro-batch count'],
        outputs: ['Candidate question variants in structured JSON'],
        dependencies: ['OpenAI / Gemini API router'],
        validationRule: 'JSON schema forces options array with logic explanations',
        verificationEvidence: {
          type: 'test_suite',
          label: 'Generator Schema Tests',
          measurement: '100% of generated candidates emit structured JSON schemas',
          location: 'tests/test_generator_schema.ts'
        }
      },
      {
        id: 'vmc-tier1-evaluator',
        label: 'Tier-1 Deterministic Evaluator (<1ms, $0)',
        layer: 'Deterministic Guardrails',
        classification: 'deterministic',
        responsibility: 'Enforces 3 non-negotiable invariants: exactly 4 options, exactly 1 Correct Answer (CA), and zero duplicate distractors.',
        sourceLocation: 'lib/eval-layer.ts:44-76 (evaluateDeterministic)',
        inputs: ['Generated question candidate object'],
        outputs: ['EvalResult (passed, score 0-100, issues array)'],
        dependencies: ['Pure TypeScript (0 model dependencies)'],
        validationRule: 'Fails question immediately if CA count != 1 or duplicate distractor strings detected',
        verificationEvidence: {
          type: 'test_suite',
          label: 'Retrieval Foundation Suite',
          measurement: 'Surfaced lib/eval-layer.ts:44-76 in test_retrieval_foundation.ts',
          location: 'scripts/test_retrieval_foundation.ts:Test 1'
        }
      }
    ],
    edges: [
      { from: 'vmc-config', to: 'vmc-batch-dispatcher', label: 'Batch request', type: 'sync' },
      { from: 'vmc-batch-dispatcher', to: 'vmc-llm-generator', label: 'Concurrent micro-batches', type: 'async' },
      { from: 'vmc-llm-generator', to: 'vmc-tier1-evaluator', label: 'Generated candidates', type: 'sync' }
    ],
    executionFlow: [
      {
        stepNumber: 1,
        title: 'Problem Ingestion & Note Setup',
        description: 'SME inputs base math item: "Find slope between (2,3) and (6,11)" and requests 5 variations.',
        activeNodeId: 'vmc-config',
        dataPayloadSummary: 'Base question set; target: 5 variations with distractor rationales',
        nature: 'deterministic'
      },
      {
        stepNumber: 2,
        title: 'Micro-Batch Latency Splitting',
        description: 'calculateBatches(5) partitions request into 2 parallel jobs [3, 2] dispatched concurrently via Promise.all.',
        activeNodeId: 'vmc-batch-dispatcher',
        dataPayloadSummary: 'Partitioned: Batch 1 (3 items), Batch 2 (2 items); Latency bound to ~4.8s',
        nature: 'deterministic'
      },
      {
        stepNumber: 3,
        title: 'Hierarchical LLM Generation',
        description: 'Workers generate question variations with tagged options: Option A (CA), Options B, C, D (Distractors).',
        activeNodeId: 'vmc-llm-generator',
        dataPayloadSummary: 'Generated 5 raw question candidates in structured JSON',
        nature: 'probabilistic'
      },
      {
        stepNumber: 4,
        title: 'Tier-1 Deterministic Evaluator Gate',
        description: 'Evaluator runs in <1ms: asserts exactly 4 options, exactly 1 CA, and set-based duplicate distractor detection.',
        activeNodeId: 'vmc-tier1-evaluator',
        dataPayloadSummary: 'Evaluation passed: 4 unique options, 1 CA verified at <1ms and $0 API cost',
        nature: 'deterministic'
      }
    ],
    failureBoundaries: [
      {
        id: 'fb-vmc-01',
        name: 'Duplicate Distractor Option Rejection',
        triggerCondition: 'LLM generates multiple options with identical values (e.g. Option B: "4", Option D: "4").',
        containmentAction: 'Set-based check flags duplicate option, deducts score, and marks passed=false.',
        sourceFile: 'lib/eval-layer.ts:65-75',
        verifiedTest: 'scripts/test_retrieval_foundation.ts:Test 1'
      },
      {
        id: 'fb-vmc-02',
        name: 'Multiple Correct Answer Invariant Violation',
        triggerCondition: 'LLM marks more than one option with logic: "CA".',
        containmentAction: 'Evaluator rejects item with reason: "Multiple options are marked as Correct Answer".',
        sourceFile: 'lib/eval-layer.ts:55-64',
        verifiedTest: 'scripts/test_retrieval_foundation.ts:Test 1'
      }
    ]
  },

  // =========================================================================
  // 10. AI WORKSHEETS (LEVEL 2 — FOCUSED ARCHITECTURE)
  // =========================================================================
  {
    id: 'ai-worksheets',
    slug: 'ai-worksheets',
    name: 'AI Worksheets Dual-Pipeline Platform',
    tagline: 'Dual formal and gamified generation with multi-model routing, headless TikZ compiler, and graph solvers.',
    category: 'data-transformation',
    explorationLevel: 'level-2-focused',
    technologies: ['React 18 / Vite 6', 'FastAPI / Python 3.12', 'Portkey AI Gateway', 'Headless TikZ Compiler', '2D Graph Solvers', 'WeasyPrint'],
    distinctiveEngineeringContribution:
      'Engineered a headless TikZ compilation engine (pdflatex + pdftoppm) with MD5 content hashing paired with 2D graph backtracking solvers for deterministic puzzle layout generation.',
    ownership: 'wayground-independent',
    externalRoute: '/projects/ai-worksheets',
    decisionReferences: ['ADR-WS-01', 'ADR-WS-02'],
    nodes: [
      {
        id: 'ws-builder',
        label: 'Teacher Configuration & Standard Selector',
        layer: 'Interface Layer',
        classification: 'deterministic',
        responsibility: 'Interface allowing teachers to select state TEKS standards, grade levels, and formal vs gamified layout.',
        sourceLocation: 'src/components/WorksheetBuilder.tsx',
        inputs: ['Target standard', 'Grade level', 'Layout mode (Formal / Gamified)'],
        outputs: ['Worksheet specification payload'],
        dependencies: ['React 18', 'Vite 6', 'Tailwind CSS'],
        validationRule: 'Asserts selected standard matches supported K-12 mathematics curriculum',
        verificationEvidence: {
          type: 'source_code',
          label: 'Teacher Builder Interface',
          measurement: 'Validates standard selection and problem count',
          location: 'src/components/WorksheetBuilder.tsx:40-75'
        }
      },
      {
        id: 'ws-model-router',
        label: 'Multi-Model Routing Gateway',
        layer: 'AI Routing Layer',
        classification: 'probabilistic',
        responsibility: 'Routes question generation to GPT-4o, diagram code to Gemini Flash, and puzzle blueprints to GPT-5.2 via Portkey AI Gateway.',
        sourceLocation: 'backend/services/model_router.py',
        inputs: ['Task type (Question, TikZ, Puzzle)'],
        outputs: ['Specialized model completion'],
        dependencies: ['Portkey AI Gateway', 'OpenAI / Gemini SDKs'],
        validationRule: 'Applies fallback provider if primary model rate-limits or times out',
        verificationEvidence: {
          type: 'source_code',
          label: 'Model Gateway Routing',
          measurement: 'Routes task by domain to optimal latency/cost provider',
          location: 'backend/services/model_router.py:25-60'
        }
      },
      {
        id: 'ws-tikz-compiler',
        label: 'Headless TikZ Subprocess Compiler',
        layer: 'Deterministic Compilation',
        classification: 'deterministic',
        responsibility: 'Compiles mathematical LaTeX/TikZ code via headless pdflatex + pdftoppm into 300 DPI PNGs with MD5 content cache.',
        sourceLocation: 'backend/services/tikz_compiler.py',
        inputs: ['TikZ diagram source code string'],
        outputs: ['300 DPI rasterized PNG diagram image'],
        dependencies: ['Headless TeX Live (pdflatex)', 'pdftoppm', 'MD5 cache'],
        validationRule: 'Sandboxed subprocess with 5s execution timeout prevents LaTeX infinite loop crashes',
        verificationEvidence: {
          type: 'test_suite',
          label: 'TikZ Compilation Tests',
          measurement: 'Compiles geometric diagrams and graphs with zero syntax crash escapes',
          location: 'backend/tests/test_tikz_compiler.py'
        }
      },
      {
        id: 'ws-graph-solver',
        label: 'Deterministic 2D Puzzle Backtracking Solvers',
        layer: 'Deterministic Solvers',
        classification: 'deterministic',
        responsibility: 'Generates valid 2D crossword grids and honeycomb hex mazes using recursive depth-first search (DFS) with zero LLM math.',
        sourceLocation: 'backend/solvers/crossword_backtracker.py, hex_maze.py',
        inputs: ['Vocabulary words / mathematical clue pairs'],
        outputs: ['Mathematically guaranteed solvable 2D grid matrix'],
        dependencies: ['Python DFS algorithm', 'Constraint satisfaction solver'],
        validationRule: 'Guarantees single unique solution path and zero overlapping conflicting letters',
        verificationEvidence: {
          type: 'test_suite',
          label: 'Puzzle Solver Suite',
          measurement: 'Generates 100% solvable crossword matrices and hex mazes across test suite',
          location: 'backend/tests/test_puzzle_solvers.py'
        }
      }
    ],
    edges: [
      { from: 'ws-builder', to: 'ws-model-router', label: 'Worksheet specification', type: 'sync' },
      { from: 'ws-model-router', to: 'ws-tikz-compiler', label: 'Generated TikZ code', type: 'sync' },
      { from: 'ws-model-router', to: 'ws-graph-solver', label: 'Clue pairs for puzzle', type: 'sync' }
    ],
    executionFlow: [
      {
        stepNumber: 1,
        title: 'Teacher Standard & Mode Configuration',
        description: 'Teacher selects Grade 6 Geometry standard (Area of Polygons) and chooses Gamified mode with TikZ figures.',
        activeNodeId: 'ws-builder',
        dataPayloadSummary: 'Standard: TEKS 6.8.B | Mode: Gamified (Hex Maze + 4 Diagram Questions)',
        nature: 'deterministic'
      },
      {
        stepNumber: 2,
        title: 'Multi-Model AI Gateway Routing',
        description: 'Portkey routes question text to GPT-4o, geometric coordinate prompt to Gemini Flash, and maze clues to GPT-5.2.',
        activeNodeId: 'ws-model-router',
        dataPayloadSummary: 'Parallel model calls dispatched across Portkey AI Gateway',
        nature: 'probabilistic'
      },
      {
        stepNumber: 3,
        title: 'Headless TikZ Subprocess Compilation',
        description: 'Compiler checks MD5 cache; compiles TikZ script via sandboxed pdflatex into sharp 300 DPI diagram in 1.4s.',
        activeNodeId: 'ws-tikz-compiler',
        dataPayloadSummary: 'Compiled polygon TikZ code -> 300 DPI PNG diagram rendered and cached',
        nature: 'deterministic'
      },
      {
        stepNumber: 4,
        title: 'Deterministic 2D Maze & Crossword Solving',
        description: 'DFS backtracker arranges vocabulary into honeycomb hex maze with guaranteed single solution path.',
        activeNodeId: 'ws-graph-solver',
        dataPayloadSummary: 'Grid matrix solved: 100% valid hex geometry with 0 clue conflicts',
        nature: 'deterministic'
      }
    ],
    failureBoundaries: [
      {
        id: 'fb-ws-01',
        name: 'LaTeX / TikZ Compilation Subprocess Crash',
        triggerCondition: 'LLM generates invalid TikZ syntax (e.g. unescaped braces or missing semicolon).',
        containmentAction: 'Subprocess error caught in sandboxed runner; auto-triggers single retry with syntax correction prompt.',
        sourceFile: 'backend/services/tikz_compiler.py:80-110',
        verifiedTest: 'backend/tests/test_tikz_compiler.py'
      },
      {
        id: 'fb-ws-02',
        name: 'Unsolvable 2D Crossword Constraint Failure',
        triggerCondition: 'Clue words lack shared letters preventing valid 2D grid intersection.',
        containmentAction: 'DFS backtracker detects dead end, swaps problem word from backup bank, and re-solves.',
        sourceFile: 'backend/solvers/crossword_backtracker.py:65-90',
        verifiedTest: 'backend/tests/test_puzzle_solvers.py'
      }
    ]
  },

  // =========================================================================
  // 11. US MATHEMATICS ITEM BANK (LEVEL 2 — FOCUSED ARCHITECTURE)
  // =========================================================================
  {
    id: 'math-item-bank',
    slug: 'math-item-bank',
    name: 'US Mathematics Item Bank Generation Pipeline',
    tagline: 'State curriculum assessment pipeline pairing semantic blueprints with deterministic TikZ/SVG visual gates.',
    category: 'data-transformation',
    explorationLevel: 'level-2-focused',
    technologies: ['Python', 'FastAPI', 'TikZ / SVG Compilation', 'Visual Validation Gates', 'Curriculum Taxonomy'],
    distinctiveEngineeringContribution:
      'Engineered candidate generation blueprints and deterministic code compilation gates separating geometry (routed to SVG) from graphs (routed to TikZ) within Wayground\'s assessment pipeline.',
    ownership: 'wayground-team',
    externalRoute: '/projects/math-item-bank',
    decisionReferences: ['ADR-MIB-01'],
    nodes: [
      {
        id: 'mib-curriculum',
        label: 'Assessment Item Specifications',
        layer: 'Specification Layer',
        classification: 'deterministic',
        responsibility: 'Encapsulates state standards, assessment question formats, and grade-band taxonomy definitions.',
        sourceLocation: 'pipeline/specs/assessment_standards.py',
        inputs: ['State curriculum standard (e.g. CCSS Grade 7 Math)'],
        outputs: ['Item blueprint specification'],
        dependencies: ['Curriculum taxonomy database'],
        validationRule: 'Asserts assessment blueprint conforms to official state department criteria',
        verificationEvidence: {
          type: 'source_code',
          label: 'Assessment Specification Contract',
          measurement: 'Validates standard alignments across Upper Elementary and Middle School',
          location: 'pipeline/specs/assessment_standards.py'
        }
      },
      {
        id: 'mib-domain-router',
        label: 'Mathematical Domain Router (Aadil Contribution)',
        layer: 'Domain Routing',
        classification: 'deterministic',
        responsibility: 'Routes mathematical visual generation: geometric 2D shapes to SVG generators; coordinate graphs and number lines to TikZ.',
        sourceLocation: 'pipeline/routers/domain_router.py',
        inputs: ['Assessment question blueprint'],
        outputs: ['Target rendering engine (SVG vs TikZ)'],
        dependencies: ['Domain taxonomy dictionary'],
        validationRule: 'Prevents routing complex Cartesian graphs to raw SVG paths; routes to TikZ for coordinate accuracy',
        verificationEvidence: {
          type: 'source_code',
          label: 'Domain Routing Logic',
          measurement: 'Deterministic domain separation between SVG and TikZ rendering',
          location: 'pipeline/routers/domain_router.py:25-50'
        }
      },
      {
        id: 'mib-candidate-gen',
        label: 'Semantic Blueprint Candidate Generation',
        layer: 'AI Generation Layer',
        classification: 'probabilistic',
        responsibility: 'Frontier LLM generates candidate assessment question stems, distractor options, and visual rendering code.',
        sourceLocation: 'pipeline/generators/item_generator.py',
        inputs: ['Item blueprint', 'Mathematical domain parameters'],
        outputs: ['Candidate item with TikZ/SVG code and option set'],
        dependencies: ['LLM generation API'],
        validationRule: 'Enforces structured JSON candidate format with distractor pedagogical tags',
        verificationEvidence: {
          type: 'source_code',
          label: 'Item Candidate Generator',
          measurement: 'Outputs schema-compliant assessment question packages',
          location: 'pipeline/generators/item_generator.py'
        }
      },
      {
        id: 'mib-visual-gate',
        label: 'Deterministic TikZ/SVG Compilation Gate',
        layer: 'Verification & Acceptance',
        classification: 'deterministic',
        responsibility: 'Evaluates candidate code via automated compilation check; passes only syntactically watertight figures to item bank.',
        sourceLocation: 'pipeline/validators/compilation_gate.py',
        inputs: ['Generated TikZ/SVG code'],
        outputs: ['Rendered figure image or compilation rejection log'],
        dependencies: ['Headless TeX compiler', 'SVG DOM validator'],
        validationRule: 'Compilation failure immediately rejects item candidate without human intervention',
        verificationEvidence: {
          type: 'source_code',
          label: 'Compilation Gate Invariant',
          measurement: 'Pass/fail gate prevents broken LaTeX/SVG code from entering repository',
          location: 'pipeline/validators/compilation_gate.py:35-60'
        }
      }
    ],
    edges: [
      { from: 'mib-curriculum', to: 'mib-domain-router', label: 'Item blueprint', type: 'sync' },
      { from: 'mib-domain-router', to: 'mib-candidate-gen', label: 'Routing policy (SVG vs TikZ)', type: 'sync' },
      { from: 'mib-candidate-gen', to: 'mib-visual-gate', label: 'Candidate item & visual code', type: 'sync' }
    ],
    executionFlow: [
      {
        stepNumber: 1,
        title: 'Curriculum Standard Selection',
        description: 'Assessment pipeline receives Middle School Coordinate Geometry standard specification.',
        activeNodeId: 'mib-curriculum',
        dataPayloadSummary: 'Standard: Grade 8 Coordinate Transformations (Rotations & Reflections)',
        nature: 'deterministic'
      },
      {
        stepNumber: 2,
        title: 'Mathematical Domain Routing',
        description: 'Domain router inspects requirements; routes visual asset generation to TikZ coordinate engine rather than raw SVG.',
        activeNodeId: 'mib-domain-router',
        dataPayloadSummary: 'Routing decision: TIKZ_COORDINATE_ENGINE (Enforces Cartesian grid precision)',
        nature: 'deterministic'
      },
      {
        stepNumber: 3,
        title: 'Candidate Item & Code Generation',
        description: 'LLM generates question stem, 4 multiple choice options with distractor rationale, and parameterized TikZ script.',
        activeNodeId: 'mib-candidate-gen',
        dataPayloadSummary: 'Generated candidate: Question stem + 4 options + TikZ coordinate grid code',
        nature: 'probabilistic'
      },
      {
        stepNumber: 4,
        title: 'Deterministic Code Compilation Gate',
        description: 'Compilation gate compiles TikZ code; verifies image renders without TeX syntax errors before accepting into item bank.',
        activeNodeId: 'mib-visual-gate',
        dataPayloadSummary: 'Compilation PASS: 300 DPI coordinate diagram accepted into Wayground item bank',
        nature: 'deterministic'
      }
    ],
    failureBoundaries: [
      {
        id: 'fb-mib-01',
        name: 'TikZ / SVG Code Compilation Syntax Error',
        triggerCondition: 'LLM generates invalid TikZ coordinates or broken SVG tags.',
        containmentAction: 'Compilation gate rejects candidate immediately with failure log; candidate discarded.',
        sourceFile: 'pipeline/validators/compilation_gate.py:45-65',
        verifiedTest: 'Code review verification (Pass/fail acceptance gate)'
      },
      {
        id: 'fb-mib-02',
        name: 'Curriculum Standard Taxonomy Alignment Mismatch',
        triggerCondition: 'Generated question assesses mathematical subskills outside target grade-level standard.',
        containmentAction: 'Taxonomy validator flags grade-band deviation and rejects candidate before item bank entry.',
        sourceFile: 'pipeline/validators/taxonomy_guard.py:30-55',
        verifiedTest: 'Code review verification (Taxonomy alignment gate)'
      }
    ]
  }
]
