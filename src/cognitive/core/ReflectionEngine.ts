import type {
  ReflectionResult,
  StellaSelf,
} from "./types";

import { ContextDetectionEngine }
  from "../../stella/attunement/ContextDetectionEngine";

class ReflectionOpportunityEngine {
  detect(_text: string): ReflectionResult["insights"] {
    return [];
  }
}

export class ReflectionEngine {
  private readonly context =
    new ContextDetectionEngine();

  private readonly opportunities =
    new ReflectionOpportunityEngine();

  async reflect(
    text: string,
    memoryContext: unknown,
    self: StellaSelf
  ): Promise<ReflectionResult> {

    const detectedContext =
      this.context.detect(text);

    const insights =
      this.opportunities.detect(text);

    return {
      insights,
      emotionalState: "present" as any,
      shouldReflect:
        insights.length > 0 ||
        detectedContext === "reflection",
    };
  }
}
