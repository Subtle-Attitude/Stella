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

  private readonly pipeline =
    new ConstitutionalResponsePipeline();

  synthesize(
    input: string,
    reflection: ReflectionResult,
    self: StellaSelf,
    emphasis: CognitiveEmphasis,
  ): string {

    const baseResponse =
      `I heard you say: "${input}". Responding reflectively.`;

    return this.pipeline.process(
      baseResponse,
      input
    );

  }

}