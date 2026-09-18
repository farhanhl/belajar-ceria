"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePuzzleGameStore } from "@/stores/puzzle-game-store";
import { useProfileStore } from "@/stores/profile-store";
import { useSettingsStore } from "@/stores/settings-store";
import { GameResultView } from "@/components/game/GameResultView";
import { PuzzleArtwork } from "@/games/puzzle/components/PuzzleArtwork";
import { soundFx } from "@/lib/audio/sound-fx";
import { getTranslation } from "@/lib/i18n";
import { motion } from "motion/react";
import { RotateCcw, Grid, CheckCircle2 } from "lucide-react";

export default function PuzzleResultPage() {
  const router = useRouter();
  const { lastResult, startPuzzle, difficulty } = usePuzzleGameStore();
  const { activeProfile } = useProfileStore();
  const { language, soundEnabled, volume } = useSettingsStore();

  const childName = activeProfile?.name || (language === "id" ? "Teman" : "Friend");

  useEffect(() => {
    if (!lastResult) {
      router.push("/learn/puzzle");
    }
  }, [lastResult, router]);

  if (!lastResult) return null;

  const stars = lastResult.starsEarned;
  const placedCount =
    lastResult.placedPiecesCount !== undefined
      ? lastResult.placedPiecesCount
      : lastResult.totalPieces;
  const isFullyCompleted = placedCount >= lastResult.totalPieces;

  let message = getTranslation("games.puzzle.congratsAllPieces", { name: childName, title: lastResult.puzzleTitle }, language);
  if (!isFullyCompleted) {
    message = getTranslation("games.puzzle.congratsPartial", { name: childName, placed: placedCount, total: lastResult.totalPieces }, language);
  } else if (stars >= 4) {
    message = getTranslation("games.puzzle.congratsHigh", { name: childName, title: lastResult.puzzleTitle }, language);
  } else if (stars < 3) {
    message = getTranslation("games.puzzle.congratsPractice", { name: childName }, language);
  }

  const handlePlayAgain = () => {
    if (soundEnabled) soundFx.playClick(volume);
    startPuzzle(lastResult.puzzleId, difficulty);
    router.push("/learn/puzzle/play");
  };

  const puzzleArtworkPreview = (
    <div className="space-y-3">
      <div className="relative aspect-square w-48 sm:w-56 mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-300 ring-4 ring-amber-100">
        <PuzzleArtwork artworkId={lastResult.artworkId} />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className={`absolute top-2 right-2 ${
            isFullyCompleted ? "bg-emerald-500" : "bg-amber-500"
          } text-white rounded-full p-1.5 shadow-lg`}
        >
          <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
        </motion.div>
      </div>

      <h3 className="text-xl sm:text-2xl font-black text-amber-950">
        {lastResult.puzzleTitle}
      </h3>
    </div>
  );

  return (
    <GameResultView
      title={isFullyCompleted ? getTranslation("result.congratsTitle", {}, language) : getTranslation("games.letters.praise3", { name: childName }, language)}
      badgeText={isFullyCompleted ? getTranslation("games.puzzle.completedBadge", {}, language) : getTranslation("result.gameFinishedBadge", {}, language)}
      teacherMessage={message}
      teacherExpression={isFullyCompleted ? "celebrating" : "happy"}
      stars={stars}
      customContent={puzzleArtworkPreview}
      stats={[
        { label: getTranslation("games.puzzle.pieces", {}, language), value: `${placedCount} / ${lastResult.totalPieces}` },
        { label: getTranslation("games.puzzle.movesLabel", {}, language), value: lastResult.movesCount },
        { label: getTranslation("games.puzzle.timeLabel", {}, language), value: `${lastResult.timeSpentSeconds}s` },
      ]}
      onPlayAgain={handlePlayAgain}
      playAgainLabel={getTranslation("games.puzzle.playAgain", {}, language)}
      playAgainIcon={<RotateCcw className="w-5 h-5" />}
      chooseLevelHref="/learn/puzzle"
      chooseLevelLabel={getTranslation("games.puzzle.chooseOtherImage", {}, language)}
      chooseLevelIcon={<Grid className="w-5 h-5" />}
      homeHref="/learn"
      homeLabel={getTranslation("app.backToLearn", {}, language)}
    />
  );
}
