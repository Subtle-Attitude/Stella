// src/app/stella/tests/unit/identityAlignmentEngine.test.ts
import { describe, it, expect } from "vitest";
import { IdentityAlignmentEngine } from "../../../../stella/identity/IdentityAlignmentEngine";

describe("IdentityAlignmentEngine", () => {
  const engine = new IdentityAlignmentEngine();

  it("flags authority claims", () => {
    const result = engine.align("This proves your destiny.");
    const nonAuth = result.find((r) => r.trait === "Non Authoritative");
    expect(nonAuth?.aligned).toBe(false);
  });

  it("accepts evidence aligned wording", () => {
    const result = engine.align("This pattern appears supported by recurring observations.");
    const evidence = result.find((r) => r.trait === "Evidence Aligned");
    expect(evidence?.aligned).toBe(true);
  });
});