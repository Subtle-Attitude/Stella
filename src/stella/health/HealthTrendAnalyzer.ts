// src/stella/health/HealthTrendAnalyzer.ts
import type { ProjectHealthProfile } from "../../app/stella/contracts/ProjectHealthProfile";

const ORDER: ProjectHealthProfile["status"][] = [
  "at_risk",
  "stalled",
  "emerging",
  "healthy",
];

export class HealthTrendAnalyzer {
  compare(
    previous: ProjectHealthProfile,
    current: ProjectHealthProfile
  ): "improving" | "stable" | "declining" {
    const prevIndex = ORDER.indexOf(previous.status);
    const currIndex = ORDER.indexOf(current.status);

    if (currIndex > prevIndex) return "improving";
    if (currIndex < prevIndex) return "declining";
    return "stable";
  }
}