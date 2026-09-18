"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChildNavbar } from "@/components/navigation/ChildNavbar";
import { Teacher } from "@/components/teacher/Teacher";
import { ChildButton } from "@/components/ui/ChildButton";
import { ChildCard } from "@/components/ui/ChildCard";
import { COLORING_CATALOG } from "@/games/coloring/data/coloring-data";
import { ColoringCanvas } from "@/games/coloring/components/ColoringCanvas";
import { ColoringCategory, ColoringPictureItem } from "@/games/coloring/types";
import { useColoringGameStore } from "@/stores/coloring-game-store";
import { useSettingsStore } from "@/stores/settings-store";
import { soundFx } from "@/lib/audio/sound-fx";
import { getTranslation } from "@/lib/i18n";
import { motion } from "motion/react";
import { Palette, Play, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ColoringSelectPage() {
  const router = useRouter();
  const { startPicture } = useColoringGameStore();
  const { language, soundEnabled, volume } = useSettingsStore();

  const [selectedCategory, setSelectedCategory] = useState<"all" | ColoringCategory>("all");

  const filteredPictures =
    selectedCategory === "all"
      ? COLORING_CATALOG
      : COLORING_CATALOG.filter((p) => p.category === selectedCategory);

  const handleStartColoring = (picture: ColoringPictureItem) => {
    if (soundEnabled) soundFx.playClick(volume);
    startPicture(picture.id);
    router.push("/learn/coloring/play");
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
            <div className="inline-flex items-center gap-1.5 bg-pink-100 text-pink-950 px-3 py-1 rounded-full text-xs font-black">
              <Palette className="w-3.5 h-3.5 text-pink-600" />
              <span>{getTranslation("games.coloring.moduleBadge", {}, language)}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-amber-950 tracking-tight">
              {getTranslation("games.coloring.title", {}, language)} 🎨
            </h1>
          </div>
        </div>

        {/* Teacher Guide */}
        <Teacher
          expression="happy"
          message={getTranslation("games.coloring.teacherWelcome", {}, language)}
          className="w-full"
        />

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2.5 overflow-x-auto px-1.5 sm:px-2 py-1 scrollbar-none">
          <button
            type="button"
            onClick={() => {
              if (soundEnabled) soundFx.playClick(volume);
              setSelectedCategory("all");
            }}
            className={`px-4 py-2 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-all ${
              selectedCategory === "all"
                ? "bg-amber-400 text-amber-950 shadow-md scale-102 ring-2 ring-amber-500/50"
                : "bg-white/80 text-amber-900 hover:bg-white shadow-sm hover:scale-102"
            }`}
          >
            {getTranslation("games.coloring.allCategories", { count: COLORING_CATALOG.length }, language)}
          </button>
          <button
            type="button"
            onClick={() => {
              if (soundEnabled) soundFx.playClick(volume);
              setSelectedCategory("muslimah");
            }}
            className={`px-4 py-2 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-all ${
              selectedCategory === "muslimah"
                ? "bg-amber-400 text-amber-950 shadow-md scale-102 ring-2 ring-amber-500/50"
                : "bg-white/80 text-amber-900 hover:bg-white shadow-sm hover:scale-102"
            }`}
          >
            {getTranslation("games.coloring.catMuslimah", {}, language)}
          </button>
          <button
            type="button"
            onClick={() => {
              if (soundEnabled) soundFx.playClick(volume);
              setSelectedCategory("animals");
            }}
            className={`px-4 py-2 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-all ${
              selectedCategory === "animals"
                ? "bg-amber-400 text-amber-950 shadow-md scale-102 ring-2 ring-amber-500/50"
                : "bg-white/80 text-amber-900 hover:bg-white shadow-sm hover:scale-102"
            }`}
          >
            {getTranslation("games.coloring.catAnimals", {}, language)}
          </button>
          <button
            type="button"
            onClick={() => {
              if (soundEnabled) soundFx.playClick(volume);
              setSelectedCategory("vehicles");
            }}
            className={`px-4 py-2 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-all ${
              selectedCategory === "vehicles"
                ? "bg-amber-400 text-amber-950 shadow-md scale-102 ring-2 ring-amber-500/50"
                : "bg-white/80 text-amber-900 hover:bg-white shadow-sm hover:scale-102"
            }`}
          >
            {getTranslation("games.coloring.catVehicles", {}, language)}
          </button>
          <button
            type="button"
            onClick={() => {
              if (soundEnabled) soundFx.playClick(volume);
              setSelectedCategory("nature");
            }}
            className={`px-4 py-2 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-all ${
              selectedCategory === "nature"
                ? "bg-amber-400 text-amber-950 shadow-md scale-102 ring-2 ring-amber-500/50"
                : "bg-white/80 text-amber-900 hover:bg-white shadow-sm hover:scale-102"
            }`}
          >
            {getTranslation("games.coloring.catNature", {}, language)}
          </button>
        </div>

        {/* Picture Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredPictures.map((picture, idx) => (
            <motion.div
              key={picture.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.04 }}
              whileHover={{ scale: 1.03 }}
              className="cursor-pointer"
              onClick={() => handleStartColoring(picture)}
            >
              <ChildCard
                borderColor="border-pink-300"
                className="h-full flex flex-col justify-between p-4 bg-white/95 hover:shadow-2xl transition-all group"
              >
                <div className="space-y-3">
                  {/* Thumbnail Preview */}
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-inner border-2 border-pink-100 group-hover:border-pink-400 transition-colors bg-white p-2 flex items-center justify-center">
                    <ColoringCanvas
                      pictureId={picture.id}
                      overrideColors={picture.previewColors}
                      readOnly
                      className="border-none shadow-none rounded-xl"
                    />
                    <span
                      className={`absolute top-3 left-3 ${picture.badgeColor} text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm`}
                    >
                      {picture.categoryName[language] || picture.categoryName.id}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-amber-950 group-hover:text-pink-600 transition-colors">
                      {picture.title[language] || picture.title.id}
                    </h3>
                    <p className="text-xs text-slate-600 font-semibold line-clamp-2 mt-0.5">
                      {picture.description[language] || picture.description.id}
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
                    {getTranslation("games.coloring.startColoringBtn", {}, language)}
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
