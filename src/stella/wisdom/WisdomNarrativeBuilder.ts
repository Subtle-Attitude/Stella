// src/stella/wisdom/WisdomNarrativeBuilder.ts
import type { WisdomIntegration } from "../../app/stella/contracts/WisdomIntegration";

export class WisdomNarrativeBuilder {
  build(integration: WisdomIntegration): string {
    const supports = [...integration.supportingValues, ...integration.supportingThemes].join(", ");
    return `A possible integration may be interpreted as ${integration.integration}. This integration appears alongside ${supports || "multiple contexts"}.`;
  }
}