"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useColorsGameStore } from "@/stores/colors-game-store";
import { useProfileStore } from "@/stores/profile-store";
import { useSettingsStore } from "@/stores/settings-store";
import { ChildNavbar } from "@/components/navigation/ChildNavbar";
import { Teacher } from "@/components/teacher/Teacher";
import { TeacherExpression } from "@/components/teacher/TeacherAvatar";
import { ChildButton } from "@/components/ui/ChildButton";
import { ColorShapeQuestionCard } from "@/games/colors/components/ColorShapeQuestionCard";
import { soundFx } from "@/lib/audio/sound-fx";
import { ttsService } from "@/lib/tts/tts";
import { motion } from "motion/react";
import { ArrowLeft, CheckCircle2, RotateCcw, Volume2, Sparkles } from "lucide-react";
import Link from "next/link";

export default function ColorsPlayPage() {
  const router = useRouter();
  const {
    difficulty,
    questions,
    currentQuestionIndex,
    selectedOptionId,
    correctAnswers,
    incorrectAnswers,
    isAnswered,
    selectOption,
    assignItemToBasket,
    nextQuestion,
    finishGame,
    resetGame,
  } = useColorsGameStore();

  const { activeProfile, recordColorsResult } = useProfileStore();
  const { soundEnabled, autoTts, volume } = useSettingsStore();

  const [teacherExpression, setTeacherExpression] = useState<TeacherExpression>("idle");
  const [teacherMessage, setTeacherMessage] = useState<string>("");
  const hasRecordedRef = useRef(false);

  const currentQ = questions[currentQuestionIndex];
  const childName = activeProfile?.name || "Teman";

  // Redirect if no game loaded
  useEffect(() => {
    if (!currentQ) {
      router.push("/learn/colors");
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

  const handleOptionSelect = (optionId: string) => {
    if (isAnswered) return;

    const { isCorrect, isFinished } = selectOption(optionId);

    if (isCorrect) {
      if (soundEnabled) soundFx.playCorrect(volume);
      setTeacherExpression("celebrating");
      const praises = [
        `Pintar sekali, ${childName}! Jawabanmu benar!`,
        `Hebat, ${childName}! Kamu menemukan yang tepat!`,
        `Wah, luar biasa sekali! Tepat sasaran!`,
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
        `Hampir tepat, ${childName}! Coba perhatikan lagi ya!`,
        `Yuk coba cari pilihan yang lain!`,
        `Tidak apa-apa, kamu pasti bisa!`,
      ];
      setTeacherMessage(encMessages[Math.floor(Math.random() * encMessages.length)]);
    }
  };

  const handleAssignToBasket = (itemId: string, basketId: string) => {
    const { isCorrect, isAllSorted } = assignItemToBasket(itemId, basketId);

    if (isCorrect) {
      if (soundEnabled) soundFx.playPieceSnap(volume);

      if (isAllSorted) {
        if (soundEnabled) soundFx.playCelebration(volume);
        setTeacherExpression("celebrating");
        setTeacherMessage(`Luar biasa, ${childName}! Semua benda berhasil dikelompokkan dengan tepat!`);

        setTimeout(() => {
          if (currentQuestionIndex >= questions.length - 1) {
            handleCompleteSession();
          } else {
            nextQuestion();
          }
        }, 1400);
      }
    } else {
      if (soundEnabled) soundFx.playIncorrect(volume);
      setTeacherExpression("thinking");
      setTeacherMessage(`Benda ini kurang cocok di wadah ini, ${childName}. Coba wadah yang satunya ya!`);
    }
  };

  const handleCompleteSession = (customCorrect?: number) => {
    if (activeProfile && !hasRecordedRef.current) {
      hasRecordedRef.current = true;
      const res = finishGame(customCorrect);
      if (res) {
        recordColorsResult({
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

    router.push("/learn/colors/result");
  };

  const handleFinishEarly = () => {
    if (soundEnabled) soundFx.playCelebration(volume * 0.7);
    handleCompleteSession(correctAnswers);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <ChildNavbar />

      <main className="flex-1 max-w-6xl w-full mx-auto space-y-6 py-8">
        {/* Top Header & Progress */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <Link href="/learn/colors">
            <ChildButton variant="secondary" size="sm" className="gap-1.5">
              <ArrowLeft className="w-4 h-4" />
              <span>Pilih Mode</span>
            </ChildButton>
          </Link>

          <div className="flex items-center gap-2">
            <span className="bg-white/90 text-amber-950 font-black px-3.5 py-1.5 rounded-full text-xs sm:text-sm shadow-sm border border-amber-200">
              Soal: <strong className="text-amber-600">{currentQuestionIndex + 1}</strong> / {questions.length}
            </span>

            <span
              className={`font-black px-3.5 py-1.5 rounded-full text-xs sm:text-sm text-white shadow-sm ${difficulty === "easy"
                  ? "bg-emerald-500"
                  : difficulty === "medium"
                    ? "bg-amber-500"
                    : "bg-rose-500"
                }`}
            >
              {difficulty === "easy"
                ? "Mudah"
                : difficulty === "medium"
                  ? "Sedang"
                  : "Sulit"}
            </span>
          </div>
        </div>

        {/* Teacher Avatar Feedback */}
        <Teacher
          expression={teacherExpression}
          message={teacherMessage}
          className="w-full"
        />

        {/* Audio Repeat Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSpeakPrompt}
            className="inline-flex items-center gap-2 bg-amber-100 hover:bg-amber-200 text-amber-900 font-extrabold px-4 py-2 rounded-full text-xs sm:text-sm shadow-sm transition-transform active:scale-95 cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-amber-600" />
            <span>Dengarkan Pertanyaan 🔊</span>
          </button>
        </div>

        {/* Question Interactive Area */}
        <div className="bg-white/95 rounded-3xl p-5 sm:p-8 shadow-xl border-2 border-amber-200">
          <ColorShapeQuestionCard
            question={currentQ}
            selectedOptionId={selectedOptionId}
            isAnswered={isAnswered}
            onSelectOption={handleOptionSelect}
            onAssignToBasket={handleAssignToBasket}
          />
        </div>

        {/* Bottom Selesai Bermain Button */}
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
