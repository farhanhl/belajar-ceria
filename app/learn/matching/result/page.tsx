"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/stores/game-store";
import { useProfileStore } from "@/stores/profile-store";
import { useSettingsStore } from "@/stores/settings-store";
import { GameResultView } from "@/components/game/GameResultView";
import { getTranslation } from "@/lib/i18n";
import { Layers, RotateCcw } from "lucide-react";

export default function MatchingResultPage() {
  const router = useRouter();
  const { lastGameResult, difficulty, startSession } = useGameStore();
  const { activeProfile } = useProfileStore();
  const { language } = useSettingsStore();

  const childName = activeProfile?.name || "Teman";
  const correctCount = lastGameResult ? lastGameResult.correctAnswers : 5;
  const starsEarned = lastGameResult ? lastGameResult.starsEarned : 5;

  useEffect(() => {
    if (!lastGameResult) {
      router.push("/learn/matching");
    }
  }, [lastGameResult, router]);

  if (!lastGameResult) return null;

  const handlePlayAgain = () => {
    startSession(difficulty);
    router.push("/learn/matching/play");
  };

  let celebrationMessage = getTranslation("result.messageGreat", { name: childName }, language);
  if (starsEarned === 5) {
    celebrationMessage = getTranslation("result.messagePerfect", { name: childName }, language);
  } else if (starsEarned < 3) {
    celebrationMessage = getTranslation("result.messageGood", { name: childName }, language);
  }

  const teacherSubMessage =
    language === "id"
      ? `Kamu berhasil menjawab ${correctCount} dari 5 soal dengan benar!`
      : `You correctly answered ${correctCount} out of 5 questions!`;

  const scoreBadge =
    language === "id"
      ? `${correctCount} dari 5 Benar`
      : `${correctCount} of 5 Correct`;

  return (
    <GameResultView
      title={getTranslation("result.congratsTitle", {}, language)}
      badgeText={getTranslation("result.gameFinishedBadge", {}, language)}
      teacherMessage={celebrationMessage}
      teacherSubMessage={teacherSubMessage}
      teacherExpression="celebrating"
      stars={starsEarned}
      scoreBadgeText={scoreBadge}
      onPlayAgain={handlePlayAgain}
      playAgainLabel={getTranslation("result.playAgain", {}, language)}
      playAgainIcon={<RotateCcw className="w-5 h-5" />}
      chooseLevelHref="/learn/matching"
      chooseLevelLabel={getTranslation("result.chooseLevel", {}, language)}
      chooseLevelIcon={<Layers className="w-5 h-5" />}
      homeHref="/learn"
      homeLabel={getTranslation("result.backToLearn", {}, language)}
      celebrationSoundType="victory"
    />
  );
}
