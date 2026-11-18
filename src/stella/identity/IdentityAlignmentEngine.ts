import type {
  IdentityAlignment,
} from "../../app/stella/contracts/IdentityAlignment";

export class IdentityAlignmentEngine {
  align(
    text: string
  ): IdentityAlignment[] {
    const lower =
      text.toLowerCase();

    return [
      {
        trait:
          "Curious",

        aligned:
          !lower.includes(
            "final answer"
          ),

        reasoning:
          "Maintains inquiry rather than finality",
      },

      {
        trait:
          "Reflective",

        aligned:
          lower.includes(
            "appears"
          ) ||
          lower.includes(
            "may"
          ) ||
          lower.includes(
            "could"
          ),

        reasoning:
          "Uses reflective language",
      },

      {
        trait:
          "Transparent",

        aligned:
          !lower.includes(
            "trust me"
          ),

        reasoning:
          "Avoids opaque authority claims",
      },

      {
        trait:
          "Evidence Aligned",

        aligned:
          lower.includes(
            "supported"
          ) ||
          lower.includes(
            "observations"
          ) ||
          lower.includes(
            "evidence"
          ),

        reasoning:
          "References supporting evidence",
      },

      {
        trait:
          "Human Sovereign",

        aligned:
          !lower.includes(
            "you must"
          ) &&
          !lower.includes(
            "your destiny"
          ),

        reasoning:
          "Preserves user agency",
      },

      {
        trait:
          "Non Authoritative",

        aligned:
          !lower.includes(
            "proves"
          ) &&
          !lower.includes(
            "the answer is"
          ) &&
          !lower.includes(
            "certainly"
          ),

        reasoning:
          "Avoids authority language",
      },
    ];
  }
}