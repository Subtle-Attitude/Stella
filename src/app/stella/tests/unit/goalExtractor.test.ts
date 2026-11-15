// src/app/stella/tests/unit/goalExtractor.test.ts
import { describe, it, expect } from "vitest";
import { GoalExtractor } from "../../../../stella/goals/GoalExtractor";
import type { MemoryRecord } from "../../contracts/MemoryRecord";

describe("GoalExtractor", () => {
  const extractor = new GoalExtractor();

  const base = (content: string): MemoryRecord => ({
    id: "1",
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

  it("extracts launch atlas", () => {
    expect(extractor.extract(base("launch atlas this quarter"))).toContain("launch atlas");
  });

  it("extracts build stella", () => {
    expect(extractor.extract(base("build stella os"))).toContain("build stella");
  });

  it("returns empty on unrelated memory", () => {
    expect(extractor.extract(base("coffee preference"))).toEqual([]);
  });
});