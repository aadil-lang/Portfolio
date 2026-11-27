import { LucideIcon } from 'lucide-react'

export interface StudioStation {
  id: string
  number: string
  title: string
  codeName: string
  subtitle: string
  description: string
  route: string
  anchor: string
  accentColor: string
  stats: string
  featuredSystems: string[]
}

export const STUDIO_STATIONS: StudioStation[] = [
  {
    id: 'workbench',
    number: '01',
    title: 'Workbench',
    codeName: 'SPACE 01 // PRODUCTION SYSTEMS & HARNESSES',
    subtitle: 'Completed Engineering Systems & Case Studies',
    description:
      'Production-oriented AI software, stateful multi-agent workflows, and high-throughput backend pipelines built with deterministic validation harnesses.',
    route: '/systems',
    anchor: '#workbench',
    accentColor: '#78C29A',
    stats: '12 Verified Systems • 771 Automated Checks',
    featuredSystems: ['Archie', 'Ask Aadil', 'Solace AI', 'Curriculum Transformation']
  },
  {
    id: 'systems-lab',
    number: '02',
    title: 'Systems Lab',
    codeName: 'SPACE 02 // ARCHITECTURE & DATAFLOWS',
    subtitle: 'System Architecture Diagrams & Component Isolation',
    description:
      'Interactive architecture explorer detailing cyclic state machines, supervisor-worker topologies, RAG pipelines, and failure containment barriers.',
    route: '/architecture',
    anchor: '#systems-lab',
    accentColor: '#58A6FF',
    stats: '11 Architecture Graphs • 18 Decision Records',
    featuredSystems: ['StateGraph Routing', 'Dual-Layer Evaluator', 'MCP Tool Peer Isolation']
  },
  {
    id: 'experiment-lab',
    number: '03',
    title: 'Experiment Lab',
    codeName: 'SPACE 03 // EMPIRICAL BENCHMARKS & EVALS',
    subtitle: 'Research, Empirical Evals & Stress Tests',
    description:
      'Rigorous technical explorations comparing deterministic solvers vs probabilistic LLMs, CER/WER degradation curves, and adversarial prompt-injection tests.',
    route: '/experiments',
    anchor: '#experiment-lab',
    accentColor: '#F2994A',
    stats: '5 Empirical Benchmark Suites • Zero Fabrication',
    featuredSystems: ['RAG Lab', 'Levenshtein Stress Suite', 'CAD Solid Volume Solver']
  },
  {
    id: 'journal',
    number: '04',
    title: 'Engineering Journal',
    codeName: 'SPACE 04 // EDITORIAL LOGBOOK & ESSAYS',
    subtitle: 'Technical Thinking, Failures & Architectural Trade-offs',
    description:
      'In-depth technical chapters exploring what broke in production, why specific algorithms were chosen, and how engineering rigor replaces prompt luck.',
    route: '/journal',
    anchor: '#journal',
    accentColor: '#BB86FC',
    stats: '8 Editorial Chapters • 18 ADRs Linked',
    featuredSystems: ['Epistemic Boundaries', 'Why LangGraph Failed & Succeeded', 'Saint-Venant Physics']
  },
  {
    id: 'about',
    number: '05',
    title: 'About the Engineer',
    codeName: 'SPACE 05 // PROFESSIONAL IDENTITY & CREDENTIALS',
    subtitle: 'Career Trajectory, Wayground Tenure & Verified Background',
    description:
      'Mohemmed Aadil Khurshid — AI Systems Engineer. 2.7 years continuous Wayground engineering tenure, mechanical engineering foundation, and verified contact channels.',
    route: '/about',
    anchor: '#about',
    accentColor: '#78C29A',
    stats: '4 Years Engineering • Verified 2-Page Resume',
    featuredSystems: ['Wayground AI Engineer', 'Wayground SME', 'Independent Research']
  }
]
