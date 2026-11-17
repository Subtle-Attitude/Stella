// src/app/stella/tests/unit/cosmicPerspectiveEngine.test.ts
import { describe, it, expect } from "vitest";
import { CosmicPerspectiveEngine } from "../../../../stella/perspective/CosmicPerspectiveEngine";
import type { ReasoningInsight } from "../../contracts/ReasoningInsight";

describe("CosmicPerspectiveEngine", () => {
  const engine = new CosmicPerspectiveEngine();

  const insight = (text: string): ReasoningInsight => ({
    insight: text,
    supportingThemes: ["t"],
    supportingSituations: ["s"],
    supportingGoals: ["g"],
    supportingProjects: ["p"],
    confidence: "high",
  });

  it("generates growth perspective", () => {
    const result = engine.generate([insight("intentional growth appears")]);
    expect(result.some((p) => p.type === "growth")).toBe(true);
  });

  it("generates belonging perspective", () => {
    const result = engine.generate([insight("a"), insight("b")]);
    expect(result.some((p) => p.type === "belonging")).toBe(true);
  });

  it("generates community perspective", () => {
    const result = engine.generate([insight("relationship goal")]);
    expect(result.some((p) => p.type === "community")).toBe(true);
  });

  it("generates systems perspective", () => {
    const result = engine.generate([insight("a"), insight("b"), insight("c")]);
    expect(result.some((p) => p.type === "systems")).toBe(true);
  });

  it("generates possibility perspective", () => {
    const result = engine.generate([insight("project continues")]);
    expect(result.some((p) => p.type === "possibility")).toBe(true);
  });

  it("generates reflection perspective as fallback", () => {
    const result = engine.generate([insight("unrelated")]);
    expect(result.some((p) => p.type === "reflection")).toBe(true);
  });
});