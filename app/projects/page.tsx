import React from 'react'
import { projects } from '../../data/projects'
import ProjectCard from '../../components/ProjectCard'
import { Briefcase, UserCheck } from 'lucide-react'

export const metadata = {
  title: 'Engineering Systems Index | Mohemmed Aadil Khurshid',
  description: 'Production systems, agentic architectures, and full-stack platforms organized by professional engineering ownership and independent personal builds.'
}

export default function ProjectsPage() {
  const waygroundIndependent = projects.filter(
    (p) => p.ownershipCategory === 'wayground-independent'
  )
  const waygroundTeam = projects.filter(
    (p) => p.ownershipCategory === 'wayground-team'
  )
  const personalIndependent = projects.filter(
    (p) => p.ownershipCategory === 'personal-independent'
  )
  const hackathonProjects = projects.filter(
    (p) => p.ownershipCategory === 'hackathon'
  )

  return (
    <section className="max-w-5xl mx-auto space-y-14">
      {/* Page Header */}
      <header className="space-y-3 pt-2">
        <span className="text-xs uppercase tracking-wider font-mono text-[#71899A] block">
          SYSTEMS CATALOG // REPOSITORY ARCHIVE
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F0EEE9] font-serif">
          Engineering Systems Index
        </h1>
        <p className="text-sm sm:text-base text-[#9EA4AA] max-w-3xl leading-relaxed">
          Production systems, deterministic verification pipelines, and autonomous platforms. Organized strictly by independent professional ownership at Wayground, team collaboration, personal engineering builds, and competitive hackathon projects.
        </p>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 1: PROFESSIONAL ENGINEERING */}
      {/* ------------------------------------------------------------- */}
      <section className="space-y-10">
        <div className="border-b border-[#2A2F36] pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Briefcase className="w-4 h-4 text-[#71899A]" />
            <h2 className="text-lg sm:text-xl font-bold text-[#F0EEE9] font-mono tracking-tight">
              PROFESSIONAL ENGINEERING
            </h2>
          </div>
          <span className="text-xs font-mono text-[#686E77] uppercase tracking-widest hidden sm:inline">
            Wayground Systems
          </span>
        </div>

        {/* Subsection 1A: Independent Builds at Wayground */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5A9A78]" />
              <h3 className="text-base font-bold text-[#F0EEE9] font-serif">
                Independent Builds at Wayground
              </h3>
            </div>
            <p className="text-xs text-[#858A90] mt-1 pl-3.5 border-l border-[#242930] font-mono">
              Systems independently designed, authored, and built during professional tenure at Wayground.
            </p>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {waygroundIndependent.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>

        {/* Subsection 1B: Team System at Wayground */}
        <div className="space-y-4 pt-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B89B5E]" />
              <h3 className="text-base font-bold text-[#F0EEE9] font-serif">
                Team System
              </h3>
            </div>
            <p className="text-xs text-[#858A90] mt-1 pl-3.5 border-l border-[#242930] font-mono">
              A company-wide pipeline contributed to as part of the engineering team.
            </p>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {waygroundTeam.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 2: INDEPENDENT ENGINEERING */}
      {/* ------------------------------------------------------------- */}
      <section className="space-y-10 pt-4 border-t border-[#2A2F36]">
        <div className="border-b border-[#2A2F36] pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <UserCheck className="w-4 h-4 text-[#71899A]" />
            <h2 className="text-lg sm:text-xl font-bold text-[#F0EEE9] font-mono tracking-tight">
              INDEPENDENT ENGINEERING
            </h2>
          </div>
          <span className="text-xs font-mono text-[#686E77] uppercase tracking-widest hidden sm:inline">
            Personal Builds & Hackathons
          </span>
        </div>

        {/* Subsection 2A: Personal Builds */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#71899A]" />
              <h3 className="text-base font-bold text-[#F0EEE9] font-serif">
                Personal Builds
              </h3>
            </div>
            <p className="text-xs text-[#858A90] mt-1 pl-3.5 border-l border-[#242930] font-mono">
              Independent engineering architectures designed and built outside professional employment.
            </p>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {personalIndependent.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>

        {/* Subsection 2B: Hackathon Projects */}
        <div className="space-y-4 pt-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8E7CC3]" />
              <h3 className="text-base font-bold text-[#F0EEE9] font-serif">
                Hackathon Projects
              </h3>
            </div>
            <p className="text-xs text-[#858A90] mt-1 pl-3.5 border-l border-[#242930] font-mono">
              Autonomous agentic architectures and full-stack marketplaces engineered and shipped during competitive hackathons.
            </p>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {hackathonProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>
    </section>
  )
}
