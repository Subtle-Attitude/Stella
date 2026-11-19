import { StellaIdentityEngine }
  from "../../stella/identity/StellaIdentityEngine";

import { StellaIdentityNarrativeBuilder }
  from "../../stella/identity/StellaIdentityNarrativeBuilder";

export class IdentityExpressionEngine {

  private readonly identity =
    new StellaIdentityEngine();

  private readonly narrative =
    new StellaIdentityNarrativeBuilder();

  express(
    response: string
  ): string {

    const identity =
      this.identity.load();

    const identityContext =
      this.narrative.build(identity);

    return `${identityContext}\n\n${response}`;
  }
}