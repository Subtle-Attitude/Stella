// src/stella/lifethemes/LifeThemeValidator.ts
import type { LifeTheme } from "../../app/stella/contracts/LifeTheme";

const FORBIDDEN = ["purpose", "destiny", "true path", "soul mission", "chosen one", "cosmic calling"];
const ALLOWED = new Set(["exploration", "interconnection", "stewardship", "transformation", "creative expression"]);

export class LifeThemeValidator {
  validate(theme: LifeTheme): boolean {
    const name = theme.name.toLowerCase();
    if (FORBIDDEN.some((f) => name.includes(f))) return false;
    return ALLOWED.has(name);
  }
}