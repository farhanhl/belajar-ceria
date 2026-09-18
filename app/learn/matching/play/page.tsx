"use client";

import React from "react";
import { ChildNavbar } from "@/components/navigation/ChildNavbar";
import { MatchingBoard } from "@/games/matching/components/MatchingBoard";

export default function MatchingPlayPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <ChildNavbar showControls={false} />
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-8 flex flex-col justify-center">
        <MatchingBoard />
      </main>
    </div>
  );
}
