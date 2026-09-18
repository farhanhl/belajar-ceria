"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChildNavbar } from "@/components/navigation/ChildNavbar";
import { Teacher } from "@/components/teacher/Teacher";
import { ChildButton } from "@/components/ui/ChildButton";
import { ChildCard } from "@/components/ui/ChildCard";
import { PUZZLE_CATALOG } from "@/games/puzzle/data/puzzles-data";
import { PuzzleArtwork } from "@/games/puzzle/components/PuzzleArtwork";
import { PuzzleDifficulty, PuzzleItem, PuzzleTheme } from "@/games/puzzle/types";
import { usePuzzleGameStore } from "@/stores/puzzle-game-store";
import { useSettingsStore } from "@/stores/settings-store";
import { soundFx } from "@/lib/audio/sound-fx";
import { getTranslation } from "@/lib/i18n";
import { motion } from "motion/react";
import { Sparkles, Grid, Play, Layers, ArrowLeft, Trophy } from "lucide-react";
import Link from "next/link";

export default function PuzzleSelectPage() {
  const router = useRouter();
  const { startPuzzle } = usePuzzleGameStore();
  const { language, soundEnabled, volume } = useSettingsStore();

  const [selectedTheme, setSelectedTheme] = useState<"all" | PuzzleTheme>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<PuzzleDifficulty>("easy");

  const filteredPuzzles =
    selectedTheme === "all"
      ? PUZZLE_CATALOG
      : PUZZLE_CATALOG.filter((p) => p.theme === selectedTheme);

  const handleStartPuzzle = (puzzle: PuzzleItem) => {
    if (soundEnabled) soundFx.playClick(volume);
    startPuzzle(puzzle.id, selectedDifficulty);
    router.push("/learn/puzzle/play");
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
            <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-950 px-3 py-1 rounded-full text-xs font-black">
              <Layers className="w-3.5 h-3.5 text-amber-600" />
              <span>{getTranslation("games.puzzle.moduleBadge", {}, language)}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-amber-950 tracking-tight">
              {getTranslation("games.puzzle.title", {}, language)} 🧩
            </h1>
          </div>
        </div>

        {/* Teacher Guide */}
        <Teacher
          expression="happy"
          message={getTranslation("games.puzzle.teacherWelcome", {}, language)}
          className="w-full"
        />

        {/* Difficulty Selector Bar */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-4 sm:p-5 border-3 border-amber-300 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span className="font-extrabold text-amber-950 text-sm sm:text-base">
              {getTranslation("games.puzzle.chooseDifficulty", {}, language)}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto justify-center">
            <button
              onClick={() => {
                if (soundEnabled) soundFx.playClick(volume);
                setSelectedDifficulty("easy");
              }}
              className={`flex-1 md:flex-none px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm cursor-pointer transition-all ${
                selectedDifficulty === "easy"
                  ? "bg-emerald-500 text-white shadow-lg ring-4 ring-emerald-200 scale-105"
                  : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
              }`}
            >
              {getTranslation("games.puzzle.easyBtn", {}, language)}
            </button>
            <button
              onClick={() => {
                if (soundEnabled) soundFx.playClick(volume);
                setSelectedDifficulty("medium");
              }}
              className={`flex-1 md:flex-none px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm cursor-pointer transition-all ${
                selectedDifficulty === "medium"
                  ? "bg-amber-500 text-white shadow-lg ring-4 ring-amber-200 scale-105"
                  : "bg-amber-50 text-amber-800 hover:bg-amber-100"
              }`}
            >
              {getTranslation("games.puzzle.medBtn", {}, language)}
            </button>
            <button
              onClick={() => {
                if (soundEnabled) soundFx.playClick(volume);
                setSelectedDifficulty("hard");
              }}
              className={`flex-1 md:flex-none px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm cursor-pointer transition-all ${
                selectedDifficulty === "hard"
                  ? "bg-rose-500 text-white shadow-lg ring-4 ring-rose-200 scale-105"
                  : "bg-rose-50 text-rose-800 hover:bg-rose-100"
              }`}
            >
              {getTranslation("games.puzzle.hardBtn", {}, language)}
            </button>
          </div>
        </div>

        {/* Theme Filter Tabs */}
        <div className="flex items-center gap-2.5 overflow-x-auto px-1.5 sm:px-2 py-1 scrollbar-none">
          <button
            onClick={() => {
              if (soundEnabled) soundFx.playClick(volume);
              setSelectedTheme("all");
            }}
            className={`px-4 py-2 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-all ${
              selectedTheme === "all"
                ? "bg-amber-400 text-amber-950 shadow-md scale-102 ring-2 ring-amber-500/50"
                : "bg-white/80 text-amber-900 hover:bg-white shadow-sm hover:scale-102"
            }`}
          >
            {getTranslation("games.puzzle.allThemes", { count: PUZZLE_CATALOG.length }, language)}
          </button>
          <button
            onClick={() => {
              if (soundEnabled) soundFx.playClick(volume);
              setSelectedTheme("muslimah");
            }}
            className={`px-4 py-2 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-all ${
              selectedTheme === "muslimah"
                ? "bg-amber-400 text-amber-950 shadow-md scale-102 ring-2 ring-amber-500/50"
                : "bg-white/80 text-amber-900 hover:bg-white shadow-sm hover:scale-102"
            }`}
          >
            {getTranslation("games.puzzle.themeMuslimah", {}, language)}
          </button>
          <button
            onClick={() => {
              if (soundEnabled) soundFx.playClick(volume);
              setSelectedTheme("animals");
            }}
            className={`px-4 py-2 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-all ${
              selectedTheme === "animals"
                ? "bg-amber-400 text-amber-950 shadow-md scale-102 ring-2 ring-amber-500/50"
                : "bg-white/80 text-amber-900 hover:bg-white shadow-sm hover:scale-102"
            }`}
          >
            {getTranslation("games.puzzle.themeAnimals", {}, language)}
          </button>
          <button
            onClick={() => {
              if (soundEnabled) soundFx.playClick(volume);
              setSelectedTheme("vehicles");
            }}
            className={`px-4 py-2 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-all ${
              selectedTheme === "vehicles"
                ? "bg-amber-400 text-amber-950 shadow-md scale-102 ring-2 ring-amber-500/50"
                : "bg-white/80 text-amber-900 hover:bg-white shadow-sm hover:scale-102"
            }`}
          >
            {getTranslation("games.puzzle.themeVehicles", {}, language)}
          </button>
          <button
            onClick={() => {
              if (soundEnabled) soundFx.playClick(volume);
              setSelectedTheme("nature");
            }}
            className={`px-4 py-2 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-all ${
              selectedTheme === "nature"
                ? "bg-amber-400 text-amber-950 shadow-md scale-102 ring-2 ring-amber-500/50"
                : "bg-white/80 text-amber-900 hover:bg-white shadow-sm hover:scale-102"
            }`}
          >
            {getTranslation("games.puzzle.themeNature", {}, language)}
          </button>
          <button
            onClick={() => {
              if (soundEnabled) soundFx.playClick(volume);
              setSelectedTheme("space");
            }}
            className={`px-4 py-2 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-all ${
              selectedTheme === "space"
                ? "bg-amber-400 text-amber-950 shadow-md scale-102 ring-2 ring-amber-500/50"
                : "bg-white/80 text-amber-900 hover:bg-white shadow-sm hover:scale-102"
            }`}
          >
            {getTranslation("games.puzzle.themeSpace", {}, language)}
          </button>
        </div>

        {/* Puzzle Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredPuzzles.map((puzzle, idx) => (
            <motion.div
              key={puzzle.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.03 }}
              className="cursor-pointer"
              onClick={() => handleStartPuzzle(puzzle)}
            >
              <ChildCard
                borderColor="border-amber-300"
                className="h-full flex flex-col justify-between p-4 bg-white/95 hover:shadow-2xl transition-all group"
              >
                <div className="space-y-3">
                  {/* Thumbnail */}
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-inner border-2 border-amber-100 group-hover:border-amber-400 transition-colors">
                    <PuzzleArtwork artworkId={puzzle.artworkId} />
                    <span
                      className={`absolute top-2 left-2 ${puzzle.badgeColor} text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm`}
                    >
                      {puzzle.themeName[language] || puzzle.themeName.id}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-amber-950 group-hover:text-amber-600 transition-colors">
                      {puzzle.title[language] || puzzle.title.id}
                    </h3>
                    <p className="text-xs text-slate-600 font-semibold line-clamp-2 mt-0.5">
                      {puzzle.description[language] || puzzle.description.id}
                    </p>
                  </div>
                </div>

                <div className="pt-3">
                  <ChildButton
                    variant="primary"
                    size="sm"
                    icon={<Play className="w-4 h-4 fill-amber-950" />}
                    className="w-full text-xs sm:text-sm font-black group-hover:shadow-lg"
                  >
                    {getTranslation("games.puzzle.assembleBtn", {}, language)}
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
