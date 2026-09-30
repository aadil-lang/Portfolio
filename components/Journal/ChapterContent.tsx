"use client"
import React from 'react'
import Link from 'next/link'
import { Chapter } from '../../types'
import ArchitectureViz from '../ArchitectureViz'
import {
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  ShieldAlert,
  ShieldCheck,
  Cpu
} from 'lucide-react'

interface ChapterContentProps {
  chapter: Chapter
  prevChapter: Chapter | null
  nextChapter: Chapter | null
  onNavigateChapter: (chapterId: string) => void
  onNavigateEpilogue: () => void
  onReturnToTOC: () => void
}

export default function ChapterContent({
  chapter,
  prevChapter,
  nextChapter,
  onNavigateChapter,
  onNavigateEpilogue,
  onReturnToTOC
}: ChapterContentProps) {
  const patternMapping: Record<string, string> = {
    'vm-copy': 'qgen',
    'ai-worksheets': 'worksheets',
    'math-item-bank': 'atlas',
    'curriculum-etl': 'etl',
    'design-automation': 'eda',
    'ai-reliability': 'reliability'
  }

  const currentPattern = patternMapping[chapter.slug] || 'overview'

  return (
    <article className="space-y-12">
      {/* Chapter Navigation & Breadcrumb Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#2A2F36]">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onReturnToTOC}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#858A90] hover:text-[#D8D6D0] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Contents</span>
          </button>
          <span className="text-[#3A404A]">/</span>
          <span className="text-xs font-mono text-[#686E77]">CH. {chapter.number}</span>
          <span className="text-[#3A404A]">/</span>
          <span className="text-xs font-mono text-[#9EA4AA] truncate max-w-[200px] sm:max-w-none">
            {chapter.layer}
          </span>
        </div>

        {/* Quick Chapter Step Switcher */}
        <div className="flex items-center gap-2 font-mono text-xs">
          {prevChapter ? (
            <button
              type="button"
              onClick={() => onNavigateChapter(prevChapter.id)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded border border-[#2A2F36] bg-[#16191D] hover:bg-[#20252B] text-[#9EA4AA] hover:text-[#F0EEE9] transition-colors"
              title={`Previous: Chapter ${prevChapter.number}`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Ch. {prevChapter.number}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onReturnToTOC}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded border border-[#22262C] bg-[#121518] text-[#555A62] cursor-default"
            >
              Index
            </button>
          )}

          {nextChapter ? (
            <button
              type="button"
              onClick={() => onNavigateChapter(nextChapter.id)}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 font-medium rounded border border-[#3E4652] bg-[#22272E] hover:bg-[#2C333D] text-[#F0EEE9] transition-colors"
              title={`Next: Chapter ${nextChapter.number}`}
            >
              <span>Ch. {nextChapter.number}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onNavigateEpilogue}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 font-medium rounded border border-[#3E4652] bg-[#22272E] hover:bg-[#2C333D] text-[#F0EEE9] transition-colors"
            >
              <span>Epilogue</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Attribution / Epistemic Notice (if present) */}
      {chapter.statusNotice && (
        <div className="p-4 rounded border-l-2 border-[#8A7038] bg-[#17191C] space-y-1">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-[#B89B5E] shrink-0" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#B89B5E] font-medium">
              Context & Attribution Notice
            </span>
          </div>
          <p className="text-xs text-[#A8A49C] leading-relaxed pl-5.5">
            {chapter.statusNotice}
          </p>
        </div>
      )}

      {/* Editorial Chapter Header Composition */}
      <header className="space-y-4 pt-2">
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
          <span className="text-[#858A90] font-semibold tracking-wider">
            CHAPTER {chapter.number}
          </span>
          <span className="text-[#3A404A]">|</span>
          {chapter.ownershipLabel && (
            <span className="px-2 py-0.5 rounded text-[11px] tracking-wide bg-[#15181C] text-[#9EA4AA] border border-[#2A2F36]">
              {chapter.ownershipLabel}
            </span>
          )}
          <span className="text-[#3A404A]">|</span>
          <span className="text-[#686E77]">
            LAYER: <span className="text-[#D8D6D0]">{chapter.layer}</span>
          </span>
          <span className="text-[#3A404A]">|</span>
          <span className="text-[#686E77]">{chapter.timeline}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F0EEE9] tracking-tight font-serif leading-tight">
          {chapter.title}
        </h1>

        <p className="text-base sm:text-lg text-[#9EA4AA] font-normal leading-relaxed max-w-3xl">
          {chapter.subtitle}
        </p>

        {/* Technologies & Specification Link */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#22262C]">
          {chapter.technologies && (
            <div className="flex flex-wrap gap-1.5">
              {chapter.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-[11px] font-mono rounded bg-[#14171A] text-[#7E858E] border border-[#242930]"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          <Link
            href={`/projects/${chapter.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#71899A] hover:text-[#9FB1BF] transition-colors"
          >
            <span>[ SYSTEM SPECIFICATION → ]</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </header>

      {/* 01 // CONTEXT & 02 // CRITICAL ENGINEERING DECISION */}
      <section className="grid md:grid-cols-2 gap-6 pt-4 border-t border-[#2A2F36]">
        <div className="space-y-2.5">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#71899A] block font-semibold">
            01 // CONTEXT
          </span>
          <p className="text-sm text-[#C8C6BF] leading-relaxed">
            {chapter.context}
          </p>
        </div>

        <div className="space-y-2.5 pl-0 md:pl-6 border-l-0 md:border-l border-[#242930]">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#B89B5E] block font-semibold">
            02 // CRITICAL ENGINEERING DECISION
          </span>
          <p className="text-sm text-[#D8D6D0] leading-relaxed">
            {chapter.criticalDecision || chapter.breakthrough}
          </p>
        </div>
      </section>

      {/* 03 // THE ENGINEERING PROBLEM & SOLUTION */}
      <section className="space-y-4 pt-6 border-t border-[#2A2F36]">
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#71899A] block font-semibold">
          03 // PROBLEM & SOLUTION
        </span>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-5 rounded bg-[#16181B] border border-[#262B32] space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#A86464] font-semibold">
              The Engineering Problem
            </h3>
            <p className="text-sm text-[#C0BEB7] leading-relaxed">
              {chapter.problem}
            </p>
          </div>

          <div className="p-5 rounded bg-[#16181B] border border-[#262B32] space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#5A9A78] font-semibold">
              The Engineered Solution
            </h3>
            <p className="text-sm text-[#C0BEB7] leading-relaxed">
              {chapter.solution}
            </p>
          </div>
        </div>
      </section>

      {/* 04 // SYSTEM ARCHITECTURE SCHEMATIC */}
      <section className="space-y-4 pt-6 border-t border-[#2A2F36]">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#71899A] font-semibold">
            04 // SYSTEM ARCHITECTURE
          </span>
          <span className="text-[11px] font-mono text-[#686E77]">
            Deterministic Pipeline
          </span>
        </div>

        <p className="text-sm text-[#C8C6BF] leading-relaxed">
          {chapter.architectureDescription}
        </p>

        <ArchitectureViz pattern={currentPattern} />
      </section>

      {/* 05 // WHAT BROKE: INCIDENT LOG */}
      <section className="space-y-4 pt-6 border-t border-[#2A2F36]">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#A86464]" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#A86464] font-semibold">
            05 // INCIDENT ANALYSIS: WHAT BROKE
          </span>
        </div>
        <p className="text-xs text-[#858A90]">
          Concrete failure modes discovered during implementation, root causes, detection mechanisms, and engineering responses:
        </p>

        {chapter.whatBroke && chapter.whatBroke.length > 0 ? (
          <div className="space-y-3 pt-1">
            {chapter.whatBroke.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded bg-[#15171A] border border-[#262B32] space-y-2.5"
              >
                <div className="text-xs font-mono font-semibold text-[#D48585] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A86464]" />
                  <span>MODE {idx + 1}: {item.failure}</span>
                </div>
                <div className="grid sm:grid-cols-3 gap-3 text-xs pt-1 border-t border-[#20242A]">
                  <div>
                    <span className="font-mono text-[#686E77] block uppercase text-[10px] tracking-wider mb-0.5">
                      Root Cause
                    </span>
                    <span className="text-[#A8A49C] leading-relaxed">{item.cause}</span>
                  </div>
                  <div>
                    <span className="font-mono text-[#686E77] block uppercase text-[10px] tracking-wider mb-0.5">
                      Detection Mechanism
                    </span>
                    <span className="text-[#B89B5E] leading-relaxed">{item.detection}</span>
                  </div>
                  <div>
                    <span className="font-mono text-[#686E77] block uppercase text-[10px] tracking-wider mb-0.5">
                      Engineering Response
                    </span>
                    <span className="text-[#7CB895] leading-relaxed">{item.response}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ul className="space-y-2">
            {chapter.failuresAndTradeoffs.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs font-mono text-[#A8A49C] leading-relaxed">
                <span className="text-[#858A90] select-none">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* 06 // WHAT BECAME DETERMINISTIC */}
      {chapter.whatBecameDeterministic && (
        <section className="space-y-2.5 pt-6 border-t border-[#2A2F36]">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#71899A]" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#71899A] font-semibold">
              06 // DETERMINISTIC BOUNDARY SPECIFICATION
            </span>
          </div>
          <div className="p-4 rounded border-l-2 border-[#536B7A] bg-[#15181C]">
            <p className="text-sm text-[#D8D6D0] leading-relaxed">
              {chapter.whatBecameDeterministic}
            </p>
          </div>
        </section>
      )}

      {/* 07 // EVIDENCE */}
      <section className="space-y-3 pt-6 border-t border-[#2A2F36]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#5A9A78]" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#5A9A78] font-semibold">
              07 // VERIFIED EMPIRICAL EVIDENCE
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#686E77]">Laboratory Record</span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
          {chapter.evidenceAndMetrics.map((metric, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded bg-[#15181C] border border-[#242930] flex items-start gap-2.5 text-xs font-mono"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#5A9A78] shrink-0 mt-0.5" />
              <span className="text-[#C8C6BF] leading-relaxed">
                {metric}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 08 // TRADE-OFFS */}
      {chapter.tradeoffs && chapter.tradeoffs.length > 0 && (
        <section className="space-y-3 pt-6 border-t border-[#2A2F36]">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#858A90] block font-semibold">
            08 // ENGINEERING TRADE-OFFS
          </span>
          <ul className="space-y-2">
            {chapter.tradeoffs.map((tradeoff, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-[#A8A49C] leading-relaxed font-mono">
                <span className="text-[#686E77] select-none">[{idx + 1}]</span>
                <span>{tradeoff}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 09 // WHAT THIS PROJECT CHANGED */}
      <section className="p-6 rounded bg-[#16191D] border border-[#2A2F36] space-y-2">
        <span className="text-[11px] font-mono uppercase tracking-wider text-[#71899A] font-semibold block">
          09 // CAPABILITY DELTA: LAYER UNLOCKED
        </span>
        <h4 className="text-base font-bold text-[#F0EEE9] font-serif">
          {chapter.layer}
        </h4>
        <p className="text-sm text-[#A8A49C] leading-relaxed">
          {chapter.accumulatedCapability}
        </p>
      </section>

      {/* Direct Case Study Bridge */}
      <div className="p-4 rounded border border-[#242930] bg-[#14171A] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
        <span className="text-[#858A90]">
          Source repository implementation, prompts, schemas, and test suites:
        </span>
        <Link
          href={`/projects/${chapter.slug}`}
          className="inline-flex items-center gap-1.5 text-[#71899A] hover:text-[#9FB1BF] font-medium transition-colors shrink-0"
        >
          <span>Open Full System Case Study</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Chapter Footer Navigation */}
      <footer className="pt-6 border-t border-[#2A2F36] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
        <div>
          {prevChapter ? (
            <button
              type="button"
              onClick={() => onNavigateChapter(prevChapter.id)}
              className="inline-flex items-center gap-2 text-[#858A90] hover:text-[#F0EEE9] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Ch. {prevChapter.number}: {prevChapter.title}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onReturnToTOC}
              className="inline-flex items-center gap-2 text-[#858A90] hover:text-[#F0EEE9] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Table of Contents</span>
            </button>
          )}
        </div>

        <div>
          {nextChapter ? (
            <button
              type="button"
              onClick={() => onNavigateChapter(nextChapter.id)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded border border-[#3E4652] bg-[#22272E] hover:bg-[#2C333D] text-[#F0EEE9] font-medium transition-colors"
            >
              <span>Turn Page to Chapter {nextChapter.number}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onNavigateEpilogue}
              className="inline-flex items-center gap-2 px-4 py-2 rounded border border-[#3E4652] bg-[#22272E] hover:bg-[#2C333D] text-[#F0EEE9] font-medium transition-colors"
            >
              <span>Turn Page to Epilogue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </footer>
    </article>
  )
}
