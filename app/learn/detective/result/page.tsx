"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDetectiveGameStore } from "@/stores/detective-game-store";
import { useProfileStore } from "@/stores/profile-store";
import { useSettingsStore } from "@/stores/settings-store";
import { GameResultView } from "@/components/game/GameResultView";
import { soundFx } from "@/lib/audio/sound-fx";
import { getTranslation } from "@/lib/i18n";
import { RotateCcw, Search } from "lucide-react";

export default function DetectiveResultPage() {
  const router = useRouter();
  const { currentMission, startMission, selectedSceneId, selectedDifficulty } =
    useDetectiveGameStore();
  const { activeProfile } = useProfileStore();
  const { language, soundEnabled, volume } = useSettingsStore();

  const childName = activeProfile?.name || (language === "id" ? "Detektif Cilik" : "Little Detective");

  useEffect(() => {
    if (!currentMission || !currentMission.isCompleted) {
      router.replace("/learn/detective");
    }
  }, [currentMission, router]);

  if (!currentMission) return null;

  const earnedStars = currentMission.earnedStars || 3;
  const totalFound = currentMission.foundItemIds.length;
  const mistakes = currentMission.mistakesCount;
  const sceneName = currentMission.scene.themeName[language] || currentMission.scene.themeName.id;

  let message =
    language === "id"
      ? `Luar biasa, ${childName}! Semua benda tersembunyi di ${sceneName} berhasil kamu temukan dengan sangat jeli!`
      : `Outstanding, ${childName}! You found all hidden objects in ${sceneName} with sharp detective eyes!`;

  if (earnedStars < 4 && earnedStars >= 3) {
    message =
      language === "id"
        ? `Bagus sekali, ${childName}! Kamu berhasil memecahkan kasus detektif ini dengan pintar!`
        : `Great job, ${childName}! You solved this detective case smartly!`;
  } else if (earnedStars < 3) {
    message =
      language === "id"
        ? `Hebat, ${childName}! Terus asah kemampuan observasi dan ketelitianmu ya!`
        : `Good effort, ${childName}! Keep sharpening your observation and search skills!`;
  }

  const handlePlayAgain = () => {
    if (soundEnabled) soundFx.playClick(volume);
    startMission(selectedSceneId, selectedDifficulty);
    router.push("/learn/detective/play");
  };

  const timeSpent = currentMission.endTime
    ? Math.max(1, Math.round((currentMission.endTime - currentMission.startTime) / 1000))
    : 0;

  return (
    <GameResultView
      title={getTranslation("result.congratsTitle", {}, language)}
      badgeText={language === "id" ? "🕵️‍♂️ Misi Detektif Selesai!" : "🕵️‍♂️ Detective Case Solved!"}
      teacherMessage={message}
      teacherExpression="celebrating"
      stars={earnedStars}
      maxStars={5}
      stats={[
        {
          label: language === "id" ? "Benda Ditemukan" : "Objects Found",
          value: `${totalFound} / ${totalFound}`,
        },
        {
          label: language === "id" ? "Koreksi Detektif" : "Misses",
          value: `${mistakes}`,
        },
        {
          label: language === "id" ? "Waktu" : "Time",
          value: `${timeSpent}s`,
        },
      ]}
      onPlayAgain={handlePlayAgain}
      playAgainLabel={getTranslation("result.playAgain", {}, language)}
      playAgainIcon={<RotateCcw className="w-5 h-5" />}
      chooseLevelHref="/learn/detective"
      chooseLevelLabel={language === "id" ? "Pilih Kasus Lain" : "Choose Other Case"}
      chooseLevelIcon={<Search className="w-5 h-5" />}
      homeHref="/learn"
      homeLabel={getTranslation("result.backToLearn", {}, language)}
    />
  );
}
