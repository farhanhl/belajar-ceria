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
import { getTranslation } from "@/lib/i18n";

export interface GameResultStat {
  label: string;
  value: string | number;
}

export interface GameResultViewProps {
  /** Title at top of celebration, defaults to localized "Yeay! Kamu Hebat!" */
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
  /** Custom star label below stars */
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
  /** Label for replay button */
  playAgainLabel?: string;
  /** Icon for replay button */
  playAgainIcon?: React.ReactNode;

  /** Destination URL to choose another level/mode */
  chooseLevelHref?: string;
  /** Label for level choice button */
  chooseLevelLabel?: string;
  /** Icon for choose level button */
  chooseLevelIcon?: React.ReactNode;

  /** Home route URL, defaults to "/learn" */
  homeHref?: string;
  /** Label for home link */
  homeLabel?: string;

  /** Sound type to trigger on completion, defaults to "celebration" */
  celebrationSoundType?: "celebration" | "victory";
}

export function GameResultView({
  title,
  badgeText,
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
  playAgainLabel,
  playAgainIcon,
  chooseLevelHref,
  chooseLevelLabel,
  chooseLevelIcon,
  homeHref = "/learn",
  homeLabel,
  celebrationSoundType = "celebration",
}: GameResultViewProps) {
  const { language, soundEnabled, volume } = useSettingsStore();

  const finalTitle = title ?? getTranslation("result.congratsTitle", {}, language);
  const finalBadge = badgeText ?? getTranslation("result.gameFinishedBadge", {}, language);
  const finalStarsText = starsText ?? getTranslation("result.earnedStars", { stars }, language);
  const finalPlayAgain = playAgainLabel ?? getTranslation("result.playAgain", {}, language);
  const finalChooseLevel = chooseLevelLabel ?? getTranslation("result.chooseLevel", {}, language);
  const finalHomeLabel = homeLabel ?? getTranslation("result.backToLearn", {}, language);

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

  return (
    <div className="min-h-screen flex flex-col">
      <ChildNavbar showControls={false} />

      <main className="flex-1 max-w-6xl w-full mx-auto space-y-6 py-8">
        {/* Celebration Header */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-1.5"
        >
          <div className="inline-flex items-center gap-1.5 bg-amber-200 text-amber-950 px-3.5 py-1 rounded-full text-xs sm:text-sm font-extrabold shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-600 fill-amber-500" />
            <span>{finalBadge}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-amber-950 tracking-tight">
            {finalTitle}
          </h1>
        </motion.div>

        {/* Teacher Avatar Feedback */}
        <Teacher
          expression={teacherExpression}
          message={teacherMessage}
          subMessage={teacherSubMessage}
          size={80}
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
            className="text-center space-y-4 sm:space-y-5 bg-white/95 shadow-xl p-4 sm:p-6"
          >
            {/* Custom Content Slot (e.g. Puzzle image) */}
            {customContent && <div className="w-full">{customContent}</div>}

            {/* Stars Display */}
            <div className="flex flex-col items-center justify-center space-y-1.5">
              <StarRating stars={stars} maxStars={maxStars} size={40} animate />
              <p className="text-sm sm:text-base font-black text-amber-950">
                {finalStarsText}
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
                className={`grid gap-2 sm:gap-3 pt-1 ${stats.length === 2
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
            <div className="flex flex-col sm:flex-row items-stretch justify-center gap-3 sm:gap-4 pt-4 border-t-2 border-amber-100/80 w-full">
              {onPlayAgain && (
                <div className="flex-1 w-full">
                  <ChildButton
                    type="button"
                    variant="primary"
                    size="lg"
                    onClick={onPlayAgain}
                    icon={playAgainIcon ?? <RotateCcw className="w-5 h-5" />}
                    className="w-full h-full text-sm sm:text-base font-black shadow-md hover:shadow-lg transition-all justify-center py-3.5"
                  >
                    {finalPlayAgain}
                  </ChildButton>
                </div>
              )}

              {chooseLevelHref && (
                <Link href={chooseLevelHref} className="flex-1 w-full">
                  <ChildButton
                    type="button"
                    variant="secondary"
                    size="lg"
                    icon={chooseLevelIcon ?? <Grid className="w-5 h-5" />}
                    className="w-full h-full text-sm sm:text-base font-black shadow-md hover:shadow-lg transition-all justify-center py-3.5"
                  >
                    {finalChooseLevel}
                  </ChildButton>
                </Link>
              )}

              {homeHref && (
                <Link href={homeHref} className="flex-1 w-full">
                  <ChildButton
                    type="button"
                    variant={onPlayAgain ? "secondary" : "primary"}
                    size="lg"
                    icon={<Home className="w-5 h-5" />}
                    className="w-full h-full text-sm sm:text-base font-black shadow-md hover:shadow-lg transition-all justify-center py-3.5"
                  >
                    {finalHomeLabel}
                  </ChildButton>
                </Link>
              )}
            </div>
          </ChildCard>
        </motion.div>
      </main>
    </div>
  );
}
