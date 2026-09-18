import { create } from "zustand";
import { AppSettings, DEFAULT_SETTINGS, Language } from "@/types/settings";
import { getSettings, updateSettings as updateSettingsStorage } from "@/lib/storage/settings-storage";
import { isStorageAvailable } from "@/lib/storage/storage";
import { bgm } from "@/lib/audio/bgm";

interface SettingsState extends AppSettings {
  isHydrated: boolean;
  hydrate: () => void;
  setLanguage: (language: Language) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setMusicEnabled: (enabled: boolean) => void;
  setAutoTts: (enabled: boolean) => void;
  setVolume: (volume: number) => void;
  setMusicVolume: (volume: number) => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  ...DEFAULT_SETTINGS,
  isHydrated: false,

  hydrate: () => {
    if (!isStorageAvailable()) {
      set({ isHydrated: true });
      bgm.start(DEFAULT_SETTINGS.musicEnabled, DEFAULT_SETTINGS.musicVolume);
      return;
    }
    const settings = getSettings();
    set({ ...settings, isHydrated: true });
    bgm.start(settings.musicEnabled ?? true, settings.musicVolume ?? 0.5);
  },

  setLanguage: (language: Language) => {
    updateSettingsStorage({ language });
    set({ language });
  },

  setSoundEnabled: (soundEnabled: boolean) => {
    updateSettingsStorage({ soundEnabled });
    set({ soundEnabled });
  },

  setMusicEnabled: (musicEnabled: boolean) => {
    updateSettingsStorage({ musicEnabled });
    bgm.setMuted(!musicEnabled);
    set({ musicEnabled });
  },

  setAutoTts: (autoTts: boolean) => {
    updateSettingsStorage({ autoTts });
    set({ autoTts });
  },

  setVolume: (volume: number) => {
    updateSettingsStorage({ volume });
    set({ volume });
  },

  setMusicVolume: (musicVolume: number) => {
    updateSettingsStorage({ musicVolume });
    bgm.setVolume(musicVolume);
    set({ musicVolume });
  },

  updateSettings: (partial: Partial<AppSettings>) => {
    const updated = updateSettingsStorage(partial);
    if (partial.musicEnabled !== undefined) {
      bgm.setMuted(!partial.musicEnabled);
    }
    if (partial.musicVolume !== undefined) {
      bgm.setVolume(partial.musicVolume);
    }
    set({ ...updated });
  },
}));
