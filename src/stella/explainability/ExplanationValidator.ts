// src/stella/explainability/ExplanationValidator.ts
const FORBIDDEN = ["proves", "confirms", "guarantees", "certainly", "must be"];
const ALLOWED = ["appears", "suggests", "supported by", "derived from"];

export class ExplanationValidator {
  validate(text: string): boolean {
    const lower = text.toLowerCase();
    if (FORBIDDEN.some((f) => lower.includes(f))) return false;
    return ALLOWED.some((a) => lower.includes(a));
  }
}