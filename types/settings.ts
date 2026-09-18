export type Language = "id" | "en";

export interface AppSettings {
  language: Language;
  soundEnabled: boolean;
  autoTts: boolean;
  volume: number; // 0.0 to 1.0
}

export const DEFAULT_SETTINGS: AppSettings = {
  language: "id",
  soundEnabled: true,
  autoTts: true,
  volume: 0.8,
};
