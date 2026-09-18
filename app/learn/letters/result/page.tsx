"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLetterGameStore } from "@/stores/letter-game-store";
import { useProfileStore } from "@/stores/profile-store";
import { useSettingsStore } from "@/stores/settings-store";
import { GameResultView } from "@/components/game/GameResultView";
import { getTranslation } from "@/lib/i18n";
import { soundFx } from "@/lib/audio/sound-fx";
import { Grid, RotateCcw } from "lucide-react";

export default function LetterResultPage() {
  const router = useRouter();
  const { lastResult, startQuizSession, difficulty } = useLetterGameStore();
  const { activeProfile } = useProfileStore();
  const { language, soundEnabled, volume } = useSettingsStore();

  const childName = activeProfile?.name || (language === "id" ? "Teman" : "Friend");

  useEffect(() => {
    if (!lastResult) {
      router.push("/learn/letters");
    }
  }, [lastResult, router]);

  if (!lastResult) return null;

  const correct = lastResult.correctAnswers;
  const total = lastResult.totalQuestions || 5;
  const stars = lastResult.starsEarned;

  let message =
    language === "id"
      ? `Luar biasa, ${childName}! Kamu menjawab semua soal tebak huruf dengan sempurna!`
      : `Outstanding, ${childName}! You answered all letter quiz questions perfectly!`;
  if (stars < 5 && stars >= 3) {
    message =
      language === "id"
        ? `Bagus sekali, ${childName}! Kamu sudah belajar huruf dengan sangat pintar!`
        : `Awesome job, ${childName}! You are learning the alphabet wonderfully!`;
  } else if (stars < 3) {
    message =
      language === "id"
        ? `Hebat, ${childName}! Terus berlatih agar semakin hafal huruf-hurufnya ya!`
        : `Good effort, ${childName}! Keep practicing the letters and words!`;
  }

  const handlePlayAgain = () => {
    if (soundEnabled) soundFx.playClick(volume);
    startQuizSession(difficulty, language);
    router.push("/learn/letters/play");
  };

  const scoreBadge =
    language === "id"
      ? `${correct} dari ${total} Benar`
      : `${correct} of ${total} Correct`;

  return (
    <GameResultView
      title={getTranslation("result.congratsTitle", {}, language)}
      badgeText={getTranslation("result.gameFinishedBadge", {}, language)}
      teacherMessage={message}
      teacherExpression="celebrating"
      stars={stars}
      scoreBadgeText={scoreBadge}
      onPlayAgain={handlePlayAgain}
      playAgainLabel={getTranslation("result.playAgain", {}, language)}
      playAgainIcon={<RotateCcw className="w-5 h-5" />}
      chooseLevelHref="/learn/letters"
      chooseLevelLabel={getTranslation("result.chooseLevel", {}, language)}
      chooseLevelIcon={<Grid className="w-5 h-5" />}
      homeHref="/learn"
      homeLabel={getTranslation("result.backToLearn", {}, language)}
    />
  );
}
