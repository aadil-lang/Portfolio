"use client"

import React, { useState } from 'react'
import { VerificationEvidence } from '../../data/verification/types'
import { Copy, Check, Terminal, FileCode, ShieldCheck, AlertCircle, Cpu, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface EvidenceCardProps {
  evidence: VerificationEvidence
}

export default function EvidenceCard({ evidence }: EvidenceCardProps) {
  const [copied, setCopied] = useState(false)

  const copyCommand = async () => {
    if (!evidence.executionCommand) return
    try {
      await navigator.clipboard.writeText(evidence.executionCommand)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.warn('Clipboard write failed:', err)
    }
  }

  const isVerified = evidence.status === 'VERIFIED'
  const isQualified = evidence.status === 'QUALIFIED'

  return (
    <article
      id={evidence.id.toLowerCase()}
      className="bg-[#14171A] border border-[#262B32] hover:border-[#3E4652] rounded-lg p-5 transition-all space-y-4"
      aria-labelledby={`title-${evidence.id}`}
    >
      {/* Header: ID, Title, Status & Modality */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#1C2128] border border-[#2D333B] text-[#58A6FF]">
              {evidence.id}
            </span>
            <span className="font-mono text-xs text-[#858A90] px-2 py-0.5 rounded bg-[#161A1F]">
              {evidence.projectName}
            </span>
            <span className="font-mono text-[11px] text-[#9CA3AF] px-2 py-0.5 rounded bg-[#181C21] border border-[#262B32]">
              {evidence.category}
            </span>
          </div>
          <h3 id={`title-${evidence.id}`} className="text-base font-serif font-bold text-[#F0EEE9] tracking-tight">
            {evidence.title}
          </h3>
        </div>

        {/* Status Badge */}
        <div className="shrink-0">
          {isVerified && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded font-mono text-xs font-semibold bg-[#16231C] border border-[#5A9A78]/40 text-[#78C29A]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#5A9A78]" />
              <span>VERIFIED</span>
            </span>
          )}
          {isQualified && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded font-mono text-xs font-semibold bg-[#261E14] border border-[#D99B26]/40 text-[#F0B84D]">
              <AlertCircle className="w-3.5 h-3.5 text-[#D99B26]" />
              <span>QUALIFIED</span>
            </span>
          )}
          {!isVerified && !isQualified && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded font-mono text-xs font-semibold bg-[#1F242C] border border-[#3E4652] text-[#9EA4AA]">
              <span>{evidence.status}</span>
            </span>
          )}
        </div>
      </div>

      {/* Summary Description */}
      <p className="text-xs text-[#C9D1D9] leading-relaxed">
        {evidence.summary}
      </p>

      {/* Metric Highlight Box */}
      {evidence.metricValue && (
        <div className="bg-[#181C21] border border-[#262B32] rounded p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-[10px] font-mono text-[#858A90] uppercase tracking-wider">
              Measured Metric / Result
            </div>
            <div className="text-base font-mono font-bold text-[#E5E7EB] mt-0.5">
              {evidence.metricValue} <span className="text-xs font-normal text-[#9CA3AF]">{evidence.metricUnit}</span>
            </div>
          </div>
          {evidence.metricContext && (
            <div className="text-right text-[11px] text-[#858A90] font-mono max-w-xs leading-snug">
              {evidence.metricContext}
            </div>
          )}
        </div>
      )}

      {/* Provenance Details: Verification Method, Source File, Line Range */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono pt-1">
        <div className="flex items-center gap-2 text-[#9CA3AF]">
          <Cpu className="w-3.5 h-3.5 text-[#5A9A78] shrink-0" />
          <span className="truncate">Method: {evidence.verificationMethod}</span>
        </div>
        <div className="flex items-center gap-2 text-[#9CA3AF]">
          <FileCode className="w-3.5 h-3.5 text-[#58A6FF] shrink-0" />
          <span className="truncate">
            Source: <code className="text-[#E5E7EB] bg-[#1C2128] px-1 py-0.5 rounded">{evidence.sourceFile}</code>
            {evidence.lineRange && <span className="text-[#6B7280]">:{evidence.lineRange}</span>}
          </span>
        </div>
      </div>

      {/* Conditions & Scope */}
      <div className="text-xs space-y-1.5 pt-2 border-t border-[#22272E]">
        <div className="text-[#9CA3AF]">
          <span className="font-mono text-[10px] text-[#6B7280] uppercase tracking-wider block">Scope & Conditions</span>
          <span className="text-[#D8D6D0] leading-snug">{evidence.conditions}</span>
        </div>

        {/* Limitations Notice */}
        {evidence.limitations && (
          <div className="text-xs pt-1.5 flex items-start gap-2 text-[#E5B560] bg-[#1E1911]/60 p-2.5 rounded border border-[#D99B26]/30">
            <AlertCircle className="w-4 h-4 text-[#D99B26] shrink-0 mt-0.5" />
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider block text-[#F0B84D]">
                Engineering Caveats & Boundaries
              </span>
              <span className="text-xs text-[#E5D7B7] leading-relaxed">{evidence.limitations}</span>
            </div>
          </div>
        )}
      </div>

      {/* Reproduction CLI Command */}
      {evidence.executionCommand && (
        <div className="pt-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#858A90] mb-1">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3 h-3 text-[#5A9A78]" />
              <span>Reproduction Command</span>
            </span>
            <button
              type="button"
              onClick={copyCommand}
              className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-[#1C2128] hover:bg-[#262D37] text-[#9EA4AA] hover:text-[#F0EEE9] transition-colors"
              aria-label={`Copy reproduction command for ${evidence.id}`}
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-[#5A9A78]" />
                  <span className="text-[#78C29A]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <pre className="bg-[#0D1013] border border-[#242930] p-2.5 rounded text-[11px] font-mono text-[#78C29A] overflow-x-auto selection:bg-[#5A9A78]/30">
            <code>{evidence.executionCommand}</code>
          </pre>
        </div>
      )}

      {/* Cross-References */}
      {(evidence.relatedArchitectureComponent || evidence.relatedDecisionRecord) && (
        <div className="flex items-center gap-3 pt-2 text-[11px] font-mono text-[#6B7280]">
          {evidence.relatedArchitectureComponent && (
            <Link
              href={`/architecture?system=${evidence.projectSlug}`}
              className="hover:text-[#58A6FF] flex items-center gap-1 transition-colors"
            >
              <span>Architecture DAG</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </Link>
          )}
          {evidence.relatedDecisionRecord && (
            <Link
              href={`/projects/${evidence.projectSlug}#decisions`}
              className="hover:text-[#78C29A] flex items-center gap-1 transition-colors"
            >
              <span>ADR: {evidence.relatedDecisionRecord}</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </Link>
          )}
        </div>
      )}
    </article>
  )
}

