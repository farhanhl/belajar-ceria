"use client";

import React, { useState } from "react";
import { ColorShapeOption, ColorShapeQuestion } from "../types";
import { ShapeVector } from "./ShapeVector";
import { getColorById } from "../data/colors-shapes-data";
import { soundFx } from "@/lib/audio/sound-fx";
import { useSettingsStore } from "@/stores/settings-store";
import { CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ColorShapeQuestionCardProps {
  question: ColorShapeQuestion;
  selectedOptionId: string | null;
  isAnswered: boolean;
  onSelectOption: (optionId: string) => void;
  onAssignToBasket?: (itemId: string, basketId: string) => void;
}

export function ColorShapeQuestionCard({
  question,
  selectedOptionId,
  isAnswered,
  onSelectOption,
  onAssignToBasket,
}: ColorShapeQuestionCardProps) {
  const { soundEnabled, volume } = useSettingsStore();
  const [activeSelectedItem, setActiveSelectedItem] = useState<string | null>(null);

  // Render Sorting Basket Mode (Hard)
  if (question.type === "sort_baskets" && question.baskets && question.sortingItems) {
    const unassignedItems = question.sortingItems.filter(
      (item) => !item.assignedBasketId
    );

    return (
      <div className="space-y-6 w-full">
        {/* Baskets Grid */}
        <div className="grid grid-cols-2 gap-4">
          {question.baskets.map((basket) => {
            const assignedHere = question.sortingItems?.filter(
              (item) => item.assignedBasketId === basket.id
            );

            return (
              <motion.div
                key={basket.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  if (activeSelectedItem && onAssignToBasket) {
                    onAssignToBasket(activeSelectedItem, basket.id);
                    setActiveSelectedItem(null);
                  }
                }}
                className={`min-h-[180px] sm:min-h-[220px] rounded-3xl p-4 border-4 transition-all flex flex-col justify-between cursor-pointer shadow-lg ${
                  basket.type === "color"
                    ? "bg-white/95 border-amber-300 ring-4 ring-amber-100"
                    : "bg-white/95 border-sky-300 ring-4 ring-sky-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-sm sm:text-base text-slate-800">
                    {basket.title.id}
                  </span>
                  {basket.colorHex && (
                    <div
                      className="w-5 h-5 rounded-full border border-white shadow-sm"
                      style={{ backgroundColor: basket.colorHex }}
                    />
                  )}
                </div>

                {/* Items in basket */}
                <div className="flex flex-wrap gap-2 items-center justify-center p-2 min-h-[90px] bg-slate-50/80 rounded-2xl border border-slate-200/60">
                  {assignedHere && assignedHere.length > 0 ? (
                    assignedHere.map((it) => (
                      <motion.div
                        key={it.id}
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-xl shadow p-1 border border-slate-200"
                      >
                        <ShapeVector shapeId={it.shapeId} colorId={it.colorId} />
                      </motion.div>
                    ))
                  ) : (
                    <span className="text-xs font-bold text-slate-400">
                      {activeSelectedItem ? "👉 Taruh di sini" : "Wadah Kosong"}
                    </span>
                  )}
                </div>

                <div className="text-center">
                  <span className="text-[11px] font-extrabold text-slate-500">
                    {assignedHere?.length || 0} Benda Terkumpul
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Unassigned Items Queue */}
        <div className="bg-amber-100/70 rounded-3xl p-4 sm:p-5 border-2 border-amber-200 shadow-inner text-center space-y-3">
          <p className="text-xs sm:text-sm font-black text-amber-950 uppercase tracking-wider">
            {unassignedItems.length > 0
              ? "Pilih benda di bawah, lalu sentuh wadah yang cocok:"
              : "🎉 Semua benda berhasil dikelompokkan!"}
          </p>

          <div className="flex flex-wrap gap-3 items-center justify-center min-h-[70px]">
            {unassignedItems.map((item) => {
              const isSelected = activeSelectedItem === item.id;
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setActiveSelectedItem(isSelected ? null : item.id);
                    if (soundEnabled) soundFx.playClick(volume * 0.5);
                  }}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white shadow-md p-2 border-4 transition-all ${
                    isSelected
                      ? "border-amber-500 ring-4 ring-amber-300 scale-105"
                      : "border-white hover:border-amber-200"
                  }`}
                >
                  <ShapeVector shapeId={item.shapeId} colorId={item.colorId} />
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Render Standard Options (Easy & Medium)
  const isSilhouette = question.type === "shape_silhouette";

  return (
    <div className="space-y-6 w-full">
      {/* Target Preview for Silhouette Matching or Visual Focus */}
      {isSilhouette && question.targetShapeId && (
        <div className="flex flex-col items-center justify-center p-4 bg-slate-100 rounded-3xl border-2 border-dashed border-slate-300 w-40 h-40 mx-auto shadow-inner">
          <ShapeVector
            shapeId={question.targetShapeId}
            isSilhouette={true}
            size={100}
          />
          <span className="text-[11px] font-black text-slate-500 mt-1">
            Siluet Target
          </span>
        </div>
      )}

      {/* Options Grid */}
      <div
        className={`grid gap-4 ${
          question.options.length <= 3
            ? "grid-cols-1 sm:grid-cols-3"
            : "grid-cols-2 sm:grid-cols-4"
        }`}
      >
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          const isCorrect = isSelected && option.isCorrect;
          const isWrong = isSelected && !option.isCorrect;

          return (
            <motion.button
              key={option.id}
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.96 }}
              disabled={isAnswered}
              onClick={() => onSelectOption(option.id)}
              className={`relative aspect-square w-full rounded-3xl p-4 sm:p-6 flex flex-col items-center justify-center shadow-lg border-4 transition-all ${
                isCorrect
                  ? "bg-emerald-50 border-emerald-400 ring-4 ring-emerald-200"
                  : isWrong
                  ? "bg-rose-50 border-rose-400 ring-4 ring-rose-200 animate-shake"
                  : "bg-white border-amber-100 hover:border-amber-300 ring-2 ring-transparent"
              } ${isAnswered ? "cursor-default" : "cursor-pointer"}`}
            >
              <div className="w-full h-full max-w-[130px] max-h-[130px] flex items-center justify-center">
                <ShapeVector
                  shapeId={option.shapeId}
                  colorId={option.colorId}
                  showFace={!isSilhouette}
                />
              </div>

              {/* Correct / Incorrect Feedback Badge */}
              <AnimatePresence>
                {isCorrect && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 bg-emerald-500 text-white rounded-full p-1.5 shadow"
                  >
                    <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                  </motion.div>
                )}

                {isWrong && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 bg-rose-500 text-white rounded-full p-1.5 shadow"
                  >
                    <XCircle className="w-6 h-6 stroke-[2.5]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
