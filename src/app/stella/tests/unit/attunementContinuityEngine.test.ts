// src/app/stella/tests/unit/attunementContinuityEngine.test.ts
import { describe, it, expect } from "vitest";
import { AttunementContinuityEngine } from "../../../../stella/attunement/AttunementContinuityEngine";
import type { AttunementProfile } from "../../contracts/AttunementProfile";

describe("AttunementContinuityEngine", () => {
  const engine = new AttunementContinuityEngine();

  const profile: AttunementProfile = {
    context: "reflection",
    verbosity: "spacious",
    questioning: "reflective",
    cadence: "contemplative",
  };

  it("maintains constitutional identity", () => {
    expect(engine.check(profile)).toBe(true);
  });
});