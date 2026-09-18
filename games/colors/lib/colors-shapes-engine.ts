import { Difficulty } from "@/types/game";
import {
  BasketCategory,
  ColorId,
  ColorShapeOption,
  ColorShapeQuestion,
  QuestionType,
  ShapeId,
} from "../types";
import { COLORS_CATALOG, SHAPES_CATALOG } from "../data/colors-shapes-data";

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
 * Generate game questions based on difficulty
 */
export function generateColorsQuestions(difficulty: Difficulty): ColorShapeQuestion[] {
  switch (difficulty) {
    case "easy":
      return generateEasyQuestions();
    case "medium":
      return generateMediumQuestions();
    case "hard":
      return generateHardQuestions();
    default:
      return generateEasyQuestions();
  }
}

/**
 * Easy: 5 questions focusing on 1 attribute (Color OR Shape), 3 big visual options
 */
function generateEasyQuestions(): ColorShapeQuestion[] {
  const questions: ColorShapeQuestion[] = [];
  const shuffledColors = shuffleArray(COLORS_CATALOG);
  const shuffledShapes = shuffleArray(SHAPES_CATALOG);

  // 3 Color questions + 2 Shape questions
  for (let i = 0; i < 3; i++) {
    const targetColor = shuffledColors[i % shuffledColors.length];
    const commonShape = shuffledShapes[i % shuffledShapes.length].id;

    // Distractor colors
    const otherColors = shuffledColors.filter((c) => c.id !== targetColor.id);
    const distractorColors = shuffleArray(otherColors).slice(0, 2);

    const options: ColorShapeOption[] = shuffleArray([
      {
        id: `opt_${targetColor.id}_${commonShape}`,
        colorId: targetColor.id,
        shapeId: commonShape,
        isCorrect: true,
      },
      ...distractorColors.map((dc) => ({
        id: `opt_${dc.id}_${commonShape}`,
        colorId: dc.id,
        shapeId: commonShape,
        isCorrect: false,
      })),
    ]);

    questions.push({
      id: `q_easy_color_${i + 1}`,
      type: "find_color",
      targetColorId: targetColor.id,
      prompt: {
        id: `Mana benda yang berwarna ${targetColor.name.id}?`,
        en: `Which object is ${targetColor.name.en}?`,
      },
      voicePrompt: {
        id: `Ayo cari yang berwarna ${targetColor.name.id}!`,
        en: `Find the one that is ${targetColor.name.en}!`,
      },
      options,
    });
  }

  for (let i = 0; i < 2; i++) {
    const targetShape = shuffledShapes[i % shuffledShapes.length];
    const commonColor = shuffledColors[(i + 3) % shuffledColors.length].id;

    const otherShapes = shuffledShapes.filter((s) => s.id !== targetShape.id);
    const distractorShapes = shuffleArray(otherShapes).slice(0, 2);

    const options: ColorShapeOption[] = shuffleArray([
      {
        id: `opt_${commonColor}_${targetShape.id}`,
        colorId: commonColor,
        shapeId: targetShape.id,
        isCorrect: true,
      },
      ...distractorShapes.map((ds) => ({
        id: `opt_${commonColor}_${ds.id}`,
        colorId: commonColor,
        shapeId: ds.id,
        isCorrect: false,
      })),
    ]);

    questions.push({
      id: `q_easy_shape_${i + 1}`,
      type: "find_shape",
      targetShapeId: targetShape.id,
      prompt: {
        id: `Mana bentuk ${targetShape.name.id}?`,
        en: `Which shape is the ${targetShape.name.en}?`,
      },
      voicePrompt: {
        id: `Bantu Ibu Guru mencari bentuk ${targetShape.name.id} ya!`,
        en: `Help teacher find the ${targetShape.name.en}!`,
      },
      options,
    });
  }

  return shuffleArray(questions);
}

/**
 * Medium: 6 questions with 2-attributes combo (Color + Shape) & shape matching with 4 choices
 */
function generateMediumQuestions(): ColorShapeQuestion[] {
  const questions: ColorShapeQuestion[] = [];
  const shuffledColors = shuffleArray(COLORS_CATALOG);
  const shuffledShapes = shuffleArray(SHAPES_CATALOG);

  for (let i = 0; i < 6; i++) {
    const targetColor = shuffledColors[i % shuffledColors.length];
    const targetShape = shuffledShapes[i % shuffledShapes.length];

    // Create 3 distractors:
    // 1: Same color, different shape
    // 2: Different color, same shape
    // 3: Different color, different shape
    const otherColors = shuffledColors.filter((c) => c.id !== targetColor.id);
    const otherShapes = shuffledShapes.filter((s) => s.id !== targetShape.id);

    const d1Color = targetColor.id;
    const d1Shape = otherShapes[0].id;

    const d2Color = otherColors[0].id;
    const d2Shape = targetShape.id;

    const d3Color = otherColors[1 % otherColors.length].id;
    const d3Shape = otherShapes[1 % otherShapes.length].id;

    const options: ColorShapeOption[] = shuffleArray([
      {
        id: `opt_med_correct_${i}`,
        colorId: targetColor.id,
        shapeId: targetShape.id,
        isCorrect: true,
      },
      {
        id: `opt_med_d1_${i}`,
        colorId: d1Color,
        shapeId: d1Shape,
        isCorrect: false,
      },
      {
        id: `opt_med_d2_${i}`,
        colorId: d2Color,
        shapeId: d2Shape,
        isCorrect: false,
      },
      {
        id: `opt_med_d3_${i}`,
        colorId: d3Color,
        shapeId: d3Shape,
        isCorrect: false,
      },
    ]);

    const isSilhouette = i % 2 === 1;

    questions.push({
      id: `q_med_${i + 1}`,
      type: isSilhouette ? "shape_silhouette" : "combo_match",
      targetColorId: targetColor.id,
      targetShapeId: targetShape.id,
      prompt: {
        id: isSilhouette
          ? `Cocokkan bentuk ${targetShape.name.id} berwarna ${targetColor.name.id}!`
          : `Cari bentuk ${targetShape.name.id} yang berwarna ${targetColor.name.id}!`,
        en: `Find the ${targetColor.name.en} ${targetShape.name.en}!`,
      },
      voicePrompt: {
        id: `Ayo cari ${targetShape.name.id} ${targetColor.name.id}!`,
        en: `Find the ${targetColor.name.en} ${targetShape.name.en}!`,
      },
      options,
    });
  }

  return questions;
}

