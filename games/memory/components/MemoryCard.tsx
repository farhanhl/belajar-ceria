"use client";

import React from "react";
import { motion } from "motion/react";
import { MemoryCardInstance } from "../types";
import { Sparkles, Check } from "lucide-react";

interface MemoryCardProps {
  card: MemoryCardInstance;
  onFlip: (instanceId: string) => void;
  disabled?: boolean;
}

export function MemoryCard({ card, onFlip, disabled }: MemoryCardProps) {
  const handleClick = () => {
    if (!card.isFlipped && !card.isMatched && !disabled) {
      onFlip(card.instanceId);
    }
  };

  return (
    <div
      className="relative aspect-square w-full select-none cursor-pointer [perspective:1000px]"
      onClick={handleClick}
    >
      <motion.div
        animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
        className="w-full h-full relative [transform-style:preserve-3d]"
      >
        {/* ================= BACK OF CARD (UNFLIPPED) ================= */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-3xl bg-gradient-to-br from-purple-500 via-indigo-500 to-sky-500 p-2 shadow-lg hover:shadow-2xl transition-all border-4 border-white ring-4 ring-purple-200 flex flex-col items-center justify-center group">
          {/* Playful Inner Card Pattern */}
          <div className="w-full h-full rounded-2xl bg-white/15 border-2 border-dashed border-white/40 flex flex-col items-center justify-center p-2 text-white text-center">
            <motion.div
              whileHover={{ scale: 1.15, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/25 flex items-center justify-center shadow-inner"
            >
              <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-amber-200 fill-amber-300" />
            </motion.div>
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-purple-100 mt-1">
              Buka
            </span>
          </div>
        </div>

        {/* ================= FRONT OF CARD (FLIPPED / MATCHED) ================= */}
        <div
          className={`absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-3xl p-3 shadow-xl flex flex-col items-center justify-between transition-all border-4 ${
            card.isMatched
              ? "bg-emerald-50 border-emerald-400 ring-4 ring-emerald-200"
              : "bg-white border-amber-400 ring-4 ring-amber-100"
          }`}
        >
          {/* Matched Success Pill Badge */}
          {card.isMatched && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="absolute -top-2 -right-2 bg-emerald-500 text-white p-1 rounded-full shadow-md z-10"
            >
              <Check className="w-4 h-4 stroke-[3]" />
            </motion.div>
          )}

          {/* Emoji / Illustration Container */}
          <div className="flex-1 flex items-center justify-center w-full">
            <motion.span
              animate={card.isMatched ? { scale: [1, 1.25, 1], rotate: [0, 10, -10, 0] } : { scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-6xl md:text-7xl select-none filter drop-shadow-md"
            >
              {card.emoji}
            </motion.span>
          </div>

          {/* Card Label */}
          <div
            className={`w-full py-1 px-2 rounded-xl text-center text-xs sm:text-sm font-black truncate shadow-inner ${
              card.isMatched
                ? "bg-emerald-100 text-emerald-950"
                : "bg-amber-100 text-amber-950"
            }`}
          >
            {card.name.id}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
