import { GameDifficulty } from "@/types/game";

export interface LetterItem {
  letter: string; // "A"
  lowercase: string; // "a"
  wordId: string; // "Apel"
  wordEn: string; // "Apple"
  iconName: string; // "apple" or custom icon
  emoji: string; // "🍎"
  phoneticId: string; // "A... Apel!"
  phoneticEn: string; // "A for Apple!"
  color: {
    bg: string;
    border: string;
    text: string;
    badge: string;
  };
}

export type LetterQuestionType = "identify" | "word_match" | "case_match";

export interface LetterOption {
  id: string;
  letter: string;
  label: string;
  emoji?: string;
  iconName?: string;
}

export interface LetterQuestion {
  id: string;
  type: LetterQuestionType;
  difficulty: GameDifficulty;
  promptText: string;
  speechText: string;
  targetLetter: LetterItem;
  options: LetterOption[];
  correctOptionId: string;
}

export interface LetterQuizResult {
  gameId: "letters";
  profileId: string;
  difficulty: GameDifficulty;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  starsEarned: number;
  completedAt: string;
}
