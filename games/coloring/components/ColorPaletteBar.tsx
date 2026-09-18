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

  return (
    <div
      className={`bg-white/95 backdrop-blur-md rounded-3xl p-3 sm:p-4 border-3 border-amber-300 shadow-xl flex flex-col gap-2.5 ${className}`}
    >
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
          <span className="text-xs sm:text-sm font-black text-amber-950 uppercase tracking-wider">
            {language === "id" ? "Pilih Warna Krayon" : "Choose Crayon Color"}
          </span>
        </div>
        {/* Active Color Preview Indicator */}
        <div className="flex items-center gap-2 bg-amber-100/70 px-3 py-1 rounded-full">
          <div
            className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
            style={{ backgroundColor: activeColorHex }}
          />
          <span className="text-xs font-black text-amber-950">
            {CRAYON_PALETTE.find((c) => c.hex === activeColorHex)?.name[language] ||
              (language === "id" ? "Warna Pilihan" : "Selected")}
          </span>
        </div>
      </div>

      {/* Crayons Row */}
      <div className="flex items-end gap-2 sm:gap-3 overflow-x-auto pb-2 pt-3 px-1 scrollbar-thin scrollbar-thumb-amber-300 scrollbar-track-transparent">
        {CRAYON_PALETTE.map((crayon) => {
          const isSelected = activeColorHex === crayon.hex;

          return (
            <motion.button
              key={crayon.id}
              type="button"
              onClick={() => handleSelectColor(crayon.hex)}
              whileHover={{ y: -6, scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              animate={{ y: isSelected ? -8 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={`group relative flex flex-col items-center shrink-0 cursor-pointer focus:outline-none transition-all`}
              title={crayon.name[language] || crayon.name.id}
            >
              {/* Selected Check Pill */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-3 w-5 h-5 rounded-full bg-white shadow-md border-2 border-amber-400 flex items-center justify-center z-20"
                >
                  <Check className="w-3 h-3 text-amber-600 stroke-[3.5]" />
                </motion.div>
              )}

              {/* Crayon Visual */}
              <div className="flex flex-col items-center">
                {/* Crayon Point / Cone Tip */}
                <div
                  className="w-5 sm:w-6 h-5 sm:h-6 rounded-t-full shadow-inner border-t-2 border-x-2"
                  style={{
                    backgroundColor: crayon.hex,
                    borderColor: crayon.borderHex || crayon.hex,
                  }}
                />

                {/* Crayon Body / Wrapper */}
                <div
                  className={`w-7 sm:w-8 h-14 sm:h-16 rounded-b-xl border-2 flex flex-col items-center justify-between py-1 shadow-md transition-all ${
                    isSelected
                      ? "ring-4 ring-amber-400 ring-offset-2 scale-105 shadow-xl"
                      : "opacity-90 group-hover:opacity-100"
                  }`}
                  style={{
                    backgroundColor: crayon.hex,
                    borderColor: crayon.borderHex || crayon.hex,
                  }}
                >
                  {/* Crayon Stripes on Wrapper */}
                  <div className="w-full h-2 bg-black/15 my-auto flex items-center justify-center">
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
