export type DomainId = "yourAtlas" | "dreamWeaver" | "envision"
export type PillarId = "orientation" | "reflection" | "wonder" | "alignment" | "transformation"

export interface TopicMatch {
  topicId: string
  name: string
  domainId: DomainId
  score: number
  matchedTerms: string[]
}

export interface PillarSignal {
  pillarId: PillarId
  score: number
  signals: string[]
}

export interface ResolvedAtlasContext {
  domain: {
    id: DomainId
    name: string
    coreQuestion: string
  }
  pillar: {
    id: PillarId
    name: string
    definition: string
  }
  topic: {
    id: string
    name: string
    description: string
  }
  confidence: number          // 0–1
  reasoning: string[]         // ordered explainable steps
  matchedTerms: string[]
  alternativeCandidates?: {
    domain?: DomainId
    pillar?: PillarId
    topic?: string
  }
  timestamp: string
}

export interface ResolutionInput {
  text: string
  priorContext?: Partial<ResolvedAtlasContext>   // optional, for future continuity
}