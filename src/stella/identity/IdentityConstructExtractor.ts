// src/stella/identity/IdentityConstructExtractor.ts

export interface IdentityCandidate {
  name: string;
  confidence: "low" | "medium";
  evidence: string;
}

export class IdentityConstructExtractor {
  private readonly declarations = [
    "i am",
    "i identify as",
    "i identify with",
    "i consider myself",
    "i think of myself as",
    "resonates with me",
  ];

  extract(
    text: string
  ): IdentityCandidate[] {
    const lower =
      text.toLowerCase();

    const declared =
      this.declarations.some(
        pattern =>
          lower.includes(pattern)
      );

    if (!declared) {
      return [];
    }

    const candidates:
      IdentityCandidate[] = [];

    if (
      lower.includes("sun dancer")
    ) {
      candidates.push({
        name: "Sun Dancer",
        confidence: "medium",
        evidence: text,
      });
    }

    if (
      lower.includes("dream keeper")
    ) {
      candidates.push({
        name: "Dream Keeper",
        confidence: "medium",
        evidence: text,
      });
    }

    if (
      lower.includes("wayfinder")
    ) {
      candidates.push({
        name: "Wayfinder",
        confidence: "medium",
        evidence: text,
      });
    }

    return candidates;
  }
}