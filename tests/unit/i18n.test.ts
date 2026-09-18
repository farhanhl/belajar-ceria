import { describe, it, expect } from "vitest";
import { getTranslation } from "@/lib/i18n";
import { id } from "@/lib/i18n/id";
import { en } from "@/lib/i18n/en";

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

  it("should have matching translation keys between Indonesian and English dictionaries", () => {
    function getKeys(obj: Record<string, any>, prefix = ""): string[] {
      return Object.keys(obj).reduce((res: string[], el) => {
        if (Array.isArray(obj[el])) {
          return [...res, prefix + el];
        } else if (typeof obj[el] === "object" && obj[el] !== null) {
          return [...res, ...getKeys(obj[el], prefix + el + ".")];
        }
        return [...res, prefix + el];
      }, []);
    }

    const idKeys = getKeys(id).sort();
    const enKeys = getKeys(en).sort();

    const missingInEn = idKeys.filter((k) => !enKeys.includes(k));
    const missingInId = enKeys.filter((k) => !idKeys.includes(k));

    if (missingInEn.length > 0) {
      console.log("Missing in en.ts:", missingInEn);
    }
    if (missingInId.length > 0) {
      console.log("Missing in id.ts:", missingInId);
    }

    expect(missingInEn).toEqual([]);
    expect(missingInId).toEqual([]);
  });
});
