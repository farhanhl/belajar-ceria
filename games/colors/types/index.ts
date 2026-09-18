import { Difficulty } from "@/types/game";

export type ColorId =
  | "red"
  | "blue"
  | "yellow"
  | "green"
  | "orange"
  | "purple"
  | "pink"
  | "brown";

export type ShapeId =
  | "circle"
  | "square"
  | "triangle"
  | "rectangle"
  | "star"
  | "heart"
  | "oval"
  | "diamond";

export interface ColorItem {
  id: ColorId;
  name: {
    id: string;
    en: string;
  };
  hex: string;
  gradient: string;
  textColor: string;
  badgeBorder: string;
  realWorldExamples: {
    id: string;
    name: { id: string; en: string };
    emoji: string;
    description: { id: string; en: string };
  }[];
}

export interface ShapeItem {
  id: ShapeId;
  name: {
    id: string;
    en: string;
  };
  sidesCount: number; // 0 for circle, etc.
  description: {
    id: string;
    en: string;
  };
  realWorldExamples: {
    id: string;
    name: { id: string; en: string };
    emoji: string;
    description: { id: string; en: string };
  }[];
}

export type ColorShapeMode = "explore" | "play";

export type QuestionType =
  | "find_color" // e.g. "Mana yang berwarna Merah?"
  | "find_shape" // e.g. "Mana yang berbentuk Segitiga?"
  | "combo_match" // e.g. "Cari Bintang Kuning!"
  | "shape_silhouette" // e.g. "Cocokkan bentuk ke dalam bayangan"
  | "sort_baskets"; // e.g. "Kelompokkan benda ke keranjang Merah dan Biru"

export interface ColorShapeOption {
  id: string;
  colorId: ColorId;
  shapeId: ShapeId;
  label?: { id: string; en: string };
  isCorrect?: boolean;
}

export interface BasketCategory {
  id: string;
  title: { id: string; en: string };
  type: "color" | "shape";
  targetId: ColorId | ShapeId;
  colorHex?: string;
}

export interface ColorShapeQuestion {
  id: string;
  type: QuestionType;
  prompt: {
    id: string;
    en: string;
  };
  voicePrompt: {
    id: string;
    en: string;
  };
  targetColorId?: ColorId;
  targetShapeId?: ShapeId;
  options: ColorShapeOption[];
  baskets?: BasketCategory[]; // for sorting mode
  sortingItems?: {
    id: string;
    colorId: ColorId;
    shapeId: ShapeId;
    assignedBasketId?: string | null;
    correctBasketId: string;
  }[];
}

export interface ColorsGameResult {
  difficulty: Difficulty;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  starsEarned: number;
  timeSpentSeconds: number;
  completedAt: string;
}
