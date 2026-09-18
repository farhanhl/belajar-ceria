"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/stores/game-store";
import { useProfileStore } from "@/stores/profile-store";
import { useSettingsStore } from "@/stores/settings-store";
import { ChildNavbar } from "@/components/navigation/ChildNavbar";
import { ChildPageHeader } from "@/components/navigation/ChildPageHeader";
import { Teacher } from "@/components/teacher/Teacher";
import { ChildCard } from "@/components/ui/ChildCard";
import { ChildButton } from "@/components/ui/ChildButton";
import { Difficulty } from "@/types/game";
import { Star, Trophy, ArrowLeft, Play, Sparkles } from "lucide-react";
import { getTranslation } from "@/lib/i18n";
import { motion } from "motion/react";
import Link from "next/link";

export default function MatchingLevelSelectPage() {
  const router = useRouter();
  const { startSession } = useGameStore();
  const { activeProfile } = useProfileStore();
  const { language } = useSettingsStore();

  const handleSelectLevel = (diff: Difficulty) => {
    startSession(diff);
    router.push("/learn/matching/play");
  };

  const levels: {
    id: Difficulty;
    nameKey: string;
    descKey: string;
    color: string;
    borderColor: string;
    badgeBg: string;
    starsNeeded: number;
    icon: string;
  }[] = [
      {
        id: "easy",
        nameKey: "games.matching.easy",
        descKey: "games.matching.easyDesc",
        color: "from-emerald-400 to-teal-400",
        borderColor: "border-emerald-400",
        badgeBg: "bg-emerald-500",
        starsNeeded: 0,
        icon: "🌱",
      },
      {
        id: "medium",
        nameKey: "games.matching.medium",
        descKey: "games.matching.mediumDesc",
        color: "from-sky-400 to-blue-400",
        borderColor: "border-sky-400",
        badgeBg: "bg-sky-500",
        starsNeeded: 5,
        icon: "⭐",
      },
      {
        id: "hard",
        nameKey: "games.matching.hard",
        descKey: "games.matching.hardDesc",
        color: "from-purple-400 to-pink-400",
        borderColor: "border-purple-400",
        badgeBg: "bg-purple-500",
        starsNeeded: 10,
        icon: "👑",
      },
    ];

  return (
    <div className="min-h-screen flex flex-col">
      <ChildNavbar />

      <main className="flex-1 max-w-6xl w-full mx-auto space-y-6 py-8">
        {/* Uniform Header */}
        <ChildPageHeader
          title={getTranslation("games.matching.title", {}, language)}
          backHref="/learn"
        />

        {/* Teacher Guidance */}
        <Teacher
          expression="happy"
          message={getTranslation("games.matching.teacherWelcome", {}, language)}
          subMessage={getTranslation("games.matching.teacherSubWelcome", {}, language)}
        />

        {/* Level Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {levels.map((lvl) => {
            const progress = activeProfile?.progress?.matching?.[lvl.id];
            const stars = progress?.stars || 0;
            const completed = progress?.gamesCompleted || 0;

            return (
              <motion.div
                key={lvl.id}
                whileHover={{ scale: 1.04, y: -6 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleSelectLevel(lvl.id)}
                className="cursor-pointer"
              >
                <ChildCard
                  borderColor={lvl.borderColor}
                  className="h-full flex flex-col items-center justify-between text-center p-6 space-y-5 bg-white shadow-xl hover:shadow-2xl transition-all"
                >
                  <div className="space-y-3 w-full">
                    {/* Badge */}
                    <div className="flex justify-center">
                      <span className="text-5xl select-none">{lvl.icon}</span>
                    </div>

                    <h3 className="text-3xl font-black text-slate-800">
                      {getTranslation(lvl.nameKey, {}, language)}
                    </h3>

                    <p className="text-sm font-bold text-slate-600 min-h-[40px]">
                      {getTranslation(lvl.descKey, {}, language)}
                    </p>
                  </div>

                  {/* Level Progress Stats */}
                  <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs font-black text-slate-700 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-amber-600">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-500" /> {getTranslation("app.stars", {}, language)}:
                      </span>
                      <span className="text-sm font-extrabold">{stars}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">{getTranslation("parent.colCompleted", {}, language)}:</span>
                      <span className="text-sm font-extrabold">{completed}</span>
                    </div>
                  </div>

                  {/* Play Button */}
                  <div className="w-full pt-2">
                    <ChildButton
                      variant={lvl.id === "easy" ? "success" : lvl.id === "medium" ? "secondary" : "purple"}
                      size="lg"
                      icon={<Play className="w-5 h-5 fill-current" />}
                      className="w-full"
                    >
                      {getTranslation("app.start", {}, language)}
                    </ChildButton>
                  </div>
                </ChildCard>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
