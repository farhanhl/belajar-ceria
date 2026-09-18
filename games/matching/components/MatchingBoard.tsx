"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useGameStore } from "@/stores/game-store";
import { useProfileStore } from "@/stores/profile-store";
import { useSettingsStore } from "@/stores/settings-store";
import { MatchingCard } from "./MatchingCard";
import { MatchingTarget } from "./MatchingTarget";
import { GameIcon } from "@/components/illustrations/GameIcons";
import { Teacher } from "@/components/teacher/Teacher";
import { TeacherExpression } from "@/components/teacher/TeacherAvatar";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { soundFx } from "@/lib/audio/sound-fx";
import { getTranslation } from "@/lib/i18n";
import { MatchingItem } from "@/types/game";
import { getMatchingItemLabel } from "../data/items";
import { motion, AnimatePresence } from "motion/react";
import { Star, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function MatchingBoard() {
  const router = useRouter();
  const {
    questions,
    currentIndex,
    correctCount,
    submitAnswer,
    nextQuestion,
    finishGame,
    resetGame,
    difficulty,
  } = useGameStore();

  const { activeProfile, recordResult } = useProfileStore();
  const { language, soundEnabled, volume } = useSettingsStore();

  const [teacherExpression, setTeacherExpression] = useState<TeacherExpression>("idle");
  const [teacherMessage, setTeacherMessage] = useState<string>("");
  const [isAnswering, setIsAnswering] = useState(false);
  const [matchedItem, setMatchedItem] = useState<MatchingItem | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [activeDragItem, setActiveDragItem] = useState<MatchingItem | null>(null);

  const currentQ = questions[currentIndex];
  const childName = activeProfile?.name || "Teman";

  // Configure sensors for touch and mouse
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 50,
      tolerance: 8,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  // Set default question instructions whenever question changes
  useEffect(() => {
    if (!currentQ) return;
    setMatchedItem(null);
    setIsSuccess(false);
    setSelectedCardId(null);
    setActiveDragItem(null);
    setIsAnswering(false);
    setTeacherExpression("idle");

    const defaultMsg = getTranslation("games.matching.instruction", {}, language);
    setTeacherMessage(defaultMsg);
  }, [currentIndex, currentQ, language]);

  // If questions empty, redirect to level selection
  useEffect(() => {
    if (questions.length === 0) {
      router.push("/learn/matching");
    }
  }, [questions, router]);

  if (!currentQ) {
    return null;
  }

  const handleEvaluateAnswer = (optionId: string) => {
    if (isAnswering) return;

    setSelectedCardId(optionId);
    const chosenItem = currentQ.options.find((o) => o.id === optionId);
    const { isCorrect, isComplete } = submitAnswer(optionId);

    if (isCorrect) {
      setIsAnswering(true);
      setIsSuccess(true);
      if (chosenItem) setMatchedItem(chosenItem);
      setTeacherExpression("celebrating");

      const correctMsgs = [
        getTranslation("games.matching.correctFeedback1", { name: childName }, language),
        getTranslation("games.matching.correctFeedback2", { name: childName }, language),
        getTranslation("games.matching.correctFeedback3", { name: childName }, language),
        getTranslation("games.matching.correctFeedback4", { name: childName }, language),
      ];
      const randomMsg = correctMsgs[Math.floor(Math.random() * correctMsgs.length)];
      setTeacherMessage(randomMsg);

      if (soundEnabled) {
        soundFx.playCorrect(volume);
      }

      // Proceed to next question or result after celebration
      setTimeout(() => {
        if (isComplete) {
          if (activeProfile) {
            const result = finishGame(activeProfile.id);
            recordResult(result);
          }
          router.push("/learn/matching/result");
        } else {
          nextQuestion();
        }
      }, 1500);
    } else {
      // Incorrect feedback: gentle & encouraging
      setTeacherExpression("encouraging");
      const incorrectMsgs = [
        getTranslation("games.matching.incorrectFeedback1", { name: childName }, language),
        getTranslation("games.matching.incorrectFeedback2", { name: childName }, language),
        getTranslation("games.matching.incorrectFeedback3", { name: childName }, language),
      ];
      const randomMsg = incorrectMsgs[Math.floor(Math.random() * incorrectMsgs.length)];
      setTeacherMessage(randomMsg);

      if (soundEnabled) {
        soundFx.playTryAgain(volume);
      }

      // Reset selection state quickly so child can try again
      setTimeout(() => {
        setSelectedCardId(null);
      }, 800);
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    const item = currentQ.options.find((o) => o.id === event.active.id);
    if (item) {
      setActiveDragItem(item);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveDragItem(null);
    const { over, active } = event;
    if (over && over.id === "matching-drop-target") {
      handleEvaluateAnswer(String(active.id));
    }
  };

  const handleDragCancel = () => {
    setActiveDragItem(null);
  };

  const handleCardClick = (item: MatchingItem) => {
    handleEvaluateAnswer(item.id);
  };

  return (
    <div className="w-full space-y-3 sm:space-y-4">
      {/* Top Bar: Back, Progress & Stars */}
      <div className="flex items-center justify-between gap-3 bg-white/80 backdrop-blur rounded-2xl sm:rounded-3xl p-2.5 sm:p-3.5 border-2 border-amber-200 shadow-md">
        <Link
          href="/learn/matching"
          className="p-2 sm:p-2.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-2xl transition flex items-center gap-1 font-bold text-xs sm:text-sm"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">
            {getTranslation("games.matching.chooseLevel", {}, language)}
          </span>
        </Link>

        {/* Progress */}
        <div className="flex-1 max-w-xs mx-auto">
          <ProgressBar current={currentIndex + 1} total={5} />
        </div>

        {/* Live Stars Count */}
        <div className="flex items-center gap-1 bg-amber-500 text-white px-3 py-1.5 rounded-2xl font-black text-sm sm:text-base shadow">
          <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
          <span>{correctCount}</span>
        </div>
      </div>

      {/* Teacher Guidance */}
      <Teacher
        expression={teacherExpression}
        message={teacherMessage}
        size={60}
        className="w-full"
      />

      {/* Matching Board Arena with DndContext */}
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="bg-gradient-to-b from-amber-50 to-orange-50/50 rounded-3xl border-4 border-amber-300 p-4 sm:p-6 shadow-xl space-y-4 sm:space-y-5">
          {/* Target Matching Zone */}
          <MatchingTarget
            targetItem={currentQ.targetItem}
            matchedItem={matchedItem}
            isSuccess={isSuccess}
          />

          {/* Options Tray */}
          <div className="space-y-2 sm:space-y-3">
            <div className="text-center">
              <span className="text-[11px] sm:text-xs font-extrabold text-amber-800 uppercase tracking-widest bg-amber-200/80 px-3.5 py-0.5 rounded-full">
                {getTranslation("games.matching.tapOrDrag", {}, language)}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 pt-1">
              <AnimatePresence>
                {currentQ.options.map((option) => (
                  <MatchingCard
                    key={option.id}
                    item={option}
                    disabled={isAnswering}
                    isSelected={selectedCardId === option.id}
                    isCorrect={selectedCardId === option.id ? isSuccess : null}
                    onSelect={handleCardClick}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Drag Overlay to smoothly follow cursor/finger */}
        <DragOverlay dropAnimation={{ duration: 200, easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)" }}>
          {activeDragItem ? (
            <div className="p-2.5 sm:p-3.5 rounded-2xl sm:rounded-3xl border-4 border-amber-400 bg-white shadow-2xl flex flex-col items-center justify-center scale-110 rotate-3 cursor-grabbing select-none min-w-[85px] sm:min-w-[110px] min-h-[85px] sm:min-h-[110px] ring-4 ring-amber-300">
              <GameIcon name={activeDragItem.iconName} className="w-12 h-12 sm:w-16 sm:h-16" />
              <span className="mt-1 text-xs sm:text-sm font-black text-slate-700 tracking-wide">
                {getMatchingItemLabel(activeDragItem, language)}
              </span>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
