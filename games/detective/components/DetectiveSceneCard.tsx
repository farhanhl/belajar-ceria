"use client";

import React from "react";
import { motion } from "motion/react";
import { DetectiveScene, DetectiveDifficulty } from "../types";
import { useSettingsStore } from "@/stores/settings-store";
import { ChildCard } from "@/components/ui/ChildCard";
import { Sparkles, Search } from "lucide-react";
import { getTranslation } from "@/lib/i18n";

interface DetectiveSceneCardProps {
  scene: DetectiveScene;
  difficulty: DetectiveDifficulty;
  onClick: () => void;
  className?: string;
}

export function DetectiveSceneCard({
  scene,
  difficulty,
  onClick,
  className = "",
}: DetectiveSceneCardProps) {
  const { language } = useSettingsStore();

  const previewItems = scene.items.slice(0, 5);

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`cursor-pointer group ${className}`}
    >
      <ChildCard
        borderColor={scene.borderColor}
        className="h-full flex flex-col justify-between p-5 bg-white/95 hover:shadow-2xl transition-all"
      >
        <div className="space-y-4">
          {/* Visual Header Banner */}
          <div
            className={`aspect-video w-full rounded-2xl bg-gradient-to-br ${scene.bgGradient} border-3 border-white shadow-inner p-4 flex flex-col items-center justify-center relative overflow-hidden`}
          >
            {/* Main Icon */}
            <span className="text-5xl sm:text-6xl filter drop-shadow-md transition-transform group-hover:scale-110">
              {scene.icon}
            </span>

            {/* Floating preview emojis */}
            <div className="absolute bottom-2 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs shadow-md border border-amber-200">
              <Search className="w-3.5 h-3.5 text-amber-600 mr-0.5" />
              {previewItems.map((item) => (
                <span key={item.id} title={item.name[language] || item.name.id}>
                  {item.emoji}
                </span>
              ))}
            </div>
          </div>

          {/* Title & Description */}
          <div>
            <div className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 font-extrabold text-[11px] px-2.5 py-0.5 rounded-full uppercase mb-1 border border-amber-200">
              <Sparkles className="w-3 h-3 text-amber-600" />
              {getTranslation("games.detective.itemsInScene", { count: scene.items.length }, language)}
            </div>
            <h3 className="text-lg sm:text-xl font-black text-amber-950 group-hover:text-emerald-700 transition-colors">
              {scene.themeName[language] || scene.themeName.id}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-semibold line-clamp-2 mt-1">
              {scene.description[language] || scene.description.id}
            </p>
          </div>
        </div>

        {/* Action Button Label */}
        <div className="pt-3">
          <div className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 text-amber-950 font-black text-xs sm:text-sm text-center shadow-md group-hover:from-emerald-400 group-hover:to-teal-400 group-hover:text-emerald-950 transition-all flex items-center justify-center gap-1.5 border border-amber-300">
            <Search className="w-4 h-4" />
            <span>{getTranslation("games.detective.startInvestigation", {}, language)}</span>
          </div>
        </div>
      </ChildCard>
    </motion.div>
  );
}
