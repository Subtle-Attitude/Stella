import type { ResolvedAtlasContext } from "@/atlas/types"
import type { AtlasKnowledgeContext } from "@/atlas/context/types"
import type { InteractionIntent } from "@/intent/types"
import type { ConversationalTurn } from "@/conversation/types"

export interface AppliedSafeguard {
  id: string
  rule: string
  source: "constitution" | "reflection" | "canon"
  enforced: boolean
}

export interface GovernanceViolation {
  code: string
  severity: "warning" | "violation"
  description: string
  excerpt?: string
}

export interface ConversationAuditRecord {
  id: string
  timestamp: string
  input: string
  resolved: ResolvedAtlasContext
  knowledge: AtlasKnowledgeContext
  intent: InteractionIntent
  generatedResponse: string
  reflectionDecision: "PASS" | "WARN" | "BLOCK"
  reflectionFlags: string[]
  safeguardsApplied: AppliedSafeguard[]
  violations: GovernanceViolation[]
  turn: ConversationalTurn | null
}

export interface GovernanceSummary {
  totalTurns: number
  passCount: number
  warnCount: number
  blockCount: number
  mostCommonIntent: string | null
  recentViolations: GovernanceViolation[]
}