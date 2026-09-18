import { create } from "zustand";
import { Difficulty, GameResult } from "@/types/game";
import { MatchingQuestion } from "@/types/game";
import { generateGameSession, checkAnswer, createGameResult } from "@/games/matching/matching-engine";

interface GameState {
  gameId: "matching";
  difficulty: Difficulty;
  questions: MatchingQuestion[];
  currentIndex: number;
  correctCount: number;
  incorrectCount: number;
  isComplete: boolean;
  selectedOptionId: string | null;
  lastAnswerResult: "correct" | "incorrect" | null;
  lastGameResult: GameResult | null;

  startSession: (difficulty: Difficulty) => void;
  submitAnswer: (optionId: string) => { isCorrect: boolean; isComplete: boolean };
  nextQuestion: () => boolean; // returns true if has next, false if finished
  finishGame: (profileId: string) => GameResult;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  gameId: "matching",
  difficulty: "easy",
  questions: [],
  currentIndex: 0,
  correctCount: 0,
  incorrectCount: 0,
  isComplete: false,
  selectedOptionId: null,
  lastAnswerResult: null,
  lastGameResult: null,

  startSession: (difficulty: Difficulty) => {
    const questions = generateGameSession(difficulty);
    set({
      difficulty,
      questions,
      currentIndex: 0,
      correctCount: 0,
      incorrectCount: 0,
      isComplete: false,
      selectedOptionId: null,
      lastAnswerResult: null,
      lastGameResult: null,
    });
  },

  submitAnswer: (optionId: string) => {
    const { questions, currentIndex, correctCount, incorrectCount } = get();
    const currentQ = questions[currentIndex];
    if (!currentQ) {
      return { isCorrect: false, isComplete: true };
    }

    const isCorrect = checkAnswer(currentQ, optionId);

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

  finishGame: (profileId: string) => {
    const { difficulty, correctCount, incorrectCount } = get();
    const result = createGameResult(profileId, difficulty, correctCount, incorrectCount);
    set({ lastGameResult: result, isComplete: true });
    return result;
  },

  resetGame: () => {
    set({
      questions: [],
      currentIndex: 0,
      correctCount: 0,
      incorrectCount: 0,
      isComplete: false,
      selectedOptionId: null,
      lastAnswerResult: null,
      lastGameResult: null,
    });
  },
}));
