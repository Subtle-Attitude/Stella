// src/app/stella/tests/unit/explanationTraceRegistry.test.ts
import { describe, it, expect } from "vitest";
import { ExplanationTraceRegistry } from "../../../../stella/explainability/ExplanationTraceRegistry";

describe("ExplanationTraceRegistry", () => {
  const registry = new ExplanationTraceRegistry();

  it("creates and retrieves", () => {
    registry.create("Sustainable Growth", [], "medium", "appears supported");
    expect(registry.findBySubject("Sustainable Growth")).toBeDefined();
  });

  it("lists all", () => {
    expect(registry.getAll().length).toBeGreaterThan(0);
  });
});