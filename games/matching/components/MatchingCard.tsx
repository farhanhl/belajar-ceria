"use client";

import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { MatchingItem } from "@/types/game";
import { GameIcon } from "@/components/illustrations/GameIcons";
import { motion } from "motion/react";
import { soundFx } from "@/lib/audio/sound-fx";
import { useSettingsStore } from "@/stores/settings-store";

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
  const { soundEnabled, volume } = useSettingsStore();

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: item.id,
    data: { item },
    disabled,
  });

  const style: React.CSSProperties = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 50,
      }
    : {};

  const handleClick = () => {
    if (disabled) return;
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

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={handleClick}
      whileHover={disabled ? {} : { scale: 1.05, y: -4 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      className={`touch-none relative p-3 sm:p-5 rounded-3xl border-4 ${borderColor} ${bgColor} ${ringColor} shadow-xl flex flex-col items-center justify-center cursor-grab active:cursor-grabbing transition-all select-none min-w-[90px] sm:min-w-[120px] min-h-[90px] sm:min-h-[120px] ${
        isDragging ? "opacity-75 scale-110 shadow-2xl z-50 cursor-grabbing" : ""
      } ${disabled ? "opacity-90" : ""}`}
    >
      <GameIcon name={item.iconName} className="w-16 h-16 sm:w-20 sm:h-20" />
      <span className="mt-1 sm:mt-2 text-xs sm:text-sm font-black text-slate-700 tracking-wide">
        {item.label}
      </span>
    </motion.div>
  );
}
