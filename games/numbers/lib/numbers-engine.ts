import { Difficulty } from "@/types/game";
import {
  NumberOperationMode,
  NumberQuestion,
  NumberQuestionOption,
} from "../types";
import { COUNTABLE_OBJECTS, getRandomCountableObject } from "../data/numbers-data";

/**
 * Fisher-Yates array shuffle
 */
export function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Generate 3 plausible distractor answer options around the correct answer
 */
function generateOptions(correctAnswer: number, maxRange: number): NumberQuestionOption[] {
  const values = new Set<number>([correctAnswer]);

  // Try adjacent numbers: correct - 1, correct + 1, correct + 2, correct - 2
  const deltas = [-1, 1, 2, -2, 3, -3];
  for (const delta of deltas) {
    if (values.size >= 4) break;
    const candidate = correctAnswer + delta;
    if (candidate >= 1 && candidate <= maxRange && candidate !== correctAnswer) {
      values.add(candidate);
    }
  }

  // If still need options, pick random valid numbers
  while (values.size < 4) {
    const rnd = Math.floor(Math.random() * maxRange) + 1;
    values.add(rnd);
  }

  const list = Array.from(values).map((v) => ({
    value: v,
    isCorrect: v === correctAnswer,
  }));

  return shuffleArray(list);
}

/**
 * Generate questions for Numbers & Math
 */
export function generateNumbersQuestions(
  mode: NumberOperationMode,
  difficulty: Difficulty
): NumberQuestion[] {
  const totalQuestions = difficulty === "easy" ? 5 : difficulty === "medium" ? 6 : 8;
  const questions: NumberQuestion[] = [];
  const shuffledObjects = shuffleArray(COUNTABLE_OBJECTS);

  for (let i = 0; i < totalQuestions; i++) {
    const object = shuffledObjects[i % shuffledObjects.length];
    let qMode = mode;

    if (mode === "mixed") {
      qMode = i % 2 === 0 ? "addition" : "subtraction";
    }

    if (qMode === "counting") {
      questions.push(generateCountingQuestion(i, difficulty, object));
    } else if (qMode === "addition") {
      questions.push(generateAdditionQuestion(i, difficulty, object));
    } else if (qMode === "subtraction") {
      questions.push(generateSubtractionQuestion(i, difficulty, object));
    }
  }

  return questions;
}

function generateCountingQuestion(
  index: number,
  difficulty: Difficulty,
  object: import("../types").CountableObject
): NumberQuestion {
  const maxLimit = difficulty === "easy" ? 5 : difficulty === "medium" ? 10 : 15;
  const minLimit = difficulty === "hard" ? 5 : 1;
  const count = Math.floor(Math.random() * (maxLimit - minLimit + 1)) + minLimit;

  const options = generateOptions(count, Math.max(10, maxLimit));

  return {
    id: `q_count_${index + 1}`,
    mode: "counting",
    firstCount: count,
    correctAnswer: count,
    object,
    prompt: {
      id: `Ada berapa ${object.pluralName.id} di bawah ini?`,
      en: `How many ${object.pluralName.en} are there below?`,
    },
    voicePrompt: {
      id: `Ayo hitung ada berapa ${object.name.id} ya!`,
      en: `Let's count how many ${object.pluralName.en} there are!`,
    },
    options,
  };
}

function generateAdditionQuestion(
  index: number,
  difficulty: Difficulty,
  object: import("../types").CountableObject
): NumberQuestion {
  let first = 1;
  let second = 1;
  let maxRange = 6;

  if (difficulty === "easy") {
    // sum <= 5
    first = Math.floor(Math.random() * 3) + 1; // 1 to 3
    second = Math.floor(Math.random() * (5 - first)) + 1; // ensures sum <= 5
    maxRange = 6;
  } else if (difficulty === "medium") {
    // sum <= 10
    first = Math.floor(Math.random() * 6) + 1; // 1 to 6
    second = Math.floor(Math.random() * (10 - first)) + 1; // sum <= 10
    maxRange = 12;
  } else {
    // sum <= 20
    first = Math.floor(Math.random() * 10) + 2; // 2 to 11
    second = Math.floor(Math.random() * (20 - first)) + 1; // sum <= 20
    maxRange = 22;
  }

  const sum = first + second;
  const options = generateOptions(sum, maxRange);

  return {
    id: `q_add_${index + 1}`,
    mode: "addition",
    operation: "+",
    firstCount: first,
    secondCount: second,
    correctAnswer: sum,
    object,
    prompt: {
      id: `${first} ${object.name.id} ditambah ${second} ${object.name.id}, jadi berapa ya?`,
      en: `${first} ${object.pluralName.en} plus ${second} ${object.pluralName.en} equals?`,
    },
    voicePrompt: {
      id: `${first} ${object.name.id} ditambah ${second} ${object.name.id}, berapa semuanya?`,
      en: `${first} ${object.pluralName.en} plus ${second} ${object.pluralName.en}, how many in total?`,
    },
    options,
  };
}

function generateSubtractionQuestion(
  index: number,
  difficulty: Difficulty,
  object: import("../types").CountableObject
): NumberQuestion {
  let first = 2;
  let second = 1;
  let maxRange = 6;

  if (difficulty === "easy") {
    // first <= 5, result >= 1
    first = Math.floor(Math.random() * 4) + 2; // 2 to 5
    second = Math.floor(Math.random() * (first - 1)) + 1; // 1 to first-1
    maxRange = 6;
  } else if (difficulty === "medium") {
    // first <= 10, result >= 1
    first = Math.floor(Math.random() * 7) + 4; // 4 to 10
    second = Math.floor(Math.random() * (first - 1)) + 1;
    maxRange = 12;
  } else {
    // first <= 20, result >= 1
    first = Math.floor(Math.random() * 11) + 10; // 10 to 20
    second = Math.floor(Math.random() * (first - 1)) + 1;
    maxRange = 22;
  }

  const result = first - second;
  const options = generateOptions(result, maxRange);

  return {
    id: `q_sub_${index + 1}`,
    mode: "subtraction",
    operation: "-",
    firstCount: first,
    secondCount: second,
    correctAnswer: result,
    object,
    prompt: {
      id: `Ada ${first} ${object.name.id}, dikurang ${second} ${object.name.id}, sisa berapa ya?`,
      en: `${first} ${object.pluralName.en} minus ${second} ${object.pluralName.en} leaves how many?`,
    },
    voicePrompt: {
      id: `${first} ${object.name.id} dikurang ${second} ${object.name.id}, sisa berapa ya?`,
      en: `${first} ${object.pluralName.en} minus ${second} ${object.pluralName.en}, how many are left?`,
    },
    options,
  };
}

/**
 * Calculate stars earned (1 to 5 stars) with positive reinforcement
 */
export function calculateNumbersStars(
  difficulty: Difficulty,
  totalQuestions: number,
  correctAnswers: number,
  incorrectAnswers: number
): number {
  if (totalQuestions === 0 || correctAnswers === 0) {
    return 1; // 1 star for participating
  }

  const accuracy = correctAnswers / totalQuestions;

  if (accuracy === 1 && incorrectAnswers === 0) {
    return 5;
  } else if (accuracy >= 0.8 && incorrectAnswers <= 2) {
    return 4;
  } else if (accuracy >= 0.6 || correctAnswers >= 3) {
    return 3;
  } else if (correctAnswers >= 1) {
    return 2;
  }
  return 2;
}
