"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { MatchingItem } from "@/types/game";
import { GameIcon } from "@/components/illustrations/GameIcons";
import { getMatchingItemLabel } from "../data/items";
import { useSettingsStore } from "@/stores/settings-store";
import { getTranslation } from "@/lib/i18n";
import { Sparkles, HelpCircle } from "lucide-react";
import { motion } from "motion/react";

interface MatchingTargetProps {
  targetItem: MatchingItem;
  matchedItem?: MatchingItem | null;
  isSuccess?: boolean;
}

export function MatchingTarget({
  targetItem,
  matchedItem = null,
  isSuccess = false,
}: MatchingTargetProps) {
  const { language } = useSettingsStore();
  const { isOver, setNodeRef } = useDroppable({
    id: "matching-drop-target",
  });

  const targetLabel = getMatchingItemLabel(targetItem, language);
  const matchedLabel = matchedItem ? getMatchingItemLabel(matchedItem, language) : "";

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-center gap-3 sm:gap-8">
        {/* Source Question Target Card */}
        <div className="relative p-3 sm:p-4 rounded-3xl border-4 border-amber-400 bg-amber-50/80 shadow-xl flex flex-col items-center justify-center min-w-[110px] sm:min-w-[140px] min-h-[110px] sm:min-h-[140px]">
          <div className="absolute -top-3 bg-amber-500 text-white font-black text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
            {getTranslation("games.matching.findMatchBadge", {}, language)}
          </div>
          <GameIcon name={targetItem.iconName} className="w-14 h-14 sm:w-18 sm:h-18" />
          <span className="mt-1 text-xs sm:text-sm font-extrabold text-amber-900">
            {targetLabel}
          </span>
        </div>

        {/* Equals or Arrow symbol */}
        <div className="text-2xl sm:text-4xl font-black text-amber-400 select-none animate-pulse">
          ➔
        </div>

        {/* Droppable / Matched Zone */}
        <div
          ref={setNodeRef}
          className={`relative p-3 sm:p-4 rounded-3xl border-4 border-dashed flex flex-col items-center justify-center min-w-[110px] sm:min-w-[140px] min-h-[110px] sm:min-h-[140px] transition-all duration-300 ${
            isSuccess
              ? "border-emerald-500 bg-emerald-50 scale-105 shadow-xl border-solid"
              : isOver
              ? "border-sky-500 bg-sky-100 scale-105 shadow-lg"
              : "border-amber-300 bg-white/70 shadow-inner hover:border-amber-400"
          }`}
        >
          {matchedItem ? (
            <motion.div
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              className="flex flex-col items-center justify-center"
            >
              <GameIcon name={matchedItem.iconName} className="w-14 h-14 sm:w-18 sm:h-18" />
              <span className="mt-1 text-xs sm:text-sm font-extrabold text-emerald-800">
                {matchedLabel}
              </span>
              {isSuccess && (
                <div className="absolute -top-3 bg-emerald-500 text-white font-black text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> {getTranslation("games.matching.matchSuccess", {}, language)}
                </div>
              )}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-amber-400/80 p-1">
              <HelpCircle className="w-7 h-7 sm:w-9 sm:h-9 mb-0.5" />
              <span className="text-[11px] sm:text-xs font-bold text-amber-600">
                {isOver
                  ? getTranslation("games.matching.dropRelease", {}, language)
                  : getTranslation("games.matching.dropHint", {}, language)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
