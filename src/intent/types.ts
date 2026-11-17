import type { AtlasKnowledgeContext } from "@/atlas/context/types"

export type IntentId =
  | "reflection"
  | "journal_prompt"
  | "exploration_question"
  | "theme_exploration"
  | "orientation"
  | "alignment_review"
  | "transformation_exploration"

export interface IntentCandidate {
  id: IntentId
  label: string
  description: string
  allowed: boolean
}

export interface IntentScore {
  intentId: IntentId
  score: number
  signals: string[]
}

export interface InteractionIntent {
  id: IntentId
  label: string
  confidence: number
  reasoning: string[]
  alternatives: IntentScore[]
}

export interface IntentContext {
  knowledge: AtlasKnowledgeContext
  signals: string[]
}

export interface IntentResolutionResult {
  success: boolean
  intent: InteractionIntent | null
  errors: string[]
}