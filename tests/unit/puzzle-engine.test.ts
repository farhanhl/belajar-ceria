import { describe, it, expect } from "vitest";
import {
  calculatePuzzleStars,
  createInitialBoardSlots,
  createPuzzlePieces,
  getGridConfig,
  isPieceMatchSlot,
} from "@/games/puzzle/lib/puzzle-engine";
import { PUZZLE_CATALOG, getPuzzleById } from "@/games/puzzle/data/puzzles-data";

describe("Puzzle Engine & Grid Slicing", () => {
  it("generates correct grid configurations for all 3 difficulties", () => {
    const easy = getGridConfig("easy");
    expect(easy.cols).toBe(2);
    expect(easy.rows).toBe(2);
    expect(easy.totalPieces).toBe(4);

    const medium = getGridConfig("medium");
    expect(medium.cols).toBe(3);
    expect(medium.rows).toBe(2);
    expect(medium.totalPieces).toBe(6);

    const hard = getGridConfig("hard");
    expect(hard.cols).toBe(3);
    expect(hard.rows).toBe(3);
    expect(hard.totalPieces).toBe(9);
  });

  it("generates pieces with unique IDs and exact coordinate mappings", () => {
    const grid = getGridConfig("medium"); // 3 cols x 2 rows = 6 pieces
    const pieces = createPuzzlePieces(grid);

    expect(pieces.length).toBe(6);

    const ids = new Set(pieces.map((p) => p.id));
    expect(ids.size).toBe(6);

    // Check first piece (row 0, col 0)
    expect(pieces[0].correctRow).toBe(0);
    expect(pieces[0].correctCol).toBe(0);

    // Check last piece (row 1, col 2)
    const lastPiece = pieces[pieces.length - 1];
    expect(lastPiece.correctRow).toBe(1);
    expect(lastPiece.correctCol).toBe(2);
  });

  it("creates initial empty board slots matching grid dimensions", () => {
    const grid = getGridConfig("easy"); // 2x2 = 4
    const slots = createInitialBoardSlots(grid);

    expect(slots.length).toBe(4);
    expect(slots.every((s) => s.placedPieceId === null && !s.isCorrect)).toBe(true);

    expect(slots[0]).toEqual({
      slotIndex: 0,
      row: 0,
      col: 0,
      placedPieceId: null,
      isCorrect: false,
    });
    expect(slots[3]).toEqual({
      slotIndex: 3,
      row: 1,
      col: 1,
      placedPieceId: null,
      isCorrect: false,
    });
  });

  it("accurately validates piece placement against board slot coordinates", () => {
    const piece = { id: "p_1_2", index: 5, correctRow: 1, correctCol: 2 };

    const correctSlot = { slotIndex: 5, row: 1, col: 2, placedPieceId: null, isCorrect: false };
    const wrongSlot = { slotIndex: 0, row: 0, col: 0, placedPieceId: null, isCorrect: false };

    expect(isPieceMatchSlot(piece, correctSlot)).toBe(true);
    expect(isPieceMatchSlot(piece, wrongSlot)).toBe(false);
  });

  it("calculates positive star rewards correctly based on moves, hints, and placed pieces", () => {
    // Perfect game with 4 pieces in 4 moves, 0 hints
    expect(calculatePuzzleStars("easy", 4, 0, 4, 4)).toBe(5);

    // Small mistake (1 wrong move)
    expect(calculatePuzzleStars("easy", 5, 0, 4, 4)).toBe(4);

    // Some hints used
    expect(calculatePuzzleStars("easy", 6, 2, 4, 4)).toBe(3);

    // Many mistakes still gives at least 2 stars for encouragement on full completion
    expect(calculatePuzzleStars("easy", 20, 5, 4, 4)).toBe(2);

    // Partial completion: finished early with 3 out of 4 pieces (75% -> 3 stars)
    expect(calculatePuzzleStars("easy", 5, 0, 4, 3)).toBe(3);

    // Partial completion: finished early with 2 out of 4 pieces (50% -> 2 stars)
    expect(calculatePuzzleStars("easy", 3, 0, 4, 2)).toBe(2);

    // Partial completion: finished early with 0 pieces (1 star for trying)
    expect(calculatePuzzleStars("easy", 0, 0, 4, 0)).toBe(1);
  });

  it("verifies the puzzle catalog contains 8 complete child-friendly artworks", () => {
    expect(PUZZLE_CATALOG.length).toBe(8);

    PUZZLE_CATALOG.forEach((item) => {
      expect(item.id).toBeTruthy();
      expect(item.title.id).toBeTruthy();
      expect(item.title.en).toBeTruthy();
      expect(item.description.id).toBeTruthy();
      expect(item.artworkId).toBeTruthy();
      expect(["animals", "vehicles", "nature"]).toContain(item.theme);
    });

    const found = getPuzzleById("elephant");
    expect(found).toBeDefined();
    expect(found?.title.id).toBe("Gajah Ceria");
  });
});
