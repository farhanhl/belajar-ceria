import { z } from "zod";
import { DEFAULT_SETTINGS } from "./settings";
import { createInitialProfileProgress } from "./profile";

export const GameProgressSchema = z.object({
  currentLevel: z.number().default(1),
  stars: z.number().default(0),
  gamesCompleted: z.number().default(0),
  questionsAnswered: z.number().default(0),
  correctAnswers: z.number().default(0),
  incorrectAnswers: z.number().default(0),
  lastPlayedAt: z.string().nullable().default(null),
});

export const ProfileProgressSchema = z.object({
  matching: z.object({
    easy: GameProgressSchema,
    medium: GameProgressSchema,
    hard: GameProgressSchema,
  }),
  letters: z
    .object({
      easy: GameProgressSchema,
      medium: GameProgressSchema,
      hard: GameProgressSchema,
    })
    .default(() => ({
      easy: GameProgressSchema.parse({}),
      medium: GameProgressSchema.parse({}),
      hard: GameProgressSchema.parse({}),
    })),
  puzzle: z
    .object({
      easy: GameProgressSchema,
      medium: GameProgressSchema,
      hard: GameProgressSchema,
    })
    .default(() => ({
      easy: GameProgressSchema.parse({}),
      medium: GameProgressSchema.parse({}),
      hard: GameProgressSchema.parse({}),
    })),
  colors: z
    .object({
      easy: GameProgressSchema,
      medium: GameProgressSchema,
      hard: GameProgressSchema,
    })
    .default(() => ({
      easy: GameProgressSchema.parse({}),
      medium: GameProgressSchema.parse({}),
      hard: GameProgressSchema.parse({}),
    })),
  numbers: z
    .object({
      easy: GameProgressSchema,
      medium: GameProgressSchema,
      hard: GameProgressSchema,
    })
    .default(() => ({
      easy: GameProgressSchema.parse({}),
      medium: GameProgressSchema.parse({}),
      hard: GameProgressSchema.parse({}),
    })),
  memory: z
    .object({
      easy: GameProgressSchema,
      medium: GameProgressSchema,
      hard: GameProgressSchema,
    })
    .default(() => ({
      easy: GameProgressSchema.parse({}),
      medium: GameProgressSchema.parse({}),
      hard: GameProgressSchema.parse({}),
    })),
  coloring: z
    .object({
      easy: GameProgressSchema,
      medium: GameProgressSchema,
      hard: GameProgressSchema,
    })
    .default(() => ({
      easy: GameProgressSchema.parse({}),
      medium: GameProgressSchema.parse({}),
      hard: GameProgressSchema.parse({}),
    })),
  sorting: z
    .object({
      easy: GameProgressSchema,
      medium: GameProgressSchema,
      hard: GameProgressSchema,
    })
    .default(() => ({
      easy: GameProgressSchema.parse({}),
      medium: GameProgressSchema.parse({}),
      hard: GameProgressSchema.parse({}),
    })),
  hijaiyah: z
    .object({
      easy: GameProgressSchema,
      medium: GameProgressSchema,
      hard: GameProgressSchema,
    })
    .default(() => ({
      easy: GameProgressSchema.parse({}),
      medium: GameProgressSchema.parse({}),
      hard: GameProgressSchema.parse({}),
    })),
  detective: z
    .object({
      easy: GameProgressSchema,
      medium: GameProgressSchema,
      hard: GameProgressSchema,
    })
    .default(() => ({
      easy: GameProgressSchema.parse({}),
      medium: GameProgressSchema.parse({}),
      hard: GameProgressSchema.parse({}),
    })),
  tracing: z
    .object({
      easy: GameProgressSchema,
      medium: GameProgressSchema,
      hard: GameProgressSchema,
    })
    .default(() => ({
      easy: GameProgressSchema.parse({}),
      medium: GameProgressSchema.parse({}),
      hard: GameProgressSchema.parse({}),
    })),
  adab: z
    .object({
      easy: GameProgressSchema,
      medium: GameProgressSchema,
      hard: GameProgressSchema,
    })
    .default(() => ({
      easy: GameProgressSchema.parse({}),
      medium: GameProgressSchema.parse({}),
      hard: GameProgressSchema.parse({}),
    })),
});

export const ChildProfileSchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(1).max(30),
  avatar: z.string().default("girl-1"),
  createdAt: z.string(),
  updatedAt: z.string(),
  progress: ProfileProgressSchema,
});

export const AppSettingsSchema = z.object({
  language: z.enum(["id", "en"]).default("id"),
  soundEnabled: z.boolean().default(true),
  musicEnabled: z.boolean().default(true),
  autoTts: z.boolean().default(true),
  volume: z.number().min(0).max(1).default(0.8),
  musicVolume: z.number().min(0).max(1).default(0.5),
});

export const AppDataSchema = z.object({
  version: z.number().default(1),
  profiles: z.array(ChildProfileSchema).default([]),
  activeProfileId: z.string().nullable().default(null),
  settings: AppSettingsSchema.default(DEFAULT_SETTINGS),
});

export type AppData = z.infer<typeof AppDataSchema>;

export const DEFAULT_APP_DATA: AppData = {
  version: 1,
  profiles: [],
  activeProfileId: null,
  settings: DEFAULT_SETTINGS,
};
