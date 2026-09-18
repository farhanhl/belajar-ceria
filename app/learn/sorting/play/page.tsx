"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChildNavbar } from "@/components/navigation/ChildNavbar";
import { Teacher } from "@/components/teacher/Teacher";
import { ChildButton } from "@/components/ui/ChildButton";
import { SortingGameBoard } from "@/games/sorting/components/SortingGameBoard";
import { useSortingGameStore } from "@/stores/sorting-game-store";
import { useSettingsStore } from "@/stores/settings-store";
import { getSortingThemeById } from "@/games/sorting/data/sorting-data";
import { getTranslation } from "@/lib/i18n";
import { ArrowLeft, Boxes, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function SortingPlayPage() {
  const router = useRouter();
  const { activeThemeId, difficulty, startSession } = useSortingGameStore();
  const { language } = useSettingsStore();

  const theme = getSortingThemeById(activeThemeId);

  // Fallback if user lands on play without starting
  useEffect(() => {
    if (!theme) {
      startSession("bedroom", "easy");
    }
  }, [theme]);

  const handleRestart = () => {
    if (theme) {
      startSession(theme.id, difficulty);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <ChildNavbar />

      <main className="flex-1 max-w-6xl w-full mx-auto space-y-6 py-8">
        {/* Header Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/learn/sorting">
            <ChildButton variant="secondary" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>{getTranslation("games.sorting.chooseThemeBtn", {}, language)}</span>
            </ChildButton>
          </Link>

          {/* Theme Title Badge */}
          <div className="text-center space-y-1">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-950 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black shadow-sm">
              <Boxes className="w-4 h-4 text-emerald-600" />
              <span>{theme?.name[language] || theme?.name.id || "Pilah & Rapikan"}</span>
              <span className="text-[11px] bg-white px-2 py-0.5 rounded-full text-emerald-800">
                {difficulty === "easy"
                  ? "🌱 " + getTranslation("common.easy", {}, language)
                  : difficulty === "medium"
                    ? "⭐ " + getTranslation("common.medium", {}, language)
                    : "👑 " + getTranslation("common.hard", {}, language)}
              </span>
            </div>
          </div>

          {/* Restart Button */}
          <ChildButton
            variant="secondary"
            size="sm"
            onClick={handleRestart}
            className="gap-1.5 text-xs font-black cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{getTranslation("games.sorting.resetBtn", {}, language)}</span>
          </ChildButton>
        </div>

        {/* Teacher Guidance */}
        <Teacher
          expression="happy"
          message={getTranslation("games.sorting.teacherPlayPrompt", {}, language)}
          className="w-full"
        />

        {/* Interactive Sorting Game Board */}
        <SortingGameBoard />
      </main>
    </div>
  );
}
