import { readFileSync } from "fs"
import { join } from "path"
import { ThemeSchema } from "../schemas"

const themes = JSON.parse(
  readFileSync(join(process.cwd(), "data/atlas/theme-index.json"), "utf-8")
)

export function loadThemes(domainId: string, topicId: string) {
  return themes
    .filter((t: any) => t.domains?.includes(domainId) || t.topicId === topicId)
    .map((t: any) => ThemeSchema.parse(t))
}