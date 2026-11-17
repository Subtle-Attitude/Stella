import "server-only"
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs"
import { join } from "path"
import type { StellaSession } from "./types"

const DIR = join(process.cwd(), "data/runtime")
const FILE = join(DIR, "sessions.json")

function ensure() {
  if (!existsSync(DIR)) mkdirSync(DIR, { recursive: true })
  if (!existsSync(FILE)) writeFileSync(FILE, "[]")
}

export function loadSessions(): StellaSession[] {
  ensure()
  return JSON.parse(readFileSync(FILE, "utf-8"))
}

export function saveSessions(sessions: StellaSession[]) {
  ensure()
  writeFileSync(FILE, JSON.stringify(sessions, null, 2))
}