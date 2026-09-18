"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useNumbersGameStore } from "@/stores/numbers-game-store";
import { useProfileStore } from "@/stores/profile-store";
import { useSettingsStore } from "@/stores/settings-store";
import { GameResultView } from "@/components/game/GameResultView";
import { getTranslation } from "@/lib/i18n";
import { soundFx } from "@/lib/audio/sound-fx";
import { RotateCcw, Compass } from "lucide-react";

export default function NumbersResultPage() {
  const router = useRouter();
  const { lastResult, startGame, mode, difficulty } = useNumbersGameStore();
  const { activeProfile } = useProfileStore();
  const { soundEnabled, volume, language } = useSettingsStore();

  const childName = activeProfile?.name || (language === "id" ? "Teman" : "Friend");

  useEffect(() => {
    if (!lastResult) {
      router.push("/learn/numbers");
    }
  }, [lastResult, router]);

  if (!lastResult) return null;

  const stars = lastResult.starsEarned;
  const isPerfect = lastResult.correctAnswers === lastResult.totalQuestions;

  let message =
    language === "id"
      ? `Hebat sekali, ${childName}! Kamu sangat pintar berhitung dan menyelesaikan soal matematika!`
      : `Great job, ${childName}! You are so good at counting and solving math problems!`;
  if (isPerfect) {
    message =
      language === "id"
        ? `Luar biasa, ${childName}! Semua soal berhasil kamu jawab dengan benar tanpa ada yang keliru!`
        : `Outstanding, ${childName}! You answered every question correctly with zero mistakes!`;
  } else if (stars < 3) {
    message =
      language === "id"
        ? `Bagus sekali, ${childName}! Teruslah berlatih berhitung agar semakin jago ya!`
        : `Well done, ${childName}! Keep practicing math and numbers to get even better!`;
  }

  const handlePlayAgain = () => {
    if (soundEnabled) soundFx.playClick(volume);
    startGame(mode, difficulty);
    router.push("/learn/numbers/play");
  };

  return (
    <GameResultView
      title={getTranslation("result.congratsTitle", {}, language)}
      badgeText={getTranslation("result.gameFinishedBadge", {}, language)}
      teacherMessage={message}
      teacherExpression="celebrating"
      stars={stars}
      stats={[
        {
          label: language === "id" ? "Benar" : "Correct",
          value: `${lastResult.correctAnswers} / ${lastResult.totalQuestions}`,
        },
        {
          label: language === "id" ? "Kurang Tepat" : "Mistakes",
          value: lastResult.incorrectAnswers,
        },
        {
          label: language === "id" ? "Waktu" : "Time",
          value: `${lastResult.timeSpentSeconds}s`,
        },
      ]}
      onPlayAgain={handlePlayAgain}
      playAgainLabel={getTranslation("result.playAgain", {}, language)}
      playAgainIcon={<RotateCcw className="w-5 h-5" />}
      chooseLevelHref="/learn/numbers"
      chooseLevelLabel={language === "id" ? "Pilih Mode Lain" : "Choose Other Mode"}
      chooseLevelIcon={<Compass className="w-5 h-5" />}
      homeHref="/learn"
      homeLabel={getTranslation("result.backToLearn", {}, language)}
    />
  );
}
