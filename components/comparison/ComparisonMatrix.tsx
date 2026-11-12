'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  COMPARISON_DIMENSIONS,
  ComparisonDimensionId,
  ProjectComparisonProfile,
} from '@/data/comparison/types'

interface ComparisonMatrixProps {
  projects: ProjectComparisonProfile[]
  activeDimensionFilter: ComparisonDimensionId | 'all'
  onSelectDimensionFilter: (dim: ComparisonDimensionId | 'all') => void
}

export default function ComparisonMatrix({
  projects,
  activeDimensionFilter,
  onSelectDimensionFilter,
}: ComparisonMatrixProps) {
  // Mobile active tab when stacked
  const [mobileActiveProjectSlug, setMobileActiveProjectSlug] = useState<string>(projects[0]?.slug || '')

  // Update mobile active project if current one is removed
  React.useEffect(() => {
    if (!projects.find((p) => p.slug === mobileActiveProjectSlug) && projects.length > 0) {
      setMobileActiveProjectSlug(projects[0].slug)
    }
  }, [projects, mobileActiveProjectSlug])

  const filteredDimensions =
    activeDimensionFilter === 'all'
      ? COMPARISON_DIMENSIONS
      : COMPARISON_DIMENSIONS.filter((d) => d.id === activeDimensionFilter)

  return (
    <div className="space-y-6">
      {/* Dimension Filter Bar */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
            Filter by Dimension
          </span>
          <span className="text-xs text-neutral-400 hidden sm:inline">
            Showing {filteredDimensions.length} of {COMPARISON_DIMENSIONS.length} architectural dimensions
          </span>
        </div>
        <div
          role="tablist"
          aria-label="Architectural comparison dimensions"
          className="flex flex-wrap gap-1.5 p-1.5 rounded-lg bg-[#14171A] border border-[#262B32]"
        >
          <button
            role="tab"
            aria-selected={activeDimensionFilter === 'all'}
            onClick={() => onSelectDimensionFilter('all')}
            className={`text-xs px-2.5 py-1 rounded transition-colors ${
              activeDimensionFilter === 'all'
                ? 'bg-emerald-600 text-white font-medium shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-[#181C21]'
            }`}
          >
            All Dimensions (10)
          </button>
          {COMPARISON_DIMENSIONS.map((dim) => {
            const isSelected = activeDimensionFilter === dim.id
            return (
              <button
                key={dim.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => onSelectDimensionFilter(dim.id)}
                className={`text-xs px-2.5 py-1 rounded transition-colors ${
                  isSelected
                    ? 'bg-emerald-600 text-white font-medium shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-[#181C21]'
                }`}
              >
                {dim.shortLabel}
              </button>
            )
          })}
        </div>
      </div>

      {/* =====================================================================
          DESKTOP COMPARISON GRID (>= 1024px)
          ===================================================================== */}
      <div className="hidden lg:block">
        <div className="rounded-xl border border-[#262B32] overflow-hidden bg-[#101316]">
          {/* Column Header Sticky Row */}
          <div
            className={`grid border-b border-[#262B32] bg-[#14171A] divide-x divide-[#262B32] ${
              projects.length === 2 ? 'grid-cols-12' : 'grid-cols-12'
            }`}
          >
            {/* Dimension Column Header */}
            <div className="col-span-3 p-4 flex flex-col justify-end bg-[#14171A]/90">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                Architectural Dimensions
              </span>
              <p className="text-xs text-neutral-400 mt-1">
                Comparative analysis across deterministic rules, AI models, and engineering safeguards.
              </p>
            </div>

            {/* Selected Projects Header Cards */}
            {projects.map((proj) => {
              const colSpan = projects.length === 2 ? 'col-span-4' : 'col-span-3'
              return (
                <div key={proj.slug} className={`${colSpan} p-4 bg-[#14171A] flex flex-col justify-between`}>
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#181C21] border border-[#262B32] text-neutral-300">
                        {proj.category}
                      </span>
                      <Link
                        href={proj.caseStudyRoute}
                        className="text-xs text-emerald-400 hover:underline font-mono"
                        title={`Open ${proj.name} case study`}
                      >
                        Case Study →
                      </Link>
                    </div>
                    <h3 className="text-base font-serif font-bold text-neutral-100 mt-2">
                      {proj.name}
                    </h3>
                    <p className="text-xs text-neutral-300 line-clamp-2 mt-1 leading-relaxed">
                      {proj.tagline}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#262B32]/60 flex items-center gap-3 text-[11px] font-mono text-neutral-400">
                    <Link
                      href={proj.architectureRoute}
                      className="hover:text-emerald-300 transition-colors"
                      title="Inspect in Interactive Architecture Explorer"
                    >
                      Architecture
                    </Link>
                    <span>•</span>
                    <Link
                      href={proj.verificationRoute}
                      className="hover:text-emerald-300 transition-colors"
                      title="Inspect evidence in Verification Dashboard"
                    >
                      Evidence
                    </Link>
                    <span>•</span>
                    <Link
                      href={proj.decisionRecordsRoute}
                      className="hover:text-emerald-300 transition-colors"
                      title="View Architecture Decision Records (ADRs)"
                    >
                      ADRs
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Matrix Dimension Rows */}
          <div className="divide-y divide-[#262B32]">
            {filteredDimensions.map((dim, idx) => (
              <div
                key={dim.id}
                id={`dim-${dim.id}`}
                className={`grid divide-x divide-[#262B32] transition-colors ${
                  idx % 2 === 0 ? 'bg-[#101316]' : 'bg-[#14171A]/40'
                }`}
              >
                {/* Left: Dimension Descriptor */}
                <div className="col-span-3 p-5 flex flex-col justify-start">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500/80 shrink-0" />
                    <h4 className="text-sm font-semibold text-neutral-100">{dim.label}</h4>
                  </div>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed">{dim.description}</p>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-mono text-neutral-400 bg-[#181C21] px-2 py-1 rounded border border-[#262B32]/60 w-fit">
                    <span className="text-emerald-400 font-bold">Focus:</span> {dim.focusArea}
                  </div>
                </div>

                {/* Right: Project Dimension Details */}
                {projects.map((proj) => {
                  const colSpan = projects.length === 2 ? 'col-span-4' : 'col-span-3'
                  const detail = proj.dimensions[dim.id]

                  if (!detail) {
                    return (
                      <div key={proj.slug} className={`${colSpan} p-5 text-xs text-neutral-500 italic`}>
                        Dimension data unavailable
                      </div>
                    )
                  }

                  return (
                    <div key={proj.slug} className={`${colSpan} p-5 flex flex-col justify-between space-y-4`}>
                      <div>
                        <h5 className="text-xs font-semibold text-emerald-300 uppercase tracking-wide font-mono">
                          {detail.title}
                        </h5>
                        <p className="text-xs text-neutral-300 mt-1.5 leading-relaxed">
                          {detail.summary}
                        </p>

                        {/* Key Mechanisms List */}
                        {detail.keyMechanisms && detail.keyMechanisms.length > 0 && (
                          <ul className="mt-3 space-y-1.5 text-xs text-neutral-300">
                            {detail.keyMechanisms.map((mech, mIdx) => (
                              <li key={mIdx} className="flex items-start gap-1.5">
                                <span className="text-emerald-400 text-[10px] mt-0.5 shrink-0">▸</span>
                                <span className="leading-snug">{mech}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Qualification Note (if present) */}
                        {detail.qualificationNote && (
                          <div className="mt-3 p-2 rounded bg-amber-950/30 border border-amber-800/50 text-[11px] text-amber-200 leading-snug">
                            <span className="font-mono font-bold text-amber-400 uppercase text-[9px] block mb-0.5">
                              Qualification Standard
                            </span>
                            {detail.qualificationNote}
                          </div>
                        )}
                      </div>

                      {/* Evidence & Component Cross-References */}
                      <div className="pt-3 border-t border-[#262B32]/50 flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
                        {detail.evidenceIds?.map((eid) => (
                          <Link
                            key={eid}
                            href={`/verification#evid-${eid.toLowerCase()}`}
                            className="px-1.5 py-0.5 rounded bg-[#181C21] border border-[#262B32] text-neutral-300 hover:border-emerald-500 hover:text-emerald-300 transition-colors"
                            title="View in Verification Evidence Registry"
                          >
                            {eid}
                          </Link>
                        ))}
                        {detail.componentIds?.map((cid) => (
                          <Link
                            key={cid}
                            href={`/architecture?system=${proj.slug}`}
                            className="px-1.5 py-0.5 rounded bg-[#181C21] border border-[#262B32] text-neutral-300 hover:border-blue-500 hover:text-blue-300 transition-colors"
                            title="Inspect in Architecture Explorer"
                          >
                            {cid}
                          </Link>
                        ))}
                        {detail.decisionIds?.map((did) => (
                          <Link
                            key={did}
                            href={`/projects/${proj.slug}#decisions`}
                            className="px-1.5 py-0.5 rounded bg-[#181C21] border border-[#262B32] text-neutral-300 hover:border-purple-500 hover:text-purple-300 transition-colors"
                            title="View Architecture Decision Record"
                          >
                            {did}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================================
          MOBILE & TABLET RESPONSIVE COMPARISON (< 1024px)
          ===================================================================== */}
      <div className="lg:hidden space-y-6">
        {/* Project Switcher Tabs for Mobile View */}
        <div className="p-3 rounded-lg bg-[#14171A] border border-[#262B32] flex items-center justify-between gap-2">
          <span className="text-xs font-mono text-neutral-400">Viewing Project:</span>
          <div className="flex gap-1.5 overflow-x-auto">
            {projects.map((proj) => {
              const isActive = proj.slug === mobileActiveProjectSlug
              return (
                <button
                  key={proj.slug}
                  onClick={() => setMobileActiveProjectSlug(proj.slug)}
                  className={`text-xs px-3 py-1.5 rounded transition-all shrink-0 ${
                    isActive
                      ? 'bg-emerald-600 text-white font-medium shadow-sm'
                      : 'bg-[#181C21] text-neutral-300 border border-[#262B32]'
                  }`}
                >
                  {proj.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Stacked Dimension Cards */}
        <div className="space-y-4">
          {filteredDimensions.map((dim) => {
            const activeProj = projects.find((p) => p.slug === mobileActiveProjectSlug) || projects[0]
            const detail = activeProj.dimensions[dim.id]

            return (
              <div
                key={dim.id}
                className="p-4 rounded-xl bg-[#14171A] border border-[#262B32] space-y-3"
              >
                <div className="flex items-start justify-between gap-2 pb-2 border-b border-[#262B32]/70">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block">
                      Dimension
                    </span>
                    <h4 className="text-sm font-bold text-neutral-100">{dim.label}</h4>
                  </div>
                  <span className="text-xs font-mono text-neutral-400 px-2 py-0.5 rounded bg-[#181C21] border border-[#262B32]">
                    {activeProj.name}
                  </span>
                </div>

                <p className="text-xs text-neutral-400">{dim.description}</p>

                {detail ? (
                  <div className="space-y-3 pt-2">
                    <h5 className="text-xs font-semibold text-emerald-300 uppercase tracking-wide font-mono">
                      {detail.title}
                    </h5>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {detail.summary}
                    </p>

                    {detail.keyMechanisms && (
                      <ul className="space-y-1.5 text-xs text-neutral-300">
                        {detail.keyMechanisms.map((mech, mIdx) => (
                          <li key={mIdx} className="flex items-start gap-1.5">
                            <span className="text-emerald-400 text-[10px] mt-0.5 shrink-0">▸</span>
                            <span className="leading-snug">{mech}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {detail.qualificationNote && (
                      <div className="p-2 rounded bg-amber-950/30 border border-amber-800/50 text-[11px] text-amber-200">
                        <span className="font-mono font-bold text-amber-400 uppercase text-[9px] block mb-0.5">
                          Qualification Note
                        </span>
                        {detail.qualificationNote}
                      </div>
                    )}

                    <div className="pt-2 border-t border-[#262B32]/60 flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
                      {detail.evidenceIds?.map((eid) => (
                        <Link
                          key={eid}
                          href={`/verification#evid-${eid.toLowerCase()}`}
                          className="px-1.5 py-0.5 rounded bg-[#181C21] border border-[#262B32] text-neutral-300"
                        >
                          {eid}
                        </Link>
                      ))}
                      {detail.componentIds?.map((cid) => (
                        <Link
                          key={cid}
                          href={`/architecture?system=${activeProj.slug}`}
                          className="px-1.5 py-0.5 rounded bg-[#181C21] border border-[#262B32] text-neutral-300"
                        >
                          {cid}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-neutral-500 italic">No dimension data available.</p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

