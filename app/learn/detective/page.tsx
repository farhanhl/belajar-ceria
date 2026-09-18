"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDetectiveGameStore } from "@/stores/detective-game-store";
import { useSettingsStore } from "@/stores/settings-store";
import { Teacher } from "@/components/teacher/Teacher";
import { ChildNavbar } from "@/components/navigation/ChildNavbar";
import { ChildPageHeader } from "@/components/navigation/ChildPageHeader";
import { DetectiveSceneCard } from "@/games/detective/components/DetectiveSceneCard";
import { DETECTIVE_SCENES } from "@/games/detective/data/detective-scenes";
import { DetectiveDifficulty, DetectiveScene } from "@/games/detective/types";
import { soundFx } from "@/lib/audio/sound-fx";
import { getTranslation } from "@/lib/i18n";
import { Sparkles } from "lucide-react";

export default function DetectiveMenuPage() {
  const router = useRouter();
  const { startMission, setSelectedDifficulty, selectedDifficulty } = useDetectiveGameStore();
  const { language, soundEnabled, volume } = useSettingsStore();

  const handleStartScene = (scene: DetectiveScene) => {
    if (soundEnabled) soundFx.playClick(volume);
    startMission(scene.id, selectedDifficulty);
    router.push("/learn/detective/play");
  };

  const handleSelectDifficulty = (diff: DetectiveDifficulty) => {
    if (soundEnabled) soundFx.playClick(volume);
    setSelectedDifficulty(diff);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <ChildNavbar />

      <main className="flex-1 max-w-6xl w-full mx-auto space-y-6 py-8">
        {/* Uniform Header */}
        <ChildPageHeader
          title={getTranslation("games.detective.titleFull", {}, language)}
          backHref="/learn"
        />

        {/* Teacher Welcome */}
        <Teacher
          expression="happy"
          message={getTranslation("games.detective.teacherWelcome", {}, language)}
          className="w-full"
        />

        {/* Difficulty Selection Bar */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-4 sm:p-5 border-3 border-amber-300 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span className="font-extrabold text-amber-950 text-sm sm:text-base">
              {getTranslation("games.detective.chooseDifficulty", {}, language)}:
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
              🌱 {getTranslation("games.detective.easyBtn", {}, language)}
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
              ⭐ {getTranslation("games.detective.medBtn", {}, language)}
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
              👑 {getTranslation("games.detective.hardBtn", {}, language)}
            </button>
          </div>
        </div>

        {/* Scene Themes Catalog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {DETECTIVE_SCENES.map((scene) => (
            <DetectiveSceneCard
              key={scene.id}
              scene={scene}
              difficulty={selectedDifficulty}
              onClick={() => handleStartScene(scene)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
