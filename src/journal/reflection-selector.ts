import type {
  JournalEngineInput,
  JournalMode,
  ReflectionQuestion,
  JournalContentGenerator,
} from "./types";

const QUESTION_LIBRARY: Record<
  JournalMode,
  ReflectionQuestion[]
> = {
  orientation: [
    {
      id: "orientation-q1",
      text: "What would make this exploration meaningful to you?",
      purpose: "Clarify the user's intention.",
      tags: ["intention"],
    },
  ],

  reflection: [
    {
      id: "reflection-q1",
      text: "What do you notice about your experience as you write?",
      purpose: "Encourage present-moment observation.",
      tags: ["observation"],
    },
    {
      id: "reflection-q2",
      text: "What else would you like to understand about this experience?",
      purpose: "Invite continued exploration.",
      tags: ["understanding"],
    },
  ],

  wonder: [
    {
      id: "wonder-q1",
      text: "What other perspectives might be interesting to consider?",
      purpose: "Encourage openness.",
      tags: ["perspective"],
    },
  ],

  alignment: [
    {
      id: "alignment-q1",
      text: "What feels important to honor as you explore this?",
      purpose: "Support values-based exploration.",
      tags: ["values"],
    },
  ],

  transformation: [
    {
      id: "transformation-q1",
      text: "What possibilities would you like to make room for?",
      purpose: "Explore change without predicting outcomes.",
      tags: ["possibility"],
    },
  ],
};

export async function selectReflectionQuestions(
  input: JournalEngineInput,
  mode: JournalMode,
  count: number,
  generator?: JournalContentGenerator,
): Promise<ReflectionQuestion[]> {
  const approved = input.knowledgeContext.approvedQuestions ?? [];

  const knowledgeQuestions: ReflectionQuestion[] =
    approved.map((text, index) => ({
      id: `knowledge-question-${index}`,
      text,
      purpose: "Approved Atlas reflection question.",
      tags: [input.resolvedContext.pillar],
    }));

  const selected = [
    ...knowledgeQuestions,
    ...QUESTION_LIBRARY[mode],
  ];

  if (generator) {
    try {
      const generated = await generator.generateQuestions(
        input,
        mode,
        count,
      );

      selected.push(...generated);
    } catch {
      // Fall back to curated questions.
    }
  }

  return deduplicate(selected).slice(0, count);
}

function deduplicate(
  questions: ReflectionQuestion[],
): ReflectionQuestion[] {
  const seen = new Set<string>();

  return questions.filter((question) => {
    const key = question.text.trim().toLowerCase();

    if (seen.has(key)) return false;

    seen.add(key);
    return true;
  });
}