"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/stores/game-store";
import { useProfileStore } from "@/stores/profile-store";
import { useSettingsStore } from "@/stores/settings-store";
import { ChildNavbar } from "@/components/navigation/ChildNavbar";
import { Teacher } from "@/components/teacher/Teacher";
import { ChildButton } from "@/components/ui/ChildButton";
import { ChildCard } from "@/components/ui/ChildCard";
import { StarRating } from "@/components/ui/StarRating";
import { soundFx } from "@/lib/audio/sound-fx";
import { getTranslation } from "@/lib/i18n";
import confetti from "canvas-confetti";
import { RotateCcw, Home, Layers, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export default function MatchingResultPage() {
  const router = useRouter();
  const { lastGameResult, difficulty, startSession, resetGame } = useGameStore();
  const { activeProfile } = useProfileStore();
  const { language, soundEnabled, volume } = useSettingsStore();

  const childName = activeProfile?.name || "Teman";
  const correctCount = lastGameResult ? lastGameResult.correctAnswers : 5;
  const starsEarned = lastGameResult ? lastGameResult.starsEarned : 5;

  useEffect(() => {
    // Fire cheerful confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.55 },
        colors: ["#F59E0B", "#10B981", "#3B82F6", "#EC4899", "#8B5CF6"],
      });
    } catch {
      // Confetti fallback
    }

    // Play victory fanfare
    if (soundEnabled) {
      soundFx.playVictory(volume);
    }
  }, [soundEnabled, volume]);

  const handlePlayAgain = () => {
    startSession(difficulty);
    router.push("/learn/matching/play");
  };

  const handleBackToHome = () => {
    resetGame();
    router.push("/learn");
  };

  let celebrationMessage = getTranslation("result.messageGreat", { name: childName }, language);
  if (starsEarned === 5) {
    celebrationMessage = getTranslation("result.messagePerfect", { name: childName }, language);
  } else if (starsEarned < 3) {
    celebrationMessage = getTranslation("result.messageGood", { name: childName }, language);
  }

  return (
    <div className="min-h-screen flex flex-col justify-between pb-4">
      <ChildNavbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-4 sm:py-6 flex flex-col justify-center space-y-4 sm:space-y-6">
        {/* Title Header */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-black text-amber-950 tracking-tight flex items-center justify-center gap-2">
            <span>🎉</span>
            <span>{getTranslation("result.title", {}, language)}</span>
            <span>🎉</span>
          </h1>
        </div>

        {/* Teacher Guidance */}
        <Teacher
          expression="celebrating"
          message={celebrationMessage}
          subMessage={`Kamu berhasil menjawab ${correctCount} dari 5 soal dengan benar!`}
          size={84}
          className="w-full"
        />

        {/* Celebratory Result Card */}
        <ChildCard
          borderColor="border-amber-400"
          bgGradient="bg-gradient-to-b from-white via-amber-50/60 to-orange-50/90"
          className="text-center space-y-4 sm:space-y-6 shadow-2xl p-5 sm:p-8"
        >
          {/* Star Rating Display */}
          <div className="space-y-2">
            <p className="text-sm sm:text-base font-black text-amber-800 uppercase tracking-wider">
              {getTranslation("result.earnedStars", { stars: starsEarned }, language)}
            </p>
            <div className="py-1">
              <StarRating stars={starsEarned} maxStars={5} size={44} animate={true} />
            </div>
            <div className="inline-block bg-amber-200 text-amber-950 font-black text-base sm:text-lg px-5 py-1.5 rounded-2xl shadow-inner">
              {getTranslation("result.scoreText", { correct: correctCount, total: 5 }, language)}
            </div>
          </div>

          {/* Action Navigation Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {/* Play Again Button */}
            <ChildButton
              type="button"
              variant="primary"
              size="md"
              icon={<RotateCcw className="w-5 h-5" />}
              onClick={handlePlayAgain}
              className="w-full"
            >
              {getTranslation("result.playAgain", {}, language)}
            </ChildButton>

            {/* Choose Other Level */}
            <Link href="/learn/matching" className="w-full">
              <ChildButton
                type="button"
                variant="secondary"
                size="md"
                icon={<Layers className="w-5 h-5" />}
                className="w-full"
              >
                {getTranslation("result.chooseLevel", {}, language)}
              </ChildButton>
            </Link>

            {/* Back to Home / Main Menu */}
            <ChildButton
              type="button"
              variant="success"
              size="md"
              icon={<Home className="w-5 h-5" />}
              onClick={handleBackToHome}
              className="w-full"
            >
              Halaman Utama
            </ChildButton>
          </div>
        </ChildCard>
      </main>
    </div>
  );
}
