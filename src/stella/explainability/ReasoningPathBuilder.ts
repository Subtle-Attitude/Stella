// src/stella/explainability/ReasoningPathBuilder.ts
import type { ReasoningPath } from "../../app/stella/contracts/ReasoningPath";

export class ReasoningPathBuilder {
  build(subject: string, path: string[]): ReasoningPath {
    return {
      subject,
      path,
      length: path.length,
    };
  }
}