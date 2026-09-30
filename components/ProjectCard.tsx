import React from 'react'
import Link from 'next/link'
import { Project } from '../types'
import { ArrowRight, ExternalLink, Github } from 'lucide-react'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="p-5 sm:p-6 rounded border border-[#262B32] bg-[#15181C] hover:bg-[#181C21] hover:border-[#3E4652] transition-colors flex flex-col justify-between group">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <span className="text-[11px] text-[#858A90] font-medium tracking-wider">
            {project.ownershipLabel}
          </span>
          {project.type && (
            <span className="text-[10px] text-[#686E77] bg-[#121518] px-2 py-0.5 rounded border border-[#22262C]">
              {project.type}
            </span>
          )}
        </div>

        <h3 className="text-base sm:text-lg font-bold text-[#F0EEE9] group-hover:text-white transition-colors font-serif">
          <Link href={`/projects/${project.slug}`}>
            {project.title}
          </Link>
        </h3>

        <p className="text-xs sm:text-sm text-[#9EA4AA] leading-relaxed">
          {project.summary}
        </p>

        {project.technologies && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[11px] font-mono rounded bg-[#121518] text-[#7E858E] border border-[#22262C]"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="px-1.5 py-0.5 text-[10px] font-mono text-[#555A62]">
                +{project.technologies.length - 5}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="mt-5 pt-4 border-t border-[#20242A] flex items-center justify-between gap-3 text-xs font-mono">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-[#71899A] group-hover:text-[#9FB1BF] transition-colors font-medium"
        >
          <span>[ SPECIFICATION ]</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>

        <div className="flex items-center gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded text-[#686E77] hover:text-[#D8D6D0] hover:bg-[#1E2228] transition-colors"
              title="GitHub Repository"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded text-[#686E77] hover:text-[#D8D6D0] hover:bg-[#1E2228] transition-colors"
              title="Live Demo"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
