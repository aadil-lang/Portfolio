'use client'

import React from 'react'
import Link from 'next/link'
import { ProjectComparisonProfile } from '@/data/comparison/types'

interface ComparisonEvidenceDrawerProps {
  projects: ProjectComparisonProfile[]
}

export default function ComparisonEvidenceDrawer({ projects }: ComparisonEvidenceDrawerProps) {
  // Aggregate all evidence IDs and component IDs for active projects
  const allEvidenceIds = Array.from(
    new Set(
      projects.flatMap((p) =>
        Object.values(p.dimensions).flatMap((d) => d.evidenceIds || [])
      )
    )
  )

  const allComponentIds = Array.from(
    new Set(
      projects.flatMap((p) =>
        Object.values(p.dimensions).flatMap((d) => d.componentIds || [])
      )
    )
  )

  const allDecisionIds = Array.from(
    new Set(
      projects.flatMap((p) =>
        Object.values(p.dimensions).flatMap((d) => d.decisionIds || [])
      )
    )
  )

  return (
    <section
      aria-labelledby="comparison-provenance-heading"
      className="p-6 rounded-xl bg-[#14171A] border border-[#262B32] space-y-4"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-3 border-b border-[#262B32]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <h2 id="comparison-provenance-heading" className="text-sm font-semibold text-neutral-100 uppercase tracking-wide font-mono">
              Evidence Provenance & Verification Governance
            </h2>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Certified under <code className="text-emerald-400 font-mono">engineering-security-reliability</code> (Level 1 Implementation Standard).
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-[#181C21] border border-[#262B32] text-neutral-300">
            {allEvidenceIds.length} Evidence Records
          </span>
          <span className="px-2.5 py-1 rounded bg-[#181C21] border border-[#262B32] text-neutral-300">
            {allComponentIds.length} Architecture Nodes
          </span>
          <span className="px-2.5 py-1 rounded bg-[#181C21] border border-[#262B32] text-neutral-300">
            {allDecisionIds.length} ADRs
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-xs">
        {/* Verification Hub */}
        <div className="p-3.5 rounded-lg bg-[#181C21] border border-[#262B32] space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
            Phase 6.4 Verification
          </span>
          <p className="text-neutral-300 leading-relaxed">
            Every quantitative metric, test suite pass count, and qualification limitation is grounded in source files.
          </p>
          <Link
            href="/verification"
            className="inline-flex items-center gap-1 text-emerald-400 hover:underline font-mono text-[11px] pt-1"
          >
            <span>Open Verification Dashboard</span>
            <span>→</span>
          </Link>
        </div>

        {/* Architecture Hub */}
        <div className="p-3.5 rounded-lg bg-[#181C21] border border-[#262B32] space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-bold block">
            Phase 6.3 Architecture Explorer
          </span>
          <p className="text-neutral-300 leading-relaxed">
            Interactive node graphs showing interface boundaries, data flows, validation contracts, and runtime states.
          </p>
          <Link
            href="/architecture"
            className="inline-flex items-center gap-1 text-blue-400 hover:underline font-mono text-[11px] pt-1"
          >
            <span>Open Architecture Explorer</span>
            <span>→</span>
          </Link>
        </div>

        {/* Decision Records */}
        <div className="p-3.5 rounded-lg bg-[#181C21] border border-[#262B32] space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold block">
            Phase 6.1 Engineering ADRs
          </span>
          <p className="text-neutral-300 leading-relaxed">
            Formal architectural decision records documenting rejected alternatives, constraints, and trade-offs.
          </p>
          <Link
            href={projects[0]?.decisionRecordsRoute || '/projects'}
            className="inline-flex items-center gap-1 text-purple-400 hover:underline font-mono text-[11px] pt-1"
          >
            <span>View Case Study ADRs</span>
            <span>→</span>
          </Link>
        </div>
      </div>

      <div className="p-3 rounded-lg bg-[#101316] border border-[#262B32]/70 text-[11px] text-neutral-400 leading-relaxed">
        <strong className="text-neutral-300 font-semibold">Anti-Inflation Commitment:</strong> This comparison engine strictly rejects unprovable ratings (e.g. &quot;Complexity: 9/10&quot; or podium rankings). All comparisons evaluate concrete architectural choices, deterministic guardrails, failure containment strategies, and genuine engineering compromises.
      </div>
    </section>
  )
}

