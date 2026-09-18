"use client";

import React from "react";
import { DetectiveMission, DetectiveItem } from "../types";
import { useSettingsStore } from "@/stores/settings-store";
import { soundFx } from "@/lib/audio/sound-fx";
import { motion, AnimatePresence } from "motion/react";
import { Check, Lightbulb, Volume2, Sparkles, HelpCircle } from "lucide-react";
import { getTranslation } from "@/lib/i18n";

interface DetectiveClueBarProps {
  mission: DetectiveMission;
  onUseHint: () => void;
  onSpeakClue?: (item: DetectiveItem) => void;
}

export function DetectiveClueBar({
  mission,
  onUseHint,
  onSpeakClue,
}: DetectiveClueBarProps) {
  const { language, soundEnabled, volume } = useSettingsStore();

  const handleSpeakItem = (item: DetectiveItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (soundEnabled) soundFx.playClick(volume * 0.5);

    if (onSpeakClue) {
      onSpeakClue(item);
    } else {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const text =
          mission.difficulty === "hard"
            ? item.clue[language] || item.clue.id
            : item.speechText[language] || item.speechText.id;

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language === "en" ? "en-US" : "id-ID";
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const foundCount = mission.foundItemIds.length;
  const totalCount = mission.targetItems.length;

  return (
    <div className="w-full bg-white/95 backdrop-blur-md rounded-3xl p-3 sm:p-4 border-3 border-amber-300 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 select-none">
      {/* Target Items List */}
      <div className="flex-1 flex items-center gap-2 sm:gap-3 flex-wrap justify-center sm:justify-start">
        <div className="flex items-center gap-1 bg-amber-100 text-amber-950 px-3 py-1 rounded-full text-xs font-black border border-amber-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>
            {getTranslation("games.detective.missionTargets", {}, language)} {foundCount}/{totalCount}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {mission.targetItems.map((item) => {
            const isFound = mission.foundItemIds.includes(item.id);
            const isHinted = mission.activeHintItemId === item.id;

            return (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => handleSpeakItem(item, e)}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border-2 transition-all cursor-pointer ${
                  isFound
                    ? "bg-emerald-100 border-emerald-400 text-emerald-950 shadow-sm line-through opacity-85"
                    : isHinted
                    ? "bg-amber-100 border-amber-500 text-amber-950 shadow-md ring-2 ring-amber-400 animate-pulse"
                    : "bg-amber-50/80 hover:bg-amber-100 border-amber-200 text-amber-950 shadow-xs"
                }`}
                title={
                  mission.difficulty === "hard"
                    ? item.clue[language] || item.clue.id
                    : item.name[language] || item.name.id
                }
              >
                {/* Item Emoji or Silhouette */}
                {mission.difficulty === "hard" && !isFound ? (
                  <span className="text-xl sm:text-2xl filter drop-shadow-xs">
                    <HelpCircle className="w-5 h-5 text-amber-700" />
                  </span>
                ) : (
                  <span
                    className={`text-xl sm:text-2xl filter drop-shadow-xs ${
                      isFound ? "grayscale-30" : ""
                    }`}
                  >
                    {item.emoji}
                  </span>
                )}

                {/* Name / Clue snippet */}
                <span className="text-xs sm:text-sm font-extrabold line-clamp-1 max-w-[110px] sm:max-w-[130px]">
                  {mission.difficulty === "hard" && !isFound
                    ? item.clue[language] || item.clue.id
                    : item.name[language] || item.name.id}
                </span>

                {/* Found Checkmark Badge */}
                {isFound ? (
                  <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-3" />
                  </div>
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-amber-700 opacity-60 hover:opacity-100" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Hint Button */}
      <button
        type="button"
        disabled={mission.hintsRemaining <= 0 || mission.isCompleted}
        onClick={() => {
          if (soundEnabled) soundFx.playPop(volume);
          onUseHint();
        }}
        className={`px-3.5 py-2 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md border-2 ${
          mission.hintsRemaining > 0 && !mission.isCompleted
            ? "bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-amber-950 border-amber-300 cursor-pointer scale-100 hover:scale-103"
            : "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-70"
        }`}
      >
        <Lightbulb className="w-4 h-4 text-amber-900 fill-amber-300" />
        <span>
          {getTranslation("games.detective.hintBtn", {}, language)} ({mission.hintsRemaining})
        </span>
      </button>
    </div>
  );
}
