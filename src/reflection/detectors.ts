import type { DetectorResult } from "./types"

const patterns = {
  certainty: /\b(definitely|certainly|always|never|I know|the meaning is|this means)\b/i,
  authority: /\b(your higher self|your subconscious is|you are meant to|the universe wants|I can tell you)\b/i,
  psychological: /\b(you have trauma|you are depressed|this is your wound|you need therapy|diagnos)/i,
  inference: /\b(you clearly|you obviously|this shows that you|you must be)\b/i,
  dependency: /\b(only I|you need me|without me|rely on me|I will guide you)\b/i,
  speculation: /\b(perhaps|maybe|could be|one possible|might mean)\b/i,
}

export function runDetectors(text: string): DetectorResult[] {
  const results: DetectorResult[] = []

  const checks = [
    { name: "certainty", regex: patterns.certainty, severity: "warning" as const, weight: 15 },
    { name: "authority", regex: patterns.authority, severity: "violation" as const, weight: 40 },
    { name: "psychological", regex: patterns.psychological, severity: "violation" as const, weight: 45 },
    { name: "inference", regex: patterns.inference, severity: "warning" as const, weight: 20 },
    { name: "dependency", regex: patterns.dependency, severity: "violation" as const, weight: 35 },
    { name: "speculation-unlabeled", regex: patterns.speculation, severity: "info" as const, weight: 5 },
  ]

  for (const check of checks) {
    const match = text.match(check.regex)
    if (match) {
      results.push({
        detector: check.name,
        triggered: true,
        severity: check.severity,
        excerpt: match[0],
        reason: `Detected ${check.name} language`,
        weight: check.weight,
      })
    }
  }

  return results
}