"use client";

import React, { useState } from "react";
import { ALPHABET_DATA } from "../data/alphabet-data";
import { LetterItem } from "../types";
import { LetterCard } from "./LetterCard";
import { LetterDetailModal } from "./LetterDetailModal";

export function AlphabetGrid() {
  const [selectedLetter, setSelectedLetter] = useState<LetterItem | null>(null);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4">
        {ALPHABET_DATA.map((item) => (
          <LetterCard
            key={item.letter}
            item={item}
            onClick={(letter) => setSelectedLetter(letter)}
          />
        ))}
      </div>

      {/* Modal Popup for Selected Letter */}
      <LetterDetailModal
        letter={selectedLetter}
        onClose={() => setSelectedLetter(null)}
        onNavigate={(letter) => setSelectedLetter(letter)}
      />
    </div>
  );
}
