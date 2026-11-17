import { z } from "zod"

export const ThemeSchema = z.object({
  id: z.string(),
  name: z.string(),
  domains: z.array(z.string()),
  pillars: z.array(z.string()),
  strength: z.enum(["primary", "secondary"]),
})

export const ReflectionQuestionSchema = z.object({
  id: z.string(),
  domainId: z.string(),
  pillarId: z.string(),
  question: z.string(),
  intent: z.string(),
})

export const JournalPromptSchema = z.object({
  id: z.string(),
  domainId: z.string(),
  pillarId: z.string(),
  topicId: z.string(),
  prompt: z.string(),
  followUps: z.array(z.string()),
})

export const CanonGuidanceSchema = z.object({
  coreTruth: z.string(),
  role: z.string(),
  pillars: z.array(z.string()).readonly(),
  note: z.literal("Guidance only. Not a statement about the user."),
})

export const ConstitutionalSafeguardsSchema = z.object({
  specialRules: z.array(z.string()).min(1),
  authorityLimitations: z.array(z.string()).min(1),
  transparencyReminders: z.array(z.string()).min(1),
  nonClaims: z.array(z.string()).min(1),
})

export const AtlasKnowledgeContextSchema = z.object({
  resolved: z.any(), // refined once ResolvedAtlasContext schema exists
  topic: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    domainId: z.string(),
  }),
  themes: z.array(ThemeSchema),
  reflectionQuestions: z.array(ReflectionQuestionSchema),
  journalPrompts: z.array(JournalPromptSchema),
  canonGuidance: CanonGuidanceSchema,
  safeguards: ConstitutionalSafeguardsSchema,
  assembledAt: z.string(),
})