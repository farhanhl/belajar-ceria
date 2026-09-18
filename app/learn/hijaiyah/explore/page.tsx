"use client";

import React from "react";
import { ChildNavbar } from "@/components/navigation/ChildNavbar";
import { ChildPageHeader } from "@/components/navigation/ChildPageHeader";
import { Teacher } from "@/components/teacher/Teacher";
import { HijaiyahGrid } from "@/games/hijaiyah/components/HijaiyahGrid";
import { useSettingsStore } from "@/stores/settings-store";
import { getTranslation } from "@/lib/i18n";

export default function HijaiyahExplorePage() {
  const { language } = useSettingsStore();

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <ChildNavbar />

      <main className="flex-1 max-w-6xl w-full mx-auto space-y-6 py-8">
        {/* Uniform Header */}
        <ChildPageHeader
          title={getTranslation("games.hijaiyah.exploreMode", {}, language)}
          backHref="/learn/hijaiyah"
        />

        {/* Teacher Instruction */}
        <Teacher
          expression="happy"
          message={
            language === "id"
              ? "Sentuh huruf untuk mendengar suara dan melihat contoh katanya ya!"
              : "Tap any letter to listen to its sound and see example words!"
          }
        />

        {/* 28 Hijaiyah Grid with Harakat Switcher */}
        <HijaiyahGrid />
      </main>
    </div>
  );
}
