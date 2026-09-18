import { describe, it, expect } from "vitest";
import {
  calculateNumbersStars,
  generateNumbersQuestions,
} from "@/games/numbers/lib/numbers-engine";
import {
  NUMBERS_CATALOG,
  COUNTABLE_OBJECTS,
  getCountableObjectById,
} from "@/games/numbers/data/numbers-data";

describe("Numbers & Math Engine", () => {
  it("generates valid addition questions with correct sums within difficulty bounds", () => {
    // Easy addition: sums should be <= 5
    const easyQuestions = generateNumbersQuestions("addition", "easy");
    expect(easyQuestions.length).toBe(5);

    easyQuestions.forEach((q) => {
      expect(q.mode).toBe("addition");
      expect(q.operation).toBe("+");
      expect(q.firstCount + (q.secondCount || 0)).toBe(q.correctAnswer);
      expect(q.correctAnswer).toBeLessThanOrEqual(5);

      const correctOption = q.options.find((opt) => opt.isCorrect);
      expect(correctOption).toBeDefined();
      expect(correctOption?.value).toBe(q.correctAnswer);
    });

    // Medium addition: sums should be <= 10
    const medQuestions = generateNumbersQuestions("addition", "medium");
    expect(medQuestions.length).toBe(6);
    medQuestions.forEach((q) => {
      expect(q.correctAnswer).toBeLessThanOrEqual(10);
    });
  });

  it("generates valid subtraction questions with non-negative answers", () => {
    // Easy subtraction: first <= 5, result >= 1
    const easySub = generateNumbersQuestions("subtraction", "easy");
    expect(easySub.length).toBe(5);

    easySub.forEach((q) => {
      expect(q.mode).toBe("subtraction");
      expect(q.operation).toBe("-");
      expect(q.firstCount - (q.secondCount || 0)).toBe(q.correctAnswer);
      expect(q.correctAnswer).toBeGreaterThanOrEqual(1);
      expect(q.firstCount).toBeLessThanOrEqual(5);

      const correctOption = q.options.find((opt) => opt.isCorrect);
      expect(correctOption).toBeDefined();
      expect(correctOption?.value).toBe(q.correctAnswer);
    });
  });

  it("generates mixed mode with both addition and subtraction questions", () => {
    const mixedQuestions = generateNumbersQuestions("mixed", "medium");
    expect(mixedQuestions.length).toBe(6);

    const hasAddition = mixedQuestions.some((q) => q.operation === "+");
    const hasSubtraction = mixedQuestions.some((q) => q.operation === "-");

    expect(hasAddition).toBe(true);
    expect(hasSubtraction).toBe(true);
  });

  it("generates counting questions with correct object counts", () => {
    const countQuestions = generateNumbersQuestions("counting", "easy");
    expect(countQuestions.length).toBe(5);

    countQuestions.forEach((q) => {
      expect(q.mode).toBe("counting");
      expect(q.firstCount).toBe(q.correctAnswer);
      expect(q.firstCount).toBeGreaterThanOrEqual(1);
      expect(q.firstCount).toBeLessThanOrEqual(5);
    });
  });

  it("calculates positive star rewards correctly with positive reinforcement", () => {
    // Perfect game: 5/5 -> 5 stars
    expect(calculateNumbersStars("easy", 5, 5, 0)).toBe(5);

    // Minor mistake: 4/5 -> 4 stars
    expect(calculateNumbersStars("easy", 5, 4, 1)).toBe(4);

    // Medium accuracy: 3/5 -> 3 stars
    expect(calculateNumbersStars("easy", 5, 3, 2)).toBe(3);

    // Participating / low score: at least 2 stars
    expect(calculateNumbersStars("easy", 5, 1, 4)).toBe(2);

    // 0 answers: 1 star
    expect(calculateNumbersStars("easy", 5, 0, 5)).toBe(1);
  });

  it("verifies the numbers catalog contains numbers 1 to 10 with word names and emojis", () => {
    expect(NUMBERS_CATALOG.length).toBe(10);

    NUMBERS_CATALOG.forEach((item, index) => {
      expect(item.number).toBe(index + 1);
      expect(item.word.id).toBeTruthy();
      expect(item.word.en).toBeTruthy();
      expect(item.emojiGroup.length).toBe(item.number);
      expect(item.description.id).toBeTruthy();
    });
  });

  it("verifies countable objects contain fruits, animals, and items with valid metadata", () => {
    expect(COUNTABLE_OBJECTS.length).toBe(12);

    COUNTABLE_OBJECTS.forEach((obj) => {
      expect(obj.id).toBeTruthy();
      expect(obj.name.id).toBeTruthy();
      expect(obj.emoji).toBeTruthy();
      expect(obj.colorHex).toMatch(/^#/);
    });

    const watermelon = getCountableObjectById("watermelon");
    expect(watermelon).toBeDefined();
    expect(watermelon.name.id).toBe("Semangka");
    expect(watermelon.emoji).toBe("🍉");
  });
});
