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

  const totalStars = easyStats.stars + medStats.stars + hardStats.stars;
  const totalGames = easyStats.gamesCompleted + medStats.gamesCompleted + hardStats.gamesCompleted;
  const totalQuestions = easyStats.questionsAnswered + medStats.questionsAnswered + hardStats.questionsAnswered;
  const totalCorrect = easyStats.correctAnswers + medStats.correctAnswers + hardStats.correctAnswers;
  const accuracy = totalQuestions > 0 ? ((totalCorrect / totalQuestions) * 100).toFixed(1) : "0.0";
  const overallLevel = Math.max(easyStats.currentLevel, medStats.currentLevel, hardStats.currentLevel);

  // Find latest played date
  const playedDates = [easyStats.lastPlayedAt, medStats.lastPlayedAt, hardStats.lastPlayedAt].filter(Boolean) as string[];
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
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
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
            <span>Kembali ke Aplikasi</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-8 space-y-8">
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
                <p className="text-xs font-bold text-slate-500">Total Bintang</p>
                <p className="text-2xl font-black text-amber-950">{totalStars}</p>
              </div>

              <div className="bg-white p-4 rounded-3xl border-2 border-sky-200 shadow-sm text-center space-y-1">
                <Gamepad2 className="w-6 h-6 text-sky-500 mx-auto" />
                <p className="text-xs font-bold text-slate-500">Permainan Selesai</p>
                <p className="text-2xl font-black text-sky-950">{totalGames}</p>
              </div>

              <div className="bg-white p-4 rounded-3xl border-2 border-emerald-200 shadow-sm text-center space-y-1">
                <Target className="w-6 h-6 text-emerald-500 mx-auto" />
                <p className="text-xs font-bold text-slate-500">Jawaban Benar</p>
                <p className="text-2xl font-black text-emerald-950">
                  {totalCorrect} <span className="text-xs text-slate-400">/ {totalQuestions}</span>
                </p>
              </div>

              <div className="bg-white p-4 rounded-3xl border-2 border-purple-200 shadow-sm text-center space-y-1">
                <Percent className="w-6 h-6 text-purple-500 mx-auto" />
                <p className="text-xs font-bold text-slate-500">Akurasi</p>
                <p className="text-2xl font-black text-purple-950">{accuracy}%</p>
              </div>

              <div className="bg-white p-4 rounded-3xl border-2 border-orange-200 shadow-sm text-center space-y-1">
                <Trophy className="w-6 h-6 text-orange-500 mx-auto" />
                <p className="text-xs font-bold text-slate-500">Level</p>
                <p className="text-2xl font-black text-orange-950">Level {overallLevel}</p>
              </div>

              <div className="bg-white p-4 rounded-3xl border-2 border-indigo-200 shadow-sm text-center space-y-1">
                <Calendar className="w-6 h-6 text-indigo-500 mx-auto" />
                <p className="text-xs font-bold text-slate-500">Aktivitas</p>
                <p className="text-xs font-black text-indigo-950 mt-1 truncate" title={lastPlayedFormatted}>
                  {lastPlayedFormatted}
                </p>
              </div>
            </div>

            {/* Difficulty Breakdown Table */}
            <div className="bg-white rounded-3xl border-2 border-slate-200 overflow-hidden shadow-sm">
              <div className="p-4 bg-slate-100/70 border-b border-slate-200">
                <h3 className="text-base font-black text-slate-800">
                  Rincian Tingkat Kesulitan (Cocokkan & Temukan)
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm font-bold text-slate-700">
                  <thead className="bg-slate-50 text-xs font-black text-slate-500 uppercase">
                    <tr>
                      <th className="px-5 py-3">Tingkat</th>
                      <th className="px-5 py-3">Selesai</th>
                      <th className="px-5 py-3">Bintang Diraih</th>
                      <th className="px-5 py-3">Akurasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="px-5 py-3 font-extrabold text-emerald-700 flex items-center gap-2">
                        <span>🌱</span> Mudah (Identik)
                      </td>
                      <td className="px-5 py-3">{easyStats.gamesCompleted} sesi</td>
                      <td className="px-5 py-3 text-amber-600 font-extrabold">⭐ {easyStats.stars}</td>
                      <td className="px-5 py-3">
                        {easyStats.questionsAnswered > 0
                          ? `${Math.round((easyStats.correctAnswers / easyStats.questionsAnswered) * 100)}%`
                          : "-"}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 font-extrabold text-sky-700 flex items-center gap-2">
                        <span>⭐</span> Sedang
                      </td>
                      <td className="px-5 py-3">{medStats.gamesCompleted} sesi</td>
                      <td className="px-5 py-3 text-amber-600 font-extrabold">⭐ {medStats.stars}</td>
                      <td className="px-5 py-3">
                        {medStats.questionsAnswered > 0
                          ? `${Math.round((medStats.correctAnswers / medStats.questionsAnswered) * 100)}%`
                          : "-"}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 font-extrabold text-purple-700 flex items-center gap-2">
                        <span>👑</span> Sulit
                      </td>
                      <td className="px-5 py-3">{hardStats.gamesCompleted} sesi</td>
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
