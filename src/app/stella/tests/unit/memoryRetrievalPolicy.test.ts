// src/app/stella/tests/unit/memoryRetrievalPolicy.test.ts
import { describe, it, expect } from "vitest";
import { AuthorityAwareMemoryRetrievalPolicy } from "../../../../stella/memory/AuthorityAwareMemoryRetrievalPolicy";
import type { MemoryRecord } from "../../contracts/MemoryRecord";

describe("AuthorityAwareMemoryRetrievalPolicy", () => {
  const policy = new AuthorityAwareMemoryRetrievalPolicy();

  const base = (overrides: Partial<MemoryRecord> = {}): MemoryRecord => ({
    id: "1",
    userId: "u1",
    type: "episodic",
    provenance: "ai_interpretation",
    content: "",
    metadata: {},
    provenanceChain: [],
    createdAt: new Date(),
    lastModifiedAt: new Date(),
    author: "stella",
    isSoftDeleted: false,
    ...overrides,
  });

  it("rejects soft-deleted", () => {
    expect(policy.isEligibleForReasoning(base({ isSoftDeleted: true }))).toBe(false);
  });

  it("rejects challenged", () => {
    expect(policy.isEligibleForReasoning(base({ metadata: { challenged: true } }))).toBe(false);
  });

  it("allows active non-challenged", () => {
    expect(policy.isEligibleForReasoning(base())).toBe(true);
  });
});