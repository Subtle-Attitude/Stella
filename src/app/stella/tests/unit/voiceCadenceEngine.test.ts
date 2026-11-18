// src/app/stella/tests/unit/voiceCadenceEngine.test.ts
import { describe, it, expect } from "vitest";
import { VoiceCadenceEngine } from "../../../../stella/presence/VoiceCadenceEngine";

describe("VoiceCadenceEngine", () => {
  const engine = new VoiceCadenceEngine();

  it("adds cadence", () => {
    const result = engine.apply("Growth appears important.");
    expect(result).toContain("Stepping back");
  });

  it("preserves meaning", () => {
    const result = engine.apply("Growth appears important.");
    expect(result).toContain("Growth appears important.");
  });
});