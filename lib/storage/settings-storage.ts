import { AppSettings, DEFAULT_SETTINGS } from "@/types/settings";
import { loadAppData, saveAppData } from "./storage";

export function getSettings(): AppSettings {
  const data = loadAppData();
  return data.settings || DEFAULT_SETTINGS;
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
