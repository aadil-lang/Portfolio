"use client"

import React from 'react'
import { ShieldCheck, AlertCircle, FileText, ArrowRight, FileCode } from 'lucide-react'
import Link from 'next/link'

interface AuditedClaim {
  id: string
  project: string
  claimStatement: string
  measuredResult: string
  unit: string
  methodology: string
  evidenceId: string
  sourceFile: string
  qualification: string
  status: 'VERIFIED' | 'QUALIFIED'
}

const auditedClaims: AuditedClaim[] = [
  {
    id: 'CLM-EDA-02',
    project: 'Engineering Design Automation',
    claimStatement: '0.0000% volume calculation error between closed-form physics and CAD boundary representation',
    measuredResult: '< 10⁻⁶ relative discrepancy',
    unit: 'Numerical Volume Error',
    methodology: 'Closed-form Saint-Venant equations vs OpenCascade BRep discrete surface integrals',
    evidenceId: 'EVID-EDA-02',
    sourceFile: 'src/cad/analysis/mass_properties.py:88-124',
    qualification:
      'Software calculus agreement only. Does not assert physical CNC machine tool manufacturing tolerance (physical machining tolerance is ±0.05 mm).',
    status: 'QUALIFIED'
  },
  {
    id: 'CLM-SOL-02',
    project: 'Solace AI',
    claimStatement: '100% detection rate on 24 critical crisis triggers in <2ms',
    measuredResult: '100% detection (< 2ms)',
    unit: 'Circuit Breaker Recall',
    methodology: 'Compiled regex AST pattern matcher running ahead of LLM pipeline',
    evidenceId: 'EVID-SOL-02',
    sourceFile: 'backend/services/crisis_detector.py:34-78',
    qualification:
      'Bounded to the 24 explicit critical regex patterns tested in is_crisis_input. Does not claim 100% recall on nuanced, open-ended conversational human distress.',
    status: 'QUALIFIED'
  },
  {
    id: 'CLM-RAG-02',
    project: 'RAG Evaluation Lab',
    claimStatement: 'P@5: 30.0% | R@5: 100.0% | MRR: 0.8333 | nDCG@5: 0.7937 across 12 golden test cases',
    measuredResult: 'P@5: 30%, R@5: 100%, MRR: 0.8333',
    unit: 'Information Retrieval Metrics',
    methodology: '12 curated query-document triples evaluated against Okapi BM25 + Vector + RRF (k=60)',
    evidenceId: 'EVID-RAG-02',
    sourceFile: 'lib/rag-lab/benchmarkData.ts:1-280',
    qualification:
      'Vector space uses in-browser subword character n-gram TF-IDF cosine similarity, not dense neural embeddings, enabling zero-latency client-side execution.',
    status: 'QUALIFIED'
  },
  {
    id: 'CLM-REL-02',
    project: 'AI Application Reliability Platform',
    claimStatement: '1,000 synthetic user journeys evaluated across multi-turn LLM pipelines',
    measuredResult: '1,000 journeys',
    unit: 'Synthetic Simulation Runs',
    methodology: 'Multi-turn conversational permutation generator with fixed pseudo-random seed (42)',
    evidenceId: 'EVID-REL-02',
    sourceFile: 'evaluation/synthetic_journeys.py:45-180',
    qualification:
      'Synthetic journeys evaluate state transitions and guardrail boundaries under stress, but do not capture full human linguistic variety.',
    status: 'VERIFIED'
  },
  {
    id: 'CLM-VMC-01',
    project: 'VM Copy Question Generator',
    claimStatement: 'Pure TypeScript Tier-1 Deterministic Evaluator running in <1ms at $0 API cost',
    measuredResult: '< 1ms latency ($0 API cost)',
    unit: 'Evaluation Latency',
    methodology: 'In-memory Set arithmetic and regex validation of 4 options, 1 CA, duplicate distractors',
    evidenceId: 'EVID-VMC-01',
    sourceFile: 'lib/eval-layer.ts:44-76',
    qualification:
      'Evaluates structural formatting prior to LLM inference; pedagogical content accuracy evaluated downstream.',
    status: 'VERIFIED'
  },
  {
    id: 'CLM-MIB-01',
    project: 'US Mathematics Item Bank',
    claimStatement: 'Automated mathematical domain router selecting SVG vs TikZ renderers',
    measuredResult: 'Deterministic Routing Gate',
    unit: 'Routing Accuracy',
    methodology: 'AST expression analyzer evaluating token complexity to dispatch rendering engines',
    evidenceId: 'EVID-MIB-01',
    sourceFile: 'src/router/domain_router.py:40-105',
    qualification:
      'Team Ownership Boundary: System owned by Wayground engineering team. Evidence validates Aadil’s individual domain router contribution.',
    status: 'QUALIFIED'
  }
]

