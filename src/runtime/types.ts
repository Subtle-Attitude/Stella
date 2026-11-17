export type SessionType = "conversation" | "journal" | "voice"
export type SessionState = "idle" | "active" | "paused" | "ended"

export interface ActiveExploration {
  domain?: string
  pillar?: string
  topic?: string
  intent?: string
}

export interface StellaSession {
  id: string
  type: SessionType
  state: SessionState
  startedAt: string
  lastActiveAt: string
  endedAt?: string
  exploration: ActiveExploration
  governanceState: "PASS" | "WARN" | "BLOCK" | "none"
}

export interface RuntimeStatus {
  activeSession: StellaSession | null
}