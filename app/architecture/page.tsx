import type { Metadata } from 'next'
import ArchitectureExplorer from '@/components/architecture/ArchitectureExplorer'
import { ExecutiveSummary } from '@/components/shared/ExecutiveSummary'

export const metadata: Metadata = {
  title: 'Interactive Architecture Explorer — Mohemmed Aadil Khurshid | AI Systems Engineer',
  description:
    'Explore verified component topologies, execution flows, and deterministic failure boundaries across 11 production and personal AI systems.'
}

export default function ArchitecturePage() {
  return (
    <div className="space-y-6">
      <div className="container mx-auto px-4 max-w-7xl pt-2">
        <ExecutiveSummary
          badgeLabel="SYSTEM ARCHITECTURE // OVERVIEW"
          title="Why this matters"
          summary="Explore the architecture of 11 AI and software systems, including component relationships, state transitions, data flows and failure boundaries."
          supportingMessage="Move beyond project descriptions to inspect how systems are structured, how their components interact, and where deterministic controls and failure containment are applied."
          accentColor="blue"
        />
      </div>
      <ArchitectureExplorer />
    </div>
  )
}

