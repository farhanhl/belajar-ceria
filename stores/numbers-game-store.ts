import { create } from "zustand";
import { Difficulty } from "@/types/game";
import {
  NumberOperationMode,
  NumberQuestion,
  NumbersGameResult,
} from "@/games/numbers/types";
import {
  calculateNumbersStars,
  generateNumbersQuestions,
} from "@/games/numbers/lib/numbers-engine";

interface NumbersGameState {
  mode: NumberOperationMode;
  difficulty: Difficulty;
  questions: NumberQuestion[];
  currentQuestionIndex: number;
  selectedOptionValue: number | null;
  countedIndices: number[];
  correctAnswers: number;
  incorrectAnswers: number;
  isAnswered: boolean;
  isCompleted: boolean;
  startTime: number;
  lastResult: NumbersGameResult | null;

  // Actions
  startGame: (mode: NumberOperationMode, difficulty?: Difficulty) => void;
  toggleCountObject: (index: number) => void;
  selectOption: (value: number) => { isCorrect: boolean; isFinished: boolean };
  nextQuestion: () => boolean;
  finishGame: (manualCorrectCount?: number) => NumbersGameResult | null;
  resetGame: () => void;
}

export const useNumbersGameStore = create<NumbersGameState>((set, get) => ({
  mode: "addition",
  difficulty: "easy",
  questions: [],
  currentQuestionIndex: 0,
  selectedOptionValue: null,
  countedIndices: [],
  correctAnswers: 0,
  incorrectAnswers: 0,
  isAnswered: false,
  isCompleted: false,
  startTime: 0,
  lastResult: null,

  startGame: (mode: NumberOperationMode = "addition", difficulty: Difficulty = "easy") => {
    const questions = generateNumbersQuestions(mode, difficulty);
    set({
      mode,
      difficulty,
      questions,
      currentQuestionIndex: 0,
      selectedOptionValue: null,
      countedIndices: [],
      correctAnswers: 0,
      incorrectAnswers: 0,
      isAnswered: false,
      isCompleted: false,
      startTime: Date.now(),
      lastResult: null,
    });
  },

  toggleCountObject: (index: number) => {
    const { countedIndices } = get();
    if (countedIndices.includes(index)) {
      set({ countedIndices: countedIndices.filter((i) => i !== index) });
    } else {
      set({ countedIndices: [...countedIndices, index] });
    }
  },

  selectOption: (value: number) => {
    const { questions, currentQuestionIndex, correctAnswers, incorrectAnswers, isAnswered } = get();
    if (isAnswered || currentQuestionIndex >= questions.length) {
      return { isCorrect: false, isFinished: false };
    }

    const currentQ = questions[currentQuestionIndex];
    const isCorrect = currentQ.correctAnswer === value;

    const newCorrect = isCorrect ? correctAnswers + 1 : correctAnswers;
    const newIncorrect = !isCorrect ? incorrectAnswers + 1 : incorrectAnswers;
    const isFinished = currentQuestionIndex === questions.length - 1 && isCorrect;

    set({
      selectedOptionValue: value,
      isAnswered: isCorrect,
      correctAnswers: newCorrect,
      incorrectAnswers: newIncorrect,
    });

    return { isCorrect, isFinished };
  },

  nextQuestion: () => {
    const { currentQuestionIndex, questions } = get();
    if (currentQuestionIndex < questions.length - 1) {
      set({
        currentQuestionIndex: currentQuestionIndex + 1,
        selectedOptionValue: null,
        countedIndices: [],
        isAnswered: false,
      });
      return true;
    }
    return false;
  },

  finishGame: (manualCorrectCount?: number) => {
    const { mode, difficulty, questions, correctAnswers, incorrectAnswers, startTime } = get();
    const totalQuestions = questions.length;
    const finalCorrect = manualCorrectCount !== undefined ? manualCorrectCount : correctAnswers;
    const timeSpentSeconds = Math.max(1, Math.round((Date.now() - startTime) / 1000));
    const starsEarned = calculateNumbersStars(
      difficulty,
      totalQuestions,
      finalCorrect,
      incorrectAnswers
    );

    const result: NumbersGameResult = {
      mode,
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
    const { mode, difficulty } = get();
    get().startGame(mode, difficulty);
  },
}));
