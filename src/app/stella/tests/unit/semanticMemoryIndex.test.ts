// src/app/stella/tests/unit/semanticMemoryIndex.test.ts
import { describe, it, expect } from "vitest";
import { SemanticMemoryIndex } from "../../../../stella/memory/SemanticMemoryIndex";
import type { MemoryRecord } from "../../contracts/MemoryRecord";

describe("SemanticMemoryIndex", () => {
  const index = new SemanticMemoryIndex();

  const base = (id: string, content: string): MemoryRecord => ({
    id,
    userId: "u1",
    type: "episodic",
    provenance: "user_stated",
    content,
    metadata: {},
    provenanceChain: [],
    createdAt: new Date(),
    lastModifiedAt: new Date(),
    author: "user",
    isSoftDeleted: false,
  });

  it("indexes and queries by topic", () => {
    index.add(base("1", "morning journaling practice"));
    index.add(base("2", "coffee preference"));
    const results = index.query(["journaling"]);
    expect(results.map((r) => r.id)).toEqual(["1"]);
  });
});