"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProfileStore } from "@/stores/profile-store";
import { useSettingsStore } from "@/stores/settings-store";
import { ChildNavbar } from "@/components/navigation/ChildNavbar";
import { Teacher } from "@/components/teacher/Teacher";
import { ChildButton } from "@/components/ui/ChildButton";
import { ChildCard } from "@/components/ui/ChildCard";
import { GAMES_CATALOG } from "@/games";
import { Star, Trophy, Play, Lock, Sparkles } from "lucide-react";
import { getTranslation } from "@/lib/i18n";
import { motion } from "motion/react";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const { activeProfile, profiles, isHydrated } = useProfileStore();
  const { language } = useSettingsStore();

  useEffect(() => {
    if (!isHydrated) return;
    if (profiles.length === 0) {
      router.replace("/");
    }
  }, [isHydrated, profiles.length, router]);

  if (!isHydrated || !activeProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-400 border-t-amber-600 rounded-full animate-spin" />
      </div>
    );
  }

  const childName = activeProfile.name;
  const matchingStars =
    (activeProfile.progress?.matching?.easy?.stars || 0) +
    (activeProfile.progress?.matching?.medium?.stars || 0) +
    (activeProfile.progress?.matching?.hard?.stars || 0);

  const lettersStars =
    (activeProfile.progress?.letters?.easy?.stars || 0) +
    (activeProfile.progress?.letters?.medium?.stars || 0) +
    (activeProfile.progress?.letters?.hard?.stars || 0);

  const puzzleStars =
    (activeProfile.progress?.puzzle?.easy?.stars || 0) +
    (activeProfile.progress?.puzzle?.medium?.stars || 0) +
    (activeProfile.progress?.puzzle?.hard?.stars || 0);

  const colorsStars =
    (activeProfile.progress?.colors?.easy?.stars || 0) +
    (activeProfile.progress?.colors?.medium?.stars || 0) +
    (activeProfile.progress?.colors?.hard?.stars || 0);

  const numbersStars =
    (activeProfile.progress?.numbers?.easy?.stars || 0) +
    (activeProfile.progress?.numbers?.medium?.stars || 0) +
    (activeProfile.progress?.numbers?.hard?.stars || 0);

  const memoryStars =
    (activeProfile.progress?.memory?.easy?.stars || 0) +
    (activeProfile.progress?.memory?.medium?.stars || 0) +
    (activeProfile.progress?.memory?.hard?.stars || 0);

  const totalStars = matchingStars + lettersStars + puzzleStars + colorsStars + numbersStars + memoryStars;

  const level = Math.max(
    activeProfile.progress?.matching?.easy?.currentLevel || 1,
    activeProfile.progress?.matching?.medium?.currentLevel || 1,
    activeProfile.progress?.matching?.hard?.currentLevel || 1,
    activeProfile.progress?.letters?.easy?.currentLevel || 1,
    activeProfile.progress?.letters?.medium?.currentLevel || 1,
    activeProfile.progress?.letters?.hard?.currentLevel || 1,
    activeProfile.progress?.puzzle?.easy?.currentLevel || 1,
    activeProfile.progress?.puzzle?.medium?.currentLevel || 1,
    activeProfile.progress?.puzzle?.hard?.currentLevel || 1,
    activeProfile.progress?.colors?.easy?.currentLevel || 1,
    activeProfile.progress?.colors?.medium?.currentLevel || 1,
    activeProfile.progress?.colors?.hard?.currentLevel || 1,
    activeProfile.progress?.numbers?.easy?.currentLevel || 1,
    activeProfile.progress?.numbers?.medium?.currentLevel || 1,
    activeProfile.progress?.numbers?.hard?.currentLevel || 1,
    activeProfile.progress?.memory?.easy?.currentLevel || 1,
    activeProfile.progress?.memory?.medium?.currentLevel || 1,
    activeProfile.progress?.memory?.hard?.currentLevel || 1
  );

  return (
    <div className="min-h-screen flex flex-col">
      <ChildNavbar />

      <main className="flex-1 max-w-6xl w-full mx-auto space-y-6 py-8">
        {/* Welcome Section with Ibu Guru */}
        <Teacher
          expression="happy"
          message={getTranslation("dashboard.greeting", { name: childName }, language)}
          subMessage={language === "id" ? "Pilih permainan di bawah untuk mulai mengumpulkan bintang!" : "Choose a game below to start collecting stars!"}
        />

        {/* Stats Summary Bar */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-amber-400 to-orange-400 rounded-3xl p-4 sm:p-5 text-amber-950 flex items-center gap-3 sm:gap-4 shadow-lg border-2 border-amber-300"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/90 flex items-center justify-center shrink-0 shadow">
              <Star className="w-8 h-8 fill-amber-400 text-amber-500" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-900/80">
                {getTranslation("parent.totalStars", {}, language)}
              </p>
              <p className="text-2xl sm:text-3xl font-black">{getTranslation("dashboard.starsCount", { count: totalStars }, language)}</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-sky-400 to-indigo-400 rounded-3xl p-4 sm:p-5 text-white flex items-center gap-3 sm:gap-4 shadow-lg border-2 border-sky-300"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/90 flex items-center justify-center shrink-0 shadow">
              <Trophy className="w-8 h-8 text-indigo-500" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-black uppercase tracking-wider text-indigo-100">
                {language === "id" ? "Peringkat Belajar" : "Learning Level"}
              </p>
              <p className="text-2xl sm:text-3xl font-black">{getTranslation("dashboard.levelCount", { level }, language)}</p>
            </div>
          </motion.div>
        </div>

        {/* Games Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-500 fill-amber-400" />
            <h2 className="text-2xl sm:text-3xl font-black text-amber-950 tracking-tight">
              {getTranslation("dashboard.chooseGame", {}, language)}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Game 1: Cocokkan & Temukan */}
            <motion.div
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <ChildCard
                borderColor="border-amber-400"
                bgGradient="bg-gradient-to-br from-amber-100/90 via-white to-orange-50"
                className="relative overflow-hidden group shadow-xl h-full flex flex-col justify-between"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-2 text-center sm:text-left">
                    <div className="inline-flex items-center gap-1.5 bg-amber-400 text-amber-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 fill-amber-950" /> {language === "id" ? "Permainan Seru" : "Fun Game"}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-amber-950">
                      {getTranslation("games.matching.title", {}, language)}
                    </h3>
                    <p className="text-sm font-bold text-amber-800">
                      {getTranslation("games.matching.subtitle", {}, language)}
                    </p>
                  </div>

                  {/* Decorative Game Visual */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-amber-200 rounded-3xl border-4 border-amber-400 flex items-center justify-center shadow-inner group-hover:rotate-3 transition-transform shrink-0">
                    <span className="text-4xl sm:text-5xl select-none">🧩</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Link href="/learn/matching">
                    <ChildButton
                      variant="primary"
                      size="md"
                      icon={<Play className="w-5 h-5 fill-amber-950" />}
                      className="w-full sm:w-auto"
                    >
                      {getTranslation("dashboard.startPlay", {}, language)}
                    </ChildButton>
                  </Link>
                </div>
              </ChildCard>
            </motion.div>

            {/* Game 2: Belajar Huruf */}
            <motion.div
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <ChildCard
                borderColor="border-pink-400"
                bgGradient="bg-gradient-to-br from-pink-100/90 via-white to-rose-50"
                className="relative overflow-hidden group shadow-xl h-full flex flex-col justify-between"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-2 text-center sm:text-left">
                    <div className="inline-flex items-center gap-1.5 bg-pink-400 text-white font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 fill-white" /> {language === "id" ? "Baru & Ceria" : "Fresh & Cheerful"}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-pink-950">
                      {getTranslation("games.letters.title", {}, language)}
                    </h3>
                    <p className="text-sm font-bold text-pink-800">
                      {getTranslation("games.letters.subtitle", {}, language)}
                    </p>
                  </div>

                  {/* Decorative Letter Visual */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-pink-200 rounded-3xl border-4 border-pink-400 flex items-center justify-center shadow-inner group-hover:rotate-3 transition-transform shrink-0">
                    <span className="text-4xl sm:text-5xl select-none font-black text-pink-700">🔤</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Link href="/learn/letters">
                    <ChildButton
                      variant="pink"
                      size="md"
                      icon={<Play className="w-5 h-5 fill-current" />}
                      className="w-full sm:w-auto"
                    >
                      {getTranslation("dashboard.startPlay", {}, language)}
                    </ChildButton>
                  </Link>
                </div>
              </ChildCard>
            </motion.div>

            {/* Game 3: Puzzle Bergambar */}
            <motion.div
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <ChildCard
                borderColor="border-indigo-400"
                bgGradient="bg-gradient-to-br from-indigo-100/90 via-white to-purple-50"
                className="relative overflow-hidden group shadow-xl h-full flex flex-col justify-between"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-2 text-center sm:text-left">
                    <div className="inline-flex items-center gap-1.5 bg-indigo-500 text-white font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 fill-white" /> {language === "id" ? "Logika & Visual" : "Logic & Visual"}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-indigo-950">
                      {getTranslation("games.puzzle.title", {}, language)}
                    </h3>
                    <p className="text-sm font-bold text-indigo-800">
                      {getTranslation("games.puzzle.subtitle", {}, language)}
                    </p>
                  </div>

                  {/* Decorative Puzzle Visual */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-indigo-200 rounded-3xl border-4 border-indigo-400 flex items-center justify-center shadow-inner group-hover:rotate-3 transition-transform shrink-0">
                    <span className="text-4xl sm:text-5xl select-none font-black text-indigo-700">🖼️</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Link href="/learn/puzzle">
                    <ChildButton
                      variant="indigo"
                      size="md"
                      icon={<Play className="w-5 h-5 fill-current" />}
                      className="w-full sm:w-auto"
                    >
                      {getTranslation("dashboard.startPlay", {}, language)}
                    </ChildButton>
                  </Link>
                </div>
              </ChildCard>
            </motion.div>

            {/* Game 4: Warna & Bentuk */}
            <motion.div
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <ChildCard
                borderColor="border-emerald-400"
                bgGradient="bg-gradient-to-br from-emerald-100/90 via-white to-teal-50"
                className="relative overflow-hidden group shadow-xl h-full flex flex-col justify-between"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-2 text-center sm:text-left">
                    <div className="inline-flex items-center gap-1.5 bg-emerald-500 text-white font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 fill-white" /> {language === "id" ? "Kreatif & Ceria" : "Creative & Bright"}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-emerald-950">
                      {getTranslation("games.colors.title", {}, language)}
                    </h3>
                    <p className="text-sm font-bold text-emerald-800">
                      {getTranslation("games.colors.subtitle", {}, language)}
                    </p>
                  </div>

                  {/* Decorative Color/Shapes Visual */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-emerald-200 rounded-3xl border-4 border-emerald-400 flex items-center justify-center shadow-inner group-hover:rotate-3 transition-transform shrink-0">
                    <span className="text-4xl sm:text-5xl select-none font-black text-emerald-700">🎨</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Link href="/learn/colors">
                    <ChildButton
                      variant="success"
                      size="md"
                      icon={<Play className="w-5 h-5 fill-current" />}
                      className="w-full sm:w-auto"
                    >
                      {getTranslation("dashboard.startPlay", {}, language)}
                    </ChildButton>
                  </Link>
                </div>
              </ChildCard>
            </motion.div>

            {/* Game 5: Belajar Angka & Berhitung */}
            <motion.div
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <ChildCard
                borderColor="border-amber-400"
                bgGradient="bg-gradient-to-br from-amber-100/90 via-white to-yellow-50"
                className="relative overflow-hidden group shadow-xl h-full flex flex-col justify-between"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-2 text-center sm:text-left">
                    <div className="inline-flex items-center gap-1.5 bg-amber-500 text-white font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 fill-white" /> {language === "id" ? "Berhitung Ceria" : "Joyful Math"}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-amber-950">
                      {getTranslation("games.numbers.title", {}, language)}
                    </h3>
                    <p className="text-sm font-bold text-amber-800">
                      {getTranslation("games.numbers.subtitle", {}, language)}
                    </p>
                  </div>

                  {/* Decorative Number Visual */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-amber-200 rounded-3xl border-4 border-amber-400 flex items-center justify-center shadow-inner group-hover:rotate-3 transition-transform shrink-0">
                    <span className="text-4xl sm:text-5xl select-none font-black text-amber-700">🔢</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Link href="/learn/numbers">
                    <ChildButton
                      variant="primary"
                      size="md"
                      icon={<Play className="w-5 h-5 fill-amber-950" />}
                      className="w-full sm:w-auto"
                    >
                      {getTranslation("dashboard.startPlay", {}, language)}
                    </ChildButton>
                  </Link>
                </div>
              </ChildCard>
            </motion.div>

            {/* Game 6: Tebak Memori */}
            <motion.div
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <ChildCard
                borderColor="border-purple-400"
                bgGradient="bg-gradient-to-br from-purple-100/90 via-white to-pink-50"
                className="relative overflow-hidden group shadow-xl h-full flex flex-col justify-between"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-2 text-center sm:text-left">
                    <div className="inline-flex items-center gap-1.5 bg-purple-500 text-white font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 fill-white" /> {language === "id" ? "Ingatan & Fokus" : "Memory & Focus"}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-purple-950">
                      {getTranslation("games.memory.title", {}, language)}
                    </h3>
                    <p className="text-sm font-bold text-purple-800">
                      {getTranslation("games.memory.subtitle", {}, language)}
                    </p>
                  </div>

                  {/* Decorative Memory Visual */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-purple-200 rounded-3xl border-4 border-purple-400 flex items-center justify-center shadow-inner group-hover:rotate-3 transition-transform shrink-0">
                    <span className="text-4xl sm:text-5xl select-none font-black text-purple-700">🧠</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Link href="/learn/memory">
                    <ChildButton
                      variant="purple"
                      size="md"
                      icon={<Play className="w-5 h-5 fill-white" />}
                      className="w-full sm:w-auto"
                    >
                      {getTranslation("dashboard.startPlay", {}, language)}
                    </ChildButton>
                  </Link>
                </div>
              </ChildCard>
            </motion.div>

            {/* Locked Future Games */}
            {GAMES_CATALOG.filter((g) => !g.available).map((game) => (
              <div
                key={game.id}
                className="rounded-3xl border-4 border-dashed border-slate-300 bg-slate-100/60 p-6 flex flex-col items-center justify-between text-center min-h-[180px] opacity-75 select-none"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-200 text-slate-400 flex items-center justify-center mb-2">
                  <Lock className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-black text-slate-700">
                    {getTranslation(game.titleKey, {}, language)}
                  </h4>
                  <p className="text-xs font-bold text-slate-500">
                    {getTranslation(game.descriptionKey, {}, language)}
                  </p>
                </div>
                <span className="mt-3 text-xs font-black uppercase tracking-wider text-slate-400 bg-slate-200 px-3 py-1 rounded-full">
                  {getTranslation("dashboard.lockedGame", {}, language)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
