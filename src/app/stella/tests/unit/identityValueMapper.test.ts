// src/app/stella/tests/unit/identityValueMapper.test.ts
import { describe, it, expect } from "vitest";
import { IdentityValueMapper } from "../../../../stella/values/IdentityValueMapper";
import type { IdentityConstruct } from "../../contracts/IdentityConstruct";
import type { ValuePrinciple } from "../../contracts/ValuePrinciple";

describe("IdentityValueMapper", () => {
  const mapper = new IdentityValueMapper();

  const construct: IdentityConstruct = {
    id: "c1",
    name: "Sun Dancer",
    description: "desc",
    declaredBy: "user",
    status: "active",
    supportingMemoryIds: [],
    createdAt: new Date(),
  };

  const values: ValuePrinciple[] = [
    { id: "v1", name: "Belonging", description: "", source: "user_declared", status: "active", supportingMemoryIds: [], supportingThemes: [], supportingIdentityConstructs: ["c1"], createdAt: new Date() },
    { id: "v2", name: "Growth", description: "", source: "user_declared", status: "active", supportingMemoryIds: [], supportingThemes: [], supportingIdentityConstructs: [], createdAt: new Date() },
  ];

  it("links construct to values", () => {
    const linked = mapper.map(construct, values);
    expect(linked).toContain("Belonging");
    expect(linked).toContain("Growth");
  });

  it("uses constitutional language", () => {
    const text = mapper.describe("Sun Dancer", ["Belonging", "Growth"]);
    expect(text).toContain("identifies with");
    expect(text).not.toContain("is a");
  });
});