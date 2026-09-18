"use client";

import React, { useState } from "react";
import { NumberItem } from "../types";
import { soundFx } from "@/lib/audio/sound-fx";
import { ttsService } from "@/lib/tts/tts";
import { useSettingsStore } from "@/stores/settings-store";
import { Volume2, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface NumberExploreCardProps {
  item: NumberItem;
}

export function NumberExploreCard({ item }: NumberExploreCardProps) {
  const { soundEnabled, volume } = useSettingsStore();
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = () => {
    if (soundEnabled) {
      soundFx.playClick(volume * 0.5);
    }

    setIsPlaying(true);
    const textToSpeak = `Angka ${item.number}. ${item.word.id}. ${item.description.id}`;

    ttsService.speak({
      text: textToSpeak,
      language: "id",
      volume,
      onEnd: () => setIsPlaying(false),
    });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.97 }}
      className="bg-white rounded-3xl p-5 shadow-lg border-2 border-amber-200 hover:border-amber-400 transition-all flex flex-col justify-between cursor-pointer"
      onClick={handleSpeak}
    >
      <div className="space-y-3">
        {/* Large Number Orb */}
        <div className="relative aspect-square w-full rounded-2xl bg-amber-50 shadow-inner flex items-center justify-center p-4">
          <motion.div
            animate={isPlaying ? { scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] } : {}}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-amber-400 to-orange-400 text-white font-black text-5xl sm:text-6xl flex items-center justify-center shadow-lg border-4 border-amber-200"
          >
            {item.number}
          </motion.div>
        </div>

        <div className="text-center">
          <h3 className="text-2xl sm:text-3xl font-black text-slate-800">
            {item.word.id}
          </h3>
          <p className="text-xs font-extrabold text-slate-500">
            ({item.word.en})
          </p>
        </div>

        <p className="text-xs text-slate-600 font-bold text-center">
          {item.description.id}
        </p>

        {/* Emoji Object Group */}
        <div className="flex flex-wrap gap-1.5 items-center justify-center p-2.5 bg-amber-50/70 rounded-2xl border border-amber-200/60 min-h-[50px]">
          {item.emojiGroup.map((emoji, idx) => (
            <span key={idx} className="text-xl sm:text-2xl select-none">
              {emoji}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleSpeak();
        }}
        className={`mt-4 w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl font-black text-xs sm:text-sm shadow-sm transition-all ${
          isPlaying
            ? "bg-amber-500 text-white animate-pulse"
            : "bg-amber-100 hover:bg-amber-200 text-amber-900"
        }`}
      >
        <Volume2 className="w-4 h-4" />
        <span>Dengarkan Suara</span>
      </button>
    </motion.div>
  );
}
