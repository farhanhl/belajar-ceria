"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useHijaiyahGameStore } from "@/stores/hijaiyah-game-store";
import { useSettingsStore } from "@/stores/settings-store";
import { useProfileStore } from "@/stores/profile-store";
import { Teacher } from "@/components/teacher/Teacher";
import { ChildNavbar } from "@/components/navigation/ChildNavbar";
import { ChildPageHeader } from "@/components/navigation/ChildPageHeader";
import { ChildButton } from "@/components/ui/ChildButton";
import { GameDifficulty } from "@/types/game";
import { motion } from "motion/react";
import { BookOpen, Gamepad2, Star, Sparkles } from "lucide-react";
import Link from "next/link";
import { soundFx } from "@/lib/audio/sound-fx";
import { getTranslation } from "@/lib/i18n";

export default function HijaiyahMenuPage() {
  const router = useRouter();
  const { startQuizSession } = useHijaiyahGameStore();
  const { language, soundEnabled, volume } = useSettingsStore();
  const { activeProfile } = useProfileStore();

  const [selectedDifficulty, setSelectedDifficulty] = useState<GameDifficulty>("easy");

  const handleStartQuiz = (difficulty: GameDifficulty) => {
    if (soundEnabled) soundFx.playClick(volume);
    startQuizSession(difficulty, language);
    router.push("/learn/hijaiyah/play");
  };

  const hijaiyahProgress = activeProfile?.progress?.hijaiyah;
  const easyStars = hijaiyahProgress?.easy?.stars || 0;
  const medStars = hijaiyahProgress?.medium?.stars || 0;
  const hardStars = hijaiyahProgress?.hard?.stars || 0;

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <ChildNavbar />

      <main className="flex-1 max-w-6xl w-full mx-auto space-y-6 py-8">
        {/* Uniform Header */}
        <ChildPageHeader
          title={getTranslation("games.hijaiyah.titleFull", {}, language)}
          backHref="/learn"
        />

        {/* Teacher Welcome */}
        <Teacher
          expression="happy"
          message={getTranslation("games.hijaiyah.teacherWelcome", {}, language)}
        />

        {/* Two Main Modes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mode 1: Eksplorasi Huruf Hijaiyah */}
          <motion.div
            whileHover={{ scale: 1.03, y: -4 }}
            className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-teal-100 via-white to-emerald-50 border-4 border-teal-400 shadow-xl flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-teal-500 text-white flex items-center justify-center shadow-md">
                <BookOpen className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-1 bg-teal-200 text-teal-900 font-extrabold text-xs px-2.5 py-0.5 rounded-full uppercase">
                  <Sparkles className="w-3 h-3" /> {getTranslation("games.hijaiyah.exploreMode", {}, language)}
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-teal-950">
                  {getTranslation("games.hijaiyah.exploreMode", {}, language)}
                </h2>
                <p className="text-sm sm:text-base font-bold text-teal-800">
                  {getTranslation("games.hijaiyah.exploreModeDesc", {}, language)}
                </p>
              </div>
            </div>

            <Link href="/learn/hijaiyah/explore">
              <ChildButton variant="success" size="lg" className="w-full font-black">
                {getTranslation("games.hijaiyah.exploreButton", {}, language)}
              </ChildButton>
            </Link>
          </motion.div>

          {/* Mode 2: Permainan Tebak Hijaiyah */}
          <motion.div
            whileHover={{ scale: 1.03, y: -4 }}
            className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-amber-100 via-white to-orange-50 border-4 border-amber-400 shadow-xl flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center shadow-md">
                <Gamepad2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-1 bg-amber-200 text-amber-950 font-extrabold text-xs px-2.5 py-0.5 rounded-full uppercase">
                  <Sparkles className="w-3 h-3" /> {getTranslation("games.hijaiyah.quizMode", {}, language)}
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-amber-950">
                  {getTranslation("games.hijaiyah.quizMode", {}, language)}
                </h2>
                <p className="text-sm sm:text-base font-bold text-amber-800">
                  {getTranslation("games.hijaiyah.quizModeDesc", {}, language)}
                </p>
              </div>

              {/* Difficulty Selection Pills */}
              <div className="space-y-2 pt-2">
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (soundEnabled) soundFx.playClick(volume);
                      setSelectedDifficulty("easy");
                    }}
                    className={`py-2 px-1 rounded-2xl font-black text-xs transition border-2 cursor-pointer ${
                      selectedDifficulty === "easy"
                        ? "bg-emerald-500 text-white border-emerald-600 shadow-md scale-102"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    🌱 {getTranslation("games.hijaiyah.easy", {}, language)}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (soundEnabled) soundFx.playClick(volume);
                      setSelectedDifficulty("medium");
                    }}
                    className={`py-2 px-1 rounded-2xl font-black text-xs transition border-2 cursor-pointer ${
                      selectedDifficulty === "medium"
                        ? "bg-amber-500 text-white border-amber-600 shadow-md scale-102"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    ⭐ {getTranslation("games.hijaiyah.medium", {}, language)}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (soundEnabled) soundFx.playClick(volume);
                      setSelectedDifficulty("hard");
                    }}
                    className={`py-2 px-1 rounded-2xl font-black text-xs transition border-2 cursor-pointer ${
                      selectedDifficulty === "hard"
                        ? "bg-rose-500 text-white border-rose-600 shadow-md scale-102"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    👑 {getTranslation("games.hijaiyah.hard", {}, language)}
                  </button>
                </div>

                <p className="text-xs font-bold text-amber-900 text-center">
                  {selectedDifficulty === "easy"
                    ? getTranslation("games.hijaiyah.easyDesc", {}, language)
                    : selectedDifficulty === "medium"
                    ? getTranslation("games.hijaiyah.mediumDesc", {}, language)
                    : getTranslation("games.hijaiyah.hardDesc", {}, language)}
                </p>
              </div>
            </div>

            <ChildButton
              variant="primary"
              size="lg"
              onClick={() => handleStartQuiz(selectedDifficulty)}
              className="w-full font-black text-amber-950"
            >
              {getTranslation("games.hijaiyah.playButton", {}, language)}
            </ChildButton>
          </motion.div>
        </div>

        {/* Stars Progress Bar */}
        <div className="rounded-3xl p-6 bg-white/90 backdrop-blur-sm border-4 border-amber-300 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center">
              <Star className="w-7 h-7 text-amber-500 fill-amber-400" />
            </div>
            <div>
              <h4 className="font-black text-amber-950 text-base sm:text-lg">
                {language === "id" ? "Progres Bintang Hijaiyah" : "Hijaiyah Stars Progress"}
              </h4>
              <p className="text-xs sm:text-sm font-bold text-amber-800">
                {language === "id"
                  ? "Kumpulkan bintang di setiap tingkat kesulitan!"
                  : "Collect stars in every difficulty level!"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-2xl border border-emerald-200">
              <span className="text-xs font-black text-emerald-950">🌱 {easyStars} ★</span>
            </div>
            <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-2xl border border-amber-200">
              <span className="text-xs font-black text-amber-950">⭐ {medStars} ★</span>
            </div>
            <div className="flex items-center gap-1.5 bg-rose-50 px-3 py-1.5 rounded-2xl border border-rose-200">
              <span className="text-xs font-black text-rose-950">👑 {hardStars} ★</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
