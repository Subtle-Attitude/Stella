// src/stella/goals/GoalExtractor.ts
import type { MemoryRecord } from "../../app/stella/contracts/MemoryRecord";

export class GoalExtractor {
  extract(record: MemoryRecord): string[] {
    const text = typeof record.content === "string" ? record.content.toLowerCase() : "";
    const goals: string[] = [];

    if (text.includes("launch atlas") || text.includes("atlas launch")) {
      goals.push("launch atlas");
    }
    if (text.includes("build stella") || text.includes("stella os")) {
      goals.push("build stella");
    }
    if (text.includes("grow community")) {
      goals.push("grow community");
    }

    // Sprint 15: Replace with semantic goal inference.
    return [...new Set(goals)];
  }
}