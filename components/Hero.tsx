"use client"
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import { ArrowRight, Github, Linkedin, FileText, Sparkles, Terminal, Bot, Workflow } from 'lucide-react'

export default function Hero() {
  return (
    <section className="grid lg:grid-cols-12 gap-12 items-center py-6 md:py-12">
      {/* Left Column: Intro */}
      <div className="lg:col-span-7 space-y-6">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Available for AI Engineering & Consulting</span>
        </div>

        <div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Hi, I&apos;m{' '}
            <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-sky-400 bg-clip-text text-transparent">
              {profile.name}
            </span>
          </h1>
          <p className="mt-2 text-xl font-medium text-slate-300">
            {profile.role} • Generative AI & Systems Architect
          </p>
        </div>

        <p className="text-base sm:text-lg text-slate-300/90 leading-relaxed max-w-2xl">
          Architecting resilient multi-agent systems, LLM pipelines, and production backend
          infrastructures. Focused on LangGraph agentic workflows, structured reasoning, and high-performance
          full-stack applications.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium shadow-lg shadow-purple-600/30 transition-all hover:translate-y-[-1px]"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 transition-colors"
          >
            Get in Touch
          </Link>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            title="GitHub Profile"
            aria-label="GitHub Profile"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            title="LinkedIn Profile"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={profile.resumeUrl}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white text-sm transition-colors"
          >
            <FileText className="w-4 h-4 text-purple-400" />
            <span>Resume</span>
          </a>
        </div>
      </div>

      {/* Right Column: Interactive Terminal Preview */}
      <div className="lg:col-span-5">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass rounded-xl border border-slate-800 shadow-2xl overflow-hidden"
        >
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800/80 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="text-slate-400">agent_runtime.py</span>
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          </div>

          {/* Terminal Code Snippet */}
          <div className="p-5 font-mono text-xs text-slate-300 space-y-2 bg-slate-950/50 overflow-x-auto">
            <div className="text-slate-500"># LangGraph Agent State Machine Runtime</div>
            <div>
              <span className="text-purple-400">workflow</span> = StateGraph(AgentState)
            </div>
            <div>
              workflow.<span className="text-sky-300">add_node</span>(&quot;supervisor&quot;, supervisor_agent)
            </div>
            <div>
              workflow.<span className="text-sky-300">add_node</span>(&quot;rag_specialist&quot;, rag_worker)
            </div>
            <div>
              workflow.<span className="text-sky-300">add_node</span>(&quot;synthesis&quot;, reasoning_node)
            </div>
            <div className="pt-2 text-emerald-400 flex items-center gap-2">
              <Workflow className="w-3.5 h-3.5 shrink-0" />
              <span>✓ Memory checkpointing initialized</span>
            </div>
            <div className="text-purple-300 flex items-center gap-2">
              <Bot className="w-3.5 h-3.5 shrink-0" />
              <span>✓ Agent routing loop active (0.12s latency)</span>
            </div>
          </div>

          {/* Quick Stat Pill Bar */}
          <div className="grid grid-cols-2 p-3 bg-slate-900/60 border-t border-slate-800/80 text-xs">
            <div className="text-center border-r border-slate-800">
              <div className="font-bold text-slate-100">LLMs & Agents</div>
              <div className="text-slate-400 text-[11px]">LangGraph / LangChain</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-slate-100">Full-Stack</div>
              <div className="text-slate-400 text-[11px]">Next.js + Python/Node</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
