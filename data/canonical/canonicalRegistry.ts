/**
 * CANONICAL KNOWLEDGE REGISTRY
 *
 * The single, authoritative, normalized data foundation for the engineering portfolio.
 * Encapsulates career chronology, project attribution, evidence provenance,
 * technical claims, and programmatic governance rules.
 *
 * Standards Compliance: Phase 0 & Phase 1 Approved Factual Baseline
 */

import {
  CanonicalRegistry,
  CanonicalCareerRecord,
  CanonicalProjectRecord,
  CanonicalEvidenceRecord,
  CanonicalTechnicalClaimRecord,
  CanonicalCaseStudyReference,
  CanonicalAdrReference,
  CaseStudyId,
  AdrId
} from './canonicalSchema'

// ============================================================================
// 1. CANONICAL CAREER & EMPLOYMENT RECORDS
// ============================================================================

export const canonicalCareerRecords: CanonicalCareerRecord[] = [
  {
    careerId: 'car-graveiens',
    phaseId: 'PHASE_1_MATHEMATICS_CONTENT_FOUNDATIONS',
    organization: 'Graveiens Eduservices Pvt. Ltd.',
    organizationType: 'AGENCY',
    formalDesignation: 'Advanced Math Content Developer',
    employmentType: 'CONTRACT_FREELANCE',
    location: 'Remote',
    employmentPeriod: {
      start: {
        dateString: '2021-05',
        precision: 'month',
        confirmationStatus: 'INDEPENDENTLY_VERIFIED',
        boundaryType: 'EXACT_BOUNDARY',
        annotation: 'Contract start verified from authoritative resume PDF.'
      },
      end: {
        dateString: '2021-10',
        precision: 'month',
        confirmationStatus: 'INDEPENDENTLY_VERIFIED',
        boundaryType: 'INTERVAL_OVERLAP',
        annotation: 'October 2021 co-occurrence represents month-level interval overlap with InhaltMart at recorded precision; exact day-level dates and simultaneous real-world activity are unevidenced.'
      }
    },
    formalScopeSummary:
      'Authored original advanced K–12 mathematics questions and step-by-step textbook solutions using Brainly CMS, GeoGebra, and Desmos.',
    verifiedResponsibilities: [
      'Authored advanced K–12 mathematics solutions adhering to US state and Common Core curricula.',
      'Constructed dynamic geometric and algebraic plots using GeoGebra, Desmos, and Mathcha.io.',
      'Identified learner pedagogy bottlenecks and structured pedagogical solution steps.'
    ],
    associatedProjectIds: [],
    evidenceIds: ['EVID-DOC-RESUME-01']
  },
  {
    careerId: 'car-inhaltmart',
    phaseId: 'PHASE_1_MATHEMATICS_CONTENT_FOUNDATIONS',
    organization: 'InhaltMart Educational Services Pvt. Ltd.',
    organizationType: 'AGENCY',
    formalDesignation: 'Subject Matter Expert (Mathematics)',
    employmentType: 'CONTRACT_FREELANCE',
    location: 'Remote',
    employmentPeriod: {
      start: {
        dateString: '2021-10',
        precision: 'month',
        confirmationStatus: 'INDEPENDENTLY_VERIFIED',
        boundaryType: 'INTERVAL_OVERLAP',
        annotation: 'October 2021 co-occurrence represents month-level interval overlap with Graveiens at recorded precision; exact day-level dates and simultaneous real-world activity are unevidenced.'
      },
      end: {
        dateString: '2022-02',
        precision: 'month',
        confirmationStatus: 'INDEPENDENTLY_VERIFIED',
        boundaryType: 'EXACT_BOUNDARY',
        annotation: 'Approved end date is February 2022 per resume PDF; prior mention of Dec 2021 was an erratum.'
      }
    },
    formalScopeSummary:
      'Authored structured mathematics questions and rigorous explanations using MathType, LaTeX, and TI-83 graphing calculators.',
    verifiedResponsibilities: [
      'Typeset complex mathematical proofs and algebraic equations using MathType and LaTeX syntax.',
      'Programmed TI-83 calculator graphing solutions for algebraic and calculus models.',
      'Performed plagiarism auditing and content integrity checks across assessment pools.'
    ],
    associatedProjectIds: [],
    evidenceIds: ['EVID-DOC-RESUME-01']
  },
  {
    careerId: 'car-digipplus',
    phaseId: 'PHASE_1_MATHEMATICS_CONTENT_FOUNDATIONS',
    organization: 'DIGIPPLUS',
    organizationType: 'AGENCY',
    formalDesignation: 'QA/QC Specialist',
    employmentType: 'CONTRACT_AGENCY',
    location: 'Remote',
    employmentPeriod: {
      start: {
        dateString: '2022-06',
        precision: 'month',
        confirmationStatus: 'INDEPENDENTLY_VERIFIED',
        boundaryType: 'EXACT_BOUNDARY',
        annotation: 'Approved start date is June 2022 per resume PDF; July 2022 in experience.ts was a typo.'
      },
      end: {
        dateString: '2022-09',
        precision: 'month',
        confirmationStatus: 'INDEPENDENTLY_VERIFIED',
        boundaryType: 'TRANSITION_WINDOW',
        annotation: 'September 2022 marks conclusion of agency QA work and transition into independent discipline.'
      }
    },
    formalScopeSummary:
      'Executed systematic quality assurance, mathematical correctness audits, distractor validation, and copyright verification on K–10 mathematics items.',
    verifiedResponsibilities: [
      'Audited K–10 mathematics items for mathematical validity, distractor effectiveness, and formatting.',
      'Conducted originality verification and copyright integrity checks across assessment pools.',
      'Validated alignment with educational standards and structured rubrics.'
    ],
    associatedProjectIds: [],
    evidenceIds: ['EVID-DOC-RESUME-01']
  },
  {
    careerId: 'car-independent-quantitative',
    phaseId: 'PHASE_2_INDEPENDENT_QUANTITATIVE_DISCIPLINE',
    organization: 'Self-Directed Engineering & Quantitative Research',
    organizationType: 'SELF_DIRECTED',
    formalDesignation: 'Independent Quantitative Researcher',
    employmentType: 'INDEPENDENT_RESEARCH',
    location: 'Varanasi, India',
    employmentPeriod: {
      start: {
        dateString: '2022-09',
        precision: 'month',
        confirmationStatus: 'USER_CONFIRMED',
        boundaryType: 'TRANSITION_WINDOW',
        annotation: 'September 2022 transition from agency QA employment to intensive independent quantitative foundations.'
      },
      end: {
        dateString: '2023-12',
        precision: 'month',
        confirmationStatus: 'USER_CONFIRMED',
        boundaryType: 'EXACT_BOUNDARY',
        annotation: 'Concluded in December 2023 prior to joining Wayground in January 2024.'
      }
    },
    formalScopeSummary:
      'Intensive independent study of higher mathematics, computational logic, formal proofs, and structured algorithmic reasoning.',
    verifiedResponsibilities: [
      'Mastered advanced linear algebra, multivariable calculus, and discrete mathematical structures.',
      'Built algorithmic problem-solving intuition and formal proof verification skills.',
      'Developed computational foundations later applied to CAD kernels and deterministic AI guardrails.'
    ],
    associatedProjectIds: [],
    evidenceIds: ['EVID-DOC-RESUME-01']
  },
  {
    careerId: 'car-wayground-math-sme',
    phaseId: 'PHASE_3_WAYGROUND_MATHEMATICS_SME',
    organization: 'Wayground Inc (Quizizz)',
    organizationType: 'ENTERPRISE',
    formalDesignation: 'Subject Matter Expert — Mathematics',
    employmentType: 'FULL_TIME_SALARIED',
    location: 'Bengaluru, India (Remote)',
    employmentPeriod: {
      start: {
        dateString: '2024-01',
        precision: 'month',
        confirmationStatus: 'INDEPENDENTLY_VERIFIED',
        boundaryType: 'EXACT_BOUNDARY'
      },
      end: {
        dateString: '2025-12',
        precision: 'month',
        confirmationStatus: 'INDEPENDENTLY_VERIFIED',
        boundaryType: 'EXACT_BOUNDARY',
        annotation: 'Role concluded in December 2025; transitioned to AI/ML Team in January 2026.'
      }
    },
    formalScopeSummary:
      'Curriculum validation, mathematics quality assurance, and internal authoring tool enhancement for high-volume US Common Core & TEKS mathematics products.',
    verifiedResponsibilities: [
      'Reviewed and validated 1,200+ interactive mathematics questions for mathematical rigor and pedagogical validity.',
      'Conducted continuous functional feedback, bug reporting, and SME usability audits on VoyageMath Content Builder V1 (software engineered by Wayground Engineering team).',
      'Conceived and personally implemented VM Copy (Oct–mid-Nov 2025), a deterministic question generator adopted for team use in November 2025.'
    ],
    transitionContext: {
      boundaryType: 'EXACT_BOUNDARY',
      transitionNote:
        'Conceived and developed VM Copy between October and mid-November 2025 during Mathematics SME tenure. The solution was adopted for team use from November 2025 onward, preceding the January 2026 transition into Wayground AI/ML Team.',
      isCausalClaimFormallyVerified: false
    },
    associatedProjectIds: ['proj-vm-copy', 'proj-content-builder'],
    evidenceIds: ['EVID-DOC-RESUME-01', 'EVID-SRC-JOURNAL-01']
  },
  {
    careerId: 'car-wayground-aiml',
    phaseId: 'PHASE_4_WAYGROUND_AI_ENGINEER',
    organization: 'Wayground Inc (Quizizz)',
    organizationType: 'ENTERPRISE',
    formalDesignation: 'AI Engineer — AI/ML Team',
    employmentType: 'FULL_TIME_SALARIED',
    location: 'Bengaluru, India (Remote)',
    employmentPeriod: {
      start: {
        dateString: '2026-01',
        precision: 'month',
        confirmationStatus: 'INDEPENDENTLY_VERIFIED',
        boundaryType: 'EXACT_BOUNDARY'
      },
      end: {
        dateString: '2026-07',
        precision: 'month',
        confirmationStatus: 'INDEPENDENTLY_VERIFIED',
        boundaryType: 'EXACT_BOUNDARY',
        annotation: 'Tenure concluded in July 2026.'
      }
    },
    formalScopeSummary:
      'Engineered enterprise asynchronous ETL pipelines, multi-agent evaluation architectures, deterministic schema gates, and curriculum transformation systems.',
    verifiedResponsibilities: [
      'Engineered Curriculum Transformation Engine: asynchronous Map-Reduce batch pipeline migrating educational datasets with 3-tier validation.',
      'Developed AI Worksheets Product POC: LaTeX/TikZ worksheet generation system with backtracking puzzle solvers.',
      'Contributed to US Mathematics Item Bank: visual domain routing (SVG vs TikZ), compile gates, Grade 3-5 prompt tuning, and ILP stratified sampling.'
    ],
    associatedProjectIds: ['proj-curriculum-etl', 'proj-ai-worksheets', 'proj-item-bank'],
    evidenceIds: ['EVID-DOC-RESUME-01', 'EVID-SRC-PROJECTS-01']
  },
  {
    careerId: 'car-independent-research',
    phaseId: 'PHASE_5_INDEPENDENT_AI_ENGINEERING_AND_RESEARCH',
    organization: 'Independent AI Engineering & Systems Research',
    organizationType: 'SELF_DIRECTED',
    formalDesignation: 'AI Systems Engineer & Independent Researcher',
    employmentType: 'INDEPENDENT_RESEARCH',
    location: 'Varanasi, India',
    employmentPeriod: {
      start: {
        dateString: '2026-08',
        precision: 'month',
        confirmationStatus: 'USER_CONFIRMED',
        boundaryType: 'EXACT_BOUNDARY'
      },
      end: 'PRESENT'
    },
    formalScopeSummary:
      'Independent research in deterministic software wrappers for generative pipelines: CAD boundary compilation, multimodal OCR benchmark suites, and agentic reliability harnesses.',
    verifiedResponsibilities: [
      'Engineered Engineering Design Automation (EDA CAD): closed-form physics kernel with OpenCascade BRep solid compilation verified by 424 pytests.',
      'Built OCR Benchmark Evaluator: multi-engine document parsing evaluator with 134 backend tests and 20 UI assertions.',
      'Developed Solace AI (Nov 2026 hackathon): Gemini 2.0 Live voice companion with 52 backend pytests and 50 mobile Jest/TypeScript checks.',
      'Architected Ask Aadil & RAG Lab: grounded conversational portfolio interface with 172 core hardening checks and 327 total assertions.'
    ],
    associatedProjectIds: [
      'proj-design-automation',
      'proj-ocr-evaluator',
      'proj-solace-ai',
      'proj-ask-aadil',
      'proj-ai-reliability',
      'proj-journey-map',
      'proj-systems-archive'
    ],
    evidenceIds: ['EVID-DOC-RESUME-01', 'EVID-SRC-GIT-01']
  }
]

