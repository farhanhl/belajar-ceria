"use client";

import React from "react";
import { ChildNavbar } from "@/components/navigation/ChildNavbar";
import { Teacher } from "@/components/teacher/Teacher";
import { AlphabetGrid } from "@/games/letters/components/AlphabetGrid";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSettingsStore } from "@/stores/settings-store";
import { getTranslation } from "@/lib/i18n";

export default function LetterExplorePage() {
  const { language } = useSettingsStore();

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <ChildNavbar />

      <main className="flex-1 max-w-6xl w-full mx-auto space-y-6 py-8">
        {/* Top Header */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/learn/letters"
            className="p-2.5 sm:px-4 sm:py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-2xl transition flex items-center gap-1.5 font-black text-sm sm:text-base shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{getTranslation("app.back", {}, language)}</span>
          </Link>

          <div className="text-right">
            <h1 className="text-2xl sm:text-4xl font-black text-amber-950 tracking-tight">
              {getTranslation("games.letters.exploreMode", {}, language)}
            </h1>
            <p className="text-xs sm:text-sm font-bold text-amber-700">
              {getTranslation("games.letters.exploreSubtitle", {}, language)}
            </p>
          </div>
        </div>

        {/* Teacher Guidance */}
        <Teacher
          expression="happy"
          message={getTranslation("games.letters.teacherExploreWelcome", {}, language)}
        />

        {/* 26 Letters Grid */}
        <AlphabetGrid />
      </main>
    </div>
  );
}
