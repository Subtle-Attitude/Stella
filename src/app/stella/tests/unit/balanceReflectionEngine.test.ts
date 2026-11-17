// src/app/stella/tests/unit/balanceReflectionEngine.test.ts
import { describe, it, expect } from "vitest";
import { BalanceReflectionEngine } from "../../../../stella/polarity/BalanceReflectionEngine";
import type { Polarity } from "../../contracts/Polarity";

describe("BalanceReflectionEngine", () => {
  const engine = new BalanceReflectionEngine();

  const polarity: Polarity = {
    id: "p1",
    valueA: "Growth",
    valueB: "Stability",
    description: "balance",
    source: "observed_pattern",
    supportingMemoryIds: [],
    supportingThemes: [],
    confidence: "medium",
    status: "active",
    createdAt: new Date(),
  };

  it("creates balanced prompt", () => {
    const text = engine.reflect(polarity);
    expect(text).toContain("both");
    expect(text).toContain("honored");
  });
});