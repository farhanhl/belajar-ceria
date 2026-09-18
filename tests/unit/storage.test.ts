import { describe, it, expect, beforeEach } from "vitest";
import {
  createProfile,
  getProfiles,
  recordGameResult,
  recordAdabGameResult,
  deleteProfile,
} from "@/lib/storage/profile-storage";
import { loadAppData, saveAppData } from "@/lib/storage/storage";
import { DEFAULT_APP_DATA } from "@/types/storage";

// Mock localStorage for node environment
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(globalThis, "window", {
  value: {
    localStorage: localStorageMock,
  },
  writable: true,
});

describe("Storage & Profile Isolation", () => {
  beforeEach(() => {
    localStorageMock.clear();
    saveAppData(DEFAULT_APP_DATA);
  });

  it("should create profile and persist to storage", () => {
    const p1 = createProfile("Fatimah", "girl-1");
    expect(p1.id).toBeDefined();
    expect(p1.name).toBe("Fatimah");

    const profiles = getProfiles();
    expect(profiles).toHaveLength(1);
    expect(profiles[0].name).toBe("Fatimah");
  });

  it("should isolate progress between different child profiles (Profile A != Profile B)", () => {
    const p1 = createProfile("Fatimah", "girl-1");
    const p2 = createProfile("Rizky", "boy-1");

    // Fatimah plays easy game and gets 5 stars
    recordGameResult({
      profileId: p1.id,
      gameId: "matching",
      difficulty: "easy",
      questionsAnswered: 5,
      correctAnswers: 5,
      incorrectAnswers: 0,
      starsEarned: 5,
      completedAt: new Date().toISOString(),
    });

    const profiles = getProfiles();
    const fatimah = profiles.find((p) => p.id === p1.id);
    const rizky = profiles.find((p) => p.id === p2.id);

    expect(fatimah?.progress.matching.easy.stars).toBe(5);
    expect(fatimah?.progress.matching.easy.gamesCompleted).toBe(1);

    // Rizky's progress must be completely untouched and isolated!
    expect(rizky?.progress.matching.easy.stars).toBe(0);
    expect(rizky?.progress.matching.easy.gamesCompleted).toBe(0);
  });

  it("should delete profile correctly", () => {
    const p1 = createProfile("Fatimah", "girl-1");
    const p2 = createProfile("Rizky", "boy-1");
    expect(getProfiles()).toHaveLength(2);

    deleteProfile(p1.id);
    const remaining = getProfiles();
    expect(remaining).toHaveLength(1);
    expect(remaining[0].name).toBe("Rizky");
  });

  it("should record adab game progress accurately", () => {
    const p = createProfile("Aisyah", "girl-2");
    recordAdabGameResult({
      profileId: p.id,
      difficulty: "easy",
      totalQuestions: 4,
      correctAnswers: 4,
      incorrectAnswers: 0,
      starsEarned: 5,
      completedAt: new Date().toISOString(),
    });

    const profiles = getProfiles();
    const aisyah = profiles.find((item) => item.id === p.id);
    expect(aisyah?.progress.adab?.easy.stars).toBe(5);
    expect(aisyah?.progress.adab?.easy.gamesCompleted).toBe(1);
    expect(aisyah?.progress.adab?.easy.correctAnswers).toBe(4);
  });
});
