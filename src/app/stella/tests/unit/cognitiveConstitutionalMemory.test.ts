// src/app/stella/tests/unit/cognitiveConstitutionalMemory.test.ts
import { describe, it, expect } from "vitest";
import { ConstitutionalMemoryCoordinator } from "../../../../cognitive/integration/ConstitutionalMemoryCoordinator";

describe("cognitive constitutional memory flow", () => {
  const coordinator = new ConstitutionalMemoryCoordinator();

  it("store → retrieve → challenge → retrieve excludes challenged", async () => {
    const stored = await coordinator.record({
      userId: "u1",
      type: "episodic",
      provenance: "ai_interpretation",
      content: "user prefers mornings",
      metadata: {},
      author: "stella",
    });

    const first = await coordinator.retrieve("s1");
    expect(Array.isArray(first)).toBe(true);
    expect(first.some((r) => r.id === stored.id)).toBe(true);

    const challenged = await coordinator.challenge(stored);
    expect(challenged.metadata.challenged).toBe(true);

    const second = await coordinator.retrieve("s1");
    expect(second.some((r) => r.id === stored.id)).toBe(false);
  });
});