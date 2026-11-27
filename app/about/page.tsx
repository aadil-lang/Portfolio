import React from 'react'
import Link from 'next/link'
import { profile } from '@/data/profile'
import { structuredProfile } from '@/data/canonical/structuredProfile'
import {
  User,
  Briefcase,
  GraduationCap,
  FileText,
  Github,
  Linkedin,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Workflow,
  Terminal,
  Database,
  ArrowRight,
  ExternalLink,
  MapPin,
  Calendar
} from 'lucide-react'

export const metadata = {
  title: 'About the Engineer // AADIL BUILDS — Mohemmed Aadil Khurshid',
  description:
    'Professional profile, Wayground engineering tenure, educational background, core capabilities, and verified contact channels of Mohemmed Aadil Khurshid.'
}

export default function AboutPage() {
  return (
    <div className="space-y-12 pb-20 max-w-5xl mx-auto px-4 sm:px-6">
      {/* ------------------------------------------------------------- */}
      {/* SPACE 05 HEADER & PROFESSIONAL IDENTITY                       */}
      {/* ------------------------------------------------------------- */}
      <section className="space-y-4 pt-4 sm:pt-6 border-b border-[#262B32] pb-8">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-widest font-mono text-[#78C29A] font-semibold flex items-center gap-1.5">
            <User className="w-4 h-4 text-[#78C29A]" />
            SPACE 05 // ABOUT THE ENGINEER
          </span>
          <span className="text-[#5A6872] text-xs font-mono">•</span>
          <span className="text-[11px] font-mono text-[#78C29A] uppercase tracking-wider font-bold">
            VERIFIED PROFESSIONAL PROFILE
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight text-[#F0EEE9] leading-tight">
            Mohemmed Aadil Khurshid
          </h1>
          <p className="text-base sm:text-xl font-mono text-[#78C29A] font-semibold">
            AI Systems Engineer | Python | Generative AI | Agentic Systems
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#8BA0B2] pt-1">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#5A9A78]" />
              {profile.location}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-[#78C29A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#78C29A] animate-pulse" />
              Available for Full-Time AI Engineering Roles (Remote &amp; Hybrid)
            </span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-[#C8C6BF] leading-relaxed max-w-3xl font-sans pt-2">
          {profile.bio}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-3 font-mono text-xs">
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#5A9A78] bg-[#1A3326] hover:bg-[#224433] text-[#A3E5C2] hover:text-white font-semibold transition-all shadow-xs"
          >
            <FileText className="w-4 h-4 text-[#78C29A]" />
            <span>Download Resume (PDF)</span>
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#2B3542] bg-[#161B21] hover:bg-[#202731] text-[#F0EEE9] transition-colors"
          >
            <Github className="w-4 h-4 text-[#71899A]" />
            <span>GitHub Profile</span>
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#2B3542] bg-[#161B21] hover:bg-[#202731] text-[#F0EEE9] transition-colors"
          >
            <Linkedin className="w-4 h-4 text-[#0077B5]" />
            <span>LinkedIn Profile</span>
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#3E4752] bg-[#1E232A] hover:bg-[#282F38] text-[#F0EEE9] transition-colors"
          >
            <Mail className="w-4 h-4 text-[#78C29A]" />
            <span>Get in Touch →</span>
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 1: WAYGROUND PROFESSIONAL ENGINEERING TENURE           */}
      {/* ------------------------------------------------------------- */}
      <section className="space-y-6">
        <div className="border-b border-[#242930] pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Briefcase className="w-4 h-4 text-[#78C29A]" />
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#F0EEE9]">
              Professional Experience: Wayground
            </h2>
          </div>
          <span className="text-xs font-mono text-[#78C29A] font-semibold">
            Jan 2024 – Jul 2026 (2 Yrs 7 Mos)
          </span>
        </div>

        <div className="space-y-6">
          {/* Role 1: AI Engineer */}
          <div className="p-6 rounded-2xl border border-[#262B32] bg-[#14171A] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#21262D] pb-3">
              <div>
                <span className="text-[10px] font-mono text-[#78C29A] uppercase tracking-wider font-bold block">
                  PRIMARY TECHNICAL TENURE
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-serif text-[#F0EEE9]">
                  AI Engineer — AI/ML Team
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#8BA0B2]">
                <Calendar className="w-3.5 h-3.5 text-[#5A9A78]" />
                <span>January 2026 – July 2026 (Full-Time)</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#9EA4AA] leading-relaxed">
              Engineered end-to-end production pipelines transforming raw curriculum assets into structured, verifiable multi-modal learning resources. Combined Python/FastAPI backend services with headless TeX Live compilers, 2D maze graph backtracking, and strict AST schema validation.
            </p>

            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#F0EEE9] font-bold block">
                Shipped Systems &amp; Technical Contributions:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-[#181C21] border border-[#2B3542] space-y-1.5">
                  <span className="text-xs font-serif font-bold text-[#F0EEE9] block">
                    Curriculum Transformation Engine
                  </span>
                  <p className="text-[11px] text-[#8BA0B2] leading-relaxed">
                    Asynchronous Map-Reduce pipeline validating 80+ schema rules with zero CSV format drift.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#181C21] border border-[#2B3542] space-y-1.5">
                  <span className="text-xs font-serif font-bold text-[#F0EEE9] block">
                    AI Worksheets Generator
                  </span>
                  <p className="text-[11px] text-[#8BA0B2] leading-relaxed">
                    Headless pdflatex/TikZ compiler executing 2D maze generation algorithms with 300-DPI renders.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#181C21] border border-[#2B3542] space-y-1.5">
                  <span className="text-xs font-serif font-bold text-[#F0EEE9] block">
                    US Mathematics Item Bank
                  </span>
                  <p className="text-[11px] text-[#8BA0B2] leading-relaxed">
                    Bounded image-generation workstream and geometry stabilization for Upper Elementary items.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Role 2: Subject Matter Expert */}
          <div className="p-6 rounded-2xl border border-[#262B32] bg-[#14171A] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#21262D] pb-3">
              <div>
                <span className="text-[10px] font-mono text-[#58A6FF] uppercase tracking-wider font-bold block">
                  FOUNDATIONAL TECHNICAL TENURE
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-serif text-[#F0EEE9]">
                  Subject Matter Expert — Mathematics
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#8BA0B2]">
                <Calendar className="w-3.5 h-3.5 text-[#5A9A78]" />
                <span>January 2024 – December 2025 (Full-Time)</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#9EA4AA] leading-relaxed">
              Designed the canonical domain taxonomy and deterministic evaluation layer for the <strong className="text-[#F0EEE9]">VM Copy Question Generator</strong>, implementing local TypeScript mathematical validation executing in under 1 ms ($0 runtime cost) before delegating to LLMs.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 2: INDEPENDENT ENGINEERING & OPEN-SOURCE RESEARCH     */}
      {/* ------------------------------------------------------------- */}
      <section className="space-y-6">
        <div className="border-b border-[#242930] pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Terminal className="w-4 h-4 text-[#78C29A]" />
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#F0EEE9]">
              Independent Engineering &amp; Research
            </h2>
          </div>
          <span className="text-xs font-mono text-[#78C29A] font-semibold">
            August 2026 – Present
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-[#262B32] bg-[#14171A] space-y-2">
            <span className="text-[10px] font-mono uppercase text-[#78C29A] font-bold block">
              ENTERPRISE ASSISTANTS &amp; MCP
            </span>
            <h3 className="text-base font-serif font-bold text-[#F0EEE9]">
              Archie &amp; FastMCP Tool Sandboxes
            </h3>
            <p className="text-xs text-[#9EA4AA] leading-relaxed">
              Enterprise HR/IT agent coupling LangGraph state-machines with isolated FastMCP tool execution over PostgreSQL Row Level Security.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[#262B32] bg-[#14171A] space-y-2">
            <span className="text-[10px] font-mono uppercase text-[#D48A63] font-bold block">
              MOBILE COMPANION ARCHITECTURE
            </span>
            <h3 className="text-base font-serif font-bold text-[#F0EEE9]">
              Solace AI (React Native &amp; FastAPI)
            </h3>
            <p className="text-xs text-[#9EA4AA] leading-relaxed">
              Pre-LLM crisis safety interceptors (&lt;2ms), SSE token streaming, consent-gated emotional memory, and single-POST ambiguous delivery guards.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[#262B32] bg-[#14171A] space-y-2">
            <span className="text-[10px] font-mono uppercase text-[#58A6FF] font-bold block">
              PHYSICAL CAD SOLVERS
            </span>
            <h3 className="text-base font-serif font-bold text-[#F0EEE9]">
              Engineering Design Automation (EDA)
            </h3>
            <p className="text-xs text-[#9EA4AA] leading-relaxed">
              Converting natural language specs into verified 3D STEP BRep solid geometry and ASME SVG blueprints with 0.0000% CAD volume error.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[#262B32] bg-[#14171A] space-y-2">
            <span className="text-[10px] font-mono uppercase text-[#BB86FC] font-bold block">
              EMPIRICAL EVALUATION
            </span>
            <h3 className="text-base font-serif font-bold text-[#F0EEE9]">
              Multimodal OCR Risk Evaluator
            </h3>
            <p className="text-xs text-[#9EA4AA] leading-relaxed">
              5-axis degradation curve stress-testing with Levenshtein CER/WER auditing and Fisher covariance uncertainty abstention.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 3: FORMAL EDUCATION & CREDENTIALS                     */}
      {/* ------------------------------------------------------------- */}
      <section className="space-y-4">
        <div className="border-b border-[#242930] pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="w-4 h-4 text-[#78C29A]" />
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#F0EEE9]">
              Education &amp; Academic Background
            </h2>
          </div>
        </div>

        <div className="p-5 rounded-xl border border-[#262B32] bg-[#14171A] space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-serif font-bold text-[#F0EEE9]">
              {structuredProfile.education[0].degree}
            </h3>
            <span className="text-xs font-mono text-[#78C29A]">
              Graduated {structuredProfile.education[0].year}
            </span>
          </div>
          <p className="text-xs font-mono text-[#8BA0B2]">
            {structuredProfile.education[0].institution}
          </p>
          <p className="text-xs text-[#9EA4AA] leading-relaxed pt-1">
            Foundation in mechanical systems, thermodynamics, differential calculus, kinematics, and computational modeling—forming the structural intuition behind deterministic physical solvers and verification harnesses.
          </p>
        </div>
      </section>
    </div>
  )
}
