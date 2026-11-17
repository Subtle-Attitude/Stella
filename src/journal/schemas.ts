import { z } from "zod";

export const JournalModeSchema = z.enum([
  "orientation",
  "reflection",
  "wonder",
  "alignment",
  "transformation",
]);

export const JournalSessionStatusSchema = z.enum([
  "ready",
  "in_progress",
  "completed",
  "abandoned",
]);

export const JournalPromptSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1).max(1000),
  purpose: z.string().min(1).max(500),
  source: z.enum(["atlas", "generated"]),
  tags: z.array(z.string()),
});

export const ReflectionQuestionSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1).max(1000),
  purpose: z.string().min(1).max(500),
  tags: z.array(z.string()),
});

export const JournalPromptSetSchema = z.object({
  prompts: z.array(JournalPromptSchema).min(1).max(3),
  selectionReason: z.string().min(1),
});

export const ReflectionSetSchema = z.object({
  questions: z.array(ReflectionQuestionSchema).min(1).max(5),
  selectionReason: z.string().min(1),
});

export const JournalGuidanceSchema = z.object({
  opening: z.string().min(1).max(1000),
  closing: z.string().max(1000).optional(),
  optionalNextStep: z.string().max(1000).optional(),
});

export const JournalSessionSchema = z.object({
  id: z.string().min(1),
  mode: JournalModeSchema,
  exploration: z.object({
    domain: z.string().min(1),
    pillar: z.string().min(1),
    topic: z.string().min(1),
  }),
  prompts: JournalPromptSetSchema,
  reflections: ReflectionSetSchema,
  guidance: JournalGuidanceSchema,
  status: JournalSessionStatusSchema,
  createdAt: z.string().datetime(),
});

export const JournalEntrySchema = z.object({
  id: z.string().min(1),
  sessionId: z.string().min(1),
  content: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  author: z.literal("user"),
});

export const JournalEngineOptionsSchema = z.object({
  mode: JournalModeSchema.optional(),
  promptCount: z.number().int().min(1).max(3).optional(),
  questionCount: z.number().int().min(1).max(5).optional(),
});