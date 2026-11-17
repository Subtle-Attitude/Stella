import { createSession, updateSessionStatus } from "./voice-session"
import { routeVoice } from "./voice-router"
import type { VoiceRequest } from "./types"

export const startSession = (mode?: "conversation" | "journal") => createSession(mode)
export const pauseSession = (id: string) => updateSessionStatus(id, "paused")
export const resumeSession = (id: string) => updateSessionStatus(id, "active")
export const endSession = (id: string) => updateSessionStatus(id, "ended")
export const handleTurn = (req: VoiceRequest) => routeVoice(req)