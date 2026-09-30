"use client"
import React from 'react'

interface SpiralBindingProps {
  variant?: 'center' | 'center-back' | 'center-front' | 'edge'
  currentSpreadIndex?: number
  height?: number | string
  className?: string
}

interface Milestone {
  key: string
  label: string
  range: number[]
  ringIndex: number
}

const MILESTONES: Milestone[] = [
  { key: 'content', label: 'CONTENT', range: [1], ringIndex: 1 },
  { key: 'sme', label: 'SME', range: [1], ringIndex: 3 },
  { key: 'design', label: 'DESIGN', range: [1], ringIndex: 5 },
  { key: 'tooling', label: 'TOOLING', range: [1], ringIndex: 7 },
  { key: 'ai', label: 'AI', range: [3, 4], ringIndex: 9 },
  { key: 'agents', label: 'AGENTS', range: [5, 6, 7, 8, 9, 10], ringIndex: 11 },
  { key: 'reliability', label: 'RELIABILITY', range: [13, 14], ringIndex: 13 },
  { key: 'next', label: '?', range: [15], ringIndex: 15 }
]

export function PunchedHoleStrip({
  side,
  className = ''
}: {
  side: 'left' | 'right'
  className?: string
}) {
  const totalRings = 17
  const ringHeight = 36
  const startY = 24
  const svgHeight = startY * 2 + (totalRings - 1) * ringHeight

  return (
    <div
      className={`absolute top-0 bottom-0 pointer-events-none select-none z-10 ${
        side === 'left' ? 'left-2 sm:left-2.5' : 'right-2 sm:right-2.5'
      } ${className}`}
      style={{ width: '13px' }}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full overflow-visible"
        viewBox={`0 0 13 ${svgHeight}`}
        preserveAspectRatio="none"
      >
        <defs>
          <radialGradient id={`holeCavity-${side}`} cx="45%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#0B0D0F" />
            <stop offset="65%" stopColor="#14171A" />
            <stop offset="100%" stopColor="#252A30" />
          </radialGradient>
          <linearGradient id={`paperIndent-${side}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.4)" />
            <stop offset="50%" stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.45)" />
          </linearGradient>
          <linearGradient id={`innerWireRing-${side}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22272C" />
            <stop offset="35%" stopColor="#8A96A2" />
            <stop offset="60%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#2A3036" />
          </linearGradient>
        </defs>
        {Array.from({ length: totalRings }).map((_, i) => {
          const cy = startY + i * ringHeight
          return (
            <g key={i}>
              {/* Outer paper deboss bevel */}
              <rect
                x="1"
                y={cy - 6}
                width="11"
                height="12"
                rx="3.5"
                fill={`url(#paperIndent-${side})`}
              />
              {/* Deep hole aperture */}
              <rect
                x="1.5"
                y={cy - 5.5}
                width="10"
                height="11"
                rx="3"
                fill={`url(#holeCavity-${side})`}
                stroke="#0E1113"
                strokeWidth="0.8"
              />
              {/* Wire core passing physically through the hole aperture */}
              <path
                d={
                  side === 'right'
                    ? `M 0.5 ${cy} C 3.5 ${cy - 2}, 9.5 ${cy - 2}, 12.5 ${cy}`
                    : `M 0.5 ${cy} C 3.5 ${cy - 2}, 9.5 ${cy - 2}, 12.5 ${cy}`
                }
                fill="none"
                stroke={`url(#innerWireRing-${side})`}
                strokeWidth="2.4"
                strokeLinecap="round"
                opacity="0.95"
              />
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default function SpiralBinding({
  variant = 'edge',
  currentSpreadIndex = 0,
  className = ''
}: SpiralBindingProps) {
  // Total number of spiral twin rings
  const totalRings = 17
  const ringHeight = 36 // Vertical distance between rings
  const startY = 24
  const svgHeight = startY * 2 + (totalRings - 1) * ringHeight

  // Find active milestone
  const activeMilestone = MILESTONES.find(m => m.range.includes(currentSpreadIndex))

  const positionClass = className.includes('absolute') ? '' : 'relative'
  const isCenterMode = variant.startsWith('center')
  const svgWidth = isCenterMode ? 56 : 48

  const showGutter = variant === 'center' || variant === 'center-back'
  const showBackWires = variant === 'center' || variant === 'center-back'
  const showHolesOnBinding = variant === 'center'
  const showFrontWires = variant === 'center' || variant === 'center-front'

  return (
    <div
      className={`${positionClass} h-full flex flex-col items-center justify-between select-none shrink-0 pointer-events-none ${className}`}
      style={{ width: `${svgWidth}px` }}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full overflow-visible"
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        preserveAspectRatio="none"
      >
        <defs>
          {/* Wire Metallic Cylindrical Gradient (Front Loop) */}
          <linearGradient id="wireFrontGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2A3036" />
            <stop offset="25%" stopColor="#7E8A96" />
            <stop offset="45%" stopColor="#E6ECF2" />
            <stop offset="70%" stopColor="#8C98A4" />
            <stop offset="100%" stopColor="#1E2328" />
          </linearGradient>

          {/* Wire Back Loop (Deep shadow behind paper) */}
          <linearGradient id="wireBackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14171A" />
            <stop offset="60%" stopColor="#323840" />
            <stop offset="100%" stopColor="#181B1F" />
          </linearGradient>

          {/* Punched Hole Cavity Shadow */}
          <radialGradient id="holeCavity" cx="45%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#0B0D0F" />
            <stop offset="75%" stopColor="#15181B" />
            <stop offset="100%" stopColor="#252A30" />
          </radialGradient>

          {/* Hole Paper Indentation Bevel */}
          <linearGradient id="paperIndent" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.4)" />
            <stop offset="50%" stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
          </linearGradient>

          {/* Center Spine Gutter Cavity Shadow */}
          <linearGradient id="gutterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(16,19,22,0.9)" />
            <stop offset="50%" stopColor="rgba(8,10,12,0.98)" />
            <stop offset="100%" stopColor="rgba(16,19,22,0.9)" />
          </linearGradient>

          {/* Wire Cast Shadow on Paper */}
          <filter id="wireShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.6)" />
          </filter>

          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {isCenterMode ? (
          /* ========================================================================= */
          /* CENTER GUTTER BINDING: Bridges Left Page and Right Page */
          /* ========================================================================= */
          <>
            {/* Deep gutter groove background between the two pages */}
            {showGutter && (
              <>
                <rect
                  x="16"
                  y="0"
                  width="24"
                  height={svgHeight}
                  fill="url(#gutterGrad)"
                />
                <line
                  x1="28"
                  y1="4"
                  x2="28"
                  y2={svgHeight - 4}
                  stroke="#080A0C"
                  strokeWidth="1.5"
                  opacity="0.9"
                />
                <line
                  x1="18"
                  y1="8"
                  x2="18"
                  y2={svgHeight - 8}
                  stroke="#20252A"
                  strokeWidth="0.8"
                  opacity="0.6"
                />
                <line
                  x1="38"
                  y1="8"
                  x2="38"
                  y2={svgHeight - 8}
                  stroke="#20252A"
                  strokeWidth="0.8"
                  opacity="0.6"
                />
              </>
            )}

            {Array.from({ length: totalRings }).map((_, i) => {
              const cy = startY + i * ringHeight
              const milestone = MILESTONES.find(m => m.ringIndex === i)
              const isMilestoneActive = milestone && milestone.range.includes(currentSpreadIndex)

              return (
                <g key={i} className="center-spiral-ring-group">
                  {/* 1. BACK WIRE LOOP: loops behind paper sheets */}
                  {showBackWires && (
                    <path
                      d={`M 11 ${cy + 1} C 20 ${cy + 6}, 36 ${cy + 6}, 45 ${cy + 1}`}
                      fill="none"
                      stroke="url(#wireBackGrad)"
                      strokeWidth="3.4"
                      strokeLinecap="round"
                      opacity="0.9"
                    />
                  )}

                  {/* 2. PUNCHED HOLES (Only in full static center mode) */}
                  {showHolesOnBinding && (
                    <>
                      <rect
                        x="7"
                        y={cy - 5.5}
                        width="8"
                        height="11"
                        rx="2.5"
                        fill="url(#paperIndent)"
                      />
                      <rect
                        x="7.5"
                        y={cy - 5}
                        width="7"
                        height="10"
                        rx="2"
                        fill="url(#holeCavity)"
                        stroke="#0B0D0F"
                        strokeWidth="0.6"
                      />
                      <rect
                        x="41"
                        y={cy - 5.5}
                        width="8"
                        height="11"
                        rx="2.5"
                        fill="url(#paperIndent)"
                      />
                      <rect
                        x="41.5"
                        y={cy - 5}
                        width="7"
                        height="10"
                        rx="2"
                        fill="url(#holeCavity)"
                        stroke="#0B0D0F"
                        strokeWidth="0.6"
                      />
                    </>
                  )}

                  {/* 3. FRONT TWIN-LOOP WIRE (Upper wire of twin ring) */}
                  {showFrontWires && (
                    <>
                      <path
                        d={`M 11 ${cy - 2} C 20 ${cy - 8}, 36 ${cy - 8}, 45 ${cy - 2}`}
                        fill="none"
                        stroke="rgba(0,0,0,0.45)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        transform="translate(0, 2)"
                      />
                      <path
                        d={`M 11 ${cy - 2} C 20 ${cy - 8}, 36 ${cy - 8}, 45 ${cy - 2}`}
                        fill="none"
                        stroke="url(#wireFrontGrad)"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                      />
                      <path
                        d={`M 12 ${cy - 2.5} C 20 ${cy - 7.5}, 36 ${cy - 7.5}, 44 ${cy - 2.5}`}
                        fill="none"
                        stroke="rgba(255,255,255,0.75)"
                        strokeWidth="0.8"
                        strokeLinecap="round"
                        opacity="0.85"
                      />

                      {/* 4. FRONT TWIN-LOOP WIRE (Lower wire of twin ring) */}
                      <path
                        d={`M 11 ${cy + 2} C 20 ${cy - 3.5}, 36 ${cy - 3.5}, 45 ${cy + 2}`}
                        fill="none"
                        stroke="rgba(0,0,0,0.4)"
                        strokeWidth="3.6"
                        strokeLinecap="round"
                        transform="translate(0, 2)"
                      />
                      <path
                        d={`M 11 ${cy + 2} C 20 ${cy - 3.5}, 36 ${cy - 3.5}, 45 ${cy + 2}`}
                        fill="none"
                        stroke="url(#wireFrontGrad)"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                      />
                      <path
                        d={`M 12 ${cy + 1.5} C 20 ${cy - 3}, 36 ${cy - 3}, 44 ${cy + 1.5}`}
                        fill="none"
                        stroke="rgba(255,255,255,0.6)"
                        strokeWidth="0.7"
                        strokeLinecap="round"
                        opacity="0.8"
                      />

                      {/* 5. MILESTONE EMBOSSED BEAD ON WIRE (Centered) */}
                      {milestone && (
                        <g className="milestone-notch" transform={`translate(28, ${cy - 5.5})`}>
                          <circle
                            cx="0"
                            cy="0"
                            r={isMilestoneActive ? "3.5" : "2"}
                            fill={isMilestoneActive ? "#E2E8F0" : "#4A525A"}
                            stroke={isMilestoneActive ? "#3D5A6E" : "#212529"}
                            strokeWidth="1.5"
                            filter={isMilestoneActive ? "url(#softGlow)" : undefined}
                          />
                        </g>
                      )}
                    </>
                  )}
                </g>
              )
            })}
          </>
        ) : (
          /* ========================================================================= */
          /* EDGE BINDING: Loops around outer left spine edge (Closed Cover / Mobile)  */
          /* ========================================================================= */
          <>
            {/* Background Binding Strip */}
            <rect
              x="2"
              y="0"
              width="44"
              height={svgHeight}
              fill="#1C2025"
              opacity="0.95"
              rx="3"
            />

            {/* Paper Margin Punch Line */}
            <line
              x1="36"
              y1="10"
              x2="36"
              y2={svgHeight - 10}
              stroke="#15181B"
              strokeWidth="1"
              strokeDasharray="2 4"
              opacity="0.4"
            />

            {Array.from({ length: totalRings }).map((_, i) => {
              const cy = startY + i * ringHeight
              const milestone = MILESTONES.find(m => m.ringIndex === i)
              const isMilestoneActive = milestone && milestone.range.includes(currentSpreadIndex)

              return (
                <g key={i} className="edge-spiral-ring-group">
                  {/* 1. BACK WIRE LOOP */}
                  <path
                    d={`M 34 ${cy - 4} C 16 ${cy - 8}, 6 ${cy - 6}, 4 ${cy} C 2 ${cy + 6}, 12 ${cy + 8}, 34 ${cy + 4}`}
                    fill="none"
                    stroke="url(#wireBackGrad)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    opacity="0.85"
                  />

                  {/* 2. PUNCHED HOLE IN PAPER */}
                  <rect
                    x="28"
                    y={cy - 6}
                    width="14"
                    height="12"
                    rx="4"
                    fill="url(#paperIndent)"
                  />
                  <rect
                    x="29"
                    y={cy - 5.5}
                    width="12"
                    height="11"
                    rx="3.5"
                    fill="url(#holeCavity)"
                    stroke="#101215"
                    strokeWidth="0.8"
                  />

                  {/* 3. FRONT WIRE LOOP */}
                  <path
                    d={`M 34 ${cy - 3} C 12 ${cy - 7}, 4 ${cy - 4}, 3 ${cy + 1} C 2 ${cy + 6}, 10 ${cy + 9}, 34 ${cy + 5}`}
                    fill="none"
                    stroke="rgba(0,0,0,0.5)"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    transform="translate(1.5, 2)"
                    opacity="0.6"
                  />
                  <path
                    d={`M 34 ${cy - 3} C 12 ${cy - 7}, 4 ${cy - 4}, 3 ${cy + 1} C 2 ${cy + 6}, 10 ${cy + 9}, 34 ${cy + 5}`}
                    fill="none"
                    stroke="url(#wireFrontGrad)"
                    strokeWidth="3.6"
                    strokeLinecap="round"
                  />
                  <path
                    d={`M 32 ${cy - 2} C 14 ${cy - 5}, 6 ${cy - 2.5}, 5 ${cy + 1} C 4 ${cy + 4.5}, 12 ${cy + 7}, 32 ${cy + 4}`}
                    fill="none"
                    stroke="rgba(255,255,255,0.7)"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                    opacity="0.8"
                  />

                  {/* 4. OPTIONAL EMBOSSED MILESTONE NOTCH */}
                  {milestone && (
                    <g className="milestone-notch" transform={`translate(16, ${cy})`}>
                      <circle
                        cx="0"
                        cy="0"
                        r={isMilestoneActive ? "3.5" : "2"}
                        fill={isMilestoneActive ? "#E2E8F0" : "#4A525A"}
                        stroke={isMilestoneActive ? "#3D5A6E" : "#212529"}
                        strokeWidth="1.5"
                        filter={isMilestoneActive ? "url(#softGlow)" : undefined}
                      />
                    </g>
                  )}
                </g>
              )
            })}
          </>
        )}
      </svg>
    </div>
  )
}

