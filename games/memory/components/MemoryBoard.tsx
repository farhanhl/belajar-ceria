"use client";

import React from "react";
import { MemoryCardInstance } from "../types";
import { MemoryCard } from "./MemoryCard";
import { Difficulty } from "@/types/game";

interface MemoryBoardProps {
  cards: MemoryCardInstance[];
  difficulty: Difficulty;
  onFlipCard: (instanceId: string) => void;
  disabled?: boolean;
}

export function MemoryBoard({
  cards,
  difficulty,
  onFlipCard,
  disabled = false,
}: MemoryBoardProps) {
  // Select responsive grid layout based on difficulty
  const gridClasses =
    difficulty === "easy"
      ? "grid-cols-2 max-w-sm gap-4"
      : difficulty === "medium"
      ? "grid-cols-3 max-w-md gap-3 sm:gap-4"
      : "grid-cols-3 sm:grid-cols-4 max-w-xl gap-2.5 sm:gap-3.5";

  return (
    <div className={`grid w-full mx-auto justify-center items-center ${gridClasses}`}>
      {cards.map((card) => (
        <MemoryCard
          key={card.instanceId}
          card={card}
          onFlip={onFlipCard}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
