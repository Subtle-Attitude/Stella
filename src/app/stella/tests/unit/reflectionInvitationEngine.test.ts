// src/app/stella/tests/unit/reflectionInvitationEngine.test.ts
import { describe, it, expect } from "vitest";
import { ReflectionInvitationEngine } from "../../../../stella/initiative/ReflectionInvitationEngine";

describe("ReflectionInvitationEngine", () => {
  const engine = new ReflectionInvitationEngine();

  it("uses constitutional invitation", () => {
    const result = engine.invite("recurring_pattern");
    expect(result).toContain("Would it be useful");
  });

  it("avoids authority language", () => {
    const result = engine.invite("recurring_pattern");
    expect(result).not.toContain("you must");
  });
});