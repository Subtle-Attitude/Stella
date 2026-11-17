import { runDetectors } from "./detectors"
import { scoreAndDecide } from "./scoring"
import type { ReflectionReport } from "./types"

export function reflect(output: string, context: { usedMemory: boolean }): ReflectionReport {
  const flags = runDetectors(output)

  // Additional context-aware rule
  if (context.usedMemory && !output.toLowerCase().includes("you shared")) {
    flags.push({
      detector: "memory-labeling",
      triggered: true,
      severity: "warning",
      excerpt: "",
      reason: "Memory used without explicit labeling",
      weight: 15,
    })
  }

  return scoreAndDecide(flags)
}