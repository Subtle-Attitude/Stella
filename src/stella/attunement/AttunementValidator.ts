const FORBIDDEN = [
  "you should feel",
  "you definitely are",
  "clearly this means",
  "you must realize",
  "you must",
];

export class AttunementValidator {
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