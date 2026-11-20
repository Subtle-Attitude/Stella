import {
  describe,
  expect,
  it
} from "vitest";

import {
  MeaningExpressionEngine
} from "../../../../cognitive/core/MeaningExpressionEngine";

describe(
  "MeaningExpressionEngine",
  () => {

    const engine =
      new MeaningExpressionEngine();

    it(
      "generates narrative evolution",
      () => {

        const result =
          engine.express(
            "base",
            "exploration and stewardship"
          );

        expect(result)
          .toContain(
            "possible narrative evolution"
          );

      }
    );

    it(
      "returns original response when no evolution exists",
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
      "avoids destiny language",
      () => {

        const result =
          engine.express(
            "base",
            "exploration and stewardship"
          );

        expect(
          result.toLowerCase()
        ).not.toContain(
          "destiny"
        );

        expect(
          result.toLowerCase()
        ).not.toContain(
          "purpose"
        );

      }
    );

  }
);