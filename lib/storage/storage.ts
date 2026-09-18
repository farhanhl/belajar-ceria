import { AppData, AppDataSchema, DEFAULT_APP_DATA } from "@/types/storage";

const STORAGE_KEY = "belajar-ceria:data";

/**
 * Checks if browser environment is available for localStorage
 */
export function isStorageAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const testKey = "__test_storage__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Safely loads application data from localStorage with Zod validation and fallback
 */
export function loadAppData(): AppData {
  if (!isStorageAvailable()) {
    return DEFAULT_APP_DATA;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveAppData(DEFAULT_APP_DATA);
      return DEFAULT_APP_DATA;
    }

    const parsed = JSON.parse(raw);
    const validated = AppDataSchema.safeParse(parsed);

    if (validated.success) {
      return validated.data;
    } else {
      console.warn("Storage validation warnings, repairing data:", validated.error);
      // Fallback repair: keep what we can, merge with default
      const repaired: AppData = {
        ...DEFAULT_APP_DATA,
        version: typeof parsed.version === "number" ? parsed.version : 1,
        profiles: Array.isArray(parsed.profiles) ? parsed.profiles : [],
        activeProfileId: typeof parsed.activeProfileId === "string" ? parsed.activeProfileId : null,
        settings: {
          ...DEFAULT_APP_DATA.settings,
          ...(parsed.settings || {}),
        },
      };
      saveAppData(repaired);
      return repaired;
    }
  } catch (err) {
    console.error("Failed to load app data from localStorage:", err);
    return DEFAULT_APP_DATA;
  }
}

/**
 * Safely saves application data to localStorage
 */
export function saveAppData(data: AppData): boolean {
  if (!isStorageAvailable()) return false;
  try {
    const serialized = JSON.stringify(data);
    window.localStorage.setItem(STORAGE_KEY, serialized);
    return true;
  } catch (err) {
    console.error("Failed to save app data to localStorage:", err);
    return false;
  }
}
