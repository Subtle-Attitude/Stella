// src/stella/meta/MetaReflectionRegistry.ts

import { randomUUID } from "crypto";

import type {
  MetaReflection,
} from "../../app/stella/contracts/MetaReflection";

export class MetaReflectionRegistry {
  private readonly store =
    new Map<string, MetaReflection>();

  create(
    subject: string,
    confidence:
      | "low"
      | "medium",
    evidenceStrength:
      | "limited"
      | "moderate"
      | "strong",
    reviewStatus:
      | "emerging"
      | "stable",
    explanation: string,
    supportingEvidence: string[] = []
  ): MetaReflection {
    const reflection:
      MetaReflection = {
        id: randomUUID(),

        subject,

        confidence,

        evidenceStrength,

        reviewStatus,

        explanation,

        supportingEvidence,

        status: "active",

        createdAt:
          new Date(),
      };

    this.store.set(
      reflection.id,
      reflection
    );

    return reflection;
  }

  getAll():
    MetaReflection[] {
    return [
      ...this.store.values(),
    ];
  }

  findBySubject(
    subject: string
  ):
    | MetaReflection
    | undefined {
    const search =
      subject.toLowerCase();

    return [
      ...this.store.values(),
    ].find(
      reflection =>
        reflection.subject
          .toLowerCase() ===
        search
    );
  }

  archive(
    id: string
  ):
    | MetaReflection
    | undefined {
    const reflection =
      this.store.get(id);

    if (reflection) {
      reflection.status =
        "archived";
    }

    return reflection;
  }
}