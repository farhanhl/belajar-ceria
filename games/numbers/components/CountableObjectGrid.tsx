"use client";

import React from "react";
import { CountableObject } from "../types";
import { soundFx } from "@/lib/audio/sound-fx";
import { useSettingsStore } from "@/stores/settings-store";
import { motion, AnimatePresence } from "motion/react";

interface CountableObjectGridProps {
  object: CountableObject;
  count: number;
  isSubtractionCrossed?: boolean;
  offsetIndex?: number;
  countedIndices: number[];
  onToggleCount: (index: number) => void;
  size?: "sm" | "md" | "lg";
}

export function CountableObjectGrid({
  object,
  count,
  isSubtractionCrossed = false,
  offsetIndex = 0,
  countedIndices,
  onToggleCount,
  size = "md",
}: CountableObjectGridProps) {
  const { soundEnabled, volume, language } = useSettingsStore();

  const handleItemClick = (index: number) => {
    if (soundEnabled) {
      soundFx.playClick(volume * 0.6);
    }
    onToggleCount(index);
  };

  const sizeClasses =
    size === "sm"
      ? "w-10 h-10 sm:w-12 sm:h-12 text-2xl sm:text-3xl"
      : size === "lg"
      ? "w-16 h-16 sm:w-20 sm:h-20 text-4xl sm:text-5xl"
      : "w-12 h-12 sm:w-16 sm:h-16 text-3xl sm:text-4xl";

  const objName = object.name[language] || object.name.id;
  const tooltip = language === "en" ? `Tap to count ${objName}` : `Sentuh untuk membilang ${objName}`;

  return (
    <div className="flex flex-wrap gap-2.5 sm:gap-3.5 items-center justify-center p-3 rounded-2xl bg-white/80 border border-amber-200/80 shadow-inner">
      {Array.from({ length: count }).map((_, i) => {
        const globalIndex = offsetIndex + i;
        const isCounted = countedIndices.includes(globalIndex);

        return (
          <motion.button
            key={globalIndex}
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleItemClick(globalIndex)}
            className={`relative ${sizeClasses} rounded-2xl flex items-center justify-center transition-all cursor-pointer select-none shadow-sm ${
              isSubtractionCrossed
                ? "bg-rose-50 border-2 border-dashed border-rose-300 opacity-60"
                : isCounted
                ? "bg-amber-100 border-2 border-amber-400 ring-2 ring-amber-300"
                : "bg-white hover:bg-amber-50 border-2 border-amber-200 hover:border-amber-300"
            }`}
            title={tooltip}
          >
            {/* Object Emoji */}
            <span className={isSubtractionCrossed ? "line-through grayscale" : ""}>
              {object.emoji}
            </span>

            {/* Tap-to-count numbered badge */}
            <AnimatePresence>
              {isCounted && (
                <motion.div
                  initial={{ scale: 0, y: -5 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-500 text-white font-black text-[10px] sm:text-xs flex items-center justify-center shadow"
                >
                  ✓
                </motion.div>
              )}
            </AnimatePresence>

            {/* Subtraction Cross Overlay */}
            {isSubtractionCrossed && (
              <div className="absolute inset-0 flex items-center justify-center text-rose-500 font-black text-2xl select-none pointer-events-none">
                ✕
              </div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
