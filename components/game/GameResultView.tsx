"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import confetti from "canvas-confetti";
import { Sparkles, Trophy, RotateCcw, Grid, Home } from "lucide-react";
import { ChildNavbar } from "@/components/navigation/ChildNavbar";
import { Teacher } from "@/components/teacher/Teacher";
import { TeacherExpression } from "@/components/teacher/TeacherAvatar";
import { ChildCard } from "@/components/ui/ChildCard";
import { ChildButton } from "@/components/ui/ChildButton";
import { StarRating } from "@/components/ui/StarRating";
import { useSettingsStore } from "@/stores/settings-store";
import { soundFx } from "@/lib/audio/sound-fx";

export interface GameResultStat {
  label: string;
  value: string | number;
}

export interface GameResultViewProps {
  /** Title at top of celebration, defaults to "Yeay! Kamu Hebat!" */
  title?: string;
  /** Pill badge above title, defaults to "🎉 Permainan Selesai!" */
  badgeText?: string;
  /** Teacher feedback message */
  teacherMessage: string;
  /** Optional secondary teacher message */
  teacherSubMessage?: string;
  /** Teacher expression avatar */
  teacherExpression?: TeacherExpression;

  /** Number of stars earned (0-5) */
  stars: number;
  /** Max stars, defaults to 5 */
  maxStars?: number;
  /** Custom star label below stars, defaults to "Kamu Mendapatkan X Bintang!" */
  starsText?: string;

  /** Single score badge text, e.g. "5 dari 5 Benar" */
  scoreBadgeText?: string;
  /** Icon for score badge, defaults to Trophy */
  scoreBadgeIcon?: React.ReactNode;

  /** Multiple stats cards (e.g. for Puzzle: Kepingan, Langkah, Waktu) */
  stats?: GameResultStat[];

  /** Custom content slot (e.g. Puzzle completed artwork preview) */
  customContent?: React.ReactNode;

  /** Replay callback — omit to hide the replay button entirely */
  onPlayAgain?: () => void;
  /** Label for replay button, defaults to "Main Lagi" */
  playAgainLabel?: string;
  /** Icon for replay button */
  playAgainIcon?: React.ReactNode;

  /** Destination URL to choose another level/mode */
  chooseLevelHref?: string;
  /** Label for level choice button, defaults to "Pilih Level Lain" */
  chooseLevelLabel?: string;
  /** Icon for choose level button, defaults to Grid */
  chooseLevelIcon?: React.ReactNode;

  /** Home route URL, defaults to "/learn" */
  homeHref?: string;
  /** Label for home link, defaults to "Kembali ke Menu Belajar" */
  homeLabel?: string;

  /** Sound type to trigger on completion, defaults to "celebration" */
  celebrationSoundType?: "celebration" | "victory";
}

