import { Difficulty, MatchingItem, MatchingQuestion, GameResult } from "@/types/game";
import { ALL_ITEMS } from "./data/items";

/**
 * Shuffles an array randomly using Fisher-Yates
 */
export function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Creates a single matching question given a target item, difficulty, and available items pool
 */
export function createMatchingQuestion(
  targetItem: MatchingItem,
  difficulty: Difficulty,
  pool: MatchingItem[] = ALL_ITEMS
): MatchingQuestion {
  let optionCount: number;
  let useSameCategoryDistractors = false;

  switch (difficulty) {
    case "easy":
      optionCount = 3; // 1 match + 2 distinct distractors
      useSameCategoryDistractors = false;
      break;
    case "medium":
      optionCount = 4; // 1 match + 3 distractors
      useSameCategoryDistractors = false;
      break;
    case "hard":
      optionCount = 5; // 1 match + 4 distractors (same category preferred)
      useSameCategoryDistractors = true;
      break;
  }

  // Find candidate distractors (items with different pairId)
  let candidateDistractors = pool.filter((item) => item.pairId !== targetItem.pairId);

  if (useSameCategoryDistractors) {
    const sameCat = candidateDistractors.filter((item) => item.category === targetItem.category);
    if (sameCat.length >= optionCount - 1) {
      candidateDistractors = sameCat;
    }
  }

  const shuffledDistractors = shuffle(candidateDistractors);
  const selectedDistractors = shuffledDistractors.slice(0, optionCount - 1);

  // The correct option item matching the target
  const correctOption: MatchingItem = {
    ...targetItem,
    id: `${targetItem.id}-opt-${Math.random().toString(36).substring(2, 6)}`,
  };

  const distractorOptions: MatchingItem[] = selectedDistractors.map((item) => ({
    ...item,
    id: `${item.id}-opt-${Math.random().toString(36).substring(2, 6)}`,
  }));

  const allOptions = shuffle([correctOption, ...distractorOptions]);

  return {
    id: `q-${targetItem.id}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    targetItem,
    options: allOptions,
    correctOptionId: correctOption.id,
  };
}

/**
 * Generates a full 5-question game session
 */
export function generateGameSession(difficulty: Difficulty): MatchingQuestion[] {
  const TOTAL_QUESTIONS = 5;
  const shuffledItems = shuffle(ALL_ITEMS);
  const selectedTargets = shuffledItems.slice(0, TOTAL_QUESTIONS);

  return selectedTargets.map((target) => createMatchingQuestion(target, difficulty, ALL_ITEMS));
}

/**
 * Checks if the chosen option is correct for the question
 */
export function checkAnswer(question: MatchingQuestion, selectedOptionId: string): boolean {
  return question.correctOptionId === selectedOptionId;
}

/**
 * Calculates earned stars from correct answers count (0 to 5)
 */
export function calculateStars(correctAnswers: number): number {
  return Math.max(0, Math.min(5, correctAnswers));
}

/**
 * Creates the final GameResult object
 */
export function createGameResult(
  profileId: string,
  difficulty: Difficulty,
  correctAnswers: number,
  incorrectAnswers: number
): GameResult {
  return {
    profileId,
    gameId: "matching",
    difficulty,
    questionsAnswered: 5,
    correctAnswers,
    incorrectAnswers,
    starsEarned: calculateStars(correctAnswers),
    completedAt: new Date().toISOString(),
  };
}
