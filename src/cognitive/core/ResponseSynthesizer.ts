// src/cognitive/core/ResponseSynthesizer.ts
import type { CognitiveEmphasis, ReflectionResult } from "./types";
import type { StellaSelf } from "./types";
import { PresenceExpressionEngine } from "../../stella/presence/PresenceExpressionEngine";
import { ResponsePacingEngine } from "../../stella/attunement/ResponsePacingEngine";
import { RelationalAttunementEngineV2 } from "../../stella/attunement/RelationalAttunementEngineV2";
import { ContextDetectionEngine } from "../../stella/attunement/ContextDetectionEngine";

export class ResponseSynthesizer {
  private readonly presence = new PresenceExpressionEngine();
  private readonly pacing = new ResponsePacingEngine();
  private readonly attunement = new RelationalAttunementEngineV2();
  private readonly context = new ContextDetectionEngine();

  synthesize(
    input: string,
    reflection: ReflectionResult,
    self: StellaSelf,
    emphasis: CognitiveEmphasis
  ): string {
    const baseResponse = `I heard you say: "${input}". Responding reflectively.`;

    let response = baseResponse;

    response = this.presence.express(response);

    const detectedContext = this.context.detect(input);

    response = this.pacing.pace(response, detectedContext);

    response = this.attunement.attune(response, input);

    return response;
  }
}