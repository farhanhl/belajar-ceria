"use client";

import React from "react";
import { AdabScenario, AdabChoice } from "../types";
import { AdabDoaCard } from "./AdabDoaCard";
import { useSettingsStore } from "@/stores/settings-store";
import { getTranslation } from "@/lib/i18n";
import { motion } from "motion/react";
import { CheckCircle2, XCircle, Sparkles, Heart } from "lucide-react";

interface AdabScenarioCardProps {
  scenario: AdabScenario;
  selectedChoiceId: string | null;
  isAnswered: boolean;
  onSelectChoice: (choice: AdabChoice) => void;
}

export const AdabScenarioCard: React.FC<AdabScenarioCardProps> = ({
  scenario,
  selectedChoiceId,
  isAnswered,
  onSelectChoice,
}) => {
  const { language } = useSettingsStore();

  const title = scenario.title[language] || scenario.title.id;
  const situation = scenario.situation[language] || scenario.situation.id;
  const question = scenario.question[language] || scenario.question.id;
  const moralLesson = scenario.moralLesson[language] || scenario.moralLesson.id;

  return (
    <div className="space-y-6 w-full max-w-2xl mx-auto">
      {/* 1. Situation Presentation Box */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 border-4 border-emerald-200 shadow-xl space-y-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-300 flex items-center justify-center text-3xl shadow-md border-2 border-white shrink-0">
            {scenario.sceneEmoji}
          </div>
          <div>
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-1">
              {title}
            </span>
            <p className="text-sm sm:text-base font-bold text-slate-800 leading-relaxed">
              {situation}
            </p>
          </div>
        </div>

        {/* Question Prompt */}
        <div className="bg-emerald-50/80 rounded-2xl p-3 sm:p-4 border border-emerald-200 flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 fill-emerald-400" />
          <p className="text-xs sm:text-sm font-black text-emerald-950">
            {question}
          </p>
        </div>
      </motion.div>

      {/* 2. Interactive Choice Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {scenario.choices.map((choice, idx) => {
          const isSelected = selectedChoiceId === choice.id;
          const choiceText = choice.text[language] || choice.text.id;
          const feedbackText = choice.feedback[language] || choice.feedback.id;

          let cardStyle = "bg-white/95 border-slate-200 hover:border-emerald-300 hover:shadow-lg hover:scale-[1.02]";
          if (isAnswered) {
            if (choice.isCorrect) {
              cardStyle = "bg-emerald-50 border-emerald-500 shadow-md ring-4 ring-emerald-200 scale-[1.02]";
            } else if (isSelected && !choice.isCorrect) {
              cardStyle = "bg-rose-50 border-rose-400 shadow-sm opacity-90";
            } else {
              cardStyle = "bg-white/60 border-slate-200 opacity-60";
            }
          }

          return (
            <motion.button
              key={choice.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * idx }}
              whileTap={!isAnswered ? { scale: 0.98 } : {}}
              disabled={isAnswered}
              onClick={() => onSelectChoice(choice)}
              className={`text-left p-5 rounded-3xl border-3 transition-all cursor-pointer flex flex-col justify-between min-h-[140px] shadow-sm relative overflow-hidden ${cardStyle}`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="text-3xl sm:text-4xl p-2 rounded-2xl bg-slate-50 border border-slate-100 shadow-xs">
                  {choice.emoji}
                </span>

                {isAnswered && (
                  <div>
                    {choice.isCorrect ? (
                      <CheckCircle2 className="w-7 h-7 text-emerald-500 fill-emerald-100" />
                    ) : isSelected ? (
                      <XCircle className="w-7 h-7 text-rose-500 fill-rose-100" />
                    ) : null}
                  </div>
                )}
              </div>

              <div>
                <p className="font-extrabold text-xs sm:text-sm text-slate-800 leading-snug">
                  {choiceText}
                </p>

                {/* Feedback Note after answering */}
                {isAnswered && isSelected && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-3 pt-2.5 border-t text-[11px] sm:text-xs font-bold ${
                      choice.isCorrect
                        ? "border-emerald-200 text-emerald-800"
                        : "border-rose-200 text-rose-800"
                    }`}
                  >
                    {feedbackText}
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* 3. Associated Prayer Box (Optional) */}
      {scenario.associatedDoa && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <AdabDoaCard doa={scenario.associatedDoa} />
        </motion.div>
      )}

      {/* 4. Moral Lesson / Wisdom Box */}
      {isAnswered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-amber-50 to-orange-50 border-3 border-amber-300 rounded-3xl p-4 sm:p-5 flex items-start gap-3 shadow-md"
        >
          <div className="p-2 bg-amber-400 text-white rounded-2xl shadow-sm shrink-0">
            <Heart className="w-5 h-5 fill-white" />
          </div>
          <div>
            <h5 className="font-black text-amber-950 text-xs sm:text-sm mb-0.5">
              {getTranslation("games.adab.moralLessonTitle", {}, language)}
            </h5>
            <p className="text-xs sm:text-sm font-bold text-amber-900 leading-relaxed">
              {moralLesson}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};
