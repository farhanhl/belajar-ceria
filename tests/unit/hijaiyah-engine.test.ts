import { describe, it, expect } from "vitest";
import {
  generateHijaiyahQuestions,
  calculateHijaiyahStars,
} from "@/games/hijaiyah/lib/hijaiyah-quiz-engine";
import { HIJAIYAH_DATA } from "@/games/hijaiyah/data/hijaiyah-data";

describe("Hijaiyah Engine", () => {
  it("has 28 Arabic alphabet letters in dataset", () => {
    expect(HIJAIYAH_DATA.length).toBe(28);
    expect(HIJAIYAH_DATA[0].id).toBe("alif");
    expect(HIJAIYAH_DATA[0].letter).toBe("ا");
    expect(HIJAIYAH_DATA[27].id).toBe("ya");
    expect(HIJAIYAH_DATA[27].letter).toBe("ي");
  });

  it("generates correct number of questions for easy difficulty", () => {
    const questions = generateHijaiyahQuestions("easy", 5, "id");
    expect(questions.length).toBe(5);
    expect(questions[0].type).toBe("identify");
    expect(questions[0].options.length).toBe(3);
    expect(questions[0].options.some((opt) => opt.id === questions[0].correctOptionId)).toBe(true);
  });

  it("generates harakat questions for medium difficulty", () => {
    const questions = generateHijaiyahQuestions("medium", 5, "id");
    expect(questions.length).toBe(5);
    expect(questions[0].type).toBe("harakat");
    expect(questions[0].harakatContext).toBeDefined();
    expect(questions[0].options.length).toBe(3);
    expect(questions[0].options.some((opt) => opt.id === questions[0].correctOptionId)).toBe(true);
  });

  it("generates Islamic word matching questions for hard difficulty", () => {
    const questions = generateHijaiyahQuestions("hard", 5, "en");
    expect(questions.length).toBe(5);
    expect(questions[0].type).toBe("word_match");
    expect(questions[0].targetItem.exampleWord.arabic).toBeDefined();
    expect(questions[0].options.length).toBe(3);
    expect(questions[0].options.some((opt) => opt.id === questions[0].correctOptionId)).toBe(true);
  });

  it("correctly calculates earned stars", () => {
    expect(calculateHijaiyahStars(5, 5)).toBe(5);
    expect(calculateHijaiyahStars(3, 5)).toBe(3);
    expect(calculateHijaiyahStars(0, 5)).toBe(0);
  });
});
