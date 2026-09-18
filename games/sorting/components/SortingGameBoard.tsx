"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useSortingGameStore } from "@/stores/sorting-game-store";
import { useSettingsStore } from "@/stores/settings-store";
import { useProfileStore } from "@/stores/profile-store";
import { soundFx } from "@/lib/audio/sound-fx";
import { recordSortingGameResult } from "@/lib/storage/profile-storage";
import { SortingBasket } from "./SortingBasket";
import { SortingItemCard, SortingItemOverlayCard } from "./SortingItemCard";
import { SortingItemDefinition } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, Move, Sparkles } from "lucide-react";

export function SortingGameBoard() {
  const router = useRouter();
  const {
    activeCategories,
    remainingItems,
    sortedItems,
    selectedItemId,
    feedbackState,
    lastTargetCategoryId,
    selectItem,
    sortItemIntoCategory,
    finishSession,
  } = useSortingGameStore();

  const { language, soundEnabled, volume, autoTts } = useSettingsStore();
  const { activeProfile } = useProfileStore();

  const [showHint, setShowHint] = useState(false);
  const [sparkleEffect, setSparkleEffect] = useState(false);
  const [activeDragItem, setActiveDragItem] = useState<SortingItemDefinition | null>(null);

  // Setup high-precision sensors for instantaneous and fluid drag response on touch and mouse
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 3,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 0,
      tolerance: 6,
    },
  });
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 3,
    },
  });
  const sensors = useSensors(pointerSensor, mouseSensor, touchSensor);

  const activeItem = remainingItems.find((i) => i.id === selectedItemId) || remainingItems[0] || null;

  // Speak item name on selection if autoTts is on
  useEffect(() => {
    if (activeItem && autoTts && typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const text = activeItem.speechText[language] || activeItem.name.id;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === "en" ? "en-US" : "id-ID";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  }, [activeItem?.id, autoTts, language]);

  // Check game completion
  useEffect(() => {
    if (remainingItems.length === 0 && activeCategories.length > 0) {
      if (soundEnabled) soundFx.playVictory(volume);
      const result = finishSession();

      if (activeProfile) {
        recordSortingGameResult({
          profileId: activeProfile.id,
          difficulty: result.difficulty,
          totalQuestions: result.totalItems,
          correctAnswers: result.sortedItemsCount,
          incorrectAnswers: result.mistakesCount,
          starsEarned: result.starsEarned,
          completedAt: result.completedAt,
        });
      }

      const timer = setTimeout(() => {
        router.push("/learn/sorting/result");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [remainingItems.length, activeCategories.length]);

  const handleDragStart = (event: DragStartEvent) => {
    const item = event.active.data.current?.item as SortingItemDefinition | undefined;
    if (item) {
      setActiveDragItem(item);
      selectItem(item.id);
      if (soundEnabled) soundFx.playPop(volume);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveDragItem(null);
    if (!event.over) return;

    const categoryId = event.over.id as string;
    const item = event.active.data.current?.item as SortingItemDefinition | undefined;
    if (!item) return;

    const success = sortItemIntoCategory(item.id, categoryId);

    if (success) {
      if (soundEnabled) soundFx.playPieceSnap(volume);
      setSparkleEffect(true);
      setTimeout(() => setSparkleEffect(false), 800);
      setShowHint(false);
    } else {
      if (soundEnabled) soundFx.playTryAgain(volume);
    }
  };

  const handleDragCancel = () => {
    setActiveDragItem(null);
  };

  const handleBasketClick = (categoryId: string) => {
    if (!activeItem) return;

    const success = sortItemIntoCategory(activeItem.id, categoryId);

    if (success) {
      if (soundEnabled) soundFx.playPieceSnap(volume);
      setSparkleEffect(true);
      setTimeout(() => setSparkleEffect(false), 800);
      setShowHint(false);
    } else {
      if (soundEnabled) soundFx.playTryAgain(volume);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center space-y-6 select-none">
        {/* Target Baskets / Containers Row with generous gap and spacing */}
        <div className="w-full px-2 sm:px-4">
          <div className="flex flex-wrap items-stretch justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 w-full py-2">
            {activeCategories.map((category) => (
              <SortingBasket
                key={category.id}
                category={category}
                sortedItems={sortedItems[category.id] || []}
                isSelectedTarget={Boolean(activeItem)}
                isRecentTarget={lastTargetCategoryId === category.id}
                feedbackType={feedbackState.type}
                onDropOrClick={() => handleBasketClick(category.id)}
              />
            ))}
          </div>
        </div>

        {/* Guide Banner / Interactive Feedback */}
        <div className="w-full max-w-xl mx-auto">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3 sm:p-4 border-2 border-amber-300 shadow-md text-center flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">
                {feedbackState.type === "success"
                  ? "🌟"
                  : feedbackState.type === "wrong"
                  ? "💡"
                  : "✋"}
              </span>
              <p className="text-xs sm:text-sm font-extrabold text-amber-950">
                {feedbackState.message
                  ? feedbackState.message[language] || feedbackState.message.id
                  : activeItem
                  ? language === "en"
                    ? `Drag "${activeItem.name.en}" into the right box!`
                    : `Tarik "${activeItem.name.id}" ke wadah yang sesuai!`
                  : language === "en"
                  ? "All items organized!"
                  : "Semua barang sudah rapi!"}
              </p>
            </div>

            {activeItem && (
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-black transition cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{language === "en" ? "Hint" : "Bantuan"}</span>
              </button>
            )}
          </div>

          {/* Hint text popover */}
          <AnimatePresence>
            {showHint && activeItem && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-2 bg-amber-100/90 text-amber-950 text-xs font-extrabold p-2.5 rounded-xl border border-amber-300 text-center"
              >
                💬 {activeItem.hint[language] || activeItem.hint.id}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Remaining Items Shelf */}
        <div className="w-full bg-amber-100/70 backdrop-blur-sm rounded-3xl p-4 sm:p-6 border-3 border-amber-300 shadow-lg">
          <div className="flex items-center justify-between mb-3 px-2">
            <h3 className="text-xs sm:text-sm font-black text-amber-950 flex items-center gap-1.5">
              <span>📦</span>
              <span>
                {language === "en"
                  ? `Items to Organize (${remainingItems.length} left)`
                  : `Barang yang Perlu Dirapikan (Sisa ${remainingItems.length})`}
              </span>
            </h3>
            <span className="text-xs font-bold text-amber-800 flex items-center gap-1">
              <Move className="w-3.5 h-3.5" />
              <span>{language === "en" ? "Drag item into box above" : "Tarik & jatuhkan ke wadah di atas"}</span>
            </span>
          </div>

          {/* Items Grid / Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 min-h-[140px]">
            <AnimatePresence>
              {remainingItems.map((item) => (
                <SortingItemCard
                  key={item.id}
                  item={item}
                  isSelected={selectedItemId === item.id}
                  isMainFocus={selectedItemId === item.id}
                  onClick={() => selectItem(item.id)}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Smooth Drag Overlay to follow pointer seamlessly like in Matching game */}
        <DragOverlay dropAnimation={{ duration: 200, easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)" }}>
          {activeDragItem ? <SortingItemOverlayCard item={activeDragItem} /> : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}

