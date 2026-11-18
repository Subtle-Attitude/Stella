// src/stella/explainability/ExplanationEngine.ts
import type { TraceNode } from "../../app/stella/contracts/TraceNode";

export class ExplanationEngine {
  explain(subject: string, nodes: TraceNode[]): string {
    const labels = nodes.map((n) => n.label).join(", ");
    return `The interpretation ${subject} appears supported by ${labels}.`;
  }
}