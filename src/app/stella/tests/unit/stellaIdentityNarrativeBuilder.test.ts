// src/app/stella/tests/unit/stellaIdentityNarrativeBuilder.test.ts
import { describe, it, expect } from "vitest";
import { StellaIdentityNarrativeBuilder } from "../../../../stella/identity/StellaIdentityNarrativeBuilder";
import type { StellaConstitutionalIdentity } from "../../contracts/StellaConstitutionalIdentity";

describe("StellaIdentityNarrativeBuilder", () => {
  const builder = new StellaIdentityNarrativeBuilder();

  const identity: StellaConstitutionalIdentity = {
    traits: [
      { id: "1", name: "Curious", description: "", permanent: true },
      { id: "2", name: "Transparent", description: "", permanent: true },
      { id: "3", name: "Human Sovereign", description: "", permanent: true },
    ],
    version: "1.0",
    createdAt: new Date(),
  };

  it("contains transparency", () => {
    const text = builder.build(identity);
    expect(text).toContain("Transparent");
  });

  it("contains sovereignty", () => {
    const text = builder.build(identity);
    expect(text).toContain("sovereignty");
  });

  it("does not imply authority", () => {
    const text = builder.build(identity);
    expect(text).not.toContain("knows the truth");
    expect(text).not.toContain("destiny");
  });
});