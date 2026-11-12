"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { projectVerificationSummaries } from '../../data/verification/projectVerification'
import { ExternalLink, ChevronDown, ChevronUp, ShieldCheck, AlertCircle } from 'lucide-react'

interface SystemVerificationMatrixProps {
  onSelectProject?: (slug: string) => void
}

export default function SystemVerificationMatrix({ onSelectProject }: SystemVerificationMatrixProps) {
  const [expandedLimitations, setExpandedLimitations] = useState<Record<string, boolean>>({})

  const toggleLimitation = (slug: string) => {
    setExpandedLimitations((prev) => ({ ...prev, [slug]: !prev[slug] }))
  }

  return (
    <section aria-labelledby="matrix-heading" className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#262B32] pb-3">
        <div>
          <h2 id="matrix-heading" className="text-xl font-serif font-bold text-[#F0EEE9] tracking-tight">
            System Verification Matrix
          </h2>
          <p className="text-xs text-[#9CA3AF] mt-0.5">
            Project-by-project verification coverage, testing modalities, and audited outcomes across 15 portfolio systems.
          </p>
        </div>
        <span className="font-mono text-xs text-[#6B7280]">
          {projectVerificationSummaries.length} SYSTEMS AUDITED
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-[#262B32] bg-[#14171A]">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#262B32] bg-[#161A1F] text-[#9CA3AF] font-mono text-[11px] uppercase tracking-wider">
              <th className="py-3 px-4">System / Project</th>
              <th className="py-3 px-4">Modality</th>
              <th className="py-3 px-3 text-center">In-Repo</th>
              <th className="py-3 px-3 text-center">Upstream</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Audited Outcome</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#22272E]">
            {projectVerificationSummaries.map((project) => {
              const isExpanded = Boolean(expandedLimitations[project.slug])
              return (
                <React.Fragment key={project.slug}>
                  <tr className="hover:bg-[#181C21] transition-colors group">
                    <td className="py-3.5 px-4 font-medium text-[#E5E7EB]">
                      <div className="flex items-center gap-2">
                        <Link
                          href={project.caseStudyRoute}
                          className="hover:text-[#5A9A78] hover:underline transition-colors flex items-center gap-1 font-semibold"
                        >
                          <span>{project.name}</span>
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#9CA3AF]" />
                        </Link>
                      </div>
                      <div className="text-[10px] font-mono text-[#6B7280] mt-0.5">
                        {project.evidenceIds.length} Evidence Records
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px] text-[#9CA3AF]">
                      <span className="px-2 py-0.5 rounded bg-[#1C2128] border border-[#2D333B]">
                        {project.primaryModality}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-center font-mono">
                      {project.inRepoAssertions > 0 ? (
                        <span className="px-1.5 py-0.5 rounded bg-[#16231C] text-[#78C29A] font-bold">
                          {project.inRepoAssertions}
                        </span>
                      ) : (
                        <span className="text-[#4B5563]">—</span>
                      )}
                    </td>

                    <td className="py-3.5 px-3 text-center font-mono">
                      {project.upstreamTests > 0 ? (
                        <span className="px-1.5 py-0.5 rounded bg-[#16202D] text-[#58A6FF] font-bold">
                          {project.upstreamTests}
                        </span>
                      ) : (
                        <span className="text-[#4B5563]">—</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {project.status === 'VERIFIED' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px] font-semibold bg-[#16231C] border border-[#5A9A78]/30 text-[#78C29A]">
                          <ShieldCheck className="w-3 h-3 text-[#5A9A78]" />
                          VERIFIED
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px] font-semibold bg-[#261E14] border border-[#D99B26]/30 text-[#F0B84D]">
                          <AlertCircle className="w-3 h-3 text-[#D99B26]" />
                          QUALIFIED
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-[#C9D1D9] text-xs max-w-md leading-snug">
                      {project.keyOutcome}
                    </td>

                    <td className="py-3.5 px-3 text-right font-mono">
                      <div className="flex items-center justify-end gap-1.5">
                        {onSelectProject && (
                          <button
                            type="button"
                            onClick={() => onSelectProject(project.slug)}
                            className="px-2 py-1 rounded bg-[#1C2128] hover:bg-[#252B34] text-[#9EA4AA] hover:text-[#F0EEE9] text-[10px] transition-colors"
                            title="Filter Evidence Explorer by this project"
                          >
                            Filter
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => toggleLimitation(project.slug)}
                          className="p-1 rounded text-[#858A90] hover:text-[#F0EEE9] hover:bg-[#1E232A] transition-colors"
                          aria-label={`Toggle limitations for ${project.name}`}
                          title="View documented limitations"
                        >
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Expandable Limitations Row */}
                  {isExpanded && (
                    <tr className="bg-[#181C21]/80 border-b border-[#262B32]">
                      <td colSpan={7} className="py-3 px-6 text-xs text-[#9CA3AF] bg-[#121518]">
                        <div className="flex items-start gap-2.5">
                          <AlertCircle className="w-4 h-4 text-[#D99B26] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-mono text-[#D99B26] font-bold text-[11px] uppercase mr-2">
                              Documented Boundary & Limitations:
                            </span>
                            <span className="text-[#D8D6D0] leading-relaxed">{project.limitations}</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

