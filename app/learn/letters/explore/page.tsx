"use client";

import React from "react";
import { ChildNavbar } from "@/components/navigation/ChildNavbar";
import { ChildPageHeader } from "@/components/navigation/ChildPageHeader";
import { Teacher } from "@/components/teacher/Teacher";
import { AlphabetGrid } from "@/games/letters/components/AlphabetGrid";
import { useSettingsStore } from "@/stores/settings-store";
import { getTranslation } from "@/lib/i18n";

export default function LetterExplorePage() {
  const { language } = useSettingsStore();

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <ChildNavbar />

      <main className="flex-1 max-w-6xl w-full mx-auto space-y-6 py-8">
        {/* Uniform Header */}
        <ChildPageHeader
          title={getTranslation("games.letters.exploreMode", {}, language)}
          backHref="/learn/letters"
          backLabel={getTranslation("app.back", {}, language)}
        />

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