// ============================================================================
// 2. CANONICAL PROJECT RECORDS
// ============================================================================

export const canonicalProjectRecords: CanonicalProjectRecord[] = [
  {
    projectId: 'proj-vm-copy',
    slug: 'vm-copy',
    title: 'VM Copy Question Generator',
    tagline: 'Deterministic mathematical variant generator eliminating invalid options and multiple-correct-answer errors.',
    implementationAuthorship: 'SOLE_IMPLEMENTER',
    architecturalResponsibility: 'PRIMARY_ARCHITECT',
    requirementsOrigin: 'SELF_DIRECTED_INITIATIVE',
    organizationalContext: 'COMPANY_EMPLOYMENT',
    ipOwnership: 'EMPLOYER_PROPRIETARY',
    publicationEligibility: 'EMPLOYER_PROPRIETARY_CASE_STUDY',
    associatedCareerId: 'car-wayground-math-sme',
    careerPhaseId: 'PHASE_3_WAYGROUND_MATHEMATICS_SME',
    temporalRegistry: {
      developmentWindow: {
        start: {
          dateString: '2025-10',
          precision: 'month',
          confirmationStatus: 'USER_CONFIRMED',
          boundaryType: 'EXACT_BOUNDARY'
        },
        end: {
          dateString: '2025-11',
          precision: 'month',
          confirmationStatus: 'USER_CONFIRMED',
          boundaryType: 'EXACT_BOUNDARY',
          annotation: 'Completed around mid-November 2025 per author confirmation.'
        }
      },
      internalTeamUsageWindow: {
        start: {
          dateString: '2025-11',
          precision: 'month',
          confirmationStatus: 'USER_CONFIRMED',
          boundaryType: 'EXACT_BOUNDARY',
          annotation: 'Adopted for Mathematics SME team use from November 2025 onward.'
        },
        end: 'PRESENT'
      },
      formalDeploymentDate: undefined // Formal corporate release date not independently established
    },
    technologies: {
      languages: ['TypeScript', 'JavaScript'],
      frameworksAndRuntimes: ['Next.js', 'React', 'Node.js'],
      deterministicEngines: ['Deterministic AST Evaluator', 'Regex Structural Gate', 'Mathematical Invariant Checker'],
      modelsAndOrchestrators: ['Portkey AI Gateway', 'LLM Provider Fallback'],
      infrastructure: ['Vercel Serverless', 'Local In-Memory Cache']
    },
    repository: {
      publicUrl: null, // Strictly null; proprietary internal employer tool
      isPrivateOrProprietary: true,
      caseStudyRoute: '/projects/vm-copy'
    },
    claimIds: ['CLAIM-VM-001'],
    evidenceIds: ['EVID-VM-01', 'EVID-SRC-JOURNAL-01']
  },
  {
    projectId: 'proj-content-builder',
    slug: 'voyagemath-content-builder',
    title: 'VoyageMath Content Builder V1',
    tagline: 'Internal authoring environment for rich interactive mathematics questions (Built by Wayground Engineering).',
    implementationAuthorship: 'COLLABORATIVE_CONTRIBUTOR',
    architecturalResponsibility: 'DIRECTED_ARCHITECTURE',
    requirementsOrigin: 'INTERNAL_COMMISSION',
    organizationalContext: 'COMPANY_EMPLOYMENT',
    ipOwnership: 'EMPLOYER_PROPRIETARY',
    publicationEligibility: 'RESTRICTED_OR_INTERNAL_ONLY',
    contributionBreakdown: {
      authorRole: 'Subject Matter Expert (SME) Tester & Workflow Advisor',
      personallyEngineeredModules: [
        'SME defect reporting and validation suite',
        'Functional usability recommendations and workflow audits',
        'Mathematical notation stress-testing across K-12 item types'
      ],
      teamEngineeredModules: [
        'Next.js authoring application and UI components',
        'VoyageMath frontend state store and canvas renderers',
        'Backend persistence and database integration'
      ],
      stakeholderOrTeamNotes:
        'Engineered by the Wayground / VoyageMath Engineering team. Mohemmed Aadil Khurshid did not build the software; contributed exclusively from the SME, testing, and functional feedback perspective.'
    },
    associatedCareerId: 'car-wayground-math-sme',
    careerPhaseId: 'PHASE_3_WAYGROUND_MATHEMATICS_SME',
    temporalRegistry: {
      developmentWindow: {
        start: {
          dateString: '2024-03',
          precision: 'month',
          confirmationStatus: 'INDEPENDENTLY_VERIFIED',
          boundaryType: 'EXACT_BOUNDARY'
        },
        end: {
          dateString: '2025-12',
          precision: 'month',
          confirmationStatus: 'INDEPENDENTLY_VERIFIED',
          boundaryType: 'EXACT_BOUNDARY'
        }
      }
    },
    technologies: {
      languages: ['TypeScript', 'LaTeX'],
      frameworksAndRuntimes: ['Next.js', 'React'],
      deterministicEngines: ['KaTeX Validator'],
      infrastructure: ['Wayground Internal Infrastructure']
    },
    repository: {
      publicUrl: null,
      isPrivateOrProprietary: true,
      caseStudyRoute: '/journal'
    },
    claimIds: [],
    evidenceIds: ['EVID-SRC-JOURNAL-01']
  },
  {
    projectId: 'proj-ai-worksheets',
    slug: 'ai-worksheets',
    title: 'AI Worksheets Product POC',
    tagline: 'Full-stack LaTeX/TikZ worksheet generation system with backtracking puzzle solvers and multi-model LLM orchestration.',
    implementationAuthorship: 'SOLE_IMPLEMENTER',
    architecturalResponsibility: 'CO_ARCHITECT',
    requirementsOrigin: 'INTERNAL_COMMISSION',
    organizationalContext: 'COMPANY_EMPLOYMENT',
    ipOwnership: 'EMPLOYER_PROPRIETARY',
    publicationEligibility: 'EMPLOYER_PROPRIETARY_CASE_STUDY',
    associatedCareerId: 'car-wayground-aiml',
    careerPhaseId: 'PHASE_4_WAYGROUND_AI_ENGINEER',
    temporalRegistry: {
      developmentWindow: {
        start: {
          dateString: '2026-01',
          precision: 'month',
          confirmationStatus: 'INDEPENDENTLY_VERIFIED',
          boundaryType: 'EXACT_BOUNDARY'
        },
        end: {
          dateString: '2026-04',
          precision: 'month',
          confirmationStatus: 'INDEPENDENTLY_VERIFIED',
          boundaryType: 'EXACT_BOUNDARY'
        }
      }
    },
    technologies: {
      languages: ['Python', 'TypeScript', 'LaTeX/TikZ'],
      frameworksAndRuntimes: ['FastAPI', 'Next.js', 'Celery'],
      deterministicEngines: ['Backtracking Graph Solver', 'LaTeX Syntax Verifier', 'PyMuPDF Visual Validator'],
      modelsAndOrchestrators: ['Claude 3.5 Sonnet', 'GPT-4o', 'Instructor'],
      infrastructure: ['Redis', 'Docker']
    },
    repository: {
      publicUrl: null,
      isPrivateOrProprietary: true,
      caseStudyRoute: '/projects/ai-worksheets'
    },
    claimIds: ['CLAIM-WORKSHEETS-001'],
    evidenceIds: ['EVID-WS-01', 'EVID-SRC-PROJECTS-01']
  },
  {
    projectId: 'proj-curriculum-etl',
    slug: 'curriculum-etl',
    title: 'Curriculum Transformation Engine',
    tagline: 'Asynchronous Map-Reduce batch pipeline migrating educational datasets with 3-tier validation.',
    implementationAuthorship: 'SOLE_IMPLEMENTER',
    architecturalResponsibility: 'PRIMARY_ARCHITECT',
    requirementsOrigin: 'INTERNAL_COMMISSION',
    organizationalContext: 'COMPANY_EMPLOYMENT',
    ipOwnership: 'EMPLOYER_PROPRIETARY',
    publicationEligibility: 'EMPLOYER_PROPRIETARY_CASE_STUDY',
    associatedCareerId: 'car-wayground-aiml',
    careerPhaseId: 'PHASE_4_WAYGROUND_AI_ENGINEER',
    temporalRegistry: {
      developmentWindow: {
        start: {
          dateString: '2026-02',
          precision: 'month',
          confirmationStatus: 'INDEPENDENTLY_VERIFIED',
          boundaryType: 'EXACT_BOUNDARY'
        },
        end: {
          dateString: '2026-06',
          precision: 'month',
          confirmationStatus: 'INDEPENDENTLY_VERIFIED',
          boundaryType: 'EXACT_BOUNDARY'
        }
      }
    },
    technologies: {
      languages: ['Python 3.12'],
      frameworksAndRuntimes: ['FastAPI', 'Celery', 'Pydantic v2'],
      deterministicEngines: ['Pydantic Schema Gate', 'CSV Audit Verifier', 'Semantic Alignment Critic'],
      modelsAndOrchestrators: ['Claude 3.5 Sonnet', 'Map-Reduce Chunk Orchestrator'],
      infrastructure: ['Redis', 'PostgreSQL', 'Docker']
    },
    repository: {
      publicUrl: null,
      isPrivateOrProprietary: true,
      caseStudyRoute: '/projects/curriculum-etl'
    },
    claimIds: ['CLAIM-ETL-001'],
    evidenceIds: ['EVID-ETL-01', 'EVID-SRC-PROJECTS-01']
  },
  {
    projectId: 'proj-item-bank',
    slug: 'us-mathematics-item-bank',
    title: 'US Mathematics Item Bank',
    tagline: 'Enterprise assessment authoring and validation platform generating standards-aligned items.',
    implementationAuthorship: 'COLLABORATIVE_CONTRIBUTOR',
    architecturalResponsibility: 'DIRECTED_ARCHITECTURE',
    requirementsOrigin: 'INTERNAL_COMMISSION',
    organizationalContext: 'COMPANY_EMPLOYMENT',
    ipOwnership: 'EMPLOYER_PROPRIETARY',
    publicationEligibility: 'EMPLOYER_PROPRIETARY_CASE_STUDY',
    contributionBreakdown: {
      authorRole: 'Collaborative AI & Mathematics Systems Engineer',
      personallyEngineeredModules: [
        'Visual domain routing between SVG and TikZ rendering engines',
        'Compile and visual evaluation gates for LaTeX/TikZ diagrams',
        'Grade 3–5 prompt tuning and mathematical distractor constraints',
        'ILP / Min-Max Swap stratified assessment sampling algorithms',
        'Frontend vetting-tool defect fixes and validation feedback'
      ],
      teamEngineeredModules: [
        'Core assessment schema and persistence layer',
        'Quizizz live delivery player integration',
        'State curriculum standards alignment taxonomy'
      ],
      stakeholderOrTeamNotes:
        'Collaborative enterprise assessment engineering system within Wayground. Intellectual property belongs to Wayground Inc.'
    },
    associatedCareerId: 'car-wayground-aiml',
    careerPhaseId: 'PHASE_4_WAYGROUND_AI_ENGINEER',
    temporalRegistry: {
      developmentWindow: {
        start: {
          dateString: '2026-03',
          precision: 'month',
          confirmationStatus: 'INDEPENDENTLY_VERIFIED',
          boundaryType: 'EXACT_BOUNDARY'
        },
        end: {
          dateString: '2026-07',
          precision: 'month',
          confirmationStatus: 'INDEPENDENTLY_VERIFIED',
          boundaryType: 'EXACT_BOUNDARY'
        }
      }
    },
    technologies: {
      languages: ['Python', 'TypeScript', 'LaTeX', 'TikZ', 'SVG'],
      frameworksAndRuntimes: ['FastAPI', 'Next.js'],
      deterministicEngines: ['Compile Gate', 'Visual Evaluation Harness', 'ILP Stratified Sampler'],
      modelsAndOrchestrators: ['Claude 3.5 Sonnet', 'GPT-4o'],
      infrastructure: ['Wayground Internal Assessment Pipeline']
    },
    repository: {
      publicUrl: null, // Strictly null; proprietary enterprise system
      isPrivateOrProprietary: true,
      caseStudyRoute: '/projects/us-mathematics-item-bank'
    },
    claimIds: [],
    evidenceIds: ['EVID-SRC-PROJECTS-01']
  },
  {
    projectId: 'proj-design-automation',
    slug: 'design-automation',
    title: 'Engineering Design Automation (EDA CAD)',
    tagline: 'Closed-form physics engine and OpenCascade BRep solid modeler compiling natural-language specs into manufacturing geometry.',
    implementationAuthorship: 'SOLE_IMPLEMENTER',
    architecturalResponsibility: 'PRIMARY_ARCHITECT',
    requirementsOrigin: 'INDEPENDENT_RESEARCH_SPEC',
    organizationalContext: 'INDEPENDENT_RESEARCH',
    ipOwnership: 'OPEN_SOURCE_MIT',
    publicationEligibility: 'PUBLIC_OPEN_SOURCE',
    associatedCareerId: 'car-independent-research',
    careerPhaseId: 'PHASE_5_INDEPENDENT_AI_ENGINEERING_AND_RESEARCH',
    temporalRegistry: {
      developmentWindow: {
        start: {
          dateString: '2026-08',
          precision: 'month',
          confirmationStatus: 'INDEPENDENTLY_VERIFIED',
          boundaryType: 'EXACT_BOUNDARY'
        },
        end: {
          dateString: '2026-09',
          precision: 'month',
          confirmationStatus: 'INDEPENDENTLY_VERIFIED',
          boundaryType: 'EXACT_BOUNDARY'
        }
      },
      publicReleaseDate: {
        dateString: '2026-09',
        precision: 'month',
        confirmationStatus: 'INDEPENDENTLY_VERIFIED',
        boundaryType: 'EXACT_BOUNDARY'
      }
    },
    technologies: {
      languages: ['Python 3.11', 'Python 3.12'],
      frameworksAndRuntimes: ['FastAPI', 'NumPy'],
      deterministicEngines: ['OpenCascade 7.6.0', 'CadQuery', 'Saint-Venant Analytical Physics Kernel'],
      infrastructure: ['Docker', 'STEP', 'SVG Export']
    },
    repository: {
      publicUrl: 'https://github.com/aadil-lang/Engineering-design-automation',
      isPrivateOrProprietary: false,
      caseStudyRoute: '/projects/design-automation'
    },
    claimIds: ['CLAIM-EDA-001', 'CLAIM-EDA-002'],
    evidenceIds: ['EVID-EDA-01', 'EVID-EDA-02']
  },
  {
    projectId: 'proj-ocr-evaluator',
    slug: 'ocr-evaluator',
    title: 'OCR Benchmark Evaluator',
    tagline: 'Multi-engine document evaluation pipeline measuring extraction accuracy, LaTeX normalization, and risk.',
    implementationAuthorship: 'SOLE_IMPLEMENTER',
    architecturalResponsibility: 'PRIMARY_ARCHITECT',
    requirementsOrigin: 'INDEPENDENT_RESEARCH_SPEC',
    organizationalContext: 'INDEPENDENT_RESEARCH',
    ipOwnership: 'OPEN_SOURCE_MIT',
    publicationEligibility: 'PUBLIC_OPEN_SOURCE',
    associatedCareerId: 'car-independent-research',
    careerPhaseId: 'PHASE_5_INDEPENDENT_AI_ENGINEERING_AND_RESEARCH',
    temporalRegistry: {
      developmentWindow: {
        start: {
          dateString: '2026-09',
          precision: 'month',
          confirmationStatus: 'INDEPENDENTLY_VERIFIED',
          boundaryType: 'EXACT_BOUNDARY'
        },
        end: {
          dateString: '2026-10',
          precision: 'month',
          confirmationStatus: 'INDEPENDENTLY_VERIFIED',
          boundaryType: 'EXACT_BOUNDARY'
        }
      },
      publicReleaseDate: {
        dateString: '2026-10',
        precision: 'month',
        confirmationStatus: 'INDEPENDENTLY_VERIFIED',
        boundaryType: 'EXACT_BOUNDARY'
      }
    },
    technologies: {
      languages: ['Python 3.12', 'TypeScript'],
      frameworksAndRuntimes: ['FastAPI', 'Next.js'],
      deterministicEngines: ['LaTeX AST Normalizer', 'Levenshtein Metric Engine', 'Adversarial Evaluator'],
      infrastructure: ['Docker', 'Playwright']
    },
    repository: {
      publicUrl: 'https://github.com/aadil-lang/OCR-benchmark-evaluator',
      isPrivateOrProprietary: false,
      caseStudyRoute: '/projects/ocr-evaluator'
    },
    claimIds: ['CLAIM-OCR-001', 'CLAIM-OCR-002'],
    evidenceIds: ['EVID-OCR-01', 'EVID-OCR-02']
  },
  {
    projectId: 'proj-solace-ai',
    slug: 'solace-ai',
    title: 'Solace AI (Gemini 2.0 Live Voice Companion)',
    tagline: 'Multimodal voice and emotional-support companion with streaming audio pipelines and LangGraph orchestration.',
    implementationAuthorship: 'SOLE_IMPLEMENTER',
    architecturalResponsibility: 'PRIMARY_ARCHITECT',
    requirementsOrigin: 'HACKATHON_CHALLENGE',
    organizationalContext: 'HACKATHON_EVENT',
    ipOwnership: 'OPEN_SOURCE_MIT',
    publicationEligibility: 'PUBLIC_OPEN_SOURCE',
    associatedCareerId: 'car-independent-research',
    careerPhaseId: 'PHASE_5_INDEPENDENT_AI_ENGINEERING_AND_RESEARCH',
    temporalRegistry: {
      developmentWindow: {
        start: {
          dateString: '2026-11',
          precision: 'month',
          confirmationStatus: 'INDEPENDENTLY_VERIFIED',
          boundaryType: 'EXACT_BOUNDARY',
          annotation: 'Developed for hackathon submission in November 2026; 3-page resume Nov 2025 was a typo.'
        },
        end: {
          dateString: '2026-11',
          precision: 'month',
          confirmationStatus: 'INDEPENDENTLY_VERIFIED',
          boundaryType: 'EXACT_BOUNDARY'
        }
      },
      publicReleaseDate: {
        dateString: '2026-11',
        precision: 'month',
        confirmationStatus: 'INDEPENDENTLY_VERIFIED',
        boundaryType: 'EXACT_BOUNDARY'
      }
    },
    technologies: {
      languages: ['Python 3.12', 'TypeScript'],
      frameworksAndRuntimes: ['FastAPI', 'React Native', 'LangGraph'],
      deterministicEngines: ['Audio Ring Buffer', 'Emotional Landscape State Machine'],
      modelsAndOrchestrators: ['Gemini 2.0 Flash / Live API'],
      infrastructure: ['WebSockets', 'Jest Mobile Runner']
    },
    repository: {
      publicUrl: 'https://github.com/aadil-lang/solace-ai',
      isPrivateOrProprietary: false,
      caseStudyRoute: '/projects/solace-ai'
    },
    claimIds: ['CLAIM-SOLACE-001', 'CLAIM-SOLACE-002'],
    evidenceIds: ['EVID-SOLACE-01', 'EVID-SOLACE-02']
  },
  {
    projectId: 'proj-ask-aadil',
    slug: 'ask-aadil',
    title: 'Ask Aadil Grounded RAG System',
    tagline: 'Grounded conversational AI interface over portfolio knowledge with temporal reasoning and strict action governance.',
    implementationAuthorship: 'SOLE_IMPLEMENTER',
    architecturalResponsibility: 'PRIMARY_ARCHITECT',
    requirementsOrigin: 'INDEPENDENT_RESEARCH_SPEC',
    organizationalContext: 'INDEPENDENT_RESEARCH',
    ipOwnership: 'PERSONAL_PROPRIETARY',
    publicationEligibility: 'PUBLIC_PORTFOLIO_INTERFACE',
    associatedCareerId: 'car-independent-research',
    careerPhaseId: 'PHASE_5_INDEPENDENT_AI_ENGINEERING_AND_RESEARCH',
    temporalRegistry: {
      developmentWindow: {
        start: {
          dateString: '2026-10',
          precision: 'month',
          confirmationStatus: 'INDEPENDENTLY_VERIFIED',
          boundaryType: 'EXACT_BOUNDARY'
        },
        end: 'PRESENT'
      }
    },
    technologies: {
      languages: ['TypeScript'],
      frameworksAndRuntimes: ['Next.js 13', 'React 18'],
      deterministicEngines: ['Controlled Action Governor', 'Temporal Reasoner', 'Source-Aware Retrieval Index'],
      modelsAndOrchestrators: ['Gemini 1.5 Pro / Flash', 'Hybrid BM25 + Embedding Reranker'],
      infrastructure: ['Local Vector Store', 'Vitest / TSX Test Runner']
    },
    repository: {
      publicUrl: null, // Proprietary implementation behind public web interface
      isPrivateOrProprietary: true,
      caseStudyRoute: '/rag-lab'
    },
    claimIds: ['CLAIM-ASK-001', 'CLAIM-ASK-002'],
    evidenceIds: ['EVID-ASK-01', 'EVID-ASK-02']
  },
  {
    projectId: 'proj-ai-reliability',
    slug: 'ai-reliability',
    title: 'AI Application Reliability Framework',
    tagline: 'Resilience testing suite evaluating model drift, tool boundary failures, and schema breaking points.',
    implementationAuthorship: 'SOLE_IMPLEMENTER',
    architecturalResponsibility: 'PRIMARY_ARCHITECT',
    requirementsOrigin: 'INDEPENDENT_RESEARCH_SPEC',
    organizationalContext: 'INDEPENDENT_RESEARCH',
    ipOwnership: 'OPEN_SOURCE_MIT',
    publicationEligibility: 'PUBLIC_OPEN_SOURCE',
    associatedCareerId: 'car-independent-research',
    careerPhaseId: 'PHASE_5_INDEPENDENT_AI_ENGINEERING_AND_RESEARCH',
    temporalRegistry: {
      developmentWindow: {
        start: {
          dateString: '2026-10',
          precision: 'month',
          confirmationStatus: 'INDEPENDENTLY_VERIFIED',
          boundaryType: 'EXACT_BOUNDARY'
        },
        end: {
          dateString: '2026-11',
          precision: 'month',
          confirmationStatus: 'INDEPENDENTLY_VERIFIED',
          boundaryType: 'EXACT_BOUNDARY'
        }
      },
      publicReleaseDate: {
        dateString: '2026-11',
        precision: 'month',
        confirmationStatus: 'INDEPENDENTLY_VERIFIED',
        boundaryType: 'EXACT_BOUNDARY'
      }
    },
    technologies: {
      languages: ['Python 3.12'],
      frameworksAndRuntimes: ['FastAPI', 'Playwright'],
      deterministicEngines: ['Fisher Information Matrix Governance', 'Covariance Bound Checker'],
      modelsAndOrchestrators: ['Model Context Protocol (MCP) SDK'],
      infrastructure: ['Docker', 'Pytest Runner']
    },
    repository: {
      publicUrl: 'https://github.com/aadil-lang/ai-application-reliability',
      isPrivateOrProprietary: false,
      caseStudyRoute: '/projects/ai-reliability'
    },
    claimIds: ['CLAIM-RELIABILITY-001', 'CLAIM-RELIABILITY-002'],
    evidenceIds: ['EVID-REL-01', 'EVID-REL-02']
  },
  {
    projectId: 'proj-journey-map',
    slug: 'cartographic-journey-map',
    title: 'Cartographic Engineering Journey Map',
    tagline: 'Interactive 3D topological map charting the 5-phase evolution from mathematics pedagogy to governed AI systems.',
    implementationAuthorship: 'SOLE_IMPLEMENTER',
    architecturalResponsibility: 'PRIMARY_ARCHITECT',
    requirementsOrigin: 'INDEPENDENT_RESEARCH_SPEC',
    organizationalContext: 'INDEPENDENT_RESEARCH',
    ipOwnership: 'PERSONAL_PROPRIETARY',
    publicationEligibility: 'PUBLIC_PORTFOLIO_INTERFACE',
    associatedCareerId: 'car-independent-research',
    careerPhaseId: 'PHASE_5_INDEPENDENT_AI_ENGINEERING_AND_RESEARCH',
    temporalRegistry: {
      developmentWindow: {
        start: {
          dateString: '2026-10',
          precision: 'month',
          confirmationStatus: 'INDEPENDENTLY_VERIFIED',
          boundaryType: 'EXACT_BOUNDARY'
        },
        end: {
          dateString: '2026-11',
          precision: 'month',
          confirmationStatus: 'INDEPENDENTLY_VERIFIED',
          boundaryType: 'EXACT_BOUNDARY'
        }
      }
    },
    technologies: {
      languages: ['TypeScript'],
      frameworksAndRuntimes: ['Next.js', 'React', 'Three.js / React Three Fiber'],
      deterministicEngines: ['Topological Spline Calculator', 'Camera Coordinate Engine'],
      infrastructure: ['WebGL / GPU Shaders']
    },
    repository: {
      publicUrl: null,
      isPrivateOrProprietary: true,
      caseStudyRoute: '/journey'
    },
    claimIds: [],
    evidenceIds: ['EVID-SRC-JOURNAL-01']
  },
  {
    projectId: 'proj-systems-archive',
    slug: 'systems-archive-platform',
    title: 'Systems Archive Platform',
    tagline: 'Interactive 3D isometric systems catalog with runtime architecture explorer and evidence verification dashboard.',
    implementationAuthorship: 'SOLE_IMPLEMENTER',
    architecturalResponsibility: 'PRIMARY_ARCHITECT',
    requirementsOrigin: 'INDEPENDENT_RESEARCH_SPEC',
    organizationalContext: 'INDEPENDENT_RESEARCH',
    ipOwnership: 'PERSONAL_PROPRIETARY',
    publicationEligibility: 'PUBLIC_PORTFOLIO_INTERFACE',
    associatedCareerId: 'car-independent-research',
    careerPhaseId: 'PHASE_5_INDEPENDENT_AI_ENGINEERING_AND_RESEARCH',
    temporalRegistry: {
      developmentWindow: {
        start: {
          dateString: '2026-10',
          precision: 'month',
          confirmationStatus: 'INDEPENDENTLY_VERIFIED',
          boundaryType: 'EXACT_BOUNDARY'
        },
        end: {
          dateString: '2026-11',
          precision: 'month',
          confirmationStatus: 'INDEPENDENTLY_VERIFIED',
          boundaryType: 'EXACT_BOUNDARY'
        }
      }
    },
    technologies: {
      languages: ['TypeScript'],
      frameworksAndRuntimes: ['Next.js', 'React', 'Three.js'],
      deterministicEngines: ['Interactive Raycaster', '3D Scene Graph Manager'],
      infrastructure: ['WebGL Canvas']
    },
    repository: {
      publicUrl: null,
      isPrivateOrProprietary: true,
      caseStudyRoute: '/projects'
    },
    claimIds: [],
    evidenceIds: ['EVID-SRC-PROJECTS-01']
  },
  {
    projectId: 'proj-universal-hr-assistant',
    slug: 'universal-hr-assistant',
    title: 'Archie — Universal Enterprise HR & IT Assistant',
    tagline: 'Controlled enterprise assistant demonstration coupling dense policy RAG with FastMCP zero-trust transactional execution.',
    implementationAuthorship: 'SOLE_IMPLEMENTER',
    architecturalResponsibility: 'PRIMARY_ARCHITECT',
    requirementsOrigin: 'SELF_DIRECTED_INITIATIVE',
    organizationalContext: 'INDEPENDENT_RESEARCH',
    ipOwnership: 'OPEN_SOURCE_MIT',
    publicationEligibility: 'PUBLIC_OPEN_SOURCE',
    associatedCareerId: 'car-independent-research',
    careerPhaseId: 'PHASE_5_INDEPENDENT_AI_ENGINEERING_AND_RESEARCH',
    temporalRegistry: {
      developmentWindow: {
        start: {
          dateString: '2026-11',
          precision: 'month',
          confirmationStatus: 'INDEPENDENTLY_VERIFIED',
          boundaryType: 'EXACT_BOUNDARY'
        },
        end: {
          dateString: '2026-11',
          precision: 'month',
          confirmationStatus: 'INDEPENDENTLY_VERIFIED',
          boundaryType: 'EXACT_BOUNDARY'
        }
      },
      publicReleaseDate: {
        dateString: '2026-11',
        precision: 'month',
        confirmationStatus: 'INDEPENDENTLY_VERIFIED',
        boundaryType: 'EXACT_BOUNDARY'
      }
    },
    technologies: {
      languages: ['Python 3.12', 'TypeScript'],
      frameworksAndRuntimes: ['FastAPI', 'LangGraph', 'Next.js 14', 'React 18', 'Tailwind CSS'],
      deterministicEngines: ['0ms Pre-Flight Regex Guardrail', 'Post-Flight PII Redactor', 'HMAC-SHA256 Signer'],
      modelsAndOrchestrators: ['Google Gemini (gemini-3.5-flash-lite)', 'ChromaDB Dense Vector Retriever', 'FastMCP Tool Server'],
      infrastructure: ['PostgreSQL 16', 'Docker Compose', 'Uvicorn']
    },
    repository: {
      publicUrl: 'https://github.com/aadil-lang/universal-enterprise-assistant',
      isPrivateOrProprietary: false,
      caseStudyRoute: '/projects/universal-hr-assistant'
    },
    claimIds: ['CLAIM-ARCHIE-001'],
    evidenceIds: ['EVID-ARCHIE-01']
  }
]

