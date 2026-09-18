import { Difficulty } from "@/types/game";

export type AdabCategory = "eating" | "speech" | "cleanliness" | "sleeping" | "sharing";

export interface LocalizedString {
  id: string;
  en: string;
}

export interface AdabChoice {
  id: string;
  text: LocalizedString;
  emoji: string;
  isCorrect: boolean;
  feedback: LocalizedString;
  illustrationBg?: string;
}

export interface AdabDoa {
  id: string;
  title: LocalizedString;
  arabic: string;
  latin: string;
  translation: LocalizedString;
  whenToRead: LocalizedString;
  emoji: string;
}

export interface AdabScenario {
  id: string;
  category: AdabCategory;
  difficulty: Difficulty;
  title: LocalizedString;
  situation: LocalizedString;
  question: LocalizedString;
  sceneEmoji: string;
  themeColor: string; // e.g. "emerald", "amber", "sky", "rose", "purple"
  choices: AdabChoice[];
  associatedDoa?: AdabDoa;
  moralLesson: LocalizedString;
}

export interface AdabResult {
  profileId: string;
  category: AdabCategory;
  difficulty: Difficulty;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  starsEarned: number;
  completedAt: string;
}
