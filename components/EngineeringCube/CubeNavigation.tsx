'use client'

import React from 'react'
import { ChevronLeft, ChevronRight, RotateCcw, Play, Pause } from 'lucide-react'
import { CUBE_CAPABILITIES, CubeFaceIndex } from '../../data/cubeCapabilities'

interface CubeNavigationProps {
  activeFace: CubeFaceIndex
  onSelectFace: (face: CubeFaceIndex) => void
  onPrev: () => void
  onNext: () => void
  onReset: () => void
  isAutoRotating?: boolean
  onToggleAutoRotate?: () => void
}

export function CubeNavigation({
  activeFace,
  onSelectFace,
  onPrev,
  onNext,
  onReset,
  isAutoRotating,
  onToggleAutoRotate
}: CubeNavigationProps) {
  const activeCapability = CUBE_CAPABILITIES[activeFace]

  return (
    <nav
      aria-label="Engineering capability cube rotation controls"
      className="space-y-2.5 w-full max-w-[360px] sm:max-w-[540px] lg:max-w-[580px] mx-auto md:mx-0"
    >
      {/* Stepper + Face Selector Row */}
      <div className="flex items-center justify-between gap-1.5 px-3 py-2 rounded-xl bg-[#14171A] border border-[#262B32] shadow-sm">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Rotate cube to previous capability face"
          className="min-w-[34px] min-h-[34px] inline-flex items-center justify-center rounded-lg border border-[#2A2F36] bg-[#181C21] hover:bg-[#22272E] text-[#9EA4AA] hover:text-[#F0EEE9] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5A9A78]"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
        </button>

        {/* Six explicit face-selector buttons (>= 28x28px hit area) */}
        <div className="flex items-center gap-1.5" role="group" aria-label="Capability faces">
          {CUBE_CAPABILITIES.map((cap) => {
            const isSelected = cap.index === activeFace
            return (
              <button
                key={cap.id}
                type="button"
                onClick={() => onSelectFace(cap.index)}
                aria-pressed={isSelected}
                aria-label={`Rotate cube to face ${cap.index + 1} (${cap.faceName}): ${cap.title}`}
                title={`${cap.index + 1}. ${cap.shortLabel}`}
                className="min-w-[30px] min-h-[30px] inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5A9A78]"
              >
                <span
                  className={`block rounded-full transition-all ${
                    isSelected
                      ? 'w-6 h-2 bg-[#5A9A78] shadow-[0_0_8px_rgba(90,154,120,0.6)]'
                      : 'w-2 h-2 bg-[#3E4652] hover:bg-[#71899A]'
                  }`}
                />
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onNext}
            aria-label="Rotate cube to next capability face"
            className="min-w-[34px] min-h-[34px] inline-flex items-center justify-center rounded-lg border border-[#2A2F36] bg-[#181C21] hover:bg-[#22272E] text-[#9EA4AA] hover:text-[#F0EEE9] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5A9A78]"
          >
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>

          {activeFace !== 0 && (
            <button
              type="button"
              onClick={onReset}
              aria-label="Reset cube to front face"
              title="Reset to Front"
              className="min-w-[34px] min-h-[34px] inline-flex items-center justify-center rounded-lg border border-[#2A2F36] bg-[#181C21] hover:bg-[#22272E] text-[#9EA4AA] hover:text-[#F0EEE9] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5A9A78]"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          )}

          {onToggleAutoRotate && (
            <button
              type="button"
              onClick={onToggleAutoRotate}
              aria-label={isAutoRotating ? 'Pause auto-rotation' : 'Resume auto-rotation'}
              title={isAutoRotating ? 'Pause auto-rotation' : 'Resume auto-rotation (2s)'}
              className={`min-w-[34px] min-h-[34px] inline-flex items-center justify-center rounded-lg border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5A9A78] ${
                isAutoRotating
                  ? 'border-[#5A9A78]/50 bg-[#16231C] text-[#78C29A] hover:bg-[#1D3227]'
                  : 'border-[#2A2F36] bg-[#181C21] text-[#9EA4AA] hover:text-[#F0EEE9] hover:bg-[#22272E]'
              }`}
            >
              {isAutoRotating ? (
                <Pause className="w-3.5 h-3.5" aria-hidden="true" />
              ) : (
                <Play className="w-3.5 h-3.5" aria-hidden="true" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Active Face Status & Keyboard Hint */}
      <div className="flex items-center justify-between text-[11px] font-mono px-1 text-[#9EA4AA]">
        <span aria-live="polite" className="truncate">
          <span className="text-[#78C29A] font-semibold">
            {activeCapability.index + 1}/6
          </span>{' '}
          {activeCapability.title}
        </span>
        <span className="text-[#686E77] hidden sm:inline shrink-0">
          {isAutoRotating ? 'Auto-cycles 2s (Hover to pause)' : 'Paused (Click play or drag)'}
        </span>
      </div>
    </nav>
  )
}
