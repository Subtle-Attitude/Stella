// src/stella/meta/MetaReflectionNarrativeBuilder.ts
import type { MetaReflection } from "../../app/stella/contracts/MetaReflection";

export class MetaReflectionNarrativeBuilder {
  build(reflection: MetaReflection): string {
    return `${reflection.subject} appears supported by ${reflection.supportingEvidence.length} recurring observations. Current confidence remains ${reflection.confidence} and future observations may strengthen or weaken this interpretation.`;
  }
}