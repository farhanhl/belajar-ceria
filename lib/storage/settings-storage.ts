import { AppSettings, DEFAULT_SETTINGS } from "@/types/settings";
import { loadAppData, saveAppData } from "./storage";

export function getSettings(): AppSettings {
  const data = loadAppData();
  // Merge with DEFAULT_SETTINGS so new fields added to AppSettings always have a value
  return { ...DEFAULT_SETTINGS, ...(data.settings || {}) };
}

export function updateSettings(partial: Partial<AppSettings>): AppSettings {
  const data = loadAppData();
  const updated: AppSettings = {
    ...DEFAULT_SETTINGS,
    ...data.settings,
    ...partial,
  };
  data.settings = updated;
  saveAppData(data);
  return updated;
}
