import type { NarrativeTimeline } from "@/history/types"
import { buildPatternReport } from "./pattern-engine"
import { savePatternReport } from "./report-builder"
import type { PatternReport } from "./types"

export function generatePatternReport(timeline: NarrativeTimeline): PatternReport {
  const report = buildPatternReport(timeline)
  savePatternReport(report)
  return report
}