import React from 'react'
import { ArchitectureNode, ArchitectureEdge } from '@/data/architecture/types'
import {
  ShieldCheck,
  Bot,
  UserCheck,
  Cpu,
  ArrowRight,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react'

interface ArchitectureCanvasProps {
  nodes: ArchitectureNode[]
  edges: ArchitectureEdge[]
  selectedNodeId: string | null
  activeStepNodeId: string | null
  activeEdgeIds?: string[]
  onSelectNode: (node: ArchitectureNode) => void
  isFlowMode: boolean
}

export default function ArchitectureCanvas({
  nodes,
  edges,
  selectedNodeId,
  activeStepNodeId,
  onSelectNode,
  isFlowMode
}: ArchitectureCanvasProps) {
  const getClassificationIcon = (classification: ArchitectureNode['classification']) => {
    switch (classification) {
      case 'deterministic':
        return <ShieldCheck className="w-3.5 h-3.5 text-[#5A9A78]" />
      case 'probabilistic':
        return <Bot className="w-3.5 h-3.5 text-[#58A6FF]" />
      case 'human_gate':
        return <UserCheck className="w-3.5 h-3.5 text-[#D29922]" />
      case 'external':
        return <Cpu className="w-3.5 h-3.5 text-[#71899A]" />
    }
  }

  const getClassificationBorder = (
    classification: ArchitectureNode['classification'],
    isSelected: boolean,
    isActiveStep: boolean
  ) => {
    if (isActiveStep) {
      return 'border-[#5A9A78] ring-2 ring-[#5A9A78]/50 bg-[#16251E] shadow-lg shadow-[#5A9A78]/10'
    }
    if (isSelected) {
      return 'border-[#5A9A78] bg-[#18201B]'
    }
    switch (classification) {
      case 'deterministic':
        return 'border-[#2D3A31] hover:border-[#5A9A78]/70 bg-[#141816]'
      case 'probabilistic':
        return 'border-[#263545] hover:border-[#388BFD]/70 bg-[#141920]'
      case 'human_gate':
        return 'border-[#403520] hover:border-[#D29922]/70 bg-[#1C1812]'
      case 'external':
        return 'border-[#262B32] hover:border-[#3E4652] bg-[#14171A]'
    }
  }

  return (
    <div
      role="region"
      aria-label="Interactive Architecture Canvas"
      className="p-5 sm:p-6 rounded-xl bg-[#121518] border border-[#242930] space-y-6 relative overflow-hidden"
    >
      {/* Background Cartographic Subtle Grid */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#1b2026_1px,transparent_1px),linear-gradient(to_bottom,#1b2026_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-40"
        aria-hidden="true"
      />

      {/* Canvas Header & Legend */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-[#20252C] pb-3 text-xs font-mono">
        <span className="text-[10px] uppercase tracking-wider text-[#71899A] font-bold">
          Component Topology ({nodes.length} Components)
        </span>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-[10px]">
          <span className="inline-flex items-center gap-1 text-[#78C29A]">
            <span className="w-2 h-2 rounded-full bg-[#5A9A78]" />
            Deterministic
          </span>
          <span className="inline-flex items-center gap-1 text-[#79B8FF]">
            <span className="w-2 h-2 rounded-full bg-[#388BFD]" />
            Model Inference
          </span>
          <span className="inline-flex items-center gap-1 text-[#E3B341]">
            <span className="w-2 h-2 rounded-full bg-[#D29922]" />
            Human Gate
          </span>
        </div>
      </div>

      {/* Responsive Visual Nodes Grid / Chain */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {nodes.map((node, idx) => {
          const isSelected = selectedNodeId === node.id
          const isActiveStep = activeStepNodeId === node.id

          return (
            <div
              key={node.id}
              onClick={() => onSelectNode(node)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onSelectNode(node)
                }
              }}
              tabIndex={0}
              role="button"
              aria-pressed={isSelected}
              aria-label={`Component ${idx + 1}: ${node.label}. Layer: ${node.layer}. Type: ${node.classification}.`}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 relative group focus:outline-hidden focus:ring-2 focus:ring-[#5A9A78] ${getClassificationBorder(
                node.classification,
                isSelected,
                isActiveStep
              )}`}
            >
              {/* Active Flow Indicator Pulse */}
              {isActiveStep && (
                <div className="absolute -top-1.5 -right-1.5 px-2 py-0.5 rounded-full bg-[#5A9A78] text-[#0D1510] text-[9px] font-mono font-bold uppercase tracking-wider animate-pulse flex items-center gap-1">
                  <span>ACTIVE</span>
                </div>
              )}

              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-1 text-[10px] font-mono">
                  <span className="text-[#71899A] uppercase tracking-wider truncate">
                    {node.layer}
                  </span>
                  <div className="shrink-0">{getClassificationIcon(node.classification)}</div>
                </div>

                <h4 className="font-serif font-bold text-sm text-[#F0EEE9] group-hover:text-white transition-colors">
                  {node.label}
                </h4>

                <p className="text-xs text-[#9EA4AA] line-clamp-2 font-sans leading-relaxed">
                  {node.responsibility}
                </p>
              </div>

              {/* Bottom Metadata Badges */}
              <div className="pt-2 border-t border-[#20252C] flex items-center justify-between text-[10px] font-mono text-[#71899A]">
                <span className="truncate max-w-[140px] text-[#5A9A78]">
                  {node.sourceLocation.split(',')[0]}
                </span>
                <span className="text-[#C8C6BF] group-hover:text-[#5A9A78] transition-colors inline-flex items-center gap-0.5">
                  Inspect →
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Execution Connections Map Summary */}
      <div className="relative z-10 pt-2 border-t border-[#20252C] flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#71899A]">
        <span>
          Data Flow: {edges.length} Directed Pipeline Transitions
        </span>
        <span className="text-[11px] text-[#6E7681]">
          Click any component to inspect interfaces & verification evidence
        </span>
      </div>
    </div>
  )
}