// ============================================================================
// 3. CANONICAL TECHNICAL CLAIMS & GOVERNANCE RECORDS
// ============================================================================

export const canonicalClaimRecords: CanonicalTechnicalClaimRecord[] = [
  {
    claimId: 'CLAIM-EDA-001',
    projectId: 'proj-design-automation',
    claimDomain: 'TEST_COUNT',
    metricSubject: 'CAD_TEST_SUITE_COUNT',
    measurementScope: 'AUTOMATED_SUITE_FILES',
    verificationStatus: 'SOURCE_VERIFIED',
    linkedEvidenceIds: ['EVID-EDA-01'],
    wording: {
      headline: '424 Automated Pytests Across 28 Suites',
      qualifiedTechnicalStatement:
        '424 automated pytests passing across 28 test suites in containerized OpenCascade test runner covering torsional physics, shaft diameter sizing, and STEP BRep solid generation.',
      mandatoryCaveats: [
        'Test suite exists in external repository (aadil-lang/Engineering-design-automation) and evidence registries; verified via containerized Docker pytest runner.'
      ],
      prohibitedInterpretations: [
        'All 424 tests test volume discrepancy',
        'Tests executed natively in Next.js build'
      ]
    },
    permittedSurfaces: ['HOMEPAGE_CARD', 'PROJECTS_ARCHIVE_CARD', 'SYSTEMS_CASE_STUDY', 'RESUME_DOCUMENT', 'ASK_AADIL_KNOWLEDGE']
  },
  {
    claimId: 'CLAIM-EDA-002',
    projectId: 'proj-design-automation',
    claimDomain: 'ACCURACY',
    metricSubject: 'CAD_GEOMETRY_VOLUME_ACCURACY',
    measurementScope: 'ANALYTICAL_PRIMITIVE_CALCULUS',
    verificationStatus: 'PARTIALLY_VERIFIED',
    linkedEvidenceIds: ['EVID-EDA-02'],
    wording: {
      headline: '0.0000% Volume Error in Tested Analytical Primitives',
      qualifiedTechnicalStatement:
        'Analytical volume calculations and OpenCascade solid mass-property calculations agreed within a relative numerical discrepancy of less than 10⁻⁶ (< 0.0000% error) in the tested analytical geometry cases (stepped cylinders, nominal shafts).',
      mandatoryCaveats: [
        'Applies specifically to tested analytical geometry primitives, not across all 424 tests.',
        'Measures software-level mathematical consistency between closed-form physics equations and CAD solid kernel mass integrals, NOT physical CNC machining tolerance.'
      ],
      prohibitedInterpretations: [
        'Zero physical manufacturing error',
        'Physical CNC machining tolerance of 0.0000%',
        'Applies to arbitrary organic CAD surfaces'
      ]
    },
    permittedSurfaces: ['SYSTEMS_CASE_STUDY', 'ASK_AADIL_KNOWLEDGE']
  },
  {
    claimId: 'CLAIM-OCR-001',
    projectId: 'proj-ocr-evaluator',
    claimDomain: 'TEST_COUNT',
    metricSubject: 'OCR_TEST_SUITE_COUNT',
    measurementScope: 'AUTOMATED_SUITE_FILES',
    verificationStatus: 'SOURCE_VERIFIED',
    linkedEvidenceIds: ['EVID-OCR-01'],
    wording: {
      headline: '134 Automated Backend Pytests Across 22 Files',
      qualifiedTechnicalStatement:
        '134 automated backend pytests passing across 22 test files covering adversarial evaluation, confidence scoring, LaTeX AST normalization, and critical-field extraction.',
      mandatoryCaveats: [
        'Source code and test suite reside in external repository (aadil-lang/OCR-benchmark-evaluator); verified via pytest runner.'
      ],
      prohibitedInterpretations: [
        'Tests executed natively in root portfolio build'
      ]
    },
    permittedSurfaces: ['PROJECTS_ARCHIVE_CARD', 'SYSTEMS_CASE_STUDY', 'RESUME_DOCUMENT', 'ASK_AADIL_KNOWLEDGE']
  },
  {
    claimId: 'CLAIM-OCR-002',
    projectId: 'proj-ocr-evaluator',
    claimDomain: 'ACCURACY',
    metricSubject: 'OCR_PARSER_ACCURACY',
    measurementScope: 'AUTOMATED_TEST_COLLECTION',
    verificationStatus: 'SOURCE_VERIFIED',
    linkedEvidenceIds: ['EVID-OCR-02'],
    wording: {
      headline: '20 Browser UI Evaluation Assertions (0 Console Errors)',
      qualifiedTechnicalStatement:
        '20 browser UI evaluation assertions passing with 0 frontend JavaScript console errors across file upload, diff rendering, and critical-field highlighting.',
      mandatoryCaveats: [
        'Verified in Playwright headless browser test harness.'
      ],
      prohibitedInterpretations: []
    },
    permittedSurfaces: ['PROJECTS_ARCHIVE_CARD', 'SYSTEMS_CASE_STUDY', 'ASK_AADIL_KNOWLEDGE']
  },
  {
    claimId: 'CLAIM-ASK-001',
    projectId: 'proj-ask-aadil',
    claimDomain: 'TEST_COUNT',
    metricSubject: 'AGENT_CORE_HARDENING_CHECKS',
    measurementScope: 'CORE_SECURITY_HARDENING',
    verificationStatus: 'REPRODUCIBLY_VERIFIED',
    linkedEvidenceIds: ['EVID-ASK-01'],
    wording: {
      headline: '172 Automated Core Hardening Checks Passing',
      qualifiedTechnicalStatement:
        '172 automated core hardening checks passing across agent QA (132 checks in test_hardening_agent_qa.ts), controlled action governance (29 checks in test_controlled_actions.ts), and Playwright browser E2E (11 checks in test_hardening_browser_qa.js).',
      mandatoryCaveats: [
        'Represents core hardening verification checks; distinct from the 327 total assertions collected across all 10 evaluation test files.'
      ],
      prohibitedInterpretations: [
        '172 assertions (it is 172 checks / 327 assertions)',
        'Interchangeable with 327 assertion count'
      ]
    },
    permittedSurfaces: ['HOMEPAGE_CARD', 'PROJECTS_ARCHIVE_CARD', 'SYSTEMS_CASE_STUDY', 'RESUME_DOCUMENT', 'ASK_AADIL_KNOWLEDGE']
  },
  {
    claimId: 'CLAIM-ASK-002',
    projectId: 'proj-ask-aadil',
    claimDomain: 'TEST_COUNT',
    metricSubject: 'HARNESS_TOTAL_ASSERTIONS',
    measurementScope: 'FULL_EVALUATION_HARNESS',
    verificationStatus: 'REPRODUCIBLY_VERIFIED',
    linkedEvidenceIds: ['EVID-ASK-02'],
    wording: {
      headline: '327 Total Evaluation Assertions Across 10 Test Suites',
      qualifiedTechnicalStatement:
        '327 automated assertions passing across 10 evaluation test scripts in scripts/ directory covering retrieval foundation, query understanding, agent hardening, tool registry, controlled actions, recruiter contact layer, and grounded conversation.',
      mandatoryCaveats: [
        'Represents the complete evaluation harness assertion count; core hardening slice is 172 checks.'
      ],
      prohibitedInterpretations: [
        '327 separate test files (it is 10 test files with 327 assertions)'
      ]
    },
    permittedSurfaces: ['SYSTEMS_CASE_STUDY', 'ASK_AADIL_KNOWLEDGE']
  },
  {
    claimId: 'CLAIM-SOLACE-001',
    projectId: 'proj-solace-ai',
    claimDomain: 'TEST_COUNT',
    metricSubject: 'VOICE_AGENT_TEST_COUNT',
    measurementScope: 'AUTOMATED_SUITE_FILES',
    verificationStatus: 'SOURCE_VERIFIED',
    linkedEvidenceIds: ['EVID-SOLACE-01'],
    wording: {
      headline: '52 Automated Backend Pytests Across 8 Suites',
      qualifiedTechnicalStatement:
        '52 automated backend pytests passing across 8 LangGraph orchestration and personality test suites.',
      mandatoryCaveats: [
        'Verified in Python pytest runner under asyncio_mode=auto.'
      ],
      prohibitedInterpretations: []
    },
    permittedSurfaces: ['PROJECTS_ARCHIVE_CARD', 'SYSTEMS_CASE_STUDY', 'RESUME_DOCUMENT', 'ASK_AADIL_KNOWLEDGE']
  },
  {
    claimId: 'CLAIM-SOLACE-002',
    projectId: 'proj-solace-ai',
    claimDomain: 'TEST_COUNT',
    metricSubject: 'MOBILE_COMPONENT_TEST_EXECUTION',
    measurementScope: 'MOBILE_JEST_TYPESCRIPT_STATIC',
    verificationStatus: 'SOURCE_VERIFIED',
    linkedEvidenceIds: ['EVID-SOLACE-02'],
    wording: {
      headline: '50 Mobile Checks Across 7 Suites (0 TypeScript Errors)',
      qualifiedTechnicalStatement:
        '50 automated mobile verification checks passing across 7 React Native Jest suites with 0 TypeScript compiler errors.',
      mandatoryCaveats: [
        'Verified in mobile Jest test runner (npm test) and TypeScript compiler (tsc --noEmit).',
        'Does NOT represent physical Android device or hardware emulator execution.'
      ],
      prohibitedInterpretations: [
        'Physical Android hardware device verification',
        'Automated APK execution on physical mobile device'
      ]
    },
    permittedSurfaces: ['PROJECTS_ARCHIVE_CARD', 'SYSTEMS_CASE_STUDY', 'RESUME_DOCUMENT', 'ASK_AADIL_KNOWLEDGE']
  },
  {
    claimId: 'CLAIM-RELIABILITY-001',
    projectId: 'proj-ai-reliability',
    claimDomain: 'TEST_COUNT',
    metricSubject: 'RELIABILITY_TEST_CASE_COUNT',
    measurementScope: 'AUTOMATED_TEST_COLLECTION',
    verificationStatus: 'SOURCE_VERIFIED',
    linkedEvidenceIds: ['EVID-REL-01'],
    wording: {
      headline: '158 Backend Test Cases Validating Tool Boundaries',
      qualifiedTechnicalStatement:
        '158 collected pytest test cases simulating headless browser disconnects, MCP tool schema failures, and model drift.',
      mandatoryCaveats: [
        'Represents 158 collected pytest test cases / parameterized checks, NOT 158 distinct test suite files.'
      ],
      prohibitedInterpretations: [
        '158 separate test suite files (it is 158 test cases)'
      ]
    },
    permittedSurfaces: ['PROJECTS_ARCHIVE_CARD', 'SYSTEMS_CASE_STUDY', 'RESUME_DOCUMENT', 'ASK_AADIL_KNOWLEDGE']
  },
  {
    claimId: 'CLAIM-RELIABILITY-002',
    projectId: 'proj-ai-reliability',
    claimDomain: 'TEST_COUNT',
    metricSubject: 'GOVERNANCE_TEST_COUNT',
    measurementScope: 'AUTOMATED_TEST_COLLECTION',
    verificationStatus: 'SOURCE_VERIFIED',
    linkedEvidenceIds: ['EVID-REL-02'],
    wording: {
      headline: '47 Governance & Playwright E2E Verification Tests',
      qualifiedTechnicalStatement:
        '47 governance and Playwright E2E verification assertions enforcing Fisher covariance bounds and DOM probe recovery.',
      mandatoryCaveats: [
        'Verified in Playwright test runner and mathematical covariance checking.'
      ],
      prohibitedInterpretations: []
    },
    permittedSurfaces: ['PROJECTS_ARCHIVE_CARD', 'SYSTEMS_CASE_STUDY', 'ASK_AADIL_KNOWLEDGE']
  },
  {
    claimId: 'CLAIM-VM-001',
    projectId: 'proj-vm-copy',
    claimDomain: 'LATENCY',
    metricSubject: 'DETERMINISTIC_EVALUATION_LATENCY',
    measurementScope: 'IN_MEMORY_DETERMINISTIC_GATE',
    verificationStatus: 'PARTIALLY_VERIFIED',
    linkedEvidenceIds: ['EVID-VM-01'],
    wording: {
      headline: 'Sub-Millisecond (<1ms) Local Deterministic Evaluation with $0 Marginal Spend',
      qualifiedTechnicalStatement:
        'Tier-1 in-memory deterministic structural evaluation executes locally in under 1 ms with $0 marginal API spend for syntax and rule validation.',
      mandatoryCaveats: [
        'Applies strictly to Tier-1 deterministic regex and AST evaluation in local memory.',
        'LLM-based question generation is a separate operation, typically taking 4–8 seconds and incurring standard provider API costs.'
      ],
      prohibitedInterpretations: [
        'Generative LLM question synthesis executes in under 1ms',
        'End-to-end question generation costs $0'
      ]
    },
    permittedSurfaces: ['SYSTEMS_CASE_STUDY', 'ASK_AADIL_KNOWLEDGE']
  },
  {
    claimId: 'CLAIM-WORKSHEETS-001',
    projectId: 'proj-ai-worksheets',
    claimDomain: 'LATENCY',
    metricSubject: 'WORKFLOW_RUNTIME_COMPARISON',
    measurementScope: 'OPERATIONAL_BASELINE_COMPARISON',
    verificationStatus: 'PARTIALLY_VERIFIED',
    linkedEvidenceIds: ['EVID-WS-01'],
    wording: {
      headline: 'Worksheet Generation Pipeline: ~2h Manual Baseline to ~3m Automated Runtime',
      qualifiedTechnicalStatement:
        'Observed automated multi-agent POC pipeline generation runtime of approximately 3 minutes compared to an estimated teacher manual-authoring baseline of approximately 2 hours.',
      mandatoryCaveats: [
        'Represents an operational comparison against an estimated teacher manual-creation baseline (~2 hours), not a controlled algorithmic benchmark.',
        'Total latency varies with LaTeX rendering complexity and puzzle backtracking solver depth.'
      ],
      prohibitedInterpretations: [
        'Rigorous 40x algorithmic benchmark',
        'Guaranteed 3-minute SLA on all document formats'
      ]
    },
    permittedSurfaces: ['SYSTEMS_CASE_STUDY', 'ASK_AADIL_KNOWLEDGE']
  },
  {
    claimId: 'CLAIM-ETL-001',
    projectId: 'proj-curriculum-etl',
    claimDomain: 'SECURITY',
    metricSubject: 'ETL_INTEGRITY_STAGES',
    measurementScope: 'IN_MEMORY_DETERMINISTIC_GATE',
    verificationStatus: 'SOURCE_VERIFIED',
    linkedEvidenceIds: ['EVID-ETL-01'],
    wording: {
      headline: '3-Tier Integrity Gate Pipeline',
      qualifiedTechnicalStatement:
        '3-tier validation architecture enforcing structural integrity: Reviewer node validates Pydantic schema, Critic verifies semantic alignment, and CSV Audit evaluates row delimiters and null thresholds.',
      mandatoryCaveats: [
        'Architectural design pattern verified in asynchronous batch worker codebase.'
      ],
      prohibitedInterpretations: []
    },
    permittedSurfaces: ['PROJECTS_ARCHIVE_CARD', 'SYSTEMS_CASE_STUDY', 'RESUME_DOCUMENT', 'ASK_AADIL_KNOWLEDGE']
  },
  {
    claimId: 'CLAIM-ARCHIE-001',
    projectId: 'proj-universal-hr-assistant',
    claimDomain: 'TEST_COUNT',
    isQuantitative: true,
    metricSubject: 'GENERAL_METRIC',
    measurementScope: 'AUTOMATED_TEST_COLLECTION',
    verificationStatus: 'REPRODUCIBLY_VERIFIED',
    linkedEvidenceIds: ['EVID-ARCHIE-01'],
    wording: {
      headline: '64 automated tests across 9 test suites passing with 100% verification rate',
      qualifiedTechnicalStatement:
        'Archie is validated by 64 automated tests across 9 suites (policy number extraction, bcrypt auth, timing normalization, security headers, document sanitization, adversarial AI defense, heading chunking, FastMCP employee tools, and frontend client validation) achieving 100% pass rate in ~6.13s.',
      mandatoryCaveats: [
        'Verified in local Python 3.12 / Node.js test execution environment.'
      ],
      prohibitedInterpretations: []
    },
    permittedSurfaces: ['PROJECTS_ARCHIVE_CARD', 'SYSTEMS_CASE_STUDY', 'RESUME_DOCUMENT', 'ASK_AADIL_KNOWLEDGE']
  }
]