/**
 * Hard: 6 interactive basket sorting questions (putting multiple items in the right color or shape basket)
 */
function generateHardQuestions(): ColorShapeQuestion[] {
  const questions: ColorShapeQuestion[] = [];
  const shuffledColors = shuffleArray(COLORS_CATALOG);
  const shuffledShapes = shuffleArray(SHAPES_CATALOG);

  for (let q = 0; q < 6; q++) {
    const isColorSort = q % 2 === 0;

    if (isColorSort) {
      // 2 color baskets
      const color1 = shuffledColors[(q * 2) % shuffledColors.length];
      const color2 = shuffledColors[(q * 2 + 1) % shuffledColors.length];

      const baskets: BasketCategory[] = [
        {
          id: `basket_${color1.id}`,
          title: { id: `Keranjang ${color1.name.id}`, en: `${color1.name.en} Basket` },
          type: "color",
          targetId: color1.id,
          colorHex: color1.hex,
        },
        {
          id: `basket_${color2.id}`,
          title: { id: `Keranjang ${color2.name.id}`, en: `${color2.name.en} Basket` },
          type: "color",
          targetId: color2.id,
          colorHex: color2.hex,
        },
      ];

      // 4 sorting items (2 of color1, 2 of color2)
      const sortingItems = shuffleArray([
        {
          id: `sort_item_${q}_1`,
          colorId: color1.id,
          shapeId: shuffledShapes[0].id,
          correctBasketId: baskets[0].id,
          assignedBasketId: null,
        },
        {
          id: `sort_item_${q}_2`,
          colorId: color1.id,
          shapeId: shuffledShapes[1].id,
          correctBasketId: baskets[0].id,
          assignedBasketId: null,
        },
        {
          id: `sort_item_${q}_3`,
          colorId: color2.id,
          shapeId: shuffledShapes[2].id,
          correctBasketId: baskets[1].id,
          assignedBasketId: null,
        },
        {
          id: `sort_item_${q}_4`,
          colorId: color2.id,
          shapeId: shuffledShapes[3].id,
          correctBasketId: baskets[1].id,
          assignedBasketId: null,
        },
      ]);

      questions.push({
        id: `q_hard_${q + 1}`,
        type: "sort_baskets",
        prompt: {
          id: `Kelompokkan benda ke dalam Keranjang ${color1.name.id} dan ${color2.name.id}!`,
          en: `Sort the items into the ${color1.name.en} and ${color2.name.en} baskets!`,
        },
        voicePrompt: {
          id: `Masukkan benda sesuai warna keranjangnya ya!`,
          en: `Put the items in the matching colored basket!`,
        },
        options: [],
        baskets,
        sortingItems,
      });
    } else {
      // 2 shape baskets
      const shape1 = shuffledShapes[(q * 2) % shuffledShapes.length];
      const shape2 = shuffledShapes[(q * 2 + 1) % shuffledShapes.length];
      const commonColor = shuffledColors[q % shuffledColors.length];

      const baskets: BasketCategory[] = [
        {
          id: `basket_${shape1.id}`,
          title: { id: `Wadah ${shape1.name.id}`, en: `${shape1.name.en} Box` },
          type: "shape",
          targetId: shape1.id,
        },
        {
          id: `basket_${shape2.id}`,
          title: { id: `Wadah ${shape2.name.id}`, en: `${shape2.name.en} Box` },
          type: "shape",
          targetId: shape2.id,
        },
      ];

      const sortingItems = shuffleArray([
        {
          id: `sort_item_${q}_1`,
          colorId: shuffledColors[0].id,
          shapeId: shape1.id,
          correctBasketId: baskets[0].id,
          assignedBasketId: null,
        },
        {
          id: `sort_item_${q}_2`,
          colorId: shuffledColors[1].id,
          shapeId: shape1.id,
          correctBasketId: baskets[0].id,
          assignedBasketId: null,
        },
        {
          id: `sort_item_${q}_3`,
          colorId: shuffledColors[2].id,
          shapeId: shape2.id,
          correctBasketId: baskets[1].id,
          assignedBasketId: null,
        },
        {
          id: `sort_item_${q}_4`,
          colorId: shuffledColors[3].id,
          shapeId: shape2.id,
          correctBasketId: baskets[1].id,
          assignedBasketId: null,
        },
      ]);

      questions.push({
        id: `q_hard_${q + 1}`,
        type: "sort_baskets",
        prompt: {
          id: `Kelompokkan benda ke Wadah ${shape1.name.id} dan ${shape2.name.id}!`,
          en: `Sort items into the ${shape1.name.en} and ${shape2.name.en} boxes!`,
        },
        voicePrompt: {
          id: `Masukkan benda sesuai bentuk wadahnya ya!`,
          en: `Put items in the matching shape box!`,
        },
        options: [],
        baskets,
        sortingItems,
      });
    }
  }

  return questions;
}

/**
 * Calculate stars earned (1 to 5 stars) with positive reinforcement
 */
export function calculateColorsStars(
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
