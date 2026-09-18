"use client";

import React from "react";
import { HIJAIYAH_DATA } from "../data/hijaiyah-data";
import { HijaiyahCard } from "./HijaiyahCard";
import { HijaiyahDetailModal } from "./HijaiyahDetailModal";
import { useHijaiyahGameStore } from "@/stores/hijaiyah-game-store";
import { useSettingsStore } from "@/stores/settings-store";
import { HarakatType } from "../types";
import { soundFx } from "@/lib/audio/sound-fx";
import { Sparkles } from "lucide-react";

export function HijaiyahGrid() {
  const {
    activeLetterModal,
    activeHarakatFilter,
    openLetterModal,
    closeLetterModal,
    setHarakatFilter,
  } = useHijaiyahGameStore();

  const { language, soundEnabled, volume } = useSettingsStore();

  const harakatOptions: { id: HarakatType; label: string; symbol: string }[] = [
    { id: "asli", label: language === "id" ? "Huruf Asli" : "Base Letters", symbol: "ا ب ت" },
    { id: "fathah", label: "Fathah (ـَ)", symbol: "A (بَ)" },
    { id: "kasrah", label: "Kasrah (ـِ)", symbol: "I (بِ)" },
    { id: "dhammah", label: "Dhammah (ـُ)", symbol: "U (بُ)" },
  ];

  return (
    <div className="w-full flex flex-col space-y-4">
      {/* Harakat Switcher Filter Bar */}
      <div className="w-full bg-white/95 backdrop-blur-md rounded-2xl p-2 sm:p-3 border-3 border-amber-300 shadow-md flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 px-1">
          <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
          <span className="text-xs sm:text-sm font-black text-amber-950 uppercase tracking-wider">
            {language === "id" ? "Tampilan Harakat:" : "Harakat View:"}
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-0.5">
          {harakatOptions.map((opt) => {
            const isSelected = activeHarakatFilter === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  if (soundEnabled) soundFx.playClick(volume);
                  setHarakatFilter(opt.id);
                }}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-black transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? "bg-amber-400 text-amber-950 shadow-md border-2 border-amber-500 scale-105"
                    : "bg-amber-100/70 hover:bg-amber-200 text-amber-900 border border-amber-200"
                }`}
              >
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of 28 Hijaiyah Cards (RTL Arabic natural flow or clean grid) */}
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3 sm:gap-4 w-full">
        {HIJAIYAH_DATA.map((item) => (
          <HijaiyahCard
            key={item.id}
            item={item}
            harakatFilter={activeHarakatFilter}
            onClick={() => openLetterModal(item)}
          />
        ))}
      </div>

      {/* Detail Pop-up Modal */}
      <HijaiyahDetailModal
        letter={activeLetterModal}
        initialHarakat={activeHarakatFilter}
        onClose={closeLetterModal}
      />
    </div>
  );
}
