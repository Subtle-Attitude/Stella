import { z } from "zod"

export const VisualCanonSchema = z.object({
  whiteCore: z.boolean(),
  iridescentRing: z.boolean(),
  companionSpark: z.boolean(),
  blackBackground: z.boolean(),
})

export const StellaCanonSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  coreTruth: z.string().min(1),
  pillars: z.array(z.string().min(1)).readonly(),
  visualCanon: VisualCanonSchema,
})

export type StellaCanon = z.infer<typeof StellaCanonSchema>