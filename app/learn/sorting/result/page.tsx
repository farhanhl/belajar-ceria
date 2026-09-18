"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { GameResultView } from "@/components/game/GameResultView";
import { getSortingThemeById } from "@/games/sorting/data/sorting-data";
import { useSortingGameStore } from "@/stores/sorting-game-store";
import { useProfileStore } from "@/stores/profile-store";
import { useSettingsStore } from "@/stores/settings-store";
import { getTranslation } from "@/lib/i18n";
import { Boxes } from "lucide-react";

export default function SortingResultPage() {
  const router = useRouter();
  const { lastResult, sortedItems } = useSortingGameStore();
  const { activeProfile } = useProfileStore();
  const { language } = useSettingsStore();

  useEffect(() => {
    if (!lastResult) {
      router.replace("/learn/sorting");
    }
  }, [lastResult, router]);

  if (!lastResult) return null;

  const childName = activeProfile?.name || (language === "id" ? "Anak Hebat" : "Little Star");
  const theme = getSortingThemeById(lastResult.themeId);

  const teacherMessage =
    language === "id"
      ? `Hebat sekali, ${childName}! Kamu berhasil merapikan semua barang di "${theme?.name.id || "kamar"}" dengan sangat rapi dan mandiri!`
      : `Outstanding job, ${childName}! You organized all the items in "${theme?.name.en || "the room"}" neatly and independently!`;

  return (
    <GameResultView
      title={getTranslation("result.congratsTitle", {}, language)}
      badgeText={getTranslation("games.sorting.completedBadge", {}, language)}
      teacherMessage={teacherMessage}
      teacherExpression="celebrating"
      stars={lastResult.starsEarned}
      maxStars={5}
      customContent={
        <div className="w-full max-w-md mx-auto p-3 bg-gradient-to-b from-emerald-100/90 to-teal-100/90 rounded-2xl border-2 border-emerald-300 shadow-inner space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl">{theme?.icon}</span>
            <h4 className="text-xs sm:text-sm font-black text-emerald-950">
              {theme?.name[language] || theme?.name.id}
            </h4>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-white/80 rounded-xl border border-emerald-200">
            {theme?.categories.map((cat) => {
              const items = sortedItems[cat.id] || [];
              return (
                <div
                  key={cat.id}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 text-[11px] font-black"
                >
                  <span>{cat.icon}</span>
                  <span>{items.length}</span>
                </div>
              );
            })}
          </div>
        </div>
      }
      stats={[
        {
          label: language === "id" ? "Barang Dirapikan" : "Items Organized",
          value: `${lastResult.sortedItemsCount} / ${lastResult.totalItems}`,
        },
        {
          label: language === "id" ? "Waktu Bermain" : "Time Spent",
          value: `${lastResult.timeSpentSeconds}s`,
        },
        {
          label: language === "id" ? "Percobaan Salah" : "Mistakes",
          value: `${lastResult.mistakesCount}`,
        },
      ]}
      chooseLevelHref="/learn/sorting"
      chooseLevelLabel={getTranslation("games.sorting.chooseOtherTheme", {}, language)}
      chooseLevelIcon={<Boxes className="w-5 h-5" />}
      homeHref="/learn"
      homeLabel={getTranslation("result.backToLearn", {}, language)}
      celebrationSoundType="celebration"
    />
  );
}
