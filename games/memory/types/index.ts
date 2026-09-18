import { Difficulty } from "@/types/game";

export type MemoryThemeId =
  | "animals"
  | "fruits"
  | "vehicles"
  | "shapes_colors"
  | "alphanumeric";

export interface MemoryCardDefinition {
  id: string; // e.g., "cat", "apple"
  emoji: string;
  name: {
    id: string;
    en: string;
  };
  speechText: {
    id: string;
    en: string;
  };
  accentColor: string; // Tailwind color class or hex, e.g. "bg-amber-100 border-amber-300"
}

export interface MemoryThemeDefinition {
  id: MemoryThemeId;
  name: {
    id: string;
    en: string;
  };
  description: {
    id: string;
    en: string;
  };
  icon: string;
  themeColor: string; // e.g. "amber", "pink", "emerald", "indigo", "purple"
  borderColor: string;
  badgeColor: string;
  cards: MemoryCardDefinition[];
}

export interface MemoryCardInstance {
  instanceId: string; // Unique ID for this specific physical card on board (e.g., "cat_1", "cat_2")
  cardId: string; // Base ID for matching (e.g., "cat")
  emoji: string;
  name: {
    id: string;
    en: string;
  };
  speechText: {
    id: string;
    en: string;
  };
  accentColor: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface MemoryGameResult {
  themeId: MemoryThemeId;
  themeTitle: string;
  difficulty: Difficulty;
  totalPairs: number;
  matchedPairs: number;
  movesCount: number;
  timeSpentSeconds: number;
  starsEarned: number;
  completedAt: string;
}
