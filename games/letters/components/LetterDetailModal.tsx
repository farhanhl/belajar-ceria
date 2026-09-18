"use client";

import React, { useEffect } from "react";
import { LetterItem } from "../types";
import { ALPHABET_DATA, getLetterWord, getLetterEmoji, getLetterPhonetic } from "../data/alphabet-data";
import { motion, AnimatePresence } from "motion/react";
import { Volume2, X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { ttsService } from "@/lib/tts/tts";
import { soundFx } from "@/lib/audio/sound-fx";
import { useSettingsStore } from "@/stores/settings-store";
import { getTranslation } from "@/lib/i18n";

interface LetterDetailModalProps {
  letter: LetterItem | null;
  onClose: () => void;
  onNavigate: (letter: LetterItem) => void;
}

export function LetterDetailModal({ letter, onClose, onNavigate }: LetterDetailModalProps) {
  const { language, soundEnabled, autoTts, volume } = useSettingsStore();

  const currentIndex = letter ? ALPHABET_DATA.findIndex((l) => l.letter === letter.letter) : -1;
  const prevLetter = currentIndex > 0 ? ALPHABET_DATA[currentIndex - 1] : null;
  const nextLetter = currentIndex < ALPHABET_DATA.length - 1 ? ALPHABET_DATA[currentIndex + 1] : null;

  const phoneticText = letter ? getLetterPhonetic(letter, language) : "";
  const word = letter ? getLetterWord(letter, language) : "";
  const emoji = letter ? getLetterEmoji(letter, language) : "";

  const playVoice = () => {
    if (!letter) return;
    ttsService.speak({
      text: phoneticText,
      language,
      volume,
    });
  };

  useEffect(() => {
    if (letter && autoTts) {
      playVoice();
    }
  }, [letter, autoTts]);

  const handlePrev = () => {
    if (prevLetter) {
      if (soundEnabled) soundFx.playClick(volume);
      onNavigate(prevLetter);
    }
  };

  const handleNext = () => {
    if (nextLetter) {
      if (soundEnabled) soundFx.playClick(volume);
      onNavigate(nextLetter);
    }
  };

  if (!letter) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        {/* Backdrop click */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Modal Card */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={`relative z-10 w-full max-w-lg bg-white rounded-3xl border-4 ${letter.color.border} shadow-2xl p-6 sm:p-8 space-y-6 text-center select-none overflow-hidden`}
        >
          {/* Top Bar: Close Button & Category */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-extrabold text-xs sm:text-sm">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>{getTranslation("games.letters.title", {}, language)}</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
              title={getTranslation("app.close", {}, language)}
            >
              <X className="w-6 h-6 stroke-[2.5]" />
            </button>
          </div>

          {/* Letter & Emoji Showcase */}
          <div className={`p-6 rounded-3xl ${letter.color.bg} border-2 ${letter.color.border} space-y-4 shadow-inner`}>
            {/* Giant Letters */}
            <div className="flex items-baseline justify-center gap-3">
              <span className={`text-7xl sm:text-8xl font-black ${letter.color.text} tracking-tight`}>
                {letter.letter}
              </span>
              <span className={`text-5xl sm:text-6xl font-black ${letter.color.text} opacity-75`}>
                {letter.lowercase}
              </span>
            </div>

            {/* Giant Illustration Emoji */}
            <div className="text-7xl sm:text-8xl animate-bounce" style={{ animationDuration: "2s" }}>
              {emoji}
            </div>

            {/* Vocabulary Word */}
            <h3 className={`text-3xl sm:text-4xl font-black ${letter.color.text}`}>
              {word}
            </h3>
          </div>

          {/* TTS Audio Speak Button */}
          <button
            type="button"
            onClick={playVoice}
            className={`w-full py-4 px-6 rounded-2xl ${letter.color.badge} hover:opacity-95 text-white font-black text-lg sm:text-xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-3 cursor-pointer active:scale-98`}
          >
            <Volume2 className="w-7 h-7" />
            <span>{getTranslation("games.letters.listenVoice", { letter: letter.letter }, language)}</span>
          </button>

          {/* Bottom Navigation: Prev & Next */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={handlePrev}
              disabled={!prevLetter}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-black text-sm transition ${
                prevLetter
                  ? "bg-slate-100 hover:bg-slate-200 text-slate-800 cursor-pointer"
                  : "opacity-30 cursor-not-allowed text-slate-400"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>{prevLetter ? getTranslation("games.letters.letterNav", { letter: prevLetter.letter }, language) : getTranslation("games.letters.navStart", {}, language)}</span>
            </button>

            <span className="text-xs font-bold text-slate-400">
              {currentIndex + 1} / {ALPHABET_DATA.length}
            </span>

            <button
              type="button"
              onClick={handleNext}
              disabled={!nextLetter}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-black text-sm transition ${
                nextLetter
                  ? "bg-slate-100 hover:bg-slate-200 text-slate-800 cursor-pointer"
                  : "opacity-30 cursor-not-allowed text-slate-400"
              }`}
            >
              <span>{nextLetter ? getTranslation("games.letters.letterNav", { letter: nextLetter.letter }, language) : getTranslation("games.letters.navEnd", {}, language)}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
