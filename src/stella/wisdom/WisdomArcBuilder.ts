// src/stella/wisdom/WisdomArcBuilder.ts
import type { WisdomArc } from "../../app/stella/contracts/WisdomArc";

export class WisdomArcBuilder {
  build(tensions: string[], integrations: string[]): WisdomArc {
    return {
      tensions,
      integrations,
      confidence: integrations.length > 0 ? "medium" : "low",
    };
  }
}