"use client";

import { create } from "zustand";
import { Difficulty } from "@/types/game";
import { MemoryCardInstance, MemoryGameResult, MemoryThemeId } from "@/games/memory/types";
import {
  generateMemoryDeck,
  calculateMemoryStars,
  getMemoryTheme,
  getPairCountByDifficulty,
} from "@/games/memory/lib/memory-engine";

interface MemoryGameState {
  themeId: MemoryThemeId;
  difficulty: Difficulty;
  cards: MemoryCardInstance[];
  flippedCardIds: string[]; // 0, 1, or 2 card instance IDs
  matchedPairCount: number;
  totalPairCount: number;
  movesCount: number;
  isLocked: boolean;
  isCompleted: boolean;
  startTime: number | null;
  timeSpentSeconds: number;
  lastResult: MemoryGameResult | null;

  startGame: (themeId?: MemoryThemeId, difficulty?: Difficulty) => void;
  flipCard: (
    instanceId: string,
    onMatch?: (card: MemoryCardInstance, isGameComplete?: boolean, finalResult?: MemoryGameResult | null) => void,
    onMismatch?: () => void
  ) => void;
  endGameEarly: () => MemoryGameResult | null;
  resetGame: () => void;
}

export const useMemoryGameStore = create<MemoryGameState>((set, get) => ({
  themeId: "animals",
  difficulty: "easy",
  cards: [],
  flippedCardIds: [],
  matchedPairCount: 0,
  totalPairCount: 2,
  movesCount: 0,
  isLocked: false,
  isCompleted: false,
  startTime: null,
  timeSpentSeconds: 0,
  lastResult: null,

  startGame: (themeId, difficulty) => {
    const activeTheme = themeId ?? get().themeId;
    const activeDiff = difficulty ?? get().difficulty;
    const cards = generateMemoryDeck(activeTheme, activeDiff);
    const totalPairCount = getPairCountByDifficulty(activeDiff);

    set({
      themeId: activeTheme,
      difficulty: activeDiff,
      cards,
      flippedCardIds: [],
      matchedPairCount: 0,
      totalPairCount,
      movesCount: 0,
      isLocked: false,
      isCompleted: false,
      startTime: Date.now(),
      timeSpentSeconds: 0,
      lastResult: null,
    });
  },

  flipCard: (instanceId, onMatch, onMismatch) => {
    const { cards, flippedCardIds, isLocked, isCompleted, movesCount, matchedPairCount, totalPairCount, themeId, difficulty, startTime } = get();

    // Ignore if board is locked, game is completed, or card is already flipped/matched
    if (isLocked || isCompleted) return;

    const targetCard = cards.find((c) => c.instanceId === instanceId);
    if (!targetCard || targetCard.isFlipped || targetCard.isMatched) return;

    // Flip the tapped card
    const updatedCards = cards.map((c) =>
      c.instanceId === instanceId ? { ...c, isFlipped: true } : c
    );

    const newFlippedIds = [...flippedCardIds, instanceId];

    // Case 1: First card flipped in current move
    if (newFlippedIds.length === 1) {
      set({
        cards: updatedCards,
        flippedCardIds: newFlippedIds,
      });
      return;
    }

    // Case 2: Second card flipped -> Evaluate Match
    if (newFlippedIds.length === 2) {
      const firstCard = cards.find((c) => c.instanceId === newFlippedIds[0])!;
      const secondCard = targetCard;
      const newMovesCount = movesCount + 1;

      // Check if both cards have same base cardId
      const isMatch = firstCard.cardId === secondCard.cardId;

      if (isMatch) {
        // Mark both cards as matched
        const matchedCards = updatedCards.map((c) =>
          c.instanceId === firstCard.instanceId || c.instanceId === secondCard.instanceId
            ? { ...c, isFlipped: true, isMatched: true }
            : c
        );

        const newMatchedCount = matchedPairCount + 1;
        const isGameDone = newMatchedCount >= totalPairCount;
        const timeSpent = startTime ? Math.round((Date.now() - startTime) / 1000) : 0;

        let finalResult: MemoryGameResult | null = null;
        if (isGameDone) {
          const starsEarned = calculateMemoryStars(difficulty, totalPairCount, newMatchedCount, newMovesCount);
          const themeDef = getMemoryTheme(themeId);
          finalResult = {
            themeId,
            themeTitle: themeDef.name.id,
            difficulty,
            totalPairs: totalPairCount,
            matchedPairs: newMatchedCount,
            movesCount: newMovesCount,
            timeSpentSeconds: Math.max(1, timeSpent),
            starsEarned,
            completedAt: new Date().toISOString(),
          };
        }

        set({
          cards: matchedCards,
          flippedCardIds: [],
          matchedPairCount: newMatchedCount,
          movesCount: newMovesCount,
          isLocked: false,
          isCompleted: isGameDone,
          timeSpentSeconds: timeSpent,
          lastResult: finalResult ?? get().lastResult,
        });

        if (onMatch) {
          onMatch(secondCard, isGameDone, finalResult);
        }
      } else {
        // Not a match: Lock board briefly, then flip cards back
        set({
          cards: updatedCards,
          flippedCardIds: newFlippedIds,
          movesCount: newMovesCount,
          isLocked: true,
        });

        if (onMismatch) {
          onMismatch();
        }

        setTimeout(() => {
          const currentCards = get().cards;
          const revertedCards = currentCards.map((c) =>
            c.instanceId === firstCard.instanceId || c.instanceId === secondCard.instanceId
              ? { ...c, isFlipped: false }
              : c
          );

          set({
            cards: revertedCards,
            flippedCardIds: [],
            isLocked: false,
          });
        }, 900);
      }
    }
  },

  endGameEarly: () => {
    const { themeId, difficulty, matchedPairCount, totalPairCount, movesCount, startTime } = get();
    const timeSpent = startTime ? Math.round((Date.now() - startTime) / 1000) : 0;
    const starsEarned = calculateMemoryStars(difficulty, totalPairCount, matchedPairCount, movesCount);
    const themeDef = getMemoryTheme(themeId);

    const result: MemoryGameResult = {
      themeId,
      themeTitle: themeDef.name.id,
      difficulty,
      totalPairs: totalPairCount,
      matchedPairs: matchedPairCount,
      movesCount,
      timeSpentSeconds: Math.max(1, timeSpent),
      starsEarned,
      completedAt: new Date().toISOString(),
    };

    set({
      isCompleted: true,
      lastResult: result,
      timeSpentSeconds: timeSpent,
    });

    return result;
  },

  resetGame: () => {
    set({
      cards: [],
      flippedCardIds: [],
      matchedPairCount: 0,
      movesCount: 0,
      isLocked: false,
      isCompleted: false,
      startTime: null,
      timeSpentSeconds: 0,
      lastResult: null,
    });
  },
}));
