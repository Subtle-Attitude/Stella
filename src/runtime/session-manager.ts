import "server-only"
import type { StellaSession, SessionType } from "./types"
import { loadSessions, saveSessions } from "./session-store"

function getAll(): StellaSession[] {
  return loadSessions()
}

function saveAll(sessions: StellaSession[]) {
  saveSessions(sessions)
}

export function startSession(type: SessionType): StellaSession {
  const sessions = getAll()
  sessions.forEach(s => {
    if (s.state === "active" || s.state === "paused") {
      s.state = "ended"
      s.endedAt = new Date().toISOString()
    }
  })

  const session: StellaSession = {
    id: crypto.randomUUID(),
    type,
    state: "active",
    startedAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
    exploration: {},
    governanceState: "none",
  }
  sessions.push(session)
  saveAll(sessions)
  return session
}

export function pauseSession(id: string) {
  const sessions = getAll()
  const s = sessions.find(x => x.id === id)
  if (s) {
    s.state = "paused"
    s.lastActiveAt = new Date().toISOString()
    saveAll(sessions)
  }
}

export function resumeSession(id: string) {
  const sessions = getAll()
  const s = sessions.find(x => x.id === id)
  if (s) {
    s.state = "active"
    s.lastActiveAt = new Date().toISOString()
    saveAll(sessions)
  }
}

export function endSession(id: string) {
  const sessions = getAll()
  const s = sessions.find(x => x.id === id)
  if (s) {
    s.state = "ended"
    s.endedAt = new Date().toISOString()
    saveAll(sessions)

    // History / governance side-effect
    try {
      const { recordTurn } = require("@/governance/recorder")
      recordTurn({
        input: `Session ended: ${s.type}`,
        resolved: {} as any,
        knowledge: {} as any,
        intent: {} as any,
        generatedResponse: "",
        reflectionDecision: "PASS",
        reflectionFlags: [],
        safeguardsApplied: [],
        violations: [],
        turn: null,
      })
    } catch {
      // optional during early runtime
    }
  }
}

export function getActiveSession(): StellaSession | null {
  const sessions = getAll()
  return sessions.find(s => s.state === "active" || s.state === "paused") ?? null
}