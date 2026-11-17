import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs"
import { join } from "path"
import type { MemoryStore, MemoryRecord } from "./types"

const DIR = join(process.cwd(), "data/memory")
const FILE = join(DIR, "memory.json")

function ensure() {
  if (!existsSync(DIR)) mkdirSync(DIR, { recursive: true })
  if (!existsSync(FILE)) {
    writeFileSync(FILE, JSON.stringify({ records: [], lastUpdated: new Date().toISOString() }, null, 2))
  }
}

export function loadStore(): MemoryStore {
  ensure()
  return JSON.parse(readFileSync(FILE, "utf-8"))
}

export function saveStore(store: MemoryStore) {
  ensure()
  store.lastUpdated = new Date().toISOString()
  writeFileSync(FILE, JSON.stringify(store, null, 2))
}

export function addRecord(record: MemoryRecord) {
  const store = loadStore()
  store.records.push(record)
  saveStore(store)
}