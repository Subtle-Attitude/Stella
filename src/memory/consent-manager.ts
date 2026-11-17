import { appendFileSync, existsSync, mkdirSync } from "fs"
import { join } from "path"
import type { MemoryConsent } from "./types"

const DIR = join(process.cwd(), "data/memory")
const LOG = join(DIR, "consent-log.json")

function ensure() {
  if (!existsSync(DIR)) mkdirSync(DIR, { recursive: true })
  if (!existsSync(LOG)) appendFileSync(LOG, "[]")
}

export function logConsent(consent: MemoryConsent) {
  ensure()
  const raw = require("fs").readFileSync(LOG, "utf-8")
  const arr = JSON.parse(raw)
  arr.push(consent)
  require("fs").writeFileSync(LOG, JSON.stringify(arr, null, 2))
}

export function createConsent(
  action: MemoryConsent["action"],
  note?: string
): MemoryConsent {
  return {
    authorizedBy: "Kristin Wood",
    authorizedAt: new Date().toISOString(),
    action,
    note,
  }
}