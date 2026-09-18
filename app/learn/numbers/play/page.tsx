"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useNumbersGameStore } from "@/stores/numbers-game-store";
import { useProfileStore } from "@/stores/profile-store";
import { useSettingsStore } from "@/stores/settings-store";
import { ChildNavbar } from "@/components/navigation/ChildNavbar";
import { Teacher } from "@/components/teacher/Teacher";
import { TeacherExpression } from "@/components/teacher/TeacherAvatar";
import { ChildButton } from "@/components/ui/ChildButton";
import { MathFormulaDisplay } from "@/games/numbers/components/MathFormulaDisplay";
import { soundFx } from "@/lib/audio/sound-fx";
import { ttsService } from "@/lib/tts/tts";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, CheckCircle2, XCircle, Volume2, Sparkles } from "lucide-react";
import Link from "next/link";

export default function NumbersPlayPage() {
  const router = useRouter();
  const {
    mode,
    difficulty,
    questions,
    currentQuestionIndex,
    selectedOptionValue,
    countedIndices,
    correctAnswers,
    incorrectAnswers,
    isAnswered,
    toggleCountObject,
    selectOption,
    nextQuestion,
    finishGame,
    resetGame,
  } = useNumbersGameStore();

  const { activeProfile, recordNumbersResult } = useProfileStore();
  const { language, soundEnabled, autoTts, volume } = useSettingsStore();

  const [teacherExpression, setTeacherExpression] = useState<TeacherExpression>("idle");
  const [teacherMessage, setTeacherMessage] = useState<string>("");
  const hasRecordedRef = useRef(false);

  const currentQ = questions[currentQuestionIndex];
  const childName = activeProfile?.name || "Teman";

  // Redirect if no active game loaded
  useEffect(() => {
    if (!currentQ) {
      router.push("/learn/numbers");
      return;
    }

    hasRecordedRef.current = false;
    setTeacherExpression("happy");
    setTeacherMessage(currentQ.prompt.id);

    if (autoTts) {
      ttsService.speak({
        text: currentQ.voicePrompt.id,
        language: "id",
        volume,
      });
    }
  }, [currentQuestionIndex, currentQ?.id]);

  if (!currentQ) return null;

  const handleSpeakPrompt = () => {
    if (soundEnabled) soundFx.playClick(volume * 0.5);
    ttsService.speak({
      text: currentQ.voicePrompt.id,
      language: "id",
      volume,
    });
  };

  const handleOptionSelect = (value: number) => {
    if (isAnswered) return;

    const { isCorrect, isFinished } = selectOption(value);

    if (isCorrect) {
      if (soundEnabled) soundFx.playCorrect(volume);
      setTeacherExpression("celebrating");
      const praises = [
        `Pintar sekali, ${childName}! Jawabannya tepat ${value}!`,
        `Hebat, ${childName}! Hitunganmu benar!`,
        `Wah, luar biasa sekali! Kamu jago berhitung!`,
      ];
      setTeacherMessage(praises[Math.floor(Math.random() * praises.length)]);

      setTimeout(() => {
        if (isFinished || currentQuestionIndex >= questions.length - 1) {
          handleCompleteSession();
        } else {
          nextQuestion();
        }
      }, 1200);
    } else {
      if (soundEnabled) soundFx.playIncorrect(volume);
      setTeacherExpression("thinking");
      const encMessages = [
        `Hampir tepat, ${childName}! Coba hitung buahnya sekali lagi ya!`,
        `Yuk hitung pelan-pelan bersama Ibu Guru!`,
        `Tidak apa-apa, ayo coba pilih angka yang lain!`,
      ];
      setTeacherMessage(encMessages[Math.floor(Math.random() * encMessages.length)]);
    }
  };

  const handleCompleteSession = (customCorrect?: number) => {
    if (activeProfile && !hasRecordedRef.current) {
      hasRecordedRef.current = true;
      const res = finishGame(customCorrect);
      if (res) {
        recordNumbersResult({
          profileId: activeProfile.id,
          difficulty: res.difficulty,
          totalQuestions: res.totalQuestions,
          correctAnswers: res.correctAnswers,
          incorrectAnswers: res.incorrectAnswers,
          starsEarned: res.starsEarned,
          completedAt: res.completedAt,
        });
      }
    }

    router.push("/learn/numbers/result");
  };

  const handleFinishEarly = () => {
    if (soundEnabled) soundFx.playCelebration(volume * 0.7);
    handleCompleteSession(correctAnswers);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ChildNavbar />

      <main className="flex-1 max-w-6xl w-full mx-auto space-y-3 sm:space-y-4 py-3 sm:py-4 px-3 sm:px-6">
        {/* Top Header & Progress */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <Link href="/learn/numbers">
            <ChildButton variant="secondary" size="sm" className="gap-1.5">
              <ArrowLeft className="w-4 h-4" />
              <span>{language === "id" ? "Pilih Mode" : "Choose Mode"}</span>
            </ChildButton>
          </Link>

          <div className="flex items-center gap-2">
            <span className="bg-white/90 text-amber-950 font-black px-3.5 py-1.5 rounded-full text-xs sm:text-sm shadow-sm border border-amber-200">
              {language === "id" ? "Soal:" : "Question:"} <strong className="text-amber-600">{currentQuestionIndex + 1}</strong> / {questions.length}
            </span>

            <span
              className={`font-black px-3.5 py-1.5 rounded-full text-xs sm:text-sm text-white shadow-sm ${difficulty === "easy"
                  ? "bg-emerald-500"
                  : difficulty === "medium"
                    ? "bg-amber-500"
                    : "bg-rose-500"
                }`}
            >
              {mode === "addition"
                ? (language === "id" ? "Penjumlahan ➕" : "Addition ➕")
                : mode === "subtraction"
                  ? (language === "id" ? "Pengurangan ➖" : "Subtraction ➖")
                  : mode === "counting"
                    ? (language === "id" ? "Membilang 🍉" : "Counting 🍉")
                    : (language === "id" ? "Gabungan 🔀" : "Mixed 🔀")}
            </span>
          </div>
        </div>

        {/* Teacher Guide Avatar */}
        <Teacher
          expression={teacherExpression}
          message={teacherMessage}
          size={60}
          className="w-full"
        />

        {/* Audio Repeat Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSpeakPrompt}
            className="inline-flex items-center gap-2 bg-amber-100 hover:bg-amber-200 text-amber-900 font-extrabold px-3.5 py-1.5 rounded-full text-xs sm:text-sm shadow-sm transition-transform active:scale-95 cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-amber-600" />
            <span>{language === "id" ? "Dengarkan Soal 🔊" : "Listen Question 🔊"}</span>
          </button>
        </div>

        {/* Interactive Formula / Objects Area */}
        <div className="bg-white/95 rounded-3xl p-4 sm:p-6 shadow-xl border-2 border-amber-200">
          <MathFormulaDisplay
            question={currentQ}
            countedIndices={countedIndices}
            onToggleCount={toggleCountObject}
            selectedAnswer={selectedOptionValue}
            isAnswered={isAnswered}
          />

          {/* Number Answer Choices Grid */}
          <div className="pt-4 border-t border-amber-100 mt-4 space-y-2">
            <p className="text-xs sm:text-sm font-black text-amber-950 text-center uppercase tracking-wider">
              {language === "id" ? "Pilih Angka Jawaban yang Tepat:" : "Choose the Correct Number:"}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-lg mx-auto">
              {currentQ.options.map((option) => {
                const isSelected = selectedOptionValue === option.value;
                const isCorrect = isSelected && option.isCorrect;
                const isWrong = isSelected && !option.isCorrect;

                return (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.06, y: -3 }}
                    whileTap={{ scale: 0.94 }}
                    disabled={isAnswered}
                    onClick={() => handleOptionSelect(option.value)}
                    className={`relative py-4 px-3 rounded-2xl font-black text-3xl sm:text-4xl shadow-md border-4 transition-all ${isCorrect
                        ? "bg-emerald-500 text-white border-emerald-400 ring-4 ring-emerald-200"
                        : isWrong
                          ? "bg-rose-500 text-white border-rose-400 ring-4 ring-rose-200 animate-shake"
                          : "bg-white text-slate-800 hover:bg-amber-50 border-amber-200 hover:border-amber-400"
                      } ${isAnswered ? "cursor-default" : "cursor-pointer"}`}
                  >
                    <span>{option.value}</span>

                    {/* Feedback Badges */}
                    <AnimatePresence>
                      {isCorrect && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 bg-white text-emerald-600 rounded-full p-1 shadow"
                        >
                          <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                        </motion.div>
                      )}

                      {isWrong && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 bg-white text-rose-600 rounded-full p-1 shadow"
                        >
                          <XCircle className="w-5 h-5 stroke-[2.5]" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selesai Bermain Button */}
        <div className="pt-2 max-w-sm mx-auto">
          <ChildButton
            variant="success"
            size="md"
            onClick={handleFinishEarly}
            className="w-full gap-2 text-base font-black shadow-lg hover:scale-[1.02] transition-transform"
          >
            <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
            <span>Selesai Bermain ✨</span>
          </ChildButton>
        </div>
      </main>
    </div>
  );
}
