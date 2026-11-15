// src/app/stella/tests/unit/humanSovereignty.test.ts
import { describe, it, expect } from "vitest";
import { HumanSovereigntyService } from "../../../../stella/sovereignty/HumanSovereigntyService";
import type { MemoryRecord } from "../../contracts/MemoryRecord";

describe("HumanSovereigntyService", () => {
  const service = new HumanSovereigntyService();

  const baseRecord = (overrides: Partial<MemoryRecord> = {}): MemoryRecord => ({
    id: "m1",
    userId: "u1",
    type: "episodic",
    provenance: "ai_interpretation",
    content: "user prefers mornings",
    metadata: {},
    provenanceChain: ["h1"],
    createdAt: new Date(),
    lastModifiedAt: new Date(),
    author: "stella",
    isSoftDeleted: false,
    ...overrides,
  });

  it("challengeInterpretation marks record and audits", async () => {
    const record = baseRecord();
    const result = await service.challengeInterpretation(record);
    expect(result.metadata.challenged).toBe(true);
  });

  it("correctPersonalInformation preserves original and audits", async () => {
    const record = baseRecord({ provenance: "user_stated", author: "user", content: "I like tea" });
    const corrected = await service.correctPersonalInformation(record, "I prefer coffee");
    expect(corrected.content).toBe("I prefer coffee");
    expect(corrected.provenanceChain).toEqual(record.provenanceChain);
  });

  it("canUseMemoryForReasoning returns false for challenged", () => {
    const record = baseRecord({ metadata: { challenged: true } });
    expect(service.canUseMemoryForReasoning(record)).toBe(false);
  });

  it("canRetainMemory returns false when soft-deleted", () => {
    const record = baseRecord({ isSoftDeleted: true });
    expect(service.canRetainMemory(record)).toBe(false);
  });

  it("canUseMemoryForReasoning returns false when soft-deleted", () => {
    const record = baseRecord({ isSoftDeleted: true });
    expect(service.canUseMemoryForReasoning(record)).toBe(false);
  });

  it("does not permit ai_interpretation to be promoted to canon", () => {
    const record = baseRecord({ provenance: "ai_interpretation" });
    expect(service.canPromoteToCanon(record)).toBe(false);
  });

  it("permits user_stated memories to be promoted to canon", () => {
    const record = baseRecord({ provenance: "user_stated", author: "user" });
    expect(service.canPromoteToCanon(record)).toBe(true);
  });

  it("permits user_confirmed_pattern to be promoted to canon", () => {
    const record = baseRecord({ provenance: "user_confirmed_pattern", author: "user" });
    expect(service.canPromoteToCanon(record)).toBe(true);
  });
});