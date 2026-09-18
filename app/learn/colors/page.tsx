"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useProfileStore } from "@/stores/profile-store";
import { useSettingsStore } from "@/stores/settings-store";
import { useColorsGameStore } from "@/stores/colors-game-store";
import { ChildNavbar } from "@/components/navigation/ChildNavbar";
import { ChildPageHeader } from "@/components/navigation/ChildPageHeader";
import { Teacher } from "@/components/teacher/Teacher";
import { ChildCard } from "@/components/ui/ChildCard";
import { ChildButton } from "@/components/ui/ChildButton";
import { Difficulty } from "@/types/game";
import { soundFx } from "@/lib/audio/sound-fx";
import { getTranslation } from "@/lib/i18n";
import {
  Star,
  Palette,
  Shapes,
  Compass,
  Play,
  ArrowLeft,
} from "lucide-react";
import { motion } from "motion/react";

export default function ColorsMenuPage() {
  const router = useRouter();
  const { activeProfile } = useProfileStore();
  const { language, soundEnabled, volume } = useSettingsStore();
  const { startGame } = useColorsGameStore();

  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>("easy");

  const childName = activeProfile?.name || (language === "id" ? "Teman" : "Friend");

  const handleStartPlay = (difficulty: Difficulty) => {
    if (soundEnabled) soundFx.playClick(volume);
    startGame(difficulty);
    router.push("/learn/colors/play");
  };

  const colorsStars =
    (activeProfile?.progress?.colors?.easy?.stars || 0) +
    (activeProfile?.progress?.colors?.medium?.stars || 0) +
    (activeProfile?.progress?.colors?.hard?.stars || 0);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <ChildNavbar />

      <main className="flex-1 max-w-6xl w-full mx-auto space-y-6 py-8">
        {/* Uniform Header */}
        <ChildPageHeader
          title={getTranslation("games.colors.title", {}, language)}
          backHref="/learn"
        />

        {/* Teacher Avatar Welcome */}
        <Teacher
          expression="happy"
          message={getTranslation("games.colors.teacherWelcome", {}, language)}
        />

        {/* Mode Choices: Exploration vs Play Challenge */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Eksplorasi Santai */}
          <motion.div whileHover={{ scale: 1.02 }} className="h-full">
            <ChildCard
              borderColor="border-sky-400"
              className="p-6 sm:p-8 flex flex-col justify-between h-full bg-gradient-to-br from-sky-50/90 to-indigo-50/90 shadow-xl"
            >
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-sky-500 text-white flex items-center justify-center shadow-lg shadow-sky-200">
                  <Palette className="w-9 h-9" />
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-800">
                    {getTranslation("games.colors.exploreMode", {}, language)}
                  </h3>
                  <p className="text-sm sm:text-base font-bold text-slate-600 mt-1">
                    {getTranslation("games.colors.exploreModeDesc", {}, language)}
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <Link href="/learn/colors/explore">
                  <ChildButton
                    variant="secondary"
                    size="lg"
                    className="w-full gap-2 shadow-lg"
                    onClick={() => {
                      if (soundEnabled) soundFx.playClick(volume);
                    }}
                  >
                    <Compass className="w-5 h-5" />
                    <span>{getTranslation("games.colors.exploreButton", {}, language)}</span>
                  </ChildButton>
                </Link>
              </div>
            </ChildCard>
          </motion.div>

          {/* Card 2: Tantangan Bermain */}
          <motion.div whileHover={{ scale: 1.02 }} className="h-full">
            <ChildCard
              borderColor="border-amber-400"
              className="p-6 sm:p-8 flex flex-col justify-between h-full bg-gradient-to-br from-amber-50/90 to-orange-50/90 shadow-xl"
            >
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-200">
                  <Shapes className="w-9 h-9" />
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-800">
                    {getTranslation("games.colors.quizMode", {}, language)}
                  </h3>
                  <p className="text-sm sm:text-base font-bold text-slate-600 mt-1">
                    {getTranslation("games.colors.quizModeDesc", {}, language)}
                  </p>
                </div>

                {/* Difficulty Selector */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-900/80">
                    {getTranslation("games.difficulty.selectDifficulty", {}, language)}:
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => {
                        setSelectedDifficulty("easy");
                        if (soundEnabled) soundFx.playClick(volume * 0.5);
                      }}
                      className={`py-2 px-3 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                        selectedDifficulty === "easy"
                          ? "bg-emerald-500 text-white shadow-md scale-105"
                          : "bg-white text-emerald-700 hover:bg-emerald-50 border border-emerald-200"
                      }`}
                    >
                      {getTranslation("games.difficulty.easy", {}, language)} ⭐
                    </button>
                    <button
                      onClick={() => {
                        setSelectedDifficulty("medium");
                        if (soundEnabled) soundFx.playClick(volume * 0.5);
                      }}
                      className={`py-2 px-3 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                        selectedDifficulty === "medium"
                          ? "bg-amber-500 text-white shadow-md scale-105"
                          : "bg-white text-amber-700 hover:bg-amber-50 border border-amber-200"
                      }`}
                    >
                      {getTranslation("games.difficulty.medium", {}, language)} ⭐⭐
                    </button>
                    <button
                      onClick={() => {
                        setSelectedDifficulty("hard");
                        if (soundEnabled) soundFx.playClick(volume * 0.5);
                      }}
                      className={`py-2 px-3 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                        selectedDifficulty === "hard"
                          ? "bg-rose-500 text-white shadow-md scale-105"
                          : "bg-white text-rose-700 hover:bg-rose-50 border border-rose-200"
                      }`}
                    >
                      {getTranslation("games.difficulty.hard", {}, language)} ⭐⭐⭐
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <ChildButton
                  variant="success"
                  size="lg"
                  className="w-full gap-2 shadow-lg"
                  onClick={() => handleStartPlay(selectedDifficulty)}
                >
                  <Play className="w-5 h-5 fill-white" />
                  <span>{getTranslation("app.startPlay", {}, language)} 🎮</span>
                </ChildButton>
              </div>
            </ChildCard>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
