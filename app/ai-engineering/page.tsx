"use client"
import React, { useState } from 'react'
import ArchitectureViz from '../../components/ArchitectureViz'
import { Bot, Cpu, Layers, ShieldCheck, Terminal, Workflow, CheckCircle2, Binary, Sparkles } from 'lucide-react'

const capabilities = [
  {
    title: 'Autonomous Browser Agents & Guardrails',
    icon: Workflow,
    description:
      'Designing local-first agent workflows with Ollama Qwen 2.5 Coder and Playwright. Observation-Reasoning-Action loops strictly bounded by token-efficient DOM extractors and deterministic action whitelists.',
    technologies: ['Ollama (Qwen 2.5 Coder)', 'Playwright', 'DOM Extractor', 'Model Context Protocol (MCP)']
  },
  {
    title: 'Stateful Agent Orchestration & Workflows',
    icon: Layers,
    description:
      'Architecting cyclic state-machine workflows where specialized agent roles coordinate with structured feedback, checkpointed state persistence, and bounded execution retry budgets.',
    technologies: ['LangGraph', 'StateGraph', 'Python 3.12', 'FastAPI', 'Cyclic Recovery', 'Bounded Retry Controls']
  },
  {
    title: 'Deterministic Guardrails & Epistemic Abstention',
    icon: ShieldCheck,
    description:
      'Calculating Fisher Information parameter covariance and Levenshtein edit distance to evaluate predictive uncertainty. Systems return explicit abstentions or FAIL gates instead of hallucinating false certainty.',
    technologies: ['Pydantic v2', 'Fisher Covariance', 'CER / WER Levenshtein', 'Structured Outputs', 'Risk Gates']
  },
  {
    title: 'Hybrid AI & Deterministic Engineering Solvers',
    icon: Cpu,
    description:
      'Decoupling semantic interpretation from physical truth. LLMs parse unstructured briefs into typed schemas, while deterministic Python solvers execute formulas and generate validated STEP 3D CAD models.',
    technologies: ['OpenCascade (PythonOCC)', '3D STEP BRep', 'SVG Blueprints', 'FastAPI', 'Saint-Venant Physics']
  }
]

export default function AIEngineering() {
  const [selectedPattern, setSelectedPattern] = useState<
    'ask-aadil' | 'solace' | 'ocr' | 'reliability' | 'eda' | 'worksheets' | 'qgen' | 'atlas' | 'overview'
  >('ask-aadil')

  const patterns = [
    { id: 'ask-aadil', label: 'Ask Aadil (Grounded Agent)' },
    { id: 'solace', label: 'Solace AI (Mobile Companion)' },
    { id: 'ocr', label: 'OCR Evaluator (Multi-Tier Risk)' },
    { id: 'reliability', label: 'Browser QA (AI Reliability)' },
    { id: 'eda', label: 'Design Automation (CAD Physics)' },
    { id: 'worksheets', label: 'Multi-Model Pipeline (Worksheets)' },
    { id: 'qgen', label: 'Deterministic Eval (Question Gen)' },
    { id: 'atlas', label: 'SEC RAG & Copilot (Atlas AI)' }
  ] as const

  return (
    <section className="max-w-5xl mx-auto space-y-12 pb-16 px-4">
      {/* Page Header */}
      <div className="space-y-2 pt-2">
        <span className="text-xs uppercase tracking-wider font-mono text-[#5A9A78]">
          SYSTEMS & METHODOLOGY // AI ENGINEERING
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F0EEE9] font-serif">
          AI Engineering Stack & Architecture
        </h1>
        <p className="text-sm sm:text-base text-[#9EA4AA] max-w-3xl leading-relaxed">
          How I construct production-ready AI systems: moving beyond prompt wrappers into stateful agent graphs, deterministic engineering solvers, mathematical evaluations, and verifiable reliability platforms.
        </p>
      </div>

      {/* Interactive System Architecture Showcase */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#242930] pb-3">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-[#5A9A78]" />
            <h2 className="text-lg sm:text-xl font-bold text-[#F0EEE9] font-serif">Interactive Architecture Explorer</h2>
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {patterns.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedPattern(p.id)}
                className={`px-3 py-1.5 text-xs rounded-lg font-mono font-medium transition-all cursor-pointer ${
                  selectedPattern === p.id
                    ? 'bg-[#22272E] text-[#F0EEE9] border border-[#3E4652] shadow-sm'
                    : 'bg-[#14171A] border border-[#262B32] text-[#858A90] hover:text-[#F0EEE9] hover:border-[#3E4652]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <ArchitectureViz pattern={selectedPattern} />
      </div>

      {/* Capability Cards */}
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#F0EEE9] font-serif">Core Architectural Competencies</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {capabilities.map((cap) => {
            const Icon = cap.icon
            return (
              <div
                key={cap.title}
                className="p-6 rounded-xl border border-[#262B32] bg-[#14171A] space-y-4 hover:border-[#3E4652] transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#18261F] border border-[#234030] text-[#5A9A78] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#F0EEE9] mb-1.5 font-serif">{cap.title}</h3>
                  <p className="text-xs sm:text-sm text-[#9EA4AA] leading-relaxed">{cap.description}</p>
                </div>

                <div className="pt-2 flex flex-wrap gap-1.5">
                  {cap.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 text-xs font-mono rounded bg-[#181C21] border border-[#262B32] text-[#858A90]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
