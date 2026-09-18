import { GameDifficulty } from "@/types/game";

export type DetectiveDifficulty = GameDifficulty;

export interface DetectiveItem {
  id: string;
  name: {
    id: string;
    en: string;
  };
  emoji: string;
  clue: {
    id: string;
    en: string;
  };
  speechText: {
    id: string;
    en: string;
  };
  xPercent: number; // 5 to 90%
  yPercent: number; // 10 to 85%
  scale?: number;
  rotation?: number;
  category: "toy" | "nature" | "food" | "animal" | "tool" | "magical";
}

export interface DetectiveScene {
  id: string;
  themeName: {
    id: string;
    en: string;
  };
  description: {
    id: string;
    en: string;
  };
  icon: string;
  bgGradient: string;
  themeColor: string;
  borderColor: string;
  items: DetectiveItem[];
}

export interface DetectiveMission {
  sceneId: string;
  scene: DetectiveScene;
  difficulty: DetectiveDifficulty;
  targetItems: DetectiveItem[];
  foundItemIds: string[];
  hintsRemaining: number;
  activeHintItemId: string | null;
  mistakesCount: number;
  startTime: number;
  endTime: number | null;
  isCompleted: boolean;
  earnedStars: number;
}
