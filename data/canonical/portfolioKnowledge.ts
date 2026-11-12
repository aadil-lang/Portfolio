import { structuredProfile } from './structuredProfile'
import { resumeData } from './resumeData'
import { projectsMetadata } from './projectsMetadata'
import { timelineData } from '@/data/experience'
import { chapters, prologue, epilogue } from '@/data/chapters'
import { projects as systemsCatalog } from '@/data/projects'
import { ProjectMetadata, SourceType, PortfolioLayer } from '@/types/rag'

/**
 * CANONICAL PORTFOLIO KNOWLEDGE DOMAINS
 * 
 * Provides explicit, structured knowledge domain accessors across:
 * 1. IDENTITY - Who is Aadil (verified positioning, mechanical engineering, trajectory)
 * 2. ABOUT - Beyond job titles (Journal prologue/about, motivations, foundations)
 * 3. FOUNDATIONS - 7 core engineering principles from Epilogue
 * 4. CAREER - Formal roles, tenures, titles, promotion from Content SME to AI/ML Team
 * 5. TIMELINE - Chronological progression from content to governed AI systems
 * 6. PROJECTS - Authoritative project inventory with ownership, status, evidence
 * 7. TECHNOLOGIES - Canonical mapping of frameworks and libraries to systems
 * 8. CONTRIBUTIONS - Explicit boundaries for team systems vs independent builds
 * 9. CURRENT_FOCUS - Documented post-Wayground research, reliability tooling, temporal boundary
 * 10. CONTACT - Canonical contact channels and profile destinations
 */

