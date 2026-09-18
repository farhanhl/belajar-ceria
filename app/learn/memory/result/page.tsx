"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMemoryGameStore } from "@/stores/memory-game-store";
import { useProfileStore } from "@/stores/profile-store";
import { GameResultView } from "@/components/game/GameResultView";
import { Brain } from "lucide-react";

export default function MemoryResultPage() {
  const router = useRouter();
  const { lastResult } = useMemoryGameStore();
  const { activeProfile } = useProfileStore();

  const childName = activeProfile?.name || "Teman";

  useEffect(() => {
    if (!lastResult) {
      router.push("/learn/memory");
    }
  }, [lastResult, router]);

  if (!lastResult) return null;

  const stars = lastResult.starsEarned;
  const isFullComplete = lastResult.matchedPairs >= lastResult.totalPairs;

  let message = `Luar biasa, ${childName}! Kamu berhasil menemukan semua pasangan kartu ${lastResult.themeTitle} dengan sangat cermat!`;
  if (!isFullComplete) {
    message = `Bagus sekali, ${childName}! Kamu sudah berhasil menemukan ${lastResult.matchedPairs} dari ${lastResult.totalPairs} pasangan kartu!`;
  } else if (stars >= 4) {
    message = `Hebat sekali, ${childName}! Daya ingatmu sangat tajam dan fokusmu luar biasa!`;
  } else if (stars < 3) {
    message = `Pintar sekali, ${childName}! Teruslah berlatih agar ingatanmu semakin hebat ya!`;
  }

  return (
    <GameResultView
      title={isFullComplete ? "Yeay! Kamu Hebat!" : `Bagus Sekali, ${childName}!`}
      badgeText={isFullComplete ? "🎉 Semua Pasangan Ditemukan!" : "⭐ Permainan Selesai!"}
      teacherMessage={message}
      teacherExpression={isFullComplete ? "celebrating" : "happy"}
      stars={stars}
      stats={[
        { label: "Pasangan", value: `${lastResult.matchedPairs} / ${lastResult.totalPairs}` },
        { label: "Langkah", value: lastResult.movesCount },
        { label: "Waktu", value: `${lastResult.timeSpentSeconds}s` },
      ]}
      chooseLevelHref="/learn/memory"
      chooseLevelLabel="Pilih Tema / Level Lain"
      chooseLevelIcon={<Brain className="w-5 h-5" />}
      homeHref="/learn"
      homeLabel="Kembali ke Menu Utama"
    />
  );
}
