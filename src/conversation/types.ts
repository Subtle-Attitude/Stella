import type { AtlasKnowledgeContext } from "@/atlas/context/types"
import type { InteractionIntent } from "@/intent/types"

export interface ConversationalTurn {
  id: string
  intent: InteractionIntent
  content: string
  reflectionDecision: "PASS" | "WARN" | "BLOCK"
  reflectionFlags: string[]
  safeguardsApplied: string[]
  timestamp: string
}

export interface ConversationInput {
  knowledge: AtlasKnowledgeContext
  intent: InteractionIntent
  priorTurns?: ConversationalTurn[]
}

export interface ConversationResult {
  success: boolean
  turn: ConversationalTurn | null
  errors: string[]
}