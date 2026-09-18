export interface GameProgress {
  currentLevel: number;
  stars: number;
  gamesCompleted: number;
  questionsAnswered: number;
  correctAnswers: number;
  incorrectAnswers: number;
  lastPlayedAt: string | null;
}

export interface MatchingProgress {
  easy: GameProgress;
  medium: GameProgress;
  hard: GameProgress;
}

export interface LettersProgress {
  easy: GameProgress;
  medium: GameProgress;
  hard: GameProgress;
}

export interface PuzzleProgress {
  easy: GameProgress;
  medium: GameProgress;
  hard: GameProgress;
}

export interface ColorsProgress {
  easy: GameProgress;
  medium: GameProgress;
  hard: GameProgress;
}

export interface NumbersProgress {
  easy: GameProgress;
  medium: GameProgress;
  hard: GameProgress;
}

export interface MemoryProgress {
  easy: GameProgress;
  medium: GameProgress;
  hard: GameProgress;
}

export interface ProfileProgress {
  matching: MatchingProgress;
  letters: LettersProgress;
  puzzle: PuzzleProgress;
  colors: ColorsProgress;
  numbers: NumbersProgress;
  memory: MemoryProgress;
}

export interface ChildProfile {
  id: string;
  name: string;
  avatar: string; // e.g. "girl-1", "boy-1", "girl-2", "boy-2", "star-1", etc.
  createdAt: string;
  updatedAt: string;
  progress: ProfileProgress;
}

export function createInitialGameProgress(): GameProgress {
  return {
    currentLevel: 1,
    stars: 0,
    gamesCompleted: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    lastPlayedAt: null,
  };
}

export function createInitialProfileProgress(): ProfileProgress {
  return {
    matching: {
      easy: createInitialGameProgress(),
      medium: createInitialGameProgress(),
      hard: createInitialGameProgress(),
    },
    letters: {
      easy: createInitialGameProgress(),
      medium: createInitialGameProgress(),
      hard: createInitialGameProgress(),
    },
    puzzle: {
      easy: createInitialGameProgress(),
      medium: createInitialGameProgress(),
      hard: createInitialGameProgress(),
    },
    colors: {
      easy: createInitialGameProgress(),
      medium: createInitialGameProgress(),
      hard: createInitialGameProgress(),
    },
    numbers: {
      easy: createInitialGameProgress(),
      medium: createInitialGameProgress(),
      hard: createInitialGameProgress(),
    },
    memory: {
      easy: createInitialGameProgress(),
      medium: createInitialGameProgress(),
      hard: createInitialGameProgress(),
    },
  };
}

