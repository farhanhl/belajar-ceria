import {
  PuzzleBoardSlot,
  PuzzleDifficulty,
  PuzzleGridConfig,
  PuzzlePiece,
} from "../types";

/**
 * Get grid dimensions based on difficulty
 * Easy: 2x2 = 4 pieces
 * Medium: 3x2 = 6 pieces
 * Hard: 3x3 = 9 pieces
 */
export function getGridConfig(difficulty: PuzzleDifficulty): PuzzleGridConfig {
  switch (difficulty) {
    case "easy":
      return { cols: 2, rows: 2, totalPieces: 4 };
    case "medium":
      return { cols: 3, rows: 2, totalPieces: 6 };
    case "hard":
      return { cols: 3, rows: 3, totalPieces: 9 };
    default:
      return { cols: 2, rows: 2, totalPieces: 4 };
  }
}

/**
 * Generate all puzzle pieces with correct row & col coordinates
 */
export function createPuzzlePieces(grid: PuzzleGridConfig): PuzzlePiece[] {
  const pieces: PuzzlePiece[] = [];
  let index = 0;

  for (let r = 0; r < grid.rows; r++) {
    for (let c = 0; c < grid.cols; c++) {
      pieces.push({
        id: `piece_${r}_${c}`,
        index,
        correctRow: r,
        correctCol: c,
      });
      index++;
    }
  }

  return pieces;
}

/**
 * Fisher-Yates array shuffle
 */
export function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Create initial empty board slots
 */
export function createInitialBoardSlots(grid: PuzzleGridConfig): PuzzleBoardSlot[] {
  const slots: PuzzleBoardSlot[] = [];
  for (let i = 0; i < grid.totalPieces; i++) {
    const row = Math.floor(i / grid.cols);
    const col = i % grid.cols;
    slots.push({
      slotIndex: i,
      row,
      col,
      placedPieceId: null,
      isCorrect: false,
    });
  }
  return slots;
}

/**
 * Check if a piece matches a board slot
 */
export function isPieceMatchSlot(piece: PuzzlePiece, slot: PuzzleBoardSlot): boolean {
  return piece.correctRow === slot.row && piece.correctCol === slot.col;
}

/**
 * Calculate stars earned (1 to 5 stars) with positive reinforcement
 */
export function calculatePuzzleStars(
  difficulty: PuzzleDifficulty,
  movesCount: number,
  hintsUsed: number,
  totalPieces: number,
  placedPiecesCount?: number
): number {
  const piecesSolved = placedPiecesCount !== undefined ? placedPiecesCount : totalPieces;

  // Partial completion (player clicked Finish early)
  if (piecesSolved < totalPieces) {
    if (piecesSolved === 0) return 1;
    const ratio = piecesSolved / totalPieces;
    if (ratio >= 0.75) return 3;
    if (ratio >= 0.4) return 2;
    return 1;
  }

  // Full completion:
  const mistakes = Math.max(0, movesCount - totalPieces);

  if (mistakes === 0 && hintsUsed === 0) {
    return 5;
  } else if (mistakes <= 2 && hintsUsed <= 1) {
    return 4;
  } else if (mistakes <= 4 || hintsUsed <= 2) {
    return 3;
  } else if (mistakes <= 7) {
    return 2;
  }
  return 2; // Always give at least 2 stars for full completion
}
