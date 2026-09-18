"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLetterGameStore } from "@/stores/letter-game-store";
import { useProfileStore } from "@/stores/profile-store";
import { useSettingsStore } from "@/stores/settings-store";
import { GameResultView } from "@/components/game/GameResultView";
import { soundFx } from "@/lib/audio/sound-fx";
import { Grid, RotateCcw } from "lucide-react";

export default function LetterResultPage() {
  const router = useRouter();
  const { lastResult, startQuizSession, difficulty } = useLetterGameStore();
  const { activeProfile } = useProfileStore();
  const { language, soundEnabled, volume } = useSettingsStore();

  const childName = activeProfile?.name || "Teman";

  useEffect(() => {
    if (!lastResult) {
      router.push("/learn/letters");
    }
  }, [lastResult, router]);

  if (!lastResult) return null;

  const correct = lastResult.correctAnswers;
  const total = lastResult.totalQuestions || 5;
  const stars = lastResult.starsEarned;

  let message = `Luar biasa, ${childName}! Kamu menjawab semua soal tebak huruf dengan sempurna!`;
  if (stars < 5 && stars >= 3) {
    message = `Bagus sekali, ${childName}! Kamu sudah belajar huruf dengan sangat pintar!`;
  } else if (stars < 3) {
    message = `Hebat, ${childName}! Terus berlatih agar semakin hafal huruf-hurufnya ya!`;
  }

  const handlePlayAgain = () => {
    if (soundEnabled) soundFx.playClick(volume);
    startQuizSession(difficulty, language);
    router.push("/learn/letters/play");
  };

  return (
    <GameResultView
      title="Yeay! Kamu Hebat!"
      badgeText="🎉 Sesi Belajar Selesai!"
      teacherMessage={message}
      teacherExpression="celebrating"
      stars={stars}
      scoreBadgeText={`${correct} dari ${total} Benar`}
      onPlayAgain={handlePlayAgain}
      playAgainLabel="Main Lagi"
      playAgainIcon={<RotateCcw className="w-5 h-5" />}
      chooseLevelHref="/learn/letters"
      chooseLevelLabel="Pilih Level Lain"
      chooseLevelIcon={<Grid className="w-5 h-5" />}
      homeHref="/learn"
      homeLabel="Kembali ke Halaman Utama"
    />
  );
}
