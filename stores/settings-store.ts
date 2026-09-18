import { create } from "zustand";
import { AppSettings, DEFAULT_SETTINGS, Language } from "@/types/settings";
import { getSettings, updateSettings as updateSettingsStorage } from "@/lib/storage/settings-storage";
import { isStorageAvailable } from "@/lib/storage/storage";

interface SettingsState extends AppSettings {
  isHydrated: boolean;
  hydrate: () => void;
  setLanguage: (language: Language) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setAutoTts: (enabled: boolean) => void;
  setVolume: (volume: number) => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  ...DEFAULT_SETTINGS,
  isHydrated: false,

  hydrate: () => {
    if (!isStorageAvailable()) {
      set({ isHydrated: true });
      return;
    }
    const settings = getSettings();
    set({ ...settings, isHydrated: true });
  },

  setLanguage: (language: Language) => {
    updateSettingsStorage({ language });
    set({ language });
  },

  setSoundEnabled: (soundEnabled: boolean) => {
    updateSettingsStorage({ soundEnabled });
    set({ soundEnabled });
  },

  setAutoTts: (autoTts: boolean) => {
    updateSettingsStorage({ autoTts });
    set({ autoTts });
  },

  setVolume: (volume: number) => {
    updateSettingsStorage({ volume });
    set({ volume });
  },

  updateSettings: (partial: Partial<AppSettings>) => {
    const updated = updateSettingsStorage(partial);
    set({ ...updated });
  },
}));
