import React from 'react'
import { FailureBoundary } from '@/data/architecture/types'
import { AlertTriangle, ShieldAlert, FileCode, CheckCircle2 } from 'lucide-react'

interface FailureBoundariesViewProps {
  boundaries: FailureBoundary[]
  systemName: string
}

export default function FailureBoundariesView({
  boundaries,
  systemName
}: FailureBoundariesViewProps) {
  if (!boundaries || boundaries.length === 0) {
    return (
      <div className="p-6 rounded-xl bg-[#14171A] border border-[#262B32] text-center text-xs font-mono text-[#71899A]">
        No explicit failure boundaries recorded for this system view.
      </div>
    )
  }

  return (
    <div className="p-5 sm:p-6 rounded-xl bg-[#14171A] border border-[#262B32] space-y-5 text-[#D8D6D0]">
      <div className="border-b border-[#20252C] pb-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-wider text-[#D29922] font-bold block">
            Failure & Containment Architecture // {systemName}
          </span>
          <h3 className="text-lg sm:text-xl font-bold font-serif text-[#F0EEE9] flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#D29922]" />
            <span>Verified Failure Boundaries & Abstention Gates</span>
          </h3>
        </div>
        <span className="text-xs font-mono text-[#71899A]">
          {boundaries.length} Verified Containment Gates
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {boundaries.map((boundary) => (
          <div
            key={boundary.id}
            className="p-4 rounded-lg bg-[#181C21] border border-[#2A2F36] space-y-3 font-mono text-xs flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-[#D29922] shrink-0 mt-0.5" />
                <h4 className="font-serif font-bold text-sm text-[#F0EEE9]">
                  {boundary.name}
                </h4>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase text-[#71899A] block font-bold">
                  Trigger Condition
                </span>
                <p className="text-[11px] text-[#C8C6BF] font-sans leading-relaxed">
                  {boundary.triggerCondition}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase text-[#78C29A] block font-bold">
                  Containment Action
                </span>
                <p className="text-[11px] text-[#78C29A] font-sans leading-relaxed">
                  {boundary.containmentAction}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#22272E] space-y-1.5 text-[10px] text-[#8C939D]">
              <div className="flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-[#5A9A78] shrink-0" />
                <span className="truncate">{boundary.sourceFile}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#78C29A]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#5A9A78] shrink-0" />
                <span>Verified: {boundary.verifiedTest}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

