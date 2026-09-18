"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProfileStore } from "@/stores/profile-store";
import { useSettingsStore } from "@/stores/settings-store";
import { Teacher } from "@/components/teacher/Teacher";
import { AvatarPicker } from "@/components/profile/AvatarPicker";
import { ChildButton } from "@/components/ui/ChildButton";
import { ChildCard } from "@/components/ui/ChildCard";
import { ArrowRight } from "lucide-react";
import { getTranslation } from "@/lib/i18n";

export default function HomePage() {
  const router = useRouter();
  const { profiles, activeProfile, createProfile, isHydrated } = useProfileStore();
  const { language } = useSettingsStore();

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("girl-1");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isHydrated) return;

    if (profiles.length === 1 && activeProfile) {
      // Exactly 1 profile -> automatically continue to dashboard
      router.replace("/learn");
    } else if (profiles.length > 1) {
      // Multiple profiles -> go to profile selector
      router.replace("/profiles");
    }
  }, [isHydrated, profiles.length, activeProfile, router]);

  const handleCreateInitialProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Yuk masukkan nama kamu terlebih dahulu!");
      return;
    }

    setIsSubmitting(true);
    try {
      createProfile(trimmed, avatar);
      router.push("/learn");
    } catch {
      setError("Ups, coba masukkan nama lain ya!");
      setIsSubmitting(false);
    }
  };

  if (!isHydrated || profiles.length > 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <div className="w-14 h-14 border-4 border-amber-400 border-t-amber-600 rounded-full animate-spin mx-auto" />
          <p className="font-bold text-amber-900">Membuka Belajar Ceria...</p>
        </div>
      </div>
    );
  }

  // First time onboarding view
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-6xl w-full mx-auto space-y-6 py-8">
        {/* Teacher Welcome Message */}
        <Teacher
          expression="happy"
          message={getTranslation("onboarding.welcomeTeacher", { name: name.trim() || "Teman" }, language)}
        />

        {/* Create Profile Card */}
        <ChildCard borderColor="border-amber-300" className="space-y-6 bg-white/95 shadow-xl w-full">
          <div className="text-center space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-amber-950">
              {getTranslation("onboarding.title", {}, language)}
            </h2>
            <p className="text-amber-700 font-bold text-sm sm:text-base">
              {getTranslation("onboarding.subtitle", {}, language)}
            </p>
          </div>

          <form onSubmit={handleCreateInitialProfile} className="space-y-6">
            {/* Avatar Selector */}
            <div className="space-y-2">
              <label className="block text-center text-sm font-black text-amber-900 uppercase tracking-wider">
                {getTranslation("onboarding.chooseAvatar", {}, language)}
              </label>
              <AvatarPicker selectedAvatar={avatar} onSelect={setAvatar} />
            </div>

            {/* Child Name Input */}
            <div className="max-w-md mx-auto w-full space-y-2">
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError("");
                }}
                placeholder={getTranslation("onboarding.namePlaceholder", {}, language)}
                maxLength={25}
                className="w-full text-center text-xl sm:text-2xl font-black px-6 py-3.5 rounded-3xl border-4 border-amber-300 bg-amber-50/50 focus:bg-white focus:border-amber-500 focus:outline-none placeholder:text-amber-300 transition-all shadow-inner"
                autoFocus
              />
              {error && (
                <p className="text-center font-extrabold text-rose-500 text-sm">{error}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <ChildButton
                type="submit"
                variant="primary"
                size="xl"
                icon={<ArrowRight className="w-7 h-7 stroke-[3]" />}
                disabled={isSubmitting || !name.trim()}
                className="w-full sm:w-auto min-w-[260px]"
              >
                {getTranslation("onboarding.startButton", {}, language)}
              </ChildButton>
            </div>
          </form>
        </ChildCard>
      </main>
    </div>
  );
}
