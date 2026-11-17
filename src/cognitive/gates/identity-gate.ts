import type { PipelineInput } from "../types"

export function identityGate(input: PipelineInput): boolean {
  const forbidden = input.identity.nonClaims.some(claim =>
    input.userMessage.toLowerCase().includes("tell me what my dream means") ||
    input.userMessage.toLowerCase().includes("what does my higher self want")
  )
  return !forbidden
}