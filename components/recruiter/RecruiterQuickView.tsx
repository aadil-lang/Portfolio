import React from 'react'
import Link from 'next/link'
import {
  FileText,
  Mail,
  Github,
  Linkedin,
  Terminal,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Briefcase,
  Layers,
  Cpu,
  Sparkles,
  ExternalLink,
  Download,
  AlertCircle
} from 'lucide-react'
import { recruiterProfile } from '@/data/recruiter/recruiterProfile'

export default function RecruiterQuickView() {
  return (
    <div className="min-h-screen bg-[#101316] text-[#D8D6D0] py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* ============================================================= */}
        {/* SECTION A: CANDIDATE IDENTITY & RAPID ACTIONS                 */}
        {/* ============================================================= */}
        <section
          aria-labelledby="recruiter-identity-heading"
          className="p-6 sm:p-8 rounded-xl bg-[#14171A] border border-[#262B32] shadow-lg relative overflow-hidden"
        >
          {/* Subtle Ambient Accent Glow */}
          <div
            className="absolute top-0 right-0 w-72 h-72 bg-[#5A9A78]/5 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 space-y-6">
            {/* Badges Bar */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18231C] border border-[#5A9A78]/40 text-[#78C29A] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#5A9A78] animate-pulse" />
                {recruiterProfile.availability}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#1A1D22] border border-[#2B313A] text-[#9EA4AA]">
                📍 {recruiterProfile.location}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#1A1D22] border border-[#2B313A] text-[#9EA4AA]">
                ⏱️ 30-Second Executive Brief
              </span>
            </div>

            {/* Core Titles */}
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <h1
                  id="recruiter-identity-heading"
                  className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F0EEE9] font-serif"
                >
                  {recruiterProfile.name}
                </h1>
                <span className="text-xs font-mono text-[#71899A] uppercase tracking-wider">
                  Target: Senior / Staff AI Systems Engineer
                </span>
              </div>
              <p className="text-lg sm:text-xl font-mono text-[#5A9A78] font-semibold">
                {recruiterProfile.headline}
              </p>
              <p className="text-xs sm:text-sm font-mono text-[#8C939D]">
                {recruiterProfile.supportingPositioning}
              </p>
            </div>

            {/* Executive Summary */}
            <p className="text-sm sm:text-base text-[#C8C6BF] leading-relaxed max-w-4xl font-serif">
              {recruiterProfile.summary}
            </p>

            {/* Quick Tenure Metric Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 font-mono text-xs">
              <div className="p-3 rounded-lg bg-[#181C21] border border-[#2A2F36]">
                <span className="text-[10px] uppercase text-[#71899A] block font-bold">Total Experience</span>
                <span className="text-[#F0EEE9] font-semibold text-sm">~4 Years Professional</span>
                <span className="text-[10px] text-[#6E7681] block mt-0.5">May 2021 – July 2026</span>
              </div>
              <div className="p-3 rounded-lg bg-[#181C21] border border-[#2A2F36]">
                <span className="text-[10px] uppercase text-[#71899A] block font-bold">Dedicated AI Engineering</span>
                <span className="text-[#78C29A] font-semibold text-sm">~1 Year Dedicated</span>
                <span className="text-[10px] text-[#6E7681] block mt-0.5">Production LLMs & Agents</span>
              </div>
              <div className="p-3 rounded-lg bg-[#181C21] border border-[#2A2F36]">
                <span className="text-[10px] uppercase text-[#71899A] block font-bold">Continuous Wayground Tenure</span>
                <span className="text-[#F0EEE9] font-semibold text-sm">2 Years 7 Months</span>
                <span className="text-[10px] text-[#6E7681] block mt-0.5">Jan 2024 – Jul 2026</span>
              </div>
              <div className="p-3 rounded-lg bg-[#181C21] border border-[#2A2F36]">
                <span className="text-[10px] uppercase text-[#71899A] block font-bold">Current Focus</span>
                <span className="text-[#D8D6D0] font-semibold text-sm">Independent Research</span>
                <span className="text-[10px] text-[#6E7681] block mt-0.5">Aug 2026 – Present</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
              <a
                href={recruiterProfile.contact.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#5A9A78] hover:bg-[#68AA86] text-[#0D1510] font-bold transition-colors shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume (PDF)</span>
              </a>

              <Link
                href={recruiterProfile.contact.contactRoute}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#3E4652] bg-[#1E232A] hover:bg-[#282F38] text-[#F0EEE9] font-medium transition-colors"
              >
                <Mail className="w-4 h-4 text-[#71899A]" />
                <span>Contact Aadil</span>
              </Link>

              <a
                href={`mailto:${recruiterProfile.contact.email}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#2A2F36] bg-[#16191D] hover:bg-[#1E2228] text-[#C8C6BF] hover:text-white transition-colors"
                title={`Email directly: ${recruiterProfile.contact.email}`}
              >
                <span className="text-[#5A9A78]">@</span>
                <span>{recruiterProfile.contact.email}</span>
              </a>

              <a
                href={recruiterProfile.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg border border-[#2A2F36] bg-[#16191D] hover:bg-[#1E2228] text-[#C8C6BF] hover:text-white transition-colors"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4 text-[#0077B5]" />
                <span>LinkedIn</span>
              </a>

              <a
                href={recruiterProfile.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg border border-[#2A2F36] bg-[#16191D] hover:bg-[#1E2228] text-[#C8C6BF] hover:text-white transition-colors"
                title="GitHub Profile"
              >
                <Github className="w-4 h-4 text-[#9EA4AA]" />
                <span>GitHub</span>
              </a>

              <Link
                href="/systems"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg border border-[#2A2F36] bg-[#16191D] hover:bg-[#1E2228] text-[#9EA4AA] hover:text-[#D8D6D0] transition-colors"
              >
                <Terminal className="w-4 h-4 text-[#71899A]" />
                <span>Full Systems Archive →</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* SECTION B: 6 CORE ENGINEERING CAPABILITIES                    */}
        {/* ============================================================= */}
        <section aria-labelledby="recruiter-capabilities-heading" className="space-y-4">
          <div className="border-b border-[#242930] pb-2 flex items-baseline justify-between">
            <h2
              id="recruiter-capabilities-heading"
              className="text-xl sm:text-2xl font-bold tracking-tight text-[#F0EEE9] font-serif flex items-center gap-2"
            >
              <Cpu className="w-5 h-5 text-[#5A9A78]" />
              <span>Core Engineering Capabilities</span>
            </h2>
            <span className="text-xs font-mono text-[#71899A]">
              Architecture, Tooling & Verification
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recruiterProfile.capabilities.map((cap, idx) => (
              <div
                key={idx}
                className="p-5 rounded-lg bg-[#14171A] border border-[#262B32] hover:border-[#38414D] transition-colors space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <h3 className="font-serif font-bold text-[#F0EEE9] text-base">
                    {cap.title}
                  </h3>
                  <p className="text-xs text-[#9EA4AA] leading-relaxed font-sans">
                    {cap.description}
                  </p>
                </div>
                <div className="pt-2 border-t border-[#20252C] flex flex-wrap gap-1.5 font-mono text-[11px]">
                  {cap.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded bg-[#1A1F26] text-[#78C29A] border border-[#2B3542]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================= */}
        {/* SECTION C: 4 FLAGSHIP PROJECTS & VERIFIED OUTCOMES            */}
        {/* ============================================================= */}
        <section aria-labelledby="recruiter-projects-heading" className="space-y-4">
          <div className="border-b border-[#242930] pb-2 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <h2
              id="recruiter-projects-heading"
              className="text-xl sm:text-2xl font-bold tracking-tight text-[#F0EEE9] font-serif flex items-center gap-2"
            >
              <Layers className="w-5 h-5 text-[#5A9A78]" />
              <span>Curated Flagship Systems</span>
            </h2>
            <span className="text-xs font-mono text-[#71899A]">
              Evidence-backed case studies with qualified outcomes
            </span>
          </div>

          <div className="space-y-4">
            {recruiterProfile.featuredProjects.map((project) => (
              <article
                key={project.id}
                className="p-6 rounded-xl bg-[#14171A] border border-[#262B32] hover:border-[#3E4652] transition-colors space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-mono text-[#5A9A78] uppercase tracking-wider block font-semibold">
                      {project.positioning}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold font-serif text-[#F0EEE9]">
                      <Link
                        href={project.route}
                        className="hover:text-[#5A9A78] transition-colors inline-flex items-center gap-1.5"
                      >
                        <span>{project.name}</span>
                        <ArrowRight className="w-4 h-4 text-[#71899A]" />
                      </Link>
                    </h3>
                  </div>
                  <Link
                    href={project.route}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1E232A] hover:bg-[#282F38] border border-[#343B45] text-xs font-mono text-[#D8D6D0] transition-colors self-start"
                  >
                    <span>Read Deep-Dive</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <p className="text-xs sm:text-sm text-[#C8C6BF] leading-relaxed">
                  {project.contribution}
                </p>

                {/* Technical Highlights */}
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#71899A] font-bold block">
                    Engineering Architecture Highlights
                  </span>
                  <ul className="space-y-1 text-xs text-[#9EA4AA]">
                    {project.technicalHighlights.map((hl, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <span className="text-[#5A9A78] font-bold leading-tight">›</span>
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Verified Outcome & Qualification Note */}
                <div className="p-3 rounded-lg bg-[#181C21] border border-[#2A2F36] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#78C29A] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#5A9A78]" />
                    <span>Verified Result: {project.verifiedOutcome}</span>
                  </div>
                  <p className="text-[11px] font-mono text-[#8C939D] pl-6">
                    Evidence Scope: {project.outcomeQualification}
                  </p>
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
                  {project.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded bg-[#1A1F26] text-[#9EA4AA] border border-[#262B32]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {/* Secondary Projects Bar */}
          <div className="p-4 rounded-lg bg-[#14171A] border border-[#262B32] flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
            <span className="text-[#9EA4AA]">
              Additional 7 Case Studies across autonomous ETL, visual layout engines, and hardware simulators:
            </span>
            <Link
              href="/systems"
              className="inline-flex items-center gap-1.5 text-[#5A9A78] hover:text-[#78C29A] font-bold"
            >
              <span>Explore All 11 Systems in Archive</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* ============================================================= */}
        {/* SECTION D: CAREER PROGRESSION & EXPERIENCE CHRONOLOGY         */}
        {/* ============================================================= */}
        <section aria-labelledby="recruiter-experience-heading" className="space-y-4">
          <div className="border-b border-[#242930] pb-2 flex items-baseline justify-between">
            <h2
              id="recruiter-experience-heading"
              className="text-xl sm:text-2xl font-bold tracking-tight text-[#F0EEE9] font-serif flex items-center gap-2"
            >
              <Briefcase className="w-5 h-5 text-[#5A9A78]" />
              <span>Career Chronology & Progression</span>
            </h2>
            <Link
              href="/experience"
              className="text-xs font-mono text-[#5A9A78] hover:text-[#78C29A] inline-flex items-center gap-1"
            >
              <span>Full Timeline Spine</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Transition Narrative Callout */}
          <div className="p-4 rounded-lg bg-[#181C21] border border-[#2A2F36] text-xs text-[#C8C6BF] leading-relaxed">
            <span className="font-mono text-[#5A9A78] font-bold uppercase tracking-wider block mb-1">
              Transition Narrative & Domain Grounding
            </span>
            {recruiterProfile.transitionNarrative}
          </div>

          <div className="space-y-3">
            {recruiterProfile.experience.map((exp, idx) => (
              <div
                key={idx}
                className="p-5 rounded-lg bg-[#14171A] border border-[#262B32] space-y-2.5"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h3 className="font-serif font-bold text-[#F0EEE9] text-base">
                      {exp.role}
                    </h3>
                    <span className="text-xs font-mono text-[#5A9A78]">
                      {exp.organization}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#71899A]">
                    {exp.period}
                  </span>
                </div>

                <p className="text-xs text-[#9EA4AA] leading-relaxed">
                  {exp.summary}
                </p>

                <ul className="space-y-1 text-xs text-[#C8C6BF] pt-1">
                  {exp.highlights.map((hl, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2">
                      <span className="text-[#5A9A78] font-bold">›</span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================= */}
        {/* SECTION E: DIRECT CONTACT & CONVERSATIONAL EVALUATION         */}
        {/* ============================================================= */}
        <section
          aria-labelledby="recruiter-contact-heading"
          className="p-6 sm:p-8 rounded-xl bg-[#14171A] border border-[#262B32] space-y-6 text-center"
        >
          <div className="space-y-2 max-w-xl mx-auto">
            <h2
              id="recruiter-contact-heading"
              className="text-2xl sm:text-3xl font-bold font-serif text-[#F0EEE9]"
            >
              Let’s Connect
            </h2>
            <p className="text-xs sm:text-sm text-[#9EA4AA] font-sans">
              Open to full-time AI Systems Engineer, Applied AI Engineer, and Staff AI Architect roles.
              Available for interviews and technical discussions.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
            <a
              href={recruiterProfile.contact.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#5A9A78] hover:bg-[#68AA86] text-[#0D1510] font-bold transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Resume PDF</span>
            </a>

            <a
              href={`mailto:${recruiterProfile.contact.email}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#3E4652] bg-[#1E232A] hover:bg-[#282F38] text-[#F0EEE9] font-medium transition-colors"
            >
              <Mail className="w-4 h-4 text-[#71899A]" />
              <span>{recruiterProfile.contact.email}</span>
            </a>

            <a
              href={recruiterProfile.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#2A2F36] bg-[#16191D] hover:bg-[#1E2228] text-[#C8C6BF] hover:text-white transition-colors"
            >
              <Linkedin className="w-4 h-4 text-[#0077B5]" />
              <span>LinkedIn</span>
            </a>

            <a
              href={recruiterProfile.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#2A2F36] bg-[#16191D] hover:bg-[#1E2228] text-[#C8C6BF] hover:text-white transition-colors"
            >
              <Github className="w-4 h-4 text-[#9EA4AA]" />
              <span>GitHub</span>
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#2A2F36] bg-[#16191D] hover:bg-[#1E2228] text-[#9EA4AA] hover:text-[#D8D6D0] transition-colors"
            >
              <span>Contact Form & PGP</span>
            </Link>
          </div>

          <div className="pt-4 border-t border-[#20252C] flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#6E7681]">
            <span>Privacy Note: Direct email and LinkedIn preferred. Phone number omitted from public web pages.</span>
          </div>
        </section>
      </div>
    </div>
  )
}

