import { JournalSessionSchema } from "./schemas";

import type {
  JournalEngineInput,
  JournalMode,
  JournalPrompt,
  ReflectionQuestion,
  JournalSession,
  JournalEngineDependencies,
} from "./types";

interface BuildSessionInput {
  input: JournalEngineInput;
  mode: JournalMode;
  prompts: JournalPrompt[];
  questions: ReflectionQuestion[];
  dependencies: JournalEngineDependencies;
}

export function buildSession({
  input,
  mode,
  prompts,
  questions,
  dependencies,
}: BuildSessionInput): JournalSession {
  const now = dependencies.now ?? (() => new Date());
  const createId =
    dependencies.createId ??
    (() => crypto.randomUUID());

  const session: JournalSession = {
    id: createId(),
    mode,

    exploration: {
      domain: input.resolvedContext.domain,
      pillar: input.resolvedContext.pillar,
      topic: input.resolvedContext.topic,
    },

    prompts: {
      prompts,
      selectionReason: "Selected from the current Atlas context.",
    },

    reflections: {
      questions,
      selectionReason: "Selected to support the current exploration.",
    },

    guidance: {
      opening:
        "Take your time. You can explore these questions in any order, skip anything that does not feel useful, and write as much or as little as you like.",
      closing:
        "You may return to this exploration whenever you choose.",
    },

    status: "ready",
    createdAt: now().toISOString(),
  };

  return JournalSessionSchema.parse(session);
}