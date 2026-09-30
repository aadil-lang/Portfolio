import React from 'react'
import Link from 'next/link'
import { profile } from '../data/profile'
import {
  Compass,
  BookOpen,
  Terminal,
  ArrowRight,
  Sparkles,
  FileText,
  Mail
} from 'lucide-react'
import { HomepageAskAadilCta } from '../components/AskAadil/HomepageAskAadilCta'

export const metadata = {
  title: 'Mohemmed Aadil Khurshid | AI Systems Engineer — Portfolio Orientation',
  description:
    'Orientation layer for Mohemmed Aadil Khurshid, AI Systems Engineer. Explore the chronological Timeline, tactile Engineering Journal, and verified Systems Archive.'
}

export default function HomePage() {
  return (
    <div className="space-y-16 pb-12">
      {/* ------------------------------------------------------------- */}
      {/* SECTION 01 — HERO                                             */}
      {/* ------------------------------------------------------------- */}
      <section className="text-center max-w-3xl mx-auto space-y-6 pt-4 sm:pt-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#16191D] border border-[#2A2F36] text-[#9EA4AA] text-xs font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5A9A78]" />
          <span>SPEC-2026 // ENGINEERING ORIENTATION</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F0EEE9] font-serif">
            {profile.name}
          </h1>
          <p className="text-sm sm:text-base uppercase font-mono tracking-widest text-[#71899A] font-semibold">
            {profile.role}
          </p>
        </div>

        {/* Primary Statement */}
        <blockquote className="text-base sm:text-lg text-[#C8C6BF] font-serif italic border-y border-[#262B32] py-3 max-w-xl mx-auto">
          &ldquo;I build AI systems that reason, use tools, generate artifacts, and verify their own behavior.&rdquo;
        </blockquote>

        {/* Compact Evolutionary Progression */}
        <div className="p-3 rounded-lg bg-[#14171A] border border-[#262B32] max-w-2xl mx-auto">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#71899A] block mb-1.5 font-bold">
            Evolutionary Progression
          </span>
          <div className="text-[11px] sm:text-xs font-mono font-medium text-[#C8C6BF] flex flex-wrap items-center justify-center gap-1.5">
            <span>Content</span>
            <span className="text-[#5A6066]">→</span>
            <span>AI Workflows</span>
            <span className="text-[#5A6066]">→</span>
            <span>AI Systems</span>
            <span className="text-[#5A6066]">→</span>
            <span>Systems Engineering</span>
            <span className="text-[#5A6066]">→</span>
            <span className="text-[#5A9A78] font-bold">Governed Agents</span>
          </div>
        </div>

        {/* Primary Navigation Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 font-mono text-xs">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-[#3E4652] bg-[#22272E] hover:bg-[#2C333D] text-[#F0EEE9] font-medium transition-colors shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#71899A]" />
            <span>Explore Journey</span>
          </Link>

          <Link
            href="/systems"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-[#2B3037] bg-[#16191D] hover:bg-[#1E232A] text-[#D8D6D0] hover:text-white transition-colors"
          >
            <Terminal className="w-3.5 h-3.5 text-[#5A9A78]" />
            <span>Explore Systems</span>
          </Link>

          <HomepageAskAadilCta variant="compact" label="Ask Aadil" />
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 02 — FROM CONTENT TO SYSTEMS                          */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-3xl mx-auto px-4 space-y-6">
        <div className="p-6 rounded-xl border border-[#262B32] bg-[#14171A] space-y-4">
          <div className="space-y-1">
            <span className="text-xs uppercase font-mono tracking-wider text-[#71899A] block">
              TRAJECTORY // NARRATIVE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F0EEE9] font-serif">
              From Content to Systems
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#C8C6BF] leading-relaxed">
            I began as a Mathematics Content Developer and Subject Matter Expert with a Mechanical Engineering background. Working directly with content workflows exposed problems that could not be solved by prompting alone. That led me from content systems into AI workflows, deterministic validation, engineering automation, and governed agentic systems.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#22272E]">
            <Link
              href="/experience"
              className="p-4 rounded-lg bg-[#181C21] hover:bg-[#1E232A] border border-[#2A303A] hover:border-[#536B7A] transition-all group flex flex-col justify-between space-y-1.5"
            >
              <div className="flex items-center justify-between text-xs font-mono font-bold text-[#F0EEE9] group-hover:text-white">
                <span>Timeline →</span>
                <span className="text-[10px] text-[#71899A] font-normal">2021 — 2026</span>
              </div>
              <p className="text-xs text-[#9EA4AA] leading-relaxed">
                What happened and when. Chronological milestones, tenures, and tooling transitions.
              </p>
            </Link>

            <Link
              href="/journal"
              className="p-4 rounded-lg bg-[#181C21] hover:bg-[#1E232A] border border-[#2A303A] hover:border-[#71899A] transition-all group flex flex-col justify-between space-y-1.5"
            >
              <div className="flex items-center justify-between text-xs font-mono font-bold text-[#F0EEE9] group-hover:text-white">
                <span>Journal →</span>
                <span className="text-[10px] text-[#A2B4C2] font-normal">10 Spreads</span>
              </div>
              <p className="text-xs text-[#9EA4AA] leading-relaxed">
                Why I explored it, what broke, and what I learned. A tactile notebook of engineering discovery.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 03 — SELECTED SYSTEMS                                 */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-4xl mx-auto px-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#242930] pb-3">
          <div>
            <span className="text-xs uppercase tracking-wider font-mono text-[#5A9A78]">
              FEATURED // SYSTEMS SELECTION
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F0EEE9] font-serif">
              Selected Systems
            </h2>
          </div>
          <Link
            href="/systems"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#5A9A78] hover:text-[#78B896] transition-colors font-semibold"
          >
            <span>[ Explore Complete Systems Archive → ]</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Card 1: VM Copy */}
          <Link
            href="/projects/vm-copy"
            className="p-4 rounded-xl bg-[#14171A] hover:bg-[#191D22] border border-[#262B32] hover:border-[#536B7A] transition-all group flex flex-col justify-between space-y-3 cursor-pointer"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="px-1.5 py-0.5 rounded bg-[#1C222A] text-[#71899A] font-semibold border border-[#2B3542]">
                  WAYGROUND BUILD
                </span>
                <span className="text-[#858A90]">2024</span>
              </div>
              <h3 className="font-serif font-bold text-base text-[#F0EEE9] group-hover:text-white transition-colors">
                VM Copy Generator
              </h3>
              <p className="text-xs text-[#9EA4AA] leading-relaxed">
                Deterministic math question generator enforcing 4 unique options, single correct answer exclusivity, and distractor rationale validation.
              </p>
              <div className="text-[10px] font-mono text-[#5A9A78]">
                Theme: Deterministic Guardrails & Evaluation
              </div>
            </div>
            <div className="pt-2 border-t border-[#22272E] text-[10.5px] font-mono text-[#71899A] group-hover:text-[#D8D6D0] flex items-center justify-between">
              <span>View System Entry</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          {/* Card 2: EDA */}
          <Link
            href="/projects/design-automation"
            className="p-4 rounded-xl bg-[#14171A] hover:bg-[#191D22] border border-[#262B32] hover:border-[#5A9A78] transition-all group flex flex-col justify-between space-y-3 cursor-pointer"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="px-1.5 py-0.5 rounded bg-[#18261F] text-[#5A9A78] font-semibold border border-[#234030]">
                  PERSONAL BUILD
                </span>
                <span className="text-[#858A90]">424 Tests</span>
              </div>
              <h3 className="font-serif font-bold text-base text-[#F0EEE9] group-hover:text-white transition-colors">
                Engineering Design Automation
              </h3>
              <p className="text-xs text-[#9EA4AA] leading-relaxed">
                Full-stack AI mechanical design converting natural-language briefs into validated OpenCascade 3D STEP solid geometry and SVG drawings.
              </p>
              <div className="text-[10px] font-mono text-[#5A9A78]">
                Theme: Hybrid AI + OpenCascade CAD Kernels
              </div>
            </div>
            <div className="pt-2 border-t border-[#22272E] text-[10.5px] font-mono text-[#5A9A78] group-hover:text-[#78B896] flex items-center justify-between">
              <span>View System Entry</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          {/* Card 3: AI Reliability */}
          <Link
            href="/projects/ai-reliability"
            className="p-4 rounded-xl bg-[#14171A] hover:bg-[#191D22] border border-[#262B32] hover:border-[#71899A] transition-all group flex flex-col justify-between space-y-3 cursor-pointer"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="px-1.5 py-0.5 rounded bg-[#18261F] text-[#5A9A78] font-semibold border border-[#234030]">
                  PERSONAL BUILD
                </span>
                <span className="text-[#858A90]">158+ Tests</span>
              </div>
              <h3 className="font-serif font-bold text-base text-[#F0EEE9] group-hover:text-white transition-colors">
                AI Application Reliability & QA
              </h3>
              <p className="text-xs text-[#9EA4AA] leading-relaxed">
                Autonomous browser testing agent pairing local Ollama reasoning with Playwright and Fisher Information parameter covariance.
              </p>
              <div className="text-[10px] font-mono text-[#5A9A78]">
                Theme: Local Agents & Epistemic Abstention
              </div>
            </div>
            <div className="pt-2 border-t border-[#22272E] text-[10.5px] font-mono text-[#71899A] group-hover:text-[#D8D6D0] flex items-center justify-between">
              <span>View System Entry</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 04 — ASK AADIL                                        */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="rounded-xl border border-[#388BFD]/30 bg-gradient-to-b from-[#131B26] to-[#10141B] p-6 space-y-4 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#162332] text-[#58A6FF] font-mono text-[11px] border border-[#388BFD]/40">
                <Sparkles className="w-3.5 h-3.5" />
                <span>INTERACTIVE EXPLORATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#F0EEE9] font-serif">
                Want to explore the journey differently? Ask Aadil.
              </h2>
              <p className="text-xs sm:text-sm text-[#9EA4AA] max-w-2xl leading-relaxed">
                Ask specific questions about system architectures, design decisions, failure modes, and verified benchmarks. Every response is strictly grounded in canonical evidence.
              </p>
            </div>

            <HomepageAskAadilCta variant="prominent" label="Launch Ask Aadil →" />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 05 — CONNECT & COLLABORATE                            */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="p-6 rounded-xl border border-[#262B32] bg-[#14171A] text-center space-y-3">
          <span className="text-xs uppercase font-mono tracking-wider text-[#71899A] block">
            COLLABORATION // CONNECT
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#F0EEE9] font-serif">
            Let&apos;s Build Verifiable Systems
          </h2>
          <p className="text-[#9EA4AA] max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
            Interested in discussing stateful multi-agent workflows, hybrid AI/deterministic solvers, or production reliability? Reach out directly.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2 font-mono text-xs">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded border border-[#3E4652] bg-[#22272E] hover:bg-[#2C333D] text-[#F0EEE9] font-medium transition-colors"
            >
              <span>Connect via Contact Page →</span>
            </Link>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded border border-[#262B32] bg-[#16191D] hover:bg-[#1E232A] text-[#858A90] hover:text-[#F0EEE9] transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-[#71899A]" />
              <span>Resume (PDF)</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
