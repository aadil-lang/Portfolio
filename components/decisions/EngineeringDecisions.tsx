'use client'

import React, { useState } from 'react'
import { DecisionRecord } from '@/data/decisions/types'
import {
  Scale,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  FileCode,
  Layers,
  ArrowRight,
  RefreshCw,
  Sliders
} from 'lucide-react'

interface EngineeringDecisionsProps {
  decisions?: DecisionRecord[]
  projectTitle?: string
}

export default function EngineeringDecisions({
  decisions = [],
  projectTitle
}: EngineeringDecisionsProps) {
  // Store expanded state per decision id. Default the first decision open for instant value.
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>(() => {
    if (decisions.length > 0) {
      return { [decisions[0].id]: true }
    }
    return {}
  })

  if (!decisions || decisions.length === 0) {
    return null
  }

  const toggleDecision = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {}
    decisions.forEach((d) => {
      allExpanded[d.id] = true
    })
    setExpandedIds(allExpanded)
  }

  const collapseAll = () => {
    setExpandedIds({})
  }

  return (
    <section
      id="decisions"
      className="space-y-6 scroll-mt-28"
      aria-labelledby="decisions-heading"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#242930]">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#18261F] border border-[#234030] text-[#5A9A78]">
            <Scale className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h2
              id="decisions-heading"
              className="text-xl sm:text-2xl font-bold text-[#F0EEE9] font-serif"
            >
              Engineering Decisions & Trade-offs
            </h2>
            <p className="text-xs font-mono text-[#858A90] pt-0.5">
              Evidence-Backed Architecture Decision Records (ADRs)
            </p>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto font-mono text-xs">
          <span className="text-[#686E77] hidden md:inline">
            {decisions.length} Curated {decisions.length === 1 ? 'Record' : 'Records'}
          </span>
          <button
            type="button"
            onClick={expandAll}
            className="px-2.5 py-1 rounded bg-[#16191D] hover:bg-[#20252C] text-[#9EA4AA] hover:text-[#F0EEE9] border border-[#262B32] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#5A9A78]"
          >
            Expand All
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="px-2.5 py-1 rounded bg-[#16191D] hover:bg-[#20252C] text-[#9EA4AA] hover:text-[#F0EEE9] border border-[#262B32] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#5A9A78]"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Decision Records Stack */}
      <div className="space-y-4">
        {decisions.map((decision, index) => {
          const isExpanded = !!expandedIds[decision.id]
          const contentId = `decision-body-${decision.id}`
          const buttonId = `decision-btn-${decision.id}`

          return (
            <article
              key={decision.id}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? 'border-[#333C47] bg-[#14171A] shadow-lg'
                  : 'border-[#262B32] bg-[#121518] hover:border-[#2F3640]'
              }`}
            >
              {/* Card Header / Summary Trigger */}
              <div className="p-5 sm:p-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* ADR ID Badge */}
                    <span className="px-2 py-0.5 rounded font-mono text-xs font-bold bg-[#18261F] text-[#5A9A78] border border-[#234030]">
                      {decision.id}
                    </span>

                    {/* Historical vs Retrospective Badge */}
                    <span
                      className={`px-2 py-0.5 rounded font-mono text-[11px] font-semibold uppercase tracking-wider border ${
                        decision.status === 'historically_documented'
                          ? 'bg-[#15231C] text-[#71B891] border-[#203D2C]'
                          : 'bg-[#221C16] text-[#E0A068] border-[#422C1C]'
                      }`}
                    >
                      {decision.status === 'historically_documented'
                        ? 'Historically Documented'
                        : 'Retrospective Analysis'}
                    </span>

                    {/* Category Badge */}
                    <span className="px-2 py-0.5 rounded font-mono text-[11px] bg-[#16191D] text-[#858A90] border border-[#262B32]">
                      {decision.category}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-[#686E77]">
                    Record 0{index + 1} of 0{decisions.length}
                  </span>
                </div>

                {/* Decision Title */}
                <h3 className="text-lg sm:text-xl font-bold text-[#F0EEE9] font-serif leading-snug">
                  {decision.title}
                </h3>

                {/* Visible Summary */}
                <p className="text-sm text-[#C8C6BF] leading-relaxed">
                  {decision.summary}
                </p>

                {/* Toggle Expansion Button */}
                <div className="pt-2 flex justify-start">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={contentId}
                    onClick={() => toggleDecision(decision.id)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-[#5A9A78] hover:text-[#7BD1A2] bg-[#18261F]/60 hover:bg-[#18261F] border border-[#234030] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#5A9A78]"
                  >
                    {isExpanded ? (
                      <>
                        <span>Hide Full Analysis</span>
                        <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
                      </>
                    ) : (
                      <>
                        <span>View Context, Alternatives & Evidence</span>
                        <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Collapsible Deep Technical Detail */}
              {isExpanded && (
                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="px-5 sm:px-6 pb-6 pt-4 border-t border-[#242930] bg-[#101316]/60 space-y-6 text-sm"
                >
                  {/* Context & Constraints Grid */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Context & Operational Problem */}
                    <div className="p-4 rounded-lg bg-[#14171A] border border-[#242930] space-y-2">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#71899A] font-semibold">
                        <Layers className="w-3.5 h-3.5 text-[#71899A]" aria-hidden="true" />
                        <span>Problem & Context</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#C8C6BF] leading-relaxed">
                        {decision.context}
                      </p>
                    </div>

                    {/* Active Constraints */}
                    <div className="p-4 rounded-lg bg-[#14171A] border border-[#242930] space-y-2">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D48A63] font-semibold">
                        <Sliders className="w-3.5 h-3.5 text-[#D48A63]" aria-hidden="true" />
                        <span>Influencing Constraints</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-[#C8C6BF]">
                        {decision.constraints.map((c, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#D48A63] font-mono text-[10px] mt-0.5">•</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Chosen Approach */}
                  <div className="p-4 rounded-lg bg-[#121A16] border border-[#1E382A] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#5A9A78] font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#5A9A78]" aria-hidden="true" />
                        <span>Chosen Architecture</span>
                      </div>
                      {decision.chosenApproach.codeReference && (
                        <span className="text-[11px] font-mono text-[#71899A] hidden sm:inline">
                          Ref: {decision.chosenApproach.codeReference}
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-[#F0EEE9] text-sm">
                      {decision.chosenApproach.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#C8C6BF] leading-relaxed">
                      {decision.chosenApproach.details}
                    </p>
                    {decision.chosenApproach.codeReference && (
                      <div className="pt-1 text-[11px] font-mono text-[#5A9A78] sm:hidden flex items-center gap-1.5">
                        <FileCode className="w-3 h-3" aria-hidden="true" />
                        <span>{decision.chosenApproach.codeReference}</span>
                      </div>
                    )}
                  </div>

                  {/* Alternatives Considered & Trade-offs */}
                  {decision.alternatives && decision.alternatives.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#9EA4AA] font-semibold">
                        <Scale className="w-3.5 h-3.5 text-[#9EA4AA]" aria-hidden="true" />
                        <span>Alternatives Evaluated & Trade-offs</span>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        {decision.alternatives.map((alt, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-lg bg-[#14171A] border border-[#262B32] space-y-2"
                          >
                            <div className="flex items-center justify-between border-b border-[#20252C] pb-1.5">
                              <span className="font-semibold text-xs text-[#E6EDF3]">
                                {alt.name}
                              </span>
                              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#201915] text-[#D48A63] border border-[#3A261A]">
                                Rejected / Deferred
                              </span>
                            </div>
                            <p className="text-xs text-[#9EA4AA] leading-relaxed">
                              {alt.description}
                            </p>
                            <div className="pt-1 space-y-1 text-xs">
                              <p className="text-xs text-[#C8C6BF]">
                                <strong className="text-[#858A90] font-mono text-[11px]">Why Not: </strong>
                                {alt.whyRejectedOrDeferred}
                              </p>
                              {alt.disadvantagesIntroduced && (
                                <p className="text-xs text-[#D48A63]/90">
                                  <strong className="text-[#D48A63] font-mono text-[11px]">Cost of Chosen: </strong>
                                  {alt.disadvantagesIntroduced}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Consequences: Positive vs Limitations */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Positive Consequences */}
                    <div className="p-4 rounded-lg bg-[#14171A] border border-[#242930] space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#5A9A78] font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Benefits Gained</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-[#C8C6BF]">
                        {decision.consequences.positive.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#5A9A78] font-bold text-xs mt-0.5">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Accepted Limitations */}
                    <div className="p-4 rounded-lg bg-[#161311] border border-[#2B231D] space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#D48A63] font-semibold">
                        <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Accepted Limitations</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-[#C8C6BF]">
                        {decision.consequences.limitations.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#D48A63] font-bold text-xs mt-0.5">!</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Verification Evidence & Ground Truth */}
                  <div className="p-4 rounded-lg bg-[#14171A] border border-[#242930] space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#5A9A78] font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#5A9A78]" aria-hidden="true" />
                      <span>Empirical Verification & Source Ground Truth</span>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2">
                      {decision.verification.map((ev, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded bg-[#181C21] border border-[#262B32] space-y-1 text-xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-[#E6EDF3] text-xs">
                              {ev.label}
                            </span>
                            <span className="text-[10px] font-mono text-[#71899A] uppercase px-1.5 py-0.2 rounded bg-[#121518]">
                              {ev.type}
                            </span>
                          </div>
                          {ev.location && (
                            <div className="font-mono text-[11px] text-[#5A9A78] break-all">
                              {ev.location}
                            </div>
                          )}
                          {ev.measurement && (
                            <p className="text-[#C8C6BF] text-xs pt-0.5">
                              {ev.measurement}
                            </p>
                          )}
                          {ev.qualification && (
                            <p className="text-[11px] text-[#858A90] italic pt-0.5">
                              Note: {ev.qualification}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Future Considerations / Revisit Triggers */}
                  {decision.futureRevisitTriggers && decision.futureRevisitTriggers.length > 0 && (
                    <div className="flex items-start gap-2 text-xs text-[#858A90] pt-1">
                      <RefreshCw className="w-3.5 h-3.5 text-[#686E77] shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <span className="font-mono uppercase text-[11px] text-[#686E77] font-semibold block">
                          When to Revisit this Decision:
                        </span>
                        <ul className="list-disc list-inside space-y-0.5 pt-0.5">
                          {decision.futureRevisitTriggers.map((trig, idx) => (
                            <li key={idx}>{trig}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}

