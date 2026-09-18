"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMemoryGameStore } from "@/stores/memory-game-store";
import { useProfileStore } from "@/stores/profile-store";
import { useSettingsStore } from "@/stores/settings-store";
import { GameResultView } from "@/components/game/GameResultView";
import { getTranslation } from "@/lib/i18n";
import { Brain } from "lucide-react";

export default function MemoryResultPage() {
  const router = useRouter();
  const { lastResult } = useMemoryGameStore();
  const { activeProfile } = useProfileStore();
  const { language } = useSettingsStore();

  const childName = activeProfile?.name || (language === "id" ? "Teman" : "Friend");

  useEffect(() => {
    if (!lastResult) {
      router.push("/learn/memory");
    }
  }, [lastResult, router]);

  if (!lastResult) return null;

  const stars = lastResult.starsEarned;
  const isFullComplete = lastResult.matchedPairs >= lastResult.totalPairs;

  let message = getTranslation("games.memory.congratsAllPairs", { name: childName, theme: lastResult.themeTitle }, language);
  if (!isFullComplete) {
    message = getTranslation("games.memory.congratsPartial", { name: childName, matched: lastResult.matchedPairs, total: lastResult.totalPairs }, language);
  } else if (stars >= 4) {
    message = getTranslation("games.memory.congratsHigh", { name: childName }, language);
  } else if (stars < 3) {
    message = getTranslation("games.memory.congratsPractice", { name: childName }, language);
  }

  return (
    <GameResultView
      title={isFullComplete ? getTranslation("result.congratsTitle", {}, language) : getTranslation("games.letters.praise3", { name: childName }, language)}
      badgeText={isFullComplete ? getTranslation("games.memory.allPairsFoundBadge", {}, language) : getTranslation("result.gameFinishedBadge", {}, language)}
      teacherMessage={message}
      teacherExpression={isFullComplete ? "celebrating" : "happy"}
      stars={stars}
      stats={[
        { label: getTranslation("games.memory.pairs", {}, language), value: `${lastResult.matchedPairs} / ${lastResult.totalPairs}` },
        { label: getTranslation("games.memory.movesLabel", {}, language), value: lastResult.movesCount },
        { label: getTranslation("games.memory.timeLabel", {}, language), value: `${lastResult.timeSpentSeconds}s` },
      ]}
      chooseLevelHref="/learn/memory"
      chooseLevelLabel={getTranslation("games.memory.chooseOtherTheme", {}, language)}
      chooseLevelIcon={<Brain className="w-5 h-5" />}
      homeHref="/learn"
      homeLabel={getTranslation("app.backToLearn", {}, language)}
    />
  );
}
