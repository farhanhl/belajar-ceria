"use client";

import React, { useState } from "react";
import { ColorItem, ShapeItem } from "../types";
import { ShapeVector } from "./ShapeVector";
import { soundFx } from "@/lib/audio/sound-fx";
import { ttsService } from "@/lib/tts/tts";
import { useSettingsStore } from "@/stores/settings-store";
import { Volume2, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface ColorCardProps {
  type: "color";
  item: ColorItem;
}

interface ShapeCardProps {
  type: "shape";
  item: ShapeItem;
}

export function ColorShapeExploreCard(props: ColorCardProps | ShapeCardProps) {
  const { soundEnabled, autoTts, volume, language } = useSettingsStore();
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = () => {
    if (soundEnabled) {
      soundFx.playClick(volume * 0.5);
    }

    setIsPlaying(true);
    const textToSpeak =
      props.type === "color"
        ? language === "en"
          ? `Color ${props.item.name.en}. ${props.item.realWorldExamples[0]?.description.en || ""}`
          : `Warna ${props.item.name.id}. ${props.item.realWorldExamples[0]?.description.id || ""}`
        : language === "en"
          ? `Shape ${props.item.name.en}. ${props.item.description.en}`
          : `Bentuk ${props.item.name.id}. ${props.item.description.id}`;

    ttsService.speak({
      text: textToSpeak,
      language: language === "en" ? "en" : "id",
      volume,
      onEnd: () => setIsPlaying(false),
    });
  };

  if (props.type === "color") {
    const color = props.item;
    return (
      <motion.div
        whileHover={{ scale: 1.03, y: -4 }}
        whileTap={{ scale: 0.97 }}
        className="bg-white rounded-3xl p-5 shadow-lg border-2 border-amber-100 hover:border-amber-300 transition-all flex flex-col justify-between cursor-pointer"
        onClick={handleSpeak}
      >
        <div className="space-y-3">
          {/* Visual Palette Orb */}
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-inner flex items-center justify-center p-4" style={{ backgroundColor: color.hex + "15" }}>
            <motion.div
              animate={isPlaying ? { scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] } : {}}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full shadow-lg flex items-center justify-center border-4 border-white/80"
              style={{ backgroundColor: color.hex }}
            >
              <Sparkles className="w-8 h-8 text-white/80 fill-white/50 animate-pulse" />
            </motion.div>
          </div>

          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-black text-slate-800">
              {language === "en" ? color.name.en : color.name.id}
            </h3>
            <p className="text-xs font-extrabold text-slate-500">
              ({language === "en" ? color.name.id : color.name.en})
            </p>
          </div>

          {/* Real world examples */}
          <div className="space-y-1.5 pt-1">
            <p className="text-[11px] font-black uppercase text-amber-900/70 tracking-wider">
              {language === "en" ? "Examples:" : "Contoh Benda:"}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {color.realWorldExamples.map((ex) => (
                <span
                  key={ex.id}
                  className="inline-flex items-center gap-1 bg-amber-50 text-amber-950 text-xs font-extrabold px-2.5 py-1 rounded-xl border border-amber-200"
                >
                  <span>{ex.emoji}</span>
                  <span>{ex.name[language] || ex.name.id}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSpeak();
          }}
          className={`mt-4 w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl font-black text-xs sm:text-sm shadow-sm transition-all ${
            isPlaying
              ? "bg-amber-500 text-white animate-pulse"
              : "bg-amber-100 hover:bg-amber-200 text-amber-900"
          }`}
        >
          <Volume2 className="w-4 h-4" />
          <span>{language === "en" ? "Listen Voice" : "Dengarkan Suara"}</span>
        </button>
      </motion.div>
    );
  }

  // Shape card
  const shape = props.item;
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.97 }}
      className="bg-white rounded-3xl p-5 shadow-lg border-2 border-amber-100 hover:border-amber-300 transition-all flex flex-col justify-between cursor-pointer"
      onClick={handleSpeak}
    >
      <div className="space-y-3">
        {/* Visual Shape Vector */}
        <div className="relative aspect-square w-full rounded-2xl bg-sky-50 shadow-inner flex items-center justify-center p-4">
          <motion.div
            animate={isPlaying ? { scale: [1, 1.15, 1], rotate: [0, 8, -8, 0] } : {}}
            className="w-24 h-24 sm:w-28 sm:h-28"
          >
            <ShapeVector shapeId={shape.id} colorHex="#0284C7" showFace={true} />
          </motion.div>
        </div>

        <div className="text-center">
          <h3 className="text-xl sm:text-2xl font-black text-slate-800">
            {language === "en" ? shape.name.en : shape.name.id}
          </h3>
          <p className="text-xs font-extrabold text-slate-500">
            ({language === "en" ? shape.name.id : shape.name.en})
          </p>
        </div>

        <p className="text-xs text-slate-600 font-bold line-clamp-2">
          {shape.description[language] || shape.description.id}
        </p>

        {/* Real world examples */}
        <div className="space-y-1.5 pt-1">
          <p className="text-[11px] font-black uppercase text-sky-900/70 tracking-wider">
            {language === "en" ? "Examples:" : "Contoh Benda:"}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {shape.realWorldExamples.map((ex) => (
              <span
                key={ex.id}
                className="inline-flex items-center gap-1 bg-sky-50 text-sky-950 text-xs font-extrabold px-2.5 py-1 rounded-xl border border-sky-200"
              >
                <span>{ex.emoji}</span>
                <span>{ex.name[language] || ex.name.id}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleSpeak();
        }}
        className={`mt-4 w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl font-black text-xs sm:text-sm shadow-sm transition-all ${
          isPlaying
            ? "bg-sky-500 text-white animate-pulse"
            : "bg-sky-100 hover:bg-sky-200 text-sky-900"
        }`}
      >
        <Volume2 className="w-4 h-4" />
        <span>{language === "en" ? "Listen Voice" : "Dengarkan Suara"}</span>
      </button>
    </motion.div>
  );
}
