import { GameDifficulty } from "@/types/game";

export type HarakatType = "fathah" | "kasrah" | "dhammah" | "asli";

export interface HijaiyahItem {
  id: string; // e.g. "alif", "ba", "ta"
  letter: string; // e.g. "ا", "ب", "ت"
  name: {
    id: string; // e.g. "Alif", "Ba", "Ta"
    en: string;
  };
  transliteration: string; // e.g. "Alif", "Baa'", "Taa'"
  phonicSpeech: {
    id: string; // e.g. "Alif", "Ba", "Ta"
    en: string;
  };
  harakat: {
    fathah: { arabic: string; sound: string; transliteration: string }; // e.g. "بَ", "Ba", "Ba"
    kasrah: { arabic: string; sound: string; transliteration: string }; // e.g. "بِ", "Bi", "Bi"
    dhammah: { arabic: string; sound: string; transliteration: string }; // e.g. "بُ", "Bu", "Bu"
  };
  exampleWord: {
    arabic: string; // e.g. "أَسَدٌ", "بَقَرَةٌ", "تُفَّاحَةٌ"
    transliteration: string; // e.g. "Asadun", "Baqaratun", "Tuffahatun"
    meaning: {
      id: string; // e.g. "Singa", "Sapi", "Apel"
      en: string; // e.g. "Lion", "Cow", "Apple"
    };
    emoji: string; // e.g. "🦁", "🐄", "🍎"
  };
  themeColor: string;
  badgeColor: string;
}

export interface HijaiyahOption {
  id: string;
  letter: string;
  label: string;
  arabicWord?: string;
  emoji?: string;
  subLabel?: string;
}

export interface HijaiyahQuestion {
  id: string;
  type: "identify" | "harakat" | "word_match";
  difficulty: GameDifficulty;
  promptText: string;
  speechText: string;
  targetItem: HijaiyahItem;
  harakatContext?: HarakatType;
  options: HijaiyahOption[];
  correctOptionId: string;
}

export interface HijaiyahQuizResult {
  gameId: string;
  profileId: string;
  difficulty: GameDifficulty;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  starsEarned: number;
  completedAt: string;
}
