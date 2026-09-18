import { Difficulty } from "@/types/game";

export type TracingCategory = "lines" | "letters" | "numbers" | "hijaiyah";

export interface TracingWaypoint {
  x: number; // 0 to 100 percentage or coordinate space in 400x400
  y: number;
}

export interface TracingStroke {
  id: string;
  order: number;
  path: string; // SVG path d attribute string (viewBox 0 0 400 400)
  waypoints: TracingWaypoint[]; // Key guidance checkpoints along the stroke
  label?: string; // e.g. "1", "2", "3"
  startHint?: { id: string; en: string }; // Direction hint e.g., "Tarik dari atas ke bawah"
}

export interface TracingItem {
  id: string;
  category: TracingCategory;
  char: string;
  title: { id: string; en: string };
  subtitle?: { id: string; en: string };
  pronunciation?: { id: string; en: string };
  hint?: { id: string; en: string };
  difficulty: Difficulty;
  strokes: TracingStroke[];
}

export interface UserPoint {
  x: number;
  y: number;
  time?: number;
}

export interface CompletedUserStroke {
  strokeId: string;
  points: UserPoint[];
  accuracy: number; // 0 to 100
}

export interface TracingGameResult {
  category: TracingCategory;
  difficulty: Difficulty;
  itemId: string;
  itemChar: string;
  itemTitle: string;
  stars: number;
  accuracy: number;
  timeSpentSeconds: number;
  completedAt: string;
}
