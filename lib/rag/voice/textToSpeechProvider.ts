/**
 * TEXT-TO-SPEECH PROVIDER & SPEECH PRESENTATION LAYER — Phase 7 & 7.1
 *
 * Implements TextToSpeechProvider interface for Ask Aadil.
 * Provides WebSpeech API synthesis for real browser playback
 * and a deterministic MockTTSProvider for testing environments.
 *
 * Principles:
 * - Speech Presentation Layer transforms visual grounded answers into TTS-ready prose.
 * - Normalizes file paths (e.g. `lib/eval-layer.ts:44-76` → "eval-layer TypeScript file, lines 44 through 76").
 * - Strips internal markdown syntax, code fences, decorative symbols, and visual citations.
 * - Preserves exact quantitative claims, project names, and ownership classifications.
 * - Never synthesizes hidden metadata, tool plans, or system prompts.
 * - Maintains consistent assistant voice identity (en-US, calm, technical).
 */

import {
  TextToSpeechProvider,
  TTSOptions,
  AudioResult,
  AskAadilVoiceConfig,
  SpeechPresentationResult,
  VoiceActivityConfig
} from './voiceTypes'

export const DEFAULT_VAD_CONFIG: VoiceActivityConfig = {
  enabled: true,
  silenceDurationMs: 1200,
  minimumSpeechDurationMs: 300,
  maxRecordingDurationSeconds: 60
}

export const DEFAULT_VOICE_CONFIG: AskAadilVoiceConfig = {
  voiceId: 'en-US-Standard-C',
  language: 'en-US',
  speed: 1.0,
  pitch: 1.0,
  maxRecordingDurationSeconds: 60,
  autoPlayResponse: false,
  vad: DEFAULT_VAD_CONFIG
}

/**
 * Speech Presentation Layer
 * Transforms visual grounded answers into clean, TTS-ready spoken prose.
 * Preserves exact facts, quantitative metrics, and project names while
 * removing raw formatting, citations, and code blocks.
 */
export function formatForSpeech(rawText: string): SpeechPresentationResult {
  if (!rawText) {
    return {
      text: '',
      rawText: '',
      hasCode: false,
      hasCitations: false,
      hasPaths: false
    }
  }

  let text = rawText
  const hasCode = /```[\s\S]*?```/g.test(rawText) || /`[^`]+`/g.test(rawText)
  const hasCitations = /\[[^\]]+\]/g.test(rawText)
  const hasPaths = /[a-zA-Z0-9_\-/]+\.(ts|js|py|json|md)(:\d+(-\d+)?)?/g.test(rawText)

  // 1. Normalize file paths (e.g., lib/eval-layer.ts:44-76 -> eval-layer TypeScript file, lines 44 through 76)
  text = text.replace(
    /([a-zA-Z0-9_\-/]+\/)?([a-zA-Z0-9_\-]+)\.(ts|js|py|json|md):(\d+)(?:-(\d+))?/g,
    (match, dir, file, ext, start, end) => {
      const extName =
        ext === 'ts'
          ? 'TypeScript'
          : ext === 'js'
          ? 'JavaScript'
          : ext === 'py'
          ? 'Python'
          : ext.toUpperCase()
      if (end) {
        return `the ${file} ${extName} file, specifically lines ${start} through ${end}`
      }
      return `the ${file} ${extName} file, specifically line ${start}`
    }
  )

  // 2. Remove code blocks (```...```)
  text = text.replace(/```[\s\S]*?```/g, '')

  // 3. Remove inline code (`...`)
  text = text.replace(/`([^`]+)`/g, '$1')

  // 4. Remove Markdown headings (###, ##, #)
  text = text.replace(/^#{1,6}\s+/gm, '')

  // 5. Remove Markdown bold and italic (*, **)
  text = text.replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, '$1')

  // 6. Omit visual citation tokens [Timeline // ...], [Journal // ...]
  text = text.replace(/\[[^\]]+\]/g, '')

  // 7. Remove bullet symbols (•, -, *) at line starts
  text = text.replace(/^[\s•\-*]+\s*/gm, '')

  // 8. Normalize Markdown links [text](url) -> text
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')

  // 9. Normalize spacing and sentence line breaks
  text = text
    .replace(/\n+/g, '. ')
    .replace(/\s+/g, ' ')
    .replace(/\s+\./g, '.')
    .replace(/\.\.+/g, '.')
    .trim()

  return {
    text,
    rawText,
    hasCode,
    hasCitations,
    hasPaths
  }
}

