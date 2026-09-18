import { describe, it, expect } from "vitest";
import { ALPHABET_DATA, getLetterWord, getLetterEmoji, getLetterPhonetic } from "@/games/letters/data/alphabet-data";
import { generateLetterQuestions, calculateLetterStars } from "@/games/letters/lib/letter-quiz-engine";

describe("Alphabet Data", () => {
  it("should contain all 26 letters A-Z", () => {
    expect(ALPHABET_DATA.length).toBe(26);
    const letters = ALPHABET_DATA.map((l) => l.letter);
    expect(letters).toEqual([
      "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
      "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
      "U", "V", "W", "X", "Y", "Z"
    ]);
  });

  it("should have valid vocabulary that starts with the corresponding letter in both Indonesian and English", () => {
    for (const item of ALPHABET_DATA) {
      expect(item.letter).toBeTruthy();
      expect(item.lowercase).toBe(item.letter.toLowerCase());

      // Indonesian word must start with the letter
      expect(item.wordId).toBeTruthy();
      expect(item.wordId.toUpperCase().startsWith(item.letter)).toBe(true);

      // English word must start with the letter
      expect(item.wordEn).toBeTruthy();
      expect(item.wordEn.toUpperCase().startsWith(item.letter)).toBe(true);

      // Emojis and phonetics
      expect(item.emojiId).toBeTruthy();
      expect(item.emojiEn).toBeTruthy();
      expect(item.phoneticId).toContain(item.letter);
      expect(item.phoneticEn).toContain(item.letter);

      // Helper getters
      expect(getLetterWord(item, "id")).toBe(item.wordId);
      expect(getLetterWord(item, "en")).toBe(item.wordEn);
      expect(getLetterEmoji(item, "id")).toBe(item.emojiId);
      expect(getLetterEmoji(item, "en")).toBe(item.emojiEn);
      expect(getLetterPhonetic(item, "id")).toBe(item.phoneticId);
      expect(getLetterPhonetic(item, "en")).toBe(item.phoneticEn);

      expect(item.color.bg).toBeTruthy();
      expect(item.color.border).toBeTruthy();
    }
  });
});

describe("Letter Quiz Engine", () => {
  it("generates 5 questions for easy difficulty (identify uppercase)", () => {
    const questions = generateLetterQuestions("easy", 5, "id");
    expect(questions.length).toBe(5);
    for (const q of questions) {
      expect(q.type).toBe("identify");
      expect(q.difficulty).toBe("easy");
      expect(q.options.length).toBe(3);
      expect(q.options.some((opt) => opt.id === q.correctOptionId)).toBe(true);
    }
  });

  it("generates 5 questions for medium difficulty (word match)", () => {
    const questions = generateLetterQuestions("medium", 5, "id");
    expect(questions.length).toBe(5);
    for (const q of questions) {
      expect(q.type).toBe("word_match");
      expect(q.difficulty).toBe("medium");
      expect(q.options.length).toBe(3);
      expect(q.options.some((opt) => opt.id === q.correctOptionId)).toBe(true);
    }
  });

  it("generates 5 questions for hard difficulty (case match)", () => {
    const questions = generateLetterQuestions("hard", 5, "id");
    expect(questions.length).toBe(5);
    for (const q of questions) {
      expect(q.type).toBe("case_match");
      expect(q.difficulty).toBe("hard");
      expect(q.options.length).toBe(3);
      expect(q.correctOptionId).toBe(q.targetLetter.lowercase);
      expect(q.options.some((opt) => opt.id === q.correctOptionId)).toBe(true);
    }
  });

  it("calculates stars correctly", () => {
    expect(calculateLetterStars(5, 5)).toBe(5);
    expect(calculateLetterStars(3, 5)).toBe(3);
    expect(calculateLetterStars(0, 5)).toBe(0);
  });
});
