import { create } from "zustand";
import { Difficulty } from "@/types/game";
import {
  TracingCategory,
  TracingItem,
  UserPoint,
  CompletedUserStroke,
} from "@/games/tracing/types";
import {
  getTracingItems,
  evaluateStrokeProgress,
  calculateTracingStars,
} from "@/games/tracing/lib/tracing-engine";

export const CRAYON_COLORS = [
  { id: "blue", hex: "#3B82F6", label: "Biru", border: "#1D4ED8" },
  { id: "pink", hex: "#EC4899", label: "Merah Muda", border: "#BE185D" },
  { id: "orange", hex: "#F97316", label: "Oranye", border: "#C2410C" },
  { id: "green", hex: "#10B981", label: "Hijau", border: "#047857" },
  { id: "purple", hex: "#8B5CF6", label: "Ungu", border: "#6D28D9" },
  { id: "yellow", hex: "#FBBF24", label: "Kuning Emas", border: "#D97706" },
];

interface TracingGameState {
  category: TracingCategory;
  difficulty: Difficulty;
  items: TracingItem[];
  activeItemIndex: number;
  currentStrokeIndex: number;
  completedStrokes: CompletedUserStroke[];
  currentPoints: UserPoint[];
  isDrawing: boolean;
  selectedColor: string;
  isPlaying: boolean;
  isItemCompleted: boolean;
  itemAccuracy: number;
  itemStars: number;
  totalItemsCompleted: number;
  totalStarsEarned: number;
  startTime: number | null;
  endTime: number | null;

  // Actions
  startSession: (category: TracingCategory, difficulty?: Difficulty) => void;
  selectItem: (index: number) => void;
  nextItem: () => void;
  prevItem: () => void;
  setSelectedColor: (colorHex: string) => void;
  startDrawing: (point: UserPoint) => void;
  addPoint: (point: UserPoint) => void;
  finishDrawing: () => { strokeCompleted: boolean; itemCompleted: boolean; starsEarned: number };
  clearCurrentDrawing: () => void;
  resetCurrentItem: () => void;
}

export const useTracingGameStore = create<TracingGameState>((set, get) => ({
  category: "lines",
  difficulty: "easy",
  items: [],
  activeItemIndex: 0,
  currentStrokeIndex: 0,
  completedStrokes: [],
  currentPoints: [],
  isDrawing: false,
  selectedColor: CRAYON_COLORS[0].hex,
  isPlaying: false,
  isItemCompleted: false,
  itemAccuracy: 0,
  itemStars: 0,
  totalItemsCompleted: 0,
  totalStarsEarned: 0,
  startTime: null,
  endTime: null,

  startSession: (category, difficulty = "easy") => {
    const items = getTracingItems(category, difficulty);
    set({
      category,
      difficulty,
      items: items.length > 0 ? items : getTracingItems(category),
      activeItemIndex: 0,
      currentStrokeIndex: 0,
      completedStrokes: [],
      currentPoints: [],
      isDrawing: false,
      isPlaying: true,
      isItemCompleted: false,
      itemAccuracy: 0,
      itemStars: 0,
      totalItemsCompleted: 0,
      totalStarsEarned: 0,
      startTime: Date.now(),
      endTime: null,
    });
  },

  selectItem: (index) => {
    const { items } = get();
    if (index >= 0 && index < items.length) {
      set({
        activeItemIndex: index,
        currentStrokeIndex: 0,
        completedStrokes: [],
        currentPoints: [],
        isDrawing: false,
        isItemCompleted: false,
        itemAccuracy: 0,
        itemStars: 0,
        startTime: Date.now(),
        endTime: null,
      });
    }
  },

  nextItem: () => {
    const { items, activeItemIndex } = get();
    if (activeItemIndex < items.length - 1) {
      get().selectItem(activeItemIndex + 1);
    }
  },

  prevItem: () => {
    const { activeItemIndex } = get();
    if (activeItemIndex > 0) {
      get().selectItem(activeItemIndex - 1);
    }
  },

  setSelectedColor: (colorHex) => {
    set({ selectedColor: colorHex });
  },

  startDrawing: (point) => {
    const { isItemCompleted } = get();
    if (isItemCompleted) return;
    set({
      isDrawing: true,
      currentPoints: [point],
    });
  },

  addPoint: (point) => {
    const { isDrawing, currentPoints } = get();
    if (!isDrawing) return;
    set({
      currentPoints: [...currentPoints, point],
    });
  },

  finishDrawing: () => {
    const {
      items,
      activeItemIndex,
      currentStrokeIndex,
      currentPoints,
      completedStrokes,
      difficulty,
    } = get();

    if (currentPoints.length === 0) {
      set({ isDrawing: false });
      return { strokeCompleted: false, itemCompleted: false, starsEarned: 0 };
    }

    const currentItem = items[activeItemIndex];
    if (!currentItem || currentStrokeIndex >= currentItem.strokes.length) {
      set({ isDrawing: false, currentPoints: [] });
      return { strokeCompleted: false, itemCompleted: false, starsEarned: 0 };
    }

    const targetStroke = currentItem.strokes[currentStrokeIndex];
    const tolerance = difficulty === "easy" ? 50 : difficulty === "medium" ? 40 : 32;

    const evaluation = evaluateStrokeProgress(currentPoints, targetStroke, tolerance);

    if (evaluation.isCompleted) {
      const newCompletedStroke: CompletedUserStroke = {
        strokeId: targetStroke.id,
        points: currentPoints,
        accuracy: evaluation.accuracy,
      };

      const updatedCompleted = [...completedStrokes, newCompletedStroke];
      const isLastStroke = currentStrokeIndex === currentItem.strokes.length - 1;

      if (isLastStroke) {
        // Entire letter/item is completed
        const avgAccuracy = Math.round(
          updatedCompleted.reduce((sum, s) => sum + s.accuracy, 0) /
            updatedCompleted.length
        );
        const stars = calculateTracingStars(avgAccuracy);

        set((state) => ({
          completedStrokes: updatedCompleted,
          currentPoints: [],
          isDrawing: false,
          isItemCompleted: true,
          itemAccuracy: avgAccuracy,
          itemStars: stars,
          totalItemsCompleted: state.totalItemsCompleted + 1,
          totalStarsEarned: state.totalStarsEarned + stars,
          endTime: Date.now(),
        }));

        return { strokeCompleted: true, itemCompleted: true, starsEarned: stars };
      } else {
        // Advance to next stroke of the current item
        set({
          completedStrokes: updatedCompleted,
          currentStrokeIndex: currentStrokeIndex + 1,
          currentPoints: [],
          isDrawing: false,
        });

        return { strokeCompleted: true, itemCompleted: false, starsEarned: 0 };
      }
    } else {
      // Stroke wasn't accurate or far enough, clear drawn attempt
      set({
        isDrawing: false,
        currentPoints: [],
      });
      return { strokeCompleted: false, itemCompleted: false, starsEarned: 0 };
    }
  },

  clearCurrentDrawing: () => {
    set({
      currentPoints: [],
      isDrawing: false,
    });
  },

  resetCurrentItem: () => {
    set({
      currentStrokeIndex: 0,
      completedStrokes: [],
      currentPoints: [],
      isDrawing: false,
      isItemCompleted: false,
      itemAccuracy: 0,
      itemStars: 0,
      startTime: Date.now(),
      endTime: null,
    });
  },
}));
