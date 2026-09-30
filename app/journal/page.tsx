import React from 'react'
import Link from 'next/link'
import JournalBook from '../../components/Journal/JournalBook'
import { BookOpen, Compass, Terminal, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'

export const metadata = {
  title: 'The Engineering Journal | Mohemmed Aadil Khurshid — AI Systems Engineer',
  description:
    'An interactive, tactile engineering journal tracing the evolution from mathematics and content systems into production AI engineering, agentic orchestration, and reliability.'
}

export default function JournalPage() {
  return (
    <div className="space-y-6 pb-16">
      {/* Journal Layer Orientation Header */}
      <section className="max-w-5xl mx-auto pt-2 sm:pt-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#242930] pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#16191D] border border-[#2A2F36] text-[#71899A] text-[11px] font-mono">
              <BookOpen className="w-3.5 h-3.5 text-[#71899A]" />
              <span>LAYER 02 // REFLECTIVE ENGINEERING JOURNAL</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F0EEE9] font-serif">
              The Engineering Journal
            </h1>
            <p className="text-xs sm:text-sm text-[#A2A8AF] max-w-2xl font-serif italic">
              &ldquo;Why did I start exploring this? What broke? What did each system teach me along the way?&rdquo;
            </p>
          </div>

          {/* Quick Cross-Layer Navigation */}
          <div className="flex items-center gap-2 font-mono text-xs self-start sm:self-auto shrink-0">
            <Link
              href="/experience"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#2A2F36] bg-[#16191D] hover:bg-[#1E232A] text-[#858A90] hover:text-[#F0EEE9] transition-colors"
              title="View Chronological Timeline"
            >
              <Compass className="w-3.5 h-3.5 text-[#536B7A]" />
              <span>Timeline →</span>
            </Link>
            <Link
              href="/systems"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#2A2F36] bg-[#16191D] hover:bg-[#1E232A] text-[#858A90] hover:text-[#F0EEE9] transition-colors"
              title="View Systems Archive"
            >
              <Terminal className="w-3.5 h-3.5 text-[#5A9A78]" />
              <span>Systems Archive →</span>
            </Link>
          </div>
        </div>

        {/* Operating Context Ribbon */}
        <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-[#686E77] pt-1">
          <span>SPATIAL TWO-PAGE FOLIO // 10 CHAPTERS & SYNTHESIS</span>
          <span className="hidden md:inline text-[#555C62]">Use next/prev arrows or chapter index to navigate</span>
        </div>
      </section>

      {/* Primary Experience: The Interactive Engineering Journal Book */}
      <section id="journal-book" className="w-full">
        <JournalBook />
      </section>

      {/* Post-Reading Contextual Cross-Layer Bridge */}
      <section className="max-w-4xl mx-auto pt-6 border-t border-[#242930] grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
        <Link
          href="/experience"
          className="p-4 rounded-xl border border-[#262B32] bg-[#14171A] hover:border-[#536B7A] transition-all group space-y-1.5"
        >
          <div className="flex items-center justify-between text-[10px] text-[#71899A]">
            <span>LAYER 01 // CHRONOLOGY</span>
            <Compass className="w-3.5 h-3.5 text-[#536B7A]" />
          </div>
          <h3 className="font-serif font-bold text-sm text-[#F0EEE9] group-hover:text-white transition-colors">
            Follow the Timeline
          </h3>
          <p className="text-[11px] text-[#858A90] font-sans leading-relaxed">
            Trace the dated roles, milestone transitions, and factual sequence from 2021 through 2026.
          </p>
        </Link>

        <Link
          href="/systems"
          className="p-4 rounded-xl border border-[#262B32] bg-[#14171A] hover:border-[#5A9A78] transition-all group space-y-1.5"
        >
          <div className="flex items-center justify-between text-[10px] text-[#5A9A78]">
            <span>LAYER 03 // EVIDENCE</span>
            <Terminal className="w-3.5 h-3.5 text-[#5A9A78]" />
          </div>
          <h3 className="font-serif font-bold text-sm text-[#F0EEE9] group-hover:text-white transition-colors">
            Inspect Systems & Code
          </h3>
          <p className="text-[11px] text-[#858A90] font-sans leading-relaxed">
            Examine the actual architectures, verified CodeEvidence, test suites, and GitHub repositories.
          </p>
        </Link>
      </section>
    </div>
  )
}
