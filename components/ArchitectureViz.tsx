"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Bot, Cpu, Database, Globe, Layers, ShieldCheck, Terminal, Workflow, FileText, CheckCircle2, ArrowRight } from 'lucide-react'

type PatternType = 'reliability' | 'eda' | 'worksheets' | 'qgen' | 'atlas' | 'textile' | 'taskmanager' | 'overview' | 'etl' | 'ask-aadil'

interface Step {
  title: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
}

const patternConfigs: Record<PatternType, { label: string; steps: Step[] }> = {
  reliability: {
    label: 'AI Application Reliability & Autonomous QA Architecture',
    steps: [
      { title: 'Target App Under Test', subtitle: 'Live Next.js VM Copy app on port 3000', icon: Globe },
      { title: 'Playwright Engine', subtitle: 'Headless Chromium DOM, PNG, HAR, logs', icon: Layers },
      { title: 'Behavioral Evaluator', subtitle: 'Deterministic 4-option & single CA contracts', icon: ShieldCheck },
      { title: 'Ollama Reasoner', subtitle: 'Local Qwen 2.5 diagnostic root-cause synthesis', icon: Bot },
      { title: 'Fisher Covariance Engine', subtitle: 'Uncertainty estimation & automated abstention', icon: Cpu },
      { title: 'Governance & Provenance', subtitle: 'Human authorization gate & SHA-256 chain', icon: ShieldCheck }
    ]
  },
  eda: {
    label: 'Engineering Design Automation (Hybrid AI + Deterministic Solvers)',
    steps: [
      { title: 'Natural Language Brief', subtitle: 'Operational power, speed, material intent', icon: FileText },
      { title: 'LLM Spec Extractor', subtitle: 'Structured schema with character span provenance', icon: Bot },
      { title: 'Material Knowledge Base', subtitle: 'Deterministic ASTM/EN tables; blocks generic steel', icon: Database },
      { title: 'Closed-Form Torsion Solver', subtitle: 'Saint-Venant equations & von Mises shear yield', icon: Cpu },
      { title: 'Nominal Sizing Policy', subtitle: 'Standard ISO metric series quantization', icon: Layers },
      { title: 'OpenCascade CAD & SVG', subtitle: '3D STEP (0.0000% volume error) & 100% drawing audit', icon: ShieldCheck }
    ]
  },
  worksheets: {
    label: 'AI Worksheets Dual-Pipeline Architecture (Formal & Gamified)',
    steps: [
      { title: 'Teacher Configuration', subtitle: 'React 18 / Vite 6 builder selecting TEKS standard & subskills', icon: Globe },
      { title: 'Multi-Model Routing', subtitle: 'Portkey GPT-4o for questions, Gemini Flash for TikZ, GPT-5.2 for puzzles', icon: Workflow },
      { title: 'Formal TikZ Compiler', subtitle: 'Headless pdflatex + pdftoppm (300 DPI) with MD5 content cache', icon: Cpu },
      { title: 'Gamified Graph Solvers', subtitle: '2D crossword backtracking solver & honeycomb hex maze DFS engine', icon: Layers },
      { title: 'Pedagogical Verification', subtitle: 'Second-pass critic LLM check & arithmetic mistake distractor models', icon: ShieldCheck },
      { title: 'Dual Publishing', subtitle: 'WeasyPrint paged PDF, ReportLab vector PDF & interactive student web app', icon: CheckCircle2 }
    ]
  },
  qgen: {
    label: 'VM Copy Question Generator (Deterministic Guardrails)',
    steps: [
      { title: 'Base Question & SME Notes', subtitle: 'Source math item, notes, optional diagram', icon: FileText },
      { title: 'Vision Pre-Analyzer', subtitle: 'One-time coordinate & HTML table extraction', icon: Layers },
      { title: 'Parallel Batch Dispatch', subtitle: 'Micro-batches (2-3 items via Promise.all)', icon: Workflow },
      { title: 'Tier-1 Evaluator', subtitle: '4 options, single CA, duplicate rejection (0ms, $0)', icon: ShieldCheck },
      { title: 'Tier-2/3 Auditor & Auto-Fix', subtitle: 'Zero-temperature adversarial blind-solve', icon: Bot }
    ]
  },
  atlas: {
    label: 'US Mathematics Item Bank Generation Pipeline (Team Project)',
    steps: [
      { title: 'Mathematical Intent', subtitle: 'State curriculum standards & assessment question specs', icon: FileText },
      { title: 'Domain Identification', subtitle: 'Geometry routed to SVG; graphs & number lines to TikZ', icon: Workflow },
      { title: 'Candidate Generation', subtitle: 'Semantic prompt blueprints generating SVG/TikZ code & option images', icon: Bot },
      { title: 'Code Compilation Check', subtitle: 'Deterministic TikZ compilation evaluation (pass/fail gate)', icon: Terminal },
      { title: 'Rendered Visual Check', subtitle: 'Vision-based evaluation checking image matches mathematical intent', icon: ShieldCheck },
      { title: 'Item Bank Acceptance', subtitle: 'Stabilized Upper Elementary & Middle School assessment items', icon: CheckCircle2 }
    ]
  },
  etl: {
    label: 'Curriculum Transformation Engine (Dynamic Contracts & 3-Tier Gate)',
    steps: [
      { title: 'Heterogeneous Inputs', subtitle: 'PDF, DOCX, web sources via Crawl4AI', icon: FileText },
      { title: 'Dynamic Contract Engine', subtitle: 'Sample CSV derived schema & column rules', icon: Layers },
      { title: 'Parallel Chunk Extractor', subtitle: 'ThreadPoolExecutor concurrent Claude/Gemini calls', icon: Bot },
      { title: 'Transformation Reviewer', subtitle: 'Merged evaluate-and-fix LLM verification pass', icon: Workflow },
      { title: 'Programmatic Row Guards', subtitle: '3-bucket grade levels & column blank enforcement', icon: Terminal },
      { title: 'Source CSV Audit Agent', subtitle: 'Adversarial defect check against source text slices', icon: ShieldCheck }
    ]
  },
  overview: {
    label: 'Atlas AI Financial Copilot Architecture',
    steps: [
      { title: 'Telegram Interface', subtitle: 'Webhook bot handling text, charts via Vision, and voice via Whisper', icon: Globe },
      { title: 'LangGraph State Machine', subtitle: 'StateGraph routing intent across research, alerts & SEC queries', icon: Workflow },
      { title: 'Market & SEC Gateways', subtitle: 'Live Finnhub market quotes & SEC EDGAR primary filings (10-K, 10-Q, 8-K)', icon: Terminal },
      { title: 'Vector RAG Engine', subtitle: 'Gemini Embeddings & MongoDB Atlas Vector Search', icon: Database },
      { title: 'Proactive Alert Worker', subtitle: 'FastAPI background worker with alert history deduplication', icon: Cpu },
      { title: 'Pytest Suite (178 Tests)', subtitle: '178 passing tests verifying routing, providers, and state transitions', icon: ShieldCheck }
    ]
  },
  textile: {
    label: 'Loom AI B2B Marketplace Architecture',
    steps: [
      { title: 'Next.js 16 Frontend', subtitle: 'Dual Buyer & Supplier portals (React 19, Redux Toolkit, TanStack Query)', icon: Globe },
      { title: 'Express 5 Clean Architecture', subtitle: 'Layered controllers, services, repositories, and role-based JWT auth', icon: ShieldCheck },
      { title: 'LangGraph Workflows', subtitle: 'Supervisor routing, procurement state graph, and HITL approval queue', icon: Bot },
      { title: 'Textile Search & RAG', subtitle: 'MongoDB compound text indexes and in-memory cosine vector store', icon: Database },
      { title: 'Playwright E2E & API Suite', subtitle: 'Automated browser tests for registration/checkout and API regression runner', icon: Terminal }
    ]
  },
  taskmanager: {
    label: 'Enterprise Modular Clean Architecture',
    steps: [
      { title: 'Next.js Client', subtitle: 'Drag-and-drop Kanban interface', icon: Globe },
      { title: 'NestJS Gateway', subtitle: 'Validation pipes & RBAC guards', icon: ShieldCheck },
      { title: 'Domain Services', subtitle: 'State-machine task transitions', icon: Layers },
      { title: 'Prisma ORM', subtitle: 'Type-safe relational database access', icon: Cpu },
      { title: 'PostgreSQL DB', subtitle: 'ACID transaction storage', icon: Database }
    ]
  },
  'ask-aadil': {
    label: 'Ask Aadil — Stateful Retrieval, Source Authority & Controlled Actions',
    steps: [
      { title: 'Visitor Session', subtitle: 'Turn-by-turn stateful conversational interface with ephemeral session isolation', icon: Globe },
      { title: 'Intent & Entity Router', subtitle: 'Deterministic entity tracking, multi-turn pronoun resolution & guardrails', icon: Workflow },
      { title: 'Source-Aware Retrieval', subtitle: 'Timeline (When), Journal (Why), Systems (What), Resume, GitHub & LinkedIn', icon: Database },
      { title: 'Grounded Answer & Badging', subtitle: 'Non-speculative synthesis citing granular provenance badges', icon: Bot },
      { title: 'Controlled Action Pipeline', subtitle: 'Contextual draft generation with editable natural-language refinement', icon: Terminal },
      { title: 'Explicit Execution Gate', subtitle: 'Human-in-the-loop confirmation gate prior to mail client execution (172 tests)', icon: ShieldCheck }
    ]
  }
}

