"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLetterGameStore } from "@/stores/letter-game-store";
import { useProfileStore } from "@/stores/profile-store";
import { useSettingsStore } from "@/stores/settings-store";
import { Teacher } from "@/components/teacher/Teacher";
import { TeacherExpression } from "@/components/teacher/TeacherAvatar";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { soundFx } from "@/lib/audio/sound-fx";
import { getTranslation } from "@/lib/i18n";
import { getLetterWord, getLetterEmoji } from "../data/alphabet-data";
import { motion, AnimatePresence } from "motion/react";
import { Star, ArrowLeft, Sparkles, Check, HelpCircle } from "lucide-react";
import Link from "next/link";
import confetti from "canvas-confetti";

export function LetterQuizBoard() {
  const router = useRouter();
  const {
    questions,
    currentIndex,
    correctCount,
    submitAnswer,
    nextQuestion,
    finishQuiz,
    difficulty,
  } = useLetterGameStore();

  const { activeProfile, recordLetterResult } = useProfileStore();
  const { language, soundEnabled, volume } = useSettingsStore();

  const [teacherExpression, setTeacherExpression] = useState<TeacherExpression>("idle");
  const [teacherMessage, setTeacherMessage] = useState<string>("");
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const currentQ = questions[currentIndex];
  const childName = activeProfile?.name || "Teman";

  // Redirect if no questions
  useEffect(() => {
    if (questions.length === 0) {
      router.push("/learn/letters");
    }
  }, [questions, router]);

  // Set prompt message on question change
  useEffect(() => {
    if (!currentQ) return;
    setSelectedOptionId(null);
    setIsAnswering(false);
    setIsSuccess(null);
    setTeacherExpression("idle");
    setTeacherMessage(currentQ.speechText);
  }, [currentIndex, currentQ]);

  if (!currentQ) return null;

  const handleSelectOption = (optionId: string) => {
    if (isAnswering) return;

    setSelectedOptionId(optionId);
    if (soundEnabled) soundFx.playClick(volume);

    const { isCorrect, isComplete } = submitAnswer(optionId);

    if (isCorrect) {
      setIsAnswering(true);
      setIsSuccess(true);
      setTeacherExpression("celebrating");

      if (soundEnabled) soundFx.playCorrect(volume);

      // Light confetti burst
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#F59E0B", "#10B981", "#3B82F6", "#EC4899"],
        });
      } catch {
        // fallback if canvas-confetti is not available
      }

      const praises = [
        getTranslation("games.letters.praise1", { name: childName }, language),
        getTranslation("games.letters.praise2", { name: childName }, language),
        getTranslation("games.letters.praise3", { name: childName }, language),
        getTranslation("games.letters.praise4", {}, language),
      ];
      const randomPraise = praises[Math.floor(Math.random() * praises.length)];
      setTeacherMessage(randomPraise);

      // Wait 1.5s then go to next question or result
      setTimeout(() => {
        if (isComplete) {
          if (activeProfile) {
            const result = finishQuiz(activeProfile.id);
            recordLetterResult(result);
          }
          router.push("/learn/letters/result");
        } else {
          nextQuestion();
        }
      }, 1500);
    } else {
      setIsSuccess(false);
      setTeacherExpression("encouraging");

      if (soundEnabled) soundFx.playTryAgain(volume);

      const encouragements = [
        getTranslation("games.letters.encourage1", { name: childName }, language),
        getTranslation("games.letters.encourage2", {}, language),
        getTranslation("games.letters.encourage3", {}, language),
      ];
      const randomEncouragement =
        encouragements[Math.floor(Math.random() * encouragements.length)];
      setTeacherMessage(randomEncouragement);

      // Reset selection state after short delay
      setTimeout(() => {
        setSelectedOptionId(null);
        setIsSuccess(null);
      }, 800);
    }
  };

  return (
    <div className="w-full space-y-3 sm:space-y-4 select-none">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-3 bg-white/90 backdrop-blur rounded-2xl sm:rounded-3xl p-2.5 sm:p-3.5 border-2 border-amber-200 shadow-md">
        <Link
          href="/learn/letters"
          className="p-2 sm:p-2.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-2xl transition flex items-center gap-1.5 font-black text-xs sm:text-sm"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">{getTranslation("games.letters.chooseLevel", {}, language)}</span>
        </Link>

        {/* Progress Bar */}
        <div className="flex-1 max-w-xs mx-auto">
          <ProgressBar current={currentIndex + 1} total={questions.length || 5} />
        </div>

        {/* Live Stars Count */}
        <div className="flex items-center gap-1 bg-amber-500 text-white px-3 py-1.5 rounded-2xl font-black text-sm sm:text-base shadow">
          <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
          <span>{correctCount}</span>
        </div>
      </div>

      {/* Teacher Guide Avatar */}
      <Teacher
        expression={teacherExpression}
        message={teacherMessage}
        size={60}
        className="w-full"
      />

      {/* Question Card Arena */}
      <div className="bg-gradient-to-b from-amber-50 via-white to-orange-50/60 rounded-3xl border-4 border-amber-300 p-4 sm:p-6 shadow-xl space-y-4 sm:space-y-5">
        {/* Target Clue Display */}
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-amber-200 text-amber-950 font-black text-[11px] sm:text-xs px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            <span>{getTranslation("games.matching.questionCounter", { current: currentIndex + 1, total: questions.length }, language)}</span>
          </div>

          <h2 className="text-base sm:text-xl font-black text-amber-950 text-center max-w-lg">
            {currentQ.promptText}
          </h2>

          {/* Clue Visual Illustration / Target */}
          <div className="p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-white border-4 border-amber-300 shadow-md flex flex-col items-center justify-center min-w-[110px] min-h-[110px]">
            {currentQ.type === "word_match" ? (
              <>
                <span className="text-4xl sm:text-5xl animate-pulse">
                  {getLetterEmoji(currentQ.targetLetter, language)}
                </span>
                <span className="mt-1 text-sm sm:text-base font-black text-amber-950">
                  {getLetterWord(currentQ.targetLetter, language)}
                </span>
              </>
            ) : currentQ.type === "case_match" ? (
              <>
                <span className="text-4xl sm:text-5xl font-black text-amber-900">
                  {currentQ.targetLetter.letter}
                </span>
                <span className="text-[10px] sm:text-xs font-black text-amber-600 uppercase mt-0.5">
                  {getTranslation("games.letters.uppercaseLabel", {}, language)}
                </span>
              </>
            ) : (
              <>
                <span className="text-4xl sm:text-5xl font-black text-amber-900">
                  {currentQ.targetLetter.letter}
                </span>
                <span className="text-[10px] sm:text-xs font-black text-amber-600 uppercase mt-0.5">
                  {getTranslation("games.letters.findLetterLabel", {}, language)}
                </span>
              </>
            )}
          </div>
        </div>

        {/* 3 Option Choices Grid */}
        <div className="space-y-1.5">
          <p className="text-center text-[11px] sm:text-xs font-extrabold text-amber-800 uppercase tracking-widest">
            {getTranslation("games.letters.chooseAnswer", {}, language)}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-1">
            {currentQ.options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              let borderClass = "border-amber-300";
              let bgClass = "bg-white hover:bg-amber-50/60";
              let ringClass = "";

              if (isSelected && isSuccess === true) {
                borderClass = "border-emerald-500";
                bgClass = "bg-emerald-50 scale-105";
                ringClass = "ring-4 ring-emerald-300 shadow-2xl";
              } else if (isSelected && isSuccess === false) {
                borderClass = "border-rose-400";
                bgClass = "bg-rose-50 animate-shake";
                ringClass = "ring-4 ring-rose-300";
              }

              return (
                <motion.button
                  key={option.id}
                  type="button"
                  whileHover={isAnswering ? {} : { scale: 1.05, y: -4 }}
                  whileTap={isAnswering ? {} : { scale: 0.95 }}
                  onClick={() => handleSelectOption(option.id)}
                  disabled={isAnswering}
                  className={`relative p-3 sm:p-5 rounded-2xl sm:rounded-3xl border-4 ${borderClass} ${bgClass} ${ringClass} shadow-lg flex flex-col items-center justify-center transition-all cursor-pointer min-h-[80px] sm:min-h-[105px]`}
                >
                  <span className="text-3xl sm:text-4xl font-black text-slate-800">
                    {option.label}
                  </span>

                  {isSelected && isSuccess === true && (
                    <div className="absolute top-2 right-2 bg-emerald-500 text-white rounded-full p-1 shadow">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
