import React from "react";
import { motion } from "motion/react";
import { useSettingsStore } from "@/stores/settings-store";

interface ProgressBarProps {
  current: number; // e.g. 1 to 5
  total: number; // e.g. 5
  className?: string;
}

export function ProgressBar({ current, total, className = "" }: ProgressBarProps) {
  const { language } = useSettingsStore();
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between text-sm sm:text-base font-extrabold text-amber-900 mb-1.5 px-1">
        <span>
          {language === "en" ? `Question ${current} of ${total}` : `Soal ${current} dari ${total}`}
        </span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="w-full h-4 sm:h-5 bg-amber-100 rounded-full p-1 border-2 border-amber-300 shadow-inner overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400 shadow-sm"
        />
      </div>
    </div>
  );
}
