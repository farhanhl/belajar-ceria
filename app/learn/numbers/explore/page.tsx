"use client";

import React from "react";
import { NUMBERS_CATALOG } from "@/games/numbers/data/numbers-data";
import { NumberExploreCard } from "@/games/numbers/components/NumberExploreCard";
import { ChildNavbar } from "@/components/navigation/ChildNavbar";
import { Teacher } from "@/components/teacher/Teacher";
import { ChildButton } from "@/components/ui/ChildButton";
import { useProfileStore } from "@/stores/profile-store";
import { ArrowLeft, Binary } from "lucide-react";
import Link from "next/link";

export default function NumbersExplorePage() {
  const { activeProfile } = useProfileStore();
  const childName = activeProfile?.name || "Teman";

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <ChildNavbar />

      <main className="flex-1 max-w-6xl w-full mx-auto space-y-6 py-8">
        {/* Top Header */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <Link href="/learn/numbers">
            <ChildButton variant="secondary" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali</span>
            </ChildButton>
          </Link>

          <div className="inline-flex items-center gap-2 bg-amber-200 text-amber-950 font-black px-4 py-1.5 rounded-full text-sm shadow-sm">
            <Binary className="w-4 h-4" />
            <span>Mengenal Angka 1 sampai 10</span>
          </div>
        </div>

        {/* Teacher Avatar Feedback */}
        <Teacher
          expression="happy"
          message={`Ayo sentuh angka di bawah ini, ${childName}! Dengarkan cara membacanya dan hitung buah-buahan manisnya bersama Ibu Guru!`}
          className="w-full"
        />

        {/* Numbers Grid 1 to 10 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {NUMBERS_CATALOG.map((item) => (
            <NumberExploreCard key={item.number} item={item} />
          ))}
        </div>
      </main>
    </div>
  );
}
