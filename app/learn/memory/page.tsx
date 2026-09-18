"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useProfileStore } from "@/stores/profile-store";
import { useSettingsStore } from "@/stores/settings-store";
import { useMemoryGameStore } from "@/stores/memory-game-store";
import { ChildNavbar } from "@/components/navigation/ChildNavbar";
import { ChildPageHeader } from "@/components/navigation/ChildPageHeader";
import { Teacher } from "@/components/teacher/Teacher";
import { ChildCard } from "@/components/ui/ChildCard";
import { ChildButton } from "@/components/ui/ChildButton";
import { MEMORY_THEMES } from "@/games/memory/data/memory-data";
import { MemoryThemeId } from "@/games/memory/types";
import { Difficulty } from "@/types/game";
import { soundFx } from "@/lib/audio/sound-fx";
import { getTranslation } from "@/lib/i18n";
import { motion } from "motion/react";
import { Play, Sparkles, Brain, Star, ArrowLeft } from "lucide-react";

export default function MemoryMenuPage() {
  const router = useRouter();
  const { activeProfile } = useProfileStore();
  const { language, soundEnabled, volume } = useSettingsStore();
  const { startGame } = useMemoryGameStore();

  const [selectedTheme, setSelectedTheme] = useState<MemoryThemeId>("animals");
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>("easy");

  const childName = activeProfile?.name || (language === "id" ? "Teman" : "Friend");

  const easyStars = activeProfile?.progress?.memory?.easy?.stars || 0;
  const mediumStars = activeProfile?.progress?.memory?.medium?.stars || 0;
  const hardStars = activeProfile?.progress?.memory?.hard?.stars || 0;

  const handleStartGame = () => {
    if (soundEnabled) soundFx.playClick(volume);
    startGame(selectedTheme, selectedDifficulty);
    router.push("/learn/memory/play");
  };

  const numbersStars =
    (activeProfile?.progress?.memory?.easy?.stars || 0) +
    (activeProfile?.progress?.memory?.medium?.stars || 0) +
    (activeProfile?.progress?.memory?.hard?.stars || 0);

  return (
    <div className="min-h-screen flex flex-col justify-between pb-8">
      <ChildNavbar />

      <main className="flex-1 max-w-6xl w-full mx-auto space-y-6 py-8">
        {/* Uniform Header */}
        <ChildPageHeader
          title={getTranslation("games.memory.title", {}, language)}
          backHref="/learn"
        />
        {/* Teacher Guidance Greeting */}
        <Teacher
          expression="happy"
          message={getTranslation("games.memory.teacherWelcome", {}, language)}
        />

        {/* Section: Pilih Tema Kartu */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600 fill-purple-400" />
            <h2 className="text-2xl sm:text-3xl font-black text-purple-950 tracking-tight">
              {getTranslation("games.memory.themeTitle", {}, language)}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {MEMORY_THEMES.map((theme) => {
              const isSelected = selectedTheme === theme.id;
              return (
                <motion.div
                  key={theme.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedTheme(theme.id);
                    if (soundEnabled) soundFx.playClick(volume * 0.7);
                  }}
                  className="cursor-pointer h-full"
                >
                  <ChildCard
                    borderColor={isSelected ? theme.borderColor : "border-slate-200"}
                    bgGradient={
                      isSelected
                        ? "bg-gradient-to-br from-purple-50/90 via-white to-pink-50/90"
                        : "bg-white"
                    }
                    className={`p-4 h-full flex flex-col justify-between transition-all ${
                      isSelected ? "shadow-xl ring-4 ring-purple-200" : "hover:border-purple-300"
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-4xl select-none">{theme.icon}</span>
                        <span
                          className={`text-[11px] font-black px-2.5 py-0.5 rounded-full text-white ${theme.badgeColor}`}
                        >
                          {getTranslation("games.memory.cardsCount", { count: theme.cards.length }, language)}
                        </span>
                      </div>
                      <h3 className="text-lg font-black text-purple-950">
                        {theme.name[language] || theme.name.id}
                      </h3>
                      <p className="text-xs text-slate-600 font-semibold line-clamp-2">
                        {theme.description[language] || theme.description.id}
                      </p>
                    </div>

                    <div className="pt-3 flex items-center gap-1.5 text-xs font-black text-purple-700">
                      <div className="flex gap-1 text-base">
                        {theme.cards.slice(0, 4).map((c) => (
                          <span key={c.id}>{c.emoji}</span>
                        ))}
                      </div>
                    </div>
                  </ChildCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Section: Pilih Tingkat Kesulitan */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl sm:text-3xl font-black text-purple-950 tracking-tight">
              {getTranslation("games.difficulty.selectDifficulty", {}, language)}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Easy */}
            <button
              type="button"
              onClick={() => {
                setSelectedDifficulty("easy");
                if (soundEnabled) soundFx.playClick(volume * 0.7);
              }}
              className={`p-4 rounded-3xl border-4 text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                selectedDifficulty === "easy"
                  ? "bg-emerald-50 border-emerald-400 ring-4 ring-emerald-200 shadow-lg scale-102"
                  : "bg-white border-slate-200 hover:border-emerald-300"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-black uppercase text-emerald-800 bg-emerald-200 px-2.5 py-0.5 rounded-full">
                  🟢 {getTranslation("games.difficulty.easy", {}, language)}
                </span>
                <span className="text-xs text-emerald-700 font-extrabold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" /> {easyStars}
                </span>
              </div>
              <div>
                <h4 className="text-lg font-black text-emerald-950">{getTranslation("games.difficulty.easy", {}, language)}</h4>
                <p className="text-xs text-emerald-800 font-semibold">
                  {getTranslation("games.memory.easyDesc", {}, language)}
                </p>
              </div>
            </button>

            {/* Medium */}
            <button
              type="button"
              onClick={() => {
                setSelectedDifficulty("medium");
                if (soundEnabled) soundFx.playClick(volume * 0.7);
              }}
              className={`p-4 rounded-3xl border-4 text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                selectedDifficulty === "medium"
                  ? "bg-amber-50 border-amber-400 ring-4 ring-amber-200 shadow-lg scale-102"
                  : "bg-white border-slate-200 hover:border-amber-300"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-black uppercase text-amber-900 bg-amber-200 px-2.5 py-0.5 rounded-full">
                  🟡 {getTranslation("games.difficulty.medium", {}, language)}
                </span>
                <span className="text-xs text-amber-800 font-extrabold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" /> {mediumStars}
                </span>
              </div>
              <div>
                <h4 className="text-lg font-black text-amber-950">{getTranslation("games.difficulty.medium", {}, language)}</h4>
                <p className="text-xs text-amber-800 font-semibold">
                  {getTranslation("games.memory.medDesc", {}, language)}
                </p>
              </div>
            </button>

            {/* Hard */}
            <button
              type="button"
              onClick={() => {
                setSelectedDifficulty("hard");
                if (soundEnabled) soundFx.playClick(volume * 0.7);
              }}
              className={`p-4 rounded-3xl border-4 text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                selectedDifficulty === "hard"
                  ? "bg-purple-50 border-purple-400 ring-4 ring-purple-200 shadow-lg scale-102"
                  : "bg-white border-slate-200 hover:border-purple-300"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-black uppercase text-purple-900 bg-purple-200 px-2.5 py-0.5 rounded-full">
                  🔴 {getTranslation("games.difficulty.hard", {}, language)}
                </span>
                <span className="text-xs text-purple-800 font-extrabold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" /> {hardStars}
                </span>
              </div>
              <div>
                <h4 className="text-lg font-black text-purple-950">{getTranslation("games.difficulty.hard", {}, language)}</h4>
                <p className="text-xs text-purple-800 font-semibold">
                  {getTranslation("games.memory.hardDesc", {}, language)}
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Start Game Action Button */}
        <div className="pt-4 flex flex-row items-stretch justify-center gap-4 w-full">
          <ChildButton
            variant="purple"
            size="lg"
            icon={<Play className="w-5 h-5 fill-white" />}
            onClick={handleStartGame}
            className="flex-1"
          >
            {getTranslation("app.startPlay", {}, language)} 🚀
          </ChildButton>

          <Link href="/learn" className="flex-1">
            <ChildButton variant="secondary" size="lg" className="w-full h-full text-slate-700">
              {getTranslation("app.backToMenu", {}, language)}
            </ChildButton>
          </Link>
        </div>
      </main>
    </div>
  );
}
