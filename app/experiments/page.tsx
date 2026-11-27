import React from 'react'
import Link from 'next/link'
import {
  FlaskConical,
  ShieldCheck,
  Zap,
  ArrowRight,
  Terminal,
  Database,
  Binary,
  Layers,
  Cpu,
  AlertTriangle,
  CheckCircle2,
  Lock
} from 'lucide-react'
import { ENGINEERING_EXPERIMENTS } from '@/data/experiments'

export const metadata = {
  title: 'Experiment Lab // AADIL BUILDS — Empirical Research & Evals',
  description:
    'Empirical AI engineering benchmarks, multimodal degradation stress testing, deterministic vs probabilistic evaluations, and multi-tenant security boundary experiments.'
}

export default function ExperimentsPage() {
  return (
    <div className="space-y-12 pb-20 max-w-6xl mx-auto px-4 sm:px-6">
      {/* ------------------------------------------------------------- */}
      {/* SPACE 03 HEADER & RIGOROUS EPISTEMIC DECLARATION              */}
      {/* ------------------------------------------------------------- */}
      <section className="space-y-4 pt-4 sm:pt-6 border-b border-[#262B32] pb-8">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-widest font-mono text-[#F2994A] font-semibold flex items-center gap-1.5">
            <FlaskConical className="w-4 h-4 text-[#F2994A]" />
            SPACE 03 // EXPERIMENT LAB
          </span>
          <span className="text-[#5A6872] text-xs font-mono">•</span>
          <span className="text-[11px] font-mono text-[#78C29A] uppercase tracking-wider font-bold">
            EMPIRICAL EVALS & BENCHMARKS
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight text-[#F0EEE9] leading-tight">
          Empirical Research &amp; Evaluation Lab
        </h1>

        <p className="text-sm sm:text-base text-[#9EA4AA] max-w-3xl leading-relaxed font-sans">
          This laboratory documents controlled experiments, failure-mode stress tests, and empirical comparisons between deterministic software logic and probabilistic large language models.
        </p>

        {/* Epistemic Boundary Notice */}
        <div className="p-4 rounded-xl border border-[#F2994A]/30 bg-[#1D1711] text-xs font-mono text-[#D4A373] flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-[#F2994A] shrink-0 mt-0.5" />
          <div className="space-y-1 leading-relaxed">
            <span className="font-bold text-[#F2994A] block uppercase tracking-wider">
              Epistemic Principle: Experiments vs Production
            </span>
            <span>
              All benchmarks documented here report exact quantitative findings from reproducible test harnesses. Benchmarks are never conflated with live enterprise production SLAs.
            </span>
          </div>
        </div>

        {/* Quick Bridge to Interactive RAG Lab */}
        <div className="pt-2">
          <Link
            href="/rag-lab"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#388BFD]/40 bg-[#162332] hover:bg-[#1E3247] text-[#58A6FF] font-mono text-xs font-semibold transition-all shadow-xs"
          >
            <Database className="w-3.5 h-3.5" />
            <span>Launch Interactive RAG Retrieval Playground →</span>
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* EXPERIMENTS GRID                                              */}
      {/* ------------------------------------------------------------- */}
      <section className="space-y-8">
        <div className="flex items-center justify-between border-b border-[#20252D] pb-3">
          <h2 className="text-lg sm:text-xl font-bold font-serif text-[#F0EEE9]">
            Documented Technical Investigations ({ENGINEERING_EXPERIMENTS.length})
          </h2>
          <span className="text-xs font-mono text-[#71899A]">
            Verified Test Suites &amp; Pytests
          </span>
        </div>

        <div className="space-y-6">
          {ENGINEERING_EXPERIMENTS.map((exp) => (
            <article
              key={exp.id}
              className="p-6 rounded-2xl border border-[#262B32] bg-[#14171A] space-y-5 hover:border-[#3E4752] transition-colors"
            >
              {/* Header metadata */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#21262D] pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded bg-[#1C2229] border border-[#2B3542] text-[10px] font-mono text-[#F2994A] font-bold">
                    EXP-{exp.number}
                  </span>
                  <span className="text-xs font-mono text-[#8BA0B2] font-semibold">
                    Target: {exp.systemName}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#16231C] text-[#78C29A] border border-[#5A9A78]/30 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3 h-3 text-[#78C29A]" /> {exp.status.replace('_', ' ')}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1E232A] text-[#9EA4AA] border border-[#2A313C]">
                    {exp.category.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>

              {/* Title & Core Hypothesis */}
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold font-serif text-[#F0EEE9] leading-snug">
                  {exp.title}
                </h3>
                <div className="text-xs text-[#C8C6BF] leading-relaxed">
                  <strong className="text-[#F0EEE9] font-mono uppercase text-[10px] tracking-wider block mb-0.5">
                    Hypothesis Under Test:
                  </strong>
                  {exp.hypothesis}
                </div>
              </div>

              {/* Quantitative Metrics Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#0F1215] border border-[#22272E]">
                {exp.metrics.map((m, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#71899A] block">
                      {m.label}
                    </span>
                    <span className="text-base sm:text-lg font-bold font-mono text-[#78C29A]">
                      {m.value}
                    </span>
                    {m.baseline && (
                      <span className="text-[10.5px] font-mono text-[#9EA4AA] block">
                        vs. {m.baseline}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Methodology & Empirical Findings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
                <div className="p-3.5 rounded-xl bg-[#161B20]/60 border border-[#242A32] space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#58A6FF] font-bold block">
                    Experimental Methodology
                  </span>
                  <p className="text-[#9EA4AA]">{exp.methodology}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#161B20]/60 border border-[#242A32] space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#78C29A] font-bold block">
                    Empirical Findings &amp; Discoveries
                  </span>
                  <p className="text-[#9EA4AA]">{exp.findings}</p>
                </div>
              </div>

              {/* Trade-off Analysis & Code Verification Footnote */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#20252D] text-xs font-mono text-[#71899A]">
                <div className="flex items-center gap-2">
                  <span className="text-[#5A6872]">Evidence Source:</span>
                  <code className="text-[#A2B4C2] bg-[#161A1F] px-2 py-0.5 rounded border border-[#282F3A]">
                    {exp.codeEvidencePath}
                  </code>
                </div>
                <Link
                  href={`/systems/${exp.systemSlug}`}
                  className="inline-flex items-center gap-1.5 text-[#58A6FF] hover:text-[#79B8FF] font-semibold transition-colors"
                >
                  <span>View System Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
