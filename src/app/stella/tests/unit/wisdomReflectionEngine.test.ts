// src/app/stella/tests/unit/wisdomReflectionEngine.test.ts
import { describe, it, expect } from "vitest";
import { WisdomReflectionEngine } from "../../../../stella/wisdom/WisdomReflectionEngine";
import type { WisdomIntegration } from "../../contracts/WisdomIntegration";

describe("WisdomReflectionEngine", () => {
  const engine = new WisdomReflectionEngine();

  const integration: WisdomIntegration = {
    id: "w1",
    polarityA: "Growth",
    polarityB: "Stability",
    integration: "Sustainable Growth",
    description: "observed",
    source: "observed_pattern",
    supportingValues: [],
    supportingThemes: [],
    supportingNarrativeEvolutions: [],
    confidence: "medium",
    status: "active",
    createdAt: new Date(),
  };

  it("creates inquiry-based prompt", () => {
    const text = engine.reflect(integration);
    expect(text).toContain("How might");
    expect(text).not.toContain("should");
  });
});