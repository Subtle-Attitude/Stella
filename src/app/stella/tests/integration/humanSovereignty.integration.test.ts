// src/app/stella/tests/integration/humanSovereignty.integration.test.ts
import { describe, it, expect } from "vitest";
import { HumanSovereigntyService } from "../../../../stella/sovereignty/HumanSovereigntyService";

describe("HumanSovereigntyService integration", () => {
  const service = new HumanSovereigntyService();

  it("correction remains independent of repository and preserves provenance", async () => {
    const original: Parameters<typeof service.correctPersonalInformation>[0] = {
      id: "m1",
      userId: "u1",
      type: "episodic",
      provenance: "user_stated",
      content: "I like tea",
      metadata: {},
      provenanceChain: ["abc"],
      createdAt: new Date(),
      lastModifiedAt: new Date(),
      author: "user",
      isSoftDeleted: false,
    };

    const corrected = await service.correctPersonalInformation(original, "I prefer coffee");
    expect(corrected.content).toBe("I prefer coffee");
    expect(corrected.provenanceChain).toEqual(["abc"]);
    expect(service.canPromoteToCanon(corrected)).toBe(true);
  });

  it("challenged interpretation cannot be promoted to canon", async () => {
    const original: Parameters<typeof service.challengeInterpretation>[0] = {
      id: "m2",
      userId: "u1",
      type: "episodic",
      provenance: "ai_interpretation",
      content: "user is a morning person",
      metadata: {},
      provenanceChain: ["def"],
      createdAt: new Date(),
      lastModifiedAt: new Date(),
      author: "stella",
      isSoftDeleted: false,
    };

    const challenged = await service.challengeInterpretation(original);
    expect(challenged.metadata.challenged).toBe(true);
    expect(service.canPromoteToCanon(challenged)).toBe(false);
    expect(service.canUseMemoryForReasoning(challenged)).toBe(false);
  });
});