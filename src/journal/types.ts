export type JournalMode =
  | "orientation"
  | "reflection"
  | "wonder"
  | "alignment"
  | "transformation";

export type JournalSessionStatus =
  | "ready"
  | "in_progress"
  | "completed"
  | "abandoned";

export interface ResolvedAtlasContext {
  domain: string;
  pillar: string;
  topic: string;
  contextId: string;
}

export interface AtlasKnowledgeContext {
  relevantTopics: string[];
  approvedPrompts?: string[];
  approvedQuestions?: string[];
}

export interface InteractionIntent {
  type: string;
  requestedMode?: JournalMode;
  userRequestedExploration: boolean;
}

export interface JournalExploration {
  domain: string;
  pillar: string;
  topic: string;
}

export interface JournalPrompt {
  id: string;
  text: string;
  purpose: string;
  source: "atlas" | "generated";
  tags: string[];
}

export interface ReflectionQuestion {
  id: string;
  text: string;
  purpose: string;
  tags: string[];
}

export interface JournalPromptSet {
  prompts: JournalPrompt[];
  selectionReason: string;
}

export interface ReflectionSet {
  questions: ReflectionQuestion[];
  selectionReason: string;
}

export interface JournalGuidance {
  opening: string;
  closing?: string;
  optionalNextStep?: string;
}

export interface JournalSession {
  id: string;
  mode: JournalMode;
  exploration: JournalExploration;
  prompts: JournalPromptSet;
  reflections: ReflectionSet;
  guidance: JournalGuidance;
  status: JournalSessionStatus;
  createdAt: string;
}

export interface JournalEntry {
  id: string;
  sessionId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: "user";
}

export interface JournalSessionResult {
  session: JournalSession;
  entries: JournalEntry[];
}

export interface JournalEngineInput {
  resolvedContext: ResolvedAtlasContext;
  knowledgeContext: AtlasKnowledgeContext;
  intent: InteractionIntent;
}

export interface JournalEngineOptions {
  mode?: JournalMode;
  promptCount?: number;
  questionCount?: number;
}

export interface GovernanceRequest {
  content: string;
  contentType: "prompt" | "question" | "guidance";
  context: JournalEngineInput;
}

export interface GovernanceResult {
  allowed: boolean;
  reason?: string;
}

export interface JournalGovernance {
  validate(
    request: GovernanceRequest,
  ): Promise<GovernanceResult>;
}

export interface JournalContentGenerator {
  generatePrompts(
    input: JournalEngineInput,
    mode: JournalMode,
    count: number,
  ): Promise<JournalPrompt[]>;

  generateQuestions(
    input: JournalEngineInput,
    mode: JournalMode,
    count: number,
  ): Promise<ReflectionQuestion[]>;
}

export interface JournalEngineDependencies {
  governance: JournalGovernance;
  generator?: JournalContentGenerator;
  now?: () => Date;
  createId?: () => string;
}

export type JournalEngineResult =
  | {
      success: true;
      session: JournalSession;
    }
  | {
      success: false;
      code:
        | "INVALID_INTENT"
        | "INVALID_CONTEXT"
        | "GOVERNANCE_REJECTED"
        | "GENERATION_FAILED";
      message: string;
    };

export type JournalSessionSchemaType = JournalSession;

export type JournalEntrySchemaType = JournalEntry;