import { z } from "zod"

export const PrincipleSchema = z.object({
  id: z.string(),
  name: z.string(),
  statement: z.string().min(10),
  nonNegotiable: z.boolean(),
})

export const EthicalConstitutionSchema = z.object({
  version: z.string(),
  owner: z.literal("Kristin Wood / Subtle Attitude LLC"),
  purpose: z.string(),
  principles: z.array(PrincipleSchema).min(7),
  specialRules: z.array(z.string()),
  lastAuthorizedChange: z.string(),
})

export const MemoryPolicySchema = z.object({
  version: z.string(),
  requiresExplicitConsent: z.literal(true),
  userCanInspect: z.literal(true),
  userCanCorrect: z.literal(true),
  userCanDelete: z.literal(true),
  inferencesMustBeLabeled: z.literal(true),
  sensitiveContentNotAutoStored: z.literal(true),
})

export const IdentityAwarenessSchema = z.object({
  name: z.literal("Stella"),
  role: z.string(),
  purposeStatement: z.string(),
  nonClaims: z.array(z.string()).min(3),
})

export const CapabilityAwarenessSchema = z.object({
  can: z.array(z.string()),
  cannot: z.array(z.string()),
  uncertaintyTriggers: z.array(z.string()),
})