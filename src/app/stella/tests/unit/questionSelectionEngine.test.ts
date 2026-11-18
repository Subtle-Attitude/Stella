// src/app/stella/tests/unit/questionSelectionEngine.test.ts

import { describe, it, expect } from "vitest";
import { QuestionSelectionEngine } from "../../../../stella/attunement/QuestionSelectionEngine";

describe("QuestionSelectionEngine", () => {
  const engine = new QuestionSelectionEngine();

  it("returns planning question", () => {
    expect(
      engine.select("planning")
    ).toContain("highest-priority");
  });

  it("returns reflection question", () => {
    expect(
      engine.select("reflection")
    ).toContain("most significant");
  });

  it("returns troubleshooting question", () => {
    expect(
      engine.select("problem_solving")
    ).toContain("changed");
  });

  it("returns creative exploration question", () => {
    expect(
      engine.select("creative_exploration")
    ).toContain("possibility");
  });
});