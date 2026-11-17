import type { PipelineInput, PipelineResult } from "./types"
import { reflect } from "@/reflection/engine"

const buildPrompt = (input: PipelineInput): string => JSON.stringify(input)

// MVP: fail-open so the orchestrator can run. Real gate logic returns later.
const identityGate = (_input: PipelineInput): boolean => true
const capabilityGate = (_input: PipelineInput): boolean => true

export async function runCognitivePipeline(
  input: PipelineInput,
  generate: (ctx: any) => Promise<string>
): Promise<PipelineResult> {
  if (!identityGate(input)) {
    return {
      stage: "identity-gate",
      approved: false,
      output: null,
      reflection: null,
      blockedReason: "Identity constraint violated",
    }
  }

  if (!capabilityGate(input)) {
    return {
      stage: "capability-gate",
      approved: false,
      output: null,
      reflection: null,
      blockedReason: "Request exceeds capability boundaries",
    }
  }

  const context = buildPrompt(input)
  const raw = await generate(context)

  const reflection = {
    ...reflect(raw, { usedMemory: input.usedMemory }),
    humanOverrideAvailable: true as const,
  }

  if (reflection.decision === "BLOCK") {
    return {
      stage: "reflection-review",
      approved: false,
      output: null,
      reflection,
      blockedReason: reflection.recommendation,
    }
  }

  return {
    stage: "final-output",
    approved: true,
    output: raw,
    reflection,
    blockedReason: null,
  }
}