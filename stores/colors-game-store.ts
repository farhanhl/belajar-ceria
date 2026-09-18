import { create } from "zustand";
import { Difficulty } from "@/types/game";
import { ColorShapeQuestion, ColorsGameResult } from "@/games/colors/types";
import {
  calculateColorsStars,
  generateColorsQuestions,
} from "@/games/colors/lib/colors-shapes-engine";

interface ColorsGameState {
  difficulty: Difficulty;
  questions: ColorShapeQuestion[];
  currentQuestionIndex: number;
  selectedOptionId: string | null;
  correctAnswers: number;
  incorrectAnswers: number;
  isAnswered: boolean;
  isCompleted: boolean;
  startTime: number;
  lastResult: ColorsGameResult | null;

  // Actions
  startGame: (difficulty?: Difficulty) => void;
  selectOption: (optionId: string) => { isCorrect: boolean; isFinished: boolean };
  assignItemToBasket: (itemId: string, basketId: string) => { isCorrect: boolean; isAllSorted: boolean };
  nextQuestion: () => boolean;
  finishGame: (manualCorrectCount?: number) => ColorsGameResult | null;
  resetGame: () => void;
}

export const useColorsGameStore = create<ColorsGameState>((set, get) => ({
  difficulty: "easy",
  questions: [],
  currentQuestionIndex: 0,
  selectedOptionId: null,
  correctAnswers: 0,
  incorrectAnswers: 0,
  isAnswered: false,
  isCompleted: false,
  startTime: 0,
  lastResult: null,

  startGame: (difficulty: Difficulty = "easy") => {
    const questions = generateColorsQuestions(difficulty);
    set({
      difficulty,
      questions,
      currentQuestionIndex: 0,
      selectedOptionId: null,
      correctAnswers: 0,
      incorrectAnswers: 0,
      isAnswered: false,
      isCompleted: false,
      startTime: Date.now(),
      lastResult: null,
    });
  },

  selectOption: (optionId: string) => {
    const { questions, currentQuestionIndex, correctAnswers, incorrectAnswers, isAnswered } = get();
    if (isAnswered || currentQuestionIndex >= questions.length) {
      return { isCorrect: false, isFinished: false };
    }

    const currentQ = questions[currentQuestionIndex];
    const selectedOpt = currentQ.options.find((opt) => opt.id === optionId);
    const isCorrect = !!selectedOpt?.isCorrect;

    const newCorrect = isCorrect ? correctAnswers + 1 : correctAnswers;
    const newIncorrect = !isCorrect ? incorrectAnswers + 1 : incorrectAnswers;
    const isFinished = currentQuestionIndex === questions.length - 1 && isCorrect;

    set({
      selectedOptionId: optionId,
      isAnswered: isCorrect,
      correctAnswers: newCorrect,
      incorrectAnswers: newIncorrect,
    });

    return { isCorrect, isFinished };
  },

  assignItemToBasket: (itemId: string, basketId: string) => {
    const { questions, currentQuestionIndex, correctAnswers, incorrectAnswers } = get();
    const currentQ = questions[currentQuestionIndex];
    if (!currentQ || currentQ.type !== "sort_baskets" || !currentQ.sortingItems) {
      return { isCorrect: false, isAllSorted: false };
    }

    const itemIndex = currentQ.sortingItems.findIndex((it) => it.id === itemId);
    if (itemIndex === -1) return { isCorrect: false, isAllSorted: false };

    const item = currentQ.sortingItems[itemIndex];
    const isCorrect = item.correctBasketId === basketId;

    if (isCorrect) {
      const updatedItems = currentQ.sortingItems.map((it) =>
        it.id === itemId ? { ...it, assignedBasketId: basketId } : it
      );
      const isAllSorted = updatedItems.every((it) => it.assignedBasketId !== null && it.assignedBasketId !== undefined);

      const updatedQuestions = questions.map((q, idx) =>
        idx === currentQuestionIndex ? { ...q, sortingItems: updatedItems } : q
      );

      const newCorrect = isAllSorted ? correctAnswers + 1 : correctAnswers;

      set({
        questions: updatedQuestions,
        correctAnswers: newCorrect,
        isAnswered: isAllSorted,
      });

      return { isCorrect: true, isAllSorted };
    } else {
      set({
        incorrectAnswers: incorrectAnswers + 1,
      });
      return { isCorrect: false, isAllSorted: false };
    }
  },

  nextQuestion: () => {
    const { currentQuestionIndex, questions } = get();
    if (currentQuestionIndex < questions.length - 1) {
      set({
        currentQuestionIndex: currentQuestionIndex + 1,
        selectedOptionId: null,
        isAnswered: false,
      });
      return true;
    }
    return false;
  },

  finishGame: (manualCorrectCount?: number) => {
    const { difficulty, questions, correctAnswers, incorrectAnswers, startTime } = get();
    const totalQuestions = questions.length;
    const finalCorrect = manualCorrectCount !== undefined ? manualCorrectCount : correctAnswers;
    const timeSpentSeconds = Math.max(1, Math.round((Date.now() - startTime) / 1000));
    const starsEarned = calculateColorsStars(
      difficulty,
      totalQuestions,
      finalCorrect,
      incorrectAnswers
    );

    const result: ColorsGameResult = {
      difficulty,
      totalQuestions,
      correctAnswers: finalCorrect,
      incorrectAnswers,
      starsEarned,
      timeSpentSeconds,
      completedAt: new Date().toISOString(),
    };

    set({ lastResult: result, isCompleted: true });
    return result;
  },

  resetGame: () => {
    const { difficulty } = get();
    get().startGame(difficulty);
  },
}));
