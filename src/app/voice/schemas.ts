import { z } from "zod"

export const VoiceSessionSchema = z.object({
  id: z.string(),
  startedAt: z.string(),
  status: z.enum(["active", "paused", "ended"]),
  mode: z.enum(["conversation", "journal"]),
  transcripts: z.array(z.any()),
  currentContext: z.object({
    domain: z.string().optional(),
    pillar: z.string().optional(),
    topic: z.string().optional(),
    intent: z.string().optional(),
  }),
})