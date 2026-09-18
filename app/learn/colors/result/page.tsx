"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useColorsGameStore } from "@/stores/colors-game-store";
import { useProfileStore } from "@/stores/profile-store";
import { useSettingsStore } from "@/stores/settings-store";
import { GameResultView } from "@/components/game/GameResultView";
import { soundFx } from "@/lib/audio/sound-fx";
import { RotateCcw, Compass } from "lucide-react";

export default function ColorsResultPage() {
  const router = useRouter();
  const { lastResult, startGame, difficulty } = useColorsGameStore();
  const { activeProfile } = useProfileStore();
  const { soundEnabled, volume } = useSettingsStore();

  const childName = activeProfile?.name || "Teman";

  useEffect(() => {
    if (!lastResult) {
      router.push("/learn/colors");
    }
  }, [lastResult, router]);

  if (!lastResult) return null;

  const stars = lastResult.starsEarned;
  const isPerfect = lastResult.correctAnswers === lastResult.totalQuestions;

  let message = `Hebat sekali, ${childName}! Kamu berhasil menjawab pertanyaan warna dan bentuk dengan sangat baik!`;
  if (isPerfect) {
    message = `Luar biasa, ${childName}! Semua warna dan bentuk berhasil kamu tebak dengan sempurna!`;
  } else if (stars < 3) {
    message = `Bagus sekali, ${childName}! Teruslah bermain agar semakin mengenal semua warna dan bentuk ya!`;
  }

  const handlePlayAgain = () => {
    if (soundEnabled) soundFx.playClick(volume);
    startGame(difficulty);
    router.push("/learn/colors/play");
  };

  return (
    <GameResultView
      title="Yeay! Kamu Hebat!"
      badgeText="🎉 Permainan Selesai!"
      teacherMessage={message}
      teacherExpression="celebrating"
      stars={stars}
      stats={[
        { label: "Benar", value: `${lastResult.correctAnswers} / ${lastResult.totalQuestions}` },
        { label: "Kurang Tepat", value: lastResult.incorrectAnswers },
        { label: "Waktu", value: `${lastResult.timeSpentSeconds}s` },
      ]}
      onPlayAgain={handlePlayAgain}
      playAgainLabel="Main Lagi"
      playAgainIcon={<RotateCcw className="w-5 h-5" />}
      chooseLevelHref="/learn/colors"
      chooseLevelLabel="Pilih Mode Lain"
      chooseLevelIcon={<Compass className="w-5 h-5" />}
      homeHref="/learn"
      homeLabel="Kembali ke Menu Belajar"
    />
  );
}
