'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Square,
  Loader2,
  RotateCcw,
  AlertCircle,
  Sparkles,
  CheckCircle2
} from 'lucide-react'
import {
  VoiceInputState,
  VoiceOutputState,
  VoiceConversationState,
  TranscriptionResult
} from '@/lib/rag/voice/voiceTypes'
import { getSTTProvider } from '@/lib/rag/voice/speechToTextProvider'
import { getTTSProvider, stripMarkdownForTTS, formatForSpeech } from '@/lib/rag/voice/textToSpeechProvider'

// Global single-active audio tracker so only one message plays at a time
let activeTTSMessageId: string | null = null
let activeTTSStopFn: (() => void) | null = null

export function stopGlobalTTSPlayback() {
  if (activeTTSStopFn) {
    activeTTSStopFn()
    activeTTSStopFn = null
    activeTTSMessageId = null
  }
}

// ---------------------------------------------------------------------------
// 1. VOICE CONVERSATION HIGH-LEVEL STATUS HINTS
// ---------------------------------------------------------------------------

interface VoiceStatusIndicatorProps {
  conversationState: VoiceConversationState
  statusMessage?: string
}

export function VoiceStatusIndicator({ conversationState, statusMessage }: VoiceStatusIndicatorProps) {
  if (conversationState === 'idle') return null

  const getStatusLabel = () => {
    if (statusMessage) return statusMessage
    switch (conversationState) {
      case 'listening':
        return 'Listening for question...'
      case 'transcribing':
        return 'Transcribing audio...'
      case 'understanding':
        return 'Understanding question & entity references...'
      case 'retrieving':
        return 'Checking authoritative portfolio sources...'
      case 'answering':
        return 'Preparing grounded response...'
      case 'speaking':
        return 'Ask Aadil is speaking...'
      case 'interrupted':
        return 'Playback interrupted by voice turn'
      case 'error':
        return 'Voice interface error'
      default:
        return 'Processing...'
    }
  }

  return (
    <div className="flex items-center gap-2 p-2 rounded-lg bg-[#162332] border border-[#388BFD]/30 text-xs font-mono text-[#58A6FF]">
      <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0 text-[#58A6FF]" />
      <span className="font-medium">{getStatusLabel()}</span>
    </div>
  )
}

// ---------------------------------------------------------------------------
// 2. VOICE INPUT CONTROLS (MICROPHONE RECORDING WITH VAD & BARGE-IN)
// ---------------------------------------------------------------------------

interface VoiceInputButtonProps {
  onTranscriptComplete: (text: string) => void
  disabled?: boolean
}

export function VoiceInputButton({ onTranscriptComplete, disabled }: VoiceInputButtonProps) {
  const [inputState, setInputState] = useState<VoiceInputState>('idle')
  const [interimText, setInterimText] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  const timerRef = useRef<any>(null)
  const sttProvider = useRef(getSTTProvider())
  const hasSubmittedRef = useRef(false)

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const handleStartListening = async () => {
    if (disabled || inputState === 'listening' || inputState === 'processing') return

    // Natural Barge-in: Interrupt active TTS playback when microphone starts
    stopGlobalTTSPlayback()
    setErrorMessage(null)
    setInterimText('')
    setElapsedSeconds(0)
    hasSubmittedRef.current = false
    setInputState('requesting_permission')

    try {
      await sttProvider.current.startListening(
        (result: TranscriptionResult) => {
          setInterimText(result.text)
          if (result.isFinal) {
            if (!hasSubmittedRef.current && result.text.trim()) {
              hasSubmittedRef.current = true
              setInputState('transcribed')
              clearTimer()
              if (process.env.NODE_ENV !== 'production') {
                console.log('[VOICE] submitted (isFinal):', result.text.trim())
              }
              onTranscriptComplete(result.text.trim())
              setTimeout(() => setInputState('idle'), 1200)
            }
          } else {
            setInputState('listening')
          }
        },
        (err: string) => {
          clearTimer()
          setInputState('error')
          setErrorMessage(err)
        }
      )

      setInputState('listening')
      timerRef.current = setInterval(() => {
        setElapsedSeconds(prev => {
          if (prev >= 59) {
            handleStopListening()
            return 60
          }
          return prev + 1
        })
      }, 1000)
    } catch (err: any) {
      clearTimer()
      setInputState('error')
      setErrorMessage(err?.message || 'Failed to start microphone.')
    }
  }

  const handleStopListening = async () => {
    clearTimer()
    setInputState('processing')
    await sttProvider.current.stopListening()
    const textToSubmit = interimText.trim()
    if (textToSubmit && !hasSubmittedRef.current) {
      hasSubmittedRef.current = true
      setInputState('transcribed')
      if (process.env.NODE_ENV !== 'production') {
        console.log('[VOICE] submitted (manual stop):', textToSubmit)
      }
      onTranscriptComplete(textToSubmit)
      setTimeout(() => setInputState('idle'), 1200)
    } else {
      setInputState('idle')
    }
  }

  const handleCancel = async () => {
    clearTimer()
    hasSubmittedRef.current = true
    await sttProvider.current.stopListening()
    setInterimText('')
    setInputState('idle')
  }

  useEffect(() => {
    return () => clearTimer()
  }, [])

  if (inputState === 'listening') {
    return (
      <div className="flex items-center gap-2 p-1.5 rounded-lg bg-[#271518] border border-[#F85149]/40 text-xs font-mono">
        <span className="w-2.5 h-2.5 rounded-full bg-[#F85149] animate-ping shrink-0" />
        <span className="text-[#FF7B72] font-semibold shrink-0">
          Listening... {elapsedSeconds}s / 60s
        </span>
        {interimText && (
          <span className="text-[#C9D1D9] truncate max-w-[160px] italic">
            &ldquo;{interimText}&rdquo;
          </span>
        )}
        <button
          type="button"
          onClick={handleStopListening}
          className="px-2 py-0.5 rounded bg-[#DA3633] hover:bg-[#F85149] text-white font-bold transition-colors cursor-pointer"
          title="Done Speaking (Finalize)"
        >
          Done
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="px-1.5 py-0.5 text-[#8B949E] hover:text-[#C9D1D9] cursor-pointer"
          title="Cancel Recording"
        >
          ✕
        </button>
      </div>
    )
  }

  if (inputState === 'processing' || inputState === 'requesting_permission') {
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#161B22] border border-[#30363D] text-xs font-mono text-[#8B949E]">
        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#58A6FF]" />
        <span>{inputState === 'requesting_permission' ? 'Requesting mic...' : 'Transcribing...'}</span>
      </div>
    )
  }

  if (inputState === 'error') {
    return (
      <div className="flex items-center gap-2 text-xs font-mono">
        <div className="flex items-center gap-1.5 text-[#F85149] bg-[#271518] px-2.5 py-1 rounded border border-[#F85149]/30">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate max-w-[220px]">{errorMessage || 'Mic unavailable'}</span>
        </div>
        <button
          type="button"
          onClick={() => {
            setInputState('idle')
            setErrorMessage(null)
          }}
          className="text-[11px] text-[#8B949E] hover:text-[#C9D1D9] underline cursor-pointer"
        >
          Dismiss
        </button>
      </div>
    )
  }

  return (
    <button
      type="button"
      id="ask-aadil-mic-btn"
      onClick={handleStartListening}
      disabled={disabled}
      className="p-2 rounded-md bg-[#161B22] hover:bg-[#21262D] text-[#8B949E] hover:text-[#58A6FF] border border-[#30363D] transition-colors flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-40"
      title="Speak to Ask Aadil (VAD & Speech-to-Text)"
      aria-label="Speak to Ask Aadil"
    >
      <Mic className="w-4 h-4" />
    </button>
  )
}

