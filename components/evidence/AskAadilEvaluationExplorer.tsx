'use client'

import React, { useState } from 'react'
import {
  askAadilEvaluationSuites,
  EvaluationSuiteItem,
  TestCaseItem
} from '@/data/evidence/askAadilEvaluationData'
import {
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Filter,
  Terminal,
  Activity,
  Layers,
  Sparkles,
  Lock,
  ArrowRight
} from 'lucide-react'

export default function AskAadilEvaluationExplorer() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [expandedSuiteIds, setExpandedSuiteIds] = useState<string[]>([
    'suite-hardening-agent-qa',
    'suite-controlled-actions'
  ])

  const totalAssertions = askAadilEvaluationSuites.reduce((acc, s) => acc + s.assertionCount, 0)
  const coreAssertions = 172 // Reconciled core hardening slice (132 QA + 29 Controlled Actions + 11 Browser E2E)

  const toggleSuite = (id: string) => {
    setExpandedSuiteIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const filteredSuites = askAadilEvaluationSuites.filter((suite) => {
    if (selectedCategory === 'all') return true
    if (selectedCategory === 'core') return suite.isCoreHardening
    return suite.category === selectedCategory
  })

  return (
    <div className="rounded-xl border border-[#262B32] bg-[#14171A] p-5 sm:p-6 space-y-6 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#262B32] gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#5A9A78] animate-pulse" />
            <span className="text-xs uppercase tracking-wider font-mono text-[#5A9A78] font-bold">
              VERIFIED TEST HARNESS // 10 EVALUATION SUITES
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#F0EEE9] font-serif mt-1">
            Ask Aadil — Interactive Evaluation Explorer
          </h3>
          <p className="text-xs sm:text-sm text-[#9EA4AA] mt-1 max-w-3xl leading-relaxed">
            Inspect the 327 automated assertions across 10 evaluation test scripts governing conversational grounding, epistemic temporal boundaries, bitwise draft integrity, and prompt-injection resistance.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 font-mono text-[11px] px-3 py-1.5 rounded-lg bg-[#181C21] border border-[#2A2F36] text-[#71899A]">
          <Lock className="w-3.5 h-3.5 text-[#5A9A78]" />
          <span>Sanitized Evidence Ledger</span>
        </div>
      </div>

      {/* Reconciled Stats Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl border border-[#262B32] bg-[#181C21] space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#71899A]">
            Total Assertions
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono text-[#F0EEE9]">{totalAssertions}</span>
            <span className="text-[10.5px] font-mono text-[#5A9A78]">100% PASS</span>
          </div>
          <span className="text-[10px] text-[#858A90] font-mono block">10 Test Scripts</span>
        </div>

        <div className="p-3.5 rounded-xl border border-[#234030] bg-[#18261F] space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#5A9A78] font-bold">
            Core Hardening Slice
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono text-[#5A9A78]">{coreAssertions}</span>
            <span className="text-[10.5px] font-mono text-[#B8DAC8]">Checks</span>
          </div>
          <span className="text-[10px] text-[#858A90] font-mono block">Temporal + Actions + E2E</span>
        </div>

        <div className="p-3.5 rounded-xl border border-[#262B32] bg-[#181C21] space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#71899A]">
            Draft Integrity
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold font-mono text-[#388BFD]">Bitwise 1:1</span>
          </div>
          <span className="text-[10px] text-[#858A90] font-mono block">0 LLM Text Drift</span>
        </div>

        <div className="p-3.5 rounded-xl border border-[#262B32] bg-[#181C21] space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#71899A]">
            Epistemic Bounds
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold font-mono text-[#E3B341]">July 2026</span>
          </div>
          <span className="text-[10px] text-[#858A90] font-mono block">Strict Historical Lock</span>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#262B32]">
        <span className="text-[11px] font-mono uppercase text-[#71899A] mr-1 flex items-center gap-1 font-semibold">
          <Filter className="w-3.5 h-3.5" /> Filter:
        </span>
        {[
          { id: 'all', label: `All Suites (${askAadilEvaluationSuites.length})` },
          { id: 'core', label: 'Core Hardening & Temporal' },
          { id: 'actions', label: 'Action Governance & Drafts' },
          { id: 'retrieval', label: 'Retrieval & Context' },
          { id: 'nlu', label: 'NLU & Entity Tracking' },
          { id: 'tools', label: 'Tools & Planning' }
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#5A9A78] text-[#14171A] font-bold shadow-xs'
                : 'bg-[#181C21] text-[#9EA4AA] hover:text-[#F0EEE9] border border-[#262B32]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Suite Accordion List */}
      <div className="space-y-3">
        {filteredSuites.map((suite) => {
          const isExpanded = expandedSuiteIds.includes(suite.id)
          return (
            <div
              key={suite.id}
              className={`rounded-xl border transition-colors ${
                isExpanded
                  ? 'border-[#3E4652] bg-[#16191D]'
                  : 'border-[#262B32] bg-[#181C21] hover:border-[#333A44]'
              }`}
            >
              {/* Suite Header Card */}
              <button
                onClick={() => toggleSuite(suite.id)}
                aria-expanded={isExpanded}
                aria-controls={`suite-content-${suite.id}`}
                className="w-full p-4 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#5A9A78] rounded-xl"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-[#71899A]">
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-[#5A9A78]" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-serif font-bold text-sm sm:text-base text-[#F0EEE9]">
                        {suite.title}
                      </h4>
                      {suite.isCoreHardening && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#18261F] text-[#5A9A78] border border-[#234030]">
                          CORE HARDENING
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-mono text-[#71899A] mt-0.5">{suite.fileName}</p>
                    <p className="text-xs text-[#9EA4AA] mt-1.5 line-clamp-2 leading-relaxed">
                      {suite.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center font-mono text-xs">
                  <span className="px-2.5 py-1 rounded-md bg-[#14171A] border border-[#262B32] text-[#F0EEE9] font-bold">
                    {suite.assertionCount} Assertions
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-[#5A9A78]" />
                </div>
              </button>

              {/* Expanded Test Cases */}
              {isExpanded && suite.testCases && suite.testCases.length > 0 && (
                <div className="p-4 pt-1 border-t border-[#242930] space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#71899A] font-semibold">
                    Representative Verified Test Cases:
                  </span>
                  <div className="space-y-3">
                    {suite.testCases.map((tc) => (
                      <div
                        key={tc.id}
                        className="p-3.5 rounded-lg border border-[#262B32] bg-[#14171A] space-y-2 text-xs font-mono"
                      >
                        <div className="flex items-center justify-between pb-1 border-b border-[#22272E]">
                          <span className="font-bold text-[#F0EEE9]">{tc.name}</span>
                          <span className="text-[#5A9A78] text-[10.5px] flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>VERIFIED</span>
                          </span>
                        </div>

                        <div>
                          <span className="text-[#71899A] text-[10.5px] block font-semibold">
                            Sample Query / Interaction:
                          </span>
                          <div className="p-2 rounded bg-[#101316] text-[#D8D6D0] mt-1 border border-[#1F2329]">
                            {tc.query}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1 text-[11px]">
                          <div className="space-y-0.5">
                            <span className="text-[#858A90] font-semibold">Expected Behavior:</span>
                            <p className="text-[#C8C6BF] leading-snug">{tc.expectedOutcome}</p>
                          </div>
                          <div className="space-y-0.5">
                            <span className="text-[#5A9A78] font-semibold">Actual Verified Outcome:</span>
                            <p className="text-[#A3D9BE] leading-snug">{tc.actualOutcome}</p>
                          </div>
                        </div>

                        <div className="pt-2 text-[10.5px] border-t border-[#22272E] flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[#858A90]">
                          <span>
                            <strong>Failure Mode Prevented:</strong> {tc.failureModePrevented}
                          </span>
                          <span className="text-[#71899A]">{tc.criteria}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

