'use client'

import React from 'react'
import { HeroNetworkCanvas } from './HeroNetworkCanvas'

export function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
    >
      {/* 1. Deep Ambient Radial Atmosphere */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#5A9A78]/10 blur-[130px] opacity-80" />
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-[#388BFD]/5 blur-[120px] opacity-60" />
      <div className="absolute -top-20 right-10 w-[350px] h-[350px] rounded-full bg-[#78C29A]/8 blur-[100px] opacity-70" />

      {/* 2. Topographic & Cartographic Drafting Linework (SVG Layer) */}
      <svg
        className="absolute inset-0 w-full h-full overflow-hidden opacity-[0.08]"
        xmlns="http://www.w3.org/2000/svg"
        overflow="hidden"
      >
        <defs>
          <pattern id="heroGridPattern" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#5A9A78" strokeWidth="0.5" />
            <circle cx="32" cy="32" r="0.75" fill="#78C29A" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#heroGridPattern)" />

        {/* Technical Contour Arcs behind Cube & Center */}
        <circle cx="75%" cy="45%" r="180" fill="none" stroke="#5A9A78" strokeWidth="0.8" strokeDasharray="3 6" />
        <circle cx="75%" cy="45%" r="280" fill="none" stroke="#5A9A78" strokeWidth="0.6" strokeDasharray="8 12" />
        <circle cx="75%" cy="45%" r="380" fill="none" stroke="#5A9A78" strokeWidth="0.4" />
        <line x1="75%" y1="0%" x2="75%" y2="100%" stroke="#5A9A78" strokeWidth="0.5" strokeDasharray="12 12" />
      </svg>

      {/* 3. Connected Signal Network & Particle Canvas */}
      <HeroNetworkCanvas />

      {/* 4. Bottom Fade Gradient into Subsequent Sections */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#121518] to-transparent pointer-events-none" />
    </div>
  )
}

