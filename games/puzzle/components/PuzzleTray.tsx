"use client";

import React from "react";
import { PuzzleGridConfig, PuzzleItem, PuzzlePiece as PuzzlePieceType } from "../types";
import { PuzzlePiece } from "./PuzzlePiece";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Layers } from "lucide-react";

interface PuzzleTrayProps {
  pieces: PuzzlePieceType[];
  puzzle: PuzzleItem;
  grid: PuzzleGridConfig;
  selectedPieceId: string | null;
  onSelectPiece: (pieceId: string) => void;
  className?: string;
}

export function PuzzleTray({
  pieces,
  puzzle,
  grid,
  selectedPieceId,
  onSelectPiece,
  className = "",
}: PuzzleTrayProps) {
  return (
    <div
      className={`w-full bg-white/85 backdrop-blur-md rounded-3xl p-4 sm:p-5 border-3 border-amber-200/80 shadow-lg ${className}`}
    >
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2 text-amber-950 font-black text-sm sm:text-base">
          <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
          <span>Baki Kepingan ({pieces.length})</span>
        </div>
        <span className="text-xs font-bold text-amber-800/80 bg-amber-100 px-2.5 py-1 rounded-full">
          Sentuh atau Tarik Kepingan
        </span>
      </div>

      {pieces.length === 0 ? (
        <div className="py-6 flex flex-col items-center justify-center text-center space-y-2 text-emerald-700">
          <Sparkles className="w-8 h-8 text-emerald-500 animate-spin" />
          <p className="font-extrabold text-sm sm:text-base">
            Semua kepingan sudah diletakkan di papan!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 max-h-[220px] overflow-y-auto p-1">
          <AnimatePresence>
            {pieces.map((piece) => {
              const isSelected = selectedPieceId === piece.id;
              return (
                <motion.div
                  key={piece.id}
                  layout
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <PuzzlePiece
                    piece={piece}
                    puzzle={puzzle}
                    grid={grid}
                    isSelected={isSelected}
                    onSelect={() => onSelectPiece(piece.id)}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
