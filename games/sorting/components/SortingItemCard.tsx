"use client";

import React from "react";
import { SortingItemDefinition } from "../types";
import { useDraggable } from "@dnd-kit/core";
import { motion } from "motion/react";
import { useSettingsStore } from "@/stores/settings-store";
import { soundFx } from "@/lib/audio/sound-fx";
import { Volume2, Move } from "lucide-react";

interface SortingItemCardProps {
  item: SortingItemDefinition;
  isSelected?: boolean;
  isMainFocus?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  onSpeak?: () => void;
}

export function SortingItemCard({
  item,
  isSelected = false,
  isMainFocus = false,
  disabled = false,
  onClick,
  onSpeak,
}: SortingItemCardProps) {
  const { language, soundEnabled, volume } = useSettingsStore();

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: item.id,
    data: { item },
    disabled,
  });

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSpeak) {
      onSpeak();
    } else {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        const text = item.speechText[language] || (language === "en" ? item.name.en : item.name.id);
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language === "en" ? "en-US" : "id-ID";
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const handleClick = () => {
    if (disabled || isDragging) return;
    if (soundEnabled) soundFx.playPop(volume);
    onClick?.();
  };

  return (
    <motion.div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      whileHover={disabled || isDragging ? {} : { scale: 1.05, y: -3 }}
      whileTap={disabled || isDragging ? {} : { scale: 0.95 }}
      onClick={handleClick}
      className={`touch-none relative flex flex-col items-center justify-between rounded-2xl sm:rounded-3xl p-2 sm:p-3 bg-white shadow-md border-3 sm:border-4 cursor-grab active:cursor-grabbing select-none transition-all ${
        isDragging
          ? "opacity-25 scale-95 border-dashed border-amber-300"
          : isSelected
          ? "border-amber-400 ring-4 ring-amber-300/70 shadow-xl bg-amber-50/70 scale-105 z-10"
          : "border-slate-200 hover:border-amber-200 hover:shadow-lg"
      } ${disabled ? "opacity-75 cursor-not-allowed" : ""} w-24 h-28 sm:w-28 sm:h-32`}
    >
      {/* Sound Speaker Button */}
      <button
        type="button"
        onClick={handleSpeak}
        className="absolute top-1.5 right-1.5 p-1 rounded-full bg-slate-100 hover:bg-amber-100 text-slate-600 hover:text-amber-700 transition-colors shadow-sm cursor-pointer z-10"
        title={language === "en" ? "Listen to name" : "Dengarkan Nama"}
      >
        <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
      </button>

      {/* Drag Handle Icon on Top Left */}
      <div className="absolute top-1.5 left-1.5 p-0.5 rounded-full bg-slate-100 text-slate-400">
        <Move className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
      </div>

      {/* Emoji Visual */}
      <div className="flex-1 flex items-center justify-center pointer-events-none">
        <span
          className={`filter drop-shadow-md select-none transition-transform ${
            isMainFocus ? "text-3xl sm:text-4xl animate-bounce-subtle" : "text-2xl sm:text-3xl"
          }`}
        >
          {item.emoji}
        </span>
      </div>

      {/* Item Title */}
      <div className="text-center w-full pointer-events-none px-1">
        <p className="font-black text-slate-800 text-[10px] sm:text-[11px] line-clamp-1">
          {item.name[language] || item.name.id}
        </p>
      </div>

      {/* Drag Indicator Badge */}
      <div className="absolute -bottom-2 bg-amber-500 text-white text-[9px] sm:text-[10px] font-black px-1.5 sm:px-2 py-0.5 rounded-full shadow pointer-events-none flex items-center gap-0.5">
        <span>✋</span>
        <span>{language === "en" ? "Drag me" : "Tarik aku"}</span>
      </div>
    </motion.div>
  );
}

/**
 * Overlay component rendered inside DndKit DragOverlay during active drag
 */
export function SortingItemOverlayCard({ item }: { item: SortingItemDefinition }) {
  const { language } = useSettingsStore();

  return (
    <div className="relative flex flex-col items-center justify-between rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 bg-white shadow-2xl border-3 border-amber-400 ring-4 ring-amber-300/80 cursor-grabbing select-none scale-105 rotate-2 w-24 h-28 sm:w-28 sm:h-32 pointer-events-none">
      {/* Top indicator */}
      <div className="absolute -top-2.5 bg-amber-500 text-white font-black text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full shadow uppercase tracking-wider">
        {language === "en" ? "Sorting" : "Memilah"}
      </div>

      <div className="flex-1 flex items-center justify-center">
        <span className="text-3xl sm:text-4xl filter drop-shadow-lg">
          {item.emoji}
        </span>
      </div>

      <div className="text-center w-full px-1">
        <p className="font-black text-slate-800 text-[10px] sm:text-[11px] line-clamp-1">
          {item.name[language] || item.name.id}
        </p>
      </div>
    </div>
  );
}

