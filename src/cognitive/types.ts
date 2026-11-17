import type { EthicalConstitution, IdentityAwareness, CapabilityAwareness } from "@/constitution/types"

export type PipelineStage =
  | "identity-gate"
  | "capability-gate"
  | "prompt-builder"
  | "generation"
  | "reflection-review"
  | "approval"
  | "final-output"

export interface PipelineInput {
  userMessage: string
  canonContext: Record<string, unknown>
  constitution: EthicalConstitution
  identity: IdentityAwareness
  capability: CapabilityAwareness
  usedMemory: boolean
}

export interface GenerationContext {
  systemPrompt: string
  constraints: string[]
  identityStatement: string
  capabilityBoundaries: string[]
  specialRules: string[]
}

export interface ReflectionOutcome {
  decision: "PASS" | "WARN" | "BLOCK"
  score: number
  flags: ReflectionFlag[]
  recommendation: string | null
  humanOverrideAvailable: true
}

export interface ReflectionFlag {
  detector: string
  severity: "info" | "warning" | "violation"
  excerpt: string
  reason: string
}

export interface PipelineResult {
  stage: PipelineStage
  approved: boolean
  output: string | null
  reflection: ReflectionOutcome | null
  blockedReason: string | null
}