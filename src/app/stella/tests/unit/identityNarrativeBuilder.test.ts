// src/app/stella/tests/unit/identityNarrativeBuilder.test.ts
import { describe, it, expect } from "vitest";
import { IdentityNarrativeBuilder } from "../../../../stella/identity/IdentityNarrativeBuilder";
import type { IdentityConstruct } from "../../contracts/IdentityConstruct";
import type { IdentityLineage } from "../../contracts/IdentityLineage";

describe("IdentityNarrativeBuilder", () => {
  const builder = new IdentityNarrativeBuilder();

  const construct = (name: string, id = "c1"): IdentityConstruct => ({
    id,
    name,
    description: "desc",
    declaredBy: "user",
    status: "active",
    supportingMemoryIds: [],
    createdAt: new Date(),
  });

  const lineage = (name: string, constructs: string[]): IdentityLineage => ({
    id: "l1",
    name,
    description: "desc",
    constructs,
    createdBy: "user",
    status: "active",
  });

  it("builds declarative summary", () => {
    const text = builder.build([construct("Sun Dancer")], [lineage("Belonging", ["c1"])]);
    expect(text).toContain("identifies with");
    expect(text).toContain("Sun Dancer");
    expect(text).not.toContain("is a");
  });

  it("handles no constructs", () => {
    expect(builder.build([], [])).toContain("has not declared");
  });
});