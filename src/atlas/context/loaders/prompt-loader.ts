import { readFileSync } from "fs"
import { join } from "path"
import { ReflectionQuestionSchema, JournalPromptSchema } from "../schemas"

const questions = JSON.parse(
  readFileSync(join(process.cwd(), "data/atlas/reflection-questions.json"), "utf-8")
)
const prompts = JSON.parse(
  readFileSync(join(process.cwd(), "data/atlas/journal-prompts.json"), "utf-8")
)

export function loadReflectionQuestions(domainId: string, pillarId: string) {
  return questions
    .filter((q: any) => q.domainId === domainId && q.pillarId === pillarId)
    .map((q: any) => ReflectionQuestionSchema.parse(q))
}

export function loadJournalPrompts(domainId: string, pillarId: string, topicId: string) {
  return prompts
    .filter((p: any) => p.domainId === domainId && p.pillarId === pillarId && p.topicId === topicId)
    .map((p: any) => JournalPromptSchema.parse(p))
}