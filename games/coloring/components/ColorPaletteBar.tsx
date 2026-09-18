"use client";

import React from "react";
import { motion } from "motion/react";
import { CRAYON_PALETTE } from "../data/coloring-data";
import { useColoringGameStore } from "@/stores/coloring-game-store";
import { useSettingsStore } from "@/stores/settings-store";
import { soundFx } from "@/lib/audio/sound-fx";
import { Sparkles, Check } from "lucide-react";

interface ColorPaletteBarProps {
  className?: string;
}

export function ColorPaletteBar({ className = "" }: ColorPaletteBarProps) {
  const { activeColorHex, selectColor } = useColoringGameStore();
  const { language, soundEnabled, volume } = useSettingsStore();

  const handleSelectColor = (hex: string) => {
    if (soundEnabled) soundFx.playPop(volume);
    selectColor(hex);
  };

  const selectedCrayon = CRAYON_PALETTE.find((c) => c.hex === activeColorHex);

  return (
    <div
      className={`bg-white/95 backdrop-blur-md rounded-3xl p-3.5 sm:p-4 border-3 border-amber-300 shadow-xl flex flex-col justify-between gap-2.5 ${className}`}
    >
      {/* Header: Title and Active Color Badge */}
      <div className="flex items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400 shrink-0" />
          <span className="text-xs sm:text-sm font-black text-amber-950 uppercase tracking-wider">
            {language === "id" ? "Pilihan Krayon" : "Crayon Colors"}
          </span>
        </div>
        {/* Active Color Preview Indicator */}
        <div className="flex items-center gap-1.5 bg-amber-100/80 px-2.5 py-1 rounded-full border border-amber-200 shadow-inner">
          <div
            className="w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm shrink-0"
            style={{ backgroundColor: activeColorHex }}
          />
          <span className="text-[11px] sm:text-xs font-black text-amber-950 truncate max-w-[90px] sm:max-w-[120px]">
            {selectedCrayon?.name[language] ||
              (language === "id" ? "Warna Pilihan" : "Selected")}
          </span>
        </div>
      </div>

      {/* Crayons 4x4 Grid */}
      <div className="grid grid-cols-4 gap-2 sm:gap-2.5 py-1.5 px-0.5 justify-items-center">
        {CRAYON_PALETTE.map((crayon) => {
          const isSelected = activeColorHex === crayon.hex;

          return (
            <motion.button
              key={crayon.id}
              type="button"
              onClick={() => handleSelectColor(crayon.hex)}
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.94 }}
              animate={{ y: isSelected ? -4 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="group relative flex flex-col items-center cursor-pointer focus:outline-none p-1"
              title={crayon.name[language] || crayon.name.id}
            >
              {/* Selected Check Pill */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white shadow-md border-2 border-amber-400 flex items-center justify-center z-20"
                >
                  <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-600 stroke-[3.5]" />
                </motion.div>
              )}

              {/* Crayon Visual */}
              <div className="flex flex-col items-center">
                {/* Crayon Point / Cone Tip */}
                <div
                  className="w-5 sm:w-6 h-3.5 sm:h-4 rounded-t-full shadow-inner border-t-2 border-x-2 transition-all"
                  style={{
                    backgroundColor: crayon.hex,
                    borderColor: crayon.borderHex || crayon.hex,
                  }}
                />

                {/* Crayon Body / Wrapper */}
                <div
                  className={`w-6 sm:w-7 h-9 sm:h-11 rounded-b-xl border-2 flex flex-col items-center justify-between py-1 shadow-sm transition-all ${
                    isSelected
                      ? "ring-3 ring-amber-400 ring-offset-1 scale-105 shadow-md"
                      : "opacity-90 group-hover:opacity-100"
                  }`}
                  style={{
                    backgroundColor: crayon.hex,
                    borderColor: crayon.borderHex || crayon.hex,
                  }}
                >
                  {/* Crayon Stripes on Wrapper */}
                  <div className="w-full h-1.5 bg-black/15 my-auto flex items-center justify-center">
                    <div className="w-full h-0.5 bg-white/30" />
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
