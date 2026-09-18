"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useProfileStore } from "@/stores/profile-store";
import { useSettingsStore } from "@/stores/settings-store";
import { ChildAvatar } from "@/components/profile/ChildAvatar";
import { AvatarPicker } from "@/components/profile/AvatarPicker";
import { ChildButton } from "@/components/ui/ChildButton";
import { ChildCard } from "@/components/ui/ChildCard";
import { Teacher } from "@/components/teacher/Teacher";
import { Star, Trophy, Plus, ShieldCheck, UserCheck, Trash2 } from "lucide-react";
import { getTranslation } from "@/lib/i18n";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

import Image from "next/image";

export default function ProfilesPage() {
  const router = useRouter();
  const { profiles, activeProfile, selectProfile, createProfile, deleteProfile } = useProfileStore();
  const { language } = useSettingsStore();

  const [isAddingChild, setIsAddingChild] = useState(false);
  const [newChildName, setNewChildName] = useState("");
  const [newChildAvatar, setNewChildAvatar] = useState("boy-1");
  const [error, setError] = useState("");

  const handleSelectChild = (profileId: string) => {
    selectProfile(profileId);
    router.push("/learn");
  };

  const handleCreateChild = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newChildName.trim();
    if (!trimmed) {
      setError("Masukkan nama anak terlebih dahulu");
      return;
    }

    createProfile(trimmed, newChildAvatar);
    setNewChildName("");
    setIsAddingChild(false);
    router.push("/learn");
  };

  const handleDelete = (e: React.MouseEvent, profileId: string, name: string) => {
    e.stopPropagation();
    if (confirm(getTranslation("profiles.deleteConfirm", { name }, language))) {
      deleteProfile(profileId);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main className="flex-1 max-w-6xl w-full mx-auto space-y-6 py-8">
        {/* Top Header */}
      <div className="text-center flex flex-col items-center space-y-2">
        <Link
          href="/"
          className="inline-flex items-center justify-center p-2 rounded-2xl bg-white/95 border-2 border-amber-300 shadow-md hover:scale-105 hover:border-amber-400 transition-all shrink-0"
        >
          <Image
            src="/logo.png"
            alt="Logo Belajar Ceria"
            width={80}
            height={80}
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
            priority
          />
        </Link>
        <h1 className="text-3xl sm:text-5xl font-black text-amber-950 tracking-tight">
          {getTranslation("profiles.title", {}, language)}
        </h1>
        <p className="text-base sm:text-lg font-bold text-amber-800">
          {getTranslation("profiles.subtitle", {}, language)}
        </p>
      </div>

      {/* Teacher Greeting */}
      <Teacher
        expression="happy"
        message={
          activeProfile
            ? getTranslation("profiles.teacherGreeting", { name: activeProfile.name }, language)
            : getTranslation("profiles.teacherGreetingNoProfile", {}, language)
        }
      />

      {/* Profile Selection Grid */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {profiles.map((profile) => {
            const isSelected = activeProfile?.id === profile.id;
            const matchingStars =
              (profile.progress?.matching?.easy?.stars || 0) +
              (profile.progress?.matching?.medium?.stars || 0) +
              (profile.progress?.matching?.hard?.stars || 0);

            const lettersStars =
              (profile.progress?.letters?.easy?.stars || 0) +
              (profile.progress?.letters?.medium?.stars || 0) +
              (profile.progress?.letters?.hard?.stars || 0);

            const puzzleStars =
              (profile.progress?.puzzle?.easy?.stars || 0) +
              (profile.progress?.puzzle?.medium?.stars || 0) +
              (profile.progress?.puzzle?.hard?.stars || 0);

            const colorsStars =
              (profile.progress?.colors?.easy?.stars || 0) +
              (profile.progress?.colors?.medium?.stars || 0) +
              (profile.progress?.colors?.hard?.stars || 0);

            const numbersStars =
              (profile.progress?.numbers?.easy?.stars || 0) +
              (profile.progress?.numbers?.medium?.stars || 0) +
              (profile.progress?.numbers?.hard?.stars || 0);

            const memoryStars =
              (profile.progress?.memory?.easy?.stars || 0) +
              (profile.progress?.memory?.medium?.stars || 0) +
              (profile.progress?.memory?.hard?.stars || 0);

            const totalStars = matchingStars + lettersStars + puzzleStars + colorsStars + numbersStars + memoryStars;

            const level = Math.max(
              profile.progress?.matching?.easy?.currentLevel || 1,
              profile.progress?.matching?.medium?.currentLevel || 1,
              profile.progress?.matching?.hard?.currentLevel || 1,
              profile.progress?.letters?.easy?.currentLevel || 1,
              profile.progress?.letters?.medium?.currentLevel || 1,
              profile.progress?.letters?.hard?.currentLevel || 1,
              profile.progress?.puzzle?.easy?.currentLevel || 1,
              profile.progress?.puzzle?.medium?.currentLevel || 1,
              profile.progress?.puzzle?.hard?.currentLevel || 1,
              profile.progress?.colors?.easy?.currentLevel || 1,
              profile.progress?.colors?.medium?.currentLevel || 1,
              profile.progress?.colors?.hard?.currentLevel || 1,
              profile.progress?.numbers?.easy?.currentLevel || 1,
              profile.progress?.numbers?.medium?.currentLevel || 1,
              profile.progress?.numbers?.hard?.currentLevel || 1,
              profile.progress?.memory?.easy?.currentLevel || 1,
              profile.progress?.memory?.medium?.currentLevel || 1,
              profile.progress?.memory?.hard?.currentLevel || 1
            );

            return (
              <motion.div
                key={profile.id}
                whileHover={{ scale: 1.04, y: -4 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleSelectChild(profile.id)}
                className={`relative rounded-3xl p-6 border-4 cursor-pointer transition-all shadow-xl flex flex-col items-center justify-between text-center gap-4 ${
                  isSelected
                    ? "bg-amber-50 border-amber-500 ring-4 ring-amber-300"
                    : "bg-white border-amber-200 hover:border-amber-400"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 bg-amber-500 text-white rounded-full p-1 shadow flex items-center gap-1 text-xs font-black px-2 py-0.5">
                    <UserCheck className="w-3.5 h-3.5" /> Aktif
                  </div>
                )}

                <ChildAvatar avatarId={profile.avatar} size={84} />

                <div className="space-y-1 w-full">
                  <h3 className="text-2xl font-black text-amber-950 truncate">
                    {profile.name}
                  </h3>
                  <div className="flex items-center justify-center gap-4 text-sm font-extrabold text-amber-800">
                    <span className="flex items-center gap-1 text-amber-600">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                      {totalStars} {getTranslation("app.stars", {}, language)}
                    </span>
                    <span className="flex items-center gap-1 text-orange-600">
                      <Trophy className="w-4 h-4 text-orange-500" />
                      Level {level}
                    </span>
                  </div>
                </div>

                <div className="w-full pt-2 flex items-center justify-center gap-2">
                  <span className="w-full py-2.5 rounded-2xl bg-amber-400 text-amber-950 font-black text-base shadow">
                    {getTranslation("app.start", {}, language)}
                  </span>
                  {profiles.length > 1 && (
                    <button
                      type="button"
                      onClick={(e) => handleDelete(e, profile.id, profile.name)}
                      className="p-2.5 rounded-2xl bg-rose-100 hover:bg-rose-200 text-rose-600 transition"
                      title={getTranslation("app.delete", {}, language)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}

          {/* Add New Child Profile Card */}
          {!isAddingChild && (
            <motion.div
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsAddingChild(true)}
              className="rounded-3xl p-6 border-4 border-dashed border-sky-300 bg-sky-50/60 hover:bg-sky-100/60 cursor-pointer transition-all shadow-md flex flex-col items-center justify-center text-center min-h-[260px] gap-3"
            >
              <div className="w-16 h-16 rounded-full bg-sky-400 text-white flex items-center justify-center shadow-lg">
                <Plus className="w-8 h-8 stroke-[3]" />
              </div>
              <p className="text-xl font-black text-sky-900">
                {getTranslation("profiles.addChild", {}, language)}
              </p>
            </motion.div>
          )}
        </div>

        {/* Add Child Form Modal / Drawer */}
        <AnimatePresence>
          {isAddingChild && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <ChildCard borderColor="border-sky-400" className="bg-white/95 space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-sky-950">
                    {getTranslation("profiles.addChild", {}, language)}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsAddingChild(false)}
                    className="text-slate-400 hover:text-slate-600 font-black text-lg px-2 py-1"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleCreateChild} className="space-y-5">
                  <div>
                    <label className="block text-sm font-black text-slate-700 mb-2">
                      {getTranslation("profiles.selectAvatar", {}, language)}
                    </label>
                    <AvatarPicker
                      selectedAvatar={newChildAvatar}
                      onSelect={setNewChildAvatar}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-black text-slate-700 mb-2">
                      {getTranslation("profiles.childNameLabel", {}, language)}
                    </label>
                    <input
                      type="text"
                      value={newChildName}
                      onChange={(e) => {
                        setNewChildName(e.target.value);
                        if (error) setError("");
                      }}
                      placeholder="Masukkan nama (misal: Rizky)"
                      maxLength={25}
                      className="w-full text-xl font-bold px-5 py-3.5 rounded-2xl border-2 border-slate-300 focus:border-sky-500 focus:outline-none"
                      autoFocus
                    />
                    {error && <p className="text-rose-500 font-bold text-sm mt-1">{error}</p>}
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <ChildButton
                      type="button"
                      variant="secondary"
                      size="md"
                      onClick={() => setIsAddingChild(false)}
                    >
                      {getTranslation("app.cancel", {}, language)}
                    </ChildButton>
                    <ChildButton
                      type="submit"
                      variant="success"
                      size="md"
                      disabled={!newChildName.trim()}
                    >
                      {getTranslation("profiles.saveProfile", {}, language)}
                    </ChildButton>
                  </div>
                </form>
              </ChildCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

        {/* Footer Navigation: Parent Area */}
        <div className="pt-6 border-t-2 border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/parent"
            className="inline-flex items-center gap-2 text-base font-extrabold text-amber-900 hover:text-amber-700 bg-amber-100/80 hover:bg-amber-200/80 px-5 py-2.5 rounded-2xl shadow-sm transition"
          >
            <ShieldCheck className="w-5 h-5 text-amber-700" />
            <span>{getTranslation("profiles.parentArea", {}, language)}</span>
          </Link>

          {activeProfile && (
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 text-base font-extrabold text-white bg-amber-500 hover:bg-amber-600 px-6 py-2.5 rounded-2xl shadow transition"
            >
              <span>{getTranslation("profiles.continueLearn", { name: activeProfile.name }, language)}</span>
              <span>➔</span>
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
