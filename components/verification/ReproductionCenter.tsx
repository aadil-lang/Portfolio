"use client"

import React, { useState } from 'react'
import { Terminal, Copy, Check, ShieldCheck, Cpu, Box, AlertTriangle } from 'lucide-react'

interface ReproductionHarness {
  id: string
  title: string
  category: string
  command: string
  runtime: string
  prerequisites: string
  expectedTarget: string
  limitations: string
}

const reproductionHarnesses: ReproductionHarness[] = [
  {
    id: 'HARN-01',
    title: 'In-Repo Complete Regression Suite (758 Assertions)',
    category: 'Node.js In-Process Runner',
    command: 'npx tsc -p scratch/tsconfig.scripts.json && node scratch/run_with_alias.js scratch/test_build/scripts/test_architecture_explorer.js && node scratch/run_with_alias.js scratch/test_build/scripts/test_recruiter_quick_view.js && node scratch/run_with_alias.js scratch/test_build/scripts/test_rag_lab_unit.js && node scratch/run_with_alias.js scratch/test_build/scripts/test_decision_records.js && node scratch/run_with_alias.js scratch/test_build/scripts/test_retrieval_foundation.js && node scratch/run_with_alias.js scratch/test_build/scripts/test_grounded_conversational_evaluation.js',
    runtime: 'Node.js v18+ / v20+ / v24+',
    prerequisites: 'npm install completed in repository root.',
    expectedTarget: '758 passed, 0 failed across all 6 portfolio verification suites.',
    limitations: 'Executes pure TypeScript invariants and in-memory mock evaluators; does not require external LLM API keys.'
  },
  {
    id: 'HARN-02',
    title: 'RAG Lab 12-Case Golden Benchmark Evaluation',
    category: 'Information Retrieval Benchmark',
    command: 'node scratch/run_with_alias.js scratch/test_build/scripts/test_rag_lab_unit.js',
    runtime: 'Node.js v18+',
    prerequisites: 'Compiled scripts in scratch/test_build/',
    expectedTarget: 'Mean P@5: 30.0% | Mean R@5: 100.0% | Mean MRR: 0.8333 | Mean nDCG@5: 0.7937',
    limitations: 'Evaluates Okapi BM25, subword n-gram vector cosine similarity, and RRF (k=60) against golden benchmark queries.'
  },
  {
    id: 'HARN-03',
    title: 'Dockerized CAD Boundary Representation Mass Properties Suite',
    category: 'Dockerized Container Harness',
    command: 'docker-compose -f tests/docker-compose.test.yml up --abort-on-container-exit',
    runtime: 'Docker Engine 20.10+ / Linux x86_64 or ARM64',
    prerequisites: 'Docker daemon running; OpenCascade 7.6.0 base image.',
    expectedTarget: '424 automated pytests passing across 28 test suites; relative volume discrepancy < 10⁻⁶.',
    limitations: 'Validates parametric geometry algorithms in headless Linux container; does not simulate physical machine tool chatter.'
  },
  {
    id: 'HARN-04',
    title: 'Multi-Agent Reliability Synthetic Stress Suite',
    category: 'Python Pytest + Playwright Harness',
    command: 'pytest tests/backend && npx playwright test && python -m evaluation.synthetic_journeys --runs 1000 --seed 42',
    runtime: 'Python 3.11 + Node.js 18+',
    prerequisites: 'python -m venv venv && pip install -r requirements.txt && npx playwright install chromium',
    expectedTarget: '205+ passing tests; 1,000 synthetic journeys completed with Fisher uncertainty circuit breaker active.',
    limitations: 'Requires local Playwright Chromium headless driver.'
  },
  {
    id: 'HARN-05',
    title: 'OCR Evaluation 5-Axis Controlled Perturbation Matrix',
    category: 'Python Image Processing Harness',
    command: 'pytest tests/ && python -m src.perturbation.evaluate --dataset synthetic_v1',
    runtime: 'Python 3.10+ with Tesseract 5.0 and Poppler',
    prerequisites: 'pip install -r requirements.txt; system Tesseract OCR binary installed.',
    expectedTarget: '154 tests passing; degradation accuracy curves generated across 5 perturbation axes.',
    limitations: 'Requires local Tesseract binary for character extraction.'
  }
]

