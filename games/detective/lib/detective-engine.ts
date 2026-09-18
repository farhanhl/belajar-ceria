import { DetectiveDifficulty, DetectiveItem, DetectiveMission, DetectiveScene } from "../types";
import { DETECTIVE_SCENES } from "../data/detective-scenes";

/**
 * Shuffle helper
 */
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Create a new detective mission
 */
export function createDetectiveMission(
  sceneId: string,
  difficulty: DetectiveDifficulty = "easy"
): DetectiveMission {
  const scene: DetectiveScene =
    DETECTIVE_SCENES.find((s) => s.id === sceneId) || DETECTIVE_SCENES[0];

  const targetCounts: Record<DetectiveDifficulty, number> = {
    easy: 3,
    medium: 4,
    hard: 5,
  };

  const initialHints: Record<DetectiveDifficulty, number> = {
    easy: 3,
    medium: 2,
    hard: 1,
  };

  const targetCount = Math.min(targetCounts[difficulty] || 3, scene.items.length);
  const shuffledItems = shuffleArray(scene.items);
  const targetItems = shuffledItems.slice(0, targetCount);

  return {
    sceneId: scene.id,
    scene,
    difficulty,
    targetItems,
    foundItemIds: [],
    hintsRemaining: initialHints[difficulty] || 2,
    activeHintItemId: null,
    mistakesCount: 0,
    startTime: Date.now(),
    endTime: null,
    isCompleted: false,
    earnedStars: 0,
  };
}

/**
 * Calculate stars based on performance
 */
export function calculateDetectiveStars(
  difficulty: DetectiveDifficulty,
  totalTargets: number,
  mistakesCount: number,
  hintsUsedCount: number
): number {
  let stars = 5;

  if (mistakesCount >= 4) {
    stars -= 2;
  } else if (mistakesCount >= 2) {
    stars -= 1;
  }

  if (hintsUsedCount >= 2) {
    stars -= 1;
  }

  return Math.max(1, Math.min(5, stars));
}

/**
 * Process item discovery
 */
export function inspectItem(
  mission: DetectiveMission,
  clickedItemId: string
): {
  isTarget: boolean;
  isNewlyFound: boolean;
  isCompleted: boolean;
  updatedMission: DetectiveMission;
} {
  if (mission.isCompleted) {
    return {
      isTarget: false,
      isNewlyFound: false,
      isCompleted: true,
      updatedMission: mission,
    };
  }

  const isTarget = mission.targetItems.some((item) => item.id === clickedItemId);
  const isAlreadyFound = mission.foundItemIds.includes(clickedItemId);

  if (isTarget && !isAlreadyFound) {
    const newFoundItemIds = [...mission.foundItemIds, clickedItemId];
    const isCompleted = newFoundItemIds.length === mission.targetItems.length;
    const initialHints = { easy: 3, medium: 2, hard: 1 }[mission.difficulty] || 2;
    const hintsUsed = Math.max(0, initialHints - mission.hintsRemaining);

    const earnedStars = isCompleted
      ? calculateDetectiveStars(
          mission.difficulty,
          mission.targetItems.length,
          mission.mistakesCount,
          hintsUsed
        )
      : 0;

    const updatedMission: DetectiveMission = {
      ...mission,
      foundItemIds: newFoundItemIds,
      activeHintItemId:
        mission.activeHintItemId === clickedItemId ? null : mission.activeHintItemId,
      isCompleted,
      endTime: isCompleted ? Date.now() : null,
      earnedStars,
    };

    return {
      isTarget: true,
      isNewlyFound: true,
      isCompleted,
      updatedMission,
    };
  }

  // Not a target item or already found -> count as miss
  const updatedMission: DetectiveMission = {
    ...mission,
    mistakesCount: mission.mistakesCount + (isAlreadyFound ? 0 : 1),
  };

  return {
    isTarget,
    isNewlyFound: false,
    isCompleted: false,
    updatedMission,
  };
}

/**
 * Activate a hint for an unfound target item
 */
export function activateDetectiveHint(mission: DetectiveMission): {
  success: boolean;
  hintItem: DetectiveItem | null;
  updatedMission: DetectiveMission;
} {
  if (mission.hintsRemaining <= 0 || mission.isCompleted) {
    return { success: false, hintItem: null, updatedMission: mission };
  }

  const unfoundTarget = mission.targetItems.find(
    (item) => !mission.foundItemIds.includes(item.id)
  );

  if (!unfoundTarget) {
    return { success: false, hintItem: null, updatedMission: mission };
  }

  const updatedMission: DetectiveMission = {
    ...mission,
    hintsRemaining: mission.hintsRemaining - 1,
    activeHintItemId: unfoundTarget.id,
  };

  return {
    success: true,
    hintItem: unfoundTarget,
    updatedMission,
  };
}
