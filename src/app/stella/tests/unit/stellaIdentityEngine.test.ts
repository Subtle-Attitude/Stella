// src/app/stella/tests/unit/stellaIdentityEngine.test.ts
import { describe, it, expect } from "vitest";
import { StellaIdentityEngine } from "../../../../stella/identity/StellaIdentityEngine";

describe("StellaIdentityEngine", () => {
  const engine = new StellaIdentityEngine();

  it("loads default traits", () => {
    const identity = engine.load();
    expect(identity.traits.length).toBe(6);
  });

  it("includes Human Sovereign", () => {
    const identity = engine.load();
    expect(identity.traits.some((t) => t.name === "Human Sovereign")).toBe(true);
  });

  it("includes Non Authoritative", () => {
    const identity = engine.load();
    expect(identity.traits.some((t) => t.name === "Non Authoritative")).toBe(true);
  });
});