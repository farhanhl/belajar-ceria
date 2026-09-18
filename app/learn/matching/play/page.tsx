"use client";

import React from "react";
import { ChildNavbar } from "@/components/navigation/ChildNavbar";
import { MatchingBoard } from "@/games/matching/components/MatchingBoard";

export default function MatchingPlayPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <ChildNavbar showControls={false} />
      <main className="flex-1 max-w-6xl w-full mx-auto space-y-3 sm:space-y-4 py-3 sm:py-4 px-3 sm:px-6 flex flex-col justify-center">
        <MatchingBoard />
      </main>
    </div>
  );
}
