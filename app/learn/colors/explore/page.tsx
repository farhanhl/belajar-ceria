"use client";

import React, { useState } from "react";
import { COLORS_CATALOG, SHAPES_CATALOG } from "@/games/colors/data/colors-shapes-data";
import { ColorShapeExploreCard } from "@/games/colors/components/ColorShapeExploreCard";
import { ChildNavbar } from "@/components/navigation/ChildNavbar";
import { ChildPageHeader } from "@/components/navigation/ChildPageHeader";
import { Teacher } from "@/components/teacher/Teacher";
import { ChildButton } from "@/components/ui/ChildButton";
import { useSettingsStore } from "@/stores/settings-store";
import { soundFx } from "@/lib/audio/sound-fx";
import { getTranslation } from "@/lib/i18n";
import { ArrowLeft, Palette, Shapes } from "lucide-react";
import Link from "next/link";

type TabFilter = "all" | "colors" | "shapes";

export default function ColorsExplorePage() {
  const { language, soundEnabled, volume } = useSettingsStore();
  const [activeTab, setActiveTab] = useState<TabFilter>("all");

  const handleTabChange = (tab: TabFilter) => {
    if (soundEnabled) soundFx.playClick(volume * 0.5);
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <ChildNavbar />

      <main className="flex-1 max-w-6xl w-full mx-auto space-y-6 py-8">
        {/* Uniform Header */}
        <ChildPageHeader
          title={getTranslation("games.colors.exploreTitle", {}, language) || "Eksplorasi Warna & Bentuk"}
          backHref="/learn/colors"
          backLabel={getTranslation("app.back", {}, language)}
          rightContent={
            <div className="flex items-center gap-1.5 sm:gap-2 bg-white/90 p-1 sm:p-1.5 rounded-full border border-amber-200 shadow-sm">
              <button
                onClick={() => handleTabChange("all")}
                className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full font-black text-xs sm:text-sm transition-all cursor-pointer ${
                  activeTab === "all"
                    ? "bg-amber-500 text-white shadow"
                    : "text-amber-950 hover:bg-amber-100/50"
                }`}
              >
                {language === "id" ? "Semua" : "All"}
              </button>
              <button
                onClick={() => handleTabChange("colors")}
                className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full font-black text-xs sm:text-sm transition-all cursor-pointer ${
                  activeTab === "colors"
                    ? "bg-amber-500 text-white shadow"
                    : "text-amber-950 hover:bg-amber-100/50"
                }`}
              >
                {getTranslation("games.colors.tabColors", {}, language)}
              </button>
              <button
                onClick={() => handleTabChange("shapes")}
                className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full font-black text-xs sm:text-sm transition-all cursor-pointer ${
                  activeTab === "shapes"
                    ? "bg-amber-500 text-white shadow"
                    : "text-amber-950 hover:bg-amber-100/50"
                }`}
              >
                {getTranslation("games.colors.tabShapes", {}, language)}
              </button>
            </div>
          }
        />

        {/* Teacher Avatar Feedback */}
        <Teacher
          expression="happy"
          message={getTranslation("games.colors.teacherExploreWelcome", {}, language)}
          className="w-full"
        />

        {/* Colors Section */}
        {(activeTab === "all" || activeTab === "colors") && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Palette className="w-6 h-6 text-amber-500" />
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
                {getTranslation("games.colors.tabColors", {}, language)}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {COLORS_CATALOG.map((color) => (
                <ColorShapeExploreCard key={color.id} type="color" item={color} />
              ))}
            </div>
          </div>
        )}

        {/* Shapes Section */}
        {(activeTab === "all" || activeTab === "shapes") && (
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-2">
              <Shapes className="w-6 h-6 text-sky-500" />
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
                {getTranslation("games.colors.tabShapes", {}, language)}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {SHAPES_CATALOG.map((shape) => (
                <ColorShapeExploreCard key={shape.id} type="shape" item={shape} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
