import { AdabCategory, AdabScenario, AdabDoa } from "../types";
import { ADAB_SCENARIOS, DAILY_DOAS } from "../data/adab-data";
import { Difficulty } from "@/types/game";

/**
 * Filter scenarios by category and optional difficulty
 */
export function getScenariosByCategory(
  category: AdabCategory,
  difficulty?: Difficulty
): AdabScenario[] {
  let filtered = ADAB_SCENARIOS.filter((s) => s.category === category);

  if (difficulty) {
    const diffMatch = filtered.filter((s) => s.difficulty === difficulty);
    // If exact difficulty has items, prioritize, otherwise fallback to all in category
    if (diffMatch.length > 0) {
      filtered = diffMatch;
    }
  }

  return filtered;
}

/**
 * Retrieve specific scenario by ID
 */
export function getScenarioById(id: string): AdabScenario | undefined {
  return ADAB_SCENARIOS.find((s) => s.id === id);
}

/**
 * Calculate stars earned (1-5 stars)
 */
export function calculateAdabStars(
  correctAnswers: number,
  totalQuestions: number
): number {
  if (totalQuestions <= 0) return 0;
  const ratio = correctAnswers / totalQuestions;

  if (ratio >= 0.99) return 5;
  if (ratio >= 0.8) return 4;
  if (ratio >= 0.6) return 3;
  if (ratio >= 0.4) return 2;
  return 1;
}

/**
 * Get all available daily prayers
 */
export function getAllDailyDoas(): AdabDoa[] {
  return Object.values(DAILY_DOAS);
}
