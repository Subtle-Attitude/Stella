import { randomUUID } from "crypto";

import type {
  ConstitutionalAudit,
} from "../../app/stella/contracts/ConstitutionalAudit";

export class ConstitutionalAuditRegistry {
  private readonly store =
    new Map<string, ConstitutionalAudit>();

  create(
    subject: string,
    passed: boolean,
    violations: string[],
    warnings: string[],
    confidenceAlignment:
      | "aligned"
      | "overstated",
    reviewRecommendation:
      | "none"
      | "review"
  ): ConstitutionalAudit {
    const audit:
      ConstitutionalAudit = {
        id: randomUUID(),

        subject,

        passed,

        violations,

        warnings,

        confidenceAlignment,

        reviewRecommendation,

        status: "active",

        createdAt: new Date(),
      };

    this.store.set(
      audit.id,
      audit
    );

    return audit;
  }

  find(
    id: string
  ):
    | ConstitutionalAudit
    | undefined {
    return this.store.get(id);
  }

  archive(
    id: string
  ):
    | ConstitutionalAudit
    | undefined {
    const audit =
      this.store.get(id);

    if (audit) {
      audit.status =
        "archived";
    }

    return audit;
  }

  getAll():
    ConstitutionalAudit[] {
    return [
      ...this.store.values(),
    ];
  }
}