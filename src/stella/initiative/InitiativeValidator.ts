const FORBIDDEN = [
  "you must",
  "the answer is",
  "your destiny",
  "obviously",
];

export class InitiativeValidator {
  validate(
    text: string
  ): boolean {
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
      return false;
    }

    return (
      text.trim()
        .length > 0
    );
  }
}