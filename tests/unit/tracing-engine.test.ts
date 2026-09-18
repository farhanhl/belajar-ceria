import { describe, it, expect } from "vitest";
import {
  getDistance,
  getTracingItemsByCategory,
  getTracingItemById,
  evaluateStrokeProgress,
  calculateTracingStars,
  pointsToSvgPath,
} from "@/games/tracing/lib/tracing-engine";
import { TRACING_ITEMS } from "@/games/tracing/data/tracing-items";

describe("Tracing Engine", () => {
  it("should calculate Euclidean distance accurately", () => {
    expect(getDistance({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(5);
    expect(getDistance({ x: 10, y: 10 }, { x: 10, y: 10 })).toBe(0);
    expect(getDistance({ x: 100, y: 50 }, { x: 100, y: 150 })).toBe(100);
  });

  it("should fetch items filtered by category", () => {
    const lines = getTracingItemsByCategory("lines");
    expect(lines.length).toBeGreaterThanOrEqual(5);
    expect(lines.every((item) => item.category === "lines")).toBe(true);

    const letters = getTracingItemsByCategory("letters");
    expect(letters.length).toBeGreaterThanOrEqual(5);
    expect(letters.every((item) => item.category === "letters")).toBe(true);

    const numbers = getTracingItemsByCategory("numbers");
    expect(numbers.length).toBeGreaterThanOrEqual(5);

    const hijaiyah = getTracingItemsByCategory("hijaiyah");
    expect(hijaiyah.length).toBeGreaterThanOrEqual(4);
  });

  it("should retrieve specific items by id", () => {
    const item = getTracingItemById("line-horiz");
    expect(item).toBeDefined();
    expect(item?.title.id).toBe("Garis Lurus");
    expect(item?.title.en).toBe("Straight Line");
    expect(item?.strokes.length).toBe(1);
  });

  it("should evaluate successful stroke completion along waypoints", () => {
    const item = getTracingItemById("line-horiz")!;
    const stroke = item.strokes[0];

    // User draws accurately through all waypoints
    const drawnPoints = [
      { x: 60, y: 200 },
      { x: 130, y: 200 },
      { x: 200, y: 200 },
      { x: 270, y: 200 },
      { x: 340, y: 200 },
    ];

    const evalResult = evaluateStrokeProgress(drawnPoints, stroke, 40);
    expect(evalResult.isCompleted).toBe(true);
    expect(evalResult.accuracy).toBeGreaterThanOrEqual(90);
    expect(evalResult.hitWaypointsCount).toBe(5);
  });

  it("should reject an incomplete or off-target stroke", () => {
    const item = getTracingItemById("line-horiz")!;
    const stroke = item.strokes[0];

    // User only draws the first 10%
    const drawnPoints = [
      { x: 60, y: 200 },
      { x: 70, y: 200 },
    ];

    const evalResult = evaluateStrokeProgress(drawnPoints, stroke, 40);
    expect(evalResult.isCompleted).toBe(false);
    expect(evalResult.hitWaypointsCount).toBe(1);
  });

  it("should evaluate single-point/dot strokes correctly", () => {
    const item = getTracingItemById("hij-ba")!;
    const dotStroke = item.strokes[1]; // dot under Ba

    // Hit inside tolerance
    const hitPoints = [{ x: 205, y: 342 }];
    const evalHit = evaluateStrokeProgress(hitPoints, dotStroke, 40);
    expect(evalHit.isCompleted).toBe(true);
    expect(evalHit.accuracy).toBe(100);

    // Miss outside tolerance
    const missPoints = [{ x: 50, y: 50 }];
    const evalMiss = evaluateStrokeProgress(missPoints, dotStroke, 40);
    expect(evalMiss.isCompleted).toBe(false);
  });

  it("should calculate correct star ratings based on accuracy", () => {
    expect(calculateTracingStars(95)).toBe(3);
    expect(calculateTracingStars(85)).toBe(3);
    expect(calculateTracingStars(75)).toBe(2);
    expect(calculateTracingStars(65)).toBe(2);
    expect(calculateTracingStars(50)).toBe(1);
    expect(calculateTracingStars(0)).toBe(0);
  });

  it("should convert user points to valid SVG path string", () => {
    const emptyPath = pointsToSvgPath([]);
    expect(emptyPath).toBe("");

    const singlePointPath = pointsToSvgPath([{ x: 10, y: 20 }]);
    expect(singlePointPath).toBe("M 10 20 L 10.1 20.1");

    const multiPointsPath = pointsToSvgPath([
      { x: 10, y: 20 },
      { x: 30, y: 40 },
      { x: 50, y: 60 },
    ]);
    expect(multiPointsPath).toBe("M 10 20 L 30 40 L 50 60");
  });
});
