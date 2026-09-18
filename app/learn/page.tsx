"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProfileStore } from "@/stores/profile-store";
import { useSettingsStore } from "@/stores/settings-store";
import { ChildNavbar } from "@/components/navigation/ChildNavbar";
import { Teacher } from "@/components/teacher/Teacher";
import { ChildButton } from "@/components/ui/ChildButton";
import { ChildCard } from "@/components/ui/ChildCard";
import { GameMenuCard } from "@/components/game/GameMenuCard";
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

  const coloringStars =
    (activeProfile.progress?.coloring?.easy?.stars || 0) +
    (activeProfile.progress?.coloring?.medium?.stars || 0) +
    (activeProfile.progress?.coloring?.hard?.stars || 0);

  const sortingStars =
    (activeProfile.progress?.sorting?.easy?.stars || 0) +
    (activeProfile.progress?.sorting?.medium?.stars || 0) +
    (activeProfile.progress?.sorting?.hard?.stars || 0);

  const hijaiyahStars =
    (activeProfile.progress?.hijaiyah?.easy?.stars || 0) +
    (activeProfile.progress?.hijaiyah?.medium?.stars || 0) +
    (activeProfile.progress?.hijaiyah?.hard?.stars || 0);

  const detectiveStars =
    (activeProfile.progress?.detective?.easy?.stars || 0) +
    (activeProfile.progress?.detective?.medium?.stars || 0) +
    (activeProfile.progress?.detective?.hard?.stars || 0);

  const tracingStars =
    (activeProfile.progress?.tracing?.easy?.stars || 0) +
    (activeProfile.progress?.tracing?.medium?.stars || 0) +
    (activeProfile.progress?.tracing?.hard?.stars || 0);

  const adabStars =
    (activeProfile.progress?.adab?.easy?.stars || 0) +
    (activeProfile.progress?.adab?.medium?.stars || 0) +
    (activeProfile.progress?.adab?.hard?.stars || 0);

  const totalStars =
    matchingStars +
    lettersStars +
    puzzleStars +
    colorsStars +
    numbersStars +
    memoryStars +
    coloringStars +
    sortingStars +
    hijaiyahStars +
    detectiveStars +
    tracingStars +
    adabStars;

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
    activeProfile.progress?.memory?.hard?.currentLevel || 1,
    activeProfile.progress?.coloring?.easy?.currentLevel || 1,
    activeProfile.progress?.coloring?.medium?.currentLevel || 1,
    activeProfile.progress?.coloring?.hard?.currentLevel || 1,
    activeProfile.progress?.sorting?.easy?.currentLevel || 1,
    activeProfile.progress?.sorting?.medium?.currentLevel || 1,
    activeProfile.progress?.sorting?.hard?.currentLevel || 1,
    activeProfile.progress?.hijaiyah?.easy?.currentLevel || 1,
    activeProfile.progress?.hijaiyah?.medium?.currentLevel || 1,
    activeProfile.progress?.hijaiyah?.hard?.currentLevel || 1,
    activeProfile.progress?.detective?.easy?.currentLevel || 1,
    activeProfile.progress?.detective?.medium?.currentLevel || 1,
    activeProfile.progress?.detective?.hard?.currentLevel || 1,
    activeProfile.progress?.tracing?.easy?.currentLevel || 1,
    activeProfile.progress?.tracing?.medium?.currentLevel || 1,
    activeProfile.progress?.tracing?.hard?.currentLevel || 1,
    activeProfile.progress?.adab?.easy?.currentLevel || 1,
    activeProfile.progress?.adab?.medium?.currentLevel || 1,
    activeProfile.progress?.adab?.hard?.currentLevel || 1
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[
              {
                id: "matching",
                title: getTranslation("games.matching.title", {}, language),
                subtitle: getTranslation("games.matching.subtitle", {}, language),
                badgeText: language === "id" ? "Kognitif & Fokus" : "Cognitive & Focus",
                badgeBgColor: "bg-amber-400",
                badgeTextColor: "text-amber-950",
                borderColor: "border-amber-400",
                bgGradient: "bg-gradient-to-br from-amber-100/90 via-white to-orange-50",
                visualBgColor: "bg-amber-200",
                visualBorderColor: "border-amber-400",
                visualEmoji: "🧩",
                visualTextColor: "text-amber-800",
                href: "/learn/matching",
                buttonVariant: "primary" as const,
                buttonIconFill: "fill-amber-950",
                buttonText: getTranslation("dashboard.startPlay", {}, language),
              },
              {
                id: "letters",
                title: getTranslation("games.letters.title", {}, language),
                subtitle: getTranslation("games.letters.subtitle", {}, language),
                badgeText: language === "id" ? "Literasi Dasar" : "Early Literacy",
                badgeBgColor: "bg-pink-400",
                badgeTextColor: "text-white",
                borderColor: "border-pink-400",
                bgGradient: "bg-gradient-to-br from-pink-100/90 via-white to-rose-50",
                visualBgColor: "bg-pink-200",
                visualBorderColor: "border-pink-400",
                visualEmoji: "🔤",
                visualTextColor: "text-pink-700",
                href: "/learn/letters",
                buttonVariant: "pink" as const,
                buttonText: getTranslation("dashboard.startPlay", {}, language),
              },
              {
                id: "puzzle",
                title: getTranslation("games.puzzle.title", {}, language),
                subtitle: getTranslation("games.puzzle.subtitle", {}, language),
                badgeText: language === "id" ? "Spasial & Logika" : "Spatial & Logic",
                badgeBgColor: "bg-sky-500",
                badgeTextColor: "text-white",
                borderColor: "border-sky-400",
                bgGradient: "bg-gradient-to-br from-sky-100/90 via-white to-blue-50",
                visualBgColor: "bg-sky-200",
                visualBorderColor: "border-sky-400",
                visualEmoji: "🖼️",
                visualTextColor: "text-sky-700",
                href: "/learn/puzzle",
                buttonVariant: "indigo" as const,
                buttonText: getTranslation("dashboard.startPlay", {}, language),
              },
              {
                id: "colors",
                title: getTranslation("games.colors.title", {}, language),
                subtitle: getTranslation("games.colors.subtitle", {}, language),
                badgeText: language === "id" ? "Kreatif & Ceria" : "Creative & Bright",
                badgeBgColor: "bg-emerald-500",
                badgeTextColor: "text-white",
                borderColor: "border-emerald-400",
                bgGradient: "bg-gradient-to-br from-emerald-100/90 via-white to-teal-50",
                visualBgColor: "bg-emerald-200",
                visualBorderColor: "border-emerald-400",
                visualEmoji: "🎨",
                visualTextColor: "text-emerald-700",
                href: "/learn/colors",
                buttonVariant: "success" as const,
                buttonText: getTranslation("dashboard.startPlay", {}, language),
              },
              {
                id: "numbers",
                title: getTranslation("games.numbers.title", {}, language),
                subtitle: getTranslation("games.numbers.subtitle", {}, language),
                badgeText: language === "id" ? "Berhitung Ceria" : "Joyful Math",
                badgeBgColor: "bg-amber-500",
                badgeTextColor: "text-white",
                borderColor: "border-amber-400",
                bgGradient: "bg-gradient-to-br from-amber-100/90 via-white to-yellow-50",
                visualBgColor: "bg-amber-200",
                visualBorderColor: "border-amber-400",
                visualEmoji: "🔢",
                visualTextColor: "text-amber-700",
                href: "/learn/numbers",
                buttonVariant: "primary" as const,
                buttonIconFill: "fill-amber-950",
                buttonText: getTranslation("dashboard.startPlay", {}, language),
              },
              {
                id: "memory",
                title: getTranslation("games.memory.title", {}, language),
                subtitle: getTranslation("games.memory.subtitle", {}, language),
                badgeText: language === "id" ? "Ingatan & Fokus" : "Memory & Focus",
                badgeBgColor: "bg-purple-500",
                badgeTextColor: "text-white",
                borderColor: "border-purple-400",
                bgGradient: "bg-gradient-to-br from-purple-100/90 via-white to-pink-50",
                visualBgColor: "bg-purple-200",
                visualBorderColor: "border-purple-400",
                visualEmoji: "🧠",
                visualTextColor: "text-purple-700",
                href: "/learn/memory",
                buttonVariant: "purple" as const,
                buttonText: getTranslation("dashboard.startPlay", {}, language),
              },
              {
                id: "coloring",
                title: getTranslation("games.coloring.title", {}, language),
                subtitle: getTranslation("games.coloring.subtitle", {}, language),
                badgeText: language === "id" ? "Kreatif & Seni" : "Creative & Art",
                badgeBgColor: "bg-pink-500",
                badgeTextColor: "text-white",
                borderColor: "border-pink-400",
                bgGradient: "bg-gradient-to-br from-pink-100/90 via-white to-rose-50",
                visualBgColor: "bg-pink-200",
                visualBorderColor: "border-pink-400",
                visualEmoji: "🎨",
                visualTextColor: "text-pink-700",
                href: "/learn/coloring",
                buttonVariant: "pink" as const,
                buttonText: getTranslation("dashboard.startPlay", {}, language),
              },
              {
                id: "sorting",
                title: getTranslation("games.sorting.title", {}, language),
                subtitle: getTranslation("games.sorting.subtitle", {}, language),
                badgeText: language === "id" ? "Kemandirian & Rapi" : "Life Skills & Logic",
                badgeBgColor: "bg-emerald-600",
                badgeTextColor: "text-white",
                borderColor: "border-emerald-400",
                bgGradient: "bg-gradient-to-br from-emerald-100/90 via-white to-teal-50",
                visualBgColor: "bg-emerald-200",
                visualBorderColor: "border-emerald-400",
                visualEmoji: "📦",
                visualTextColor: "text-emerald-700",
                href: "/learn/sorting",
                buttonVariant: "success" as const,
                buttonText: getTranslation("dashboard.startPlay", {}, language),
              },
              {
                id: "hijaiyah",
                title: getTranslation("games.hijaiyah.title", {}, language),
                subtitle: getTranslation("games.hijaiyah.subtitle", {}, language),
                badgeText: language === "id" ? "Literasi Qur'ani" : "Islamic Literacy",
                badgeBgColor: "bg-teal-600",
                badgeTextColor: "text-white",
                borderColor: "border-teal-400",
                bgGradient: "bg-gradient-to-br from-teal-100/90 via-white to-emerald-50",
                visualBgColor: "bg-teal-200",
                visualBorderColor: "border-teal-400",
                visualEmoji: "🕌",
                visualTextColor: "text-teal-800",
                href: "/learn/hijaiyah",
                buttonVariant: "success" as const,
                buttonText: getTranslation("dashboard.startPlay", {}, language),
              },
              {
                id: "detective",
                title: getTranslation("games.detective.title", {}, language),
                subtitle: getTranslation("games.detective.subtitle", {}, language),
                badgeText: language === "id" ? "Observasi & Fokus" : "Observation & Focus",
                badgeBgColor: "bg-amber-500",
                badgeTextColor: "text-amber-950",
                borderColor: "border-amber-400",
                bgGradient: "bg-gradient-to-br from-amber-100/90 via-white to-orange-50",
                visualBgColor: "bg-amber-200",
                visualBorderColor: "border-amber-400",
                visualEmoji: "🔍",
                visualTextColor: "text-amber-800",
                href: "/learn/detective",
                buttonVariant: "primary" as const,
                buttonIconFill: "fill-amber-950",
                buttonText: getTranslation("dashboard.startPlay", {}, language),
              },
              {
                id: "tracing",
                title: getTranslation("games.tracing.title", {}, language),
                subtitle: getTranslation("games.tracing.subtitle", {}, language),
                badgeText: language === "id" ? "Motorik & Pra-Tulis" : "Motor Skills & Tracing",
                badgeBgColor: "bg-indigo-600",
                badgeTextColor: "text-white",
                borderColor: "border-indigo-400",
                bgGradient: "bg-gradient-to-br from-indigo-100/90 via-white to-purple-50",
                visualBgColor: "bg-indigo-200",
                visualBorderColor: "border-indigo-400",
                visualEmoji: "✏️",
                visualTextColor: "text-indigo-800",
                href: "/learn/tracing",
                buttonVariant: "purple" as const,
                buttonText: getTranslation("dashboard.startPlay", {}, language),
              },
              {
                id: "adab",
                title: getTranslation("games.adab.title", {}, language),
                subtitle: getTranslation("games.adab.subtitle", {}, language),
                badgeText: language === "id" ? "Karakter & Akhlak" : "Character & Habits",
                badgeBgColor: "bg-emerald-600",
                badgeTextColor: "text-white",
                borderColor: "border-emerald-400",
                bgGradient: "bg-gradient-to-br from-emerald-100/90 via-white to-teal-50",
                visualBgColor: "bg-emerald-200",
                visualBorderColor: "border-emerald-400",
                visualEmoji: "🌟",
                visualTextColor: "text-emerald-800",
                href: "/learn/adab",
                buttonVariant: "success" as const,
                buttonText: getTranslation("dashboard.startPlay", {}, language),
              },
            ].map((game) => (
              <GameMenuCard key={game.id} {...game} />
            ))}

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
