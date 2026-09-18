import { Difficulty } from "@/types/game";

export type SortingThemeId =
  | "bedroom"
  | "kitchen"
  | "animals"
  | "colors"
  | "recycling";

export interface SortingCategoryDefinition {
  id: string; // e.g. "clothes", "toys", "books"
  name: {
    id: string;
    en: string;
  };
  icon: string; // emoji or icon symbol
  color: string; // e.g. "pink", "amber", "blue", "emerald", "purple"
  borderColor: string;
  bgGradient: string;
}

export interface SortingItemDefinition {
  id: string; // e.g. "tshirt", "teddy", "apple"
  categoryId: string; // target category id
  name: {
    id: string;
    en: string;
  };
  speechText: {
    id: string;
    en: string;
  };
  emoji: string;
  hint: {
    id: string;
    en: string;
  };
}

export interface SortingThemeDefinition {
  id: SortingThemeId;
  name: {
    id: string;
    en: string;
  };
  description: {
    id: string;
    en: string;
  };
  icon: string;
  themeColor: string;
  borderColor: string;
  badgeColor: string;
  bgGradient: string;
  categories: SortingCategoryDefinition[];
  items: SortingItemDefinition[];
}

export interface SortingResult {
  themeId: SortingThemeId;
  themeTitle: string;
  difficulty: Difficulty;
  totalItems: number;
  sortedItemsCount: number;
  mistakesCount: number;
  timeSpentSeconds: number;
  starsEarned: number;
  completedAt: string;
}
