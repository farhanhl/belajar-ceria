import { ChildProfile, createInitialGameProgress, createInitialProfileProgress, GameProgress } from "@/types/profile";
import { Difficulty, GameResult } from "@/types/game";
import { loadAppData, saveAppData } from "./storage";

/**
 * Generate simple UUID compatible across environments
 */
export function generateId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "prof_" + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
}

/**
 * Get all child profiles
 */
export function getProfiles(): ChildProfile[] {
  const data = loadAppData();
  return data.profiles;
}

/**
 * Get active profile or null
 */
export function getActiveProfile(): ChildProfile | null {
  const data = loadAppData();
  if (!data.activeProfileId) {
    return data.profiles[0] || null;
  }
  return data.profiles.find((p) => p.id === data.activeProfileId) || data.profiles[0] || null;
}

/**
 * Get profile by ID
 */
export function getProfileById(id: string): ChildProfile | null {
  const data = loadAppData();
  return data.profiles.find((p) => p.id === id) || null;
}

/**
 * Set active profile ID
 */
export function setActiveProfile(profileId: string): boolean {
  const data = loadAppData();
  const exists = data.profiles.some((p) => p.id === profileId);
  if (!exists) return false;

  data.activeProfileId = profileId;
  return saveAppData(data);
}

/**
 * Create a new child profile
 */
export function createProfile(name: string, avatar: string = "girl-1"): ChildProfile {
  const trimmedName = name.trim();
  if (!trimmedName) {
    throw new Error("Name is required");
  }

  const data = loadAppData();
  const now = new Date().toISOString();

  const newProfile: ChildProfile = {
    id: generateId(),
    name: trimmedName,
    avatar,
    createdAt: now,
    updatedAt: now,
    progress: createInitialProfileProgress(),
  };

  data.profiles.push(newProfile);
  data.activeProfileId = newProfile.id;
  saveAppData(data);

  return newProfile;
}

/**
 * Update matching game progress for a specific profile (isolation guaranteed)
 */
export function recordGameResult(result: GameResult): boolean {
  const data = loadAppData();
  const profileIndex = data.profiles.findIndex((p) => p.id === result.profileId);
  if (profileIndex === -1) return false;

  const profile = data.profiles[profileIndex];
  const diff = result.difficulty;
  const currentProgress: GameProgress = profile.progress.matching[diff] || {
    currentLevel: 1,
    stars: 0,
    gamesCompleted: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    lastPlayedAt: null,
  };

  // Update progress stats
  const updatedProgress: GameProgress = {
    currentLevel: Math.max(currentProgress.currentLevel, diff === "easy" ? 1 : diff === "medium" ? 2 : 3),
    stars: currentProgress.stars + result.starsEarned,
    gamesCompleted: currentProgress.gamesCompleted + 1,
    questionsAnswered: currentProgress.questionsAnswered + result.questionsAnswered,
    correctAnswers: currentProgress.correctAnswers + result.correctAnswers,
    incorrectAnswers: currentProgress.incorrectAnswers + result.incorrectAnswers,
    lastPlayedAt: result.completedAt,
  };

  profile.progress.matching[diff] = updatedProgress;
  profile.updatedAt = new Date().toISOString();

  data.profiles[profileIndex] = profile;
  return saveAppData(data);
}

/**
 * Update letter game progress for a specific profile (isolation guaranteed)
 */
