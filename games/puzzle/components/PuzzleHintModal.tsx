"use client";

import React, { useEffect } from "react";
import { PuzzleItem } from "../types";
import { PuzzleArtwork } from "./PuzzleArtwork";
import { ChildButton } from "@/components/ui/ChildButton";
import { soundFx } from "@/lib/audio/sound-fx";
import { ttsService } from "@/lib/tts/tts";
import { useSettingsStore } from "@/stores/settings-store";
import { motion, AnimatePresence } from "motion/react";
import { X, Eye, Volume2 } from "lucide-react";

interface PuzzleHintModalProps {
  isOpen: boolean;
  puzzle: PuzzleItem;
  onClose: () => void;
}

export function PuzzleHintModal({ isOpen, puzzle, onClose }: PuzzleHintModalProps) {
  const { soundEnabled, autoTts, volume } = useSettingsStore();

  useEffect(() => {
    if (isOpen && autoTts) {
      ttsService.speak({
        text: `Ini dia gambar aslinya, ${puzzle.title.id}! Coba perhatikan bentuk dan posisinya ya!`,
        language: "id",
        volume,
      });
    }
  }, [isOpen, puzzle, autoTts, volume]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative max-w-sm w-full bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border-4 border-amber-400 space-y-4 text-center"
        >
          {/* Close button top right */}
          <button
            onClick={() => {
              if (soundEnabled) soundFx.playClick(volume);
              onClose();
            }}
            className="absolute -top-3 -right-3 bg-rose-500 hover:bg-rose-600 text-white p-2 rounded-full shadow-lg border-2 border-white transition-transform hover:scale-110"
          >
            <X className="w-5 h-5 stroke-[3]" />
          </button>

          {/* Title Header */}
          <div className="flex items-center justify-center gap-2">
            <Eye className="w-5 h-5 text-amber-600" />
            <h3 className="text-xl font-black text-amber-950">
              Contoh Gambar: {puzzle.title.id}
            </h3>
          </div>

          {/* Full Artwork Preview */}
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-inner border-2 border-amber-200">
            <PuzzleArtwork artworkId={puzzle.artworkId} />
          </div>

          <p className="text-xs sm:text-sm font-bold text-amber-800/80">
            {puzzle.description.id}
          </p>

          <ChildButton
            variant="success"
            size="md"
            onClick={() => {
              if (soundEnabled) soundFx.playClick(volume);
              onClose();
            }}
            className="w-full"
          >
            Saya Sudah Ingat! 👍
          </ChildButton>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
