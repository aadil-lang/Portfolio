'use client'

import React, { useState } from 'react'
import {
  Play,
  Film,
  ShieldCheck,
  Smartphone,
  Layers,
  Heart,
  VolumeX,
  Clock,
  Sparkles,
  ExternalLink
} from 'lucide-react'

export default function SolaceVideoShowcase() {
  const [activeChapter, setActiveChapter] = useState<number>(0)
  const [showTranscript, setShowTranscript] = useState<boolean>(false)

  const chapters = [
    {
      time: '0:00',
      title: 'Sanctuary Home & Offline Persistence',
      description: 'Opening home dashboard with guest offline persistence and Expo SecureStore key sanitization below Android 2048-byte limits.'
    },
    {
      time: '0:45',
      title: '6-State Mood Check-In',
      description: 'Procedural Reanimated emotional landscape visualizing mood state across Seasons, Horizon, and Meaningful reflections.'
    },
    {
      time: '1:55',
      title: 'Box Breathing Visualizer',
      description: 'Interactive 4-phase breathing circle (Inhale 4s, Hold 4s, Exhale 4s, Hold 4s) providing somatic grounding.'
    },
    {
      time: '3:10',
      title: 'Contemplative Poetry Sanctuary',
      description: 'Multilingual contemplative poems rendered in English, Urdu Nastaliq RTL, and bilingual mirrored typography.'
    },
    {
      time: '4:30',
      title: 'Synchronous Crisis Interceptor',
      description: 'Deterministic screening executing in <2ms before model calls, filtering figurative idioms and routing to Tele-MANAS 14416 / 112.'
    },
    {
      time: '6:15',
      title: '"Just Let It Out" Rant Mode',
      description: 'Amber-bannered unconstrained venting space enforcing pure empathetic solidarity without unsolicited advice.'
    },
    {
      time: '7:40',
      title: 'Zero-Retention Voice Journal',
      description: 'Ephemeral audio buffer purged via `del audio_bytes` in a `finally:` block immediately after transcription.'
    },
    {
      time: '8:50',
      title: 'Consent-Based Memory & Supabase RLS',
      description: 'Active memory confirmation banners and PostgreSQL Row-Level Security isolating user domains.'
    }
  ]

  return (
    <div className="rounded-xl border border-[#262B32] bg-[#14171A] p-5 sm:p-6 space-y-6 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#262B32] gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#5A9A78] animate-pulse" />
            <span className="text-xs uppercase tracking-wider font-mono text-[#5A9A78] font-bold">
              VERIFIED PRODUCT WALKTHROUGH // PIXEL 7 ANDROID 16
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#F0EEE9] font-serif mt-1">
            Solace AI — Native Mobile Demonstration
          </h3>
          <p className="text-xs sm:text-sm text-[#9EA4AA] mt-1 max-w-3xl leading-relaxed">
            Direct screen recording of the production Android APK running on a Google Pixel 7 emulator (Android 16 API 36), connected live to the FastAPI backend and Supabase RLS database.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 font-mono text-[11px] px-3 py-1.5 rounded-lg bg-[#181C21] border border-[#2A2F36] text-[#71899A]">
          <Film className="w-3.5 h-3.5 text-[#5A9A78]" />
          <span>Solace_AI_Hackathon_Demo_Official_16x9.mp4</span>
        </div>
      </div>

      {/* Video Player */}
      <div className="relative rounded-xl overflow-hidden border border-[#262B32] bg-[#0D151C] shadow-2xl">
        <video
          controls
          preload="none"
          poster="/videos/solace_demo_poster.png"
          aria-label="Solace AI Mobile Application Guided Video Walkthrough on Google Pixel 7"
          className="w-full aspect-video object-contain bg-black"
          playsInline
        >
          <source src="/videos/solace_demo.mp4" type="video/mp4" />
          <p className="p-4 text-xs font-mono text-[#9EA4AA]">
            Your browser does not support the video tag. Inspect the official repository walkthrough at{' '}
            <a
              href="https://github.com/aadil-lang/solace-ai"
              target="_blank"
              rel="noreferrer"
              className="text-[#5A9A78] underline"
            >
              github.com/aadil-lang/solace-ai
            </a>
            .
          </p>
        </video>
      </div>

      {/* Accessible Transcript Toggle */}
      <div className="rounded-lg border border-[#262B32] bg-[#181C21] p-3 text-xs">
        <button
          onClick={() => setShowTranscript(!showTranscript)}
          aria-expanded={showTranscript}
          className="w-full flex items-center justify-between text-left font-mono font-bold text-[#C8C6BF] hover:text-white transition-colors"
        >
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5A9A78]" />
            <span>Accessible Video Narration Transcript ({showTranscript ? 'Hide' : 'Show'})</span>
          </span>
          <span className="text-[11px] text-[#71899A] uppercase tracking-wider">
            {showTranscript ? 'Collapse' : 'Expand'}
          </span>
        </button>

        {showTranscript && (
          <div className="mt-3 pt-3 border-t border-[#242930] space-y-3 font-mono text-[11px] text-[#9EA4AA] max-h-72 overflow-y-auto pr-2 leading-relaxed">
            <div>
              <strong className="text-[#F0EEE9]">Scene 1: Welcome & Authentication (0:00 – 0:45)</strong>
              <p className="mt-0.5 text-[#858A90]">
                "Welcome to Solace AI — an emotional wellness companion designed to give you a calm, grounding space whenever life feels overwhelming. Opening the app drawer on our Android Pixel 7 home screen, we launch Solace. A gentle gateway welcomes us with an authentic mindful daily quote, transitioning smoothly into our authenticated home sanctuary."
              </p>
            </div>
            <div>
              <strong className="text-[#F0EEE9]">Scene 2: Home Sanctuary & 6-State Check-In (0:45 – 1:31)</strong>
              <p className="mt-0.5 text-[#858A90]">
                "Welcome to our Home Sanctuary. Tailored atmospheric greetings and daily emotional check-ins: logging today as 'Peaceful' with intensity four, saving personal reflections with offline-first guest persistence, and launching the 5-4-3-2-1 multi-sensory grounding practice."
              </p>
            </div>
            <div>
              <strong className="text-[#F0EEE9]">Scene 3: Conversational Companion & Rant Mode (1:31 – 2:16)</strong>
              <p className="mt-0.5 text-[#858A90]">
                "Stepping into the Companion tab: conversational AI streaming in real time via Server-Sent Events. The companion provides compassionate validation without clinical diagnosis. Activating Rant Mode displays an amber banner enforcing unconstrained emotional release without unsolicited advice."
              </p>
            </div>
            <div>
              <strong className="text-[#F0EEE9]">Scene 4: Somatic Breathing & Contemplative Poetry (2:16 – 3:30)</strong>
              <p className="mt-0.5 text-[#858A90]">
                "The Discover section features an interactive 4-phase expanding/contracting breathing visualizer and contemplative multilingual poetry rendered in English and Urdu Nastaliq RTL typography."
              </p>
            </div>
            <div>
              <strong className="text-[#F0EEE9]">Scene 5: Zero-Retention Voice Journal (3:30 – 4:45)</strong>
              <p className="mt-0.5 text-[#858A90]">
                "Private audio sanctuary: spoken reflections are transcribed in memory and purged via `del audio_bytes` in a finally block immediately after transcription, eliminating raw audio breach liabilities."
              </p>
            </div>
            <div>
              <strong className="text-[#F0EEE9]">Scene 6: Privacy & Consent Governance (4:45 – 6:42)</strong>
              <p className="mt-0.5 text-[#858A90]">
                "The Profile tab exposes user consent controls. Emotional memories require explicit per-insight user approval with domain table isolation under Supabase Row Level Security (RLS) policies."
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Storyboard & Timestamps */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-[#71899A] font-semibold flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#5A9A78]" />
            <span>Walkthrough Timestamps & Architecture Milestones:</span>
          </span>
          <span className="text-[11px] font-mono text-[#858A90]">8 Feature Chapters</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {chapters.map((ch, idx) => {
            const isSelected = activeChapter === idx
            return (
              <button
                key={ch.title}
                onClick={() => setActiveChapter(idx)}
                className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#5A9A78] bg-[#18261F] text-[#F0EEE9] shadow-xs'
                    : 'border-[#262B32] bg-[#181C21] text-[#9EA4AA] hover:border-[#3E4652] hover:text-[#C8C6BF]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold text-[#5A9A78]">{ch.time}</span>
                    <span className="text-[9px] font-mono text-[#71899A]">Scene 0{idx + 1}</span>
                  </div>
                  <h5 className="font-serif font-bold text-xs line-clamp-1">{ch.title}</h5>
                </div>
                <p className="text-[10.5px] mt-1.5 leading-snug line-clamp-2 text-[#858A90]">
                  {ch.description}
                </p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Verification & Privacy Guarantees */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-[#262B32]">
        <div className="p-3.5 rounded-lg border border-[#262B32] bg-[#181C21] text-xs font-mono space-y-1">
          <div className="flex items-center gap-1.5 text-[#5A9A78] font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Sub-2ms Crisis Routing</span>
          </div>
          <p className="text-[11px] text-[#858A90] leading-snug">
            Synchronous regex interceptor screens Roman Urdu, Urdu script, and English prior to model invocation with false-positive idiom exclusion.
          </p>
        </div>

        <div className="p-3.5 rounded-lg border border-[#262B32] bg-[#181C21] text-xs font-mono space-y-1">
          <div className="flex items-center gap-1.5 text-[#5A9A78] font-bold">
            <VolumeX className="w-4 h-4" />
            <span>Zero Audio Retention</span>
          </div>
          <p className="text-[11px] text-[#858A90] leading-snug">
            Raw voice recordings are transcribed in memory and purged via `del audio_bytes` in a finally block, avoiding cloud storage liabilities.
          </p>
        </div>

        <div className="p-3.5 rounded-lg border border-[#262B32] bg-[#181C21] text-xs font-mono space-y-1">
          <div className="flex items-center gap-1.5 text-[#5A9A78] font-bold">
            <Smartphone className="w-4 h-4" />
            <span>Single-POST SSE Guard</span>
          </div>
          <p className="text-[11px] text-[#858A90] leading-snug">
            Edge socket timeouts and 502/503/504 errors are treated as ambiguous delivery to strictly eliminate duplicate conversation messages.
          </p>
        </div>
      </div>
    </div>
  )
}

