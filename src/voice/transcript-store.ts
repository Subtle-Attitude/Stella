import { appendFileSync, existsSync, mkdirSync } from "fs"
import { join } from "path"
import type { VoiceTranscript } from "./types"

const DIR = join(process.cwd(), "data/voice")

function ensure() {
  if (!existsSync(DIR)) mkdirSync(DIR, { recursive: true })
}

export function appendTranscript(sessionId: string, transcript: VoiceTranscript) {
  ensure()
  const path = join(DIR, `${sessionId}.jsonl`)
  appendFileSync(path, JSON.stringify(transcript) + "\n")
}