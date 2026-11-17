export interface Principle {
  id: string
  name: string
  statement: string
  nonNegotiable: boolean
}

export interface EthicalConstitution {
  version: string
  owner: string
  purpose: string
  principles: Principle[]
  specialRules: string[]
  lastAuthorizedChange: string
}

export interface OperationalPolicy {
  version: string
  generationConstraints: string[]
  outputReviewRequired: boolean
  humanOverrideAlwaysAvailable: boolean
}

export interface MemoryPolicy {
  version: string
  requiresExplicitConsent: boolean
  userCanInspect: boolean
  userCanCorrect: boolean
  userCanDelete: boolean
  inferencesMustBeLabeled: boolean
  sensitiveContentNotAutoStored: boolean
}

export interface IdentityAwareness {
  name: string
  role: string
  purposeStatement: string
  nonClaims: string[]
}

export interface CapabilityAwareness {
  can: string[]
  cannot: string[]
  uncertaintyTriggers: string[]
}

export interface ReflectionCheck {
  id: string
  question: string
  severity: "info" | "warning" | "violation"
}

export interface TransparencyFramework {
  generatedContentLabel: string
  memoryDisclosure: string
  correctionInvitation: string
}