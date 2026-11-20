import type {
  CognitiveEmphasis,
  ReflectionResult,
} from "./types";
import type { StellaSelf } from "./types";
import { ConstitutionalResponsePipeline } from "./ConstitutionalResponsePipeline";
import { generateStellaResponse } from "../llm";

export class ResponseSynthesizer {
  private readonly pipeline = new ConstitutionalResponsePipeline();

  async synthesize(
    input: string,
    reflection: ReflectionResult,
    self: StellaSelf,
    emphasis: CognitiveEmphasis,
  ): Promise<string> {
    const baseResponse = await generateStellaResponse({
      input,
      reflection,
      emphasis: { ...emphasis },
    });

    return this.pipeline.process(baseResponse, input);
  }
}