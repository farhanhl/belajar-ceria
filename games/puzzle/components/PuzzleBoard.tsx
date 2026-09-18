"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  PuzzleBoardSlot,
  PuzzleDifficulty,
  PuzzleGridConfig,
  PuzzleItem,
  PuzzlePiece as PuzzlePieceType,
} from "../types";
import { PuzzlePiece } from "./PuzzlePiece";
import { PuzzleArtwork } from "./PuzzleArtwork";
import { motion } from "motion/react";
import { Sparkles, Check, X } from "lucide-react";

interface BoardSlotProps {
  slot: PuzzleBoardSlot;
  puzzle: PuzzleItem;
  grid: PuzzleGridConfig;
  piece?: PuzzlePieceType;
  selectedPieceId: string | null;
  isShaking?: boolean;
  shakingPiece?: PuzzlePieceType | null;
  onSelectSlot: (slotIndex: number) => void;
  onSelectPlacedPiece: (pieceId: string) => void;
}

function BoardSlot({
  slot,
  puzzle,
  grid,
  piece,
  selectedPieceId,
  isShaking = false,
  shakingPiece,
  onSelectSlot,
  onSelectPlacedPiece,
}: BoardSlotProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: `slot_${slot.slotIndex}`,
    data: { slotIndex: slot.slotIndex, slot },
  });

  const isSelected = piece ? selectedPieceId === piece.id : false;
  const displayPiece = piece || (isShaking ? shakingPiece : undefined);

  return (
    <motion.div
      ref={setNodeRef}
      animate={
        isShaking
          ? {
              x: [-10, 10, -8, 8, -4, 4, 0],
              rotate: [-3, 3, -2, 2, 0],
            }
          : false
      }
      transition={{ duration: 0.45 }}
      onClick={() => {
        if (selectedPieceId && !slot.isCorrect) {
          onSelectSlot(slot.slotIndex);
        } else if (piece && !slot.isCorrect) {
          onSelectPlacedPiece(piece.id);
        }
      }}
      className={`relative aspect-square w-full h-full rounded-2xl transition-all flex items-center justify-center select-none overflow-hidden ${
        slot.isCorrect
          ? "border-2 border-emerald-400 bg-white shadow-md ring-2 ring-emerald-200"
          : isShaking
          ? "border-2 border-rose-500 bg-rose-100 ring-4 ring-rose-300"
          : isOver
          ? "border-2 border-amber-400 bg-amber-100/60 scale-102 ring-4 ring-amber-300"
          : selectedPieceId
          ? "border-2 border-dashed border-sky-400/80 bg-white/40 hover:bg-sky-50 cursor-pointer animate-pulse"
          : "border-2 border-dashed border-slate-300/80 bg-white/30 hover:bg-white/50"
      }`}
    >
      {/* Placed Piece or Temporary Shaking Piece */}
      {displayPiece ? (
        <PuzzlePiece
          piece={displayPiece}
          puzzle={puzzle}
          grid={grid}
          isSelected={isSelected}
          isPlaced={true}
          isCorrect={slot.isCorrect}
          isDraggable={false}
          onSelect={() => {
            if (!slot.isCorrect && piece) onSelectPlacedPiece(piece.id);
          }}
          disabled={true}
        />
      ) : (
        /* Empty Slot Helper */
        <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 font-bold text-xs opacity-60">
          <span>{slot.slotIndex + 1}</span>
        </div>
      )}

      {/* Correct Snap Checkmark indicator */}
      {slot.isCorrect && (
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          className="absolute top-2 right-2 bg-emerald-500 text-white rounded-full p-1 shadow-lg z-30 pointer-events-none"
        >
          <Check className="w-3.5 h-3.5 stroke-[3]" />
        </motion.div>
      )}

      {/* Error Shake X indicator */}
      {isShaking && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="absolute top-2 right-2 bg-rose-500 text-white rounded-full p-1 shadow-lg z-30 pointer-events-none"
        >
          <X className="w-3.5 h-3.5 stroke-[3]" />
        </motion.div>
      )}
    </motion.div>
  );
}

interface PuzzleBoardProps {
  puzzle: PuzzleItem;
  difficulty: PuzzleDifficulty;
  grid: PuzzleGridConfig;
  boardSlots: PuzzleBoardSlot[];
  pieces: PuzzlePieceType[];
  selectedPieceId: string | null;
  shakingSlotIndex?: number | null;
  shakingPiece?: PuzzlePieceType | null;
  isShowingHint: boolean;
  onSelectSlot: (slotIndex: number) => void;
  onSelectPlacedPiece: (pieceId: string) => void;
  className?: string;
}

export function PuzzleBoard({
  puzzle,
  difficulty,
  grid,
  boardSlots,
  pieces,
  selectedPieceId,
  shakingSlotIndex,
  shakingPiece,
  isShowingHint,
  onSelectSlot,
  onSelectPlacedPiece,
  className = "",
}: PuzzleBoardProps) {
  const showGhost = difficulty === "easy" || isShowingHint;

  return (
    <div
      className={`relative w-full max-w-[420px] mx-auto aspect-square rounded-3xl p-3 sm:p-4 bg-white/80 backdrop-blur-md shadow-2xl border-4 border-amber-300/80 overflow-hidden ${className}`}
    >
      {/* Ghost Background Image Guide */}
      {showGhost && (
        <div
          className={`absolute inset-0 p-3 sm:p-4 pointer-events-none transition-opacity duration-300 ${
            isShowingHint ? "opacity-60" : "opacity-25"
          }`}
        >
          <div className="w-full h-full rounded-2xl overflow-hidden">
            <PuzzleArtwork artworkId={puzzle.artworkId} />
          </div>
        </div>
      )}

      {/* Grid Container */}
      <div
        className="w-full h-full grid gap-2 sm:gap-3 relative z-10"
        style={{
          gridTemplateColumns: `repeat(${grid.cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${grid.rows}, minmax(0, 1fr))`,
        }}
      >
        {boardSlots.map((slot) => {
          const placedPiece = slot.placedPieceId
            ? pieces.find((p) => p.id === slot.placedPieceId)
            : undefined;

          const isSlotShaking = shakingSlotIndex === slot.slotIndex;

          return (
            <BoardSlot
              key={slot.slotIndex}
              slot={slot}
              puzzle={puzzle}
              grid={grid}
              piece={placedPiece}
              selectedPieceId={selectedPieceId}
              isShaking={isSlotShaking}
              shakingPiece={isSlotShaking ? shakingPiece : undefined}
              onSelectSlot={onSelectSlot}
              onSelectPlacedPiece={onSelectPlacedPiece}
            />
          );
        })}
      </div>
    </div>
  );
}
