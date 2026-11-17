import type {
  VoiceRequest,
  VoiceResponse,
  VoiceError,
  VoiceTranscript,
  VoiceOutput,
} from "./types"
import { getSession } from "./voice-session"
import { transcribe } from "./speech-to-text"
import { synthesize } from "./text-to-speech"
import { orchestrate } from "@/cognitive/orchestrator"

function log(stage: string, data?: unknown): void {
  console.log(`[voice-router] ${stage}`, data ?? "")
}

function errorResponse(
  session: ReturnType<typeof getSession>,
  error: VoiceError
): VoiceResponse {
  return {
    success: false,
    output: null,
    session,
    errors: [error],
  }
}

async function runTranscription(req: VoiceRequest): Promise<string> {
  log("transcription:start", { sessionId: req.sessionId })
  const audioBlob = req.input.audioBlob
  if (!audioBlob) {
    throw new Error("Audio input is required")
  }
  const text = await transcribe(audioBlob)
  log("transcription:done", { text })
  return text
}

function addUserTranscript(
  session: NonNullable<ReturnType<typeof getSession>>,
  text: string,
  hasAudio: boolean
): void {
  const transcript: VoiceTranscript = {
    id: crypto.randomUUID(),
    role: "user",
    text,
    timestamp: new Date().toISOString(),
    audioAvailable: hasAudio,
  }
  session.addTranscript?.(transcript)
  log("transcript:user-added", { id: transcript.id })
}

async function runOrchestration(
  text: string,
  sessionId: string
): Promise<{ response: string; decision: "PASS" | "WARN" | "BLOCK"; success: boolean; errors: string[] }> {
  log("orchestration:start", { sessionId, text })
  const result = await orchestrate({
    text,
    sessionId,
    source: "voice",
  })
  log("orchestration:done", { decision: result.decision, success: result.success })
  return result
}

async function runSynthesis(text: string): Promise<{ audioRef: string | null; spoken: boolean }> {
  log("synthesis:start", { text })
  const result = await synthesize(text)
  log("synthesis:done", result)
  return result
}

function addStellaTranscript(
  session: NonNullable<ReturnType<typeof getSession>>,
  text: string,
  audioRef: string | null
): void {
  const transcript: VoiceTranscript = {
    id: crypto.randomUUID(),
    role: "stella",
    text,
    timestamp: new Date().toISOString(),
    audioAvailable: !!audioRef,
    audioRef,
  }
  session.addTranscript?.(transcript)
  log("transcript:stella-added", { id: transcript.id, audioRef })
}

export async function routeVoice(req: VoiceRequest): Promise<VoiceResponse> {
  log("routeVoice:start", { sessionId: req.sessionId })

  const session = getSession(req.sessionId)
  if (!session) {
    return errorResponse(null, {
      code: "SESSION_NOT_FOUND",
      message: "Session not found",
    })
  }

  try {
    const text = await runTranscription(req)
    addUserTranscript(session, text, !!req.input.audioBlob)

    const result = await runOrchestration(text, req.sessionId)

    if (!result.success) {
      return errorResponse(session, {
        code: "ORCHESTRATION_FAILED",
        message: result.errors[0] ?? "Orchestration failed",
        details: result.errors,
      })
    }

    const governed = result.response
    const decision = result.decision

    let audioRef: string | null = null
    if (decision === "PASS" || decision === "WARN") {
      const synthesis = await runSynthesis(governed)
      audioRef = synthesis.audioRef
    }

    addStellaTranscript(session, governed, audioRef)

    const output: VoiceOutput = {
      sessionId: session.id,
      text: governed,
      audioRef,
      captions: governed,
      reflectionDecision: decision,
    }

    log("routeVoice:success", { sessionId: session.id, decision })

    return {
      success: true,
      output,
      session,
      errors: [],
    }
  } catch (err) {
    log("routeVoice:error", err)
    return errorResponse(session, {
      code: "INTERNAL_ERROR",
      message: err instanceof Error ? err.message : "Unknown error",
      details: err,
    })
  }
}