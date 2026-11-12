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
      className={`cube-face cube-face-glass rounded-lg p-3 sm:p-4 flex flex-col justify-between items-center text-center select-none cursor-pointer transition-all duration-300 ${
        isActive ? 'cube-face-active' : 'opacity-85 hover:opacity-100 hover:border-[#5A9A78]/60'
      }`}
      style={{ transform: capability.faceTransform }}
      aria-hidden={!isActive}
    >
      {/* Metallic Corner Reticles */}
      <span className="cube-corner-tl" aria-hidden="true" />
      <span className="cube-corner-tr" aria-hidden="true" />
      <span className="cube-corner-bl" aria-hidden="true" />
      <span className="cube-corner-br" aria-hidden="true" />

      {/* Face Index Header */}
      <div className="w-full flex items-center justify-between text-[9px] font-mono tracking-widest uppercase text-[#78C29A] border-b border-[#5A9A78]/20 pb-1">
        <span>{capability.code.split(' // ')[0]}</span>
        <span className="text-[#9EA4AA]/70">{capability.faceName}</span>
      </div>

      {/* Central Holographic Motif */}
      <div className="my-auto flex flex-col items-center justify-center space-y-2">
        <div className={`p-2.5 rounded-lg border transition-all ${
          isActive
            ? 'border-[#5A9A78] bg-[#18261F]/80 shadow-[0_0_15px_rgba(90,154,120,0.4)]'
            : 'border-[#2A2F36] bg-[#14171A]/80'
        }`}>
          {renderCubeMotif(
            capability.icon,
            isActive ? 'w-8 h-8 sm:w-10 sm:h-10 text-[#78C29A]' : 'w-7 h-7 sm:w-8 sm:h-8 text-[#5A9A78]'
          )}
        </div>

        <div className="space-y-0.5 max-w-[170px]">
          <h3 className="font-serif font-bold text-xs sm:text-sm text-[#F0EEE9] leading-tight drop-shadow-xs">
            {capability.shortLabel}
          </h3>
          <p className="text-[10px] font-mono text-[#78C29A] uppercase tracking-wider">
            {capability.code.split(' // ')[1]}
          </p>
        </div>
      </div>

      {/* Bottom Technical Grid Indicator */}
      <div className="w-full flex items-center justify-center gap-1 text-[8px] font-mono text-[#9EA4AA]/60 border-t border-[#5A9A78]/15 pt-1">
        <span className="w-1.5 h-1.5 rounded-full bg-[#5A9A78]/80 animate-pulse" />
        <span>CYBERNETIC CORE</span>
      </div>
    </div>
  )
}
