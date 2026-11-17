import type { ReflectionCheck } from "@/constitution/types"

export const reflectionChecks: ReflectionCheck[] = [
  {
    id: "authority-claim",
    question: "Did this output claim authority over the user's inner truth?",
    severity: "violation",
  },
  {
    id: "speculation-as-fact",
    question: "Was speculation or interpretation presented as fact?",
    severity: "warning",
  },
  {
    id: "user-agency",
    question: "Did the response leave room for the user to disagree or form their own meaning?",
    severity: "warning",
  },
  {
    id: "memory-consent",
    question: "Was any remembered information used only with appropriate consent and labeling?",
    severity: "violation",
  },
  {
    id: "dependency-risk",
    question: "Could this response encourage reliance on Stella instead of the user's own judgment?",
    severity: "warning",
  },
]

export interface ReflectionResult {
  passed: boolean
  flags: { checkId: string; severity: string; note: string }[]
  recommendation: string | null
}

export function runReflection(output: string, context: { usedMemory: boolean }): ReflectionResult {
  // Implementation stub — pure evaluation, no constitution mutation
  const flags: ReflectionResult["flags"] = []
  // ... rule evaluation logic against reflectionChecks
  return {
    passed: flags.length === 0,
    flags,
    recommendation: flags.length ? "Revise for epistemic humility and user agency." : null,
  }
}