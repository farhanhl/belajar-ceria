import { create } from "zustand";
import {
  PuzzleArtworkId,
  PuzzleBoardSlot,
  PuzzleDifficulty,
  PuzzleGridConfig,
  PuzzleItem,
  PuzzlePiece,
  PuzzleResult,
} from "@/games/puzzle/types";
import { PUZZLE_CATALOG, getPuzzleById } from "@/games/puzzle/data/puzzles-data";
import {
  calculatePuzzleStars,
  createInitialBoardSlots,
  createPuzzlePieces,
  getGridConfig,
  isPieceMatchSlot,
  shuffleArray,
} from "@/games/puzzle/lib/puzzle-engine";

interface PuzzleGameState {
  puzzle: PuzzleItem | null;
  difficulty: PuzzleDifficulty;
  grid: PuzzleGridConfig;
  pieces: PuzzlePiece[];
  trayPieces: PuzzlePiece[];
  boardSlots: PuzzleBoardSlot[];
  selectedPieceId: string | null;
  movesCount: number;
  hintsUsed: number;
  isShowingHint: boolean;
  isCompleted: boolean;
  startTime: number;
  lastResult: PuzzleResult | null;

  // Actions
  startPuzzle: (puzzleId: string, difficulty?: PuzzleDifficulty) => void;
  selectPiece: (pieceId: string | null) => void;
  placePieceInSlot: (pieceId: string, slotIndex: number) => { success: boolean; isCorrect: boolean; isComplete: boolean };
  returnPieceToTray: (pieceId: string) => void;
  shuffleTray: () => void;
  toggleHint: (show?: boolean) => void;
  resetCurrentPuzzle: () => void;
  finishPuzzle: (manualPlacedCount?: number) => PuzzleResult | null;
}

export const usePuzzleGameStore = create<PuzzleGameState>((set, get) => ({
  puzzle: null,
  difficulty: "easy",
  grid: { cols: 2, rows: 2, totalPieces: 4 },
  pieces: [],
  trayPieces: [],
  boardSlots: [],
  selectedPieceId: null,
  movesCount: 0,
  hintsUsed: 0,
  isShowingHint: false,
  isCompleted: false,
  startTime: 0,
  lastResult: null,

  startPuzzle: (puzzleId: string, difficulty: PuzzleDifficulty = "easy") => {
    const item = getPuzzleById(puzzleId) || PUZZLE_CATALOG[0];
    const grid = getGridConfig(difficulty);
    const pieces = createPuzzlePieces(grid);
    const trayPieces = shuffleArray(pieces);
    const boardSlots = createInitialBoardSlots(grid);

    set({
      puzzle: item,
      difficulty,
      grid,
      pieces,
      trayPieces,
      boardSlots,
      selectedPieceId: null,
      movesCount: 0,
      hintsUsed: 0,
      isShowingHint: false,
      isCompleted: false,
      startTime: Date.now(),
    });
  },

  selectPiece: (pieceId: string | null) => {
    set({ selectedPieceId: pieceId });
  },

  placePieceInSlot: (pieceId: string, slotIndex: number) => {
    const { boardSlots, trayPieces, pieces, movesCount, puzzle, grid } = get();
    if (!puzzle || slotIndex < 0 || slotIndex >= boardSlots.length) {
      return { success: false, isCorrect: false, isComplete: false };
    }

    const piece = pieces.find((p) => p.id === pieceId);
    const targetSlot = boardSlots[slotIndex];
    if (!piece || !targetSlot || targetSlot.isCorrect) {
      return { success: false, isCorrect: false, isComplete: false };
    }

    const isCorrect = isPieceMatchSlot(piece, targetSlot);
    const newMovesCount = movesCount + 1;

    if (isCorrect) {
      const newTray = trayPieces.filter((p) => p.id !== pieceId);
      const newSlots = boardSlots.map((s) =>
        s.slotIndex === slotIndex
          ? { ...s, placedPieceId: pieceId, isCorrect: true }
          : s
      );

      const isComplete = newSlots.every((s) => s.isCorrect && s.placedPieceId !== null);

      set({
        boardSlots: newSlots,
        trayPieces: newTray,
        selectedPieceId: null,
        movesCount: newMovesCount,
        isCompleted: isComplete,
      });

      if (isComplete) {
        get().finishPuzzle();
      }

      return { success: true, isCorrect: true, isComplete };
    } else {
      // Incorrect placement: Ensure piece is definitely in the tray for player to try again
      const alreadyInTray = trayPieces.some((p) => p.id === pieceId);
      const newTray = alreadyInTray ? trayPieces : [...trayPieces, piece];

      set({
        trayPieces: newTray,
        selectedPieceId: null,
        movesCount: newMovesCount,
      });

      return { success: true, isCorrect: false, isComplete: false };
    }
  },

  returnPieceToTray: (pieceId: string) => {
    const { boardSlots, trayPieces, pieces } = get();
    const piece = pieces.find((p) => p.id === pieceId);
    if (!piece) return;

    const newSlots = boardSlots.map((slot) =>
      slot.placedPieceId === pieceId
        ? { ...slot, placedPieceId: null, isCorrect: false }
        : slot
    );

    const alreadyInTray = trayPieces.some((p) => p.id === pieceId);
    const newTray = alreadyInTray ? trayPieces : [...trayPieces, piece];

    set({
      boardSlots: newSlots,
      trayPieces: newTray,
      selectedPieceId: null,
    });
  },

  shuffleTray: () => {
    const { trayPieces } = get();
    set({ trayPieces: shuffleArray(trayPieces) });
  },

  toggleHint: (show?: boolean) => {
    const { isShowingHint, hintsUsed } = get();
    const nextVal = show !== undefined ? show : !isShowingHint;
    set({
      isShowingHint: nextVal,
      hintsUsed: nextVal ? hintsUsed + 1 : hintsUsed,
    });
  },

  resetCurrentPuzzle: () => {
    const { puzzle, difficulty } = get();
    if (puzzle) {
      get().startPuzzle(puzzle.id, difficulty);
    }
  },

  finishPuzzle: (manualPlacedCount?: number) => {
    const { puzzle, difficulty, grid, movesCount, hintsUsed, startTime, boardSlots } = get();
    if (!puzzle) return null;

    const correctPlacedCount =
      manualPlacedCount !== undefined
        ? manualPlacedCount
        : boardSlots.filter((s) => s.isCorrect).length;

    const timeSpentSeconds = Math.max(1, Math.round((Date.now() - startTime) / 1000));
    const starsEarned = calculatePuzzleStars(
      difficulty,
      movesCount,
      hintsUsed,
      grid.totalPieces,
      correctPlacedCount
    );

    const result: PuzzleResult = {
      puzzleId: puzzle.id,
      puzzleTitle: puzzle.title.id,
      artworkId: puzzle.artworkId,
      difficulty,
      totalPieces: grid.totalPieces,
      placedPiecesCount: correctPlacedCount,
      movesCount,
      hintsUsed,
      starsEarned,
      timeSpentSeconds,
      completedAt: new Date().toISOString(),
    };

    set({ lastResult: result, isCompleted: true });
    return result;
  },
}));
