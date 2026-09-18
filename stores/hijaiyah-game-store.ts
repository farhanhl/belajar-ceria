import { create } from "zustand";
import { GameDifficulty } from "@/types/game";
import { HijaiyahItem, HijaiyahQuestion, HijaiyahQuizResult, HarakatType } from "@/games/hijaiyah/types";
import { generateHijaiyahQuestions, calculateHijaiyahStars } from "@/games/hijaiyah/lib/hijaiyah-quiz-engine";

interface HijaiyahGameState {
  difficulty: GameDifficulty;
  questions: HijaiyahQuestion[];
  currentIndex: number;
  correctCount: number;
  incorrectCount: number;
  isComplete: boolean;
  selectedOptionId: string | null;
  lastAnswerResult: "correct" | "incorrect" | null;
  lastResult: HijaiyahQuizResult | null;
  activeLetterModal: HijaiyahItem | null;
  activeHarakatFilter: HarakatType;

  startQuizSession: (difficulty: GameDifficulty, lang?: "id" | "en") => void;
  submitAnswer: (optionId: string) => { isCorrect: boolean; isComplete: boolean };
  nextQuestion: () => boolean;
  finishQuiz: (profileId: string) => HijaiyahQuizResult;
  resetSession: () => void;
  openLetterModal: (letter: HijaiyahItem) => void;
  closeLetterModal: () => void;
  setHarakatFilter: (filter: HarakatType) => void;
}

export const useHijaiyahGameStore = create<HijaiyahGameState>((set, get) => ({
  difficulty: "easy",
  questions: [],
  currentIndex: 0,
  correctCount: 0,
  incorrectCount: 0,
  isComplete: false,
  selectedOptionId: null,
  lastAnswerResult: null,
  lastResult: null,
  activeLetterModal: null,
  activeHarakatFilter: "asli",

  startQuizSession: (difficulty: GameDifficulty, lang: "id" | "en" = "id") => {
    const questions = generateHijaiyahQuestions(difficulty, 5, lang);
    set({
      difficulty,
      questions,
      currentIndex: 0,
      correctCount: 0,
      incorrectCount: 0,
      isComplete: false,
      selectedOptionId: null,
      lastAnswerResult: null,
      lastResult: null,
    });
  },

  submitAnswer: (optionId: string) => {
    const { questions, currentIndex, correctCount, incorrectCount } = get();
    const currentQ = questions[currentIndex];
    if (!currentQ) {
      return { isCorrect: false, isComplete: true };
    }

    const isCorrect = optionId === currentQ.correctOptionId;

    if (isCorrect) {
      const newCorrect = correctCount + 1;
      const isComplete = currentIndex >= questions.length - 1;
      set({
        selectedOptionId: optionId,
        lastAnswerResult: "correct",
        correctCount: newCorrect,
        isComplete,
      });
      return { isCorrect: true, isComplete };
    } else {
      const newIncorrect = incorrectCount + 1;
      set({
        selectedOptionId: optionId,
        lastAnswerResult: "incorrect",
        incorrectCount: newIncorrect,
      });
      return { isCorrect: false, isComplete: false };
    }
  },

  nextQuestion: () => {
    const { currentIndex, questions } = get();
    if (currentIndex < questions.length - 1) {
      set({
        currentIndex: currentIndex + 1,
        selectedOptionId: null,
        lastAnswerResult: null,
      });
      return true;
    } else {
      set({ isComplete: true });
      return false;
    }
  },

  finishQuiz: (profileId: string) => {
    const { difficulty, correctCount, incorrectCount, questions } = get();
    const starsEarned = calculateHijaiyahStars(correctCount, questions.length || 5);
    const result: HijaiyahQuizResult = {
      gameId: "hijaiyah",
      profileId,
      difficulty,
      totalQuestions: questions.length || 5,
      correctAnswers: correctCount,
      incorrectAnswers: incorrectCount,
      starsEarned,
      completedAt: new Date().toISOString(),
    };

    set({ lastResult: result, isComplete: true });
    return result;
  },

  resetSession: () => {
    set({
      questions: [],
      currentIndex: 0,
      correctCount: 0,
      incorrectCount: 0,
      isComplete: false,
      selectedOptionId: null,
      lastAnswerResult: null,
      lastResult: null,
      activeLetterModal: null,
    });
  },

  openLetterModal: (letter: HijaiyahItem) => {
    set({ activeLetterModal: letter });
  },

  closeLetterModal: () => {
    set({ activeLetterModal: null });
  },

  setHarakatFilter: (filter: HarakatType) => {
    set({ activeHarakatFilter: filter });
  },
}));
