// src/stella/reflection/MemoryNarrativeBuilder.ts
import type { ReflectionContext } from "../../app/stella/contracts/ReflectionContext";

export class MemoryNarrativeBuilder {
  build(context: ReflectionContext): string {
    if (context.themes.length === 0) {
      return "No recurring themes were identified.";
    }
    if (context.themes.length === 1) {
      return `A recurring theme across recent memories is ${context.themes[0]}.`;
    }
    return `Recurring themes across recent memories include ${context.themes.join(" and ")}.`;
  }
}