import { create } from "zustand";
import { AdabCategory, AdabScenario, AdabResult } from "@/games/adab/types";
import { getScenariosByCategory, calculateAdabStars } from "@/games/adab/lib/adab-engine";
import { Difficulty } from "@/types/game";

interface AdabGameState {
  activeCategory: AdabCategory;
  difficulty: Difficulty;
  scenarios: AdabScenario[];
  currentScenarioIndex: number;
  selectedChoiceId: string | null;
  isAnswered: boolean;
  isCorrect: boolean | null;
  correctCount: number;
  incorrectCount: number;
  starsEarned: number;
  isSessionCompleted: boolean;
  lastResult: AdabResult | null;

  startSession: (category: AdabCategory, difficulty?: Difficulty) => void;
  selectChoice: (choiceId: string) => { isCorrect: boolean; feedback: { id: string; en: string } } | null;
  nextScenario: () => boolean; // returns true if session finished
  resetSession: () => void;
}

export const useAdabGameStore = create<AdabGameState>((set, get) => ({
  activeCategory: "eating",
  difficulty: "easy",
  scenarios: [],
  currentScenarioIndex: 0,
  selectedChoiceId: null,
  isAnswered: false,
  isCorrect: null,
  correctCount: 0,
  incorrectCount: 0,
  starsEarned: 0,
  isSessionCompleted: false,
  lastResult: null,

  startSession: (category: AdabCategory, difficulty: Difficulty = "easy") => {
    const list = getScenariosByCategory(category, difficulty);
    set({
      activeCategory: category,
      difficulty,
      scenarios: list,
      currentScenarioIndex: 0,
      selectedChoiceId: null,
      isAnswered: false,
      isCorrect: null,
      correctCount: 0,
      incorrectCount: 0,
      starsEarned: 0,
      isSessionCompleted: false,
      lastResult: null,
    });
  },

  selectChoice: (choiceId: string) => {
    const { scenarios, currentScenarioIndex, isAnswered, correctCount, incorrectCount } = get();
    if (isAnswered) return null;

    const currentScenario = scenarios[currentScenarioIndex];
    if (!currentScenario) return null;

    const chosen = currentScenario.choices.find((c) => c.id === choiceId);
    if (!chosen) return null;

    const isCorrect = chosen.isCorrect;
    const newCorrect = isCorrect ? correctCount + 1 : correctCount;
    const newIncorrect = !isCorrect ? incorrectCount + 1 : incorrectCount;

    set({
      selectedChoiceId: choiceId,
      isAnswered: true,
      isCorrect,
      correctCount: newCorrect,
      incorrectCount: newIncorrect,
    });

    return { isCorrect, feedback: chosen.feedback };
  },

  nextScenario: () => {
    const { scenarios, currentScenarioIndex, correctCount, activeCategory, difficulty } = get();

    if (currentScenarioIndex < scenarios.length - 1) {
      set({
        currentScenarioIndex: currentScenarioIndex + 1,
        selectedChoiceId: null,
        isAnswered: false,
        isCorrect: null,
      });
      return false;
    } else {
      // Session finished
      const totalQuestions = scenarios.length;
      const stars = calculateAdabStars(correctCount, totalQuestions);

      const result: AdabResult = {
        profileId: "",
        category: activeCategory,
        difficulty,
        totalQuestions,
        correctAnswers: correctCount,
        incorrectAnswers: totalQuestions - correctCount,
        starsEarned: stars,
        completedAt: new Date().toISOString(),
      };

      set({
        starsEarned: stars,
        isSessionCompleted: true,
        lastResult: result,
      });
      return true;
    }
  },

  resetSession: () => {
    const { activeCategory, difficulty } = get();
    const list = getScenariosByCategory(activeCategory, difficulty);
    set({
      scenarios: list,
      currentScenarioIndex: 0,
      selectedChoiceId: null,
      isAnswered: false,
      isCorrect: null,
      correctCount: 0,
      incorrectCount: 0,
      starsEarned: 0,
      isSessionCompleted: false,
      lastResult: null,
    });
  },
}));
