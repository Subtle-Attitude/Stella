// src/app/stella/tests/unit/reflectiveQuestionEngine.test.ts
import { describe, it, expect } from "vitest";
import { ReflectiveQuestionEngine } from "../../../../stella/presence/ReflectiveQuestionEngine";

describe("ReflectiveQuestionEngine", () => {
  it("can be instantiated", () => {
    expect(new ReflectiveQuestionEngine()).toBeInstanceOf(ReflectiveQuestionEngine);
  });
});