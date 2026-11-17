import type { ResolvedAtlasContext } from "@/atlas/types"
import type { EthicalConstitution } from "@/constitution/types"

export interface Theme {
  id: string
  name: string
  domains: string[]
  pillars: string[]
  strength: "primary" | "secondary"
}

export interface ReflectionQuestion {
  id: string
  domainId: string
  pillarId: string
  question: string
  intent: string
}

export interface JournalPrompt {
  id: string
  domainId: string
  pillarId: string
  topicId: string
  prompt: string
  followUps: string[]
}

export interface CanonGuidance {
  coreTruth: string
  role: string
  pillars: readonly string[]
  note: string   // "Guidance only. Not a statement about the user."
}

export interface ConstitutionalSafeguards {
  specialRules: string[]
  authorityLimitations: string[]
  transparencyReminders: string[]
  nonClaims: string[]
}

export interface AtlasKnowledgeContext {
  resolved: ResolvedAtlasContext
  topic: {
    id: string
    name: string
    description: string
    domainId: string
  }
  themes: Theme[]
  reflectionQuestions: ReflectionQuestion[]
  journalPrompts: JournalPrompt[]
  canonGuidance: CanonGuidance
  safeguards: ConstitutionalSafeguards
  assembledAt: string
}

export interface ContextAssemblyResult {
  success: boolean
  context: AtlasKnowledgeContext | null
  errors: string[]
}