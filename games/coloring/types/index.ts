export type ColoringCategory = "muslimah" | "animals" | "vehicles" | "nature";

export interface ColoringRegion {
  id: string; // e.g. "sky", "roof", "body", "eye_l", etc.
  name: {
    id: string;
    en: string;
  };
  defaultFill?: string; // usually "#FFFFFF"
}

export interface ColoringPictureItem {
  id: string;
  title: {
    id: string;
    en: string;
  };
  category: ColoringCategory;
  categoryName: {
    id: string;
    en: string;
  };
  badgeColor: string;
  bgGradient: string;
  description: {
    id: string;
    en: string;
  };
  totalRegions: number;
  // Suggested preview colors for default guide
  previewColors?: Record<string, string>;
}

export interface ColorCrayon {
  id: string;
  name: {
    id: string;
    en: string;
  };
  hex: string;
  textColor?: string;
  borderHex?: string;
}

export interface ColoringResult {
  pictureId: string;
  pictureTitle: string;
  category: ColoringCategory;
  coloredRegionsCount: number;
  totalRegions: number;
  starsEarned: number;
  timeSpentSeconds: number;
  completedAt: string;
}
