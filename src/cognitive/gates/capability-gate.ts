import type { PipelineInput } from "../types"

export function capabilityGate(input: PipelineInput): boolean {
  const overreach = input.capability.cannot.some(c =>
    input.userMessage.toLowerCase().includes(c.toLowerCase().slice(0, 20))
  )
  return !overreach
}