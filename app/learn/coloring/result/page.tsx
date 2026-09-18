"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { GameResultView } from "@/components/game/GameResultView";
import { ColoringCanvas } from "@/games/coloring/components/ColoringCanvas";
import { getColoringPictureById } from "@/games/coloring/data/coloring-data";
import { useColoringGameStore } from "@/stores/coloring-game-store";
import { useProfileStore } from "@/stores/profile-store";
import { useSettingsStore } from "@/stores/settings-store";
import { soundFx } from "@/lib/audio/sound-fx";
import { getTranslation } from "@/lib/i18n";
import { Palette, RotateCcw } from "lucide-react";

export default function ColoringResultPage() {
  const router = useRouter();
  const { lastResult, filledColors, activePictureId, startPicture } = useColoringGameStore();
  const { activeProfile } = useProfileStore();
  const { language, soundEnabled, volume } = useSettingsStore();

  useEffect(() => {
    if (!lastResult) {
      router.replace("/learn/coloring");
    }
  }, [lastResult, router]);

  if (!lastResult) return null;

  const childName = activeProfile?.name || (language === "id" ? "Anak Hebat" : "Little Star");
  const picture = getColoringPictureById(activePictureId);

  // Encouraging feedback messages
  const teacherMessage =
    language === "id"
      ? `Luar biasa, ${childName}! Lukisan ${picture?.title.id || "kamu"} berwarna sangat indah dan rapi!`
      : `Incredible job, ${childName}! Your ${picture?.title.en || "artwork"} looks wonderfully colorful and creative!`;

  const handlePlayAgain = () => {
    if (soundEnabled) soundFx.playClick(volume);
    startPicture(activePictureId);
    router.push("/learn/coloring/play");
  };

  return (
    <GameResultView
      title={getTranslation("result.congratsTitle", {}, language)}
      badgeText={getTranslation("games.coloring.completedBadge", {}, language)}
      teacherMessage={teacherMessage}
      teacherExpression="celebrating"
      stars={lastResult.starsEarned}
      maxStars={5}
      customContent={
        <div className="w-full max-w-[280px] sm:max-w-[320px] mx-auto p-2 bg-gradient-to-b from-amber-100 to-pink-100 rounded-3xl border-3 border-amber-300 shadow-inner">
          <ColoringCanvas
            pictureId={lastResult.pictureId}
            overrideColors={filledColors}
            readOnly
            className="border-none shadow-none rounded-2xl"
          />
          <div className="text-center pt-2 pb-1">
            <span className="text-xs sm:text-sm font-black text-amber-950">
              🎨 {picture?.title[language] || picture?.title.id}
            </span>
          </div>
        </div>
      }
      stats={[
        {
          label: language === "id" ? "Bagian Diwarnai" : "Colored Parts",
          value: `${lastResult.coloredRegionsCount} / ${lastResult.totalRegions}`,
        },
        {
          label: language === "id" ? "Waktu Mewarnai" : "Time Spent",
          value: `${lastResult.timeSpentSeconds}s`,
        },
      ]}
      onPlayAgain={handlePlayAgain}
      playAgainLabel={language === "id" ? "Warnai Lagi" : "Color Again"}
      playAgainIcon={<RotateCcw className="w-5 h-5" />}
      chooseLevelHref="/learn/coloring"
      chooseLevelLabel={getTranslation("games.coloring.chooseOtherPicture", {}, language)}
      chooseLevelIcon={<Palette className="w-5 h-5" />}
      homeHref="/learn"
      homeLabel={getTranslation("result.backToLearn", {}, language)}
      celebrationSoundType="celebration"
    />
  );
}
