// src/app/stella/tests/unit/cognitiveAuthorityRetrieval.test.ts
import { describe, it, expect } from "vitest";
import { ConstitutionalMemoryCoordinator } from "../../../../cognitive/integration/ConstitutionalMemoryCoordinator";
import type { MemoryRecord } from "../../contracts/MemoryRecord";

describe("cognitive authority retrieval", () => {
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

  it("returns memories in authority order and excludes challenged", async () => {
    const coordinator = new ConstitutionalMemoryCoordinator();
    const userStated = base({ type: "semantic", provenance: "user_stated", author: "user" });
    const observed = base({ type: "semantic", provenance: "observed_pattern" });
    const interpretation = base({ type: "episodic", provenance: "ai_interpretation" });
    const challenged = base({ metadata: { challenged: true } });

    coordinator["memoryBuffer"].push(interpretation, challenged, observed, userStated);

    const result = await coordinator.retrieve("s1");

    expect(result.map((r) => r.id)).toEqual([
      userStated.id,
      observed.id,
      interpretation.id,
    ]);
    expect(result.some((r) => r.id === challenged.id)).toBe(false);
  });
});