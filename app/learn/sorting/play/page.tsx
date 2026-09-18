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
  const { activeThemeId, difficulty, startSession, feedbackState, remainingItems, selectedItemId } = useSortingGameStore();
  const { language } = useSettingsStore();

  const theme = getSortingThemeById(activeThemeId);
  const activeItem = remainingItems.find((i) => i.id === selectedItemId) || remainingItems[0] || null;

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

  const getTeacherMessage = () => {
    if (feedbackState.message) {
      return feedbackState.message[language] || feedbackState.message.id;
    }
    if (activeItem) {
      return language === "en"
        ? `Drag "${activeItem.name.en}" into the right box!`
        : `Tarik "${activeItem.name.id}" ke wadah yang sesuai!`;
    }
    return language === "en" ? "All items organized!" : "Semua barang sudah rapi!";
  };

  const teacherExpression =
    feedbackState.type === "success"
      ? "celebrating"
      : feedbackState.type === "wrong"
      ? "thinking"
      : "happy";

  return (
    <div className="min-h-screen flex flex-col">
      <ChildNavbar />

      <main className="flex-1 max-w-6xl w-full mx-auto space-y-2 sm:space-y-3 py-2 sm:py-3 px-3 sm:px-6">
        {/* Header Action Bar */}
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <Link href="/learn/sorting">
            <ChildButton variant="secondary" size="sm" className="gap-2 text-xs font-black">
              <ArrowLeft className="w-4 h-4" />
              <span>{getTranslation("games.sorting.chooseThemeBtn", {}, language)}</span>
            </ChildButton>
          </Link>

          {/* Theme Title Badge */}
          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-emerald-100 text-emerald-950 px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-black shadow-sm">
              <Boxes className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
              <span>{theme?.name[language] || theme?.name.id || "Pilah & Rapikan"}</span>
              <span className="text-[10px] sm:text-[11px] bg-white px-2 py-0.5 rounded-full text-emerald-800">
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
          expression={teacherExpression}
          message={getTeacherMessage()}
          size={50}
          className="w-full"
        />

        {/* Interactive Sorting Game Board */}
        <SortingGameBoard />
      </main>
    </div>
  );
}
