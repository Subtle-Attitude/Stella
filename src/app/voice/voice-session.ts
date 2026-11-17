import type { VoiceSession } from "./types"

const sessions = new Map<string, VoiceSession>()

export function createSession(mode: "conversation" | "journal" = "conversation"): VoiceSession {
  const session: VoiceSession = {
    id: crypto.randomUUID(),
    startedAt: new Date().toISOString(),
    status: "active",
    mode,
    transcripts: [],
    currentContext: {},
  }
  sessions.set(session.id, session)
  return session
}

export function getSession(id: string) {
  return sessions.get(id) ?? null
}

export function updateSessionStatus(id: string, status: VoiceSession["status"]) {
  const s = sessions.get(id)
  if (s) s.status = status
}