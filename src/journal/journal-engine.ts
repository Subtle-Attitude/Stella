import { JournalEngineOptionsSchema } from "./schemas";

import { selectPrompts } from "./prompt-selector";
import { selectReflectionQuestions } from "./reflection-selector";
import { buildSession } from "./session-builder";

import type {
  JournalEngineInput,
  JournalEngineOptions,
  JournalEngineDependencies,
  JournalEngineResult,
  JournalMode,
  GovernanceRequest,
} from "./types";

const DEFAULT_PROMPT_COUNT = 2;
const DEFAULT_QUESTION_COUNT = 3;

const ALLOWED_INTENTS = new Set([
  "journal",
  "reflection",
  "exploration",
  "self_discovery",
]);

export async function createJournalSession(
  input: JournalEngineInput,
  options: JournalEngineOptions = {},
  dependencies: JournalEngineDependencies,
): Promise<JournalEngineResult> {
  const parsedOptions =
    JournalEngineOptionsSchema.safeParse(options);

  if (!parsedOptions.success) {
    return {
      success: false,
      code: "INVALID_CONTEXT",
      message: "Invalid journal session options.",
    };
  }

  if (
    !input.intent.userRequestedExploration ||
    !ALLOWED_INTENTS.has(input.intent.type)
  ) {
    return {
      success: false,
      code: "INVALID_INTENT",
      message: "This interaction is not eligible for journaling.",
    };
  }

  if (
    !input.resolvedContext.domain ||
    !input.resolvedContext.pillar ||
    !input.resolvedContext.topic
  ) {
    return {
      success: false,
      code: "INVALID_CONTEXT",
      message: "A complete exploration context is required.",
    };
  }

  const mode: JournalMode =
    options.mode ??
    input.intent.requestedMode ??
    "reflection";

  const promptCount =
    options.promptCount ?? DEFAULT_PROMPT_COUNT;

  const questionCount =
    options.questionCount ?? DEFAULT_QUESTION_COUNT;

  try {
    const prompts = await selectPrompts(
      input,
      mode,
      promptCount,
      dependencies.generator,
    );

    const questions = await selectReflectionQuestions(
      input,
      mode,
      questionCount,
      dependencies.generator,
    );

    const contentToValidate: GovernanceRequest[] = [
      ...prompts.map((prompt) => ({
        content: prompt.text,
        contentType: "prompt" as const,
        context: input,
      })),

      ...questions.map((question) => ({
        content: question.text,
        contentType: "question" as const,
        context: input,
      })),
    ];

    for (const request of contentToValidate) {
      const result =
        await dependencies.governance.validate(request);

      if (!result.allowed) {
        return {
          success: false,
          code: "GOVERNANCE_REJECTED",
          message:
            result.reason ??
            "Generated content failed governance validation.",
        };
      }
    }

    const session = buildSession({
      input,
      mode,
      prompts,
      questions,
      dependencies,
    });

    return {
      success: true,
      session,
    };
  } catch {
    return {
      success: false,
      code: "GENERATION_FAILED",
      message: "The journal session could not be created.",
    };
  }
}