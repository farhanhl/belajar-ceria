"use client";

import React from "react";
import { ChildNavbar } from "@/components/navigation/ChildNavbar";
import { MatchingBoard } from "@/games/matching/components/MatchingBoard";

export default function MatchingPlayPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <ChildNavbar showControls={false} />
      <main className="flex-1 max-w-6xl w-full mx-auto py-8 flex flex-col justify-center">
        <MatchingBoard />
      </main>
    </div>
  );
}
