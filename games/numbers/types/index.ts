import { Difficulty } from "@/types/game";

export type NumberOperationMode = "counting" | "addition" | "subtraction" | "mixed";

export type CountableObjectId =
  | "watermelon"
  | "apple"
  | "banana"
  | "strawberry"
  | "orange"
  | "duck"
  | "bunny"
  | "fish"
  | "star"
  | "balloon"
  | "car"
  | "cupcake";

export interface CountableObject {
  id: CountableObjectId;
  name: {
    id: string;
    en: string;
  };
  pluralName: {
    id: string;
    en: string;
  };
  emoji: string;
  category: "fruits" | "animals" | "items";
  colorHex: string;
}

export interface NumberItem {
  number: number; // 1 to 10
  word: {
    id: string;
    en: string;
  };
  emojiGroup: string[];
  description: {
    id: string;
    en: string;
  };
}

export interface NumberQuestionOption {
  value: number;
  label?: string;
  isCorrect: boolean;
}

export interface NumberQuestion {
  id: string;
  mode: NumberOperationMode;
  operation?: "+" | "-";
  firstCount: number;
  secondCount?: number;
  correctAnswer: number;
  object: CountableObject;
  prompt: {
    id: string;
    en: string;
  };
  voicePrompt: {
    id: string;
    en: string;
  };
  options: NumberQuestionOption[];
}

export interface NumbersGameResult {
  mode: NumberOperationMode;
  difficulty: Difficulty;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  starsEarned: number;
  timeSpentSeconds: number;
  completedAt: string;
}
