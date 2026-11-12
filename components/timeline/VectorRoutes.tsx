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

  // 4. Loom AI & OCR Evaluator Top Branch (x: 1780, y: 280 -> 1840, 180 -> 1920, 180 [Loom] -> 2040, 180 [OCR] -> 2100, 180 -> 2160, 280)
  const loomOcrBranchD = `M 1780,280 L 1840,180 L 1920,180 L 2040,180 L 2100,180 L 2160,280`

  // 5. Atlas AI & EDA CAD Bottom Branch (x: 1780, y: 280 -> 1840, 370 -> 1920, 370 [Atlas] -> 2040, 370 [EDA] -> 2100, 370 -> 2160, 280)
  const atlasEdaBranchD = `M 1780,280 L 1840,370 L 1920,370 L 2040,370 L 2100,370 L 2160,280`

  // 6. Solace AI Hackathon Top Branch (x: 2160, y: 280 -> 2210, 180 -> 2280, 180 [Solace] -> 2350, 180 -> 2400, 280)
  const solaceBranchD = `M 2160,280 L 2210,180 L 2280,180 L 2350,180 L 2400,280`

  // 7. Portfolio & Ask Aadil Bottom Branch (x: 2160, y: 280 -> 2210, 370 -> 2280, 370 [Ask Aadil] -> 2350, 370 -> 2400, 280)
  const portfolioBranchD = `M 2160,280 L 2210,370 L 2280,370 L 2350,370 L 2400,280`

  // 8. Continuing Frontier Line (x: 2400, y: 280 -> x: 2520, y: 280)
  const continuingPathD = `M 2400,280 L 2520,280`

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

      {/* Loom AI & OCR Evaluator Branch */}
      <path
        d={loomOcrBranchD}
        fill="none"
        stroke="#4E8765"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Atlas AI & EDA CAD Branch */}
      <path
        d={atlasEdaBranchD}
        fill="none"
        stroke="#4E8765"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Portfolio & Ask Aadil Branch */}
      <path
        d={portfolioBranchD}
        fill="none"
        stroke="#4E8765"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Solace AI Hackathon Branch */}
      <path
        d={solaceBranchD}
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
        x="2415"
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
