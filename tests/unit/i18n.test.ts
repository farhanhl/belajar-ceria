import { describe, it, expect } from "vitest";
import { getTranslation } from "@/lib/i18n";

describe("i18n Localization", () => {
  it("should return Indonesian translation by default", () => {
    const text = getTranslation("app.title", {}, "id");
    expect(text).toBe("Belajar Ceria");
  });

  it("should interpolate parameter values in strings", () => {
    const text = getTranslation("onboarding.welcomeTeacher", { name: "Fatimah" }, "id");
    expect(text).toContain("Fatimah");
    expect(text).toContain("Selamat datang, Fatimah!");
  });

  it("should return English translation when selected", () => {
    const text = getTranslation("app.tagline", {}, "en");
    expect(text).toBe("Learning made joyful!");
  });
});
