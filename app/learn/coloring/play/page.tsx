"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChildNavbar } from "@/components/navigation/ChildNavbar";
import { Teacher } from "@/components/teacher/Teacher";
import { ColoringToolsBar } from "@/games/coloring/components/ColoringToolsBar";
import { ColoringCanvas } from "@/games/coloring/components/ColoringCanvas";
import { ColorPaletteBar } from "@/games/coloring/components/ColorPaletteBar";
import { getColoringPictureById } from "@/games/coloring/data/coloring-data";
import { useColoringGameStore } from "@/stores/coloring-game-store";
import { useProfileStore } from "@/stores/profile-store";
import { useSettingsStore } from "@/stores/settings-store";
import { soundFx } from "@/lib/audio/sound-fx";
import { getTranslation } from "@/lib/i18n";
import { motion } from "motion/react";

export default function ColoringPlayPage() {
  const router = useRouter();
  const { activePictureId, finishColoring, filledColors } = useColoringGameStore();
  const { activeProfile, recordColoringResult } = useProfileStore();
  const { language, soundEnabled, volume } = useSettingsStore();

  const picture = getColoringPictureById(activePictureId);

  useEffect(() => {
    if (!picture) {
      router.replace("/learn/coloring");
    }
  }, [picture, router]);

  if (!picture) return null;

  const handleFinish = () => {
    if (soundEnabled) soundFx.playSuccess(volume);

    const result = finishColoring();

    // Record result to profile store if profile is active
    if (activeProfile) {
      recordColoringResult({
        profileId: activeProfile.id,
        difficulty: "easy",
        totalQuestions: result.totalRegions,
        correctAnswers: result.coloredRegionsCount,
        incorrectAnswers: 0,
        starsEarned: result.starsEarned,
        completedAt: result.completedAt,
      });
    }

    router.push("/learn/coloring/result");
  };

  const coloredCount = Object.keys(filledColors).length;
  const progressPercent = Math.min(100, Math.round((coloredCount / picture.totalRegions) * 100));

  return (
    <div className="min-h-screen flex flex-col">
      <ChildNavbar showControls={false} />

      <main className="flex-1 max-w-6xl w-full mx-auto space-y-3 sm:space-y-4 py-3 sm:py-4 px-3 sm:px-6">
        {/* Top Tools Bar */}
        <div className="w-full">
          <ColoringToolsBar onFinish={handleFinish} />
        </div>

        {/* Picture Title & Progress Indicator */}
        <div className="w-full flex items-center justify-between px-2">
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
              {picture.categoryName[language] || picture.categoryName.id}
            </span>
            <h2 className="text-lg sm:text-2xl font-black text-amber-950">
              {picture.title[language] || picture.title.id}
            </h2>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full border-2 border-amber-300 shadow-sm">
            <span className="text-xs font-black text-amber-950">
              {coloredCount} / {picture.totalRegions}
            </span>
            <div className="w-16 sm:w-24 h-2.5 bg-amber-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-pink-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Interactive Coloring Studio: Canvas and Crayons Side-by-Side */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 pt-1">
          {/* Canvas on Left/Center */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-[360px] sm:max-w-[400px] flex items-center justify-center shrink-0"
          >
            <ColoringCanvas pictureId={picture.id} />
          </motion.div>

          {/* Crayon Palette Box on Right */}
          <div className="w-full max-w-[360px] sm:max-w-[360px] flex items-center justify-center shrink-0">
            <ColorPaletteBar />
          </div>
        </div>
      </main>
    </div>
  );
}
