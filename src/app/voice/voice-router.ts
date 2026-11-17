import type { VoiceRequest, VoiceResponse } from "./types"
import { getSession } from "./voice-session"
import { transcribe } from "./speech-to-text"
import { synthesize } from "./text-to-speech"
import { orchestrate } from "@/cognitive/orchestrator"

export async function routeVoice(req: VoiceRequest): Promise<VoiceResponse> {
  const session = getSession(req.sessionId)
  if (!session) {
    return {
      success: false,
      output: null,
      session: null as any,
      errors: ["Session not found"],
    }
  }

  const text = await transcribe(req.input.audioBlob, req.input.textFallback)

  session.transcripts.push({
    id: crypto.randomUUID(),
    role: "user",
    text,
    timestamp: new Date().toISOString(),
    audioAvailable: !!req.input.audioBlob,
  })

  // Route through the cognitive system
  const result = await orchestrate({
    text,
    sessionId: req.sessionId,
    source: "voice",
  })

  const governed = result.response
  const decision = result.decision

   if (decision === "PASS" || decision === "WARN") {
     await synthesize(governed)   // ← result ignored
   }

  session.transcripts.push({
    id: crypto.randomUUID(),
    role: "stella",
    text: governed,
    timestamp: new Date().toISOString(),
    audioAvailable: true,
  })

  return {
    success: result.success,
    output: {
      sessionId: session.id,
      text: governed,
      captions: governed,
      reflectionDecision: decision === "BLOCK" ? "BLOCK" : decision,
    },
    session,
    errors: result.errors ?? [],
  }
}