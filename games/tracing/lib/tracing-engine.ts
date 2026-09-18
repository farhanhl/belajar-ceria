import { Difficulty } from "@/types/game";
import { TRACING_ITEMS } from "../data/tracing-items";
import {
  TracingCategory,
  TracingItem,
  TracingStroke,
  TracingWaypoint,
  UserPoint,
} from "../types";

/**
 * Calculate Euclidean distance between two points
 */
export function getDistance(
  p1: { x: number; y: number },
  p2: { x: number; y: number }
): number {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

/**
 * Get items filtered by category
 */
export function getTracingItemsByCategory(category: TracingCategory): TracingItem[] {
  return TRACING_ITEMS.filter((item) => item.category === category);
}

/**
 * Get items filtered by category and difficulty
 */
export function getTracingItems(
  category: TracingCategory,
  difficulty?: Difficulty
): TracingItem[] {
  const items = getTracingItemsByCategory(category);
  if (!difficulty) return items;
  return items.filter((item) => item.difficulty === difficulty);
}

/**
 * Get a specific tracing item by id
 */
export function getTracingItemById(id: string): TracingItem | undefined {
  return TRACING_ITEMS.find((item) => item.id === id);
}

/**
 * Evaluate if the user's drawn points successfully completed a target stroke
 */
export function evaluateStrokeProgress(
  userPoints: UserPoint[],
  targetStroke: TracingStroke,
  toleranceRadius: number = 45
): {
  isCompleted: boolean;
  accuracy: number;
  hitWaypointsCount: number;
  totalWaypoints: number;
  activeWaypointIndex: number;
} {
  const { waypoints } = targetStroke;
  if (!waypoints || waypoints.length === 0) {
    return {
      isCompleted: true,
      accuracy: 100,
      hitWaypointsCount: 0,
      totalWaypoints: 0,
      activeWaypointIndex: 0,
    };
  }

  // Special case: Single-point / dot strokes (like Hijaiyah dots)
  if (waypoints.length === 1) {
    const dot = waypoints[0];
    const isHit = userPoints.some((p) => getDistance(p, dot) <= toleranceRadius);
    return {
      isCompleted: isHit,
      accuracy: isHit ? 100 : 0,
      hitWaypointsCount: isHit ? 1 : 0,
      totalWaypoints: 1,
      activeWaypointIndex: isHit ? 1 : 0,
    };
  }

  // Multi-waypoint strokes
  let currentWaypointIndex = 0;
  let totalDistanceDeviation = 0;
  let deviationChecks = 0;

  for (const point of userPoints) {
    if (currentWaypointIndex >= waypoints.length) break;

    const targetWaypoint = waypoints[currentWaypointIndex];
    const distance = getDistance(point, targetWaypoint);

    if (distance <= toleranceRadius) {
      totalDistanceDeviation += distance;
      deviationChecks++;
      currentWaypointIndex++;
    }
  }

  const hitRatio = currentWaypointIndex / waypoints.length;
  // Stroke is considered completed if user passed at least 80% of waypoints in order
  const isCompleted = hitRatio >= 0.8;

  // Calculate average deviation accuracy (0-100)
  let accuracy = Math.round(hitRatio * 100);
  if (isCompleted && deviationChecks > 0) {
    const avgDeviation = totalDistanceDeviation / deviationChecks;
    // Deviation penalty: 0 dev -> 100%, toleranceRadius dev -> 70%
    const precisionScore = Math.max(0, 100 - (avgDeviation / toleranceRadius) * 30);
    accuracy = Math.round(precisionScore);
  }

  return {
    isCompleted,
    accuracy: Math.min(100, Math.max(0, accuracy)),
    hitWaypointsCount: currentWaypointIndex,
    totalWaypoints: waypoints.length,
    activeWaypointIndex: currentWaypointIndex,
  };
}

/**
 * Calculate stars based on accuracy and completion
 */
export function calculateTracingStars(accuracy: number): number {
  if (accuracy >= 85) return 3;
  if (accuracy >= 65) return 2;
  if (accuracy > 0) return 1;
  return 0;
}

/**
 * Convert raw SVG points array to an SVG path 'd' string
 */
export function pointsToSvgPath(points: UserPoint[]): string {
  if (!points || points.length === 0) return "";
  if (points.length === 1) {
    return `M ${points[0].x} ${points[0].y} L ${points[0].x + 0.1} ${points[0].y + 0.1}`;
  }

  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    path += ` L ${points[i].x} ${points[i].y}`;
  }
  return path;
}
