"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Difficulty } from "@/types/game";
import { useColorsGameStore } from "@/stores/colors-game-store";
import { useProfileStore } from "@/stores/profile-store";
import { useSettingsStore } from "@/stores/settings-store";
import { ChildNavbar } from "@/components/navigation/ChildNavbar";
import { Teacher } from "@/components/teacher/Teacher";
import { ChildButton } from "@/components/ui/ChildButton";
import { ChildCard } from "@/components/ui/ChildCard";
import { soundFx } from "@/lib/audio/sound-fx";
import { motion } from "motion/react";
import {
  Sparkles,
  Compass,
  Play,
  Star,
  Trophy,
  ArrowLeft,
  Palette,
  Shapes,
} from "lucide-react";
import Link from "next/link";

export default function ColorsHubPage() {
  const router = useRouter();
  const { startGame } = useColorsGameStore();
  const { activeProfile } = useProfileStore();
  const { soundEnabled, volume } = useSettingsStore();

  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>("easy");

  const childName = activeProfile?.name || "Teman";

  const handleStartPlay = (difficulty: Difficulty) => {
    if (soundEnabled) soundFx.playClick(volume);
    startGame(difficulty);
    router.push("/learn/colors/play");
  };

  const colorsStars =
    (activeProfile?.progress?.colors?.easy?.stars || 0) +
    (activeProfile?.progress?.colors?.medium?.stars || 0) +
    (activeProfile?.progress?.colors?.hard?.stars || 0);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <ChildNavbar />

      <main className="flex-1 max-w-6xl w-full mx-auto space-y-6 py-8">
        {/* Back Link & Header */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <Link href="/learn">
            <ChildButton variant="secondary" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Menu Belajar</span>
            </ChildButton>
          </Link>

          <div className="inline-flex items-center gap-2 bg-amber-200 text-amber-950 font-black px-4 py-2 rounded-full text-sm shadow-sm">
            <Star className="w-5 h-5 fill-amber-500 text-amber-600" />
            <span>{colorsStars} Bintang Terkumpul</span>
          </div>
        </div>

        {/* Teacher Avatar Welcome */}
        <Teacher
          expression="happy"
          message={`Halo, ${childName}! Mari mengenal warna-warni indah dan bentuk-bentuk lucu bersama Ibu Guru!`}
          subMessage="Kamu bisa bereksplorasi dengan santai atau mulai tantangan bermain seru!"
        />

        {/* Mode Choices: Exploration vs Play Challenge */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Eksplorasi Santai */}
          <motion.div whileHover={{ scale: 1.02 }} className="h-full">
            <ChildCard
              borderColor="border-sky-400"
              className="p-6 sm:p-8 flex flex-col justify-between h-full bg-gradient-to-br from-sky-50/90 to-indigo-50/90 shadow-xl"
            >
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-sky-500 text-white flex items-center justify-center shadow-lg shadow-sky-200">
                  <Palette className="w-9 h-9" />
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-800">
                    Eksplorasi Santai
                  </h3>
                  <p className="text-sm sm:text-base font-bold text-slate-600 mt-1">
                    Sentuh warna dan bentuk untuk mendengarkan suara & melihat benda-benda nyata di sekitar kita.
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <Link href="/learn/colors/explore">
                  <ChildButton
                    variant="secondary"
                    size="lg"
                    className="w-full gap-2 shadow-lg"
                    onClick={() => {
                      if (soundEnabled) soundFx.playClick(volume);
                    }}
                  >
                    <Compass className="w-5 h-5" />
                    <span>Mulai Eksplorasi 🔍</span>
                  </ChildButton>
                </Link>
              </div>
            </ChildCard>
          </motion.div>

          {/* Card 2: Tantangan Bermain */}
          <motion.div whileHover={{ scale: 1.02 }} className="h-full">
            <ChildCard
              borderColor="border-amber-400"
              className="p-6 sm:p-8 flex flex-col justify-between h-full bg-gradient-to-br from-amber-50/90 to-orange-50/90 shadow-xl"
            >
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-200">
                  <Shapes className="w-9 h-9" />
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-800">
                    Tantangan Bermain
                  </h3>
                  <p className="text-sm sm:text-base font-bold text-slate-600 mt-1">
                    Uji ketangkasanmu mencocokkan bentuk, mencari warna, dan mengelompokkan benda ke keranjang!
                  </p>
                </div>

                {/* Difficulty Selector */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-900/80">
                    Pilih Tingkat Kesulitan:
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => {
                        setSelectedDifficulty("easy");
                        if (soundEnabled) soundFx.playClick(volume * 0.5);
                      }}
                      className={`py-2 px-3 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                        selectedDifficulty === "easy"
                          ? "bg-emerald-500 text-white shadow-md scale-105"
                          : "bg-white text-emerald-700 hover:bg-emerald-50 border border-emerald-200"
                      }`}
                    >
                      Mudah ⭐
                    </button>
                    <button
                      onClick={() => {
                        setSelectedDifficulty("medium");
                        if (soundEnabled) soundFx.playClick(volume * 0.5);
                      }}
                      className={`py-2 px-3 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                        selectedDifficulty === "medium"
                          ? "bg-amber-500 text-white shadow-md scale-105"
                          : "bg-white text-amber-700 hover:bg-amber-50 border border-amber-200"
                      }`}
                    >
                      Sedang ⭐⭐
                    </button>
                    <button
                      onClick={() => {
                        setSelectedDifficulty("hard");
                        if (soundEnabled) soundFx.playClick(volume * 0.5);
                      }}
                      className={`py-2 px-3 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                        selectedDifficulty === "hard"
                          ? "bg-rose-500 text-white shadow-md scale-105"
                          : "bg-white text-rose-700 hover:bg-rose-50 border border-rose-200"
                      }`}
                    >
                      Sulit ⭐⭐⭐
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <ChildButton
                  variant="primary"
                  size="lg"
                  className="w-full gap-2 shadow-lg"
                  onClick={() => handleStartPlay(selectedDifficulty)}
                >
                  <Play className="w-5 h-5 fill-amber-950" />
                  <span>Mulai Bermain 🎮</span>
                </ChildButton>
              </div>
            </ChildCard>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
