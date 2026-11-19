export class PatternSurfacingEngine {
  surface(
    text: string
  ): string {
    const lower =
      text.toLowerCase();

    if (
      lower.includes("conflicting") ||
      lower.includes("balance") ||
      lower.includes("tension")
    ) {
      return (
        "A tension appears to exist between competing priorities."
      );
    }

    return (
      "A recurring pattern appears to be emerging."
    );
  }
}