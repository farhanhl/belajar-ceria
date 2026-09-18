"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDetectiveGameStore } from "@/stores/detective-game-store";
import { useSettingsStore } from "@/stores/settings-store";
import { useProfileStore } from "@/stores/profile-store";
import { ChildNavbar } from "@/components/navigation/ChildNavbar";
import { ChildPageHeader } from "@/components/navigation/ChildPageHeader";
import { Teacher } from "@/components/teacher/Teacher";
import { DetectiveClueBar } from "@/games/detective/components/DetectiveClueBar";
import { DetectiveSceneBoard } from "@/games/detective/components/DetectiveSceneBoard";
import { DetectiveItem } from "@/games/detective/types";
import { soundFx } from "@/lib/audio/sound-fx";
import { getTranslation } from "@/lib/i18n";

export default function DetectivePlayPage() {
  const router = useRouter();
  const { currentMission, startMission, clickItem, triggerHint } = useDetectiveGameStore();
  const { language, soundEnabled, volume } = useSettingsStore();
  const { activeProfile, recordDetectiveResult } = useProfileStore();

  const [teacherMessage, setTeacherMessage] = useState<string>("");
  const hasCompletedRef = React.useRef(false);

  useEffect(() => {
    if (!currentMission) {
      hasCompletedRef.current = false;
      startMission();
    }
  }, [currentMission, startMission]);

  useEffect(() => {
    if (!currentMission || currentMission.isCompleted) return;

    const remaining = currentMission.targetItems.length - currentMission.foundItemIds.length;
    if (remaining === currentMission.targetItems.length) {
      setTeacherMessage(
        language === "id"
          ? `Ayo cari ${remaining} benda tersembunyi sesuai petunjuk ya!`
          : `Let's find the ${remaining} hidden objects following the clues!`
      );
    } else {
      setTeacherMessage(
        language === "id"
          ? `Hebat! Tinggal ${remaining} benda lagi yang harus ditemukan!`
          : `Great job! Only ${remaining} more items to discover!`
      );
    }
  }, [
    currentMission?.foundItemIds.length,
    currentMission?.targetItems.length,
    currentMission?.isCompleted,
    language,
  ]);

  if (!currentMission) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-400 border-t-amber-600 rounded-full animate-spin" />
      </div>
    );
  }

  const handleItemClick = (item: DetectiveItem) => {
    if (hasCompletedRef.current || currentMission.isCompleted) return;
    const result = clickItem(item.id);

    if (result.isCompleted) {
      hasCompletedRef.current = true;
      if (soundEnabled) soundFx.playCelebration(volume);

      const updatedMission = useDetectiveGameStore.getState().currentMission;
      if (activeProfile && updatedMission) {
        recordDetectiveResult({
          profileId: activeProfile.id,
          difficulty: updatedMission.difficulty,
          totalQuestions: updatedMission.targetItems.length,
          correctAnswers: updatedMission.foundItemIds.length,
          incorrectAnswers: updatedMission.mistakesCount,
          starsEarned: updatedMission.earnedStars,
          completedAt: new Date().toISOString(),
        });
      }

      setTeacherMessage(
        language === "id"
          ? "Luar biasa! Semua benda berhasil ditemukan! 🎉"
          : "Awesome! All items have been found! 🎉"
      );

      setTimeout(() => {
        router.push("/learn/detective/result");
      }, 1400);
    }
  };

  const handleUseHint = () => {
    const res = triggerHint();
    if (res.success && res.hintItem) {
      setTeacherMessage(
        language === "id"
          ? `Ibu Guru beri petunjuk: ${res.hintItem.name.id} berkedip dengan lingkaran emas!`
          : `Teacher hint: ${res.hintItem.name.en} is blinking with a golden beacon!`
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <ChildNavbar />

      <main className="flex-1 max-w-6xl w-full mx-auto space-y-4 py-4 sm:py-6 flex flex-col">
        {/* Uniform Header */}
        <ChildPageHeader
          title={`${currentMission.scene.themeName[language] || currentMission.scene.themeName.id} 🔍`}
          backHref="/learn/detective"
        />

        {/* Teacher Feedback Prompt */}
        <Teacher
          expression={currentMission.isCompleted ? "celebrating" : "happy"}
          message={teacherMessage}
          className="w-full"
        />

        {/* Target Items Checklist & Hint Bar */}
        <DetectiveClueBar mission={currentMission} onUseHint={handleUseHint} />

        {/* Interactive Scene Canvas */}
        <div className="w-full flex-1 flex items-center justify-center">
          <DetectiveSceneBoard mission={currentMission} onItemClick={handleItemClick} />
        </div>
      </main>
    </div>
  );
}
