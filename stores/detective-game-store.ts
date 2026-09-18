import { create } from "zustand";
import { DetectiveDifficulty, DetectiveItem, DetectiveMission } from "@/games/detective/types";
import {
  createDetectiveMission,
  inspectItem,
  activateDetectiveHint,
} from "@/games/detective/lib/detective-engine";
import { DETECTIVE_SCENES } from "@/games/detective/data/detective-scenes";

interface DetectiveGameState {
  selectedSceneId: string;
  selectedDifficulty: DetectiveDifficulty;
  currentMission: DetectiveMission | null;
  lastFoundItem: DetectiveItem | null;
  lastMissedPosition: { x: number; y: number } | null;
  isInspecting: boolean;

  // Actions
  setSelectedSceneId: (sceneId: string) => void;
  setSelectedDifficulty: (difficulty: DetectiveDifficulty) => void;
  startMission: (sceneId?: string, difficulty?: DetectiveDifficulty) => DetectiveMission;
  clickItem: (
    itemId: string,
    coords?: { x: number; y: number }
  ) => { isTarget: boolean; isNewlyFound: boolean; isCompleted: boolean };
  triggerHint: () => { success: boolean; hintItem: DetectiveItem | null };
  resetMission: () => void;
}

export const useDetectiveGameStore = create<DetectiveGameState>((set, get) => ({
  selectedSceneId: DETECTIVE_SCENES[0].id,
  selectedDifficulty: "easy",
  currentMission: null,
  lastFoundItem: null,
  lastMissedPosition: null,
  isInspecting: false,

  setSelectedSceneId: (selectedSceneId) => set({ selectedSceneId }),
  setSelectedDifficulty: (selectedDifficulty) => set({ selectedDifficulty }),

  startMission: (sceneId, difficulty) => {
    const sId = sceneId || get().selectedSceneId || DETECTIVE_SCENES[0].id;
    const diff = difficulty || get().selectedDifficulty || "easy";

    const mission = createDetectiveMission(sId, diff);
    set({
      selectedSceneId: sId,
      selectedDifficulty: diff,
      currentMission: mission,
      lastFoundItem: null,
      lastMissedPosition: null,
    });
    return mission;
  },

  clickItem: (itemId, coords) => {
    const { currentMission } = get();
    if (!currentMission) {
      return { isTarget: false, isNewlyFound: false, isCompleted: false };
    }

    const result = inspectItem(currentMission, itemId);
    const foundItem = result.isNewlyFound
      ? currentMission.scene.items.find((i) => i.id === itemId) || null
      : null;

    set({
      currentMission: result.updatedMission,
      lastFoundItem: foundItem,
      lastMissedPosition: !result.isTarget && coords ? coords : null,
    });

    return {
      isTarget: result.isTarget,
      isNewlyFound: result.isNewlyFound,
      isCompleted: result.isCompleted,
    };
  },

  triggerHint: () => {
    const { currentMission } = get();
    if (!currentMission) return { success: false, hintItem: null };

    const result = activateDetectiveHint(currentMission);
    if (result.success) {
      set({ currentMission: result.updatedMission });
    }
    return { success: result.success, hintItem: result.hintItem };
  },

  resetMission: () => {
    set({
      currentMission: null,
      lastFoundItem: null,
      lastMissedPosition: null,
    });
  },
}));