// ============================================================================
// 4. CANONICAL EVIDENCE RECORDS
// ============================================================================

export const canonicalEvidenceRecords: CanonicalEvidenceRecord[] = [
  {
    evidenceId: 'EVID-DOC-RESUME-01',
    evidenceType: 'EMPLOYMENT_DOCUMENTATION',
    repositoryPathOrArtifact: 'public/resume.pdf (and Mohemmed_Aadil_Khurshid_-_Resume_(1).pdf)',
    measuredValue: 'Verified Resume Credentials',
    measuredUnit: 'PDF Document',
    executionStatus: 'PASS',
    disclosedScope: 'Formal career history, organization tenures, degree credentials, and designations.',
    disclosedLimitations: ['Day-level joining and departure dates are not documented; preserved at month precision.'],
    auditDate: '2026-11-14',
    auditorSignoff: 'Data Integrity & Chronology Auditor'
  },
  {
    evidenceId: 'EVID-SRC-JOURNAL-01',
    evidenceType: 'SOURCE_INVENTORY',
    repositoryPathOrArtifact: 'data/journalSpreads.tsx',
    lineRangeOrSymbol: 'lines 450-470 (Spread 06)',
    measuredValue: 'Content Builder V1 SME Attribution',
    measuredUnit: 'Code Assertion',
    executionStatus: 'PASS',
    disclosedScope:
      'Explicit public disclaimer stating VoyageMath Content Builder V1 was built by VoyageMath Engineering team and Aadil contributed SME testing, bug reports, and workflow feedback.',
    disclosedLimitations: ['Internal draft metadata in sourceConflicts.ts previously had a typo, now reconciled.'],
    auditDate: '2026-11-14',
    auditorSignoff: 'Codebase Forensics Engineer'
  },
  {
    evidenceId: 'EVID-SRC-PROJECTS-01',
    evidenceType: 'SOURCE_INVENTORY',
    repositoryPathOrArtifact: 'data/projects.ts',
    lineRangeOrSymbol: 'Item Bank & Wayground Projects',
    measuredValue: 'Enterprise System Metadata',
    measuredUnit: 'Catalog Records',
    executionStatus: 'PASS',
    disclosedScope: 'Architectural specifications and github: null designations for proprietary systems.',
    disclosedLimitations: ['Public code not available due to employer intellectual property restrictions.'],
    auditDate: '2026-11-14',
    auditorSignoff: 'Principal Software Architect'
  },
  {
    evidenceId: 'EVID-SRC-GIT-01',
    evidenceType: 'TEST_DEFINITION',
    repositoryPathOrArtifact: 'aadil-lang GitHub repositories',
    measuredValue: 'Public Open-Source Repositories',
    measuredUnit: 'Git Repositories',
    executionStatus: 'PASS',
    disclosedScope: 'Public codebases for EDA CAD, OCR Evaluator, Solace AI, and AI Reliability.',
    disclosedLimitations: ['Requires external repository cloning for standalone containerized execution.'],
    auditDate: '2026-11-14',
    auditorSignoff: 'GitHub Forensics Engineer'
  },
  {
    evidenceId: 'EVID-EDA-01',
    projectId: 'proj-design-automation',
    evidenceType: 'TEST_DEFINITION',
    repositoryPathOrArtifact: 'https://github.com/aadil-lang/Engineering-design-automation (tests/test_cad_engine.py)',
    reproductionCommand: 'docker-compose -f tests/docker-compose.test.yml up',
    measuredValue: 424,
    measuredUnit: 'pytests collected across 28 suites',
    executionStatus: 'UNEXECUTED_IN_THIS_REPO',
    disclosedScope: 'Containerized Python OCC and OpenCascade 7.6.0 geometry and physics test matrix.',
    disclosedLimitations: ['Executed in external repository Docker harness; not executed inside root Next.js build.'],
    auditDate: '2026-11-14',
    auditorSignoff: 'CAD Validation Engineer'
  },
  {
    evidenceId: 'EVID-EDA-02',
    projectId: 'proj-design-automation',
    evidenceType: 'MATHEMATICAL_CALCULUS_PROOF',
    repositoryPathOrArtifact: 'https://github.com/aadil-lang/Engineering-design-automation (tests/test_cad_engine.py:lines 45-210)',
    reproductionCommand: 'pytest tests/test_cad_engine.py -k test_volume_consistency',
    measuredValue: '< 10^-6 relative error',
    measuredUnit: 'relative error',
    executionStatus: 'UNEXECUTED_IN_THIS_REPO',
    disclosedScope: 'Stepped cylinder and nominal shaft analytical calculus integrals vs OpenCascade GProp_GProps.',
    disclosedLimitations: [
      'Measures software-level mathematical consistency between analytical calculus formulas and CAD solid kernel mass integrals.',
      'Does not assert physical CNC machining tolerances (e.g. ±0.05 mm).'
    ],
    auditDate: '2026-11-14',
    auditorSignoff: 'Senior AI/ML Engineer'
  },
  {
    evidenceId: 'EVID-OCR-01',
    projectId: 'proj-ocr-evaluator',
    evidenceType: 'TEST_DEFINITION',
    repositoryPathOrArtifact: 'https://github.com/aadil-lang/OCR-benchmark-evaluator (tests/)',
    reproductionCommand: 'pytest -v',
    measuredValue: 134,
    measuredUnit: 'pytests passing across 22 files',
    executionStatus: 'UNEXECUTED_IN_THIS_REPO',
    disclosedScope: 'Multi-engine OCR extraction and LaTeX AST normalization test cases.',
    disclosedLimitations: ['External repository pytest suite.'],
    auditDate: '2026-11-14',
    auditorSignoff: 'QA Engineer'
  },
  {
    evidenceId: 'EVID-OCR-02',
    projectId: 'proj-ocr-evaluator',
    evidenceType: 'TEST_DEFINITION',
    repositoryPathOrArtifact: 'https://github.com/aadil-lang/OCR-benchmark-evaluator (e2e/ocr_ui.spec.ts)',
    reproductionCommand: 'npx playwright test',
    measuredValue: 20,
    measuredUnit: 'browser UI assertions',
    executionStatus: 'UNEXECUTED_IN_THIS_REPO',
    disclosedScope: 'Diff highlighting, file upload, and rendering recovery assertions.',
    disclosedLimitations: ['Playwright headless browser execution.'],
    auditDate: '2026-11-14',
    auditorSignoff: 'QA Engineer'
  },
  {
    evidenceId: 'EVID-ASK-01',
    projectId: 'proj-ask-aadil',
    evidenceType: 'TEST_EXECUTION',
    repositoryPathOrArtifact: 'scripts/test_hardening_agent_qa.ts, scripts/test_controlled_actions.ts, scripts/test_hardening_browser_qa.js',
    reproductionCommand: 'npx tsx scripts/test_hardening_agent_qa.ts && npx tsx scripts/test_controlled_actions.ts',
    measuredValue: 172,
    measuredUnit: 'hardening checks passing',
    executionStatus: 'PASS',
    disclosedScope: '132 agent QA checks, 29 action governance checks, and 11 browser E2E checks in portfolio repo.',
    disclosedLimitations: ['Live test execution verified with exit code 0.'],
    auditDate: '2026-11-14',
    auditorSignoff: 'Principal Full-Stack Engineer'
  },
  {
    evidenceId: 'EVID-ASK-02',
    projectId: 'proj-ask-aadil',
    evidenceType: 'TEST_EXECUTION',
    repositoryPathOrArtifact: 'scripts/ (10 evaluation test scripts)',
    reproductionCommand: 'npx tsx scripts/test_answer_synthesis.ts',
    measuredValue: 327,
    measuredUnit: 'total assertions across 10 suites',
    executionStatus: 'PASS',
    disclosedScope: 'Complete evaluation harness spanning retrieval, query understanding, and voice.',
    disclosedLimitations: ['Verified across 10 evaluation test files.'],
    auditDate: '2026-11-14',
    auditorSignoff: 'Principal Full-Stack Engineer'
  },
  {
    evidenceId: 'EVID-SOLACE-01',
    projectId: 'proj-solace-ai',
    evidenceType: 'TEST_DEFINITION',
    repositoryPathOrArtifact: 'https://github.com/aadil-lang/solace-ai (backend/tests/)',
    reproductionCommand: 'python -m pytest -o asyncio_mode=auto',
    measuredValue: 52,
    measuredUnit: 'pytests across 8 suites',
    executionStatus: 'UNEXECUTED_IN_THIS_REPO',
    disclosedScope: 'LangGraph conversational state machine and streaming audio buffer pytests.',
    disclosedLimitations: ['External repository pytest suite.'],
    auditDate: '2026-11-14',
    auditorSignoff: 'Senior AI/ML Engineer'
  },
  {
    evidenceId: 'EVID-SOLACE-02',
    projectId: 'proj-solace-ai',
    evidenceType: 'TEST_DEFINITION',
    repositoryPathOrArtifact: 'https://github.com/aadil-lang/solace-ai (mobile/__tests__/)',
    reproductionCommand: 'npm test && tsc --noEmit',
    measuredValue: 50,
    measuredUnit: 'mobile Jest checks across 7 suites',
    executionStatus: 'UNEXECUTED_IN_THIS_REPO',
    disclosedScope: 'Jest React Native component tests and TypeScript static typing in mobile package.',
    disclosedLimitations: [
      'Verified in mobile Jest test runner and tsc.',
      'Does NOT represent physical Android device or hardware emulator execution.'
    ],
    auditDate: '2026-11-14',
    auditorSignoff: 'QA Engineer'
  },
  {
    evidenceId: 'EVID-REL-01',
    projectId: 'proj-ai-reliability',
    evidenceType: 'TEST_DEFINITION',
    repositoryPathOrArtifact: 'https://github.com/aadil-lang/ai-application-reliability (tests/)',
    reproductionCommand: 'pytest tests/',
    measuredValue: 158,
    measuredUnit: 'backend test cases',
    executionStatus: 'UNEXECUTED_IN_THIS_REPO',
    disclosedScope: 'FastAPI and MCP SDK failure simulation test cases.',
    disclosedLimitations: ['Represents collected pytest test cases, not distinct test suite files.'],
    auditDate: '2026-11-14',
    auditorSignoff: 'Production Reliability Auditor'
  },
  {
    evidenceId: 'EVID-REL-02',
    projectId: 'proj-ai-reliability',
    evidenceType: 'TEST_DEFINITION',
    repositoryPathOrArtifact: 'https://github.com/aadil-lang/ai-application-reliability (tests/governance/)',
    reproductionCommand: 'playwright test',
    measuredValue: 47,
    measuredUnit: 'governance assertions',
    executionStatus: 'UNEXECUTED_IN_THIS_REPO',
    disclosedScope: 'Playwright DOM probe and covariance bounding checks.',
    disclosedLimitations: ['External repository test runner.'],
    auditDate: '2026-11-14',
    auditorSignoff: 'Production Reliability Auditor'
  },
  {
    evidenceId: 'EVID-VM-01',
    projectId: 'proj-vm-copy',
    evidenceType: 'SOURCE_INVENTORY',
    repositoryPathOrArtifact: 'data/canonical/projectsMetadata.ts, data/experience.ts',
    measuredValue: '< 1 ms eval ($0 API cost)',
    measuredUnit: 'milliseconds (Tier-1 evaluation)',
    executionStatus: 'PASS',
    disclosedScope: 'Local in-memory deterministic regex, option uniqueness, and distractor checking specification.',
    disclosedLimitations: [
      'Source establishes canonical metadata inventory and source-level configuration, not an independent live profiling trace.',
      'Applies strictly to Tier-1 deterministic evaluation; full generative LLM calls take 4–8 seconds and incur standard provider API costs.'
    ],
    auditDate: '2026-11-15',
    auditorSignoff: 'Systems Architect & Provenance Auditor'
  },
  {
    evidenceId: 'EVID-WS-01',
    projectId: 'proj-ai-worksheets',
    evidenceType: 'SOURCE_INVENTORY',
    repositoryPathOrArtifact: 'data/canonical/projectsMetadata.ts',
    measuredValue: '~2h manual to ~3m automated',
    measuredUnit: 'minutes',
    executionStatus: 'PASS',
    disclosedScope: 'Observed automated multi-agent POC pipeline generation runtime documentation.',
    disclosedLimitations: [
      'Source establishes canonical metadata inventory, not an independent live benchmark harness.',
      'Operational comparison against an estimated teacher manual baseline (~2 hours), not a controlled algorithmic benchmark.'
    ],
    auditDate: '2026-11-15',
    auditorSignoff: 'AI/ML Systems Engineer & Provenance Auditor'
  },
  {
    evidenceId: 'EVID-ETL-01',
    projectId: 'proj-curriculum-etl',
    evidenceType: 'SOURCE_INVENTORY',
    repositoryPathOrArtifact: 'data/canonical/projectsMetadata.ts, data/projects.ts',
    measuredValue: '3-tier gate architecture',
    measuredUnit: 'validation stages',
    executionStatus: 'PASS',
    disclosedScope: 'Reviewer, Critic, and CSV Audit validation nodes in Celery Map-Reduce pipeline.',
    disclosedLimitations: ['Architectural design pattern verified in asynchronous batch worker codebase.'],
    auditDate: '2026-11-14',
    auditorSignoff: 'Principal Software Architect'
  },
  {
    evidenceId: 'EVID-ARCHIE-01',
    projectId: 'proj-universal-hr-assistant',
    evidenceType: 'TEST_EXECUTION',
    repositoryPathOrArtifact: 'PHASE_5_TEST_RESULTS.md, README.md',
    measuredValue: '64 passed tests across 9 suites',
    measuredUnit: 'test cases',
    executionStatus: 'PASS',
    disclosedScope: 'Policy extraction, auth timing normalization, security headers, adversarial injection defense, and FastMCP employee tools.',
    disclosedLimitations: ['Tested against local PostgreSQL 16 and ChromaDB in Python 3.12.'],
    auditDate: '2026-11-20',
    auditorSignoff: 'AI Systems Engineer & Security Auditor'
  }
]

