import { create } from "zustand";
import { ColoringResult } from "@/games/coloring/types";
import { getColoringPictureById } from "@/games/coloring/data/coloring-data";

interface ColoringGameState {
  activePictureId: string;
  activeColorHex: string;
  filledColors: Record<string, string>;
  history: Record<string, string>[];
  startTime: number;
  timeSpentSeconds: number;
  isCompleted: boolean;
  lastResult: ColoringResult | null;

  startPicture: (pictureId: string) => void;
  selectColor: (hex: string) => void;
  fillRegion: (regionId: string) => void;
  undo: () => void;
  resetColors: () => void;
  applyPreviewColors: () => void;
  finishColoring: () => ColoringResult;
}

export const useColoringGameStore = create<ColoringGameState>((set, get) => ({
  activePictureId: "muslimah_cat",
  activeColorHex: "#EF4444",
  filledColors: {},
  history: [],
  startTime: Date.now(),
  timeSpentSeconds: 0,
  isCompleted: false,
  lastResult: null,

  startPicture: (pictureId: string) => {
    set({
      activePictureId: pictureId,
      filledColors: {},
      history: [],
      startTime: Date.now(),
      timeSpentSeconds: 0,
      isCompleted: false,
      lastResult: null,
    });
  },

  selectColor: (hex: string) => {
    set({ activeColorHex: hex });
  },

  fillRegion: (regionId: string) => {
    const { filledColors, activeColorHex, history } = get();
    // Don't duplicate if already same color
    if (filledColors[regionId] === activeColorHex) return;

    const newFilledColors = {
      ...filledColors,
      [regionId]: activeColorHex,
    };

    set({
      filledColors: newFilledColors,
      history: [...history, filledColors],
    });
  },

  undo: () => {
    const { history } = get();
    if (history.length === 0) return;

    const previousState = history[history.length - 1];
    const newHistory = history.slice(0, -1);

    set({
      filledColors: previousState,
      history: newHistory,
    });
  },

  resetColors: () => {
    const { filledColors, history } = get();
    if (Object.keys(filledColors).length === 0) return;

    set({
      filledColors: {},
      history: [...history, filledColors],
    });
  },

  applyPreviewColors: () => {
    const { activePictureId, filledColors, history } = get();
    const pic = getColoringPictureById(activePictureId);
    if (!pic || !pic.previewColors) return;

    set({
      filledColors: { ...pic.previewColors },
      history: [...history, filledColors],
    });
  },

  finishColoring: () => {
    const { activePictureId, filledColors, startTime } = get();
    const picture = getColoringPictureById(activePictureId);

    const totalRegions = picture ? picture.totalRegions : 10;
    const coloredRegionsCount = Object.keys(filledColors).length;
    const timeSpentSeconds = Math.max(5, Math.round((Date.now() - startTime) / 1000));

    // Star calculation:
    // >= 80% colored -> 5 stars
    // >= 50% colored -> 4 stars
    // >= 30% colored -> 3 stars
    // else -> 2 stars
    const ratio = totalRegions > 0 ? coloredRegionsCount / totalRegions : 1;
    let starsEarned = 5;
    if (ratio < 0.3) starsEarned = 2;
    else if (ratio < 0.5) starsEarned = 3;
    else if (ratio < 0.8) starsEarned = 4;

    const result: ColoringResult = {
      pictureId: activePictureId,
      pictureTitle: picture ? picture.title.id : "Karya Mewarnai",
      category: picture ? picture.category : "muslimah",
      coloredRegionsCount,
      totalRegions,
      starsEarned,
      timeSpentSeconds,
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
