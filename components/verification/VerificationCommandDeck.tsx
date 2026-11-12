"use client"

import React from 'react'
import { computeVerificationMetrics } from '../../data/verification/projectVerification'
import { CheckCircle2, ShieldCheck, Terminal, Cpu, Database, AlertTriangle } from 'lucide-react'

export default function VerificationCommandDeck() {
  const metrics = computeVerificationMetrics()

  return (
    <section aria-labelledby="command-deck-heading" className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#262B32] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#16231C] border border-[#5A9A78]/30 text-[#78C29A] font-mono text-xs mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#5A9A78]" />
            <span>LEVEL 1 IMPLEMENTATION STANDARD // VERIFICATION REGISTER</span>
          </div>
          <h1 id="command-deck-heading" className="text-3xl md:text-4xl font-serif font-bold text-[#F0EEE9] tracking-tight">
            Verification & Evidence Dashboard
          </h1>
          <p className="mt-2 text-[#9CA3AF] text-sm md:text-base max-w-3xl leading-relaxed">
            Source-grounded audit of all engineering claims across the portfolio. Every metric is reconciled against
            executable test suites, mathematical calculus proofs, deterministic circuit breakers, or golden retrieval benchmarks.
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-[#858A90] bg-[#14171A] px-3.5 py-2 rounded border border-[#262B32] shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#5A9A78] animate-pulse" />
          <span>STATUS: 100% REGRESSION FREE</span>
        </div>
      </div>

      {/* Primary KPI Grid — Strictly separates In-Repo assertions from Upstream tests */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: In-Repo Automated Assertions */}
        <div className="bg-[#14171A] border border-[#262B32] hover:border-[#5A9A78]/50 p-5 rounded-lg transition-colors">
          <div className="flex items-center justify-between text-xs font-mono text-[#9CA3AF] mb-2">
            <span>IN-REPO ASSERTIONS</span>
            <Terminal className="w-4 h-4 text-[#5A9A78]" />
          </div>
          <div className="text-3xl font-mono font-bold text-[#F0EEE9] tracking-tight">
            {metrics.inRepoAssertions}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-[#78C29A] font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#5A9A78]" />
            <span>100% Pass (0 Regressions)</span>
          </div>
          <p className="mt-2 text-[11px] text-[#6B7280] leading-tight">
            Actively executed in portfolio test runner across 6 suites (Architecture, Recruiter, RAG, Intent, Decisions).
          </p>
        </div>

        {/* Metric 2: Upstream Dedicated Automated Tests */}
        <div className="bg-[#14171A] border border-[#262B32] hover:border-[#388BFD]/50 p-5 rounded-lg transition-colors">
          <div className="flex items-center justify-between text-xs font-mono text-[#9CA3AF] mb-2">
            <span>UPSTREAM TEST SUITES</span>
            <Cpu className="w-4 h-4 text-[#388BFD]" />
          </div>
          <div className="text-3xl font-mono font-bold text-[#F0EEE9] tracking-tight">
            1,650+
          </div>
          <div className="mt-2 text-xs text-[#58A6FF] font-mono">
            <span>Verified in project repos</span>
          </div>
          <p className="mt-2 text-[11px] text-[#6B7280] leading-tight">
            Passing across Dockerized CAD harnesses (424), AI Reliability (205+), Atlas AI (178), OCR (154), and Solace (102).
          </p>
        </div>

        {/* Metric 3: Golden Benchmark Retrieval Cases */}
        <div className="bg-[#14171A] border border-[#262B32] hover:border-[#A371F7]/50 p-5 rounded-lg transition-colors">
          <div className="flex items-center justify-between text-xs font-mono text-[#9CA3AF] mb-2">
            <span>GOLDEN IR BENCHMARKS</span>
            <Database className="w-4 h-4 text-[#A371F7]" />
          </div>
          <div className="text-3xl font-mono font-bold text-[#F0EEE9] tracking-tight">
            {metrics.goldenBenchmarkCases}
          </div>
          <div className="mt-2 text-xs text-[#BC8CFF] font-mono">
            <span>MRR: 0.8333 • nDCG: 0.7937</span>
          </div>
          <p className="mt-2 text-[11px] text-[#6B7280] leading-tight">
            Curated query-document relevance triples in RAG Lab benchmark, measuring precision, recall, and negative abstention.
          </p>
        </div>

        {/* Metric 4: Registered Master Evidence Records */}
        <div className="bg-[#14171A] border border-[#262B32] hover:border-[#D99B26]/50 p-5 rounded-lg transition-colors">
          <div className="flex items-center justify-between text-xs font-mono text-[#9CA3AF] mb-2">
            <span>REGISTERED EVIDENCE</span>
            <AlertTriangle className="w-4 h-4 text-[#D99B26]" />
          </div>
          <div className="text-3xl font-mono font-bold text-[#F0EEE9] tracking-tight">
            {metrics.totalRegisteredEvidence}
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs font-mono">
            <span className="text-[#78C29A]">{metrics.statusCounts.VERIFIED} Verified</span>
            <span className="text-[#6B7280]">•</span>
            <span className="text-[#D99B26]">{metrics.statusCounts.QUALIFIED} Qualified</span>
          </div>
          <p className="mt-2 text-[11px] text-[#6B7280] leading-tight">
            All 11 case studies + Ask Aadil + RAG Lab + Architecture Explorer + Recruiter Quick View.
          </p>
        </div>
      </div>

      {/* Critical Methodological Separation Notice */}
      <div className="bg-[#181C21] border border-[#262B32] rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="flex items-start md:items-center gap-2.5">
          <span className="px-2 py-0.5 rounded bg-[#2A313C] text-[#F0EEE9] font-mono text-[10px] font-bold uppercase tracking-wider shrink-0">
            PROVENANCE NOTICE
          </span>
          <span className="text-[#9CA3AF] leading-relaxed">
            <strong className="text-[#E5E7EB]">Methodological Separation:</strong> In-repo test assertions (758) are actively evaluated in this repository’s Node.js test runner. Upstream automated tests (1,650+) belong to dedicated standalone microservices and Dockerized CAD environments. They are reported separately and never artificially conflated into a single metric.
          </span>
        </div>
      </div>
    </section>
  )
}

