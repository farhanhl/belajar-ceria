"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLetterGameStore } from "@/stores/letter-game-store";
import { useSettingsStore } from "@/stores/settings-store";
import { useProfileStore } from "@/stores/profile-store";
import { Teacher } from "@/components/teacher/Teacher";
import { ChildNavbar } from "@/components/navigation/ChildNavbar";
import { ChildButton } from "@/components/ui/ChildButton";
import { GameDifficulty } from "@/types/game";
import { motion } from "motion/react";
import { BookOpen, Gamepad2, ArrowLeft, Star, Sparkles, Play } from "lucide-react";
import Link from "next/link";
import { soundFx } from "@/lib/audio/sound-fx";
import { getTranslation } from "@/lib/i18n";

export default function LettersMenuPage() {
  const router = useRouter();
  const { startQuizSession } = useLetterGameStore();
  const { language, soundEnabled, volume } = useSettingsStore();
  const { activeProfile } = useProfileStore();

  const [selectedDifficulty, setSelectedDifficulty] = useState<GameDifficulty>("easy");

  const handleStartQuiz = (difficulty: GameDifficulty) => {
    if (soundEnabled) soundFx.playClick(volume);
    startQuizSession(difficulty, language);
    router.push("/learn/letters/play");
  };

  const lettersProgress = activeProfile?.progress?.letters;
  const easyStars = lettersProgress?.easy?.stars || 0;
  const medStars = lettersProgress?.medium?.stars || 0;
  const hardStars = lettersProgress?.hard?.stars || 0;

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <ChildNavbar />

      <main className="flex-1 max-w-6xl w-full mx-auto space-y-6 py-8">
        {/* Header & Back */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/learn"
            className="p-2.5 sm:px-4 sm:py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-2xl transition flex items-center gap-1.5 font-black text-sm sm:text-base shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{getTranslation("app.backToMenu", {}, language)}</span>
          </Link>

          <h1 className="text-2xl sm:text-4xl font-black text-amber-950 tracking-tight">
            {getTranslation("games.letters.titleFull", {}, language)}
          </h1>
        </div>

        {/* Teacher Welcome */}
        <Teacher
          expression="happy"
          message={getTranslation("games.letters.teacherWelcome", {}, language)}
        />

        {/* Two Main Modes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mode 1: Eksplorasi Huruf A-Z */}
          <motion.div
            whileHover={{ scale: 1.03, y: -4 }}
            className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-pink-100 via-white to-rose-50 border-4 border-pink-400 shadow-xl flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-pink-400 text-white flex items-center justify-center shadow-md">
                <BookOpen className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-1 bg-pink-200 text-pink-900 font-extrabold text-xs px-2.5 py-0.5 rounded-full uppercase">
                  <Sparkles className="w-3 h-3" /> {getTranslation("games.letters.exploreMode", {}, language)}
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-pink-950">
                  {getTranslation("games.letters.exploreMode", {}, language)}
                </h2>
                <p className="text-sm sm:text-base font-bold text-pink-800">
                  {getTranslation("games.letters.exploreModeDesc", {}, language)}
                </p>
              </div>
            </div>

            <Link href="/learn/letters/explore">
              <ChildButton variant="pink" size="lg" className="w-full">
                {getTranslation("games.letters.exploreButton", {}, language)}
              </ChildButton>
            </Link>
          </motion.div>

          {/* Mode 2: Permainan Tebak Huruf */}
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
                  <Sparkles className="w-3 h-3" /> {getTranslation("games.letters.quizMode", {}, language)}
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-amber-950">
                  {getTranslation("games.letters.quizMode", {}, language)}
                </h2>
                <p className="text-sm sm:text-base font-bold text-amber-800">
                  {getTranslation("games.letters.quizModeDesc", {}, language)}
                </p>
              </div>

              {/* Difficulty Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => handleStartQuiz("easy")}
                  className="w-full p-3 rounded-2xl bg-emerald-100 hover:bg-emerald-200 text-emerald-950 border-2 border-emerald-300 font-black text-sm sm:text-base flex items-center justify-between transition cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span>🌱</span> {getTranslation("games.letters.easyDesc", {}, language)}
                  </span>
                  <span className="text-xs text-emerald-700 font-extrabold flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-500" /> {easyStars}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleStartQuiz("medium")}
                  className="w-full p-3 rounded-2xl bg-sky-100 hover:bg-sky-200 text-sky-950 border-2 border-sky-300 font-black text-sm sm:text-base flex items-center justify-between transition cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span>⭐</span> {getTranslation("games.letters.medDesc", {}, language)}
                  </span>
                  <span className="text-xs text-sky-700 font-extrabold flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-500" /> {medStars}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleStartQuiz("hard")}
                  className="w-full p-3 rounded-2xl bg-purple-100 hover:bg-purple-200 text-purple-950 border-2 border-purple-300 font-black text-sm sm:text-base flex items-center justify-between transition cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span>👑</span> {getTranslation("games.letters.hardDesc", {}, language)}
                  </span>
                  <span className="text-xs text-purple-700 font-extrabold flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-500" /> {hardStars}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
