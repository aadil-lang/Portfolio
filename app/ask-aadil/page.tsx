'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Sparkles, Compass, BookOpen, Terminal, ArrowLeft } from 'lucide-react'
import { AskAadilModal } from '../../components/AskAadil/AskAadilModal'

export default function AskAadilPage() {
  const [isModalOpen, setIsModalOpen] = useState(true)

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6 pb-20">
      <div className="space-y-4 border-b border-[#242930] pb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#71899A] hover:text-[#F0EEE9] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#16191D] border border-[#388BFD]/40 text-[#58A6FF] text-[11px] font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE EXPLORATION LAYER</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F0EEE9] font-serif">
            Ask Aadil
          </h1>
          <p className="text-sm sm:text-base text-[#9EA4AA] max-w-2xl leading-relaxed">
            A grounded conversational assistant that answers questions across Aadil&apos;s journey, systems architectures, technical decisions, and verified engineering evidence.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-2 font-mono text-xs">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#162332] hover:bg-[#1E3247] text-[#58A6FF] border border-[#388BFD]/50 font-bold transition-all shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Open Conversational Assistant</span>
          </button>
          <Link
            href="/experience"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded border border-[#2A2F36] bg-[#16191D] hover:bg-[#1E232A] text-[#858A90] hover:text-[#F0EEE9] transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-[#536B7A]" />
            <span>Timeline</span>
          </Link>
          <Link
            href="/journal"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded border border-[#2A2F36] bg-[#16191D] hover:bg-[#1E232A] text-[#858A90] hover:text-[#F0EEE9] transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#71899A]" />
            <span>Journal</span>
          </Link>
          <Link
            href="/systems"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded border border-[#2A2F36] bg-[#16191D] hover:bg-[#1E232A] text-[#858A90] hover:text-[#F0EEE9] transition-colors"
          >
            <Terminal className="w-3.5 h-3.5 text-[#5A9A78]" />
            <span>Systems Archive</span>
          </Link>
        </div>
      </div>

      {/* Suggested Inquiries Guidance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
        <div className="p-4 rounded-xl border border-[#262B32] bg-[#14171A] space-y-2">
          <span className="text-[#71899A] font-bold block uppercase text-[10.5px]">
            Exploration Paths
          </span>
          <p className="text-[#858A90] leading-relaxed font-sans">
            Ask about specific architectures, trade-offs, why certain technologies were selected, or how tests were designed:
          </p>
          <ul className="space-y-1 text-[#C8C6BF] pt-1">
            <li className="flex items-center gap-1.5 text-[11px]">
              <span className="text-[#58A6FF]">›</span> &ldquo;How does VM Copy validate generated questions?&rdquo;
            </li>
            <li className="flex items-center gap-1.5 text-[11px]">
              <span className="text-[#58A6FF]">›</span> &ldquo;Why decouple LLM intent from OpenCascade CAD?&rdquo;
            </li>
            <li className="flex items-center gap-1.5 text-[11px]">
              <span className="text-[#58A6FF]">›</span> &ldquo;What did the AI Worksheets POC teach Aadil?&rdquo;
            </li>
          </ul>
        </div>

        <div className="p-4 rounded-xl border border-[#262B32] bg-[#14171A] space-y-2">
          <span className="text-[#5A9A78] font-bold block uppercase text-[10.5px]">
            Strict Source Provenance
          </span>
          <p className="text-[#858A90] leading-relaxed font-sans">
            Every response separates verified claims from unverified speculation, strictly referencing:
          </p>
          <div className="grid grid-cols-2 gap-2 text-[10.5px] pt-1 text-[#858A90]">
            <div>• Timeline & Dates</div>
            <div>• Journal (10 Chapters)</div>
            <div>• Systems Specifications</div>
            <div>• 424+ Automated Tests</div>
          </div>
        </div>
      </div>

      <AskAadilModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
