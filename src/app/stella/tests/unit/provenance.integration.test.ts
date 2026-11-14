// src/app/stella/tests/unit/provenance.integration.test.ts
import { describe, it, expect } from "vitest";
import { ProvenanceEngine } from "../../../../stella/provenance/ProvenanceEngine";

describe("ProvenanceEngine integration", () => {
  const engine = new ProvenanceEngine();

  it("full transition + append + verify cycle", () => {
    const base = {
      id: "1",
      userId: "u1",
      type: "user_canon" as const,
      provenance: "user_stated" as const,
      content: "I prefer morning runs",
      metadata: {},
      provenanceChain: [] as string[],
      createdAt: new Date(),
      lastModifiedAt: new Date(),
      author: "user" as const,
      isSoftDeleted: false,
    };

    const first = engine.validateTransition(base);
    expect(first.valid).toBe(true);

    const withFirst = engine.appendToChain(base, first.newHash);
    expect(engine.verifyChainIntegrity(withFirst)).toBe(true);

    const second = engine.validateTransition(withFirst, first.newHash);
    expect(second.valid).toBe(true);

    const final = engine.appendToChain(withFirst, second.newHash);
    expect(engine.verifyChainIntegrity(final)).toBe(true);
    expect(final.provenanceChain).toHaveLength(2);
  });
});