export type DomainId = "yourAtlas" | "dreamWeaver" | "envision"
export type PillarId = "orientation" | "reflection" | "wonder" | "alignment" | "transformation"

export interface Domain {
  id: DomainId
  name: string
  purpose: string
  coreQuestion: string
  topics: string[]
}

export interface ExplorationPillar {
  id: PillarId
  name: string
  definition: string
  guidance: string
}

export interface Topic {
  id: string
  domainId: DomainId
  name: string
  description: string
  relatedThemes: string[]
}

export interface ThemeRelationship {
  theme: string
  domains: DomainId[]
  pillars: PillarId[]
  strength: "primary" | "secondary"
}

export interface JournalPrompt {
  id: string
  domainId: DomainId
  pillarId: PillarId
  topicId: string
  prompt: string
  followUps: string[]
}

export interface ReflectionQuestion {
  id: string
  domainId: DomainId
  pillarId: PillarId
  question: string
  intent: string
}

export interface KnowledgeContext {
  domain: Domain
  pillar: ExplorationPillar
  topic: Topic
  themes: ThemeRelationship[]
  journalPrompts: JournalPrompt[]
  reflectionQuestions: ReflectionQuestion[]
}