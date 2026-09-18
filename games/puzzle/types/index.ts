import { Difficulty } from "@/types/game";

export type PuzzleDifficulty = Difficulty; // 'easy' | 'medium' | 'hard'

export type PuzzleTheme = "muslimah" | "animals" | "vehicles" | "nature" | "space";

export type PuzzleArtworkId =
  | "muslimah_quran"
  | "muslimah_mosque"
  | "muslimah_garden"
  | "muslimah_sharing"
  | "elephant"
  | "cat"
  | "rabbit"
  | "lion"
  | "airplane"
  | "firetruck"
  | "train"
  | "boat"
  | "panda"
  | "dinosaur"
  | "rocket"
  | "astronaut"
  | "submarine"
  | "helicopter"
  | "sunflower"
  | "rainbow_castle";

export interface PuzzleItem {
  id: string;
  artworkId: PuzzleArtworkId;
  title: {
    id: string;
    en: string;
  };
  theme: PuzzleTheme;
  themeName: {
    id: string;
    en: string;
  };
  bgGradient: string;
  badgeColor: string;
  description: {
    id: string;
    en: string;
  };
}

export interface PuzzleGridConfig {
  cols: number;
  rows: number;
  totalPieces: number;
}

export interface PuzzlePiece {
  id: string; // e.g. "piece_0_1"
  index: number;
  correctRow: number;
  correctCol: number;
}

export interface PuzzleBoardSlot {
  slotIndex: number;
  row: number;
  col: number;
  placedPieceId: string | null;
  isCorrect: boolean;
}

export interface PuzzleResult {
  puzzleId: string;
  puzzleTitle: string;
  artworkId: PuzzleArtworkId;
  difficulty: PuzzleDifficulty;
  totalPieces: number;
  placedPiecesCount?: number;
  movesCount: number;
  hintsUsed: number;
  starsEarned: number;
  timeSpentSeconds: number;
  completedAt: string;
}
