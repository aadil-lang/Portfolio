'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { CubeCapability } from '../../data/cubeCapabilities'
import { renderCubeMotif } from './CubeFace'

interface CubeInfoPanelProps {
  capability: CubeCapability
}

export function CubeInfoPanel({ capability }: CubeInfoPanelProps) {
  return (
    <div className="w-full max-w-[360px] sm:max-w-[540px] lg:max-w-[580px] min-h-[240px] rounded-xl border border-[#262B32] bg-[#14171A]/95 p-4 sm:p-4.5 flex flex-col justify-between shadow-xl transition-all">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-[#22272E] pb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#5A9A78] animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#78C29A] font-bold">
            {capability.code}
          </span>
        </div>
        <span className="text-[10px] font-mono text-[#9EA4AA]">
          {capability.faceName} Face
        </span>
      </div>

      {/* Main Capability Identity */}
      <div className="flex items-start gap-3 my-auto">
        <div className="p-2 rounded-lg border border-[#5A9A78]/40 bg-[#16231C] shrink-0 mt-0.5">
          {renderCubeMotif(capability.icon, 'w-5 h-5 text-[#78C29A]')}
        </div>
        <div className="space-y-1">
          <h4 className="font-serif font-bold text-sm sm:text-base text-[#F0EEE9] leading-snug">
            {capability.title}
          </h4>
          <p className="text-xs text-[#9EA4AA] leading-relaxed">
            {capability.summary}
          </p>
        </div>
      </div>

      {/* Supporting Case Studies Chips */}
      <div className="space-y-1.5 pt-1">
        <span className="text-[9px] font-mono uppercase tracking-wider text-[#71899A] block font-semibold">
          Supporting Systems
        </span>
        <div className="flex flex-wrap gap-1.5">
          {capability.supportingLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#181C21] hover:bg-[#20252C] text-[#C8C6BF] hover:text-white border border-[#2B3542] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#5A9A78]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="pt-2 border-t border-[#22272E]">
        <Link
          href={capability.primaryRoute}
          className="w-full inline-flex items-center justify-between px-3.5 py-2 rounded border border-[#5A9A78]/50 bg-[#15231C] hover:bg-[#1D3227] text-[#78C29A] hover:text-[#97DBB5] font-mono text-xs font-semibold transition-colors shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5A9A78]"
        >
          <span>{capability.primaryCtaLabel}</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}

