"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useMemoryGameStore } from "@/stores/memory-game-store";
import { useProfileStore } from "@/stores/profile-store";
import { useSettingsStore } from "@/stores/settings-store";
import { ChildNavbar } from "@/components/navigation/ChildNavbar";
import { Teacher } from "@/components/teacher/Teacher";
import { ChildButton } from "@/components/ui/ChildButton";
import { MemoryBoard } from "@/games/memory/components/MemoryBoard";
import { soundFx } from "@/lib/audio/sound-fx";
import { ttsService } from "@/lib/tts/tts";
import { Sparkles, Brain, CheckCircle2, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

export default function MemoryPlayPage() {
  const router = useRouter();
  const {
    cards,
    difficulty,
    themeId,
    matchedPairCount,
    totalPairCount,
    movesCount,
    isCompleted,
    isLocked,
    lastResult,
    flipCard,
    startGame,
    endGameEarly,
  } = useMemoryGameStore();

  const { activeProfile, recordMemoryResult } = useProfileStore();
  const { language, soundEnabled, volume } = useSettingsStore();

  const hasRecordedRef = useRef(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string>(
    "Ketuk dua kartu untuk mencari pasangan gambar yang sama!"
  );
  const [feedbackSubMessage, setFeedbackSubMessage] = useState<string | undefined>(
    undefined
  );

  // Redirect back if game is empty AND not completed (avoid race with completion nav)
  useEffect(() => {
    if (cards.length === 0 && !isCompleted) {
      router.replace("/learn/memory");
    }
  }, [cards.length, isCompleted, router]);

  // Safety fallback: navigate immediately when isCompleted becomes true
  useEffect(() => {
    if (!isCompleted || !lastResult) return;
    router.replace("/learn/memory/result");
  }, [isCompleted, lastResult, router]);

  const handleCardFlip = (instanceId: string) => {
    if (soundEnabled) soundFx.playClick(volume);

    flipCard(
      instanceId,
      // onMatch callback
      (matchedCard, isGameDone, finalResult) => {
        if (soundEnabled) soundFx.playCorrect(volume);

        const cardName = matchedCard.name[language] || matchedCard.name.id;
        setFeedbackMessage(`Wah, cocok! Pasangan ${cardName} ditemukan! 🎉`);
        setFeedbackSubMessage(
          isGameDone
            ? "Luar biasa! Semua pasangan berhasil kamu temukan!"
            : "Bagus sekali! Ayo cari pasangan lainnya!"
        );

        // Pronounce matched card safely
        try {
          ttsService.speak({
            text: `Cocok! ${matchedCard.speechText[language] || matchedCard.speechText.id}`,
            language,
            volume,
          });
        } catch {
          // ignore tts error
        }

        // Direct completion trigger — record result immediately
        if (isGameDone && finalResult) {
          if (!hasRecordedRef.current) {
            hasRecordedRef.current = true;
            const currentProfile = useProfileStore.getState().activeProfile;
            if (currentProfile) {
              useProfileStore.getState().recordMemoryResult({
                profileId: currentProfile.id,
                difficulty: finalResult.difficulty,
                totalPairs: finalResult.totalPairs,
                matchedPairs: finalResult.matchedPairs,
                movesCount: finalResult.movesCount,
                starsEarned: finalResult.starsEarned,
                completedAt: finalResult.completedAt,
              });
            }
          }
          // Navigate immediately — the useEffect fallback will also fire but router.replace is idempotent
          router.replace("/learn/memory/result");
        }
      },
      // onMismatch callback
      () => {
        if (soundEnabled) soundFx.playIncorrect(volume * 0.7);
        setFeedbackMessage("Belum cocok, ingat-ingat posisinya ya! 🤔");
        setFeedbackSubMessage("Coba lagi di giliran berikutnya!");
      }
    );
  };

  const handleFinishEarly = () => {
    if (soundEnabled) soundFx.playClick(volume);
    const result = endGameEarly();
    if (result && !hasRecordedRef.current) {
      hasRecordedRef.current = true;
      const currentProfile = useProfileStore.getState().activeProfile;
      if (currentProfile) {
        useProfileStore.getState().recordMemoryResult({
          profileId: currentProfile.id,
          difficulty: result.difficulty,
          totalPairs: result.totalPairs,
          matchedPairs: result.matchedPairs,
          movesCount: result.movesCount,
          starsEarned: result.starsEarned,
          completedAt: result.completedAt,
        });
      }
    }
    router.push("/learn/memory/result");
  };

  const handleRestart = () => {
    if (soundEnabled) soundFx.playClick(volume);
    hasRecordedRef.current = false;
    startGame(themeId, difficulty);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between pb-8">
      <ChildNavbar />

      <main className="flex-1 max-w-6xl w-full mx-auto py-8 flex flex-col items-center justify-between space-y-6">
        {/* Top Stats Bar */}
        <div className="w-full flex items-center justify-between gap-3 bg-white/95 rounded-3xl p-3 sm:p-4 shadow-lg border-2 border-purple-200">
          {/* Matched Pairs Counter */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800">
              <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-[10px] sm:text-xs font-black uppercase text-emerald-800 block">
                Pasangan
              </span>
              <span className="text-base sm:text-lg font-black text-emerald-950">
                {matchedPairCount} / {totalPairCount}
              </span>
            </div>
          </div>

          {/* Moves Counter */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-800">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] sm:text-xs font-black uppercase text-purple-800 block">
                Langkah
              </span>
              <span className="text-base sm:text-lg font-black text-purple-950">
                {movesCount}
              </span>
            </div>
          </div>

          {/* Restart Button */}
          <button
            onClick={handleRestart}
            className="p-2.5 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition cursor-pointer flex items-center gap-1.5 text-xs font-black"
            title="Mulai Ulang"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Ulangi</span>
          </button>
        </div>

        {/* Teacher Feedback Avatar */}
        <Teacher
          expression="happy"
          message={feedbackMessage}
          subMessage={feedbackSubMessage}
          className="w-full"
        />

        {/* The Memory Board */}
        <div className="w-full flex-1 flex items-center justify-center py-2">
          <MemoryBoard
            cards={cards}
            difficulty={difficulty}
            onFlipCard={handleCardFlip}
            disabled={isLocked || isCompleted}
          />
        </div>

        {/* Bottom Action Bar */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-purple-100">
          <Link href="/learn/memory">
            <ChildButton variant="secondary" size="md" className="gap-2 text-slate-700">
              <Home className="w-4 h-4" />
              <span>Ganti Tema / Level</span>
            </ChildButton>
          </Link>

          {/* Selesai Bermain Button */}
          <ChildButton
            variant="primary"
            size="md"
            icon={<Sparkles className="w-5 h-5 fill-amber-950" />}
            onClick={handleFinishEarly}
            className="w-full sm:w-auto shadow-md"
          >
            Selesai Bermain ✨
          </ChildButton>
        </div>
      </main>
    </div>
  );
}
