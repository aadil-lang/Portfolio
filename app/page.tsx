import React from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { profile } from '../data/profile'
import {
  Compass,
  BookOpen,
  Terminal,
  ArrowRight,
  Sparkles,
  FileText,
  Mail,
  Layers,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Github,
  Linkedin,
  ExternalLink,
  Briefcase,
  UserCheck,
  Code2,
  Workflow,
  Database,
  Binary,
  Zap,
  GitCompare
} from 'lucide-react'
import { HomepageAskAadilCta } from '../components/AskAadil/HomepageAskAadilCta'
import { HeroBackground } from '../components/HeroBackground'

const EngineeringCube = dynamic(() => import('../components/EngineeringCube'), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden="true"
      className="w-full max-w-[340px] h-[340px] mx-auto rounded-xl border border-[#2A2F36] bg-[#14171A]/60 animate-pulse"
    />
  )
})

export const metadata = {
  title: 'Mohemmed Aadil Khurshid | AI Engineer — Python, Agentic Systems & Full-Stack',
  description:
    'Portfolio of Mohemmed Aadil Khurshid, AI Engineer specializing in Python, FastAPI, LangGraph agentic systems, RAG pipelines, and deterministic verification harnesses.'
}

export default function HomePage() {
  return (
    <div className="space-y-20 pb-16">
      {/* ------------------------------------------------------------- */}
      {/* SECTION 01 — HERO & PROFESSIONAL POSITIONING                  */}
      {/* ------------------------------------------------------------- */}
      <section className="relative max-w-6xl mx-auto pt-6 sm:pt-12 px-4 overflow-hidden rounded-2xl border border-[#262B32]/60 bg-[#121518]/90 shadow-2xl">
        {/* Animated Cybernetic Environment Background */}
        <HeroBackground />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center py-6 sm:py-10">
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Availability Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16191D]/90 border border-[#2A2F36] text-[#9EA4AA] text-xs font-mono backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#5A9A78] animate-pulse" />
              <span className="font-semibold text-[#D8D6D0]">AVAILABLE FOR OPPORTUNITIES</span>
              <span className="text-[#686E77]">//</span>
              <span>REMOTE & HYDERABAD</span>
            </div>

            {/* Disciplined Primary Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl xl:text-5xl font-bold tracking-tight text-[#F0EEE9] font-serif leading-tight">
                AI Systems Engineer
              </h1>
              <p className="text-sm sm:text-base md:text-lg font-mono tracking-wide text-[#78C29A] font-semibold">
                Python | LLM & Agentic Systems | Full-Stack
              </p>
            </div>

            {/* Technical Value Proposition */}
            <blockquote className="text-sm sm:text-base text-[#C8C6BF] font-serif italic border-y border-[#262B32]/80 py-3.5 max-w-2xl mx-auto lg:mx-0 leading-relaxed bg-[#14171A]/40 px-3 rounded">
              &ldquo;I build complete software systems around AI: stateful multi-agent orchestration, concurrent Python/FastAPI backend pipelines, grounded RAG architectures, and deterministic verification harnesses.&rdquo;
            </blockquote>

            {/* Engineering Trajectory Progression */}
            <div className="p-3 rounded-lg bg-[#14171A]/80 border border-[#262B32] max-w-3xl mx-auto lg:mx-0 shadow-xs backdrop-blur-sm">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#71899A] block mb-1.5 font-bold">
                Engineering Trajectory
              </span>
              <div className="text-[10.5px] sm:text-xs font-mono font-medium text-[#C8C6BF] flex flex-wrap items-center justify-center lg:justify-start gap-1.5">
                <span className="text-[#9EA4AA]">Mechanical Engineering</span>
                <span className="text-[#5A6066]">→</span>
                <span className="text-[#9EA4AA]">Python & Full-Stack</span>
                <span className="text-[#5A6066]">→</span>
                <span className="text-[#9EA4AA]">AI Applications & RAG</span>
                <span className="text-[#5A6066]">→</span>
                <span className="text-[#9EA4AA]">Deterministic Evaluation</span>
                <span className="text-[#5A6066]">→</span>
                <span className="text-[#78C29A] font-bold">Governed Agentic Systems</span>
              </div>
            </div>

            {/* Focused Primary Hero CTAs */}
            <div className="pt-2 space-y-3">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 font-mono text-xs">
                {/* 1. Explore Projects (Primary Action) */}
                <Link
                  href="/systems"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#5A9A78] bg-[#1A3326] hover:bg-[#224433] text-[#A3E5C2] hover:text-white font-semibold transition-all shadow-[0_0_15px_rgba(90,154,120,0.2)]"
                >
                  <Terminal className="w-4 h-4 text-[#78C29A]" />
                  <span>Explore Projects →</span>
                </Link>

                {/* 2. View Resume (Secondary Action) */}
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#3E4652] bg-[#1E232A] hover:bg-[#282F38] text-[#F0EEE9] hover:text-white font-medium transition-colors shadow-xs"
                >
                  <FileText className="w-4 h-4 text-[#71899A]" />
                  <span>View Resume (PDF)</span>
                </a>
              </div>

              {/* Recruiter Quick View Bridge Link */}
              <div className="text-center lg:text-left pt-0.5">
                <Link
                  href="/recruiter"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#9EA4AA] hover:text-[#78C29A] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#5A9A78] rounded py-0.5"
                >
                  <span>Short on time? View the 30-second executive summary</span>
                  <span className="text-[#5A9A78] font-semibold">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Interactive 3D Engineering Cube Stage */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <EngineeringCube />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 02 — TECHNICAL EXPERTISE & COMPETENCY MATRIX          */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-5xl mx-auto px-4 space-y-6">
        <div className="border-b border-[#242930] pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs uppercase tracking-wider font-mono text-[#5A9A78] block">
              STACK & CAPABILITIES // TAXONOMY
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F0EEE9] font-serif">
              Technical Expertise
            </h2>
          </div>
          <span className="text-xs font-mono text-[#71899A]">
            Verified Architectures & Deterministic Systems
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1: Agentic Systems */}
          <div className="p-5 rounded-xl border border-[#262B32] bg-[#14171A] space-y-3">
            <div className="flex items-center gap-2">
              <Workflow className="w-4 h-4 text-[#5A9A78]" />
              <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-[#F0EEE9]">
                Agentic Systems & Orchestration
              </h3>
            </div>
            <p className="text-xs text-[#9EA4AA] leading-relaxed">
              Cyclic state machines, supervisor routing, bounded execution retry budgets, and Human-in-the-Loop approval queues for high-stakes action execution.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['LangGraph', 'StateGraph', 'Multi-Agent Workflows', 'Cyclic Recovery', 'HITL Gates', 'Bounded Retries'].map((chip) => (
                <span key={chip} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#181C21] text-[#A2B4C2] border border-[#2B3542]">
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2: Python Backend */}
          <div className="p-5 rounded-xl border border-[#262B32] bg-[#14171A] space-y-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#5A9A78]" />
              <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-[#F0EEE9]">
                Python & Backend Engineering
              </h3>
            </div>
            <p className="text-xs text-[#9EA4AA] leading-relaxed">
              Asynchronous APIs, strict Pydantic v2 schemas, database migrations, connection pooling, and multi-tenant Row Level Security (RLS).
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Python 3.12', 'FastAPI', 'Pydantic v2', 'Asyncio', 'PostgreSQL', 'Supabase RLS', 'Redis', 'Docker'].map((chip) => (
                <span key={chip} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#181C21] text-[#A2B4C2] border border-[#2B3542]">
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* Card 3: RAG & Hybrid Retrieval */}
          <div className="p-5 rounded-xl border border-[#262B32] bg-[#14171A] space-y-3">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-[#5A9A78]" />
              <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-[#F0EEE9]">
                RAG & Retrieval Systems
              </h3>
            </div>
            <p className="text-xs text-[#9EA4AA] leading-relaxed">
              Decoupled multi-source retrieval maintaining source boundaries, primary SEC EDGAR 10-K/10-Q filing parsers, and zero-fabrication citations.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Hybrid BM25', 'Vector Search', 'SEC EDGAR', 'Gemini Embeddings', 'MongoDB Atlas', 'Epistemic Grounding'].map((chip) => (
                <span key={chip} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#181C21] text-[#A2B4C2] border border-[#2B3542]">
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* Card 4: AI Evaluation & Reliability */}
          <div className="p-5 rounded-xl border border-[#262B32] bg-[#14171A] space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#5A9A78]" />
              <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-[#F0EEE9]">
                AI Evaluation & Reliability
              </h3>
            </div>
            <p className="text-xs text-[#9EA4AA] leading-relaxed">
              Moving beyond single-number accuracy: Character/Word Error Rate (CER/WER Levenshtein), 5-axis image degradation stress tests, and Fisher uncertainty abstention.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Playwright E2E', 'CER / WER Levenshtein', 'Degradation Curves', 'Fisher Covariance', 'Tesseract OCR', 'SHA-256 Ledger'].map((chip) => (
                <span key={chip} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#181C21] text-[#A2B4C2] border border-[#2B3542]">
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* Card 5: Full-Stack & Mobile AI */}
          <div className="p-5 rounded-xl border border-[#262B32] bg-[#14171A] space-y-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#5A9A78]" />
              <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-[#F0EEE9]">
                Full-Stack & Mobile AI
              </h3>
            </div>
            <p className="text-xs text-[#9EA4AA] leading-relaxed">
              Cross-platform React Native / Expo 58 with SSE token streaming, chunked SecureStore offline persistence, Next.js 16, and clean architecture layered controllers.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['React Native (Expo 58)', 'Next.js 16', 'React 19', 'TypeScript 5', 'SSE Streaming', 'Zustand', 'Tailwind CSS'].map((chip) => (
                <span key={chip} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#181C21] text-[#A2B4C2] border border-[#2B3542]">
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* Card 6: Deterministic Physical Solvers */}
          <div className="p-5 rounded-xl border border-[#262B32] bg-[#14171A] space-y-3">
            <div className="flex items-center gap-2">
              <Binary className="w-4 h-4 text-[#5A9A78]" />
              <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-[#F0EEE9]">
                Deterministic Solvers & CAD
              </h3>
            </div>
            <p className="text-xs text-[#9EA4AA] leading-relaxed">
              Decoupling LLM semantic parsing from physical truth: closed-form Saint-Venant torsion equations, OpenCascade BRep 3D solid geometry, and TeX Live compilers.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['OpenCascade (PythonOCC)', '3D STEP BRep', 'SVG Blueprints', 'TeX Live (pdflatex)', 'Poppler 300-DPI', '2D Backtracking'].map((chip) => (
                <span key={chip} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#181C21] text-[#A2B4C2] border border-[#2B3542]">
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 03 — FEATURED ENGINEERING SYSTEMS (PRIORITIZED 4-PACK)*/}
      {/* ------------------------------------------------------------- */}
      <section id="featured-systems" className="max-w-5xl mx-auto px-4 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#242930] pb-3">
          <div>
            <span className="text-xs uppercase tracking-wider font-mono text-[#5A9A78] block">
              FEATURED // CORE SYSTEMS
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F0EEE9] font-serif">
              Flagship Engineering Projects
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/architecture"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#58A6FF] hover:text-[#79B8FF] transition-colors font-semibold"
            >
              <Workflow className="w-3.5 h-3.5 text-[#58A6FF]" />
              <span>Interactive Architecture Explorer →</span>
            </Link>
            <Link
              href="/systems"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#5A9A78] hover:text-[#78B896] transition-colors font-semibold"
            >
              <span>Systems Archive (11) →</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Ask Aadil */}
          <Link
            href="/projects/ask-aadil"
            className="p-5 rounded-xl bg-[#14171A] hover:bg-[#181C21] border border-[#262B32] hover:border-[#388BFD]/50 transition-all group flex flex-col justify-between space-y-4 cursor-pointer"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="px-2 py-0.5 rounded bg-[#162332] text-[#58A6FF] font-semibold border border-[#388BFD]/40">
                  INDEPENDENT PERSONAL PROJECT
                </span>
                <span className="text-[#858A90] font-semibold">172 Verified Tests</span>
              </div>
              <h3 className="font-serif font-bold text-lg text-[#F0EEE9] group-hover:text-white transition-colors">
                Ask Aadil — Stateful Portfolio Agent & Controlled Actions
              </h3>
              <p className="text-xs text-[#9EA4AA] leading-relaxed">
                Stateful grounded conversational agent with deterministic intent routing, decoupled multi-source retrieval (Timeline, Journal, Systems, Resume), bitwise draft integrity, and explicit human confirmation gates before external action execution.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Next.js 16', 'TypeScript 5', 'Hybrid RAG', 'Web Speech VAD', 'State Machines'].map((t) => (
                  <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#181C21] text-[#858A90] border border-[#262B32]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="pt-3 border-t border-[#22272E] text-[11px] font-mono text-[#58A6FF] group-hover:text-[#79B8FF] flex items-center justify-between">
              <span>View System Case Study</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          {/* Card 2: Solace AI */}
          <Link
            href="/projects/solace-ai"
            className="p-5 rounded-xl bg-[#14171A] hover:bg-[#181C21] border border-[#262B32] hover:border-[#D48A63]/50 transition-all group flex flex-col justify-between space-y-4 cursor-pointer"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="px-2 py-0.5 rounded bg-[#241B17] text-[#D48A63] font-semibold border border-[#473024]">
                  HACKATHON PROJECT · NOV 2026
                </span>
                <span className="text-[#858A90] font-semibold">102 Verified Checks</span>
              </div>
              <h3 className="font-serif font-bold text-lg text-[#F0EEE9] group-hover:text-white transition-colors">
                Solace AI — Safety-First Mobile Wellness Companion
              </h3>
              <p className="text-xs text-[#9EA4AA] leading-relaxed">
                Cross-platform mobile wellness companion featuring a synchronous pre-LLM crisis safety interceptor (&lt;2ms), feature-flagged LangGraph SSE streaming, consent-gated emotional memory, ephemeral voice audio purge, and single-POST ambiguous delivery guards.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['React Native (Expo 58)', 'FastAPI', 'LangGraph', 'Supabase RLS', 'SSE Streaming'].map((t) => (
                  <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#181C21] text-[#858A90] border border-[#262B32]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="pt-3 border-t border-[#22272E] text-[11px] font-mono text-[#D48A63] group-hover:text-[#E5A886] flex items-center justify-between">
              <span>View System Case Study</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          {/* Card 3: AI Reliability */}
          <Link
            href="/projects/ai-reliability"
            className="p-5 rounded-xl bg-[#14171A] hover:bg-[#181C21] border border-[#262B32] hover:border-[#71899A]/50 transition-all group flex flex-col justify-between space-y-4 cursor-pointer"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="px-2 py-0.5 rounded bg-[#18261F] text-[#5A9A78] font-semibold border border-[#234030]">
                  INDEPENDENT ENGINEERING PROJECT
                </span>
                <span className="text-[#858A90] font-semibold">205+ Tests</span>
              </div>
              <h3 className="font-serif font-bold text-lg text-[#F0EEE9] group-hover:text-white transition-colors">
                AI Application Reliability & Autonomous Browser Testing
              </h3>
              <p className="text-xs text-[#9EA4AA] leading-relaxed">
                Autonomous browser testing agent pairing headless Chromium with local Ollama Qwen 2.5 diagnostics, Fisher information covariance uncertainty abstention, Model Context Protocol (MCP) tool integration, and an append-only SHA-256 provenance ledger.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['FastAPI', 'Playwright', 'Ollama (Qwen 2.5)', 'MCP Protocol', 'Fisher Covariance'].map((t) => (
                  <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#181C21] text-[#858A90] border border-[#262B32]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="pt-3 border-t border-[#22272E] text-[11px] font-mono text-[#71899A] group-hover:text-[#D8D6D0] flex items-center justify-between">
              <span>View System Case Study</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          {/* Card 4: EDA */}
          <Link
            href="/projects/design-automation"
            className="p-5 rounded-xl bg-[#14171A] hover:bg-[#181C21] border border-[#262B32] hover:border-[#5A9A78]/50 transition-all group flex flex-col justify-between space-y-4 cursor-pointer"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="px-2 py-0.5 rounded bg-[#18261F] text-[#5A9A78] font-semibold border border-[#234030]">
                  INDEPENDENT ENGINEERING PROJECT
                </span>
                <span className="text-[#858A90] font-semibold">424 Tests Across 28 Suites</span>
              </div>
              <h3 className="font-serif font-bold text-lg text-[#F0EEE9] group-hover:text-white transition-colors">
                Engineering Design Automation (EDA)
              </h3>
              <p className="text-xs text-[#9EA4AA] leading-relaxed">
                Hybrid AI mechanical design converting natural-language engineering briefs into validated 3D STEP BRep solid geometry and ASME SVG blueprints via closed-form Saint-Venant torsion solvers with 0.0000% CAD relative volume error.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Python 3.12', 'OpenCascade CAD', 'Saint-Venant Solvers', 'STEP BRep', 'FastAPI'].map((t) => (
                  <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#181C21] text-[#858A90] border border-[#262B32]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="pt-3 border-t border-[#22272E] text-[11px] font-mono text-[#5A9A78] group-hover:text-[#78B896] flex items-center justify-between">
              <span>View System Case Study</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
        </div>

        {/* Secondary Access to Remaining Independent Builds & Wayground Systems */}
        <div className="p-4 rounded-lg bg-[#111417] border border-[#22272E] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
          <span className="text-[#9EA4AA]">
            Also exploring: <strong className="text-[#D8D6D0]">OCR Evaluator</strong> (134 tests), <strong className="text-[#D8D6D0]">Atlas AI</strong> (178 tests), <strong className="text-[#D8D6D0]">Loom AI</strong>, and <strong className="text-[#D8D6D0]">Wayground Production Systems</strong> (VM Copy, AI Worksheets).
          </span>
          <Link
            href="/projects"
            className="text-[#5A9A78] hover:text-[#78B896] font-semibold shrink-0"
          >
            Browse Full Project Directory (11 Systems) →
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 04 — ABOUT // THE TWO-CHAPTER CAREER TRAJECTORY       */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-4xl mx-auto px-4 space-y-6">
        <div className="p-6 sm:p-8 rounded-xl border border-[#262B32] bg-[#14171A] space-y-6">
          <div className="space-y-1">
            <span className="text-xs uppercase font-mono tracking-wider text-[#71899A] block">
              TRAJECTORY // NARRATIVE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F0EEE9] font-serif">
              The Engineering Journey
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#C8C6BF] leading-relaxed">
            I hold a Mechanical Engineering degree from Panjab University, where my work centered on closed-form physics and deterministic mathematical constraints. Moving into full-stack and Python software engineering, I encountered real-world workflows that could not be solved by LLM prompt wrappers alone. That realization shaped my engineering philosophy: <em>generative models propose candidates, but deterministic engineering, compilers, and state machines decide what is true.</em>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Chapter 1: Wayground */}
            <div className="p-4 rounded-lg bg-[#181C21] border border-[#2A303A] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-[#F0EEE9]">
                <div className="flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#71899A]" />
                  <span>Stage 1 // Wayground Experience</span>
                </div>
                <span className="text-[10px] text-[#71899A] font-normal">Apr 2024 — Jul 2026</span>
              </div>
              <p className="text-xs text-[#9EA4AA] leading-relaxed">
                Professional engineering tenure at Wayground concluding in July 2026. Built the VM Copy question generator with local TypeScript Tier-1 deterministic evaluation (0ms latency, $0 cost), an educational worksheets platform pairing headless TeX Live / TikZ compilers with 2D maze graph algorithms, and asynchronous Map-Reduce curriculum ETL pipelines.
              </p>
            </div>

            {/* Chapter 2: Independent Research */}
            <div className="p-4 rounded-lg bg-[#181C21] border border-[#2A303A] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-[#F0EEE9]">
                <div className="flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-[#5A9A78]" />
                  <span>Stage 2 // Independent AI Research</span>
                </div>
                <span className="text-[10px] text-[#5A9A78] font-normal">Aug 2026 — Present</span>
              </div>
              <p className="text-xs text-[#9EA4AA] leading-relaxed">
                Continuous independent engineering activity. Shipped 7 complete architectures across competitive hackathons (Solace AI, Loom AI, Atlas AI), document robustness testing (OCR Evaluator), autonomous browser testing (AI Reliability), CAD generation (EDA), and grounded portfolio agents (Ask Aadil).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#22272E]">
            <Link
              href="/experience"
              className="p-3.5 rounded-lg bg-[#111417] hover:bg-[#181C21] border border-[#242930] hover:border-[#536B7A] transition-all group flex items-center justify-between text-xs font-mono"
            >
              <div>
                <span className="font-bold text-[#F0EEE9] group-hover:text-white block">Explore Chronological Timeline →</span>
                <span className="text-[10px] text-[#71899A]">Interactive Journey Map & Milestone Nodes</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#71899A] group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/journal"
              className="p-3.5 rounded-lg bg-[#111417] hover:bg-[#181C21] border border-[#242930] hover:border-[#71899A] transition-all group flex items-center justify-between text-xs font-mono"
            >
              <div>
                <span className="font-bold text-[#F0EEE9] group-hover:text-white block">Explore Engineering Journal →</span>
                <span className="text-[10px] text-[#A2B4C2]">18 Spreads of Architecture Decisions & Defect Logs</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#71899A] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 05 — ASK AADIL LIVE AGENT SHOWCASE                    */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="rounded-xl border border-[#388BFD]/30 bg-gradient-to-b from-[#131B26] to-[#10141B] p-6 sm:p-7 space-y-4 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#162332] text-[#58A6FF] font-mono text-[11px] border border-[#388BFD]/40">
                <Sparkles className="w-3.5 h-3.5" />
                <span>LIVE GROUNDED AGENT // ZERO FABRICATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#F0EEE9] font-serif">
                Query this portfolio conversationally with Ask Aadil
              </h2>
              <p className="text-xs sm:text-sm text-[#9EA4AA] max-w-2xl leading-relaxed">
                Test my AI engineering principles live. Ask Aadil queries system architectures, design decisions, failure modes, and verified benchmarks across discrete source boundaries with strict human confirmation gates.
              </p>
            </div>

            <div className="flex flex-col items-stretch sm:items-end gap-2 shrink-0">
              <HomepageAskAadilCta variant="prominent" label="Launch Ask Aadil →" />
              <Link
                href="/projects/ask-aadil"
                className="text-[11px] font-mono text-[#58A6FF] hover:text-[#8CC4FF] underline underline-offset-4 text-center sm:text-right transition-colors"
              >
                Inspect Agent Architecture Spec →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 06 — CONTACT & COLLABORATE                            */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="p-6 sm:p-8 rounded-xl border border-[#262B32] bg-[#14171A] text-center space-y-4">
          <div className="space-y-1">
            <span className="text-xs uppercase font-mono tracking-wider text-[#71899A] block">
              COLLABORATION // CONNECT
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#F0EEE9] font-serif">
              Let&apos;s Build Verifiable AI Systems
            </h2>
          </div>

          <p className="text-[#9EA4AA] max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
            Interested in discussing full-time AI engineering roles, stateful multi-agent workflows, or production reliability? I am actively available for remote and Hyderabad-based opportunities.
          </p>

          {/* Direct Email Callout */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#181C21] border border-[#2B3542] text-xs font-mono text-[#F0EEE9]">
            <Mail className="w-3.5 h-3.5 text-[#5A9A78]" />
            <a href={`mailto:${profile.email}`} className="hover:text-[#5A9A78] transition-colors">
              {profile.email}
            </a>
            <span className="text-[#686E77]">|</span>
            <span className="text-[#9EA4AA]">{profile.location}</span>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2 font-mono text-xs">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded border border-[#3E4652] bg-[#22272E] hover:bg-[#2C333D] text-[#F0EEE9] font-medium transition-colors"
            >
              <span>Connect via Contact Page →</span>
            </Link>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded border border-[#262B32] bg-[#16191D] hover:bg-[#1E232A] text-[#858A90] hover:text-[#F0EEE9] transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-[#71899A]" />
              <span>Resume (PDF)</span>
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded border border-[#262B32] bg-[#16191D] hover:bg-[#1E232A] text-[#858A90] hover:text-[#F0EEE9] transition-colors"
            >
              <Github className="w-3.5 h-3.5 text-[#71899A]" />
              <span>GitHub</span>
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded border border-[#262B32] bg-[#16191D] hover:bg-[#1E232A] text-[#858A90] hover:text-[#F0EEE9] transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#71899A]" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
