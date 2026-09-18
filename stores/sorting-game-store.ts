import { create } from "zustand";
import { Difficulty } from "@/types/game";
import {
  SortingCategoryDefinition,
  SortingItemDefinition,
  SortingResult,
  SortingThemeId,
} from "@/games/sorting/types";
import { getSortingThemeById } from "@/games/sorting/data/sorting-data";

interface SortingGameState {
  activeThemeId: SortingThemeId;
  difficulty: Difficulty;
  activeCategories: SortingCategoryDefinition[];
  remainingItems: SortingItemDefinition[];
  sortedItems: Record<string, SortingItemDefinition[]>;
  selectedItemId: string | null;
  mistakesCount: number;
  totalItemsCount: number;
  startTime: number;
  timeSpentSeconds: number;
  isCompleted: boolean;
  lastResult: SortingResult | null;
  lastTargetCategoryId: string | null;
  feedbackState: {
    type: "success" | "wrong" | null;
    message: { id: string; en: string } | null;
    timestamp: number;
  };

  startSession: (themeId: SortingThemeId, difficulty: Difficulty) => void;
  selectItem: (itemId: string | null) => void;
  sortItemIntoCategory: (itemId: string, targetCategoryId: string) => boolean;
  finishSession: () => SortingResult;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const useSortingGameStore = create<SortingGameState>((set, get) => ({
  activeThemeId: "bedroom",
  difficulty: "easy",
  activeCategories: [],
  remainingItems: [],
  sortedItems: {},
  selectedItemId: null,
  mistakesCount: 0,
  totalItemsCount: 6,
  startTime: Date.now(),
  timeSpentSeconds: 0,
  isCompleted: false,
  lastResult: null,
  lastTargetCategoryId: null,
  feedbackState: {
    type: null,
    message: null,
    timestamp: 0,
  },

  startSession: (themeId: SortingThemeId, difficulty: Difficulty) => {
    const theme = getSortingThemeById(themeId);
    if (!theme) return;

    // Pick categories based on difficulty
    let categories = [...theme.categories];
    if (difficulty === "easy") {
      categories = theme.categories.slice(0, 2);
    } else if (difficulty === "medium") {
      categories = theme.categories.slice(0, 3);
    } // "hard" keeps all categories (up to 4)

    const activeCatIds = new Set(categories.map((c) => c.id));
    const eligibleItems = theme.items.filter((item) => activeCatIds.has(item.categoryId));

    // Limit item count based on difficulty
    const targetCount = difficulty === "easy" ? 6 : difficulty === "medium" ? 9 : 12;
    const shuffledItems = shuffleArray(eligibleItems).slice(0, targetCount);

    const initialSorted: Record<string, SortingItemDefinition[]> = {};
    categories.forEach((cat) => {
      initialSorted[cat.id] = [];
    });

    set({
      activeThemeId: themeId,
      difficulty,
      activeCategories: categories,
      remainingItems: shuffledItems,
      sortedItems: initialSorted,
      selectedItemId: shuffledItems[0]?.id ?? null,
      mistakesCount: 0,
      totalItemsCount: shuffledItems.length,
      startTime: Date.now(),
      timeSpentSeconds: 0,
      isCompleted: false,
      lastResult: null,
      lastTargetCategoryId: null,
      feedbackState: {
        type: null,
        message: null,
        timestamp: 0,
      },
    });
  },

  selectItem: (itemId: string | null) => {
    set({ selectedItemId: itemId });
  },

  sortItemIntoCategory: (itemId: string, targetCategoryId: string) => {
    const { remainingItems, sortedItems, mistakesCount } = get();
    const item = remainingItems.find((i) => i.id === itemId);
    if (!item) return false;

    const isCorrect = item.categoryId === targetCategoryId;

    if (isCorrect) {
      const newRemaining = remainingItems.filter((i) => i.id !== itemId);
      const newSorted = {
        ...sortedItems,
        [targetCategoryId]: [...(sortedItems[targetCategoryId] || []), item],
      };

      const nextItem = newRemaining[0]?.id ?? null;

      set({
        remainingItems: newRemaining,
        sortedItems: newSorted,
        selectedItemId: nextItem,
        lastTargetCategoryId: targetCategoryId,
        feedbackState: {
          type: "success",
          message: {
            id: `Hebat! ${item.name.id} sudah rapi di tempatnya! ✨`,
            en: `Great! ${item.name.en} is neatly placed! ✨`,
          },
          timestamp: Date.now(),
        },
      });

      return true;
    } else {
      set({
        mistakesCount: mistakesCount + 1,
        lastTargetCategoryId: targetCategoryId,
        feedbackState: {
          type: "wrong",
          message: {
            id: `Ups! Coba cari wadah yang lain ya! 😊`,
            en: `Oops! Try looking for another bin! 😊`,
          },
          timestamp: Date.now(),
        },
      });

      return false;
    }
  },

  finishSession: () => {
    const {
      activeThemeId,
      difficulty,
      totalItemsCount,
      mistakesCount,
      startTime,
    } = get();

    const theme = getSortingThemeById(activeThemeId);
    const timeSpentSeconds = Math.max(5, Math.round((Date.now() - startTime) / 1000));

    // Star calculation
    let starsEarned = 5;
    if (mistakesCount >= 4) {
      starsEarned = 3;
    } else if (mistakesCount >= 2) {
      starsEarned = 4;
    }

    const result: SortingResult = {
      themeId: activeThemeId,
      themeTitle: theme ? theme.name.id : "Pilah & Rapikan",
      difficulty,
      totalItems: totalItemsCount,
      sortedItemsCount: totalItemsCount,
      mistakesCount,
      timeSpentSeconds,
      starsEarned,
      completedAt: new Date().toISOString(),
    };

    set({
      isCompleted: true,
      timeSpentSeconds,
      lastResult: result,
    });

    return result;
  },
}));
