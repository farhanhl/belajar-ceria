"use client";

import React from "react";
import { NumberQuestion } from "../types";
import { CountableObjectGrid } from "./CountableObjectGrid";
import { Plus, Minus, Equal, HelpCircle } from "lucide-react";

interface MathFormulaDisplayProps {
  question: NumberQuestion;
  countedIndices: number[];
  onToggleCount: (index: number) => void;
  selectedAnswer: number | null;
  isAnswered: boolean;
}

export function MathFormulaDisplay({
  question,
  countedIndices,
  onToggleCount,
  selectedAnswer,
  isAnswered,
}: MathFormulaDisplayProps) {
  // Counting Mode
  if (question.mode === "counting" || !question.secondCount) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <CountableObjectGrid
          object={question.object}
          count={question.firstCount}
          countedIndices={countedIndices}
          onToggleCount={onToggleCount}
          size="lg"
        />

        <p className="text-xs sm:text-sm font-bold text-amber-900/80 bg-amber-100/60 px-4 py-1.5 rounded-full">
          💡 Sentuh setiap {question.object.name.id} untuk membantu menghitung!
        </p>
      </div>
    );
  }

  const isAddition = question.operation === "+";

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {/* Visual Equation Formula */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full">
        {/* Group 1 */}
        <div className="flex flex-col items-center space-y-2">
          <CountableObjectGrid
            object={question.object}
            count={question.firstCount}
            offsetIndex={0}
            countedIndices={countedIndices}
            onToggleCount={onToggleCount}
            size="md"
          />
          <span className="font-black text-2xl sm:text-3xl text-slate-800">
            {question.firstCount}
          </span>
        </div>

        {/* Operator Badge */}
        <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-500 text-white font-black text-xl sm:text-2xl shadow-md shrink-0">
          {isAddition ? <Plus className="w-6 h-6 stroke-[3]" /> : <Minus className="w-6 h-6 stroke-[3]" />}
        </div>

        {/* Group 2 */}
        <div className="flex flex-col items-center space-y-2">
          <CountableObjectGrid
            object={question.object}
            count={question.secondCount}
            offsetIndex={question.firstCount}
            isSubtractionCrossed={!isAddition}
            countedIndices={countedIndices}
            onToggleCount={onToggleCount}
            size="md"
          />
          <span className="font-black text-2xl sm:text-3xl text-slate-800">
            {question.secondCount}
          </span>
        </div>

        {/* Equals Sign */}
        <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-200 text-slate-700 font-black text-xl sm:text-2xl shadow-sm shrink-0">
          <Equal className="w-6 h-6 stroke-[3]" />
        </div>

        {/* Result Target Placeholder */}
        <div
          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-3xl border-4 flex items-center justify-center font-black text-3xl sm:text-4xl shadow-md transition-all shrink-0 ${
            isAnswered
              ? "bg-emerald-500 text-white border-emerald-400 ring-4 ring-emerald-200 scale-105"
              : "bg-amber-100 text-amber-700 border-dashed border-amber-400 animate-pulse"
          }`}
        >
          {isAnswered ? question.correctAnswer : "?"}
        </div>
      </div>

      <p className="text-xs sm:text-sm font-bold text-amber-900/80 bg-amber-100/60 px-4 py-1.5 rounded-full text-center">
        {isAddition
          ? `💡 Sentuh buah untuk menjumlahkan: ${question.firstCount} + ${question.secondCount}`
          : `💡 Kurangkan ${question.secondCount} dari ${question.firstCount} ${question.object.name.id}`}
      </p>
    </div>
  );
}
