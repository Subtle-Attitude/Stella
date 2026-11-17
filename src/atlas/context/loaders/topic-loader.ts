import { readFileSync } from "fs"
import { join } from "path"
import { z } from "zod"

const TopicSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  domainId: z.string(),
})

let topics: any[] = []

try {
  const raw = readFileSync(join(process.cwd(), "data/atlas/topic-index.json"), "utf-8")
  topics = JSON.parse(raw)
} catch {
  topics = []
}

export function loadTopic(id: string) {
  const found = topics.find((t) => t.id === id)
  if (!found) return null
  return TopicSchema.parse({
    id: found.id,
    name: found.name,
    description: found.description,
    domainId: found.domainId,
  })
}