// src/stella/identity/IdentityNarrativeBuilder.ts
import type { IdentityConstruct } from "../../app/stella/contracts/IdentityConstruct";
import type { IdentityLineage } from "../../app/stella/contracts/IdentityLineage";

export class IdentityNarrativeBuilder {
  build(constructs: IdentityConstruct[], lineages: IdentityLineage[]): string {
    const active = constructs.filter((c) => c.status === "active");
    if (active.length === 0) return "The user has not declared any active identity constructs.";

    const names = active.map((c) => c.name).join(", ");
    const lineageNames = lineages
      .filter((l) => l.status === "active" && l.constructs.some((id) => active.some((c) => c.id === id)))
      .map((l) => l.name)
      .join(", ");

    if (lineageNames) {
      return `The user identifies with the constructs ${names} within the ${lineageNames} lineage.`;
    }
    return `The user identifies with the constructs ${names}.`;
  }
}