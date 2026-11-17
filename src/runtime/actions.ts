"use server"

import { startSession, pauseSession, resumeSession, endSession, getActiveSession } from "./session-manager"
import type { SessionType } from "./types"

export async function actionStart(type: SessionType) {
  return startSession(type)
}

export async function actionPause(id: string) {
  pauseSession(id)
}

export async function actionResume(id: string) {
  resumeSession(id)
}

export async function actionEnd(id: string) {
  endSession(id)
}

export async function actionGetActive() {
  return getActiveSession()
}