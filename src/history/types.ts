import type { ConversationAuditRecord } from "@/governance/types"

export interface NarrativeRecord {
  id: string
  timestamp: string
  domainId: string
  domainName: string
  pillarId: string
  pillarName: string
  topicId: string
  topicName: string
  intentId: string
  reflectionDecision: "PASS" | "WARN" | "BLOCK"
  excerpt: string
}

export interface NarrativeTheme {
  name: string
  count: number
  domains: string[]
  pillars: string[]
}

export interface NarrativeCluster {
  key: string                    // e.g. "yourAtlas|orientation|purpose-direction"
  domainName: string
  pillarName: string
  topicName: string
  count: number
  records: NarrativeRecord[]
  firstSeen: string
  lastSeen: string
}

export interface TimelineSection {
  label: string                  // e.g. "Orientation · Purpose & Direction"
  cluster: NarrativeCluster
  summary: string                // purely descriptive
}

export interface NarrativeSummary {
  totalExplorations: number
  domainBreakdown: Record<string, number>
  pillarBreakdown: Record<string, number>
  mostFrequentTopics: { name: string; count: number }[]
  governance: {
    pass: number
    warn: number
    block: number
  }
}

export interface NarrativeTimeline {
  generatedAt: string
  sections: TimelineSection[]
  themes: NarrativeTheme[]
  summary: NarrativeSummary
  sourceRecordCount: number
}