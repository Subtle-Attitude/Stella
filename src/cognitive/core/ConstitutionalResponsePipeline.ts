import { IdentityExpressionEngine } from "./IdentityExpressionEngine";
import { MeaningExpressionEngine } from "./MeaningExpressionEngine";
import { WisdomExpressionEngine } from "./WisdomExpressionEngine";

import { PresenceExpressionEngine }
  from "../../stella/presence/PresenceExpressionEngine";

import { ResponsePacingEngine }
  from "../../stella/attunement/ResponsePacingEngine";

import { RelationalAttunementEngineV2 }
  from "../../stella/attunement/RelationalAttunementEngineV2";

import { ContextDetectionEngine }
  from "../../stella/attunement/ContextDetectionEngine";

export class ConstitutionalResponsePipeline {

  private readonly identity =
    new IdentityExpressionEngine();

  private readonly meaning =
    new MeaningExpressionEngine();

  private readonly wisdom =
    new WisdomExpressionEngine();

  private readonly presence =
    new PresenceExpressionEngine();

  private readonly pacing =
    new ResponsePacingEngine();

  private readonly attunement =
    new RelationalAttunementEngineV2();

  private readonly context =
    new ContextDetectionEngine();

  process(
    response: string,
    input: string,
  ): string {

    response =
      this.identity.express(
        response
      );

    response =
      this.meaning.express(
        response,
        input
      );

    response =
      this.wisdom.express(
        response,
        input
      );

    response =
      this.presence.express(
        response
      );

    const detectedContext =
      this.context.detect(
        input
      );

    response =
      this.pacing.pace(
        response,
        detectedContext
      );

    response =
      this.attunement.attune(
        response,
        input
      );

    return response;

  }

}