// ---------------------------------------------------------------------------
// 3. VOICE OUTPUT CONTROLS (TEXT-TO-SPEECH PLAYBACK WITH SPEECH PRESENTATION)
// ---------------------------------------------------------------------------

interface VoicePlaybackButtonProps {
  messageId: string
  text: string
}

export function VoicePlaybackButton({ messageId, text }: VoicePlaybackButtonProps) {
  const [outputState, setOutputState] = useState<VoiceOutputState>('idle')
  const ttsProvider = useRef(getTTSProvider())

  useEffect(() => {
    if (activeTTSMessageId !== messageId && (outputState === 'playing' || outputState === 'paused')) {
      setOutputState('idle')
    }
  }, [messageId, outputState])

  const handlePlay = () => {
    const formatted = formatForSpeech(text)
    if (!formatted.text) return

    stopGlobalTTSPlayback()

    activeTTSMessageId = messageId
    activeTTSStopFn = () => {
      ttsProvider.current.stop()
      setOutputState('idle')
    }

    setOutputState('playing')
    ttsProvider.current.speak(
      formatted.text,
      { rate: 1.0, pitch: 1.0 },
      () => {
        setOutputState('completed')
        if (activeTTSMessageId === messageId) {
          activeTTSMessageId = null
          activeTTSStopFn = null
        }
      },
      (err: string) => {
        setOutputState('error')
        if (activeTTSMessageId === messageId) {
          activeTTSMessageId = null
          activeTTSStopFn = null
        }
      }
    )
  }

  const handlePause = () => {
    ttsProvider.current.pause()
    setOutputState('paused')
  }

  const handleResume = () => {
    ttsProvider.current.resume()
    setOutputState('playing')
  }

  const handleStop = () => {
    stopGlobalTTSPlayback()
    setOutputState('idle')
  }

  if (outputState === 'playing') {
    return (
      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#162332] border border-[#388BFD]/40 text-[10.5px] font-mono text-[#58A6FF]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#58A6FF] animate-pulse" />
        <span>Ask Aadil Speaking...</span>
        <button
          type="button"
          onClick={handlePause}
          className="p-1 hover:text-white cursor-pointer"
          title="Pause"
        >
          <Pause className="w-3 h-3" />
        </button>
        <button
          type="button"
          onClick={handleStop}
          className="p-1 hover:text-[#F85149] cursor-pointer"
          title="Stop Playback"
        >
          <Square className="w-3 h-3" />
        </button>
      </div>
    )
  }

  if (outputState === 'paused') {
    return (
      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#161B22] border border-[#30363D] text-[10.5px] font-mono text-[#8B949E]">
        <span>Paused</span>
        <button
          type="button"
          onClick={handleResume}
          className="p-1 text-[#58A6FF] hover:text-white cursor-pointer"
          title="Resume Playback"
        >
          <Play className="w-3 h-3" />
        </button>
        <button
          type="button"
          onClick={handleStop}
          className="p-1 hover:text-[#F85149] cursor-pointer"
          title="Stop Playback"
        >
          <Square className="w-3 h-3" />
        </button>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={handlePlay}
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#0D1117] hover:bg-[#161B22] text-[#8B949E] hover:text-[#58A6FF] border border-[#30363D] text-[10.5px] font-mono transition-colors cursor-pointer"
      title="Listen to response (Text-to-Speech)"
    >
      <Volume2 className="w-3 h-3 text-[#58A6FF]" />
      <span>{outputState === 'completed' ? 'Replay' : 'Listen'}</span>
    </button>
  )
}
