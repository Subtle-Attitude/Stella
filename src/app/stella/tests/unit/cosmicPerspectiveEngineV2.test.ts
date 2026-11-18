// src/app/stella/tests/unit/cosmicPerspectiveEngineV2.test.ts
import { describe, it, expect } from "vitest";
import { CosmicPerspectiveEngineV2 } from "../../../../stella/presence/CosmicPerspectiveEngineV2";

describe("CosmicPerspectiveEngineV2", () => {
  const engine = new CosmicPerspectiveEngineV2();

  it("allows broader perspective", () => {
    const result = engine.apply("A pattern emerges.");
    expect(result).toContain("broader perspective");
  });

  it("rejects destiny language", () => {
    const result = engine.apply("Your destiny is clear.");
    expect(result).not.toContain("broader perspective");
  });
});