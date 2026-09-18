"use client";

import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { PuzzleArtwork } from "./PuzzleArtwork";
import { PuzzleGridConfig, PuzzleItem, PuzzlePiece as PuzzlePieceType } from "../types";
import { motion } from "motion/react";

interface PuzzlePieceProps {
  piece: PuzzlePieceType;
  puzzle: PuzzleItem;
  grid: PuzzleGridConfig;
  isSelected?: boolean;
  isPlaced?: boolean;
  isCorrect?: boolean;
  isDraggable?: boolean;
  onSelect?: () => void;
  disabled?: boolean;
  className?: string;
}

// Pure visual sliced artwork view
function PieceSliceView({
  piece,
  puzzle,
  grid,
}: {
  piece: PuzzlePieceType;
  puzzle: PuzzleItem;
  grid: PuzzleGridConfig;
}) {
  const widthPercent = grid.cols * 100;
  const heightPercent = grid.rows * 100;
  const leftPercent = -(piece.correctCol * 100);
  const topPercent = -(piece.correctRow * 100);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <div
        className="absolute"
        style={{
          width: `${widthPercent}%`,
          height: `${heightPercent}%`,
          left: `${leftPercent}%`,
          top: `${topPercent}%`,
        }}
      >
        <PuzzleArtwork artworkId={puzzle.artworkId} />
      </div>
      <div className="absolute inset-0 rounded-2xl border-2 border-white/50 pointer-events-none" />
    </div>
  );
}

// Draggable piece component (used exclusively inside PuzzleTray)
function DraggablePiece({
  piece,
  puzzle,
  grid,
  isSelected = false,
  onSelect,
  disabled = false,
  className = "",
}: {
  piece: PuzzlePieceType;
  puzzle: PuzzleItem;
  grid: PuzzleGridConfig;
  isSelected?: boolean;
  onSelect?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: piece.id,
    data: { piece },
    disabled,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={(e) => {
        if (!disabled && onSelect) {
          e.stopPropagation();
          onSelect();
        }
      }}
      className={`touch-none relative w-full h-full aspect-square rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing transition-all select-none bg-white ${
        isDragging
          ? "opacity-30 scale-95 border-2 border-dashed border-amber-400"
          : "shadow-md hover:shadow-lg hover:scale-102"
      } ${
        isSelected
          ? "ring-4 ring-amber-400 ring-offset-2 scale-105 shadow-xl animate-pulse z-20"
          : ""
      } ${className}`}
    >
      <PieceSliceView piece={piece} puzzle={puzzle} grid={grid} />
    </div>
  );
}

// Main PuzzlePiece Component
export function PuzzlePiece({
  piece,
  puzzle,
  grid,
  isSelected = false,
  isPlaced = false,
  isCorrect = false,
  isDraggable = true,
  onSelect,
  disabled = false,
  className = "",
}: PuzzlePieceProps) {
  const shouldEnableDrag = isDraggable && !disabled && !isCorrect && !isPlaced;

  if (shouldEnableDrag) {
    return (
      <DraggablePiece
        piece={piece}
        puzzle={puzzle}
        grid={grid}
        isSelected={isSelected}
        onSelect={onSelect}
        disabled={disabled}
        className={className}
      />
    );
  }

  // Pure static piece (for BoardSlot, DragOverlay, hint preview)
  return (
    <div
      onClick={(e) => {
        if (!disabled && onSelect) {
          e.stopPropagation();
          onSelect();
        }
      }}
      className={`relative w-full h-full aspect-square rounded-2xl overflow-hidden select-none bg-white ${
        isSelected
          ? "ring-4 ring-amber-400 ring-offset-2 scale-105 shadow-xl animate-pulse z-20"
          : isPlaced && isCorrect
          ? "shadow-none"
          : "shadow-md"
      } ${className}`}
    >
      <PieceSliceView piece={piece} puzzle={puzzle} grid={grid} />

      {/* Placed correctly indicator flash */}
      {isCorrect && (
        <motion.div
          initial={{ opacity: 0.8, scale: 1.1 }}
          animate={{ opacity: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-white rounded-2xl pointer-events-none"
        />
      )}
    </div>
  );
}
