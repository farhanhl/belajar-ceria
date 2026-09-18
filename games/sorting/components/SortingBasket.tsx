"use client";

import React from "react";
import { SortingCategoryDefinition, SortingItemDefinition } from "../types";
import { useDroppable } from "@dnd-kit/core";
import { motion, AnimatePresence } from "motion/react";
import { useSettingsStore } from "@/stores/settings-store";

interface SortingBasketProps {
  category: SortingCategoryDefinition;
  sortedItems: SortingItemDefinition[];
  isSelectedTarget?: boolean;
  isRecentTarget?: boolean;
  feedbackType?: "success" | "wrong" | null;
  onDropOrClick?: () => void;
}

export function SortingBasket({
  category,
  sortedItems,
  isSelectedTarget = false,
  isRecentTarget = false,
  feedbackType = null,
  onDropOrClick,
}: SortingBasketProps) {
  const { language } = useSettingsStore();

  const { isOver, setNodeRef } = useDroppable({
    id: category.id,
    data: { category },
  });

  return (
    <motion.div
      ref={setNodeRef}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      animate={
        isRecentTarget && feedbackType === "success"
          ? { scale: [1, 1.08, 1], y: [0, -8, 0] }
          : isRecentTarget && feedbackType === "wrong"
          ? { x: [-6, 6, -6, 6, 0] }
          : isOver
          ? { scale: 1.06, y: -6 }
          : {}
      }
      transition={{ duration: 0.25 }}
      onClick={onDropOrClick}
      className={`relative flex-1 min-w-[140px] sm:min-w-[170px] md:min-w-[195px] max-w-[240px] flex flex-col items-center rounded-3xl p-2.5 sm:p-3.5 border-3 sm:border-4 ${
        category.borderColor
      } bg-gradient-to-b ${category.bgGradient} ${
        isOver
          ? "ring-4 ring-sky-400 ring-offset-2 shadow-2xl brightness-105"
          : isSelectedTarget
          ? "ring-4 ring-amber-400 ring-offset-2 scale-102 shadow-xl"
          : "shadow-md hover:shadow-xl cursor-pointer"
      }`}
    >
      {/* Category Icon & Title */}
      <div className="flex flex-col items-center text-center space-y-0.5 w-full pointer-events-none">
        <span className="text-3xl sm:text-4xl filter drop-shadow-md select-none">
          {category.icon}
        </span>
        <h4 className="text-xs sm:text-sm font-black text-slate-800 tracking-tight line-clamp-1">
          {category.name[language] || category.name.id}
        </h4>
      </div>

      {/* Target Bin Container Area */}
      <div
        className={`mt-2 w-full min-h-[65px] sm:min-h-[80px] rounded-2xl border-2 border-dashed p-1.5 sm:p-2 flex flex-wrap items-center justify-center gap-1.5 shadow-inner transition-colors ${
          isOver
            ? "border-sky-500 bg-sky-50/95"
            : "border-slate-300 bg-white/75 backdrop-blur-sm"
        }`}
      >
        {sortedItems.length === 0 ? (
          <p className="text-[10px] sm:text-xs font-bold text-slate-500 text-center select-none">
            {isOver
              ? language === "en"
                ? "Drop here! 📥"
                : "Lepaskan di sini! 📥"
              : language === "en"
              ? "Empty bin"
              : "Kotak kosong"}
          </p>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <AnimatePresence>
              {sortedItems.map((item, idx) => (
                <motion.div
                  key={`${item.id}_${idx}`}
                  initial={{ scale: 0, opacity: 0, y: -15 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white shadow-sm border border-slate-200 flex items-center justify-center text-sm sm:text-base"
                  title={item.name[language] || item.name.id}
                >
                  {item.emoji}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Item Count Badge */}
      <div className="mt-1.5 inline-flex items-center gap-1 bg-white/90 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-extrabold text-slate-700 shadow-sm pointer-events-none">
        <span>✨</span>
        <span>
          {sortedItems.length} {language === "en" ? "items" : "barang"}
        </span>
      </div>
    </motion.div>
  );
}

