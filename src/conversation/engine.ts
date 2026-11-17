import type { ConversationInput, ConversationResult, ConversationalTurn } from "./types"

export async function runConversationTurn(
  input: ConversationInput
): Promise<ConversationResult> {
  const { knowledge, intent } = input

  const experience = knowledge.resolved.domain.name
  const topic = knowledge.topic.name
  const coreQuestion = knowledge.resolved.domain.coreQuestion

  let content = ""

  switch (intent.id) {
    case "journal_prompt":
      content = knowledge.journalPrompts[0]?.prompt
        || `What feels present for you around ${topic} right now?`
      break
    case "reflection":
      content = `As you sit with ${topic}, what stands out?`
      break
    case "orientation":
      content = coreQuestion || `Where are you with ${topic} in this moment?`
      break
    case "exploration_question":
    default:
      content = `Let's explore ${topic} through ${experience}. What comes up for you?`
  }

  const turn: ConversationalTurn = {
    id: crypto.randomUUID(),
    intent,
    content,
    reflectionDecision: "PASS",
    reflectionFlags: [],
    safeguardsApplied: ["user-agency", "no-authority-claim"],
    timestamp: new Date().toISOString(),
  }

  return { success: true, turn, errors: [] }
}