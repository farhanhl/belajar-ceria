"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePuzzleGameStore } from "@/stores/puzzle-game-store";
import { useProfileStore } from "@/stores/profile-store";
import { useSettingsStore } from "@/stores/settings-store";
import { GameResultView } from "@/components/game/GameResultView";
import { PuzzleArtwork } from "@/games/puzzle/components/PuzzleArtwork";
import { soundFx } from "@/lib/audio/sound-fx";
import { motion } from "motion/react";
import { RotateCcw, Grid, CheckCircle2 } from "lucide-react";

export default function PuzzleResultPage() {
  const router = useRouter();
  const { lastResult, startPuzzle, difficulty } = usePuzzleGameStore();
  const { activeProfile } = useProfileStore();
  const { soundEnabled, volume } = useSettingsStore();

  const childName = activeProfile?.name || "Teman";

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

  let message = `Luar biasa, ${childName}! Kamu berhasil menyusun gambar ${lastResult.puzzleTitle} dengan sangat rapi!`;
  if (!isFullyCompleted) {
    message = `Kerja bagus, ${childName}! Kamu sudah berhasil memasang ${placedCount} dari ${lastResult.totalPieces} kepingan puzzle!`;
  } else if (stars >= 4) {
    message = `Hebat sekali, ${childName}! Gambar ${lastResult.puzzleTitle} berhasil kamu selesaikan dengan sangat baik!`;
  } else if (stars < 3) {
    message = `Bagus sekali, ${childName}! Terus berlatih agar semakin mahir menyusun puzzle ya!`;
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
      title={isFullyCompleted ? "Yeay! Kamu Hebat!" : `Bagus Sekali, ${childName}!`}
      badgeText={isFullyCompleted ? "🎉 Puzzle Berhasil Disusun!" : "⭐ Permainan Selesai!"}
      teacherMessage={message}
      teacherExpression={isFullyCompleted ? "celebrating" : "happy"}
      stars={stars}
      customContent={puzzleArtworkPreview}
      stats={[
        { label: "Kepingan", value: `${placedCount} / ${lastResult.totalPieces}` },
        { label: "Langkah", value: lastResult.movesCount },
        { label: "Waktu", value: `${lastResult.timeSpentSeconds}s` },
      ]}
      onPlayAgain={handlePlayAgain}
      playAgainLabel="Susun Lagi"
      playAgainIcon={<RotateCcw className="w-5 h-5" />}
      chooseLevelHref="/learn/puzzle"
      chooseLevelLabel="Pilih Gambar Lain"
      chooseLevelIcon={<Grid className="w-5 h-5" />}
      homeHref="/learn"
      homeLabel="Kembali ke Menu Belajar"
    />
  );
}
