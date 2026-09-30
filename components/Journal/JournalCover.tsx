"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Terminal, ArrowRight, CornerDownRight, Cpu } from 'lucide-react'
import { profile } from '../../data/profile'
import SpiralBinding, { PunchedHoleStrip } from './SpiralBinding'

interface JournalCoverProps {
  onOpen: () => void
}

/**
 * 3D multi-ply caliper board edge showing visible 5mm thickness
 */
export function ThickBoardEdge({ side = 'right' }: { side?: 'right' | 'left' }) {
  const isRight = side === 'right'
  return (
    <div
      className={`absolute ${isRight ? '-right-1.5' : '-left-1.5'} top-0 bottom-0 w-2 pointer-events-none ${
        isRight ? 'rounded-r' : 'rounded-l'
      }`}
      style={{
        background: isRight
          ? 'linear-gradient(to right, #1F242B 0%, #15181E 50%, #0E1013 100%)'
          : 'linear-gradient(to left, #1F242B 0%, #15181E 50%, #0E1013 100%)',
        boxShadow: isRight
          ? 'inset 1px 0 0 rgba(255,255,255,0.08), 2px 0 4px rgba(0,0,0,0.6)'
          : 'inset -1px 0 0 rgba(255,255,255,0.08), -2px 0 4px rgba(0,0,0,0.6)'
      }}
      aria-hidden="true"
    >
      {/* Micro-layered chipboard plies */}
      <div className="w-full h-full opacity-25 bg-[repeating-linear-gradient(to_bottom,#4B5563_0px,#4B5563_1px,transparent_1px,transparent_3px)]" />
    </div>
  )
}

/**
 * The exterior face of the heavy thick hardcover (Clean, no steel casing)
 */
