// src/stella/meta/WisdomConfidenceMapper.ts
import type { WisdomIntegration } from "../../app/stella/contracts/WisdomIntegration";
import type { ConfidenceAssessment } from "../../app/stella/contracts/ConfidenceAssessment";

export class WisdomConfidenceMapper {
  map(integrations: WisdomIntegration[], assessments: ConfidenceAssessment[]): { integration: string; confidence: string }[] {
    return integrations.map((i) => {
      const assessment = assessments.find((a) => a.subject === i.integration);
      return {
        integration: i.integration,
        confidence: assessment?.confidence ?? "low",
      };
    });
  }
}