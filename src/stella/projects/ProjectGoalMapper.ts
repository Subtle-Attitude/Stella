// src/stella/projects/ProjectGoalMapper.ts
export class ProjectGoalMapper {
  map(goal: string): string | null {
    const lower = goal.toLowerCase();
    if (lower.includes("atlas")) return "Atlas";
    if (lower.includes("stella")) return "Stella OS";
    return null;
  }
}