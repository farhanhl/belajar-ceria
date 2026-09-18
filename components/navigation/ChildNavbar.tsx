"use client";

import React from "react";
import Link from "next/link";
import { useProfileStore } from "@/stores/profile-store";
import { useSettingsStore } from "@/stores/settings-store";
import { ChildAvatar } from "@/components/profile/ChildAvatar";
import { Star, Trophy, Settings, Users, Sparkles } from "lucide-react";
import { motion } from "motion/react";

import Image from "next/image";

interface ChildNavbarProps {
  showControls?: boolean;
}

export function ChildNavbar({ showControls = true }: ChildNavbarProps) {
  const { activeProfile } = useProfileStore();
  const { language } = useSettingsStore();

  // Calculate total stars across all difficulty levels for matching game
  const totalStars = activeProfile
    ? (activeProfile.progress?.matching?.easy?.stars || 0) +
      (activeProfile.progress?.matching?.medium?.stars || 0) +
      (activeProfile.progress?.matching?.hard?.stars || 0)
    : 0;

  const currentLevel = activeProfile
    ? Math.max(
        activeProfile.progress?.matching?.easy?.currentLevel || 1,
        activeProfile.progress?.matching?.medium?.currentLevel || 1,
        activeProfile.progress?.matching?.hard?.currentLevel || 1
      )
    : 1;

  return (
    <header className="w-full bg-white/90 backdrop-blur-md border-b-4 border-amber-200 sticky top-0 z-40 px-4 sm:px-8 py-2.5 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Logo / Home */}
        <Link href="/learn" className="flex items-center gap-3 group">
          <div className="p-1 rounded-2xl bg-white/95 border-2 border-amber-300 shadow-sm flex items-center justify-center overflow-hidden group-hover:scale-105 group-hover:border-amber-400 group-hover:shadow transition-all shrink-0">
            <Image
              src="/logo.png"
              alt="Logo Belajar Ceria"
              width={52}
              height={52}
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
              priority
            />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent">
              Belajar Ceria
            </span>
            <span className="hidden md:block text-xs font-bold text-amber-700">
              Belajar jadi menyenangkan!
            </span>
          </div>
        </Link>

        {/* Profile Stats & Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {activeProfile && (
            <div className="flex items-center gap-2 sm:gap-3 bg-amber-50 border-2 border-amber-300 rounded-2xl px-3 py-1.5 shadow-inner">
              <ChildAvatar avatarId={activeProfile.avatar} size={36} />
              <div className="hidden sm:block text-left pr-1">
                <p className="text-sm font-extrabold text-amber-950 leading-tight">
                  {activeProfile.name}
                </p>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
                  <span className="flex items-center gap-0.5 text-amber-600">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    {totalStars}
                  </span>
                  <span className="flex items-center gap-0.5 text-orange-600">
                    <Trophy className="w-3.5 h-3.5 text-orange-500" />
                    Lvl {currentLevel}
                  </span>
                </div>
              </div>
            </div>
          )}

          {showControls && (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Link
                href="/profiles"
                className="p-2 sm:p-2.5 bg-sky-100 hover:bg-sky-200 text-sky-800 rounded-2xl transition-all shadow-sm flex items-center justify-center"
                title="Ganti Profil Anak"
                aria-label="Ganti Profil Anak"
              >
                <Users className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>
              <Link
                href="/settings"
                className="p-2 sm:p-2.5 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-2xl transition-all shadow-sm flex items-center justify-center"
                title="Pengaturan"
                aria-label="Pengaturan"
              >
                <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
