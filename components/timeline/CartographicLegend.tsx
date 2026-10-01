import React, { useState } from 'react'
import { Info, ChevronDown, ChevronUp } from 'lucide-react'

export const CartographicLegend: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="absolute bottom-4 left-4 z-30 font-mono text-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#14171A] border border-[#2A2F36] text-[#9EA4AA] hover:text-[#F0EEE9] hover:border-[#3E4752] transition-all shadow-md"
        aria-label="Toggle Cartographic Legend"
      >
        <Info className="w-3.5 h-3.5 text-[#536B7A]" />
        <span className="font-semibold uppercase tracking-wider text-[11px]">Map Legend</span>
        {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
      </button>

      {isOpen && (
        <div className="mt-2 p-4 rounded-xl bg-[#14171A] border border-[#2A2F36] shadow-2xl max-w-xs space-y-3 animate-in fade-in duration-150">
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#536B7A] border-b border-[#20242A] pb-1.5">
            Role Provenance Key
          </div>

          <div className="space-y-1.5 text-[11px] text-[#9EA4AA]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3E4752]" />
              <span>Employment Role</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4E8765]" />
              <span className="text-[#F0EEE9] font-medium">Independent Build</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rotate-45 bg-[#536B7A]" />
              <span>Collaborative Team Project</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full border-2 border-[#B88636]" />
              <span>SME / Tester / Validator</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full border border-dashed border-[#A85858]" />
              <span>Research / Exploration</span>
            </div>
          </div>

          <div className="text-[10px] font-bold uppercase tracking-widest text-[#536B7A] border-b border-[#20242A] pt-2 pb-1.5">
            Route Trajectory Key
          </div>

          <div className="space-y-1.5 text-[11px] text-[#9EA4AA]">
            <div className="flex items-center gap-2">
              <span className="w-6 h-0.5 bg-[#536B7A]" />
              <span>Established Engineering Path</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-0.5 border-t border-dashed border-[#71899A]" />
              <span>Figma Capability Branch</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-0.5 border-t border-dashed border-[#B88636]" />
              <span>Exploratory Research Path</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-0.5 border-t border-dashed border-[#686E77]" />
              <span>The Map Continues →</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
