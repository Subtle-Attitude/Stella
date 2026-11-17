import { z } from "zod"

export const PatternObservationSchema = z.object({
  statement: z.string(),
  evidenceCount: z.number(),
  type: z.enum(["frequency", "co-occurrence", "interval"]),
})

export const PatternReportSchema = z.object({
  generatedAt: z.string(),
  sourceTimelineGeneratedAt: z.string(),
  frequencies: z.object({
    topics: z.array(z.any()),
    pillars: z.array(z.any()),
    domains: z.array(z.any()),
  }),
  relationships: z.array(z.any()),
  observations: z.array(PatternObservationSchema),
  summary: z.any(),
  source: z.any(),
})