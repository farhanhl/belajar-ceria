"use client";

import React from "react";
import { motion } from "motion/react";
import { TracingItem } from "../types";
import { useSettingsStore } from "@/stores/settings-store";
import { getTranslation } from "@/lib/i18n";
import { ChildCard } from "@/components/ui/ChildCard";
import { ArrowRight } from "lucide-react";

interface TracingItemCardProps {
  item: TracingItem;
  index: number;
  onSelect: (item: TracingItem, index: number) => void;
}

export const TracingItemCard: React.FC<TracingItemCardProps> = ({
  item,
  index,
  onSelect,
}) => {
  const { language } = useSettingsStore();

  const getCategoryTheme = () => {
    switch (item.category) {
      case "lines":
        return {
          borderColor: "border-amber-400",
          bgGradient: "from-amber-100 via-white to-orange-50",
          charBoxBg: "bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-950",
          badgeBg: "bg-amber-100 text-amber-900 border-amber-300",
          btnColor: "bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/25",
        };
      case "letters":
        return {
          borderColor: "border-blue-400",
          bgGradient: "from-blue-100 via-white to-indigo-50",
          charBoxBg: "bg-gradient-to-tr from-blue-500 to-indigo-400 text-white",
          badgeBg: "bg-blue-100 text-blue-900 border-blue-300",
          btnColor: "bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/25",
        };
      case "numbers":
        return {
          borderColor: "border-emerald-400",
          bgGradient: "from-emerald-100 via-white to-teal-50",
          charBoxBg: "bg-gradient-to-tr from-emerald-500 to-teal-400 text-white",
          badgeBg: "bg-emerald-100 text-emerald-900 border-emerald-300",
          btnColor: "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/25",
        };
      case "hijaiyah":
        return {
          borderColor: "border-purple-400",
          bgGradient: "from-purple-100 via-white to-pink-50",
          charBoxBg: "bg-gradient-to-tr from-purple-500 to-pink-400 text-white",
          badgeBg: "bg-purple-100 text-purple-900 border-purple-300",
          btnColor: "bg-purple-500 hover:bg-purple-600 text-white shadow-purple-500/25",
        };
    }
  };

  const theme = getCategoryTheme();
  const title = item.title[language] || item.title.id;
  const subtitle = item.subtitle ? item.subtitle[language] || item.subtitle.id : undefined;

  const strokesText =
    language === "en" && item.strokes.length > 1
      ? getTranslation("games.tracing.strokesCountPlural", { count: item.strokes.length }, language)
      : getTranslation("games.tracing.strokesCount", { count: item.strokes.length }, language);

  const difficultyText = getTranslation(`games.difficulty.${item.difficulty}`, {}, language);
  const startTracingText = getTranslation("games.tracing.startTracing", {}, language);

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(item, index)}
      className="cursor-pointer group h-full"
    >
      <ChildCard
        borderColor={theme.borderColor}
        className={`h-full flex flex-col justify-between p-5 bg-gradient-to-br ${theme.bgGradient} shadow-md hover:shadow-2xl transition-all border-4`}
      >
        {/* Top Badges */}
        <div className="w-full flex items-center justify-between mb-2">
          <span
            className={`text-xs font-black px-2.5 py-1 rounded-full border ${theme.badgeBg}`}
          >
            {strokesText}
          </span>
          <span className="text-xs font-bold text-slate-500 capitalize">
            {difficultyText}
          </span>
        </div>

        {/* Big Glyph Visual Display */}
        <div className="my-3 flex items-center justify-center">
          <div
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl ${theme.charBoxBg} flex items-center justify-center shadow-lg border-4 border-white transition-transform group-hover:scale-110`}
          >
            <span
              className={`font-black drop-shadow-sm select-none leading-none ${
                item.category === "hijaiyah"
                  ? "font-arabic text-5xl sm:text-6xl text-white pb-1"
                  : "font-sans text-4xl sm:text-5xl text-white"
              }`}
            >
              {item.char}
            </span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="w-full text-center space-y-0.5 my-2">
          <h4 className="font-black text-base sm:text-lg text-slate-800 line-clamp-1">
            {title}
          </h4>
          {subtitle && (
            <p className="text-xs font-bold text-slate-600 line-clamp-1">
              {subtitle}
            </p>
          )}
        </div>

        {/* Action Button */}
        <div
          className={`mt-2 w-full py-2.5 rounded-2xl ${theme.btnColor} flex items-center justify-center gap-1.5 text-xs sm:text-sm font-black shadow-md transition-all`}
        >
          <span>{startTracingText}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </ChildCard>
    </motion.div>
  );
};
