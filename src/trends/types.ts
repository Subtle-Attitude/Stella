import type { NarrativeTimeline } from "@/history/types"
import type { PatternReport } from "@/patterns/types"

export interface TrendPoint {
  period: string          // ISO date or window label
  count: number
}

export interface TopicTrend {
  topic: string
  currentCount: number
  previousCount: number
  change: number
  direction: "increase" | "decrease" | "stable" | "new" | "dormant"
  points: TrendPoint[]
}

export interface PillarTrend {
  pillar: string
  currentCount: number
  previousCount: number
  change: number
  direction: "increase" | "decrease" | "stable"
}

export interface DomainTrend {
  domain: string
  currentCount: number
  previousCount: number
  change: number
  direction: "increase" | "decrease" | "stable"
}

export interface TrendObservation {
  statement: string       // e.g. "Purpose & Direction increased from 3 to 8 recorded explorations"
  evidence: {
    current: number
    previous: number
  }
}

export interface TrendSummary {
  totalTopicsTracked: number
  topicsIncreasing: number
  topicsDecreasing: number
  topicsStable: number
  governance: {
    pass: number
    warn: number
    block: number
  }
}

export interface TrendMap {
  generatedAt: string
  windowDays: number
  topics: TopicTrend[]
  pillars: PillarTrend[]
  domains: DomainTrend[]
  observations: TrendObservation[]
  summary: TrendSummary
  sources: {
    timelineGeneratedAt: string
    patternReportGeneratedAt: string
  }
}