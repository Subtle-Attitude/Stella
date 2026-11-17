export async function processUserMessage(text: string) {
  const lower = text.toLowerCase()

  let reply = "I'm here with you. What would you like to explore?"

  if (lower.includes("dream")) {
    reply = "Let's move into Dream Weaver. What image or feeling is present right now?"
  } else if (lower.includes("future") || lower.includes("envision") || lower.includes("imagine")) {
    reply = "Through Envision, imagine looking back at this moment from a life that feels fulfilled. What do you notice?"
  } else if (lower.includes("atlas") || lower.includes("where") || lower.includes("now")) {
    reply = "Through Your Atlas — where are you in this moment with what you just shared?"
  } else {
    reply = "I'm listening. Tell me more about what is present for you."
  }

  return { text: reply, decision: "PASS" as const }
}