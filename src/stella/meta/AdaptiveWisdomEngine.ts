// src/stella/meta/AdaptiveWisdomEngine.ts
import type {
  AdaptiveWisdomState,
} from "../../app/stella/contracts/AdaptiveWisdomState";

export class AdaptiveWisdomEngine {
  compare(
    subject: string,
    previous:
      | "low"
      | "medium",
    current:
      | "low"
      | "medium"
  ): AdaptiveWisdomState {
    let change:
      | "increased"
      | "decreased"
      | "unchanged";

    if (
      previous === "low" &&
      current === "medium"
    ) {
      change =
        "increased";
    } else if (
      previous === "medium" &&
      current === "low"
    ) {
      change =
        "decreased";
    } else {
      change =
        "unchanged";
    }

    return {
      subject,
      previousConfidence:
        previous,

      currentConfidence:
        current,

      change,
    };
  }
}