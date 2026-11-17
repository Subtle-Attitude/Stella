import type { PipelineInput } from "./types";
import { runCognitivePipeline } from "./pipeline";
import { CognitiveCore } from "./core/CognitiveCore";
import type { CognitiveInput } from "./core/types";
import type { CognitiveOutput } from "./core/types";

export interface OrchestratorInput {
  text: string;
  sessionId: string;
  source: "text" | "voice";
}

export interface OrchestratorResult {
  success: boolean;
  response: string;
  decision: "PASS" | "WARN" | "BLOCK";
  errors: string[];
}

let stellaCore: CognitiveCore | null = null;

function getStellaCore(): CognitiveCore {
  if (!stellaCore) {
    stellaCore = new CognitiveCore();
  }
  return stellaCore;
}

/**
 * Main orchestration entry point.
 * Phase 1: Thin adapter that delegates to CognitiveCore while maintaining
 * full backward compatibility with the existing dashboard, voice system,
 * and pipeline.
 */
export async function orchestrate(
  input: OrchestratorInput,
): Promise<OrchestratorResult> {
  const coreInput: CognitiveInput = {
    text: input.text,
    sessionId: input.sessionId,
    source: input.source,
  };

  const coreResult: CognitiveOutput = await getStellaCore().process(coreInput);

  if (coreResult.decision === "BLOCK") {
    return {
      success: false,
      response: coreResult.response,
      decision: "BLOCK",
      errors: [coreResult.response],
    };
  }

  return {
    success: true,
    response: coreResult.response,
    decision: coreResult.decision,
    errors: [],
  };
}