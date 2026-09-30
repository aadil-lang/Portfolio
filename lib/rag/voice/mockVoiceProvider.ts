/**
 * UNIFIED MOCK VOICE PROVIDER — Phase 7
 *
 * Provides deterministic mock Speech-to-Text and Text-to-Speech execution
 * for unit tests, offline evaluations, and headless automation.
 */

import {
  SpeechToTextProvider,
  TextToSpeechProvider,
  TranscriptionResult,
  AudioResult,
  TTSOptions
} from './voiceTypes'
import { stripMarkdownForTTS } from './textToSpeechProvider'

export class MockVoiceProvider implements SpeechToTextProvider, TextToSpeechProvider {
  name = 'Unified Mock Voice Provider (Deterministic Test Suite)'
  private isListeningState = false
  private isSpeakingState = false

  isAvailable(): boolean {
    return true
  }

  // STT Interface
  async startListening(
    onTranscript: (result: TranscriptionResult) => void,
    onError: (err: string) => void
  ): Promise<void> {
    this.isListeningState = true
    onTranscript({
      text: 'Tell me about Aadil\'s experience with LangGraph and AI reliability.',
      isFinal: true,
      confidence: 0.99,
      durationMs: 800
    })
  }

  async stopListening(): Promise<void> {
    this.isListeningState = false
  }

  async transcribeAudio(audioBlob: Blob): Promise<TranscriptionResult> {
    return {
      text: 'Show me Aadil\'s GitHub repository.',
      isFinal: true,
      confidence: 0.98,
      durationMs: 500
    }
  }

  // TTS Interface
  async synthesize(text: string, options?: TTSOptions): Promise<AudioResult> {
    const cleanText = stripMarkdownForTTS(text)
    return {
      text: cleanText,
      durationMs: Math.max(300, cleanText.length * 40),
      audioUrl: 'mock://audio/output.wav'
    }
  }

  speak(
    text: string,
    options?: TTSOptions,
    onEnd?: () => void,
    onError?: (err: string) => void
  ): void {
    this.isSpeakingState = true
    const cleanText = stripMarkdownForTTS(text)
    if (!cleanText) {
      this.isSpeakingState = false
      onEnd?.()
      return
    }

    setTimeout(() => {
      this.isSpeakingState = false
      onEnd?.()
    }, 100)
  }

  stop(): void {
    this.isSpeakingState = false
  }

  pause(): void {}
  resume(): void {}
}
