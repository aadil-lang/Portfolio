'use client'

import React, { useState } from 'react'
import { CodeEvidence as CodeEvidenceType } from '../types'
import {
  FileCode,
  Copy,
  Check,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react'

interface CodeEvidenceProps {
  evidence: CodeEvidenceType
  className?: string
}

export default function CodeEvidence({ evidence, className = '' }: CodeEvidenceProps) {
  const [copied, setCopied] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const lines = evidence.code.trim().split('\n')
  const isLong = lines.length > 22
  const displayedLines = isLong && !isExpanded ? lines.slice(0, 20) : lines

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(evidence.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code snippet', err)
    }
  }

  // Ownership badge styles
  const getOwnershipStyle = (ownership: CodeEvidenceType['ownership']) => {
    switch (ownership) {
      case 'BUILT INDEPENDENTLY':
        return 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60'
      case 'PROFESSIONAL SYSTEM':
        return 'bg-blue-950/60 text-blue-300 border-blue-800/60'
      case 'TEAM SYSTEM':
        return 'bg-amber-950/60 text-amber-300 border-amber-800/60'
      case 'MY CONTRIBUTION':
        return 'bg-purple-950/60 text-purple-300 border-purple-800/60'
      default:
        return 'bg-slate-900 text-slate-300 border-slate-800'
    }
  }

  return (
    <figure
      className={`glass rounded-xl border border-slate-800/90 overflow-hidden bg-slate-950/60 shadow-xl transition-all duration-200 hover:border-slate-700/80 ${className}`}
    >
      {/* 1. Header & Engineering Decision */}
      <figcaption className="p-4 sm:p-5 border-b border-slate-800/80 bg-slate-900/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-purple-400">
                ENGINEERING DECISION
              </span>
              <span className="text-slate-600 text-xs">/</span>
              <span className="text-xs font-mono text-slate-300 font-medium">
                {evidence.decision}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white font-serif tracking-tight">
              {evidence.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span
              className={`text-[10px] sm:text-xs font-mono font-bold tracking-wider px-2.5 py-1 rounded border uppercase ${getOwnershipStyle(
                evidence.ownership
              )}`}
            >
              {evidence.ownership}
            </span>
          </div>
        </div>
      </figcaption>

      {/* 2. Technical Code Panel Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-950 border-b border-slate-800/80 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2 truncate pr-2">
          <FileCode className="w-3.5 h-3.5 text-purple-400 shrink-0" />
          <span className="text-slate-200 truncate font-semibold" title={evidence.sourcePath}>
            {evidence.sourcePath || 'source'}
          </span>
          {evidence.lineRange && (
            <span className="text-slate-500 text-[11px] shrink-0">:{evidence.lineRange}</span>
          )}
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider bg-slate-900 border border-slate-800 text-slate-400 ml-1">
            {evidence.language}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {evidence.sourceUrl && (
            <a
              href={evidence.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-purple-300 transition-colors px-2 py-1 rounded hover:bg-slate-900 border border-transparent hover:border-slate-800"
              title="View source repository"
            >
              <span>View source</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900/90 hover:bg-purple-950/50 hover:text-purple-300 border border-slate-800 text-slate-300 text-xs transition-colors focus:outline-none focus:ring-1 focus:ring-purple-400"
            aria-label="Copy code snippet to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 text-[11px] font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[11px]">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 3. Code Lines with Line Numbers */}
      <div className="relative bg-[#090d16] font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto">
        <pre className="p-4 sm:p-5 flex min-w-full">
          {/* Line Numbers */}
          <div className="select-none text-slate-600 pr-4 text-right font-mono text-[11px] sm:text-xs shrink-0 border-r border-slate-800/80 mr-4">
            {displayedLines.map((_, i) => (
              <div key={i} className="leading-6">
                {i + 1}
              </div>
            ))}
          </div>

          {/* Actual Code Text */}
          <code className="text-slate-200 font-mono block whitespace-pre flex-1 leading-6">
            {displayedLines.map((line, idx) => (
              <div key={idx} className="hover:bg-slate-900/40 px-1 -mx-1 rounded">
                {line || ' '}
              </div>
            ))}
          </code>
        </pre>

        {/* Expand/Collapse Toggle if Long */}
        {isLong && (
          <div className="border-t border-slate-800/80 bg-slate-950/90 p-2 flex justify-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-purple-400 hover:text-purple-300 transition-colors px-3 py-1 rounded bg-slate-900 border border-slate-800 hover:border-purple-800/60"
              aria-expanded={isExpanded}
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5" />
                  <span>Collapse snippet ({lines.length} lines total)</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5" />
                  <span>Expand remaining {lines.length - 20} lines</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* 4. Engineering Context & "Why This Exists" */}
      <div className="p-4 sm:p-5 space-y-4 bg-slate-950/40 border-t border-slate-800/80">
        <div className="border-l-2 border-purple-500/80 bg-purple-950/15 p-4 rounded-r-lg space-y-1.5">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>WHY THIS EXISTS</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {evidence.explanation}
          </p>
        </div>

        {/* 5. Evidence Card: Input / Result / Verification */}
        {evidence.evidenceResult && (
          <div className="grid sm:grid-cols-3 gap-3 pt-1">
            {evidence.evidenceResult.input && (
              <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800/80 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                  ENGINEERING INPUT
                </span>
                <span className="text-xs font-mono text-slate-200 block font-medium">
                  {evidence.evidenceResult.input}
                </span>
              </div>
            )}
            {evidence.evidenceResult.result && (
              <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800/80 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-semibold block">
                  CALCULATED RESULT
                </span>
                <span className="text-xs font-mono text-purple-200 block font-medium">
                  {evidence.evidenceResult.result}
                </span>
              </div>
            )}
            {evidence.evidenceResult.verification && (
              <div className="p-3 rounded-lg bg-slate-900/70 border border-emerald-900/40 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block">
                  VERIFICATION
                </span>
                <span className="text-xs font-mono text-emerald-200 block font-medium">
                  {evidence.evidenceResult.verification}
                </span>
              </div>
            )}
          </div>
        )}

        {/* 6. Grounded Evidence Badges if Present */}
        {evidence.evidence && evidence.evidence.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mr-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>EVIDENCE:</span>
            </span>
            {evidence.evidence.map((item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {item}
              </span>
            ))}
          </div>
        )}

        {/* 7. Marginal Note / Notebook Annotation if Present */}
        {evidence.principle && (
          <div className="pt-1 text-[11px] font-mono text-slate-400 italic flex items-center gap-2">
            <span className="text-purple-400">↳ Notebook Note:</span>
            <span>"{evidence.principle}"</span>
          </div>
        )}
      </div>
    </figure>
  )
}
