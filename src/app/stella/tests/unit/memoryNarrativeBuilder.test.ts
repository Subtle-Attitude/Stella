// src/app/stella/tests/unit/memoryNarrativeBuilder.test.ts
import { describe, it, expect } from "vitest";
import { MemoryNarrativeBuilder } from "../../../../stella/reflection/MemoryNarrativeBuilder";
import type { ReflectionContext } from "../../contracts/ReflectionContext";

describe("MemoryNarrativeBuilder", () => {
  const builder = new MemoryNarrativeBuilder();

  it("builds narrative from a single theme", () => {
    const context: ReflectionContext = {
      themes: ["creative self-reflection"],
      supportingMemoryIds: ["m1"],
    };
    expect(builder.build(context)).toBe(
      "A recurring theme across recent memories is creative self-reflection."
    );
  });

  it("builds narrative from multiple themes", () => {
    const context: ReflectionContext = {
      themes: ["creative self-reflection", "daily practice"],
      supportingMemoryIds: ["m1"],
    };
    expect(builder.build(context)).toContain("Recurring themes");
  });

  it("returns fallback text when no themes exist", () => {
    const context: ReflectionContext = {
      themes: [],
      supportingMemoryIds: [],
    };
    expect(builder.build(context)).toBe("No recurring themes were identified.");
  });
});