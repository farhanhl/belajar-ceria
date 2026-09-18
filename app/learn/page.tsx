"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProfileStore } from "@/stores/profile-store";
import { useSettingsStore } from "@/stores/settings-store";
import { ChildNavbar } from "@/components/navigation/ChildNavbar";
import { Teacher } from "@/components/teacher/Teacher";
import { ChildButton } from "@/components/ui/ChildButton";
import { ChildCard } from "@/components/ui/ChildCard";
import { GAMES_CATALOG } from "@/games";
import { Star, Trophy, Play, Lock, Sparkles } from "lucide-react";
import { getTranslation } from "@/lib/i18n";
import { motion } from "motion/react";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const { activeProfile, profiles, isHydrated } = useProfileStore();
  const { language } = useSettingsStore();

  useEffect(() => {
    if (!isHydrated) return;
    if (profiles.length === 0) {
      router.replace("/");
    }
  }, [isHydrated, profiles.length, router]);

  if (!isHydrated || !activeProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-400 border-t-amber-600 rounded-full animate-spin" />
      </div>
    );
  }

  const childName = activeProfile.name;
  const totalStars =
    (activeProfile.progress?.matching?.easy?.stars || 0) +
    (activeProfile.progress?.matching?.medium?.stars || 0) +
    (activeProfile.progress?.matching?.hard?.stars || 0);

  const level = Math.max(
    activeProfile.progress?.matching?.easy?.currentLevel || 1,
    activeProfile.progress?.matching?.medium?.currentLevel || 1,
    activeProfile.progress?.matching?.hard?.currentLevel || 1
  );

  return (
    <div className="min-h-screen flex flex-col">
      <ChildNavbar />

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-8 space-y-8">
        {/* Welcome Section with Ibu Guru */}
        <Teacher
          expression="happy"
          message={getTranslation("dashboard.greeting", { name: childName }, language)}
          subMessage="Pilih permainan di bawah untuk mulai mengumpulkan bintang!"
        />

        {/* Stats Summary Bar */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-amber-400 to-orange-400 rounded-3xl p-4 sm:p-5 text-amber-950 flex items-center gap-3 sm:gap-4 shadow-lg border-2 border-amber-300"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/90 flex items-center justify-center shrink-0 shadow">
              <Star className="w-8 h-8 fill-amber-400 text-amber-500" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-900/80">
                Total Bintang
              </p>
              <p className="text-2xl sm:text-3xl font-black">{totalStars} Bintang</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-sky-400 to-indigo-400 rounded-3xl p-4 sm:p-5 text-white flex items-center gap-3 sm:gap-4 shadow-lg border-2 border-sky-300"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/90 flex items-center justify-center shrink-0 shadow">
              <Trophy className="w-8 h-8 text-indigo-500" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-black uppercase tracking-wider text-indigo-100">
                Peringkat Belajar
              </p>
              <p className="text-2xl sm:text-3xl font-black">Level {level}</p>
            </div>
          </motion.div>
        </div>

        {/* Games Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-500 fill-amber-400" />
            <h2 className="text-2xl sm:text-3xl font-black text-amber-950 tracking-tight">
              {getTranslation("dashboard.chooseGame", {}, language)}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Primary Game: Cocokkan & Temukan */}
            <motion.div
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="md:col-span-2 lg:col-span-2"
            >
              <ChildCard
                borderColor="border-amber-400"
                bgGradient="bg-gradient-to-br from-amber-100/90 via-white to-orange-50"
                className="relative overflow-hidden group shadow-xl"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="space-y-3 text-center sm:text-left">
                    <div className="inline-flex items-center gap-1.5 bg-amber-400 text-amber-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 fill-amber-950" /> Permainan Utama
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-black text-amber-950">
                      {getTranslation("games.matching.title", {}, language)}
                    </h3>
                    <p className="text-base sm:text-lg font-bold text-amber-800 max-w-md">
                      {getTranslation("games.matching.subtitle", {}, language)} Tarik gambar ke pasangan yang sama dan kumpulkan bintang!
                    </p>
                    <div className="pt-2">
                      <Link href="/learn/matching">
                        <ChildButton
                          variant="primary"
                          size="lg"
                          icon={<Play className="w-6 h-6 fill-amber-950" />}
                        >
                          {getTranslation("dashboard.startPlay", {}, language)}
                        </ChildButton>
                      </Link>
                    </div>
                  </div>

                  {/* Decorative Game Visual */}
                  <div className="relative w-36 h-36 sm:w-44 sm:h-44 bg-amber-200 rounded-3xl border-4 border-amber-400 flex items-center justify-center shadow-inner group-hover:rotate-3 transition-transform">
                    <span className="text-6xl sm:text-7xl select-none">🧩</span>
                  </div>
                </div>
              </ChildCard>
            </motion.div>

            {/* Locked Future Games */}
            {GAMES_CATALOG.filter((g) => !g.available).map((game) => (
              <div
                key={game.id}
                className="rounded-3xl border-4 border-dashed border-slate-300 bg-slate-100/60 p-6 flex flex-col items-center justify-between text-center min-h-[220px] opacity-75 select-none"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-200 text-slate-400 flex items-center justify-center mb-2">
                  <Lock className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-black text-slate-700">
                    {getTranslation(game.titleKey, {}, language)}
                  </h4>
                  <p className="text-xs font-bold text-slate-500">
                    {getTranslation(game.descriptionKey, {}, language)}
                  </p>
                </div>
                <span className="mt-4 text-xs font-black uppercase tracking-wider text-slate-400 bg-slate-200 px-3 py-1 rounded-full">
                  {getTranslation("dashboard.lockedGame", {}, language)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
