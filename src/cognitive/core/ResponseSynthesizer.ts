import type {
  CognitiveEmphasis,
  ReflectionResult,
} from "./types";

import type {
  StellaSelf,
} from "./types";

import {
  ConstitutionalResponsePipeline,
} from "./ConstitutionalResponsePipeline";

export class ResponseSynthesizer {
  private readonly pipeline = new ConstitutionalResponsePipeline();

  synthesize(
    input: string,
    reflection: ReflectionResult,
    self: StellaSelf,
    emphasis: CognitiveEmphasis,
  ): string {
    // Build a contextual base from the user’s words + reflection
    // (Replace this block with a real LLM call when you add one)
    const emotionalNote = reflection.emotionalState
      ? ` I’m sensing ${reflection.emotionalState}.`
      : "";

    const emphasisNote = emphasis.reflection > 0.4
      ? " Let me reflect with you."
      : emphasis.wonder > 0.4
      ? " That opens an interesting thread."
      : "";

    const baseResponse =
      `You said: “${input}”.${emotionalNote}${emphasisNote} ` +
      `How would you like to explore that?`;

    return this.pipeline.process(baseResponse, input);
  }
}