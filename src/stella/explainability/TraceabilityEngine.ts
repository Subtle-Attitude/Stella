// src/stella/explainability/TraceabilityEngine.ts
import type { TraceNode } from "../../app/stella/contracts/TraceNode";
import { randomUUID } from "crypto";

export class TraceabilityEngine {
  build(labels: string[], types: TraceNode["type"][] = []): TraceNode[] {
    return labels.map((label, i) => ({
      id: randomUUID(),
      type: types[i] ?? "wisdom",
      label,
    }));
  }
}