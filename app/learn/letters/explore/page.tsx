"use client";

import React from "react";
import { ChildNavbar } from "@/components/navigation/ChildNavbar";
import { Teacher } from "@/components/teacher/Teacher";
import { AlphabetGrid } from "@/games/letters/components/AlphabetGrid";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";

export default function LetterExplorePage() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <ChildNavbar />

      <main className="flex-1 max-w-6xl w-full mx-auto space-y-6 py-8">
        {/* Top Header */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/learn/letters"
            className="p-2.5 sm:px-4 sm:py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-2xl transition flex items-center gap-1.5 font-black text-sm sm:text-base shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali</span>
          </Link>

          <div className="text-right">
            <h1 className="text-2xl sm:text-4xl font-black text-amber-950 tracking-tight">
              Kartu Huruf A - Z
            </h1>
            <p className="text-xs sm:text-sm font-bold text-amber-700">
              Ketuk kartu untuk mendengarkan suara & melihat gambarnya!
            </p>
          </div>
        </div>

        {/* Teacher Guidance */}
        <Teacher
          expression="happy"
          message="Sentuh kartu huruf mana saja yang ingin kamu pelajari bersama Ibu Guru!"
        />

        {/* 26 Letters Grid */}
        <AlphabetGrid />
      </main>
    </div>
  );
}
