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
        const text = item.speechText[language] || item.name.id;
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
      whileHover={disabled || isDragging ? {} : { scale: 1.05, y: -4 }}
      whileTap={disabled || isDragging ? {} : { scale: 0.95 }}
      onClick={handleClick}
      className={`touch-none relative flex flex-col items-center justify-between rounded-3xl p-3 sm:p-4 bg-white shadow-md border-4 cursor-grab active:cursor-grabbing select-none ${
        isDragging
          ? "opacity-25 scale-95 border-dashed border-amber-300"
          : isSelected
          ? "border-amber-400 ring-4 ring-amber-300/60 shadow-xl bg-amber-50/50"
          : "border-slate-200 hover:border-amber-200 hover:shadow-lg transition-shadow"
      } ${disabled ? "opacity-75 cursor-not-allowed" : ""} ${
        isMainFocus ? "w-36 h-40 sm:w-44 sm:h-48" : "w-28 h-32 sm:w-32 sm:h-36"
      }`}
    >
      {/* Sound Speaker Button */}
      <button
        type="button"
        onClick={handleSpeak}
        className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-100 hover:bg-amber-100 text-slate-600 hover:text-amber-700 transition-colors shadow-sm cursor-pointer z-10"
        title="Dengarkan Nama"
      >
        <Volume2 className="w-3.5 h-3.5" />
      </button>

      {/* Drag Handle Icon on Top Left */}
      <div className="absolute top-2 left-2 p-1 rounded-full bg-slate-100 text-slate-400">
        <Move className="w-3 h-3" />
      </div>

      {/* Emoji Visual */}
      <div className="flex-1 flex items-center justify-center pointer-events-none">
        <span
          className={`filter drop-shadow-md select-none transition-transform ${
            isMainFocus ? "text-5xl sm:text-6xl animate-bounce-subtle" : "text-3xl sm:text-4xl"
          }`}
        >
          {item.emoji}
        </span>
      </div>

      {/* Item Title */}
      <div className="text-center w-full pointer-events-none">
        <p
          className={`font-black text-slate-800 line-clamp-1 ${
            isMainFocus ? "text-xs sm:text-sm" : "text-[11px] sm:text-xs"
          }`}
        >
          {item.name[language] || item.name.id}
        </p>
      </div>

      {/* Drag Indicator Badge */}
      <div className="absolute -bottom-2.5 bg-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow pointer-events-none flex items-center gap-1">
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
    <div className="relative flex flex-col items-center justify-between rounded-3xl p-3 sm:p-4 bg-white shadow-2xl border-4 border-amber-400 ring-4 ring-amber-300/80 cursor-grabbing select-none scale-110 rotate-2 w-32 h-36 pointer-events-none">
      {/* Top indicator */}
      <div className="absolute -top-3 bg-amber-500 text-white font-black text-[10px] px-2.5 py-0.5 rounded-full shadow uppercase tracking-wider">
        {language === "en" ? "Sorting" : "Memilah"}
      </div>

      <div className="flex-1 flex items-center justify-center">
        <span className="text-4xl sm:text-5xl filter drop-shadow-lg">
          {item.emoji}
        </span>
      </div>

      <div className="text-center w-full">
        <p className="font-black text-slate-800 text-xs line-clamp-1">
          {item.name[language] || item.name.id}
        </p>
      </div>
    </div>
  );
}