export function recordLetterGameResult(result: {
  profileId: string;
  difficulty: Difficulty;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  starsEarned: number;
  completedAt: string;
}): boolean {
  const data = loadAppData();
  const profileIndex = data.profiles.findIndex((p) => p.id === result.profileId);
  if (profileIndex === -1) return false;

  const profile = data.profiles[profileIndex];
  if (!profile.progress.letters) {
    profile.progress.letters = {
      easy: createInitialGameProgress(),
      medium: createInitialGameProgress(),
      hard: createInitialGameProgress(),
    };
  }

  const diff = result.difficulty;
  const currentProgress: GameProgress =
    profile.progress.letters[diff] || createInitialGameProgress();

  const updatedProgress: GameProgress = {
    currentLevel: Math.max(
      currentProgress.currentLevel,
      diff === "easy" ? 1 : diff === "medium" ? 2 : 3
    ),
    stars: currentProgress.stars + result.starsEarned,
    gamesCompleted: currentProgress.gamesCompleted + 1,
    questionsAnswered: currentProgress.questionsAnswered + result.totalQuestions,
    correctAnswers: currentProgress.correctAnswers + result.correctAnswers,
    incorrectAnswers: currentProgress.incorrectAnswers + result.incorrectAnswers,
    lastPlayedAt: result.completedAt,
  };

  profile.progress.letters[diff] = updatedProgress;
  profile.updatedAt = new Date().toISOString();

  data.profiles[profileIndex] = profile;
  return saveAppData(data);
}

/**
 * Update puzzle game progress for a specific profile (isolation guaranteed)
 */
export function recordPuzzleGameResult(result: {
  profileId: string;
  difficulty: Difficulty;
  totalPieces: number;
  movesCount: number;
  hintsUsed: number;
  starsEarned: number;
  completedAt: string;
}): boolean {
  const data = loadAppData();
  const profileIndex = data.profiles.findIndex((p) => p.id === result.profileId);
  if (profileIndex === -1) return false;

  const profile = data.profiles[profileIndex];
  if (!profile.progress.puzzle) {
    profile.progress.puzzle = {
      easy: createInitialGameProgress(),
      medium: createInitialGameProgress(),
      hard: createInitialGameProgress(),
    };
  }

  const diff = result.difficulty;
  const currentProgress: GameProgress =
    profile.progress.puzzle[diff] || createInitialGameProgress();

  const updatedProgress: GameProgress = {
    currentLevel: Math.max(
      currentProgress.currentLevel,
      diff === "easy" ? 1 : diff === "medium" ? 2 : 3
    ),
    stars: currentProgress.stars + result.starsEarned,
    gamesCompleted: currentProgress.gamesCompleted + 1,
    questionsAnswered: currentProgress.questionsAnswered + result.totalPieces,
    correctAnswers: currentProgress.correctAnswers + result.totalPieces,
    incorrectAnswers: currentProgress.incorrectAnswers + Math.max(0, result.movesCount - result.totalPieces),
    lastPlayedAt: result.completedAt,
  };

  profile.progress.puzzle[diff] = updatedProgress;
  profile.updatedAt = new Date().toISOString();

  data.profiles[profileIndex] = profile;
  return saveAppData(data);
}

/**
 * Update colors & shapes game progress for a specific profile (isolation guaranteed)
 */
export function recordColorsGameResult(result: {
  profileId: string;
  difficulty: Difficulty;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  starsEarned: number;
  completedAt: string;
}): boolean {
  const data = loadAppData();
  const profileIndex = data.profiles.findIndex((p) => p.id === result.profileId);
  if (profileIndex === -1) return false;

  const profile = data.profiles[profileIndex];
  if (!profile.progress.colors) {
    profile.progress.colors = {
      easy: createInitialGameProgress(),
      medium: createInitialGameProgress(),
      hard: createInitialGameProgress(),
    };
  }

  const diff = result.difficulty;
  const currentProgress: GameProgress =
    profile.progress.colors[diff] || createInitialGameProgress();

  const updatedProgress: GameProgress = {
    currentLevel: Math.max(
      currentProgress.currentLevel,
      diff === "easy" ? 1 : diff === "medium" ? 2 : 3
    ),
    stars: currentProgress.stars + result.starsEarned,
    gamesCompleted: currentProgress.gamesCompleted + 1,
    questionsAnswered: currentProgress.questionsAnswered + result.totalQuestions,
    correctAnswers: currentProgress.correctAnswers + result.correctAnswers,
    incorrectAnswers: currentProgress.incorrectAnswers + result.incorrectAnswers,
    lastPlayedAt: result.completedAt,
  };

  profile.progress.colors[diff] = updatedProgress;
  profile.updatedAt = new Date().toISOString();

  data.profiles[profileIndex] = profile;
  return saveAppData(data);
}

