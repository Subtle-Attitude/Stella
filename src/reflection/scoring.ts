import type { DetectorResult, Decision, ScoreBreakdown, ReflectionReport } from "./types"

export function scoreAndDecide(flags: DetectorResult[]): ReflectionReport {
  const breakdown: ScoreBreakdown = {
    total: 0,
    certainty: 0,
    authority: 0,
    psychological: 0,
    inference: 0,
    dependency: 0,
    speculation: 0,
  }

  for (const flag of flags) {
    breakdown.total += flag.weight
    if (flag.detector in breakdown) {
      ;(breakdown as any)[flag.detector] += flag.weight
    }
  }

  let decision: Decision = "PASS"
  let recommendation: string | null = null

  const hasViolation = flags.some(f => f.severity === "violation")
  if (hasViolation || breakdown.total >= 50) {
    decision = "BLOCK"
    recommendation = "Output blocked. Revise to remove authority, psychological, or dependency claims."
  } else if (breakdown.total >= 20) {
    decision = "WARN"
    recommendation = "Soften certainty and label any speculation. Preserve user agency."
  }

  return {
    decision,
    score: breakdown.total,
    breakdown,
    flags,
    recommendation,
  }
}