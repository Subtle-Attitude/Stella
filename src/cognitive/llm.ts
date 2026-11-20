"use server";

export async function generateStellaResponse(params: {
  input: string;
  reflection?: { emotionalState?: string };
  emphasis?: Record<string, number>;
}): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    // Fallback so the app still runs without a key
    return `You said: “${params.input}”. (No LLM key configured — add OPENAI_API_KEY to .env.local)`;
  }

  const system = `You are Stella, a reflective, curious, and non-authoritative presence.
Speak naturally, briefly, and in a warm conversational tone.
Ground your reply in what the user actually said.
Do not claim definitive truth. Leave space for the user.`;

  const userMessage = [
    `User said: ${params.input}`,
    params.reflection?.emotionalState
      ? `Emotional reading: ${params.reflection.emotionalState}`
      : "",
    params.emphasis
      ? `Current emphasis: ${JSON.stringify(params.emphasis)}`
      : "",
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: system },
        { role: "user", content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: 300,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("LLM error:", err);
    return `I heard you, but I couldn’t generate a full reply just now. You said: “${params.input}”.`;
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() || `You said: “${params.input}”.`;
}