export default function QuantitativeClaimsComparison() {
  return (
    <section aria-labelledby="claims-heading" className="space-y-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#262B32] pb-3">
        <div>
          <h2 id="claims-heading" className="text-xl font-serif font-bold text-[#F0EEE9] tracking-tight">
            Audited Quantitative Claims & Anti-Inflation Nuances
          </h2>
          <p className="text-xs text-[#9CA3AF] mt-0.5">
            Transparent comparison of public claims, measured outcomes, and authoritative engineering caveats.
          </p>
        </div>
        <span className="font-mono text-xs text-[#5A9A78] bg-[#16231C] px-2.5 py-1 rounded border border-[#5A9A78]/30">
          ZERO UNQUALIFIED SUPERLATIVES
        </span>
      </div>

      {/* Grid of Claims */}
      <div className="space-y-4">
        {auditedClaims.map((claim) => (
          <div
            key={claim.id}
            className="bg-[#14171A] border border-[#262B32] rounded-lg p-5 hover:border-[#388BFD]/40 transition-colors space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold text-[#58A6FF] bg-[#16202D] px-2 py-0.5 rounded border border-[#388BFD]/30">
                  {claim.id}
                </span>
                <span className="font-mono text-xs text-[#9CA3AF]">{claim.project}</span>
              </div>
              <div className="flex items-center gap-2">
                {claim.status === 'VERIFIED' ? (
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[#78C29A] bg-[#16231C] px-2 py-0.5 rounded border border-[#5A9A78]/30 font-semibold">
                    <ShieldCheck className="w-3 h-3 text-[#5A9A78]" />
                    VERIFIED CLAIM
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[#F0B84D] bg-[#261E14] px-2 py-0.5 rounded border border-[#D99B26]/30 font-semibold">
                    <AlertCircle className="w-3 h-3 text-[#D99B26]" />
                    QUALIFIED CLAIM
                  </span>
                )}
                <a
                  href={`#${claim.evidenceId.toLowerCase()}`}
                  className="font-mono text-[11px] text-[#58A6FF] hover:underline flex items-center gap-1"
                >
                  <span>{claim.evidenceId}</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Public Claim vs Measured Result */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
              <div className="bg-[#181C21] p-3 rounded border border-[#242930]">
                <div className="text-[10px] font-mono text-[#858A90] uppercase tracking-wider mb-1">
                  Public Statement Across Portfolio
                </div>
                <div className="text-[#E5E7EB] font-serif font-semibold italic leading-snug">
                  &ldquo;{claim.claimStatement}&rdquo;
                </div>
              </div>

              <div className="bg-[#181C21] p-3 rounded border border-[#242930]">
                <div className="text-[10px] font-mono text-[#858A90] uppercase tracking-wider mb-1">
                  Audited Measurement & Methodology
                </div>
                <div className="font-mono font-bold text-[#78C29A] text-sm">
                  {claim.measuredResult}
                </div>
                <div className="text-[11px] text-[#9CA3AF] mt-0.5 font-mono">
                  Method: {claim.methodology}
                </div>
              </div>
            </div>

            {/* Authoritative Engineering Nuance */}
            <div className="bg-[#121518] p-3 rounded border border-[#262B32] flex items-start gap-2.5 text-xs">
              <AlertCircle className="w-4 h-4 text-[#D99B26] shrink-0 mt-0.5" />
              <div>
                <span className="font-mono text-[10px] text-[#D99B26] font-bold uppercase tracking-wider block">
                  Authoritative Engineering Qualification & Anti-Inflation Nuance:
                </span>
                <span className="text-[#C9D1D9] leading-relaxed block mt-0.5">
                  {claim.qualification}
                </span>
                <div className="text-[10px] font-mono text-[#6B7280] mt-1.5 flex items-center gap-1">
                  <FileCode className="w-3 h-3 text-[#58A6FF]" />
                  <span>Source Code Provenance: <code>{claim.sourceFile}</code></span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
