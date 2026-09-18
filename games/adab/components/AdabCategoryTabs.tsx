"use client";

import React from "react";
import { AdabCategory } from "../types";
import { ADAB_CATEGORIES } from "../data/adab-data";
import { useSettingsStore } from "@/stores/settings-store";
import { motion } from "motion/react";

interface AdabCategoryTabsProps {
  activeCategory: AdabCategory;
  onSelectCategory: (category: AdabCategory) => void;
}

export const AdabCategoryTabs: React.FC<AdabCategoryTabsProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const { language } = useSettingsStore();

  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-none">
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-max px-1">
        {ADAB_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          const title = cat.title[language] || cat.title.id;

          return (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm cursor-pointer transition-all border-2 shadow-xs ${
                isActive
                  ? "bg-emerald-600 text-white border-emerald-700 shadow-md shadow-emerald-600/20 ring-4 ring-emerald-200 scale-105"
                  : "bg-white/95 text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
              }`}
            >
              <span className="text-base">{cat.icon}</span>
              <span>{title}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
