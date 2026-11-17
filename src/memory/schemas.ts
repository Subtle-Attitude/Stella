import { z } from "zod"

export const MemoryCategorySchema = z.enum([
  "preference",
  "project",
  "long-term-goal",
  "personal-symbol",
  "atlas-vocabulary",
  "creative-concept",
  "important-decision",
  "recurring-theme",
])

export const MemoryRecordSchema = z.object({
  id: z.string(),
  category: MemoryCategorySchema,
  content: z.string().min(1),
  source: z.object({
    type: z.enum(["conversation", "journal", "narrative", "manual"]),
    id: z.string(),
    timestamp: z.string(),
    excerpt: z.string(),
  }),
  consent: z.object({
    authorizedBy: z.literal("Kristin Wood"),
    authorizedAt: z.string(),
    action: z.enum(["remember", "forget", "edit", "archive", "restore"]),
    note: z.string().optional(),
  }),
  relatedTopics: z.array(z.string()),
  createdAt: z.string(),
  lastUsedAt: z.string().nullable(),
  status: z.enum(["active", "archived"]),
  version: z.number(),
})