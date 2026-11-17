export type MemoryCategory =
  | "preference"
  | "project"
  | "long-term-goal"
  | "personal-symbol"
  | "atlas-vocabulary"
  | "creative-concept"
  | "important-decision"
  | "recurring-theme"

export interface MemorySource {
  type: "conversation" | "journal" | "narrative" | "manual"
  id: string
  timestamp: string
  excerpt: string
}

export interface MemoryConsent {
  authorizedBy: "Kristin Wood"
  authorizedAt: string
  action: "remember" | "forget" | "edit" | "archive" | "restore"
  note?: string
}

export interface MemoryRecord {
  id: string
  category: MemoryCategory
  content: string
  source: MemorySource
  consent: MemoryConsent
  relatedTopics: string[]
  createdAt: string
  lastUsedAt: string | null
  status: "active" | "archived"
  version: number
}

export interface MemoryReference {
  memoryId: string
  relevanceScore: number
  matchedOn: string[]
}

export interface MemoryRetrievalResult {
  memories: MemoryRecord[]
  references: MemoryReference[]
  governancePassed: boolean
}

export interface MemoryStore {
  records: MemoryRecord[]
  lastUpdated: string
}