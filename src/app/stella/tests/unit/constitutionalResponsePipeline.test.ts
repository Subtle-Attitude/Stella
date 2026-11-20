import {
  describe,
  expect,
  it,
} from "vitest";

import {
  ConstitutionalResponsePipeline,
} from "../../../../cognitive/core/ConstitutionalResponsePipeline";

describe(
  "ConstitutionalResponsePipeline",
  () => {

    const pipeline =
      new ConstitutionalResponsePipeline();

    it(
      "executes identity",
      () => {

        const result =
          pipeline.process(
            "base",
            "test"
          );

        expect(result)
          .toContain(
            "Human Sovereign"
          );

      }
    );

    it(
      "executes meaning",
      () => {

        const result =
          pipeline.process(
            "base",
            "How might exploration evolve toward stewardship?"
          );

        expect(result)
          .toContain(
            "possible narrative evolution"
          );

      }
    );

    it(
      "executes wisdom",
      () => {

        const result =
          pipeline.process(
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
      "executes presence",
      () => {

        const result =
          pipeline.process(
            "base",
            "test"
          );

        expect(result)
          .toContain(
            "Stepping back for a moment"
          );

      }
    );

    it(
      "keeps attunement active",
      () => {

        const result =
          pipeline.process(
            "base",
            "I keep running into the same issue."
          );

        expect(result)
          .toMatch(
            /\?$/m
          );

      }
    );

    it(
      "orchestrates identity meaning wisdom and presence together",
      () => {

        const result =
          pipeline.process(
            "base",
            "How might exploration and stewardship evolve?"
          );

        expect(result)
          .toContain(
            "Human Sovereign"
          );

        expect(result)
          .toContain(
            "possible narrative evolution"
          );

        expect(result)
          .toContain(
            "Responsible Discovery"
          );

        expect(result)
          .toContain(
            "Stepping back for a moment"
          );

      }
    );

  }
);