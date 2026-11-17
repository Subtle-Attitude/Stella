import type { VoiceSession, VoiceTranscript } from "./types"

const sessions = new Map<string, VoiceSession>()

function createSessionObject(
  mode: "conversation" | "journal" = "conversation"
): VoiceSession {
  const session: VoiceSession = {
    id: crypto.randomUUID(),
    startedAt: new Date().toISOString(),
    status: "active",
    mode,
    transcripts: [],
    currentContext: {},
    addTranscript(transcript: VoiceTranscript) {
      this.transcripts.push(transcript)
    },
  }
  return session
}

export function createSession(
  mode: "conversation" | "journal" = "conversation"
): VoiceSession {
  const session = createSessionObject(mode)
  sessions.set(session.id, session)
  return session
}

export function getSession(id: string): VoiceSession | null {
  return sessions.get(id) ?? null
}

export function updateSessionStatus(
  id: string,
  status: VoiceSession["status"]
): void {
  const s = sessions.get(id)
  if (s) s.status = status
}