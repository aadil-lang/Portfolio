import React from 'react'
import Link from 'next/link'
import { experience } from '../../data/experience'
import { TimelineItem } from '../../types'
import {
  Calendar,
  Compass,
  ArrowRight,
  BookOpen,
  Terminal,
  HelpCircle,
  Briefcase,
  GitCommit,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react'

export const metadata = {
  title: 'Timeline // Chronological Spine | Mohemmed Aadil Khurshid',
  description:
    'A concise map of engineering evolution from mathematical content creation to governed AI systems engineering.'
}

function TimelineCard({
  item,
  isNested = false
}: {
  item: TimelineItem
  isNested?: boolean
}) {
  const isQuieter = item.isQuieter
  const isEnd = item.isEnd

  return (
    <article
      className={`rounded-xl border transition-all space-y-3.5 ${
        isNested
          ? 'p-4 sm:p-5 bg-[#14171A] border-[#262B32] hover:border-[#3D5A6E]'
          : isQuieter
          ? 'p-5 sm:p-6 bg-[#14171A]/60 border-[#262B32]'
          : item.isMilestone
          ? 'p-5 sm:p-6 bg-[#16191D] border-[#333A44] hover:border-[#536B7A] shadow-md'
          : isEnd
          ? 'p-5 sm:p-6 bg-[#191D22] border-[#3E4A56]'
          : 'p-5 sm:p-6 bg-[#16191D] border-[#2B3037] hover:border-[#3E454F]'
      }`}
    >
      {/* Header: Period & Layer Annotation */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#242930] pb-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            {item.causalChain && (
              <span className="px-1.5 py-0.5 rounded bg-[#18261F] text-[#5A9A78] text-[9.5px] font-mono font-bold uppercase border border-[#234030]">
                {item.causalChain}
              </span>
            )}
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#71899A] font-bold block">
              {item.layerAnnotation}
            </span>
          </div>

          <h2
            className={`font-bold text-[#F0EEE9] font-serif ${
              isNested ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
            }`}
          >
            {item.title}
          </h2>

          {item.organization && (
            <div className="text-xs font-mono text-[#858A90] flex items-center gap-1.5 flex-wrap">
              <span className="text-[#D8D6D0] font-semibold">{item.organization}</span>
              {item.role && (
                <>
                  <span className="text-[#444D58]">•</span>
                  <span>{item.role}</span>
                </>
              )}
            </div>
          )}
        </div>

        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#101215] border border-[#242930] text-xs font-mono text-[#A2A8AF] shrink-0 self-start sm:self-auto">
          <Calendar className="w-3 h-3 text-[#536B7A]" />
          <span>{item.period}</span>
        </span>
      </div>

      {/* Narrative Summary */}
      <p className="text-xs sm:text-sm text-[#C8C6BF] leading-relaxed font-sans">
        {item.summary}
      </p>

      {/* Capability Badge */}
      {item.capability && (
        <div className="flex items-center gap-2 text-xs font-mono text-[#D8D6D0] bg-[#101215] px-2.5 py-1 rounded border border-[#22262C] w-fit">
          <span className="text-[#71899A] font-bold text-[11px] uppercase tracking-wider">Capability:</span>
          <span className="font-semibold text-[#E6E4DE]">{item.capability}</span>
        </div>
      )}

      {/* Transition Callout */}
      {item.transition && (
        <div className="p-2.5 rounded bg-[#161B18] border-l-2 border-[#5A9A78] text-xs font-serif italic text-[#D0D8D3] leading-relaxed">
          &ldquo;{item.transition}&rdquo;
        </div>
      )}

      {/* Technical Details */}
      {item.details && item.details.length > 0 && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 text-xs font-mono text-[#858A90]">
          {item.details.map((detail, idx) => (
            <li key={idx} className="flex items-start gap-1.5">
              <span className="text-[#536B7A] font-bold shrink-0">›</span>
              <span className="leading-snug">{detail}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Technologies */}
      {item.technologies && item.technologies.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#22272E]">
          {item.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[10px] font-mono rounded bg-[#101215] text-[#858A90] border border-[#22272E]"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* Connection to Journal & Systems Layers */}
      <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono border-t border-[#22272E]">
        {item.journalChapterRef && (
          <Link
            href={`/journal?spread=${item.journalChapterRef}`}
            className="inline-flex items-center gap-1.5 text-[#71899A] hover:text-[#F0EEE9] transition-colors group/link"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#536B7A] group-hover/link:text-[#71899A]" />
            <span>Read in Journal (Ch. {String(item.journalChapterRef).padStart(2, '0')}) →</span>
          </Link>
        )}

        {item.systemSlugRef && (
          <Link
            href={`/projects/${item.systemSlugRef}`}
            className="inline-flex items-center gap-1.5 text-[#D8D6D0] hover:text-[#5A9A78] font-semibold transition-colors group/sys"
          >
            <Terminal className="w-3.5 h-3.5 text-[#5A9A78] group-hover/sys:text-[#78B896]" />
            <span>View System Archive →</span>
          </Link>
        )}
      </div>
    </article>
  )
}

export default function ExperiencePage() {
  const preWayground = experience.filter(
    (item) =>
      item.id === 'may-2021-oct-2021-graveiens' ||
      item.id === 'oct-2021-feb-2022-inhaltmart' ||
      item.id === 'jun-2022-jul-2022-digiplus' ||
      item.id === 'aug-2022-dec-2023-learning'
  )

  const waygroundMilestones = experience.filter(
    (item) => item.isWaygroundSubMilestone
  )

  const waygroundSystems = experience.filter(
    (item) =>
      item.id === '2026-ai-worksheets' ||
      item.id === '2026-curriculum-etl' ||
      item.id === '2026-math-item-bank'
  )

  const postWayground = experience.filter(
    (item) =>
      item.id === 'parallel-builds-loom-atlas' ||
      item.id === '2026-design-automation' ||
      item.id === '2026-ai-reliability' ||
      item.isEnd
  )

  return (
    <section className="max-w-4xl mx-auto space-y-12 pb-16">
      {/* Top Narrative Anchor */}
      <div className="space-y-5 border-b border-[#262B32] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#16191D] border border-[#2A2F36] text-[#858A90] text-xs font-mono">
          <Compass className="w-3.5 h-3.5 text-[#536B7A]" />
          <span>LAYER 1 // CHRONOLOGICAL SPINE</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F0EEE9] font-serif uppercase">
          Timeline & Evolution
        </h1>

        <p className="text-base text-[#A2A8AF] max-w-2xl leading-relaxed font-serif italic">
          &ldquo;What happened → what I learned → how that enabled the next chapter.&rdquo;
        </p>

        {/* Overall Career Progression Banner */}
        <div className="p-3.5 rounded-lg bg-[#14171A] border border-[#262B32] space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#71899A] block font-bold">
            The Overall Engineering Progression
          </span>
          <div className="text-[11px] sm:text-xs font-mono text-[#C8C6BF] flex flex-wrap items-center gap-1.5 leading-relaxed">
            <span className="text-[#F0EEE9]">Mathematical Content Creation</span>
            <span className="text-[#5A6066]">→</span>
            <span>Mathematical Representation</span>
            <span className="text-[#5A6066]">→</span>
            <span>Quality & Validation</span>
            <span className="text-[#5A6066]">→</span>
            <span>Content Systems</span>
            <span className="text-[#5A6066]">→</span>
            <span>Workflow Thinking</span>
            <span className="text-[#5A6066]">→</span>
            <span>AI-Assisted Workflows</span>
            <span className="text-[#5A6066]">→</span>
            <span>AI Evaluation</span>
            <span className="text-[#5A6066]">→</span>
            <span>AI Applications</span>
            <span className="text-[#5A6066]">→</span>
            <span>AI + Deterministic Systems</span>
            <span className="text-[#5A6066]">→</span>
            <span>Agentic Systems & Reliability</span>
            <span className="text-[#5A6066]">→</span>
            <span className="text-[#5A9A78] font-bold">AI Systems Engineering</span>
          </div>
        </div>
      </div>

      {/* Main Chronological Spine Container */}
      <div className="space-y-10 relative before:absolute before:inset-0 before:left-3 sm:before:left-5 before:w-0.5 before:bg-[#252A30] before:z-0">
        {/* ============================================================= */}
        {/* PHASE 1: EARLY CAREER FOUNDATIONS (2021 — 2023)               */}
        {/* ============================================================= */}
        <div className="space-y-6">
          <div className="relative z-10 pl-8 sm:pl-12 text-xs font-mono text-[#71899A] uppercase tracking-wider font-semibold">
            01 // MATHEMATICAL CONTENT & REPRESENTATION (2021 — 2023)
          </div>

          {preWayground.map((item) => (
            <div
              key={item.id}
              className={`relative z-10 pl-8 sm:pl-12 transition-all group ${
                item.isQuieter ? 'opacity-85' : 'opacity-100'
              }`}
            >
              <div
                className={`absolute left-1 sm:left-3 top-5 w-4 h-4 rounded-full border-2 -translate-x-1/2 flex items-center justify-center transition-all ${
                  item.isMilestone
                    ? 'bg-[#22272E] border-[#71899A] group-hover:border-[#E5E0D5] group-hover:scale-110'
                    : item.isQuieter
                    ? 'bg-[#14171A] border-[#363B43]'
                    : 'bg-[#181B1F] border-[#444D59]'
                }`}
              >
                {item.isMilestone ? (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#71899A] group-hover:bg-[#E5E0D5]" />
                ) : (
                  <div className="w-1 h-1 rounded-full bg-[#444D59]" />
                )}
              </div>

              <TimelineCard item={item} />
            </div>
          ))}
        </div>

        {/* ============================================================= */}
        {/* PHASE 2: WAYGROUND — ONE CONTINUOUS PROFESSIONAL CHAPTER      */}
        {/* January 2024 — July 2026                                      */}
        {/* ============================================================= */}
        <div className="relative z-10 pl-8 sm:pl-12 space-y-6">
          {/* Main Spine Major Anchor Node */}
          <div className="absolute left-1 sm:left-3 top-6 w-5 h-5 rounded-full border-2 border-[#5A9A78] bg-[#16231C] -translate-x-1/2 flex items-center justify-center shadow-md">
            <Briefcase className="w-2.5 h-2.5 text-[#5A9A78]" />
          </div>

          {/* Wayground Chapter Header Spine Card */}
          <div className="rounded-xl border-2 border-[#2E5F46]/50 bg-gradient-to-b from-[#131A16] to-[#101416] p-5 sm:p-7 space-y-5 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#23382D] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#5A9A78] animate-pulse" />
                <span className="text-xs uppercase font-mono tracking-widest text-[#5A9A78] font-bold">
                  ONE CONTINUOUS PROFESSIONAL CHAPTER
                </span>
              </div>
              <span className="text-xs font-mono text-[#D8D6D0] bg-[#1A261F] px-3 py-1 rounded border border-[#2E5F46]/50 font-semibold self-start sm:self-auto">
                January 2024 — July 2026
              </span>
            </div>

            <div className="space-y-1.5">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#F0EEE9] font-serif">
                Wayground (Quizizz)
              </h2>
              <p className="text-xs sm:text-sm text-[#A2A8AF] font-mono">
                From Mathematics Content to Deterministic AI Evaluation
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#C8C6BF] leading-relaxed font-sans">
              A continuous evolution inside one product environment: starting with KaTeX mathematical solutions, contributing domain testing and workflow feedback to VoyageMath Content Builder V1, expanding into mathematical visual production, experiencing scaling bottlenecks, using AI with human review, identifying generation failures, and engineering VM Copy with deterministic verification outside the model.
            </p>

            {/* Causal Sequence Track */}
            <div className="p-3 rounded-lg bg-[#0C110E] border border-[#203328] space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#5A9A78] font-bold block">
                The Wayground Sequence
              </span>
              <div className="text-[10.5px] sm:text-[11.5px] font-mono text-[#C8C6BF] flex flex-wrap items-center gap-1.5 leading-relaxed">
                <span>SME Entry + KaTeX</span>
                <span className="text-[#5A6066]">→</span>
                <span>VoyageMath V1</span>
                <span className="text-[#5A6066]">→</span>
                <span>Adoption</span>
                <span className="text-[#5A6066]">→</span>
                <span>Figma Visuals</span>
                <span className="text-[#5A6066]">→</span>
                <span>Expanded Visuals</span>
                <span className="text-[#5A6066]">→</span>
                <span>AI Workflow</span>
                <span className="text-[#5A6066]">→</span>
                <span>In-House Creation</span>
                <span className="text-[#5A6066]">→</span>
                <span className="text-[#5A9A78] font-bold">VM Copy (Evaluation)</span>
              </div>
            </div>

            {/* Nested Sub-Spine: Milestones 01 to 09 */}
            <div className="pt-4 space-y-5 border-t border-[#23382D]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#71899A]">
                <GitCommit className="w-3.5 h-3.5 text-[#5A9A78]" />
                <span className="uppercase tracking-wider font-semibold">
                  EVOLUTIONARY STAGES INSIDE WAYGROUND
                </span>
              </div>

              <div className="space-y-4 relative pl-5 sm:pl-7 before:absolute before:inset-0 before:left-2 sm:before:left-3 before:w-0.5 before:bg-[#2E5F46]/40">
                {waygroundMilestones.map((milestone) => (
                  <div key={milestone.id} className="relative group">
                    {/* Sub-node pill on nested spine */}
                    <div className="absolute -left-5 sm:-left-7 top-4 w-4 h-4 rounded-full border border-[#2E5F46] bg-[#16231C] flex items-center justify-center -translate-x-1/2 group-hover:border-[#5A9A78] group-hover:scale-110 transition-transform">
                      <span className="text-[8px] font-mono text-[#5A9A78] font-bold">
                        {milestone.milestoneNumber}
                      </span>
                    </div>

                    <TimelineCard item={milestone} isNested={true} />
                  </div>
                ))}
              </div>
            </div>

            {/* Advanced Wayground Systems (2026 AI/ML Team) */}
            {waygroundSystems.length > 0 && (
              <div className="pt-6 space-y-4 border-t border-[#23382D]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#71899A]">
                  <Terminal className="w-3.5 h-3.5 text-[#5A9A78]" />
                  <span className="uppercase tracking-wider font-semibold">
                    SUBSEQUENT WAYGROUND AI/ML ENGINEERING SYSTEMS (2026)
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {waygroundSystems.map((system) => (
                    <TimelineCard key={system.id} item={system} isNested={true} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ============================================================= */}
        {/* PHASE 3: AFTER WAYGROUND — INDEPENDENT SYSTEMS & HORIZON      */}
        {/* From Using AI → Building AI Systems (2025 — Present)          */}
        {/* ============================================================= */}
        <div className="space-y-6">
          <div className="relative z-10 pl-8 sm:pl-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#16191D] border border-[#3E4652] text-xs font-mono text-[#A2B4C2] font-semibold">
              <Sparkles className="w-3 h-3 text-[#58A6FF]" />
              <span>FROM USING AI → BUILDING AI SYSTEMS // INDEPENDENT AI BUILDS</span>
            </div>
          </div>

          {postWayground.map((item) => {
            const isEnd = item.isEnd

            return (
              <div
                key={item.id}
                className="relative z-10 pl-8 sm:pl-12 transition-all group"
              >
                <div
                  className={`absolute left-1 sm:left-3 top-5 w-4 h-4 rounded-full border-2 -translate-x-1/2 flex items-center justify-center transition-all ${
                    isEnd
                      ? 'bg-[#3D5A6E] border-[#536B7A] text-[#F7F5EE]'
                      : 'bg-[#22272E] border-[#71899A] group-hover:border-[#E5E0D5] group-hover:scale-110'
                  }`}
                >
                  {isEnd ? (
                    <HelpCircle className="w-2.5 h-2.5" />
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-[#71899A] group-hover:bg-[#E5E0D5]" />
                  )}
                </div>

                <TimelineCard item={item} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
