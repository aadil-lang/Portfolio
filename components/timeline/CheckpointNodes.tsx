import React from 'react'
import { JourneyNode, ProvenanceType } from '../../data/journeyMapData'

interface CheckpointNodesProps {
  nodes: JourneyNode[]
  selectedId: string | null
  onSelectNode: (node: JourneyNode) => void
}

export function getProvenanceColor(provenance: ProvenanceType): {
  stroke: string
  fill: string
  badgeBg: string
  badgeText: string
  badgeBorder: string
} {
  switch (provenance) {
    case 'INDEPENDENT BUILD':
      return {
        stroke: '#4E8765',
        fill: '#131F18',
        badgeBg: '#14241B',
        badgeText: '#6BB387',
        badgeBorder: '#234431'
      }
    case 'COLLABORATIVE TEAM PROJECT':
      return {
        stroke: '#536B7A',
        fill: '#151A1E',
        badgeBg: '#162026',
        badgeText: '#86A4B8',
        badgeBorder: '#2A3C47'
      }
    case 'SME / TESTER / VALIDATOR':
      return {
        stroke: '#B88636',
        fill: '#211C12',
        badgeBg: '#2B2213',
        badgeText: '#D6A656',
        badgeBorder: '#47361D'
      }
    case 'RESEARCH / EXPLORATION':
      return {
        stroke: '#A85858',
        fill: '#211313',
        badgeBg: '#2B1616',
        badgeText: '#C97777',
        badgeBorder: '#482424'
      }
    case 'CAPABILITY ROUTE':
      return {
        stroke: '#71899A',
        fill: '#15191C',
        badgeBg: '#192228',
        badgeText: '#A1B7C7',
        badgeBorder: '#2C3A45'
      }
    case 'EMPLOYMENT ROLE':
    default:
      return {
        stroke: '#3E4752',
        fill: '#16191D',
        badgeBg: '#1A1D22',
        badgeText: '#9EA4AA',
        badgeBorder: '#2D333C'
      }
  }
}

export const CheckpointNodes: React.FC<CheckpointNodesProps> = ({
  nodes,
  selectedId,
  onSelectNode
}) => {
  return (
    <g className="checkpoint-nodes">
      {nodes.map((node) => {
        const isSelected = selectedId === node.id
        const colors = getProvenanceColor(node.provenance)
        const isUpperNode = node.y < 250
        const isLowerNode = node.y > 320

        // Determine title offset Y to keep canvas uncluttered
        const titleY = isUpperNode ? -28 : isLowerNode ? 34 : (parseInt(node.stationNumber, 10) % 2 === 0 ? 34 : -28)
        const dateY = isUpperNode ? -42 : isLowerNode ? 48 : (parseInt(node.stationNumber, 10) % 2 === 0 ? 48 : -42)

        return (
          <g
            key={node.id}
            transform={`translate(${node.x}, ${node.y})`}
            className="cursor-pointer group select-none"
            onClick={() => onSelectNode(node)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelectNode(node)
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`Station ${node.stationNumber}: ${node.title}, ${node.date}. Role: ${node.provenance}`}
          >
            {/* Active Station Ping Effect */}
            {isSelected && (
              <circle
                r="24"
                fill="none"
                stroke={colors.stroke}
                strokeWidth="1.5"
                className="animate-ping opacity-40"
              />
            )}

            {/* Station Outer Ring */}
            <circle
              r={isSelected ? '18' : '15'}
              fill={colors.fill}
              stroke={isSelected ? '#F0EEE9' : colors.stroke}
              strokeWidth={isSelected ? '2.5' : '2'}
              className="transition-all duration-200 group-hover:scale-110"
            />

            {/* Station Number Badge Text inside Ring */}
            <text
              y="3.5"
              textAnchor="middle"
              fill={isSelected ? '#F0EEE9' : colors.badgeText}
              fontSize="9"
              fontFamily="monospace"
              fontWeight="bold"
            >
              {node.stationNumber}
            </text>

            {/* Title Text */}
            <text
              y={titleY}
              textAnchor="middle"
              fill={isSelected ? '#F0EEE9' : '#D8D6D0'}
              fontSize="10"
              fontFamily="sans-serif"
              fontWeight={isSelected ? '700' : '600'}
              className="transition-colors group-hover:fill-[#F0EEE9] pointer-events-none"
            >
              {node.title.length > 22 ? `${node.title.slice(0, 20)}...` : node.title}
            </text>

            {/* Date Tag */}
            <text
              y={dateY}
              textAnchor="middle"
              fill={isSelected ? '#9EA4AA' : '#686E77'}
              fontSize="8.5"
              fontFamily="monospace"
              fontWeight="bold"
              className="transition-colors group-hover:fill-[#9EA4AA] pointer-events-none"
            >
              {node.date}
            </text>
          </g>
        )
      })}
    </g>
  )
}
