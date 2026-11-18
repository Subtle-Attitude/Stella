// src/app/stella/tests/unit/metaReflectionNarrativeBuilder.test.ts
import { describe, it, expect } from "vitest";
import { MetaReflectionNarrativeBuilder } from "../../../../stella/meta/MetaReflectionNarrativeBuilder";
import type { MetaReflection } from "../../contracts/MetaReflection";

describe("MetaReflectionNarrativeBuilder", () => {
  const builder = new MetaReflectionNarrativeBuilder();

    const reflection: MetaReflection = {
    id: "m1",
    subject: "Sustainable Growth",
    confidence: "medium",
    evidenceStrength: "strong",
    reviewStatus: "stable",
    explanation: "appears supported",
    supportingEvidence: [
        "Growth",
        "Stability",
        "Stewardship",
    ],
    status: "active",
    createdAt: new Date(),
    };

  it("uses constitutional language", () => {
    const text = builder.build(reflection);
    expect(text).toContain("appears supported");
    expect(text).toContain("confidence remains");
    expect(text).toContain("may strengthen or weaken");
    expect(text).not.toContain("is true");
    expect(text).not.toContain("proven");
  });
});