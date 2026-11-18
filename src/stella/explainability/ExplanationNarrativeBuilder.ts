// src/stella/explainability/ExplanationNarrativeBuilder.ts
import type { TraceNode } from "../../app/stella/contracts/TraceNode";

export class ExplanationNarrativeBuilder {
  build(subject: string, nodes: TraceNode[]): string {
    const labels = nodes.map((n) => n.label).join(", ");
    return `The interpretation ${subject} appears derived from recurring observations involving ${labels}.`;
  }
}