export default function ReproductionCenter() {
  const [activeTab, setActiveTab] = useState<string>('HARN-01')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const activeHarness = reproductionHarnesses.find((h) => h.id === activeTab) || reproductionHarnesses[0]

  const copyCommand = async (cmd: string, id: string) => {
    try {
      await navigator.clipboard.writeText(cmd)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.warn('Clipboard write failed:', err)
    }
  }

  return (
    <section aria-labelledby="reproduction-heading" className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#262B32] pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 id="reproduction-heading" className="text-xl font-serif font-bold text-[#F0EEE9] tracking-tight">
              Reproduction Center
            </h2>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#16202D] text-[#58A6FF] border border-[#388BFD]/30">
              AUDITED CLI INSTRUCTIONS
            </span>
          </div>
          <p className="text-xs text-[#9CA3AF] mt-0.5">
            Exact, verified terminal commands to independently reproduce test suites and evaluation benchmarks locally.
          </p>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#6B7280]">
          <Terminal className="w-3.5 h-3.5 text-[#5A9A78]" />
          <span>SAFE LOCAL CLI ONLY</span>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="bg-[#121518] p-3 rounded-lg border border-[#262B32] text-xs text-[#9CA3AF] flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-[#5A9A78] shrink-0" />
        <span>
          <strong className="text-[#E5E7EB]">Execution Safety Notice:</strong> These commands are designed for safe local execution in your terminal. No commands are ever executed from the browser. Commands use safe repository-relative paths and do not expose private credentials or machine-specific absolute directories.
        </span>
      </div>

      {/* Harness Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {reproductionHarnesses.map((h) => {
          const isActive = activeTab === h.id
          return (
            <button
              key={h.id}
              type="button"
              onClick={() => setActiveTab(h.id)}
              className={`px-3 py-2 rounded font-mono text-xs whitespace-nowrap transition-colors border ${
                isActive
                  ? 'bg-[#1C2820] border-[#5A9A78] text-[#A3E5C2] font-semibold'
                  : 'bg-[#14171A] border-[#262B32] text-[#858A90] hover:text-[#E5E7EB] hover:bg-[#181C21]'
              }`}
            >
              {h.id}: {h.title.split('(')[0]}
            </button>
          )
        })}
      </div>

      {/* Active Harness Card */}
      <div className="bg-[#14171A] border border-[#262B32] rounded-lg p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#22272E] pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#58A6FF] bg-[#16202D] px-2 py-0.5 rounded border border-[#388BFD]/30">
                {activeHarness.id}
              </span>
              <h3 className="font-serif font-bold text-base text-[#F0EEE9]">
                {activeHarness.title}
              </h3>
            </div>
            <div className="text-[11px] font-mono text-[#858A90] mt-1">
              Category: {activeHarness.category} • Target: {activeHarness.runtime}
            </div>
          </div>
          <button
            type="button"
            onClick={() => copyCommand(activeHarness.command, activeHarness.id)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded font-mono text-xs bg-[#1C2128] hover:bg-[#252B34] text-[#F0EEE9] border border-[#2D333B] transition-colors self-start sm:self-auto"
            aria-label={`Copy command for ${activeHarness.title}`}
          >
            {copiedId === activeHarness.id ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#5A9A78]" />
                <span className="text-[#78C29A]">Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Command</span>
              </>
            )}
          </button>
        </div>

        {/* Command Box */}
        <div>
          <div className="text-[10px] font-mono text-[#858A90] uppercase tracking-wider mb-1">
            Terminal Invocation String
          </div>
          <pre className="bg-[#0D1013] border border-[#262B32] p-3.5 rounded text-xs font-mono text-[#78C29A] overflow-x-auto selection:bg-[#5A9A78]/30">
            <code>{activeHarness.command}</code>
          </pre>
        </div>

        {/* Technical Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
          <div className="bg-[#181C21] p-3 rounded border border-[#22272E]">
            <span className="font-mono text-[10px] text-[#858A90] uppercase tracking-wider block mb-1">
              Prerequisites & Environment
            </span>
            <p className="text-[#C9D1D9] leading-snug">{activeHarness.prerequisites}</p>
          </div>

          <div className="bg-[#181C21] p-3 rounded border border-[#22272E]">
            <span className="font-mono text-[10px] text-[#858A90] uppercase tracking-wider block mb-1">
              Expected Verification Target
            </span>
            <p className="text-[#78C29A] font-mono leading-snug font-semibold">{activeHarness.expectedTarget}</p>
          </div>

          <div className="bg-[#181C21] p-3 rounded border border-[#22272E]">
            <span className="font-mono text-[10px] text-[#D99B26] uppercase tracking-wider block mb-1">
              Execution Limitations
            </span>
            <p className="text-[#E5D7B7] leading-snug">{activeHarness.limitations}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

