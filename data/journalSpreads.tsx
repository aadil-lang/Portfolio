"use client"
import React from 'react'
import Link from 'next/link'
import { profile } from './profile'
import ArchitectureViz from '../components/ArchitectureViz'
import {
  Compass,
  AlertTriangle,
  ExternalLink,
  ShieldAlert,
  CheckCircle2,
  FileText,
  ArrowRight,
  Sparkles,
  Layers,
  Cpu,
  Workflow,
  Eye,
  CheckSquare,
  Wrench,
  Palette,
  Lightbulb,
  Binary,
  Scale,
  Terminal,
  ShieldCheck,
  BookOpen,
  GitBranch,
  Database,
  Code2,
  Box,
  Server
} from 'lucide-react'

export interface PageDefinition {
  pageNumber: number
  header: string
  marginalLabel: string
  content: (actions: { onNavigateSpread: (spreadIndex: number) => void }) => React.ReactNode
}

export interface SpreadDefinition {
  id: string
  spreadIndex: number
  chapterNumber?: string
  chapterTitle?: string
  chapterSlug?: string
  journeyStage?: string
  leftPage: PageDefinition
  rightPage: PageDefinition
}

// Build 16 Spreads (32 Folios: 001 — 032)
export const journalSpreads: SpreadDefinition[] = [
  // =========================================================================
  // SPREAD 00: OPENING // CURIOSITY COMES FIRST & TABLE OF CONTENTS (001 & 002)
  // =========================================================================
  {
    id: 'spread-00-opening',
    spreadIndex: 0,
    chapterNumber: 'OPENING',
    chapterTitle: 'Curiosity Comes First',
    journeyStage: 'THE CORE OPERATING LOOP',
    leftPage: {
      pageNumber: 1,
      header: 'OPENING // CURIOSITY COMES FIRST',
      marginalLabel: 'PRINCIPLE',
      content: ({ onNavigateSpread }) => (
        <div className="h-full flex flex-col justify-between space-y-2.5 text-[#25282A]">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono text-[#5A6066] border-b border-[#DCD7C9] pb-1.5">
              <span className="flex items-center gap-1.5 text-[#3D5A6E] font-bold">
                <Compass className="w-3.5 h-3.5" />
                <span>The Core Operating Loop</span>
              </span>
              <span className="text-[#6E747C]">1998 — 2026</span>
            </div>

            {/* Foundational Philosophy Vector */}
            <div className="p-2.5 rounded bg-[#EFECE3]/80 border-l-2 border-[#3D5A6E] space-y-1">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#3D5A6E] font-bold block">
                Foundational Principle
              </span>
              <div className="text-[10px] font-mono font-bold text-[#1E2124] tracking-tight flex flex-wrap items-center gap-1">
                <span>CURIOSITY</span>
                <span className="text-[#8E8B82]">→</span>
                <span>LEARNING</span>
                <span className="text-[#8E8B82]">→</span>
                <span>CONTRIBUTION</span>
                <span className="text-[#8E8B82]">→</span>
                <span>BUILDING</span>
                <span className="text-[#8E8B82]">→</span>
                <span>DISCOVERY</span>
                <span className="text-[#8E8B82]">→</span>
                <span className="text-[#3D5A6E]">REPEAT</span>
              </div>
            </div>

            <blockquote className="text-xs sm:text-[12px] font-serif italic text-[#1A1D20] leading-relaxed border-l-2 border-[#4A6577] pl-3 py-1">
              &ldquo;My career was not a predefined journey toward becoming an AI Engineer. I did not start with a plan like: Content → AI → AI Engineer. Every system I build is also a system that teaches me.&rdquo;
            </blockquote>

            <p className="text-[10.5px] text-[#454A4F] leading-relaxed">
              This journal documents an evolving engineer. The questions changed because the problems became larger: from creating mathematics manually, to rendering it with KaTeX and Figma, to discovering why language models fail at structural invariants, to engineering deterministic evaluation outside the model, to building reliable agentic architectures.
            </p>

            <div className="p-2 rounded bg-[#EFECE3]/60 border border-[#D5D0C0] text-[9.5px] font-mono text-[#555C62] space-y-0.5">
              <div className="font-bold text-[#1E2124]">Three Distinct Content Layers:</div>
              <div>• <strong>Timeline</strong>: When things happened & chronological map of evolution</div>
              <div>• <strong>Journal</strong>: Why I explored, what broke, and what each system taught me</div>
              <div>• <strong>Systems</strong>: How it works, architecture, and technical evidence</div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#DCD7C9] flex items-center justify-between text-xs font-mono text-[#6E747C]">
            <span>ENGINEERING LOGBOOK</span>
            <button
              type="button"
              onClick={() => onNavigateSpread(1)}
              className="inline-flex items-center gap-1 text-[#3D5A6E] hover:text-[#1E2124] font-semibold transition-colors"
            >
              <span>Begin Reading (Ch. 01) →</span>
            </button>
          </div>
        </div>
      )
    },
    rightPage: {
      pageNumber: 2,
      header: 'TABLE OF CONTENTS // 19 CHAPTERS',
      marginalLabel: 'INDEX',
      content: ({ onNavigateSpread }) => {
        const tocItems = [
          { num: '01', title: 'Learning the Problem Domain (Graveiens)', spread: 1, page: '003' },
          { num: '02', title: 'Learning to Represent Mathematics (InhaltMart)', spread: 1, page: '004' },
          { num: '03', title: 'Learning to Validate (Digiplus)', spread: 2, page: '005' },
          { num: '04', title: 'The Independent Years (Problem Solving)', spread: 2, page: '006' },
          { num: '05', title: 'Entering a Product Environment (Wayground SME)', spread: 3, page: '007' },
          { num: '06', title: 'From Content to Content Systems (VoyageMath)', spread: 3, page: '008' },
          { num: '07', title: 'Making Mathematics Visual (Figma)', spread: 4, page: '009' },
          { num: '08', title: 'When Content Became a Workflow Problem', spread: 4, page: '010' },
          { num: '09', title: 'When AI Entered the Workflow (HITL)', spread: 5, page: '011' },
          { num: '10', title: 'In-House Question Creation', spread: 5, page: '012' },
          { num: '11', title: "When Generation Wasn't Enough (VM Copy)", spread: 6, page: '013' },
          { num: '12', title: 'From Generation to Evaluation (Deterministic Evaluator)', spread: 6, page: '014' },
          { num: '13', title: 'When AI Became an Application (AI Worksheets POC)', spread: 7, page: '015' },
          { num: '14', title: 'From Applications to Pipelines (Item Bank)', spread: 8, page: '017' },
          { num: '15', title: 'When the Problem Became an ETL Pipeline (Curriculum)', spread: 9, page: '019' },
          { num: '16', title: 'From Using AI to Building AI Applications (Loom AI)', spread: 10, page: '021' },
          { num: '17', title: 'Stateful Workflows + Retrieval + Tools (Atlas AI)', spread: 11, page: '023' },
          { num: '18', title: 'AI Meets Deterministic Engineering (EDA CAD)', spread: 12, page: '025' },
          { num: '19', title: 'The Reliability Question (Browser QA)', spread: 13, page: '027' },
          { num: '20', title: 'Still Building (?) [Open Ending]', spread: 14, page: '029' },
          { num: 'EP', title: 'Epilogue: Systems Catalog & Archive', spread: 15, page: '031' }
        ]

        return (
          <div className="h-full flex flex-col justify-between space-y-1 text-[#25282A]">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[9.5px] font-mono text-[#6A7077] uppercase tracking-widest border-b border-[#DCD7C9] pb-0.5">
                <span>Chapter / Chronicle</span>
                <span>Folio</span>
              </div>

              <div className="space-y-0.5 pt-0.5 text-[9.5px]">
                {tocItems.map((item) => (
                  <div
                    key={item.page}
                    onClick={() => onNavigateSpread(item.spread)}
                    className="flex items-baseline justify-between py-0.5 px-1 rounded hover:bg-[#EAE6DC]/70 cursor-pointer transition-colors group select-none"
                  >
                    <div className="flex items-baseline gap-1.5 min-w-0 pr-1">
                      <span className="font-mono text-[8.5px] font-bold text-[#3D5A6E] shrink-0">
                        {item.num}
                      </span>
                      <span className="font-serif font-semibold text-[#1E2124] group-hover:text-[#3D5A6E] truncate">
                        {item.title}
                      </span>
                    </div>
                    <div className="flex-1 mx-1 border-b border-dotted border-[#B5AFA2] min-w-[8px]" />
                    <span className="font-mono text-[9px] text-[#555C62] group-hover:text-[#1E2124] font-medium shrink-0">
                      {item.page}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-1.5 rounded bg-[#EFECE3]/70 border border-[#D5D0C0] text-[8.5px] font-mono text-[#5A6066]">
              <span className="text-[#3D5A6E] font-bold">PHYSICAL NOTEBOOK METAPHOR: </span>
              <span>CONTENT → SME → REPRESENTATION → VISUALS → TOOLING → AI → EVALUATION → PIPELINES → RELIABILITY → ?</span>
            </div>

            <div className="pt-1 border-t border-[#DCD7C9] flex items-center justify-between text-[10px] font-mono text-[#6E747C]">
              <span>32 FOLIOS // COMPLETE JOURNEY</span>
              <span>19 CHAPTERS</span>
            </div>
          </div>
        )
      }
    }
  },

  // =========================================================================
  // SPREAD 01: CHAPTERS 01 & 02 // PROBLEM DOMAIN & REPRESENTATION (003 & 004)
  // =========================================================================
  {
    id: 'spread-01-foundations',
    spreadIndex: 1,
    chapterNumber: '01 & 02',
    chapterTitle: 'Domain & Representation',
    journeyStage: 'EARLY MATHEMATICAL FOUNDATIONS',
    leftPage: {
      pageNumber: 3,
      header: 'CH. 01 // LEARNING THE PROBLEM DOMAIN',
      marginalLabel: 'DOMAIN',
      content: () => (
        <div className="h-full flex flex-col justify-between space-y-2 text-[#25282A]">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#5A6066] border-b border-[#DCD7C9] pb-1">
              <span className="text-[#3D5A6E] font-bold uppercase tracking-wider">Graveiens Edu Services Pvt. Ltd.</span>
              <span className="text-[#6E747C]">May 2021 — Oct 2021</span>
            </div>

            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1A1D20] leading-snug">
              Understanding the Problem Domain First
            </h2>

            <p className="text-[11px] text-[#33373B] leading-relaxed">
              My first professional chapter was manual mathematical content creation. I worked through Brainly&apos;s CMS authoring original Textbook Questions and Solutions (TBQ) for United States curriculum textbooks.
            </p>

            <p className="text-[10.5px] text-[#454A4F] leading-relaxed">
              This was not software engineering, but it was essential foundation work. I had to understand what made a mathematical problem valid, what steps caused learners to stumble, and how visual plots in tools like GeoGebra, Desmos, and Mathcha.io clarified abstract concepts.
            </p>

            <div className="p-2 rounded bg-[#EFECE3]/80 border-l-2 border-[#3D5A6E] space-y-0.5">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#3D5A6E] font-bold block">
                Foundational Insight
              </span>
              <p className="text-[10.5px] font-serif italic text-[#1A1D20] leading-snug">
                &ldquo;I began by learning the domain deeply enough to recognize what a correct mathematical problem, solution, and explanation actually looked like. I learned the problem domain before I ever tried to automate it.&rdquo;
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-[#DCD7C9] flex items-center justify-between text-[11px] font-mono text-[#6E747C]">
            <span>FOUNDATIONS</span>
            <span>LEARNING THE DOMAIN</span>
          </div>
        </div>
      )
    },
    rightPage: {
      pageNumber: 4,
      header: 'CH. 02 // LEARNING TO REPRESENT MATHEMATICS',
      marginalLabel: 'REPRESENTATION',
      content: () => (
        <div className="h-full flex flex-col justify-between space-y-2 text-[#25282A]">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#5A6066] border-b border-[#DCD7C9] pb-1">
              <span className="text-[#3D5A6E] font-bold uppercase tracking-wider">InhaltMart Educational Services</span>
              <span className="text-[#6E747C]">Oct 2021 — Feb 2022</span>
            </div>

            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1A1D20] leading-snug">
              Structure, Notation, and Representation
            </h2>

            <p className="text-[11px] text-[#33373B] leading-relaxed">
              At InhaltMart, I continued authoring textbook solutions while working with MS Word, MathType, and LaTeX notation. The work involved constructing TI-83 graphing calculator solutions and performing systematic plagiarism detection and removal across content pools.
            </p>

            <p className="text-[10.5px] text-[#454A4F] leading-relaxed">
              Here I noticed a crucial distinction: mathematical correctness is not only about whether the final numerical answer is correct. It also depends on how the mathematics is structured, aligned, and represented for the reader.
            </p>

            <div className="p-2 rounded bg-[#EFECE3]/80 border-l-2 border-[#7A6028] space-y-0.5">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#7A6028] font-bold block">
                The Representation Shift
              </span>
              <p className="text-[10.5px] font-serif italic text-[#1A1D20] leading-snug">
                &ldquo;I began to understand that mathematical correctness also depends on how mathematics is represented. This realization became the direct bridge to KaTeX, structured schemas, and compiler pipelines later.&rdquo;
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-[#DCD7C9] flex items-center justify-between text-[11px] font-mono text-[#6E747C]">
            <span>STRUCTURED NOTATION</span>
            <span>TURN SPREAD FOR CH. 03 →</span>
          </div>
        </div>
      )
    }
  },

  // =========================================================================
  // SPREAD 02: CHAPTERS 03 & 04 // VALIDATION & INDEPENDENT DISCIPLINE (005 & 006)
  // =========================================================================
  {
    id: 'spread-02-validation-discipline',
    spreadIndex: 2,
    chapterNumber: '03 & 04',
    chapterTitle: 'Validation & Discipline',
    journeyStage: 'QUALITY & PROBLEM SOLVING',
    leftPage: {
      pageNumber: 5,
      header: 'CH. 03 // LEARNING TO VALIDATE',
      marginalLabel: 'VALIDATION',
      content: () => (
        <div className="h-full flex flex-col justify-between space-y-2 text-[#25282A]">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#5A6066] border-b border-[#DCD7C9] pb-1">
              <span className="text-[#3D5A6E] font-bold uppercase tracking-wider">Digiplus · QC K–10 SME</span>
              <span className="text-[#6E747C]">Jun 2022 — Jul 2022</span>
            </div>

            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1A1D20] leading-snug">
              Moving from Creation to Systematic Evaluation
            </h2>

            <p className="text-[11px] text-[#33373B] leading-relaxed">
              At Digiplus, my responsibility shifted from creating content to quality control. I reviewed K–10 mathematics items for mathematical correctness, originality, formatting, distractor plausibility, and distractor traps.
            </p>

            <div className="p-2 rounded bg-[#EFECE3]/70 border border-[#D5D0C0] space-y-1 font-mono text-[9px] text-[#3A3E42]">
              <span className="text-[#3D5A6E] font-bold block uppercase tracking-wider">The Evaluative Pattern:</span>
              <div className="flex items-center justify-between px-1">
                <span>CREATE</span>
                <span>→</span>
                <span>INSPECT</span>
                <span>→</span>
                <span>VALIDATE</span>
                <span>→</span>
                <span>CORRECT</span>
              </div>
            </div>

            <p className="text-[10.5px] text-[#454A4F] leading-relaxed">
              This was an essential cognitive transition: producing something and determining whether it satisfies explicit criteria are fundamentally different operations.
            </p>

            <div className="p-2 rounded bg-[#EFECE3]/80 border-l-2 border-[#2E5F46] text-[10.5px] font-serif italic text-[#1A1D20] leading-snug">
              &ldquo;I moved from creating content to systematically evaluating it. That evaluative mindset later shaped how I designed test harnesses, guardrails, and deterministic checkers.&rdquo;
            </div>
          </div>

          <div className="pt-2 border-t border-[#DCD7C9] flex items-center justify-between text-[11px] font-mono text-[#6E747C]">
            <span>SYSTEMATIC AUDITING</span>
            <span>EVALUATION FIRST</span>
          </div>
        </div>
      )
    },
    rightPage: {
      pageNumber: 6,
      header: 'CH. 04 // THE INDEPENDENT YEARS',
      marginalLabel: 'DISCIPLINE',
      content: () => (
        <div className="h-full flex flex-col justify-between space-y-2 text-[#25282A]">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#5A6066] border-b border-[#DCD7C9] pb-1">
              <span className="text-[#3D5A6E] font-bold uppercase tracking-wider">Independent Study</span>
              <span className="text-[#6E747C]">Aug 2022 — Dec 2023</span>
            </div>

            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1A1D20] leading-snug">
              Independent Problem Solving & Discipline
            </h2>

            <p className="text-[11px] text-[#33373B] leading-relaxed">
              Following Digiplus, I dedicated sixteen months to intensive independent preparation for national competitive examinations. The focus was high-level quantitative aptitude, deductive syllogisms, and rapid algorithmic mental models.
            </p>

            <p className="text-[10.5px] text-[#454A4F] leading-relaxed">
              This was a self-directed period of intense intellectual discipline. I was not being assigned tasks by an employer; I had to break down complex multi-step problems, manage error analysis, and maintain rigorous accuracy under strict constraints.
            </p>

            <div className="p-2 rounded bg-[#EFECE3]/80 border-l-2 border-[#3D5A6E] text-[10.5px] font-serif italic text-[#1A1D20] leading-snug">
              &ldquo;Before entering a digital product environment, I was learning how to reason through problems without someone handing me the workflow. It developed the habit of independent problem solving.&rdquo;
            </div>
          </div>

          <div className="pt-2 border-t border-[#DCD7C9] flex items-center justify-between text-[11px] font-mono text-[#6E747C]">
            <span>ANALYTICAL FOUNDATION</span>
            <span>TURN SPREAD FOR CH. 05 →</span>
          </div>
        </div>
      )
    }
  },

  // =========================================================================
  // SPREAD 03: CHAPTERS 05 & 06 // PRODUCT ENVIRONMENT & CONTENT SYSTEMS (007 & 008)
  // =========================================================================
  {
    id: 'spread-03-wayground-systems',
    spreadIndex: 3,
    chapterNumber: '05 & 06',
    chapterTitle: 'Product Environment & Systems',
    journeyStage: 'WAYGROUND ENTRY & VOYAGEMATH',
    leftPage: {
      pageNumber: 7,
      header: 'CH. 05 // ENTERING A PRODUCT ENVIRONMENT',
      marginalLabel: 'KATEX',
      content: () => (
        <div className="h-full flex flex-col justify-between space-y-2 text-[#25282A]">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#5A6066] border-b border-[#DCD7C9] pb-1">
              <span className="text-[#3D5A6E] font-bold uppercase tracking-wider">Wayground (Quizizz) · SME Entry</span>
              <span className="text-[#6E747C]">Jan 2024 — Mar 2024</span>
            </div>

            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1A1D20] leading-snug">
              Content Inside Software Systems
            </h2>

            <p className="text-[11px] text-[#33373B] leading-relaxed">
              In January 2024, I joined Wayground. For the first time, mathematical content was no longer isolated text on paper or in a document. It existed inside software products, rendering pipelines, and team workflows.
            </p>

            <p className="text-[10.5px] text-[#454A4F] leading-relaxed">
              I learned KaTeX to produce step-by-step mathematical solutions. Content questions were authored in Google Sheets and systematically validated on the internal local development server to inspect how equations rendered under product layout constraints.
            </p>

            <div className="p-2 rounded bg-[#EFECE3]/80 border-l-2 border-[#5A9A78] space-y-0.5">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#5A9A78] font-bold block">
                The Technical Shift
              </span>
              <p className="text-[10.5px] font-serif italic text-[#1A1D20] leading-snug">
                &ldquo;Mathematical correctness was only one part of the problem. The mathematical representation also had to be technically correct inside the software system.&rdquo;
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-[#DCD7C9] flex items-center justify-between text-[11px] font-mono text-[#6E747C]">
            <span>TECHNICAL REPRESENTATION</span>
            <span>LOCAL DEV VERIFICATION</span>
          </div>
        </div>
      )
    },
    rightPage: {
      pageNumber: 8,
      header: 'CH. 06 // FROM CONTENT TO CONTENT SYSTEMS',
      marginalLabel: 'VOYAGEMATH',
      content: () => (
        <div className="h-full flex flex-col justify-between space-y-2 text-[#25282A]">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#5A6066] border-b border-[#DCD7C9] pb-1">
              <span className="text-[#3D5A6E] font-bold uppercase tracking-wider">VoyageMath Content Builder V1</span>
              <span className="text-[#6E747C]">Mid-Mar 2024 onward</span>
            </div>

            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1A1D20] leading-snug">
              Contributing from the User & SME Side
            </h2>

            <p className="text-[11px] text-[#33373B] leading-relaxed">
              To make authoring scalable, the <strong>VoyageMath Engineering team</strong> built VoyageMath Content Builder V1 (previously Mathverse). I did not build the software; my contribution was from the content and SME perspective.
            </p>

            <p className="text-[10.5px] text-[#454A4F] leading-relaxed">
              I tested V1 against real content workflows, identified authoring bugs, recommended UI features, and provided continuous domain feedback to ensure engineering aligned tool capabilities with authoring realities. From April 2024 onward, VoyageMath was adopted as our primary daily production tool.
            </p>

            <div className="p-2 rounded bg-[#EFECE3]/80 border-l-2 border-[#3D5A6E] text-[10.5px] font-serif italic text-[#1A1D20] leading-snug">
              &ldquo;A tool changes the work around it. Once a tool becomes part of a workflow, the workflow itself becomes something to understand. I was no longer only working on content; I was working around systems that produced and transformed content.&rdquo;
            </div>
          </div>

          <div className="pt-2 border-t border-[#DCD7C9] flex items-center justify-between text-[11px] font-mono text-[#6E747C]">
            <span>TOOL ADOPTION</span>
            <span>TURN SPREAD FOR CH. 07 →</span>
          </div>
        </div>
      )
    }
  },

  // =========================================================================
  // SPREAD 04: CHAPTERS 07 & 08 // VISUALS & WORKFLOW THINKING (009 & 010)
  // =========================================================================
  {
    id: 'spread-04-visuals-workflow',
    spreadIndex: 4,
    chapterNumber: '07 & 08',
    chapterTitle: 'Visuals & Workflow Thinking',
    journeyStage: 'FIGMA & WORKFLOW PROBLEMS',
    leftPage: {
      pageNumber: 9,
      header: 'CH. 07 // MAKING MATHEMATICS VISUAL',
      marginalLabel: 'FIGMA',
      content: () => (
        <div className="h-full flex flex-col justify-between space-y-2 text-[#25282A]">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#5A6066] border-b border-[#DCD7C9] pb-1">
              <span className="text-[#3D5A6E] font-bold uppercase tracking-wider">Figma & Mathematical Visuals</span>
              <span className="text-[#6E747C]">2024 — 2025</span>
            </div>

            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1A1D20] leading-snug">
              Mathematical Visual Production
            </h2>

            <p className="text-[11px] text-[#33373B] leading-relaxed">
              As questions and step-by-step solutions increasingly required diagrams, I learned Figma in 2024 with guidance from a colleague. I began creating, modifying, and correcting mathematical visual assets, geometric figures, and coordinate graphs.
            </p>

            <p className="text-[10.5px] text-[#454A4F] leading-relaxed">
              I was not a formal UI/UX designer. My contribution was strictly mathematical visual production: ensuring coordinate axes were scaled correctly, angle arcs were accurate, and diagrams supported the pedagogy without ambiguity. In 2025, this visual contribution scaled formally to support rapid ~10-day turnaround cycles for live curriculum releases.
            </p>

            <div className="p-2 rounded bg-[#EFECE3]/80 border-l-2 border-[#5A9A78] text-[10.5px] font-serif italic text-[#1A1D20] leading-snug">
              &ldquo;Visual representation is an integral part of mathematical communication. Diagrammatic correctness requires the same precision as algebraic equations.&rdquo;
            </div>
          </div>

          <div className="pt-2 border-t border-[#DCD7C9] flex items-center justify-between text-[11px] font-mono text-[#6E747C]">
            <span>MATHEMATICAL VISUALS</span>
            <span>VECTOR PRECISION</span>
          </div>
        </div>
      )
    },
    rightPage: {
      pageNumber: 10,
      header: 'CH. 08 // WHEN CONTENT BECAME A WORKFLOW PROBLEM',
      marginalLabel: 'WORKFLOW',
      content: () => (
        <div className="h-full flex flex-col justify-between space-y-2 text-[#25282A]">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#5A6066] border-b border-[#DCD7C9] pb-1">
              <span className="text-[#3D5A6E] font-bold uppercase tracking-wider">The Content Pipeline</span>
              <span className="text-[#6E747C]">Wayground Operations</span>
            </div>

            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1A1D20] leading-snug">
              Structuring the Repeatable Process
            </h2>

            <p className="text-[11px] text-[#33373B] leading-relaxed">
              As authoring demands multiplied, the content process took on a structured sequence: Base Question + Solution → Human Review → Replica Workflow → Developer provides question/options → Generated content → Human review → Correction → Approval.
            </p>

            <p className="text-[10.5px] text-[#454A4F] leading-relaxed">
              I saw where the friction lived: manual copy-pasting between sheets, inconsistent distractor patterns, and the difficulty of verifying formatting across hundreds of items.
            </p>

            <div className="p-2 rounded bg-[#EFECE3]/80 border-l-2 border-[#3D5A6E] text-[10.5px] font-serif italic text-[#1A1D20] leading-snug">
              &ldquo;Once work becomes repetitive and structured, the problem is no longer only &apos;how do I create this?&apos; It becomes &apos;how do I make this process repeatable, verifiable, and reliable?&apos;&rdquo;
            </div>
          </div>

          <div className="pt-2 border-t border-[#DCD7C9] flex items-center justify-between text-[11px] font-mono text-[#6E747C]">
            <span>WORKFLOW THINKING</span>
            <span>TURN SPREAD FOR CH. 09 →</span>
          </div>
        </div>
      )
    }
  },

  // =========================================================================
  // SPREAD 05: CHAPTERS 09 & 10 // AI IN WORKFLOW & IN-HOUSE CREATION (011 & 012)
  // =========================================================================
  {
    id: 'spread-05-ai-workflow-creation',
    spreadIndex: 5,
    chapterNumber: '09 & 10',
    chapterTitle: 'AI in Workflow & Creation',
    journeyStage: 'HUMAN-IN-THE-LOOP AI',
    leftPage: {
      pageNumber: 11,
      header: 'CH. 09 // WHEN AI ENTERED THE WORKFLOW',
      marginalLabel: 'HITL AI',
      content: () => (
        <div className="h-full flex flex-col justify-between space-y-2 text-[#25282A]">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#5A6066] border-b border-[#DCD7C9] pb-1">
              <span className="text-[#3D5A6E] font-bold uppercase tracking-wider">Human-in-the-Loop Productivity</span>
              <span className="text-[#6E747C]">2025</span>
            </div>

            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1A1D20] leading-snug">
              AI as an Assistant, Not an Autonomous Author
            </h2>

            <p className="text-[11px] text-[#33373B] leading-relaxed">
              AI entered our workflow as a human-in-the-loop productivity layer to assist with replica generation. The model drafted candidate StepGuides and solution explanations, which content developers reviewed and corrected.
            </p>

            <div className="space-y-1">
              <span className="text-[9.5px] font-mono uppercase tracking-widest text-[#3D5A6E] font-bold block">
                Observed Generation Failure Modes:
              </span>
              <div className="grid grid-cols-2 gap-1 font-mono text-[8.5px] text-[#3A3E42]">
                <div className="p-1 rounded bg-[#EFECE3] border border-[#D5D0C0]">• Incomplete StepGuides</div>
                <div className="p-1 rounded bg-[#EFECE3] border border-[#D5D0C0]">• Incorrect intermediate steps</div>
                <div className="p-1 rounded bg-[#EFECE3] border border-[#D5D0C0]">• Distractor calculation errors</div>
                <div className="p-1 rounded bg-[#EFECE3] border border-[#D5D0C0]">• KaTeX formatting syntax slips</div>
              </div>
            </div>

            <div className="p-2 rounded bg-[#EFECE3]/80 border-l-2 border-[#7A6028] text-[10.5px] font-serif italic text-[#1A1D20] leading-snug">
              &ldquo;AI increased generation throughput, but shifted the bottleneck directly to verification. Generating text was cheap; verifying educational correctness was expensive.&rdquo;
            </div>
          </div>

          <div className="pt-2 border-t border-[#DCD7C9] flex items-center justify-between text-[11px] font-mono text-[#6E747C]">
            <span>HITL WORKFLOW</span>
            <span>VERIFICATION BOTTLENECK</span>
          </div>
        </div>
      )
    },
    rightPage: {
      pageNumber: 12,
      header: 'CH. 10 // IN-HOUSE QUESTION CREATION',
      marginalLabel: 'IN-HOUSE',
      content: () => (
        <div className="h-full flex flex-col justify-between space-y-2 text-[#25282A]">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#5A6066] border-b border-[#DCD7C9] pb-1">
              <span className="text-[#3D5A6E] font-bold uppercase tracking-wider">Internal Authoring</span>
              <span className="text-[#6E747C]">2025</span>
            </div>

            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1A1D20] leading-snug">
              Taking Responsibility for Quality
            </h2>

            <p className="text-[11px] text-[#33373B] leading-relaxed">
              When externally supplied questions sometimes failed intended curriculum skills or difficulty standards, question creation moved more fully in-house. ChatGPT was brought into the internal creation workflow to help draft question variations and candidate scaffolding.
            </p>

            <p className="text-[10.5px] text-[#454A4F] leading-relaxed">
              Bringing creation in-house made quality our direct responsibility. We quickly learned that a language model could generate something that superficially resembled a math problem without generating a mathematically sound, pedagogically aligned question.
            </p>

            <div className="p-2 rounded bg-[#EFECE3]/80 border-l-2 border-[#3D5A6E] text-[10.5px] font-serif italic text-[#1A1D20] leading-snug">
              &ldquo;A language model generates plausible candidates. But plausibility is not correctness. That realization led directly to engineering deterministic checks outside the model.&rdquo;
            </div>
          </div>

          <div className="pt-2 border-t border-[#DCD7C9] flex items-center justify-between text-[11px] font-mono text-[#6E747C]">
            <span>QUALITY AWARENESS</span>
            <span>TURN SPREAD FOR CH. 11 →</span>
          </div>
        </div>
      )
    }
  },

  // =========================================================================
  // SPREAD 06: CHAPTERS 11 & 12 // FROM GENERATION TO EVALUATION (013 & 014)
  // =========================================================================
  {
    id: 'spread-06-vm-copy-evaluator',
    spreadIndex: 6,
    chapterNumber: '11 & 12',
    chapterTitle: 'From Generation to Evaluation',
    journeyStage: 'VM COPY & DETERMINISTIC EVALUATION',
    leftPage: {
      pageNumber: 13,
      header: 'CH. 11 // WHEN GENERATION WASN’T ENOUGH',
      marginalLabel: 'VM COPY',
      content: () => (
        <div className="h-full flex flex-col justify-between space-y-2 text-[#25282A]">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#5A6066] border-b border-[#DCD7C9] pb-1">
              <span className="text-[#3D5A6E] font-bold uppercase tracking-wider">The Engineering Turning Point</span>
              <span className="text-[#6E747C]">Early 2026</span>
            </div>

            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1A1D20] leading-snug">
              Generating a Question != Generating a Good Question
            </h2>

            <p className="text-[11px] text-[#33373B] leading-relaxed">
              When I built the VM Copy Question Generator, I encountered the hard boundary of pure prompt engineering. When asked to generate assessment items, LLMs repeatedly produced:
            </p>

            <div className="p-2 rounded bg-[#F7F5EE] border border-[#D5D0C0] space-y-1 font-mono text-[9px] text-[#454A4F]">
              <div>1. <strong>Nonsensical scenarios:</strong> Triangles with impossible angle sums.</div>
              <div>2. <strong>Structural violations:</strong> Generating 3 options instead of 4, or 2 correct answers.</div>
              <div>3. <strong>Duplicate distractors:</strong> Options identical in value but phrased differently.</div>
              <div>4. <strong>Prompt explosion:</strong> Expanding prompt instructions made the output more brittle, not better.</div>
            </div>

            <div className="p-2 rounded bg-[#EFECE3]/80 border-l-2 border-[#7A6028] text-[10.5px] font-serif italic text-[#1A1D20] leading-snug">
              &ldquo;The thinking changed fundamentally: from &apos;How do I prompt the model better?&apos; to &apos;How do I engineer deterministic software around the model?&apos;&rdquo;
            </div>
          </div>

          <div className="pt-2 border-t border-[#DCD7C9] flex items-center justify-between text-[11px] font-mono text-[#6E747C]">
            <span>SYSTEM TURNING POINT</span>
            <Link href="/projects/vm-copy" className="text-[#3D5A6E] hover:underline font-bold">
              View VM Copy System →
            </Link>
          </div>
        </div>
      )
    },
    rightPage: {
      pageNumber: 14,
      header: 'CH. 12 // FROM GENERATION TO EVALUATION',
      marginalLabel: 'EVALUATOR',
      content: () => (
        <div className="h-full flex flex-col justify-between space-y-2 text-[#25282A]">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#5A6066] border-b border-[#DCD7C9] pb-1">
              <span className="text-[#3D5A6E] font-bold uppercase tracking-wider">lib/eval-layer.ts:44-76</span>
              <span className="text-[#2E5F46] font-bold font-mono">DETERMINISTIC EVALUATION</span>
            </div>

            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1A1D20] leading-snug">
              Deterministic Evaluation Outside the Model
            </h2>

            <p className="text-[11px] text-[#33373B] leading-relaxed">
              I wrote a pure TypeScript Deterministic Evaluator (<code>evaluateDeterministic</code>) that inspects every generated candidate before human review:
            </p>

            <div className="p-2 rounded bg-[#1C2024] text-[#E5E0D5] font-mono text-[9px] space-y-1">
              <div className="text-[#71899A]">// Invariant checks in code, not prompts</div>
              <div>1. options.length === expected (default 4)</div>
              <div>2. options.filter(o =&gt; o.logic === &apos;CA&apos;).length === 1</div>
              <div>3. Set(normalizedTexts).size === options.length (no duplicates)</div>
              <div className="text-[#5A9A78]">=&gt; Returns: &#123; pass: boolean, score: number, issues: string[] &#125;</div>
            </div>

            <p className="text-[10px] text-[#454A4F] leading-snug">
              This evaluator does not prove general mathematical truth, but it performs structural validation locally without requiring another LLM generation step.
            </p>

            <div className="p-2 rounded bg-[#EFECE3]/80 border-l-2 border-[#2E5F46] text-[10px] font-serif italic text-[#1A1D20] leading-snug">
              &ldquo;The model generates candidates; deterministic evaluation decides whether they satisfy the required constraints. This was my bridge into AI Systems Engineering.&rdquo;
            </div>
          </div>

          <div className="pt-2 border-t border-[#DCD7C9] flex items-center justify-between text-[11px] font-mono text-[#6E747C]">
            <span>DETERMINISTIC EVALUATION</span>
            <span>TURN SPREAD FOR CH. 13 →</span>
          </div>
        </div>
      )
    }
  },

  // =========================================================================
  // SPREAD 07: CHAPTER 13 // WHEN AI BECAME AN APPLICATION (015 & 016)
  // =========================================================================
  {
    id: 'spread-07-ai-worksheets',
    spreadIndex: 7,
    chapterNumber: '13',
    chapterTitle: 'When AI Became an Application',
    journeyStage: 'AI WORKSHEETS PRODUCT POC',
    leftPage: {
      pageNumber: 15,
      header: 'CH. 13 // AI AS AN APPLICATION COMPONENT',
      marginalLabel: 'ARCHITECTURE',
      content: () => (
        <div className="h-full flex flex-col justify-between space-y-2 text-[#25282A]">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#5A6066] border-b border-[#DCD7C9] pb-1">
              <span className="text-[#3D5A6E] font-bold uppercase tracking-wider">AI Worksheets Product POC (Part 1)</span>
              <span className="text-[#6E747C]">Full-Stack POC</span>
            </div>

            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1A1D20] leading-snug">
              Moving Beyond Productivity Wrappers
            </h2>

            <p className="text-[11px] text-[#33373B] leading-relaxed">
              With the AI Worksheets POC, I took the step from using AI inside a workflow to engineering an application around AI. The objective was automated TEKS-aligned educational content generation across formal and gamified formats.
            </p>

            <div className="p-2 rounded bg-[#F7F5EE] border border-[#D5D0C0] space-y-1 font-mono text-[9px]">
              <span className="text-[#3D5A6E] font-bold block uppercase tracking-wider">Application Architecture:</span>
              <div>• <strong>Frontend:</strong> React 18 / TypeScript / Vite 6</div>
              <div>• <strong>Backend:</strong> Asynchronous FastAPI / Python 3.12</div>
              <div>• <strong>Gateway:</strong> Portkey AI gateway + Localized Gemini Flash</div>
              <div>• <strong>Orchestration:</strong> Docker Compose containerization</div>
            </div>

            <p className="text-[10px] text-[#454A4F] leading-snug">
              This required solving real engineering concerns: separating client state from backend generation, managing async requests, enforcing schemas, and ensuring predictable latency.
            </p>
          </div>

          <div className="pt-2 border-t border-[#DCD7C9] flex items-center justify-between text-[11px] font-mono text-[#6E747C]">
            <span>FULL-STACK ARCHITECTURE</span>
            <Link href="/projects/ai-worksheets" className="text-[#3D5A6E] hover:underline font-bold">
              View Worksheets POC →
            </Link>
          </div>
        </div>
      )
    },
    rightPage: {
      pageNumber: 16,
      header: 'CH. 13 // DUAL-ENGINE SYNTHESIS',
      marginalLabel: 'COMPILERS',
      content: () => (
        <div className="h-full flex flex-col justify-between space-y-2 text-[#25282A]">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#5A6066] border-b border-[#DCD7C9] pb-1">
              <span className="text-[#3D5A6E] font-bold uppercase tracking-wider">AI Worksheets (Part 2)</span>
              <span className="text-[#2E5F46] font-bold font-mono">TikZ & Solvers</span>
            </div>

            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1A1D20] leading-snug">
              Compilers & Algorithmic Solvers Around AI
            </h2>

            <p className="text-[11px] text-[#33373B] leading-relaxed">
              The POC balanced two distinct generation pipelines, demonstrating that some problems belong to LLMs while others must be solved deterministically:
            </p>

            <div className="space-y-1.5 text-[9.5px]">
              <div className="p-1.5 rounded bg-[#EFECE3] border border-[#D5D0C0]">
                <strong className="text-[#3D5A6E] block font-mono">1. Headless TikZ/LaTeX Compiler Pool:</strong>
                <span className="text-[#454A4F]">Compiling verified TikZ code through local pdflatex subprocesses into 300-DPI publication-grade mathematical diagrams.</span>
              </div>
              <div className="p-1.5 rounded bg-[#EFECE3] border border-[#D5D0C0]">
                <strong className="text-[#2E5F46] block font-mono">2. 2D Backtracking Solvers:</strong>
                <span className="text-[#454A4F]">Algorithmic crossword and hexagonal maze generation. The LLM supplied vocabulary and clues; deterministic algorithms generated and guaranteed the solvable board topology.</span>
              </div>
            </div>

            <div className="p-2 rounded bg-[#EFECE3]/80 border-l-2 border-[#2E5F46] text-[10px] font-serif italic text-[#1A1D20] leading-snug">
              &ldquo;I was thinking about AI not simply as something that produces text, but as a component that must exist inside an application with inputs, outputs, validation, and human review.&rdquo;
            </div>
          </div>

          <div className="pt-2 border-t border-[#DCD7C9] flex items-center justify-between text-[11px] font-mono text-[#6E747C]">
            <span>SYSTEM BOUNDARIES</span>
            <span>TURN SPREAD FOR CH. 14 →</span>
          </div>
        </div>
      )
    }
  },

  // =========================================================================
  // SPREAD 08: CHAPTER 14 // FROM APPLICATIONS TO PIPELINES (017 & 018)
  // =========================================================================
  {
    id: 'spread-08-item-bank-pipeline',
    spreadIndex: 8,
    chapterNumber: '14',
    chapterTitle: 'From Applications to Pipelines',
    journeyStage: 'US MATH ITEM BANK PIPELINE',
    leftPage: {
      pageNumber: 17,
      header: 'CH. 14 // STATEFUL ITEM GENERATION',
      marginalLabel: 'LANGGRAPH',
      content: () => (
        <div className="h-full flex flex-col justify-between space-y-2 text-[#25282A]">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#5A6066] border-b border-[#DCD7C9] pb-1">
              <span className="text-[#7A6028] font-bold uppercase tracking-wider">US Math Item Bank (Team System)</span>
              <span className="text-[#6E747C]">LangGraph Pipeline</span>
            </div>

            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1A1D20] leading-snug">
              Moving from Applications to Pipelines
            </h2>

            <p className="text-[11px] text-[#33373B] leading-relaxed">
              As Wayground&apos;s curriculum production requirements scaled, single-turn application prompts were replaced by a stateful multi-step pipeline built as a team system.
            </p>

            <p className="text-[10.5px] text-[#454A4F] leading-relaxed">
              My core contributions centered on:
            </p>

            <div className="p-2 rounded bg-[#F7F5EE] border border-[#D5D0C0] space-y-1 font-mono text-[9px] text-[#454A4F]">
              <div>• <strong>Mathematical Domain Routing:</strong> Routing geometry to SVG vs. algebra and statistics to TikZ/LaTeX.</div>
              <div>• <strong>Two-Tier Compile Gates:</strong> Enforcing syntax validation and visual inspection before items reached SME review.</div>
              <div>• <strong>Upper Elementary Schemas:</strong> Stabilizing grade 3–5 assessment specifications.</div>
            </div>

            <p className="text-[10px] text-[#555C62] leading-snug italic">
              Note: This was a collaborative company team system; I explicitly distinguish team orchestration from my individual contributions to visual routing and compile gates.
            </p>
          </div>

          <div className="pt-2 border-t border-[#DCD7C9] flex items-center justify-between text-[11px] font-mono text-[#6E747C]">
            <span>STATEFUL PIPELINES</span>
            <Link href="/projects/math-item-bank" className="text-[#7A6028] hover:underline font-bold">
              View Item Bank System →
            </Link>
          </div>
        </div>
      )
    },
    rightPage: {
      pageNumber: 18,
      header: 'CH. 14 // CURRICULUM WEIGHTAGE & GATES',
      marginalLabel: 'WEIGHTING',
      content: () => (
        <div className="h-full flex flex-col justify-between space-y-2 text-[#25282A]">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#5A6066] border-b border-[#DCD7C9] pb-1">
              <span className="text-[#3D5A6E] font-bold uppercase tracking-wider">Curriculum Distribution</span>
              <span className="text-[#2E5F46] font-bold font-mono">Min/Max Swap</span>
            </div>

            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1A1D20] leading-snug">
              Balancing Curriculum Standards at Scale
            </h2>

            <p className="text-[11px] text-[#33373B] leading-relaxed">
              A major engineering challenge was curriculum distribution: generating items is easy, but ensuring that specific standards (e.g. TEKS 5.3K vs 5.4B) meet precise percentage allocations without drift requires mathematical optimization.
            </p>

            <div className="p-2 rounded bg-[#EFECE3]/75 border border-[#D5D0C0] space-y-1 font-mono text-[9px] text-[#3A3E42]">
              <span className="text-[#3D5A6E] font-bold block uppercase tracking-wider">Curriculum Constraint Solver:</span>
              <div>• Integer Linear Programming (ILP) formulation</div>
              <div>• Deterministic Min/Max Swap optimization across generation pools</div>
              <div>• Continuous SME review loop ensuring pedagogical fidelity</div>
            </div>

            <div className="p-2 rounded bg-[#EFECE3]/80 border-l-2 border-[#3D5A6E] text-[10px] font-serif italic text-[#1A1D20] leading-snug">
              &ldquo;The question was no longer simply &apos;Can an LLM generate a question?&apos; It became &apos;How do I construct a system that can generate, organize, constrain, and review a large body of mathematical items?&apos;&rdquo;
            </div>
          </div>

          <div className="pt-2 border-t border-[#DCD7C9] flex items-center justify-between text-[11px] font-mono text-[#6E747C]">
            <span>CONSTRAINED DISTRIBUTION</span>
            <span>TURN SPREAD FOR CH. 15 →</span>
          </div>
        </div>
      )
    }
  },

  // =========================================================================
  // SPREAD 09: CHAPTER 15 // TRANSFORMATION PIPELINES (019 & 020)
  // =========================================================================
  {
    id: 'spread-09-curriculum-etl',
    spreadIndex: 9,
    chapterNumber: '15',
    chapterTitle: 'Transformation Pipelines',
    journeyStage: 'CURRICULUM TRANSFORMATION ENGINE',
    leftPage: {
      pageNumber: 19,
      header: 'CH. 15 // ETL & MAP-REDUCE EXTRACTION',
      marginalLabel: 'ETL PIPELINE',
      content: () => (
        <div className="h-full flex flex-col justify-between space-y-2 text-[#25282A]">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#5A6066] border-b border-[#DCD7C9] pb-1">
              <span className="text-[#3D5A6E] font-bold uppercase tracking-wider">Curriculum Transformation Engine</span>
              <span className="text-[#6E747C]">Map-Reduce ETL</span>
            </div>

            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1A1D20] leading-snug">
              When the Problem Became a Transformation Pipeline
            </h2>

            <p className="text-[11px] text-[#33373B] leading-relaxed">
              State educational standards arrive in messy, unstructured formats (multi-column PDFs, nested tables, DOCX files). Transforming these into structured tabular databases was a severe operational bottleneck.
            </p>

            <p className="text-[10.5px] text-[#454A4F] leading-relaxed">
              I built an asynchronous Map-Reduce pipeline that chunks large curriculum documents, dispatches parallel Claude workers with strict JSON tool calling, and normalizes disparate state taxonomy into unified tabular formats.
            </p>

            <div className="p-2 rounded bg-[#EFECE3]/80 border-l-2 border-[#3D5A6E] text-[10px] font-serif italic text-[#1A1D20] leading-snug">
              &ldquo;Once AI was being used to transform structured information at scale, generation alone was no longer enough. The transformation itself needed structure, validation, and explicit boundaries.&rdquo;
            </div>
          </div>

          <div className="pt-2 border-t border-[#DCD7C9] flex items-center justify-between text-[11px] font-mono text-[#6E747C]">
            <span>DISTRIBUTED EXTRACTION</span>
            <Link href="/projects/curriculum-etl" className="text-[#3D5A6E] hover:underline font-bold">
              View Curriculum ETL →
            </Link>
          </div>
        </div>
      )
    },
    rightPage: {
      pageNumber: 20,
      header: 'CH. 15 // SCHEMA CONTRACTS & INTEGRITY GATES',
      marginalLabel: 'SCHEMA GATES',
      content: () => (
        <div className="h-full flex flex-col justify-between space-y-2 text-[#25282A]">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#5A6066] border-b border-[#DCD7C9] pb-1">
              <span className="text-[#3D5A6E] font-bold uppercase tracking-wider">Runtime Contracts</span>
              <span className="text-[#2E5F46] font-bold font-mono">3-Tier Integrity Gates</span>
            </div>

            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1A1D20] leading-snug">
              Deriving Schema Contracts & Integrity Gates
            </h2>

            <p className="text-[11px] text-[#33373B] leading-relaxed">
              Instead of hardcoding brittle extraction logic for every state curriculum, the engine analyzes sample datasets to derive dynamic schema contracts without hardcoded scrapers.
            </p>

            <div className="p-2 rounded bg-[#1C2024] text-[#E5E0D5] font-mono text-[8.5px] space-y-1">
              <div className="text-[#71899A]">// Three-Tier Integrity Verification (Reviewer → Critic → CSV Audit)</div>
              <div>Tier 1: Reviewer validates schema structure & tool calling compliance</div>
              <div>Tier 2: Critic tests semantic alignment against curriculum standards</div>
              <div>Tier 3: CSV Audit evaluates delimiters, null thresholds, and export integrity</div>
            </div>

            <div className="p-2 rounded bg-[#EFECE3]/80 border-l-2 border-[#2E5F46] text-[10px] font-serif italic text-[#1A1D20] leading-snug">
              &ldquo;The broader engineering principle becomes: AI performs flexible semantic transformation; deterministic validation checks whether the resulting structure satisfies explicit schema contracts.&rdquo;
            </div>
          </div>

          <div className="pt-2 border-t border-[#DCD7C9] flex items-center justify-between text-[11px] font-mono text-[#6E747C]">
            <span>WAYGROUND ARC COMPLETE</span>
            <span>TURN SPREAD FOR CH. 16 →</span>
          </div>
        </div>
      )
    }
  },

  // =========================================================================
  // SPREAD 10: TRANSITION & CHAPTER 16 // INDEPENDENT BUILDS: LOOM AI (021 & 022)
  // =========================================================================
  {
    id: 'spread-10-loom-ai',
    spreadIndex: 10,
    chapterNumber: '16',
    chapterTitle: 'From Using AI to Building AI',
    journeyStage: 'INDEPENDENT AI ENGINEERING · LOOM AI',
    leftPage: {
      pageNumber: 21,
      header: 'TRANSITION // FROM USING TO BUILDING',
      marginalLabel: 'INDEPENDENT',
      content: () => (
        <div className="h-full flex flex-col justify-between space-y-2 text-[#25282A]">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#5A6066] border-b border-[#DCD7C9] pb-1">
              <span className="text-[#58A6FF] font-bold uppercase tracking-wider">The Career Transition</span>
              <span className="text-[#6E747C]">Mid-2025 — 2026</span>
            </div>

            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1A1D20] leading-snug">
              From Using AI to Building AI Systems
            </h2>

            <p className="text-[11px] text-[#33373B] leading-relaxed">
              By the end of my time at Wayground, I was no longer approaching AI primarily as a feature inside content production. I had seen why models fail, why prompt engineering is insufficient, and how deterministic verification creates reliability.
            </p>

            <p className="text-[10.5px] text-[#454A4F] leading-relaxed">
              I moved into self-directed independent AI systems engineering. The projects that followed—Loom AI, Atlas AI, Engineering Design Automation, and AI Browser QA—were independent builds where I designed the complete system architecture from scratch.
            </p>

            <div className="p-2 rounded bg-[#EFECE3]/80 border-l-2 border-[#3D5A6E] text-[10.5px] font-serif italic text-[#1A1D20] leading-snug">
              &ldquo;I was no longer only working inside someone else&apos;s workflow. I was designing and implementing the end-to-end workflow itself.&rdquo;
            </div>
          </div>

          <div className="pt-2 border-t border-[#DCD7C9] flex items-center justify-between text-[11px] font-mono text-[#6E747C]">
            <span>INDEPENDENT BUILDS</span>
            <span>SYSTEMS PERSPECTIVE</span>
          </div>
        </div>
      )
    },
    rightPage: {
      pageNumber: 22,
      header: 'CH. 16 // LOOM AI: APPLICATION ARCHITECTURE',
      marginalLabel: 'LOOM AI',
      content: () => (
        <div className="h-full flex flex-col justify-between space-y-2 text-[#25282A]">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#5A6066] border-b border-[#DCD7C9] pb-1">
              <span className="text-[#3D5A6E] font-bold uppercase tracking-wider">Loom AI · B2B Textile Marketplace</span>
              <span className="text-[#6E747C]">Next.js 16 / LangGraph</span>
            </div>

            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1A1D20] leading-snug">
              End-to-End AI Application Architecture
            </h2>

            <p className="text-[11px] text-[#33373B] leading-relaxed">
              Loom AI was an independent build exploring Clean Architecture and stateful multi-tier procurement workflows for industrial textile supply chains:
            </p>

            <div className="p-2 rounded bg-[#F7F5EE] border border-[#D5D0C0] space-y-1 font-mono text-[9px] text-[#3A3E42]">
              <div>• <strong>Frontend:</strong> Next.js 16 (App Router), React 19, Tailwind CSS</div>
              <div>• <strong>Backend:</strong> Express / TypeScript adhering to Clean Architecture</div>
              <div>• <strong>Agentic Workflows:</strong> LangGraph state machine coordinating quote requests, vendor match scoring, and procurement negotiation</div>
              <div>• <strong>Human-in-the-Loop:</strong> Explicit authorization gates before executing high-value purchase orders</div>
            </div>

            <div className="p-2 rounded bg-[#EFECE3]/80 border-l-2 border-[#3D5A6E] text-[10px] font-serif italic text-[#1A1D20] leading-snug">
              &ldquo;The point was not the tech stack list. The point was learning how to structure complex asynchronous agentic workflows with strict human approval gates.&rdquo;
            </div>
          </div>

          <div className="pt-2 border-t border-[#DCD7C9] flex items-center justify-between text-[11px] font-mono text-[#6E747C]">
            <span>CLEAN ARCHITECTURE</span>
            <Link href="/projects/loom-ai" className="text-[#3D5A6E] hover:underline font-bold">
              View Loom AI →
            </Link>
          </div>
        </div>
      )
    }
  },

  // =========================================================================
  // SPREAD 11: CHAPTER 17 // STATEFUL WORKFLOWS & RETRIEVAL: ATLAS AI (023 & 024)
  // =========================================================================
  {
    id: 'spread-11-atlas-ai',
    spreadIndex: 11,
    chapterNumber: '17',
    chapterTitle: 'Stateful Workflows + Retrieval',
    journeyStage: 'INDEPENDENT AI ENGINEERING · ATLAS AI',
    leftPage: {
      pageNumber: 23,
      header: 'CH. 17 // ATLAS AI: SEC FILING RAG',
      marginalLabel: 'ATLAS AI',
      content: () => (
        <div className="h-full flex flex-col justify-between space-y-2 text-[#25282A]">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#5A6066] border-b border-[#DCD7C9] pb-1">
              <span className="text-[#3D5A6E] font-bold uppercase tracking-wider">Atlas AI · Financial Copilot (Part 1)</span>
              <span className="text-[#6E747C]">SEC EDGAR & Markets</span>
            </div>

            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1A1D20] leading-snug">
              Stateful Workflows + Retrieval + Tools
            </h2>

            <p className="text-[11px] text-[#33373B] leading-relaxed">
              Atlas AI was an independent build exploring conversational RAG over complex financial documents. It paired real-time SEC EDGAR filings (10-K, 10-Q) with live market feeds from Finnhub.
            </p>

            <div className="p-2 rounded bg-[#F7F5EE] border border-[#D5D0C0] space-y-1 font-mono text-[9px] text-[#3A3E42]">
              <div>• <strong>Embeddings & Search:</strong> Gemini embeddings + MongoDB Atlas Vector Search</div>
              <div>• <strong>Graph Orchestration:</strong> LangGraph state routing managing conversational memory and document chunk retrieval</div>
              <div>• <strong>Tool Execution:</strong> Parallel fetching of historical pricing, fundamentals, and insider transactions</div>
            </div>

            <p className="text-[10px] text-[#454A4F] leading-snug">
              Financial analysts cannot tolerate hallucinated numbers. Retrieval chunking had to preserve balance sheet tables without mangling numeric relationships.
            </p>
          </div>

          <div className="pt-2 border-t border-[#DCD7C9] flex items-center justify-between text-[11px] font-mono text-[#6E747C]">
            <span>FINANCIAL RAG</span>
            <Link href="/projects/atlas-ai" className="text-[#3D5A6E] hover:underline font-bold">
              View Atlas AI →
            </Link>
          </div>
        </div>
      )
    },
    rightPage: {
      pageNumber: 24,
      header: 'CH. 17 // BACKGROUND AGENTS & 178 TESTS',
      marginalLabel: 'VERIFICATION',
      content: () => (
        <div className="h-full flex flex-col justify-between space-y-2 text-[#25282A]">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#5A6066] border-b border-[#DCD7C9] pb-1">
              <span className="text-[#3D5A6E] font-bold uppercase tracking-wider">Atlas AI (Part 2)</span>
              <span className="text-[#2E5F46] font-bold font-mono">178 Passing Tests</span>
            </div>

            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1A1D20] leading-snug">
              Background Workers & Test Discipline
            </h2>

            <p className="text-[11px] text-[#33373B] leading-relaxed">
              Beyond conversational question-answering, Atlas AI included a proactive background AlertWorker. It continuously scanned market feeds, evaluated alert triggers against stateful user watchlists, and dispatched Telegram notifications.
            </p>

            <div className="p-2 rounded bg-[#EFECE3]/75 border border-[#D5D0C0] space-y-0.5 font-mono text-[9px] text-[#3A3E42]">
              <span className="text-[#3D5A6E] font-bold block uppercase tracking-wider">178 Automated Tests Covered:</span>
              <div>• Graph state transitions and routing fallbacks</div>
              <div>• SEC HTML parser handling malformed tables</div>
              <div>• Vector retrieval latency and chunk reranking</div>
              <div>• Background worker thread safety and alert thresholds</div>
            </div>

            <div className="p-2 rounded bg-[#EFECE3]/80 border-l-2 border-[#2E5F46] text-[10px] font-serif italic text-[#1A1D20] leading-snug">
              &ldquo;The progression continued: from an AI feature, to an application, to state, to retrieval, to background workers, to automated test suites.&rdquo;
            </div>
          </div>

          <div className="pt-2 border-t border-[#DCD7C9] flex items-center justify-between text-[11px] font-mono text-[#6E747C]">
            <span>PROACTIVE AGENTS</span>
            <span>TURN SPREAD FOR CH. 18 →</span>
          </div>
        </div>
      )
    }
  },

  // =========================================================================
  // SPREAD 12: CHAPTER 18 // AI MEETS DETERMINISTIC ENGINEERING: EDA (025 & 026)
  // =========================================================================
  {
    id: 'spread-12-eda',
    spreadIndex: 12,
    chapterNumber: '18',
    chapterTitle: 'AI Meets Deterministic Engineering',
    journeyStage: 'ENGINEERING DESIGN AUTOMATION',
    leftPage: {
      pageNumber: 25,
      header: 'CH. 18 // EDA: INTENT TO PHYSICS',
      marginalLabel: 'PHYSICS',
      content: () => (
        <div className="h-full flex flex-col justify-between space-y-2 text-[#25282A]">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#5A6066] border-b border-[#DCD7C9] pb-1">
              <span className="text-[#2E5F46] font-bold uppercase tracking-wider">Engineering Design Automation (Part 1)</span>
              <span className="text-[#6E747C]">Mechanical Synthesis</span>
            </div>

            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1A1D20] leading-snug">
              AI Interprets. Deterministic Systems Constrain.
            </h2>

            <p className="text-[11px] text-[#33373B] leading-relaxed">
              In mechanical engineering, a hallucinated calculation causes catastrophic physical failure. I built EDA to investigate how AI can interpret natural-language design briefs while deterministic physics solvers enforce physical laws.
            </p>

            <div className="p-2 rounded bg-[#1C2024] text-[#E5E0D5] font-mono text-[8.5px] space-y-1">
              <div className="text-[#71899A]">// Verified Physical Benchmark: Power Transmission Shaft</div>
              <div>Input: 7.5 kW, 1200 RPM, Torque = 59.68 N·m, FoS = 2.2, L = 350 mm</div>
              <div>Material: AISI 1045 Steel (Tensile 565 MPa, Yield 310 MPa)</div>
              <div>Deterministic Solver: d_calc = 15.22 mm =&gt; Selected Standard = 16.0 mm</div>
              <div className="text-[#5A9A78]">=&gt; Resulting Factor of Safety = 2.41 (Passed Constraint)</div>
            </div>

            <p className="text-[10px] text-[#454A4F] leading-snug">
              The LLM extracted the engineering parameters from conversational prose; deterministic analytical formulas calculated the shaft dimensions and stresses.
            </p>
          </div>

          <div className="pt-2 border-t border-[#DCD7C9] flex items-center justify-between text-[11px] font-mono text-[#6E747C]">
            <span>PHYSICAL INVARIANTS</span>
            <Link href="/projects/design-automation" className="text-[#2E5F46] hover:underline font-bold">
              View EDA System →
            </Link>
          </div>
        </div>
      )
    },
    rightPage: {
      pageNumber: 26,
      header: 'CH. 18 // OPENCASCADE CAD & MATERIAL PROVENANCE',
      marginalLabel: 'CAD KERNEL',
      content: () => (
        <div className="h-full flex flex-col justify-between space-y-2 text-[#25282A]">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#5A6066] border-b border-[#DCD7C9] pb-1">
              <span className="text-[#3D5A6E] font-bold uppercase tracking-wider">EDA (Part 2)</span>
              <span className="text-[#2E5F46] font-bold font-mono">424 Passing Tests</span>
            </div>

            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1A1D20] leading-snug">
              Invariant Geometry & Material Provenance
            </h2>

            <p className="text-[11px] text-[#33373B] leading-relaxed">
              Calculated parameters were passed directly to an OpenCascade BRep CAD kernel, generating valid 3D STEP solid models and 2D engineering SVG blueprints with 0.0000% volume calculation error.
            </p>

            <div className="p-2 rounded bg-[#EFECE3]/75 border border-[#D5D0C0] space-y-1 font-mono text-[9px] text-[#3A3E42]">
              <div>• <strong>Strict Material Provenance:</strong> Materials are loaded from verified ASTM/EN tables. No hallucinated steel grades or inferred yield strengths.</div>
              <div>• <strong>Automated Verification:</strong> 424 automated tests passing across 28 test suites in the Dockerized test runner covering thermal, stress, and geometry validation.</div>
            </div>

            <div className="p-2 rounded bg-[#EFECE3]/80 border-l-2 border-[#2E5F46] text-[10px] font-serif italic text-[#1A1D20] leading-snug">
              &ldquo;AI interprets engineering intent. Deterministic software calculates, constrains, and verifies. Physical truth cannot be left to probabilistic approximations.&rdquo;
            </div>
          </div>

          <div className="pt-2 border-t border-[#DCD7C9] flex items-center justify-between text-[11px] font-mono text-[#6E747C]">
            <span>CAD SYNTHESIS</span>
            <span>TURN SPREAD FOR CH. 19 →</span>
          </div>
        </div>
      )
    }
  },

  // =========================================================================
  // SPREAD 13: CHAPTER 19 // THE RELIABILITY QUESTION (027 & 028)
  // =========================================================================
  {
    id: 'spread-13-reliability-browser-qa',
    spreadIndex: 13,
    chapterNumber: '19',
    chapterTitle: 'The Reliability Question',
    journeyStage: 'AI APPLICATION RELIABILITY & BROWSER QA',
    leftPage: {
      pageNumber: 27,
      header: 'CH. 19 // HOW DO WE KNOW WHAT AI DID?',
      marginalLabel: 'EXECUTION',
      content: () => (
        <div className="h-full flex flex-col justify-between space-y-2 text-[#25282A]">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#5A6066] border-b border-[#DCD7C9] pb-1">
              <span className="text-[#3D5A6E] font-bold uppercase tracking-wider">Browser QA Platform (Part 1)</span>
              <span className="text-[#6E747C]">Execution Grounding</span>
            </div>

            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1A1D20] leading-snug">
              Grounding Reasoning in Real Telemetry
            </h2>

            <p className="text-[11px] text-[#33373B] leading-relaxed">
              As AI applications become more autonomous, the central question shifts: it is no longer &ldquo;Can AI build this?&rdquo; It is: &ldquo;How do we know what the AI actually did?&rdquo;
            </p>

            <p className="text-[10.5px] text-[#454A4F] leading-relaxed">
              I built an autonomous browser testing platform pairing local reasoning (Ollama / Qwen 2.5 Coder) with Playwright execution grounding. The agent does not guess what the UI looks like; it inspects DOM snapshots, network payloads, console errors, and screenshots.
            </p>

            <div className="p-2 rounded bg-[#EFECE3]/80 border-l-2 border-[#3D5A6E] text-[10px] font-serif italic text-[#1A1D20] leading-snug">
              &ldquo;Autonomous agents cannot be evaluated by what they claim in prose. They must be evaluated against empirical execution telemetry.&rdquo;
            </div>
          </div>

          <div className="pt-2 border-t border-[#DCD7C9] flex items-center justify-between text-[11px] font-mono text-[#6E747C]">
            <span>TELEMETRY GROUNDING</span>
            <Link href="/projects/ai-reliability" className="text-[#3D5A6E] hover:underline font-bold">
              View Browser QA System →
            </Link>
          </div>
        </div>
      )
    },
    rightPage: {
      pageNumber: 28,
      header: 'CH. 19 // COVARIANCE UNCERTAINTY & GOVERNANCE',
      marginalLabel: 'GOVERNANCE',
      content: () => (
        <div className="h-full flex flex-col justify-between space-y-2 text-[#25282A]">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#5A6066] border-b border-[#DCD7C9] pb-1">
              <span className="text-[#3D5A6E] font-bold uppercase tracking-wider">Browser QA (Part 2)</span>
              <span className="text-[#2E5F46] font-bold font-mono">158 Tests + 47 E2E</span>
            </div>

            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1A1D20] leading-snug">
              Uncertainty Abstention & Human Authorization
            </h2>

            <p className="text-[11px] text-[#33373B] leading-relaxed">
              The platform incorporates covariance uncertainty filtering to evaluate model confidence before DOM execution. When telemetry ambiguity is high or signal confidence drops below safety bounds, the agent deterministically abstains from speculative actions rather than guessing.
            </p>

            <div className="p-2 rounded bg-[#F7F5EE] border border-[#D5D0C0] space-y-1 font-mono text-[9px] text-[#3A3E42]">
              <div>• <strong>Dogfooding Evidence:</strong> Dogfooded against VM Copy, reproducing and diagnosing subtle UI state regressions without guessing.</div>
              <div>• <strong>Governance Authorization:</strong> Autonomous exploration operates under strict governance; remediation actions require explicit human authorization gates before applying patches.</div>
              <div>• <strong>Verified Test Matrix:</strong> 158 backend tests and 47 governance & Playwright E2E verification tests across 12 Next.js pages.</div>
            </div>

            <div className="p-2 rounded bg-[#EFECE3]/80 border-l-2 border-[#2E5F46] text-[10px] font-serif italic text-[#1A1D20] leading-snug">
              &ldquo;The evolution: Generation → Evaluation → Verification → Telemetry Evidence → Governance → Reliability. This brings me to the expanding horizon.&rdquo;
            </div>
          </div>

          <div className="pt-2 border-t border-[#DCD7C9] flex items-center justify-between text-[11px] font-mono text-[#6E747C]">
            <span>RELIABILITY & GOVERNANCE</span>
            <span>TURN TO CHAPTER 20 [ ? ] →</span>
          </div>
        </div>
      )
    }
  },

  // =========================================================================
  // SPREAD 14: CHAPTER 10 // STILL BUILDING (?) (029 & 030)
  // =========================================================================
  {
    id: 'spread-14-chapter-10-open',
    spreadIndex: 14,
    chapterNumber: '10',
    chapterTitle: 'Still Building',
    journeyStage: 'THE OPEN SPIRAL [ ? ]',
    leftPage: {
      pageNumber: 29,
      header: 'CH. 10 // STILL BUILDING',
      marginalLabel: 'SPIRAL',
      content: () => (
        <div className="h-full flex flex-col justify-between space-y-2.5 text-[#25282A]">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#5A6066] border-b border-[#DCD7C9] pb-1">
              <span className="text-[#3D5A6E] font-bold uppercase tracking-wider">The Continuous Horizon</span>
              <span className="text-[#6E747C]">Open Ending</span>
            </div>

            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1A1D20] leading-snug">
              Reflecting on the Spiral
            </h2>

            <p className="text-[10.5px] text-[#33373B] leading-relaxed">
              The spiral binding of this journal is not decorative. It physically carries the accumulated progression:
            </p>

            <div className="p-2 rounded bg-[#EFECE3]/80 border border-[#D5D0C0] space-y-1">
              <span className="text-[8.5px] font-mono uppercase tracking-widest text-[#3D5A6E] font-bold block">
                Accumulated Progression
              </span>
              <div className="flex flex-wrap items-center gap-1 text-[9.5px] font-mono font-medium text-[#1E2124]">
                <span className="px-1 py-0.5 rounded bg-[#EAE6DB]">CONTENT</span>
                <span>→</span>
                <span className="px-1 py-0.5 rounded bg-[#EAE6DB]">SME</span>
                <span>→</span>
                <span className="px-1 py-0.5 rounded bg-[#EAE6DB]">REPRESENTATION</span>
                <span>→</span>
                <span className="px-1 py-0.5 rounded bg-[#EAE6DB]">VISUALS</span>
                <span>→</span>
                <span className="px-1 py-0.5 rounded bg-[#EAE6DB]">TOOLING</span>
                <span>→</span>
                <span className="px-1 py-0.5 rounded bg-[#EAE6DB]">AI</span>
                <span>→</span>
                <span className="px-1 py-0.5 rounded bg-[#EAE6DB]">AGENTS</span>
                <span>→</span>
                <span className="px-1 py-0.5 rounded bg-[#EAE6DB]">RELIABILITY</span>
                <span>→</span>
                <span className="px-1.5 py-0.5 rounded bg-[#3D5A6E] text-[#F7F5EE] font-bold">?</span>
              </div>
            </div>

            <p className="text-[10.5px] text-[#454A4F] leading-relaxed">
              The question mark at the end is intentional. It communicates that the learning process is still open. I did not reach a final state; I reached a place where the questions are deeper and more exciting.
            </p>
          </div>

          <div className="pt-2 border-t border-[#DCD7C9] flex items-center justify-between text-[11px] font-mono text-[#6E747C]">
            <span>OPEN SPIRAL</span>
            <span className="font-serif italic text-[#3D5A6E] font-semibold">&ldquo;Every system teaches me.&rdquo;</span>
          </div>
        </div>
      )
    },
    rightPage: {
      pageNumber: 30,
      header: 'CH. 10 // STILL LEARNING',
      marginalLabel: 'HORIZON',
      content: () => (
        <div className="h-full flex flex-col justify-between space-y-2 text-[#25282A]">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#5A6066] border-b border-[#DCD7C9] pb-1">
              <span className="text-[#3D5A6E] font-bold uppercase tracking-wider">The Engineering Horizon</span>
              <span className="text-[#2E5F46] font-bold font-mono">STILL BUILDING. STILL LEARNING.</span>
            </div>

            <div className="p-3 rounded bg-[#EFECE3]/85 border-l-2 border-[#2E5F46] space-y-2 shadow-xs">
              <h3 className="text-xs sm:text-[13px] font-serif font-bold text-[#1A1D20] tracking-wide uppercase">
                NOT AN END....JUST A BEGINNING....
              </h3>

              <div className="space-y-1.5 text-[10px] sm:text-[10.5px] text-[#2D3136] leading-relaxed font-serif">
                <p>
                  I ever think each day of my journey with AI not an end, but a beginning to turn my thoughts into action, to put my enthusiasm into practice, to create, contribute and reach a new horizon in this revolutionary field of AI that has, in so short a time, covered every field of life.
                </p>

                <p>
                  I am not documenting everything I have done. I am documenting what I learned, what I contributed, and what each system taught me along the way.
                </p>

                <p>
                  Every system became a lesson. Every challenge changed the way of my thought. And every new problem opened new avenues for me to accept the challenges and solve them perfectly and quickly that won the admiration and good wishes of all for me.
                </p>

                <p className="italic text-[#1E2124]">
                  The next page is yet to be written as....&nbsp;
                </p>

                <p className="font-semibold text-[#1A1D20] pl-2 border-l border-[#2E5F46]/50">
                  I am looking forward to more opportunities to contribute my knowledge, talent, and dedication &mdash; and to build, learn, and discover along with those who wish to join hands with me.
                </p>
              </div>

              <div className="pt-2 border-t border-[#D5D0C0] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-[10px]">
                <p className="font-sans italic text-[#4A5056]">
                  Thank you my kind and patient reader for sharing your precious time, with this AI Enthusiast.
                </p>
                <span className="font-serif font-bold text-[#2E5F46] text-[11px] whitespace-nowrap">
                  &mdash; Mohemmed Aadil Khurshid
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#DCD7C9] flex items-center justify-between text-[11px] font-mono text-[#6E747C]">
            <span className="font-bold text-[#1E2124]">PAGE 030 · [ ? ]</span>
            <span>TURN TO SYSTEMS CATALOG →</span>
          </div>
        </div>
      )
    }
  },

  // =========================================================================
  // SPREAD 15: EPILOGUE // SYSTEMS CATALOG & ARCHIVE (031 & 032)
  // =========================================================================
  {
    id: 'spread-15-systems-catalog',
    spreadIndex: 15,
    chapterNumber: 'EPILOGUE',
    chapterTitle: 'Systems Catalog & Archive',
    journeyStage: 'THE AUTHORITATIVE SYSTEMS ARCHIVE',
    leftPage: {
      pageNumber: 31,
      header: 'EPILOGUE // SYSTEMS CATALOG',
      marginalLabel: 'CATALOG',
      content: () => (
        <div className="h-full flex flex-col justify-between space-y-2 text-[#25282A]">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#5A6066] border-b border-[#DCD7C9] pb-0.5">
              <span className="font-bold text-[#1E2124]">SYSTEMS CATALOG // REPOSITORY ARCHIVE</span>
              <span className="text-[#3D5A6E] font-semibold">AUTHORITATIVE</span>
            </div>

            <p className="text-[10px] text-[#454A4F] leading-snug">
              Production systems, deterministic verification pipelines, and autonomous platforms. Organized strictly by independent professional ownership at Wayground, team collaboration, and personal engineering builds:
            </p>

            <div className="space-y-1 text-[9.5px]">
              {/* Professional Engineering */}
              <div className="p-1.5 rounded bg-[#EFECE3] border border-[#D5D0C0] space-y-0.5">
                <span className="font-mono text-[#3D5A6E] font-bold uppercase text-[8.5px] block">
                  PROFESSIONAL ENGINEERING · WAYGROUND
                </span>
                <div className="space-y-0.5 text-[#1E2124]">
                  <div className="flex justify-between items-center">
                    <Link href="/projects/vm-copy" className="hover:underline font-semibold">VM Copy Question Generator</Link>
                    <span className="font-mono text-[8px] text-[#6E747C]">Independent Build</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <Link href="/projects/ai-worksheets" className="hover:underline font-semibold">AI Worksheets Product POC</Link>
                    <span className="font-mono text-[8px] text-[#6E747C]">Independent Build</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <Link href="/projects/curriculum-etl" className="hover:underline font-semibold">Curriculum Transformation Engine</Link>
                    <span className="font-mono text-[8px] text-[#6E747C]">Independent Build</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <Link href="/projects/math-item-bank" className="hover:underline font-semibold text-[#7A6028]">US Math Item Bank Generation Pipeline</Link>
                    <span className="font-mono text-[8px] text-[#7A6028]">Team System</span>
                  </div>
                </div>
              </div>

              {/* Independent Engineering */}
              <div className="p-1.5 rounded bg-[#EFECE3] border border-[#D5D0C0] space-y-0.5">
                <span className="font-mono text-[#2E5F46] font-bold uppercase text-[8.5px] block">
                  INDEPENDENT ENGINEERING · PERSONAL BUILDS
                </span>
                <div className="space-y-0.5 text-[#1E2124]">
                  <div className="flex justify-between items-center">
                    <Link href="/projects/design-automation" className="hover:underline font-semibold">Engineering Design Automation</Link>
                    <span className="font-mono text-[8px] text-[#2E5F46]">424 Tests</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <Link href="/projects/ai-reliability" className="hover:underline font-semibold">AI Application Reliability & Browser QA</Link>
                    <span className="font-mono text-[8px] text-[#2E5F46]">158+ Tests</span>
                  </div>
                </div>
              </div>

              <div className="p-1.5 rounded bg-[#EFECE3] border border-[#D5D0C0] space-y-0.5">
                <span className="font-mono text-[#3D5A6E] font-bold uppercase text-[8.5px] block">
                  INDEPENDENT ENGINEERING · HACKATHON BUILDS
                </span>
                <div className="space-y-0.5 text-[#1E2124]">
                  <div className="flex justify-between items-center">
                    <Link href="/projects/loom-ai" className="hover:underline font-semibold">Loom AI — B2B Textile Marketplace</Link>
                    <span className="font-mono text-[8px] text-[#3D5A6E]">Playwright E2E</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <Link href="/projects/atlas-ai" className="hover:underline font-semibold">Atlas AI — Financial Copilot & SEC RAG</Link>
                    <span className="font-mono text-[8px] text-[#3D5A6E]">178 Tests</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-1.5 border-t border-[#DCD7C9] flex items-center justify-between text-[11px] font-mono text-[#6E747C]">
            <span>SYSTEMS REPOSITORY</span>
            <Link href="/projects" className="text-[#3D5A6E] hover:underline font-bold">
              View All Systems Directory →
            </Link>
          </div>
        </div>
      )
    },
    rightPage: {
      pageNumber: 32,
      header: 'EPILOGUE // EVIDENCE & SPECIFICATION',
      marginalLabel: 'EVIDENCE',
      content: ({ onNavigateSpread }) => (
        <div className="h-full flex flex-col justify-between space-y-2 text-[#25282A]">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#5A6066] border-b border-[#DCD7C9] pb-0.5">
              <span className="font-bold text-[#1E2124]">VERIFIED EVIDENCE REGISTRY</span>
              <span className="text-[#6E747C]">TEST SUITES</span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 font-mono text-[9px]">
              <div className="p-1.5 rounded bg-[#F7F5EE] border border-[#D5D0C0] space-y-0.5">
                <span className="text-[#3D5A6E] font-bold block">EDA Solid Geometry:</span>
                <span className="text-[#454A4F]">0.0000% volume error; 424 automated test suites passing.</span>
              </div>
              <div className="p-1.5 rounded bg-[#F7F5EE] border border-[#D5D0C0] space-y-0.5">
                <span className="text-[#3D5A6E] font-bold block">Atlas AI SEC RAG:</span>
                <span className="text-[#454A4F]">178 automated tests across graph routing, SEC parser, and alerts.</span>
              </div>
              <div className="p-1.5 rounded bg-[#F7F5EE] border border-[#D5D0C0] space-y-0.5">
                <span className="text-[#3D5A6E] font-bold block">AI Browser QA:</span>
                <span className="text-[#454A4F]">158 backend + 47 governance tests; live VM Copy dogfooding.</span>
              </div>
              <div className="p-1.5 rounded bg-[#F7F5EE] border border-[#D5D0C0] space-y-0.5">
                <span className="text-[#3D5A6E] font-bold block">Loom AI Marketplace:</span>
                <span className="text-[#454A4F]">Playwright E2E checkout, auth, and LangGraph HITL queue tests.</span>
              </div>
            </div>

            <div className="p-2 rounded bg-[#EFECE3]/80 border-l-2 border-[#3D5A6E] space-y-1">
              <span className="text-[8.5px] font-mono uppercase tracking-widest text-[#3D5A6E] font-bold block">
                The Distinction Across the Entire Website
              </span>
              <p className="text-[9.5px] text-[#33373B] leading-snug">
                <strong>Timeline:</strong> Shows when and how the questions changed.<br />
                <strong>Journal:</strong> Explains why I followed those questions and what broke.<br />
                <strong>Systems:</strong> Shows what I built to investigate them with full technical evidence.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-[#DCD7C9] flex items-center justify-between text-[11px] font-mono text-[#6E747C]">
            <button
              type="button"
              onClick={() => onNavigateSpread(0)}
              className="text-[#3D5A6E] hover:text-[#1A1D20] font-semibold transition-colors"
            >
              ← Return to Table of Contents
            </button>
            <span className="font-bold text-[#1E2124]">PAGE 032 · [ ? ]</span>
          </div>
        </div>
      )
    }
  }
]
