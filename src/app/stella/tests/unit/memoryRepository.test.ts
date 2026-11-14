// src/app/stella/tests/unit/memoryRepository.test.ts
import { describe, it, expect } from "vitest";
import { MemoryRepository } from "../../../../stella/repositories/MemoryRepository";

describe("MemoryRepository", () => {
  const repo = new MemoryRepository();
  const create = (repo as unknown as {
    create(input: {
      userId: string;
      type: string;
      provenance: string;
      content: string;
      metadata: Record<string, unknown>;
      author: string;
    }): Promise<any>;
  }).create.bind(repo);
  const softDelete = (repo as unknown as {
    softDelete(record: unknown): Promise<unknown>;
  }).softDelete.bind(repo);

  it("creates a user_stated memory with provenance and audit", async () => {
    const record = await create({
      userId: "u1",
      type: "episodic",
      provenance: "user_stated",
      content: "I like coffee",
      metadata: {},
      author: "user",
    });

    expect(record.id).toBeDefined();
    expect(record.provenanceChain).toHaveLength(1);
    expect(record.isSoftDeleted).toBe(false);
  });

  it("rejects ai_interpretation into user_canon", async () => {
    await expect(
      create({
        userId: "u1",
        type: "user_canon",
        provenance: "ai_interpretation",
        content: "test",
        metadata: {},
        author: "stella",
      })
    ).rejects.toThrow(/Provenance rejected/);
  });

  it("blocks soft-delete treated as complete via governance", async () => {
    const record = await create({
      userId: "u1",
      type: "episodic",
      provenance: "user_stated",
      content: "x",
      metadata: {},
      author: "user",
    });

    await expect(softDelete(record)).rejects.toThrow(/Governance blocked/);
  });
});