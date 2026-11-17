import type { ResolvedAtlasContext } from "@/atlas/types"
import type { AtlasKnowledgeContext, ContextAssemblyResult } from "./types"
import { AtlasKnowledgeContextSchema } from "./schemas"
import { loadTopic } from "./loaders/topic-loader"
import { loadThemes } from "./loaders/theme-loader"
import { loadReflectionQuestions, loadJournalPrompts } from "./loaders/prompt-loader"
import { loadCanonGuidance } from "./loaders/canon-loader"
import { loadSafeguards } from "./loaders/constitution-loader"

export function buildAtlasContext(
  resolved: ResolvedAtlasContext
): ContextAssemblyResult {
  const errors: string[] = []

  try {
    const topic = loadTopic(resolved.topic.id)
    if (!topic) {
      errors.push(`Topic not found: ${resolved.topic.id}`)
    }

    const themes = loadThemes(resolved.domain.id, resolved.topic.id)
    const reflectionQuestions = loadReflectionQuestions(
      resolved.domain.id,
      resolved.pillar.id
    )
    const journalPrompts = loadJournalPrompts(
      resolved.domain.id,
      resolved.pillar.id,
      resolved.topic.id
    )
    const canonGuidance = loadCanonGuidance()
    const safeguards = loadSafeguards()

    if (errors.length > 0 || !topic) {
      return { success: false, context: null, errors }
    }

    // Optional memory enrichment — never overrides core context
    let memoryEnrichment: any[] = []
    try {
      const { retrieveRelevant } = require("@/memory/memory-retrieval")
      const result = retrieveRelevant({ topics: [resolved.topic.id] })
      if (result.governancePassed) {
        memoryEnrichment = result.memories
      }
    } catch {
      // Memory layer is optional; absence is not an error
    }

    const context: AtlasKnowledgeContext = {
      resolved,
      topic,
      themes,
      reflectionQuestions,
      journalPrompts,
      canonGuidance,
      safeguards,
      assembledAt: new Date().toISOString(),
      // memoryEnrichment is available for future consumers but not required by the type
    }

    AtlasKnowledgeContextSchema.parse(context)

    return { success: true, context, errors: [] }
  } catch (err) {
    return {
      success: false,
      context: null,
      errors: [err instanceof Error ? err.message : "Assembly failed"],
    }
  }
}