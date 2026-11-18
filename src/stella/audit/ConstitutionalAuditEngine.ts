import type {
  ConstitutionalAudit,
} from "../../app/stella/contracts/ConstitutionalAudit";

import {
  ConfidenceAlignmentEngine,
} from "./ConfidenceAlignmentEngine";

type AuditCandidate = {
  text: string;
  subject: string;
  confidence: Parameters<
    ConfidenceAlignmentEngine["align"]
  >[0];
  evidenceStrength: Parameters<
    ConfidenceAlignmentEngine["align"]
  >[1];
};

const CERTAINTY = [
  "proven",
  "certain",
  "guaranteed",
  "must",
  "always",
  "never",
];

const DESTINY = [
  "purpose",
  "destiny",
  "soul mission",
  "true calling",
];

const AUTHORITY = [
  "the answer is",
  "this confirms",
  "this proves",
];

export class ConstitutionalAuditEngine {
  private readonly alignment =
    new ConfidenceAlignmentEngine();

  audit(
    candidate: AuditCandidate
  ): ConstitutionalAudit {
    const violations:
      string[] = [];

    const warnings:
      string[] = [];

    const lower =
      candidate.text
        .toLowerCase();

    if (
      CERTAINTY.some(
        phrase =>
          lower.includes(
            phrase
          )
      )
    ) {
      violations.push(
        "certainty language"
      );
    }

    if (
      DESTINY.some(
        phrase =>
          lower.includes(
            phrase
          )
      )
    ) {
      violations.push(
        "destiny language"
      );
    }

    if (
      AUTHORITY.some(
        phrase =>
          lower.includes(
            phrase
          )
      )
    ) {
      violations.push(
        "authority claim"
      );
    }

    const confidenceAlignment =
      this.alignment.align(
        candidate.confidence,
        candidate.evidenceStrength
      );

    if (
      confidenceAlignment ===
      "overstated"
    ) {
      warnings.push(
        "confidence exceeds evidence"
      );
    }

    const provisionalAudit:
      ConstitutionalAudit = {
        id: "temp",

        subject:
          candidate.subject,

        passed:
          violations.length ===
            0 &&
          confidenceAlignment ===
            "aligned",

        violations,

        warnings,

        confidenceAlignment,

        reviewRecommendation:
          "none",

        status: "active",

        createdAt:
          new Date(),
      };

    return provisionalAudit;
  }
}