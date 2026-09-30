"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { chapters, prologue } from '../../data/chapters'
import { ArrowRight, CornerDownRight, Compass } from 'lucide-react'

interface TableOfContentsProps {
  onSelectChapter: (chapterId: string) => void
  onSelectEpilogue: () => void
  onCloseJournal: () => void
}

export default function TableOfContents({
  onSelectChapter,
  onSelectEpilogue,
  onCloseJournal
}: TableOfContentsProps) {
  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      {/* Index Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-4 border-b border-[#2A2F36] gap-4">
        <div>
          <span className="text-[10px] font-mono text-[#71899A] uppercase tracking-widest block">
            INDEX // TECHNICAL CHRONICLE
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F0EEE9] font-serif tracking-tight mt-1">
            Table of Contents
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCloseJournal}
            className="text-xs font-mono px-3 py-1.5 rounded border border-[#2A2F36] bg-[#16191D] hover:bg-[#1E2328] text-[#858A90] hover:text-[#F0EEE9] transition-colors"
          >
            [ Close Journal ]
          </button>
          <button
            type="button"
            onClick={() => onSelectChapter(chapters[0].id)}
            className="inline-flex items-center gap-2 text-xs font-mono px-3.5 py-1.5 rounded border border-[#3E454F] bg-[#22272D] hover:bg-[#2A3138] text-[#F0EEE9] transition-colors hover:border-[#536B7A]"
          >
            <span>Begin Reading (Ch. 01)</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#71899A]" />
          </button>
        </div>
      </div>

      {/* Prologue Entry */}
      <div className="py-4 border-b border-[#2A2F36]/80 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[#858A90] uppercase tracking-wider flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#536B7A]" />
            <span>{prologue.title}</span>
          </span>
          <span className="text-[#686E77]">{prologue.era}</span>
        </div>
        <p className="text-sm text-[#9EA4AA] leading-relaxed font-serif italic border-l-2 border-[#3E454F] pl-4 py-1">
          &ldquo;{prologue.quote}&rdquo;
        </p>
        <p className="text-xs text-[#686E77] leading-relaxed pt-1">
          {prologue.summary}
        </p>
      </div>

      {/* Structured Technical Chapter Index */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[10px] font-mono text-[#686E77] uppercase tracking-widest pb-2 border-b border-[#2A2F36]">
          <span>Chapter & Engineering Layer</span>
          <span>Timeline / Action</span>
        </div>

        <div className="divide-y divide-[#2A2F36]/60">
          {chapters.map((ch, idx) => (
            <motion.div
              key={ch.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              onClick={() => onSelectChapter(ch.id)}
              className="group py-4 px-2 hover:bg-[#1C2025] transition-colors duration-150 cursor-pointer flex flex-col md:flex-row md:items-baseline justify-between gap-3"
            >
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#F0EEE9]">
                    {ch.number}
                  </span>
                  <span className="text-[#3E454F] font-mono">/</span>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#71899A]">
                    {ch.layer}
                  </span>
                  {ch.ownershipLabel && (
                    <span className="text-[10px] font-mono tracking-wide px-1.5 py-0.2 rounded bg-[#131619] text-[#858A90] border border-[#252A30]">
                      {ch.ownershipLabel}
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#F0EEE9] group-hover:text-[#C2BFA8] font-serif transition-colors">
                  {ch.title}
                </h3>

                <p className="text-xs text-[#858A90] leading-relaxed line-clamp-1">
                  {ch.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-[#686E77] shrink-0 pt-1 md:pt-0">
                <span>{ch.timeline}</span>
                <span className="text-[#536B7A] group-hover:text-[#71899A] group-hover:translate-x-0.5 transition-all flex items-center gap-1 font-medium">
                  <span>Read Chapter</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          ))}

          {/* Epilogue Row */}
          <div
            onClick={onSelectEpilogue}
            className="group py-4 px-2 hover:bg-[#1C2025] transition-colors duration-150 cursor-pointer flex items-center justify-between gap-3"
          >
            <div className="space-y-0.5">
              <span className="text-xs font-mono text-[#71899A] uppercase tracking-wider">
                FINAL SYNTHESIS
              </span>
              <h3 className="text-base font-bold text-[#F0EEE9] group-hover:text-[#C2BFA8] font-serif">
                Epilogue: The Verified AI Engineering Discipline
              </h3>
            </div>
            <span className="text-xs font-mono text-[#536B7A] group-hover:text-[#71899A] flex items-center gap-1">
              <span>Read Epilogue</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