/**
 * Update numbers game progress for a specific profile (isolation guaranteed)
 */
export function recordNumbersGameResult(result: {
  profileId: string;
  difficulty: Difficulty;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  starsEarned: number;
  completedAt: string;
}): boolean {
  const data = loadAppData();
  const profileIndex = data.profiles.findIndex((p) => p.id === result.profileId);
  if (profileIndex === -1) return false;

  const profile = data.profiles[profileIndex];
  if (!profile.progress.numbers) {
    profile.progress.numbers = {
      easy: createInitialGameProgress(),
      medium: createInitialGameProgress(),
      hard: createInitialGameProgress(),
    };
  }

  const diff = result.difficulty;
  const currentProgress: GameProgress =
    profile.progress.numbers[diff] || createInitialGameProgress();

  const updatedProgress: GameProgress = {
    currentLevel: Math.max(
      currentProgress.currentLevel,
      diff === "easy" ? 1 : diff === "medium" ? 2 : 3
    ),
    stars: currentProgress.stars + result.starsEarned,
    gamesCompleted: currentProgress.gamesCompleted + 1,
    questionsAnswered: currentProgress.questionsAnswered + result.totalQuestions,
    correctAnswers: currentProgress.correctAnswers + result.correctAnswers,
    incorrectAnswers: currentProgress.incorrectAnswers + result.incorrectAnswers,
    lastPlayedAt: result.completedAt,
  };

  profile.progress.numbers[diff] = updatedProgress;
  profile.updatedAt = new Date().toISOString();

  data.profiles[profileIndex] = profile;
  return saveAppData(data);
}

/**
 * Update memory game progress for a specific profile (isolation guaranteed)
 */
export function recordMemoryGameResult(result: {
  profileId: string;
  difficulty: Difficulty;
  totalPairs: number;
  matchedPairs: number;
  movesCount: number;
  starsEarned: number;
  completedAt: string;
}): boolean {
  const data = loadAppData();
  const profileIndex = data.profiles.findIndex((p) => p.id === result.profileId);
  if (profileIndex === -1) return false;

  const profile = data.profiles[profileIndex];
  if (!profile.progress.memory) {
    profile.progress.memory = {
      easy: createInitialGameProgress(),
      medium: createInitialGameProgress(),
      hard: createInitialGameProgress(),
    };
  }

  const diff = result.difficulty;
  const currentProgress: GameProgress =
    profile.progress.memory[diff] || createInitialGameProgress();

  const updatedProgress: GameProgress = {
    currentLevel: Math.max(
      currentProgress.currentLevel,
      diff === "easy" ? 1 : diff === "medium" ? 2 : 3
    ),
    stars: currentProgress.stars + result.starsEarned,
    gamesCompleted: currentProgress.gamesCompleted + 1,
    questionsAnswered: currentProgress.questionsAnswered + result.totalPairs,
    correctAnswers: currentProgress.correctAnswers + result.matchedPairs,
    incorrectAnswers: currentProgress.incorrectAnswers + Math.max(0, result.movesCount - result.matchedPairs),
    lastPlayedAt: result.completedAt,
  };

  profile.progress.memory[diff] = updatedProgress;
  profile.updatedAt = new Date().toISOString();

  data.profiles[profileIndex] = profile;
  return saveAppData(data);
}

/**
 * Delete a profile
 */
export function deleteProfile(profileId: string): boolean {
  const data = loadAppData();
  const filtered = data.profiles.filter((p) => p.id !== profileId);
  if (filtered.length === data.profiles.length) return false;

  data.profiles = filtered;
  if (data.activeProfileId === profileId) {
    data.activeProfileId = filtered.length > 0 ? filtered[0].id : null;
  }
  return saveAppData(data);
}
