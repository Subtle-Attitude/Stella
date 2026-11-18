const FORBIDDEN = [
  "destiny",
  "true calling",
  "cosmic purpose",
  "soul mission",
  "ultimate truth",
  "the universe wants",
];

export class PresenceValidator {
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