"use client";

import React from "react";
import { ChildNavbar } from "@/components/navigation/ChildNavbar";
import { LetterQuizBoard } from "@/games/letters/components/LetterQuizBoard";

export default function LetterPlayPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <ChildNavbar showControls={false} />

      <main className="flex-1 max-w-6xl w-full mx-auto py-8 flex flex-col justify-center">
        <LetterQuizBoard />
      </main>
    </div>
  );
}
