import { Difficulty, MatchingItem, MatchingQuestion, GameResult } from "@/types/game";

export type { Difficulty, MatchingItem, MatchingQuestion, GameResult };

export interface MatchingSessionState {
  gameId: "matching";
  difficulty: Difficulty;
  questions: MatchingQuestion[];
  currentIndex: number; // 0 to 4 (for 5 questions)
  correctCount: number;
  incorrectCount: number;
  isComplete: boolean;
  selectedOptionId: string | null;
  lastAnswerResult: "correct" | "incorrect" | null;
}
