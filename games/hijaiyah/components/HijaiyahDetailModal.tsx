"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HijaiyahItem, HarakatType } from "../types";
import { useSettingsStore } from "@/stores/settings-store";
import { soundFx } from "@/lib/audio/sound-fx";
import { Volume2, X, Sparkles, BookOpen } from "lucide-react";
import { ChildButton } from "@/components/ui/ChildButton";

interface HijaiyahDetailModalProps {
  letter: HijaiyahItem | null;
  initialHarakat?: HarakatType;
  onClose: () => void;
}

export function HijaiyahDetailModal({
  letter,
  initialHarakat = "asli",
  onClose,
}: HijaiyahDetailModalProps) {
  const { language, soundEnabled, volume } = useSettingsStore();
  const [selectedHarakat, setSelectedHarakat] = useState<HarakatType>(initialHarakat);

  if (!letter) return null;

  const playSpeech = (text: string, lang = "ar-SA") => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSpeakLetter = () => {
    if (soundEnabled) soundFx.playPop(volume);
    let text = letter.name[language] || letter.name.id;
    if (selectedHarakat === "fathah") text = letter.harakat.fathah.sound;
    if (selectedHarakat === "kasrah") text = letter.harakat.kasrah.sound;
    if (selectedHarakat === "dhammah") text = letter.harakat.dhammah.sound;
    playSpeech(text, "ar-SA");
  };

  const handleSpeakWord = () => {
    if (soundEnabled) soundFx.playPop(volume);
    playSpeech(letter.exampleWord.arabic, "ar-SA");
  };

  const getDisplayArabic = () => {
    if (selectedHarakat === "fathah") return letter.harakat.fathah.arabic;
    if (selectedHarakat === "kasrah") return letter.harakat.kasrah.arabic;
    if (selectedHarakat === "dhammah") return letter.harakat.dhammah.arabic;
    return letter.letter;
  };

  const getDisplaySound = () => {
    if (selectedHarakat === "fathah") return letter.harakat.fathah.sound;
    if (selectedHarakat === "kasrah") return letter.harakat.kasrah.sound;
    if (selectedHarakat === "dhammah") return letter.harakat.dhammah.sound;
    return letter.name[language] || letter.name.id;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="relative w-full max-w-lg bg-white rounded-3xl p-5 sm:p-6 border-4 border-amber-300 shadow-2xl overflow-hidden flex flex-col space-y-4"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600 transition cursor-pointer z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Main Visual Display: Arabic Letter in Circle */}
          <div className="flex flex-col items-center justify-center pt-2">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-amber-100 via-amber-50 to-orange-100 border-4 border-amber-400 flex items-center justify-center shadow-inner relative">
              <span className="text-6xl sm:text-7xl font-black text-amber-950 font-arabic drop-shadow-sm select-none">
                {getDisplayArabic()}
              </span>

              <button
                type="button"
                onClick={handleSpeakLetter}
                className="absolute -bottom-3 bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-full shadow-lg border-2 border-white transition cursor-pointer"
                title={language === "en" ? "Listen pronunciation" : "Dengarkan pelafalan"}
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 text-center">
              <h3 className="text-2xl sm:text-3xl font-black text-amber-950">
                {getDisplaySound()}
              </h3>
              <p className="text-xs sm:text-sm font-bold text-amber-800">
                {language === "id" ? "Huruf Hijaiyah" : "Arabic Letter"} • {letter.transliteration}
              </p>
            </div>
          </div>

          {/* Harakat Tabs Switcher */}
          <div className="w-full bg-amber-50 rounded-2xl p-2 border-2 border-amber-200">
            <p className="text-[11px] font-black text-amber-900 uppercase tracking-wider text-center mb-1.5">
              {language === "id" ? "Pilih Harakat" : "Choose Harakat"}
            </p>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { id: "asli" as HarakatType, label: "Asli", arabic: letter.letter },
                { id: "fathah" as HarakatType, label: "Fathah", arabic: letter.harakat.fathah.arabic },
                { id: "kasrah" as HarakatType, label: "Kasrah", arabic: letter.harakat.kasrah.arabic },
                { id: "dhammah" as HarakatType, label: "Dhammah", arabic: letter.harakat.dhammah.arabic },
              ].map((h) => {
                const isActive = selectedHarakat === h.id;
                return (
                  <button
                    key={h.id}
                    type="button"
                    onClick={() => {
                      if (soundEnabled) soundFx.playPop(volume);
                      setSelectedHarakat(h.id);
                    }}
                    className={`py-1.5 px-1 rounded-xl text-center flex flex-col items-center justify-center transition cursor-pointer ${
                      isActive
                        ? "bg-amber-400 text-amber-950 font-black shadow-sm border border-amber-500 scale-105"
                        : "bg-white text-slate-700 font-bold hover:bg-amber-100/70 border border-slate-200"
                    }`}
                  >
                    <span className="text-base sm:text-lg font-arabic">{h.arabic}</span>
                    <span className="text-[10px] font-extrabold">{h.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Example Islamic Vocabulary Word Card */}
          <div className="w-full bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-3 sm:p-4 border-2 border-emerald-300 flex items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-4xl sm:text-5xl filter drop-shadow-sm select-none">
                {letter.exampleWord.emoji}
              </span>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-black text-emerald-950 font-arabic">
                    {letter.exampleWord.arabic}
                  </span>
                  <button
                    type="button"
                    onClick={handleSpeakWord}
                    className="p-1 rounded-full bg-emerald-200 hover:bg-emerald-300 text-emerald-900 transition cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs sm:text-sm font-extrabold text-emerald-800">
                  {letter.exampleWord.transliteration} ({letter.exampleWord.meaning[language] || letter.exampleWord.meaning.id})
                </p>
              </div>
            </div>
            <div className="hidden sm:block text-right">
              <span className="text-[11px] font-black text-emerald-700 uppercase tracking-wider bg-emerald-200/80 px-2 py-0.5 rounded-full">
                {language === "id" ? "Kosakata" : "Word"}
              </span>
            </div>
          </div>

          {/* Bottom Action Button */}
          <div className="pt-1">
            <ChildButton variant="secondary" size="md" onClick={onClose} className="w-full font-black">
              {language === "id" ? "Tutup" : "Close"}
            </ChildButton>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
