'use client'

import React from 'react'
import {
  Binary,
  Code2,
  Cpu,
  Database,
  Layers,
  ShieldCheck,
  Terminal,
  Workflow
} from 'lucide-react'
import { CubeCapability, CubeIconKey } from '../../data/cubeCapabilities'

export function renderCubeMotif(icon: CubeIconKey, className = 'w-8 h-8 text-[#5A9A78]') {
  switch (icon) {
    case 'workflow':
      return <Workflow className={className} aria-hidden="true" />
    case 'database':
      return <Database className={className} aria-hidden="true" />
    case 'terminal':
      return <Code2 className={className} aria-hidden="true" />
    case 'shield':
      return <ShieldCheck className={className} aria-hidden="true" />
    case 'binary':
      return <Cpu className={className} aria-hidden="true" />
    case 'layers':
      return <Layers className={className} aria-hidden="true" />
  }
}

interface CubeFaceProps {
  capability: CubeCapability
  isActive: boolean
  onClickFace?: () => void
}

export function CubeFace({ capability, isActive, onClickFace }: CubeFaceProps) {
  return (
    <div
      onClick={onClickFace}
      className={`cube-face cube-face-glass rounded-xl p-3 sm:p-4 flex flex-col justify-between items-center text-center select-none cursor-pointer transition-all duration-300 ${
        isActive ? 'cube-face-active' : 'opacity-85 hover:opacity-100 hover:border-[#5A9A78]/60'
      }`}
      style={{ transform: capability.faceTransform }}
      aria-hidden={!isActive}
    >
      {/* Precision Metallic Corner Reticles */}
      <span className="cube-corner-tl" aria-hidden="true" />
      <span className="cube-corner-tr" aria-hidden="true" />
      <span className="cube-corner-bl" aria-hidden="true" />
      <span className="cube-corner-br" aria-hidden="true" />

      {/* Face Index Header & Studio Triad Dimension Tag */}
      <div className="w-full space-y-0.5 border-b border-[#5A9A78]/25 pb-1">
        <div className="w-full flex items-center justify-between text-[9px] font-mono tracking-widest uppercase text-[#78C29A]">
          <span className="font-bold">{capability.code.split(' // ')[0]}</span>
          <span className="text-[#9EA4AA]/70">{capability.faceName}</span>
        </div>
        <div className="text-[7.5px] font-mono uppercase tracking-widest text-[#78C29A]/75 text-center font-semibold">
          INTELLIGENCE × ENGINEERING × RELIABILITY
        </div>
      </div>

      {/* Central Holographic Motif with Metallic Surface Backdrop */}
      <div className="my-auto flex flex-col items-center justify-center space-y-2 py-1">
        <div
          className={`p-2.5 rounded-xl border transition-all ${
            isActive
              ? 'border-[#78C29A] bg-[#16251E] shadow-[0_0_20px_rgba(120,194,154,0.45)]'
              : 'border-[#2A313C] bg-[#13171C]/90'
          }`}
        >
          {renderCubeMotif(
            capability.icon,
            isActive ? 'w-8 h-8 sm:w-10 sm:h-10 text-[#78C29A]' : 'w-7 h-7 sm:w-8 sm:h-8 text-[#5A9A78]'
          )}
        </div>

        <div className="space-y-0.5 max-w-[170px]">
          <h3 className="font-serif font-bold text-xs sm:text-sm text-[#F0EEE9] leading-tight drop-shadow-xs">
            {capability.shortLabel}
          </h3>
          <p className="text-[10px] font-mono text-[#78C29A] uppercase tracking-wider font-semibold">
            {capability.code.split(' // ')[1]}
          </p>
        </div>
      </div>

      {/* Bottom Technical Grid Indicator with Coordinate Telemetry */}
      <div className="w-full flex items-center justify-between text-[8px] font-mono text-[#9EA4AA]/70 border-t border-[#5A9A78]/20 pt-1">
        <span className="text-[#5A6872]">AXIS // {capability.index}</span>
        <div className="flex items-center gap-1 text-[#78C29A]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#78C29A] animate-pulse" />
          <span className="font-semibold">STUDIO CORE</span>
        </div>
      </div>
    </div>
  )
}
