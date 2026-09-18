"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdabGameStore } from "@/stores/adab-game-store";
import { useSettingsStore } from "@/stores/settings-store";
import { Teacher } from "@/components/teacher/Teacher";
import { ChildNavbar } from "@/components/navigation/ChildNavbar";
import { ChildPageHeader } from "@/components/navigation/ChildPageHeader";
import { AdabCategoryTabs } from "@/games/adab/components/AdabCategoryTabs";
import { getScenariosByCategory } from "@/games/adab/lib/adab-engine";
import { AdabCategory, AdabScenario } from "@/games/adab/types";
import { Difficulty } from "@/types/game";
import { soundFx } from "@/lib/audio/sound-fx";
import { getTranslation } from "@/lib/i18n";
import { Sparkles, Play, BookOpen, Heart } from "lucide-react";
import { motion } from "motion/react";

export default function AdabMenuPage() {
  const router = useRouter();
  const { startSession } = useAdabGameStore();
  const { language, soundEnabled, volume } = useSettingsStore();

  const [activeCategory, setActiveCategory] = useState<AdabCategory>("eating");
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>("easy");

  const categoryScenarios = getScenariosByCategory(activeCategory, selectedDifficulty);

  const handleStartGame = () => {
    if (soundEnabled) soundFx.playClick(volume);
    startSession(activeCategory, selectedDifficulty);
    router.push("/learn/adab/play");
  };

  const handleSelectCategory = (cat: AdabCategory) => {
    if (soundEnabled) soundFx.playClick(volume);
    setActiveCategory(cat);
  };

  const handleSelectDifficulty = (diff: Difficulty) => {
    if (soundEnabled) soundFx.playClick(volume);
    setSelectedDifficulty(diff);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <ChildNavbar />

      <main className="flex-1 max-w-6xl w-full mx-auto space-y-6 py-8 px-4">
        {/* Uniform Header */}
        <ChildPageHeader
          title={getTranslation("games.adab.titleFull", {}, language)}
          backHref="/learn"
        />

        {/* Teacher Welcome */}
        <Teacher
          expression="happy"
          message={getTranslation("games.adab.teacherWelcome", {}, language)}
          className="w-full"
        />

        {/* Difficulty Selection Bar */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-4 sm:p-5 border-3 border-emerald-300 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-500" />
            <span className="font-extrabold text-emerald-950 text-sm sm:text-base">
              {getTranslation("games.adab.chooseDifficulty", {}, language)}:
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto justify-center">
            <button
              type="button"
              onClick={() => handleSelectDifficulty("easy")}
              className={`flex-1 md:flex-none px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm cursor-pointer transition-all border-2 ${
                selectedDifficulty === "easy"
                  ? "bg-emerald-500 text-white border-emerald-600 shadow-lg ring-4 ring-emerald-200 scale-105"
                  : "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
              }`}
            >
              {getTranslation("games.adab.easyBtn", {}, language)}
            </button>
            <button
              type="button"
              onClick={() => handleSelectDifficulty("medium")}
              className={`flex-1 md:flex-none px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm cursor-pointer transition-all border-2 ${
                selectedDifficulty === "medium"
                  ? "bg-amber-500 text-white border-amber-600 shadow-lg ring-4 ring-amber-200 scale-105"
                  : "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100"
              }`}
            >
              {getTranslation("games.adab.medBtn", {}, language)}
            </button>
            <button
              type="button"
              onClick={() => handleSelectDifficulty("hard")}
              className={`flex-1 md:flex-none px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm cursor-pointer transition-all border-2 ${
                selectedDifficulty === "hard"
                  ? "bg-rose-500 text-white border-rose-600 shadow-lg ring-4 ring-rose-200 scale-105"
                  : "bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100"
              }`}
            >
              {getTranslation("games.adab.hardBtn", {}, language)}
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <AdabCategoryTabs
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
        />

        {/* Hero Card for Starting the Session */}
        <div className="bg-gradient-to-br from-emerald-100/90 via-white to-teal-50 rounded-3xl p-6 sm:p-8 border-4 border-emerald-300 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-6 text-center md:text-left">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-emerald-200 border-3 border-emerald-400 flex items-center justify-center text-4xl sm:text-5xl shadow-inner shrink-0">
              🌟
            </div>
            <div className="space-y-1.5">
              <h3 className="text-xl sm:text-2xl font-black text-emerald-950">
                {getTranslation("games.adab.heroTitle", {}, language)}
              </h3>
              <p className="text-xs sm:text-sm font-bold text-emerald-800 max-w-lg">
                {getTranslation(
                  "games.adab.heroDesc",
                  { count: categoryScenarios.length },
                  language
                )}
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartGame}
            className="w-full md:w-auto px-8 py-4 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-base shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-3 cursor-pointer border-2 border-emerald-700"
          >
            <Play className="w-6 h-6 fill-white" />
            <span>{getTranslation("games.adab.startQuiz", {}, language)}</span>
          </motion.button>
        </div>

        {/* Scenarios Preview List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {categoryScenarios.map((scenario, index) => {
            const title = scenario.title[language] || scenario.title.id;
            const situation = scenario.situation[language] || scenario.situation.id;

            return (
              <motion.div
                key={scenario.id}
                whileHover={{ y: -4 }}
                className="bg-white/95 backdrop-blur-sm rounded-3xl p-5 border-3 border-emerald-200 shadow-md flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl p-2 rounded-2xl bg-emerald-50 border border-emerald-100 shadow-xs">
                      {scenario.sceneEmoji}
                    </span>
                    <span className="text-[11px] font-black uppercase text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                      #{index + 1}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-black text-slate-800 text-base mb-1">
                      {title}
                    </h4>
                    <p className="text-xs font-bold text-slate-500 line-clamp-2 leading-relaxed">
                      {situation}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-black text-emerald-600 flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-emerald-500" />
                    {scenario.associatedDoa
                      ? getTranslation("games.adab.includesPrayer", {}, language)
                      : getTranslation("games.adab.habitPractice", {}, language)}
                  </span>

                  <button
                    onClick={handleStartGame}
                    className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors cursor-pointer"
                    title={getTranslation("games.adab.startQuiz", {}, language)}
                  >
                    <Play className="w-4 h-4 fill-emerald-700" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
