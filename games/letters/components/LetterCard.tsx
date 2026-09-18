"use client";

import React from "react";
import { LetterItem } from "../types";
import { motion } from "motion/react";
import { soundFx } from "@/lib/audio/sound-fx";
import { useSettingsStore } from "@/stores/settings-store";

interface LetterCardProps {
  item: LetterItem;
  onClick: (item: LetterItem) => void;
}

export function LetterCard({ item, onClick }: LetterCardProps) {
  const { soundEnabled, volume, language } = useSettingsStore();

  const handleClick = () => {
    if (soundEnabled) {
      soundFx.playClick(volume);
    }
    onClick(item);
  };

  const word = language === "id" ? item.wordId : item.wordEn;

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.06, y: -6 }}
      whileTap={{ scale: 0.94 }}
      onClick={handleClick}
      className={`relative p-3.5 sm:p-5 rounded-3xl border-4 ${item.color.border} ${item.color.bg} shadow-lg hover:shadow-2xl flex flex-col items-center justify-between text-center transition-all cursor-pointer select-none group min-h-[120px] sm:min-h-[145px]`}
    >
      {/* Upper & Lower Case Badge */}
      <div className="flex items-baseline gap-1">
        <span className={`text-3xl sm:text-4xl font-black ${item.color.text} tracking-tight`}>
          {item.letter}
        </span>
        <span className={`text-xl sm:text-2xl font-black ${item.color.text} opacity-70`}>
          {item.lowercase}
        </span>
      </div>

      {/* Emoji Illustration */}
      <span className="text-3xl sm:text-4xl my-1 group-hover:scale-110 transition-transform">
        {item.emoji}
      </span>

      {/* Word Label */}
      <span className="text-xs sm:text-sm font-extrabold text-slate-700 truncate w-full">
        {word}
      </span>
    </motion.button>
  );
}
