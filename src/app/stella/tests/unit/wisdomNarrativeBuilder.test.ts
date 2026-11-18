// src/app/stella/tests/unit/wisdomNarrativeBuilder.test.ts
import { describe, it, expect } from "vitest";
import { WisdomNarrativeBuilder } from "../../../../stella/wisdom/WisdomNarrativeBuilder";
import type { WisdomIntegration } from "../../contracts/WisdomIntegration";

describe("WisdomNarrativeBuilder", () => {
  const builder = new WisdomNarrativeBuilder();

  const integration: WisdomIntegration = {
    id: "w1",
    polarityA: "Growth",
    polarityB: "Stability",
    integration: "Sustainable Growth",
    description: "observed",
    source: "observed_pattern",
    supportingValues: ["Growth", "Stability"],
    supportingThemes: ["Stewardship"],
    supportingNarrativeEvolutions: [],
    confidence: "medium",
    status: "active",
    createdAt: new Date(),
  };

  it("uses constitutional language", () => {
    const text = builder.build(integration);
    expect(text).toContain("possible integration");
    expect(text).toContain("may be interpreted as");
    expect(text).not.toContain("the answer is");
    expect(text).not.toContain("you should");
  });
});