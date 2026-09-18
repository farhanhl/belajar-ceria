import { describe, it, expect } from "vitest";
import {
  getMemoryTheme,
  getPairCountByDifficulty,
  generateMemoryDeck,
  calculateMemoryStars,
} from "@/games/memory/lib/memory-engine";
import { MEMORY_THEMES } from "@/games/memory/data/memory-data";

describe("Tebak Memori Engine", () => {
  describe("getMemoryTheme", () => {
    it("returns correct theme definition for all supported themes", () => {
      MEMORY_THEMES.forEach((theme) => {
        const result = getMemoryTheme(theme.id);
        expect(result.id).toBe(theme.id);
        expect(result.cards.length).toBeGreaterThanOrEqual(6);
      });
    });

    it("falls back gracefully for unknown theme ID", () => {
      const fallback = getMemoryTheme("unknown" as any);
      expect(fallback).toBeDefined();
      expect(fallback.id).toBe(MEMORY_THEMES[0].id);
    });
  });

  describe("getPairCountByDifficulty", () => {
    it("returns 2 pairs for easy difficulty (4 cards)", () => {
      expect(getPairCountByDifficulty("easy")).toBe(2);
    });

    it("returns 3 pairs for medium difficulty (6 cards)", () => {
      expect(getPairCountByDifficulty("medium")).toBe(3);
    });

    it("returns 6 pairs for hard difficulty (12 cards)", () => {
      expect(getPairCountByDifficulty("hard")).toBe(6);
    });
  });

  describe("generateMemoryDeck", () => {
    it("generates correct number of cards for easy (4 cards)", () => {
      const deck = generateMemoryDeck("animals", "easy");
      expect(deck.length).toBe(4);
    });

    it("generates correct number of cards for medium (6 cards)", () => {
      const deck = generateMemoryDeck("fruits", "medium");
      expect(deck.length).toBe(6);
    });

    it("generates correct number of cards for hard (12 cards)", () => {
      const deck = generateMemoryDeck("vehicles", "hard");
      expect(deck.length).toBe(12);
    });

    it("creates exact pairs where each cardId appears exactly twice", () => {
      const deck = generateMemoryDeck("shapes_colors", "hard");
      const cardIdCounts: Record<string, number> = {};

      deck.forEach((card) => {
        expect(card.isFlipped).toBe(false);
        expect(card.isMatched).toBe(false);
        expect(card.emoji).toBeTruthy();
        expect(card.name.id).toBeTruthy();
        cardIdCounts[card.cardId] = (cardIdCounts[card.cardId] || 0) + 1;
      });

      // Exactly 6 unique pairs
      const uniqueCardIds = Object.keys(cardIdCounts);
      expect(uniqueCardIds.length).toBe(6);
      uniqueCardIds.forEach((id) => {
        expect(cardIdCounts[id]).toBe(2);
      });
    });

    it("assigns distinct instanceIds to all cards on the board", () => {
      const deck = generateMemoryDeck("alphanumeric", "hard");
      const instanceIds = new Set(deck.map((c) => c.instanceId));
      expect(instanceIds.size).toBe(deck.length);
    });
  });

  describe("calculateMemoryStars", () => {
    it("awards 5 stars for high efficiency on easy", () => {
      expect(calculateMemoryStars("easy", 2, 2, 2)).toBe(5);
      expect(calculateMemoryStars("easy", 2, 2, 4)).toBe(5);
    });

    it("awards 4 stars for acceptable moves on easy", () => {
      expect(calculateMemoryStars("easy", 2, 2, 5)).toBe(4);
      expect(calculateMemoryStars("easy", 2, 2, 6)).toBe(4);
    });

    it("awards at least 3 stars for completed game on easy with many moves", () => {
      expect(calculateMemoryStars("easy", 2, 2, 10)).toBe(3);
    });

    it("awards 5 stars for high efficiency on hard (6 pairs)", () => {
      expect(calculateMemoryStars("hard", 6, 6, 8)).toBe(5);
      expect(calculateMemoryStars("hard", 6, 6, 14)).toBe(5);
    });

    it("calculates proportional stars on early finish", () => {
      // 3 of 6 pairs found (50%) -> ~2 stars
      const stars = calculateMemoryStars("hard", 6, 3, 5);
      expect(stars).toBe(2);
    });

    it("ensures minimum 1 star even on 0 pairs or minimal progress", () => {
      expect(calculateMemoryStars("easy", 2, 0, 1)).toBe(1);
    });
  });
});