export function ThickHardcoverFace({
  onOpen,
  isTurning = false
}: {
  onOpen?: () => void
  isTurning?: boolean
}) {
  return (
    <div
      className="relative w-full h-full rounded-xl overflow-visible text-[#E6E4DF] select-none p-6 sm:p-9 md:p-10 flex flex-col justify-between"
      style={{
        background: 'linear-gradient(145deg, #242930 0%, #1C2025 60%, #15181C 100%)',
        boxShadow:
          'inset 0 0 0 1px rgba(255, 255, 255, 0.08), inset 0 2px 4px rgba(255, 255, 255, 0.05), inset 0 -2px 6px rgba(0, 0, 0, 0.6)'
      }}
    >
      {/* Punched holes along inner binding margin */}
      <PunchedHoleStrip side="left" />

      {/* 3D Multi-Ply Board Thickness Facet on outer edge */}
      <ThickBoardEdge side="right" />

      {/* Subtle Archival Buckram Bookcloth Grid Weave */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] rounded-xl"
        style={{
          backgroundImage: `radial-gradient(#FFF 1px, transparent 1px)`,
          backgroundSize: '16px 16px'
        }}
        aria-hidden="true"
      />

      {/* Debossed Foil Border Inset */}
      <div className="absolute inset-2.5 sm:inset-3 rounded-lg border border-[#3A424D]/60 pointer-events-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]" />

      {/* Header Metadata */}
      <div className="relative pl-6 sm:pl-8 pr-3 flex items-center justify-between border-b border-[#2C333D] pb-3.5 z-10">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#71899A]">
          <Terminal className="w-3.5 h-3.5 text-[#536B7A]" />
          <span className="font-semibold">ENGINEERING LOGBOOK // CHRONICLE</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-[#858A90] px-2 py-0.5 rounded bg-[#13161A] border border-[#2B313A] shadow-inner">
            2021 — 2026
          </span>
          <span className="text-[#686E77] font-mono text-[9.5px] hidden sm:inline tracking-wider">
            + [SPEC-2026]
          </span>
        </div>
      </div>

      {/* Title Block & Primary Thesis */}
      <div className="relative pl-6 sm:pl-8 pr-3 space-y-2.5 pt-2 z-10">
        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#858A90]">
          <Cpu className="w-3 h-3 text-[#536B7A]" />
          <span>System Trajectory & Architectural Evolution</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F0EEE9] leading-tight font-serif drop-shadow-sm">
          THE ENGINEERING
          <span className="block text-[#C5C0AA] font-normal">
            EVOLUTION
          </span>
        </h2>

        <p className="text-xs sm:text-[13px] text-[#A2A8AF] leading-relaxed max-w-lg pt-0.5 font-serif italic">
          &ldquo;I build AI systems that reason, use tools, generate artifacts, and verify their own behavior.&rdquo;
        </p>
      </div>

      {/* Continuous Learning Continuum Vector */}
      <div className="relative pl-6 sm:pl-8 pr-3 z-10 py-1">
        <div className="p-3 rounded-lg bg-[#14171B]/95 border border-[#2B313A] space-y-1.5 shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]">
          <div className="text-[9.5px] uppercase font-mono tracking-wider text-[#71899A] font-semibold flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <CornerDownRight className="w-3 h-3 text-[#536B7A]" />
              <span>Continuous Learning Continuum</span>
            </span>
            <span className="text-[#858A90] text-[9px]">Curiosity · Building · Verification</span>
          </div>

          <div className="flex flex-wrap items-center gap-1 text-[10px] font-mono text-[#858A90]">
            <span className="text-[#F0EEE9] font-medium">CONTENT</span>
            <span className="text-[#4F6372]">→</span>
            <span>SME</span>
            <span className="text-[#4F6372]">→</span>
            <span>DESIGN</span>
            <span className="text-[#4F6372]">→</span>
            <span>TOOLING</span>
            <span className="text-[#4F6372]">→</span>
            <span>AI</span>
            <span className="text-[#4F6372]">→</span>
            <span>AGENTS</span>
            <span className="text-[#4F6372]">→</span>
            <span className="text-[#68B282] font-semibold">RELIABILITY</span>
            <span className="text-[#4F6372]">→</span>
            <span className="px-1.5 py-0.2 rounded bg-[#3D5A6E] text-[#F7F5EE] font-bold shadow-sm">?</span>
          </div>
        </div>
      </div>

      {/* Author & Action Button */}
      <div className="relative pl-6 sm:pl-8 pr-3 pt-3.5 border-t border-[#2C333D] flex flex-col sm:flex-row sm:items-center justify-between gap-3 z-10">
        <div>
          <div className="text-[9.5px] font-mono text-[#686E77] uppercase tracking-wider">
            Author / Systems Engineer
          </div>
          <div className="text-sm sm:text-base font-bold text-[#F0EEE9] font-serif">
            {profile.name}
          </div>
        </div>

        {!isTurning && onOpen && (
          <button
            type="button"
            id="open-journal-button"
            data-testid="open-journal-button"
            onClick={(e) => {
              e.stopPropagation()
              onOpen()
            }}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#272D35] hover:bg-[#323A44] border border-[#444D59] hover:border-[#5B7385] text-[#F0EEE9] font-mono text-xs tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer group"
          >
            <BookOpen className="w-4 h-4 text-[#71899A] group-hover:text-[#F0EEE9] transition-colors" />
            <span className="font-bold">OPEN JOURNAL</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#71899A] group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>
    </div>
  )
}

/**
 * The resting closed journal view on the desk
 */
export default function JournalCover({ onOpen }: JournalCoverProps) {
  return (
    <div className="w-full max-w-3xl mx-auto py-4 sm:py-8 px-3 sm:px-4 flex flex-col items-center justify-center">
      {/* 3D Physical Technical Journal Container with Heavy Volumetric Depth */}
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -3, scale: 1.006 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative group w-full max-w-xl cursor-pointer select-none"
        onClick={onOpen}
        style={{ perspective: 2400 }}
      >
        {/* Outer Heavy Slate / Graphite Hardcover Binder Desk Base - MATCHES OPEN SPREAD HEIGHT */}
        <div
          className="relative rounded-2xl p-2 sm:p-2.5 bg-[#21252A] border border-[#3A404A] overflow-visible h-[640px] sm:h-[680px] lg:h-[700px] flex flex-col"
          style={{
            boxShadow: `
              0 0 0 1px #3A424D,
              2px 2px 0 #282E36,
              3px 3px 0 #1E232A,
              4px 4px 0 #161A1F,
              5px 5px 0 #0E1012,
              0 30px 65px -10px rgba(0, 0, 0, 0.95),
              0 14px 28px -6px rgba(0, 0, 0, 0.8)
            `
          }}
        >
          {/* Left Bound Heavy Spiral Wire Binding */}
          <div className="absolute -left-3.5 sm:-left-4 top-2.5 bottom-2.5 z-30 w-12 pointer-events-none">
            <SpiralBinding currentSpreadIndex={0} className="w-full h-full" />
          </div>

          {/* Right Page-Block Edge (Thickness of bound sheets clamped inside) */}
          <div
            className="absolute -right-2.5 top-3.5 bottom-3.5 w-3 rounded-r pointer-events-none z-10"
            style={{
              background: 'linear-gradient(to right, #ECE7DC 0%, #DFD9CB 50%, #C9C2B1 100%)',
              boxShadow: 'inset 1px 0 0 rgba(0,0,0,0.15), 3px 0 6px rgba(0,0,0,0.5)'
            }}
          >
            {/* Horizontal micro-ribs of 32 stacked folio pages */}
            <div className="w-full h-full opacity-60 bg-[repeating-linear-gradient(to_bottom,#8E8775_0px,#8E8775_1px,transparent_1px,transparent_3px)]" />
          </div>

          {/* Main Thick Hardcover Body */}
          <ThickHardcoverFace onOpen={onOpen} />
        </div>
      </motion.div>

      {/* Accessible subtle hint */}
      <p className="text-[11px] text-[#686E77] mt-3.5 font-mono text-center tracking-wide">
        [ Press Enter or click cover to open logbook ]
      </p>
    </div>
  )
}
