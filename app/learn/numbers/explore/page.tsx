"use client";

import React from "react";
import { NUMBERS_CATALOG } from "@/games/numbers/data/numbers-data";
import { NumberExploreCard } from "@/games/numbers/components/NumberExploreCard";
import { ChildNavbar } from "@/components/navigation/ChildNavbar";
import { ChildPageHeader } from "@/components/navigation/ChildPageHeader";
import { Teacher } from "@/components/teacher/Teacher";
import { useSettingsStore } from "@/stores/settings-store";
import { getTranslation } from "@/lib/i18n";

export default function NumbersExplorePage() {
  const { language } = useSettingsStore();

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <ChildNavbar />

      <main className="flex-1 max-w-6xl w-full mx-auto space-y-6 py-8">
        {/* Uniform Header */}
        <ChildPageHeader
          title={getTranslation("games.numbers.exploreMode", {}, language)}
          backHref="/learn/numbers"
          backLabel={getTranslation("app.back", {}, language)}
        />

        {/* Teacher Avatar Feedback */}
        <Teacher
          expression="happy"
          message={getTranslation("games.numbers.teacherExploreWelcome", {}, language)}
          className="w-full"
        />

        {/* Numbers Grid 1 to 10 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {NUMBERS_CATALOG.map((item) => (
            <NumberExploreCard key={item.number} item={item} />
          ))}
        </div>
      </main>
    </div>
  );
}
