import { getCanon } from "@/lib/canon-service"
import { CanonGuidanceSchema } from "../schemas"

export function loadCanonGuidance() {
  const canon = getCanon()
  return CanonGuidanceSchema.parse({
    coreTruth: canon.coreTruth,
    role: canon.role,
    pillars: canon.pillars,
    note: "Guidance only. Not a statement about the user.",
  })
}