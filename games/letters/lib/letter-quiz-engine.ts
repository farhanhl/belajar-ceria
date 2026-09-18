import { GameDifficulty } from "@/types/game";
import { ALPHABET_DATA } from "../data/alphabet-data";
import { LetterItem, LetterQuestion, LetterOption } from "../types";

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateLetterQuestions(
  difficulty: GameDifficulty = "easy",
  count = 5,
  lang: "id" | "en" = "id"
): LetterQuestion[] {
  const shuffledLetters = shuffleArray(ALPHABET_DATA);
  const selectedTargets = shuffledLetters.slice(0, Math.min(count, shuffledLetters.length));

  return selectedTargets.map((target, idx) => {
    // Pick 2 distractors that are different from target
    const distractors = shuffleArray(
      ALPHABET_DATA.filter((l) => l.letter !== target.letter)
    ).slice(0, 2);

    let promptText = "";
    let speechText = "";
    let options: LetterOption[] = [];
    const questionType = difficulty === "easy" ? "identify" : difficulty === "medium" ? "word_match" : "case_match";

    if (difficulty === "easy") {
      // Level 1: Kenali Huruf Kapital
      promptText = lang === "id" ? `Manakah huruf "${target.letter}"?` : `Which one is letter "${target.letter}"?`;
      speechText = lang === "id" ? `Manakah huruf ${target.letter}?` : `Which one is letter ${target.letter}?`;

      options = shuffleArray([
        {
          id: target.letter,
          letter: target.letter,
          label: target.letter,
        },
        ...distractors.map((d) => ({
          id: d.letter,
          letter: d.letter,
          label: d.letter,
        })),
      ]);
    } else if (difficulty === "medium") {
      // Level 2: Huruf Awal Benda / Kata
      const word = lang === "id" ? target.wordId : target.wordEn;
      promptText =
        lang === "id"
          ? `Huruf awal untuk "${word}" ${target.emoji} adalah...`
          : `The first letter for "${word}" ${target.emoji} is...`;
      speechText =
        lang === "id"
          ? `Huruf awal untuk ${word} adalah apa ya?`
          : `What is the starting letter for ${word}?`;

      options = shuffleArray([
        {
          id: target.letter,
          letter: target.letter,
          label: target.letter,
          emoji: target.emoji,
        },
        ...distractors.map((d) => ({
          id: d.letter,
          letter: d.letter,
          label: d.letter,
          emoji: d.emoji,
        })),
      ]);
    } else {
      // Level 3: Pasangan Huruf Besar & Huruf Kecil
      promptText =
        lang === "id"
          ? `Pasangan huruf kecil untuk "${target.letter}" adalah...`
          : `Lowercase letter for "${target.letter}" is...`;
      speechText =
        lang === "id"
          ? `Pasangan huruf kecil untuk huruf besar ${target.letter} adalah apa ya?`
          : `What is the lowercase letter for ${target.letter}?`;

      options = shuffleArray([
        {
          id: target.lowercase,
          letter: target.lowercase,
          label: target.lowercase,
        },
        ...distractors.map((d) => ({
          id: d.lowercase,
          letter: d.lowercase,
          label: d.lowercase,
        })),
      ]);
    }

    const correctOptionId = difficulty === "hard" ? target.lowercase : target.letter;

    return {
      id: `letter-q-${idx}-${target.letter}`,
      type: questionType,
      difficulty,
      promptText,
      speechText,
      targetLetter: target,
      options,
      correctOptionId,
    };
  });
}

export function calculateLetterStars(correctAnswers: number, totalQuestions = 5): number {
  if (totalQuestions <= 0) return 0;
  return Math.min(correctAnswers, totalQuestions);
}
