// src/app/stella/tests/unit/constitutionalMemoryRankingIntegration.test.ts
import { describe, it, expect } from "vitest";
import { ConstitutionalMemoryCoordinator } from "../../../../cognitive/integration/ConstitutionalMemoryCoordinator";
import type { MemoryRecord } from "../../contracts/MemoryRecord";

describe("constitutional memory ranking integration", () => {
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

  it("excludes challenged memories", async () => {
    const coordinator = new ConstitutionalMemoryCoordinator();
    const challenged = await coordinator.challenge(base());
    const result = await coordinator.retrieve("s1");
    expect(result.some((r) => r.id === challenged.id)).toBe(false);
  });

  it("excludes soft-deleted memories", async () => {
    const coordinator = new ConstitutionalMemoryCoordinator();
    const soft = base({ isSoftDeleted: true });
    coordinator["memoryBuffer"].set("s1", [soft]);
    const result = await coordinator.retrieve("s1");
    expect(result.some((r) => r.id === soft.id)).toBe(false);
  });

  it("ranks user_stated semantic above ai_interpretation episodic", async () => {
    const coordinator = new ConstitutionalMemoryCoordinator();
    const high = base({ type: "semantic", provenance: "user_stated", author: "user" });
    const low = base({ type: "episodic", provenance: "ai_interpretation" });
    coordinator["memoryBuffer"].set("s1", [high, low]);
    const result = await coordinator.retrieve("s1");
    expect(result[0].id).toBe(high.id);
  });

  it("ranks user_stated above observed_pattern", async () => {
    const coordinator = new ConstitutionalMemoryCoordinator();
    const auth = base({ type: "semantic", provenance: "user_stated", author: "user" });
    const obs = base({ type: "semantic", provenance: "observed_pattern" });
    coordinator["memoryBuffer"].set("s1", [obs, auth]);
    const result = await coordinator.retrieve("s1");
    expect(result[0].id).toBe(auth.id);
  });
});