export default function ArchitectureViz({
  pattern = 'reliability',
  compact = false,
  theme = 'dark'
}: {
  pattern?: string
  compact?: boolean
  theme?: 'dark' | 'paper'
}) {
  const currentPattern = (patternConfigs[pattern as PatternType] ? pattern : 'reliability') as PatternType
  const config = patternConfigs[currentPattern]
  const isPaper = theme === 'paper'

  return (
    <div
      className={`rounded border ${
        isPaper
          ? 'border-[#D4CFBE] bg-[#EFECE3]/75 text-[#25282A]'
          : 'border-[#2A2F36] bg-[#14171A] text-[#F0EEE9]'
      } ${compact ? 'p-2.5 text-xs' : 'p-4 sm:p-5'}`}
    >
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between pb-2 mb-2.5 border-b ${
          isPaper ? 'border-[#DBD6C6]' : 'border-[#22262C]'
        } gap-1`}
      >
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${isPaper ? 'bg-[#437A5D]' : 'bg-[#5A9A78]'}`} />
          <span
            className={`${compact ? 'text-[11px]' : 'text-xs'} font-mono font-semibold truncate ${
              isPaper ? 'text-[#1E2124]' : 'text-[#D8D6D0]'
            }`}
          >
            {config.label}
          </span>
        </div>
        <span
          className={`text-[9px] font-mono uppercase tracking-wider shrink-0 ${
            isPaper ? 'text-[#686E77]' : 'text-[#686E77]'
          }`}
        >
          SCHEMATIC // {config.steps.length} STAGES
        </span>
      </div>

      <div
        className={`grid ${
          compact ? 'grid-cols-1 sm:grid-cols-2 gap-1.5' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'
        }`}
      >
        {config.steps.map((step, idx) => {
          const Icon = step.icon
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.02 }}
              className={`relative ${compact ? 'p-2' : 'p-3.5'} rounded border transition-colors ${
                isPaper
                  ? 'bg-[#F7F5EE] border-[#D8D3C4] hover:border-[#4A6577]/50 shadow-[0_1px_2px_rgba(0,0,0,0.04)]'
                  : 'bg-[#181B1F] border-[#242930] hover:border-[#3E4652]'
              }`}
            >
              <div className="flex items-start gap-2">
                <div
                  className={`${compact ? 'p-1' : 'p-2'} rounded border shrink-0 mt-0.5 ${
                    isPaper
                      ? 'bg-[#EAE6DB] border-[#D4CFC0] text-[#3D5A6E]'
                      : 'bg-[#14171A] border-[#262B32] text-[#71899A]'
                  }`}
                >
                  <Icon className={`${compact ? 'w-3 h-3' : 'w-4 h-4'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span
                      className={`text-[9px] font-mono font-bold ${
                        isPaper ? 'text-[#4A6577]' : 'text-[#71899A]'
                      }`}
                    >
                      0{idx + 1}.
                    </span>
                    <h5
                      className={`font-mono text-[10.5px] font-bold truncate ${
                        isPaper ? 'text-[#1E2124]' : 'text-[#F0EEE9]'
                      }`}
                    >
                      {step.title}
                    </h5>
                  </div>
                  <p
                    className={`text-[9.5px] mt-0.5 leading-snug line-clamp-2 ${
                      isPaper ? 'text-[#555C62]' : 'text-[#858A90]'
                    }`}
                  >
                    {step.subtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
