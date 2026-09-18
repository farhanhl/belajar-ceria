import { describe, it, expect } from "vitest";
import {
  createMatchingQuestion,
  generateGameSession,
  checkAnswer,
  calculateStars,
} from "@/games/matching/matching-engine";
import { ALL_ITEMS } from "@/games/matching/data/items";

describe("Matching Game Engine", () => {
  it("should generate a 5-question game session", () => {
    const session = generateGameSession("easy");
    expect(session).toHaveLength(5);
    session.forEach((q) => {
      expect(q.id).toBeDefined();
      expect(q.targetItem).toBeDefined();
      expect(q.options.length).toBeGreaterThanOrEqual(3);
      expect(q.correctOptionId).toBeDefined();
      // Ensure one of the options matches the target pairId
      const matchingOption = q.options.find((o) => o.id === q.correctOptionId);
      expect(matchingOption).toBeDefined();
      expect(matchingOption?.pairId).toBe(q.targetItem.pairId);
    });
  });

  it("should respect difficulty options count", () => {
    const target = ALL_ITEMS[0];
    const easyQ = createMatchingQuestion(target, "easy", ALL_ITEMS);
    expect(easyQ.options).toHaveLength(3);

    const medQ = createMatchingQuestion(target, "medium", ALL_ITEMS);
    expect(medQ.options).toHaveLength(4);

    const hardQ = createMatchingQuestion(target, "hard", ALL_ITEMS);
    expect(hardQ.options).toHaveLength(5);
  });

  it("should validate correct vs incorrect answers accurately", () => {
    const target = ALL_ITEMS[0];
    const question = createMatchingQuestion(target, "easy", ALL_ITEMS);

    expect(checkAnswer(question, question.correctOptionId)).toBe(true);

    const wrongOption = question.options.find((o) => o.id !== question.correctOptionId);
    if (wrongOption) {
      expect(checkAnswer(question, wrongOption.id)).toBe(false);
    }
  });

  it("should calculate stars correctly (0 to 5)", () => {
    expect(calculateStars(5)).toBe(5);
    expect(calculateStars(4)).toBe(4);
    expect(calculateStars(3)).toBe(3);
    expect(calculateStars(2)).toBe(2);
    expect(calculateStars(1)).toBe(1);
    expect(calculateStars(0)).toBe(0);
  });
});
