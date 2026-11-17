import { z } from "zod"

export const DomainSchema = z.object({
  id: z.enum(["yourAtlas", "dreamWeaver", "envision"]),
  name: z.string(),
  purpose: z.string(),
  coreQuestion: z.string(),
  topics: z.array(z.string()),
})

export const ExplorationPillarSchema = z.object({
  id: z.enum(["orientation", "reflection", "wonder", "alignment", "transformation"]),
  name: z.string(),
  definition: z.string(),
  guidance: z.string(),
})

export const TopicSchema = z.object({
  id: z.string(),
  domainId: z.enum(["yourAtlas", "dreamWeaver", "envision"]),
  name: z.string(),
  description: z.string(),
  relatedThemes: z.array(z.string()),
})

export const JournalPromptSchema = z.object({
  id: z.string(),
  domainId: z.enum(["yourAtlas", "dreamWeaver", "envision"]),
  pillarId: z.enum(["orientation", "reflection", "wonder", "alignment", "transformation"]),
  topicId: z.string(),
  prompt: z.string(),
  followUps: z.array(z.string()),
})