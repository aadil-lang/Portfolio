import React from 'react'
import { ArchitectureNode } from '@/data/architecture/types'
import {
  ShieldCheck,
  Cpu,
  Bot,
  UserCheck,
  FileCode,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ExternalLink
} from 'lucide-react'

interface ComponentInspectorProps {
  node: ArchitectureNode | null
  systemName: string
}

export default function ComponentInspector({ node, systemName }: ComponentInspectorProps) {
  if (!node) {
    return (
      <div className="p-6 rounded-xl bg-[#14171A] border border-[#262B32] text-center space-y-3 font-mono text-xs text-[#71899A]">
        <Layers className="w-8 h-8 mx-auto text-[#3E4652]" />
        <p>Select any architecture component from the canvas to inspect its implementation, interfaces, and verification evidence.</p>
      </div>
    )
  }

  const getClassificationBadge = (classification: ArchitectureNode['classification']) => {
    switch (classification) {
      case 'deterministic':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#18231C] text-[#78C29A] border border-[#5A9A78]/40">
            <ShieldCheck className="w-3 h-3 text-[#5A9A78]" />
            DETERMINISTIC LOGIC
          </span>
        )
      case 'probabilistic':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#1E2530] text-[#79B8FF] border border-[#388BFD]/40">
            <Bot className="w-3 h-3 text-[#58A6FF]" />
            MODEL INFERENCE
          </span>
        )
      case 'human_gate':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#262118] text-[#E3B341] border border-[#D29922]/40">
            <UserCheck className="w-3 h-3 text-[#D29922]" />
            HUMAN-IN-THE-LOOP GATE
          </span>
        )
      case 'external':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#20252C] text-[#9EA4AA] border border-[#3E4652]">
            <Cpu className="w-3 h-3 text-[#71899A]" />
            EXTERNAL SUBSYSTEM
          </span>
        )
    }
  }

  return (
    <aside
      aria-label={`Component Details: ${node.label}`}
      className="p-5 sm:p-6 rounded-xl bg-[#14171A] border border-[#262B32] space-y-5 text-[#D8D6D0] font-sans"
    >
      {/* Header */}
      <div className="space-y-2 border-b border-[#20252C] pb-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#71899A]">
            {node.layer} // {systemName}
          </span>
          {getClassificationBadge(node.classification)}
        </div>
        <h3 className="text-lg sm:text-xl font-bold font-serif text-[#F0EEE9]">
          {node.label}
        </h3>
        <p className="text-xs text-[#C8C6BF] leading-relaxed">
          {node.responsibility}
        </p>
      </div>

      {/* Source Code Location */}
      <div className="space-y-1 font-mono text-xs">
        <span className="text-[10px] uppercase tracking-wider text-[#71899A] font-bold block">
          Source Implementation
        </span>
        <div className="p-2.5 rounded bg-[#181C21] border border-[#2A2F36] text-[#78C29A] text-[11px] break-all flex items-start gap-2">
          <FileCode className="w-4 h-4 text-[#5A9A78] shrink-0 mt-0.5" />
          <span>{node.sourceLocation}</span>
        </div>
      </div>

      {/* Inputs & Outputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
        <div className="p-3 rounded-lg bg-[#181C21] border border-[#2A2F36] space-y-1.5">
          <span className="text-[10px] uppercase tracking-wider text-[#71899A] font-bold block">
            Inputs
          </span>
          <ul className="space-y-1 text-[11px] text-[#C8C6BF]">
            {node.inputs.map((inp, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-[#5A9A78] font-bold">›</span>
                <span>{inp}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-3 rounded-lg bg-[#181C21] border border-[#2A2F36] space-y-1.5">
          <span className="text-[10px] uppercase tracking-wider text-[#71899A] font-bold block">
            Outputs
          </span>
          <ul className="space-y-1 text-[11px] text-[#C8C6BF]">
            {node.outputs.map((out, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-[#5A9A78] font-bold">›</span>
                <span>{out}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Validation Rule / Invariant */}
      {node.validationRule && (
        <div className="p-3 rounded-lg bg-[#181C21] border border-[#2A2F36] space-y-1 font-mono text-xs">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#D29922] font-bold">
            <AlertTriangle className="w-3.5 h-3.5 text-[#D29922]" />
            <span>Deterministic Invariant / Validation Rule</span>
          </div>
          <p className="text-[11px] text-[#D8D6D0] leading-relaxed">
            {node.validationRule}
          </p>
        </div>
      )}

      {/* Verification Evidence */}
      <div className="p-3 rounded-lg bg-[#181C21] border border-[#2A2F36] space-y-1.5 font-mono text-xs">
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#78C29A] font-bold">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#5A9A78]" />
          <span>Verification Evidence: {node.verificationEvidence.label}</span>
        </div>
        <p className="text-[11px] text-[#C8C6BF]">
          {node.verificationEvidence.measurement}
        </p>
        {node.verificationEvidence.location && (
          <span className="text-[10px] text-[#6E7681] block">
            Location: {node.verificationEvidence.location}
          </span>
        )}
      </div>

      {/* Dependencies */}
      {node.dependencies.length > 0 && (
        <div className="space-y-1.5 font-mono text-xs">
          <span className="text-[10px] uppercase tracking-wider text-[#71899A] font-bold block">
            Dependencies & Libraries
          </span>
          <div className="flex flex-wrap gap-1.5">
            {node.dependencies.map((dep, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded bg-[#1A1F26] text-[#9EA4AA] border border-[#262B32] text-[10px]"
              >
                {dep}
              </span>
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}

