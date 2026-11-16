// src/app/stella/tests/unit/progressSummaryEngine.test.ts
import { describe, it, expect } from "vitest";
import { ProgressSummaryEngine } from "../../../../stella/execution/ProgressSummaryEngine";
import type { ActionProfile } from "../../contracts/ActionProfile";

describe("ProgressSummaryEngine", () => {
  const engine = new ProgressSummaryEngine();

  const base = (status: ActionProfile["status"]): ActionProfile => ({
    action: "test",
    project: "Atlas",
    goal: "Launch",
    createdAt: new Date(),
    status,
  });

  it("counts all statuses", () => {
    const actions = [
      base("pending"),
      base("in_progress"),
      base("completed"),
      base("completed"),
      base("blocked"),
    ];
    const summary = engine.summarize(actions);
    expect(summary).toEqual({
      total: 5,
      pending: 1,
      inProgress: 1,
      completed: 2,
      blocked: 1,
    });
  });
});