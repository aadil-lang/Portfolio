import React from 'react'
import { Info, Sparkles } from 'lucide-react'

interface ExecutiveSummaryProps {
  badgeLabel?: string
  title?: string
  summary: string
  supportingMessage?: string
  accentColor?: 'emerald' | 'blue' | 'purple'
  className?: string
}

export function ExecutiveSummary({
  badgeLabel = 'EXECUTIVE SUMMARY',
  title = 'Why this matters',
  summary,
  supportingMessage,
  accentColor = 'emerald',
  className = ''
}: ExecutiveSummaryProps) {
  const accentBorder =
    accentColor === 'blue'
      ? 'border-[#388BFD]/30'
      : accentColor === 'purple'
      ? 'border-[#A371F7]/30'
      : 'border-[#5A9A78]/35'

  const accentText =
    accentColor === 'blue'
      ? 'text-[#58A6FF]'
      : accentColor === 'purple'
      ? 'text-[#BC8CFF]'
      : 'text-[#78C29A]'

  const badgeBg =
    accentColor === 'blue'
      ? 'bg-[#141B24]'
      : accentColor === 'purple'
      ? 'bg-[#1D1728]'
      : 'bg-[#15231C]'

  return (
    <aside
      aria-label={`${title} executive summary`}
      className={`rounded-xl border ${accentBorder} bg-[#14171A]/95 p-4 sm:p-5 shadow-lg space-y-2.5 transition-all text-left ${className}`}
    >
      <div className="flex items-center gap-2">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest font-bold border ${accentBorder} ${badgeBg} ${accentText}`}>
          <Sparkles className="w-3 h-3" aria-hidden="true" />
          <span>{badgeLabel}</span>
        </span>
        <h2 className="text-xs sm:text-sm font-mono font-bold text-[#F0EEE9] tracking-tight">
          {title}
        </h2>
      </div>

      <p className="text-xs sm:text-sm text-[#C8C6BF] leading-relaxed">
        {summary}
      </p>

      {supportingMessage && (
        <p className="text-xs text-[#9EA4AA] leading-relaxed pt-0.5 border-t border-[#22272E]">
          {supportingMessage}
        </p>
      )}
    </aside>
  )
}

