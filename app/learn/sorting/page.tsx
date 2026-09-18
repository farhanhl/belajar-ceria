"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChildNavbar } from "@/components/navigation/ChildNavbar";
import { Teacher } from "@/components/teacher/Teacher";
import { ChildButton } from "@/components/ui/ChildButton";
import { ChildCard } from "@/components/ui/ChildCard";
import { SORTING_THEMES } from "@/games/sorting/data/sorting-data";
import { SortingThemeDefinition, SortingThemeId } from "@/games/sorting/types";
import { Difficulty } from "@/types/game";
import { useSortingGameStore } from "@/stores/sorting-game-store";
import { useSettingsStore } from "@/stores/settings-store";
import { soundFx } from "@/lib/audio/sound-fx";
import { getTranslation } from "@/lib/i18n";
import { motion } from "motion/react";
import { Boxes, Play, ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";

export default function SortingSelectPage() {
  const router = useRouter();
  const { startSession } = useSortingGameStore();
  const { language, soundEnabled, volume } = useSettingsStore();

  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>("easy");

  const handleStartGame = (theme: SortingThemeDefinition) => {
    if (soundEnabled) soundFx.playClick(volume);
    startSession(theme.id, selectedDifficulty);
    router.push("/learn/sorting/play");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <ChildNavbar />

      <main className="flex-1 max-w-6xl w-full mx-auto space-y-6 py-8">
        {/* Header Back & Title */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/learn">
            <ChildButton variant="secondary" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>{getTranslation("app.back", {}, language)}</span>
            </ChildButton>
          </Link>

          <div className="text-center sm:text-right space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-950 px-3 py-1 rounded-full text-xs font-black">
              <Boxes className="w-3.5 h-3.5 text-emerald-600" />
              <span>{getTranslation("games.sorting.moduleBadge", {}, language)}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-amber-950 tracking-tight">
              {getTranslation("games.sorting.title", {}, language)} 📦
            </h1>
          </div>
        </div>

        {/* Teacher Guide */}
        <Teacher
          expression="happy"
          message={getTranslation("games.sorting.teacherWelcome", {}, language)}
          className="w-full"
        />

        {/* Difficulty Selection Bar */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-4 border-2 border-amber-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs sm:text-sm font-black text-slate-700 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{getTranslation("common.difficulty", {}, language)}:</span>
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (soundEnabled) soundFx.playClick(volume);
                setSelectedDifficulty("easy");
              }}
              className={`px-4 py-2 rounded-2xl font-extrabold text-xs sm:text-sm transition cursor-pointer ${selectedDifficulty === "easy"
                  ? "bg-emerald-500 text-white shadow-md ring-2 ring-emerald-300 scale-102"
                  : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                }`}
            >
              🌱 {getTranslation("common.easy", {}, language)} (2 {language === "en" ? "bins" : "wadah"})
            </button>
            <button
              type="button"
              onClick={() => {
                if (soundEnabled) soundFx.playClick(volume);
                setSelectedDifficulty("medium");
              }}
              className={`px-4 py-2 rounded-2xl font-extrabold text-xs sm:text-sm transition cursor-pointer ${selectedDifficulty === "medium"
                  ? "bg-amber-500 text-white shadow-md ring-2 ring-amber-300 scale-102"
                  : "bg-amber-50 text-amber-800 hover:bg-amber-100"
                }`}
            >
              ⭐ {getTranslation("common.medium", {}, language)} (3 {language === "en" ? "bins" : "wadah"})
            </button>
            <button
              type="button"
              onClick={() => {
                if (soundEnabled) soundFx.playClick(volume);
                setSelectedDifficulty("hard");
              }}
              className={`px-4 py-2 rounded-2xl font-extrabold text-xs sm:text-sm transition cursor-pointer ${selectedDifficulty === "hard"
                  ? "bg-purple-600 text-white shadow-md ring-2 ring-purple-300 scale-102"
                  : "bg-purple-50 text-purple-800 hover:bg-purple-100"
                }`}
            >
              👑 {getTranslation("common.hard", {}, language)} ({language === "en" ? "Full challenge" : "Semua wadah"})
            </button>
          </div>
        </div>

        {/* Theme Catalog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {SORTING_THEMES.map((theme, idx) => (
            <motion.div
              key={theme.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleStartGame(theme)}
              className="cursor-pointer"
            >
              <ChildCard
                borderColor={theme.borderColor}
                className="h-full flex flex-col justify-between p-5 bg-white/95 hover:shadow-2xl transition-all group"
              >
                <div className="space-y-4">
                  {/* Banner / Visual Header */}
                  <div
                    className={`aspect-video w-full rounded-2xl bg-gradient-to-br ${theme.bgGradient} border-2 border-white shadow-inner p-4 flex flex-col items-center justify-center relative overflow-hidden`}
                  >
                    <span className="text-5xl sm:text-6xl filter drop-shadow-md transition-transform group-hover:scale-110">
                      {theme.icon}
                    </span>

                    {/* Mini category previews */}
                    <div className="absolute bottom-2 flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs shadow-sm">
                      {theme.categories.map((c) => (
                        <span key={c.id} title={c.name[language] || c.name.id}>
                          {c.icon}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-amber-950 group-hover:text-emerald-700 transition-colors">
                      {theme.name[language] || theme.name.id}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-semibold line-clamp-2 mt-1">
                      {theme.description[language] || theme.description.id}
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <ChildButton
                    variant="primary"
                    size="sm"
                    icon={<Play className="w-4 h-4 fill-amber-950" />}
                    className="w-full text-xs sm:text-sm font-black group-hover:shadow-lg"
                  >
                    {getTranslation("games.sorting.startSortingBtn", {}, language)}
                  </ChildButton>
                </div>
              </ChildCard>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
