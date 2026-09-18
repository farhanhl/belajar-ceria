import { describe, it, expect } from "vitest";
import {
  createDetectiveMission,
  inspectItem,
  activateDetectiveHint,
  calculateDetectiveStars,
} from "@/games/detective/lib/detective-engine";
import { DETECTIVE_SCENES } from "@/games/detective/data/detective-scenes";

describe("Detective Engine", () => {
  it("should create a detective mission with correct target counts for each difficulty", () => {
    const easyMission = createDetectiveMission("playground", "easy");
    expect(easyMission.targetItems.length).toBe(3);
    expect(easyMission.hintsRemaining).toBe(3);
    expect(easyMission.foundItemIds.length).toBe(0);
    expect(easyMission.isCompleted).toBe(false);

    const medMission = createDetectiveMission("playground", "medium");
    expect(medMission.targetItems.length).toBe(4);
    expect(medMission.hintsRemaining).toBe(2);

    const hardMission = createDetectiveMission("playground", "hard");
    expect(hardMission.targetItems.length).toBe(5);
    expect(hardMission.hintsRemaining).toBe(1);
  });

  it("should correctly discover target items and complete mission", () => {
    const mission = createDetectiveMission("playground", "easy");
    const target1 = mission.targetItems[0];
    const target2 = mission.targetItems[1];
    const target3 = mission.targetItems[2];

    const res1 = inspectItem(mission, target1.id);
    expect(res1.isTarget).toBe(true);
    expect(res1.isNewlyFound).toBe(true);
    expect(res1.isCompleted).toBe(false);
    expect(res1.updatedMission.foundItemIds).toContain(target1.id);

    const res2 = inspectItem(res1.updatedMission, target2.id);
    expect(res2.isTarget).toBe(true);
    expect(res2.isNewlyFound).toBe(true);
    expect(res2.isCompleted).toBe(false);

    const res3 = inspectItem(res2.updatedMission, target3.id);
    expect(res3.isTarget).toBe(true);
    expect(res3.isNewlyFound).toBe(true);
    expect(res3.isCompleted).toBe(true);
    expect(res3.updatedMission.isCompleted).toBe(true);
    expect(res3.updatedMission.earnedStars).toBeGreaterThanOrEqual(1);
  });

  it("should track mistakes count when non-target items are clicked", () => {
    const mission = createDetectiveMission("playground", "easy");
    // Find an item in the scene that is NOT a target item
    const nonTarget = mission.scene.items.find(
      (item) => !mission.targetItems.some((t) => t.id === item.id)
    );

    expect(nonTarget).toBeDefined();
    if (nonTarget) {
      const res = inspectItem(mission, nonTarget.id);
      expect(res.isTarget).toBe(false);
      expect(res.isNewlyFound).toBe(false);
      expect(res.updatedMission.mistakesCount).toBe(1);
    }
  });

  it("should activate hints for unfound items and decrement hints remaining", () => {
    const mission = createDetectiveMission("playground", "easy");
    expect(mission.hintsRemaining).toBe(3);

    const hintRes = activateDetectiveHint(mission);
    expect(hintRes.success).toBe(true);
    expect(hintRes.hintItem).toBeDefined();
    expect(hintRes.updatedMission.hintsRemaining).toBe(2);
    expect(hintRes.updatedMission.activeHintItemId).toBe(hintRes.hintItem?.id);
  });

  it("should calculate appropriate star ratings", () => {
    // 0 mistakes, 0 hints -> 5 stars
    expect(calculateDetectiveStars("easy", 3, 0, 0)).toBe(5);

    // 2 mistakes -> 4 stars
    expect(calculateDetectiveStars("easy", 3, 2, 0)).toBe(4);

    // 4 mistakes and 2 hints -> 2 stars
    expect(calculateDetectiveStars("easy", 3, 4, 2)).toBe(2);
  });
});
