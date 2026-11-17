import type { NarrativeTimeline } from "@/history/types"

export interface PatternRecord {
  id: string
  type: "topic" | "pillar" | "domain" | "theme"
  name: string
  count: number
  firstSeen: string
  lastSeen: string
  averageIntervalDays: number | null
}

export interface PatternFrequency {
  key: string
  count: number
  percentage: number
}

export interface PatternRelationship {
  topicA: string
  topicB: string
  coOccurrenceCount: number
  periods: number
}

export interface PatternObservation {
  statement: string
  evidenceCount: number
  type: "frequency" | "co-occurrence" | "interval"
}

export interface PatternSummary {
  totalExplorations: number
  uniqueTopics: number
  uniquePillars: number
  mostFrequentTopic: string | null
  governance: {
    pass: number
    warn: number
    block: number
  }
}

export interface PatternReport {
  generatedAt: string
  sourceTimelineGeneratedAt: string
  frequencies: {
    topics: PatternFrequency[]
    pillars: PatternFrequency[]
    domains: PatternFrequency[]
  }
  relationships: PatternRelationship[]
  observations: PatternObservation[]
  summary: PatternSummary
  source: NarrativeTimeline
}