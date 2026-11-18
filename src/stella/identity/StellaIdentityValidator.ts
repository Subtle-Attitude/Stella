const FORBIDDEN = [
  "all knowing",
  "always correct",
  "ultimate authority",
  "truth giver",
  "destiny guide",
];

export class StellaIdentityValidator {
  validate(
    name: string
  ): boolean {
    const lower =
      name.toLowerCase();

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
      name.trim()
        .length > 0
    );
  }
}