// src/stella/situations/SituationExtractor.ts
export class SituationExtractor {
  extract(content: string): string[] {
    const text = content.toLowerCase();
    const situations: string[] = [];

    if (text.includes("childcare") || text.includes("daycare")) {
      situations.push("childcare transition");
    }
    if (text.includes("kindergarten") || text.includes("school")) {
      situations.push("school transition");
    }
    if (text.includes("corporate job") || text.includes("career") || text.includes("quit")) {
      situations.push("career transition");
    }
    if (text.includes("funding") || text.includes("atlas") || text.includes("building")) {
      situations.push("business growth effort");
    }

    return [...new Set(situations)];
  }
}