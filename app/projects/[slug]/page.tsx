import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { projects } from '../../../data/projects'
import { chapters } from '../../../data/chapters'
import ArchitectureViz from '../../../components/ArchitectureViz'
import CodeEvidence from '../../../components/CodeEvidence'
import OcrEvaluationExplorer from '../../../components/evidence/OcrEvaluationExplorer'
import CadModelViewer from '../../../components/evidence/CadModelViewer'
import SolaceVideoShowcase from '../../../components/evidence/SolaceVideoShowcase'
import AskAadilEvaluationExplorer from '../../../components/evidence/AskAadilEvaluationExplorer'
import EngineeringDecisions from '../../../components/decisions/EngineeringDecisions'
import { projectDecisions } from '../../../data/decisions/projectDecisions'
import ProjectVideoDemo from '../../../components/shared/ProjectVideoDemo'
import { isValidVideoDemo } from '../../../lib/videoDemo'
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
  Compass,
  Play
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
  const decisions = projectDecisions[project.slug] || []

  return (
    <article className="max-w-5xl mx-auto space-y-12 pb-16 px-4 sm:px-6">
      {/* Navigation Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#242930] pb-4 pt-2">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#9EA4AA] hover:text-[#F0EEE9] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Project Directory
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase font-mono font-bold tracking-wider px-2.5 py-1 rounded bg-[#18261F] text-[#5A9A78] border border-[#234030]">
            {project.ownershipLabel}
          </span>
          {project.type && (
            <span className="text-xs uppercase font-mono tracking-wider px-2.5 py-1 rounded bg-[#16191D] text-[#858A90] border border-[#262B32]">
              {project.type}
            </span>
          )}
        </div>
      </div>

      {/* Header & Subtitle */}
      <header className="space-y-4">
        <div className="text-xs font-mono uppercase tracking-widest text-[#5A9A78] font-semibold">
          Engineering Specification // Case Study
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F0EEE9] leading-tight font-serif">
          {project.title}
        </h1>
        <p className="text-base sm:text-lg text-[#C8C6BF] leading-relaxed max-w-4xl">
          {project.subtitle || project.tagline || project.summary}
        </p>

        {/* Tech Badges */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-mono rounded bg-[#16191D] border border-[#2A2F36] text-[#A2B4C2]"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-3 pt-3 font-mono text-xs">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded border border-[#3E4652] bg-[#22272E] hover:bg-[#2C333D] text-[#F0EEE9] font-medium transition-colors shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#5A9A78]" /> Live Demonstration
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded border border-[#262B32] bg-[#16191D] hover:bg-[#1E232A] text-[#D8D6D0] hover:text-white transition-colors"
            >
              <Github className="w-3.5 h-3.5 text-[#71899A]" /> View Source Repository
            </a>
          )}
          {chapter && (
            <Link
              href="/journal"
              className="inline-flex items-center gap-2 px-4 py-2 rounded border border-[#2A3542] bg-[#161E28] hover:bg-[#1B2735] text-[#8CC4FF] text-xs font-medium transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#58A6FF]" /> Journal Chapter {chapter.number}
            </Link>
          )}
        </div>

        {/* Attribution Notice where applicable */}
        {project.statusNotice && (
          <div className="mt-4 p-4 rounded-xl border border-amber-500/30 bg-[#1F1B14] text-amber-200/90 text-xs sm:text-sm leading-relaxed flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold font-mono uppercase text-amber-300 text-xs">
                Context & Attribution Notice
              </div>
              <p>{project.statusNotice}</p>
            </div>
          </div>
        )}
      </header>

      {/* Sticky Quick-Jump Navigation Bar */}
      <nav className="sticky top-[61px] z-30 bg-[#121518]/95 backdrop-blur-md border-y border-[#262B32] py-2 px-3 rounded-lg flex items-center gap-2 overflow-x-auto text-[11px] font-mono shadow-md">
        <span className="text-[#686E77] shrink-0 uppercase tracking-wider font-semibold">Jump to:</span>
        {isValidVideoDemo(project.videoDemo) && (
          <a
            href="#video-demo"
            className="shrink-0 px-2.5 py-1 rounded bg-[#18261F] hover:bg-[#20362B] text-[#5A9A78] hover:text-[#78C49C] border border-[#234030] transition-colors font-bold flex items-center gap-1"
          >
            <Play className="w-3 h-3 text-[#5A9A78] fill-current" />
            <span>Video Demo</span>
          </a>
        )}
        <a href="#context-problem" className="shrink-0 px-2.5 py-1 rounded bg-[#181C21] hover:bg-[#22272E] text-[#9EA4AA] hover:text-[#F0EEE9] border border-[#262B32] transition-colors">01. Context & Problem</a>
        <a href="#architecture" className="shrink-0 px-2.5 py-1 rounded bg-[#181C21] hover:bg-[#22272E] text-[#9EA4AA] hover:text-[#F0EEE9] border border-[#262B32] transition-colors">02. Architecture</a>
        {project.systemLayers && project.systemLayers.length > 0 && (
          <a href="#layers" className="shrink-0 px-2.5 py-1 rounded bg-[#181C21] hover:bg-[#22272E] text-[#9EA4AA] hover:text-[#F0EEE9] border border-[#262B32] transition-colors">03. Layers</a>
        )}
        {['ocr-evaluator', 'design-automation', 'solace-ai', 'ask-aadil'].includes(project.slug) && (
          <a href="#interactive-evidence" className="shrink-0 px-2.5 py-1 rounded bg-[#18261F] hover:bg-[#20362B] text-[#5A9A78] hover:text-[#78C49C] border border-[#234030] transition-colors font-bold flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#5A9A78]" />
            <span>Interactive Demo</span>
          </a>
        )}
        {criticalDecision && (
          <a href="#decision" className="shrink-0 px-2.5 py-1 rounded bg-[#181C21] hover:bg-[#22272E] text-[#9EA4AA] hover:text-[#F0EEE9] border border-[#262B32] transition-colors">04. Decision</a>
        )}
        {project.codeEvidence && project.codeEvidence.length > 0 && (
          <a href="#code-evidence" className="shrink-0 px-2.5 py-1 rounded bg-[#181C21] hover:bg-[#22272E] text-[#9EA4AA] hover:text-[#F0EEE9] border border-[#262B32] transition-colors">05. Code Evidence</a>
        )}
        {whatBroke && whatBroke.length > 0 && (
          <a href="#failures" className="shrink-0 px-2.5 py-1 rounded bg-[#181C21] hover:bg-[#22272E] text-[#9EA4AA] hover:text-[#F0EEE9] border border-[#262B32] transition-colors">06. Failures</a>
        )}
        {evidence && evidence.length > 0 && (
          <a href="#evidence" className="shrink-0 px-2.5 py-1 rounded bg-[#181C21] hover:bg-[#22272E] text-[#9EA4AA] hover:text-[#F0EEE9] border border-[#262B32] transition-colors">07. Verification</a>
        )}
        {((decisions && decisions.length > 0) || (tradeoffs && tradeoffs.length > 0)) && (
          <a href="#decisions" className="shrink-0 px-2.5 py-1 rounded bg-[#181C21] hover:bg-[#22272E] text-[#9EA4AA] hover:text-[#F0EEE9] border border-[#262B32] transition-colors">08. Decisions & Trade-offs</a>
        )}
      </nav>

      {/* Prominent Video Demonstration Section (Rendered when valid video is configured) */}
      {isValidVideoDemo(project.videoDemo) && (
        <section id="video-demo" className="scroll-mt-28">
          <ProjectVideoDemo
            demo={project.videoDemo}
            projectTitle={project.title}
            projectSlug={project.slug}
            variant="full"
          />
        </section>
      )}

      {/* 01. Context & 02. Problem Grid */}
      <section id="context-problem" className="grid md:grid-cols-2 gap-6 scroll-mt-28">
        <div className="p-6 rounded-xl border border-[#262B32] bg-[#14171A] space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#71899A] font-semibold">
            <Layers className="w-4 h-4 text-[#71899A]" />
            <span>01. Operational Context</span>
          </div>
          <h2 className="text-xl font-bold text-[#F0EEE9] font-serif">Context</h2>
          <p className="text-sm text-[#C8C6BF] leading-relaxed">
            {context}
          </p>
        </div>

        <div className="p-6 rounded-xl border border-[#262B32] bg-[#14171A] space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D48A63] font-semibold">
            <Flame className="w-4 h-4 text-[#D48A63]" />
            <span>02. Engineering Problem</span>
          </div>
          <h2 className="text-xl font-bold text-[#F0EEE9] font-serif">Engineering Problem</h2>
          <p className="text-sm text-[#C8C6BF] leading-relaxed">
            {problem}
          </p>
        </div>
      </section>

      {/* 03. Architecture Visualization */}
      <section id="architecture" className="space-y-4 scroll-mt-28">
        <div className="flex items-center justify-between pb-2 border-b border-[#242930]">
          <div className="flex items-center gap-2 text-xl font-semibold text-[#F0EEE9] font-serif">
            <Layers className="w-5 h-5 text-[#5A9A78]" />
            <h2>03. Architecture & Execution Flow</h2>
          </div>
          <span className="text-[11px] font-mono text-[#5A9A78] uppercase tracking-wider">
            Verified Pipeline
          </span>
        </div>
        <ArchitectureViz pattern={project.architecturePattern || 'overview'} />
      </section>

      {/* 04. Full-Stack System Layers */}
      {project.systemLayers && project.systemLayers.length > 0 && (
        <section id="layers" className="space-y-4 scroll-mt-28">
          <div className="flex items-center justify-between pb-2 border-b border-[#242930]">
            <div className="flex items-center gap-2 text-xl font-semibold text-[#F0EEE9] font-serif">
              <Cpu className="w-5 h-5 text-[#71899A]" />
              <h2>04. Full-Stack System Layers</h2>
            </div>
            <span className="text-[11px] font-mono text-[#858A90] uppercase tracking-wider">
              End-to-End Implementation
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {project.systemLayers.map((layer, idx) => (
              <div
                key={layer.layer}
                className="p-4 rounded-xl border border-[#262B32] bg-[#14171A] space-y-2 hover:border-[#3E4652] transition-colors"
              >
                <span className="text-[#5A9A78] font-semibold uppercase tracking-wider text-[11px] font-mono block">
                  0{idx + 1}. {layer.layer}
                </span>
                <div className="text-xs font-mono font-bold text-[#F0EEE9] bg-[#181C21] px-2.5 py-1 rounded border border-[#2A303A]">
                  {layer.components}
                </div>
                <p className="text-xs text-[#9EA4AA] leading-relaxed pt-1">
                  {layer.details}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Interactive Engineering Evidence & Technical Demonstrations */}
      {['ocr-evaluator', 'design-automation', 'solace-ai', 'ask-aadil'].includes(project.slug) && (
        <section id="interactive-evidence" className="space-y-4 scroll-mt-28">
          {project.slug === 'ocr-evaluator' && <OcrEvaluationExplorer />}
          {project.slug === 'design-automation' && <CadModelViewer />}
          {project.slug === 'solace-ai' && <SolaceVideoShowcase />}
          {project.slug === 'ask-aadil' && <AskAadilEvaluationExplorer />}
        </section>
      )}

      {/* 05. Critical Engineering Decision */}
      {criticalDecision && (
        <section id="decision" className="p-6 rounded-xl border border-[#2A3542] bg-[#141A22] space-y-3 scroll-mt-28">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#58A6FF] font-semibold">
            <Sparkles className="w-4 h-4 text-[#58A6FF]" />
            <span>05. Critical Engineering Decision</span>
          </div>
          <h2 className="text-xl font-bold text-[#F0EEE9] font-serif">Critical Engineering Decision</h2>
          <p className="text-sm sm:text-base text-[#C8C6BF] leading-relaxed">
            {criticalDecision}
          </p>
        </section>
      )}

      {/* Engineering Evidence // Code Excerpts */}
      {project.codeEvidence && project.codeEvidence.length > 0 && (
        <section id="code-evidence" className="space-y-6 scroll-mt-28">
          <div className="flex items-center justify-between pb-2 border-b border-[#242930]">
            <div className="flex items-center gap-2 text-xl font-semibold text-[#F0EEE9] font-serif">
              <Binary className="w-5 h-5 text-[#5A9A78]" />
              <h2>Engineering Evidence // Code Excerpts</h2>
            </div>
            <span className="text-[11px] font-mono text-[#5A9A78] uppercase tracking-wider">
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
        <section id="failures" className="space-y-4 scroll-mt-28">
          <div className="flex items-center justify-between pb-2 border-b border-[#242930]">
            <div className="flex items-center gap-2 text-xl font-semibold text-[#F0EEE9] font-serif">
              <Flame className="w-5 h-5 text-[#D48A63]" />
              <h2>06. What Broke (Failure Analysis & Containment)</h2>
            </div>
            <span className="text-[11px] font-mono text-[#D48A63] uppercase tracking-wider">
              Empirical Defect Logs
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {whatBroke.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-[#2B231D] bg-[#161311] space-y-3"
              >
                <div className="flex items-center gap-2 text-[#D48A63] font-semibold text-sm">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#2B1F18] border border-[#472E22]">
                    Defect 0{idx + 1}
                  </span>
                  <span>{item.failure}</span>
                </div>
                <div className="space-y-1.5 text-xs text-[#C8C6BF] leading-relaxed">
                  <p><strong className="text-[#858A90] font-mono">Cause:</strong> {item.cause}</p>
                  <p><strong className="text-[#858A90] font-mono">Detection:</strong> {item.detection}</p>
                  <p><strong className="text-[#858A90] font-mono">Response:</strong> {item.response}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 07. What Became Deterministic */}
      {whatBecameDeterministic && (
        <section className="p-6 rounded-xl border border-[#234030] bg-[#131A16] space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#5A9A78] font-semibold">
            <Binary className="w-4 h-4" />
            <span>07. Authority Boundary</span>
          </div>
          <h2 className="text-xl font-bold text-[#F0EEE9] font-serif">What Became Deterministic</h2>
          <p className="text-sm text-[#C8C6BF] leading-relaxed font-mono text-xs sm:text-sm bg-[#0E1511] p-4 rounded-lg border border-[#1E3025]">
            {whatBecameDeterministic}
          </p>
        </section>
      )}

      {/* 08. Evidence & Ground Truth */}
      {evidence && evidence.length > 0 && (
        <section id="evidence" className="p-6 rounded-xl border border-[#262B32] bg-[#14171A] space-y-4 scroll-mt-28">
          <div className="flex items-center justify-between pb-2 border-b border-[#242930]">
            <div className="flex items-center gap-2 text-xl font-semibold text-[#F0EEE9] font-serif">
              <ShieldCheck className="w-5 h-5 text-[#5A9A78]" />
              <h2>08. Evidence & Verification Metrics</h2>
            </div>
            <span className="text-[11px] font-mono text-[#5A9A78] uppercase tracking-wider">
              Source Verified
            </span>
          </div>

          <ul className="grid sm:grid-cols-2 gap-3 pt-2">
            {evidence.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#C8C6BF] bg-[#181C21] p-3.5 rounded-lg border border-[#262B32]">
                <CheckCircle2 className="w-4 h-4 text-[#5A9A78] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 09. Engineering Decisions & Architectural Trade-offs */}
      {decisions && decisions.length > 0 ? (
        <EngineeringDecisions decisions={decisions} projectTitle={project.title} />
      ) : tradeoffs && tradeoffs.length > 0 ? (
        <section id="decisions" className="p-6 rounded-xl border border-[#262B32] bg-[#14171A] space-y-4 scroll-mt-28">
          <div className="flex items-center justify-between pb-2 border-b border-[#242930]">
            <div className="flex items-center gap-2 text-xl font-semibold text-[#F0EEE9] font-serif">
              <Scale className="w-5 h-5 text-[#71899A]" />
              <h2>09. Engineering Decisions & Trade-offs</h2>
            </div>
            <span className="text-[11px] font-mono text-[#71899A] uppercase tracking-wider">
              System Decisions
            </span>
          </div>

          <ul className="space-y-3 pt-2">
            {tradeoffs.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#C8C6BF] bg-[#181C21] p-3.5 rounded-lg border border-[#262B32]">
                <span className="text-xs font-mono text-[#5A9A78] font-bold shrink-0 mt-0.5">0{i + 1}.</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* 10. System Breakthrough & Engineering Delta */}
      {(breakthrough || delta) && (
        <section className="grid md:grid-cols-2 gap-6">
          {breakthrough && (
            <div className="p-6 rounded-xl border border-[#262B32] bg-[#14171A] space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#5A9A78] font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>What This Project Changed</span>
              </div>
              <h2 className="text-xl font-bold text-[#F0EEE9] font-serif">System Breakthrough</h2>
              <p className="text-sm text-[#C8C6BF] leading-relaxed">
                {breakthrough}
              </p>
            </div>
          )}

          {delta && (
            <div className="p-6 rounded-xl border border-[#262B32] bg-[#14171A] space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#71899A] font-semibold">
                <TrendingUp className="w-4 h-4" />
                <span>Engineering Delta</span>
              </div>
              <h2 className="text-xl font-bold text-[#F0EEE9] font-serif">Engineering Delta</h2>
              <p className="text-sm text-[#C8C6BF] leading-relaxed">
                {delta}
              </p>
            </div>
          )}
        </section>
      )}

      {/* 11 — Related Journal Entry & Timeline Progression */}
      <section className="p-6 rounded-xl border border-[#262B32] bg-[#14171A] space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#242930]">
          <div className="flex items-center gap-2 text-xl font-semibold text-[#F0EEE9] font-serif">
            <BookOpen className="w-5 h-5 text-[#71899A]" />
            <h2>Related Journal Entry & Timeline Context</h2>
          </div>
          <span className="text-[11px] font-mono text-[#71899A] uppercase tracking-wider">
            Traceability // Cross-Links
          </span>
        </div>
        <p className="text-sm text-[#9EA4AA] leading-relaxed">
          {chapter
            ? `This system's architectural evolution and empirical failures are analyzed in Chapter ${chapter.number} of the Engineering Journal.`
            : 'This system is documented across the chronological timeline and engineering archive.'}
        </p>
        <div className="flex flex-wrap gap-3 pt-2 font-mono text-xs">
          {chapter && (
            <Link
              href="/journal"
              className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#181C21] border border-[#2B3542] hover:bg-[#22272E] text-[#D8D6D0] hover:text-white transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#58A6FF]" />
              Journal Chapter {chapter.number}: {chapter.title} →
            </Link>
          )}
          <Link
            href="/experience"
            className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#181C21] border border-[#262B32] hover:bg-[#22272E] text-[#9EA4AA] hover:text-[#D8D6D0] transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-[#5A9A78]" />
            View Timeline Evolution →
          </Link>
        </div>
      </section>

      {/* Project Navigation Footer */}
      <footer className="pt-8 border-t border-[#242930] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
        {prevProject ? (
          <Link
            href={`/projects/${prevProject.slug}`}
            className="inline-flex items-center gap-2 text-[#9EA4AA] hover:text-[#F0EEE9] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Previous: {prevProject.title}
          </Link>
        ) : (
          <span className="text-[#686E77]">Start of Catalog</span>
        )}

        <Link
          href="/projects"
          className="px-4 py-2 rounded bg-[#181C21] border border-[#262B32] text-[#5A9A78] hover:text-[#78B896] uppercase tracking-wider transition-colors font-semibold"
        >
          [ Complete Projects Directory ]
        </Link>

        {nextProject ? (
          <Link
            href={`/projects/${nextProject.slug}`}
            className="inline-flex items-center gap-2 text-[#9EA4AA] hover:text-[#F0EEE9] transition-colors"
          >
            Next: {nextProject.title} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        ) : (
          <span className="text-[#686E77]">End of Catalog</span>
        )}
      </footer>
    </article>
  )
}
