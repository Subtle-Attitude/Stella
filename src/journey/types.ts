import type { NarrativeTimeline } from "@/history/types"
import type { PatternReport } from "@/patterns/types"
import type { TrendMap } from "@/trends/types"

export interface JourneyNode {
  id: string
  type: "domain" | "pillar" | "topic"
  label: string
  count: number
  lastSeen: string
}

export interface JourneyConnection {
  source: string
  target: string
  weight: number          // co-occurrence or shared period count
  label: string           // e.g. "appeared together in 4 periods"
}

export interface JourneyConstellation {
  nodes: JourneyNode[]
  connections: JourneyConnection[]
}

export interface JourneyTimeline {
  points: {
    date: string
    domain: string
    pillar: string
    topic: string
    count: number
  }[]
}

export interface JourneyInsight {
  statement: string       // purely descriptive
  evidenceCount: number
  source: "timeline" | "pattern" | "trend"
}

export interface JourneyMap {
  generatedAt: string
  overview: {
    totalExplorations: number
    mostActiveDomains: { name: string; count: number }[]
    mostActivePillars: { name: string; count: number }[]
  }
  constellation: JourneyConstellation
  timeline: JourneyTimeline
  trends: TrendMap
  insights: JourneyInsight[]
  governance: {
    pass: number
    warn: number
    block: number
  }
  sources: {
    timeline: string
    patternReport: string
    trendMap: string
  }
}