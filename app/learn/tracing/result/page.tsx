"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTracingGameStore } from "@/stores/tracing-game-store";
import { useProfileStore } from "@/stores/profile-store";
import { useSettingsStore } from "@/stores/settings-store";
import { GameResultView } from "@/components/game/GameResultView";
import { soundFx } from "@/lib/audio/sound-fx";
import { getTranslation } from "@/lib/i18n";
import { RotateCcw, PenTool } from "lucide-react";

export default function TracingResultPage() {
  const router = useRouter();
  const {
    items,
    activeItemIndex,
    totalStarsEarned,
    itemStars,
    itemAccuracy,
    resetCurrentItem,
  } = useTracingGameStore();
  const { activeProfile } = useProfileStore();
  const { language, soundEnabled, volume } = useSettingsStore();

  const childName = activeProfile?.name || (language === "id" ? "Teman" : "Friend");

  useEffect(() => {
    if (!items || items.length === 0) {
      router.replace("/learn/tracing");
    }
  }, [items, router]);

  const currentItem = items[activeItemIndex];
  const currentTitle = currentItem
    ? currentItem.title[language] || currentItem.title.id
    : "";
  const stars = itemStars || (totalStarsEarned > 0 ? totalStarsEarned : 3);
  const accuracy = itemAccuracy > 0 ? itemAccuracy : 100;

  let message =
    language === "id"
      ? `Luar biasa, ${childName}! Goresan jiplakan ${currentTitle} milikmu sangat rapi dan sempurna!`
      : `Outstanding, ${childName}! Your tracing strokes for ${currentTitle} are super neat and precise!`;

  if (stars < 3) {
    message =
      language === "id"
        ? `Hebat, ${childName}! Terus berlatih menjiplak agar jemarimu semakin terampil ya!`
        : `Good effort, ${childName}! Keep practicing tracing to train your fine motor skills!`;
  }

  const handlePlayAgain = () => {
    if (soundEnabled) soundFx.playClick(volume);
    resetCurrentItem();
    router.push("/learn/tracing/play");
  };

  return (
    <GameResultView
      title={getTranslation("result.congratsTitle", {}, language)}
      badgeText={language === "id" ? "✏️ Menjiplak Selesai!" : "✏️ Tracing Completed!"}
      teacherMessage={message}
      teacherExpression="celebrating"
      stars={stars}
      maxStars={3}
      scoreBadgeText={`${accuracy}% ${language === "id" ? "Akurasi" : "Accuracy"}`}
      stats={[
        {
          label: language === "id" ? "Materi" : "Item",
          value: currentTitle,
        },
        {
          label: language === "id" ? "Akurasi Goresan" : "Accuracy",
          value: `${accuracy}%`,
        },
        {
          label: language === "id" ? "Jumlah Goresan" : "Strokes",
          value: `${currentItem?.strokes.length || 1}`,
        },
      ]}
      onPlayAgain={handlePlayAgain}
      playAgainLabel={getTranslation("games.tracing.replay", {}, language)}
      playAgainIcon={<RotateCcw className="w-5 h-5" />}
      chooseLevelHref="/learn/tracing"
      chooseLevelLabel={getTranslation("games.tracing.chooseOther", {}, language)}
      chooseLevelIcon={<PenTool className="w-5 h-5" />}
      homeHref="/learn"
      homeLabel={getTranslation("result.backToLearn", {}, language)}
    />
  );
}
