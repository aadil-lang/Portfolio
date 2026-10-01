import React from 'react'
import Link from 'next/link'
import { JourneyNode } from '../../data/journeyMapData'
import { getProvenanceColor } from './CheckpointNodes'
import { Calendar, BookOpen, Terminal, X, ShieldCheck, Tag } from 'lucide-react'

interface MilestoneInspectorProps {
  node: JourneyNode | null
  onClose: () => void
}

export const MilestoneInspector: React.FC<MilestoneInspectorProps> = ({
  node,
  onClose
}) => {
  if (!node) return null

  const colors = getProvenanceColor(node.provenance)

  return (
    <aside
      className="fixed bottom-0 inset-x-0 sm:bottom-6 sm:right-6 sm:left-auto sm:max-w-md w-full bg-[#14171A] border-t sm:border border-[#2A2F36] sm:rounded-xl shadow-2xl p-5 z-40 space-y-4 animate-in slide-in-from-bottom duration-200"
      aria-label="Selected Station Details"
    >
      {/* Header Bar */}
      <div className="flex items-start justify-between gap-3 border-b border-[#20242A] pb-3">
        <div className="space-y-1">
          {/* Provenance Badge */}
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider border"
              style={{
                backgroundColor: colors.badgeBg,
                color: colors.badgeText,
                borderColor: colors.badgeBorder
              }}
            >
              Station {node.stationNumber} • {node.provenance}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#686E77]">
              {node.zoneName}
            </span>
          </div>

          <h3 className="text-lg font-serif font-bold text-[#F0EEE9] leading-tight">
            {node.title}
          </h3>

          {node.organization && (
            <p className="text-xs font-mono text-[#9EA4AA]">
              {node.organization} {node.role && <span className="text-[#536B7A]">• {node.role}</span>}
            </p>
          )}
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-[#9EA4AA] hover:text-[#F0EEE9] hover:bg-[#1A1D21] transition-colors"
          aria-label="Close Inspector"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Date */}
      <div className="flex items-center gap-2 text-xs font-mono text-[#9EA4AA]">
        <Calendar className="w-3.5 h-3.5 text-[#536B7A]" />
        <span>{node.date}</span>
      </div>

      {/* Provenance Details */}
      {node.provenanceDetails && (
        <div className="p-2.5 rounded bg-[#1A1D21] border border-[#2A2F36] text-xs font-mono text-[#9EA4AA] leading-relaxed flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-[#B88636] shrink-0 mt-0.5" />
          <span>{node.provenanceDetails}</span>
        </div>
      )}

      {/* Significance & Transition */}
      <div className="space-y-2">
        <p className="text-xs text-[#F0EEE9] font-sans leading-relaxed">
          {node.significance}
        </p>

        <div className="p-2.5 rounded bg-[#1A1D21] border-l-2 border-[#536B7A] text-xs font-serif italic text-[#9EA4AA] leading-relaxed">
          &ldquo;{node.transition}&rdquo;
        </div>
      </div>

      {/* Details List */}
      {node.details && node.details.length > 0 && (
        <ul className="space-y-1 text-xs font-mono text-[#9EA4AA] pt-1">
          {node.details.map((detail, idx) => (
            <li key={idx} className="flex items-start gap-1.5 leading-snug">
              <span className="text-[#536B7A] font-bold">›</span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Technologies */}
      {node.technologies && node.technologies.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#20242A]">
          {node.technologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-[#1A1D21] text-[#9EA4AA] border border-[#20242A]"
            >
              <Tag className="w-2.5 h-2.5 text-[#536B7A]" />
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="pt-3 border-t border-[#20242A] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <Link
          href={`/journal#${node.journalAnchor}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#536B7A] hover:bg-[#647F90] text-[#F0EEE9] font-semibold transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>EXPLORE JOURNAL IN-DEPTH →</span>
        </Link>

        {node.systemSlug && (
          <Link
            href={`/projects/${node.systemSlug}`}
            className="inline-flex items-center gap-1.5 text-[#9EA4AA] hover:text-[#F0EEE9] transition-colors"
          >
            <Terminal className="w-3.5 h-3.5 text-[#4E8765]" />
            <span>System Archive →</span>
          </Link>
        )}
      </div>
    </aside>
  )
}
