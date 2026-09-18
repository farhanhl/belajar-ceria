export type Language = "id" | "en";

export interface AppSettings {
  language: Language;
  soundEnabled: boolean;
  musicEnabled: boolean;
  autoTts: boolean;
  volume: number; // 0.0 to 1.0 (Sound FX)
  musicVolume: number; // 0.0 to 1.0 (Backsound)
}

export const DEFAULT_SETTINGS: AppSettings = {
  language: "id",
  soundEnabled: true,
  musicEnabled: true,
  autoTts: true,
  volume: 0.8,
  musicVolume: 0.5,
};
