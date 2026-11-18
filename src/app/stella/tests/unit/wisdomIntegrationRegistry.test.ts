import {
  describe,
  expect,
  it,
} from "vitest";

import {
  WisdomIntegrationRegistry,
} from "../../../../stella/wisdom/WisdomIntegrationRegistry";

describe(
  "WisdomIntegrationRegistry",
  () => {
    const registry =
      new WisdomIntegrationRegistry();

    it(
      "creates integration",
      () => {
        const result =
          registry.create(
            "Growth",
            "Stability",
            "Sustainable Growth",
            "desc",
            "observed_pattern"
          );

        expect(
          result.integration
        ).toBe(
          "Sustainable Growth"
        );
      }
    );

    it(
      "finds integration",
      () => {
        expect(
          registry.findByIntegration(
            "sustainable growth"
          )
        ).toBeDefined();
      }
    );

    it(
      "archives integration",
      () => {
        const item =
          registry.create(
            "Belonging",
            "Autonomy",
            "Interdependent Independence",
            "desc",
            "observed_pattern"
          );

        registry.archive(
          item.id
        );

        expect(
          item.status
        ).toBe(
          "archived"
        );
      }
    );

    it(
      "lists integrations",
      () => {
        expect(
          registry
            .getAll()
            .length
        ).toBeGreaterThan(
          0
        );
      }
    );
  }
);