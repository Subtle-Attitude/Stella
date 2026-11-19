// src/stella/runtime/StellaCognitiveRuntime.ts
import type { RuntimeRequest } from "../../app/stella/contracts/RuntimeRequest";
import type { RuntimeResponse } from "../../app/stella/contracts/RuntimeResponse";
import { ContextDetectionEngine } from "../attunement/ContextDetectionEngine";
import { InitiativeDetectionEngine } from "../initiative/InitiativeDetectionEngine";
import { InitiativeExecutionEngine } from "../initiative/InitiativeExecutionEngine";

export class StellaCognitiveRuntime {
  private readonly context = new ContextDetectionEngine();
  private readonly initiativeDetector = new InitiativeDetectionEngine();
  private readonly initiative = new InitiativeExecutionEngine();

  execute(request: RuntimeRequest): RuntimeResponse {
    const context = this.context.detect(request.input);
    const initiativeLevel = this.initiativeDetector.detect(request.input);

    const baseResponse = `Context detected: ${context}`;

    const response = this.initiative.execute(request.input, baseResponse);

    return {
      response,
      initiativeLevel,
    };
  }
}