export function GameResultView({
  title = "Yeay! Kamu Hebat!",
  badgeText = "🎉 Permainan Selesai!",
  teacherMessage,
  teacherSubMessage,
  teacherExpression = "celebrating",
  stars,
  maxStars = 5,
  starsText,
  scoreBadgeText,
  scoreBadgeIcon,
  stats,
  customContent,
  onPlayAgain,
  playAgainLabel = "Main Lagi",
  playAgainIcon,
  chooseLevelHref,
  chooseLevelLabel = "Pilih Level Lain",
  chooseLevelIcon,
  homeHref = "/learn",
  homeLabel = "Kembali ke Menu Belajar",
  celebrationSoundType = "celebration",
}: GameResultViewProps) {
  const { soundEnabled, volume } = useSettingsStore();

  useEffect(() => {
    // Play sound FX
    if (soundEnabled) {
      if (celebrationSoundType === "victory") {
        soundFx.playVictory(volume);
      } else {
        soundFx.playCelebration(volume);
      }
    }

    // Fire celebratory confetti
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.5 },
        colors: ["#F59E0B", "#10B981", "#3B82F6", "#EC4899", "#8B5CF6", "#F97316"],
      });
    } catch {
      // Confetti fallback
    }
  }, [soundEnabled, volume, celebrationSoundType]);

  const displayedStarsText = starsText ?? `Kamu Mendapatkan ${stars} Bintang!`;

  return (
    <div className="min-h-screen flex flex-col justify-between pb-6">
      <ChildNavbar showControls={false} />

      <main className="flex-1 max-w-xl w-full mx-auto p-4 sm:p-8 flex flex-col items-center justify-center space-y-6">
        {/* Celebration Header */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-2"
        >
          <div className="inline-flex items-center gap-2 bg-amber-200 text-amber-950 px-4 py-1.5 rounded-full text-sm font-extrabold shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-600 fill-amber-500" />
            <span>{badgeText}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-amber-950 tracking-tight">
            {title}
          </h1>
        </motion.div>

        {/* Teacher Avatar Feedback */}
        <Teacher
          expression={teacherExpression}
          message={teacherMessage}
          subMessage={teacherSubMessage}
          className="w-full"
        />

        {/* Celebratory Result Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="w-full"
        >
          <ChildCard
            borderColor="border-amber-400"
            bgGradient="bg-gradient-to-b from-white via-amber-50/40 to-orange-50/70"
            className="text-center space-y-6 bg-white/95 shadow-2xl p-6 sm:p-8"
          >
            {/* Custom Content Slot (e.g. Puzzle image) */}
            {customContent && <div className="w-full">{customContent}</div>}

            {/* Stars Display */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <StarRating stars={stars} maxStars={maxStars} size={44} animate />
              <p className="text-base sm:text-lg font-black text-amber-950">
                {displayedStarsText}
              </p>
            </div>

            {/* Single Score Badge */}
            {scoreBadgeText && (
              <div className="bg-amber-100/80 border-2 border-amber-300 rounded-2xl py-2.5 px-6 inline-flex items-center gap-2.5 shadow-inner">
                {scoreBadgeIcon ?? <Trophy className="w-5 h-5 text-amber-600" />}
                <span className="text-base sm:text-lg font-black text-amber-950">
                  {scoreBadgeText}
                </span>
              </div>
            )}

            {/* Multi-Stat Grid */}
            {stats && stats.length > 0 && (
              <div
                className={`grid gap-2 sm:gap-3 pt-1 ${
                  stats.length === 2
                    ? "grid-cols-2"
                    : stats.length === 3
                    ? "grid-cols-3"
                    : "grid-cols-2 sm:grid-cols-4"
                }`}
              >
                {stats.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-amber-50/80 rounded-2xl p-2.5 sm:p-3 border border-amber-200"
                  >
                    <span className="text-[11px] sm:text-xs text-amber-800 font-bold block">
                      {item.label}
                    </span>
                    <span className="text-sm sm:text-base font-black text-amber-950">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            {onPlayAgain ? (
              // Full 3-button layout: replay + choose level + home link
              <>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3 border-t border-amber-100">
                  <ChildButton
                    type="button"
                    variant="primary"
                    size="lg"
                    onClick={onPlayAgain}
                    icon={playAgainIcon ?? <RotateCcw className="w-5 h-5" />}
                    className="w-full flex-1"
                  >
                    {playAgainLabel}
                  </ChildButton>

                  {chooseLevelHref && (
                    <Link href={chooseLevelHref} className="w-full flex-1">
                      <ChildButton
                        type="button"
                        variant="secondary"
                        size="lg"
                        icon={chooseLevelIcon ?? <Grid className="w-5 h-5" />}
                        className="w-full"
                      >
                        {chooseLevelLabel}
                      </ChildButton>
                    </Link>
                  )}
                </div>

                {homeHref && (
                  <div className="pt-2 border-t border-slate-100">
                    <Link
                      href={homeHref}
                      className="inline-flex items-center gap-2 text-sm font-extrabold text-amber-800 hover:text-amber-950 py-1 transition"
                    >
                      <Home className="w-4 h-4" />
                      <span>{homeLabel}</span>
                    </Link>
                  </div>
                )}
              </>
            ) : (
              // 2-button layout: choose level + home, equal width side-by-side
              <div className="flex flex-row items-stretch justify-center gap-3 pt-3 border-t border-amber-100">
                {chooseLevelHref && (
                  <Link href={chooseLevelHref} className="flex-1">
                    <ChildButton
                      type="button"
                      variant="secondary"
                      size="lg"
                      icon={chooseLevelIcon ?? <Grid className="w-5 h-5" />}
                      className="w-full h-full"
                    >
                      {chooseLevelLabel}
                    </ChildButton>
                  </Link>
                )}
                {homeHref && (
                  <Link href={homeHref} className="flex-1">
                    <ChildButton
                      type="button"
                      variant="primary"
                      size="lg"
                      icon={<Home className="w-5 h-5" />}
                      className="w-full h-full"
                    >
                      {homeLabel}
                    </ChildButton>
                  </Link>
                )}
              </div>
            )}
          </ChildCard>
        </motion.div>
      </main>
    </div>
  );
}