// ============================================================================
// 5. CANONICAL CASE STUDY MANIFEST RECORDS (PHASE 2.5C)
// ============================================================================

export const canonicalCaseStudyReferences: CanonicalCaseStudyReference[] = [
  {
    caseStudyId: 'CS-01',
    title: 'Ask Aadil: Web Speech API Streaming Transcript Duplication & Cumulative Stream Reconciliation',
    slug: 'ask-aadil',
    projectId: 'proj-ask-aadil',
    associatedCareerId: 'car-independent-research',
    manifestGovernanceStatus: 'ACCEPTED',
    publicationEligibility: 'PUBLIC_PORTFOLIO_INTERFACE',
    mappedJournalChapters: [
      {
        chapterId: 'ch-21-ask-aadil',
        classification: 'DIRECT',
        relevantAdrIds: ['ADR-VOICE-01', 'ADR-VOICE-02', 'ADR-VOICE-03']
      }
    ],
    adrReferences: [
      {
        adrId: 'ADR-VOICE-01',
        title: 'Deterministic Result-List Assembler',
        status: 'ACCEPTED',
        contentAnchor: 'adr-voice-01'
      },
      {
        adrId: 'ADR-VOICE-02',
        title: 'Configured VAD Silence Threshold',
        status: 'ACCEPTED',
        contentAnchor: 'adr-voice-02'
      },
      {
        adrId: 'ADR-VOICE-03',
        title: 'Single-Shot Submission Latch',
        status: 'ACCEPTED',
        contentAnchor: 'adr-voice-03'
      }
    ],
    canonicalClaimIds: ['CLAIM-ASK-001', 'CLAIM-ASK-002'],
    canonicalEvidenceIds: ['EVID-ASK-01', 'EVID-ASK-02'],
    contentAnchor: 'cs-01'
  },
  {
    caseStudyId: 'CS-02',
    title: 'EDA CAD: Deterministic Calculus vs OpenCascade BRep CAD Solid Mass Properties & Anti-Hallucination Materials Policy',
    slug: 'design-automation',
    projectId: 'proj-design-automation',
    associatedCareerId: 'car-independent-research',
    manifestGovernanceStatus: 'ACCEPTED',
    publicationEligibility: 'PUBLIC_OPEN_SOURCE',
    mappedJournalChapters: [
      {
        chapterId: 'ch-18-design-automation',
        classification: 'DIRECT',
        relevantAdrIds: ['ADR-EDA-01', 'ADR-EDA-02', 'ADR-EDA-03', 'ADR-EDA-04']
      }
    ],
    adrReferences: [
      {
        adrId: 'ADR-EDA-01',
        title: 'Complete LLM Exclusion from Physics',
        status: 'ACCEPTED',
        contentAnchor: 'adr-eda-01'
      },
      {
        adrId: 'ADR-EDA-02',
        title: 'Anti-Hallucination Material Knowledge Base',
        status: 'ACCEPTED',
        contentAnchor: 'adr-eda-02'
      },
      {
        adrId: 'ADR-EDA-03',
        title: 'Discrete Nominal Sizing Policy',
        status: 'ACCEPTED',
        contentAnchor: 'adr-eda-03'
      },
      {
        adrId: 'ADR-EDA-04',
        title: 'CAD <-> Drawing Cross-Validation',
        status: 'ACCEPTED',
        contentAnchor: 'adr-eda-04'
      }
    ],
    canonicalClaimIds: ['CLAIM-EDA-001', 'CLAIM-EDA-002'],
    canonicalEvidenceIds: ['EVID-EDA-01', 'EVID-EDA-02'],
    contentAnchor: 'cs-02'
  },
  {
    caseStudyId: 'CS-03',
    title: 'VM Copy: Tier-1 In-Memory Structural Evaluator & Serverless Micro-Batching',
    slug: 'vm-copy',
    projectId: 'proj-vm-copy',
    associatedCareerId: 'car-wayground-math-sme',
    manifestGovernanceStatus: 'ACCEPTED',
    publicationEligibility: 'EMPLOYER_PROPRIETARY_CASE_STUDY',
    mappedJournalChapters: [
      {
        chapterId: 'ch-11-generation-not-enough',
        classification: 'DIRECT',
        relevantAdrIds: ['ADR-VM-02', 'ADR-VM-03']
      },
      {
        chapterId: 'ch-12-generation-to-evaluation',
        classification: 'DIRECT',
        relevantAdrIds: ['ADR-VM-01']
      },
      {
        chapterId: 'ch-10-in-house-creation',
        classification: 'PARTIAL',
        targetAspect: 'Prompt limit exploration motivating deterministic evaluator',
        relevantAdrIds: ['ADR-VM-01']
      }
    ],
    adrReferences: [
      {
        adrId: 'ADR-VM-01',
        title: 'Tier-1 Deterministic Evaluator Gate',
        status: 'ACCEPTED',
        contentAnchor: 'adr-vm-01'
      },
      {
        adrId: 'ADR-VM-02',
        title: 'Parallel Micro-Batching',
        status: 'ACCEPTED',
        contentAnchor: 'adr-vm-02'
      },
      {
        adrId: 'ADR-VM-03',
        title: 'Regex Un-Fencing',
        status: 'ACCEPTED',
        contentAnchor: 'adr-vm-03'
      }
    ],
    canonicalClaimIds: ['CLAIM-VM-001'],
    canonicalEvidenceIds: ['EVID-VM-01', 'EVID-SRC-JOURNAL-01'],
    contentAnchor: 'cs-03'
  },
  {
    caseStudyId: 'CS-04',
    title: 'AI Application Reliability: Fisher Information Covariance-Based Abstention & Cryptographic Human Authorization',
    slug: 'ai-reliability',
    projectId: 'proj-ai-reliability',
    associatedCareerId: 'car-independent-research',
    manifestGovernanceStatus: 'ACCEPTED',
    publicationEligibility: 'PUBLIC_OPEN_SOURCE',
    mappedJournalChapters: [
      {
        chapterId: 'ch-19-ai-reliability',
        classification: 'DIRECT',
        relevantAdrIds: ['ADR-REL-01', 'ADR-REL-02', 'ADR-REL-03', 'ADR-REL-04']
      }
    ],
    adrReferences: [
      {
        adrId: 'ADR-REL-01',
        title: 'Multi-Modal Evidence via Headless Chromium',
        status: 'ACCEPTED',
        contentAnchor: 'adr-rel-01'
      },
      {
        adrId: 'ADR-REL-02',
        title: 'Fisher Covariance Uncertainty Quantification & Safe Abstention Design',
        status: 'ACCEPTED',
        contentAnchor: 'adr-rel-02'
      },
      {
        adrId: 'ADR-REL-03',
        title: 'Mandatory Human Governance Authorization Design',
        status: 'ACCEPTED',
        contentAnchor: 'adr-rel-03'
      },
      {
        adrId: 'ADR-REL-04',
        title: 'SHA-256 Hash-Linked Provenance Ledger',
        status: 'ACCEPTED',
        contentAnchor: 'adr-rel-04'
      }
    ],
    canonicalClaimIds: ['CLAIM-RELIABILITY-001', 'CLAIM-RELIABILITY-002'],
    canonicalEvidenceIds: ['EVID-REL-01', 'EVID-REL-02'],
    contentAnchor: 'cs-04'
  },
  {
    caseStudyId: 'CS-05',
    title: 'Solace AI: Cross-Platform Real-Time Voice Streaming & Application-Level Audio Buffer Handling',
    slug: 'solace-ai',
    projectId: 'proj-solace-ai',
    associatedCareerId: 'car-independent-research',
    manifestGovernanceStatus: 'ACCEPTED',
    publicationEligibility: 'PUBLIC_OPEN_SOURCE',
    mappedJournalChapters: [
      {
        chapterId: 'ch-22-solace-ai',
        classification: 'DIRECT',
        relevantAdrIds: ['ADR-SOLACE-01', 'ADR-SOLACE-02', 'ADR-SOLACE-03']
      }
    ],
    adrReferences: [
      {
        adrId: 'ADR-SOLACE-01',
        title: 'Application-Level Ephemeral Buffering Design',
        status: 'ACCEPTED',
        contentAnchor: 'adr-solace-01'
      },
      {
        adrId: 'ADR-SOLACE-02',
        title: 'Deterministic Keyword Crisis Safety Screening',
        status: 'ACCEPTED',
        contentAnchor: 'adr-solace-02'
      },
      {
        adrId: 'ADR-SOLACE-03',
        title: 'LangGraph State Machine',
        status: 'ACCEPTED',
        contentAnchor: 'adr-solace-03'
      }
    ],
    canonicalClaimIds: ['CLAIM-SOLACE-001', 'CLAIM-SOLACE-002'],
    canonicalEvidenceIds: ['EVID-SOLACE-01', 'EVID-SOLACE-02'],
    contentAnchor: 'cs-05'
  },
  {
    caseStudyId: 'CS-06',
    title: 'Curriculum Transformation Engine: Column Over-Extraction Guarding & Hierarchy Recovery in Async ETL',
    slug: 'curriculum-etl',
    projectId: 'proj-curriculum-etl',
    associatedCareerId: 'car-wayground-aiml',
    manifestGovernanceStatus: 'ACCEPTED',
    publicationEligibility: 'EMPLOYER_PROPRIETARY_CASE_STUDY',
    mappedJournalChapters: [
      {
        chapterId: 'ch-15-curriculum-etl',
        classification: 'DIRECT',
        relevantAdrIds: ['ADR-ETL-01', 'ADR-ETL-02', 'ADR-ETL-03']
      },
      {
        chapterId: 'ch-14-applications-to-pipelines',
        classification: 'PARTIAL',
        targetAspect: 'AI/ML team transition context',
        relevantAdrIds: ['ADR-ETL-01']
      }
    ],
    adrReferences: [
      {
        adrId: 'ADR-ETL-01',
        title: 'Programmatic Post-Extraction Row Guards',
        status: 'ACCEPTED',
        contentAnchor: 'adr-etl-01'
      },
      {
        adrId: 'ADR-ETL-02',
        title: 'Hierarchy Depth Recovery',
        status: 'ACCEPTED',
        contentAnchor: 'adr-etl-02'
      },
      {
        adrId: 'ADR-ETL-03',
        title: 'Dead-Letter Review Workflow Design',
        status: 'ACCEPTED',
        contentAnchor: 'adr-etl-03'
      }
    ],
    canonicalClaimIds: ['CLAIM-ETL-001'],
    canonicalEvidenceIds: ['EVID-ETL-01', 'EVID-SRC-PROJECTS-01'],
    contentAnchor: 'cs-06'
  },
  {
    caseStudyId: 'CS-07',
    title: 'US Mathematics Item Bank: Visual Domain Routing & Min/Max Swap Optimization',
    slug: 'us-mathematics-item-bank',
    projectId: 'proj-item-bank',
    associatedCareerId: 'car-wayground-aiml',
    manifestGovernanceStatus: 'ACCEPTED',
    publicationEligibility: 'EMPLOYER_PROPRIETARY_CASE_STUDY',
    mappedJournalChapters: [
      {
        chapterId: 'ch-07-making-math-visual',
        classification: 'DIRECT',
        relevantAdrIds: ['ADR-IB-01', 'ADR-IB-02']
      },
      {
        chapterId: 'ch-07-making-math-visual',
        classification: 'PARTIAL',
        targetAspect: 'Min/Max Swap stratified sampling optimization across curriculum standards',
        relevantAdrIds: ['ADR-IB-03']
      }
    ],
    adrReferences: [
      {
        adrId: 'ADR-IB-01',
        title: 'Domain-Specific Visual Routing',
        status: 'ACCEPTED',
        contentAnchor: 'adr-ib-01'
      },
      {
        adrId: 'ADR-IB-02',
        title: 'TikZ Syntax Validation Gates',
        status: 'ACCEPTED',
        contentAnchor: 'adr-ib-02'
      },
      {
        adrId: 'ADR-IB-03',
        title: 'Min/Max Swap Stratified Sampling',
        status: 'ACCEPTED',
        contentAnchor: 'adr-ib-03'
      }
    ],
    canonicalClaimIds: [],
    canonicalEvidenceIds: ['EVID-SRC-PROJECTS-01'],
    unresolvedClaimPrerequisites: ['CLAIM-IB-001', 'CLAIM-IB-002'],
    unresolvedEvidencePrerequisites: ['EVID-IB-01', 'EVID-IB-02'],
    contentAnchor: 'cs-07'
  },
  {
    caseStudyId: 'CS-08',
    title: 'DiffGuard: Separate Repository and Evidence Boundary',
    slug: 'diffguard',
    projectId: null,
    associatedCareerId: null,
    manifestGovernanceStatus: 'SEPARATE_REPOSITORY_DEFERRED',
    publicationEligibility: 'RESTRICTED_OR_INTERNAL_ONLY',
    mappedJournalChapters: [],
    adrReferences: [],
    canonicalClaimIds: [],
    canonicalEvidenceIds: [],
    externalEvidenceReferences: [
      {
        externalRepository: 'aadil-lang/diffguard',
        externalReferenceId: 'EXT-DIFF-CLAIM-001',
        referenceType: 'EXTERNAL_CLAIM',
        description: 'Deterministic AST diff guard engine against model hallucinations in agent-generated PRs.',
        verificationLocality: 'EXTERNAL_REPOSITORY'
      },
      {
        externalRepository: 'aadil-lang/diffguard',
        externalReferenceId: 'EXT-DIFF-EVID-01',
        referenceType: 'EXTERNAL_EVIDENCE',
        description: 'External CI test suite and verification commands executed in diffguard repository.',
        verificationLocality: 'EXTERNAL_REPOSITORY'
      }
    ],
    contentAnchor: 'cs-08'
  }
]

