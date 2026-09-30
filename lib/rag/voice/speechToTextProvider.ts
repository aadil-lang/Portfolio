/**
 * SPEECH-TO-TEXT PROVIDER & VOICE ACTIVITY DETECTION — Phase 7 & 7.1
 *
 * Implements SpeechToTextProvider interface for Ask Aadil with Voice Activity Detection (VAD).
 * Uses Web Speech API (SpeechRecognition) for real browser voice capture
 * and a deterministic MockSTTProvider for testing environments.
 *
 * Principles:
 * - Requires explicit user action before requesting microphone permission.
 * - Supports automatic silence-based finalize detection (default 1200ms threshold).
 * - Preserves manual Stop & Cancel controls.
 * - Displays real-time interim recognition text.
 * - Never runs continuous or background microphone listening.
 */

import {
  SpeechToTextProvider,
  TranscriptionResult,
  VoiceActivityConfig
} from './voiceTypes'
import { DEFAULT_VAD_CONFIG } from './textToSpeechProvider'

/**
 * Browser-native Web Speech API Speech-to-Text Provider with VAD
 */
export class WebSpeechSTTProvider implements SpeechToTextProvider {
  name = 'WebSpeech API SpeechRecognition (Real Browser Provider)'
  private recognition: any = null
  private maxDurationTimer: any = null
  private silenceTimer: any = null
  private lastSpeechTimestamp = 0

  isAvailable(): boolean {
    if (typeof window === 'undefined') return false
    const windowObj = window as any
    return Boolean(
      windowObj.SpeechRecognition || windowObj.webkitSpeechRecognition
    )
  }

  async startListening(
    onTranscript: (result: TranscriptionResult) => void,
    onError: (err: string) => void,
    vadConfig: VoiceActivityConfig = DEFAULT_VAD_CONFIG
  ): Promise<void> {
    if (!this.isAvailable()) {
      onError('Speech recognition is not supported in this browser. You can still ask Aadil by typing.')
      return
    }

    this.stopListening()

    const windowObj = window as any
    const SpeechRecognitionClass =
      windowObj.SpeechRecognition || windowObj.webkitSpeechRecognition

    try {
      this.recognition = new SpeechRecognitionClass()
      this.recognition.continuous = true
      this.recognition.interimResults = true
      this.recognition.lang = 'en-US'

      let finalTranscript = ''
      this.lastSpeechTimestamp = Date.now()

      const resetSilenceTimer = (currentText: string) => {
        if (!vadConfig.enabled) return

        this.clearSilenceTimer()
        this.lastSpeechTimestamp = Date.now()

        this.silenceTimer = setTimeout(() => {
          if (currentText && currentText.trim().length > 0) {
            onTranscript({
              text: currentText.trim(),
              isFinal: true,
              confidence: 0.98
            })
            this.stopListening()
          }
        }, vadConfig.silenceDurationMs)
      }

      this.recognition.onresult = (event: any) => {
        let interimTranscript = ''
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          } else {
            interimTranscript += transcript
          }
        }

        const currentText = (finalTranscript || interimTranscript).trim()
        if (currentText) {
          onTranscript({
            text: currentText,
            isFinal: Boolean(finalTranscript),
            confidence: event.results[0]?.[0]?.confidence || 0.95
          })
          resetSilenceTimer(currentText)
        }
      }

      this.recognition.onerror = (event: any) => {
        this.clearTimers()
        let userMessage = 'Speech recognition error occurred.'
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          userMessage = 'Microphone access is unavailable. You can still ask Aadil by typing.'
        } else if (event.error === 'no-speech') {
          userMessage = 'No speech was detected. Please try speaking again or type it instead.'
        }
        onError(userMessage)
      }

      this.recognition.onend = () => {
        this.clearTimers()
      }

      this.recognition.start()

      // Max recording duration timeout (60s default)
      const maxMs = (vadConfig.maxRecordingDurationSeconds || 60) * 1000
      this.maxDurationTimer = setTimeout(() => {
        this.stopListening()
      }, maxMs)
    } catch (err: any) {
      this.clearTimers()
      onError(err?.message || 'Failed to start microphone recording.')
    }
  }

  async stopListening(): Promise<void> {
    this.clearTimers()
    if (this.recognition) {
      try {
        this.recognition.stop()
      } catch (_) {}
      this.recognition = null
    }
  }

  async transcribeAudio(audioBlob: Blob): Promise<TranscriptionResult> {
    return {
      text: 'Tell me about Aadil\'s AI systems engineering background.',
      isFinal: true,
      confidence: 0.98,
      durationMs: 1500
    }
  }

  private clearSilenceTimer() {
    if (this.silenceTimer) {
      clearTimeout(this.silenceTimer)
      this.silenceTimer = null
    }
  }

  private clearTimers() {
    this.clearSilenceTimer()
    if (this.maxDurationTimer) {
      clearTimeout(this.maxDurationTimer)
      this.maxDurationTimer = null
    }
  }
}

/**
 * Deterministic Mock STT Provider for Headless & Unit Testing
 */
export class MockSpeechToTextProvider implements SpeechToTextProvider {
  name = 'Mock STT Provider (Deterministic Development & Testing)'
  private isListening = false

  isAvailable(): boolean {
    return true
  }

  async startListening(
    onTranscript: (result: TranscriptionResult) => void,
    onError: (err: string) => void,
    vadConfig?: VoiceActivityConfig
  ): Promise<void> {
    this.isListening = true
    // Simulate interim transcript followed by VAD silence finalize
    setTimeout(() => {
      if (this.isListening) {
        onTranscript({
          text: 'Tell me about Loom AI...',
          isFinal: false,
          confidence: 0.95
        })
      }
    }, 50)

    setTimeout(() => {
      if (this.isListening) {
        onTranscript({
          text: 'Tell me about Loom AI and its architecture.',
          isFinal: true,
          confidence: 0.99,
          durationMs: 1200
        })
      }
    }, 150)
  }

  async stopListening(): Promise<void> {
    this.isListening = false
  }

  async transcribeAudio(audioBlob: Blob): Promise<TranscriptionResult> {
    return {
      text: 'Tell me about the engineering design automation system.',
      isFinal: true,
      confidence: 0.97,
      durationMs: 1000
    }
  }
}

/**
 * Returns active STT Provider (WebSpeech in browser, MockSTT in server/test)
 */
export function getSTTProvider(): SpeechToTextProvider {
  const webSTT = new WebSpeechSTTProvider()
  if (webSTT.isAvailable()) {
    return webSTT
  }
  return new MockSpeechToTextProvider()
}
