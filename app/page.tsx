"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProfileStore } from "@/stores/profile-store";
import { useSettingsStore } from "@/stores/settings-store";
import { Teacher } from "@/components/teacher/Teacher";
import { AvatarPicker } from "@/components/profile/AvatarPicker";
import { ChildButton } from "@/components/ui/ChildButton";
import { ChildCard } from "@/components/ui/ChildCard";
import { Sparkles, ArrowRight } from "lucide-react";
import { getTranslation } from "@/lib/i18n";

import Image from "next/image";

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
    <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-xl space-y-6">
        {/* Brand Header with Logo in Rounded Frame */}
        <div className="text-center flex flex-col items-center space-y-3">
          <div className="inline-flex items-center justify-center p-3 sm:p-4 rounded-3xl bg-white/95 border-4 border-amber-300 shadow-xl hover:scale-105 transition-transform shrink-0">
            <Image
              src="/logo.png"
              alt="Belajar Ceria"
              width={220}
              height={220}
              className="w-40 h-40 sm:w-52 sm:h-52 object-contain"
              priority
            />
          </div>
          <div className="inline-flex items-center gap-2 bg-amber-200/90 text-amber-950 px-4 py-1.5 rounded-full text-sm font-extrabold shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-600 fill-amber-500" />
            {getTranslation("app.tagline", {}, language)}
          </div>
        </div>

        {/* Teacher Welcome Message */}
        <Teacher
          expression="happy"
          message={getTranslation("onboarding.welcomeTeacher", { name: name.trim() || "Teman" }, language)}
        />

        {/* Create Profile Card */}
        <ChildCard borderColor="border-amber-300" className="space-y-6 bg-white/95">
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
            <div className="space-y-2">
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError("");
                }}
                placeholder={getTranslation("onboarding.namePlaceholder", {}, language)}
                maxLength={25}
                className="w-full text-center text-xl sm:text-2xl font-black px-6 py-4 rounded-3xl border-4 border-amber-300 bg-amber-50/50 focus:bg-white focus:border-amber-500 focus:outline-none placeholder:text-amber-300 transition-all shadow-inner"
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
                className="w-full sm:w-auto"
              >
                {getTranslation("onboarding.startButton", {}, language)}
              </ChildButton>
            </div>
          </form>
        </ChildCard>
      </div>
    </main>
  );
}
