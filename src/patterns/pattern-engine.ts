import type { NarrativeTimeline } from "@/history/types"
import type { PatternReport, PatternObservation } from "./types"
import { analyzeFrequencies } from "./frequency-analyzer"
import { analyzeRelationships } from "./relationship-analyzer"

export function buildPatternReport(timeline: NarrativeTimeline): PatternReport {
  const frequencies = analyzeFrequencies(timeline)
  const relationships = analyzeRelationships(timeline)

  const observations: PatternObservation[] = frequencies.topics.slice(0, 5).map((t) => ({
    statement: `${t.key} appeared in ${t.count} recorded explorations`,
    evidenceCount: t.count,
    type: "frequency",
  }))

  const mostFrequent = frequencies.topics[0]?.key ?? null

  return {
    generatedAt: new Date().toISOString(),
    sourceTimelineGeneratedAt: timeline.generatedAt,
    frequencies,
    relationships,
    observations,
    summary: {
      totalExplorations: timeline.summary.totalExplorations,
      uniqueTopics: frequencies.topics.length,
      uniquePillars: frequencies.pillars.length,
      mostFrequentTopic: mostFrequent,
      governance: timeline.summary.governance,
    },
    source: timeline,
  }
}