// src/app/stella/tests/unit/lifeThemeNarrativeBuilder.test.ts
import { describe, it, expect } from "vitest";
import { LifeThemeNarrativeBuilder } from "../../../../stella/lifethemes/LifeThemeNarrativeBuilder";
import type { LifeTheme } from "../../contracts/LifeTheme";

describe("LifeThemeNarrativeBuilder", () => {
  const builder = new LifeThemeNarrativeBuilder();

  const theme: LifeTheme = {
    id: "t1",
    name: "Interconnection",
    description: "desc",
    source: "user_declared",
    supportingValues: ["Belonging", "Growth"],
    supportingIdentityConstructs: ["Sun Dancer"],
    supportingThemes: [],
    supportingMemoryIds: [],
    createdAt: new Date(),
  };

  it("uses constitutional language", () => {
    const text = builder.build(theme);
    expect(text).toContain("may be interpreted as");
    expect(text).toContain("Interconnection");
    expect(text).not.toContain("purpose");
    expect(text).not.toContain("destiny");
    expect(text).not.toContain("purpose");
    expect(text).not.toContain("destiny");
    expect(text).not.toContain("true path");

  });
});