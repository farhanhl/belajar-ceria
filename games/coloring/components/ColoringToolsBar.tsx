"use client";

import React from "react";
import { useColoringGameStore } from "@/stores/coloring-game-store";
import { useSettingsStore } from "@/stores/settings-store";
import { soundFx } from "@/lib/audio/sound-fx";
import { getTranslation } from "@/lib/i18n";
import { RotateCcw, Trash2, Wand2, CheckCircle2, ArrowLeft } from "lucide-react";
import { ChildButton } from "@/components/ui/ChildButton";
import Link from "next/link";

interface ColoringToolsBarProps {
  onFinish: () => void;
}

export function ColoringToolsBar({ onFinish }: ColoringToolsBarProps) {
  const { undo, resetColors, applyPreviewColors, history, filledColors } = useColoringGameStore();
  const { language, soundEnabled, volume } = useSettingsStore();

  const handleUndo = () => {
    if (soundEnabled) soundFx.playClick(volume);
    undo();
  };

  const handleReset = () => {
    if (soundEnabled) soundFx.playWrong(volume);
    resetColors();
  };

  const handleMagicFill = () => {
    if (soundEnabled) soundFx.playCelebration(volume);
    applyPreviewColors();
  };

  const coloredCount = Object.keys(filledColors).length;

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl p-3 sm:p-4 border-3 border-amber-300 shadow-md flex flex-wrap items-center justify-between gap-2.5 sm:gap-4">
      {/* Back Button */}
      <Link href="/learn/coloring">
        <ChildButton variant="secondary" size="sm" className="gap-2 text-xs sm:text-sm font-black">
          <ArrowLeft className="w-4 h-4" />
          <span>{getTranslation("app.back", {}, language)}</span>
        </ChildButton>
      </Link>

      {/* Center Tool Buttons */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Undo Button */}
        <button
          type="button"
          onClick={handleUndo}
          disabled={history.length === 0}
          title={language === "id" ? "Batalkan (Undo)" : "Undo"}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-2xl font-black text-xs sm:text-sm cursor-pointer transition-all ${history.length > 0
              ? "bg-amber-100 hover:bg-amber-200 text-amber-950 shadow-sm active:scale-95"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden xs:inline">{language === "id" ? "Batal" : "Undo"}</span>
        </button>

        {/* Reset / Clear All */}
        <button
          type="button"
          onClick={handleReset}
          disabled={coloredCount === 0}
          title={language === "id" ? "Hapus Semua Warna" : "Clear All"}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-2xl font-black text-xs sm:text-sm cursor-pointer transition-all ${coloredCount > 0
              ? "bg-rose-100 hover:bg-rose-200 text-rose-950 shadow-sm active:scale-95"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
        >
          <Trash2 className="w-4 h-4 text-rose-600" />
          <span className="hidden xs:inline">{language === "id" ? "Hapus" : "Clear"}</span>
        </button>

        {/* Magic Fill / Hint */}
        <button
          type="button"
          onClick={handleMagicFill}
          title={language === "id" ? "Warna Ajaib (Otomatis)" : "Magic Color"}
          className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-2xl font-black text-xs sm:text-sm cursor-pointer transition-all bg-purple-100 hover:bg-purple-200 text-purple-950 shadow-sm active:scale-95 border border-purple-300"
        >
          <Wand2 className="w-4 h-4 text-purple-600" />
          <span className="hidden xs:inline">{language === "id" ? "Ajaib" : "Magic"}</span>
        </button>
      </div>

      {/* Finish Button */}
      <ChildButton
        type="button"
        variant="success"
        size="sm"
        onClick={onFinish}
        className="gap-2 text-xs sm:text-sm font-black shadow-lg"
      >
        <CheckCircle2 className="w-4 h-4" />
        <span>{language === "id" ? "Selesai!" : "Done!"}</span>
      </ChildButton>
    </div>
  );
}