export const canonicalKnowledge = {
  // 1. IDENTITY
  identity: {
    fullName: structuredProfile.name,
    legalOrFormalName: structuredProfile.legalOrFormalName,
    professionalPositioning: structuredProfile.portfolioPositioning,
    background: 'Mechanical Engineering (B.Tech Hons., 2017) with foundational work in Mathematics Content & SME education.',
    earlyIdentity: 'Mathematics Content Developer and Subject Matter Expert specializing in K-12 curriculum standards (Common Core, TEKS) and mathematical representations.',
    careerProgression: 'Progressed from K-12 mathematics content development through programmatic authoring tools (VM Copy) into AI systems engineering, asynchronous ETL pipelines, CAD/physics automation, and autonomous agent reliability testing.',
    centralPortfolioThread: 'Language models provide flexible translation and reasoning, but engineering integrity requires rigorous, deterministic verification harnesses.',
    currentDocumentedFocus: 'Independent AI systems research and autonomous agent reliability tooling; no subsequent corporate employer documented following the July 2026 Wayground conclusion.'
  },

  // 2. ABOUT
  about: {
    narrative: prologue.narrative,
    summary: prologue.summary,
    quote: prologue.quote,
    personalStatement:
      'Aadil approaches AI with an engineering mindset rooted in mechanical physics and mathematical precision: in mathematics, a step is either valid or invalid with no plausible middle ground. His career was not a predetermined path, but an organic progression driven by solving concrete workflow bottlenecks, uncovering failure modes in probabilistic models, and placing deterministic software wrappers around generative pipelines.'
  },

  // 3. FOUNDATIONS
  foundations: {
    title: epilogue.title,
    thesis: epilogue.thesis,
    principles: epilogue.principles.map(p => ({
      title: p.title,
      description: p.description
    }))
  },

  // 4. CAREER
  career: {
    formalRoles: resumeData.experience.map(exp => ({
      company: exp.company,
      role: exp.role,
      period: exp.period,
      start: exp.start,
      end: exp.end,
      achievements: exp.achievements,
      projects: exp.projects
    })),
    education: structuredProfile.education,
    internalPromotionWayground: {
      roleFrom: 'Subject Matter Expert — Mathematics (Jan 2024 – Dec 2025)',
      roleTo: 'AI Engineer / Consultant, AI/ML Team (Jan 2026 – Jul 2026)',
      catalyst: 'Independently architecting and deploying the VM Copy Question Generator in production to solve question authoring latency, which catalyzed the internal transition to the engineering team.'
    }
  },

  // 5. TIMELINE
  timeline: timelineData.map(item => ({
    id: item.id,
    period: item.period,
    title: item.title,
    organization: item.organization,
    role: item.role,
    layerAnnotation: item.layerAnnotation,
    summary: item.summary,
    details: item.details,
    technologies: item.technologies,
    journalChapterRef: item.journalChapterRef,
    systemSlugRef: item.systemSlugRef
  })),

  // 6. PROJECTS (Authoritative Inventory)
  projects: {
    getAll(): ProjectMetadata[] {
      return projectsMetadata
    },
    getBySlug(slug: string): ProjectMetadata | undefined {
      return projectsMetadata.find(p => p.slug === slug)
    },
    getIndependent(): ProjectMetadata[] {
      return projectsMetadata.filter(p => p.ownership === 'independent')
    },
    getTeam(): ProjectMetadata[] {
      return projectsMetadata.filter(p => p.ownership === 'team' || p.ownership === 'contribution')
    }
  },

  // 7. TECHNOLOGIES
  technologies: {
    getByTech(techQuery: string): ProjectMetadata[] {
      const q = techQuery.toLowerCase()
      return projectsMetadata.filter(p =>
        p.technologies.some(t => t.toLowerCase().includes(q))
      )
    },
    getAllDistinct(): string[] {
      const set = new Set<string>()
      projectsMetadata.forEach(p => p.technologies.forEach(t => set.add(t)))
      return Array.from(set).sort()
    }
  },

  // 8. CONTRIBUTIONS (Strict Team Boundaries)
  contributions: [
    {
      projectSlug: 'math-item-bank',
      title: 'US Mathematics Item Bank Generation Pipeline',
      systemType: 'team',
      organization: 'Wayground (Quizizz) AI/ML Team',
      period: '2026-03 — 2026-06',
      framingRule: 'Must be described as a team system; Aadil contributed specific components.',
      documentedContribution: [
        'Domain-based mathematical image representation routing (routing Coordinate Geometry to TikZ/LaTeX and Plane Geometry to Parametric SVG).',
        'Two-tier artifact evaluation: exit-code validation on headless pdflatex TikZ compilation plus vision model inspection.',
        'Upper Elementary and Middle School question generation pipeline stabilization.',
        'Open-ended item types and image-based answer options.'
      ],
      notAuthoredSolely: 'The complete enterprise repository, surrounding microservices, and general orchestration infrastructure are team artifacts.'
    }
  ],

  // 9. CURRENT FOCUS (Strict Temporal Grounding)
  currentFocus: {
    lastDocumentedEngagement: {
      organization: 'Wayground',
      role: 'AI Engineer / Consultant, AI/ML Team',
      conclusionDate: 'July 2026',
      status: 'concluded'
    },
    subsequentCorporateEmployer: null, // Unrecorded / unverified. Never assume or fabricate.
    currentDocumentedActivity: [
      'August 2026 — Present: Still building and still exploring across independent AI systems, deterministic tooling, and hackathon builds.',
      'This Engineering Portfolio & Ask Aadil (Sep 2026): interactive Next.js engineering journal, timeline map, and grounded hybrid RAG assistant (172/172 verified tests across 10+ suites).',
      'OCR Evaluation & Robustness Testing Platform (Sep 2026): multi-tier extraction evaluation (CER/WER), risk classification, and physical degradation testing (134 backend pytests + 20 UI assertions).',
      'Autonomous agent reliability tooling and diagnostic harnesses (AI Application Reliability Platform).',
      'Deterministic verification wrappers and governed multi-agent systems.',
      'Solace AI (Solace Hackathon, Nov 2026): safety-first Expo 58 + FastAPI/LangGraph mobile wellness companion.'
    ],
    verifiedDate: '2026-11-10'
  },

  // 10. CONTACT (Strict Profile Only)
  contact: {
    email: structuredProfile.email,
    secondaryEmail: structuredProfile.secondaryEmail,
    phone: structuredProfile.phone,
    location: structuredProfile.location,
    linkedinUrl: structuredProfile.linkedinUrl,
    githubUrls: structuredProfile.githubUrls,
    openToWork: structuredProfile.openToWork
  }
}
