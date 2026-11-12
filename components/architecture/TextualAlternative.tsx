import React from 'react'
import { SystemArchitecture } from '@/data/architecture/types'
import { FileCode, ShieldCheck, CheckCircle2 } from 'lucide-react'

interface TextualAlternativeProps {
  system: SystemArchitecture
}

export default function TextualAlternative({ system }: TextualAlternativeProps) {
  return (
    <div
      aria-label={`Accessible Textual Architecture: ${system.name}`}
      className="p-5 sm:p-6 rounded-xl bg-[#14171A] border border-[#262B32] space-y-6 text-[#D8D6D0] font-sans"
    >
      <div className="border-b border-[#20252C] pb-3 space-y-1">
        <span className="text-[10px] uppercase font-mono tracking-wider text-[#5A9A78] font-bold block">
          Accessible Textual Architecture Specification (WCAG 2.2 AA)
        </span>
        <h3 className="text-xl font-bold font-serif text-[#F0EEE9]">
          {system.name} — Architectural Components & Data Flow
        </h3>
        <p className="text-xs text-[#9EA4AA]">
          Linearized representation of all components, interfaces, invariants, and failure boundaries.
        </p>
      </div>

      {/* Component Table */}
      <div className="space-y-4 font-mono text-xs">
        <h4 className="font-serif font-bold text-base text-[#F0EEE9] flex items-center gap-2">
          <span>Architectural Components ({system.nodes.length})</span>
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-[#2A2F36]">
            <thead>
              <tr className="bg-[#181C21] text-[#71899A] text-[10px] uppercase">
                <th className="p-2.5 border border-[#2A2F36]">Component</th>
                <th className="p-2.5 border border-[#2A2F36]">Layer</th>
                <th className="p-2.5 border border-[#2A2F36]">Nature</th>
                <th className="p-2.5 border border-[#2A2F36]">Responsibility</th>
                <th className="p-2.5 border border-[#2A2F36]">Source Path</th>
                <th className="p-2.5 border border-[#2A2F36]">Verified Evidence</th>
              </tr>
            </thead>
            <tbody className="text-[11px] divide-y divide-[#22272E]">
              {system.nodes.map((node) => (
                <tr key={node.id} className="hover:bg-[#181C21]/60">
                  <td className="p-2.5 font-bold text-[#F0EEE9] border border-[#2A2F36]">
                    {node.label}
                  </td>
                  <td className="p-2.5 text-[#9EA4AA] border border-[#2A2F36]">
                    {node.layer}
                  </td>
                  <td className="p-2.5 border border-[#2A2F36]">
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#1A1F26] text-[#78C29A] border border-[#2B3542]">
                      {node.classification}
                    </span>
                  </td>
                  <td className="p-2.5 text-[#C8C6BF] font-sans border border-[#2A2F36]">
                    {node.responsibility}
                  </td>
                  <td className="p-2.5 text-[#78C29A] text-[10px] border border-[#2A2F36]">
                    {node.sourceLocation}
                  </td>
                  <td className="p-2.5 text-[#9EA4AA] text-[10px] border border-[#2A2F36]">
                    {node.verificationEvidence.label}: {node.verificationEvidence.measurement}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Execution Path Linear List */}
      <div className="space-y-3 font-mono text-xs">
        <h4 className="font-serif font-bold text-base text-[#F0EEE9]">
          Sequential Execution Flow ({system.executionFlow.length} Steps)
        </h4>
        <ol className="space-y-2 list-decimal list-inside text-[#C8C6BF] text-xs font-sans">
          {system.executionFlow.map((step) => (
            <li key={step.stepNumber} className="p-2.5 rounded bg-[#181C21] border border-[#2A2F36]">
              <span className="font-bold font-serif text-[#F0EEE9]">
                Step {step.stepNumber}: {step.title}
              </span>
              <p className="text-xs text-[#9EA4AA] mt-1 pl-4">
                {step.description}
              </p>
              <span className="text-[11px] font-mono text-[#78C29A] block mt-1 pl-4">
                State: {step.dataPayloadSummary}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* Failure Boundaries */}
      <div className="space-y-3 font-mono text-xs">
        <h4 className="font-serif font-bold text-base text-[#F0EEE9]">
          Failure & Containment Invariants ({system.failureBoundaries.length})
        </h4>
        <div className="space-y-2">
          {system.failureBoundaries.map((fb) => (
            <div key={fb.id} className="p-3 rounded bg-[#181C21] border border-[#2A2F36] space-y-1">
              <span className="font-bold text-[#E3B341]">
                {fb.name}
              </span>
              <p className="text-xs text-[#C8C6BF] font-sans">
                Trigger: {fb.triggerCondition}
              </p>
              <p className="text-xs text-[#78C29A] font-sans">
                Containment: {fb.containmentAction}
              </p>
              <span className="text-[10px] text-[#71899A] block font-mono">
                Source: {fb.sourceFile} | Verified in: {fb.verifiedTest}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

