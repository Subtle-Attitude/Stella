import { describe, expect, it } from "vitest";
import { ConstitutionalInvariants } from "../../constitution/invariants";

describe("Constitutional Invariants Enforcement", () => {
  it("should define all required invariants as true", () => {
    const invariants: (keyof typeof ConstitutionalInvariants)[] = [
      "constitutionImmutable",
      "interpretationsCannotBecomeCanon",
      "sovereigntyCannotBeBypassed",
      "provenanceRequired",
      "userCanonRequiresExplicitConfirmation",
      "hardDeleteMustBeComplete",
    ];

    invariants.forEach((invariant) => {
      expect(ConstitutionalInvariants[invariant]).toBe(true);
    });
  });
});