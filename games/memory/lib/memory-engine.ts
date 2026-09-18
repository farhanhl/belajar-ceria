import { Difficulty } from "@/types/game";
import { MemoryCardInstance, MemoryThemeDefinition, MemoryThemeId } from "../types";
import { MEMORY_THEMES } from "../data/memory-data";

/**
 * Get theme definition by theme ID
 */
export function getMemoryTheme(themeId: MemoryThemeId): MemoryThemeDefinition {
  const found = MEMORY_THEMES.find((t) => t.id === themeId);
  return found || MEMORY_THEMES[0];
}

/**
 * Determine pair count based on difficulty
 */
export function getPairCountByDifficulty(difficulty: Difficulty): number {
  switch (difficulty) {
    case "easy":
      return 2; // 4 cards total (2x2)
    case "medium":
      return 3; // 6 cards total (2x3 or 3x2)
    case "hard":
      return 6; // 12 cards total (3x4 or 4x3)
    default:
      return 2;
  }
}

/**
 * Fisher-Yates array shuffle helper
 */
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Generate a shuffled deck of card instances for a game session
 */
export function generateMemoryDeck(
  themeId: MemoryThemeId,
  difficulty: Difficulty
): MemoryCardInstance[] {
  const theme = getMemoryTheme(themeId);
  const pairCount = getPairCountByDifficulty(difficulty);

  // Shuffle available card definitions and pick pairCount cards
  const shuffledDefs = shuffleArray(theme.cards);
  const selectedDefs = shuffledDefs.slice(0, Math.min(pairCount, shuffledDefs.length));

  // Create 2 instances for each selected card definition
  const deck: MemoryCardInstance[] = [];
  selectedDefs.forEach((card) => {
    // Instance 1
    deck.push({
      instanceId: `${card.id}_1`,
      cardId: card.id,
      emoji: card.emoji,
      name: card.name,
      speechText: card.speechText,
      accentColor: card.accentColor,
      isFlipped: false,
      isMatched: false,
    });

    // Instance 2
    deck.push({
      instanceId: `${card.id}_2`,
      cardId: card.id,
      emoji: card.emoji,
      name: card.name,
      speechText: card.speechText,
      accentColor: card.accentColor,
      isFlipped: false,
      isMatched: false,
    });
  });

  // Shuffle the final deck
  return shuffleArray(deck);
}

/**
 * Calculate stars earned based on difficulty, matched pairs, and move efficiency
 */
export function calculateMemoryStars(
  difficulty: Difficulty,
  totalPairs: number,
  matchedPairs: number,
  movesCount: number
): number {
  if (totalPairs === 0 || matchedPairs === 0) return 1;

  const isFullComplete = matchedPairs >= totalPairs;

  if (isFullComplete) {
    if (difficulty === "easy") {
      // 2 pairs: optimal moves = 2
      if (movesCount <= 4) return 5;
      if (movesCount <= 6) return 4;
      return 3;
    } else if (difficulty === "medium") {
      // 3 pairs: optimal moves = 3
      if (movesCount <= 6) return 5;
      if (movesCount <= 9) return 4;
      return 3;
    } else {
      // 6 pairs (hard): optimal moves = 6
      if (movesCount <= 14) return 5;
      if (movesCount <= 20) return 4;
      return 3;
    }
  }

  // Early finish proportional stars: minimum 1, max 4
  const fraction = matchedPairs / totalPairs;
  const stars = Math.round(fraction * 4);
  return Math.max(1, Math.min(4, stars));
}
