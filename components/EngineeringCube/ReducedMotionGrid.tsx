'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CUBE_CAPABILITIES } from '../../data/cubeCapabilities'
import { renderCubeMotif } from './CubeFace'

interface ReducedMotionGridProps {
  reasonLabel?: string
}

export function ReducedMotionGrid({ reasonLabel }: ReducedMotionGridProps) {
  return (
    <div className="space-y-3 w-full">
      <div className="flex items-center justify-between text-[11px] font-mono text-[#9EA4AA] px-1">
        <span className="text-[#78C29A] font-semibold uppercase tracking-wider">
          Capability Navigator (6 Domains)
        </span>
        {reasonLabel && <span className="text-[#9EA4AA]">{reasonLabel}</span>}
      </div>

      <nav
        aria-label="Engineering capability navigation"
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
      >
        {CUBE_CAPABILITIES.map((cap) => (
          <div
            key={cap.id}
            className="p-4 rounded-xl border border-[#2A2F36] bg-[#14171A] flex flex-col justify-between space-y-3 text-left"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#78C29A] font-semibold">
                  {cap.code}
                </span>
                {renderCubeMotif(cap.icon, 'w-4 h-4 text-[#78C29A]')}
              </div>

              <h3 className="font-serif font-bold text-sm text-[#F0EEE9] leading-snug">
                {cap.title}
              </h3>

              <p className="text-xs text-[#9EA4AA] leading-relaxed">
                {cap.summary}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {cap.supportingLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#181C21] hover:bg-[#222830] text-[#A2B4C2] hover:text-[#F0EEE9] border border-[#2B3542] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5A9A78]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href={cap.primaryRoute}
              className="inline-flex items-center justify-between px-3 py-2 rounded border border-[#5A9A78]/50 bg-[#15231C] hover:bg-[#1D3227] text-[#78C29A] hover:text-[#97DBB5] font-mono text-[11px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5A9A78]"
            >
              <span>{cap.primaryCtaLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        ))}
      </nav>
    </div>
  )
}

