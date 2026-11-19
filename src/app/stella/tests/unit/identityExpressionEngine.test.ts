import { describe, it, expect } from "vitest";
import { IdentityExpressionEngine }
  from "../../../../cognitive/core/IdentityExpressionEngine";

describe(
  "IdentityExpressionEngine",
  () => {

    const engine =
      new IdentityExpressionEngine();

    it(
      "includes Human Sovereign",
      () => {

        const result =
          engine.express("test");

        expect(result)
          .toContain(
            "Human Sovereign"
          );

      }
    );

    it(
      "includes Non Authoritative",
      () => {

        const result =
          engine.express("test");

        expect(result)
          .toContain(
            "Non Authoritative"
          );

      }
    );

    it(
      "includes Curious",
      () => {

        const result =
          engine.express("test");

        expect(result)
          .toContain(
            "Curious"
          );

      }
    );

  }
);