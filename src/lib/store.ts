import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { StellaCanonSchema, type StellaCanon } from "@/domain/schemas";

const DATA_DIR = join(process.cwd(), "data");
const STORE_PATH = join(DATA_DIR, "canon.json");

function ensureStore() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!existsSync(STORE_PATH)) {
    const { loadCanon } = require("@/domain/canon");
    writeFileSync(STORE_PATH, JSON.stringify(loadCanon(), null, 2));
  }
}

export function readCanon(): StellaCanon {
  ensureStore();
  const raw = readFileSync(STORE_PATH, "utf-8");
  return StellaCanonSchema.parse(JSON.parse(raw));
}

export function writeCanon(canon: StellaCanon): void {
  ensureStore();
  StellaCanonSchema.parse(canon);
  writeFileSync(STORE_PATH, JSON.stringify(canon, null, 2));
}