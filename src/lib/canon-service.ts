import { readCanon, writeCanon } from "./store"
import type { StellaCanon, CanonUpdate } from "@/domain/types"

export function getCanon(): StellaCanon {
  return readCanon()
}

export function updateCanon(update: CanonUpdate): StellaCanon {
  const current = readCanon()
  const next = { ...current, ...update }
  writeCanon(next)
  return next
}