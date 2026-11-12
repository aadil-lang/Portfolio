'use client'

import React from 'react'
import Link from 'next/link'
import { ProjectComparisonProfile } from '@/data/comparison/types'

interface TradeOffDeepDiveProps {
  projects: ProjectComparisonProfile[]
}

export default function TradeOffDeepDive({ projects }: TradeOffDeepDiveProps) {
  return (
    <section aria-labelledby="tradeoffs-heading" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
              Deliberate Engineering Compromises
            </span>
          </div>
          <h2 id="tradeoffs-heading" className="text-lg font-serif font-bold text-neutral-100 mt-1">
            Architectural Trade-Off Deep Dive
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Real engineering requires conscious sacrifices: latency vs cost, determinism vs flexibility, and privacy vs model capacity.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.flatMap((proj) =>
          proj.tradeOffs.map((tradeOff, idx) => (
            <div
              key={`${proj.slug}-to-${idx}`}
              className="p-5 rounded-xl bg-[#14171A] border border-[#262B32] flex flex-col justify-between space-y-4 hover:border-neutral-500 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#181C21] border border-[#262B32] text-neutral-300">
                    {proj.name}
                  </span>
                  {tradeOff.evidenceId && (
                    <Link
                      href={`/verification#evid-${tradeOff.evidenceId.toLowerCase()}`}
                      className="text-[10px] font-mono text-emerald-400 hover:underline"
                    >
                      {tradeOff.evidenceId}
                    </Link>
                  )}
                </div>

                <h3 className="text-sm font-semibold text-neutral-100 leading-snug">
                  {tradeOff.title}
                </h3>

                <div className="mt-3 space-y-2.5 text-xs">
                  {/* Chosen Approach */}
                  <div className="p-2 rounded bg-emerald-950/20 border border-emerald-900/40">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block mb-0.5">
                      Chosen Approach
                    </span>
                    <p className="text-neutral-200 leading-relaxed">{tradeOff.chosenApproach}</p>
                  </div>

                  {/* Alternative Rejected */}
                  <div className="p-2 rounded bg-[#181C21] border border-[#262B32]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold block mb-0.5">
                      Alternative Rejected
                    </span>
                    <p className="text-neutral-300 leading-relaxed">{tradeOff.alternativeRejected}</p>
                  </div>

                  {/* Rationale & Accepted Compromise */}
                  <div className="pt-1 space-y-2">
                    <div>
                      <span className="text-[11px] font-semibold text-neutral-300 block">
                        Technical Rationale:
                      </span>
                      <p className="text-neutral-400 leading-relaxed text-[11px]">
                        {tradeOff.technicalRationale}
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] font-semibold text-amber-300 block">
                        Accepted Compromise:
                      </span>
                      <p className="text-amber-200/90 leading-relaxed text-[11px]">
                        {tradeOff.acceptedCompromise}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {tradeOff.decisionId && (
                <div className="pt-3 border-t border-[#262B32]/60 flex items-center justify-between text-[11px]">
                  <span className="text-neutral-500 font-mono text-[10px]">Decision Provenance:</span>
                  <Link
                    href={`/projects/${proj.slug}#decisions`}
                    className="text-purple-400 hover:underline font-mono text-xs flex items-center gap-1"
                  >
                    <span>{tradeOff.decisionId}</span>
                    <span>→</span>
                  </Link>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  )
}

