"use client";

import React, { useState } from "react";
import { AdabDoa } from "../types";
import { useSettingsStore } from "@/stores/settings-store";
import { getTranslation } from "@/lib/i18n";
import { ttsService } from "@/lib/tts/tts";
import { Volume2 } from "lucide-react";
import { motion } from "motion/react";

interface AdabDoaCardProps {
  doa: AdabDoa;
  className?: string;
}

export const AdabDoaCard: React.FC<AdabDoaCardProps> = ({ doa, className = "" }) => {
  const { language, volume, ttsVoiceURI } = useSettingsStore();
  const [isPlaying, setIsPlaying] = useState(false);

  const title = doa.title[language] || doa.title.id;
  const translation = doa.translation[language] || doa.translation.id;
  const whenToRead = doa.whenToRead[language] || doa.whenToRead.id;

  const handlePronounce = () => {
    setIsPlaying(true);
    ttsService.speak({
      text: doa.latin,
      volume,
      rate: 0.85,
      voiceURI: ttsVoiceURI,
      onEnd: () => setIsPlaying(false),
      onError: () => setIsPlaying(false),
    });
  };

  return (
    <div
      className={`rounded-3xl p-4 sm:p-5 bg-gradient-to-br from-emerald-50 via-teal-50 to-amber-50 border-3 border-emerald-300 shadow-md ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{doa.emoji}</span>
          <div>
            <h4 className="font-black text-emerald-950 text-sm sm:text-base">{title}</h4>
            <p className="text-[11px] sm:text-xs font-bold text-emerald-700">{whenToRead}</p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={handlePronounce}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl font-black text-xs cursor-pointer transition-all border shadow-xs ${
            isPlaying
              ? "bg-amber-400 text-amber-950 border-amber-500 animate-pulse"
              : "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700"
          }`}
          title={getTranslation("games.adab.listenDoa", {}, language)}
        >
          <Volume2 className="w-4 h-4" />
          <span className="hidden sm:inline">
            {getTranslation("games.adab.listenDoa", {}, language)}
          </span>
        </motion.button>
      </div>

      {/* Arabic Calligraphy Style Typography */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3.5 border border-emerald-200 text-center space-y-2">
        <p className="font-arabic text-2xl sm:text-3xl text-emerald-950 leading-relaxed tracking-wide dir-rtl py-1 font-bold">
          {doa.arabic}
        </p>
        <p className="text-xs sm:text-sm font-extrabold text-emerald-800 italic">
          "{doa.latin}"
        </p>
        <div className="pt-2 border-t border-emerald-100 text-[11px] sm:text-xs font-bold text-slate-600">
          <span className="font-black text-emerald-900">
            {getTranslation("games.adab.meaningLabel", {}, language)}:{" "}
          </span>
          {translation}
        </div>
      </div>
    </div>
  );
};
