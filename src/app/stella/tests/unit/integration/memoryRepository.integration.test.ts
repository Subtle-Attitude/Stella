import { describe, it, expect } from "vitest";
import { MemoryRepository } from "../../../../../stella/repositories/MemoryRepository";

describe("MemoryRepository integration", () => {
  const repo = new MemoryRepository();

  it("create update hard-delete preserves audit and provenance", async () => {
    const created = await repo.create({
      userId: "u1",
      type: "episodic",
      provenance: "user_stated",
      content: "morning run",
      metadata: {},
      author: "user",
    });

    const updated = await repo.update(created, {
      content: "morning run preferred",
    });

    expect(updated.provenanceChain.length).toBeGreaterThan(
      created.provenanceChain.length
    );

    await repo.hardDelete(updated);

    expect(updated.provenanceChain.length).toBeGreaterThan(0);
  });
});