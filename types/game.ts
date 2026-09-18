export type Difficulty = "easy" | "medium" | "hard";
export type GameDifficulty = Difficulty;

export interface MatchingItem {
  id: string;
  pairId: string;
  iconName: string; // Key corresponding to GameIcons
  label: string; // fallback
  labelId: string; // e.g. "Kucing", "Apel"
  labelEn: string; // e.g. "Cat", "Apple"
  category: "animals" | "fruits" | "vehicles" | "objects";
}

export interface MatchingQuestion {
  id: string;
  targetItem: MatchingItem; // The item child needs to match
  options: MatchingItem[]; // The choices (including correct pair and distractors)
  correctOptionId: string;
}

export interface GameResult {
  profileId: string;
  gameId: string;
  difficulty: Difficulty;
  questionsAnswered: number;
  correctAnswers: number;
  incorrectAnswers: number;
  starsEarned: number;
  completedAt: string;
}

export interface GameDefinition {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: string;
  available: boolean;
  levels?: Difficulty[];
}
