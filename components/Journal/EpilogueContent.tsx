"use client"
import React from 'react'
import Link from 'next/link'
import { epilogue, chapters } from '../../data/chapters'
import { profile } from '../../data/profile'
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  FileText
} from 'lucide-react'

interface EpilogueContentProps {
  onReturnToTOC: () => void
  onNavigateChapter: (chapterId: string) => void
  onCloseJournal: () => void
}

export default function EpilogueContent({
  onReturnToTOC,
  onNavigateChapter,
  onCloseJournal
}: EpilogueContentProps) {
  const lastChapter = chapters[chapters.length - 1]

  return (
    <article className="space-y-12 max-w-4xl mx-auto">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between pb-5 border-b border-[#2A2F36]">
        <button
          type="button"
          onClick={onReturnToTOC}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#858A90] hover:text-[#D8D6D0] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Contents</span>
        </button>

        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            type="button"
            onClick={() => onNavigateChapter(lastChapter.id)}
            className="px-3 py-1.5 rounded border border-[#2A2F36] bg-[#16191D] hover:bg-[#20252B] text-[#9EA4AA] hover:text-[#F0EEE9] transition-colors"
          >
            ← Ch. {lastChapter.number}
          </button>
          <button
            type="button"
            onClick={onCloseJournal}
            className="px-3 py-1.5 rounded border border-[#2A2F36] bg-[#16191D] hover:bg-[#20252B] text-[#9EA4AA] hover:text-[#F0EEE9] transition-colors"
          >
            Close Journal
          </button>
        </div>
      </div>

      {/* Epilogue Header */}
      <header className="space-y-3 pt-2">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#71899A]">
          <Bookmark className="w-3.5 h-3.5 text-[#71899A]" />
          <span>Concluding Perspective // Synthesis</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold text-[#F0EEE9] font-serif tracking-tight leading-tight">
          {epilogue.title}
        </h1>

        <p className="text-base sm:text-lg text-[#9EA4AA] font-normal leading-relaxed">
          {epilogue.subtitle}
        </p>
      </header>

      {/* The Central Engineering Thesis */}
      <section className="p-8 rounded border border-[#3A404A] bg-[#16191D] space-y-4">
        <span className="text-[11px] uppercase font-mono tracking-widest text-[#71899A] font-semibold block">
          THE ENGINEERING THESIS
        </span>
        <blockquote className="text-xl sm:text-2xl font-serif text-[#F0EEE9] leading-relaxed italic">
          &ldquo;{epilogue.thesis}&rdquo;
        </blockquote>
        <p className="text-sm text-[#A8A49C] leading-relaxed pt-2 border-t border-[#252A30]">
          True AI Engineering is not prompt craftsmanship. It is the disciplined integration of stochastic reasoning models into deterministic software architectures that maintain authority over facts, physical laws, and safety boundaries.
        </p>
      </section>

      {/* The 7 Foundational Principles */}
      <section className="space-y-6 pt-4 border-t border-[#2A2F36]">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-[#F0EEE9] font-serif">
            Foundational Principles // What Building Taught Me
          </h2>
          <span className="text-xs font-mono text-[#686E77]">[ SPEC // 01—07 ]</span>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {epilogue.principles.map((pr, idx) => (
            <div
              key={idx}
              className="p-5 rounded bg-[#15181C] border border-[#262B32] space-y-2 hover:border-[#3E4652] transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#71899A]">PRINCIPLE 0{idx + 1}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#5A9A78]" />
              </div>
              <h3 className="text-sm font-bold text-[#F0EEE9] font-serif">
                {pr.title}
              </h3>
              <p className="text-xs text-[#9EA4AA] leading-relaxed">
                {pr.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Accumulated Synthesis */}
      <section className="p-6 md:p-8 rounded bg-[#16191D] border border-[#262B32] space-y-4 text-[#A8A49C] leading-relaxed text-sm">
        <h3 className="font-bold text-[#F0EEE9] text-base font-serif">
          Accumulated Synthesis
        </h3>
        <p>{epilogue.conclusion}</p>
        <p className="pt-2 border-t border-[#242930]">
          As language models continue to evolve in reasoning capability, the differentiator in software engineering will not be who has access to the newest checkpoint, but who can construct the test harnesses, mathematical evaluators, deterministic boundary gates, and cryptographic audit chains that allow autonomous agents to operate safely and effectively in high-stakes environments.
        </p>
      </section>

      {/* Intentionally Open Ending */}
      <footer className="p-8 rounded border border-[#2A2F36] bg-[#14171A] text-center space-y-3">
        <span className="text-xs uppercase font-mono tracking-widest text-[#71899A] block">
          THE CONTINUOUS HORIZON
        </span>
        <h3 className="text-2xl font-bold text-[#F0EEE9] font-serif">
          Still building. Still learning.
        </h3>
        <p className="text-sm text-[#858A90] font-mono">
          [ ? ]
        </p>
      </footer>
    </article>
  )
}
