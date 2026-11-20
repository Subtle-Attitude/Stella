import { IdentityExpressionEngine }
  from "../../cognitive/core/IdentityExpressionEngine";

import { MeaningExpressionEngine }
  from "../../cognitive/core/MeaningExpressionEngine";

import { WisdomExpressionEngine }
  from "../../cognitive/core/WisdomExpressionEngine";

import { PresenceExpressionEngine }
  from "../presence/PresenceExpressionEngine";

import { ResponsePacingEngine }
  from "../attunement/ResponsePacingEngine";

import { RelationalAttunementEngineV2 }
  from "../attunement/RelationalAttunementEngineV2";

import { ContextDetectionEngine }
  from "../attunement/ContextDetectionEngine";

const input =
  "How might exploration and stewardship evolve?";

console.log("");
console.log("========================================");
console.log("STELLA OS 1.0 PIPELINE AUDIT");
console.log("========================================");
console.log("");

console.log("INPUT:");
console.log(input);
console.log("");

let response =
  `I heard you say: "${input}". Responding reflectively.`;

console.log("----------------------------------------");
console.log("BASE RESPONSE");
console.log("----------------------------------------");
console.log(response);
console.log("");

const identity =
  new IdentityExpressionEngine();

response =
  identity.express(response);

console.log("----------------------------------------");
console.log("AFTER IDENTITY");
console.log("----------------------------------------");
console.log(response);
console.log("");

const meaning =
  new MeaningExpressionEngine();

response =
  meaning.express(
    response,
    input
  );

console.log("----------------------------------------");
console.log("AFTER MEANING");
console.log("----------------------------------------");
console.log(response);
console.log("");

const wisdom =
  new WisdomExpressionEngine();

response =
  wisdom.express(
    response,
    input
  );

console.log("----------------------------------------");
console.log("AFTER WISDOM");
console.log("----------------------------------------");
console.log(response);
console.log("");

const presence =
  new PresenceExpressionEngine();

response =
  presence.express(
    response
  );

console.log("----------------------------------------");
console.log("AFTER PRESENCE");
console.log("----------------------------------------");
console.log(response);
console.log("");

const context =
  new ContextDetectionEngine();

const detectedContext =
  context.detect(input);

console.log("----------------------------------------");
console.log("DETECTED CONTEXT");
console.log("----------------------------------------");
console.log(detectedContext);
console.log("");

const pacing =
  new ResponsePacingEngine();

response =
  pacing.pace(
    response,
    detectedContext
  );

console.log("----------------------------------------");
console.log("AFTER PACING");
console.log("----------------------------------------");
console.log(response);
console.log("");

const attunement =
  new RelationalAttunementEngineV2();

response =
  attunement.attune(
    response,
    input
  );

console.log("----------------------------------------");
console.log("FINAL RESPONSE");
console.log("----------------------------------------");
console.log(response);
console.log("");

console.log("========================================");
console.log("PIPELINE AUDIT COMPLETE");
console.log("========================================");
console.log("");