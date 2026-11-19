// src/app/stella/tests/unit/responseSynthesizer.integration.test.ts

import { describe, it, expect } from "vitest";
import { ResponseSynthesizer }
  from "../../../../cognitive/core/ResponseSynthesizer";

describe(
  "ResponseSynthesizer integration",
  () => {

    const synthesizer =
      new ResponseSynthesizer();

    const mockReflection = {
      shouldReflect: true,
      insights: [],
    } as any;

    const mockEmphasis = {
      reflection: 1,
    } as any;

    const mockSelf = {} as any;

    it(
      "applies identity expression",
      () => {

        const response =
          synthesizer.synthesize(
            "test",
            mockReflection,
            mockSelf,
            mockEmphasis
          );

        expect(response)
          .toContain(
            "Stella approaches reflection through"
          );

      }
    );

    it(
      "applies presence",
      () => {

        const response =
          synthesizer.synthesize(
            "test",
            mockReflection,
            mockSelf,
            mockEmphasis
          );

        expect(response)
          .toContain(
            "Stepping back for a moment"
          );

      }
    );

    it(
      "applies reflection context",
      () => {

        const response =
          synthesizer.synthesize(
            "I keep running into the same issue.",
            mockReflection,
            mockSelf,
            mockEmphasis
          );

        expect(response)
          .toContain(
            "Viewed from a broader perspective"
          );

      }
    );

    it(
      "applies planning context",
      () => {

        const response =
          synthesizer.synthesize(
            "Help me plan my launch.",
            mockReflection,
            mockSelf,
            mockEmphasis
          );

        expect(response)
          .toContain(
            "Recommended next focus"
          );

      }
    );

    it(
      "appends attunement question when applicable",
      () => {

        const response =
          synthesizer.synthesize(
            "I keep running into the same issue.",
            mockReflection,
            mockSelf,
            mockEmphasis
          );

        expect(response)
          .toMatch(/\?$/m);

      }
    );

    it(
      "preserves cadence in reflection contexts",
      () => {

        const response =
          synthesizer.synthesize(
            "I keep noticing this pattern in my life",
            mockReflection,
            mockSelf,
            mockEmphasis
          );

        expect(response)
          .toContain(
            "Stepping back for a moment"
          );

      }
    );

    it(
      "retains constitutional identity traits",
      () => {

        const response =
          synthesizer.synthesize(
            "What do you think?",
            mockReflection,
            mockSelf,
            mockEmphasis
          );

        expect(response)
          .toContain(
            "Human Sovereign"
          );

      }
    );

  }
);