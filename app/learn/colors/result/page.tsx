"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useColorsGameStore } from "@/stores/colors-game-store";
import { useProfileStore } from "@/stores/profile-store";
import { useSettingsStore } from "@/stores/settings-store";
import { GameResultView } from "@/components/game/GameResultView";
import { getTranslation } from "@/lib/i18n";
import { soundFx } from "@/lib/audio/sound-fx";
import { RotateCcw, Compass } from "lucide-react";

export default function ColorsResultPage() {
  const router = useRouter();
  const { lastResult, startGame, difficulty } = useColorsGameStore();
  const { activeProfile } = useProfileStore();
  const { soundEnabled, volume, language } = useSettingsStore();

  const childName = activeProfile?.name || (language === "id" ? "Teman" : "Friend");

  useEffect(() => {
    if (!lastResult) {
      router.push("/learn/colors");
    }
  }, [lastResult, router]);

  if (!lastResult) return null;

  const stars = lastResult.starsEarned;
  const isPerfect = lastResult.correctAnswers === lastResult.totalQuestions;

  let message =
    language === "id"
      ? `Hebat sekali, ${childName}! Kamu berhasil menjawab pertanyaan warna dan bentuk dengan sangat baik!`
      : `Great job, ${childName}! You answered the colors and shapes questions very well!`;
  if (isPerfect) {
    message =
      language === "id"
        ? `Luar biasa, ${childName}! Semua warna dan bentuk berhasil kamu tebak dengan sempurna!`
        : `Outstanding, ${childName}! You identified all colors and shapes perfectly!`;
  } else if (stars < 3) {
    message =
      language === "id"
        ? `Bagus sekali, ${childName}! Teruslah bermain agar semakin mengenal semua warna dan bentuk ya!`
        : `Well done, ${childName}! Keep exploring to learn even more colors and shapes!`;
  }

  const handlePlayAgain = () => {
    if (soundEnabled) soundFx.playClick(volume);
    startGame(difficulty);
    router.push("/learn/colors/play");
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
      chooseLevelHref="/learn/colors"
      chooseLevelLabel={language === "id" ? "Pilih Mode Lain" : "Choose Other Mode"}
      chooseLevelIcon={<Compass className="w-5 h-5" />}
      homeHref="/learn"
      homeLabel={getTranslation("result.backToLearn", {}, language)}
    />
  );
}
