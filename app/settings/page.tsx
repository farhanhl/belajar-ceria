"use client";

import React, { useState } from "react";
import { useSettingsStore } from "@/stores/settings-store";
import { ChildNavbar } from "@/components/navigation/ChildNavbar";
import { ChildPageHeader } from "@/components/navigation/ChildPageHeader";
import { ChildCard } from "@/components/ui/ChildCard";
import { Teacher } from "@/components/teacher/Teacher";
import { Volume2, VolumeX, Mic, Globe, ArrowLeft, Check, Music, Music2 } from "lucide-react";
import { getTranslation } from "@/lib/i18n";
import { Language } from "@/types/settings";
import Link from "next/link";
import { soundFx } from "@/lib/audio/sound-fx";
import { ttsService } from "@/lib/tts/tts";

export default function SettingsPage() {
  const {
    language,
    soundEnabled,
    musicEnabled,
    autoTts,
    volume,
    musicVolume,
    setLanguage,
    setSoundEnabled,
    setMusicEnabled,
    setAutoTts,
    setVolume,
    setMusicVolume,
  } = useSettingsStore();

  const [savedMessage, setSavedMessage] = useState("");

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) soundFx.playClick(volume);
    triggerSaveFeedback();
  };

  const handleToggleMusic = () => {
    const next = !musicEnabled;
    setMusicEnabled(next);
    if (soundEnabled) soundFx.playClick(volume);
    triggerSaveFeedback();
  };

  const handleToggleAutoTts = () => {
    setAutoTts(!autoTts);
    triggerSaveFeedback();
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    if (soundEnabled) soundFx.playClick(volume);
    triggerSaveFeedback();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
  };

  const handleMusicVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setMusicVolume(val);
  };

  const handleTestVoice = () => {
    ttsService.speak({
      text: getTranslation("settings.testVoiceSpeech", {}, language),
      language,
      volume,
    });
  };

  const triggerSaveFeedback = () => {
    setSavedMessage(getTranslation("settings.saveSuccess", {}, language));
    setTimeout(() => setSavedMessage(""), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <ChildNavbar />

      <main className="flex-1 max-w-6xl w-full mx-auto space-y-6 py-8">
        {/* Uniform Header */}
        <ChildPageHeader
          title={getTranslation("settings.title", {}, language)}
          backHref="/learn"
        />

        {/* Teacher Feedback in Settings */}
        <Teacher
          expression="idle"
          message={getTranslation("settings.teacherGuide", {}, language)}
        />

        {/* Settings Card */}
        <ChildCard borderColor="border-amber-300" className="space-y-6 bg-white shadow-xl">
          {/* Voice Test — Female Indonesian only */}
          <div className="flex items-center justify-between gap-4 p-4 bg-pink-50/70 rounded-2xl border-2 border-pink-200">
            <div className="space-y-1">
              <p className="text-base font-black text-amber-950 flex items-center gap-2">
                {getTranslation("settings.teacherVoice", {}, language)}
              </p>
              <p className="text-xs font-bold text-amber-700">
                {getTranslation("settings.teacherVoiceDesc", {}, language)}
              </p>
            </div>
            <button
              type="button"
              onClick={handleTestVoice}
              className="px-5 py-2.5 rounded-2xl bg-pink-400 hover:bg-pink-500 text-white font-black text-sm shadow cursor-pointer transition flex items-center gap-2"
            >
              <Volume2 className="w-5 h-5" />
              {getTranslation("settings.testVoice", {}, language)}
            </button>
          </div>

          {/* Music (Backsound) Toggle */}
          <div className="flex items-center justify-between gap-4 p-3 bg-purple-50/70 rounded-2xl border border-purple-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-200 text-purple-900 rounded-2xl">
                {musicEnabled ? <Music2 className="w-6 h-6 animate-pulse" /> : <Music className="w-6 h-6 opacity-40" />}
              </div>
              <div>
                <p className="text-lg font-black text-amber-950">
                  {getTranslation("settings.music", {}, language)}
                </p>
                <p className="text-xs sm:text-sm font-bold text-amber-700">
                  {getTranslation("settings.musicDesc", {}, language)}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleToggleMusic}
              className={`px-5 py-2.5 rounded-2xl font-black text-sm transition cursor-pointer shadow ${
                musicEnabled
                  ? "bg-purple-500 text-white hover:bg-purple-600"
                  : "bg-slate-300 text-slate-700 hover:bg-slate-400"
              }`}
            >
              {musicEnabled ? "ON" : "OFF"}
            </button>
          </div>

          {/* Music Volume Slider */}
          {musicEnabled && (
            <div className="space-y-2 p-3 bg-purple-50/40 rounded-2xl border border-purple-200">
              <div className="flex items-center justify-between">
                <span className="text-base font-black text-amber-950">
                  {getTranslation("settings.musicVolume", {}, language)}
                </span>
                <span className="text-sm font-black text-purple-800">
                  {Math.round(musicVolume * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={musicVolume}
                onChange={handleMusicVolumeChange}
                className="w-full accent-purple-500 h-3 bg-purple-200 rounded-lg cursor-pointer"
              />
            </div>
          )}

          {/* Sound FX Toggle */}
          <div className="flex items-center justify-between gap-4 p-3 bg-amber-50/50 rounded-2xl border border-amber-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-200 text-amber-900 rounded-2xl">
                {soundEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
              </div>
              <div>
                <p className="text-lg font-black text-amber-950">
                  {getTranslation("settings.sound", {}, language)}
                </p>
                <p className="text-xs sm:text-sm font-bold text-amber-700">
                  {getTranslation("settings.soundDesc", {}, language)}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleToggleSound}
              className={`px-5 py-2.5 rounded-2xl font-black text-sm transition cursor-pointer shadow ${
                soundEnabled
                  ? "bg-emerald-500 text-white hover:bg-emerald-600"
                  : "bg-slate-300 text-slate-700 hover:bg-slate-400"
              }`}
            >
              {soundEnabled ? "ON" : "OFF"}
            </button>
          </div>

          {/* Sound FX Volume Slider */}
          <div className="space-y-2 p-3 bg-amber-50/50 rounded-2xl border border-amber-200">
            <div className="flex items-center justify-between">
              <span className="text-base font-black text-amber-950">
                {getTranslation("settings.volume", {}, language)}
              </span>
              <span className="text-sm font-black text-amber-800">
                {Math.round(volume * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full accent-amber-500 h-3 bg-amber-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Auto TTS Toggle */}
          <div className="flex items-center justify-between gap-4 p-3 bg-amber-50/50 rounded-2xl border border-amber-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-sky-200 text-sky-900 rounded-2xl">
                <Mic className="w-6 h-6" />
              </div>
              <div>
                <p className="text-lg font-black text-amber-950">
                  {getTranslation("settings.autoTts", {}, language)}
                </p>
                <p className="text-xs sm:text-sm font-bold text-amber-700">
                  {getTranslation("settings.autoTtsDesc", {}, language)}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleToggleAutoTts}
              className={`px-5 py-2.5 rounded-2xl font-black text-sm transition cursor-pointer shadow ${autoTts
                  ? "bg-emerald-500 text-white hover:bg-emerald-600"
                  : "bg-slate-300 text-slate-700 hover:bg-slate-400"
                }`}
            >
              {autoTts ? "ON" : "OFF"}
            </button>
          </div>

          {/* Language Selector */}
          <div className="space-y-3 p-3 bg-amber-50/50 rounded-2xl border border-amber-200">
            <div className="flex items-center gap-2 text-base font-black text-amber-950">
              <Globe className="w-5 h-5 text-amber-700" />
              <span>{getTranslation("settings.language", {}, language)}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleLanguageChange("id")}
                className={`py-3 px-4 rounded-2xl font-black text-base flex items-center justify-center gap-2 border-2 transition cursor-pointer ${language === "id"
                    ? "bg-amber-400 border-amber-600 text-amber-950 shadow-md scale-102"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
              >
                {language === "id" && <Check className="w-4 h-4 stroke-[3]" />}
                Bahasa Indonesia
              </button>

              <button
                type="button"
                onClick={() => handleLanguageChange("en")}
                className={`py-3 px-4 rounded-2xl font-black text-base flex items-center justify-center gap-2 border-2 transition cursor-pointer ${language === "en"
                    ? "bg-amber-400 border-amber-600 text-amber-950 shadow-md scale-102"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
              >
                {language === "en" && <Check className="w-4 h-4 stroke-[3]" />}
                English
              </button>
            </div>
          </div>

          {savedMessage && (
            <p className="text-center font-black text-emerald-600 text-sm animate-pulse">
              ✓ {savedMessage}
            </p>
          )}
        </ChildCard>
      </main>
    </div>
  );
}
