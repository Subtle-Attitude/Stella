import type { MemoryRetrievalResult } from "./types"
import { loadStore } from "./memory-store"

export function retrieveRelevant(query: {
  topics?: string[]
  category?: string
  text?: string
}): MemoryRetrievalResult {
  const store = loadStore()
  const active = store.records.filter((r) => r.status === "active")

  const matched = active.filter((r) => {
    if (query.category && r.category !== query.category) return false
    if (query.topics?.length && !query.topics.some((t) => r.relatedTopics.includes(t))) return false
    if (query.text && !r.content.toLowerCase().includes(query.text.toLowerCase())) return false
    return true
  })

  return {
    memories: matched,
    references: matched.map((m) => ({
      memoryId: m.id,
      relevanceScore: 1,
      matchedOn: query.topics ?? [],
    })),
    governancePassed: true,
  }
}