// src/app/stella/tests/unit/memoryRetrievalStrategy.test.ts
import { describe, it, expect } from "vitest";
import { MemoryRetrievalStrategy } from "../../../../stella/memory/MemoryRetrievalStrategy";
import type { MemoryRecord } from "../../contracts/MemoryRecord";

describe("MemoryRetrievalStrategy", () => {
  const strategy = new MemoryRetrievalStrategy();

  const base = (overrides: Partial<MemoryRecord> = {}): MemoryRecord => ({
    id: crypto.randomUUID(),
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

  it("returns only topical, eligible, ranked memories", () => {
    const records = [
      base({ content: "journaling practice", type: "semantic", provenance: "user_stated", author: "user" }),
      base({ content: "journaling habit", type: "episodic", provenance: "ai_interpretation" }),
      base({ content: "coffee", type: "semantic", provenance: "user_stated", author: "user" }),
      base({ content: "journaling", metadata: { challenged: true } }),
    ];

    const result = strategy.retrieve(records, "tell me about journaling");
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((r) => r.content.toString().includes("journaling"))).toBe(true);
    expect(result[0].provenance).toBe("user_stated");
  });
});