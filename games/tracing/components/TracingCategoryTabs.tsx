"use client";

import React from "react";
import { TracingCategory } from "../types";
import { useSettingsStore } from "@/stores/settings-store";
import { getTranslation } from "@/lib/i18n";
import { Sparkles, Type, Hash, Moon } from "lucide-react";

interface TracingCategoryTabsProps {
  activeCategory: TracingCategory;
  onSelectCategory: (category: TracingCategory) => void;
}

export const TracingCategoryTabs: React.FC<TracingCategoryTabsProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const { language } = useSettingsStore();

  const categories: {
    id: TracingCategory;
    labelKey: string;
    icon: React.ReactNode;
    color: string;
    activeClasses: string;
  }[] = [
    {
      id: "lines",
      labelKey: "games.tracing.catLines",
      icon: <Sparkles className="w-5 h-5" />,
      color: "text-amber-600",
      activeClasses: "bg-amber-500 text-white shadow-lg ring-4 ring-amber-200 scale-105",
    },
    {
      id: "letters",
      labelKey: "games.tracing.catLetters",
      icon: <Type className="w-5 h-5" />,
      color: "text-blue-600",
      activeClasses: "bg-blue-500 text-white shadow-lg ring-4 ring-blue-200 scale-105",
    },
    {
      id: "numbers",
      labelKey: "games.tracing.catNumbers",
      icon: <Hash className="w-5 h-5" />,
      color: "text-emerald-600",
      activeClasses: "bg-emerald-500 text-white shadow-lg ring-4 ring-emerald-200 scale-105",
    },
    {
      id: "hijaiyah",
      labelKey: "games.tracing.catHijaiyah",
      icon: <Moon className="w-5 h-5" />,
      color: "text-purple-600",
      activeClasses: "bg-purple-500 text-white shadow-lg ring-4 ring-purple-200 scale-105",
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-2 bg-white/90 backdrop-blur-md rounded-3xl border-3 border-indigo-200 shadow-md max-w-2xl mx-auto">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        const label = getTranslation(cat.labelKey, {}, language);
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all duration-200 cursor-pointer border-2 ${
              isActive
                ? `${cat.activeClasses} border-transparent`
                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-indigo-50 hover:text-indigo-900 hover:border-indigo-200"
            }`}
          >
            <span className={isActive ? "text-white" : cat.color}>{cat.icon}</span>
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
};
