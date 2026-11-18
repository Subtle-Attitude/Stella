// src/stella/explainability/ConstitutionalTraceMapper.ts
import type { WisdomIntegration } from "../../app/stella/contracts/WisdomIntegration";
import type { ExplanationTrace } from "../../app/stella/contracts/ExplanationTrace";

export class ConstitutionalTraceMapper {
  map(integrations: WisdomIntegration[], traces: ExplanationTrace[]): { subject: string; hasTrace: boolean }[] {
    return integrations.map((i) => ({
      subject: i.integration,
      hasTrace: traces.some((t) => t.subject === i.integration),
    }));
  }
}