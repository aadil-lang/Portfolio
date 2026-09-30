/**
 * ASK AADIL VOICE INTERFACE TYPES — Phase 7 & Phase 7.1
 *
 * Defines explicit voice input/output state machines, provider contracts,
 * voice identity configuration, Voice Activity Detection (VAD) settings,
 * speech presentation schemas, and audio result types.
 */

export type VoiceInputState =
  | 'idle'
  | 'requesting_permission'
  | 'listening'
  | 'processing'
  | 'transcribed'
  | 'error'

export type VoiceOutputState =
  | 'idle'
  | 'generating'
  | 'playing'
  | 'paused'
  | 'completed'
  | 'error'

export type VoiceConversationState =
  | 'idle'
  | 'listening'
  | 'transcribing'
  | 'understanding'
  | 'retrieving'
  | 'answering'
  | 'speaking'
  | 'interrupted'
  | 'error'

export interface VoiceActivityConfig {
  enabled: boolean
  silenceDurationMs: number
  minimumSpeechDurationMs: number
  maxRecordingDurationSeconds: number
}

export interface VoiceTranscriptState {
  interimText: string
  finalText: string
  isFinal: boolean
}

export interface SpeechPresentationResult {
  text: string
  rawText: string
  hasCode: boolean
  hasCitations: boolean
  hasPaths: boolean
}

export interface TranscriptionResult {
  text: string
  confidence?: number
  durationMs?: number
  isFinal: boolean
  error?: string
}

export interface AudioResult {
  audioUrl?: string
  durationMs?: number
  text: string
  error?: string
}

export interface TTSOptions {
  voiceId?: string
  language?: string
  rate?: number // Speed multiplier (default 1.0)
  pitch?: number // Pitch multiplier (default 1.0)
  volume?: number // Volume multiplier (default 1.0)
}

export interface AskAadilVoiceConfig {
  voiceId: string
  language: string
  speed: number
  pitch: number
  maxRecordingDurationSeconds: number
  autoPlayResponse: boolean
  vad: VoiceActivityConfig
}

export interface SpeechToTextProvider {
  name: string
  isAvailable(): boolean
  startListening(
    onTranscript: (result: TranscriptionResult) => void,
    onError: (err: string) => void,
    vadConfig?: VoiceActivityConfig
  ): Promise<void>
  stopListening(): Promise<void>
  transcribeAudio(audioBlob: Blob): Promise<TranscriptionResult>
}

export interface TextToSpeechProvider {
  name: string
  isAvailable(): boolean
  synthesize(text: string, options?: TTSOptions): Promise<AudioResult>
  speak(
    text: string,
    options?: TTSOptions,
    onEnd?: () => void,
    onError?: (err: string) => void
  ): void
  stop(): void
  pause(): void
  resume(): void
}
