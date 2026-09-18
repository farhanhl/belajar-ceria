"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAdabGameStore } from "@/stores/adab-game-store";
import { useSettingsStore } from "@/stores/settings-store";
import { useProfileStore } from "@/stores/profile-store";
import { ChildNavbar } from "@/components/navigation/ChildNavbar";
import { ChildPageHeader } from "@/components/navigation/ChildPageHeader";
import { Teacher } from "@/components/teacher/Teacher";
import { AdabScenarioCard } from "@/games/adab/components/AdabScenarioCard";
import { AdabChoice } from "@/games/adab/types";
import { soundFx } from "@/lib/audio/sound-fx";
import { getTranslation } from "@/lib/i18n";
import { ChevronRight, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export default function AdabPlayPage() {
  const router = useRouter();
  const {
    scenarios,
    currentScenarioIndex,
    selectedChoiceId,
    isAnswered,
    isCorrect,
    correctCount,
    activeCategory,
    difficulty,
    startSession,
    selectChoice,
    nextScenario,
  } = useAdabGameStore();

  const { language, soundEnabled, volume } = useSettingsStore();
  const { activeProfile, recordAdabResult } = useProfileStore();

  const [teacherMessage, setTeacherMessage] = useState<string>("");
  const hasRecordedRef = useRef(false);

  // Initialize session if opened directly
  useEffect(() => {
    if (!scenarios || scenarios.length === 0) {
      hasRecordedRef.current = false;
      startSession("eating", "easy");
    }
  }, [scenarios, startSession]);

  const currentScenario = scenarios[currentScenarioIndex];

  // Update teacher message based on state
  useEffect(() => {
    if (!currentScenario) return;

    const title = currentScenario.title[language] || currentScenario.title.id;

    if (isAnswered) {
      if (isCorrect) {
        setTeacherMessage(
          language === "id"
            ? "Masya Allah, pilihan yang sangat tepat dan mulia! 🌟"
            : "Masha Allah, wonderful and noble choice! 🌟"
        );
      } else {
        setTeacherMessage(
          language === "id"
            ? "Yuk pelajari kebiasaan yang lebih baik bersama Bu Guru!"
            : "Let's learn a kinder and better habit together!"
        );
      }
    } else {
      setTeacherMessage(
        language === "id"
          ? `Ayo bantu temukan perilaku yang baik pada situasi ${title}!`
          : `Let's find the good habit for ${title}!`
      );
    }
  }, [currentScenario, isAnswered, isCorrect, language]);

  // Auto-advance on answering correctly
  useEffect(() => {
    if (!isAnswered || !isCorrect) return;

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // safe fallback
    }

    const timer = setTimeout(() => {
      handleNext();
    }, 1600);

    return () => clearTimeout(timer);
  }, [isAnswered, isCorrect]);

  if (!currentScenario) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-400 border-t-emerald-600 rounded-full animate-spin" />
      </div>
    );
  }

  const handleSelectChoice = (choice: AdabChoice) => {
    if (isAnswered) return;

    const result = selectChoice(choice.id);
    if (!result) return;

    if (result.isCorrect) {
      if (soundEnabled) soundFx.playCorrect(volume);
    } else {
      if (soundEnabled) soundFx.playIncorrect(volume);
    }
  };

  const handleNext = () => {
    if (soundEnabled) soundFx.playClick(volume);
    const isFinished = nextScenario();

    if (isFinished) {
      // Record profile progress
      if (!hasRecordedRef.current && activeProfile) {
        hasRecordedRef.current = true;
        const total = scenarios.length;
        const finalStars = Math.max(1, Math.round((correctCount / Math.max(1, total)) * 5));

        recordAdabResult({
          profileId: activeProfile.id,
          difficulty: difficulty || "easy",
          totalQuestions: total,
          correctAnswers: correctCount,
          incorrectAnswers: total - correctCount,
          starsEarned: finalStars,
          completedAt: new Date().toISOString(),
        });
      }

      router.push("/learn/adab/result");
    }
  };

  const currentTitle = currentScenario.title[language] || currentScenario.title.id;

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <ChildNavbar />

      <main className="flex-1 max-w-4xl w-full mx-auto space-y-6 py-6 px-4">
        {/* Page Header */}
        <ChildPageHeader
          title={currentTitle}
          backHref="/learn/adab"
        />

        {/* Teacher Guidance Bar */}
        <Teacher
          expression={isAnswered && isCorrect ? "celebrating" : "happy"}
          message={teacherMessage}
          className="w-full"
        />

        {/* Scenario Card and Choices */}
        <AdabScenarioCard
          scenario={currentScenario}
          selectedChoiceId={selectedChoiceId}
          isAnswered={isAnswered}
          onSelectChoice={handleSelectChoice}
        />

        {/* Bottom Navigator (No previous button, clean Next button) */}
        <div className="flex items-center justify-between w-full max-w-2xl mx-auto pt-4">
          <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-2xl border-2 border-emerald-100 shadow-sm">
            <span className="text-xs sm:text-sm font-black text-emerald-950">
              {getTranslation(
                "games.adab.scenarioProgress",
                { current: currentScenarioIndex + 1, total: scenarios.length },
                language
              )}
            </span>
          </div>

          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm shadow-md shadow-emerald-600/25 transition-all hover:scale-105 active:scale-95 cursor-pointer border border-emerald-500"
          >
            <span>
              {currentScenarioIndex === scenarios.length - 1
                ? getTranslation("result.gameFinishedBadge", {}, language)
                : getTranslation("common.next", {}, language)}
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </main>
    </div>
  );
}
