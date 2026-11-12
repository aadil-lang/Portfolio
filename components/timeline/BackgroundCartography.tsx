import React from 'react'

interface BackgroundCartographyProps {
  width: number
  height: number
}

export const BackgroundCartography: React.FC<BackgroundCartographyProps> = ({
  width = 2580,
  height = 520
}) => {
  return (
    <g className="cartography-background pointer-events-none select-none">
      {/* Dark Obsidian Base Canvas Fill */}
      <rect width={width} height={height} fill="#14171A" />

      {/* Grid Pattern */}
      <defs>
        <pattern
          id="transit-grid"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="#20242A"
            strokeWidth="0.75"
            strokeDasharray="2,2"
            opacity="0.3"
          />
        </pattern>
      </defs>
      <rect width={width} height={height} fill="url(#transit-grid)" />

      {/* ============================================================= */}
      {/* 4 TERRITORIAL MAP ZONES                                       */}
      {/* ============================================================= */}

      {/* ZONE 01: MATH & QUALITY FOUNDATIONS */}
      <g transform="translate(40, 30)">
        <rect
          width="480"
          height="460"
          fill="#16191D"
          stroke="#2A2F36"
          strokeWidth="1"
          rx="12"
          opacity="0.5"
        />
        <rect
          width="480"
          height="28"
          fill="#1E232A"
          rx="12"
          opacity="0.7"
        />
        <text
          x="16"
          y="18"
          fill="#71899A"
          fontSize="10"
          fontFamily="monospace"
          fontWeight="bold"
          letterSpacing="0.08em"
        >
          ZONE 01 // MATHEMATICAL & QUALITY FOUNDATIONS (2021 — 2023)
        </text>
      </g>

      {/* ZONE 02: WAYGROUND CONTENT SYSTEMS */}
      <g transform="translate(540, 30)">
        <rect
          width="480"
          height="460"
          fill="#16191D"
          stroke="#2A2F36"
          strokeWidth="1"
          rx="12"
          opacity="0.5"
        />
        <rect
          width="480"
          height="28"
          fill="#1E232A"
          rx="12"
          opacity="0.7"
        />
        <text
          x="16"
          y="18"
          fill="#71899A"
          fontSize="10"
          fontFamily="monospace"
          fontWeight="bold"
          letterSpacing="0.08em"
        >
          ZONE 02 // WAYGROUND CONTENT SYSTEMS (2024 — 2025)
        </text>
      </g>

      {/* ZONE 03: FORMAL AI/ML ENGINEERING */}
      <g transform="translate(1040, 30)">
        <rect
          width="800"
          height="460"
          fill="#16191D"
          stroke="#2A2F36"
          strokeWidth="1"
          rx="12"
          opacity="0.5"
        />
        <rect
          width="800"
          height="28"
          fill="#1E232A"
          rx="12"
          opacity="0.7"
        />
        <text
          x="16"
          y="18"
          fill="#71899A"
          fontSize="10"
          fontFamily="monospace"
          fontWeight="bold"
          letterSpacing="0.08em"
        >
          ZONE 03 // FORMAL AI/ML ENGINEERING (2026)
        </text>
      </g>

      {/* ZONE 04: INDEPENDENT SYSTEMS & HORIZON */}
      <g transform="translate(1860, 30)">
        <rect
          width="680"
          height="460"
          fill="#16191D"
          stroke="#2A2F36"
          strokeWidth="1"
          rx="12"
          opacity="0.5"
        />
        <rect
          width="680"
          height="28"
          fill="#1E232A"
          rx="12"
          opacity="0.7"
        />
        <text
          x="16"
          y="18"
          fill="#71899A"
          fontSize="10"
          fontFamily="monospace"
          fontWeight="bold"
          letterSpacing="0.08em"
        >
          ZONE 04 // STILL BUILDING &amp; EXPLORING (AUG 2026 — PRESENT)
        </text>
      </g>
    </g>
  )
}
