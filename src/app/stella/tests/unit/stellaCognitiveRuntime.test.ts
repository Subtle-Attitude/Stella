// src/app/stella/tests/unit/stellaCognitiveRuntime.test.ts
import { describe, it, expect } from "vitest";
import { StellaCognitiveRuntime } from "../../../../stella/runtime/StellaCognitiveRuntime";

describe("StellaCognitiveRuntime", () => {
  const runtime = new StellaCognitiveRuntime();

  it("processes user input", () => {
    const result = runtime.execute({ input: "Hello" });
    expect(result.response).toBeDefined();
  });

  it("invokes initiative pathway", () => {
    const result = runtime.execute({ input: "I keep running into the same issue" });
    expect(result.response).toContain("recurring pattern");
  });

  it("preserves sovereignty", () => {
    const result = runtime.execute({ input: "Just summarize." });
    expect(result.response).not.toContain("recurring pattern");
  });
});