"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTracingGameStore, CRAYON_COLORS } from "@/stores/tracing-game-store";
import { useSettingsStore } from "@/stores/settings-store";
import { useProfileStore } from "@/stores/profile-store";
import { ChildNavbar } from "@/components/navigation/ChildNavbar";
import { ChildPageHeader } from "@/components/navigation/ChildPageHeader";
import { Teacher } from "@/components/teacher/Teacher";
import { TracingCanvas } from "@/games/tracing/components/TracingCanvas";
import { soundFx } from "@/lib/audio/sound-fx";
import { getTranslation } from "@/lib/i18n";
import { Volume2, ChevronRight, RotateCcw, Sparkles } from "lucide-react";

export default function TracingPlayPage() {
  const router = useRouter();
  const {
    items,
    activeItemIndex,
    currentStrokeIndex,
    completedStrokes,
    currentPoints,
    selectedColor,
    isItemCompleted,
    difficulty,
    startSession,
    setSelectedColor,
    startDrawing,
    addPoint,
    finishDrawing,
    resetCurrentItem,
    nextItem,
  } = useTracingGameStore();

  const { language, soundEnabled, volume } = useSettingsStore();
  const { activeProfile, recordTracingResult } = useProfileStore();

  const [teacherMessage, setTeacherMessage] = useState<string>("");
  const hasRecordedRef = useRef(false);

  // Initialize session if page opened directly
  useEffect(() => {
    if (!items || items.length === 0) {
      hasRecordedRef.current = false;
      startSession("lines", "easy");
    }
  }, [items, startSession]);

  // Auto-advance to next item when current item is completed
  useEffect(() => {
    if (!isItemCompleted) return;

    const timer = setTimeout(() => {
      hasRecordedRef.current = false;
      if (activeItemIndex < items.length - 1) {
        nextItem();
      } else {
        router.push("/learn/tracing/result");
      }
    }, 1400);

    return () => clearTimeout(timer);
  }, [isItemCompleted, activeItemIndex, items.length, nextItem, router]);

  const currentItem = items[activeItemIndex];

  // Update teacher message based on item and stroke progress
  useEffect(() => {
    if (!currentItem) return;

    const currentTitle = currentItem.title[language] || currentItem.title.id;

    if (isItemCompleted) {
      setTeacherMessage(
        getTranslation("games.tracing.successTraced", { title: currentTitle }, language) + " 🌟"
      );
    } else {
      const activeStroke = currentItem.strokes[currentStrokeIndex];
      const hint = activeStroke?.startHint
        ? activeStroke.startHint[language] || activeStroke.startHint.id
        : currentItem.hint
        ? currentItem.hint[language] || currentItem.hint.id
        : "";
      setTeacherMessage(
        getTranslation(
          "games.tracing.traceStrokeHint",
          { stroke: currentStrokeIndex + 1, hint },
          language
        )
      );
    }
  }, [currentItem, currentStrokeIndex, isItemCompleted, language]);

  if (!currentItem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-400 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );
  }

  const currentTitle = currentItem.title[language] || currentItem.title.id;
  const currentSubtitle = currentItem.subtitle
    ? currentItem.subtitle[language] || currentItem.subtitle.id
    : undefined;

  const handleFinishDrawing = () => {
    const result = finishDrawing();

    if (result.strokeCompleted) {
      if (result.itemCompleted) {
        // Play celebration
        if (soundEnabled) soundFx.playCelebration(volume);

        // Record profile result once
        if (!hasRecordedRef.current && activeProfile) {
          hasRecordedRef.current = true;
          recordTracingResult({
            profileId: activeProfile.id,
            difficulty: difficulty || "easy",
            totalQuestions: 1,
            correctAnswers: 1,
            incorrectAnswers: 0,
            starsEarned: result.starsEarned,
            completedAt: new Date().toISOString(),
          });
        }
      } else {
        if (soundEnabled) soundFx.playCorrect(volume);
      }
    } else {
      if (soundEnabled) soundFx.playIncorrect(volume);
    }

    return result;
  };

  const handlePronounce = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const textToSpeak = currentItem.pronunciation
        ? currentItem.pronunciation[language] || currentItem.pronunciation.id
        : currentTitle;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = currentItem.category === "hijaiyah" ? "ar-SA" : language === "en" ? "en-US" : "id-ID";
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleReset = () => {
    hasRecordedRef.current = false;
    if (soundEnabled) soundFx.playClick(volume);
    resetCurrentItem();
  };

  const handleNext = () => {
    hasRecordedRef.current = false;
    if (soundEnabled) soundFx.playClick(volume);
    if (activeItemIndex < items.length - 1) {
      nextItem();
    } else {
      router.push("/learn/tracing/result");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <ChildNavbar />

      <main className="flex-1 max-w-6xl w-full mx-auto space-y-6 py-6 px-4">
        {/* Page Header */}
        <ChildPageHeader
          title={currentTitle}
          backHref="/learn/tracing"
        />

        {/* Teacher Guidance Bar */}
        <Teacher
          expression={isItemCompleted ? "celebrating" : "happy"}
          message={teacherMessage}
          className="w-full"
        />

        {/* Main Play Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Column: Character Info & Controls */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start gap-4">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 border-4 border-indigo-200 shadow-xl w-full text-center lg:text-left">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full border border-indigo-200">
                  {getTranslation(
                    "games.tracing.strokeProgress",
                    {
                      current: Math.min(currentStrokeIndex + 1, currentItem.strokes.length),
                      total: currentItem.strokes.length,
                    },
                    language
                  )}
                </span>
                <button
                  onClick={handlePronounce}
                  className="p-2 rounded-2xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors cursor-pointer border border-indigo-200"
                  title={getTranslation("games.tracing.listen", {}, language)}
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              <div
                className={`my-2 font-black text-indigo-950 ${
                  currentItem.category === "hijaiyah"
                    ? "font-arabic text-6xl pb-1"
                    : "font-sans text-5xl"
                }`}
              >
                {currentItem.char}
              </div>
              <h3 className="font-black text-xl text-slate-800">
                {currentTitle}
              </h3>
              {currentSubtitle && (
                <p className="text-xs font-bold text-slate-500 mt-0.5">
                  {currentSubtitle}
                </p>
              )}

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mt-4 border border-slate-200">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      (completedStrokes.length / currentItem.strokes.length) * 100
                    }%`,
                  }}
                />
              </div>
            </div>

            {/* Crayon Color Selector Palette */}
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-4 border-4 border-indigo-200 shadow-xl w-full">
              <span className="text-xs font-black text-indigo-950 block mb-2.5">
                {getTranslation("games.tracing.chooseColor", {}, language)}
              </span>
              <div className="flex items-center justify-between gap-2">
                {CRAYON_COLORS.map((color) => {
                  const isSelected = selectedColor === color.hex;
                  return (
                    <button
                      key={color.id}
                      onClick={() => {
                        if (soundEnabled) soundFx.playClick(volume);
                        setSelectedColor(color.hex);
                      }}
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-transform cursor-pointer flex items-center justify-center ${
                        isSelected
                          ? "scale-115 ring-4 ring-offset-2 ring-indigo-400 shadow-md"
                          : "hover:scale-105 opacity-85 hover:opacity-100"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.label}
                    >
                      {isSelected && <Sparkles className="w-4 h-4 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 w-full">
              <button
                onClick={handleReset}
                className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 font-black text-xs hover:bg-slate-100 transition-colors cursor-pointer shadow-sm"
              >
                <RotateCcw className="w-4 h-4" />
                {getTranslation("games.tracing.clearBtn", {}, language)}
              </button>
            </div>
          </div>

          {/* Center Column: Interactive Canvas */}
          <div className="lg:col-span-8 flex flex-col items-center justify-center">
            <TracingCanvas
              item={currentItem}
              currentStrokeIndex={currentStrokeIndex}
              completedStrokes={completedStrokes}
              currentPoints={currentPoints}
              selectedColor={selectedColor}
              isItemCompleted={isItemCompleted}
              onStartDrawing={startDrawing}
              onAddPoint={addPoint}
              onFinishDrawing={handleFinishDrawing}
              onReset={handleReset}
              soundEnabled={soundEnabled}
            />

            {/* Bottom Item Navigator */}
            <div className="flex items-center justify-between w-full max-w-[420px] mt-4 px-1">
              <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl border-2 border-indigo-100 shadow-sm">
                <span className="text-xs sm:text-sm font-black text-indigo-950">
                  {getTranslation(
                    "games.tracing.itemProgress",
                    { current: activeItemIndex + 1, total: items.length },
                    language
                  )}
                </span>
              </div>

              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm shadow-md shadow-indigo-600/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>
                  {activeItemIndex === items.length - 1
                    ? getTranslation("games.tracing.doneBtn", {}, language)
                    : getTranslation("games.tracing.nextBtn", {}, language)}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
