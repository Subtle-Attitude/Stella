// src/stella/reflection/MemoryReflectionEngine.ts

import type { MemoryRecord } from "../../app/stella/contracts/MemoryRecord";
import type { ReflectionContext } from "../../app/stella/contracts/ReflectionContext";

import { ThemeExtractor } from "./ThemeExtractor";
import { AuthorityAwareMemoryRetrievalPolicy } from "../memory/AuthorityAwareMemoryRetrievalPolicy";

export class MemoryReflectionEngine {
  constructor(
    private readonly extractor = new ThemeExtractor(),
    private readonly policy = new AuthorityAwareMemoryRetrievalPolicy()
  ) {}

  reflect(memories: MemoryRecord[]): ReflectionContext {
    const eligible = memories.filter((record) =>
      this.policy.isEligibleForReasoning(record)
    );

    const themes =
      this.extractor.extractThemes(eligible);

    return {
      themes,

      supportingMemoryIds: [
        ...new Set(
          eligible.map((m) => m.id)
        ),
      ],
    };
  }
}