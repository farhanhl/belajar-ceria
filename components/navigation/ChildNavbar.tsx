"use client";

import React from "react";
import Link from "next/link";
import { useProfileStore } from "@/stores/profile-store";
import { useSettingsStore } from "@/stores/settings-store";
import { ChildAvatar } from "@/components/profile/ChildAvatar";
import { Star, Trophy, Settings, Users, Music2, Music } from "lucide-react";
import { getTranslation } from "@/lib/i18n";
import { soundFx } from "@/lib/audio/sound-fx";
import Image from "next/image";

interface ChildNavbarProps {
  showControls?: boolean;
}

export function ChildNavbar({ showControls = true }: ChildNavbarProps) {
  const { activeProfile } = useProfileStore();
  const { language, musicEnabled, setMusicEnabled, soundEnabled, volume } = useSettingsStore();

  const handleToggleMusic = () => {
    const next = !musicEnabled;
    setMusicEnabled(next);
    if (soundEnabled) soundFx.playClick(volume);
  };

  // Calculate total stars across all games
  const matchingStars = activeProfile
    ? (activeProfile.progress?.matching?.easy?.stars || 0) +
      (activeProfile.progress?.matching?.medium?.stars || 0) +
      (activeProfile.progress?.matching?.hard?.stars || 0)
    : 0;

  const lettersStars = activeProfile
    ? (activeProfile.progress?.letters?.easy?.stars || 0) +
      (activeProfile.progress?.letters?.medium?.stars || 0) +
      (activeProfile.progress?.letters?.hard?.stars || 0)
    : 0;

  const puzzleStars = activeProfile
    ? (activeProfile.progress?.puzzle?.easy?.stars || 0) +
      (activeProfile.progress?.puzzle?.medium?.stars || 0) +
      (activeProfile.progress?.puzzle?.hard?.stars || 0)
    : 0;

  const colorsStars = activeProfile
    ? (activeProfile.progress?.colors?.easy?.stars || 0) +
      (activeProfile.progress?.colors?.medium?.stars || 0) +
      (activeProfile.progress?.colors?.hard?.stars || 0)
    : 0;

  const numbersStars = activeProfile
    ? (activeProfile.progress?.numbers?.easy?.stars || 0) +
      (activeProfile.progress?.numbers?.medium?.stars || 0) +
      (activeProfile.progress?.numbers?.hard?.stars || 0)
    : 0;

  const memoryStars = activeProfile
    ? (activeProfile.progress?.memory?.easy?.stars || 0) +
      (activeProfile.progress?.memory?.medium?.stars || 0) +
      (activeProfile.progress?.memory?.hard?.stars || 0)
    : 0;

  const coloringStars = activeProfile
    ? (activeProfile.progress?.coloring?.easy?.stars || 0) +
      (activeProfile.progress?.coloring?.medium?.stars || 0) +
      (activeProfile.progress?.coloring?.hard?.stars || 0)
    : 0;

  const sortingStars = activeProfile
    ? (activeProfile.progress?.sorting?.easy?.stars || 0) +
      (activeProfile.progress?.sorting?.medium?.stars || 0) +
      (activeProfile.progress?.sorting?.hard?.stars || 0)
    : 0;

  const hijaiyahStars = activeProfile
    ? (activeProfile.progress?.hijaiyah?.easy?.stars || 0) +
      (activeProfile.progress?.hijaiyah?.medium?.stars || 0) +
      (activeProfile.progress?.hijaiyah?.hard?.stars || 0)
    : 0;

  const totalStars = matchingStars + lettersStars + puzzleStars + colorsStars + numbersStars + memoryStars + coloringStars + sortingStars + hijaiyahStars;

  const currentLevel = activeProfile
    ? Math.max(
        activeProfile.progress?.matching?.easy?.currentLevel || 1,
        activeProfile.progress?.matching?.medium?.currentLevel || 1,
        activeProfile.progress?.matching?.hard?.currentLevel || 1,
        activeProfile.progress?.letters?.easy?.currentLevel || 1,
        activeProfile.progress?.letters?.medium?.currentLevel || 1,
        activeProfile.progress?.letters?.hard?.currentLevel || 1,
        activeProfile.progress?.puzzle?.easy?.currentLevel || 1,
        activeProfile.progress?.puzzle?.medium?.currentLevel || 1,
        activeProfile.progress?.puzzle?.hard?.currentLevel || 1,
        activeProfile.progress?.colors?.easy?.currentLevel || 1,
        activeProfile.progress?.colors?.medium?.currentLevel || 1,
        activeProfile.progress?.colors?.hard?.currentLevel || 1,
        activeProfile.progress?.numbers?.easy?.currentLevel || 1,
        activeProfile.progress?.numbers?.medium?.currentLevel || 1,
        activeProfile.progress?.numbers?.hard?.currentLevel || 1,
        activeProfile.progress?.memory?.easy?.currentLevel || 1,
        activeProfile.progress?.memory?.medium?.currentLevel || 1,
        activeProfile.progress?.memory?.hard?.currentLevel || 1,
        activeProfile.progress?.coloring?.easy?.currentLevel || 1,
        activeProfile.progress?.coloring?.medium?.currentLevel || 1,
        activeProfile.progress?.coloring?.hard?.currentLevel || 1,
        activeProfile.progress?.sorting?.easy?.currentLevel || 1,
        activeProfile.progress?.sorting?.medium?.currentLevel || 1,
        activeProfile.progress?.sorting?.hard?.currentLevel || 1,
        activeProfile.progress?.hijaiyah?.easy?.currentLevel || 1,
        activeProfile.progress?.hijaiyah?.medium?.currentLevel || 1,
        activeProfile.progress?.hijaiyah?.hard?.currentLevel || 1
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
              {getTranslation("app.title", {}, language)}
            </span>
            <span className="hidden md:block text-xs font-bold text-amber-700">
              {getTranslation("app.tagline", {}, language)}
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
                    Level {currentLevel}
                  </span>
                </div>
              </div>
            </div>
          )}

          {showControls && (
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* BGM Toggle Button */}
              <button
                type="button"
                onClick={handleToggleMusic}
                className={`p-2 sm:p-2.5 rounded-2xl transition-all shadow-sm flex items-center justify-center cursor-pointer ${
                  musicEnabled
                    ? "bg-purple-100 hover:bg-purple-200 text-purple-800 ring-2 ring-purple-300/60"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-400"
                }`}
                title={musicEnabled ? getTranslation("navbar.musicOn", {}, language) : getTranslation("navbar.musicOff", {}, language)}
                aria-label={musicEnabled ? getTranslation("navbar.musicOn", {}, language) : getTranslation("navbar.musicOff", {}, language)}
              >
                {musicEnabled ? (
                  <Music2 className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce" />
                ) : (
                  <Music className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </button>

              <Link
                href="/profiles"
                className="p-2 sm:p-2.5 bg-sky-100 hover:bg-sky-200 text-sky-800 rounded-2xl transition-all shadow-sm flex items-center justify-center"
                title={getTranslation("dashboard.switchProfile", {}, language)}
                aria-label={getTranslation("dashboard.switchProfile", {}, language)}
              >
                <Users className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>
              <Link
                href="/settings"
                className="p-2 sm:p-2.5 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-2xl transition-all shadow-sm flex items-center justify-center"
                title={getTranslation("dashboard.settings", {}, language)}
                aria-label={getTranslation("dashboard.settings", {}, language)}
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