// ============================================================================
// 6. ROOT CANONICAL REGISTRY OBJECT
// ============================================================================

export const canonicalRegistry: CanonicalRegistry = {
  schemaVersion: '1.0.0',
  lastAudited: '2026-11-16',
  careerRecords: canonicalCareerRecords,
  projectRecords: canonicalProjectRecords,
  claimRecords: canonicalClaimRecords,
  evidenceRecords: canonicalEvidenceRecords,
  caseStudyReferences: canonicalCaseStudyReferences
}

// ============================================================================
// 7. IN-MEMORY METADATA LOOKUP HELPERS (CLIENT & SERVER SAFE)
// ============================================================================

/**
 * Synchronous in-memory lookup for a canonical case-study reference by ID.
 * Runs safely in browser client components, edge runtimes, or Node.js.
 */
export function getCaseStudyManifest(id: CaseStudyId): CanonicalCaseStudyReference | undefined {
  return canonicalCaseStudyReferences.find(cs => cs.caseStudyId === id)
}

/**
 * Synchronous in-memory lookup for a canonical ADR reference by ID across all case studies.
 * Runs safely in browser client components, edge runtimes, or Node.js.
 */
export function getAdrManifest(adrId: AdrId): CanonicalAdrReference | undefined {
  for (const cs of canonicalCaseStudyReferences) {
    const adr = cs.adrReferences.find(a => a.adrId === adrId)
    if (adr) return adr
  }
  return undefined
}
