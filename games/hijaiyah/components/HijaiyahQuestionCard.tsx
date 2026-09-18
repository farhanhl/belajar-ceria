"use client";

import React from "react";
import { motion } from "motion/react";
import { HijaiyahQuestion } from "../types";
import { useSettingsStore } from "@/stores/settings-store";
import { soundFx } from "@/lib/audio/sound-fx";
import { Volume2, CheckCircle2, XCircle } from "lucide-react";

interface HijaiyahQuestionCardProps {
  question: HijaiyahQuestion;
  selectedOptionId: string | null;
  lastAnswerResult: "correct" | "incorrect" | null;
  onSelectOption: (optionId: string) => void;
}

export function HijaiyahQuestionCard({
  question,
  selectedOptionId,
  lastAnswerResult,
  onSelectOption,
}: HijaiyahQuestionCardProps) {
  const { language, soundEnabled, volume } = useSettingsStore();

  const handleSpeakPrompt = () => {
    if (soundEnabled) soundFx.playClick(volume);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(question.speechText);
      utterance.lang = language === "en" ? "en-US" : "id-ID";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleOptionClick = (optionId: string) => {
    if (selectedOptionId) return; // Prevent multiple clicks
    onSelectOption(optionId);
  };

  return (
    <div className="w-full flex flex-col items-center space-y-4 select-none">
      {/* Question Prompt Card */}
      <div className="w-full bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-5 border-4 border-amber-300 shadow-xl flex flex-col items-center text-center space-y-3 relative">
        {/* Speaker Button */}
        <button
          type="button"
          onClick={handleSpeakPrompt}
          className="absolute top-3 right-3 p-2 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors shadow-sm cursor-pointer"
          title={language === "en" ? "Listen question" : "Dengarkan soal"}
        >
          <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Prompt Text */}
        <h3 className="text-base sm:text-xl font-black text-amber-950 max-w-xl px-6">
          {question.promptText}
        </h3>

        {/* Clue Visual if Hard Mode (Example Word & Emoji) or Big Letter */}
        {question.type === "word_match" ? (
          <div className="flex items-center gap-3 bg-emerald-50 px-4 py-2 rounded-2xl border-2 border-emerald-300">
            <span className="text-4xl sm:text-5xl filter drop-shadow-sm">
              {question.targetItem.exampleWord.emoji}
            </span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-950 font-arabic">
              {question.targetItem.exampleWord.arabic}
            </span>
          </div>
        ) : question.type === "harakat" ? (
          <div className="w-20 h-20 rounded-2xl bg-amber-100 border-3 border-amber-400 flex items-center justify-center shadow-inner">
            <span className="text-4xl sm:text-5xl font-black text-amber-950 font-arabic">
              {question.targetItem.letter}
            </span>
          </div>
        ) : (
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 border-3 border-amber-400 flex items-center justify-center shadow-inner">
            <span className="text-4xl sm:text-5xl font-black text-amber-950 font-arabic">
              {question.targetItem.letter}
            </span>
          </div>
        )}
      </div>

      {/* Multiple Choice Options Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-1">
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          const isCorrectOption = option.id === question.correctOptionId;

          let btnStyle = "bg-white/95 border-amber-300 hover:border-amber-400 hover:bg-amber-50 shadow-md text-amber-950";

          if (selectedOptionId) {
            if (isCorrectOption) {
              btnStyle = "bg-emerald-100 border-emerald-500 text-emerald-950 shadow-xl ring-4 ring-emerald-300/80 scale-102";
            } else if (isSelected && !isCorrectOption) {
              btnStyle = "bg-rose-100 border-rose-500 text-rose-950 shadow-md ring-2 ring-rose-300/60";
            } else {
              btnStyle = "bg-slate-100 border-slate-200 text-slate-400 opacity-60";
            }
          }

          return (
            <motion.button
              key={option.id}
              type="button"
              disabled={Boolean(selectedOptionId)}
              whileHover={selectedOptionId ? {} : { scale: 1.04, y: -3 }}
              whileTap={selectedOptionId ? {} : { scale: 0.96 }}
              animate={
                isSelected && isCorrectOption
                  ? { scale: [1, 1.08, 1] }
                  : isSelected && !isCorrectOption
                  ? { x: [-6, 6, -6, 6, 0] }
                  : {}
              }
              transition={{ duration: 0.25 }}
              onClick={() => handleOptionClick(option.id)}
              className={`relative flex flex-col items-center justify-center rounded-3xl p-4 sm:p-5 border-4 transition-all cursor-pointer min-h-[110px] sm:min-h-[130px] ${btnStyle}`}
            >
              {/* Feedback Icon Badge */}
              {selectedOptionId && isCorrectOption && (
                <div className="absolute top-2 right-2 text-emerald-600">
                  <CheckCircle2 className="w-5 h-5 fill-emerald-500 text-white" />
                </div>
              )}
              {selectedOptionId && isSelected && !isCorrectOption && (
                <div className="absolute top-2 right-2 text-rose-600">
                  <XCircle className="w-5 h-5 fill-rose-500 text-white" />
                </div>
              )}

              {/* Arabic Letter Visual */}
              <span className="text-4xl sm:text-5xl font-black font-arabic drop-shadow-xs mb-1 select-none">
                {option.letter}
              </span>

              {/* Text Label */}
              <span className="text-xs sm:text-sm font-black tracking-wide line-clamp-1">
                {option.label}
              </span>

              {option.subLabel && (
                <span className="text-[10px] font-extrabold text-amber-800">
                  {option.subLabel}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
