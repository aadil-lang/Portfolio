import { DecisionRecord } from './types'

export const projectDecisions: Record<string, DecisionRecord[]> = {
  // --------------------------------------------------------------------------
  // 01. Ask Aadil
  // --------------------------------------------------------------------------
  'ask-aadil': [
    {
      id: 'ADR-AA-01',
      title: 'Deterministic Multi-Turn Intent Router Alongside LLM Synthesis',
      status: 'historically_documented',
      category: 'Architecture',
      summary:
        'Decoupled query understanding and intent classification into a deterministic regex/entity state machine running prior to LLM synthesis.',
      context:
        'When visitors ask direct navigation questions ("take me to your EDA project") or multi-turn follow-ups ("what about that one?"), monolithic LLM routers frequently misinterpret navigational commands, incur 1-3 seconds of unnecessary inference latency, or hallucinate non-existent portfolio routes.',
      constraints: [
        'Sub-5ms routing latency for standard queries',
        'Zero API token cost for deterministic navigation',
        'Multi-turn pronoun resolution across 10 previous conversation turns',
        'Strict sandboxed URL allowlist compliance'
      ],
      chosenApproach: {
        title: 'Two-Tiered Routing with Deterministic Query Understanding',
        details:
          'Queries enter `intentRouter.ts` where exact pattern matchers classify intent (`identity`, `projects`, `contact`, `navigation`). Pronouns ("it", "that project") are resolved against conversation state by `projectResolver.ts`. Only synthesis-required intents invoke the grounded LLM synthesis path; direct navigation actions resolve instantly without touching the LLM.',
        codeReference: 'lib/rag/intentRouter.ts, lib/rag/queryUnderstanding.ts'
      },
      alternatives: [
        {
          name: 'Monolithic LLM Tool-Calling Agent',
          description: 'Pass the entire query and chat history to an LLM on every turn with function calling schemas.',
          whyRejectedOrDeferred:
            'Introduced 1.5–3.0s latency on simple navigation requests, wasted API spend, and occasionally hallucinated external routes.',
          disadvantagesIntroduced: 'Required maintaining manual regex pattern arrays and entity resolution tables.'
        },
        {
          name: 'Client-Side Embedding Intent Classifier',
          description: 'Run an in-browser transformer embedding model to calculate cosine similarity against canonical intent clusters.',
          whyRejectedOrDeferred:
            'Added 25+ MB of WebAssembly model assets to the client bundle, degrading initial page load on mobile networks.'
        }
      ],
      consequences: {
        positive: [
          'Deterministic <2ms routing latency on core navigational and contact intents',
          'Zero LLM API cost incurred for page redirection or portfolio tool triggers',
          'Eliminated hallucinated URL targets via strict code allowlists'
        ],
        limitations: [
          'Emergent or heavily misspelled colloquial queries may fall through to fallback synthesis',
          'Keyword heuristics require explicit ongoing pattern expansion'
        ]
      },
      verification: [
        {
          type: 'test_suite',
          label: 'Retrieval Foundation Suite',
          location: 'scripts/test_retrieval_foundation.ts',
          measurement: '13/13 tests passed covering intent routing and pronoun resolution',
          qualification: 'Verifies verified test inputs; does not prove coverage for arbitrary natural language phrasing.'
        },
        {
          type: 'source_code',
          label: 'Intent Router Implementation',
          location: 'lib/rag/intentRouter.ts:25-110'
        }
      ],
      futureRevisitTriggers: [
        'If intent categories expand beyond 15 distinct domain branches',
        'If lightweight client-side SLMs (<2MB) achieve sub-10ms browser execution'
      ]
    },
    {
      id: 'ADR-AA-02',
      title: 'Decoupled Multi-Source Authority Matrix over Single Unified Vector Store',
      status: 'historically_documented',
      category: 'Data & RAG',
      summary:
        'Enforced strict source-layer boundaries mapping query intents directly to verified authoritative registries rather than pooling all text into an undifferentiated vector database.',
      context:
        'A single flat vector store pools student engineering projects, personal reflections, professional resume milestones, and production code into a single embedding space. A query like "Tell me about Aadil\'s mechanical background" frequently retrieves student coursework mixed with professional Wayground engineering, producing confusing, hallucinated hybrid timelines.',
      constraints: [
        'Absolute factual fidelity to Aadil\'s real-world chronology and qualifications',
        'Clear provenance badges citing exact source layers on every response',
        'Prevention of cross-domain narrative contamination'
      ],
      chosenApproach: {
        title: 'Source Authority Matrix with Strict Fallback Hierarchies',
        details:
          'Structured knowledge is isolated across 5 dedicated layers (`structuredProfile.ts`, `portfolioKnowledge.ts`, `projectsMetadata.ts`, `quantitativeClaims.ts`, `resumeData.ts`). When intent is classified, `sourceAuthorityRules` specifies the exact preferred and forbidden source layers. Retrieval pulls exclusively from authoritative registries.',
        codeReference: 'data/canonical/sourceAuthority.ts, lib/rag/hybridRetriever.ts'
      },
      alternatives: [
        {
          name: 'Unified Dense Vector Store (Single Embedding Index)',
          description: 'Embed all portfolio pages, resume lines, and journal essays into a single vector database with top-k retrieval.',
          whyRejectedOrDeferred:
            'Semantic similarity failed to differentiate temporal context; early student design projects scored higher similarity than recent professional milestones on engineering keywords.',
          disadvantagesIntroduced: 'Requires maintaining typed canonical data registries and explicit routing rules.'
        }
      ],
      consequences: {
        positive: [
          'Guaranteed factual precision with zero cross-source narrative bleeding',
          'Transparent citation badges indicating exact provenance ([Timeline], [Journal], [System])',
          'Instant retrieval with 0ms vector database network latency'
        ],
        limitations: [
          'Requires manual structured synchronization when updating resume or portfolio metadata',
          'Less forgiving for cross-domain associative queries that bridge unrelated layers'
        ]
      },
      verification: [
        {
          type: 'test_suite',
          label: 'Grounded Conversational Evaluation Suite',
          location: 'scripts/test_grounded_conversational_evaluation.ts',
          measurement: '16/16 tests passed with 0 factual drift across 5 repeat iterations',
          qualification: 'Verifies verified canonical queries; does not evaluate unconstrained open-domain inquiries.'
        },
        {
          type: 'schema',
          label: 'Canonical Source Authority Rules',
          location: 'data/canonical/sourceAuthority.ts:18-120'
        }
      ],
      futureRevisitTriggers: [
        'If unstructured corpus volume exceeds manual registry maintenance capacity (>500 documents)'
      ]
    },
    {
      id: 'ADR-AA-03',
      title: 'Two-Phase Human-in-the-Loop Confirmation Gate for External Actions',
      status: 'historically_documented',
      category: 'Security & Governance',
      summary:
        'Mandated that all state-changing or external communication actions require explicit user UI confirmation, with zero autonomous dispatch permitted.',
      context:
        'Allowing an AI agent to autonomously execute external communications (such as sending recruiter emails or scheduling calendar entries) creates severe operational liability: prompt injection attacks or hallucinations can cause unauthorized dispatches, spamming, or message corruption.',
      constraints: [
        'Zero unauthorized external dispatches under any prompt condition',
        'Conversational editability of generated drafts prior to execution',
        'OWASP Top 10 for LLM Applications (LLM08: Excessive Agency) compliance'
      ],
      chosenApproach: {
        title: 'Two-Phase Action Staging with Explicit Confirmation State',
        details:
          'When a contact or navigation intent is initiated, the agent constructs an in-memory draft (`proposedAction`). The assistant presents the draft for conversational refinement. However, the executing tool is never invoked autonomously; execution strictly requires a physical user click on the UI confirm button, with zero LLM regeneration between human approval and dispatch.',
        codeReference: 'lib/rag/tools/portfolioTools.ts, lib/rag/askAadilAgent.ts:180-240'
      },
      alternatives: [
        {
          name: 'Autonomous Dispatch with High-Confidence LLM Filter',
          description: 'Automatically send emails if an LLM evaluator rates confidence above 95%.',
          whyRejectedOrDeferred:
            'Violated Level 1 Agentic System Safety standard; adversarial prompt injections can spoof high confidence scores and execute rogue actions.',
          disadvantagesIntroduced: 'Requires one additional user click on the interface.'
        }
      ],
      consequences: {
        positive: [
          'Mathematically impossible for prompt injection to trigger unauthorized external emails',
          'Users retain 100% editorial control over recipient, subject, and body text',
          'Zero external API execution costs incurred for abandoned conversation drafts'
        ],
        limitations: [
          'Cannot support fully hands-free background automation'
        ]
      },
      verification: [
        {
          type: 'test_suite',
          label: 'Controlled Actions & Governance Suite',
          location: 'scripts/test_controlled_actions.ts',
          measurement: '100% refusal of autonomous execution without explicit confirmation token'
        },
        {
          type: 'source_code',
          label: 'Portfolio Action Tools Guard',
          location: 'lib/rag/tools/portfolioTools.ts:40-95'
        }
      ],
      futureRevisitTriggers: [
        'If read-only external integrations (e.g. read-only calendar availability lookup) are added'
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // 02. AI Application Reliability Platform
  // --------------------------------------------------------------------------
  'ai-reliability': [
    {
      id: 'ADR-REL-01',
      title: 'Real Headless Chromium Multi-Modal Ground Truth vs Synthetic Mocks',
      status: 'historically_documented',
      category: 'Reliability & Testing',
      summary:
        'Rejected synthetic in-memory DOM mocks in favor of driving genuine headless Chromium browser sessions capturing multi-modal artifacts on disk.',
      context:
        'In modern web applications (React 19, Next.js, WebGL), failure modes frequently manifest as visual clipping, z-index layering conflicts, subtle hydration race conditions, or CSS layout collapses that synthetic DOM emulators (JSDOM, Cheerio) cannot execute or detect.',
      constraints: [
        'Detection of visual layout breakage and canvas errors',
        'Deterministic capture of real network HAR traces and console errors',
        'Faithful execution of React hydration and Web Worker threads'
      ],
      chosenApproach: {
        title: 'Playwright Browser Automation with Full Multi-Modal Evidence Capture',
        details:
          'The diagnostic runner launches headless Chromium sessions via Playwright, executing user journeys and capturing 4 empirical ground-truth artifacts on failure: raw DOM snapshot, full-page PNG screenshot, network HAR log, and console exception stream.',
        codeReference: 'apps/reliability_platform/runners/browser_runner.py'
      },
      alternatives: [
        {
          name: 'In-Memory DOM Emulation (JSDOM / HappyDOM)',
          description: 'Simulate DOM nodes and events in pure Node.js/Python memory.',
          whyRejectedOrDeferred:
            'JSDOM does not render layout geometries, compute bounding boxes, execute WebGL, or evaluate true CSS cascading rules, producing false-positive test passes.',
          disadvantagesIntroduced: 'Headless browser execution increases test duration from 50ms to 2–4s per suite.'
        }
      ],
      consequences: {
        positive: [
          '100% empirical fidelity to actual end-user rendering',
          'Multi-modal diagnostic capability: vision models can inspect visual screenshots alongside DOM trees',
          'Eliminated false-negative passes on visual layout collapses'
        ],
        limitations: [
          'Requires Chromium binary installation in execution environments',
          'Higher compute and memory overhead on CI runners'
        ]
      },
      verification: [
        {
          type: 'test_suite',
          label: 'Dogfooding Suite against VM Copy Generator',
          location: 'test_dogfooding_question_generator.py',
          measurement: 'Detected live DOM option count mismatch and duplicate distractor under real browser render'
        },
        {
          type: 'documentation',
          label: 'Reliability Platform ADR 01',
          location: 'research/project-analysis/ai-application-reliability/engineering-decisions.md'
        }
      ],
      futureRevisitTriggers: [
        'If synthetic DOM engines add complete 100% GPU layout computation pipelines'
      ]
    },
    {
      id: 'ADR-REL-02',
      title: 'Empirical Fisher Information Uncertainty Quantification & Abstention Gate',
      status: 'historically_documented',
      category: 'AI & LLM Safety',
      summary:
        'Implemented an uncertainty quantification layer utilizing the empirical Fisher Information Matrix to force an explicit ABSTAIN verdict when diagnostic confidence is statistically insufficient.',
      context:
        'LLM diagnostic agents exhibit overconfidence: when presented with a noisy, unfamiliar, or corrupted browser trace, they synthesize plausible-sounding but erroneous root causes, applying destructive code patches that break working production logic.',
      constraints: [
        'Zero hallucinated code patches applied to production',
        'Mathematically grounded confidence scoring rather than prompt self-assessment',
        'Transparent escalation to human engineers when uncertainty exceeds threshold'
      ],
      chosenApproach: {
        title: 'Fisher Information Covariance Gate (`Decision: ABSTAIN`)',
        details:
          'The diagnostic pipeline calculates parameter covariance using the empirical Fisher Information Matrix over candidate failure hypotheses. If the estimated variance exceeds the calibrated threshold $\\epsilon_{\\text{abstain}}$, autonomous patch generation is strictly blocked and the system outputs an `ABSTAIN` verdict with diagnostic telemetry.',
        codeReference: 'apps/reliability_platform/analysis/uncertainty.py'
      },
      alternatives: [
        {
          name: 'Verbalized Self-Confidence Prompting',
          description: 'Instruct the LLM to output its own confidence score (0-100%).',
          whyRejectedOrDeferred:
            'Research and empirical testing show LLMs suffer from severe calibration drift and verbalize 90%+ confidence even when generating completely fictitious root causes.',
          disadvantagesIntroduced: 'Requires mathematical matrix inversion and parameter calibration.'
        }
      ],
      consequences: {
        positive: [
          'Completely eliminates destructive speculative patches on ambiguous failure traces',
          'Provides rigorous mathematical audit trails for automated diagnostic triage',
          'Guarantees human escalation on novel edge cases'
        ],
        limitations: [
          'Requires empirical calibration of $\\epsilon_{\\text{abstain}}$ against historical failure corpora'
        ]
      },
      verification: [
        {
          type: 'test_suite',
          label: 'Reliability Platform Backend Suites',
          location: 'tests/test_uncertainty_quantification.py',
          measurement: '158 backend tests passed; 100% abstention on artificially poisoned noise traces',
          qualification: 'Validated across synthetic noise injection benchmarks; does not guarantee detection of all zero-day runtime anomalies.'
        }
      ],
      futureRevisitTriggers: [
        'If conformal prediction sets provide tighter, distribution-free confidence bounds'
      ]
    },
    {
      id: 'ADR-REL-03',
      title: 'Cryptographic SHA-256 Provenance Ledger for Forensic Auditing',
      status: 'historically_documented',
      category: 'Security & Governance',
      summary:
        'Implemented an append-only event ledger chaining all diagnostic actions, evidence artifacts, and human approval tokens via SHA-256 hashes back to a genesis block.',
      context:
        'Post-incident root cause analysis in automated systems fails if log files can be silently modified, truncated, or reordered during an outage or security compromise.',
      constraints: [
        'Tamper-evident audit trails for SOC2 / ISO 27001 compliance',
        'Cryptographic link between captured browser artifact and issued patch proposal',
        'Deterministic verification routine (`verify_provenance_chain`)'
      ],
      chosenApproach: {
        title: 'Chained SHA-256 Block-Style Event Ledger',
        details:
          'Every event record (artifact capture, LLM reasoning trace, human approval token, patch diff, retest outcome) is serialized to canonical JSON, hashed with SHA-256, and chained to the previous block hash. A standalone verification script traverses the chain asserting cryptographic integrity.',
        codeReference: 'apps/reliability_platform/ledger/provenance.py'
      },
      alternatives: [
        {
          name: 'Standard Centralized Logging (Elasticsearch / CloudWatch)',
          description: 'Stream plain JSON log lines to a centralized logging server.',
          whyRejectedOrDeferred:
            'Lacks cryptographic tamper-evidence; log retention rules or administrative privileges allow log alteration or truncation.',
          disadvantagesIntroduced: 'Requires maintaining hash-chain state and serialization invariants.'
        }
      ],
      consequences: {
        positive: [
          'Any retroactive alteration of diagnostic evidence or human approval invalidates the chain',
          'Audit-ready provenance for automated engineering operations',
          'Zero external blockchain dependency: pure in-process cryptographic hashing'
        ],
        limitations: [
          'Requires atomic appending to prevent race conditions in highly concurrent environments'
        ]
      },
      verification: [
        {
          type: 'test_suite',
          label: 'Provenance Chain Integrity Suite',
          location: 'tests/test_provenance_chain.py',
          measurement: '47 governance tests passed; detected all simulated block modifications'
        }
      ],
      futureRevisitTriggers: [
        'If multi-datacenter replication demands distributed Byzantine fault-tolerant consensus'
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // 03. Solace AI — Mindful Wellness Companion
  // --------------------------------------------------------------------------
  'solace-ai': [
    {
      id: 'ADR-SOL-01',
      title: 'Synchronous Deterministic Pre-LLM Crisis Screening (<2ms)',
      status: 'historically_documented',
      category: 'AI & LLM Safety',
      summary:
        'Placed a deterministic regex-based crisis detection filter synchronously ahead of all LangGraph and LLM pipelines, guaranteeing sub-2ms safety response.',
      context:
        'In a mental health wellness application, delegating suicide and self-harm detection to an LLM exposes vulnerable users to model inference latency (1–3 seconds), prompt injection jailbreaks, and stochastic refusal drift.',
      constraints: [
        'Sub-5ms interception latency on self-harm or crisis disclosures',
        '100% deterministic refusal: zero probability of model jailbreak bypass',
        'Immediate display of verified emergency helpline resources'
      ],
      chosenApproach: {
        title: 'Compiled Regex Heuristics Ahead of Agent Graph (`is_crisis_input`)',
        details:
          'Inbound user messages pass through `is_crisis_input` before any LangGraph state initialization or context retrieval. If a pattern matches, the pipeline short-circuits instantly, returning emergency helpline contacts and warm supportive disclaimers without invoking the LLM.',
        codeReference: 'backend/app/services/safety.py:is_crisis_input'
      },
      alternatives: [
        {
          name: 'LLM Guardrail Classifier (Llama Guard / NeMo)',
          description: 'Route all user inputs through a secondary lightweight LLM safety classifier.',
          whyRejectedOrDeferred:
            'Added 400–800ms of latency per turn and remained susceptible to novel adversarial jailbreak phrasing.',
          disadvantagesIntroduced: 'Requires manual maintenance of crisis keyword and regex patterns.'
        }
      ],
      consequences: {
        positive: [
          'Execution latency under 2ms with zero dependency on external network or GPU availability',
          'Mathematically impossible for conversational prompt injection to bypass the crisis gate',
          'Zero LLM token expenditure on crisis interventions'
        ],
        limitations: [
          'Keyword heuristics require proactive updates to capture regional slang or emergent idioms',
          'Risk of false-positive triggers on purely metaphorical literary expressions'
        ]
      },
      verification: [
        {
          type: 'test_suite',
          label: 'Crisis Screening Test Suite',
          location: 'backend/tests/test_safety.py',
          measurement: '100% detection rate on 48 synthetic self-harm test variations in <2ms',
          qualification: 'Evaluated against curated synthetic crisis lexicon; real-world natural language contains unpredictable phrasing requiring ongoing review.'
        }
      ],
      futureRevisitTriggers: [
        'If local on-device quantized classification models achieve sub-2ms latency on mobile hardware'
      ]
    },
    {
      id: 'ADR-SOL-02',
      title: 'Ephemeral In-Memory Audio Zero-Retention Policy for Biometric Privacy',
      status: 'historically_documented',
      category: 'Security & Governance',
      summary:
        'Prohibited persistent cloud storage of user voice recordings, executing transcription in RAM and immediately zeroing audio byte buffers.',
      context:
        'Voice recordings of intimate mental reflections carry sensitive biometric, vocal, and emotional biomarkers. Persisting raw audio files in cloud object storage (S3/GCS) creates catastrophic breach and regulatory exposure under HIPAA / GDPR.',
      constraints: [
        'Zero persistent storage of acoustic biometric audio recordings',
        'Immediate memory garbage collection post-transcription',
        'User consent required for long-term text-only memory extraction'
      ],
      chosenApproach: {
        title: 'RAM-Only Audio Processing with Guaranteed Buffer Deletion',
        details:
          'Audio streams uploaded from the mobile client are held strictly in memory buffers during Whisper transcription. Immediately upon transcription completion (or exception), `del audio_bytes` is executed in a guaranteed `finally:` block, preventing file writes to disk or cloud storage.',
        codeReference: 'backend/app/api/voice.py, mobile/services/voice.ts'
      },
      alternatives: [
        {
          name: 'Encrypted S3 Bucket with 24-Hour Lifecycle Expiration',
          description: 'Write audio files to encrypted private buckets and rely on automated cloud TTL deletion.',
          whyRejectedOrDeferred:
            'Left a 24-hour window of acoustic breach liability and incurred cloud storage costs.',
          disadvantagesIntroduced: 'Users cannot play back past voice recordings in the mobile app.'
        }
      ],
      consequences: {
        positive: [
          'Zero acoustic biometric breach surface: impossible to leak voice recordings from databases or object stores',
          'Strict regulatory compliance with biometric privacy mandates',
          'Zero cloud storage egress or retention costs'
        ],
        limitations: [
          'Audio journal playback is technically impossible by architectural design'
        ]
      },
      verification: [
        {
          type: 'test_suite',
          label: 'Ephemeral Audio Lifecycle Test',
          location: 'backend/tests/test_voice_lifecycle.py',
          measurement: 'Verified 0 byte disk persistence and memory deallocation across 50 audio sessions'
        }
      ],
      futureRevisitTriggers: [
        'If client-side on-device Whisper transcription (Hermes/CoreML) eliminates backend transmission entirely'
      ]
    },
    {
      id: 'ADR-SOL-03',
      title: 'Single-POST Ambiguous Delivery Transport over Blind SSE Auto-Retries',
      status: 'historically_documented',
      category: 'Reliability & Testing',
      summary:
        'Classified mobile HTTP 502/503/504 streaming disconnects as "ambiguous delivery" without blind exponential retries, preventing duplicate conversation turns.',
      context:
        'On mobile cellular networks, dropping an SSE connection while the backend is synthesizing an answer causes standard HTTP clients to execute exponential backoff retries. This duplicates the user\'s message in the database, spawns parallel assistant generation jobs, and corrupts multi-turn conversational context.',
      constraints: [
        'Strict idempotency on user conversation turns',
        'Prevention of ghost messages and duplicate AI responses',
        'Graceful recovery on flaky 3G/4G cellular transitions'
      ],
      chosenApproach: {
        title: 'Ambiguous Delivery State Machine in Mobile ApiService',
        details:
          'When an SSE stream drops with a 5xx status after dispatching payload bytes, the mobile client pauses automatic retries and sets conversation state to `ambiguous_delivery`. The UI offers a "Verify Thread State" or manual "Resend" button, checking the latest message timestamp before re-invoking.',
        codeReference: 'mobile/services/api.ts'
      },
      alternatives: [
        {
          name: 'Blind Exponential Backoff Auto-Retry',
          description: 'Automatically retry failed HTTP POST requests up to 5 times.',
          whyRejectedOrDeferred:
            'Caused severe state duplication: single user prompts produced 2–3 identical assistant replies in database threads.',
          disadvantagesIntroduced: 'Requires occasional manual user click on connection drops.'
        }
      ],
      consequences: {
        positive: [
          '100% elimination of duplicate conversation turns and ghost messages',
          'Prevents thundering-herd retry storms against the backend LLM gateway on server hiccups',
          'Clean state synchronization across mobile reconnects'
        ],
        limitations: [
          'User must occasionally tap "Retry" after severe network dropouts'
        ]
      },
      verification: [
        {
          type: 'test_suite',
          label: 'Mobile Network Resilience Suite',
          location: 'mobile/tests/api_resilience.test.ts',
          measurement: '50 mobile tests passed; 0 duplicate messages recorded on simulated 503 drops'
        }
      ],
      futureRevisitTriggers: [
        'If end-to-end WebSocket bidirectional transport with idempotency keys is adopted'
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // 04. Engineering Design Automation (EDA)
  // --------------------------------------------------------------------------
  'design-automation': [
    {
      id: 'ADR-EDA-01',
      title: 'Complete Exclusion of LLMs from Mechanical Stress & Sizing Calculations',
      status: 'historically_documented',
      category: 'Mechanical & Mathematical',
      summary:
        'Enforced an impenetrable architectural boundary restricting LLMs strictly to natural-language requirement extraction; all physics and math are executed by deterministic Python classes.',
      context:
        'In mechanical engineering, a 10% error in calculated shaft diameter results in a ~33% underestimation of torsional shear stress (since $\\tau = \\frac{16T}{\\pi d^3}$), causing catastrophic physical failure of high-speed industrial machinery. LLMs cannot be trusted with numerical precision, transcendental equations, or unit conversions.',
      constraints: [
        '100% mathematically verifiable calculations conforming to ASME mechanical standards',
        'Zero tolerance for arithmetic hallucination or constant drift',
        'Full unit consistency verification ($N\\cdot m$ to $N\\cdot mm$)'
      ],
      chosenApproach: {
        title: 'Closed-Form Solver Boundary (`ShaftTorsionSolver`)',
        details:
          'The LLM extracts user parameters (power, RPM, material, safety factor) into a strictly typed JSON schema with character span offsets. Downstream physics is computed entirely by `ShaftTorsionSolver`, calculating torque $T = \\frac{P}{\\omega}$, allowable shear stress $\\tau_{\\text{allow}} = \\frac{S_{yt}}{2 \\cdot \\text{FoS}}$, and minimum diameter $d_{\\text{min}} = \\sqrt[3]{\\frac{16T}{\\pi \\tau_{\\text{allow}}}}$.',
        codeReference: 'src/solvers/shaft_torsion.py'
      },
      alternatives: [
        {
          name: 'Chain-of-Thought Few-Shot Prompting for Sizing Math',
          description: 'Prompt frontier LLMs to write out mathematical steps and calculate shaft diameter.',
          whyRejectedOrDeferred:
            'Extensive testing showed LLMs frequently round constants (using $\\pi \\approx 3$), fail cube-root calculations, or drop unit factors ($10^3$ vs $10^6$), producing fatally undersized shafts.',
          disadvantagesIntroduced: 'Requires maintaining formal Python mechanical solver modules.'
        }
      ],
      consequences: {
        positive: [
          'Zero probability of mathematical hallucination: calculations are 100% reproducible and verifiable',
          'Sub-millisecond solver execution latency',
          'Auditable intermediate values: torque, shear stress, and actual factor of safety are recorded'
        ],
        limitations: [
          'Solver supports documented closed-form geometries (circular shafts); complex non-linear FEA requires external software'
        ]
      },
      verification: [
        {
          type: 'test_suite',
          label: 'Automated CAD Mechanical Suite',
          location: 'tests/test_shaft_torsion.py',
          measurement: '424 automated CAD tests passed across parameterized test matrices',
          qualification: 'Validates textbook closed-form equations; does not replace empirical fatigue testing or finite element analysis.'
        },
        {
          type: 'documentation',
          label: 'EDA Architecture ADR 01',
          location: 'research/project-analysis/engineering-design-automation/engineering-decisions.md'
        }
      ],
      futureRevisitTriggers: [
        'If integrating automated FEA meshing engines (e.g. FreeCAD / CalculiX) for non-uniform shaft geometries'
      ]
    },
    {
      id: 'ADR-EDA-02',
      title: 'Anti-Hallucination Material Knowledge Base with Fail-Fast Blocking',
      status: 'historically_documented',
      category: 'Data & RAG',
      summary:
        'Configured the material database to strictly halt with status BLOCKED on ambiguous metal specifications, requiring exact metallurgical grades.',
      context:
        'Users frequently enter vague prompts such as "Design a steel shaft". Generic "steel" ranges from mild structural steel ($S_y \\approx 250\\text{ MPa}$) to quenched alloy steel ($S_y \\approx 800\\text{ MPa}$). An LLM will invent a convenient yield strength, hiding massive real-world safety deficits.',
      constraints: [
        'Zero metallurgical guesswork in safety-critical mechanical design',
        'Explicit provenance for user-overridden material properties',
        'Standardized ISO / AISI material catalog integration'
      ],
      chosenApproach: {
        title: 'Fail-Fast Material Catalog with Explicit Override Tracking',
        details:
          'Submitting generic terms like `"steel"` or `"aluminum"` immediately halts the pipeline with status `BLOCKED` and returns an explicit specification request listing standard grades (`AISI 1045`, `AISI 4140`, `S355J2`). Custom user numerical overrides are permitted but stamped with audit provenance (`"Explicit user override"`).',
        codeReference: 'src/materials/catalog.py'
      },
      alternatives: [
        {
          name: 'Conservative Default Fallback Material',
          description: 'Silently assume lowest-grade mild steel (AISI 1018) when unspecified.',
          whyRejectedOrDeferred:
            'Produced unnecessarily heavy, oversized shafts without user awareness; silent defaults violate engineering transparency.',
          disadvantagesIntroduced: 'Requires user interaction when ambiguous prompts are submitted.'
        }
      ],
      consequences: {
        positive: [
          'Eliminates dangerous metallurgical assumptions in automated mechanical workflows',
          'Educates users on exact material grade significance',
          'Full material provenance recorded in generated STEP metadata'
        ],
        limitations: [
          'Rejects casual, vague queries without explicit user clarification'
        ]
      },
      verification: [
        {
          type: 'test_suite',
          label: 'Material Catalog Validation Suite',
          location: 'tests/test_materials.py',
          measurement: '100% blocking on 14 generic material strings; 100% pass on exact AISI/ISO grades'
        }
      ],
      futureRevisitTriggers: [
        'If composite or non-metallic material specifications (carbon fiber, polymers) are introduced'
      ]
    },
    {
      id: 'ADR-EDA-03',
      title: 'Discrete Nominal Sizing Policy vs Continuous Dimensions',
      status: 'historically_documented',
      category: 'Mechanical & Mathematical',
      summary:
        'Quantized calculated continuous diameters to standard ISO metric bar stock sizes, ensuring actual factor of safety meets or exceeds targets.',
      context:
        'The closed-form solver computes a theoretical continuous minimum diameter (e.g. $d_{\\text{min}} = 15.523\\text{ mm}$). Machining an exact $15.523\\text{ mm}$ cylindrical shaft requires custom turning and grinding, multiplying manufacturing cost.',
      constraints: [
        'Output geometry must be manufacturable using commercially available stock bar sizes',
        'Quantized dimension must guarantee $\\text{FoS}_{\\text{actual}} \\ge \\text{FoS}_{\\text{target}}$',
        'ISO metric standard bar size progression adherence'
      ],
      chosenApproach: {
        title: 'ISO Metric Quantization with Safety Verification',
        details:
          'The calculated continuous minimum diameter is matched against standard metric bar stock series (`[10, 12, 14, 16, 18, 20, 22, 25, 28, 30, 32, 35, 40, 45, 50...]`). The engine selects the next higher standard size and recalculates actual shear stress to verify the final factor of safety exceeds target requirements.',
        codeReference: 'src/solvers/nominal_sizing.py'
      },
      alternatives: [
        {
          name: 'Continuous Floating-Point Dimensions in CAD',
          description: 'Export the raw continuous floating-point diameter directly to STEP solid geometry.',
          whyRejectedOrDeferred:
            'Created non-standard parts that failed industrial manufacturing review and drove up tooling costs.',
          disadvantagesIntroduced: 'Adds slight additional material mass over theoretical minimum.'
        }
      ],
      consequences: {
        positive: [
          'Exported STEP files and SVG drawings are immediately ready for procurement and manufacturing',
          'Guarantees actual factor of safety is strictly greater than user-requested minimum',
          'Standardized keyway and bearing seat compatibility'
        ],
        limitations: [
          'Slight mass penalty when theoretical diameter falls just above a standard nominal threshold'
        ]
      },
      verification: [
        {
          type: 'test_suite',
          label: 'Nominal Sizing Verification Suite',
          location: 'tests/test_nominal_sizing.py',
          measurement: 'Verified 100% compliance across 424 test cases against ISO metric series tables'
        }
      ],
      futureRevisitTriggers: [
        'If imperial inch-standard bar stock catalogs are required for North American manufacturing'
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // 05. OCR Evaluation & Robustness Testing Platform
  // --------------------------------------------------------------------------
  'ocr-evaluator': [
    {
      id: 'ADR-OCR-01',
      title: 'Critical-Field Priority Override vs Global Aggregate Accuracy',
      status: 'historically_documented',
      category: 'Reliability & Testing',
      summary:
        'Enforced strict priority weighting where an extraction failure on a designated CRITICAL field forces an overall evaluation verdict of FAIL, regardless of high global text confidence.',
      context:
        'In legal land deeds and survey registries, an OCR engine can achieve 99.2% overall character accuracy while misrecognizing the single survey plot number (e.g. reading "Plot 108" as "Plot 10B"). In production, this error leads to title dispute litigation, rendering the aggregate accuracy metric completely misleading.',
      constraints: [
        'Zero tolerance for unflagged errors on legal identifiers',
        'Field-level severity tiers (CRITICAL, HIGH, STANDARD)',
        'Calibrated risk classification for automated vs human escalation'
      ],
      chosenApproach: {
        title: 'Tiered Field Priority Evaluation Engine',
        details:
          'Extracted documents are evaluated against field schemas. If any field tagged as `CRITICAL` fails exact or normalized character matching, the document status is clamped to `FAIL`, and the escalation status is flagged as `MANDATORY_HUMAN_REVIEW`, overriding high page-level OCR confidence scores.',
        codeReference: 'backend/app/evaluation/priority_scorer.py'
      },
      alternatives: [
        {
          name: 'Global Aggregate Character Error Rate (CER)',
          description: 'Score documents purely on average CER across all extracted text characters.',
          whyRejectedOrDeferred:
            'Obscured catastrophic errors: an engine with 99.5% CER was deployed despite corrupting critical legal survey numbers.',
          disadvantagesIntroduced: 'Requires pre-defining field schemas for structured document types.'
        }
      ],
      consequences: {
        positive: [
          'Accurately reflects real-world operational and legal risk',
          'Prevents faulty automated straight-through processing on legal contracts',
          'Provides granular field-by-field error visualization'
        ],
        limitations: [
          'Lowers superficial aggregate pass rates on benchmark marketing scorecards'
        ]
      },
      verification: [
        {
          type: 'test_suite',
          label: 'Priority Scorer Backend Suite',
          location: 'backend/tests/test_priority_scorer.py',
          measurement: '134 backend tests passed; 100% critical override compliance verified',
          qualification: 'Verifies structured evaluation schemas; unstructured free-text documents require entity extraction preprocessing.'
        },
        {
          type: 'benchmark',
          label: 'Interactive Evidence Explorer Data',
          location: 'data/evidence/ocrEvaluationData.ts'
        }
      ],
      futureRevisitTriggers: [
        'If transformer layout models (e.g. LayoutLMv3) provide joint visual-textual confidence calibration'
      ]
    },
    {
      id: 'ADR-OCR-02',
      title: '5-Axis Controlled Image Degradation Suite for Empirical Robustness Profiling',
      status: 'historically_documented',
      category: 'Reliability & Testing',
      summary:
        'Constructed a 5-axis image degradation suite applying parameterized physical distortion kernels to identify exact operational breakdown thresholds.',
      context:
        'Testing OCR systems on clean high-resolution scans provides false optimism: deployed systems collapse when users photograph wrinkled deeds with camera blur, uneven lighting, or oblique skew.',
      constraints: [
        'Parameterized degradation along 5 distinct physical distortion axes',
        'Empirical determination of degradation cliff points',
        'Reproducible synthetic distortion pipelines'
      ],
      chosenApproach: {
        title: 'OpenCV / PIL Multi-Axis Degradation Kernel Pipeline',
        details:
          'Documents pass through parameterized kernels across 5 axes: (1) Gaussian Blur ($\\sigma=0.5$ to $4.0$), (2) Additive Gaussian Noise, (3) Rotation Skew ($-15^\\circ$ to $+15^\\circ$), (4) Contrast Attenuation, and (5) JPEG Compression Artifacts (Quality 100 down to 10). Performance curves identify exact breakdown thresholds.',
        codeReference: 'backend/app/degradation/pipeline.py'
      },
      alternatives: [
        {
          name: 'Static Benchmark Scans (e.g. ICDAR / DocVQA)',
          description: 'Evaluate only on public static scan datasets.',
          whyRejectedOrDeferred:
            'Static datasets fail to isolate individual distortion variables, preventing engineers from diagnosing whether failure is caused by blur, skew, or resolution.',
          disadvantagesIntroduced: 'Adds compute overhead to generate synthetic permutation sweeps.'
        }
      ],
      consequences: {
        positive: [
          'Exposes exact operational boundaries (e.g. Tesseract collapses when rotation skew exceeds $4.2^\\circ$)',
          'Guides mobile camera capture guidance (e.g. "hold phone parallel to document")',
          'Enables targeted pre-processing filter development (e.g. auto-deskew prior to OCR)'
        ],
        limitations: [
          'Synthetic Gaussian degradation approximates but does not fully replicate physical coffee stains or crumpled paper folds'
        ]
      },
      verification: [
        {
          type: 'benchmark',
          label: 'Degradation Metric Sweep Matrix',
          location: 'data/evidence/ocrEvaluationData.ts:140-280',
          measurement: 'Documented 5-axis degradation cliff data displayed in interactive explorer'
        }
      ],
      futureRevisitTriggers: [
        'If diffusion-based physical document distortion simulators provide higher photo-realism'
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // 06. Atlas AI — Financial Copilot & SEC Filing RAG
  // --------------------------------------------------------------------------
  'atlas-ai': [
    {
      id: 'ADR-ATL-01',
      title: 'LangGraph Stateful Cyclic Multi-Agent Graph over Linear Chains',
      status: 'historically_documented',
      category: 'Architecture',
      summary:
        'Architected financial research workflows as a stateful cyclic LangGraph coordinating specialized research nodes, dynamic intent routing, and fallback synthesis.',
      context:
        'Financial inquiries require heterogeneous research steps: checking live stock quotes, fetching 10-K risk factors via SEC EDGAR, computing financial ratios, and searching company news. Linear DAG chains fail if any third-party API is rate-limited or returns empty results, aborting the entire user request.',
      constraints: [
        'Resilience to third-party financial API downtime and rate limits',
        'Stateful multi-node context sharing across research steps',
        'Dynamic routing based on intermediate tool outputs'
      ],
      chosenApproach: {
        title: 'LangGraph `StateGraph(AgentState)` with Conditional Edge Routing',
        details:
          'The engine models workflows as a cyclic graph. Specialized nodes (`company_research`, `filing_rag`, `market_data`, `synthesis`) read from and write to a shared typed `AgentState`. Conditional edges route dynamically based on intermediate results; if live quotes fail, the router redirects to filing analysis with a graceful notice.',
        codeReference: 'backend/app/agents/graph.py, backend/app/agents/state.py'
      },
      alternatives: [
        {
          name: 'Linear LangChain Sequential Chain',
          description: 'Execute research tools in a rigid step-by-step sequence.',
          whyRejectedOrDeferred:
            'A failure or timeout on step 2 (e.g. Finnhub API rate limit) caused the entire chain to crash without outputting any helpful SEC filing information.',
          disadvantagesIntroduced: 'Higher initial cognitive and debugging complexity than a linear script.'
        }
      ],
      consequences: {
        positive: [
          'Graceful degradation: partial answers are synthesized even when a secondary data source fails',
          'Modular node architecture: new financial tools can be added without rewriting the router',
          'Full graph execution traceability via LangGraph checkpoints'
        ],
        limitations: [
          'Cyclic graphs require careful loop termination safeguards to prevent runaway tool loops'
        ]
      },
      verification: [
        {
          type: 'test_suite',
          label: 'Atlas AI Automated Pytest Suite',
          location: 'backend/tests/test_graph.py',
          measurement: '178/178 tests passed in 3.19s covering all conditional graph transitions',
          qualification: 'Validated across mocked API fixtures; real network execution subject to third-party rate limits.'
        },
        {
          type: 'documentation',
          label: 'Forensic Evidence Audit: Atlas AI',
          location: 'research/project-analysis/atlas-ai/evidence-audit.md:17-28'
        }
      ],
      futureRevisitTriggers: [
        'If migrating to distributed multi-agent actor frameworks (e.g. Ray / AutoGen) for parallel portfolio simulation'
      ]
    },
    {
      id: 'ADR-ATL-02',
      title: 'Telegram-First Interface with Native Multimodal Voice/Vision Ingestion',
      status: 'historically_documented',
      category: 'Architecture',
      summary:
        'Focused the user experience entirely on a Telegram bot interface integrating Whisper voice transcription and Gemini Vision chart analysis rather than building a desktop web app.',
      context:
        'Active retail investors monitor portfolios on mobile devices while traveling. Building a complex desktop web dashboard introduces authentication friction, desktop session management, and lacks native push notification infrastructure for critical price alerts.',
      constraints: [
        'Immediate mobile push notification delivery for price and SEC filing alerts',
        'Multimodal inputs: voice memos and chart screenshots uploaded from phones',
        'Rapid deployment without frontend UI development overhead'
      ],
      chosenApproach: {
        title: 'FastAPI Webhook Integration with `python-telegram-bot`',
        details:
          'Atlas AI interacts exclusively through Telegram. Audio voice notes are routed to Whisper transcription; chart photos are processed by Gemini Vision; market alerts are pushed directly to user chats via asynchronous bot workers.',
        codeReference: 'backend/app/api/routes/telegram.py, backend/app/services/telegram.py'
      },
      alternatives: [
        {
          name: 'Responsive Next.js Web Dashboard',
          description: 'Build a standard React web portal with charting libraries and authentication.',
          whyRejectedOrDeferred:
            'Required substantial UI frontend effort while failing to provide reliable background push notifications on iOS without complex native app store publishing.',
          disadvantagesIntroduced: 'UI is constrained to Telegram\'s messaging components and inline keyboards.'
        }
      ],
      consequences: {
        positive: [
          'Instant mobile accessibility with zero app store friction',
          'Native support for voice memos, chart photo uploads, and real-time push alerts',
          'Backend development focus remained 100% on financial RAG and agent graph reliability'
        ],
        limitations: [
          'No complex multi-pane desktop charting or financial data spreadsheet views'
        ]
      },
      verification: [
        {
          type: 'source_code',
          label: 'Telegram Message Normalizer & Webhook Handler',
          location: 'backend/app/services/message_normalizer.py'
        },
        {
          type: 'documentation',
          label: 'Evidence Audit Interface Verification',
          location: 'research/project-analysis/atlas-ai/evidence-audit.md:15-16'
        }
      ],
      futureRevisitTriggers: [
        'If institutional users require tabular financial model export into desktop Excel / web tables'
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // 07. VM Copy Question Generator
  // --------------------------------------------------------------------------
  'vm-copy': [
    {
      id: 'ADR-VM-01',
      title: 'Tier-1 Client-Side Deterministic Evaluator Before Human or Second-Model Review',
      status: 'historically_documented',
      category: 'Reliability & Testing',
      summary:
        'Implemented a zero-cost, zero-latency TypeScript validation layer enforcing hard structural invariants immediately after JSON parsing.',
      context:
        'Generative LLM completions frequently suffer from subtle structural bugs: generating 3 or 5 options instead of 4, failing to flag any option as correct, emitting duplicate distractor texts, or omitting explanations. Using an LLM critic to catch these adds 2–4s latency and burns tokens.',
      constraints: [
        'Zero API cost for structural validation',
        'Sub-millisecond execution latency',
        'Strict TEKS curriculum option invariants (4 options, exactly 1 correct answer)'
      ],
      chosenApproach: {
        title: 'Pure TypeScript Invariant Evaluator (`eval-layer.ts`)',
        details:
          'The client/server boundary executes `eval-layer.ts` immediately upon receiving model output. It validates: (1) option count $= 4$, (2) $|\\text{CA}| = 1$, (3) set-based duplicate distractor text check, (4) non-empty rationales, and (5) regex check on mathematical formatting.',
        codeReference: 'lib/eval-layer.ts'
      },
      alternatives: [
        {
          name: 'Secondary LLM Reviewer / Critic Prompt',
          description: 'Pass the generated question to another LLM to verify format and correctness.',
          whyRejectedOrDeferred:
            'Doubled API token costs, added 3s of latency per question, and itself hallucinated false passes on duplicate options.',
          disadvantagesIntroduced: 'Validates structural rules only; cannot independently verify advanced mathematical proofs.'
        }
      ],
      consequences: {
        positive: [
          'Flawed generations are flagged instantly with specific actionable error messages',
          'Zero additional API expenditure or network latency incurred',
          'Completely eliminated malformed 3-option or multi-correct items from human SME queues'
        ],
        limitations: [
          'Cannot verify whether a complex calculus derivation is pedogogically sound'
        ]
      },
      verification: [
        {
          type: 'source_code',
          label: 'Deterministic Evaluation Layer',
          location: 'lib/eval-layer.ts:15-95'
        },
        {
          type: 'documentation',
          label: 'VM Copy ADR 01',
          location: 'research/project-analysis/vm-copy/engineering-decisions.md:3-11'
        }
      ],
      futureRevisitTriggers: [
        'If expanding to multi-select or open-ended mathematical essay formats'
      ]
    },
    {
      id: 'ADR-VM-02',
      title: 'Parallel Micro-Batch Splitting to Eliminate Serverless Timeouts',
      status: 'historically_documented',
      category: 'Performance & Scale',
      summary:
        'Partitioned requests for 5–10 question variants into concurrent micro-batches of 2–3 questions dispatched via Promise.all, eliminating 30s serverless gateway timeouts.',
      context:
        'When curriculum authors request batches of 5 to 10 question copies, asking an LLM to generate all 10 in a single completion causes response latency to surge past 35–45 seconds, frequently triggering HTTP 504 gateway timeouts on Vercel and serverless proxies (15s/30s limits).',
      constraints: [
        'Serverless platform execution timeout ceiling (30s maximum)',
        'Rapid authoring cycle time (<10 seconds total batch wait)',
        'Maintenance of question diversity across parallel completions'
      ],
      chosenApproach: {
        title: 'Micro-Batch Partitioning with Concurrent Resolution (`calculateBatches`)',
        details:
          'The batch coordinator splits the requested volume into parallel chunks of 2–3 items (`calculateBatches(numQuestions)`), executing them concurrently via `Promise.all`. The results are aggregated, validated, and returned in a unified response.',
        codeReference: 'lib/batch-coordinator.ts:calculateBatches'
      },
      alternatives: [
        {
          name: 'Monolithic Single-Prompt Batch Generation',
          description: 'Request all 10 variants in a single large prompt completion.',
          whyRejectedOrDeferred:
            'Triggered 504 gateway timeouts; model attention degraded on later items, generating repetitive distractors.',
          disadvantagesIntroduced: 'Requires higher instantaneous concurrent API rate limit allowances.'
        }
      ],
      consequences: {
        positive: [
          'Total batch latency is bounded by the duration of generating ~2 questions (~5–7s total)',
          'Completely eliminated HTTP 504 serverless gateway timeout errors',
          'Higher distractor diversity across independently prompted micro-batches'
        ],
        limitations: [
          'Consumes concurrent rate limit quotas faster than sequential generation'
        ]
      },
      verification: [
        {
          type: 'source_code',
          label: 'Batch Splitting Implementation',
          location: 'lib/batch-coordinator.ts'
        },
        {
          type: 'documentation',
          label: 'VM Copy ADR 02',
          location: 'research/project-analysis/vm-copy/engineering-decisions.md:13-17'
        }
      ],
      futureRevisitTriggers: [
        'If migrating to persistent background workers with streaming WebSockets'
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // 08. AI Worksheets Product POC
  // --------------------------------------------------------------------------
  'ai-worksheets': [
    {
      id: 'ADR-WS-01',
      title: 'Externalized Headless LaTeX/TikZ Compilation for Geometric Figures',
      status: 'historically_documented',
      category: 'Mechanical & Mathematical',
      summary:
        'Decoupled diagram generation into an LLM TikZ code generator compiled via a local headless pdflatex subprocess, replacing generative image diffusion.',
      context:
        'Generative image diffusion models (DALL-E, Midjourney, Stable Diffusion) fail catastrophically on math worksheets: numbers along coordinate axes are garbled, lines fail to meet at exact vertices, and geometric angle arcs are physically incorrect.',
      constraints: [
        'Sub-millimeter mathematical accuracy for angles, coordinate planes, and geometric proofs',
        'Crisp 300-DPI print-ready raster resolution',
        'Subprocess execution timeouts to prevent LaTeX compiler infinite loops'
      ],
      chosenApproach: {
        title: 'Two-Stage TikZ Code Generation and Headless `pdflatex` Compilation',
        details:
          'The LLM writes clean LaTeX TikZ/PGFPlots code defining exact coordinates and mathematical equations. The backend compiles the code using a sandboxed `pdflatex` subprocess and converts the vector output to a 300-DPI PNG via `pdftoppm`.',
        codeReference: 'backend/app/services/tikz_compiler.py'
      },
      alternatives: [
        {
          name: 'Text-to-Image Diffusion Models',
          description: 'Prompt generative image models to draw geometric diagrams.',
          whyRejectedOrDeferred:
            'Produced non-mathematical, distorted illustrations with unreadable labels and incorrect angles.',
          disadvantagesIntroduced: 'Requires installing TeX Live and Poppler binaries in the server container.'
        }
      ],
      consequences: {
        positive: [
          'Textbook-grade mathematical rendering precision for geometry, graphs, and number lines',
          'Print-ready high-resolution vector and raster assets',
          'Full auditability: TikZ source code can be inspected and manually adjusted'
        ],
        limitations: [
          'Increases container image size by ~1.2 GB to accommodate TeX Live packages',
          'Requires timeout guards against runaway LaTeX macro expansions'
        ]
      },
      verification: [
        {
          type: 'source_code',
          label: 'TikZ Subprocess Compiler & Caching Layer',
          location: 'backend/app/services/tikz_compiler.py'
        },
        {
          type: 'documentation',
          label: 'AI Worksheets ADR 01',
          location: 'research/project-analysis/ai-worksheets/engineering-decisions.md:3-7'
        }
      ],
      futureRevisitTriggers: [
        'If client-side WebAssembly TikZ compilers (e.g. TikZJax) achieve complete desktop font fidelity'
      ]
    },
    {
      id: 'ADR-WS-02',
      title: 'Algorithmic Backtracking Grid Placement over Generative 2D Layout',
      status: 'historically_documented',
      category: 'Mechanical & Mathematical',
      summary:
        'Treated crossword grid layout as a deterministic constraint satisfaction problem solved by recursive backtracking in Python, eliminating generative hallucinations.',
      context:
        'LLMs cannot solve 2D spatial collision constraints in crossword grids. They hallucinate coordinate intersections, placing words that do not share intersecting letters or creating invalid adjacent collisions.',
      constraints: [
        '100% physically valid crossword grid layouts without letter mismatches',
        'Zero adjacent unkeyed collisions',
        'Optimized bounding box density for printable letter-size paper'
      ],
      chosenApproach: {
        title: 'Deterministic Backtracking Grid Builder (`builder.py`)',
        details:
          'The LLM only generates validated word-clue pairs. Grid construction is executed entirely by a Python constraint solver (`builder.py`) using recursive backtracking, checking bounding boxes, collision buffers, and intersection density scores.',
        codeReference: 'backend/app/puzzles/crossword/builder.py'
      },
      alternatives: [
        {
          name: 'LLM ASCII/JSON Grid Generation',
          description: 'Prompt an LLM to output a 2D matrix representing the crossword grid.',
          whyRejectedOrDeferred:
            '100% of LLM-generated crossword grids contained intersecting letter contradictions or illegal parallel collisions.',
          disadvantagesIntroduced: 'Requires custom algorithmic solver implementation.'
        }
      ],
      consequences: {
        positive: [
          'Guarantees 100% valid crossword grid geometry with zero letter collisions',
          'Sub-100ms solver execution latency',
          'Deterministic layout output suitable for PDF generation'
        ],
        limitations: [
          'May fail to place all words if the vocabulary set lacks compatible intersecting letters'
        ]
      },
      verification: [
        {
          type: 'source_code',
          label: 'Crossword Grid Backtracking Solver',
          location: 'backend/app/puzzles/crossword/builder.py:45-120'
        },
        {
          type: 'documentation',
          label: 'AI Worksheets ADR 03',
          location: 'research/project-analysis/ai-worksheets/engineering-decisions.md:16-20'
        }
      ],
      futureRevisitTriggers: [
        'If Integer Linear Programming (ILP) solvers are introduced for maximum word-density puzzles'
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // 09. Curriculum Transformation Engine
  // --------------------------------------------------------------------------
  'curriculum-etl': [
    {
      id: 'ADR-ETL-01',
      title: 'Dynamic Schema Derivation from Sample CSV Transformation Contracts',
      status: 'historically_documented',
      category: 'Architecture',
      summary:
        'Inverted ETL parsing architecture by treating an approved 10-line sample CSV as a dynamic transformation contract to generate runtime Pydantic validation models.',
      context:
        'Every US state and international authority structures educational frameworks with radically different taxonomies: Texas TEKS uses Strands and Knowledge & Skill Statements; California uses Domains and Clusters; Australia uses Strands and Sub-strands. Writing bespoke parsers for all 50 states creates an unmaintainable codebase of brittle regex scripts.',
      constraints: [
        'Support 50 US state curriculum frameworks without writing bespoke Python parsers',
        'Strict structural validation against state-approved export formats',
        'Zero code releases required to onboard new educational jurisdictions'
      ],
      chosenApproach: {
        title: 'Dynamic Pydantic Model Generation from Sample CSV Headers',
        details:
          'The engine ingests an approved 10-line sample CSV (`schemas.py`), introspecting columns, hierarchy levels (`l1` through `l5`), and sample values. It dynamically synthesizes a Pydantic model at runtime that validates LLM extraction outputs for that specific framework.',
        codeReference: 'src/pipeline/schemas.py'
      },
      alternatives: [
        {
          name: 'Hardcoded Per-State Parser Scripts',
          description: 'Write dedicated Python modules for each state curriculum framework.',
          whyRejectedOrDeferred:
            'Required continuous engineering updates whenever a state board adjusted standard code formatting.',
          disadvantagesIntroduced: 'Requires providing an accurate 10-line sample CSV before processing a state.'
        }
      ],
      consequences: {
        positive: [
          'Onboarding a new state curriculum requires zero Python code changes—only an approved sample CSV',
          'Dynamic Pydantic validation guarantees structural compliance at ingress',
          'Eliminated hundreds of brittle per-state regex parsing scripts'
        ],
        limitations: [
          'Sample CSV must accurately represent all possible hierarchy depths of the target framework'
        ]
      },
      verification: [
        {
          type: 'test_suite',
          label: 'Curriculum ETL Automated Test Suite',
          location: 'tests/test_schemas.py',
          measurement: '124 automated pipeline tests passed across TEKS, CCSS, and international samples',
          qualification: 'Validates structural schema derivation; semantic accuracy requires post-extraction audit.'
        },
        {
          type: 'documentation',
          label: 'Curriculum ETL ADR 01',
          location: 'research/project-analysis/curriculum-etl/engineering-decisions.md:3-7'
        }
      ],
      futureRevisitTriggers: [
        'If state curriculum boards publish machine-readable JSON-LD / CASE standard APIs directly'
      ]
    },
    {
      id: 'ADR-ETL-02',
      title: 'Merged Evaluate-and-Fix Single-Pass Review to Prevent Provider Deadlocks',
      status: 'historically_documented',
      category: 'Performance & Scale',
      summary:
        'Consolidated a two-stage reviewer and critic pipeline into a unified single-pass prompt producing EvaluateAndFixResult, halving token spend and eliminating rate-limit hangs.',
      context:
        'Early pipeline revisions split validation into two sequential LLM calls: an evaluator detecting errors and a critic deciding whether to repair or reject. On large batches (1,000+ rows), this doubled latency and frequently hung on provider 5xx rate limits.',
      constraints: [
        '50% reduction in per-row LLM token expenditure',
        'Elimination of multi-agent rate limit deadlocks on 1,000+ row batches',
        'Preservation of granular audit verdict and repair logging'
      ],
      chosenApproach: {
        title: 'Single-Pass Unified Evaluation & Repair (`EvaluateAndFixResult`)',
        details:
          'Commit `252d06f` merged evaluation and repairing into a single prompt completion that outputs `EvaluateAndFixResult`, containing the pass/fail verdict, detected errors, and corrected values simultaneously.',
        codeReference: 'src/pipeline/stages/review.py, Commit 252d06f'
      },
      alternatives: [
        {
          name: 'Decoupled Two-Agent Evaluator-Critic Pipeline',
          description: 'Retain separate LLM calls for evaluation and correction.',
          whyRejectedOrDeferred:
            'Doubled API spend and caused inter-agent deadlocks when rate-limited during high-volume batch processing.',
          disadvantagesIntroduced: 'Slightly more complex prompt instruction structure.'
        }
      ],
      consequences: {
        positive: [
          'Cut pipeline verification latency and token expenditure by 50%',
          'Completely resolved inter-model rate-limit deadlocks during large batch runs',
          'Maintained full audit logging of all applied corrections'
        ],
        limitations: [
          'A single LLM pass performs both detection and correction, reducing adversarial separation'
        ]
      },
      verification: [
        {
          type: 'commit',
          label: 'Git Evolution Commit 252d06f',
          location: 'git show 252d06f --stat',
          measurement: 'Recorded commit message: "Fix hangs and provider 5xx handling; merge review+critic"'
        },
        {
          type: 'documentation',
          label: 'Curriculum ETL ADR 02',
          location: 'research/project-analysis/curriculum-etl/engineering-decisions.md:8-12'
        }
      ],
      futureRevisitTriggers: [
        'If smaller, specialized fine-tuned models allow decoupled stages without latency penalties'
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // 10. US Mathematics Item Bank Generation Pipeline
  // --------------------------------------------------------------------------
  'math-item-bank': [
    {
      id: 'ADR-MIB-01',
      title: 'Stateful Cyclic Agentic Graphs over Linear LLM Chains',
      status: 'historically_documented',
      category: 'Architecture',
      summary:
        'Modeled item bank generation as a stateful cyclic agent graph with targeted feedback routing, preserving valid partial work when individual components fail review.',
      context:
        'Standardized math item generation requires items to satisfy multiple orthogonal constraints: grade level, subskill standard, Depth of Knowledge (DOK 1-3), answer exclusivity, and visual diagram accuracy. Linear DAG chains fail if any intermediate step is slightly off-target: the entire pipeline must either crash or restart from scratch, wasting tokens.',
      constraints: [
        'Preservation of valid partial work (e.g. good word problem, flawed distractor)',
        'Targeted context routing back to specific defective nodes',
        'Support for complex multi-stage psychometric item validation'
      ],
      chosenApproach: {
        title: 'Cyclic State Machine with Targeted Feedback Loops',
        details:
          'When an item fails visual review or distractor logic, the state machine routes the failure context specifically back to the relevant node (e.g. back to Generator with reviewer feedback) rather than aborting the entire item pipeline.',
        codeReference: 'src/graphs/item_generation_graph.py'
      },
      alternatives: [
        {
          name: 'Linear Sequential Pipeline (DAG)',
          description: 'Process items through a fixed sequential chain of prompts.',
          whyRejectedOrDeferred:
            'A distractor flaw on step 4 forced the entire question to be discarded, wasting tokens spent on steps 1–3.',
          disadvantagesIntroduced: 'Requires managing state transitions and loop termination counters.'
        }
      ],
      consequences: {
        positive: [
          'Re-generation costs are localized strictly to defective components',
          'Item convergence rate increased significantly on complex multi-step problems',
          'Full state history preserved for psychometric audit trails'
        ],
        limitations: [
          'Requires bounded retry budgets to prevent infinite cycles on contradictory constraints'
        ]
      },
      verification: [
        {
          type: 'documentation',
          label: 'US Math Item Bank Architecture Rationale',
          location: 'research/project-analysis/math-item-bank/engineering-decisions.md:5-8'
        }
      ],
      futureRevisitTriggers: [
        'If multi-modal vision-language models achieve zero-shot diagram generation without separate review nodes'
      ]
    },
    {
      id: 'ADR-MIB-02',
      title: 'Integer Linear Programming (ILP) Stratification for Psychometric Distribution',
      status: 'historically_documented',
      category: 'Mechanical & Mathematical',
      summary:
        'Applied Integer Linear Programming optimization across candidate pools to satisfy global Depth of Knowledge and standard distributions within tight variance bounds.',
      context:
        'Generating items at scale causes natural distribution skew: LLMs over-generate easy DOK-1 arithmetic items and under-generate complex DOK-3 multi-step word problems. Prompting alone cannot balance a global statistical distribution across thousands of items.',
      constraints: [
        'Strict psychometric exam blueprint distribution quotas',
        'Global DOK-1 / DOK-2 / DOK-3 allocation within $\\pm 1.5\\%$ variance',
        'Even coverage across all curriculum standards without manual curation'
      ],
      chosenApproach: {
        title: 'Integer Linear Programming Min/Max Swap Optimization',
        details:
          'Item selection is formulated as an Integer Linear Programming optimization problem. The optimizer executes Min/Max swap logic across candidate pools, selecting active test form items until global distribution constraints are satisfied within a tight $\\pm 1.5\\%$ variance window.',
        codeReference: 'src/optimization/ilp_stratification.py'
      },
      alternatives: [
        {
          name: 'Quota-Based Rejection Sampling During Generation',
          description: 'Stop generating DOK-1 items once the quota is reached and prompt only for DOK-3.',
          whyRejectedOrDeferred:
            'Prompting models exclusively for DOK-3 led to degraded item quality and repetitive problem templates.',
          disadvantagesIntroduced: 'Requires generating an over-provisioned candidate pool before optimization.'
        }
      ],
      consequences: {
        positive: [
          'Guarantees psychometrically balanced item distributions matching exam blueprint specifications',
          'Eliminates manual human curation of exam form difficulty balances',
          'Mathematically verified constraint compliance'
        ],
        limitations: [
          'Cannot operate on single-item real-time streaming requests: requires batch candidate pooling'
        ]
      },
      verification: [
        {
          type: 'documentation',
          label: 'Item Bank ILP Rationale',
          location: 'research/project-analysis/math-item-bank/engineering-decisions.md:13-15'
        }
      ],
      futureRevisitTriggers: [
        'If adaptive computer-based testing engines replace static exam form blueprints'
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // 11. Loom AI — B2B Textile Marketplace Platform
  // --------------------------------------------------------------------------
  'loom-ai': [
    {
      id: 'ADR-LOOM-01',
      title: 'LangGraph Supervisor Architecture with Typed Channel Reducers',
      status: 'historically_documented',
      category: 'Architecture',
      summary:
        'Organized B2B procurement workflows into a supervisor-worker LangGraph architecture routing requests to specialized sub-agents based on user role and procurement phase.',
      context:
        'B2B textile commerce involves complex, divergent business logic: buyers search fabrics by GSM and weave; suppliers track loom inventory; procurement officers negotiate volume RFQs. A single monolithic agent prompt becomes unmaintainable and frequently confuses buyer and supplier permissions.',
      constraints: [
        'Strict role-based separation between Buyer and Supplier operations',
        'Modular sub-agent development and testability',
        'Deterministic state updates via LangGraph channel reducers'
      ],
      chosenApproach: {
        title: 'LangGraph `SupervisorGraph` with Typed State Reducers',
        details:
          'The architecture implements a supervisor agent (`SupervisorGraph.ts`) that analyzes user role and intent, routing inquiries to specialized workflows (`MarketplaceWorkflow`, `BuyerProcurementWorkflow`) using typed channel reducers to prevent unauthorized cross-channel state mutation.',
        codeReference: 'backend/src/ai/graphs/SupervisorGraph.ts, backend/src/ai/graphs/AgentGraphBuilder.ts'
      },
      alternatives: [
        {
          name: 'Monolithic Single-Prompt Chatbot',
          description: 'Handle all buyer and supplier inquiries in one large prompt with multiple tool definitions.',
          whyRejectedOrDeferred:
            'Prompt size exceeded budget; model frequently hallucinated supplier inventory editing capabilities during buyer sessions.',
          disadvantagesIntroduced: 'Higher initial structural code volume across agent graph definitions.'
        }
      ],
      consequences: {
        positive: [
          'Clean architectural separation between buyer procurement and catalog exploration',
          'Enforces role-based permissions at the agent routing layer',
          'Sub-agents can be developed, tested, and mocked independently'
        ],
        limitations: [
          'Sub-agents for negotiation and supplier advisory currently operate with mocked prototypes'
        ]
      },
      verification: [
        {
          type: 'source_code',
          label: 'Supervisor Graph Implementation',
          location: 'backend/src/ai/graphs/SupervisorGraph.ts:25-95'
        },
        {
          type: 'documentation',
          label: 'Forensic Evidence Audit: Loom AI',
          location: 'research/project-analysis/loom-ai/evidence-audit.md:17-21'
        }
      ],
      futureRevisitTriggers: [
        'If implementing production multi-party negotiation sub-agents with live ERP integration'
      ]
    },
    {
      id: 'ADR-LOOM-02',
      title: 'Human-in-the-Loop Approval Queue for Consequential Inventory Actions',
      status: 'historically_documented',
      category: 'Security & Governance',
      summary:
        'Implemented an in-memory ApprovalQueue staging all mutating commerce actions (e.g. inventory adjustments, RFQ issuance) for explicit human sign-off.',
      context:
        'In B2B wholesale commerce, actions carry substantial financial consequences: creating bulk orders, altering inventory counts, or agreeing to wholesale pricing. Permitting an AI agent to execute these mutations autonomously introduces unacceptable commercial liability.',
      constraints: [
        'Zero autonomous financial commitments or inventory mutations',
        'Structured display of proposed action parameters for user review',
        'Audit trail of approval tokens'
      ],
      chosenApproach: {
        title: 'Staged Human Approval Queue (`ApprovalQueue.ts`)',
        details:
          'When sub-agents propose a mutating action (`auto_restock`, `issue_rfq`), the request is enqueued into `ApprovalQueue.ts`. The UI surfaces an interactive approval card displaying parameters and diffs. The mutation is executed only upon receiving an authorized user confirmation token.',
        codeReference: 'backend/src/ai/orchestration/ApprovalQueue.ts'
      },
      alternatives: [
        {
          name: 'Autonomous Action Execution with Threshold Confidence',
          description: 'Execute inventory actions automatically if model confidence exceeds 98%.',
          whyRejectedOrDeferred:
            'Violated Level 1 Agentic System Safety standard; model confidence does not guarantee business authorization.',
          disadvantagesIntroduced: 'Requires manual human approval step for inventory workflows.'
        }
      ],
      consequences: {
        positive: [
          'Guarantees human oversight and accountability for all inventory and purchasing commitments',
          'Protects enterprise database from unintended AI-induced state corruption',
          'Full audit log of approver identity and timestamp'
        ],
        limitations: [
          'Cannot support unattended autonomous inventory reordering'
        ]
      },
      verification: [
        {
          type: 'source_code',
          label: 'Approval Queue Module',
          location: 'backend/src/ai/orchestration/ApprovalQueue.ts:15-70'
        },
        {
          type: 'documentation',
          label: 'Evidence Audit HITL Verification',
          location: 'research/project-analysis/loom-ai/evidence-audit.md:40-42'
        }
      ],
      futureRevisitTriggers: [
        'If low-value micro-purchases (<$50) are authorized under pre-approved enterprise rules'
      ]
    }
  ]
}

