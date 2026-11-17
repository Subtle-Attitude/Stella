import type { VoiceSession } from "./types"
import type { AtlasKnowledgeContext } from "@/atlas/context/types"

const sessions = new Map<string, VoiceSession>()

export function createSession(mode: "conversation" | "journal" = "conversation"): VoiceSession {
  const session: VoiceSession = {
    id: crypto.randomUUID(),
    startedAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
    status: "active",
    mode,
    transcripts: [],
    currentContext: {},
    lastResolvedContext: null,
    lastIntent: null,
    settings: {
      language: "en-US",
      voiceId: "default",
      rate: 1,
      pitch: 1,
      captionsEnabled: true,
    },
  }
  sessions.set(session.id, session)
  return session
}

export function getSession(id: string): VoiceSession | null {
  return sessions.get(id) ?? null
}

export function updateSessionContext(
  id: string,
  context: AtlasKnowledgeContext | null,
  intent: any
) {
  const session = sessions.get(id)
  if (!session) return
  session.lastResolvedContext = context
  session.lastIntent = intent
  session.lastActiveAt = new Date().toISOString()
}

export function setSessionStatus(id: string, status: VoiceSession["status"]) {
  const session = sessions.get(id)
  if (session) session.status = status
}