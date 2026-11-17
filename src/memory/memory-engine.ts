import type { MemoryRecord, MemoryCategory, MemorySource } from "./types"
import { createConsent, logConsent } from "./consent-manager"
import { addRecord } from "./memory-store"
import { MemoryRecordSchema } from "./schemas"

export function remember(params: {
  category: MemoryCategory
  content: string
  source: MemorySource
  relatedTopics?: string[]
  note?: string
}): MemoryRecord {
  const consent = createConsent("remember", params.note)
  logConsent(consent)

  const record: MemoryRecord = {
    id: crypto.randomUUID(),
    category: params.category,
    content: params.content,
    source: params.source,
    consent,
    relatedTopics: params.relatedTopics ?? [],
    createdAt: new Date().toISOString(),
    lastUsedAt: null,
    status: "active",
    version: 1,
  }

  MemoryRecordSchema.parse(record)
  addRecord(record)
  return record
}