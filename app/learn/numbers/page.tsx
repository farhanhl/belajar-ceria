"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Difficulty } from "@/types/game";
import { NumberOperationMode } from "@/games/numbers/types";
import { useNumbersGameStore } from "@/stores/numbers-game-store";
import { useProfileStore } from "@/stores/profile-store";
import { useSettingsStore } from "@/stores/settings-store";
import { ChildNavbar } from "@/components/navigation/ChildNavbar";
import { ChildPageHeader } from "@/components/navigation/ChildPageHeader";
import { Teacher } from "@/components/teacher/Teacher";
import { ChildCard } from "@/components/ui/ChildCard";
import { ChildButton } from "@/components/ui/ChildButton";
import { soundFx } from "@/lib/audio/sound-fx";
import { getTranslation } from "@/lib/i18n";
import {
  Star,
  Compass,
  ArrowLeft,
  Plus,
  Minus,
  Shuffle,
  Binary,
  Play,
} from "lucide-react";
import { motion } from "motion/react";

export default function NumbersMenuPage() {
  const router = useRouter();
  const { activeProfile } = useProfileStore();
  const { language, soundEnabled, volume } = useSettingsStore();
  const { startGame } = useNumbersGameStore();

  const [selectedMode, setSelectedMode] = useState<NumberOperationMode>("addition");
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>("easy");

  const childName = activeProfile?.name || (language === "id" ? "Teman" : "Friend");

  const handleStartPlay = (mode: NumberOperationMode, difficulty: Difficulty) => {
    if (soundEnabled) soundFx.playClick(volume);
    startGame(mode, difficulty);
    router.push("/learn/numbers/play");
  };

  const numbersStars =
    (activeProfile?.progress?.numbers?.easy?.stars || 0) +
    (activeProfile?.progress?.numbers?.medium?.stars || 0) +
    (activeProfile?.progress?.numbers?.hard?.stars || 0);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <ChildNavbar />

      <main className="flex-1 max-w-6xl w-full mx-auto space-y-6 py-8">
        {/* Uniform Header */}
        <ChildPageHeader
          title={getTranslation("games.numbers.title", {}, language)}
          backHref="/learn"
        />

        {/* Teacher Avatar Greeting */}
        <Teacher
          expression="happy"
          message={getTranslation("games.numbers.teacherWelcome", {}, language)}
        />

        {/* Mode Choices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Option 1: Eksplorasi Angka 1-10 */}
          <motion.div whileHover={{ scale: 1.02 }} className="h-full">
            <ChildCard
              borderColor="border-amber-400"
              className="p-6 sm:p-8 flex flex-col justify-between h-full bg-gradient-to-br from-amber-50/90 to-yellow-50/90 shadow-xl"
            >
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-200 font-black text-3xl">
                  123
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-800">
                    {getTranslation("games.numbers.exploreMode", {}, language)}
                  </h3>
                  <p className="text-sm sm:text-base font-bold text-slate-600 mt-1">
                    {getTranslation("games.numbers.exploreModeDesc", {}, language)}
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <Link href="/learn/numbers/explore">
                  <ChildButton
                    variant="primary"
                    size="lg"
                    className="w-full gap-2 shadow-lg"
                    onClick={() => {
                      if (soundEnabled) soundFx.playClick(volume);
                    }}
                  >
                    <Compass className="w-5 h-5" />
                    <span>{getTranslation("games.numbers.exploreButton", {}, language)}</span>
                  </ChildButton>
                </Link>
              </div>
            </ChildCard>
          </motion.div>

          {/* Option 2: Tantangan Berhitung & Matematika */}
          <motion.div whileHover={{ scale: 1.02 }} className="h-full">
            <ChildCard
              borderColor="border-emerald-400"
              className="p-6 sm:p-8 flex flex-col justify-between h-full bg-gradient-to-br from-emerald-50/90 to-teal-50/90 shadow-xl"
            >
              <div className="space-y-5">
                <div className="w-16 h-16 rounded-3xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-200">
                  <Binary className="w-9 h-9" />
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-800">
                    {getTranslation("games.numbers.quizMode", {}, language)}
                  </h3>
                  <p className="text-sm sm:text-base font-bold text-slate-600 mt-1">
                    {getTranslation("games.numbers.quizModeDesc", {}, language)}
                  </p>
                </div>

                {/* Mode Selector */}
                <div className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-950">
                    {getTranslation("games.matching.selectDifficulty", {}, language)}:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setSelectedMode("addition");
                        if (soundEnabled) soundFx.playClick(volume * 0.5);
                      }}
                      className={`p-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        selectedMode === "addition"
                          ? "bg-emerald-500 text-white shadow-md scale-105"
                          : "bg-white text-emerald-800 hover:bg-emerald-50 border border-emerald-200"
                      }`}
                    >
                      <Plus className="w-4 h-4 stroke-[3]" />
                      <span>{getTranslation("games.numbers.modeAddition", {}, language)}</span>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedMode("subtraction");
                        if (soundEnabled) soundFx.playClick(volume * 0.5);
                      }}
                      className={`p-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        selectedMode === "subtraction"
                          ? "bg-rose-500 text-white shadow-md scale-105"
                          : "bg-white text-rose-800 hover:bg-rose-50 border border-rose-200"
                      }`}
                    >
                      <Minus className="w-4 h-4 stroke-[3]" />
                      <span>{getTranslation("games.numbers.modeSubtraction", {}, language)}</span>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedMode("mixed");
                        if (soundEnabled) soundFx.playClick(volume * 0.5);
                      }}
                      className={`p-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        selectedMode === "mixed"
                          ? "bg-indigo-500 text-white shadow-md scale-105"
                          : "bg-white text-indigo-800 hover:bg-indigo-50 border border-indigo-200"
                      }`}
                    >
                      <Shuffle className="w-4 h-4" />
                      <span>{getTranslation("games.numbers.modeMixed", {}, language)}</span>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedMode("counting");
                        if (soundEnabled) soundFx.playClick(volume * 0.5);
                      }}
                      className={`p-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        selectedMode === "counting"
                          ? "bg-amber-500 text-white shadow-md scale-105"
                          : "bg-white text-amber-800 hover:bg-amber-50 border border-amber-200"
                      }`}
                    >
                      <span>{getTranslation("games.numbers.modeCounting", {}, language)}</span>
                    </button>
                  </div>
                </div>

                {/* Difficulty Selector */}
                <div className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-950">
                    {getTranslation("parent.colLevel", {}, language)}:
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => {
                        setSelectedDifficulty("easy");
                        if (soundEnabled) soundFx.playClick(volume * 0.5);
                      }}
                      className={`py-2 px-2 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                        selectedDifficulty === "easy"
                          ? "bg-emerald-600 text-white shadow-md scale-105"
                          : "bg-white text-emerald-800 hover:bg-emerald-50 border border-emerald-200"
                      }`}
                    >
                      1–5 ({getTranslation("games.difficulty.easy", {}, language)})
                    </button>

                    <button
                      onClick={() => {
                        setSelectedDifficulty("medium");
                        if (soundEnabled) soundFx.playClick(volume * 0.5);
                      }}
                      className={`py-2 px-2 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                        selectedDifficulty === "medium"
                          ? "bg-amber-500 text-white shadow-md scale-105"
                          : "bg-white text-amber-800 hover:bg-amber-50 border border-amber-200"
                      }`}
                    >
                      1–10 ({getTranslation("games.difficulty.medium", {}, language)})
                    </button>

                    <button
                      onClick={() => {
                        setSelectedDifficulty("hard");
                        if (soundEnabled) soundFx.playClick(volume * 0.5);
                      }}
                      className={`py-2 px-2 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                        selectedDifficulty === "hard"
                          ? "bg-rose-500 text-white shadow-md scale-105"
                          : "bg-white text-rose-800 hover:bg-rose-50 border border-rose-200"
                      }`}
                    >
                      1–20 ({getTranslation("games.difficulty.hard", {}, language)})
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <ChildButton
                  variant="success"
                  size="lg"
                  className="w-full gap-2 shadow-lg"
                  onClick={() => handleStartPlay(selectedMode, selectedDifficulty)}
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
