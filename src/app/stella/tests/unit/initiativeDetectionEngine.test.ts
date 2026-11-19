import { describe, it, expect } from "vitest";
import { InitiativeDetectionEngine }
  from "../../../../stella/initiative/InitiativeDetectionEngine";

describe(
  "InitiativeDetectionEngine",
  () => {
    const engine =
      new InitiativeDetectionEngine();

    it(
      "detects silent",
      () => {
        expect(
          engine.detect(
            "Just summarize these notes."
          )
        ).toBe("silent");
      }
    );

    it(
      "detects minimal",
      () => {
        expect(
          engine.detect(
            "Help me fix this bug."
          )
        ).toBe("minimal");
      }
    );

    it(
      "detects reflective",
      () => {
        expect(
          engine.detect(
            "I keep encountering this pattern."
          )
        ).toBe("reflective");
      }
    );
  }
);