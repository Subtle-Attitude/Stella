export interface VoiceSettings {
  language: string
  voiceId: string
  rate: number
  pitch: number
  captionsEnabled: boolean
}

export interface VoiceTranscript {
  id: string
  role: "user" | "stella"
  text: string
  timestamp: string
  audioAvailable: boolean
}

export interface VoiceInput {
  sessionId: string
  audioBlob?: Blob
  textFallback?: string
}

export interface VoiceOutput {
  sessionId: string
  text: string
  audioUrl?: string
  captions: string
  reflectionDecision: "PASS" | "WARN" | "BLOCK"
}

export interface VoiceSession {
  id: string
  startedAt: string
  status: "active" | "paused" | "ended"
  mode: "conversation" | "journal"
  transcripts: VoiceTranscript[]
  currentContext: {
    domain?: string
    pillar?: string
    topic?: string
    intent?: string
  }
}

export interface VoiceRequest {
  sessionId: string
  input: VoiceInput
}

export interface VoiceResponse {
  success: boolean
  output: VoiceOutput | null
  session: VoiceSession
  errors: string[]
}