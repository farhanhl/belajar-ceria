"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { usePuzzleGameStore } from "@/stores/puzzle-game-store";
import { useProfileStore } from "@/stores/profile-store";
import { useSettingsStore } from "@/stores/settings-store";
import { ChildNavbar } from "@/components/navigation/ChildNavbar";
import { Teacher } from "@/components/teacher/Teacher";
import { TeacherExpression } from "@/components/teacher/TeacherAvatar";
import { ChildButton } from "@/components/ui/ChildButton";
import { PuzzleBoard } from "@/games/puzzle/components/PuzzleBoard";
import { PuzzleTray } from "@/games/puzzle/components/PuzzleTray";
import { PuzzlePiece } from "@/games/puzzle/components/PuzzlePiece";
import { PuzzleHintModal } from "@/games/puzzle/components/PuzzleHintModal";
import { PuzzlePiece as PuzzlePieceType } from "@/games/puzzle/types";
import { soundFx } from "@/lib/audio/sound-fx";
import { ttsService } from "@/lib/tts/tts";
import { motion } from "motion/react";
import { ArrowLeft, Eye, Shuffle, RotateCcw, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function PuzzlePlayPage() {
  const router = useRouter();
  const {
    puzzle,
    difficulty,
    grid,
    pieces,
    trayPieces,
    boardSlots,
    selectedPieceId,
    movesCount,
    isShowingHint,
    isCompleted,
    lastResult,
    selectPiece,
    placePieceInSlot,
    returnPieceToTray,
    shuffleTray,
    toggleHint,
    resetCurrentPuzzle,
    finishPuzzle,
  } = usePuzzleGameStore();

  const { activeProfile, recordPuzzleResult } = useProfileStore();
  const { soundEnabled, autoTts, volume } = useSettingsStore();

  const [activeDragPiece, setActiveDragPiece] = useState<PuzzlePieceType | null>(null);
  const [shakingSlotIndex, setShakingSlotIndex] = useState<number | null>(null);
  const [shakingPiece, setShakingPiece] = useState<PuzzlePieceType | null>(null);
  const [teacherExpression, setTeacherExpression] = useState<TeacherExpression>("idle");
  const [teacherMessage, setTeacherMessage] = useState<string>("");
  const [isHintModalOpen, setIsHintModalOpen] = useState(false);

  const hasRecordedRef = useRef(false);
  const childName = activeProfile?.name || "Teman";

  // Configure sensors for touch and mouse
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 40,
      tolerance: 8,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  // Check if puzzle is loaded, else redirect back to selection
  useEffect(() => {
    if (!puzzle) {
      router.push("/learn/puzzle");
      return;
    }

    hasRecordedRef.current = false;
    const welcomeMsg = `Ayo bantu Ibu Guru menyusun puzzle ${puzzle.title.id} ini ya, ${childName}!`;
    setTeacherMessage(welcomeMsg);
    setTeacherExpression("happy");

    if (autoTts) {
      ttsService.speak({ text: welcomeMsg, language: "id", volume });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [puzzle?.id]);

  if (!puzzle) return null;

  // DND Handlers
  const handleDragStart = (event: DragStartEvent) => {
    const piece = event.active.data.current?.piece as PuzzlePieceType | undefined;
    if (piece) {
      setActiveDragPiece(piece);
      selectPiece(piece.id);
      if (soundEnabled) soundFx.playClick(volume * 0.5);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    setActiveDragPiece(null);

    if (!over) {
      return;
    }

    const slotIndex = over.data.current?.slotIndex as number | undefined;
    const piece = active.data.current?.piece as PuzzlePieceType | undefined;

    if (slotIndex !== undefined && piece) {
      handleAttemptPlacement(piece.id, slotIndex);
    }
  };

  const handleAttemptPlacement = (pieceId: string, slotIndex: number) => {
    const piece = pieces.find((p) => p.id === pieceId);
    const result = placePieceInSlot(pieceId, slotIndex);

    if (result.success) {
      if (result.isCorrect) {
        setShakingSlotIndex(null);
        setShakingPiece(null);
        if (soundEnabled) soundFx.playPieceSnap(volume);

        if (result.isComplete) {
          // Play celebration and record result once
          if (soundEnabled) soundFx.playCelebration(volume);
          setTeacherExpression("celebrating");
          setTeacherMessage(`Luar biasa, ${childName}! Kamu berhasil menyusun semua kepingan puzzle!`);

          if (activeProfile && !hasRecordedRef.current) {
            hasRecordedRef.current = true;
            const res = finishPuzzle();
            if (res) {
              recordPuzzleResult({
                profileId: activeProfile.id,
                difficulty: res.difficulty,
                totalPieces: res.totalPieces,
                movesCount: res.movesCount,
                hintsUsed: res.hintsUsed,
                starsEarned: res.starsEarned,
                completedAt: res.completedAt,
              });
            }
          }

          setTimeout(() => {
            router.push("/learn/puzzle/result");
          }, 1200);
          return;
        }

        setTeacherExpression("celebrating");
        const praises = [
          "Pintar sekali! Pas di tempatnya!",
          "Hebat! Lanjutkan kepingan berikutnya!",
          "Wah, tepat sekali!",
          "Bagus sekali, sedikit lagi selesai!",
        ];
        const randomPraise = praises[Math.floor(Math.random() * praises.length)];
        setTeacherMessage(randomPraise);
      } else {
        // Wrong placement -> trigger shake animation and return piece to tray
        if (soundEnabled) soundFx.playIncorrect(volume);
        setTeacherExpression("thinking");
        const encMessages = [
          "Hampir tepat! Coba cari kotak yang cocok ya!",
          "Yuk coba kepingan ini di kotak yang lain!",
          "Tidak apa-apa, ayo perhatikan gambarnya lagi!",
        ];
        const randomEnc = encMessages[Math.floor(Math.random() * encMessages.length)];
        setTeacherMessage(randomEnc);

        if (piece) {
          setShakingPiece(piece);
        }
        setShakingSlotIndex(slotIndex);

        setTimeout(() => {
          setShakingSlotIndex(null);
          setShakingPiece(null);
        }, 500);
      }
    }
  };

  const handleSelectSlotForTap = (slotIndex: number) => {
    if (selectedPieceId) {
      handleAttemptPlacement(selectedPieceId, slotIndex);
    }
  };

  const handleSelectPlacedPiece = (pieceId: string) => {
    // If piece was already placed and clicked, select it or return to tray
    selectPiece(selectedPieceId === pieceId ? null : pieceId);
    if (soundEnabled) soundFx.playClick(volume);
  };

  const handleOpenHint = () => {
    if (soundEnabled) soundFx.playClick(volume);
    toggleHint(true);
    setIsHintModalOpen(true);
  };

  const handleFinishEarly = () => {
    if (soundEnabled) soundFx.playCelebration(volume * 0.7);

    // Calculate correctly placed pieces so far
    const correctCount = boardSlots.filter((s) => s.isCorrect).length;
    const res = finishPuzzle(correctCount);

    if (activeProfile && res && !hasRecordedRef.current) {
      hasRecordedRef.current = true;
      recordPuzzleResult({
        profileId: activeProfile.id,
        difficulty: res.difficulty,
        totalPieces: res.totalPieces,
        movesCount: res.movesCount,
        hintsUsed: res.hintsUsed,
        starsEarned: res.starsEarned,
        completedAt: res.completedAt,
      });
    }

    router.push("/learn/puzzle/result");
  };

  const handleDragCancel = () => {
    setActiveDragPiece(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="min-h-screen flex flex-col justify-between">
        <ChildNavbar />

        <main className="flex-1 max-w-6xl w-full mx-auto space-y-6 py-8">
          {/* Top Actions & Info Bar */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <Link href="/learn/puzzle">
              <ChildButton variant="secondary" size="sm" className="gap-1.5">
                <ArrowLeft className="w-4 h-4" />
                <span>Pilih Gambar</span>
              </ChildButton>
            </Link>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-white/90 text-amber-950 font-black px-3.5 py-1.5 rounded-full text-xs sm:text-sm shadow-sm border border-amber-200">
                Langkah: <strong className="text-amber-600">{movesCount}</strong>
              </span>

              <span
                className={`font-black px-3.5 py-1.5 rounded-full text-xs sm:text-sm text-white shadow-sm ${
                  difficulty === "easy"
                    ? "bg-emerald-500"
                    : difficulty === "medium"
                    ? "bg-amber-500"
                    : "bg-rose-500"
                }`}
              >
                {difficulty === "easy"
                  ? "Mudah (4 Pcs)"
                  : difficulty === "medium"
                  ? "Sedang (6 Pcs)"
                  : "Sulit (9 Pcs)"}
              </span>
            </div>
          </div>

          {/* Teacher Guide Avatar */}
          <Teacher
            expression={teacherExpression}
            message={teacherMessage}
            className="w-full"
          />

          {/* Arena Layout (Board + Tray) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left: Puzzle Target Board */}
            <div className="md:col-span-7 flex flex-col items-center justify-center space-y-3">
              <PuzzleBoard
                puzzle={puzzle}
                difficulty={difficulty}
                grid={grid}
                boardSlots={boardSlots}
                pieces={pieces}
                selectedPieceId={selectedPieceId}
                shakingSlotIndex={shakingSlotIndex}
                shakingPiece={shakingPiece}
                isShowingHint={isShowingHint}
                onSelectSlot={handleSelectSlotForTap}
                onSelectPlacedPiece={handleSelectPlacedPiece}
              />

              {/* Action Toolbar */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
                <button
                  onClick={handleOpenHint}
                  className="inline-flex items-center gap-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 font-extrabold px-3.5 py-2 rounded-2xl text-xs sm:text-sm shadow-sm transition-transform active:scale-95"
                >
                  <Eye className="w-4 h-4 text-amber-600" />
                  <span>Intip Gambar 👁️</span>
                </button>

                <button
                  onClick={() => {
                    if (soundEnabled) soundFx.playClick(volume);
                    shuffleTray();
                  }}
                  className="inline-flex items-center gap-1.5 bg-sky-100 hover:bg-sky-200 text-sky-900 font-extrabold px-3.5 py-2 rounded-2xl text-xs sm:text-sm shadow-sm transition-transform active:scale-95"
                >
                  <Shuffle className="w-4 h-4 text-sky-600" />
                  <span>Acak Kepingan 🔄</span>
                </button>

                <button
                  onClick={() => {
                    if (soundEnabled) soundFx.playClick(volume);
                    resetCurrentPuzzle();
                  }}
                  className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold px-3.5 py-2 rounded-2xl text-xs sm:text-sm shadow-sm transition-transform active:scale-95"
                >
                  <RotateCcw className="w-4 h-4 text-slate-600" />
                  <span>Mulai Ulang 🔁</span>
                </button>
              </div>
            </div>

            {/* Right: Piece Tray & Finish Button */}
            <div className="md:col-span-5 space-y-3">
              <PuzzleTray
                pieces={trayPieces}
                puzzle={puzzle}
                grid={grid}
                selectedPieceId={selectedPieceId}
                onSelectPiece={(pieceId) => {
                  selectPiece(selectedPieceId === pieceId ? null : pieceId);
                  if (soundEnabled) soundFx.playClick(volume);
                }}
              />

              {/* Selesai Bermain Button placed directly under the tray */}
              <div className="pt-1">
                <ChildButton
                  variant="success"
                  size="md"
                  onClick={handleFinishEarly}
                  className="w-full gap-2 text-base font-black shadow-lg hover:scale-[1.02] transition-transform"
                >
                  <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                  <span>Selesai Bermain ✨</span>
                </ChildButton>
              </div>
            </div>
          </div>
        </main>

        {/* Drag Overlay for smooth movement */}
        <DragOverlay>
          {activeDragPiece ? (
            <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-amber-400 rotate-3 scale-110 bg-white">
              <PuzzlePiece
                piece={activeDragPiece}
                puzzle={puzzle}
                grid={grid}
                isDraggable={false}
                disabled={true}
              />
            </div>
          ) : null}
        </DragOverlay>

        {/* Hint Modal */}
        <PuzzleHintModal
          isOpen={isHintModalOpen}
          puzzle={puzzle}
          onClose={() => {
            setIsHintModalOpen(false);
            toggleHint(false);
          }}
        />
      </div>
    </DndContext>
  );
}
