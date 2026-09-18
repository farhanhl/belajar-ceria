"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdabGameStore } from "@/stores/adab-game-store";
import { useProfileStore } from "@/stores/profile-store";
import { useSettingsStore } from "@/stores/settings-store";
import { GameResultView } from "@/components/game/GameResultView";
import { ADAB_CATEGORIES } from "@/games/adab/data/adab-data";
import { soundFx } from "@/lib/audio/sound-fx";
import { getTranslation } from "@/lib/i18n";
import { RotateCcw, BookOpen } from "lucide-react";

export default function AdabResultPage() {
  const router = useRouter();
  const { lastResult, startSession, activeCategory, difficulty } = useAdabGameStore();
  const { activeProfile } = useProfileStore();
  const { language, soundEnabled, volume } = useSettingsStore();

  const childName = activeProfile?.name || (language === "id" ? "Anak Shalih" : "Good Child");

  useEffect(() => {
    if (!lastResult) {
      router.replace("/learn/adab");
    }
  }, [lastResult, router]);

  if (!lastResult) return null;

  const correct = lastResult.correctAnswers;
  const total = lastResult.totalQuestions || 3;
  const stars = lastResult.starsEarned;

  const categoryObj = ADAB_CATEGORIES.find((c) => c.id === lastResult.category);
  const themeName = categoryObj ? categoryObj.title[language] || categoryObj.title.id : "";

  let message =
    language === "id"
      ? `Luar biasa, ${childName}! Kamu memahami seluruh adab dan kebiasaan baik pada tema ${themeName} dengan sempurna!`
      : `Outstanding, ${childName}! You mastered all good manners and habits for ${themeName} perfectly!`;

  if (stars < 5 && stars >= 3) {
    message =
      language === "id"
        ? `Bagus sekali, ${childName}! Kamu sudah belajar berperilaku terpuji dengan sangat pintar!`
        : `Awesome job, ${childName}! You are practicing good manners wonderfully!`;
  } else if (stars < 3) {
    message =
      language === "id"
        ? `Hebat, ${childName}! Terus berlatih dan amalkan kebiasaan baik ini setiap hari ya!`
        : `Good effort, ${childName}! Keep practicing and doing good deeds every day!`;
  }

  const handlePlayAgain = () => {
    if (soundEnabled) soundFx.playClick(volume);
    startSession(activeCategory, difficulty);
    router.push("/learn/adab/play");
  };

  const scoreBadge =
    language === "id"
      ? `${correct} dari ${total} Adab Dipahami`
      : `${correct} of ${total} Habits Mastered`;

  return (
    <GameResultView
      title={getTranslation("result.congratsTitle", {}, language)}
      badgeText={getTranslation("games.adab.completedBadge", {}, language)}
      teacherMessage={message}
      teacherExpression="celebrating"
      stars={stars}
      maxStars={5}
      scoreBadgeText={scoreBadge}
      stats={[
        {
          label: language === "id" ? "Pilihan Tepat" : "Correct Choices",
          value: `${correct} / ${total}`,
        },
        {
          label: language === "id" ? "Tema Adab" : "Topic",
          value: themeName,
        },
        {
          label: language === "id" ? "Bintang Diraih" : "Stars Earned",
          value: `+${stars} ★`,
        },
      ]}
      onPlayAgain={handlePlayAgain}
      playAgainLabel={getTranslation("games.adab.replay", {}, language)}
      playAgainIcon={<RotateCcw className="w-5 h-5" />}
      chooseLevelHref="/learn/adab"
      chooseLevelLabel={getTranslation("games.adab.chooseOtherTheme", {}, language)}
      chooseLevelIcon={<BookOpen className="w-5 h-5" />}
      homeHref="/learn"
      homeLabel={getTranslation("result.backToLearn", {}, language)}
    />
  );
}
