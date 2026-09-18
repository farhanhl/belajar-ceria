"use client";

import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { MatchingItem } from "@/types/game";
import { GameIcon } from "@/components/illustrations/GameIcons";
import { motion } from "motion/react";
import { soundFx } from "@/lib/audio/sound-fx";
import { useSettingsStore } from "@/stores/settings-store";
import { getMatchingItemLabel } from "../data/items";

interface MatchingCardProps {
  item: MatchingItem;
  isSelected?: boolean;
  isCorrect?: boolean | null;
  disabled?: boolean;
  onSelect?: (item: MatchingItem) => void;
}

export function MatchingCard({
  item,
  isSelected = false,
  isCorrect = null,
  disabled = false,
  onSelect,
}: MatchingCardProps) {
  const { soundEnabled, volume, language } = useSettingsStore();

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: item.id,
    data: { item },
    disabled,
  });

  const handleClick = () => {
    if (disabled || isDragging) return;
    if (soundEnabled) {
      soundFx.playClick(volume);
    }
    if (onSelect) {
      onSelect(item);
    }
  };

  let borderColor = "border-amber-300";
  let bgColor = "bg-white";
  let ringColor = "";

  if (isCorrect === true) {
    borderColor = "border-emerald-500";
    bgColor = "bg-emerald-50";
    ringColor = "ring-4 ring-emerald-300";
  } else if (isCorrect === false) {
    borderColor = "border-rose-400";
    bgColor = "bg-rose-50";
    ringColor = "ring-4 ring-rose-300";
  } else if (isSelected) {
    borderColor = "border-sky-500";
    bgColor = "bg-sky-50";
    ringColor = "ring-4 ring-sky-300";
  }

  const label = getMatchingItemLabel(item, language);

  return (
    <motion.div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={handleClick}
      whileHover={disabled || isDragging ? {} : { scale: 1.05, y: -4 }}
      whileTap={disabled || isDragging ? {} : { scale: 0.95 }}
      className={`touch-none relative p-2.5 sm:p-3.5 rounded-2xl sm:rounded-3xl border-4 ${borderColor} ${bgColor} ${ringColor} shadow-lg flex flex-col items-center justify-center cursor-grab active:cursor-grabbing select-none min-w-[85px] sm:min-w-[110px] min-h-[85px] sm:min-h-[110px] ${
        isDragging
          ? "opacity-25 scale-95 border-dashed border-amber-300"
          : "transition-all duration-150"
      } ${disabled ? "opacity-80 cursor-not-allowed" : ""}`}
    >
      <GameIcon name={item.iconName} className="w-12 h-12 sm:w-16 sm:h-16" />
      <span className="mt-1 text-xs sm:text-sm font-black text-slate-700 tracking-wide">
        {label}
      </span>
    </motion.div>
  );
}

