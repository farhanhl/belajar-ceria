"use client";

import React, { useState, useRef } from "react";
import { useProfileStore } from "@/stores/profile-store";
import { useSettingsStore } from "@/stores/settings-store";
import { ChildAvatar } from "@/components/profile/ChildAvatar";
import { ChildCard } from "@/components/ui/ChildCard";
import { ChildButton } from "@/components/ui/ChildButton";
import { exportBackupJson, importBackupJson } from "@/lib/storage/backup-storage";
import {
  ShieldCheck,
  Star,
  Trophy,
  Target,
  Percent,
  Calendar,
  Download,
  Upload,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Gamepad2,
} from "lucide-react";
import { getTranslation } from "@/lib/i18n";
import Link from "next/link";

export default function ParentPage() {
  const { profiles, activeProfile, selectProfile, hydrate } = useProfileStore();
  const { language } = useSettingsStore();

  const [selectedChildId, setSelectedChildId] = useState<string>(
    activeProfile?.id || (profiles[0]?.id ?? "")
  );
  const [importStatus, setImportStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedChild = profiles.find((p) => p.id === selectedChildId) || profiles[0];

  const handleDownloadBackup = () => {
    const jsonStr = exportBackupJson();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `belajar-ceria-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const result = importBackupJson(content);
        if (result.success) {
          hydrate();
          setImportStatus({ type: "success", text: result.message });
        } else {
          setImportStatus({ type: "error", text: result.message });
        }
      }
    };
    reader.readAsText(file);
  };

  if (profiles.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <p className="font-bold text-slate-700 mb-4">Belum ada profil anak terdaftar.</p>
        <Link href="/">
          <ChildButton variant="primary">Buat Profil Pertama</ChildButton>
        </Link>
      </div>
    );
  }

  // Calculate stats for matching game
  const easyStats = selectedChild?.progress?.matching?.easy || {
    stars: 0,
    gamesCompleted: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    currentLevel: 1,
    lastPlayedAt: null,
  };
  const medStats = selectedChild?.progress?.matching?.medium || {
    stars: 0,
    gamesCompleted: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    currentLevel: 1,
    lastPlayedAt: null,
  };
  const hardStats = selectedChild?.progress?.matching?.hard || {
    stars: 0,
    gamesCompleted: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    currentLevel: 1,
    lastPlayedAt: null,
  };

  // Calculate stats for letter game
  const letterEasyStats = selectedChild?.progress?.letters?.easy || {
    stars: 0,
    gamesCompleted: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    currentLevel: 1,
    lastPlayedAt: null,
  };
  const letterMedStats = selectedChild?.progress?.letters?.medium || {
    stars: 0,
    gamesCompleted: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    currentLevel: 1,
    lastPlayedAt: null,
  };
  const letterHardStats = selectedChild?.progress?.letters?.hard || {
    stars: 0,
    gamesCompleted: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    currentLevel: 1,
    lastPlayedAt: null,
  };

  // Calculate stats for puzzle game
  const puzzleEasyStats = selectedChild?.progress?.puzzle?.easy || {
    stars: 0,
    gamesCompleted: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    currentLevel: 1,
    lastPlayedAt: null,
  };
  const puzzleMedStats = selectedChild?.progress?.puzzle?.medium || {
    stars: 0,
    gamesCompleted: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    currentLevel: 1,
    lastPlayedAt: null,
  };
  const puzzleHardStats = selectedChild?.progress?.puzzle?.hard || {
    stars: 0,
    gamesCompleted: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    currentLevel: 1,
    lastPlayedAt: null,
  };

  // Calculate stats for colors game
  const colorsEasyStats = selectedChild?.progress?.colors?.easy || {
    stars: 0,
    gamesCompleted: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    currentLevel: 1,
    lastPlayedAt: null,
  };
  const colorsMedStats = selectedChild?.progress?.colors?.medium || {
    stars: 0,
    gamesCompleted: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    currentLevel: 1,
    lastPlayedAt: null,
  };
  const colorsHardStats = selectedChild?.progress?.colors?.hard || {
    stars: 0,
    gamesCompleted: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    currentLevel: 1,
    lastPlayedAt: null,
  };

  // Calculate stats for numbers game
  const numbersEasyStats = selectedChild?.progress?.numbers?.easy || {
    stars: 0,
    gamesCompleted: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    currentLevel: 1,
    lastPlayedAt: null,
  };
  const numbersMedStats = selectedChild?.progress?.numbers?.medium || {
    stars: 0,
    gamesCompleted: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    currentLevel: 1,
    lastPlayedAt: null,
  };
  const numbersHardStats = selectedChild?.progress?.numbers?.hard || {
    stars: 0,
    gamesCompleted: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    currentLevel: 1,
    lastPlayedAt: null,
  };

  // Calculate stats for memory game
  const memoryEasyStats = selectedChild?.progress?.memory?.easy || {
    stars: 0,
    gamesCompleted: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    currentLevel: 1,
    lastPlayedAt: null,
  };
  const memoryMedStats = selectedChild?.progress?.memory?.medium || {
    stars: 0,
    gamesCompleted: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    currentLevel: 1,
    lastPlayedAt: null,
  };
  const memoryHardStats = selectedChild?.progress?.memory?.hard || {
    stars: 0,
    gamesCompleted: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    currentLevel: 1,
    lastPlayedAt: null,
  };

  // Calculate stats for coloring game
  const coloringEasyStats = selectedChild?.progress?.coloring?.easy || {
    stars: 0,
    gamesCompleted: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    currentLevel: 1,
    lastPlayedAt: null,
  };

  // Calculate stats for sorting game
  const sortingEasyStats = selectedChild?.progress?.sorting?.easy || {
    stars: 0,
    gamesCompleted: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    currentLevel: 1,
    lastPlayedAt: null,
  };
  const sortingMedStats = selectedChild?.progress?.sorting?.medium || {
    stars: 0,
    gamesCompleted: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    currentLevel: 2,
    lastPlayedAt: null,
  };
  const sortingHardStats = selectedChild?.progress?.sorting?.hard || {
    stars: 0,
    gamesCompleted: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    currentLevel: 3,
    lastPlayedAt: null,
  };

  const matchingStars = easyStats.stars + medStats.stars + hardStats.stars;
  const lettersStars = letterEasyStats.stars + letterMedStats.stars + letterHardStats.stars;
  const puzzleStars = puzzleEasyStats.stars + puzzleMedStats.stars + puzzleHardStats.stars;
  const colorsStars = colorsEasyStats.stars + colorsMedStats.stars + colorsHardStats.stars;
  const numbersStars = numbersEasyStats.stars + numbersMedStats.stars + numbersHardStats.stars;
  const memoryStars = memoryEasyStats.stars + memoryMedStats.stars + memoryHardStats.stars;
  const coloringStars = coloringEasyStats.stars;
  const sortingStars = sortingEasyStats.stars + sortingMedStats.stars + sortingHardStats.stars;
  const totalStars = matchingStars + lettersStars + puzzleStars + colorsStars + numbersStars + memoryStars + coloringStars + sortingStars;

  const totalGames =
    easyStats.gamesCompleted +
    medStats.gamesCompleted +
    hardStats.gamesCompleted +
    letterEasyStats.gamesCompleted +
    letterMedStats.gamesCompleted +
    letterHardStats.gamesCompleted +
    puzzleEasyStats.gamesCompleted +
    puzzleMedStats.gamesCompleted +
    puzzleHardStats.gamesCompleted +
    colorsEasyStats.gamesCompleted +
    colorsMedStats.gamesCompleted +
    colorsHardStats.gamesCompleted +
    numbersEasyStats.gamesCompleted +
    numbersMedStats.gamesCompleted +
    numbersHardStats.gamesCompleted +
    memoryEasyStats.gamesCompleted +
    memoryMedStats.gamesCompleted +
    memoryHardStats.gamesCompleted +
    coloringEasyStats.gamesCompleted +
    sortingEasyStats.gamesCompleted +
    sortingMedStats.gamesCompleted +
    sortingHardStats.gamesCompleted;

  const totalQuestions =
    easyStats.questionsAnswered +
    medStats.questionsAnswered +
    hardStats.questionsAnswered +
    letterEasyStats.questionsAnswered +
    letterMedStats.questionsAnswered +
    letterHardStats.questionsAnswered +
    puzzleEasyStats.questionsAnswered +
    puzzleMedStats.questionsAnswered +
    puzzleHardStats.questionsAnswered +
    colorsEasyStats.questionsAnswered +
    colorsMedStats.questionsAnswered +
    colorsHardStats.questionsAnswered +
    numbersEasyStats.questionsAnswered +
    numbersMedStats.questionsAnswered +
    numbersHardStats.questionsAnswered +
    memoryEasyStats.questionsAnswered +
    memoryMedStats.questionsAnswered +
    memoryHardStats.questionsAnswered +
    coloringEasyStats.questionsAnswered +
    sortingEasyStats.questionsAnswered +
    sortingMedStats.questionsAnswered +
    sortingHardStats.questionsAnswered;

  const totalCorrect =
    easyStats.correctAnswers +
    medStats.correctAnswers +
    hardStats.correctAnswers +
    letterEasyStats.correctAnswers +
    letterMedStats.correctAnswers +
    letterHardStats.correctAnswers +
    puzzleEasyStats.correctAnswers +
    puzzleMedStats.correctAnswers +
    puzzleHardStats.correctAnswers +
    colorsEasyStats.correctAnswers +
    colorsMedStats.correctAnswers +
    colorsHardStats.correctAnswers +
    numbersEasyStats.correctAnswers +
    numbersMedStats.correctAnswers +
    numbersHardStats.correctAnswers +
    memoryEasyStats.correctAnswers +
    memoryMedStats.correctAnswers +
    memoryHardStats.correctAnswers +
    coloringEasyStats.correctAnswers +
    sortingEasyStats.correctAnswers +
    sortingMedStats.correctAnswers +
    sortingHardStats.correctAnswers;

  const accuracy = totalQuestions > 0 ? ((totalCorrect / totalQuestions) * 100).toFixed(1) : "0.0";
  const overallLevel = Math.max(
    easyStats.currentLevel,
    medStats.currentLevel,
    hardStats.currentLevel,
    letterEasyStats.currentLevel,
    letterMedStats.currentLevel,
    letterHardStats.currentLevel,
    puzzleEasyStats.currentLevel,
    puzzleMedStats.currentLevel,
    puzzleHardStats.currentLevel,
    colorsEasyStats.currentLevel,
    colorsMedStats.currentLevel,
    colorsHardStats.currentLevel,
    numbersEasyStats.currentLevel,
    numbersMedStats.currentLevel,
    numbersHardStats.currentLevel
  );

  // Find latest played date across all games
  const playedDates = [
    easyStats.lastPlayedAt,
    medStats.lastPlayedAt,
    hardStats.lastPlayedAt,
    letterEasyStats.lastPlayedAt,
    letterMedStats.lastPlayedAt,
    letterHardStats.lastPlayedAt,
    puzzleEasyStats.lastPlayedAt,
    puzzleMedStats.lastPlayedAt,
    puzzleHardStats.lastPlayedAt,
    colorsEasyStats.lastPlayedAt,
    colorsMedStats.lastPlayedAt,
    colorsHardStats.lastPlayedAt,
    numbersEasyStats.lastPlayedAt,
    numbersMedStats.lastPlayedAt,
    numbersHardStats.lastPlayedAt,
  ].filter(Boolean) as string[];

  const lastPlayedFormatted =
    playedDates.length > 0
      ? new Date(Math.max(...playedDates.map((d) => new Date(d).getTime()))).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "Belum pernah bermain";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Top Header */}
      <header className="bg-white border-b-2 border-slate-200 px-4 sm:px-8 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-100 text-indigo-800 rounded-2xl">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                {getTranslation("parent.title", {}, language)}
              </h1>
              <p className="text-xs sm:text-sm font-bold text-slate-500">
                {getTranslation("parent.subtitle", {}, language)}
              </p>
            </div>
          </div>

          <Link
            href="/learn"
            className="inline-flex items-center gap-2 font-black text-sm text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-4 py-2.5 rounded-2xl transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{getTranslation("parent.backToApp", {}, language)}</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto space-y-6 py-8">
        {/* Child Selector */}
        <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm space-y-3">
          <label className="text-sm font-black text-slate-700 uppercase tracking-wider">
            {getTranslation("parent.selectChild", {}, language)}
          </label>
          <div className="flex flex-wrap gap-3">
            {profiles.map((p) => {
              const isSelected = p.id === selectedChild?.id;
              return (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => {
                    setSelectedChildId(p.id);
                    selectProfile(p.id);
                  }}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl border-2 transition cursor-pointer ${
                    isSelected
                      ? "bg-indigo-50 border-indigo-600 text-indigo-950 font-black shadow-md"
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 font-bold"
                  }`}
                >
                  <ChildAvatar avatarId={p.avatar} size={36} />
                  <span>{p.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Child Progress Overview */}
        {selectedChild && (
          <div className="space-y-6">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>
                {getTranslation("parent.summaryTitle", {}, language)}: {selectedChild.name}
              </span>
            </h2>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-white p-4 rounded-3xl border-2 border-amber-200 shadow-sm text-center space-y-1">
                <Star className="w-6 h-6 fill-amber-400 text-amber-500 mx-auto" />
                <p className="text-xs font-bold text-slate-500">{getTranslation("parent.totalStars", {}, language)}</p>
                <p className="text-2xl font-black text-amber-950">{totalStars}</p>
              </div>

              <div className="bg-white p-4 rounded-3xl border-2 border-sky-200 shadow-sm text-center space-y-1">
                <Gamepad2 className="w-6 h-6 text-sky-500 mx-auto" />
                <p className="text-xs font-bold text-slate-500">{getTranslation("parent.gamesCompleted", {}, language)}</p>
                <p className="text-2xl font-black text-sky-950">{totalGames}</p>
              </div>

              <div className="bg-white p-4 rounded-3xl border-2 border-emerald-200 shadow-sm text-center space-y-1">
                <Target className="w-6 h-6 text-emerald-500 mx-auto" />
                <p className="text-xs font-bold text-slate-500">{getTranslation("parent.correctAnswers", {}, language)}</p>
                <p className="text-2xl font-black text-emerald-950">
                  {totalCorrect} <span className="text-xs text-slate-400">/ {totalQuestions}</span>
                </p>
              </div>

              <div className="bg-white p-4 rounded-3xl border-2 border-purple-200 shadow-sm text-center space-y-1">
                <Percent className="w-6 h-6 text-purple-500 mx-auto" />
                <p className="text-xs font-bold text-slate-500">{getTranslation("parent.accuracy", {}, language)}</p>
                <p className="text-2xl font-black text-purple-950">{accuracy}%</p>
              </div>

              <div className="bg-white p-4 rounded-3xl border-2 border-orange-200 shadow-sm text-center space-y-1">
                <Trophy className="w-6 h-6 text-orange-500 mx-auto" />
                <p className="text-xs font-bold text-slate-500">{getTranslation("app.level", {}, language)}</p>
                <p className="text-2xl font-black text-orange-950">Level {overallLevel}</p>
              </div>

              <div className="bg-white p-4 rounded-3xl border-2 border-indigo-200 shadow-sm text-center space-y-1">
                <Calendar className="w-6 h-6 text-indigo-500 mx-auto" />
                <p className="text-xs font-bold text-slate-500">{getTranslation("parent.lastPlayed", {}, language)}</p>
                <p className="text-xs font-black text-indigo-950 mt-1 truncate" title={lastPlayedFormatted}>
                  {lastPlayedFormatted}
                </p>
              </div>
            </div>

            {/* Difficulty Breakdown Table - Matching Game */}
            <div className="bg-white rounded-3xl border-2 border-slate-200 overflow-hidden shadow-sm">
              <div className="p-4 bg-slate-100/70 border-b border-slate-200">
                <h3 className="text-base font-black text-slate-800">
                  {getTranslation("parent.breakdownMatching", {}, language)}
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm font-bold text-slate-700">
                  <thead className="bg-slate-50 text-xs font-black text-slate-500 uppercase">
                    <tr>
                      <th className="px-5 py-3">{getTranslation("parent.colLevel", {}, language)}</th>
                      <th className="px-5 py-3">{getTranslation("parent.colCompleted", {}, language)}</th>
                      <th className="px-5 py-3">{getTranslation("parent.colStars", {}, language)}</th>
                      <th className="px-5 py-3">{getTranslation("parent.colAccuracy", {}, language)}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="px-5 py-3 font-extrabold text-emerald-700 flex items-center gap-2">
                        <span>🌱</span> {getTranslation("games.matching.easy", {}, language)}
                      </td>
                      <td className="px-5 py-3">{getTranslation("parent.sessionsCount", { count: easyStats.gamesCompleted }, language)}</td>
                      <td className="px-5 py-3 text-amber-600 font-extrabold">⭐ {easyStats.stars}</td>
                      <td className="px-5 py-3">
                        {easyStats.questionsAnswered > 0
                          ? `${Math.round((easyStats.correctAnswers / easyStats.questionsAnswered) * 100)}%`
                          : "-"}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 font-extrabold text-sky-700 flex items-center gap-2">
                        <span>⭐</span> {getTranslation("games.matching.medium", {}, language)}
                      </td>
                      <td className="px-5 py-3">{getTranslation("parent.sessionsCount", { count: medStats.gamesCompleted }, language)}</td>
                      <td className="px-5 py-3 text-amber-600 font-extrabold">⭐ {medStats.stars}</td>
                      <td className="px-5 py-3">
                        {medStats.questionsAnswered > 0
                          ? `${Math.round((medStats.correctAnswers / medStats.questionsAnswered) * 100)}%`
                          : "-"}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 font-extrabold text-purple-700 flex items-center gap-2">
                        <span>👑</span> {getTranslation("games.matching.hard", {}, language)}
                      </td>
                      <td className="px-5 py-3">{getTranslation("parent.sessionsCount", { count: hardStats.gamesCompleted }, language)}</td>
                      <td className="px-5 py-3 text-amber-600 font-extrabold">⭐ {hardStats.stars}</td>
                      <td className="px-5 py-3">
                        {hardStats.questionsAnswered > 0
                          ? `${Math.round((hardStats.correctAnswers / hardStats.questionsAnswered) * 100)}%`
                          : "-"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Difficulty Breakdown Table - Letters Game */}
            <div className="bg-white rounded-3xl border-2 border-slate-200 overflow-hidden shadow-sm">
              <div className="p-4 bg-pink-50 border-b border-pink-200">
                <h3 className="text-base font-black text-pink-950 flex items-center gap-2">
                  <span>🔤</span> {getTranslation("parent.breakdownLetters", {}, language)}
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm font-bold text-slate-700">
                  <thead className="bg-slate-50 text-xs font-black text-slate-500 uppercase">
                    <tr>
                      <th className="px-5 py-3">{getTranslation("parent.colLevel", {}, language)}</th>
                      <th className="px-5 py-3">{getTranslation("parent.colCompleted", {}, language)}</th>
                      <th className="px-5 py-3">{getTranslation("parent.colStars", {}, language)}</th>
                      <th className="px-5 py-3">{getTranslation("parent.colAccuracy", {}, language)}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="px-5 py-3 font-extrabold text-emerald-700 flex items-center gap-2">
                        <span>🌱</span> {getTranslation("games.letters.easyDesc", {}, language)}
                      </td>
                      <td className="px-5 py-3">{getTranslation("parent.sessionsCount", { count: letterEasyStats.gamesCompleted }, language)}</td>
                      <td className="px-5 py-3 text-amber-600 font-extrabold">⭐ {letterEasyStats.stars}</td>
                      <td className="px-5 py-3">
                        {letterEasyStats.questionsAnswered > 0
                          ? `${Math.round((letterEasyStats.correctAnswers / letterEasyStats.questionsAnswered) * 100)}%`
                          : "-"}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 font-extrabold text-sky-700 flex items-center gap-2">
                        <span>⭐</span> {getTranslation("games.letters.medDesc", {}, language)}
                      </td>
                      <td className="px-5 py-3">{getTranslation("parent.sessionsCount", { count: letterMedStats.gamesCompleted }, language)}</td>
                      <td className="px-5 py-3 text-amber-600 font-extrabold">⭐ {letterMedStats.stars}</td>
                      <td className="px-5 py-3">
                        {letterMedStats.questionsAnswered > 0
                          ? `${Math.round((letterMedStats.correctAnswers / letterMedStats.questionsAnswered) * 100)}%`
                          : "-"}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 font-extrabold text-purple-700 flex items-center gap-2">
                        <span>👑</span> {getTranslation("games.letters.hardDesc", {}, language)}
                      </td>
                      <td className="px-5 py-3">{getTranslation("parent.sessionsCount", { count: letterHardStats.gamesCompleted }, language)}</td>
                      <td className="px-5 py-3 text-amber-600 font-extrabold">⭐ {letterHardStats.stars}</td>
                      <td className="px-5 py-3">
                        {letterHardStats.questionsAnswered > 0
                          ? `${Math.round((letterHardStats.correctAnswers / letterHardStats.questionsAnswered) * 100)}%`
                          : "-"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Difficulty Breakdown Table - Puzzle Game */}
            <div className="bg-white rounded-3xl border-2 border-slate-200 overflow-hidden shadow-sm">
              <div className="p-4 bg-indigo-50 border-b border-indigo-200">
                <h3 className="text-base font-black text-indigo-950 flex items-center gap-2">
                  <span>🧩</span> {getTranslation("parent.breakdownPuzzle", {}, language)}
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm font-bold text-slate-700">
                  <thead className="bg-slate-50 text-xs font-black text-slate-500 uppercase">
                    <tr>
                      <th className="px-5 py-3">{getTranslation("parent.colLevel", {}, language)}</th>
                      <th className="px-5 py-3">{getTranslation("parent.colCompleted", {}, language)}</th>
                      <th className="px-5 py-3">{getTranslation("parent.colStars", {}, language)}</th>
                      <th className="px-5 py-3">{getTranslation("parent.colPrecision", {}, language)}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="px-5 py-3 font-extrabold text-emerald-700 flex items-center gap-2">
                        <span>🌱</span> {getTranslation("games.puzzle.easyDesc", {}, language)}
                      </td>
                      <td className="px-5 py-3">{getTranslation("parent.puzzlesCount", { count: puzzleEasyStats.gamesCompleted }, language)}</td>
                      <td className="px-5 py-3 text-amber-600 font-extrabold">⭐ {puzzleEasyStats.stars}</td>
                      <td className="px-5 py-3">
                        {puzzleEasyStats.questionsAnswered > 0
                          ? `${Math.round((puzzleEasyStats.correctAnswers / (puzzleEasyStats.correctAnswers + puzzleEasyStats.incorrectAnswers)) * 100)}%`
                          : "-"}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 font-extrabold text-sky-700 flex items-center gap-2">
                        <span>⭐</span> {getTranslation("games.puzzle.medDesc", {}, language)}
                      </td>
                      <td className="px-5 py-3">{getTranslation("parent.puzzlesCount", { count: puzzleMedStats.gamesCompleted }, language)}</td>
                      <td className="px-5 py-3 text-amber-600 font-extrabold">⭐ {puzzleMedStats.stars}</td>
                      <td className="px-5 py-3">
                        {puzzleMedStats.questionsAnswered > 0
                          ? `${Math.round((puzzleMedStats.correctAnswers / (puzzleMedStats.correctAnswers + puzzleMedStats.incorrectAnswers)) * 100)}%`
                          : "-"}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 font-extrabold text-purple-700 flex items-center gap-2">
                        <span>👑</span> {getTranslation("games.puzzle.hardDesc", {}, language)}
                      </td>
                      <td className="px-5 py-3">{getTranslation("parent.puzzlesCount", { count: puzzleHardStats.gamesCompleted }, language)}</td>
                      <td className="px-5 py-3 text-amber-600 font-extrabold">⭐ {puzzleHardStats.stars}</td>
                      <td className="px-5 py-3">
                        {puzzleHardStats.questionsAnswered > 0
                          ? `${Math.round((puzzleHardStats.correctAnswers / (puzzleHardStats.correctAnswers + puzzleHardStats.incorrectAnswers)) * 100)}%`
                          : "-"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Difficulty Breakdown Table - Colors & Shapes Game */}
            <div className="bg-white rounded-3xl border-2 border-slate-200 overflow-hidden shadow-sm">
              <div className="p-4 bg-amber-50 border-b border-amber-200">
                <h3 className="text-base font-black text-amber-950 flex items-center gap-2">
                  <span>🎨</span> {getTranslation("parent.breakdownColors", {}, language)}
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm font-bold text-slate-700">
                  <thead className="bg-slate-50 text-xs font-black text-slate-500 uppercase">
                    <tr>
                      <th className="px-5 py-3">{getTranslation("parent.colLevel", {}, language)}</th>
                      <th className="px-5 py-3">{getTranslation("parent.colCompleted", {}, language)}</th>
                      <th className="px-5 py-3">{getTranslation("parent.colStars", {}, language)}</th>
                      <th className="px-5 py-3">{getTranslation("parent.colAccuracy", {}, language)}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="px-5 py-3 font-extrabold text-emerald-700 flex items-center gap-2">
                        <span>🌱</span> {getTranslation("games.colors.easyDesc", {}, language)}
                      </td>
                      <td className="px-5 py-3">{getTranslation("parent.sessionsCount", { count: colorsEasyStats.gamesCompleted }, language)}</td>
                      <td className="px-5 py-3 text-amber-600 font-extrabold">⭐ {colorsEasyStats.stars}</td>
                      <td className="px-5 py-3">
                        {colorsEasyStats.questionsAnswered > 0
                          ? `${Math.round((colorsEasyStats.correctAnswers / colorsEasyStats.questionsAnswered) * 100)}%`
                          : "-"}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 font-extrabold text-sky-700 flex items-center gap-2">
                        <span>⭐</span> {getTranslation("games.colors.medDesc", {}, language)}
                      </td>
                      <td className="px-5 py-3">{getTranslation("parent.sessionsCount", { count: colorsMedStats.gamesCompleted }, language)}</td>
                      <td className="px-5 py-3 text-amber-600 font-extrabold">⭐ {colorsMedStats.stars}</td>
                      <td className="px-5 py-3">
                        {colorsMedStats.questionsAnswered > 0
                          ? `${Math.round((colorsMedStats.correctAnswers / colorsMedStats.questionsAnswered) * 100)}%`
                          : "-"}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 font-extrabold text-purple-700 flex items-center gap-2">
                        <span>👑</span> {getTranslation("games.colors.hardDesc", {}, language)}
                      </td>
                      <td className="px-5 py-3">{getTranslation("parent.sessionsCount", { count: colorsHardStats.gamesCompleted }, language)}</td>
                      <td className="px-5 py-3 text-amber-600 font-extrabold">⭐ {colorsHardStats.stars}</td>
                      <td className="px-5 py-3">
                        {colorsHardStats.questionsAnswered > 0
                          ? `${Math.round((colorsHardStats.correctAnswers / colorsHardStats.questionsAnswered) * 100)}%`
                          : "-"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Difficulty Breakdown Table - Numbers Game */}
            <div className="bg-white rounded-3xl border-2 border-slate-200 overflow-hidden shadow-sm">
              <div className="p-4 bg-yellow-50 border-b border-yellow-200">
                <h3 className="text-base font-black text-amber-950 flex items-center gap-2">
                  <span>🔢</span> {getTranslation("parent.breakdownNumbers", {}, language)}
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm font-bold text-slate-700">
                  <thead className="bg-slate-50 text-xs font-black text-slate-500 uppercase">
                    <tr>
                      <th className="px-5 py-3">{getTranslation("parent.colLevel", {}, language)}</th>
                      <th className="px-5 py-3">{getTranslation("parent.colCompleted", {}, language)}</th>
                      <th className="px-5 py-3">{getTranslation("parent.colStars", {}, language)}</th>
                      <th className="px-5 py-3">{getTranslation("parent.colAccuracy", {}, language)}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="px-5 py-3 font-extrabold text-emerald-700 flex items-center gap-2">
                        <span>🌱</span> {getTranslation("games.numbers.easyDesc", {}, language)}
                      </td>
                      <td className="px-5 py-3">{getTranslation("parent.sessionsCount", { count: numbersEasyStats.gamesCompleted }, language)}</td>
                      <td className="px-5 py-3 text-amber-600 font-extrabold">⭐ {numbersEasyStats.stars}</td>
                      <td className="px-5 py-3">
                        {numbersEasyStats.questionsAnswered > 0
                          ? `${Math.round((numbersEasyStats.correctAnswers / numbersEasyStats.questionsAnswered) * 100)}%`
                          : "-"}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 font-extrabold text-sky-700 flex items-center gap-2">
                        <span>⭐</span> {getTranslation("games.numbers.medDesc", {}, language)}
                      </td>
                      <td className="px-5 py-3">{getTranslation("parent.sessionsCount", { count: numbersMedStats.gamesCompleted }, language)}</td>
                      <td className="px-5 py-3 text-amber-600 font-extrabold">⭐ {numbersMedStats.stars}</td>
                      <td className="px-5 py-3">
                        {numbersMedStats.questionsAnswered > 0
                          ? `${Math.round((numbersMedStats.correctAnswers / numbersMedStats.questionsAnswered) * 100)}%`
                          : "-"}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 font-extrabold text-purple-700 flex items-center gap-2">
                        <span>👑</span> {getTranslation("games.numbers.hardDesc", {}, language)}
                      </td>
                      <td className="px-5 py-3">{getTranslation("parent.sessionsCount", { count: numbersHardStats.gamesCompleted }, language)}</td>
                      <td className="px-5 py-3 text-amber-600 font-extrabold">⭐ {numbersHardStats.stars}</td>
                      <td className="px-5 py-3">
                        {numbersHardStats.questionsAnswered > 0
                          ? `${Math.round((numbersHardStats.correctAnswers / numbersHardStats.questionsAnswered) * 100)}%`
                          : "-"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Difficulty Breakdown Table - Memory Game */}
            <div className="bg-white rounded-3xl border-2 border-slate-200 overflow-hidden shadow-sm">
              <div className="p-4 bg-purple-50 border-b border-purple-200">
                <h3 className="text-base font-black text-purple-950 flex items-center gap-2">
                  <span>🧠</span> {getTranslation("parent.breakdownMemory", {}, language)}
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm font-bold text-slate-700">
                  <thead className="bg-slate-50 text-xs font-black text-slate-500 uppercase">
                    <tr>
                      <th className="px-5 py-3">{getTranslation("parent.colLevel", {}, language)}</th>
                      <th className="px-5 py-3">{getTranslation("parent.colCompleted", {}, language)}</th>
                      <th className="px-5 py-3">{getTranslation("parent.colStars", {}, language)}</th>
                      <th className="px-5 py-3">{getTranslation("parent.colEfficiency", {}, language)}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="px-5 py-3 font-extrabold text-emerald-700 flex items-center gap-2">
                        <span>🌱</span> {getTranslation("games.memory.easyDesc", {}, language)}
                      </td>
                      <td className="px-5 py-3">{getTranslation("parent.sessionsCount", { count: memoryEasyStats.gamesCompleted }, language)}</td>
                      <td className="px-5 py-3 text-amber-600 font-extrabold">⭐ {memoryEasyStats.stars}</td>
                      <td className="px-5 py-3">
                        {memoryEasyStats.questionsAnswered > 0
                          ? `${Math.round((memoryEasyStats.correctAnswers / (memoryEasyStats.correctAnswers + memoryEasyStats.incorrectAnswers)) * 100)}%`
                          : "-"}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 font-extrabold text-sky-700 flex items-center gap-2">
                        <span>⭐</span> {getTranslation("games.memory.medDesc", {}, language)}
                      </td>
                      <td className="px-5 py-3">{getTranslation("parent.sessionsCount", { count: memoryMedStats.gamesCompleted }, language)}</td>
                      <td className="px-5 py-3 text-amber-600 font-extrabold">⭐ {memoryMedStats.stars}</td>
                      <td className="px-5 py-3">
                        {memoryMedStats.questionsAnswered > 0
                          ? `${Math.round((memoryMedStats.correctAnswers / (memoryMedStats.correctAnswers + memoryMedStats.incorrectAnswers)) * 100)}%`
                          : "-"}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 font-extrabold text-purple-700 flex items-center gap-2">
                        <span>👑</span> {getTranslation("games.memory.hardDesc", {}, language)}
                      </td>
                      <td className="px-5 py-3">{getTranslation("parent.sessionsCount", { count: memoryHardStats.gamesCompleted }, language)}</td>
                      <td className="px-5 py-3 text-amber-600 font-extrabold">⭐ {memoryHardStats.stars}</td>
                      <td className="px-5 py-3">
                        {memoryHardStats.questionsAnswered > 0
                          ? `${Math.round((memoryHardStats.correctAnswers / (memoryHardStats.correctAnswers + memoryHardStats.incorrectAnswers)) * 100)}%`
                          : "-"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Difficulty Breakdown Table - Coloring Game */}
            <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                <span>🎨</span> {getTranslation("parent.breakdownColoring", {}, language)}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm font-bold text-slate-600">
                  <thead className="bg-slate-100 text-slate-800 uppercase text-xs">
                    <tr>
                      <th className="px-5 py-3 rounded-l-2xl">{getTranslation("parent.levelCol", {}, language)}</th>
                      <th className="px-5 py-3">{getTranslation("parent.completedCol", {}, language)}</th>
                      <th className="px-5 py-3">{getTranslation("parent.starsCol", {}, language)}</th>
                      <th className="px-5 py-3 rounded-r-2xl">{getTranslation("parent.accuracyCol", {}, language)}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="px-5 py-3 font-extrabold text-pink-600 flex items-center gap-2">
                        <span>🎨</span> {getTranslation("games.coloring.name", {}, language)}
                      </td>
                      <td className="px-5 py-3">{getTranslation("parent.sessionsCount", { count: coloringEasyStats.gamesCompleted }, language)}</td>
                      <td className="px-5 py-3 text-amber-600 font-extrabold">⭐ {coloringEasyStats.stars}</td>
                      <td className="px-5 py-3">
                        {coloringEasyStats.questionsAnswered > 0
                          ? `${Math.round((coloringEasyStats.correctAnswers / (coloringEasyStats.correctAnswers + coloringEasyStats.incorrectAnswers)) * 100)}%`
                          : "-"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Difficulty Breakdown Table - Sorting Game */}
            <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                <span>📦</span> {getTranslation("parent.breakdownSorting", {}, language)}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm font-bold text-slate-600">
                  <thead className="bg-slate-100 text-slate-800 uppercase text-xs">
                    <tr>
                      <th className="px-5 py-3 rounded-l-2xl">{getTranslation("parent.levelCol", {}, language)}</th>
                      <th className="px-5 py-3">{getTranslation("parent.completedCol", {}, language)}</th>
                      <th className="px-5 py-3">{getTranslation("parent.starsCol", {}, language)}</th>
                      <th className="px-5 py-3 rounded-r-2xl">{getTranslation("parent.accuracyCol", {}, language)}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="px-5 py-3 font-extrabold text-emerald-600 flex items-center gap-2">
                        <span>🌱</span> {getTranslation("games.sorting.easyDesc", {}, language)}
                      </td>
                      <td className="px-5 py-3">{getTranslation("parent.sessionsCount", { count: sortingEasyStats.gamesCompleted }, language)}</td>
                      <td className="px-5 py-3 text-amber-600 font-extrabold">⭐ {sortingEasyStats.stars}</td>
                      <td className="px-5 py-3">
                        {sortingEasyStats.questionsAnswered > 0
                          ? `${Math.round((sortingEasyStats.correctAnswers / (sortingEasyStats.correctAnswers + sortingEasyStats.incorrectAnswers)) * 100)}%`
                          : "-"}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 font-extrabold text-amber-600 flex items-center gap-2">
                        <span>⭐</span> {getTranslation("games.sorting.medDesc", {}, language)}
                      </td>
                      <td className="px-5 py-3">{getTranslation("parent.sessionsCount", { count: sortingMedStats.gamesCompleted }, language)}</td>
                      <td className="px-5 py-3 text-amber-600 font-extrabold">⭐ {sortingMedStats.stars}</td>
                      <td className="px-5 py-3">
                        {sortingMedStats.questionsAnswered > 0
                          ? `${Math.round((sortingMedStats.correctAnswers / (sortingMedStats.correctAnswers + sortingMedStats.incorrectAnswers)) * 100)}%`
                          : "-"}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 font-extrabold text-purple-600 flex items-center gap-2">
                        <span>👑</span> {getTranslation("games.sorting.hardDesc", {}, language)}
                      </td>
                      <td className="px-5 py-3">{getTranslation("parent.sessionsCount", { count: sortingHardStats.gamesCompleted }, language)}</td>
                      <td className="px-5 py-3 text-amber-600 font-extrabold">⭐ {sortingHardStats.stars}</td>
                      <td className="px-5 py-3">
                        {sortingHardStats.questionsAnswered > 0
                          ? `${Math.round((sortingHardStats.correctAnswers / (sortingHardStats.correctAnswers + sortingHardStats.incorrectAnswers)) * 100)}%`
                          : "-"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Data Backup & Restore Section */}
        <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <div>
            <h3 className="text-xl font-black text-slate-900">
              {getTranslation("parent.backupTitle", {}, language)}
            </h3>
            <p className="text-sm font-bold text-slate-500 mt-1">
              {getTranslation("parent.backupDesc", {}, language)}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              type="button"
              onClick={handleDownloadBackup}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow cursor-pointer transition"
            >
              <Download className="w-4 h-4" />
              <span>{getTranslation("parent.downloadBackup", {}, language)}</span>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-sm border border-slate-300 shadow-sm cursor-pointer transition"
            >
              <Upload className="w-4 h-4" />
              <span>{getTranslation("parent.restoreBackup", {}, language)}</span>
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden"
            />
          </div>

          {importStatus && (
            <div
              className={`p-3 rounded-2xl text-sm font-bold flex items-center gap-2 ${
                importStatus.type === "success"
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                  : "bg-rose-50 text-rose-800 border border-rose-300"
              }`}
            >
              {importStatus.type === "success" ? (
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span>{importStatus.text}</span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
