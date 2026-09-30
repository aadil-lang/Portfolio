"use client"
import React, { useState } from 'react'
import ArchitectureViz from '../../components/ArchitectureViz'
import { Bot, Cpu, Layers, ShieldCheck, Terminal, Workflow, CheckCircle2 } from 'lucide-react'

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
    technologies: ['State Machines', 'Python', 'FastAPI', 'Cyclic Recovery', 'Bounded Retry Controls']
  },
  {
    title: 'Deterministic Guardrails & Epistemic Abstention',
    icon: ShieldCheck,
    description:
      'Calculating Fisher Information parameter covariance and Empirical Bayes shrinkage to evaluate predictive uncertainty. Systems return RELIABILITY_ABSTAINED instead of hallucinating false certainty.',
    technologies: ['Pydantic v2', 'Fisher Covariance', 'Empirical Bayes', 'Structured Outputs']
  },
  {
    title: 'Hybrid AI & Deterministic Engineering Solvers',
    icon: Cpu,
    description:
      'Decoupling semantic interpretation from physical truth. LLMs parse unstructured briefs into typed schemas, while deterministic Python solvers execute formulas and generate validated STEP 3D CAD models.',
    technologies: ['CadQuery / STEP BRep', 'SVG Engine', 'FastAPI', 'Docker', 'Automated CAD Cross-Validation']
  }
]

export default function AIEngineering() {
  const [selectedPattern, setSelectedPattern] = useState<'reliability' | 'eda' | 'worksheets' | 'qgen' | 'atlas' | 'overview'>('reliability')

  const patterns = [
    { id: 'reliability', label: 'Browser QA (Reliability)' },
    { id: 'eda', label: 'Hybrid AI/CAD (Design Automation)' },
    { id: 'worksheets', label: 'Multi-Model Pipeline (Worksheets)' },
    { id: 'qgen', label: 'Deterministic Eval (Question Gen)' },
    { id: 'atlas', label: 'Multi-Stage Item Bank Orchestration' },
    { id: 'overview', label: 'General Agentic Pipeline' }
  ] as const

  return (
    <section className="max-w-5xl mx-auto space-y-12">
      {/* Page Header */}
      <div>
        <span className="text-xs uppercase tracking-wider font-mono text-purple-400">Systems & Methodology</span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-1 mb-3 font-serif">
          AI Engineering Stack & Architecture
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          How I construct production-ready AI systems: moving beyond prompt wrappers into stateful agent graphs, deterministic engineering solvers, mathematical evaluations, and verifiable reliability platforms.
        </p>
      </div>

      {/* Interactive System Architecture Showcase */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg sm:text-xl font-bold text-white">Interactive Architecture Explorer</h2>
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {patterns.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedPattern(p.id)}
                className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all cursor-pointer ${
                  selectedPattern === p.id
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
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
        <h2 className="text-xl sm:text-2xl font-bold text-white font-serif">Core Architectural Competencies</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {capabilities.map((cap) => {
            const Icon = cap.icon
            return (
              <div
                key={cap.title}
                className="glass p-6 rounded-xl border border-slate-800 space-y-4 hover:border-purple-500/40 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2">{cap.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{cap.description}</p>
                </div>

                <div className="pt-2 flex flex-wrap gap-1.5">
                  {cap.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 text-xs font-mono rounded bg-slate-900 border border-slate-800 text-slate-400"
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
