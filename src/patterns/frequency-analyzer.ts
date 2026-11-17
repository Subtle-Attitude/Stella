import type { NarrativeTimeline } from "@/history/types"
import type { PatternFrequency } from "./types"

export function analyzeFrequencies(timeline: NarrativeTimeline) {
  const topicMap = new Map<string, number>()
  const pillarMap = new Map<string, number>()
  const domainMap = new Map<string, number>()

  for (const section of timeline.sections) {
    const { topicName, pillarName, domainName, count } = section.cluster
    topicMap.set(topicName, (topicMap.get(topicName) || 0) + count)
    pillarMap.set(pillarName, (pillarMap.get(pillarName) || 0) + count)
    domainMap.set(domainName, (domainMap.get(domainName) || 0) + count)
  }

  const total = timeline.summary.totalExplorations || 1

  const toFreq = (map: Map<string, number>): PatternFrequency[] =>
    Array.from(map.entries())
      .map(([key, count]) => ({
        key,
        count,
        percentage: Math.round((count / total) * 100),
      }))
      .sort((a, b) => b.count - a.count)

  return {
    topics: toFreq(topicMap),
    pillars: toFreq(pillarMap),
    domains: toFreq(domainMap),
  }
}