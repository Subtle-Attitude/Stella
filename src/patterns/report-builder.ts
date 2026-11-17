import { writeFileSync, mkdirSync, existsSync } from "fs"
import { join } from "path"
import type { PatternReport } from "./types"
import { PatternReportSchema } from "./schemas"

const DIR = join(process.cwd(), "data/patterns")

export function savePatternReport(report: PatternReport) {
  if (!existsSync(DIR)) mkdirSync(DIR, { recursive: true })
  PatternReportSchema.parse(report)
  writeFileSync(join(DIR, "pattern-report.json"), JSON.stringify(report, null, 2))
}