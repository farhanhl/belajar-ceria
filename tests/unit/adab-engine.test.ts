import { describe, it, expect } from "vitest";
import {
  getScenariosByCategory,
  getScenarioById,
  calculateAdabStars,
  getAllDailyDoas,
} from "@/games/adab/lib/adab-engine";
import { ADAB_SCENARIOS, DAILY_DOAS } from "@/games/adab/data/adab-data";

describe("Adab & Kebiasaan Baik Engine", () => {
  it("should fetch scenarios correctly filtered by category", () => {
    const eatingScenarios = getScenariosByCategory("eating");
    expect(eatingScenarios.length).toBeGreaterThanOrEqual(3);
    expect(eatingScenarios.every((s) => s.category === "eating")).toBe(true);

    const speechScenarios = getScenariosByCategory("speech");
    expect(speechScenarios.length).toBeGreaterThanOrEqual(3);
    expect(speechScenarios.every((s) => s.category === "speech")).toBe(true);

    const cleanScenarios = getScenariosByCategory("cleanliness");
    expect(cleanScenarios.length).toBeGreaterThanOrEqual(3);

    const sleepScenarios = getScenariosByCategory("sleeping");
    expect(sleepScenarios.length).toBeGreaterThanOrEqual(2);

    const shareScenarios = getScenariosByCategory("sharing");
    expect(shareScenarios.length).toBeGreaterThanOrEqual(3);
  });

  it("should retrieve a specific scenario by id", () => {
    const scenario = getScenarioById("eat-wash-hands");
    expect(scenario).toBeDefined();
    expect(scenario?.title.id).toBe("Sebelum Makan");
    expect(scenario?.title.en).toBe("Before Eating");
    expect(scenario?.choices.length).toBe(2);

    const correctChoice = scenario?.choices.find((c) => c.isCorrect);
    expect(correctChoice).toBeDefined();
  });

  it("should return undefined for a non-existent scenario id", () => {
    const nonExistent = getScenarioById("non-existent-id");
    expect(nonExistent).toBeUndefined();
  });

  it("should calculate correct star ratings based on answered ratio", () => {
    expect(calculateAdabStars(5, 5)).toBe(5);
    expect(calculateAdabStars(4, 5)).toBe(4);
    expect(calculateAdabStars(3, 5)).toBe(3);
    expect(calculateAdabStars(2, 5)).toBe(2);
    expect(calculateAdabStars(1, 5)).toBe(1);
    expect(calculateAdabStars(0, 5)).toBe(1);
    expect(calculateAdabStars(0, 0)).toBe(0);
  });

  it("should retrieve all daily prayers (doas) with Arabic and Latin text", () => {
    const doas = getAllDailyDoas();
    expect(doas.length).toBeGreaterThanOrEqual(5);

    doas.forEach((doa) => {
      expect(doa.arabic).toBeDefined();
      expect(doa.latin).toBeDefined();
      expect(doa.translation.id).toBeDefined();
      expect(doa.translation.en).toBeDefined();
    });
  });
});
