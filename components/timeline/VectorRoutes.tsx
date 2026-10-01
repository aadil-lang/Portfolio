import React from 'react'
import { JOURNEY_NODES } from '../../data/journeyMapData'

export const VectorRoutes: React.FC = () => {
  // Main Transit Line Nodes (y = 280)
  const mainLineNodes = JOURNEY_NODES.filter(
    (n) => n.y === 280
  ).sort((a, b) => a.x - b.x)

  // Construct main transit line path
  const mainPathD = mainLineNodes.reduce((acc, node, idx) => {
    if (idx === 0) return `M ${node.x},${node.y}`
    return `${acc} L ${node.x},${node.y}`
  }, '')

  // Branch Paths
  // 1. Figma Visuals Branch (x: 720, y: 280 -> x: 800, y: 170)
  const figmaBranchD = `M 720,280 L 760,170 L 800,170`

  // 2. Curriculum Phase 1 Research Branch (x: 1340, y: 280 -> x: 1440, y: 180 -> x: 1660, y: 280)
  const researchBranchD = `M 1340,280 L 1380,180 L 1440,180 L 1580,180 L 1660,280`

  // 3. US Math Item Bank Team Branch (x: 1440, y: 280 -> x: 1540, y: 370 -> x: 1660, y: 280)
  const itemBankBranchD = `M 1440,280 L 1490,370 L 1540,370 L 1610,370 L 1660,280`

  // 4. Loom AI & Atlas AI Branch (x: 1780, y: 280 -> x: 1920, y: 180 -> x: 2120, y: 280)
  const loomBranchD = `M 1780,280 L 1840,180 L 1920,180 L 2020,180 L 2120,280`

  // 5. EDA CAD Branch (x: 1890, y: 280 -> x: 1980, y: 370 -> x: 2120, y: 280)
  const edaBranchD = `M 1890,280 L 1940,370 L 1980,370 L 2060,370 L 2120,280`

  // 6. Continuing Frontier Line (x: 2260, y: 280 -> x: 2380, y: 280)
  const continuingPathD = `M 2260,280 L 2380,280`

  return (
    <g className="vector-routes pointer-events-none">
      {/* Background Outer Tube Glow */}
      <path
        d={mainPathD}
        fill="none"
        stroke="#2A2F36"
        strokeWidth="8"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Primary Transit Main Line */}
      <path
        d={mainPathD}
        fill="none"
        stroke="#536B7A"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Figma Visuals Capability Branch */}
      <path
        d={figmaBranchD}
        fill="none"
        stroke="#71899A"
        strokeWidth="2.5"
        strokeDasharray="4,3"
        strokeLinecap="round"
      />

      {/* Curriculum Phase 1 Research Dashed Path */}
      <path
        d={researchBranchD}
        fill="none"
        stroke="#B88636"
        strokeWidth="2.5"
        strokeDasharray="5,4"
        strokeLinecap="round"
      />

      {/* US Item Bank Team Project Path */}
      <path
        d={itemBankBranchD}
        fill="none"
        stroke="#536B7A"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Loom / Atlas Branch */}
      <path
        d={loomBranchD}
        fill="none"
        stroke="#4E8765"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* EDA CAD Branch */}
      <path
        d={edaBranchD}
        fill="none"
        stroke="#4E8765"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Continuing Frontier Dashed Line */}
      <path
        d={continuingPathD}
        fill="none"
        stroke="#9EA4AA"
        strokeWidth="2.5"
        strokeDasharray="6,4"
        strokeLinecap="round"
      />

      <text
        x="2280"
        y="265"
        fill="#9EA4AA"
        fontSize="9.5"
        fontFamily="monospace"
        fontWeight="bold"
        letterSpacing="0.1em"
        opacity="0.7"
      >
        THE MAP CONTINUES →
      </text>
    </g>
  )
}