/**
 * Strips markdown symbols, code fences, citations, and system tags
 * to produce clean, natural spoken prose for Text-to-Speech.
 */
export function stripMarkdownForTTS(rawText: string): string {
  return formatForSpeech(rawText).text
}

/**
 * Browser-native Web Speech API Text-to-Speech Provider
 */
export class WebSpeechTTSProvider implements TextToSpeechProvider {
  name = 'WebSpeech API (Real Browser Provider)'
  private currentUtterance: SpeechSynthesisUtterance | null = null

  isAvailable(): boolean {
    return (
      typeof window !== 'undefined' &&
      'speechSynthesis' in window &&
      'SpeechSynthesisUtterance' in window
    )
  }

  async synthesize(text: string, options?: TTSOptions): Promise<AudioResult> {
    const cleanText = stripMarkdownForTTS(text)
    return {
      text: cleanText,
      durationMs: Math.max(1000, Math.round(cleanText.length * 60)), // Estimate ~60ms per char
      audioUrl: undefined
    }
  }

  speak(
    text: string,
    options?: TTSOptions,
    onEnd?: () => void,
    onError?: (err: string) => void
  ): void {
    if (!this.isAvailable()) {
      onError?.('Speech synthesis is not supported in this browser.')
      return
    }

    this.stop()

    const cleanText = stripMarkdownForTTS(text)
    if (!cleanText) {
      onEnd?.()
      return
    }

    const utterance = new SpeechSynthesisUtterance(cleanText)
    utterance.lang = options?.language || DEFAULT_VOICE_CONFIG.language
    utterance.rate = options?.rate || DEFAULT_VOICE_CONFIG.speed
    utterance.pitch = options?.pitch || DEFAULT_VOICE_CONFIG.pitch
    utterance.volume = options?.volume ?? 1.0

    // Select natural en-US voice if available
    const voices = window.speechSynthesis.getVoices()
    if (voices && voices.length > 0) {
      const preferredVoice =
        voices.find(
          v =>
            v.lang.startsWith('en') &&
            (v.name.includes('Google') ||
              v.name.includes('Natural') ||
              v.name.includes('Samantha') ||
              v.name.includes('Alex'))
        ) || voices.find(v => v.lang.startsWith('en'))
      if (preferredVoice) {
        utterance.voice = preferredVoice
      }
    }

    utterance.onend = () => {
      this.currentUtterance = null
      onEnd?.()
    }

    utterance.onerror = event => {
      this.currentUtterance = null
      onError?.(event.error || 'Speech synthesis error')
    }

    this.currentUtterance = utterance
    window.speechSynthesis.speak(utterance)
  }

  stop(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    this.currentUtterance = null
  }

  pause(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause()
    }
  }

  resume(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.resume()
    }
  }
}

/**
 * Deterministic Mock TTS Provider for Headless & Unit Testing
 */
export class MockTextToSpeechProvider implements TextToSpeechProvider {
  name = 'Mock TTS Provider (Deterministic Development & Testing)'
  private activeTimer: any = null

  isAvailable(): boolean {
    return true
  }

  async synthesize(text: string, options?: TTSOptions): Promise<AudioResult> {
    const cleanText = stripMarkdownForTTS(text)
    return {
      text: cleanText,
      durationMs: Math.max(500, Math.round(cleanText.length * 50)),
      audioUrl: 'mock://audio/synthesized.wav'
    }
  }

  speak(
    text: string,
    options?: TTSOptions,
    onEnd?: () => void,
    onError?: (err: string) => void
  ): void {
    this.stop()
    const cleanText = stripMarkdownForTTS(text)
    if (!cleanText) {
      onEnd?.()
      return
    }

    const duration = Math.min(2000, Math.max(300, cleanText.length * 20))
    this.activeTimer = setTimeout(() => {
      this.activeTimer = null
      onEnd?.()
    }, duration)
  }

  stop(): void {
    if (this.activeTimer) {
      clearTimeout(this.activeTimer)
      this.activeTimer = null
    }
  }

  pause(): void {}
  resume(): void {}
}

/**
 * Returns active TTS Provider (WebSpeech in browser, MockTTS in server/test)
 */
export function getTTSProvider(): TextToSpeechProvider {
  const webSpeech = new WebSpeechTTSProvider()
  if (webSpeech.isAvailable()) {
    return webSpeech
  }
  return new MockTextToSpeechProvider()
}
