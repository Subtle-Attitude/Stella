import type {
  JournalEngineInput,
  JournalMode,
  JournalPrompt,
  JournalContentGenerator,
} from "./types";

const PROMPT_LIBRARY: Record<JournalMode, JournalPrompt[]> = {
  orientation: [
    {
      id: "orientation-1",
      text: "What feels most important to give your attention to today?",
      purpose: "Establish the user's current focus.",
      source: "atlas",
      tags: ["focus", "present"],
    },
    {
      id: "orientation-2",
      text: "What would you like to explore during this session?",
      purpose: "Let the user define the exploration.",
      source: "atlas",
      tags: ["intention"],
    },
  ],

  reflection: [
    {
      id: "reflection-1",
      text: "What stands out to you when you revisit this experience?",
      purpose: "Invite reflection without assigning meaning.",
      source: "atlas",
      tags: ["experience"],
    },
    {
      id: "reflection-2",
      text: "What details feel important to explore further?",
      purpose: "Encourage deeper observation.",
      source: "atlas",
      tags: ["observation"],
    },
  ],

  wonder: [
    {
      id: "wonder-1",
      text: "What possibilities come to mind when you consider this from another perspective?",
      purpose: "Encourage imaginative exploration.",
      source: "atlas",
      tags: ["possibility"],
    },
    {
      id: "wonder-2",
      text: "What questions would you like to explore about this?",
      purpose: "Encourage curiosity.",
      source: "atlas",
      tags: ["curiosity"],
    },
  ],

  alignment: [
    {
      id: "alignment-1",
      text: "What matters to you as you consider this?",
      purpose: "Invite values-based reflection.",
      source: "atlas",
      tags: ["values"],
    },
    {
      id: "alignment-2",
      text: "What would you like to give more attention to?",
      purpose: "Explore personal priorities.",
      source: "atlas",
      tags: ["priorities"],
    },
  ],

  transformation: [
    {
      id: "transformation-1",
      text: "What would you like to explore about the person you are becoming?",
      purpose: "Invite reflection on change and possibility.",
      source: "atlas",
      tags: ["growth"],
    },
    {
      id: "transformation-2",
      text: "What possibilities would you like to consider for your next chapter?",
      purpose: "Explore future possibilities without prediction.",
      source: "atlas",
      tags: ["future"],
    },
  ],
};

export async function selectPrompts(
  input: JournalEngineInput,
  mode: JournalMode,
  count: number,
  generator?: JournalContentGenerator,
): Promise<JournalPrompt[]> {
  const approved = input.knowledgeContext.approvedPrompts ?? [];

  const curated = PROMPT_LIBRARY[mode].map((prompt) => ({
    ...prompt,
  }));

  const knowledgePrompts: JournalPrompt[] = approved.map(
    (text, index) => ({
      id: `knowledge-${mode}-${index}`,
      text,
      purpose: "Approved Atlas knowledge prompt.",
      source: "atlas",
      tags: [input.resolvedContext.pillar],
    }),
  );

  const selected = [...knowledgePrompts, ...curated];

  if (generator) {
    try {
      const generated = await generator.generatePrompts(
        input,
        mode,
        count,
      );

      selected.push(...generated);
    } catch {
      // Fall back to curated prompts.
    }
  }

  return deduplicate(selected).slice(0, count);
}

function deduplicate(
  prompts: JournalPrompt[],
): JournalPrompt[] {
  const seen = new Set<string>();

  return prompts.filter((prompt) => {
    const key = prompt.text.trim().toLowerCase();

    if (seen.has(key)) return false;

    seen.add(key);
    return true;
  });
}