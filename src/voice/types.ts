import { z } from "zod"

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
  audioRef?: string | null
}

export interface VoiceInput {
  sessionId: string
  audioBlob?: Blob
  textFallback?: string
}

export interface VoiceOutput {
  sessionId: string
  text: string
  audioRef?: string | null
  captions: string
  reflectionDecision: "PASS" | "WARN" | "BLOCK"
}

export interface VoiceSession {
  id: string
  startedAt: string
  lastActiveAt?: string
  status: "active" | "paused" | "ended"
  mode: "conversation" | "journal"
  transcripts: VoiceTranscript[]
  currentContext: {
    domain?: string
    pillar?: string
    topic?: string
    intent?: string
  }
  lastResolvedContext?: unknown | null
  lastIntent?: unknown | null
  settings?: VoiceSettings
  addTranscript?(transcript: VoiceTranscript): void
}

export interface VoiceRequest {
  sessionId: string
  input: VoiceInput
}

export type VoiceErrorCode =
  | "SESSION_NOT_FOUND"
  | "TRANSCRIPTION_FAILED"
  | "ORCHESTRATION_FAILED"
  | "SYNTHESIS_FAILED"
  | "INTERNAL_ERROR"

export interface VoiceError {
  code: VoiceErrorCode
  message: string
  details?: unknown
}

export type VoiceResponse =
  | {
      success: true
      output: VoiceOutput
      session: VoiceSession
      errors: []
    }
  | {
      success: false
      output: null
      session: VoiceSession | null
      errors: VoiceError[]
    }

export const VoiceSessionSchema = z.object({
  id: z.string(),
  startedAt: z.string(),
  lastActiveAt: z.string().optional(),
  status: z.enum(["active", "paused", "ended"]),
  mode: z.enum(["conversation", "journal"]),
  transcripts: z.array(z.any()),
  currentContext: z.object({
    domain: z.string().optional(),
    pillar: z.string().optional(),
    topic: z.string().optional(),
    intent: z.string().optional(),
  }),
  lastResolvedContext: z.any().optional().nullable(),
  lastIntent: z.any().optional().nullable(),
  settings: z.object({
    language: z.string(),
    voiceId: z.string(),
    rate: z.number(),
    pitch: z.number(),
    captionsEnabled: z.boolean(),
  }).optional(),
})