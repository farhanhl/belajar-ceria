"use client";

import React from "react";
import { motion } from "motion/react";
import { HijaiyahItem, HarakatType } from "../types";
import { useSettingsStore } from "@/stores/settings-store";
import { soundFx } from "@/lib/audio/sound-fx";
import { Volume2 } from "lucide-react";

interface HijaiyahCardProps {
  item: HijaiyahItem;
  harakatFilter?: HarakatType;
  onClick?: () => void;
  onSpeak?: () => void;
  className?: string;
}

export function HijaiyahCard({
  item,
  harakatFilter = "asli",
  onClick,
  onSpeak,
  className = "",
}: HijaiyahCardProps) {
  const { language, soundEnabled, volume } = useSettingsStore();

  const getDisplayLetter = () => {
    if (harakatFilter === "fathah") return item.harakat.fathah.arabic;
    if (harakatFilter === "kasrah") return item.harakat.kasrah.arabic;
    if (harakatFilter === "dhammah") return item.harakat.dhammah.arabic;
    return item.letter;
  };

  const getDisplayLabel = () => {
    if (harakatFilter === "fathah") return item.harakat.fathah.sound;
    if (harakatFilter === "kasrah") return item.harakat.kasrah.sound;
    if (harakatFilter === "dhammah") return item.harakat.dhammah.sound;
    return item.name[language] || item.name.id;
  };

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSpeak) {
      onSpeak();
    } else {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        let text = item.name[language] || item.name.id;
        if (harakatFilter === "fathah") text = item.harakat.fathah.sound;
        if (harakatFilter === "kasrah") text = item.harakat.kasrah.sound;
        if (harakatFilter === "dhammah") text = item.harakat.dhammah.sound;

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "ar-SA"; // Arabic voice if available, falls back gracefully
        utterance.rate = 0.85;
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const handleClick = () => {
    if (soundEnabled) soundFx.playPop(volume);
    onClick?.();
  };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      className={`group relative flex flex-col items-center justify-between rounded-3xl p-3 sm:p-4 bg-white/95 backdrop-blur-md shadow-md hover:shadow-xl border-3 sm:border-4 border-amber-300 hover:border-amber-400 cursor-pointer select-none transition-all outline-none focus-visible:ring-4 focus-visible:ring-amber-400 ${className}`}
    >
      {/* Top action row: Sound Speaker Button */}
      <button
        type="button"
        onClick={handleSpeak}
        className="absolute top-2 right-2 p-1.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors shadow-xs cursor-pointer z-10"
        title={language === "en" ? "Listen" : "Dengarkan"}
      >
        <Volume2 className="w-3.5 h-3.5" />
      </button>

      {/* Main Arabic Letter Visual with Arabic Font */}
      <div className="flex-1 flex items-center justify-center py-2 min-h-[60px]">
        <span className="text-4xl sm:text-5xl font-black text-amber-950 group-hover:text-emerald-700 transition-colors drop-shadow-sm font-arabic leading-none">
          {getDisplayLetter()}
        </span>
      </div>

      {/* Transliteration / Name Badge */}
      <div className="w-full text-center mt-1">
        <div className="inline-flex items-center gap-1 bg-amber-100/90 group-hover:bg-emerald-100 px-2.5 py-0.5 rounded-full transition-colors border border-amber-200">
          <span className="text-[11px] sm:text-xs font-black text-amber-950 group-hover:text-emerald-950">
            {getDisplayLabel()}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
