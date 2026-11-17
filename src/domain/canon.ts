import { readFileSync } from "fs"
import { join } from "path"
import { StellaCanonSchema, type StellaCanon } from "./schemas"

const CANON_PATH = join(process.cwd(), "docs/canon/stella-canon.json")

export function loadCanon(): StellaCanon {
  const raw = readFileSync(CANON_PATH, "utf-8")
  const parsed = JSON.parse(raw)
  return StellaCanonSchema.parse(parsed)
}