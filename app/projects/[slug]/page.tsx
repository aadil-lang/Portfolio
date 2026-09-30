import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { projects } from '../../../data/projects'
import { chapters } from '../../../data/chapters'
import ArchitectureViz from '../../../components/ArchitectureViz'
import CodeEvidence from '../../../components/CodeEvidence'
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  CheckCircle2,
  Layers,
  Cpu,
  ShieldCheck,
  AlertTriangle,
  Flame,
  Scale,
  Sparkles,
  TrendingUp,
  Binary,
  BookOpen,
  Compass
} from 'lucide-react'

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug
  }))
}

export default function ProjectCaseStudyPage({ params }: ProjectPageProps) {
  const projectIndex = projects.findIndex((p) => p.slug === params.slug)
  if (projectIndex === -1) {
    notFound()
  }

  const project = projects[projectIndex]
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null

  // Lookup chapter for rich engineering investigation fields if available
  const chapter = chapters.find((c) => c.id === project.id || c.id === project.slug)

  const context = chapter?.context || project.context || project.summary
  const problem = chapter?.problem || project.problem || project.summary
  const solution = chapter?.solution || project.solution || project.summary
  const criticalDecision = chapter?.criticalDecision || project.criticalDecision
  const whatBroke = chapter?.whatBroke || project.whatBroke || []
  const whatBecameDeterministic = chapter?.whatBecameDeterministic || project.whatBecameDeterministic
  const evidence = chapter?.evidenceAndMetrics || project.evidence || project.keyFeatures || []
  const tradeoffs = chapter?.failuresAndTradeoffs || project.tradeoffs || []
  const breakthrough = chapter?.breakthrough || project.breakthrough
  const delta = chapter?.accumulatedCapability || project.delta

  return (
    <article className="max-w-5xl mx-auto space-y-12 pb-16">
      {/* Navigation Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Project Directory
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase font-mono font-bold tracking-wider px-2.5 py-1 rounded bg-purple-950/60 text-purple-300 border border-purple-800/60">
            {project.ownershipLabel}
          </span>
          {project.type && (
            <span className="text-xs uppercase font-mono tracking-wider px-2.5 py-1 rounded bg-slate-900 text-slate-400 border border-slate-800">
              {project.type}
            </span>
          )}
        </div>
      </div>

      {/* Header & Subtitle */}
      <header className="space-y-4">
        <div className="text-xs font-mono uppercase tracking-widest text-purple-400">
          Engineering Investigation // Case Study
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight font-serif">
          {project.title}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-4xl">
          {project.subtitle || project.tagline || project.summary}
        </p>

        {/* Tech Badges */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-mono rounded-full bg-slate-900 border border-slate-700/80 text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Action Links */}
        <div className="flex flex-wrap gap-3 pt-4">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 font-medium text-white transition-colors shadow-lg shadow-purple-600/25"
            >
              <ExternalLink className="w-4 h-4" /> Live Demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 transition-colors"
            >
              <Github className="w-4 h-4" /> View Source
            </a>
          )}
          {chapter && (
            <Link
              href="/journal"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-purple-500/40 bg-purple-950/30 hover:bg-purple-900/40 text-purple-200 text-sm font-medium transition-colors"
            >
              <BookOpen className="w-4 h-4 text-purple-400" /> Journal Chapter {chapter.number}
            </Link>
          )}
        </div>

        {/* Attribution & Disclosure Banner where applicable */}
        {project.statusNotice && (
          <div className="mt-6 p-4 sm:p-5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-200/90 text-xs sm:text-sm leading-relaxed flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold font-mono uppercase text-amber-300 text-xs">
                Context & Attribution Notice · Team System
              </div>
              <p>{project.statusNotice}</p>
            </div>
          </div>
        )}
      </header>

      {/* 01. Context & 02. Problem Grid */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl glass border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-400 font-semibold">
            <Layers className="w-4 h-4" />
            <span>01. Operational Context</span>
          </div>
          <h2 className="text-xl font-bold text-white font-serif">Context</h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {context}
          </p>
        </div>

        <div className="p-6 rounded-xl glass border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold">
            <Flame className="w-4 h-4" />
            <span>02. Engineering Problem</span>
          </div>
          <h2 className="text-xl font-bold text-white font-serif">Engineering Problem</h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {problem}
          </p>
        </div>
      </section>

      {/* 03. Architecture Visualization */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2 text-xl font-semibold text-slate-100 font-serif">
            <Layers className="w-5 h-5 text-purple-400" />
            <h2>03. Architecture & Execution Flow</h2>
          </div>
          <span className="text-[11px] font-mono text-purple-300 uppercase tracking-wider">
            Verified Pipeline
          </span>
        </div>
        <ArchitectureViz pattern={project.architecturePattern || 'overview'} />
      </section>

      {/* 04. Full-Stack System Layers */}
      {project.systemLayers && project.systemLayers.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xl font-semibold text-slate-100 font-serif">
              <Cpu className="w-5 h-5 text-purple-400" />
              <h2>04. Full-Stack System Layers</h2>
            </div>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              End-to-End Implementation
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {project.systemLayers.map((layer, idx) => (
              <div
                key={layer.layer}
                className="glass p-4 rounded-xl border border-slate-800 space-y-2 hover:border-purple-500/40 transition-colors"
              >
                <span className="text-purple-400 font-semibold uppercase tracking-wider text-[11px] font-mono block">
                  0{idx + 1}. {layer.layer}
                </span>
                <div className="text-xs font-mono font-bold text-slate-100 bg-slate-900/90 px-2.5 py-1 rounded border border-slate-800">
                  {layer.components}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  {layer.details}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 05. Critical Engineering Decision */}
      {criticalDecision && (
        <section className="p-6 rounded-xl glass border border-purple-500/30 bg-purple-950/20 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-300 font-semibold">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>05. Critical Engineering Decision</span>
          </div>
          <h2 className="text-xl font-bold text-white font-serif">Critical Engineering Decision</h2>
          <p className="text-sm sm:text-base text-purple-100/90 leading-relaxed">
            {criticalDecision}
          </p>
        </section>
      )}

      {/* Engineering Evidence // Code Excerpts */}
      {project.codeEvidence && project.codeEvidence.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xl font-semibold text-slate-100 font-serif">
              <Binary className="w-5 h-5 text-purple-400" />
              <h2>Engineering Evidence // Code Excerpts</h2>
            </div>
            <span className="text-[11px] font-mono text-purple-300 uppercase tracking-wider">
              Deterministic Mechanisms & Boundaries
            </span>
          </div>

          <div className="space-y-6">
            {project.codeEvidence.map((snippet) => (
              <CodeEvidence key={snippet.id} evidence={snippet} />
            ))}
          </div>
        </section>
      )}

      {/* 06. What Broke (Failure Analysis) */}
      {whatBroke && whatBroke.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xl font-semibold text-slate-100 font-serif">
              <Flame className="w-5 h-5 text-rose-400" />
              <h2>06. What Broke (Failure Analysis & Containment)</h2>
            </div>
            <span className="text-[11px] font-mono text-rose-400 uppercase tracking-wider">
              Empirical Defect Logs
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {whatBroke.map((item, idx) => (
              <div
                key={idx}
                className="glass p-5 rounded-xl border border-slate-800 space-y-3 bg-slate-950/40"
              >
                <div className="flex items-center gap-2 text-rose-300 font-semibold text-sm">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-500/20 border border-rose-500/30">
                    Defect 0{idx + 1}
                  </span>
                  <span>{item.failure}</span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-300 leading-relaxed">
                  <p><strong className="text-slate-400 font-mono">Cause:</strong> {item.cause}</p>
                  <p><strong className="text-slate-400 font-mono">Detection:</strong> {item.detection}</p>
                  <p><strong className="text-slate-400 font-mono">Response:</strong> {item.response}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 07. What Became Deterministic */}
      {whatBecameDeterministic && (
        <section className="p-6 rounded-xl glass border border-slate-800 bg-slate-950/70 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
            <Binary className="w-4 h-4" />
            <span>07. Authority Boundary</span>
          </div>
          <h2 className="text-xl font-bold text-white font-serif">What Became Deterministic</h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-mono text-xs sm:text-sm bg-slate-900/80 p-4 rounded-lg border border-slate-800">
            {whatBecameDeterministic}
          </p>
        </section>
      )}

      {/* 08. Evidence & Ground Truth */}
      {evidence && evidence.length > 0 && (
        <section className="p-6 rounded-xl glass border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xl font-semibold text-slate-100 font-serif">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h2>08. Evidence & Ground Truth</h2>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">
              Source Verified
            </span>
          </div>

          <ul className="grid sm:grid-cols-2 gap-3 pt-2">
            {evidence.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 bg-slate-900/60 p-3.5 rounded-lg border border-slate-800/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 09. Architectural Trade-offs */}
      {tradeoffs && tradeoffs.length > 0 && (
        <section className="p-6 rounded-xl glass border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xl font-semibold text-slate-100 font-serif">
              <Scale className="w-5 h-5 text-indigo-400" />
              <h2>09. Trade-offs</h2>
            </div>
            <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider">
              System Decisions
            </span>
          </div>

          <ul className="space-y-3 pt-2">
            {tradeoffs.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 bg-slate-900/40 p-3.5 rounded-lg border border-slate-800">
                <span className="text-xs font-mono text-purple-400 font-bold shrink-0 mt-0.5">0{i + 1}.</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 10. What This Project Changed & Engineering Delta */}
      {(breakthrough || delta) && (
        <section className="grid md:grid-cols-2 gap-6">
          {breakthrough && (
            <div className="p-6 rounded-xl glass border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-400 font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>What This Project Changed</span>
              </div>
              <h2 className="text-xl font-bold text-white font-serif">System Breakthrough</h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {breakthrough}
              </p>
            </div>
          )}

          {delta && (
            <div className="p-6 rounded-xl glass border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                <TrendingUp className="w-4 h-4" />
                <span>Engineering Delta</span>
              </div>
              <h2 className="text-xl font-bold text-white font-serif">Engineering Delta</h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {delta}
              </p>
            </div>
          )}
        </section>
      )}

      {/* 09 — Related Journal Entry & Timeline Progression */}
      <section className="p-6 rounded-xl glass border border-slate-800 bg-slate-900/30 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2 text-xl font-semibold text-slate-100 font-serif">
            <BookOpen className="w-5 h-5 text-purple-400" />
            <h2>Related Journal Entry & Timeline Context</h2>
          </div>
          <span className="text-[11px] font-mono text-purple-300 uppercase tracking-wider">
            Traceability // Cross-Links
          </span>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          {chapter
            ? `This system's architectural evolution and empirical failures are analyzed in Chapter ${chapter.number} of the Engineering Journal.`
            : 'This system is documented across the chronological timeline and engineering archive.'}
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          {chapter && (
            <Link
              href="/journal"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-950/60 border border-purple-800/80 hover:bg-purple-900/60 text-purple-200 text-xs font-mono uppercase tracking-wider transition-colors"
            >
              <BookOpen className="w-4 h-4 text-purple-400" />
              Journal Chapter {chapter.number}: {chapter.title} →
            </Link>
          )}
          <Link
            href="/experience"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-mono uppercase tracking-wider transition-colors"
          >
            <Compass className="w-4 h-4 text-slate-400" />
            View Timeline Evolution →
          </Link>
        </div>
      </section>

      {/* Project Navigation Footer */}
      <footer className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        {prevProject ? (
          <Link
            href={`/projects/${prevProject.slug}`}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Previous: {prevProject.title}
          </Link>
        ) : (
          <span className="text-slate-600 text-xs font-mono">Start of Catalog</span>
        )}

        <Link
          href="/projects"
          className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-purple-400 hover:text-purple-300 text-xs font-mono uppercase tracking-wider transition-colors"
        >
          Project Directory
        </Link>

        {nextProject ? (
          <Link
            href={`/projects/${nextProject.slug}`}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            Next: {nextProject.title} <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <span className="text-slate-600 text-xs font-mono">End of Catalog</span>
        )}
      </footer>
    </article>
  )
}
