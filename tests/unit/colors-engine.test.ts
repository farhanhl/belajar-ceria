import { describe, it, expect } from "vitest";
import {
  calculateColorsStars,
  generateColorsQuestions,
} from "@/games/colors/lib/colors-shapes-engine";
import {
  COLORS_CATALOG,
  SHAPES_CATALOG,
  getColorById,
  getShapeById,
} from "@/games/colors/data/colors-shapes-data";

describe("Colors & Shapes Engine", () => {
  it("generates 5 easy questions with 3 options and exactly 1 correct answer", () => {
    const questions = generateColorsQuestions("easy");
    expect(questions.length).toBe(5);

    questions.forEach((q) => {
      expect(["find_color", "find_shape"]).toContain(q.type);
      expect(q.options.length).toBe(3);
      const correctOptions = q.options.filter((opt) => opt.isCorrect);
      expect(correctOptions.length).toBe(1);
    });
  });

  it("generates 6 medium questions with 4 options and combo/silhouette types", () => {
    const questions = generateColorsQuestions("medium");
    expect(questions.length).toBe(6);

    questions.forEach((q) => {
      expect(["combo_match", "shape_silhouette"]).toContain(q.type);
      expect(q.options.length).toBe(4);
      const correctOptions = q.options.filter((opt) => opt.isCorrect);
      expect(correctOptions.length).toBe(1);
      expect(q.targetColorId).toBeDefined();
      expect(q.targetShapeId).toBeDefined();
    });
  });

  it("generates 6 hard sorting questions with 2 baskets and 4 sorting items", () => {
    const questions = generateColorsQuestions("hard");
    expect(questions.length).toBe(6);

    questions.forEach((q) => {
      expect(q.type).toBe("sort_baskets");
      expect(q.baskets).toBeDefined();
      expect(q.baskets?.length).toBe(2);
      expect(q.sortingItems).toBeDefined();
      expect(q.sortingItems?.length).toBe(4);

      // Verify each sorting item maps to a valid basket
      const basketIds = new Set(q.baskets?.map((b) => b.id));
      q.sortingItems?.forEach((item) => {
        expect(basketIds.has(item.correctBasketId)).toBe(true);
      });
    });
  });

  it("calculates positive star rewards correctly with encouragement for early childhood", () => {
    // Perfect game: 5/5, 0 mistakes -> 5 stars
    expect(calculateColorsStars("easy", 5, 5, 0)).toBe(5);

    // Minor mistake: 5/5, 1 mistake -> 4 stars
    expect(calculateColorsStars("easy", 5, 4, 1)).toBe(4);

    // Medium accuracy: 3/5 -> 3 stars
    expect(calculateColorsStars("easy", 5, 3, 2)).toBe(3);

    // Partial/Low answers: 1/5 -> 2 stars
    expect(calculateColorsStars("easy", 5, 1, 4)).toBe(2);

    // 0 answers (participating): 1 star
    expect(calculateColorsStars("easy", 5, 0, 5)).toBe(1);
  });

  it("verifies the colors catalog contains 8 complete colors with real world examples", () => {
    expect(COLORS_CATALOG.length).toBe(8);

    COLORS_CATALOG.forEach((color) => {
      expect(color.id).toBeTruthy();
      expect(color.name.id).toBeTruthy();
      expect(color.name.en).toBeTruthy();
      expect(color.hex).toMatch(/^#/);
      expect(color.realWorldExamples.length).toBeGreaterThanOrEqual(2);
    });

    const red = getColorById("red");
    expect(red).toBeDefined();
    expect(red?.name.id).toBe("Merah");
  });

  it("verifies the shapes catalog contains 8 complete geometric shapes with descriptions", () => {
    expect(SHAPES_CATALOG.length).toBe(8);

    SHAPES_CATALOG.forEach((shape) => {
      expect(shape.id).toBeTruthy();
      expect(shape.name.id).toBeTruthy();
      expect(shape.name.en).toBeTruthy();
      expect(shape.description.id).toBeTruthy();
      expect(shape.realWorldExamples.length).toBeGreaterThanOrEqual(2);
    });

    const star = getShapeById("star");
    expect(star).toBeDefined();
    expect(star?.name.id).toBe("Bintang");
  });
});
