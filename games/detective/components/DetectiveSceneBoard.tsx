"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DetectiveMission, DetectiveItem } from "../types";
import { useSettingsStore } from "@/stores/settings-store";
import { soundFx } from "@/lib/audio/sound-fx";
import { Check, Sparkles, Search } from "lucide-react";
import { getTranslation } from "@/lib/i18n";

interface DetectiveSceneBoardProps {
  mission: DetectiveMission;
  onItemClick: (item: DetectiveItem, e: React.MouseEvent) => void;
  className?: string;
}

export function DetectiveSceneBoard({
  mission,
  onItemClick,
  className = "",
}: DetectiveSceneBoardProps) {
  const { language, soundEnabled, volume } = useSettingsStore();
  const [clickedFeedback, setClickedFeedback] = useState<{
    x: number;
    y: number;
    isCorrect: boolean;
    text: string;
  } | null>(null);

  const scene = mission.scene;

  const handleInspect = (item: DetectiveItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const isTarget = mission.targetItems.some((t) => t.id === item.id);
    const isAlreadyFound = mission.foundItemIds.includes(item.id);

    if (isTarget && !isAlreadyFound) {
      if (soundEnabled) soundFx.playCorrect(volume);
      setClickedFeedback({
        x: item.xPercent,
        y: item.yPercent,
        isCorrect: true,
        text: `+1 ${item.name[language] || item.name.id} ✨`,
      });
    } else if (!isAlreadyFound) {
      if (soundEnabled) soundFx.playPop(volume * 0.4);
      setClickedFeedback({
        x: item.xPercent,
        y: item.yPercent,
        isCorrect: false,
        text: getTranslation("games.detective.notThisTarget", {}, language),
      });
    }

    onItemClick(item, e);

    setTimeout(() => {
      setClickedFeedback(null);
    }, 1200);
  };

  return (
    <div
      className={`relative w-full aspect-[16/10] max-h-[500px] min-h-[300px] rounded-3xl bg-gradient-to-br ${scene.bgGradient} border-4 border-amber-300 shadow-2xl overflow-hidden select-none cursor-crosshair ${className}`}
    >
      {/* Decorative Scenery Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-4 left-10 text-4xl animate-pulse">☁️</div>
        <div className="absolute top-8 right-20 text-3xl animate-pulse delay-300">☁️</div>
        <div className="absolute bottom-4 left-1/4 text-2xl">🌱</div>
        <div className="absolute bottom-6 right-1/3 text-2xl">🌿</div>
        <div className="absolute top-1/2 left-4 text-xl">✨</div>
        <div className="absolute bottom-10 right-8 text-xl">⭐</div>
      </div>

      {/* Floating Sparkle Feedback on discovery */}
      <AnimatePresence>
        {clickedFeedback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 0 }}
            animate={{ opacity: 1, scale: 1.1, y: -25 }}
            exit={{ opacity: 0, scale: 0.8, y: -40 }}
            style={{
              left: `${clickedFeedback.x}%`,
              top: `${clickedFeedback.y}%`,
            }}
            className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 px-3 py-1 rounded-full text-xs sm:text-sm font-black shadow-xl pointer-events-none whitespace-nowrap border-2 ${
              clickedFeedback.isCorrect
                ? "bg-emerald-500 text-white border-white ring-4 ring-emerald-300"
                : "bg-amber-100 text-amber-950 border-amber-400"
            }`}
          >
            {clickedFeedback.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden Scene Items */}
      {scene.items.map((item) => {
        const isTarget = mission.targetItems.some((t) => t.id === item.id);
        const isFound = mission.foundItemIds.includes(item.id);
        const isHinted = mission.activeHintItemId === item.id;

        return (
          <motion.div
            key={item.id}
            role="button"
            tabIndex={0}
            style={{
              left: `${item.xPercent}%`,
              top: `${item.yPercent}%`,
              transform: `scale(${item.scale || 1}) rotate(${item.rotation || 0}deg)`,
            }}
            whileHover={{ scale: (item.scale || 1) * 1.25, zIndex: 20 }}
            whileTap={{ scale: (item.scale || 1) * 0.9 }}
            onClick={(e) => handleInspect(item, e)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleInspect(item, e as any);
              }
            }}
            className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 p-2 rounded-2xl transition-all cursor-pointer group outline-none ${
              isFound
                ? "opacity-60 grayscale-20 pointer-events-none"
                : "hover:bg-white/50 hover:shadow-lg"
            }`}
            title={item.name[language] || item.name.id}
          >
            {/* Hint Beacon Animation */}
            {isHinted && !isFound && (
              <div className="absolute inset-0 -m-3 rounded-full border-4 border-amber-400 animate-ping opacity-75 pointer-events-none" />
            )}

            {/* Hint Glowing Badge */}
            {isHinted && !isFound && (
              <div className="absolute -top-3 -right-3 bg-amber-400 text-amber-950 p-1 rounded-full shadow-lg animate-bounce z-20">
                <Search className="w-3.5 h-3.5" />
              </div>
            )}

            {/* Found Green Check Badge */}
            {isFound && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-emerald-500 text-white p-1 rounded-full shadow-md z-20"
              >
                <Check className="w-3 h-3 stroke-3" />
              </motion.div>
            )}

            {/* Item Emoji */}
            <span
              className={`text-3xl sm:text-4xl filter drop-shadow-md select-none transition-all block ${
                isHinted ? "scale-115 drop-shadow-xl" : ""
              }`}
            >
              {item.emoji}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
