import type { MemoryRecord }
  from "../../app/stella/contracts/MemoryRecord";

import type { ReflectionContext }
  from "../../app/stella/contracts/ReflectionContext";

import { ThemeExtractor }
  from "./ThemeExtractor";

export class MemoryReflectionEngine {
  constructor(
    private readonly extractor =
      new ThemeExtractor()
  ) {}

  reflect(
    memories: MemoryRecord[]
  ): ReflectionContext {
    const themes =
      this.extractor.extractThemes(
        memories
      );

    return {
      themes,
      supportingMemoryIds: [
        ...new Set(
          memories.map(
            (memory) => memory.id
          )
        ),
      ],
    };
  }
}