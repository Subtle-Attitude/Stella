// src/app/stella/tests/unit/themeExtractor.test.ts
import { describe, it, expect } from "vitest";
import { ThemeExtractor } from "../../../../stella/reflection/ThemeExtractor";
import type { MemoryRecord } from "../../contracts/MemoryRecord";

describe("ThemeExtractor", () => {
  const extractor = new ThemeExtractor();

  const base = (content: string): MemoryRecord => ({
    id: crypto.randomUUID(),
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

  it("groups journaling and reflection memories", () => {
    const themes = extractor.extractThemes([
      base("journaling practice"),
      base("reflection ritual"),
      base("creative writing"),
    ]);
    expect(themes).toContain("creative self-reflection");
  });

  it("returns empty for empty input", () => {
    expect(extractor.extractThemes([])).toEqual([]);
  });

  it("deduplicates themes", () => {
    const themes = extractor.extractThemes([
      base("journaling"),
      base("journaling again"),
    ]);
    expect(themes).toEqual(["creative self-reflection"]);
  });
});