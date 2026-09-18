import { GameDifficulty } from "@/types/game";
import { HIJAIYAH_DATA } from "../data/hijaiyah-data";
import { HijaiyahItem, HijaiyahQuestion, HijaiyahOption, HarakatType } from "../types";

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateHijaiyahQuestions(
  difficulty: GameDifficulty = "easy",
  count = 5,
  lang: "id" | "en" = "id"
): HijaiyahQuestion[] {
  const shuffled = shuffleArray(HIJAIYAH_DATA);
  const selectedTargets = shuffled.slice(0, Math.min(count, shuffled.length));

  return selectedTargets.map((target, idx) => {
    // Pick 2 distractors that are different from target
    const distractors = shuffleArray(
      HIJAIYAH_DATA.filter((l) => l.id !== target.id)
    ).slice(0, 2);

    let promptText = "";
    let speechText = "";
    let options: HijaiyahOption[] = [];
    let correctOptionId = target.id;
    let harakatContext: HarakatType | undefined = undefined;
    const questionType =
      difficulty === "easy"
        ? "identify"
        : difficulty === "medium"
        ? "harakat"
        : "word_match";

    if (difficulty === "easy") {
      // Level 1: Kenali Bentuk & Huruf Hijaiyah
      const name = target.name[lang] || target.name.id;
      promptText =
        lang === "id"
          ? `Manakah huruf Hijaiyah "${name}" (${target.letter})?`
          : `Which one is Hijaiyah letter "${name}" (${target.letter})?`;
      speechText =
        lang === "id"
          ? `Manakah huruf ${name}?`
          : `Which one is letter ${name}?`;

      options = shuffleArray([
        {
          id: target.id,
          letter: target.letter,
          label: target.name[lang] || target.name.id,
        },
        ...distractors.map((d) => ({
          id: d.id,
          letter: d.letter,
          label: d.name[lang] || d.name.id,
        })),
      ]);
      correctOptionId = target.id;
    } else if (difficulty === "medium") {
      // Level 2: Bunyi Harakat (Fathah / Kasrah / Dhammah - A, I, U)
      const harakatTypes: ("fathah" | "kasrah" | "dhammah")[] = ["fathah", "kasrah", "dhammah"];
      const randomHarakat = harakatTypes[Math.floor(Math.random() * harakatTypes.length)];
      harakatContext = randomHarakat;

      const targetHarakatData = target.harakat[randomHarakat];
      const harakatName =
        randomHarakat === "fathah"
          ? "Fathah (ـَ)"
          : randomHarakat === "kasrah"
          ? "Kasrah (ـِ)"
          : "Dhammah (ـُ)";

      promptText =
        lang === "id"
          ? `Bunyi huruf "${target.name.id}" berharakat ${harakatName} adalah...`
          : `The sound of letter "${target.name.en}" with ${harakatName} is...`;
      speechText =
        lang === "id"
          ? `Bagaimana bunyi ${target.name.id} jika berharakat ${randomHarakat}? Yaitu ${targetHarakatData.sound}`
          : `What is the sound of ${target.name.en} with ${randomHarakat}? It is ${targetHarakatData.sound}`;

      options = shuffleArray([
        {
          id: `${target.id}_${randomHarakat}`,
          letter: targetHarakatData.arabic,
          label: targetHarakatData.sound,
          subLabel: harakatName,
        },
        ...distractors.map((d) => {
          const dHarakatData = d.harakat[randomHarakat];
          return {
            id: `${d.id}_${randomHarakat}`,
            letter: dHarakatData.arabic,
            label: dHarakatData.sound,
            subLabel: harakatName,
          };
        }),
      ]);
      correctOptionId = `${target.id}_${randomHarakat}`;
    } else {
      // Level 3: Tebak Huruf Awal Kosakata Islami
      const word = target.exampleWord;
      const meaning = word.meaning[lang] || word.meaning.id;
      promptText =
        lang === "id"
          ? `Huruf awal untuk "${word.arabic}" (${word.transliteration} - ${meaning}) ${word.emoji} adalah...`
          : `Starting letter for "${word.arabic}" (${word.transliteration} - ${meaning}) ${word.emoji} is...`;
      speechText =
        lang === "id"
          ? `Huruf awal untuk kata ${word.transliteration}, artinya ${meaning}, adalah apa ya?`
          : `What is the starting letter for ${word.transliteration}, which means ${meaning}?`;

      options = shuffleArray([
        {
          id: target.id,
          letter: target.letter,
          label: target.name[lang] || target.name.id,
          arabicWord: word.arabic,
          emoji: word.emoji,
        },
        ...distractors.map((d) => ({
          id: d.id,
          letter: d.letter,
          label: d.name[lang] || d.name.id,
          arabicWord: d.exampleWord.arabic,
          emoji: d.exampleWord.emoji,
        })),
      ]);
      correctOptionId = target.id;
    }

    return {
      id: `hijaiyah-q-${idx}-${target.id}`,
      type: questionType,
      difficulty,
      promptText,
      speechText,
      targetItem: target,
      harakatContext,
      options,
      correctOptionId,
    };
  });
}

export function calculateHijaiyahStars(correctAnswers: number, totalQuestions = 5): number {
  if (totalQuestions <= 0) return 0;
  return Math.min(correctAnswers, totalQuestions);
}
