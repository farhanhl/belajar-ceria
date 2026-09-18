"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { MatchingItem } from "@/types/game";
import { GameIcon } from "@/components/illustrations/GameIcons";
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
  const { isOver, setNodeRef } = useDroppable({
    id: "matching-drop-target",
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10">
        {/* Source Question Target Card */}
        <div className="relative p-4 sm:p-6 rounded-3xl border-4 border-amber-400 bg-amber-50/80 shadow-2xl flex flex-col items-center justify-center min-w-[130px] sm:min-w-[160px] min-h-[130px] sm:min-h-[160px]">
          <div className="absolute -top-3.5 bg-amber-500 text-white font-black text-xs sm:text-sm px-3 py-1 rounded-full uppercase tracking-wider shadow">
            Cari Pasangan
          </div>
          <GameIcon name={targetItem.iconName} className="w-20 h-20 sm:w-24 sm:h-24" />
          <span className="mt-2 text-sm sm:text-base font-extrabold text-amber-900">
            {targetItem.label}
          </span>
        </div>

        {/* Equals or Arrow symbol */}
        <div className="text-3xl sm:text-5xl font-black text-amber-400 select-none animate-pulse">
          ➔
        </div>

        {/* Droppable / Matched Zone */}
        <div
          ref={setNodeRef}
          className={`relative p-4 sm:p-6 rounded-3xl border-4 border-dashed flex flex-col items-center justify-center min-w-[130px] sm:min-w-[160px] min-h-[130px] sm:min-h-[160px] transition-all duration-300 ${
            isSuccess
              ? "border-emerald-500 bg-emerald-50 scale-105 shadow-2xl border-solid"
              : isOver
              ? "border-sky-500 bg-sky-100 scale-105 shadow-xl"
              : "border-amber-300 bg-white/70 shadow-inner hover:border-amber-400"
          }`}
        >
          {matchedItem ? (
            <motion.div
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              className="flex flex-col items-center justify-center"
            >
              <GameIcon name={matchedItem.iconName} className="w-20 h-20 sm:w-24 sm:h-24" />
              <span className="mt-2 text-sm sm:text-base font-extrabold text-emerald-800">
                {matchedItem.label}
              </span>
              {isSuccess && (
                <div className="absolute -top-3.5 bg-emerald-500 text-white font-black text-xs sm:text-sm px-3 py-1 rounded-full uppercase tracking-wider shadow flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Cocok!
                </div>
              )}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-amber-400/80 p-2">
              <HelpCircle className="w-10 h-10 sm:w-12 sm:h-12 mb-1" />
              <span className="text-xs sm:text-sm font-bold text-amber-600">
                {isOver ? "Lepaskan di sini!" : "Tarik atau Ketuk ke Sini"}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
