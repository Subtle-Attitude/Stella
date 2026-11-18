const FORBIDDEN = [
  "destiny",
  "fate",
  "soul",
  "true calling",
  "cosmic purpose",
  "the universe wants",
  "universe intends",
];

export class CosmicPerspectiveEngineV2 {
  apply(
    text: string
  ): string {
    const lower =
      text.toLowerCase();

    if (
      FORBIDDEN.some(
        phrase =>
          lower.includes(
            phrase
          )
      )
    ) {
      return text;
    }

    return (
      `${text}\n\n` +
      "Viewed from a broader perspective, this may reflect a larger pattern."
    );
  }
}