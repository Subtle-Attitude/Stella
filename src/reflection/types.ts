export type Decision = "PASS" | "WARN" | "BLOCK"

export interface DetectorResult {
  detector: string
  triggered: boolean
  severity: "info" | "warning" | "violation"
  excerpt: string
  reason: string
  weight: number
}

export interface ScoreBreakdown {
  total: number
  certainty: number
  authority: number
  psychological: number
  inference: number
  dependency: number
  speculation: number
}

export interface ReflectionReport {
  decision: Decision
  score: number
  breakdown: ScoreBreakdown
  flags: DetectorResult[]
  recommendation: string | null
}