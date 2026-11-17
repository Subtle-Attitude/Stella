// src/stella/values/ValuePrincipleExtractor.ts
import type { ValueCandidate } from "../../app/stella/contracts/ValueCandidate";

export class ValuePrincipleExtractor {
  extract(text: string): ValueCandidate[] {
    const candidates: ValueCandidate[] = [];
    const lower = text.toLowerCase();

    if (lower.includes("growth") && (lower.includes("value") || lower.includes("important"))) {
      candidates.push({ name: "Growth", confidence: "medium", evidence: text });
    }
    if (lower.includes("stewardship") && (lower.includes("value") || lower.includes("important"))) {
      candidates.push({ name: "Stewardship", confidence: "medium", evidence: text });
    }
    if (lower.includes("belonging") && (lower.includes("value") || lower.includes("important") || lower.includes("matters"))) {
      candidates.push({ name: "Belonging", confidence: "medium", evidence: text });
    }

    return candidates;
  }
}