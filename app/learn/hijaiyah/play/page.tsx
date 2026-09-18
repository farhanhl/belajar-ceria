"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useHijaiyahGameStore } from "@/stores/hijaiyah-game-store";
import { useProfileStore } from "@/stores/profile-store";
import { useSettingsStore } from "@/stores/settings-store";
import { ChildNavbar } from "@/components/navigation/ChildNavbar";
import { Teacher } from "@/components/teacher/Teacher";
import { ChildButton } from "@/components/ui/ChildButton";
import { HijaiyahQuestionCard } from "@/games/hijaiyah/components/HijaiyahQuestionCard";
import { soundFx } from "@/lib/audio/sound-fx";
import { ttsService } from "@/lib/tts/tts";
import { motion } from "motion/react";
import { ArrowLeft, Sparkles, RotateCcw } from "lucide-react";
import Link from "next/link";
import { getTranslation } from "@/lib/i18n";

export default function HijaiyahPlayPage() {
  const router = useRouter();
  const {
    difficulty,
    questions,
    currentIndex,
    selectedOptionId,
    lastAnswerResult,
    correctCount,
    startQuizSession,
    submitAnswer,
    nextQuestion,
    finishQuiz,
  } = useHijaiyahGameStore();

  const { activeProfile, recordHijaiyahResult } = useProfileStore();
  const { language, soundEnabled, autoTts, volume } = useSettingsStore();

  const currentQ = questions[currentIndex];

  // Auto redirect if page is accessed directly without starting quiz
  useEffect(() => {
    if (!currentQ && questions.length === 0) {
      startQuizSession(difficulty || "easy", language);
    }
  }, [currentQ, questions.length, difficulty, language, startQuizSession]);

  // Read question aloud via auto TTS
  useEffect(() => {
    if (currentQ && autoTts) {
      ttsService.speak({
        text: currentQ.speechText,
        language: language === "en" ? "en" : "id",
      });
    }
  }, [currentQ?.id, autoTts, language]);

  if (!currentQ) return null;

  const handleSelectOption = (optionId: string) => {
    const { isCorrect, isComplete } = submitAnswer(optionId);

    if (isCorrect) {
      if (soundEnabled) soundFx.playSuccess(volume);
    } else {
      if (soundEnabled) soundFx.playWrong(volume);
    }

    // Delay before transitioning to next question or result
    setTimeout(() => {
      if (isComplete) {
        if (soundEnabled) soundFx.playCelebration(volume);
        const result = finishQuiz(activeProfile?.id || "guest");

        if (activeProfile) {
          recordHijaiyahResult({
            profileId: activeProfile.id,
            difficulty: result.difficulty,
            totalQuestions: result.totalQuestions,
            correctAnswers: result.correctAnswers,
            incorrectAnswers: result.incorrectAnswers,
            starsEarned: result.starsEarned,
            completedAt: result.completedAt,
          });
        }

        router.push("/learn/hijaiyah/result");
      } else {
        nextQuestion();
      }
    }, 1100);
  };

  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  const teacherExpression =
    lastAnswerResult === "correct"
      ? "celebrating"
      : lastAnswerResult === "incorrect"
      ? "thinking"
      : "happy";

  const teacherMessage =
    lastAnswerResult === "correct"
      ? language === "id"
        ? "Maa Syaa Allah! Jawabanmu benar sekali!"
        : "Awesome! That is correct!"
      : lastAnswerResult === "incorrect"
      ? language === "id"
        ? "Belum tepat, tidak apa-apa yuk coba lagi ya!"
        : "Not quite, but good try!"
      : getTranslation("games.hijaiyah.quizInstructions", {}, language);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <ChildNavbar />

      <main className="flex-1 max-w-6xl w-full mx-auto space-y-3 sm:space-y-4 py-3 sm:py-4 px-3 sm:px-6">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between gap-3">
          <Link href="/learn/hijaiyah">
            <ChildButton variant="secondary" size="sm" className="gap-2 text-xs font-black">
              <ArrowLeft className="w-4 h-4" />
              <span>{getTranslation("app.back", {}, language)}</span>
            </ChildButton>
          </Link>

          {/* Difficulty Badge */}
          <div className="inline-flex items-center gap-1.5 bg-teal-100 text-teal-950 px-3.5 py-1 rounded-full text-xs sm:text-sm font-black shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>
              {difficulty === "easy"
                ? "🌱 " + getTranslation("games.hijaiyah.easy", {}, language)
                : difficulty === "medium"
                ? "⭐ " + getTranslation("games.hijaiyah.medium", {}, language)
                : "👑 " + getTranslation("games.hijaiyah.hard", {}, language)}
            </span>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full border-2 border-amber-300 shadow-sm">
            <span className="text-xs font-black text-amber-950">
              {currentIndex + 1} / {questions.length}
            </span>
            <div className="w-14 sm:w-20 h-2 bg-amber-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Teacher Guidance Bubble */}
        <Teacher
          expression={teacherExpression}
          message={teacherMessage}
          size={50}
          className="w-full"
        />

        {/* Interactive Question Card */}
        <motion.div
          key={currentQ.id}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-2xl mx-auto"
        >
          <HijaiyahQuestionCard
            question={currentQ}
            selectedOptionId={selectedOptionId}
            lastAnswerResult={lastAnswerResult}
            onSelectOption={handleSelectOption}
          />
        </motion.div>
      </main>
    </div>
  );
}
