// src/cognitive/core/ResponseSynthesizer.ts

import type {
  CognitiveEmphasis,
  ReflectionResult,
} from "./types";

import type {
  StellaSelf,
} from "./types";

import { IdentityExpressionEngine }
  from "./IdentityExpressionEngine";

import {
  PresenceExpressionEngine,
} from "../../stella/presence/PresenceExpressionEngine";

import {
  ResponsePacingEngine,
} from "../../stella/attunement/ResponsePacingEngine";

import {
  RelationalAttunementEngineV2,
} from "../../stella/attunement/RelationalAttunementEngineV2";

import {
  ContextDetectionEngine,
} from "../../stella/attunement/ContextDetectionEngine";

export class ResponseSynthesizer {
  private readonly identity =
    new IdentityExpressionEngine();

  private readonly presence =
    new PresenceExpressionEngine();

  private readonly pacing =
    new ResponsePacingEngine();

  private readonly attunement =
    new RelationalAttunementEngineV2();

  private readonly context =
    new ContextDetectionEngine();

  synthesize(
    input: string,
    reflection: ReflectionResult,
    self: StellaSelf,
    emphasis: CognitiveEmphasis
  ): string {

    const shouldReflect =
      reflection.shouldReflect ?? true;

    const tone =
      shouldReflect
        ? "Responding reflectively."
        : "Responding clearly.";

    let response =
      `I heard you say: "${input}". ${tone}`;

    response =
      this.identity.express(response);

    response =
      this.presence.express(response);

    const detectedContext =
      this.context.detect(input);

    response =
      this.pacing.pace(
        response,
        detectedContext
      );

    response =
      this.attunement.attune(
        response,
        input
      );

    return response;
  }
}