// src/app/stella/tests/unit/wisdomExpressionEngine.test.ts

import {
  describe,
  expect,
  it,
} from "vitest";

import {
  WisdomExpressionEngine,
} from "../../../../cognitive/core/WisdomExpressionEngine";

describe(
  "WisdomExpressionEngine",
  () => {

    const engine =
      new WisdomExpressionEngine();

    it(
      "generates Sustainable Growth wisdom",
      () => {

        const result =
          engine.express(
            "base",
            "I am trying to balance growth and stability."
          );

        expect(result)
          .toContain(
            "Sustainable Growth"
          );

      }
    );

    it(
      "generates Responsible Discovery wisdom",
      () => {

        const result =
          engine.express(
            "base",
            "How can exploration and stewardship coexist?"
          );

        expect(result)
          .toContain(
            "Responsible Discovery"
          );

      }
    );

    it(
      "generates Interdependent Independence wisdom",
      () => {

        const result =
          engine.express(
            "base",
            "I want belonging without losing autonomy."
          );

        expect(result)
          .toContain(
            "Interdependent Independence"
          );

      }
    );

    it(
      "adds a reflective wisdom question",
      () => {

        const result =
          engine.express(
            "base",
            "I am balancing growth and stability."
          );

        expect(result)
          .toMatch(/\?$/m);

      }
    );

    it(
      "returns original response when no wisdom integration exists",
      () => {

        const result =
          engine.express(
            "base",
            "hello world"
          );

        expect(result)
          .toBe(
            "base"
          );

      }
    );

    it(
      "avoids forbidden wisdom language",
      () => {

        const result =
          engine.express(
            "base",
            "growth and stability"
          );

        const lower =
          result.toLowerCase();

        expect(lower)
          .not.toContain(
            "ultimate truth"
          );

        expect(lower)
          .not.toContain(
            "perfect balance"
          );

        expect(lower)
          .not.toContain(
            "final purpose"
          );

        expect(lower)
          .not.toContain(
            "one correct path"
          );

      }
    );

  }
);